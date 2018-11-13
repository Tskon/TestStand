"use strict";
var EPGJS_MSG_CODE = {
    VALID: "202",
    INVALID: "406"
}
    , EPGJS_VALIDATION = function() {
    var t = !1
        , r = ""
        , a = [{
        type: "visa",
        regex: /^4/
    }, {
        type: "mastercard",
        regex: /^5[1-5]|^2/
    }, {
        type: "amex",
        regex: /^3[47]/
    }, {
        type: "diners_club_carte_blanche",
        regex: /^30[0-5]/
    }, {
        type: "diners_club_international",
        regex: /^36/
    }, {
        type: "jcb",
        regex: /^35(2[89]|[3-8][0-9])/
    }, {
        type: "laser",
        regex: /^(6304|670[69]|6771)/
    }, {
        type: "visa_electron",
        regex: /^(4026|417500|4508|4844|491(3|7))/
    }, {
        type: "maestro",
        regex: /^(5000|5018|5020|5038|6304|6759|6799|6060|676[1-5])/
    }, {
        type: "discover",
        regex: /^(6011|622(12[6-9]|1[3-9][0-9]|[2-8][0-9]{2}|9[0-1][0-9]|92[0-5]|64[4-9])|65)/
    }, {
        type: "astropay",
        regex: /^1[0-9]{5}/
    }]
        , n = "validationError.luhnCheck"
        , i = "validationError.invalidExpDate"
        , o = "validationError.expiredExpDate"
        , s = function(t) {
        if (t) {
            var n = !1;
            a.forEach(function(e) {
                if (n)
                    return n;
                e.regex.test(t.substring(0, 6)) && (r = e.type,
                    n = !0)
            })
        }
        return n
    }
        , u = function(e) {
        var t, n, r, a, i, o;
        for (n = a = r = 0,
                 i = (o = e.split("").reverse()).length; a < i; n = ++a)
            t = +(t = o[n]),
                r += n % 2 ? (t *= 2) < 10 ? t : t - 9 : t;
        return r % 10 == 0
    };
    return {
        validateCard: function(e) {
            return s(e) && u(e)
        },
        validateExpDate: function(e) {
            if (e && 4 === e.length) {
                var t = e.substring(2, 4) + e.substring(0, 2)
                    , n = new Date;
                return n.getFullYear().toString().substring(2, 4) + "" + (1 < n.getMonth().toString().length ? n.getMonth() + 1 : "0" + (n.getMonth() + 1)) <= t ? "" : EPGJS_VALIDATION.getMsgExpiredExpDate()
            }
            return EPGJS_VALIDATION.getMsgInvalidExpDate()
        },
        getMsgInvalidLunhNumber: function() {
            return n
        },
        setMsgInvalidLunhNumber: function(e) {
            n = e
        },
        getMsgValidCard: function() {
            return "validation.validPan"
        },
        getMsgInvalidExpDate: function() {
            return i
        },
        setMsgInvalidExpDate: function(e) {
            i = e
        },
        getMsgExpiredExpDate: function() {
            return o
        },
        setMsgExpiredExpDate: function(e) {
            o = e
        },
        getCardTypes: function() {
            return a
        },
        setCardTypes: function(e) {
            a = e
        },
        getCardType: function() {
            return r
        },
        getPanNovalidate: function() {
            return t
        },
        setPanNovalidate: function(e) {
            t = e
        }
    }
}()
    , EPGJS_ELEM = function() {
    var t = !1
        , e = function() {
        document.getElementById("pan").addEventListener("keyup", function(e) {
            var t = document.getElementById("pan");
            e.which ? e.which : e.keyCode;
            t.value = n(t.value),
                t.value
        })
    }
        , n = function(e) {
        var t = (e = (e = e.replace(/\D/g, "")).substring(0, 16)).length;
        return 0 == t ? e = e : t <= 4 ? e = e : 4 < t && t <= 8 ? e = e.substring(0, 4) + " " + e.substring(4, t) : 8 < t && t <= 12 ? e = e.substring(0, 4) + " " + e.substring(4, 8) + " " + e.substring(8, t) : 12 < t && t <= 16 ? e = e.substring(0, 4) + " " + e.substring(4, 8) + " " + e.substring(8, 12) + " " + e.substring(12, t) : 16 < t && t <= 20 && (e = e.substring(0, 4) + " " + e.substring(4, 8) + " " + e.substring(8, 12) + " " + e.substring(12, 16) + " " + e.substring(16, t)),
            e
    };
    return {
        init: function() {
            e()
        },
        numberPressed: function(e) {
            var t = e.which ? e.which : e.keyCode;
            return !(31 < t && (t < 48 || 57 < t) && (t < 36 || 40 < t))
        },
        novalidate: function(e) {
            t || (e && document.querySelector("form").addEventListener("invalid", function(e) {
                e.preventDefault()
            }, !0),
                t = !0)
        }
    }
}()
    , EPGJS_PAN = function() {
    var r, n, a = "", i = "", Setter222 = "", s = "", u = EPGJS_VALIDATION.getMsgInvalidLunhNumber();
    function t(e, t) {
        t || (t = window.location.href),
            e = e.replace(/[\[\]]/g, "\\$&");
        var n = new RegExp("[?&]" + e + "(=([^&#]*)|&|#|$)").exec(t);
        return n ? n[2] ? decodeURIComponent(n[2].replace(/\+/g, " ")) : "" : null
    }
    var c = function() {
        p("translate", {
            i18n: {
                placeholder: "creditcards.cardnumber",
                "data-error-label": "validationError.numbersOnly",
                "data-error-label-params": "validationError.numbersOnly",
                "validationError.luhnCheck": "validationError.luhnCheck"
            }
        })
    }
        , l = function() {
        p("style"),
            c()
    }
        , d = function(e, t) {
        var n;
        "novalidate" == e ? EPGJS_ELEM.novalidate(t.novalidate) : "style" == e ? g(t.style) : "register" == e ? I(t.formData, t.pmName) : "quickpay" == e ? S(t.formData, t.pmName) : "init-translate" == t.action ? c() : "translate" == t.action ? (n = t.i18n,
            r.attr("placeholder", $("<div/>").html(n.placeholder).text()),
            r.attr("data-error-label", $("<div/>").html(n["data-error-label"]).text()),
            r.attr("data-error-label-params", $("<div/>").html(n["data-error-label-params"]).text()),
            u = $("<div/>").html(n["validationError.luhnCheck"]).text()) : "focus" == t.action && (r[0].focus(),
            v(),
            f())
    }
        , e = function() {
        Setter222 = t("authToken");
        var e = window.location.origin + "/";
        e = (e = (e = (e = e.replace(":8181", ":8002")).replace("-rendercashier-prd", "-web")).replace("-rendercashier-", "-web-")).replace("-rendercashier", "-web"),
            s = e,
            n = function() {
                if (location.ancestorOrigins)
                    return location.ancestorOrigins[0];
                var e = $("<a>", {
                    href: document.referrer
                })[0];
                return e.protocol + "//" + e.hostname
            }()
    }
        , g = function(e) {
        var t = e;
        $.each(t, function(e, t) {
            t && r.css(e, t)
        })
    }
        , p = function(e, t) {
        var n = t;
        t || (n = {}),
            n.action = e,
            parent.postMessage(JSON.stringify(n), i)
    }
        , f = function() {
        r.val(),
            r.val(a),
            p("focus")
    }
        , v = function() {
        p("inputCheck", E());
        var e = $("#pan-form");
        e[0].checkValidity() || e.find(":submit").click()
    }
        , h = function() {
        var e;
        a = r.val(),
            p("blur", E(a)),
            r.val((e = a) && 4 < e.length ? Array(e.length - 3).join("*") + e.substr(e.length - 4) : e)
    }
        , E = function() {
        var e = r[0];
        return e.setCustomValidity(""),
            e.value.replace(/\D/g, "").length % 4 == 0 && e.checkValidity() && EPGJS_VALIDATION.validateCard(e.value.replace(/\D/g, "")) ? (e.setCustomValidity(""),
                e.removeAttribute("x-moz-errormessage"),
                m(EPGJS_MSG_CODE.VALID, EPGJS_VALIDATION.getMsgValidCard())) : (e.setCustomValidity(u),
                e.setAttribute("x-moz-errormessage", u),
                m(EPGJS_MSG_CODE.INVALID, u))
    }
        , m = function(e, t) {
        var n = {};
        return n.code = e,
            n.message = t,
            n
    }
        , b = function() {
        Setter222 = t("authToken"),
            _SetLodashMb(s, Setter222, iSetterNeedFind, x)
    }
        , iSetterNeedFind = function(e) {
        var t;
        for (t = e.length - 1; 0 <= t; --t)
            n == e[t] && (i = e[t]);
        l()
    }
        , x = function(e, t) {
        var n = JSON.parse(t);
        l(),
            p("fail-merchant-domain", m(n.errorCode, n.errorMessage))
    };
    function t(e, t) {
        t || (t = window.location.href),
            e = e.replace(/[\[\]]/g, "\\$&");
        var n = new RegExp("[?&]" + e + "(=([^&#]*)|&|#|$)").exec(t);
        return n ? n[2] ? decodeURIComponent(n[2].replace(/\+/g, " ")) : "" : null
    }
    var S = function(e, t) {
        var n = e;
        n.cardNumber = a.replace(/\D/g, ""),
            J(s, n, t, Setter222, D, C)
    }
        , D = function(e) {
        p("quickpay", e)
    }
        , C = function(e, t) {
        var n = JSON.parse(t);
        p("fail-quickpay", m(n.errorCode, n.errorMessage))
    }
        , I = function(e, t) {
        var n = e;
        n.cardNumber = a.replace(/\D/g, ""),
            A(s, n, t, Setter222, M, N)
    }
        , M = function(e) {
        p("registered", e)
    }
        , N = function(e, t) {
        var n = JSON.parse(t);
        p("fail-registration", m(n.errorCode, n.errorMessage))
    }
        , P = function(e, t, n, r, a, i) {
        var o = new XMLHttpRequest;
        for (var s in o.onreadystatechange = function() {
            4 == o.readyState && 200 == o.status ? a && a(JSON.parse(o.responseText)) : 4 == o.readyState && i && i(o.status, o.responseText)
        }
            ,
            o.open(e, t, !0),
            r)
            o.setRequestHeader(s, r[s]);
        o.send(JSON.stringify(n))
    }
        , _SetLodashMb = function(e, t, n, r) {
        P("GET", e + "cashier/merchant/domains/", {}, {
            accept: "application/json",
            "Content-Type": "application/json",
            authToken: t
        }, n, r)
    }
        , A = function(e, t, n, r, a, i) {
        P("POST", e + "/account/" + n, t, {
            accept: "application/json",
            "Content-Type": "application/json",
            authToken: r
        }, a, i)
    }
        , J = function(e, t, n, r, a, i) {
        P("POST", e + "/quickpay/" + n, t, {
            accept: "application/json",
            "Content-Type": "application/json",
            authToken: r
        }, a, i)
    };
    return {
        receiveMessage: function(e) {
            if (e.origin.split("/").join("") === i.split("/").join("")) {
                var t = JSON.parse(e.data);
                d(t.action, t)
            }
        },
        init: function() {
            (r = $("#pan"))[0].addEventListener("focus", f, !0),
                r[0].addEventListener("blur", h, !0),
                r.on("input", v),
                EPGJS_ELEM.init(),
                e(),
                b()
        },
        validate: v
    }
}();
window.onload = function() {
    window.addEventListener("message", EPGJS_PAN.receiveMessage),
        EPGJS_PAN.init()
}
;
