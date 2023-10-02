;;;typeof Roblox == "undefined" && (Roblox = {}),
typeof Roblox.GenericConfirmation == "undefined" && (Roblox.GenericConfirmation = function() {
    function w() {
        n.isOpen = !1,
        t()
    }
    function k(t) {
        var a, e, o, s, l;
        n.isOpen = !0,
        a = {
            titleText: "",
            bodyContent: "",
            footerText: "",
            acceptText: Roblox.Resources.GenericConfirmation.yes,
            declineText: Roblox.Resources.GenericConfirmation.No,
            acceptColor: u,
            declineColor: f,
            xToCancel: !1,
            onAccept: function() {
                return !1
            },
            onDecline: function() {
                return !1
            },
            onCancel: function() {
                return !1
            },
            imageUrl: null,
            allowHtmlContentInBody: !1,
            allowHtmlContentInFooter: !1,
            dismissable: !0,
            fieldValidationRequired: !1,
            onOpenCallback: function() {}
        },
        t = $.extend({}, a, t),
        c.overlayClose = t.dismissable,
        c.escClose = t.dismissable,
        e = $(i),
        e.html(t.acceptText),
        e.attr("class", "btn-large " + t.acceptColor),
        e.unbind(),
        e.bind("click", function() {
            return v(e) ? !1 : (t.fieldValidationRequired ? nt(t.onAccept) : h(t.onAccept),
            !1)
        }),
        o = $(r),
        o.html(t.declineText),
        o.attr("class", "btn-large " + t.declineColor),
        o.unbind(),
        o.bind("click", function() {
            return v(o) ? !1 : (h(t.onDecline),
            !1)
        }),
        $('[data-modal-handle="confirmation"] div.Title').text(t.titleText),
        s = $("[data-modal-handle='confirmation']"),
        t.imageUrl == null ? s.addClass("noImage") : (s.find("img.GenericModalImage").attr("src", t.imageUrl),
        s.removeClass("noImage")),
        t.allowHtmlContentInBody ? $("[data-modal-handle='confirmation'] div.Message").html(t.bodyContent) : $("[data-modal-handle='confirmation'] div.Message").text(t.bodyContent),
        $.trim(t.footerText) == "" ? $('[data-modal-handle="confirmation"] div.ConfirmationModalFooter').hide() : $('[data-modal-handle="confirmation"] div.ConfirmationModalFooter').show(),
        t.allowHtmlContentInFooter ? $('[data-modal-handle="confirmation"] div.ConfirmationModalFooter').html(t.footerText) : $('[data-modal-handle="confirmation"] div.ConfirmationModalFooter').text(t.footerText),
        $("[data-modal-handle='confirmation']").modal(c),
        l = $("a.genericmodal-close"),
        l.unbind(),
        l.bind("click", function() {
            return h(t.onCancel),
            !1
        }),
        t.xToCancel || l.hide(),
        t.onOpenCallback()
    }
    function a(n) {
        n.hasClass(f) ? n.addClass(s) : n.hasClass(l) ? n.addClass(e) : n.hasClass(u) && n.addClass(o)
    }
    function v(n) {
        return n.hasClass(o) || n.hasClass(s) || n.hasClass(e) ? !0 : !1
    }
    function b() {
        var n = $(i)
          , t = $(r);
        a(n),
        a(t)
    }
    function g() {
        var u = $(i)
          , t = $(r)
          , n = o + " " + s + " " + e;
        u.removeClass(n),
        t.removeClass(n)
    }
    function p() {
        if (n.isOpen) {
            var t = $(i);
            t.click()
        }
    }
    function y() {
        var n = $(r);
        n.click()
    }
    function t(t) {
        n.isOpen = !1,
        typeof t != "undefined" ? $.modal.close(t) : $.modal.close()
    }
    function h(n) {
        t(),
        typeof n == "function" && n()
    }
    function nt(n) {
        if (typeof n == "function") {
            var i = n();
            if (i !== "undefined" && i == !1)
                return !1
        }
        t()
    }
    var l = "btn-primary"
      , u = "btn-neutral"
      , f = "btn-negative"
      , e = "btn-disabled-primary"
      , o = "btn-disabled-neutral"
      , s = "btn-disabled-negative"
      , d = "btn-none"
      , i = "#roblox-confirm-btn"
      , r = "#roblox-decline-btn"
      , n = {
        isOpen: !1
    }
      , c = {
        overlayClose: !0,
        escClose: !0,
        opacity: 80,
        overlayCss: {
            backgroundColor: "#000"
        },
        onClose: w
    };
    return {
        open: k,
        close: t,
        disableButtons: b,
        enableButtons: g,
        clickYes: p,
        clickNo: y,
        status: n,
        green: l,
        blue: u,
        gray: f,
        none: d
    }
}()),
$(document).keypress(function(n) {
    Roblox.GenericConfirmation.status.isOpen && n.which === 13 && Roblox.GenericConfirmation.clickYes()
});
;typeof Roblox.GenericModal == "undefined" && (Roblox.GenericModal = function() {
    function s(u, f, e, s, h, c) {
        var l, a;
        t.isOpen = !0,
        n = $.extend({}, n, c),
        i = s,
        l = $("div.GenericModal").filter(":first"),
        l.find("div.Title").text(u),
        f === null ? l.addClass("noImage") : (l.find("img.GenericModalImage").attr("src", f),
        l.removeClass("noImage")),
        l.find("div.Message").html(e),
        h && (l.removeClass("smallModal"),
        l.addClass("largeModal")),
        a = l.find(o),
        a.attr("class", "btn-large " + n.acceptColor),
        a.unbind(),
        a.bind("click", function() {
            r()
        }),
        l.modal(n)
    }
    function r() {
        t.isOpen = !1,
        $.modal.close(),
        typeof i == "function" && i()
    }
    var f = "btn-primary", u = "btn-neutral", e = "btn-negative", o = ".ImageButton.btn-neutral.btn-large.roblox-ok", t = {
        isOpen: !1
    }, n = {
        overlayClose: !0,
        escClose: !0,
        opacity: 80,
        overlayCss: {
            backgroundColor: "#000"
        },
        acceptColor: u
    }, i;
    return $(function() {
        $(document).on("click", ".GenericModal .roblox-ok", function() {
            r()
        })
    }),
    {
        close: r,
        open: s,
        status: t,
        green: f,
        blue: u,
        gray: e
    }
}()),
Roblox.GenericModal.Resources = {
    ErrorText: "Error",
    ErrorMessage: "Sorry, an error occurred."
},
$(document).keypress(function(n) {
    n.which === 13 && Roblox.GenericModal.status.isOpen && Roblox.GenericModal.close()
});
;$(function() {
    function n() {
        if ($("#txtStatusMessage").prop("disabled"))
            return !1;
        var t = $("#HomeContainer").data("update-status-url")
          , i = $("#txtStatusMessage").val()
          , n = $("#statusForm")
          , r = {
            status: i
        };
        return $("#shareButton").hide(),
        $("#loadingImage").show(),
        $.ajax({
            cache: !1,
            url: t,
            type: "POST",
            data: r,
            success: function(t) {
                t.success ? ($("#txtStatusMessage").val(t.message),
                n.find(".form-group").removeClass("form-has-feedback form-has-error"),
                n.find(".form-control-label").hide()) : ($("#txtStatusMessage").val(""),
                n.find(".form-group").addClass("form-has-feedback form-has-error"),
                n.find(".form-control-label").text(t.message).show())
            },
            error: function() {
                $("#txtStatusMessage").val(""),
                n.find(".form-group").addClass("form-has-feedback form-has-error"),
                n.find(".form-control-label").show()
            },
            complete: function() {
                $("#txtStatusMessage").blur(),
                $("#shareButton").show(),
                $("#loadingImage").hide()
				document.location.reload();
            }
        }),
        !0
    }
    var t = $("#HomeContainer").data("facebook-share");
    $("#btnFacebookShare").click(function() {
        $.post(t, function(n) {
            $("#btnFacebookShare").removeClass(),
            n.success ? $("#facebookShareResult").addClass("status-confirm") : $("#facebookShareResult").addClass("status-error"),
            $("#facebookShareResult").text(n.message),
            $("#facebookShareResult").fadeIn().delay(5e3).fadeOut()
        })
    }),
    $("#HomeContainer *[data-retry-url]").loadRobloxThumbnails(),
    $("#shareButton").click(function() {
        n()
    }),
    $("#txtStatusMessage").keypress(function(t) {
        t.which == "13" && n()
    });
    $(document).on("GuttersHidden", function() {
        $("#LeftGutterAdContainer").hide(),
        $("#RightGutterAdContainer").hide()
    })
});
;Roblox = Roblox || {},
Roblox.GameDetailReferral = Roblox.GameDetailReferral || {},
Roblox.GameDetailReferral.AppendUrl = function(n, t, i) {
    if (!n.data("modified")) {
        var e = $(t).length
          , u = i || n
          , f = u.attr("href")
          , r = f;
        r += f.indexOf("?") !== -1 ? "&" : "?",
        r += "LocalTimestamp=" + (new Date).toISOString() + "&TotalInSort=" + e,
        u.attr("href", r),
        n.data("modified", !0)
    }
}
,
$(function() {
    var n = ".game-card-link";
    $("#recently-visited-places").on("mousedown", ".game-card", function() {
        Roblox.GameDetailReferral.AppendUrl($(this).find(n), "#recently-visited-places .list-item")
    });
    $("#my-favorties-games").on("mousedown", ".game-card", function() {
        Roblox.GameDetailReferral.AppendUrl($(this).find(n), "#my-favorties-games .game-card")
    });
    $("#friend-activity").on("mousedown", ".game-card", function() {
        Roblox.GameDetailReferral.AppendUrl($(this).find(n), "#friend-activity .game-card")
    });
    $("#UserPlaces div.Thumbnail").on("mousedown", function() {
        Roblox.GameDetailReferral.AppendUrl($(this), ".Thumbnail", $(this).find("a"))
    });
    $("#GamesListsContainer").on("mousedown", ".game-card", function() {
        var t = $(this).parent().siblings().length + 1;
        Roblox.GameDetailReferral.AppendUrl($(this).find(n), new Array(t))
    });
    $("#my-recommended-games").on("mousedown", ".game-card", function() {
        Roblox.GameDetailReferral.AppendUrl($(this).find(n), "#my-recommended-games .game-card")
    });
    $("#HomeContainer #FeaturedGamesContainer").on("mousedown", ".item-place a", function() {
        Roblox.GameDetailReferral.AppendUrl($(this), "#FeaturedGamesContainer .item-place")
    })
});
;"use strict";
var Roblox = Roblox || {};
Roblox.AdsHelper = Roblox.AdsHelper || {},
Roblox.AdsLibrary = {},
Roblox.AdsLibrary.adsIdList = ["Skyscraper-Adp-Left", "Skyscraper-Adp-Right", "Leaderboard-Abp", "GamePageAdDiv1", "GamePageAdDiv2", "GamePageAdDiv3", "ProfilePageAdDiv1", "ProfilePageAdDiv2"],
Roblox.AdsLibrary.adsParameters = {
    "Skyscraper-Adp-Left": {
        element: $("#Skyscraper-Adp-Left"),
        template: null,
        fitTwoAds: !0,
        fitOneAd: !1,
        isSkyscraper: !0
    },
    "Skyscraper-Adp-Right": {
        element: $("#Skyscraper-Adp-Right"),
        tempalte: null,
        fitTwoAds: !0,
        fitOneAd: !0,
        isSkyscraper: !0
    },
    "Leaderboard-Abp": {
        element: $("#Leaderboard-Abp"),
        tempalte: null,
        fitTwoAds: !0,
        fitOneAd: !0,
        isLeaderboard: !0
    },
    GamePageAdDiv1: {
        element: $("#GamePageAdDiv1"),
        template: null,
        isPageAd: !0
    },
    GamePageAdDiv2: {
        element: $("#GamePageAdDiv2"),
        template: null,
        isPageAd: !0
    },
    GamePageAdDiv3: {
        element: $("#GamePageAdDiv3"),
        template: null,
        isPageAd: !0
    },
    ProfilePageAdDiv1: {
        element: $("#ProfilePageAdDiv1"),
        template: null,
        isPageAd: !0
    },
    ProfilePageAdDiv2: {
        element: $("#ProfilePageAdDiv2"),
        template: null,
        isPageAd: !0
    }
},
Roblox.AdsHelper.AdRefresher = function() {
    function c(n) {
        return !n || !$.trim($(n).html())
    }
    function h(n) {
        t.push(n)
    }
    function s() {
        return googletag.pubadsReady
    }
    function r(n) {
        var u, f, e, i;
        typeof n == "undefined" && (n = v),
        u = !1;
        for (f in t) {
            if (e = "#" + t[f] + " [data-js-adtype]",
            i = $(e),
            typeof i == "undefined")
                return;
            if (i.attr("data-js-adtype") === "iframead")
                o(i);
            else if (i.attr("data-js-adtype") === "gptAd")
                if (s())
                    u = !0;
                else if (n > 0) {
                    setTimeout(function() {
                        r(--n)
                    }, y);
                    break
                }
        }
        u && googletag.cmd.push(function() {
            googletag.pubads().refresh()
        })
    }
    function o(n) {
        var i = n.attr("src"), r, u, t;
        typeof i == "string" && (r = i.indexOf("?") < 0 ? "?" : "&",
        u = i + r + "nocache=" + (new Date).getMilliseconds().toString(),
        typeof n[0] != "undefined") && (t = n[0].contentDocument,
        t === undefined && (t = n[0].contentWindow),
        t.location.href !== "about:blank" && t.location.replace(u))
    }
    function n(n, t, i) {
        i.length && c(i) && (i.append(n),
        r())
    }
    function b() {
        for (var u = $(window).width(), f, r, t, i = 0; i < Roblox.AdsLibrary.adsIdList.length; i++)
            r = Roblox.AdsLibrary.adsIdList[i],
            t = Roblox.AdsLibrary.adsParameters[r],
            t && !t.template && (f = t.element,
            t.template = f.html());
        for (i = 0; i < Roblox.AdsLibrary.adsIdList.length; i++)
            (r = Roblox.AdsLibrary.adsIdList[i],
            t = Roblox.AdsLibrary.adsParameters[r],
            t) && (t.isSkyscraper ? u >= e && t.fitTwoAds ? n(t.template, r, t.element) : u < e && u >= l ? t.fitOneAd ? n(t.template, r, t.element) : t.element.empty() : t.element.empty() : t.isLeaderboard ? u < p ? t.element.empty() : n(t.template, r, t.element) : t.isPageAd && (u < w ? t.element.empty() : n(t.template, r, t.element)))
    }
    var t = []
      , i = 20
      , u = 970
      , f = 160
      , p = 728
      , y = 100
      , v = 16
      , e = $("[data-max-width-for-two-ads]").attr("data-max-width-for-two-ads") || u + f * 2 + 48 - i
      , l = $("[data-max-width-for-one-ads]").attr("data-max-width-for-one-ads") || u + f + 24 - i
      , a = 1024
      , w = a - i;
    return {
        registerAd: h,
        refreshAds: r,
        adjustAdsFitScreen: b,
        getAds: n
    }
}(),
Roblox.AdsHelper.DynamicAdCreator = function() {
    function n() {
        var n = $(".dynamic-ad").filter(".unpopulated");
        n.each(function(n, t) {
            var i = $(t)
              , u = i.attr("data-ad-slot")
              , f = parseInt(i.attr("data-ad-width"))
              , e = parseInt(i.attr("data-ad-height"))
              , r = i.children(".ad-slot").attr("id");
            googletag.cmd.push(function() {
                var n = googletag.defineSlot(u, [f, e], r).addService(googletag.pubads());
                googletag.display(r),
                googletag.pubads().refresh([n])
            }),
            i.removeClass("unpopulated")
        })
    }
    return {
        populateNewAds: n
    }
}(),
$(function() {
    $(window).resize(function() {
        Roblox.AdsHelper.AdRefresher.adjustAdsFitScreen()
    })
});
;function InitStringTruncator() {
    isInitialized || (fitStringSpan = document.createElement("span"),
    fitStringSpan.style.display = "inline-block",
    fitStringSpan.style.visibility = "hidden",
    fitStringSpan.style.height = "0px",
    fitStringSpan.style.padding = "0px",
    document.body.appendChild(fitStringSpan),
    isInitialized = !0)
}
function fitStringToWidth(n, t, i) {
    function o(n) {
        return n.replace("<", "&lt;").replace(">", "&gt;")
    }
    var u, r, f, e, s;
    if (isInitialized || InitStringTruncator(),
    i && (fitStringSpan.className = i),
    u = o(n),
    fitStringSpan.innerHTML = u,
    fitStringSpan.offsetWidth > t) {
        for (r = 0,
        e = n.length; s = e - r >> 1; )
            f = r + s,
            fitStringSpan.innerHTML = o(n.substring(0, f)) + "&hellip;",
            fitStringSpan.offsetWidth > t ? e = f : r = f;
        u = n.substring(0, r) + "&hellip;"
    }
    return u
}
function fitStringToWidthSafe(n, t, i) {
    var r = fitStringToWidth(n, t, i), u;
    return r.indexOf("&hellip;") != -1 && (u = r.lastIndexOf(" "),
    u != -1 && u + 10 <= r.length && (r = r.substring(0, u + 2) + "&hellip;")),
    r
}
function fitStringToWidthSafeText(n, t, i) {
    return fitStringToWidthSafe(n, t, i).replace("&hellip;", "...")
}
var isInitialized = !1
  , fitStringSpan = null;
;var Roblox = Roblox || {};
Roblox.Voting = function() {
    var f = function() {
        $(".users-vote .upvote").unbind().click(function() {
            i($(this), !0)
        }),
        $(".users-vote .downvote").unbind().click(function() {
            i($(this), !1)
        });
        var t = parseInt($(".voting-panel").data("total-up-votes"))
          , r = parseInt($(".voting-panel").data("total-down-votes"));
        n(t, r)
    }
      , i = function(n, i) {
        var f = $(".voting-panel").attr("data-user-authenticated"), r;
        if (f.toLowerCase() == "false") {
            u("GuestUser");
            return
        }
        r = $(".voting-panel").data("asset-id"),
        n.hasClass("selected") || n.find("i").hasClass("selected") || n.find(".icon-like, .icon-dislike").hasClass("selected") ? t(r, null) : t(r, i)
    }
      , t = function(n, t) {
        $(".voting-panel .loading").show(),
        $.ajax({
            type: "POST",
            url: "/voting/vote?assetId=" + n + "&vote=" + t,
            success: e,
            error: o
        })
    }
      , e = function(t) {
        var o = $(".icon-like").length;
        if ($(".voting-panel .loading").hide(),
        t.Success) {
            r(t.Model.UpVotes, t.Model.DownVotes);
            var i = $(".voting-panel .upvote")
              , f = $(".voting-panel .downvote")
              , e = $(".users-vote");
            o && (i = $(".voting-panel .upvote .icon-like"),
            f = $(".voting-panel .downvote .icon-dislike")),
            t.Model.UserVote !== null ? e.hasClass("has-voted") || e.addClass("has-voted") : e.removeClass("has-voted"),
            i.hasClass("selected") && i.removeClass("selected"),
            f.hasClass("selected") && f.removeClass("selected"),
            t.Model.UserVote !== null && (t.Model.UserVote ? i.addClass("selected") : f.addClass("selected")),
            n(t.Model.UpVotes, t.Model.DownVotes)
        } else
            u(t.ModalType)
    }
      , o = function() {
        $(".voting-panel .loading").hide()
    }
      , n = function(n, t, i) {
        var e = i || $("#voting-section"), r, u, f;
        isNaN(n) || isNaN(t) || (r = n === 0 ? 0 : t === 0 ? 100 : Math.floor(n / (n + t) * 100),
        r > 100 && (r = 100),
        u = e.find(".vote-container"),
        f = u.find(".vote-background"),
        u.find(".vote-percentage").css("width", r + "%"),
        t > 0 ? f.addClass("has-votes") : f.removeClass("has-votes"))
    }
      , r = function(t, i) {
        t = Roblox.NumberFormatting.abbreviatedFormat(t),
        i = Roblox.NumberFormatting.abbreviatedFormat(i),
        $(".voting-panel .total-upvotes-text").text(t),
        $(".voting-panel .total-downvotes-text").text(i),
        $(".voting-panel #vote-up-text").text(t),
        $(".voting-panel #vote-down-text").text(i),
        n(t, i)
    }
      , u = function(n) {
        if (n !== undefined && n.length > 0)
            switch (n) {
            case "EmailIsVerified":
                Roblox.GenericConfirmation.open({
                    titleText: Roblox.Voting.Resources.emailVerifiedTitle,
                    bodyContent: Roblox.Voting.Resources.emailVerifiedMessage,
                    onAccept: function() {
                        window.location.href = Roblox && Roblox.Endpoints ? Roblox.Endpoints.getAbsoluteUrl("/my/account?confirmemail=1") : "/my/account?confirmemail=1"
                    },
                    acceptColor: Roblox.GenericConfirmation.blue,
                    acceptText: Roblox.Voting.Resources.verify,
                    declineText: Roblox.Voting.Resources.cancel,
                    allowHtmlContentInBody: !0
                });
                return;
            case "PlayGame":
                Roblox.GenericModal.open(Roblox.Voting.Resources.playGameTitle, null, Roblox.Voting.Resources.playGameMessage);
                return;
            case "UseModel":
                Roblox.GenericModal.open(Roblox.Voting.Resources.useModelTitle, null, Roblox.Voting.Resources.useModelMessage);
                return;
            case "InstallPlugin":
                Roblox.GenericModal.open(Roblox.Voting.Resources.installPluginTitle, null, Roblox.Voting.Resources.installPluginMessage);
                return;
            case "BuyGamePass":
                Roblox.GenericModal.open(Roblox.Voting.Resources.buyGamePassTitle, null, Roblox.Voting.Resources.buyGamePassMessage);
                return;
            case "FloodCheckThresholdMet":
                Roblox.GenericModal.open(Roblox.Voting.Resources.floodCheckThresholdMetTitle, null, Roblox.Voting.Resources.floodCheckThresholdMetMessage);
                return;
            case "GuestUser":
                Roblox.GenericConfirmation.open({
                    titleText: Roblox.Voting.Resources.guestUserTitle,
                    bodyContent: Roblox.Voting.Resources.guestUserMessage,
                    onAccept: function() {
                        window.location.href = Roblox && Roblox.Endpoints ? Roblox.Endpoints.getAbsoluteUrl(Roblox.Voting.Resources.returnUrl) : Roblox.Voting.Resources.returnUrl
                    },
                    acceptColor: Roblox.GenericConfirmation.blue,
                    acceptText: Roblox.Voting.Resources.login,
                    declineText: Roblox.Voting.Resources.decline,
                    allowHtmlContentInBody: !0
                });
                return;
            case "AccountAgeOverOneDay":
                Roblox.GenericModal.open(Roblox.Voting.Resources.accountUnderOneDayTitle, null, Roblox.Voting.Resources.accountUnderOneDayMessage);
                return;
            default:
                Roblox.GenericModal.open(Roblox.Voting.Resources.unknownProblemTitle, null, Roblox.Voting.Resources.unknownProblemMessage);
                return
            }
    };
    return {
        Vote: t,
        Initialize: f,
        SetVotes: r,
        UpdateVoteBar: n
    }
}();
;var Roblox = Roblox || {};
$(function() {
    var n = $("[data-voting-processed=false]");
    n.each(function(n, t) {
        var i = $(t)
          , r = i.find(".vote-container")
          , u = parseInt(r.attr("data-upvotes"))
          , f = parseInt(r.attr("data-downvotes"));
        Roblox.Voting.UpdateVoteBar(u, f, i),
        i.attr("data-voting-processed", !0)
    })
});
;var Roblox = Roblox || {};
Roblox.Popover = function() {
    "use strict";
    function u(n, i) {
        var u = $(n), f = $(i), e = $(t), h = e.outerWidth(), c = u.find(r).outerWidth(), l = e.offset().left, o = 0, s;
        (u.hasClass("bottom") || u.hasClass("top")) && (s = $("body").outerWidth() - parseInt(f.width() + f.offset().left),
        o = $("body").outerWidth() - l - s - h / 2 - c / 2,
        u.find(r).css("right", o))
    }
    function f(t) {
        return t.data("hiddenClassName") && (n = t.data("hiddenClassName")),
        n
    }
    function o() {
        $(t).on("click touchstart", function(t) {
            var s = $(this).data("bind"), h = s ? "#" + s : i, r = $(h), c = $(this).data("container"), l = c ? "#" + c : e, o;
            n = f(r),
            r.hasClass("manual") || r.toggleClass(n),
            o = !r.hasClass(n),
            $(document).triggerHandler("Roblox.Popover.Status", {
                isOpen: o,
                eventType: t.type
            }),
            o && u(h, l)
        })
    }
    function s() {
        $("body").on("click touchstart", function(r) {
            $(t).each(function() {
                var u = $(this).data("bind")
                  , t = u ? $("#" + u) : $(i)
                  , o = "roblox-popover-open-always"
                  , e = "roblox-popover-close";
                if (n = f(t),
                $(t).hasClass(o) && !$(r.target).hasClass(e))
                    return !1;
                !$(r.target).hasClass(e) && ($(this).is(r.target) || $(this).has(r.target).length !== 0 || t.has(r.target).length !== 0 || t.hasClass(n) || r.type !== "click") || (t.addClass(n),
                $(document).triggerHandler("Roblox.Popover.Status", {
                    isHidden: !0,
                    eventType: r.type
                }))
            })
        })
    }
    function h() {
        o(),
        s()
    }
    var t = ".roblox-popover"
      , i = ".roblox-popover-content"
      , e = ".roblox-popover-container"
      , r = ".arrow"
      , n = "hidden";
    return $(function() {
        h()
    }),
    {
        setUpTrianglePosition: u
    }
}();
;Roblox = Roblox || {},
Roblox.ShopAmazon = function() {
    function t() {
        $("a.roblox-shop-interstitial").on("click", function(n) {
            n.preventDefault(),
            Roblox.Dialog.open({
                titleText: "You are leaving ROBLOX",
                bodyContent: r(),
                allowHtmlContentInBody: !0,
                acceptText: "Continue to Shop",
                declineText: "Cancel",
                xToCancel: !0,
                acceptColor: Roblox.Dialog.green,
                declineColor: Roblox.Dialog.white,
                onAccept: i
            })
        })
    }
    function i() {
        window.open(n, "_blank")
    }
    function r() {
        return "<p>Your are about to visit our amazon store. You will be redirected to ROBLOX merchandise store on <a class='text-link' target='_blank' href='" + n + "' >Amazon.com</a>.</p> <p>Please note that you need to be over 18 to purchase products online. The amazon store is not part of voidrev.us and is governed by a separate privacy policy.</p>"
    }
    function u() {
        t()
    }
    var n = "https://www.amazon.com/roblox?&_encoding=UTF8&tag=r05d13-20&linkCode=ur2&linkId=4ba2e1ad82f781c8e8cc98329b1066d0&camp=1789&creative=9325";
    $(function() {
        u()
    })
}();
;typeof Roblox == "undefined" && (Roblox = {}),
typeof Roblox.Dialog == "undefined" && (Roblox.Dialog = function() {
    function d() {
        n.isOpen = !1,
        r()
    }
    function nt(r) {
        var v, s, h, o, a;
        n.isOpen = !0,
        v = {
            titleText: "",
            bodyContent: "",
            footerText: "",
            acceptText: Roblox.Resources.Dialog.yes,
            declineText: Roblox.Resources.Dialog.No,
            acceptColor: f,
            declineColor: e,
            xToCancel: !1,
            onAccept: function() {
                return !1
            },
            onDecline: function() {
                return !1
            },
            onCancel: function() {
                return !1
            },
            imageUrl: null,
            allowHtmlContentInBody: !1,
            allowHtmlContentInFooter: !1,
            dismissable: !0,
            fieldValidationRequired: !1,
            onOpenCallback: function() {},
            cssClass: null
        },
        r = $.extend({}, v, r),
        u.overlayClose = r.dismissable,
        u.escClose = r.dismissable,
        s = $(t),
        s.html(r.acceptText),
        s.attr("class", r.acceptColor),
        s.unbind(),
        s.bind("click", function() {
            return l(s) ? !1 : (r.fieldValidationRequired ? y(r.onAccept) : c(r.onAccept),
            !1)
        }),
        h = $(i),
        h.html(r.declineText),
        h.attr("class", r.declineColor),
        h.unbind(),
        h.bind("click", function() {
            return l(h) ? !1 : (c(r.onDecline),
            !1)
        }),
        o = $('[data-modal-type="confirmation"]'),
        o.find(".modal-title").text(r.titleText),
        r.imageUrl == null ? o.addClass("noImage") : (o.find("img.modal-thumb").attr("src", r.imageUrl),
        o.removeClass("noImage")),
        r.cssClass != null && o.addClass(r.cssClass),
        r.allowHtmlContentInBody ? o.find(".modal-message").html(r.bodyContent) : o.find(".modal-message").text(r.bodyContent),
        $.trim(r.footerText) == "" ? o.find(".modal-footer").hide() : o.find(".modal-footer").show(),
        r.allowHtmlContentInFooter ? o.find(".modal-footer").html(r.footerText) : o.find(".modal-footer").text(r.footerText),
        o.modal(u),
        a = $(".modal-header .close"),
        a.unbind(),
        a.bind("click", function() {
            return c(r.onCancel),
            !1
        }),
        r.xToCancel || a.hide(),
        $("#rbx-body").addClass("modal-mask"),
        r.onOpenCallback()
    }
    function a(n) {
        n.hasClass(e) ? n.addClass(h) : n.hasClass(v) ? n.addClass(o) : n.hasClass(f) && n.addClass(s)
    }
    function l(n) {
        return n.hasClass(s) || n.hasClass(h) || n.hasClass(o) ? !0 : !1
    }
    function p() {
        var n = $(t)
          , r = $(i);
        a(n),
        a(r)
    }
    function w() {
        var u = $(t)
          , r = $(i)
          , n = s + " " + h + " " + o;
        u.removeClass(n),
        r.removeClass(n)
    }
    function b() {
        if (n.isOpen) {
            var i = $(t);
            i.click()
        }
    }
    function k() {
        var n = $(i);
        n.click()
    }
    function r(t) {
        n.isOpen = !1,
        typeof t != "undefined" ? $.modal.close(t) : $.modal.close(),
        $("#rbx-body").removeClass("modal-mask")
    }
    function c(n) {
        r(),
        typeof n == "function" && n()
    }
    function y(n) {
        if (typeof n == "function") {
            var t = n();
            if (t !== "undefined" && t == !1)
                return !1
        }
        r()
    }
    function tt(n, t) {
        var i = $(".modal-body");
        n ? (i.find(".modal-btns").hide(),
        i.find(".modal-processing").show()) : (i.find(".modal-btns").show(),
        i.find(".modal-processing").hide()),
        typeof t != "undefined" && t !== "" && $.modal.close("." + t)
    }
    var v = "btn-primary-md"
      , f = "btn-secondary-md"
      , e = "btn-control-md"
      , o = "btn-primary-md disabled"
      , s = "btn-secondary-md disabled"
      , h = "btn-control-md disabled"
      , g = "btn-none"
      , t = ".modal-btns #confirm-btn"
      , i = ".modal-btns #decline-btn"
      , n = {
        isOpen: !1
    }
      , u = {
        overlayClose: !0,
        escClose: !0,
        opacity: 80,
        zIndex: 1040,
        overlayCss: {
            backgroundColor: "#000"
        },
        onClose: d,
        focus: !1
    };
    return {
        open: nt,
        close: r,
        disableButtons: p,
        enableButtons: w,
        clickYes: b,
        clickNo: k,
        status: n,
        toggleProcessing: tt,
        green: v,
        blue: f,
        white: e,
        none: g
    }
}()),
$(document).keypress(function(n) {
    Roblox.Dialog.isOpen && n.which === 13 && Roblox.Dialog.clickYes()
});
