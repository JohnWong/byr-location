// content.js
// @author         Binux
// @author         John Wong

var isMobile;

function showLoading(ip, font){
  var span = document.createElement("span");
  span.style.color="inherit";
  span.style.fontWeight="inherit";
  span.style.fontSize="inherit";
  span.innerHTML = " [ LOADING... ]";
  span.className = ip;
  font.appendChild(span);
}

function onLoad(event) {
  if(isMobile){
    var sps = document.getElementsByClassName("sp");
    for ( var i = 0,sp; sp = sps[i]; i++ ){
      sp.innerHTML = sp.innerHTML.replace(/(\[?FROM:? {0,5}[0-9a-fA-F\.:]+.\]?)/g, '<font>$1</font>');
    }
  } 
  var fonts = document.getElementsByTagName("font");
  for ( var i = 0,font;font = fonts[i];i++ )
  {
    var result = font.innerHTML.match(/\[?FROM:? {0,5}(&nbsp;)?([0-9a-fA-F\.:]+\*?)\]?/);
    if(result && font.lastChild.nodeName != "SPAN"){
      var ip = result[2].replace("*","0");
      showLoading(ip, font);
      sendRequest(ip, 0);
    }
  }
}

function sendRequest(ip, retry){
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "//pytool.sinaapp.com/geo?type=json&pos=1&ip=" + ip + "&try=" + Math.random(), true);
  xhr.data = ip;
  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4) {
      if (xhr.responseText == ''){
        // fail try again
        if (retry < 5) {
          setTimeout(function(){
            sendRequest(xhr.data, retry + 1);
          }, 100);
        }
      } else {
        var resp = JSON.parse(xhr.responseText);
        var ip = resp['geo']['ip'];
        var loc = resp['geo']['loc'];
        showAddress({'ip': ip,'loc': loc});
      }
    }
  }
  xhr.send();
}

function showAddress(response){
    var spans = document.getElementsByClassName(response.ip);
    for(var i=0,span;span = spans[i];i++){
        span.innerHTML = " [" + response.loc + "] ";
    }
}

if(isMobile === undefined){
  isMobile = window.location.href.indexOf("://m.") >= 0;
}
if(isMobile)
  onLoad();
else
  document.addEventListener("DOMNodeInserted", onLoad, false);