let pipconfig;
let cntconfig;
let cnpconfig;

// background.js -> contents.jsへ
chrome.commands.onCommand.addListener(function(command) {
  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    // アクティブなタブ tabs[0] のcontent scriptsにメッセージを送信
    chrome.storage.local.get("latestTabId", function(tabId) {
      // タブのチェック
      chrome.tabs.get(tabId.latestTabId, function() {
        if (chrome.runtime.lastError) {
          tabId.latestTabId = tabs[0].id;
        }
      });
      chrome.tabs.sendMessage(
        tabId.latestTabId,
        { sendCommand: command },
        function(response) {
          try {
            console.log(response.farewell);
          } catch (error) {}
        }
      );
    });
  });
  return 0;
});

// popupやcontent_scriptからコマンドの受付
chrome.runtime.onMessage.addListener(function(message, sender, respons) {
  switch (message.query) {
    case "get-Tab-Id":
      chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        chrome.storage.local.set({ latestTabId: tabs[0].id},function() {}
        );
      });
      respons("Hello");
      break;
      
    case "check-pip-status":
      chrome.storage.local.get("latestTabId", function(tabId) {
        chrome.tabs.query({ active: false, currentWindow: false }, function(tabs) {
          let ids = new Array();
          for (let i in tabs) {
            ids.push(tabs[i].id);
          }
        });
      });
      respons("return check-pip-status");
      break;

    default:
      break;
  }
  // 引数に値を入れて返す感じ？
  return true;
});
