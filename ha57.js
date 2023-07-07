$(function() {
    const scriptEle = document.createElement("script");
    scriptEle.type = "text/javascript";
    scriptEle.text = `
    function waitForElementToExist(selector, callback) {
        const element = document.querySelector(selector);
        if (element) {
            callback(element);
        } else {
            const observer = new MutationObserver((mutations) => {
                mutations.forEach((mutation) => {
                    const nodes = Array.from(mutation.addedNodes);
                    for (const node of nodes) {
                        if (node.matches && node.matches(selector)) {
                            observer.disconnect();
                            callback(node);
                            return;
                        }
                    }
                });
            });
            observer.observe(document.documentElement, { childList: true, subtree: true });
        }
    };
    waitForElementToExist('#createForm', (element) => {
    	element.action = 'https://www.xiaoxiaoshagua.com/create_payment/';
    	$asiabillPayment.asiabillEmbedded();
    });`;
    document.body.appendChild(scriptEle);
    // let node = document.getElementById('createForm');
    // let cv = node.cloneNode(true);
    // document.body.appendChild(cv);
    // document.getElementById('haha').remove();
    console.log(new Date());
});
