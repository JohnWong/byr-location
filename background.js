// background.js
// @author         Binux
// @author         John Wong

function showLoading(ip, font){
  var span = document.createElement("span");
  span.innerHTML = " [ LOADING... ]";
  span.className = ip;
  font.appendChild(span);
}

function onLoad() {
  var fonts = document.getElementsByTagName("font");
  console.log(fonts);
  for ( var i = 0,font;font = fonts[i];i++ )
  {
    var result = font.innerHTML.match(/\[FROM:\D{0,5}([0-9a-fA-F\.:]+.)\]/);
    if(result && font.lastChild.nodeName != "SPAN")
    {
      var ip = result[1].replace("*","0");
      showLoading(ip, font);
      sendRequest(ip);
      return;
    }
  }
}

function sendRequest(ip){
    setTimeout(function() {GM_xmlhttpRequest({
    method: 'GET',
    url: 'https://pytool.sinaapp.com/geo?type=json&pos=1&ip='+ip,
    onload: function(responseDetails) {
        var response = responseDetails.responseText;
        var ret = eval('(' + response + ')')['geo']
    var ip = ret['ip']
        var loc = ret['loc']
        showAddress({'ip': ip,'loc': loc});
        }
    })}, 0);
}

// Called when the url of a tab changes.
function checkForValidUrl(tabId, changeInfo, tab) {
  // If the letter 'g' is found in the tab's URL...
  if (/^https?:\/\/(forum|bbs|bbs6)\.byr(\.edu)?\.cn\/.*$/.test(tab.url) && tab.status == "complete") {
    // ... show the page action.
    chrome.pageAction.show(tabId);
	onLoad();
  }
};

// Listen for any changes to the URL of any tab.
chrome.tabs.onUpdated.addListener(checkForValidUrl);