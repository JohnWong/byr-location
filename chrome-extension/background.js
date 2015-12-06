// background.js
// @author         Binux
// @author         John Wong

// Called when the url of a tab changes.
function checkForValidUrl(tabId, changeInfo, tab) {
  // If the letter 'g' is found in the tab's URL...
  if (/^https?:\/\/(forum|bbs|bbs6)\.byr(\.edu)?\.cn\/.*$/.test(tab.url) && tab.status == "complete") {
    // ... show the page action.
    chrome.pageAction.show(tabId);
  }
};

// Listen for any changes to the URL of any tab.
chrome.tabs.onUpdated.addListener(checkForValidUrl);