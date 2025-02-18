// Constants
const TOKEN_KEY = "authToken";

const checkLoginStatus = async () => {
  try {
    const result = await chrome.storage.local.get([TOKEN_KEY]);
    const token = result[TOKEN_KEY];
    let userInfo = null;
    document.cookie = `authToken=${token}; path=/; max-age=86400; secure`;
    const loading = document.getElementById("loadingState");
    loading.classList.add("active");
    const response = await fetch("http://localhost:5000/users/info", {
      method: "GET",
      credentials: "include",
    });

    const data = await response.json();
    
    if (!response.ok) userInfo = null;
    else userInfo = data;
    updateUserInterface(userInfo);

    showPage(!!userInfo);
  } catch (error) {
    console.error("Error checking login status:", error);
    showPage(false);
  }
};

// Function to show/hide pages based on auth status
const showPage = (isLoggedIn) => {
  console.log("isLoggedIn", isLoggedIn);
  const authPage = document.getElementById("authPage");
  const dashboardPage = document.getElementById("dashboardPage");
  const loading = document.getElementById("loadingState");
  if (isLoggedIn) {
    authPage.classList.remove("active");
    dashboardPage.classList.add("active");
    loading.classList.remove("active");
  } else {
    loading.classList.remove("active");
    authPage.classList.add("active");
    dashboardPage.classList.remove("active");
  }
};

// Function to update the UI with user data
const updateUserInterface = (userData) => {
  if (!userData) return;

  // Update profile info
  const profileInfo = document.querySelector(".profile-info");
  if (profileInfo) {
    profileInfo.querySelector("h2").textContent =
      userData.displayName || "User";
    profileInfo.querySelector(".email").textContent = userData.email || "";
  }

  // Update plan badge
  const planBadge = document.querySelector(".plan-badge");
  if (planBadge && userData.plan) {
    planBadge.textContent = userData.plan;
  }

  // Update profile image
  const profileImage = document.querySelector(".profile-image");
  if (profileImage && userData.avatar) {
    profileImage.src = userData.avatar;
  }

  // Update usage statistics
  const usageNumbers = document.querySelectorAll(".usage-number");
  if (usageNumbers.length >= 2) {
    if (userData.creditsUsed !== undefined) {
      usageNumbers[0].textContent = userData.creditsUsed.toLocaleString();
    }
    if (userData.monthlyCredits) {
      const remaining = userData.monthlyCredits - (userData.creditsUsed || 0);
      usageNumbers[1].textContent = remaining.toLocaleString();
    }
  }
};

// Add event listeners
document.addEventListener("DOMContentLoaded", () => {
  // Google auth button
  const googleButton = document.querySelector(".auth-button.google");
  if (googleButton) {
    googleButton.addEventListener("click", () => {
      chrome.tabs.create({
        url: "http://localhost:3000/auth/signup",
      });
    });
  }

  // Email auth button
  const emailButton = document.querySelector(".auth-button.email");
  if (emailButton) {
    emailButton.addEventListener("click", () => {
      chrome.tabs.create({
        url: "http://localhost:3000/auth/signup",
      });
    });
  }

  // Terms and Privacy links
  const links = document.querySelectorAll(".terms a");
  links.forEach((link, index) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const url =
        index === 0
          ? "http://localhost:3000/terms"
          : "http://localhost:3000/privacy";
      chrome.tabs.create({ url });
    });
  });

  // Initialize
  checkLoginStatus();
});
