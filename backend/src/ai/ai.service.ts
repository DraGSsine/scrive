import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { Model, plugin } from 'mongoose';
import { User } from 'src/model/UserSchema';
import OpenAI from 'openai';

@Injectable()
export class AiService {
  private openai: any;

  constructor(
    private configService: ConfigService,
    @InjectModel(User.name) private userModel: Model<User>,
  ) {
    // this.openai = new OpenAI({
    //   apiKey: this.configService.get<string>('OPENAI_API_KEY'),
    // });
    this.openai = new OpenAI({
      baseURL: 'https://openrouter.ai/api/v1',
      apiKey: this.configService.get<string>('OPENROUTER_API_KEY'),
    });
  }

  async generate(
    lastReceivedMessage: string,
    message: string,
    allMessages: string[],
    allMyMessages: string[],
    userName: string,
    userId: string,
  ) {
    try {
      // Choose the appropriate prompt based on whether a draft message exists.
      console.log('lastReceivedMessage:', lastReceivedMessage);
      console.log('message:', message);
      console.log('allMessages:', allMessages);
      console.log('allMyMessages:', allMyMessages);
      console.log('userName:', userName);
      let promptText = '';

      if (message && message.trim().length > 0) {
        // Prompt for refining an existing draft message
        promptText = `
      You are assisting in writing messages as if you are the person replying to received messages.
      
      CONTEXT:
      - Recipient (${userName}) sent the last message: "${lastReceivedMessage}"
      - Your previous replies: ${allMyMessages.join(' ')}
      - Their previous messages: ${allMessages.join(' ')}
      
      OBJECTIVE:
      - Improve and refine the following draft message: "${message}"
      - Enhance clarity, tone, and natural flow while preserving the original context
      
      GUIDELINES:
      - Use a natural, human-like tone appropriate for the conversation.
      - Write consistently from the perspective of the person replying.
      - Avoid unnecessary repetition of the recipient’s name.
      - Do not invent new details or deviate from the conversation's context.
      - Do not include placeholder text such as [name], [place], [date], etc.
      
      Please generate only the improved version of the draft message.
        `;
      } else if (allMessages.length !== 0 || allMyMessages.length !== 0) {
        // Prompt for generating a new reply message
        promptText = `
      You are assisting in writing messages as if you are the person replying to received messages.
      
      CONTEXT:
      - Recipient (${userName}) sent the last message: "${lastReceivedMessage}"
      - Your previous replies: ${allMyMessages.join(' ')}
      - Their previous messages: ${allMessages.join(' ')}
      
      OBJECTIVE:
      - Generate a new reply that is contextually appropriate to the recipient’s last message.
      - Ensure the response is natural, human-like, and true to the conversation.
      
      GUIDELINES:
      - Write from the perspective of the person replying.
      - Keep the reply relevant to the recipient’s last message without repeating it verbatim.
      - Use a tone that fits the conversation’s formality (casual or formal).
      - Do not introduce new topics or details not present in the conversation.
      - Do not include placeholder text such as [name], [place], [date], etc.
      
      Please generate only the new response message.
        `;
      } else {
        console.log('new conversation');

        // Prompt for starting a new conversation
        promptText = `
        You are assisting in writing a greeting message.
        
        OBJECTIVE:
        - Start a new conversation by writing a brief and engaging greeting.
        - Simply greet the recipient (${userName}) to initiate the conversation.
        
        GUIDELINES:
        - Use the recipient's name (${userName}) in the greeting.
        - Keep the greeting friendly, concise, and contextually appropriate.
        - Avoid unnecessary details or unrelated topics.
        - Do not include placeholder text such as [name], [place], [date], etc.
        
        Please generate only the greeting message.
        `;
      }

      // Call OpenAI's chat completion with the chosen prompt.
      const completion = await this.openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: `
  You are an expert in writing natural, human-like responses.
  Your goal is to ensure the response:
  - Feels like a real person wrote it
  - Is not robotic or overly AI-like
  - Adapts to the user's tone (formal or casual)
  - Don't Put the respose in a code block or use any special characters
            `,
          },
          {
            role: 'user',
            content: promptText,
          },
        ],
        temperature: 0.4, // Lower temperature for more human-like responses
      });

      let content = completion.choices[0].message?.content?.trim();

      if (!content) throw new Error('No content received from OpenAI');

      // Update user creditsUsed.
      await this.userModel.updateOne(
        { _id: userId },
        { $inc: { creditsUsed: 1 } },
      );

      return { message: content };
    } catch (error) {
      console.error('Content Generation Error:', error);
      throw new Error('Failed to generate response');
    }
  }
}
