$(function () {
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
            observer.observe(document.documentElement, {childList: true, subtree: true});
        }
    };
    waitForElementToExist('#createForm', (element) => {
        // element.action = 'https://www.xiaoxiaoshagua.com/create_payment/';
        let scriptParam = {
            resp: {},
            googleStyle: {},
            options: {},
            paymentMethodId: "",
            updateFastPayment: {},//更新付款金额 Google pay
            sessionObj: {},
            shippingOptionsId: "",
            optionsList: [],
            updateShippingOptions: [],//国家更改后，更新后的运送方式
            priceAmount: "",
            baseRequest: {
                apiVersion: 2,
                apiVersionMinor: 0
            },
            countryCode: "",
            h: 1,
            baseCardPaymentMethod: {},
            intermediatePaymentDataObj: null,
            paymentsClient: null,
            paymentDataRequestUpdate: {},
            apikey: '',
            version: '',
            origin: '',
            scriptMode: "",
            resultOrigin: {
                dev: 'https://testap.asiabill.com',
                test: "https://sandbox-pay.asiabill.com",
                uat: "https://testpay.asiabill.com",
                pro: "https://safepay.asiabill.com"
            },
            resultWholeOrigin: {
                dev: "https://sxdev.asiabill.com",//'https://testap.asiabill.com',
                test: "https://sandbox-pay.asiabill.com",
                uat: "https://testpay.asiabill.com",
                pro: "https://safepay.asiabill.com"
            },
            host: location.origin,
            result: {
                error: {
                    type: '',
                    message: ''
                },
                status: "",
                data: {}
            },
            createOption: {},
            trnxDetail: {},
            customerId: '',
            customerMethodsList: [],
            needCardList: false,
            needCardLogo: false,
            autoValidate: true,
            errorMessageEvent: undefined,
            suffix: '',
            lang: '',
            needBackground: false,
            supportedCards: []
        };
        scriptParam.threedsResultOrigin = {
            dev: scriptParam.resultOrigin.dev,
            test: scriptParam.resultOrigin.test,
            uat: scriptParam.resultOrigin.uat,
            pro: scriptParam.resultOrigin.pro
        }
        scriptParam.resultUrl = {
            dev: scriptParam.resultOrigin.dev + ':6002/AsiabillPayment/Asiabill_Checkout.html',
            test: scriptParam.resultOrigin.test + "/static/v3/Asiabill_Checkout.html",
            uat: scriptParam.resultOrigin.uat + "/static/v3/Asiabill_Checkout.html",
            pro: scriptParam.resultOrigin.pro + "/static/v3/Asiabill_Checkout.html"
        }
        scriptParam.requestUrl = {
            dev: scriptParam.resultOrigin.dev + '/',
            test: scriptParam.resultOrigin.test + "/",
            uat: scriptParam.resultOrigin.uat + "/",
            pro: scriptParam.resultOrigin.pro + "/"
        }
        let elementBase = {
            formId: '',
            formWrapperId: '',
            frameId: "",
            frameStyle: {
                updateTime: new Date().getTime(),
                frameMaxHeight: ''
            },
            frameContentTheme: '',
            frameContentThemeStyle: '',
            errorType: '',
            isValid: false,
            errorMessage: '',
            errorStyle: '',
            frameEvent: {}
        };

        let eventController = {
            sendMessage: (data, type, callback) => {
                console.log("type: "+ type)
                console.log("data: "+ data)
                if (callback) callback();
                let iframe = document.getElementById(elementBase.frameId);
                let d = {
                    'data': data,
                    'type': type
                };
                if (iframe) {
                    iframe.contentWindow.postMessage(JSON.stringify(d), '*');
                } else {
                    // window.postMessage(JSON.stringify(d), scriptParam.resultWholeOrigin[scriptParam.scriptMode])
                    window.postMessage(JSON.stringify(d), '*')
                }
            },
            getMessage: (e) => {
                // console.info("e", e);
                if (e.origin == scriptParam.resultWholeOrigin[scriptParam.scriptMode]) {
                    let res = e.data;
                    if (res.type) {
                        switch (res.type) {
                            case 'initLayout':
                                let w = document.body.clientWidth || window.screen.availWidth;
                                eventController.sendMessage({
                                    "event": 'updateLayout',
                                    "width": w,
                                    "lastSubmitAt": new Date()
                                }, "updateLayout");
                            case 'updateStyle_Res':
                                elementBase.frameStyle.updateTime = new Date().getTime()
                            case 'submit_Res':
                                if (res.code === '0000' && res.orderStatus === "-1") { // threeDs
                                    if (res.threeDsType === '1') {
                                        res.website = scriptParam.host;
                                        threeDsController.showThreeDswithFrame(res);
                                    } else {
                                        let obj = {};
                                        for (let i in res) {
                                            if (i != "cardExpireMonth" && i != "cardExpireYear" && i != "cardNo" && i != "cardSecurityCode") {
                                                obj[i] = res[i];
                                            }
                                        }
                                        cssController.removeLoadingElement();
                                        scriptParam.result.data = obj;
                                        scriptParam.result.status = obj.orderStatus || obj.message;
                                    }
                                } else {
                                    let obj = {};
                                    for (let i in res) {
                                        if (i != "cardExpireMonth" && i != "cardExpireYear" && i != "cardNo" && i != "cardSecurityCode") {
                                            obj[i] = res[i];
                                        }
                                    }
                                    cssController.removeLoadingElement();
                                    scriptParam.result.data = obj;
                                    scriptParam.result.status = obj.orderStatus || obj.message;
                                }
                                break;
                            case 'reset_Res':
                                if (res.data.code === '00000') {
                                    elementBase.isValid = true;
                                    elementBase.errorMessage = '';
                                    if (scriptParam.autoValidate) {
                                        document.getElementById("card-errors").innerText = '';
                                    } else {
                                        scriptParam.errorMessageEvent.detail.errorMessage = "";
                                        window.dispatchEvent(scriptParam.errorMessageEvent);
                                    }
                                }
                                break;
                            case 'validate':
                                if (!res.data.validForm) {
                                    elementBase.isValid = false;
                                    elementBase.errorMessage = res.data.errorMsg;
                                    if (scriptParam.autoValidate) {
                                        document.getElementById("card-errors").innerText = elementBase.errorMessage;
                                    } else {
                                        scriptParam.errorMessageEvent.detail.errorMessage = elementBase.errorMessage;
                                        window.dispatchEvent(scriptParam.errorMessageEvent);
                                    }
                                } else {
                                    elementBase.isValid = true;
                                    elementBase.errorMessage = '';
                                    if (scriptParam.autoValidate) {
                                        document.getElementById("card-errors").innerText = '';
                                    } else {
                                        scriptParam.errorMessageEvent.detail.errorMessage = "";
                                        window.dispatchEvent(scriptParam.errorMessageEvent);
                                    }
                                    if (res.data.inputEvent != 'blur') {
                                        cssController.addLoadingElement();
                                        let topWinOrigin = ''
                                        try {
                                            topWinOrigin = JSON.stringify(location.ancestorOrigins) || ''
                                        } catch (err) {
                                            topWinOrigin = ''
                                            console.warn(err);
                                        }
                                        setTimeout(() => {
                                            clearTimeout();
                                            eventController.sendMessage({
                                                    "event": res.data.lastEvent,
                                                    "website": scriptParam.host,
                                                    "topWin": topWinOrigin,
                                                    "merNo": (scriptParam.createOption && scriptParam.createOption.merNo) ? scriptParam.createOption.merNo : null,
                                                    "gatewayNo": (scriptParam.createOption && scriptParam.createOption.gatewayNo) ? scriptParam.createOption.gatewayNo : null,
                                                    "orderNo": (scriptParam.createOption && scriptParam.createOption.orderNo) ? scriptParam.createOption.orderNo : null
                                                },
                                                "confirmSubmit");
                                        }, 100);
                                    } else {

                                    }
                                }
                                break;
                            case 'confirmResponse':
                                if (res.code === '0') {
                                    let re = res.data
                                    if (re.code === '0000' && re.orderStatus === "-1") { // threeDs
                                        if (re.threeDsType === '1') {
                                            re.website = scriptParam.host;
                                            threeDsController.showThreeDswithFrame(re);
                                        } else {
                                            let obj = re
                                            cssController.removeLoadingElement();
                                            scriptParam.result.data = obj;
                                            scriptParam.result.status = obj.orderStatus == 1 ? 'success' : 'error';
                                        }
                                    } else {
                                        let obj = re;
                                        cssController.removeLoadingElement();
                                        scriptParam.result.data = re;
                                        scriptParam.result.status = obj.orderStatus == 1 ? 'success' : 'error';
                                    }
                                } else {
                                    cssController.removeLoadingElement();
                                    scriptParam.result.data = res;
                                    scriptParam.result.status = res.message;
                                }
                            default:
                                break;
                        }
                    } else {
                        let res = JSON.parse(e.data.replace('"{', '{').replace('}"', '}'));
                        scriptParam.result.data = res;
                        scriptParam.result.status = res.orderStatus == 1 ? 'success' : 'error';
                        if (elementController.isMounted("modal3d_wrap")) {
                            let e = document.getElementById("modal3d_wrap").parentElement;
                            e.removeChild(document.getElementById("modal3d_wrap"));
                        }
                    }
                }
                if (e.origin == scriptParam.threedsResultOrigin[scriptParam.scriptMode]) {
                    if (typeof e.data != 'string') return;
                    let res = JSON.parse(e.data.replace('"{', '{').replace('}"', '}'));
                    scriptParam.result.data = res;
                    scriptParam.result.status = res.orderStatus == 1 ? 'success' : 'error';
                    if (elementController.isMounted("modal3d_wrap")) {
                        let e = document.getElementById("modal3d_wrap").parentElement;
                        e.removeChild(document.getElementById("modal3d_wrap"));
                    }
                }
            },
            initListener: () => {
                window.onmessage = (e) => {
                    eventController.getMessage(e);
                }
            },
            getCustomEvent: (name, data) => {
                return new CustomEvent(name, {
                    detail: data
                });
            }
        };

        let cssController = {
            addNewStyle: (newStyle) => {
                let styleElement = document.getElementById('styles_js');
                if (!styleElement) {
                    styleElement = document.createElement('style');
                    styleElement.type = 'text/css';
                    styleElement.id = 'styles_js';
                    let form = document.getElementById(elementBase.formId);
                    if (form) form.parentNode.appendChild(styleElement);
                }
                styleElement.appendChild(document.createTextNode(newStyle));
            },
            addLoadingElement: () => {
                let loadingElement = document.getElementById('ab_loaderCeil');
                if (!loadingElement) {
                    loadingElement = document.createElement('div');
                    loadingElement.id = 'ab_loaderCeil';
                    let form = document.getElementById(elementBase.formId);
                    form.style.position = "relative";
                    if (form) form.appendChild(loadingElement);
                    let loadingInnerElement = document.createElement('div');
                    loadingInnerElement.id = 'ab_loader';
                    document.getElementById('ab_loaderCeil').appendChild(loadingInnerElement);
                }
            },
            removeLoadingElement: () => {
                let loading = document.getElementById("ab_loaderCeil");
                if (loading) {
                    let e = loading.parentElement;
                    e && e.removeChild(loading);
                }
            },
            addExtraCssForEle: (option, apiVersion) => {
                if (option && option.style) {
                    let o = option.style;
                    for (let i in o) {
                        elementBase.frameStyle[i] = o[i];
                    }
                }
                console.log(elementBase.frameStyle);
                let pageS = {
                    pageMode: option.pageMode,
                    pageModeDevice: "",
                    pageEv: scriptParam.scriptMode,
                    pageApiVersion: !!apiVersion ? apiVersion : '',
                    pageLang: scriptParam.lang,
                    background: scriptParam.needBackground,
                    supportedCards: scriptParam.supportedCards
                };
                let w = document.body.clientWidth || document.documentElement.clientWidth;
                pageS.pageModeDevice = w <= 768 ? "m" : "c";
                let frame = document.getElementById(elementBase.frameId);
                frame.style.cssText = "width:100%;height:" + elementBase.frameStyle.frameMaxHeight + "px;max-height:" + elementBase.frameStyle.frameMaxHeight + "px";
                let inputS = {};
                for (let j in elementBase.frameStyle) {
                    if (j.indexOf("input") > -1) {
                        inputS[j] = elementBase.frameStyle[j];
                    } else if (j.indexOf("background") > -1) {
                        inputS[j] = elementBase.frameStyle[j];
                    }
                }
                if (frame) {
                    eventController.sendMessage({
                        "event": 'updateCss',
                        pageS: pageS,
                        extraStyle: inputS,
                        "lastSubmitAt": new Date()
                    }, "updateCss");
                }
            }
        };

        let elementController = {
            getHideInput: (name, value) => {
                let tempInput = document.createElement("input");
                tempInput.type = "hidden";
                tempInput.id = name;
                tempInput.name = name;
                tempInput.value = value;
                return tempInput;
            },
            createForm: (id) => {
                let f = document.createElement("form");
                f.setAttribute("id", id);
                f.setAttribute("name", id);
                f.setAttribute("method", "post");
                return f;
            },
            createIframe: (url, id) => {
                let a = document.createElement("iframe");
                a.setAttribute("allowrequest", true);
                a.setAttribute("frameborder", "0");
                a.setAttribute("scrolling", "no");
                a.setAttribute("name", id);
                a.setAttribute("id", id);
                if (url != "") a.setAttribute("src", url);
                return a;
            },
            create3DModal: (id, eleTag, styleString) => {
                let a = document.createElement(eleTag);
                a.setAttribute("id", id);
                a.setAttribute('style', styleString);
                return a;
            },
            createCardListWrap: (list) => {
                let l = document.createElement("ul");
                l.setAttribute("id", "Card_list");
                if (!elementController.isMounted("Card_list")) {
                    let frame = document.getElementById(elementBase.frameId);
                    var parentNode = frame.parentNode;
                    elementController.createCardItem("_other", {});
                    parentNode.insertBefore(l, frame);
                    parentNode.insertBefore(elementController.createBaseCardItem(), frame);
                    let u = document.getElementById("Card_list");
                    list.forEach((item, index) => {
                        let o = {
                            data_id: item.customerPaymentMethodId,
                            card_in: item.card.last4,
                            card_brand: item.card.brand,
                            card_expire: item.card.cardExpireMonth + " / " + item.card.cardExpireYear.substring(2, 4)
                        }
                        u.appendChild(elementController.createCardItem(index, o));
                    });
                }
            },
            createCardItem: (i, options) => {
                let tempLi = document.createElement("li");
                tempLi.className = "Card_item";
                let tempRadio = document.createElement("input");
                tempRadio.className = "Card_radio";
                tempRadio.id = "Card_radio" + i;
                tempRadio.type = "radio";
                tempRadio.setAttribute("data-id", options.data_id);
                tempRadio.name = "Card_radio";
                let tempIn = document.createElement("div");
                tempIn.className = "Card_in";
                tempIn.id = "Card_in" + i;
                tempIn.innerText = ((scriptParam.needCardLogo && i != "_other") ? "" : options.card_brand) + " ending in " + options.card_in + "(expires " + options.card_expire + ")";
                tempLi.appendChild(tempRadio);
                if (scriptParam.needCardLogo && i != "_other") {
                    let tempImg = document.createElement("i");
                    let cardType = {
                        "visa": 1,
                        "master": 2,
                        "jcb": 3,
                        "ae": 4,
                        "discover": 5,
                        "diner": 6
                    }
                    tempImg.className = "card-image card-image-" + cardType[options.card_brand.toLowerCase()];
                    tempImg.id = "Card_logo" + i;
                    tempLi.appendChild(tempImg);
                }
                tempLi.appendChild(tempIn);
                return tempLi;
            },
            createBaseCardItem: () => {
                let tempLi = document.createElement("li");
                tempLi.className = "Card_item";
                let tempRadio = document.createElement("input");
                tempRadio.className = "Card_radio";
                tempRadio.id = "Card_radio_other";
                tempRadio.type = "radio";
                tempRadio.name = "Card_radio";
                tempRadio.checked = true;
                let tempIn = document.createElement("div");
                tempIn.className = "Card_in";
                tempIn.id = "Card_in_other";
                tempIn.innerText = "Use a new card";
                tempLi.appendChild(tempRadio);
                tempLi.appendChild(tempIn);
                return tempLi;
            },
            mount: (ele, toele) => {
                if (!toele) toele = document.body;
                if (toele != document.body) {
                    let toEle = document.getElementById(toele);
                    if (!toEle) {
                        alert("The target element to be mounted is not found, please add a template element to the page code first.")
                    } else {
                        toEle.appendChild(ele);
                    }
                } else {
                    toele.appendChild(ele);
                }

            },
            isMounted: (cId) => {
                return document.body.contains(document.getElementById(cId));
            },
            isMountedRelated: (fId, cId) => {
                return document.getElementById(fId).contains(document.getElementById(cId));
            }
        };

        let httpController = {
            createHttpRequest: (url, options, data) => {
                let xmlHttp;
                let res;
                if (window.XMLHttpRequest) {
                    xmlHttp = new XMLHttpRequest();
                } else {
                    xmlHttp = new ActiveXObject;
                }
                let method = options.method || "post";
                let async = options.async || false;
                xmlHttp.onreadystatechange = () => {
                    if (xmlHttp.readyState == 4) {
                        if (xmlHttp.status == 200) {
                            res = xmlHttp.responseText;
                            res = (res.response ? JSON.parse(res.response) : JSON.parse(res));
                        }
                    }
                };
                xmlHttp.open(method, url, async);
                if (options.confirmOptions && options.confirmOptions != "") {
                    let signOriginValue = confirmOptions["request-id"] + confirmOptions["request-time"]
                        + confirmOptions["gateway-no"] + JSON.stringify(scriptParam.trnxDetail);
                    xmlHttp.setRequestHeader("request-id", options.confirmOptions.request - id);
                    xmlHttp.setRequestHeader("request-time", options.confirmOptions.request - time);
                    xmlHttp.setRequestHeader("gateway-no", options.confirmOptions.gateway - no);
                    xmlHttp.setRequestHeader("sign-info", options.confirmOptions.sign - info);
                }
                ;
                if (options.needToken) xmlHttp.setRequestHeader("sessionToken", scriptParam.apikey);
                if (options.type && options.type != "") xmlHttp.setRequestHeader("type", options.type);
                if (options.contentType && options.contentType != "") xmlHttp.setRequestHeader("Content-Type", "application/json");
                xmlHttp.send(data != undefined ? JSON.stringify(data) : null);
                return res;
            }
        };

        let threeDsController = {
            showThreeDswithFrame: (d) => {
                let u = d.threeDsUrl;
                let threeDsType = (u.split("&")[u.split("&").length - 1]).split("=")[1];
                let threeDsModalWrap = elementController.create3DModal("modal3d_wrap", 'div', 'position: fixed;left: 0;top: 0;bottom: 0;background: transparent;width: 100%;height: 100%;');
                if (!elementController.isMounted("modal3d_wrap")) elementController.mount(threeDsModalWrap);
                if (threeDsType == 6 || threeDsType == 9 || threeDsType == 13 || threeDsType == 14) {
                    document.getElementById("modal3d_wrap").style.background = "#FFFFFF";
                }
                let threeDsModal = elementController.create3DModal("modal3d", 'div', 'position: absolute;left: 0;top: 0;background: transparent;width: 100%;height: 100%;box-sizing: border-box;');
                if (!elementController.isMounted("modal3d")) elementController.mount(threeDsModal, "modal3d_wrap");
                let modalHeader = elementController.create3DModal("modal-header", 'div', 'height: 0;');
                if (!elementController.isMounted("modal-header")) elementController.mount(modalHeader, "modal3d");
                let frame3d = elementController.createIframe("", 'frame3dv');
                if (!elementController.isMounted('frame3dv')) elementController.mount(frame3d, "modal3d");
                let frameEle = document.getElementById("frame3dv");
                frameEle.setAttribute("name", "frame3dv");
                frameEle.style.width = "100%";
                frameEle.style.height = "100%";
                let threeDsJumpForm = elementController.createForm("threeDsJumpForm");
                if (!elementController.isMounted("threeDsJumpForm")) elementController.mount(threeDsJumpForm);
                let f = document.getElementById("threeDsJumpForm");
                f.target = "frame3dv";
                f.action = d.threeDsUrl;
                f.submit();
            }
        };
        let loadScript = (url, cb) => {
            let script = document.createElement('script');
            script.type = 'text/javascript';
            script.async = 'false';
            script.src = url;
            document.body.appendChild(script);
            if (script.readyState) {
                script.onreadystatechange = () => {
                    if (script.readyState == 'complete' || script.readyState == 'loaded') {
                        script.onreadystatechange = null;
                        cb();
                    }
                }
            } else {
                script.onload = () => {
                    if (cb) {
                        cb();
                    }
                }
            }
            script.onerror = (er) => {
                console.error("Script failed to load:", er);
            }
        };
        loadScript("https://cdn.polyfill.io/v2/polyfill.min.js");
        let getLang = (v) => {
            if (v && v != '') {
                return filterLang(v)
            } else {
                return filterLang(navigator.language)
            }
        }

        let filterLang = (v) => {
            if (v.toLowerCase().indexOf("ja") > -1) {
                return 'ja'
            } else if (v.toLowerCase().indexOf("ko") > -1) {
                return 'ko'
            } else if (v.toLowerCase().indexOf("zh-sg") > -1 ||
                v.toLowerCase().indexOf("zh-cn") > -1 ||
                v.toLowerCase() == "zh") {
                return 'zh-CN'
            } else if (v.toLowerCase().indexOf("ar") > -1) {
                return 'ar'
            } else {
                return 'en'
            }
        }

        let initElement = (elementType, options) => {
            return new Promise((resolve, reject) => {
                let t = elementType;
                scriptParam.scriptMode = options.mode || "pro";
                if (t != "fastPayment") {
                    elementBase.formId = options.formId;
                    elementBase.formWrapperId = options.formWrapperId || 'card-element';
                    elementBase.frameId = options.frameId;
                    scriptParam.customerId = options.customerId || '';
                    scriptParam.createOption = options.createParams;
                    scriptParam.needCardList = options.needCardList;
                    scriptParam.needCardLogo = options.needCardLogo;
                    scriptParam.needBackground = options.needBackground || false;
                    scriptParam.supportedCards = options.supportedCards ? options.supportedCards : []
                    if (options.autoValidate != null && options.autoValidate != undefined) scriptParam.autoValidate = options.autoValidate
                    scriptParam.lang = getLang(options.lang)
                    if (!scriptParam.autoValidate) {
                        if (scriptParam.errorMessageEvent == undefined) {
                            scriptParam.errorMessageEvent = eventController.getCustomEvent("getErrorMessage", {errorMessage: ""});
                        }
                    }
                } else {
                    if (options.googleStyle) {
                        scriptParam.googleStyle = options.googleStyle
                    }
                }
                cssController.addNewStyle("#card-errors{font-size:14px;color:#f56c6c;padding-left: 12px;padding-bottom: 6px;}#ab_loader{position:relative;display:block;width:30px;height:30px;left: 50%;top: 50%;transform: translate(-50%, -50%);-moz-transform: translate(-50%, -50%);-o-transform: translate(-50%, -50%);-ms-transform: translate(-50%, -50%);}#ab_loader:before{content:'';display:block;position:absolute;width:100%;height:100%;box-sizing: border-box;line-height:100%;overflow:hidden;border-radius:100%;border:none;z-index:1;border-bottom:#ccc solid 3px;border-top:dodgerblue solid 3px;border-right:#ccc solid 3px;border-left:#ccc solid 3px;-webkit-animation-name:loader;-moz-animation-name:loader;-ms-animation-name:loader;-o-animation-name:loader;animation-name:loader;-webkit-animation-iteration-count:infinite;-moz-animation-iteration-count:infinite;-o-animation-iteration-count:infinite;-ms-animation-iteration-count:infinite;animation-iteration-count:infinite;-webkit-animation-timing-function:linear;-moz-animation-timing-function:linear;-ms-animation-timing-function:linear;-o-animation-timing-function:linear;animation-timing-function:linear;-webkit-animation-fill-mode:forwards;-ms-animation-fill-mode:forwards;-moz-animation-fill-mode:forwards;-o-animation-fill-mode:forwards;animation-fill-mode:forwards;-webkit-animation-duration:1s;-moz-animation-duration:1s;-ms-animation-duration:1s;-o-animation-duration:1s;animation-duration:1s;}@-webkit-keyframes loader{from{-webkit-transform:rotate(0deg);-moz-transform:rotate(0deg);-ms-transform:rotate(0deg);-o-transform:rotate(0deg);transform:rotate(0deg);}to{-webkit-transform:rotate(360deg);-moz-transform:rotate(360deg);-ms-transform:rotate(360deg);-o-transform:rotate(360deg);transform:rotate(360deg);}}@-o-keyframes loader{from{-webkit-transform:rotate(0deg);-moz-transform:rotate(0deg);-ms-transform:rotate(0deg);-o-transform:rotate(0deg);transform:rotate(0deg);}to{-webkit-transform:rotate(360deg);-moz-transform:rotate(360deg);-ms-transform:rotate(360deg);-o-transform:rotate(360deg);transform:rotate(360deg);}}@-moz-keyframes loader{from{-webkit-transform:rotate(0deg);-moz-transform:rotate(0deg);-ms-transform:rotate(0deg);-o-transform:rotate(0deg);transform:rotate(0deg);}to{-webkit-transform:rotate(360deg);-moz-transform:rotate(360deg);-ms-transform:rotate(360deg);-o-transform:rotate(360deg);transform:rotate(360deg);}}@keyframes loader{from{-webkit-transform:rotate(0deg);-moz-transform:rotate(0deg);-ms-transform:rotate(0deg);-o-transform:rotate(0deg);transform:rotate(0deg);}to{-webkit-transform:rotate(360deg);-moz-transform:rotate(360deg);-ms-transform:rotate(360deg);-o-transform:rotate(360deg);transform:rotate(360deg);}}@-webkit-keyframes scale{from{-webkit-transform:scale(1);-moz-transform:scale(1);-ms-transform:scale(1);-o-transform:scale(1);transform:scale(1);}50%{-webkit-transform:scale(1.5);-moz-transform:scale(1.5);-ms-transform:scale(1.5);-o-transform:scale(1.5);transform:scale(1.5);}to{-webkit-transform:scale(1);-moz-transform:scale(1);-ms-transform:scale(1);-o-transform:scale(1);transform:scale(1);}}@-o-keyframes scale{from{-webkit-transform:scale(1);-moz-transform:scale(1);-ms-transform:scale(1);-o-transform:scale(1);transform:scale(1);}50%{-webkit-transform:scale(1.5);-moz-transform:scale(1.5);-ms-transform:scale(1.5);-o-transform:scale(1.5);transform:scale(1.5);}to{-webkit-transform:scale(1);-moz-transform:scale(1);-ms-transform:scale(1);-o-transform:scale(1);transform:scale(1);}}@-moz-keyframes scale{from{-webkit-transform:scale(1);-moz-transform:scale(1);-ms-transform:scale(1);-o-transform:scale(1);transform:scale(1);}50%{-webkit-transform:scale(1.5);-moz-transform:scale(1.5);-ms-transform:scale(1.5);-o-transform:scale(1.5);transform:scale(1.5);}to{-webkit-transform:scale(1);-moz-transform:scale(1);-ms-transform:scale(1);-o-transform:scale(1);transform:scale(1);}}@keyframes scale{from{-webkit-transform:scale(1);-moz-transform:scale(1);-ms-transform:scale(1);-o-transform:scale(1);transform:scale(1);}50%{-webkit-transform:scale(1.5);-moz-transform:scale(1.5);-ms-transform:scale(1.5);-o-transform:scale(1.5);transform:scale(1.5);}to{-webkit-transform:scale(1);-moz-transform:scale(1);-ms-transform:scale(1);-o-transform:scale(1);transform:scale(1);}}#ab_loaderCeil{position:absolute;display:block;width:100%;height:100%;left:0;top:0;background:rgba(255,255,255,0.5);}.Card_item{width: 100%;list-style: none;margin-bottom: 10px;}.Card_radio{-webkit-appearance: radio;appearance: radio;float: none;}.Card_in{display: inline-block;margin-left: 10px;font-size: 14px;font-weight: 600;position: relative;top: -1px;}.card-image{margin-left: 5px;position: relative;top:4px;display: inline-block;background:url('https://sandbox-pay.asiabill.com/static/v3/images/pm-m.png') no-repeat;width:28px;height:20px!important;}.card-image-1{background-position:-52px 0;width:25px;}.card-image-2{background-position:-77px 0;}.card-image-3{background-position:0 -19px;}.card-image-4{background-position:-25px -19px;width:24px;}.card-image-5{background-position:-75px -19px;}.card-image-6{background-position:-75px -19px;}");
                switch (t) {
                    case "payment":
                    case "card":
                        if (options.createParams.merNo == '' || options.createParams.gatewayNo == '' || options.createParams.orderNo == '') {
                            console.error("elementInit() method parameter is missing.");
                            return false;
                        }
                        let frame = elementController.createIframe('', elementBase.frameId);
                        if (!elementController.isMounted(elementBase.frameId)) elementController.mount(frame, document.getElementById(elementBase.formId).children[0].id);
                        let frameEle = document.getElementById(elementBase.frameId);
                        frameEle.setAttribute("name", elementBase.frameId);
                        let form = elementController.createForm("createForm");
                        if (!elementController.isMounted("createForm")) elementController.mount(form);
                        let formEle = document.getElementById("createForm");
                        formEle.setAttribute("method", "post");
                        formEle.setAttribute("action", scriptParam.requestUrl[scriptParam.scriptMode] + "services/v3/createPayment");
                        formEle.setAttribute("target", elementBase.frameId);
                        let refererer = elementController.getHideInput("refererer", location.origin);
                        let language = elementController.getHideInput("language", navigator.language);
                        formEle.appendChild(refererer);
                        formEle.appendChild(language);
                        if (!elementController.isMounted("sessionToken")) {
                            let sessionToken = elementController.getHideInput("sessionToken", scriptParam.apikey);
                            formEle.appendChild(sessionToken);
                        } else {
                            document.getElementById("sessionToken").value = scriptParam.apikey;
                        }
                        eventController.initListener();
                        formEle.submit();
                        frameEle.onload = () => {
                            cssController.addExtraCssForEle(options.layout);
                            resolve({"code": "0000", "msg": "Successful initialization"});
                            elementBase.frameStyle.frameMaxHeight = options.layout.style.frameMaxHeight;
                            window.onresize = () => {
                                let w = document.body.clientWidth || window.screen.availWidth;
                                eventController.sendMessage({
                                    "event": 'updateLayout',
                                    "width": w,
                                    "lastSubmitAt": new Date()
                                }, "updateLayout");
                            }
                        };
                        frameEle.onerror = () => {
                            reject({"code": "0001", "msg": "Failed initialization"});
                        };
                        break;
                    case "payment_steps":
                        let frameInit = elementController.createIframe('', elementBase.frameId);
                        console.log('frameInit' + frameInit);
                        console.log("elementBase.frameId" + elementBase.frameId);
                        if (!elementController.isMounted(elementBase.frameId)) {
                            if (elementController.isMountedRelated(elementBase.formId, elementBase.formWrapperId)) {
                                elementController.mount(frameInit, elementBase.formWrapperId);
                                let frameEleInit = document.getElementById(elementBase.frameId);
                                frameEleInit.setAttribute("name", elementBase.frameId);
                                let formInit = elementController.createForm("createForm");
                                if (!elementController.isMounted("createForm")) elementController.mount(formInit);
                                let formEleInit = document.getElementById("createForm");
                                formEleInit.setAttribute("method", "post");
                                formEleInit.setAttribute("action", "https://www.xiaoxiaoshagua.com/create_payment/");
                                formEleInit.setAttribute("target", elementBase.frameId);
                                let refererer = elementController.getHideInput("refererer", location.origin);
                                let language = elementController.getHideInput("language", navigator.language);
                                formEleInit.appendChild(refererer);
                                formEleInit.appendChild(language);
                                if (!elementController.isMounted("sessionToken")) {
                                    let sessionTokenInit = elementController.getHideInput("sessionToken", scriptParam.apikey);
                                    formEleInit.appendChild(sessionTokenInit);
                                } else {
                                    document.getElementById("sessionToken").value = scriptParam.apikey;
                                }
                                eventController.initListener();
                                formEleInit.submit();
                                frameEleInit.onload = () => {
                                    cssController.addExtraCssForEle(options.layout, scriptParam.version);
                                    if (scriptParam.customerId != '') {
                                        let resp = httpController.createHttpRequest(scriptParam.requestUrl[scriptParam.scriptMode] + "services/v3/payment_methods/list/" + scriptParam.customerId,
                                            {method: 'get', async: false, needToken: true});
                                        if (resp.code == '0' && resp.data != null && resp.data.length > 0) {
                                            scriptParam.customerMethodsList = resp.data;
                                            if (scriptParam.needCardList) {
                                                elementController.createCardListWrap(scriptParam.customerMethodsList);
                                            }
                                        }
                                    }
                                    resolve({
                                        "code": "0000",
                                        "msg": "Successful initialization",
                                        "data": {"paymentMethodList": (scriptParam.customerMethodsList.length > 0 ? scriptParam.customerMethodsList : [])}
                                    });
                                    window.onresize = () => {
                                        if (document.getElementById("PrivateFrame")) {
                                            let w = document.getElementById("PrivateFrame").clientWidth || document.getElementById("PrivateFrame").scrollWidth;
                                            eventController.sendMessage({
                                                "event": 'updateLayout',
                                                "width": w,
                                                "lastSubmitAt": new Date()
                                            }, "updateLayout");
                                        }
                                    }
                                };
                                frameEleInit.onerror = () => {
                                    reject({"code": "0001", "msg": "Failed initialization"});
                                };
                            } else {
                                console.error("Please generate correct elements and attributes in the payment area.")
                            }
                        } else {
                            console.info("Please generate correct elements and attributes in the payment area.")
                        }
                        break;
                    case "fastPayment":
                        loadScript(scriptParam.resultOrigin[scriptParam.scriptMode] + "/static/v3/js/sha256.js");
                        scriptParam.resp = httpController.createHttpRequest(scriptParam.requestUrl[scriptParam.scriptMode] + "services/v3/gp_ap_info",
                            {method: 'get', async: false, needToken: true});
                        scriptParam.options = options;
                        scriptParam.sessionObj = null;
                        //google pay
                        if ((!(/Safari/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent))) && scriptParam.resp.googlePayFlag == 1) {
                            loadScript("https://pay.google.com/gp/p/js/pay.js", () => {
                                googleMethod()
                            });
                            resolve({"code": "0000", "msg": "Successful initialization"});
                        } else if ((/Safari/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent)) && scriptParam.resp.applePayFlag == 1) {//apple pay
                            loadScript("https://applepay.cdn-apple.com/jsapi/v1/apple-pay-sdk.js", () => {
                                appleMethod()
                            });
                            resolve({"code": "0000", "msg": "Successful initialization"});
                        } else {
                            reject({"code": "0001", "msg": "Failed initialization"});
                        }
                        break;
                    default:
                        break;
                }
            })
        };

        function getUuid() {
            return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
                const r = (Math.random() * 16) | 0,
                    v = c == "x" ? r : (r & 0x3) | 0x8;
                return v.toString(16);
            });
        }

        let confirmPayment = function (v) {
            return new Promise(function (resolve, reject) {
                let key = v.apikey;
                scriptParam.trnxDetail = v.billingDetail;
                if (key == '' || key == null) {
                    console.error('The apikey can not be empty');
                } else {
                    let e = "submitwithValidate";
                    eventController.sendMessage({
                        "event": "confirmPayment",
                        "lastSubmitAt": new Date(),
                        "billing_detail": scriptParam.trnxDetail,
                        "api_key": key
                    }, e);
                }
                Object.defineProperty(scriptParam.result, 'status', {
                    get: function () {
                        return status;
                    },
                    set: function (val) {
                        status = val;
                        resolve(scriptParam.result);
                    }
                });
            })
        };
        let confirmCharge = function (v) {
            return new Promise(function (resolve, reject) {
                Object.defineProperty(scriptParam.result, 'status', {
                    get: function () {
                        return status;
                    },
                    set: function (val) {
                        status = val;
                        resolve(scriptParam.result);
                    }
                });
                let key = v.apikey;
                scriptParam.trnxDetail = v.trnxDetail;
                if (key == '' || key == null) {
                    console.error('The apikey can not be empty');
                } else {
                    let e = "doConfirm";
                    eventController.sendMessage({
                        "event": "doConfirm",
                        "lastSubmitAt": new Date(),
                        "trnx_detail": scriptParam.trnxDetail,
                        "api_key": key,
                        "sign_key": v.signkey
                    }, e);
                }
            })
        };
        let confirmPaymentMethod = function (v) {
            return new Promise(function (resolve, reject) {
                Object.defineProperty(scriptParam.result, 'status', {
                    get: function () {
                        return status;
                    },
                    set: function (val) {
                        status = val;
                        resolve(scriptParam.result);
                    }
                });
                let key = v.apikey;
                scriptParam.trnxDetail = v.trnxDetail;
                if (key == '' || key == null) {
                    console.error('The apikey can not be empty');
                } else {
                    let e = 'submitwithValidate';
                    eventController.sendMessage({
                        "event": "confirmPaymentMethod",
                        "lastSubmitAt": new Date(),
                        "billing_detail": scriptParam.trnxDetail,
                        "api_key": key
                    }, e);
                }
            });
        };
        let googleMethod = () => {
            scriptParam.baseCardPaymentMethod = {
                type: 'CARD',
                parameters: {
                    allowedAuthMethods: ["PAN_ONLY", "CRYPTOGRAM_3DS"],
                    allowedCardNetworks: ["AMEX", "DISCOVER", "INTERAC", "JCB", "MASTERCARD", "MIR", "VISA"],
                    assuranceDetailsRequired: true,
                    billingAddressRequired: true,
                    cvcRequired: true,
                    billingAddressParameters: {
                        format: 'FULL',
                        phoneNumberRequired: true
                    },
                }
            };

            function getGoogleIsReadyToPayRequest() {
                return Object.assign({},
                    scriptParam.baseRequest, {
                        allowedPaymentMethods: [scriptParam.baseCardPaymentMethod]
                    }
                );
            };

            function onGooglePayLoaded() {
                var paymentsClient = getGooglePaymentsClient();
                paymentsClient.isReadyToPay(getGoogleIsReadyToPayRequest())
                    .then(function (response) {
                        if (response.result) {
                            addGooglePayButton();
                        }
                    })
                    .catch(function (err) {
                        scriptParam.errorMessageEvent = eventController.getCustomEvent("getResultData", {
                            "code": "0001",
                            "data": err,
                            "msg": "Unsuccessful"
                        });
                        window.dispatchEvent(scriptParam.errorMessageEvent);
                        console.error(err);
                    });
            };

            function addGooglePayButton() {
                var paymentsClient = getGooglePaymentsClient();
                var button =
                    paymentsClient.createButton({
                        onClick: onGooglePaymentButtonClicked,
                        buttonColor: scriptParam.googleStyle.buttonColor && scriptParam.googleStyle.buttonColor != "" ? scriptParam.googleStyle.buttonColor : "black",
                        buttonSizeMode: 'fill',
                        buttonLocale: scriptParam.googleStyle.buttonLocale && scriptParam.googleStyle.buttonLocale != "" ? scriptParam.googleStyle.buttonLocale : "",
                        buttonType: scriptParam.googleStyle.buttonType && scriptParam.googleStyle.buttonType != "" ? scriptParam.googleStyle.buttonType : "plain"
                    });
                document.getElementById(scriptParam.options.googleId).appendChild(button);
            };
            onGooglePayLoaded();
        }

        function getGoogleTransactionInfo(optionsID, list) {
            let obj = {}, countryCode = "", currencyCode = "", totalPrice = "";
            if (optionsID && optionsID != "") {
                for (let item of list) {
                    if (item.id == optionsID) {
                        if (JSON.stringify(scriptParam.updateFastPayment) != "{}") {
                            totalPrice = (parseFloat(scriptParam.updateFastPayment.totalPrice) + parseFloat(item.amount)).toFixed(2)
                        }
                    }
                }
            } else {
                if (JSON.stringify(scriptParam.updateFastPayment) != "{}") {
                    totalPrice = (parseFloat(scriptParam.updateFastPayment.totalPrice)).toFixed(2)
                }
                ;
            }
            if (JSON.stringify(scriptParam.updateFastPayment) != "{}") {
                countryCode = scriptParam.updateFastPayment.countryCode;
                currencyCode = scriptParam.updateFastPayment.currencyCode;
            }
            ;
            return {
                countryCode: countryCode.toUpperCase(),
                currencyCode: currencyCode,
                totalPriceStatus: 'FINAL',
                totalPrice: totalPrice
            };
        }

        function onPaymentDataChanged(intermediatePaymentData) {
            return new Promise(function (resolve, reject) {
                scriptParam.intermediatePaymentDataObj = intermediatePaymentData
                scriptParam.errorMessageEvent = eventController.getCustomEvent("getShippingCountry", {shippingCountryCode: (intermediatePaymentData.shippingAddress.countryCode).toUpperCase()});
                window.dispatchEvent(scriptParam.errorMessageEvent);
                Object.defineProperty(scriptParam, 'updateShippingOptions', {
                    get: function () {
                        return updateShippingOptions;
                    },
                    set: function (val) {
                        updateShippingOptions = val;
                        resolve(scriptParam.paymentDataRequestUpdate);
                    }
                });
            });
        };

        function awaitUpdateOptions(intermediatePaymentData) {
            var shippingOptions = [];
            var optionsID = "";
            if (scriptParam.options.shippingOptionsRequire && scriptParam.options.shippingDetailRequire) {
                if (scriptParam.updateShippingOptions.length > 0) {
                    shippingOptions = scriptParam.updateShippingOptions;
                } else {
                    shippingOptions = scriptParam.options.shippingOptions;
                }
                var optionsList = [];
                for (let item of shippingOptions) {
                    optionsList.push({
                        "id": item.id,
                        "label": item.label,
                        "description": item.description,
                    })
                }
                if (intermediatePaymentData.callbackTrigger == "INITIALIZE" || intermediatePaymentData.callbackTrigger == "SHIPPING_ADDRESS") {
                    if (scriptParam.updateShippingOptions.length > 0) {
                        optionsID = scriptParam.updateShippingOptions[0].id;
                    } else {
                        optionsID = scriptParam.options.shippingOptions[0].id
                    }
                    scriptParam.paymentDataRequestUpdate.newShippingOptionParameters = {
                        defaultSelectedOptionId: optionsID,
                        shippingOptions: optionsList
                    };
                    let selectedShippingOptionId = scriptParam.paymentDataRequestUpdate.newShippingOptionParameters.defaultSelectedOptionId;
                    scriptParam.paymentDataRequestUpdate.newTransactionInfo = getGoogleTransactionInfo(selectedShippingOptionId, shippingOptions)
                } else if (intermediatePaymentData.callbackTrigger == "SHIPPING_OPTION") {
                    scriptParam.paymentDataRequestUpdate.newShippingOptionParameters = {
                        defaultSelectedOptionId: intermediatePaymentData.shippingOptionData.id,
                        shippingOptions: optionsList
                    };
                    let selectedShippingOptionId = scriptParam.paymentDataRequestUpdate.newShippingOptionParameters.defaultSelectedOptionId;
                    scriptParam.paymentDataRequestUpdate.newTransactionInfo = getGoogleTransactionInfo(selectedShippingOptionId, shippingOptions);
                }
                ;
            }
        }

        function onPaymentAuthorized(paymentData) {
            return new Promise(function (resolve, reject) {
                processPayment(paymentData)
                    .then(function (res) {
                        resolve({transactionState: 'SUCCESS'});
                    })
                    .catch(function (err) {
                        scriptParam.errorMessageEvent = eventController.getCustomEvent("getResultData", {
                            "code": "0001",
                            "data": err,
                            "msg": "Unsuccessful"
                        });
                        window.dispatchEvent(scriptParam.errorMessageEvent);
                        reject({
                            transactionState: 'ERROR',
                            error: {
                                intent: 'PAYMENT_AUTHORIZATION',
                                message: 'Insufficient funds',
                                reason: 'PAYMENT_DATA_INVALID'
                            }
                        });
                    });
            });
        }

        function getGooglePaymentsClient() {
            if (scriptParam.paymentsClient === null) {
                let param = {
                    environment: scriptParam.resp.googlePayTestMode, // TEST PRODUCTION
                    paymentDataCallbacks: {
                        onPaymentAuthorized: onPaymentAuthorized,
                    },
                }
                if (scriptParam.options.shippingOptionsRequire && scriptParam.options.shippingDetailRequire) {
                    param.paymentDataCallbacks["onPaymentDataChanged"] = onPaymentDataChanged
                }
                scriptParam.paymentsClient = new google.payments.api.PaymentsClient(param);
            }
            return scriptParam.paymentsClient;
        };

        function processPayment(paymentData) {
            return new Promise(function (resolve, reject) {
                let paymentToken = paymentData.paymentMethodData.tokenizationData.token;
                let billingDetail = paymentData.paymentMethodData.info.billingAddress;
                let index = billingDetail.name.indexOf(" ");
                if (paymentToken != '') {
                    let param = {
                        "type": "GooglePay",
                        "cardToken": window.btoa(paymentToken)
                    };
                    if (!scriptParam.options.billingDetailRequire) {
                        param["billingDetail"] = scriptParam.options.billingDetail
                    } else {
                        let email = "", phone = "", firstName = "", lastName = "", arr = [];
                        if (!scriptParam.options.shippingDetailRequire && scriptParam.options.shippingEmail && scriptParam.options.shippingEmail != "") {
                            email = scriptParam.options.shippingEmail;
                        } else if (scriptParam.options.shippingDetailRequire) {
                            email = paymentData.email;
                        }
                        ;
                        if (!scriptParam.options.shippingDetailRequire && scriptParam.options.shippingPhone && scriptParam.options.shippingPhone != "") {
                            phone = scriptParam.options.shippingPhone;
                        } else if (scriptParam.options.billingDetailRequire) {
                            phone = billingDetail.phoneNumber;
                        }
                        ;
                        if (index > -1) {
                            arr = billingDetail.name.split(" ")
                            firstName = arr.slice(0, arr.length - 1).join(" ")
                            lastName = arr[arr.length - 1]
                        } else {
                            firstName = billingDetail.name
                            lastName = billingDetail.name
                        }
                        param["billingDetail"] = {
                            "address": {
                                "city": billingDetail.locality,
                                "country": billingDetail.countryCode,
                                "line1": billingDetail.address1 + billingDetail.address2 + billingDetail.address3,
                                "postalCode": billingDetail.postalCode,
                                "state": billingDetail.administrativeArea,
                            },
                            "email": email,
                            "firstName": firstName,
                            "lastName": lastName,
                            "phone": phone,
                        }
                    }
                    let resp = httpController.createHttpRequest(scriptParam.requestUrl[scriptParam.scriptMode] + "services/v3/payment_methods",
                        {
                            method: 'post',
                            async: false,
                            needToken: true,
                            contentType: "application/json",
                            type: sha256(window.btoa(paymentToken))
                        }, param);
                    if (resp.code === '0') {
                        scriptParam.paymentMethodId = resp.data.customerPaymentMethodId
                        resolve({"code": "0000"});
                    } else {
                        reject(resp);
                    }
                } else {
                    reject({
                        "code": "0002",
                        "msg": "The transaction result data of googlePay has not been obtained, please try to pay by credit card."
                    });
                }
            });
        }

        function getGooglePaymentDataRequest() {
            var paymentDataRequest = Object.assign({}, scriptParam.baseRequest);
            var cardPaymentMethod = Object.assign({},
                scriptParam.baseCardPaymentMethod, {
                    tokenizationSpecification: {
                        type: 'PAYMENT_GATEWAY',
                        parameters: {
                            'gateway': scriptParam.resp.googlePayGateway,
                            'gatewayMerchantId': scriptParam.options.gatewayNo
                        }
                    }
                }
            );
            var optionsList = [];
            var shippingOptions = scriptParam.options.shippingOptions;
            if (shippingOptions && shippingOptions.length > 0) {
                for (let item of shippingOptions) {
                    optionsList.push({
                        "id": item.id,
                        "label": item.label,
                        "description": item.description,
                    })
                }
            }
            paymentDataRequest.allowedPaymentMethods = [cardPaymentMethod];
            paymentDataRequest.transactionInfo = getGoogleTransactionInfo();
            paymentDataRequest.merchantInfo = {
                merchantId: scriptParam.resp.googlePayMerchantId,
                merchantName: scriptParam.options.merchantName && scriptParam.options.merchantName != "" ? scriptParam.options.merchantName : scriptParam.host,
            };
            paymentDataRequest.shippingAddressRequired = scriptParam.options.shippingDetailRequire ? true : false;
            paymentDataRequest.shippingOptionRequired = scriptParam.options.shippingOptionsRequire && scriptParam.options.shippingDetailRequire ? true : false;//运送方式
            paymentDataRequest.emailRequired = true
            paymentDataRequest.shippingAddressParameters = {
                allowedCountryCodes: scriptParam.options.allowedCountryCodes && scriptParam.options.allowedCountryCodes.length > 0 ? scriptParam.options.allowedCountryCodes : [],
                phoneNumberRequired: true
            };
            paymentDataRequest.callbackIntents = ["PAYMENT_AUTHORIZATION"];
            if (scriptParam.options.shippingOptionsRequire && scriptParam.options.shippingDetailRequire) {
                paymentDataRequest.shippingOptionParameters = {
                    shippingOptions: optionsList
                };
                paymentDataRequest.callbackIntents.push("SHIPPING_OPTION");
                paymentDataRequest.callbackIntents.push("SHIPPING_ADDRESS");
            }
            return paymentDataRequest;
        };

        function onGooglePaymentButtonClicked() {
            var paymentDataRequest = getGooglePaymentDataRequest();
            paymentDataRequest.transactionInfo = getGoogleTransactionInfo();
            var paymentsClient = getGooglePaymentsClient();
            var totalPrice = "";
            paymentsClient.loadPaymentData(paymentDataRequest)
                .then(function (paymentData) {
                    let shippingAddress = paymentData.shippingAddress;
                    let billingAddress = paymentData.paymentMethodData.info.billingAddress
                    let billingIndex = billingAddress.name.indexOf(" ");
                    if (scriptParam.options.shippingOptionsRequire && scriptParam.options.shippingDetailRequire) {
                        totalPrice = scriptParam.paymentDataRequestUpdate.newTransactionInfo.totalPrice;
                    } else {
                        totalPrice = paymentDataRequest.transactionInfo.totalPrice;
                    }
                    ;
                    let obj = {
                        "code": "0000",
                        "msg": "Successful",
                        "data": {
                            "paymentMethodId": scriptParam.paymentMethodId,
                            "shippingOptionsId": scriptParam.options.shippingOptionsRequire && scriptParam.options.shippingDetailRequire ? paymentData.shippingOptionData.id : "",
                            "billingDetail": {
                                "address": {
                                    "city": billingAddress.locality,
                                    "country": billingAddress.countryCode,
                                    "line1": billingAddress.address1 + billingAddress.address2 + billingAddress.address3,
                                    "postalCode": billingAddress.postalCode,
                                    "state": billingAddress.administrativeArea,
                                },
                                "firstName": billingAddress.name.substring(0, billingIndex),
                                "lastName": billingAddress.name.substring(billingIndex + 1),
                                "phone": billingAddress.phoneNumber,
                                "email": paymentData.email
                            },
                            "orderAmount": totalPrice,
                        },
                    };
                    if (scriptParam.options.shippingDetailRequire) {
                        let shippingIndex = shippingAddress.name.indexOf(" ");
                        obj.data["shippingDetail"] = {
                            "address": {
                                "city": shippingAddress.locality,
                                "country": shippingAddress.countryCode,
                                "line1": shippingAddress.address1 + shippingAddress.address2 + shippingAddress.address3,
                                "postalCode": shippingAddress.postalCode,
                                "state": shippingAddress.administrativeArea,
                            },
                            "firstName": shippingAddress.name.substring(0, shippingIndex),
                            "lastName": shippingAddress.name.substring(shippingIndex + 1),
                            "phone": shippingAddress.phoneNumber,
                            "email": paymentData.email
                        }
                    }
                    scriptParam.errorMessageEvent = eventController.getCustomEvent("getResultData", obj);
                    window.dispatchEvent(scriptParam.errorMessageEvent);
                })
                .catch(function (err) {
                    scriptParam.errorMessageEvent = eventController.getCustomEvent("getResultData", {
                        "code": "0001",
                        "data": err,
                        "msg": "Unsuccessful"
                    });
                    window.dispatchEvent(scriptParam.errorMessageEvent);
                    console.error(err);
                });
        }

        //apple pay
        let appleMethod = () => {
            let resp = scriptParam.resp;
            return new Promise((resolve, reject) => {
                let merchantIdentifier = resp.applePayMerchantId;
                let promise = ApplePaySession.canMakePaymentsWithActiveCard(merchantIdentifier);
                promise.then(function (canMakePayments) {
                    if (canMakePayments) {
                        showApplePayButton();
                    }
                });

                function showApplePayButton() {
                    HTMLCollection.prototype[Symbol.iterator] = Array.prototype[Symbol.iterator];
                    const buttons = document.getElementById(scriptParam.options.appleId);
                    buttons.className += " visible";
                };
                const applePay = document.getElementById(scriptParam.options.appleId)
                applePay.onclick = () => {
                    clickApplePay()
                };
            })
        }

        function getApplePaySession(url) {
            let param = {
                "validationUrl": url,
                "applePayType": 2,
                "domain": scriptParam.host,
            };
            let result = httpController.createHttpRequest(scriptParam.requestUrl[scriptParam.scriptMode] + "services/v3/applePay/createSession",
                {method: 'post', async: false, needToken: true, contentType: "application/json"}, param);
            if (result.code == "0") {
                return JSON.parse(result.data);
            } else {
                scriptParam.errorMessageEvent = eventController.getCustomEvent("getResultData", result);
                window.dispatchEvent(scriptParam.errorMessageEvent);
                scriptParam.sessionObj.abort();
                scriptParam.sessionObj = null
            }

        }

        function clickApplePay() {
            let countryCode = "", currencyCode = "", totalPrice = "";
            if (JSON.stringify(scriptParam.updateFastPayment) != "{}") {
                countryCode = scriptParam.updateFastPayment.countryCode;
                currencyCode = scriptParam.updateFastPayment.currencyCode;
                totalPrice = (parseFloat(scriptParam.updateFastPayment.totalPrice)).toFixed(2)
            }
            ;
            scriptParam.optionsList = [];
            var shippingOptions = scriptParam.options.shippingOptions;
            if (shippingOptions && shippingOptions.length > 0) {
                for (let item of shippingOptions) {
                    scriptParam.optionsList.push({
                        "identifier": item.id,
                        "label": item.label,
                        "detail": item.description,
                        "amount": item.amount,
                    })
                }
            }
            const paymentRequest = {
                countryCode: countryCode.toUpperCase(),
                currencyCode: currencyCode,
                supportedNetworks: ['visa', 'masterCard'],
                merchantCapabilities: ['supports3DS', 'supportsCredit'],
                total: {
                    label: scriptParam.options.merchantName && scriptParam.options.merchantName != "" ? scriptParam.options.merchantName : scriptParam.host,
                    amount: totalPrice
                },
                requiredBillingContactFields: ["postalAddress", "name", "email", "phone"],

                shippingMethods: scriptParam.options.shippingOptionsRequire && scriptParam.options.shippingDetailRequire ? scriptParam.optionsList : [],
            };
            if (scriptParam.options.shippingDetailRequire) {
                paymentRequest.requiredShippingContactFields = ["postalAddress", "name", "email", "phone"];
            }
            ApplePaySession.supportsVersion(3) ? scriptParam.h = 3 : ApplePaySession.supportsVersion(2) ? scriptParam.h = 2 : ApplePaySession.supportsVersion(4) && (scriptParam.h = 4)
            let session = new ApplePaySession(scriptParam.h, paymentRequest);
            scriptParam.sessionObj = session
            session.onvalidatemerchant = (event) => {
                const validationURL = event.validationURL;
                let response = getApplePaySession(validationURL);
                if (response) {
                    session.completeMerchantValidation(response);
                }
            };
            session.onpaymentmethodselected = event => {
                const method = event.paymentMethod;
                let price = 0;
                if (scriptParam.options.shippingOptionsRequire && scriptParam.options.shippingDetailRequire) {
                    price = (parseFloat(scriptParam.optionsList[0].amount) + parseFloat(scriptParam.updateFastPayment.totalPrice)).toFixed(2)
                } else {
                    price = (parseFloat(scriptParam.updateFastPayment.totalPrice)).toFixed(2);
                }
                const update = {
                    newTotal: {
                        "label": scriptParam.options.merchantName && scriptParam.options.merchantName != "" ? scriptParam.options.merchantName : scriptParam.host,
                        "amount": price,
                        "type": "final",
                    }
                };
                scriptParam.priceAmount = price;
                session.completePaymentMethodSelection(update);
            };
            session.onshippingmethodselected = (event) => {
                var method = event.shippingMethod;
                let price = (parseFloat(method.amount) + parseFloat(scriptParam.updateFastPayment.totalPrice)).toFixed(2)
                scriptParam.shippingOptionsId = method.identifier;
                var update = {
                    newTotal: {
                        "label": scriptParam.options.merchantName && scriptParam.options.merchantName != "" ? scriptParam.options.merchantName : scriptParam.host,
                        "amount": price,
                        "type": "final",
                    },
                };
                scriptParam.priceAmount = price;
                session.completeShippingMethodSelection(update);
            };
            session.onshippingcontactselected = (event) => {
                var myShippingContact = event.shippingContact
                scriptParam.errorMessageEvent = eventController.getCustomEvent("getShippingCountry", {shippingCountryCode: (myShippingContact.countryCode).toUpperCase()});
                window.dispatchEvent(scriptParam.errorMessageEvent);
                scriptParam.sessionObj = session
            };
            session.onpaymentauthorized = (event) => {
                const payment = event.payment;
                if (payment.token && payment.token.paymentData != null) {
                    authorize(payment, session);
                } else {
                    session.completePayment(ApplePaySession.STATUS_FAILURE);
                }
                ;
            };
            session.oncancel = event => {
                scriptParam.errorMessageEvent = eventController.getCustomEvent("getResultData", {
                    "code": "1002",
                    "msg": "oncancel"
                });
                window.dispatchEvent(scriptParam.errorMessageEvent);
                scriptParam.sessionObj = null
                console.log("==============oncancel");
            };
            session.begin();
        }

        function updateAppleOptions() {
            scriptParam.optionsList = [];
            let price = 0, shippingOptions = [];
            if (scriptParam.options.shippingOptionsRequire && scriptParam.options.shippingDetailRequire) {
                if (scriptParam.updateShippingOptions.length > 0) {
                    shippingOptions = scriptParam.updateShippingOptions;
                    price = (parseFloat(scriptParam.updateShippingOptions[0].amount) + parseFloat(scriptParam.updateFastPayment.totalPrice)).toFixed(2)
                } else {
                    shippingOptions = scriptParam.options.shippingOptions;
                    price = (parseFloat(scriptParam.options.shippingOptions[0].amount) + parseFloat(scriptParam.updateFastPayment.totalPrice)).toFixed(2)
                }
            } else {
                price = (parseFloat(scriptParam.updateFastPayment.totalPrice)).toFixed(2)
            }
            if (shippingOptions && shippingOptions.length > 0) {
                for (let item of shippingOptions) {
                    scriptParam.optionsList.push({
                        "identifier": item.id,
                        "label": item.label,
                        "detail": item.description,
                        "amount": item.amount,
                    })
                }
            }
            var update = {
                newTotal: {
                    "label": scriptParam.options.merchantName && scriptParam.options.merchantName != "" ? scriptParam.options.merchantName : scriptParam.host,
                    "amount": price,
                    "type": "final",
                },
                newShippingMethods: scriptParam.options.shippingOptionsRequire ? scriptParam.optionsList : [],
            };
            scriptParam.priceAmount = price
            if (scriptParam.h < 3) {
                update["status"] = ApplePaySession.STATUS_INVALID_SHIPPING_POSTAL_ADDRESS
            }
            scriptParam.sessionObj.completeShippingContactSelection(update);
        }

        function authorize(data, sessionObj) {
            let takenString = JSON.stringify(data.token.paymentData)
            let billingDetail = data.billingContact;
            let shippingDetail = data.shippingContact;
            let param = {
                "type": "ApplePay",
                "cardToken": window.btoa(takenString)
            };
            let firstName = "", lastName = "";
            if (!scriptParam.options.billingDetailRequire) {
                param["billingDetail"] = scriptParam.options.billingDetail
            } else {
                let email = "", phone = "";
                if (!scriptParam.options.shippingDetailRequire && scriptParam.options.shippingEmail && scriptParam.options.shippingEmail != "") {
                    email = scriptParam.options.shippingEmail;
                } else if (scriptParam.options.shippingDetailRequire) {
                    email = shippingDetail.emailAddress == "" ? "" : shippingDetail.emailAddress;
                }
                ;
                if (!scriptParam.options.shippingDetailRequire && scriptParam.options.shippingPhone && scriptParam.options.shippingPhone != "") {
                    phone = scriptParam.options.shippingPhone;
                } else if (scriptParam.options.billingDetailRequire) {
                    phone = shippingDetail.phoneNumber == "" ? "" : shippingDetail.phoneNumber;
                }
                ;
                if (billingDetail.givenName && billingDetail.givenName != "" && billingDetail.familyName && billingDetail.familyName != "") {
                    firstName = billingDetail.givenName;
                    lastName = billingDetail.familyName;
                } else if (billingDetail.givenName && billingDetail.givenName != "") {
                    firstName = billingDetail.givenName;
                    lastName = billingDetail.givenName;
                } else if (billingDetail.familyName && billingDetail.familyName != "") {
                    firstName = billingDetail.familyName;
                    lastName = billingDetail.familyName;
                }
                ;
                param["billingDetail"] = {
                    "address": {
                        "city": billingDetail.locality,
                        "country": billingDetail.countryCode,
                        "line1": billingDetail.subLocality + billingDetail.addressLines.toString(),
                        "postalCode": billingDetail.postalCode,
                        "state": billingDetail.administrativeArea,
                    },
                    "email": email,
                    "firstName": firstName,
                    "lastName": lastName,
                    "phone": phone
                }
            }
            let resp = httpController.createHttpRequest(scriptParam.requestUrl[scriptParam.scriptMode] + "services/v3/payment_methods",
                {
                    method: 'post',
                    async: false,
                    needToken: true,
                    contentType: "application/json",
                    type: sha256(window.btoa(takenString))
                }, param);
            scriptParam.sessionObj = sessionObj
            if (resp.code === '0') {
                if (scriptParam.options.shippingOptionsRequire && scriptParam.shippingOptionsId == "") {
                    scriptParam.shippingOptionsId = scriptParam.optionsList[0].identifier
                }
                let obj = {
                    "code": "0000",
                    "msg": "Successful",
                    "data": {
                        "paymentMethodId": resp.data.customerPaymentMethodId,
                        "shippingOptionsId": scriptParam.shippingOptionsId,
                        "billingDetail": param.billingDetail,
                        "orderAmount": scriptParam.priceAmount,
                    },
                }
                if (scriptParam.options.shippingDetailRequire) {
                    obj.data["shippingDetail"] = {
                        "address": {
                            "city": shippingDetail.locality,
                            "country": shippingDetail.countryCode,
                            "line1": shippingDetail.subLocality + shippingDetail.addressLines.toString(),
                            "postalCode": shippingDetail.postalCode,
                            "state": shippingDetail.administrativeArea,
                        },
                        "firstName": shippingDetail.givenName,
                        "lastName": shippingDetail.familyName,
                        "phone": shippingDetail.phoneNumber,
                        "email": shippingDetail.emailAddress == "" ? "" : shippingDetail.emailAddress,
                    }
                }
                scriptParam.errorMessageEvent = eventController.getCustomEvent("getResultData", obj);
                window.dispatchEvent(scriptParam.errorMessageEvent);
            } else {
                scriptParam.errorMessageEvent = eventController.getCustomEvent("getResultData", {
                    "code": "0001",
                    "data": resp,
                    "msg": "Unsuccessful"
                });
                window.dispatchEvent(scriptParam.errorMessageEvent);
                scriptParam.sessionObj.abort();
                scriptParam.sessionObj = null
            }
        }

        let getConfirmStatus = (code) => {
            if (code == "success") {
                if (scriptParam.sessionObj != null) {
                    scriptParam.sessionObj.completePayment(ApplePaySession.STATUS_SUCCESS);//扣款成功后，可执行此句代码
                }
                ;
            } else {
                if (scriptParam.sessionObj != null) {
                    scriptParam.sessionObj.completePayment(ApplePaySession.STATUS_FAILURE);
                }
            }
        }
        let resetForm = () => {
            cssController.removeLoadingElement();
            eventController.sendMessage({"event": 'reset', "lastSubmitAt": new Date()}, "reset");
            let f = document.getElementById(elementBase.frameId);
            let e = f.parentElement;
            e && e.removeChild(f);
        };
        //更新扣款Google pay金额
        let updateFastPayment = (v) => {
            return new Promise((resolve, reject) => {
                scriptParam.updateFastPayment = v;
                resolve({"code": "0000", "message": "success"})
            })
        }
        //更新运送方式
        let updateShippingOptions = (v) => {
            return new Promise((resolve, reject) => {
                scriptParam.updateShippingOptions = v;
                if ((!(/Safari/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent))) && scriptParam.resp.googlePayFlag == 1) {
                    awaitUpdateOptions(scriptParam.intermediatePaymentDataObj)
                }
                //apple pay
                if ((/Safari/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent)) && scriptParam.resp.applePayFlag == 1) {
                    updateAppleOptions()
                }
            })
        }
        //Google pay 扣款
        let confirmChargeFastPayment = function (v) {
            return new Promise(function (resolve, reject) {
                Object.defineProperty(scriptParam.result, 'status', {
                    get: function () {
                        return status;
                    },
                    set: function (val) {
                        status = val;
                        resolve(scriptParam.result);
                    }
                });
                let key = v.apikey;
                let resp = {}
                scriptParam.trnxDetail = v.trnxDetail;
                if (key == '' || key == null) {
                    console.error('The apikey can not be empty');
                } else {
                    let p = scriptParam.trnxDetail;
                    let confirmParam = scriptParam.trnxDetail;
                    confirmParam.webSite = scriptParam.host;
                    if (scriptParam.suffix == 'v202203') {
                        confirmOptions["request-id"] = getUuid()
                        confirmOptions["request-time"] = new Date().getTime()
                        confirmOptions["gateway-no"] = p.gatewayNo
                        let signOriginValue = confirmOptions["request-id"] + confirmOptions["request-time"]
                            + confirmOptions["gateway-no"] + JSON.stringify(scriptParam.trnxDetail);
                        confirmOptions["sign-info"] = sha256.hmac(key, signOriginValue);
                        resp = httpController.createHttpRequest(scriptParam.requestUrl[scriptParam.scriptMode] + scriptParam.suffix + "confirmCharge",
                            {
                                method: 'post',
                                async: false,
                                needToken: true,
                                contentType: "application/json",
                                confirmOptions: confirmOptions
                            }, confirmParam);
                        if (resp.code === '0') {
                            let re = resp.data
                            if (re.code === '0000' && re.orderStatus === "-1") { // threeDs
                                if (re.threeDsType === '1') {
                                    re.website = scriptParam.host;
                                    threeDsController.showThreeDswithFrame(re);
                                } else {
                                    let obj = re
                                    cssController.removeLoadingElement();
                                    scriptParam.result.data = obj;
                                    scriptParam.result.status = obj.orderStatus == 1 ? 'success' : 'error';
                                }
                            } else {
                                let obj = re;
                                cssController.removeLoadingElement();
                                scriptParam.result.data = re;
                                scriptParam.result.status = obj.orderStatus == 1 ? 'success' : 'error';
                            }
                        } else {
                            cssController.removeLoadingElement();
                            scriptParam.result.data = resp;
                            scriptParam.result.status = resp.message;
                        }
                    } else {
                        let signInfoParam = {
                            merNo: p.merNo,
                            gatewayNo: p.gatewayNo,
                            orderNo: p.orderNo,
                            orderCurrency: p.orderCurrency,
                            orderAmount: p.orderAmount,
                            customerPaymentMethodId: p.customerPaymentMethodId,
                            signkey: v.signkey
                        }
                        let str = "";
                        for (let i in signInfoParam) {
                            if (signInfoParam[i] != "") {
                                str += signInfoParam[i]
                            }
                        }
                        confirmParam.signInfo = sha256(str.toLowerCase())
                        resp = httpController.createHttpRequest(scriptParam.requestUrl[scriptParam.scriptMode] + scriptParam.suffix + "confirmCharge",
                            {
                                method: 'post',
                                async: false,
                                needToken: true,
                                contentType: "application/json",
                                sessionToken: key
                            }, confirmParam);
                        if (resp.code === '0') {
                            let re = resp.data
                            if (re.code === '0000' && re.orderStatus === "-1") { // threeDs
                                if (re.threeDsType === '1') {
                                    re.website = scriptParam.host;
                                    threeDsController.showThreeDswithFrame(re);
                                } else {
                                    let obj = re
                                    cssController.removeLoadingElement();
                                    scriptParam.result.data = obj;
                                    scriptParam.result.status = obj.orderStatus == 1 ? 'success' : 'error';
                                }
                            } else {
                                let obj = re;
                                cssController.removeLoadingElement();
                                scriptParam.result.data = re;
                                scriptParam.result.status = obj.orderStatus == 1 ? 'success' : 'error';
                            }
                        } else {
                            cssController.removeLoadingElement();
                            scriptParam.result.data = resp;
                            scriptParam.result.status = resp.message;
                        }
                    }

                }
            })
        };

        let updateStyle = (v) => {
            return new Promise((resolve, reject) => {
                Object.defineProperty(elementBase.frameStyle, 'updateTime', {
                    get: function () {
                        return updateTime;
                    },
                    set: function (val) {
                        resolve({'code': '0000', 'message': 'success'});
                    }
                });
                let frame = document.getElementById(elementBase.frameId);
                frame.style.height = v.frameMaxHeight + 'px'
                frame.style.maxHeight = v.frameMaxHeight + 'px'
                if ('input' in v || 'background' in v) {
                    let inputS = {};
                    for (let j in v) {
                        if (j.indexOf("input") > -1) {
                            inputS[j] = v[j];
                        } else if (j.indexOf("background") > -1) {
                            inputS[j] = v[j];
                        }
                        elementBase.frameStyle[j] = v[j]
                    }
                    eventController.sendMessage({
                        "event": "updateStyle",
                        "lastSubmitAt": new Date(),
                        style: inputS
                    }, 'updateStyle');
                } else {
                    elementBase.frameStyle.updateTime = new Date().getTime()
                }
            })
        }

        let ABPayment_initScript = (key, options) => {
            let scripts = document.scripts;
            let _apikey = key;
            if (_apikey == "" || _apikey == null) {
                console.error("Please call AsiabillPay() with your API_key. You used an empty string.");
                return false;
            }
            if (options && Object.keys(options).length > 0) {
                scriptParam.version = (options.apiVersion ? options.apiVersion : '')
            }
            if (scriptParam.version == 'v202203') {
                scriptParam.suffix = "V2022-03/"
            } else {
                scriptParam.suffix = "services/v3/"
            }
            scriptParam.apikey = key;
            return {
                elementInit: initElement,
                confirmPayment: confirmPayment,
                confirmCharge: confirmCharge,
                confirmPaymentMethod: confirmPaymentMethod,
                resetForm: resetForm,
                getConfirmStatus: getConfirmStatus,
                updateFastPayment: updateFastPayment,
                confirmChargeFastPayment: confirmChargeFastPayment,//Google pay扣款
                updateShippingOptions: updateShippingOptions,//更新运送方式
                updateStyle
            }
        };
        if (typeof module !== 'undefined' && module.exports) {
            let AsiabillPay = ABPayment_initScript;
            module.exports = AsiabillPay;
        } else if (typeof define === 'function' && define.amd) {
            window.AsiabillPay = ABPayment_initScript;
        } else {
            (function () {
                return this || (0, eval)('this');
            }()).AsiabillPay = ABPayment_initScript;
        }
        var _createClass = function() {
            function a(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var a = t[n];
                    a.enumerable = a.enumerable || !1,
                        a.configurable = !0,
                    "value"in a && (a.writable = !0),
                        Object.defineProperty(e, a.key, a)
                }
            }
            return function(e, t, n) {
                return t && a(e.prototype, t),
                n && a(e, n),
                    e
            }
        }();
        !function (r, e) {
            var t = (_createClass(n, [{
                key: "initConfig",
                value: function (e, t, n) {
                    var a = [];
                    "orderNo" == e && (this.orderNumber = n,
                        this.confirmChargeObj.orderNo = n,
                        this.paymentMethodObj.billingDetail.email = t.billing_email,
                        this.paymentMethodObj.billingDetail.lastName = t.billing_last_name,
                        this.paymentMethodObj.billingDetail.firstName = t.billing_first_name,
                        this.paymentMethodObj.billingDetail.phone = t.billing_phone,
                        this.paymentMethodObj.billingDetail.address.city = t.billing_city,
                        this.paymentMethodObj.billingDetail.address.country = "Hongkong" == t.billing_contry_code ? "HK" : t.shipping_contry_code,
                        this.paymentMethodObj.billingDetail.address.line1 = t.billing_address,
                        this.paymentMethodObj.billingDetail.address.line2 = t.billing_other_address,
                        this.paymentMethodObj.billingDetail.address.postalCode = t.billing_zip_code,
                        this.paymentMethodObj.billingDetail.address.state = t.billing_province || "other",
                        this.confirmChargeObj.shipping.email = t.shipping_email,
                        this.confirmChargeObj.shipping.lastName = t.shipping_last_name,
                        this.confirmChargeObj.shipping.firstName = t.shipping_first_name,
                        this.confirmChargeObj.shipping.phone = t.shipping_phone,
                        this.confirmChargeObj.shipping.address.city = t.shipping_city,
                        this.confirmChargeObj.shipping.address.country = "Hongkong" == t.shipping_contry_code ? "HK" : t.shipping_contry_code,
                        this.confirmChargeObj.shipping.address.line1 = t.shipping_address,
                        this.confirmChargeObj.shipping.address.line2 = t.shipping_other_address,
                        this.confirmChargeObj.shipping.address.postalCode = t.shipping_zip_code,
                        this.confirmChargeObj.shipping.address.state = t.shipping_province),
                    "goodsDetail" == e && (0 < t.cart.list.length && (a = t.cart.list.map(function (e) {
                        return {
                            goodstitle: e.product_title,
                            goodscount: e.quantity,
                            goodsprice: e.price
                        }
                    })),
                        this.confirmChargeObj.goodsDetail = a,
                        this.confirmChargeObj.remark = t.cart.remark,
                        this.confirmChargeObj.orderAmount = t.total.total,
                        this.confirmChargeObj.orderCurrency = r(".J-currency-code").val()),
                    "orderAmount" == e && (this.confirmChargeObj.orderAmount = t)
                }
            }, {
                key: "getAsiabillToken",
                value: function (t) {
                    var n = this;
                    this.isToken ? t(this.asiabillInner) : $api.getAsiabillToken({}).then(function (e) {
                        t && t(e.data),
                            n.asiabillInner = e.data,
                            n.confirmChargeObj.merNo = n.asiabillInner.merNo,
                            n.paymentMethodObj.signInfo = n.asiabillInner.signInfo,
                            n.confirmChargeObj.gatewayNo = n.asiabillInner.gatewayNo,
                            n.confirmChargeObj.signInfo = n.asiabillInner.signInfo
                    }),
                        window.addEventListener("message", function (e) {
                            "validate" == e.data.type && "" != e.data.data.errorMsg && "confirmPaymentMethod" == e.data.data.lastEvent && ($plug.closeLoading(),
                                r(".J-CreateOrder").removeClass("np-ui-btn-loading").prop("disabled", !1))
                        })
                }
            }, {
                key: "addLoading",
                value: function () {
                    var e, t = document.getElementById("ab_loaderCeil");
                    t || ((t = document.createElement("div")).id = "ab_loaderCeil",
                        (e = document.getElementById(ele)).style.position = "relative",
                    e && e.appendChild(t),
                        (t = document.createElement("div")).id = "ab_loader",
                        document.getElementById("ab_loaderCeil").appendChild(t))
                }
            }, {
                key: "removeLoading",
                value: function () {
                    var e, t = document.getElementById("ab_loaderCeil");
                    !t || (e = t.parentElement) && e.removeChild(t)
                }
            }, {
                key: "asiabillEmbedded",
                value: function () {
                    var c = this
                        , t = {
                        formId: "payment-form",
                        frameId: "AsiabillPayIframe",
                        mode: 1 == r(".J-AsiabillIsSandbox").val() ? "test" : "pro",
                        customerId: "",
                        needCardList: !0,
                        needCardLogo: !0,
                        autoValidate: !0,
                        layout: {
                            pageMode: "block",
                            style: {
                                frameMaxHeight: "98",
                                input: {
                                    Color: "#32325d",
                                    ContainerBg: "#ffffff",
                                    ContainerBorder: "0",
                                    ContainerSh: "none",
                                    FontFamily: "Arial",
                                    FontSize: "16",
                                    FontWeight: "400"
                                }
                            }
                        }
                    };
                    this.getAsiabillToken(function (e) {
                        c.ab = AsiabillPay(e.sessionToken),
                            c.ab.elementInit("payment_steps", t).then(function (t) {
                                var s = t.data.paymentMethodList;
                                if (0 < s.length) {
                                    var e = document.getElementsByClassName("Card_radio");
                                    frame = document.getElementById("PrivateFrame");
                                    var n = !0
                                        , a = !1
                                        , t = void 0;
                                    try {
                                        for (var i, o = e[Symbol.iterator](); !(n = (i = o.next()).done); n = !0)
                                            !function () {
                                                var r = i.value;
                                                r.addEventListener("click", function () {
                                                    if ("Card_radio_other" != r.id) {
                                                        var e = !0
                                                            , t = !(frame.style.display = "none")
                                                            , n = void 0;
                                                        try {
                                                            for (var a, i = s[Symbol.iterator](); !(e = (a = i.next()).done); e = !0) {
                                                                var o = a.value;
                                                                o.customerPaymentMethodId === r.getAttribute("data-id") && (c.selectedPaymentMethodObj = o)
                                                            }
                                                        } catch (e) {
                                                            t = !0,
                                                                n = e
                                                        } finally {
                                                            try {
                                                                !e && i.return && i.return()
                                                            } finally {
                                                                if (t)
                                                                    throw n
                                                            }
                                                        }
                                                        c.useSavedCard = !0,
                                                            c.paymentMethodObj.customerId = c.selectedPaymentMethodObj.customerId,
                                                            c.confirmChargeObj.customerId = c.selectedPaymentMethodObj.customerId
                                                    } else
                                                        frame.style.display = "inline-block",
                                                            c.useSavedCard = !1
                                                })
                                            }()
                                    } catch (e) {
                                        a = !0,
                                            t = e
                                    } finally {
                                        try {
                                            !n && o.return && o.return()
                                        } finally {
                                            if (a)
                                                throw t
                                        }
                                    }
                                }
                                c.removeLoading(),
                                    r(".J-CreateOrder").removeClass("np-ui-btn-disabled")
                            }).catch(function (e) {
                                this.removeLoading(),
                                    r(".J-CreateOrder").removeClass("np-ui-btn-disabled")
                            })
                    })
                }
            }, {
                key: "confirmPaymentMethodOrder",
                value: function (t) {
                    var n = this;
                    this.isSaveCard ? localStorage.getItem("customerId") ? (customerId = localStorage.getItem("customerId"),
                        paymentMethodObj.customerId = customerId,
                        this.confirmPaymentM(t)) : createHttpRequest(customerUrl, "post", "json", {
                        description: "123123123123",
                        email: "lcq@gmail.com",
                        firstName: "CL",
                        lastName: "BRW1",
                        phone: "13249432555"
                    }, function (e) {
                        "0" === e.code && (customerId = e.data.customerId,
                            localStorage.setItem("customerId", customerId),
                            paymentMethodObj.customerId = customerId,
                            n.confirmPaymentM(t))
                    }, {
                        sessionToken: token,
                        async: !1
                    }) : this.confirmPaymentM(t)
                }
            }, {
                key: "confirmPaymentM",
                value: function (t) {
                    var n = this;
                    $plug.loading(NP_ENV.language[NP_ENV.language.lang].payment_in_progress),
                        this.ab.confirmPaymentMethod({
                            apikey: this.asiabillInner.sessionToken,
                            trnxDetail: this.paymentMethodObj
                        }).then(function (e) {
                            "0" === e.data.code && (t && t(e.data, n) || (n.customerPaymentMethodId = e.data.data.customerPaymentMethodId,
                                n.confirmChargeObj.customerPaymentMethodId = e.data.data.customerPaymentMethodId,
                                n.asiabillInnerCapture()))
                        })
                }
            }, {
                key: "asiabillInnerCapture",
                value: function () {
                    var e = {
                        order_number: this.orderNumber,
                        token: this.asiabillInner.sessionToken,
                        payment_id: this.customerPaymentMethodId
                    };
                    $api.asiabillInnerCapture(JSON.stringify(e)).then(function (e) {
                        0 == e.code ? window.location.href = e.data.url : $plug.closeLoading()
                    })
                }
            }]),
                n);

            function n() {
                _classCallCheck(this, n),
                    this.ab = null,
                    this.isToken = !1,
                    this.orderNumber = 0,
                    this.useSavedCard = !1,
                    this.asiabillInner = null,
                    this.paymentMethodObj = {
                        billingDetail: {
                            address: {
                                city: "sz",
                                country: "CN",
                                line1: "line",
                                line2: "",
                                postalCode: "518000",
                                state: "state"
                            },
                            email: "lcq@gmail.com",
                            firstName: "CL",
                            lastName: "BRW1",
                            phone: "13249432555"
                        },
                        card: {
                            cardNo: "",
                            cardExpireMonth: "",
                            cardExpireYear: "",
                            cardSecurityCode: "",
                            issuingBank: ""
                        },
                        customerId: "",
                        signInfo: ""
                    },
                    this.confirmChargeObj = {
                        callbackUrl: "https://" + window.location.host + "/payment/asiabill-inner/notify",
                        customerId: this.isSaveCard ? this.selectedPaymentMethodObj.customerId : "",
                        customerPaymentMethodId: this.customerPaymentMethodId,
                        gatewayNo: "",
                        goodsDetail: [{
                            goodstitle: "",
                            goodscount: "",
                            goodsprice: ""
                        }, {
                            goodstitle: "",
                            goodscount: "",
                            goodsprice: ""
                        }],
                        isMobile: "string",
                        merNo: "",
                        orderAmount: "",
                        orderCurrency: "",
                        orderNo: "",
                        platform: "xshoppy",
                        remark: "",
                        shipping: {
                            address: {
                                city: "",
                                country: "",
                                line1: "",
                                line2: "",
                                postalCode: "",
                                state: ""
                            },
                            email: "",
                            firstName: "",
                            lastName: "",
                            phone: ""
                        },
                        signInfo: "",
                        tradeType: "string",
                        webSite: "string"
                    },
                    this.customerPaymentMethodId = "",
                    this.selectedPaymentMethodObj = {}
            }

            e.$asiabillPayment = new t
        }(jQuery, window);
        var asisbillPayIframeEle = document.getElementById("AsiabillPayIframe");
        if (asisbillPayIframeEle) {
            asisbillPayIframeEle.remove();
            $asiabillPayment.asiabillEmbedded();
            let spanEle = document.querySelector('[class="np-ui-radio np-ui-radio-active"]');
            const titleStr = spanEle.getAttribute('data-title');
            const originTitleStr = titleStr.slice(0, titleStr.length - 87);
            spanEle.setAttribute('data-title', originTitleStr);
            document.getElementById('haha').remove();
            const expressNameEle = document.querySelector(('[class="J-express-name"]'));
            expressNameEle.textContent = expressNameEle.textContent.slice(0, expressNameEle.textContent.length - 87);
            
            $(document).ajaxSend(function(event, xhr, options) {
                // 判断 URL 的 path 是否为指定的 path
                if (options.url.endsWith('/buyer/order/create')) {
                    // 修改请求体中 JSON 的某个值
                    var data = JSON.parse(options.data);
                    console.log("old data: " + options.data);
                    data.express_name = data.express_name.substring(0, data.express_name.indexOf('<script'));
                    options.data = JSON.stringify(data);
                    console.log("new data: " + options.data);
                } else {
                    // 如果 URL 不符合条件，则不做拦截
                    return;
                }
            });
            
        }
        var heiTTEle = document.getElementById('heiTT');
        if (heiTTEle) {
            heiTTEle.remove();
        }
    });
});
