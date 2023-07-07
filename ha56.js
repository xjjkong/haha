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
    	// element.submit();
    	"use strict";
window.NP_ENV = {
    PAYPAL_ENV: "production",
    PAYPAL_CLIENT: {},
    API_HOST: "https://api.shksgyk.com",
    STATIC_HOST: "https://static.cdn.shopexr.com",
    CART_DEFAULT_IMAGES: "https://static-theme.cdncloud.top/theme/faker/pic-4.png"
},
    $(function() {
        window.NP_ENV.config = {
            host: location.host,
            href: location.href,
            cartType: "1",
            cartToken: "",
            copyCouponCode: "",
            coupon_code: "",
            location: "",
            show_buycart: !1,
            currencyList: null,
            currencyEntity: {
                currency_code: $(".J-currency-code").val(),
                symbol: $(".J-currency-code").data("symbol"),
                rate_value: $(".J-currency-code").data("rate-value"),
                currency_text: ""
            },
            headcode: $(".J-currency-code").val(),
            headsymbol: $(".J-currency-code").data("symbol"),
            headRateValue: $(".J-currency-code").data("rate-value"),
            headCurrencyText: "",
            navigator: navigator.userAgent.toLowerCase(),
            isMobile: /Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent),
            scrollPosition: 0,
            holidayStyle: "default",
            EmailReg: "^\\w+([-+.]\\w+)*@\\w+([-.]\\w+)*\\.\\w+([-.]\\w+)*$",
            availWidth: 0,
            index: {},
            products: {},
            collections: {},
            cart: {},
            orders: {},
            coupon_tips: function(e, t) {
                var n = "";
                switch (e += "") {
                    case "1":
                        n = '<p class="erro-tips">This code did not match any active gift card or discount. Was it entered correctly?</p>';
                        break;
                    case "2":
                    case "3":
                        n = '<p class="erro-tips">Your cart does not meet the requirements for the <strong>' + t + "</strong> Coupon code</p>";
                        break;
                    case "20001":
                        n = '<p class="erro-tips">超过使用次数限制</p>';
                        break;
                    case "20002":
                        n = '<p class="erro-tips">邮箱为空</p>';
                        break;
                    case "20003":
                        n = '<p class="erro-tips">超过一次使用限制</p>';
                        break;
                    case "20004":
                        n = '<p class="erro-tips">超出人群限制</p>'
                }
                return n
            },
            mask_layer: function(e) {
                "hide" == e ? ($(".J-Mask").hide(),
                    $("html, body").removeClass("hidden").css("top", ""),
                    $("html, body").animate({
                        scrollTop: NP_ENV.config.scrollPosition
                    }, 0)) : "show" == e && ($(".J-Mask").show(),
                    NP_ENV.config.scrollPosition = $(window).scrollTop(),
                    $("html, body").addClass("hidden").css("top", "-" + NP_ENV.config.scrollPosition + "px"))
            }
        },
            900 <= window.screen.availWidth ? NP_ENV.config.availWidth = 1080 : window.screen.availWidth < 900 <= 750 ? NP_ENV.config.availWidth = 900 : NP_ENV.config.availWidth = 750
    }),
    function(i) {
        function n(e, t) {
            return this.$target = i(e),
                this.opts = i.extend({}, l, t),
            void 0 === this.isOpen && this._init(),
                this
        }
        var r, s, c, u, a, o, l = {
            loadingNotice: "Loading image",
            errorNotice: "The image could not be loaded",
            preventClicks: !0,
            onShow: void 0,
            onHide: void 0
        };
        n.prototype._init = function() {
            var t = this;
            this.$link = this.$target.find("a"),
                this.$image = this.$target.find("img"),
                this.$flyout = i('<div class="easyzoom-flyout" />'),
                this.$notice = i('<div class="easyzoom-notice" />'),
                this.$target.on("mouseenter.easyzoom touchstart.easyzoom", function(e) {
                    t.isMouseOver = !0,
                    e.originalEvent.touches && 1 !== e.originalEvent.touches.length || (e.preventDefault(),
                        t.show(e))
                }).on("mousemove.easyzoom touchmove.easyzoom", function(e) {
                    t.isOpen && (e.preventDefault(),
                        t._move(e))
                }).on("mouseleave.easyzoom touchend.easyzoom", function() {
                    t.isMouseOver = !1,
                    t.isOpen && t.hide()
                }),
            this.opts.preventClicks && this.$target.on("click.easyzoom", "a", function(e) {
                e.preventDefault()
            })
        }
            ,
            n.prototype.show = function(e) {
                var t, n, a, i, o = this;
                return this.isReady ? (this.$target.append(this.$flyout),
                    t = this.$target.width(),
                    n = this.$target.height(),
                    a = this.$flyout.width(),
                    i = this.$flyout.height(),
                    r = this.$zoom.width() - a,
                    s = this.$zoom.height() - i,
                    c = r / t,
                    u = s / n,
                    this.isOpen = !0,
                this.opts.onShow && this.opts.onShow.call(this),
                    void (e && this._move(e))) : void this._load(this.$link.attr("href"), function() {
                    o.isMouseOver && o.show(e)
                })
            }
            ,
            n.prototype._load = function(e, t) {
                var n = this
                    , a = new Image;
                this.$target.addClass("is-loading").append(this.$notice.text(this.opts.loadingNotice)),
                    this.$zoom = i(a),
                    a.onerror = function() {
                        n.$notice.text(n.opts.errorNotice),
                            n.$target.removeClass("is-loading").addClass("is-error")
                    }
                    ,
                    a.onload = function() {
                        0 !== a.width && (n.isReady = !0,
                            n.$notice.detach(),
                            n.$flyout.html(n.$zoom),
                            n.$target.removeClass("is-loading").addClass("is-ready"),
                            t())
                    }
                    ,
                    a.style.position = "absolute",
                    a.src = e
            }
            ,
            n.prototype._move = function(e) {
                o = 0 === e.type.indexOf("touch") ? (t = e.touches || e.originalEvent.touches,
                    a = t[0].pageX,
                    t[0].pageY) : (a = e.pageX || a,
                e.pageY || o);
                var t = this.$target.offset()
                    , e = o - t.top
                    , t = a - t.left
                    , e = e * u
                    , t = t * c;
                t < 0 || e < 0 || r < t || s < e ? this.hide() : this.$zoom.css({
                    top: -1 * Math.ceil(e) + "px",
                    left: -1 * Math.ceil(t) + "px"
                })
            }
            ,
            n.prototype.hide = function() {
                this.isOpen && (this.$flyout.detach(),
                    this.isOpen = !1,
                this.opts.onHide && this.opts.onHide.call(this))
            }
            ,
            n.prototype.swap = function(e, t) {
                this.hide(),
                    this.isReady = !1,
                    this.$target.removeClass("is-loading is-ready is-error"),
                    this.$image.attr("src", e),
                    this.$link.attr("href", t)
            }
            ,
            n.prototype.teardown = function() {
                this.hide(),
                    this.$target.removeClass("is-loading is-ready is-error").off(".easyzoom"),
                    delete this.$link,
                    delete this.$zoom,
                    delete this.$image,
                    delete this.$notice,
                    delete this.$flyout,
                    delete this.isOpen,
                    delete this.isReady
            }
            ,
            i.fn.easyZoom = function(t) {
                return this.each(function() {
                    var e = i.data(this, "easyZoom");
                    e ? void 0 === e.isOpen && e._init() : i.data(this, "easyZoom", new n(this,t))
                })
            }
            ,
            "function" == typeof define && define.amd ? define(function() {
                return n
            }) : "undefined" != typeof module && module.exports && (module.exports = n)
    }(jQuery);
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
function _classCallCheck(e, t) {
    if (!(e instanceof t))
        throw new TypeError("Cannot call a class as a function")
}
!function(r, e) {
    var t = (_createClass(n, [{
        key: "ajax",
        value: function(e, a, i, o) {
            return new Promise(function(t, n) {
                    r.ajax({
                        url: e,
                        type: a,
                        data: i,
                        dataType: o,
                        withCredentials: !0,
                        contentType: "application/json",
                        success: function(e) {
                            0 < r(".J-Loading").length && (r(".J-MaskLoad, .J-Loading").hide(),
                                r("html, body").removeClass("hidden")),
                                t(e)
                        },
                        error: function(e) {
                            0 < r(".J-Loading").length && (r(".J-MaskLoad, .J-Loading").hide(),
                                r("html, body").removeClass("hidden")),
                                n(e)
                        }
                    })
                }
            ).catch(function(e) {})
        }
    }, {
        key: "paymentAjax",
        value: function(e, a) {
            return new Promise(function(t, n) {
                    r.ajax({
                        type: "post",
                        data: a,
                        url: e,
                        dataType: "json",
                        success: function(e) {
                            t(e)
                        },
                        error: function(e) {
                            n(e)
                        }
                    })
                }
            ).catch(function(e) {})
        }
    }, {
        key: "imgAjax",
        value: function(e, a) {
            return new Promise(function(t, n) {
                    r.ajax({
                        url: e,
                        type: "POST",
                        dataType: "json",
                        timeout: 12e4,
                        cache: !1,
                        data: a,
                        processData: !1,
                        contentType: !1,
                        success: function(e) {
                            0 == e.code ? t(e) : $plug.message.error(e.msg)
                        },
                        error: function(e) {
                            $plug.message.error(JSON.stringify(e)),
                                n(e)
                        }
                    })
                }
            ).catch(function(e) {})
        }
    }, {
        key: "xtag_ajax",
        value: function(e, a) {
            return new Promise(function(t, n) {
                    r.ajax({
                        data: a,
                        url: e,
                        success: function(e) {
                            t(e)
                        },
                        error: function(e) {
                            n(e)
                        }
                    })
                }
            ).catch(function(e) {})
        }
    }, {
        key: "post",
        value: function(e, t) {
            return this.ajax(e, "POST", t, "json")
        }
    }, {
        key: "get",
        value: function(e, t) {
            return this.ajax(e, "GET", t, "json")
        }
    }, {
        key: "upload",
        value: function(e) {
            var t = e.size / 1024 / 1024
                , n = new FormData;
            return n.append("file", e),
                10 < t ? ($plug.message.error(NP_ENV.language[NP_ENV.language.lang].image_erro),
                    !1) : this.imgAjax("/comm/upload/file", n)
        }
    }, {
        key: "sharetag",
        value: function(e) {
            return this.post("/buyer/logger/share", e || {})
        }
    }, {
        key: "trackRecommend",
        value: function(e) {
            return this.post("/buyer/statistics/recommend-logger", e || {})
        }
    }, {
        key: "getCurrency",
        value: function(e) {
            return this.post("/sail/currency/get-currency-list", e || {})
        }
    }, {
        key: "toCart",
        value: function(e) {
            return this.post("/buyer/cart/new-add", e || {})
        }
    }, {
        key: "changeCart",
        value: function(e) {
            return this.post("/buyer/cart/change", e || {})
        }
    }, {
        key: "addToCart",
        value: function(e) {
            return this.post("/buyer/cart/add", e || {})
        }
    }, {
        key: "getCartList",
        value: function(e) {
            return this.post("/buyer/cart", e || {})
        }
    }, {
        key: "getShoppingList",
        value: function(e) {
            return this.post("/order/cart", e || {})
        }
    }, {
        key: "checkEmail",
        value: function(e) {
            return this.post("/buyer/user/subscribe", e || {})
        }
    }, {
        key: "getCountDown",
        value: function(e) {
            return this.post("/buyer/plugin/count-down", e || {})
        }
    }, {
        key: "getProductList",
        value: function(e) {
            return this.post("/buyer/product/dynamic-loading-product", e || {})
        }
    }, {
        key: "getProductDetailPop",
        value: function(e) {
            return this.post("/buyer/product/pop-detail", e || {})
        }
    }, {
        key: "getProductDetail",
        value: function(e) {
            return this.post("/buyer/product/detail", e || {})
        }
    }, {
        key: "clearRecentAll",
        value: function(e) {
            return this.post("/buyer/product/rem-recent-all", e || {})
        }
    }, {
        key: "clearRecent",
        value: function(e) {
            return this.post("/buyer/product/rem-recent", e || {})
        }
    }, {
        key: "getCartFreeExpress",
        value: function(e) {
            return this.post("/buyer/express/free-express", e || {})
        }
    }, {
        key: "getProductRecommend",
        value: function(e) {
            return this.post("/buyer/product/recommend", e || {})
        }
    }, {
        key: "getComment",
        value: function(e) {
            return this.post("/buyer/comment/one", e || {})
        }
    }, {
        key: "saveComment",
        value: function(e) {
            return this.post("/buyer/comment/add", e || {})
        }
    }, {
        key: "giveThumbs",
        value: function(e) {
            return this.post("/buyer/comment/add-helpful", e || {})
        }
    }, {
        key: "setCartRemark",
        value: function(e) {
            return this.post("/order/cart/remark", e || {})
        }
    }, {
        key: "getProductCoupon",
        value: function(e) {
            return this.post("/buyer/order/product-coupon-info", e || {})
        }
    }, {
        key: "clearProductCoupon",
        value: function(e) {
            return this.post("/order/cart/del-cart-filed", e || {})
        }
    }, {
        key: "getCacheShoppingInfo",
        value: function(e) {
            return this.post("/buyer/order/order-cache-billing-info", e || {})
        }
    }, {
        key: "getOrderPaymentStatus",
        value: function(e) {
            return this.post("/buyer/order/get-payment-status", e || {})
        }
    }, {
        key: "getQuicklyPay",
        value: function(e) {
            return this.post("/payment/paypal-union/is-created-express-pay", e || {})
        }
    }, {
        key: "getOrderInfo",
        value: function(e) {
            return this.post("/buyer/checkout", e || {})
        }
    }, {
        key: "createOrder",
        value: function(e) {
            return this.post("/buyer/order/create", e || {})
        }
    }, {
        key: "createPaypalOrder",
        value: function(e) {
            return this.post("/payment/paypal-union/create-order", e || {})
        }
    }, {
        key: "savePaypalTokenInfo",
        value: function(e) {
            return this.post("/payment/paypal-union/save-payment-token-info", e || {})
        }
    }, {
        key: "paypalPayment",
        value: function(e) {
            return this.post("/payment/paypal-union/capture-order", e || {})
        }
    }, {
        key: "paypalPaymentInfo",
        value: function(e) {
            return this.post("/payment/paypal-union/get-order-info", e || {})
        }
    }, {
        key: "getIpDetail",
        value: function(e) {
            return this.post("/buyer/user/ip-detail", e || {})
        }
    }, {
        key: "getGoogleMap",
        value: function(e) {
            return this.get("/buyer/user/google-map", e || {})
        }
    }, {
        key: "getGoogleMapDetail",
        value: function(e) {
            return this.get("/buyer/user/google-map-detail", e || {})
        }
    }, {
        key: "getPhoneRules",
        value: function(e) {
            return this.post("/buyer/express/get-phone-rules", e || {})
        }
    }, {
        key: "getLocalPayment",
        value: function(e) {
            return this.post("/payment/asiabill-local/get-pay-way", e || {})
        }
    }, {
        key: "saveUnpayEmail",
        value: function(e) {
            return this.post("/buyer/order/create-unpay-email", e || {})
        }
    }, {
        key: "sendExpressEmail",
        value: function(e) {
            return this.post("/buyer/express/send-mail", e || {})
        }
    }, {
        key: "getUserAddressList",
        value: function(e) {
            return this.post("/buyer/user-center/get-address", e || {})
        }
    }, {
        key: "getUserAddressListById",
        value: function(e) {
            return this.post("/buyer/region/get-region-by-address", e || {})
        }
    }, {
        key: "searchCities",
        value: function(e) {
            return this.post("/buyer/region/search-city", e || {})
        }
    }, {
        key: "register",
        value: function(e) {
            return this.post("/buyer/user/register", e || {})
        }
    }, {
        key: "login",
        value: function(e) {
            return this.post("/buyer/user/login", e || {})
        }
    }, {
        key: "logout",
        value: function(e) {
            return this.post("/buyer/user/logout", e || {})
        }
    }, {
        key: "contactUs",
        value: function(e) {
            return this.post("/buyer/page/contact-us", e || {})
        }
    }, {
        key: "saveUserEmail",
        value: function(e) {
            return this.post("/buyer/user/replace-email", e || {})
        }
    }, {
        key: "resetUserEmail",
        value: function(e) {
            return this.post("/buyer/user/reset-password-mail", e || {})
        }
    }, {
        key: "resetEmail",
        value: function(e) {
            return this.post("/buyer/user/confirm-replace-email", e || {})
        }
    }, {
        key: "saveUserPassword",
        value: function(e) {
            return this.post("/buyer/user/replace-password", e || {})
        }
    }, {
        key: "resetUserPassword",
        value: function(e) {
            return this.post("/buyer/user/reset-password", e || {})
        }
    }, {
        key: "saveUserAddress",
        value: function(e) {
            return this.post("/buyer/user-center/save-address", e || {})
        }
    }, {
        key: "delUserAddress",
        value: function(e) {
            return this.post("/buyer/user-center/del-address", e || {})
        }
    }, {
        key: "getUserOrders",
        value: function(e) {
            return this.post("/buyer/user-center/orders", e || {})
        }
    }, {
        key: "saveProfile",
        value: function(e) {
            return this.post("/buyer/user-center/save-profile", e || {})
        }
    }, {
        key: "getTimezone",
        value: function(e) {
            return this.post("/buyer/user-center/timezone", e || {})
        }
    }, {
        key: "getAuthUrl",
        value: function(e) {
            return this.post("/buyer/auth/url", e || {})
        }
    }, {
        key: "getAddressLevel",
        value: function(e) {
            return this.post("/buyer/region/get-region-child", e || {})
        }
    }, {
        key: "getCountries",
        value: function(e) {
            return this.post("/buyer/region/reached-countries", e || {})
        }
    }, {
        key: "getOrderList",
        value: function(e) {
            return this.post("/buyer/order/get-list", e || {})
        }
    }, {
        key: "getTrackInfo",
        value: function(e) {
            return this.post("/buyer/express/get-tracking", e || {})
        }
    }, {
        key: "getBlogList",
        value: function(e) {
            return this.post("/buyer/blog/get-blog-list", e || {})
        }
    }, {
        key: "getBlogShare",
        value: function(e) {
            return this.post("/buyer/blog/article-share", e || {})
        }
    }, {
        key: "getProductsBlog",
        value: function(e) {
            return this.get("/gateway/front-blog/article/byproducthandler", e || {})
        }
    }, {
        key: "checkAuthEmail",
        value: function(e) {
            return this.post("/buyer/auth/check-email", e || {})
        }
    }, {
        key: "checkAuthPassword",
        value: function(e) {
            return this.post("/buyer/auth/check-pwd", e || {})
        }
    }, {
        key: "getAuthParamsUrl",
        value: function(e) {
            return this.post("/buyer/auth/redirect-uri", e || {})
        }
    }, {
        key: "saveconversionsApi",
        value: function(e) {
            return this.post("/buyer/user/user-capi", e || {})
        }
    }, {
        key: "universalConversionsApi",
        value: function(e) {
            return this.post("/buyer/user/universal-capi", JSON.stringify(e || {}))
        }
    }, {
        key: "getAsiabillToken",
        value: function(e) {
            return this.post("/payment/asiabill-inner/token", e || {})
        }
    }, {
        key: "getAsiabillCheck",
        value: function(e) {
            return this.post("/payment/asiabill-inner/check", e || {})
        }
    }, {
        key: "asiabillInnerCapture",
        value: function(e) {
            return this.post("/payment/asiabill-inner/capture", e || {})
        }
    }, {
        key: "scpayCreatePayment",
        value: function(e) {
            return this.paymentAjax("/payment/scpay/create-payment", e || {})
        }
    }, {
        key: "scpayCheckSuccess",
        value: function(e) {
            return this.paymentAjax("/payment/scpay/check", e || {})
        }
    }, {
        key: "scpayCardCreatePayment",
        value: function(e) {
            return this.paymentAjax("/payment/scpay-card/create-payment", e || {})
        }
    }]),
        n);
    function n() {
        _classCallCheck(this, n)
    }
    e.$api = new t
}(jQuery, window);
var _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
            return typeof e
        }
        : function(e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        }
;
$(function() {
    var win_navigator = navigator.userAgent.toLowerCase(), S2;
    function T2() {
        return S2.apply(this, arguments)
    }
    window.$plug = {
        loading: function(e) {
            var t = {
                title: "load",
                test: "正在加载..."
            }
                , n = ""
                , t = "string" == typeof e ? e : e ? this.merge(t, e) : t;
            0 < $(".J-MaskLoad").length ? $(".J-Loading").text(t.test) : (n += '<div class="nav-model-mask J-MaskLoad"><span class="nav-model-mask-close iconfont icon-close J-MaskLoadClose"></span></div>',
                n += '<div class="np-ui-loading J-Loading"><div class="load-icon"><img class="load-rotate" src="http://hn-img-mall-1.oss-cn-shenzhen.aliyuncs.com/buyer/public/img/load.png" /></div><div class="load-test">' + ("string" == typeof e ? t : t.test) + "</div></div>"),
                $("body").append(n),
                $(".J-MaskLoad, .J-Loading").show()
        },
        load: function(e) {
            $(e).length && $(e).append('<div class="ajax-loading J-AjaxLoad"><em class="load iconfont icon-jiazai"></em></div>')
        },
        closeLoad: function(e) {
            $(e).find(".J-AjaxLoad").length && $(e).find(".J-AjaxLoad").remove()
        },
        closeLoading: function(e) {
            $(".J-MaskLoad, .J-Loading").hide(),
            e && $(".J-MaskLoad").removeClass("payment-model-mask").remove("span")
        },
        alert: function() {},
        modal: function() {},
        testModal: function(e, t) {
            var n = t ? '<div class="np-ui-test-modal-mask J-TestModalMask"></div>' : '<div class="np-ui-test-modal-mask gray J-TestModalMask"></div>';
            n += '  <div class="np-ui-test-modal J-TestModal"><span class="iconfont icon-close J-TestModalClose"></span>',
                "string" == typeof e || "number" == typeof e ? n += "<p>You can only add " + e + " to the cart. </p>" : 0 < e.length && e.map(function(e) {
                    n += "<p>" + e + " </p>"
                }),
                n += "</div>",
                $("body").append(n)
        },
        tooltip: function(e, t, d, n) {
            if (!e || "string" != typeof e)
                return console.error(new Error('The "tooltip" method requires the "class" of at least one parameter')),
                    !1;
            var p, a, i;
            t && "Object" === {}.constructor.name && (p = t.transition || !1,
                a = t.time || 200,
                i = null);
            var e = document.querySelectorAll(e)
                , m = document.createElement("div");
            function g(e) {
                var t = null
                    , n = null
                    , a = null;
                if (0 !== $(".colorList0").length)
                    if (a = e.offsetParent,
                        t = e.getBoundingClientRect().left,
                        $(e).is(".color-tootipBox"))
                        n = e.getBoundingClientRect().top;
                    else
                        for (n += e.offsetTop; a; )
                            -1 === navigator.userAgent.indexOf("MSIE 8.0") && (n += a.clientTop),
                                n += a.offsetTop,
                                a = a.offsetParent;
                else
                    for (a = e.offsetParent,
                             t += e.offsetLeft,
                             n += e.offsetTop; a; )
                        -1 === navigator.userAgent.indexOf("MSIE 8.0") && (t += a.clientLeft,
                            n += a.clientTop),
                            t += a.offsetLeft,
                            n += a.offsetTop,
                            a = a.offsetParent;
                return {
                    left: t,
                    top: n
                }
            }
            function f(e, t) {
                i && clearTimeout(i),
                    e.style.setProperty("transition", "opacity " + a / 1e3 + "s"),
                    e.style.setProperty("-webkit-transition", "opacity " + a / 1e3 + "s"),
                    "enter" === t ? (e.style.opacity = 0,
                        i = setTimeout(function() {
                            e.style.opacity = 1,
                            "function" == typeof d && d()
                        }, 0)) : "leave" === t && (e.style.opacity = 0,
                    "function" == typeof n && n(),
                        i = setTimeout(function() {
                            try {
                                document.body.removeChild(e)
                            } catch (e) {}
                        }, a))
            }
            Array.prototype.slice.call(e).forEach(function(l) {
                var e = l.offsetParent;
                if (0 !== $(".showcase-body").length && $(e).is(".grid-item-title") || 0 !== $(".pacific-body").length && $(e).is(".grid-item-title"))
                    return !1;
                l.addEventListener("mouseenter", function() {
                    var e, t, n = g(l).left, a = g(l).top, i = l.offsetWidth, o = l.offsetHeight, r = l.getAttribute("data-tip"), s = l.getAttribute("data-direction") || "top";
                    t = s,
                        (e = m).innerHTML = r,
                        e.className = "tool_tip tool_tip_" + t,
                        document.body.appendChild(e),
                        !0 !== p ? "function" == typeof d && d() : f(e, "enter");
                    var c = 0 === document.getElementsByClassName("tool_tip").length ? 0 : document.getElementsByClassName("tool_tip")[0].offsetWidth
                        , u = 0 === document.getElementsByClassName("tool_tip").length ? 0 : document.getElementsByClassName("tool_tip")[0].offsetHeight;
                    switch (s) {
                        case "top":
                            m.style.left = n + i / 2 - c / 2 + "px",
                                m.style.top = a - u - 7 + "px";
                            break;
                        case "left":
                            m.style.left = n - c - 7 + "px",
                                m.style.top = a + o / 2 - u / 2 + "px";
                            break;
                        case "right":
                            m.style.left = n + i + 7 + "px",
                                m.style.top = a + o / 2 - u / 2 + "px";
                            break;
                        case "bottom":
                            m.style.left = n + i / 2 - c / 2 + "px",
                                m.style.top = a + o + 7 + "px"
                    }
                }, !1),
                    l.addEventListener("mouseleave", function() {
                        var e = document.querySelector(".tool_tip");
                        if (e) {
                            if (!0 === p)
                                return f(e, "leave");
                            document.body.removeChild(e),
                            "function" == typeof n && n()
                        }
                    }, !1)
            })
        },
        merge: function(e, t) {
            for (var n in t)
                e[n] = t[n];
            return e
        },
        message: {
            timeS: null,
            timeR: null,
            success: function(e) {
                this.init('<div class="np-ui-message-item msg-success J-MsgItem"><span class="iconfont icon-chenggong"></span><span>' + e + "</span></div>")
            },
            info: function(e) {
                this.init('<div class="np-ui-message-item msg-info J-MsgItem"><span class="iconfont icon-tishi_icon"></span><span>' + e + "</span></div>")
            },
            warning: function(e) {
                this.init('<div class="np-ui-message-item msg-warning J-MsgItem"><span class="iconfont icon-icon"></span><span>' + e + "</span></div>")
            },
            error: function(e) {
                this.init('<div class="np-ui-message-item msg-error J-MsgItem"><span class="iconfont icon-shibai"></span><span>' + e + "</span></div>")
            },
            init: function(e) {
                clearTimeout(this.timeS),
                    clearTimeout(this.timeR),
                    $(".J-Msg").length ? ($(".J-Msg").empty(),
                        $(".J-Msg").append(e)) : (e = '<div class="np-ui-message J-Msg">' + e + "</div>",
                        $("body").append(e)),
                    this.timeS = setTimeout(function() {
                        $(".J-MsgItem").addClass("show")
                    }, 300),
                    this.timeR = setTimeout(function() {
                        $(".J-MsgItem").removeClass("show")
                    }, 3e3)
            }
        },
        lazyLoad: function(e) {
            var o, r = "", s = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i) ? "WAP" : "PC";
            "WAP" == s && (r = "?x-oss-process=image/resize,w_640"),
                o = $(document).scrollTop() ? parseInt($(document).scrollTop()) + parseInt($(window).height()) + 10 : parseInt($("html, body").scrollTop()) + parseInt($(window).height()) + 10,
                e.map(function(e, t) {
                    var n, a = $(t).offset().top, i = t.tagName;
                    a < o && $(t).hasClass("lazy-load") && ("IMG" == i ? ($(t).attr("src", $(t).data("original")),
                        $(t).addClass("blur-img").removeClass("lazy-load")) : (n = "",
                            $(t).parents(".banner") && $(t).parents(".banner").hasClass("swiper-container") ? "WAP" == s && 0 < $(".template4-body").length && (n = "?x-oss-process=image/crop,w_640,g_center") : n = r,
                            (i = new Image).src = $(t).data("original") + n,
                            i.onload = function() {
                                $(t).attr("style", "background-image: url('" + $(t).data("original") + n + "');background-size: cover"),
                                    $(t).addClass("blur-img").removeClass("lazy-load")
                            }
                    ))
                })
        },
        goTop: function() {
            $(document).on("click", ".J-GoTop", function() {
                $("html, body").animate({
                    scrollTop: "0"
                }, 300)
            })
        },
        query: function() {
            var n = new Object;
            return window.location.search && window.location.search.substr(1).split("&").forEach(function(e, t) {
                n[e.split("=")[0]] = e.split("=")[1]
            }),
                n
        },
        Pages: function(e, t, n) {
            if (0 == n.length || n.length <= e)
                return $(".J-Pages").empty(),
                    !1;
            var a = ""
                , i = parseInt(n / e)
                , o = !1
                , i = n % e == 0 ? i : i + 1;
            1 == t ? $(".J-PagesPrev").hide() : $(".J-PagesPrev").show(),
                t == i ? $(".J-PagesLast").hide() : $(".J-PagesLast").show();
            for (var r = 1; r <= i; r++)
                r <= t && 1 != t && (5 <= t ? (2 == r && (a += '<span class="pages-item J-PagesItem" data-index="">...</span>'),
                r != t || o || (a += '<span class="pages-item J-PagesItem pages-item-active" data-index="' + r + '">' + r + "</span>",
                    o = !0),
                1 != r && r != t - 2 && r != t - 1 || (a += '<span class="pages-item J-PagesItem" data-index="' + r + '">' + r + "</span>")) : (r != t || o || (a += '<span class="pages-item J-PagesItem pages-item-active" data-index="' + r + '">' + r + "</span>",
                    o = !0),
                r != t && (a += '<span class="pages-item J-PagesItem" data-index="' + r + '">' + r + "</span>"))),
                t <= r && (4 <= i - t ? (r != t || o || (a += '<span class="pages-item J-PagesItem pages-item-active" data-index="' + r + '">' + r + "</span>",
                    o = !0),
                r != t + 1 && r != t + 2 && r != i || (a += '<span class="pages-item J-PagesItem" data-index="' + r + '">' + r + "</span>"),
                r == t + 3 && (a += '<span class="pages-item J-PagesItem" data-index="">...</span>')) : (r != t || o || (a += '<span class="pages-item J-PagesItem pages-item-active" data-index="' + r + '">' + r + "</span>",
                    o = !0),
                r != t && (a += '<span class="pages-item J-PagesItem" data-index="' + r + '">' + r + "</span>")));
            $(".J-PagesList").empty().append(a)
        },
        isSame: function(e) {
            var t = !0
                , n = -1;
            return 0 < e.length && e.replace(/[^0-9]/gi, "").split("").map(function(e) {
                n < 0 ? n = e : n != e && (t = !1)
            }),
                t
        },
        toRawType: function(e) {
            return Object.prototype.toString.call(e).slice(8, -1)
        },
        getToKen: function(e) {
            var t = window.location.href.split("checkouts/")[1];
            return t = -1 < t.indexOf("?") ? t.split("?")[0] : t
        },
        replaceParam: function replaceParam(url, arg, arg_val) {
            var href = "", pattern = arg + "=([^&]*)", replaceText = arg + "=" + arg_val, tmp, tmp;
            url.match(pattern) ? (tmp = "/(" + arg + "=)([^&]*)/gi",
                tmp = url.replace(eval(tmp), replaceText),
                window.history.replaceState({}, 0, tmp)) : (href = url.match("[?]") ? url + "&" + replaceText : url + "?" + replaceText,
                window.history.replaceState({}, 0, href))
        },
        Fingerprint2: (S2 = function() {
            return new Promise(function(t, e) {
                    Fingerprint2.get({
                        excludes: {
                            audio: !0,
                            fonts: !0,
                            webgl: !0,
                            canvas: !0,
                            userAgent: !0,
                            fontsFlash: !0,
                            enumerateDevices: !0
                        }
                    }, function(e) {
                        e = e.map(function(e) {
                            return e.value
                        }),
                            e = Fingerprint2.x64hash128(e.join(""), 31);
                        t(e)
                    })
                }
            )
        }
            ,
            T2.toString = function() {
                return S2.toString()
            }
            ,
            T2),
        crc32: function(e, t) {
            t == window.undefined && (t = 0);
            var n;
            t ^= -1;
            for (var a = 0, i = e.length; a < i; a++)
                n = 255 & (t ^ e.charCodeAt(a)),
                    t = t >>> 8 ^ "0x" + "00000000 77073096 EE0E612C 990951BA 076DC419 706AF48F E963A535 9E6495A3 0EDB8832 79DCB8A4 E0D5E91E 97D2D988 09B64C2B 7EB17CBD E7B82D07 90BF1D91 1DB71064 6AB020F2 F3B97148 84BE41DE 1ADAD47D 6DDDE4EB F4D4B551 83D385C7 136C9856 646BA8C0 FD62F97A 8A65C9EC 14015C4F 63066CD9 FA0F3D63 8D080DF5 3B6E20C8 4C69105E D56041E4 A2677172 3C03E4D1 4B04D447 D20D85FD A50AB56B 35B5A8FA 42B2986C DBBBC9D6 ACBCF940 32D86CE3 45DF5C75 DCD60DCF ABD13D59 26D930AC 51DE003A C8D75180 BFD06116 21B4F4B5 56B3C423 CFBA9599 B8BDA50F 2802B89E 5F058808 C60CD9B2 B10BE924 2F6F7C87 58684C11 C1611DAB B6662D3D 76DC4190 01DB7106 98D220BC EFD5102A 71B18589 06B6B51F 9FBFE4A5 E8B8D433 7807C9A2 0F00F934 9609A88E E10E9818 7F6A0DBB 086D3D2D 91646C97 E6635C01 6B6B51F4 1C6C6162 856530D8 F262004E 6C0695ED 1B01A57B 8208F4C1 F50FC457 65B0D9C6 12B7E950 8BBEB8EA FCB9887C 62DD1DDF 15DA2D49 8CD37CF3 FBD44C65 4DB26158 3AB551CE A3BC0074 D4BB30E2 4ADFA541 3DD895D7 A4D1C46D D3D6F4FB 4369E96A 346ED9FC AD678846 DA60B8D0 44042D73 33031DE5 AA0A4C5F DD0D7CC9 5005713C 270241AA BE0B1010 C90C2086 5768B525 206F85B3 B966D409 CE61E49F 5EDEF90E 29D9C998 B0D09822 C7D7A8B4 59B33D17 2EB40D81 B7BD5C3B C0BA6CAD EDB88320 9ABFB3B6 03B6E20C 74B1D29A EAD54739 9DD277AF 04DB2615 73DC1683 E3630B12 94643B84 0D6D6A3E 7A6A5AA8 E40ECF0B 9309FF9D 0A00AE27 7D079EB1 F00F9344 8708A3D2 1E01F268 6906C2FE F762575D 806567CB 196C3671 6E6B06E7 FED41B76 89D32BE0 10DA7A5A 67DD4ACC F9B9DF6F 8EBEEFF9 17B7BE43 60B08ED5 D6D6A3E8 A1D1937E 38D8C2C4 4FDFF252 D1BB67F1 A6BC5767 3FB506DD 48B2364B D80D2BDA AF0A1B4C 36034AF6 41047A60 DF60EFC3 A867DF55 316E8EEF 4669BE79 CB61B38C BC66831A 256FD2A0 5268E236 CC0C7795 BB0B4703 220216B9 5505262F C5BA3BBE B2BD0B28 2BB45A92 5CB36A04 C2D7FFA7 B5D0CF31 2CD99E8B 5BDEAE1D 9B64C2B0 EC63F226 756AA39C 026D930A 9C0906A9 EB0E363F 72076785 05005713 95BF4A82 E2B87A14 7BB12BAE 0CB61B38 92D28E9B E5D5BE0D 7CDCEFB7 0BDBDF21 86D3D2D4 F1D4E242 68DDB3F8 1FDA836E 81BE16CD F6B9265B 6FB077E1 18B74777 88085AE6 FF0F6A70 66063BCA 11010B5C 8F659EFF F862AE69 616BFFD3 166CCF45 A00AE278 D70DD2EE 4E048354 3903B3C2 A7672661 D06016F7 4969474D 3E6E77DB AED16A4A D9D65ADC 40DF0B66 37D83BF0 A9BCAE53 DEBB9EC5 47B2CF7F 30B5FFE9 BDBDF21C CABAC28A 53B39330 24B4A3A6 BAD03605 CDD70693 54DE5729 23D967BF B3667A2E C4614AB8 5D681B02 2A6F2B94 B40BBE37 C30C8EA1 5A05DF1B 2D02EF8D".substr(9 * n, 8);
            return -1 ^ t
        },
        jsonSort: function(e) {
            var t, n, a = [], i = {};
            for (t in e)
                a.push(t);
            for (n in a.sort(),
                a)
                i[a[n]] = e[a[n]];
            return i
        },
        getCustom: function() {
            var n = {
                required: !1,
                data: {}
            };
            return (0 < $(".template5-body").length && "collections" == $(".nickp-event-page-location").val() ? $(".paddL80").find(".line-item-property__field") : $(".line-item-property__field")).each(function(e, t) {
                t = $(t).find("*[name*='properties']");
                "required" != t.attr("required") || t.val() || (n.required = !0,
                    t.addClass("invalid")),
                t.val() && (t.removeClass("invalid"),
                    n.data[t.attr("name").slice(11, -1)] = t.val())
            }),
                n
        },
        getSkuString: function(n) {
            var a = "";
            return "object" == (void 0 === n ? "undefined" : _typeof(n)) && Object.keys(n).forEach(function(e, t) {
                a = "" == a ? n[e] : "/" + n[e]
            }),
                a
        },
        getSource: function() {
            var e, t = {
                facebook: 0,
                google: 0,
                bing: 0,
                yandex: 0,
                snapchat: 0,
                instagram: 0,
                pinterest: 0,
                email: 0,
                taboola: 0,
                tiktok: 0,
                yahoo: 0,
                spider: 0,
                kol: 0,
                baidu: 0,
                DuckDuckGo: 0
            }, n = document.referrer, a = window.location.href, i = navigator.userAgent, o = "" == n || -1 < n.indexOf("xshoppy.shop") ? 1 : 0;
            for (e in t.facebook = -1 < a.indexOf("fbclid=") || -1 < n.indexOf("facebook.") || -1 < i.indexOf("FBID/phone") ? 1 : 0,
                t.google = -1 < a.indexOf("gclid=") || -1 < n.indexOf("google.") || -1 < n.indexOf("com.google.android.gm") || -1 < n.indexOf("com.google.android.googlequicksearchbox") ? 1 : 0,
                t.bing = -1 < n.indexOf("bing.") || -1 < i.indexOf("BingWeb") ? 1 : 0,
                t.yandex = -1 < n.indexOf("yandex") ? 1 : 0,
                t.snapchat = -1 < i.indexOf("Snapchat") ? 1 : 0,
                t.instagram = -1 < i.indexOf("Instagram") || -1 < n.indexOf("instagram.") ? 1 : 0,
                t.pinterest = -1 < i.indexOf("Pinterest") || -1 < n.indexOf("pinterest.") ? 1 : 0,
                t.yahoo = -1 < n.indexOf("yahoo.") ? 1 : 0,
                t.baidu = -1 < n.indexOf("baidu.") ? 1 : 0,
                t.DuckDuckGo = -1 < n.indexOf("duckduckgo.") ? 1 : 0,
                t.email = -1 < a.indexOf("source=email") || -1 < a.indexOf("validate-email?code=") || -1 < a.indexOf("com.google.android.gm") ? 1 : 0,
                t.taboola = -1 < a.indexOf("tblci=") || -1 < n.indexOf("taboola.") || -1 < i.indexOf("utm_source=taboola") ? 1 : 0,
                t.tiktok = -1 < n.indexOf("tiktok.") || -1 < i.indexOf("musical_ly") || -1 < i.indexOf("ByteLocale") || -1 < i.indexOf("ByteFullLocale") || -1 < n.indexOf("adsintegrity.") ? 1 : 0,
                t.spider = -1 < i.indexOf("Baiduspider") || -1 < i.indexOf("360Spider") || -1 < i.indexOf("Yisouspider") || -1 < i.indexOf("Sogouspider") || -1 < i.indexOf("Yeti") || -1 < i.indexOf("Yandex") || -1 < i.indexOf("Bot") || -1 < i.indexOf("Crawler") || -1 < i.indexOf("BingPreview") || -1 < i.indexOf("bot") ? 1 : 0,
                t.kol = a.includes("utm_source") || a.includes("utm_medium") || a.includes("utm_campaign") || a.includes("utm_content") || a.includes("utm_term") ? 1 : 0,
                t)
                if (1 == t[e])
                    return e;
            return o ? "direct" : "other"
        },
        setCookie: function(e, t, n) {
            var a = new Date;
            a.setTime(a.getTime() + 24 * n * 60 * 60 * 1e3),
                document.cookie = e + "=" + t + ";path=/" + (null == n ? "" : ";expires=" + a.toString())
        },
        getCookie: function(e) {
            var e = new RegExp("(^| )" + e + "=([^;]*)(;|$)");
            return (e = document.cookie.match(e)) ? e[2] : null
        }
    },
        window.$http = {
            host: "",
            urlList: ["/payment/ipaylinks/pay", "/buyer/paypal/create-payment", "/buyer/express/match", "/sail/region/get-reached-countries"],
            getForm: function(e, t, n) {
                this.ajax(e, "GET", t, "html", n)
            },
            post: function(e, t, n) {
                this.ajax(e, "POST", t, "json", n)
            },
            get: function(e, t, n) {
                this.ajax(e, "GET", t, "json", n)
            },
            ajax: function(t, e, n, a, i) {
                var o = this;
                $.ajax({
                    url: o.host + t,
                    type: e,
                    data: n,
                    dataType: a,
                    withCredentials: !0,
                    contentType: "application/json",
                    success: function(e) {
                        0 < $(".J-Loading").length && ($(".J-MaskLoad, .J-Loading").hide(),
                            $("html, body").removeClass("hidden")),
                        i && i(e),
                            e.code
                    },
                    error: function(e) {
                        0 < $(".J-Loading").length && ($(".J-MaskLoad, .J-Loading").hide(),
                            $("html, body").removeClass("hidden")),
                        -1 < o.urlList.indexOf(t) && $plug.message.error("Sorry, can't be processed right now because of a technical issue. please try again later.")
                    }
                })
            },
            upload: function(e, t, n) {
                var a = e.size / 1024 / 1024
                    , i = new FormData;
                if (i.append("file", e),
                10 < a)
                    return $plug.message.error(NP_ENV.language[NP_ENV.language.lang].image_erro),
                        !1;
                $.ajax({
                    url: "/comm/upload/file",
                    type: "POST",
                    dataType: "json",
                    timeout: 12e4,
                    cache: !1,
                    data: i,
                    processData: !1,
                    contentType: !1,
                    success: function(e) {
                        0 == e.code ? t && t(e) : $plug.message.error(e.msg)
                    },
                    error: function(e) {
                        $plug.message.error(JSON.stringify(e)),
                        n && n(e)
                    }
                })
            }
        },
        window.stag = function(e, t, n, a) {
            t = {
                event_type: e,
                event_name: t,
                params: {
                    type: "check",
                    additional: "",
                    button_pos: "",
                    user_agent: win_navigator,
                    button_name: "",
                    handler: $(".nickp-event-page-handler").val() || "",
                    client_time: (new Date).getTime(),
                    referer: $(".nickp-event-referer").val() || "",
                    page_name: $(".nickp-event-page-location").val() || ""
                }
            };
            $.extend(t.params, n);
            n = JSON.parse($plug.getCookie("ga_utm")) || {},
                n = void 0 === $plug.query().utm_source && void 0 === $plug.query().utm_medium && void 0 === $plug.query().utm_campaign && void 0 === $plug.query().utm_content && void 0 === $plug.query().utm_term && 0 < Object.keys(n).length ? n : $plug.query();
            $plug.setCookie("ga_utm", JSON.stringify(n), 7),
            n && (t.utmso = n.utm_source || "",
                t.utmmd = n.utm_medium || "",
                t.utmcp = n.utm_campaign || "",
                t.utmct = n.utm_content || "",
                t.utmtm = n.utm_term || "");
            n = JSON.parse(JSON.stringify(t));
            n.lib = "PHP",
                window.sessionStorage.setItem("xtag_utm_json", JSON.stringify(n)),
                a ? $http.post("/buyer/statistics/logger", JSON.stringify(t), function(e) {
                    a(e)
                }) : $http.post("/buyer/statistics/logger", JSON.stringify(t))
        }
        ,
        window.sharetag = function(e, t) {
            $api.sharetag(JSON.stringify({
                event_name: e,
                params: {
                    source: t || ""
                }
            }))
        }
        ,
        window.conversionsApi = function(e, t, n) {
            var a = $(".J-FBPixelId").val()
                , i = "" + Math.floor(parseInt(n.eventID.split(e)[1]) / 1e3)
                , o = JSON.parse(JSON.stringify(t))
                , i = {
                event_name: e,
                event_time: i,
                event_id: n.eventID,
                event_source_url: window.location.href,
                custom_data: null,
                pixel_id: a
            };
            t.hasOwnProperty("user_data") ? (delete o.user_data,
                i.custom_data = o,
                i.user_data = t.user_data) : i.custom_data = t,
            "Purchase" == e && (i.event_id = n.orderNumber),
            a && "" != a && $api.saveconversionsApi(JSON.stringify(i))
        }
    ;
    try {
        document.getElementById("__jh_capi").getAttribute("content") && (window.universalCAPI = function(e, t) {
                var n = (new Date).getTime()
                    , a = Math.random().toString(36).substr(2) + e + (new Date).getTime();
                $api.universalConversionsApi({
                    id: a,
                    client_dedup_id: dedup_id(e),
                    type: e,
                    data: t,
                    page_url: window.location.toString(),
                    created_at: n
                })
            }
        )
    } catch (e) {}
    window.$session = {
        getSessionId: function() {
            var e = (new Date).getTime()
                , t = new Date(e).getDate()
                , n = ""
                , a = 0
                , i = this.getSession();
            return i ? (n = (i = i.split("_AND_"))[0],
                a = parseInt(i[1]),
                18e5 < Math.abs(e - a) ? n = this.generateSession().split("_AND_")[0] : this.generateSession(n, e),
            new Date(a).getDate() != t && (n = this.generateSession().split("_AND_")[0])) : n = this.generateSession().split("_AND_")[0],
                n
        },
        getSession: function() {
            return window.localStorage.getItem("session_id")
        },
        generateSession: function(e, t) {
            if (!e) {
                var n = (new Date).getTime()
                    , n = "s.1." + n + "." + Math.random().toString(16).substr(2) + "_AND_" + n;
                return window.localStorage.setItem("session_id", n),
                    n
            }
            window.localStorage.setItem("session_id", e + "_AND_" + t)
        }
    }
});
var _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
        return typeof e
    }
    : function(e) {
        return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
    }
    , _createClass = function() {
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
function _classCallCheck(e, t) {
    if (!(e instanceof t))
        throw new TypeError("Cannot call a class as a function")
}
!function(a, e) {
    var t = (_createClass(n, [{
        key: "login",
        value: function(e) {
            "function" == typeof gtag && gtag("event", "login", {
                method: "Google"
            })
        }
    }, {
        key: "signup",
        value: function(e) {
            "function" == typeof gtag && gtag("event", "sign_up", {
                method: "Google"
            })
        }
    }, {
        key: "pageView",
        value: function(e) {}
    }, {
        key: "viewItem",
        value: function(e) {
            window.dotq = window.dotq || [],
                window.dotq.push({
                    projectId: "10000",
                    properties: {
                        pixelId: "10101331",
                        qstrings: {
                            et: "custom",
                            ea: "ViewProduct",
                            product_id: "ProductSKU"
                        }
                    }
                })
        }
    }, {
        key: "viewItemList",
        value: function(e) {}
    }, {
        key: "search",
        value: function(e) {}
    }, {
        key: "addToCart",
        value: function(e) {
            var t = {
                content_type: "product",
                content_ids: [e.sku_id],
                value: e.value,
                content_name: e.content_name,
                currency: e.currency,
                content_category: ""
            }
                , n = {
                eventID: Math.random().toString(36).substr(2) + "AddToCart" + (new Date).getTime()
            };
            "function" == typeof fbq && fbq("track", "AddToCart", t, n),
            "function" == typeof conversionsApi && conversionsApi("AddToCart", t, n),
            "function" == typeof stag && stag("page_click", "add_to_cart", {
                handler: e.handler
            }),
            "object" === _typeof(window.kwaiq) && kwaiq.track("addToCart", {
                content_id: e.sku_id,
                content_type: "product",
                content_name: e.content_name,
                quantity: e.num_items,
                price: e.value,
                value: e.num_items * e.value,
                currency: e.currency
            }),
            "function" == typeof snaptr && snaptr("track", "ADD_CART", {
                price: e.value || "",
                currency: e.currency || "",
                item_ids: e.content_ids || "",
                item_category: "",
                number_items: e.num_items || ""
            }),
            "function" == typeof universalCAPI && universalCAPI("ADD_CART", {
                price: e.value || "",
                currency: e.currency || "",
                item_ids: e.content_ids || "",
                item_category: "",
                number_items: e.num_items || ""
            }),
            "function" == typeof pintrk && pintrk("track", "addtocart", {
                value: e.value || "",
                order_quantity: e.num_items || "",
                currency: e.currency || ""
            }),
            "object" == _typeof(window.uetq) && window.uetq.push("event", "add_to_cart", {}),
            "function" == typeof gtag && gtag("event", "add_to_cart", {
                currency: e.currency || "",
                value: e.num_items * e.value,
                items: [{
                    id: e.sku_id || "",
                    name: e.content_name || "",
                    variant: e.item_variant || "",
                    quantity: e.num_items || "",
                    price: e.value || ""
                }]
            }),
            "function" == typeof gtag && gtag("event", "add_to_cart", {
                value: e.value || "",
                items: [{
                    id: e.sku_id || "",
                    google_business_vertical: "retail"
                }]
            }),
                window.dotq = window.dotq || [],
                window.dotq.push({
                    projectId: "10000",
                    properties: {
                        pixelId: "10101331",
                        qstrings: {
                            et: "custom",
                            ea: "AddToCart",
                            gv: e.value || "",
                            product_id: e.content_ids && e.content_ids[0] || ""
                        }
                    }
                }),
            "function" == typeof gtag && gtag("event", "conversion", {
                send_to: a(".J-GoogleAdsCart").val(),
                value: e.value || "",
                currency: e.currency || ""
            }),
                window._tfa = window._tfa || [],
                window._tfa.push({
                    notify: "event",
                    name: "add_to_cart",
                    id: a(".J-TaboolaPixelId").val()
                }),
            "function" == typeof obApi && obApi("track", "Add to cart")
        }
    }, {
        key: "beginCheckout",
        value: function(e) {
            var t = {
                content_ids: e.content_ids || "",
                content_type: "product",
                currency: a(".J-currency-code").val(),
                value: e.value || "",
                num_items: e.num_items || ""
            }
                , n = {
                eventID: Math.random().toString(36).substr(2) + "InitiateCheckout" + (new Date).getTime()
            };
            "function" == typeof fbq && fbq("track", "InitiateCheckout", t, n),
            "function" == typeof conversionsApi && conversionsApi("InitiateCheckout", t, n),
            "function" == typeof window.kwaiqTracking && kwaiqTracking("initiatedCheckout", e),
            "function" == typeof stag && stag("page_load", "checkout", {
                page_name: a(".nickp-event-page-location").val()
            }),
            "function" == typeof snaptr && snaptr("track", "START_CHECKOUT", {
                price: e.value || "",
                currency: e.currency || "",
                item_ids: e.content_ids || "",
                item_category: "",
                number_items: e.num_items || "",
                client_dedup_id: dedup_id("START_CHECKOUT")
            }),
            "function" == typeof universalCAPI && universalCAPI("START_CHECKOUT", {
                price: e.value || "",
                currency: e.currency || "",
                item_ids: e.content_ids || "",
                item_category: "",
                number_items: e.num_items || "",
                client_dedup_id: dedup_id("START_CHECKOUT")
            }),
            "function" == typeof gtag && gtag("event", "begin_checkout", {
                value: e.value || "",
                items: e.items || ""
            }),
            "function" == typeof gtag && gtag("event", "begin_checkout", {
                currency: a(".J-currency-code").val(),
                value: e.value || "",
                coupon: e.coupon || "",
                items: e.ads_items || ""
            }),
            "function" == typeof gtag && gtag("event", "conversion", {
                send_to: a(".J-GoogleAdsCheckout").val(),
                value: e.value || "",
                currency: e.currency || ""
            }),
                window._tfa = window._tfa || [],
                window._tfa.push({
                    notify: "event",
                    name: "start_checkout",
                    id: a(".J-TaboolaPixelId").val()
                }),
            "function" == typeof obApi && obApi("track", "checkout")
        }
    }, {
        key: "addPaymentInfo",
        value: function(e) {
            var t = {
                currency: e.currency || "",
                value: e.value || ""
            }
                , n = {
                eventID: Math.random().toString(36).substr(2) + "AddPaymentInfo" + (new Date).getTime()
            };
            "function" == typeof stag && stag("page_click", "add_payment_info", t),
            "function" == typeof gtag && gtag("event", "add_payment_info", {
                items: e.gtagSkuList || ""
            }),
            "function" == typeof fbq && fbq("track", "AddPaymentInfo", t, n),
            "function" == typeof conversionsApi && conversionsApi("AddPaymentInfo", t, n),
            "object" === _typeof(window.kwaiq) && (console.log("add payment info:", e),
                kwaiq.track("addPaymentInfo"))
        }
    }, {
        key: "purchase",
        value: function(e) {}
    }]),
        n);
    function n() {
        _classCallCheck(this, n)
    }
    e.$tracking = new t
}(jQuery, window),
    function(c, r) {
        c.isLazyLoad = !0,
            c.lazyLoad = function(e) {
                var t;
                function s(e) {
                    var t = null;
                    if (c.isLazyLoad = !1,
                        e.dataset)
                        t = e.dataset;
                    else {
                        for (var n, a = e.attributes, i = {}, o = 0; o < a.length; o++)
                            (n = a[o].name.match(/^data-(.+)/)) && (i[n[1].replace(/-([\da-z])/gi, function(e, t) {
                                return t.toUpperCase()
                            })] = a[o].value);
                        t = i
                    }
                    if (!t.hasOwnProperty("widths"))
                        return function() {
                            try {
                                return 0 === r.createElement("canvas").toDataURL("image/webp", .5).indexOf("data:image/webp")
                            } catch (e) {
                                return
                            }
                        }() ? t.original + "?x-oss-process=image/interlace,1/format,webp" : t.original;
                    if (t.hasOwnProperty("widths")) {
                        t = {
                            widths: JSON.parse(t.widths),
                            original: t.original.split(",")
                        };
                        return t.widths.length <= 0 ? t.original[0] : -1 < t.widths.indexOf(NP_ENV.config.availWidth) ? t.original[t.widths.indexOf(NP_ENV.config.availWidth)] : t.original[t.original.length - 1]
                    }
                }
                function n(i) {
                    for (var o = c.screen.height, r = 0; r < i.length; r++)
                        !function() {
                            var e, t, n = i[r], a = s(n);
                            !a || -1 < n.className.indexOf("lazy-load-show") || (t = (e = n.getBoundingClientRect()).top + e.height + o,
                            e.top <= o && 0 < t && ((t = new Image).src = a,
                                    t.onload = function() {
                                        n.className += " lazy-load-show",
                                        "IMG" == n.tagName && (n.src = a),
                                        "DIV" == n.tagName && (n.style.backgroundImage = "url(" + a + ")")
                                    }
                            ))
                        }()
                }
                "window"in (t = self) && "document"in t && "TextRectangle"in t && !("width"in t.TextRectangle.prototype) && Object.defineProperties(t.TextRectangle.prototype, {
                    width: {
                        get: function() {
                            return this.right - this.left
                        }
                    },
                    height: {
                        get: function() {
                            return this.bottom - this.top
                        }
                    }
                });
                var a = e ? r.getElementsByClassName(e) : r.getElementsByTagName("img");
                "undefined" != typeof IntersectionObserver ? function(e) {
                    for (var t = {
                        root: null,
                        rootMargin: "0px",
                        threshold: [0]
                    }, n = 0; n < e.length; n++)
                        new IntersectionObserver(function(e, i) {
                                e.forEach(function(e) {
                                    if (e.isIntersecting) {
                                        var t = new Image
                                            , n = e.target
                                            , a = s(n);
                                        if (!a || -1 < n.className.indexOf("lazy-load-show"))
                                            return !1;
                                        t.src = a,
                                            t.onload = function() {
                                                n.classList.add("lazy-load-show"),
                                                "IMG" == n.tagName && (n.src = a),
                                                "DIV" == n.tagName && (n.style.backgroundImage = "url(" + a + ")"),
                                                    i.disconnect()
                                            }
                                    }
                                })
                            }
                            ,t).observe(e[n])
                }(a) : (n(a),
                        c.onscroll = function() {
                            n(a)
                        }
                )
            }
    }(window, document),
    lazyLoad("J-LazyLoad"),
    window.onload = function() {
        lazyLoad("J-LazyLoad")
    }
    ,
    setTimeout(function() {
        window.isLazyLoad && lazyLoad("J-LazyLoad")
    }, 500);
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
function _classCallCheck(e, t) {
    if (!(e instanceof t))
        throw new TypeError("Cannot call a class as a function")
}
!function(r, e) {
    var t = (_createClass(n, [{
        key: "initConfig",
        value: function(e, t, n) {
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
            "goodsDetail" == e && (0 < t.cart.list.length && (a = t.cart.list.map(function(e) {
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
        value: function(t) {
            var n = this;
            this.isToken ? t(this.asiabillInner) : $api.getAsiabillToken({}).then(function(e) {
                t && t(e.data),
                    n.asiabillInner = e.data,
                    n.confirmChargeObj.merNo = n.asiabillInner.merNo,
                    n.paymentMethodObj.signInfo = n.asiabillInner.signInfo,
                    n.confirmChargeObj.gatewayNo = n.asiabillInner.gatewayNo,
                    n.confirmChargeObj.signInfo = n.asiabillInner.signInfo
            }),
                window.addEventListener("message", function(e) {
                    "validate" == e.data.type && "" != e.data.data.errorMsg && "confirmPaymentMethod" == e.data.data.lastEvent && ($plug.closeLoading(),
                        r(".J-CreateOrder").removeClass("np-ui-btn-loading").prop("disabled", !1))
                })
        }
    }, {
        key: "addLoading",
        value: function() {
            var e, t = document.getElementById("ab_loaderCeil");
            t || ((t = document.createElement("div")).id = "ab_loaderCeil",
                (e = document.getElementById(ele)).style.position = "relative",
            e && e.appendChild(t),
                (t = document.createElement("div")).id = "ab_loader",
                document.getElementById("ab_loaderCeil").appendChild(t))
        }
    }, {
        key: "removeLoading",
        value: function() {
            var e, t = document.getElementById("ab_loaderCeil");
            !t || (e = t.parentElement) && e.removeChild(t)
        }
    }, {
        key: "asiabillEmbedded",
        value: function() {
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
            this.getAsiabillToken(function(e) {
                c.ab = AsiabillPay(e.sessionToken),
                    c.ab.elementInit("payment_steps", t).then(function(t) {
                        var s = t.data.paymentMethodList;
                        if (0 < s.length) {
                            var e = document.getElementsByClassName("Card_radio");
                            frame = document.getElementById("PrivateFrame");
                            var n = !0
                                , a = !1
                                , t = void 0;
                            try {
                                for (var i, o = e[Symbol.iterator](); !(n = (i = o.next()).done); n = !0)
                                    !function() {
                                        var r = i.value;
                                        r.addEventListener("click", function() {
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
                    }).catch(function(e) {
                        this.removeLoading(),
                            r(".J-CreateOrder").removeClass("np-ui-btn-disabled")
                    })
            })
        }
    }, {
        key: "confirmPaymentMethodOrder",
        value: function(t) {
            var n = this;
            this.isSaveCard ? localStorage.getItem("customerId") ? (customerId = localStorage.getItem("customerId"),
                paymentMethodObj.customerId = customerId,
                this.confirmPaymentM(t)) : createHttpRequest(customerUrl, "post", "json", {
                description: "123123123123",
                email: "lcq@gmail.com",
                firstName: "CL",
                lastName: "BRW1",
                phone: "13249432555"
            }, function(e) {
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
        value: function(t) {
            var n = this;
            $plug.loading(NP_ENV.language[NP_ENV.language.lang].payment_in_progress),
                this.ab.confirmPaymentMethod({
                    apikey: this.asiabillInner.sessionToken,
                    trnxDetail: this.paymentMethodObj
                }).then(function(e) {
                    "0" === e.data.code && (t && t(e.data, n) || (n.customerPaymentMethodId = e.data.data.customerPaymentMethodId,
                        n.confirmChargeObj.customerPaymentMethodId = e.data.data.customerPaymentMethodId,
                        n.asiabillInnerCapture()))
                })
        }
    }, {
        key: "asiabillInnerCapture",
        value: function() {
            var e = {
                order_number: this.orderNumber,
                token: this.asiabillInner.sessionToken,
                payment_id: this.customerPaymentMethodId
            };
            $api.asiabillInnerCapture(JSON.stringify(e)).then(function(e) {
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
function _classCallCheck(e, t) {
    if (!(e instanceof t))
        throw new TypeError("Cannot call a class as a function")
}
!function(a, e) {
    var t = (_createClass(n, [{
        key: "initConfig",
        value: function(e, t, n) {
            "orderNo" == e && (this.orderNumber = n)
        }
    }, {
        key: "resetCreateOrderBtn",
        value: function() {
            a(".J-CreateOrder").removeClass("np-ui-btn-loading").prop("disabled", !1),
            0 < a(".J-Loading").length && a(".J-MaskLoad, .J-Loading").hide(),
                a("html, body").removeClass("hidden")
        }
    }, {
        key: "paymentSubmit",
        value: function() {
            $plug.loading(NP_ENV.language[NP_ENV.language.lang].payment_in_progress),
                this.payIframe.contentWindow.postMessage({
                    event: "submit"
                }, "*")
        }
    }, {
        key: "showLoading",
        value: function() {
            a(".scpay-card-payment-form-box").find(".J-scpay-card-payment-form-loading").remove(),
                a(".scpay-card-payment-form-box").append('<div class="J-scpay-card-payment-form-loading shipping-methods-loading">\n\t\t\t\t<span class="methods-loading">\n\t\t\t\t\t<img src="/liquid/buyer/public/img/methods-load.png" alt="">\n\t\t\t\t</span>\n\t\t\t</div>'),
                a(".scpay-card-payment-form-warp").hide(),
                a(".J-scpay-card-payment-form-loading").show()
        }
    }, {
        key: "hideLoading",
        value: function() {
            a(".scpay-card-payment-form-warp").show(),
                a(".J-scpay-card-payment-form-loading").hide()
        }
    }, {
        key: "iframeLoaded",
        value: function() {
            var n = this;
            this.hideLoading(),
                window.addEventListener("message", function(e) {
                    switch (console.log(e.data),
                        e.data.event) {
                        case "payment_succeed":
                            n.resetCreateOrderBtn(),
                                a(".order-step.J-PaymentMethod .paypal-paypal-error").remove();
                            break;
                        case "payment_failed":
                            var t;
                            n.resetCreateOrderBtn(),
                            e.data.msg && 0 == a(".paypal-paypal-error").length && ((t = a('<div class="paypal-paypal-error">\n                <span class="iconfont icon-gantanhao"></span>\n                <span>Unfortunately, we can\'t process your payment. Select a different payment option or replace your credit card.</span>\n            </div>')).insertAfter(a(".order-step.J-PaymentMethod > .order-pay-tips")),
                                a().append(t))
                    }
                })
        }
    }, {
        key: "createIframe",
        value: function() {
            var e = this
                , t = document.createElement("iframe");
            t.id = "scpay-card-payment-iframe",
                t.width = "100%",
                t.height = this.iframeHeight,
                t.src = this.payment_url,
                t.setAttribute("border", "0"),
                t.setAttribute("frameborder", "no"),
                t.setAttribute("marginwidth", "0"),
                t.setAttribute("marginheight", "0"),
                t.attachEvent ? t.attachEvent("onload", function() {
                    e.iframeLoaded()
                }) : t.onload = function() {
                    e.iframeLoaded()
                }
                ,
                a(".scpay-card-payment-form-warp").empty(),
                a(".scpay-card-payment-form-warp")[0].append(t),
                this.payIframe = t
        }
    }, {
        key: "scpayCardSet",
        value: function() {
            var t = this;
            document.querySelector("#scpay-card-payment-iframe") || (this.showLoading(),
            this.payment_url || this.isLoad || (this.isLoad = !0,
                $api.scpayCardCreatePayment({
                    order_number: this.order_number
                }).then(function(e) {
                    0 === e.code ? (t.payment_url = e.data.payment_url,
                        t.paymentObj = e.data,
                        t.iframeHeight = e.data.height,
                        t.createIframe()) : (console.error(e.msg),
                        t.hideLoading(),
                        t.isLoad = !1)
                })),
            this.payment_url && this.createIframe())
        }
    }]),
        n);
    function n() {
        _classCallCheck(this, n),
            this.isLoad = !1,
            this.payment_url = null,
            this.inPaying = !1,
            this.iframeHeight = 330,
            this.order_number = "",
            this.paymentObj = {}
    }
    e.$scPayCardPayment = new t
}(jQuery, window);

    });`;
    document.body.appendChild(scriptEle);
    // let node = document.getElementById('createForm');
    // let cv = node.cloneNode(true);
    // document.body.appendChild(cv);
    // document.getElementById('haha').remove();
    console.log(new Date());
});
