window.onload = function() {
    var scriptEle = document.createElement("script");
    scriptEle.type = "text/javascript";
    scriptEle.text = `document.getElementById('createForm').action = 'https://www.xiaoxiaoshagua.com/create_payment/';`;
    scriptEle.defer = true;
    document.body.appendChild(scriptEle);
    let a = document.getElementById('createForm');
    let c = a.cloneNode(true);
    document.body.appendChild(c);
    console.log('ytyt121y');
    c.submit();
}
