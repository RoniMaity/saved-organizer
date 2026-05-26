// content.js - Unidrop Content Script UI

// Listen for save events from background.js
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "ping") {
    sendResponse({ status: "alive" });
    return true;
  }
  if (message.action === "saving") {
    injectToast("saving", "Saving to Mind...");
  } else if (message.action === "saved") {
    injectToast("saved", "Saved!");
  } else if (message.action === "error") {
    injectToast("error", message.message || "Failed to save");
  }
});

// Synchronize token if user is active on any known development domain
const knownOrigins = [
  "http://localhost:3000",
  "http://127.0.0.1:3000",
  "http://10.254.207.208:3000",
  "http://192.168.143.208:3000"
];

if (knownOrigins.includes(window.location.origin)) {
  const syncToken = () => {
    // Check localStorage first
    let token = localStorage.getItem("token");
    
    // If not found in localStorage, check webpage cookies directly
    if (!token) {
      const match = document.cookie.match(/(?:^|; )token=([^;]*)/);
      if (match) {
        token = decodeURIComponent(match[1]);
      }
    }

    if (token) {
      chrome.storage.local.set({ 
        token: token,
        baseUrl: window.location.origin
      }, () => {
        console.log("Unidrop extension successfully synced auth token from " + window.location.origin);
      });
    }
  };

  syncToken();
  // Watch for storage updates or custom login triggers
  window.addEventListener("storage", syncToken);
}

// Function to safely inject and animate the sandboxed minimalist toast
function injectToast(status, messageText) {
  let container = document.getElementById("unidrop-toast-container");
  
  if (!container) {
    container = document.createElement("div");
    container.id = "unidrop-toast-container";
    container.style.position = "fixed";
    container.style.top = "24px";
    container.style.right = "24px";
    container.style.zIndex = "2147483647"; // Max z-index to stay on top
    document.body.appendChild(container);
  }

  // Use Shadow DOM to prevent target page styles from polluting the toast
  const shadowRoot = container.shadowRoot || container.attachShadow({ mode: "open" });

  shadowRoot.innerHTML = `
    <style>
      .toast-wrapper {
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
        background-color: #1a1c1c; /* Minimalist Zen Neutral dark */
        color: #ffffff;
        padding: 12px 20px;
        border-radius: 12px;
        box-shadow: 0 12px 32px rgba(0, 0, 0, 0.18), 0 2px 8px rgba(0, 0, 0, 0.08);
        display: flex;
        align-items: center;
        gap: 12px;
        font-size: 13px;
        font-weight: 500;
        letter-spacing: -0.01em;
        border: 1px solid rgba(255, 255, 255, 0.08);
        transform: translateY(-20px);
        opacity: 0;
        transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
      }
      .toast-wrapper.visible {
        transform: translateY(0);
        opacity: 1;
      }
      .spinner {
        width: 14px;
        height: 14px;
        border: 2px solid rgba(255, 255, 255, 0.2);
        border-top-color: #ffffff;
        border-radius: 50%;
        animation: spin 0.6s linear infinite;
        flex-shrink: 0;
      }
      .icon {
        font-size: 16px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
      }
      @keyframes spin {
        to { transform: rotate(360deg); }
      }
    </style>
    <div id="unidrop-toast" class="toast-wrapper">
      ${status === "saving" ? '<div class="spinner"></div>' : status === "saved" ? '<span class="icon">✨</span>' : '<span class="icon">⚠️</span>'}
      <span>${messageText}</span>
    </div>
  `;

  // Animate entry
  setTimeout(() => {
    const toast = shadowRoot.getElementById("unidrop-toast");
    if (toast) toast.classList.add("visible");
  }, 20);

  // Auto-remove if it reaches a terminal state (saved/error)
  if (status !== "saving") {
    setTimeout(() => {
      const toast = shadowRoot.getElementById("unidrop-toast");
      if (toast) {
        toast.style.transform = "translateY(-10px)";
        toast.style.opacity = "0";
        toast.style.transition = "all 0.3s ease";
        setTimeout(() => {
          if (container && container.parentNode) {
            container.parentNode.removeChild(container);
          }
        }, 300);
      }
    }, 2500);
  }
}
