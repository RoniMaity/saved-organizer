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

  const knownDomains = ["localhost", "127.0.0.1", "10.254.207.208", "192.168.143.208"];
  let token = "";
  let baseUrl = "http://localhost:3000";

  // Method 1: Try chrome.cookies.getAll (highly robust, searches all domains)
  if (typeof chrome !== 'undefined' && chrome.cookies) {
    try {
      const cookies = await new Promise((resolve) => {
        chrome.cookies.getAll({ name: "token" }, resolve);
      });
      console.log("Cookies found via getAll:", cookies ? cookies.length : 0);
      if (cookies && cookies.length > 0) {
        const match = cookies.find(c => {
          const domain = c.domain.toLowerCase();
          return knownDomains.some(d => domain.includes(d));
        });
        if (match) {
          token = match.value;
          let domain = match.domain;
          if (domain.startsWith(".")) domain = domain.substring(1);
          
          const protocol = match.secure ? "https" : "http";
          const host = domain.includes(":") ? domain : `${domain}:3000`;
          baseUrl = `${protocol}://${host}`;
          console.log("Successfully retrieved token via cookies.getAll from domain:", domain, "baseUrl:", baseUrl);
        }
      }
    } catch (e) {
      console.warn("Failed to check cookies via getAll:", e);
    }
  }

  // Method 2: Fallback to chrome.cookies.get for specific origins if still no token
  if (!token && typeof chrome !== 'undefined' && chrome.cookies) {
    const knownOrigins = [
      "http://localhost:3000",
      "http://127.0.0.1:3000",
      "http://10.254.207.208:3000",
      "http://192.168.143.208:3000"
    ];
    for (const origin of knownOrigins) {
      try {
        const cookie = await new Promise((resolve) => {
          chrome.cookies.get({ url: origin, name: "token" }, resolve);
        });
        if (cookie && cookie.value) {
          token = cookie.value;
          baseUrl = origin;
          console.log("Successfully retrieved token via cookies.get from origin:", origin);
          break;
        }
      } catch (e) {
        console.warn(`Failed to check cookie for ${origin}:`, e);
      }
    }
  }

  // Method 3: Fallback to storage if still no token
  if (!token) {
    try {
      const storage = await chrome.storage.local.get(["token", "baseUrl"]);
      if (storage.token) {
        token = storage.token;
        baseUrl = storage.baseUrl || "http://localhost:3000";
        console.log("Successfully retrieved token from chrome.storage.local, baseUrl:", baseUrl);
      }
    } catch (storageErr) {
      console.warn("Error reading fallback storage:", storageErr);
    }
  }

  try {
    const headers = {
      "Content-Type": "application/json",
    };
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    // Add a 10-second timeout to prevent the toast from hanging forever
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);

    const res = await fetch(`${baseUrl}/api/save`, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(payload),
      signal: controller.signal
    });

    clearTimeout(timeoutId);

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
    let errorMsg = "Server offline or connection refused.";
    if (err.name === "AbortError") {
      errorMsg = "Request timed out. Server took too long to respond.";
    }
    await chrome.tabs.sendMessage(tabId, { 
      action: "error", 
      message: errorMsg 
    });
  }
}
