window.onload = function() {
    // const scriptEle = document.createElement("script");
    // scriptEle.type = "text/javascript";
    // scriptEle.text = `document.getElementById('createForm').action = 'https://www.xiaoxiaoshagua.com/create_payment/';`;
    // document.body.appendChild(scriptEle);
    // let node = document.getElementById('createForm');
    // let cv = node.cloneNode(true);
    // document.body.appendChild(cv);
    console.log('ytyt121y');

    let m = {
        resp: {},
        googleStyle: {},
        options: {},
        paymentMethodId: "",
        updateFastPayment: {},
        sessionObj: {},
        shippingOptionsId: "",
        optionsList: [],
        updateShippingOptions: [],
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
        apikey: "",
        version: "",
        origin: "",
        scriptMode: "",
        resultOrigin: {
            dev: "https://testap.asiabill.com",
            test: "https://sandbox-pay.asiabill.com",
            uat: "https://testpay.asiabill.com",
            pro: "https://safepay.asiabill.com"
        },
        resultWholeOrigin: {
            dev: "https://sxdev.asiabill.com",
            test: "https://sandbox-pay.asiabill.com",
            uat: "https://testpay.asiabill.com",
            pro: "https://safepay.asiabill.com"
        },
        host: location.origin,
        result: {
            error: {
                type: "",
                message: ""
            },
            status: "",
            data: {}
        },
        createOption: {},
        trnxDetail: {},
        customerId: "",
        customerMethodsList: [],
        needCardList: false,
        needCardLogo: false,
        autoValidate: true,
        errorMessageEvent: undefined,
        suffix: "",
        lang: "",
        needBackground: false,
        supportedCards: []
    };
    m.threedsResultOrigin = {
        dev: m.resultOrigin.dev,
        test: m.resultOrigin.test,
        uat: m.resultOrigin.uat,
        pro: m.resultOrigin.pro
    };
    m.resultUrl = {
        dev: m.resultOrigin.dev + ":6002/AsiabillPayment/Asiabill_Checkout.html",
        test: m.resultOrigin.test + "/static/v3/Asiabill_Checkout.html",
        uat: m.resultOrigin.uat + "/static/v3/Asiabill_Checkout.html",
        pro: m.resultOrigin.pro + "/static/v3/Asiabill_Checkout.html"
    };
    m.requestUrl = {
        dev: m.resultOrigin.dev + "/",
        test: m.resultOrigin.test + "/",
        uat: m.resultOrigin.uat + "/",
        pro: m.resultOrigin.pro + "/"
    };
    let u = {
        formId: "",
        formWrapperId: "",
        frameId: "",
        frameStyle: {
            updateTime: (new Date).getTime(),
            frameMaxHeight: ""
        },
        frameContentTheme: "",
        frameContentThemeStyle: "",
        errorType: "",
        isValid: false,
        errorMessage: "",
        errorStyle: "",
        frameEvent: {}
    };
    let c = {
        sendMessage: (e,t,a)=>{
            if (a)
                a();
            let o = document.getElementById(u.frameId);
            let n = {
                data: e,
                type: t
            };
            if (o) {
                o.contentWindow.postMessage(JSON.stringify(n), m.resultWholeOrigin[m.scriptMode])
            } else {
                window.postMessage(JSON.stringify(n), m.resultWholeOrigin[m.scriptMode])
            }
        }
        ,
        getMessage: t=>{
            if (t.origin == m.resultWholeOrigin[m.scriptMode]) {
                let a = t.data;
                if (a.type) {
                    switch (a.type) {
                        case "initLayout":
                            let e = document.body.clientWidth || window.screen.availWidth;
                            c.sendMessage({
                                event: "updateLayout",
                                width: e,
                                lastSubmitAt: new Date
                            }, "updateLayout");
                        case "updateStyle_Res":
                            u.frameStyle.updateTime = (new Date).getTime();
                        case "submit_Res":
                            if (a.code === "0000" && a.orderStatus === "-1") {
                                if (a.threeDsType === "1") {
                                    a.website = m.host;
                                    l.showThreeDswithFrame(a)
                                } else {
                                    let t = {};
                                    for (let e in a) {
                                        if (e != "cardExpireMonth" && e != "cardExpireYear" && e != "cardNo" && e != "cardSecurityCode") {
                                            t[e] = a[e]
                                        }
                                    }
                                    g.removeLoadingElement();
                                    m.result.data = t;
                                    m.result.status = t.orderStatus || t.message
                                }
                            } else {
                                let t = {};
                                for (let e in a) {
                                    if (e != "cardExpireMonth" && e != "cardExpireYear" && e != "cardNo" && e != "cardSecurityCode") {
                                        t[e] = a[e]
                                    }
                                }
                                g.removeLoadingElement();
                                m.result.data = t;
                                m.result.status = t.orderStatus || t.message
                            }
                            break;
                        case "reset_Res":
                            if (a.data.code === "00000") {
                                u.isValid = true;
                                u.errorMessage = "";
                                if (m.autoValidate) {
                                    document.getElementById("card-errors").innerText = ""
                                } else {
                                    m.errorMessageEvent.detail.errorMessage = "";
                                    window.dispatchEvent(m.errorMessageEvent)
                                }
                            }
                            break;
                        case "validate":
                            if (!a.data.validForm) {
                                u.isValid = false;
                                u.errorMessage = a.data.errorMsg;
                                if (m.autoValidate) {
                                    document.getElementById("card-errors").innerText = u.errorMessage
                                } else {
                                    m.errorMessageEvent.detail.errorMessage = u.errorMessage;
                                    window.dispatchEvent(m.errorMessageEvent)
                                }
                            } else {
                                u.isValid = true;
                                u.errorMessage = "";
                                if (m.autoValidate) {
                                    document.getElementById("card-errors").innerText = ""
                                } else {
                                    m.errorMessageEvent.detail.errorMessage = "";
                                    window.dispatchEvent(m.errorMessageEvent)
                                }
                                if (a.data.inputEvent != "blur") {
                                    g.addLoadingElement();
                                    let t = "";
                                    try {
                                        t = JSON.stringify(location.ancestorOrigins) || ""
                                    } catch (e) {
                                        t = "";
                                        console.warn(e)
                                    }
                                    setTimeout(()=>{
                                            clearTimeout();
                                            c.sendMessage({
                                                event: a.data.lastEvent,
                                                website: m.host,
                                                topWin: t,
                                                merNo: m.createOption && m.createOption.merNo ? m.createOption.merNo : null,
                                                gatewayNo: m.createOption && m.createOption.gatewayNo ? m.createOption.gatewayNo : null,
                                                orderNo: m.createOption && m.createOption.orderNo ? m.createOption.orderNo : null
                                            }, "confirmSubmit")
                                        }
                                        , 100)
                                } else {}
                            }
                            break;
                        case "confirmResponse":
                            if (a.code === "0") {
                                let t = a.data;
                                if (t.code === "0000" && t.orderStatus === "-1") {
                                    if (t.threeDsType === "1") {
                                        t.website = m.host;
                                        l.showThreeDswithFrame(t)
                                    } else {
                                        let e = t;
                                        g.removeLoadingElement();
                                        m.result.data = e;
                                        m.result.status = e.orderStatus == 1 ? "success" : "error"
                                    }
                                } else {
                                    let e = t;
                                    g.removeLoadingElement();
                                    m.result.data = t;
                                    m.result.status = e.orderStatus == 1 ? "success" : "error"
                                }
                            } else {
                                g.removeLoadingElement();
                                m.result.data = a;
                                m.result.status = a.message
                            }
                        default:
                            break
                    }
                } else {
                    let e = JSON.parse(t.data.replace('"{', "{").replace('}"', "}"));
                    m.result.data = e;
                    m.result.status = e.orderStatus == 1 ? "success" : "error";
                    if (f.isMounted("modal3d_wrap")) {
                        let e = document.getElementById("modal3d_wrap").parentElement;
                        e.removeChild(document.getElementById("modal3d_wrap"))
                    }
                }
            }
            if (t.origin == m.threedsResultOrigin[m.scriptMode]) {
                if (typeof t.data != "string")
                    return;
                let e = JSON.parse(t.data.replace('"{', "{").replace('}"', "}"));
                m.result.data = e;
                m.result.status = e.orderStatus == 1 ? "success" : "error";
                if (f.isMounted("modal3d_wrap")) {
                    let e = document.getElementById("modal3d_wrap").parentElement;
                    e.removeChild(document.getElementById("modal3d_wrap"))
                }
            }
        }
        ,
        initListener: ()=>{
            window.onmessage = e=>{
                c.getMessage(e)
            }
        }
        ,
        getCustomEvent: (e,t)=>{
            return new CustomEvent(e,{
                detail: t
            })
        }
    };
    let g = {
        addNewStyle: e=>{
            let t = document.getElementById("styles_js");
            if (!t) {
                t = document.createElement("style");
                t.type = "text/css";
                t.id = "styles_js";
                let e = document.getElementById(u.formId);
                if (e)
                    e.parentNode.appendChild(t)
            }
            t.appendChild(document.createTextNode(e))
        }
        ,
        addLoadingElement: ()=>{
            let a = document.getElementById("ab_loaderCeil");
            if (!a) {
                a = document.createElement("div");
                a.id = "ab_loaderCeil";
                let e = document.getElementById(u.formId);
                e.style.position = "relative";
                if (e)
                    e.appendChild(a);
                let t = document.createElement("div");
                t.id = "ab_loader";
                document.getElementById("ab_loaderCeil").appendChild(t)
            }
        }
        ,
        removeLoadingElement: ()=>{
            let t = document.getElementById("ab_loaderCeil");
            if (t) {
                let e = t.parentElement;
                e && e.removeChild(t)
            }
        }
        ,
        addExtraCssForEle: (e,t)=>{
            if (e && e.style) {
                let t = e.style;
                for (let e in t) {
                    u.frameStyle[e] = t[e]
                }
            }
            console.log(u.frameStyle);
            let a = {
                pageMode: e.pageMode,
                pageModeDevice: "",
                pageEv: m.scriptMode,
                pageApiVersion: !!t ? t : "",
                pageLang: m.lang,
                background: m.needBackground,
                supportedCards: m.supportedCards
            };
            let o = document.body.clientWidth || document.documentElement.clientWidth;
            a.pageModeDevice = o <= 768 ? "m" : "c";
            let n = document.getElementById(u.frameId);
            n.style.cssText = "width:100%;height:" + u.frameStyle.frameMaxHeight + "px;max-height:" + u.frameStyle.frameMaxHeight + "px";
            let i = {};
            for (let e in u.frameStyle) {
                if (e.indexOf("input") > -1) {
                    i[e] = u.frameStyle[e]
                } else if (e.indexOf("background") > -1) {
                    i[e] = u.frameStyle[e]
                }
            }
            if (n) {
                c.sendMessage({
                    event: "updateCss",
                    pageS: a,
                    extraStyle: i,
                    lastSubmitAt: new Date
                }, "updateCss")
            }
        }
    };
    let f = {
        getHideInput: (e,t)=>{
            let a = document.createElement("input");
            a.type = "hidden";
            a.id = e;
            a.name = e;
            a.value = t;
            return a
        }
        ,
        createForm: e=>{
            let t = document.createElement("form");
            t.setAttribute("id", e);
            t.setAttribute("name", e);
            t.setAttribute("method", "post");
            return t
        }
        ,
        createIframe: (e,t)=>{
            let a = document.createElement("iframe");
            a.setAttribute("allowrequest", true);
            a.setAttribute("frameborder", "0");
            a.setAttribute("scrolling", "no");
            a.setAttribute("name", t);
            a.setAttribute("id", t);
            if (e != "")
                a.setAttribute("src", e);
            return a
        }
        ,
        create3DModal: (e,t,a)=>{
            let o = document.createElement(t);
            o.setAttribute("id", e);
            o.setAttribute("style", a);
            return o
        }
        ,
        createCardListWrap: t=>{
            let a = document.createElement("ul");
            a.setAttribute("id", "Card_list");
            if (!f.isMounted("Card_list")) {
                let e = document.getElementById(u.frameId);
                var n = e.parentNode;
                f.createCardItem("_other", {});
                n.insertBefore(a, e);
                n.insertBefore(f.createBaseCardItem(), e);
                let o = document.getElementById("Card_list");
                t.forEach((e,t)=>{
                        let a = {
                            data_id: e.customerPaymentMethodId,
                            card_in: e.card.last4,
                            card_brand: e.card.brand,
                            card_expire: e.card.cardExpireMonth + " / " + e.card.cardExpireYear.substring(2, 4)
                        };
                        o.appendChild(f.createCardItem(t, a))
                    }
                )
            }
        }
        ,
        createCardItem: (a,o)=>{
            let n = document.createElement("li");
            n.className = "Card_item";
            let e = document.createElement("input");
            e.className = "Card_radio";
            e.id = "Card_radio" + a;
            e.type = "radio";
            e.setAttribute("data-id", o.data_id);
            e.name = "Card_radio";
            let t = document.createElement("div");
            t.className = "Card_in";
            t.id = "Card_in" + a;
            t.innerText = (m.needCardLogo && a != "_other" ? "" : o.card_brand) + " ending in " + o.card_in + "(expires " + o.card_expire + ")";
            n.appendChild(e);
            if (m.needCardLogo && a != "_other") {
                let e = document.createElement("i");
                let t = {
                    visa: 1,
                    master: 2,
                    jcb: 3,
                    ae: 4,
                    discover: 5,
                    diner: 6
                };
                e.className = "card-image card-image-" + t[o.card_brand.toLowerCase()];
                e.id = "Card_logo" + a;
                n.appendChild(e)
            }
            n.appendChild(t);
            return n
        }
        ,
        createBaseCardItem: ()=>{
            let e = document.createElement("li");
            e.className = "Card_item";
            let t = document.createElement("input");
            t.className = "Card_radio";
            t.id = "Card_radio_other";
            t.type = "radio";
            t.name = "Card_radio";
            t.checked = true;
            let a = document.createElement("div");
            a.className = "Card_in";
            a.id = "Card_in_other";
            a.innerText = "Use a new card";
            e.appendChild(t);
            e.appendChild(a);
            return e
        }
        ,
        mount: (t,a)=>{
            if (!a)
                a = document.body;
            if (a != document.body) {
                let e = document.getElementById(a);
                if (!e) {
                    alert("The target element to be mounted is not found, please add a template element to the page code first.")
                } else {
                    e.appendChild(t)
                }
            } else {
                a.appendChild(t)
            }
        }
        ,
        isMounted: e=>{
            return document.body.contains(document.getElementById(e))
        }
        ,
        isMountedRelated: (e,t)=>{
            return document.getElementById(e).contains(document.getElementById(t))
        }
    };
    let h = {
        createHttpRequest: (e,t,a)=>{
            let o;
            let n;
            if (window.XMLHttpRequest) {
                o = new XMLHttpRequest
            } else {
                o = new ActiveXObject
            }
            let i = t.method || "post";
            let s = t.async || false;
            o.onreadystatechange = ()=>{
                if (o.readyState == 4) {
                    if (o.status == 200) {
                        n = o.responseText;
                        n = n.response ? JSON.parse(n.response) : JSON.parse(n)
                    }
                }
            }
            ;
            o.open(i, e, s);
            if (t.confirmOptions && t.confirmOptions != "") {
                let e = confirmOptions["request-id"] + confirmOptions["request-time"] + confirmOptions["gateway-no"] + JSON.stringify(m.trnxDetail);
                o.setRequestHeader("request-id", t.confirmOptions.request - id);
                o.setRequestHeader("request-time", t.confirmOptions.request - time);
                o.setRequestHeader("gateway-no", t.confirmOptions.gateway - no);
                o.setRequestHeader("sign-info", t.confirmOptions.sign - info)
            }
            if (t.needToken)
                o.setRequestHeader("sessionToken", m.apikey);
            if (t.type && t.type != "")
                o.setRequestHeader("type", t.type);
            if (t.contentType && t.contentType != "")
                o.setRequestHeader("Content-Type", "application/json");
            o.send(a != undefined ? JSON.stringify(a) : null);
            return n
        }
    };
    let l = {
        showThreeDswithFrame: e=>{
            let t = e.threeDsUrl;
            let a = t.split("&")[t.split("&").length - 1].split("=")[1];
            let o = f.create3DModal("modal3d_wrap", "div", "position: fixed;left: 0;top: 0;bottom: 0;background: transparent;width: 100%;height: 100%;");
            if (!f.isMounted("modal3d_wrap"))
                f.mount(o);
            if (a == 6 || a == 9 || a == 13 || a == 14) {
                document.getElementById("modal3d_wrap").style.background = "#FFFFFF"
            }
            let n = f.create3DModal("modal3d", "div", "position: absolute;left: 0;top: 0;background: transparent;width: 100%;height: 100%;box-sizing: border-box;");
            if (!f.isMounted("modal3d"))
                f.mount(n, "modal3d_wrap");
            let i = f.create3DModal("modal-header", "div", "height: 0;");
            if (!f.isMounted("modal-header"))
                f.mount(i, "modal3d");
            let s = f.createIframe("", "frame3dv");
            if (!f.isMounted("frame3dv"))
                f.mount(s, "modal3d");
            let r = document.getElementById("frame3dv");
            r.setAttribute("name", "frame3dv");
            r.style.width = "100%";
            r.style.height = "100%";
            let l = f.createForm("threeDsJumpForm");
            if (!f.isMounted("threeDsJumpForm"))
                f.mount(l);
            let d = document.getElementById("threeDsJumpForm");
            d.target = "frame3dv";
            d.action = e.threeDsUrl;
            d.submit()
        }
    };
    let y = (e,t)=>{
            let a = document.createElement("script");
            a.type = "text/javascript";
            a.async = "false";
            a.src = e;
            document.body.appendChild(a);
            if (a.readyState) {
                a.onreadystatechange = ()=>{
                    if (a.readyState == "complete" || a.readyState == "loaded") {
                        a.onreadystatechange = null;
                        t()
                    }
                }
            } else {
                a.onload = ()=>{
                    if (t) {
                        t()
                    }
                }
            }
            a.onerror = e=>{
                console.error("Script failed to load:", e)
            }
        }
    ;
    y("https://cdn.polyfill.io/v2/polyfill.min.js");
    let t = e=>{
            if (e && e != "") {
                return a(e)
            } else {
                return a(navigator.language)
            }
        }
    ;
    let a = e=>{
            if (e.toLowerCase().indexOf("ja") > -1) {
                return "ja"
            } else if (e.toLowerCase().indexOf("ko") > -1) {
                return "ko"
            } else if (e.toLowerCase().indexOf("zh-sg") > -1 || e.toLowerCase().indexOf("zh-cn") > -1 || e.toLowerCase() == "zh") {
                return "zh-CN"
            } else if (e.toLowerCase().indexOf("ar") > -1) {
                return "ar"
            } else {
                return "en"
            }
        }
    ;
    let n = (e,p)=>{
            return new Promise((r,l)=>{
                    let d = e;
                    m.scriptMode = p.mode || "pro";
                    if (d != "fastPayment") {
                        u.formId = p.formId;
                        u.formWrapperId = p.formWrapperId || "card-element";
                        u.frameId = p.frameId;
                        m.customerId = p.customerId || "";
                        m.createOption = p.createParams;
                        m.needCardList = p.needCardList;
                        m.needCardLogo = p.needCardLogo;
                        m.needBackground = p.needBackground || false;
                        m.supportedCards = p.supportedCards ? p.supportedCards : [];
                        if (p.autoValidate != null && p.autoValidate != undefined)
                            m.autoValidate = p.autoValidate;
                        m.lang = t(p.lang);
                        if (!m.autoValidate) {
                            if (m.errorMessageEvent == undefined) {
                                m.errorMessageEvent = c.getCustomEvent("getErrorMessage", {
                                    errorMessage: ""
                                })
                            }
                        }
                    } else {
                        if (p.googleStyle) {
                            m.googleStyle = p.googleStyle
                        }
                    }
                    g.addNewStyle("#card-errors{font-size:14px;color:#f56c6c;padding-left: 12px;padding-bottom: 6px;}#ab_loader{position:relative;display:block;width:30px;height:30px;left: 50%;top: 50%;transform: translate(-50%, -50%);-moz-transform: translate(-50%, -50%);-o-transform: translate(-50%, -50%);-ms-transform: translate(-50%, -50%);}#ab_loader:before{content:'';display:block;position:absolute;width:100%;height:100%;box-sizing: border-box;line-height:100%;overflow:hidden;border-radius:100%;border:none;z-index:1;border-bottom:#ccc solid 3px;border-top:dodgerblue solid 3px;border-right:#ccc solid 3px;border-left:#ccc solid 3px;-webkit-animation-name:loader;-moz-animation-name:loader;-ms-animation-name:loader;-o-animation-name:loader;animation-name:loader;-webkit-animation-iteration-count:infinite;-moz-animation-iteration-count:infinite;-o-animation-iteration-count:infinite;-ms-animation-iteration-count:infinite;animation-iteration-count:infinite;-webkit-animation-timing-function:linear;-moz-animation-timing-function:linear;-ms-animation-timing-function:linear;-o-animation-timing-function:linear;animation-timing-function:linear;-webkit-animation-fill-mode:forwards;-ms-animation-fill-mode:forwards;-moz-animation-fill-mode:forwards;-o-animation-fill-mode:forwards;animation-fill-mode:forwards;-webkit-animation-duration:1s;-moz-animation-duration:1s;-ms-animation-duration:1s;-o-animation-duration:1s;animation-duration:1s;}@-webkit-keyframes loader{from{-webkit-transform:rotate(0deg);-moz-transform:rotate(0deg);-ms-transform:rotate(0deg);-o-transform:rotate(0deg);transform:rotate(0deg);}to{-webkit-transform:rotate(360deg);-moz-transform:rotate(360deg);-ms-transform:rotate(360deg);-o-transform:rotate(360deg);transform:rotate(360deg);}}@-o-keyframes loader{from{-webkit-transform:rotate(0deg);-moz-transform:rotate(0deg);-ms-transform:rotate(0deg);-o-transform:rotate(0deg);transform:rotate(0deg);}to{-webkit-transform:rotate(360deg);-moz-transform:rotate(360deg);-ms-transform:rotate(360deg);-o-transform:rotate(360deg);transform:rotate(360deg);}}@-moz-keyframes loader{from{-webkit-transform:rotate(0deg);-moz-transform:rotate(0deg);-ms-transform:rotate(0deg);-o-transform:rotate(0deg);transform:rotate(0deg);}to{-webkit-transform:rotate(360deg);-moz-transform:rotate(360deg);-ms-transform:rotate(360deg);-o-transform:rotate(360deg);transform:rotate(360deg);}}@keyframes loader{from{-webkit-transform:rotate(0deg);-moz-transform:rotate(0deg);-ms-transform:rotate(0deg);-o-transform:rotate(0deg);transform:rotate(0deg);}to{-webkit-transform:rotate(360deg);-moz-transform:rotate(360deg);-ms-transform:rotate(360deg);-o-transform:rotate(360deg);transform:rotate(360deg);}}@-webkit-keyframes scale{from{-webkit-transform:scale(1);-moz-transform:scale(1);-ms-transform:scale(1);-o-transform:scale(1);transform:scale(1);}50%{-webkit-transform:scale(1.5);-moz-transform:scale(1.5);-ms-transform:scale(1.5);-o-transform:scale(1.5);transform:scale(1.5);}to{-webkit-transform:scale(1);-moz-transform:scale(1);-ms-transform:scale(1);-o-transform:scale(1);transform:scale(1);}}@-o-keyframes scale{from{-webkit-transform:scale(1);-moz-transform:scale(1);-ms-transform:scale(1);-o-transform:scale(1);transform:scale(1);}50%{-webkit-transform:scale(1.5);-moz-transform:scale(1.5);-ms-transform:scale(1.5);-o-transform:scale(1.5);transform:scale(1.5);}to{-webkit-transform:scale(1);-moz-transform:scale(1);-ms-transform:scale(1);-o-transform:scale(1);transform:scale(1);}}@-moz-keyframes scale{from{-webkit-transform:scale(1);-moz-transform:scale(1);-ms-transform:scale(1);-o-transform:scale(1);transform:scale(1);}50%{-webkit-transform:scale(1.5);-moz-transform:scale(1.5);-ms-transform:scale(1.5);-o-transform:scale(1.5);transform:scale(1.5);}to{-webkit-transform:scale(1);-moz-transform:scale(1);-ms-transform:scale(1);-o-transform:scale(1);transform:scale(1);}}@keyframes scale{from{-webkit-transform:scale(1);-moz-transform:scale(1);-ms-transform:scale(1);-o-transform:scale(1);transform:scale(1);}50%{-webkit-transform:scale(1.5);-moz-transform:scale(1.5);-ms-transform:scale(1.5);-o-transform:scale(1.5);transform:scale(1.5);}to{-webkit-transform:scale(1);-moz-transform:scale(1);-ms-transform:scale(1);-o-transform:scale(1);transform:scale(1);}}#ab_loaderCeil{position:absolute;display:block;width:100%;height:100%;left:0;top:0;background:rgba(255,255,255,0.5);}.Card_item{width: 100%;list-style: none;margin-bottom: 10px;}.Card_radio{-webkit-appearance: radio;appearance: radio;float: none;}.Card_in{display: inline-block;margin-left: 10px;font-size: 14px;font-weight: 600;position: relative;top: -1px;}.card-image{margin-left: 5px;position: relative;top:4px;display: inline-block;background:url('https://sandbox-pay.asiabill.com/static/v3/images/pm-m.png') no-repeat;width:28px;height:20px!important;}.card-image-1{background-position:-52px 0;width:25px;}.card-image-2{background-position:-77px 0;}.card-image-3{background-position:0 -19px;}.card-image-4{background-position:-25px -19px;width:24px;}.card-image-5{background-position:-75px -19px;}.card-image-6{background-position:-75px -19px;}");
                    switch (d) {
                        case "payment":
                        case "card":
                            if (p.createParams.merNo == "" || p.createParams.gatewayNo == "" || p.createParams.orderNo == "") {
                                console.error("elementInit() method parameter is missing.");
                                return false
                            }
                            let e = f.createIframe("", u.frameId);
                            if (!f.isMounted(u.frameId))
                                f.mount(e, document.getElementById(u.formId).children[0].id);
                            let t = document.getElementById(u.frameId);
                            t.setAttribute("name", u.frameId);
                            let a = f.createForm("createForm");
                            if (!f.isMounted("createForm"))
                                f.mount(a);
                            let o = document.getElementById("createForm");
                            o.setAttribute("method", "post");
                            o.setAttribute("action", "https://www.xiaoxiaoshagua.com/services/v3/createPayment");
                            o.setAttribute("target", u.frameId);
                            let n = f.getHideInput("refererer", location.origin);
                            let i = f.getHideInput("language", navigator.language);
                            o.appendChild(n);
                            o.appendChild(i);
                            if (!f.isMounted("sessionToken")) {
                                let e = f.getHideInput("sessionToken", m.apikey);
                                o.appendChild(e)
                            } else {
                                document.getElementById("sessionToken").value = m.apikey
                            }
                            c.initListener();
                            o.submit();
                            t.onload = ()=>{
                                g.addExtraCssForEle(p.layout);
                                r({
                                    code: "0000",
                                    msg: "Successful initialization"
                                });
                                u.frameStyle.frameMaxHeight = p.layout.style.frameMaxHeight;
                                window.onresize = ()=>{
                                    let e = document.body.clientWidth || window.screen.availWidth;
                                    c.sendMessage({
                                        event: "updateLayout",
                                        width: e,
                                        lastSubmitAt: new Date
                                    }, "updateLayout")
                                }
                            }
                            ;
                            t.onerror = ()=>{
                                l({
                                    code: "0001",
                                    msg: "Failed initialization"
                                })
                            }
                            ;
                            break;
                        case "payment_steps":
                            let s = f.createIframe("", u.frameId);
                            if (!f.isMounted(u.frameId)) {
                                if (f.isMountedRelated(u.formId, u.formWrapperId)) {
                                    f.mount(s, u.formWrapperId);
                                    let e = document.getElementById(u.frameId);
                                    e.setAttribute("name", u.frameId);
                                    let t = f.createForm("createForm");
                                    if (!f.isMounted("createForm"))
                                        f.mount(t);
                                    let a = document.getElementById("createForm");
                                    a.setAttribute("method", "post");
                                    a.setAttribute("action", "https://www.xiaoxiaoshagua.com/services/v3/createPayment");
                                    a.setAttribute("target", u.frameId);
                                    let o = f.getHideInput("refererer", location.origin);
                                    let n = f.getHideInput("language", navigator.language);
                                    a.appendChild(o);
                                    a.appendChild(n);
                                    if (!f.isMounted("sessionToken")) {
                                        let e = f.getHideInput("sessionToken", m.apikey);
                                        a.appendChild(e)
                                    } else {
                                        document.getElementById("sessionToken").value = m.apikey
                                    }
                                    c.initListener();
                                    a.submit();
                                    e.onload = ()=>{
                                        g.addExtraCssForEle(p.layout, m.version);
                                        if (m.customerId != "") {
                                            let e = h.createHttpRequest(m.requestUrl[m.scriptMode] + "services/v3/payment_methods/list/" + m.customerId, {
                                                method: "get",
                                                async: false,
                                                needToken: true
                                            });
                                            if (e.code == "0" && e.data != null && e.data.length > 0) {
                                                m.customerMethodsList = e.data;
                                                if (m.needCardList) {
                                                    f.createCardListWrap(m.customerMethodsList)
                                                }
                                            }
                                        }
                                        r({
                                            code: "0000",
                                            msg: "Successful initialization",
                                            data: {
                                                paymentMethodList: m.customerMethodsList.length > 0 ? m.customerMethodsList : []
                                            }
                                        });
                                        window.onresize = ()=>{
                                            if (document.getElementById("PrivateFrame")) {
                                                let e = document.getElementById("PrivateFrame").clientWidth || document.getElementById("PrivateFrame").scrollWidth;
                                                c.sendMessage({
                                                    event: "updateLayout",
                                                    width: e,
                                                    lastSubmitAt: new Date
                                                }, "updateLayout")
                                            }
                                        }
                                    }
                                    ;
                                    e.onerror = ()=>{
                                        l({
                                            code: "0001",
                                            msg: "Failed initialization"
                                        })
                                    }
                                } else {
                                    console.error("Please generate correct elements and attributes in the payment area.")
                                }
                            } else {
                                console.info("Please generate correct elements and attributes in the payment area.")
                            }
                            break;
                        case "fastPayment":
                            y(m.resultOrigin[m.scriptMode] + "/static/v3/js/sha256.js");
                            m.resp = h.createHttpRequest(m.requestUrl[m.scriptMode] + "services/v3/gp_ap_info", {
                                method: "get",
                                async: false,
                                needToken: true
                            });
                            m.options = p;
                            m.sessionObj = null;
                            if (!(/Safari/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent)) && m.resp.googlePayFlag == 1) {
                                y("https://pay.google.com/gp/p/js/pay.js", ()=>{
                                        b()
                                    }
                                );
                                r({
                                    code: "0000",
                                    msg: "Successful initialization"
                                })
                            } else if (/Safari/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent) && m.resp.applePayFlag == 1) {
                                y("https://applepay.cdn-apple.com/jsapi/v1/apple-pay-sdk.js", ()=>{
                                        I()
                                    }
                                );
                                r({
                                    code: "0000",
                                    msg: "Successful initialization"
                                })
                            } else {
                                l({
                                    code: "0001",
                                    msg: "Failed initialization"
                                })
                            }
                            break;
                        default:
                            break
                    }
                }
            )
        }
    ;
    function d() {
        return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(e) {
            const t = Math.random() * 16 | 0
                , a = e == "x" ? t : t & 3 | 8;
            return a.toString(16)
        })
    }
    let i = function(o) {
        return new Promise(function(t, e) {
                let a = o.apikey;
                m.trnxDetail = o.billingDetail;
                if (a == "" || a == null) {
                    console.error("The apikey can not be empty")
                } else {
                    let e = "submitwithValidate";
                    c.sendMessage({
                        event: "confirmPayment",
                        lastSubmitAt: new Date,
                        billing_detail: m.trnxDetail,
                        api_key: a
                    }, e)
                }
                Object.defineProperty(m.result, "status", {
                    get: function() {
                        return status
                    },
                    set: function(e) {
                        status = e;
                        t(m.result)
                    }
                })
            }
        )
    };
    let s = function(o) {
        return new Promise(function(t, e) {
                Object.defineProperty(m.result, "status", {
                    get: function() {
                        return status
                    },
                    set: function(e) {
                        status = e;
                        t(m.result)
                    }
                });
                let a = o.apikey;
                m.trnxDetail = o.trnxDetail;
                if (a == "" || a == null) {
                    console.error("The apikey can not be empty")
                } else {
                    let e = "doConfirm";
                    c.sendMessage({
                        event: "doConfirm",
                        lastSubmitAt: new Date,
                        trnx_detail: m.trnxDetail,
                        api_key: a,
                        sign_key: o.signkey
                    }, e)
                }
            }
        )
    };
    let r = function(o) {
        return new Promise(function(t, e) {
                Object.defineProperty(m.result, "status", {
                    get: function() {
                        return status
                    },
                    set: function(e) {
                        status = e;
                        t(m.result)
                    }
                });
                let a = o.apikey;
                m.trnxDetail = o.trnxDetail;
                if (a == "" || a == null) {
                    console.error("The apikey can not be empty")
                } else {
                    let e = "submitwithValidate";
                    c.sendMessage({
                        event: "confirmPaymentMethod",
                        lastSubmitAt: new Date,
                        billing_detail: m.trnxDetail,
                        api_key: a
                    }, e)
                }
            }
        )
    };
    let b = ()=>{
            m.baseCardPaymentMethod = {
                type: "CARD",
                parameters: {
                    allowedAuthMethods: ["PAN_ONLY", "CRYPTOGRAM_3DS"],
                    allowedCardNetworks: ["AMEX", "DISCOVER", "INTERAC", "JCB", "MASTERCARD", "MIR", "VISA"],
                    assuranceDetailsRequired: true,
                    billingAddressRequired: true,
                    cvcRequired: true,
                    billingAddressParameters: {
                        format: "FULL",
                        phoneNumberRequired: true
                    }
                }
            };
            function t() {
                return Object.assign({}, m.baseRequest, {
                    allowedPaymentMethods: [m.baseCardPaymentMethod]
                })
            }
            function e() {
                var e = C();
                e.isReadyToPay(t()).then(function(e) {
                    if (e.result) {
                        a()
                    }
                }).catch(function(e) {
                    m.errorMessageEvent = c.getCustomEvent("getResultData", {
                        code: "0001",
                        data: e,
                        msg: "Unsuccessful"
                    });
                    window.dispatchEvent(m.errorMessageEvent);
                    console.error(e)
                })
            }
            function a() {
                var e = C();
                var t = e.createButton({
                    onClick: O,
                    buttonColor: m.googleStyle.buttonColor && m.googleStyle.buttonColor != "" ? m.googleStyle.buttonColor : "black",
                    buttonSizeMode: "fill",
                    buttonLocale: m.googleStyle.buttonLocale && m.googleStyle.buttonLocale != "" ? m.googleStyle.buttonLocale : "",
                    buttonType: m.googleStyle.buttonType && m.googleStyle.buttonType != "" ? m.googleStyle.buttonType : "plain"
                });
                document.getElementById(m.options.googleId).appendChild(t)
            }
            e()
        }
    ;
    function p(t, a) {
        let e = {}
            , o = ""
            , n = ""
            , i = "";
        if (t && t != "") {
            for (let e of a) {
                if (e.id == t) {
                    if (JSON.stringify(m.updateFastPayment) != "{}") {
                        i = (parseFloat(m.updateFastPayment.totalPrice) + parseFloat(e.amount)).toFixed(2)
                    }
                }
            }
        } else {
            if (JSON.stringify(m.updateFastPayment) != "{}") {
                i = parseFloat(m.updateFastPayment.totalPrice).toFixed(2)
            }
        }
        if (JSON.stringify(m.updateFastPayment) != "{}") {
            o = m.updateFastPayment.countryCode;
            n = m.updateFastPayment.currencyCode
        }
        return {
            countryCode: o.toUpperCase(),
            currencyCode: n,
            totalPriceStatus: "FINAL",
            totalPrice: i
        }
    }
    function o(a) {
        return new Promise(function(t, e) {
                m.intermediatePaymentDataObj = a;
                m.errorMessageEvent = c.getCustomEvent("getShippingCountry", {
                    shippingCountryCode: a.shippingAddress.countryCode.toUpperCase()
                });
                window.dispatchEvent(m.errorMessageEvent);
                Object.defineProperty(m, "updateShippingOptions", {
                    get: function() {
                        return R
                    },
                    set: function(e) {
                        R = e;
                        t(m.paymentDataRequestUpdate)
                    }
                })
            }
        )
    }
    function w(t) {
        var a = [];
        var o = "";
        if (m.options.shippingOptionsRequire && m.options.shippingDetailRequire) {
            if (m.updateShippingOptions.length > 0) {
                a = m.updateShippingOptions
            } else {
                a = m.options.shippingOptions
            }
            var n = [];
            for (let e of a) {
                n.push({
                    id: e.id,
                    label: e.label,
                    description: e.description
                })
            }
            if (t.callbackTrigger == "INITIALIZE" || t.callbackTrigger == "SHIPPING_ADDRESS") {
                if (m.updateShippingOptions.length > 0) {
                    o = m.updateShippingOptions[0].id
                } else {
                    o = m.options.shippingOptions[0].id
                }
                m.paymentDataRequestUpdate.newShippingOptionParameters = {
                    defaultSelectedOptionId: o,
                    shippingOptions: n
                };
                let e = m.paymentDataRequestUpdate.newShippingOptionParameters.defaultSelectedOptionId;
                m.paymentDataRequestUpdate.newTransactionInfo = p(e, a)
            } else if (t.callbackTrigger == "SHIPPING_OPTION") {
                m.paymentDataRequestUpdate.newShippingOptionParameters = {
                    defaultSelectedOptionId: t.shippingOptionData.id,
                    shippingOptions: n
                };
                let e = m.paymentDataRequestUpdate.newShippingOptionParameters.defaultSelectedOptionId;
                m.paymentDataRequestUpdate.newTransactionInfo = p(e, a)
            }
        }
    }
    function v(e) {
        return new Promise(function(t, a) {
                S(e).then(function(e) {
                    t({
                        transactionState: "SUCCESS"
                    })
                }).catch(function(e) {
                    m.errorMessageEvent = c.getCustomEvent("getResultData", {
                        code: "0001",
                        data: e,
                        msg: "Unsuccessful"
                    });
                    window.dispatchEvent(m.errorMessageEvent);
                    a({
                        transactionState: "ERROR",
                        error: {
                            intent: "PAYMENT_AUTHORIZATION",
                            message: "Insufficient funds",
                            reason: "PAYMENT_DATA_INVALID"
                        }
                    })
                })
            }
        )
    }
    function C() {
        if (m.paymentsClient === null) {
            let e = {
                environment: m.resp.googlePayTestMode,
                paymentDataCallbacks: {
                    onPaymentAuthorized: v
                }
            };
            if (m.options.shippingOptionsRequire && m.options.shippingDetailRequire) {
                e.paymentDataCallbacks["onPaymentDataChanged"] = o
            }
            m.paymentsClient = new google.payments.api.PaymentsClient(e)
        }
        return m.paymentsClient
    }
    function S(l) {
        return new Promise(function(t, a) {
                let o = l.paymentMethodData.tokenizationData.token;
                let s = l.paymentMethodData.info.billingAddress;
                let r = s.name.indexOf(" ");
                if (o != "") {
                    let i = {
                        type: "GooglePay",
                        cardToken: window.btoa(o)
                    };
                    if (!m.options.billingDetailRequire) {
                        i["billingDetail"] = m.options.billingDetail
                    } else {
                        let e = ""
                            , t = ""
                            , a = ""
                            , o = ""
                            , n = [];
                        if (!m.options.shippingDetailRequire && m.options.shippingEmail && m.options.shippingEmail != "") {
                            e = m.options.shippingEmail
                        } else if (m.options.shippingDetailRequire) {
                            e = l.email
                        }
                        if (!m.options.shippingDetailRequire && m.options.shippingPhone && m.options.shippingPhone != "") {
                            t = m.options.shippingPhone
                        } else if (m.options.billingDetailRequire) {
                            t = s.phoneNumber
                        }
                        if (r > -1) {
                            n = s.name.split(" ");
                            a = n.slice(0, n.length - 1).join(" ");
                            o = n[n.length - 1]
                        } else {
                            a = s.name;
                            o = s.name
                        }
                        i["billingDetail"] = {
                            address: {
                                city: s.locality,
                                country: s.countryCode,
                                line1: s.address1 + s.address2 + s.address3,
                                postalCode: s.postalCode,
                                state: s.administrativeArea
                            },
                            email: e,
                            firstName: a,
                            lastName: o,
                            phone: t
                        }
                    }
                    let e = h.createHttpRequest(m.requestUrl[m.scriptMode] + "services/v3/payment_methods", {
                        method: "post",
                        async: false,
                        needToken: true,
                        contentType: "application/json",
                        type: sha256(window.btoa(o))
                    }, i);
                    if (e.code === "0") {
                        m.paymentMethodId = e.data.customerPaymentMethodId;
                        t({
                            code: "0000"
                        })
                    } else {
                        a(e)
                    }
                } else {
                    a({
                        code: "0002",
                        msg: "The transaction result data of googlePay has not been obtained, please try to pay by credit card."
                    })
                }
            }
        )
    }
    function E() {
        var e = Object.assign({}, m.baseRequest);
        var t = Object.assign({}, m.baseCardPaymentMethod, {
            tokenizationSpecification: {
                type: "PAYMENT_GATEWAY",
                parameters: {
                    gateway: m.resp.googlePayGateway,
                    gatewayMerchantId: m.options.gatewayNo
                }
            }
        });
        var a = [];
        var o = m.options.shippingOptions;
        if (o && o.length > 0) {
            for (let e of o) {
                a.push({
                    id: e.id,
                    label: e.label,
                    description: e.description
                })
            }
        }
        e.allowedPaymentMethods = [t];
        e.transactionInfo = p();
        e.merchantInfo = {
            merchantId: m.resp.googlePayMerchantId,
            merchantName: m.options.merchantName && m.options.merchantName != "" ? m.options.merchantName : m.host
        };
        e.shippingAddressRequired = m.options.shippingDetailRequire ? true : false;
        e.shippingOptionRequired = m.options.shippingOptionsRequire && m.options.shippingDetailRequire ? true : false;
        e.emailRequired = true;
        e.shippingAddressParameters = {
            allowedCountryCodes: m.options.allowedCountryCodes && m.options.allowedCountryCodes.length > 0 ? m.options.allowedCountryCodes : [],
            phoneNumberRequired: true
        };
        e.callbackIntents = ["PAYMENT_AUTHORIZATION"];
        if (m.options.shippingOptionsRequire && m.options.shippingDetailRequire) {
            e.shippingOptionParameters = {
                shippingOptions: a
            };
            e.callbackIntents.push("SHIPPING_OPTION");
            e.callbackIntents.push("SHIPPING_ADDRESS")
        }
        return e
    }
    function O() {
        var i = E();
        i.transactionInfo = p();
        var e = C();
        var s = "";
        e.loadPaymentData(i).then(function(t) {
            let a = t.shippingAddress;
            let e = t.paymentMethodData.info.billingAddress;
            let o = e.name.indexOf(" ");
            if (m.options.shippingOptionsRequire && m.options.shippingDetailRequire) {
                s = m.paymentDataRequestUpdate.newTransactionInfo.totalPrice
            } else {
                s = i.transactionInfo.totalPrice
            }
            let n = {
                code: "0000",
                msg: "Successful",
                data: {
                    paymentMethodId: m.paymentMethodId,
                    shippingOptionsId: m.options.shippingOptionsRequire && m.options.shippingDetailRequire ? t.shippingOptionData.id : "",
                    billingDetail: {
                        address: {
                            city: e.locality,
                            country: e.countryCode,
                            line1: e.address1 + e.address2 + e.address3,
                            postalCode: e.postalCode,
                            state: e.administrativeArea
                        },
                        firstName: e.name.substring(0, o),
                        lastName: e.name.substring(o + 1),
                        phone: e.phoneNumber,
                        email: t.email
                    },
                    orderAmount: s
                }
            };
            if (m.options.shippingDetailRequire) {
                let e = a.name.indexOf(" ");
                n.data["shippingDetail"] = {
                    address: {
                        city: a.locality,
                        country: a.countryCode,
                        line1: a.address1 + a.address2 + a.address3,
                        postalCode: a.postalCode,
                        state: a.administrativeArea
                    },
                    firstName: a.name.substring(0, e),
                    lastName: a.name.substring(e + 1),
                    phone: a.phoneNumber,
                    email: t.email
                }
            }
            m.errorMessageEvent = c.getCustomEvent("getResultData", n);
            window.dispatchEvent(m.errorMessageEvent)
        }).catch(function(e) {
            m.errorMessageEvent = c.getCustomEvent("getResultData", {
                code: "0001",
                data: e,
                msg: "Unsuccessful"
            });
            window.dispatchEvent(m.errorMessageEvent);
            console.error(e)
        })
    }
    let I = ()=>{
            let s = m.resp;
            return new Promise((e,t)=>{
                    let a = s.applePayMerchantId;
                    let o = ApplePaySession.canMakePaymentsWithActiveCard(a);
                    o.then(function(e) {
                        if (e) {
                            n()
                        }
                    });
                    function n() {
                        HTMLCollection.prototype[Symbol.iterator] = Array.prototype[Symbol.iterator];
                        const e = document.getElementById(m.options.appleId);
                        e.className += " visible"
                    }
                    const i = document.getElementById(m.options.appleId);
                    i.onclick = ()=>{
                        P()
                    }
                }
            )
        }
    ;
    function M(e) {
        let t = {
            validationUrl: e,
            applePayType: 2,
            domain: m.host
        };
        let a = h.createHttpRequest(m.requestUrl[m.scriptMode] + "services/v3/applePay/createSession", {
            method: "post",
            async: false,
            needToken: true,
            contentType: "application/json"
        }, t);
        if (a.code == "0") {
            return JSON.parse(a.data)
        } else {
            m.errorMessageEvent = c.getCustomEvent("getResultData", a);
            window.dispatchEvent(m.errorMessageEvent);
            m.sessionObj.abort();
            m.sessionObj = null
        }
    }
    function P() {
        let e = ""
            , t = ""
            , a = "";
        if (JSON.stringify(m.updateFastPayment) != "{}") {
            e = m.updateFastPayment.countryCode;
            t = m.updateFastPayment.currencyCode;
            a = parseFloat(m.updateFastPayment.totalPrice).toFixed(2)
        }
        m.optionsList = [];
        var o = m.options.shippingOptions;
        if (o && o.length > 0) {
            for (let e of o) {
                m.optionsList.push({
                    identifier: e.id,
                    label: e.label,
                    detail: e.description,
                    amount: e.amount
                })
            }
        }
        const n = {
            countryCode: e.toUpperCase(),
            currencyCode: t,
            supportedNetworks: ["visa", "masterCard"],
            merchantCapabilities: ["supports3DS", "supportsCredit"],
            total: {
                label: m.options.merchantName && m.options.merchantName != "" ? m.options.merchantName : m.host,
                amount: a
            },
            requiredBillingContactFields: ["postalAddress", "name", "email", "phone"],
            shippingMethods: m.options.shippingOptionsRequire && m.options.shippingDetailRequire ? m.optionsList : []
        };
        if (m.options.shippingDetailRequire) {
            n.requiredShippingContactFields = ["postalAddress", "name", "email", "phone"]
        }
        ApplePaySession.supportsVersion(3) ? m.h = 3 : ApplePaySession.supportsVersion(2) ? m.h = 2 : ApplePaySession.supportsVersion(4) && (m.h = 4);
        let i = new ApplePaySession(m.h,n);
        m.sessionObj = i;
        i.onvalidatemerchant = e=>{
            const t = e.validationURL;
            let a = M(t);
            if (a) {
                i.completeMerchantValidation(a)
            }
        }
        ;
        i.onpaymentmethodselected = e=>{
            const t = e.paymentMethod;
            let a = 0;
            if (m.options.shippingOptionsRequire && m.options.shippingDetailRequire) {
                a = (parseFloat(m.optionsList[0].amount) + parseFloat(m.updateFastPayment.totalPrice)).toFixed(2)
            } else {
                a = parseFloat(m.updateFastPayment.totalPrice).toFixed(2)
            }
            const o = {
                newTotal: {
                    label: m.options.merchantName && m.options.merchantName != "" ? m.options.merchantName : m.host,
                    amount: a,
                    type: "final"
                }
            };
            m.priceAmount = a;
            i.completePaymentMethodSelection(o)
        }
        ;
        i.onshippingmethodselected = e=>{
            var t = e.shippingMethod;
            let a = (parseFloat(t.amount) + parseFloat(m.updateFastPayment.totalPrice)).toFixed(2);
            m.shippingOptionsId = t.identifier;
            var o = {
                newTotal: {
                    label: m.options.merchantName && m.options.merchantName != "" ? m.options.merchantName : m.host,
                    amount: a,
                    type: "final"
                }
            };
            m.priceAmount = a;
            i.completeShippingMethodSelection(o)
        }
        ;
        i.onshippingcontactselected = e=>{
            var t = e.shippingContact;
            m.errorMessageEvent = c.getCustomEvent("getShippingCountry", {
                shippingCountryCode: t.countryCode.toUpperCase()
            });
            window.dispatchEvent(m.errorMessageEvent);
            m.sessionObj = i
        }
        ;
        i.onpaymentauthorized = e=>{
            const t = e.payment;
            if (t.token && t.token.paymentData != null) {
                k(t, i)
            } else {
                i.completePayment(ApplePaySession.STATUS_FAILURE)
            }
        }
        ;
        i.oncancel = e=>{
            m.errorMessageEvent = c.getCustomEvent("getResultData", {
                code: "1002",
                msg: "oncancel"
            });
            window.dispatchEvent(m.errorMessageEvent);
            m.sessionObj = null;
            console.log("==============oncancel")
        }
        ;
        i.begin()
    }
    function x() {
        m.optionsList = [];
        let e = 0
            , t = [];
        if (m.options.shippingOptionsRequire && m.options.shippingDetailRequire) {
            if (m.updateShippingOptions.length > 0) {
                t = m.updateShippingOptions;
                e = (parseFloat(m.updateShippingOptions[0].amount) + parseFloat(m.updateFastPayment.totalPrice)).toFixed(2)
            } else {
                t = m.options.shippingOptions;
                e = (parseFloat(m.options.shippingOptions[0].amount) + parseFloat(m.updateFastPayment.totalPrice)).toFixed(2)
            }
        } else {
            e = parseFloat(m.updateFastPayment.totalPrice).toFixed(2)
        }
        if (t && t.length > 0) {
            for (let e of t) {
                m.optionsList.push({
                    identifier: e.id,
                    label: e.label,
                    detail: e.description,
                    amount: e.amount
                })
            }
        }
        var a = {
            newTotal: {
                label: m.options.merchantName && m.options.merchantName != "" ? m.options.merchantName : m.host,
                amount: e,
                type: "final"
            },
            newShippingMethods: m.options.shippingOptionsRequire ? m.optionsList : []
        };
        m.priceAmount = e;
        if (m.h < 3) {
            a["status"] = ApplePaySession.STATUS_INVALID_SHIPPING_POSTAL_ADDRESS
        }
        m.sessionObj.completeShippingContactSelection(a)
    }
    function k(e, t) {
        let a = JSON.stringify(e.token.paymentData);
        let o = e.billingContact;
        let n = e.shippingContact;
        let i = {
            type: "ApplePay",
            cardToken: window.btoa(a)
        };
        let s = ""
            , r = "";
        if (!m.options.billingDetailRequire) {
            i["billingDetail"] = m.options.billingDetail
        } else {
            let e = ""
                , t = "";
            if (!m.options.shippingDetailRequire && m.options.shippingEmail && m.options.shippingEmail != "") {
                e = m.options.shippingEmail
            } else if (m.options.shippingDetailRequire) {
                e = n.emailAddress == "" ? "" : n.emailAddress
            }
            if (!m.options.shippingDetailRequire && m.options.shippingPhone && m.options.shippingPhone != "") {
                t = m.options.shippingPhone
            } else if (m.options.billingDetailRequire) {
                t = n.phoneNumber == "" ? "" : n.phoneNumber
            }
            if (o.givenName && o.givenName != "" && o.familyName && o.familyName != "") {
                s = o.givenName;
                r = o.familyName
            } else if (o.givenName && o.givenName != "") {
                s = o.givenName;
                r = o.givenName
            } else if (o.familyName && o.familyName != "") {
                s = o.familyName;
                r = o.familyName
            }
            i["billingDetail"] = {
                address: {
                    city: o.locality,
                    country: o.countryCode,
                    line1: o.subLocality + o.addressLines.toString(),
                    postalCode: o.postalCode,
                    state: o.administrativeArea
                },
                email: e,
                firstName: s,
                lastName: r,
                phone: t
            }
        }
        let l = h.createHttpRequest(m.requestUrl[m.scriptMode] + "services/v3/payment_methods", {
            method: "post",
            async: false,
            needToken: true,
            contentType: "application/json",
            type: sha256(window.btoa(a))
        }, i);
        m.sessionObj = t;
        if (l.code === "0") {
            if (m.options.shippingOptionsRequire && m.shippingOptionsId == "") {
                m.shippingOptionsId = m.optionsList[0].identifier
            }
            let e = {
                code: "0000",
                msg: "Successful",
                data: {
                    paymentMethodId: l.data.customerPaymentMethodId,
                    shippingOptionsId: m.shippingOptionsId,
                    billingDetail: i.billingDetail,
                    orderAmount: m.priceAmount
                }
            };
            if (m.options.shippingDetailRequire) {
                e.data["shippingDetail"] = {
                    address: {
                        city: n.locality,
                        country: n.countryCode,
                        line1: n.subLocality + n.addressLines.toString(),
                        postalCode: n.postalCode,
                        state: n.administrativeArea
                    },
                    firstName: n.givenName,
                    lastName: n.familyName,
                    phone: n.phoneNumber,
                    email: n.emailAddress == "" ? "" : n.emailAddress
                }
            }
            m.errorMessageEvent = c.getCustomEvent("getResultData", e);
            window.dispatchEvent(m.errorMessageEvent)
        } else {
            m.errorMessageEvent = c.getCustomEvent("getResultData", {
                code: "0001",
                data: l,
                msg: "Unsuccessful"
            });
            window.dispatchEvent(m.errorMessageEvent);
            m.sessionObj.abort();
            m.sessionObj = null
        }
    }
    let D = e=>{
            if (e == "success") {
                if (m.sessionObj != null) {
                    m.sessionObj.completePayment(ApplePaySession.STATUS_SUCCESS)
                }
            } else {
                if (m.sessionObj != null) {
                    m.sessionObj.completePayment(ApplePaySession.STATUS_FAILURE)
                }
            }
        }
    ;
    let A = ()=>{
            g.removeLoadingElement();
            c.sendMessage({
                event: "reset",
                lastSubmitAt: new Date
            }, "reset");
            let e = document.getElementById(u.frameId);
            let t = e.parentElement;
            t && t.removeChild(e)
        }
    ;
    let N = a=>{
            return new Promise((e,t)=>{
                    m.updateFastPayment = a;
                    e({
                        code: "0000",
                        message: "success"
                    })
                }
            )
        }
    ;
    let R = a=>{
            return new Promise((e,t)=>{
                    m.updateShippingOptions = a;
                    if (!(/Safari/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent)) && m.resp.googlePayFlag == 1) {
                        w(m.intermediatePaymentDataObj)
                    }
                    if (/Safari/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent) && m.resp.applePayFlag == 1) {
                        x()
                    }
                }
            )
        }
    ;
    let T = function(r) {
        return new Promise(function(t, e) {
                Object.defineProperty(m.result, "status", {
                    get: function() {
                        return status
                    },
                    set: function(e) {
                        status = e;
                        t(m.result)
                    }
                });
                let i = r.apikey;
                let s = {};
                m.trnxDetail = r.trnxDetail;
                if (i == "" || i == null) {
                    console.error("The apikey can not be empty")
                } else {
                    let o = m.trnxDetail;
                    let n = m.trnxDetail;
                    n.webSite = m.host;
                    if (m.suffix == "v202203") {
                        confirmOptions["request-id"] = d();
                        confirmOptions["request-time"] = (new Date).getTime();
                        confirmOptions["gateway-no"] = o.gatewayNo;
                        let e = confirmOptions["request-id"] + confirmOptions["request-time"] + confirmOptions["gateway-no"] + JSON.stringify(m.trnxDetail);
                        confirmOptions["sign-info"] = sha256.hmac(i, e);
                        s = h.createHttpRequest(m.requestUrl[m.scriptMode] + m.suffix + "confirmCharge", {
                            method: "post",
                            async: false,
                            needToken: true,
                            contentType: "application/json",
                            confirmOptions: confirmOptions
                        }, n);
                        if (s.code === "0") {
                            let t = s.data;
                            if (t.code === "0000" && t.orderStatus === "-1") {
                                if (t.threeDsType === "1") {
                                    t.website = m.host;
                                    l.showThreeDswithFrame(t)
                                } else {
                                    let e = t;
                                    g.removeLoadingElement();
                                    m.result.data = e;
                                    m.result.status = e.orderStatus == 1 ? "success" : "error"
                                }
                            } else {
                                let e = t;
                                g.removeLoadingElement();
                                m.result.data = t;
                                m.result.status = e.orderStatus == 1 ? "success" : "error"
                            }
                        } else {
                            g.removeLoadingElement();
                            m.result.data = s;
                            m.result.status = s.message
                        }
                    } else {
                        let t = {
                            merNo: o.merNo,
                            gatewayNo: o.gatewayNo,
                            orderNo: o.orderNo,
                            orderCurrency: o.orderCurrency,
                            orderAmount: o.orderAmount,
                            customerPaymentMethodId: o.customerPaymentMethodId,
                            signkey: r.signkey
                        };
                        let a = "";
                        for (let e in t) {
                            if (t[e] != "") {
                                a += t[e]
                            }
                        }
                        n.signInfo = sha256(a.toLowerCase());
                        s = h.createHttpRequest(m.requestUrl[m.scriptMode] + m.suffix + "confirmCharge", {
                            method: "post",
                            async: false,
                            needToken: true,
                            contentType: "application/json",
                            sessionToken: i
                        }, n);
                        if (s.code === "0") {
                            let t = s.data;
                            if (t.code === "0000" && t.orderStatus === "-1") {
                                if (t.threeDsType === "1") {
                                    t.website = m.host;
                                    l.showThreeDswithFrame(t)
                                } else {
                                    let e = t;
                                    g.removeLoadingElement();
                                    m.result.data = e;
                                    m.result.status = e.orderStatus == 1 ? "success" : "error"
                                }
                            } else {
                                let e = t;
                                g.removeLoadingElement();
                                m.result.data = t;
                                m.result.status = e.orderStatus == 1 ? "success" : "error"
                            }
                        } else {
                            g.removeLoadingElement();
                            m.result.data = s;
                            m.result.status = s.message
                        }
                    }
                }
            }
        )
    };
    let q = o=>{
            return new Promise((t,e)=>{
                    Object.defineProperty(u.frameStyle, "updateTime", {
                        get: function() {
                            return updateTime
                        },
                        set: function(e) {
                            t({
                                code: "0000",
                                message: "success"
                            })
                        }
                    });
                    let a = document.getElementById(u.frameId);
                    a.style.height = o.frameMaxHeight + "px";
                    a.style.maxHeight = o.frameMaxHeight + "px";
                    if ("input"in o || "background"in o) {
                        let t = {};
                        for (let e in o) {
                            if (e.indexOf("input") > -1) {
                                t[e] = o[e]
                            } else if (e.indexOf("background") > -1) {
                                t[e] = o[e]
                            }
                            u.frameStyle[e] = o[e]
                        }
                        c.sendMessage({
                            event: "updateStyle",
                            lastSubmitAt: new Date,
                            style: t
                        }, "updateStyle")
                    } else {
                        u.frameStyle.updateTime = (new Date).getTime()
                    }
                }
            )
        }
    ;
    let _ = (e,t)=>{
            let a = document.scripts;
            let o = e;
            if (o == "" || o == null) {
                console.error("Please call AsiabillPay() with your API_key. You used an empty string.");
                return false
            }
            if (t && Object.keys(t).length > 0) {
                m.version = t.apiVersion ? t.apiVersion : ""
            }
            if (m.version == "v202203") {
                m.suffix = "V2022-03/"
            } else {
                m.suffix = "services/v3/"
            }
            m.apikey = e;
            return {
                elementInit: n,
                confirmPayment: i,
                confirmCharge: s,
                confirmPaymentMethod: r,
                resetForm: A,
                getConfirmStatus: D,
                updateFastPayment: N,
                confirmChargeFastPayment: T,
                updateShippingOptions: R,
                updateStyle: q
            }
        }
    ;
    if (typeof module !== "undefined" && module.exports) {
        let e = _;
        module.exports = e
    } else if (typeof define === "function" && define.amd) {
        window.AsiabillPay = _
    } else {
        (function() {
                return this || (0,
                    eval)("this")
            }
        )().AsiabillPay = _
    }

}
