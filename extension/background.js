chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "getUserInfo") {
    fetchUserInfo(message.payload)
      .then((userInfo) => sendResponse({ success: true, data: userInfo }))
      .catch((error) => sendResponse({ success: false, error: error.message }));

    // Return true to keep the messaging channel open for the async response.
    return true;
  }
});

async function fetchUserInfo(payload) {
  const { lastReceivedMessage, myCurrentMessage } = payload;
  const res = await fetch("http://localhost:5000/ai/generate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      allMessages: payload.allMessages,
      lastReceivedMessage: lastReceivedMessage,
      message: myCurrentMessage,
      allMyMessages: payload.allMyMessages,
      userName: payload.userName,
    }),
    credentials: "include",
  });
  return await res.json();
}
