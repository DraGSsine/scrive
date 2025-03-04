const TOKEN_KEY = "authToken";

window.addEventListener("message", function (event) {
  if (event.data.type && event.data.type == "FROM_PAGE")
    chrome.storage.local.set({ [TOKEN_KEY]: event.data.token });
});

// Function to insert the generate message button
function insertButton(sendButton, inMail) {
  sendButton.parentElement.style.position = "relative";
  let button = document.createElement("button");
  button.className = "generateMessageBtn";
  button.type = "button";
  button.style.cssText = `
    height: 35px;
    min-width: 35px;
    position: absolute;
    ${inMail ? "right: 0.7rem; bottom: 6.2rem;" : "right: 70px; top: -1.5px;"}
    z-index: 1000;
}
  `;

  let img = document.createElement("img");
  img.src = chrome.runtime.getURL("assets/logo.png");
  img.alt = "Generate Message";
  img.width = 25;
  img.height = 25;
  button.appendChild(img);

  // Add loading image
  const loadingImg = document.createElement("img");
  loadingImg.src = chrome.runtime.getURL("assets/loading.svg");
  loadingImg.alt = "Loading";
  loadingImg.width = 25;
  loadingImg.height = 25;
  loadingImg.style.display = "none";
  button.appendChild(loadingImg);

  sendButton.parentNode.appendChild(button);
  return button;
}

// Function to simulate typing
async function simulateTyping(text, messageBox) {
  if (!text) return;
  messageBox.innerHTML = "";
  let currentParagraph = document.createElement("p");
  messageBox.appendChild(currentParagraph);

  for (let char of text) {
    if (char === "\n") {
      currentParagraph = document.createElement("p");
      messageBox.appendChild(currentParagraph);
    } else {
      currentParagraph.innerHTML += char;
      await new Promise((resolve) => setTimeout(resolve, 5));

      const inputEvent = new Event("input", {
        bubbles: true,
        cancelable: true,
      });
      messageBox.dispatchEvent(inputEvent);
    }
  }
}

// Modified function to observe textboxes and handle focus
function observeTextboxes() {
  let inMail = false;
  function setupMessageGenerator(textbox) {
    let sendButton = textbox
      .closest("form")
      .querySelector(".msg-form__send-button");
    if (!sendButton) {
      sendButton = textbox.closest("form").querySelector(".msg-form__send-btn");
      inMail = true;
    }

    // Remove existing button if it exists
    const existingButton = document.querySelector(".generateMessageBtn");
    if (existingButton) {
      existingButton.remove();
    }

    const button = insertButton(sendButton, inMail);

    button.onclick = async function (event) {

      event.preventDefault();
      event.stopPropagation();

      const normalImg = button.querySelector('img[alt="Generate Message"]');
      const loadingImg = button.querySelector('img[alt="Loading"]');
      normalImg.style.display = "none";
      loadingImg.style.display = "inline";
      button.disabled = true;

      try {
        const form = textbox.closest("form");
        const container = form?.closest(".msg-convo-wrapper");
        const userName1 = document
          .querySelector(".msg-entity-lockup__entity-title")
          ?.textContent?.trim()
          ?.toLowerCase();
        const userName2 = container
          .querySelector(".hoverable-link-text")
          ?.textContent?.trim()
          ?.toLowerCase();
        const userName = userName2 !== null ? userName2 : userName1;
        const parent = form.parentElement;
        const allMessagesContainer = parent.querySelectorAll(
          '[class*="msg-s-event-listitem--other"]'
        );

        const allMyMessagesContainer = parent.querySelectorAll(
          '[class~="msg-s-event-listitem"]:not([class*="msg-s-event-listitem--other"])'
        );
        const allMessages = [];
        const allMyMessages = [];

        allMessagesContainer.forEach((parent) => {
          const child = parent.querySelector(".msg-s-event__content");
          if (child) {
            allMessages.push(child.innerText);
          }
        });

        allMyMessagesContainer.forEach((parent) => {
          const child = parent.querySelector(".msg-s-event__content");
          if (child) {
            allMyMessages.push(child.innerText);
          }
        });

        const lastReceivedMessage = allMessages[allMessages?.length - 1];
        const myCurrentMessage = textbox?.innerText;

        const res = await new Promise((resolve, reject) => {
          chrome.runtime.sendMessage(
            {
              action: "getUserInfo",
              payload: {
                lastReceivedMessage,
                myCurrentMessage,
                allMessages,
                allMyMessages,
                userName,
              },
            },
            (response) => {
              if (chrome.runtime.lastError) {
                return reject(chrome.runtime.lastError);
              }
              resolve(response);
            }
          );
        });
        const { message } = res.data;
        await simulateTyping(message, textbox);
      } catch (error) {
        console.error("Error generating message:", error);
      } finally {
        loadingImg.style.display = "none";
        normalImg.style.display = "inline";
        button.disabled = false;
      }
    };

    return button;
  }

  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.type === "childList") {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === Node.ELEMENT_NODE) {
            const textboxes = node.querySelectorAll(
              ".msg-form__contenteditable"
            );
            textboxes.forEach((textbox) => {
              textbox.addEventListener("focus", () => {
                currentButton = setupMessageGenerator(textbox);
              });
            });
          }
        });
      }
    });
  });

  observer.observe(document.body, { childList: true, subtree: true });

  // Add listeners to existing textboxes
  document.querySelectorAll(".msg-form__contenteditable").forEach((textbox) => {
    textbox.addEventListener("focus", () => {
      currentButton = setupMessageGenerator(textbox);
    });
  });

  return observer;
}

// Initialize the observer
observeTextboxes();
