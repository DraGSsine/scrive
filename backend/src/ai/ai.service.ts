import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/model/UserSchema';
import OpenAI from 'openai';

@Injectable()
export class AiService {
  private openai: OpenAI;
  private readonly logger = new Logger(AiService.name);

  constructor(
    private configService: ConfigService,
    @InjectModel(User.name) private userModel: Model<User>,
  ) {
    this.openai = new OpenAI({
      baseURL: 'https://openrouter.ai/api/v1',
      apiKey: this.configService.get<string>('OPENROUTER_API_KEY'),
    });
  }

  async generate(
    lastReceivedMessage: string | undefined,
    message: string | undefined,
    allMessages: string[],
    allMyMessages: string[],
    userName: string,
    userId: string,
  ) {
    try {
      // Log inputs for debugging
      this.logger.debug({
        lastReceivedMessage,
        message,
        allMessagesCount: allMessages.length,
        allMyMessagesCount: allMyMessages.length,
        userName,
      });

      // Create conversation history in a more structured way to improve context awareness
      const conversationHistory = this.buildConversationHistory(allMessages, allMyMessages, lastReceivedMessage);
      
      let promptText = '';
      let scenarioType = '';

      // Determine the exact conversation scenario
      if (message && message.trim().length > 0) {
        // User has drafted a message to refine
        scenarioType = 'refine_draft';
        promptText = this.buildRefineDraftPrompt(conversationHistory, message, userName);
      } 
      else if (lastReceivedMessage && allMessages.length > 0) {
        // There's a message from the other person that needs a response
        if (allMyMessages.length === 0) {
          // First time responding to this person
          scenarioType = 'first_response';
          promptText = this.buildFirstResponsePrompt(lastReceivedMessage, userName);
        } else {
          // Continuing an existing conversation
          scenarioType = 'continue_conversation';
          promptText = this.buildContinueConversationPrompt(conversationHistory, userName);
        }
      }
      else if (allMyMessages.length > 0 && allMessages.length === 0) {
        // I've sent messages but received none - need a follow-up
        scenarioType = 'followup_no_response';
        promptText = this.buildFollowupNoResponsePrompt(allMyMessages, userName);
      }
      else if (allMyMessages.length > 0 && allMessages.length > 0 && !lastReceivedMessage) {
        // Conversation exists but no new message from recipient - likely a correction or follow-up
        scenarioType = 'followup_existing_conversation';
        promptText = this.buildFollowupExistingPrompt(conversationHistory, userName);
      }
      else {
        // Brand new conversation, no messages exchanged yet
        scenarioType = 'new_conversation';
        promptText = this.buildNewConversationPrompt(userName);
      }

      this.logger.debug(`Using scenario type: ${scenarioType}`);

      // Call OpenAI's chat completion with the chosen prompt
      const completion = await this.openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: `
You write natural human responses based on conversation context.

EXTREMELY IMPORTANT RULES:
- ONLY generate the exact text of the message with NO commentary, explanations, or suggestions
- DO NOT include phrases like "How about:" or "You could say:" or "I suggest:"
- DO NOT wrap the message in quotes
- ALWAYS understand the full conversation context before replying
- NEVER generate a response that doesn't make logical sense in the context
- NEVER mention future events that already happened (like "looking forward to our call" if the call already happened)
- NEVER contradict what was previously said in the conversation
- NEVER use generic templates that don't fit the specific situation
- AVOID formulaic language like "Thanks for reaching out" or "I hope this message finds you well"
- NO canned responses or placeholders like [DATE]
- Sound like a real person having a real conversation
`,
          },
          {
            role: 'user',
            content: promptText,
          },
        ],
        temperature: 0.6,
      });

      const content = completion.choices[0].message?.content?.trim().replace(/^"(.*)"$/, '$1')

      if (!content) {
        throw new Error('No content received from OpenAI');
      }

      // Update user creditsUsed
      await this.userModel.updateOne(
        { _id: userId },
        { $inc: { creditsUsed: 1 } },
      );

      return { message: content };
    } catch (error) {
      this.logger.error('Content Generation Error:', error);
      throw new Error(`Failed to generate response: ${error.message}`);
    }
  }

  /**
   * Builds a chronological representation of the conversation for better context
   */
  private buildConversationHistory(
    allMessages: string[],
    allMyMessages: string[],
    lastReceivedMessage?: string
  ): string {
    // Combine messages into a chronological conversation
    const conversationLines:string[] = [];
    
    // If we have equal messages, we can pair them directly
    const minLength = Math.min(allMessages.length, allMyMessages.length);
    
    // Add paired messages first
    for (let i = 0; i < minLength; i++) {
      conversationLines.push(`${i+1}. Them: ${allMessages[i]}`);
      conversationLines.push(`${i+1}. Me: ${allMyMessages[i]}`);
    }
    
    // Add any remaining messages from them
    for (let i = minLength; i < allMessages.length; i++) {
      conversationLines.push(`${i+1}. Them: ${allMessages[i]}`);
    }
    
    // Add any remaining messages from me
    for (let i = minLength; i < allMyMessages.length; i++) {
      conversationLines.push(`${i+1}. Me: ${allMyMessages[i]}`);
    }
    
    // Add the last received message if it exists and isn't already included
    if (lastReceivedMessage && allMessages[allMessages.length - 1] !== lastReceivedMessage) {
      conversationLines.push(`Most recent: Them: ${lastReceivedMessage}`);
    }
    this.logger.debug("-------------------")
    this.logger.log(conversationLines)
    this.logger.debug("-------------------")
    return conversationLines.join('\n');
  }

  private buildRefineDraftPrompt(
    conversationHistory: string,
    draftMessage: string,
    userName: string,
  ): string {
    return `
  I need to refine this draft LinkedIn message to ${userName}.

  Draft: "${draftMessage}"

  Our conversation history:
  ${conversationHistory}

  Guidelines:
  - Improve the message to be more professional and polished for LinkedIn
  - Maintain the core message but enhance clarity, conciseness, and impact
  - Use professional language appropriate for LinkedIn networking
  - Ensure logical consistency with the conversation history
  - Avoid clichés and generic networking phrases
  - Keep the appropriate level of formality based on the relationship context
  - Don't mention future events that already happened
  - Don't contradict what was previously discussed
  - No placeholders
  `;
  }

  private buildFirstResponsePrompt(
    lastReceivedMessage: string,
    userName: string,
  ): string {
    return `
Write my first response to ${userName}, who sent:
"${lastReceivedMessage}"

Guidelines:
- Respond directly to what they said
- Sound natural and conversational
- Keep it relatively brief
- No placeholders
`;
  }

  private buildContinueConversationPrompt(
    conversationHistory: string,
    userName: string,
  ): string {
    return `
I need to respond to ${userName} based on our conversation.

Our complete conversation:
${conversationHistory}

Guidelines:
- Your response MUST be logically consistent with the conversation history
- Respond to their most recent message appropriately
- NEVER mention future events if they already happened in the conversation
- Avoid contradicting anything previously established
- Sound natural, not like an AI
- No placeholders
`;
  }

  private buildFollowupNoResponsePrompt(
    allMyMessages: string[],
    userName: string,
  ): string {
    return `
I need to send a follow-up to ${userName} who hasn't responded to my previous messages.

My previous messages:
${allMyMessages.join('\n')}

Guidelines:
- Keep it brief and natural
- Don't be pushy
- Avoid clichés like "just checking in"
- No placeholders
`;
  }

  private buildFollowupExistingPrompt(
    conversationHistory: string,
    userName: string,
  ): string {
    return `
I need to continue my conversation with ${userName} even though they haven't sent a new message.

Our complete conversation:
${conversationHistory}

Guidelines:
- Your message MUST be logically consistent with what has already been discussed
- NEVER mention future events if they already happened in our conversation
- Move the conversation forward naturally
- Sound like a real person
- No placeholders
`;
  }

  private buildNewConversationPrompt(userName: string): string {
    return `
Write a natural-sounding first LinkedIn message to ${userName}.

Guidelines:
- Keep it professional but friendly
- Reference potential professional connection points without being too specific
- Make it brief (2-3 sentences maximum)
- Include a clear but gentle purpose for connecting
- Avoid generic phrases like "I'd like to add you to my professional network"
- Don't be overly sales-focused or pushy
- Sound like a real professional, not an AI
- No placeholders
`;
  }
}