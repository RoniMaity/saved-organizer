// background.js - Unidrop V3 Service Worker

// On installation, set up the context menus
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "save-image-to-mind",
    title: "Save Image to Mind",
    contexts: ["image"]
  });

  chrome.contextMenus.create({
    id: "save-text-to-mind",
    title: "Save Text to Mind",
    contexts: ["selection"]
  });
  
  console.log("Unidrop Extension Installed successfully with Context Menus.");
});

// Handle Context Menu Clicks
chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (!tab || !tab.id) return;
  
  if (info.menuItemId === "save-image-to-mind") {
    const payload = {
      inputUrl: info.srcUrl,
      type: "IMAGE"
    };
    saveToMind(payload, tab.id);
  } else if (info.menuItemId === "save-text-to-mind") {
    const payload = {
      inputUrl: info.selectionText,
      type: "TEXT"
    };
    saveToMind(payload, tab.id);
  }
});

// Handle toolbar button clicks (save current URL)
chrome.action.onClicked.addListener((tab) => {
  if (!tab || !tab.id || !tab.url) return;
  
  const payload = {
    inputUrl: tab.url,
    type: "URL"
  };
  saveToMind(payload, tab.id);
});

// Helper to save to Next.js API
async function saveToMind(payload, tabId) {
  // Tell content script we are starting the capture animation
  try {
    await chrome.tabs.sendMessage(tabId, { action: "saving" });
  } catch (err) {
    console.warn("Could not send 'saving' message to content script (tab might be a protected chrome:// page):", err);
    return;
  }

  try {
    // Check local storage for synced token
    const { token } = await chrome.storage.local.get("token");
    const headers = {
      "Content-Type": "application/json",
    };
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    const res = await fetch("http://localhost:3000/api/save", {
      method: "POST",
      headers: headers,
      body: JSON.stringify(payload)
    });

    if (res.ok) {
      await chrome.tabs.sendMessage(tabId, { action: "saved" });
    } else {
      const errData = await res.json().catch(() => ({}));
      await chrome.tabs.sendMessage(tabId, { 
        action: "error", 
        message: errData.error || "Save failed" 
      });
    }
  } catch (err) {
    console.error("Unidrop Save Error:", err);
    await chrome.tabs.sendMessage(tabId, { 
      action: "error", 
      message: "Server offline or connection refused." 
    });
  }
}
