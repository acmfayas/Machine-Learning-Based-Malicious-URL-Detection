// Send the current tab's URL to background.js
chrome.runtime.sendMessage({ url: window.location.href });
