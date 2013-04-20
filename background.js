var superhappyval = 6;
var happyval = 11;
var neutralval = 16;
var sadval = 21;
var mostRecentTab;
var limit = false;

var refreshIcon = function(addedTab) {
  var queryInfo = new Object();
  queryInfo.url = "<all_urls>";
  chrome.tabs.query(queryInfo, function(tabs) {
    console.log(tabs.length);
    var icon = new Object();
    if (tabs.length < superhappyval) {
      icon.path = "images/0.png";
    } else if (tabs.length < happyval) {
      icon.path = "images/1.png";
    } else if (tabs.length < neutralval) {
      icon.path = "images/2.png";
    } else if (tabs.length < sadval) {
      icon.path = "images/3.png";
    } else {
      icon.path = "images/4.png";
      if (mostRecentTab && addedTab === true && limit === true) {
        chrome.tabs.remove(mostRecentTab.id);
        alert("Seriously, stop opening tabs :p");
      }

    }
    chrome.browserAction.setIcon(icon);
  });

};

var updateVals = function(items) {
  if (items.superhappy) {
    superhappyval = items.superhappy;
  }
  if (items.happy) {
    happyval = items.happy;
  }
  if (items.neutral) {
    neutralval = items.neutral;
  }
  if (items.sad) {
    sadval = items.sad;
  }
  console.log(items.limit);
  if (items.limit)
  {
    limit = items.limit;
  }
  refreshIcon(false);
};

chrome.storage.onChanged.addListener(function(items, area) {
  console.log("updated vals");
  console.log(items);
  if (items.superhappy) {
    superhappyval = items.superhappy.newValue;
  }
  if (items.happy) {
    happyval = items.happy.newValue;
  }
  if (items.neutral) {
    neutralval = items.neutral.newValue;
  }
  if (items.sad) {
    sadval = items.sad.newValue;
  }
  if (items.limit)
  {
    limit = items.limit.newValue
  }
  refreshIcon(false);
});

chrome.tabs.onCreated.addListener(function(tab) {
  // var queryInfo = new Object();
  // queryInfo.url = "<all_urls>";
  // chrome.tabs.query(queryInfo, refreshIcon);
  mostRecentTab = tab;
  refreshIcon(true);
});

chrome.tabs.onRemoved.addListener(function(tab) {
  refreshIcon(false);
});

chrome.storage.local.get(['superhappy', 'happy', 'neutral', 'sad', 'limit' ], function(items) {
  console.log("updating for the first time");
  console.log(items);
  updateVals(items);
});