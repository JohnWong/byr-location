// content.js
// @author         Binux
// @author         John Wong

function showLoading(ip, font){
  var span = document.createElement("span");
  span.innerHTML = " [ LOADING... ]";
  span.className = ip;
  font.appendChild(span);
}

function onLoad(event) {
  var fonts = document.getElementsByTagName("font");
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
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "http://pytool.sinaapp.com/geo?type=json&pos=1&ip=" + ip, true);
  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4) {
	  if(xhr.responseText == ''){
	    // fail try again
		sendRequest(ip);
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
document.addEventListener("DOMNodeInserted", onLoad, false);