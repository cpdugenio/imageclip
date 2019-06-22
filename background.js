// Enable rule for page action click
chrome.runtime.onInstalled.addListener(function() {
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    chrome.declarativeContent.onPageChanged.addRules([{
      conditions: [
        // Page matches when contains a <video> tag
        new chrome.declarativeContent.PageStateMatcher({
          css: ["video"]
        })
      ],
      // Only show page action if matching
      actions: [ new chrome.declarativeContent.ShowPageAction() ]
    }]);
  });
});

// Trigger clip.js on page action click
chrome.pageAction.onClicked.addListener(
    function (tab) {
        chrome.tabs.executeScript({
          file: 'clip.js'
        });
    }
);
