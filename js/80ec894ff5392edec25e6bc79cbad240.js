;;;
typeof Roblox == "undefined" && (Roblox = {}), typeof Roblox.GenericConfirmation == "undefined" && (Roblox.GenericConfirmation = function() {
    function w() {
        n.isOpen = !1, t()
    }

    function k(t) {
        var a, e, o, s, l;
        n.isOpen = !0, a = {
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
        }, t = $.extend({}, a, t), c.overlayClose = t.dismissable, c.escClose = t.dismissable, e = $(i), e.html(t.acceptText), e.attr("class", "btn-large " + t.acceptColor), e.unbind(), e.bind("click", function() {
            return v(e) ? !1 : (t.fieldValidationRequired ? nt(t.onAccept) : h(t.onAccept), !1)
        }), o = $(r), o.html(t.declineText), o.attr("class", "btn-large " + t.declineColor), o.unbind(), o.bind("click", function() {
            return v(o) ? !1 : (h(t.onDecline), !1)
        }), $('[data-modal-handle="confirmation"] div.Title').text(t.titleText), s = $("[data-modal-handle='confirmation']"), t.imageUrl == null ? s.addClass("noImage") : (s.find("img.GenericModalImage").attr("src", t.imageUrl), s.removeClass("noImage")), t.allowHtmlContentInBody ? $("[data-modal-handle='confirmation'] div.Message").html(t.bodyContent) : $("[data-modal-handle='confirmation'] div.Message").text(t.bodyContent), $.trim(t.footerText) == "" ? $('[data-modal-handle="confirmation"] div.ConfirmationModalFooter').hide() : $('[data-modal-handle="confirmation"] div.ConfirmationModalFooter').show(), t.allowHtmlContentInFooter ? $('[data-modal-handle="confirmation"] div.ConfirmationModalFooter').html(t.footerText) : $('[data-modal-handle="confirmation"] div.ConfirmationModalFooter').text(t.footerText), $("[data-modal-handle='confirmation']").modal(c), l = $("a.genericmodal-close"), l.unbind(), l.bind("click", function() {
            return h(t.onCancel), !1
        }), t.xToCancel || l.hide(), t.onOpenCallback()
    }

    function a(n) {
        n.hasClass(f) ? n.addClass(s) : n.hasClass(l) ? n.addClass(e) : n.hasClass(u) && n.addClass(o)
    }

    function v(n) {
        return n.hasClass(o) || n.hasClass(s) || n.hasClass(e) ? !0 : !1
    }

    function b() {
        var n = $(i),
            t = $(r);
        a(n), a(t)
    }

    function g() {
        var u = $(i),
            t = $(r),
            n = o + " " + s + " " + e;
        u.removeClass(n), t.removeClass(n)
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
        n.isOpen = !1, typeof t != "undefined" ? $.modal.close(t) : $.modal.close()
    }

    function h(n) {
        t(), typeof n == "function" && n()
    }

    function nt(n) {
        if (typeof n == "function") {
            var i = n();
            if (i !== "undefined" && i == !1) return !1
        }
        t()
    }
    var l = "btn-primary",
        u = "btn-neutral",
        f = "btn-negative",
        e = "btn-disabled-primary",
        o = "btn-disabled-neutral",
        s = "btn-disabled-negative",
        d = "btn-none",
        i = "#roblox-confirm-btn",
        r = "#roblox-decline-btn",
        n = {
            isOpen: !1
        },
        c = {
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
}()), $(document).keypress(function(n) {
    Roblox.GenericConfirmation.status.isOpen && n.which === 13 && Roblox.GenericConfirmation.clickYes()
});;
typeof Roblox.GenericModal == "undefined" && (Roblox.GenericModal = function() {
    function s(u, f, e, s, h, c) {
        var l, a;
        t.isOpen = !0, n = $.extend({}, n, c), i = s, l = $("div.GenericModal").filter(":first"), l.find("div.Title").text(u), f === null ? l.addClass("noImage") : (l.find("img.GenericModalImage").attr("src", f), l.removeClass("noImage")), l.find("div.Message").html(e), h && (l.removeClass("smallModal"), l.addClass("largeModal")), a = l.find(o), a.attr("class", "btn-large " + n.acceptColor), a.unbind(), a.bind("click", function() {
            r()
        }), l.modal(n)
    }

    function r() {
        t.isOpen = !1, $.modal.close(), typeof i == "function" && i()
    }
    var f = "btn-primary",
        u = "btn-neutral",
        e = "btn-negative",
        o = ".ImageButton.btn-neutral.btn-large.roblox-ok",
        t = {
            isOpen: !1
        },
        n = {
            overlayClose: !0,
            escClose: !0,
            opacity: 80,
            overlayCss: {
                backgroundColor: "#000"
            },
            acceptColor: u
        },
        i;
    return $(function() {
        $(document).on("click", ".GenericModal .roblox-ok", function() {
            r()
        })
    }), {
        close: r,
        open: s,
        status: t,
        green: f,
        blue: u,
        gray: e
    }
}()), Roblox.GenericModal.Resources = {
    ErrorText: "Error",
    ErrorMessage: "Sorry, an error occurred."
}, $(document).keypress(function(n) {
    n.which === 13 && Roblox.GenericModal.status.isOpen && Roblox.GenericModal.close()
});;
Roblox = Roblox || {}, Roblox.GameCards = Roblox.GameCards || function() {
    function f() {
        e(s, ct, ht, st, ot)
    }

    function u() {
        e(et, ft, ut, rt, y)
    }

    function c() {
        f(), u()
    }

    function h() {
        c(), lt(), at()
    }

    function r() {
        return t = t || Roblox.RealTime.Factory.GetClient()
    }

    function lt() {
        if (Roblox && Roblox.RealTime) {
            var n = r();
            n.Subscribe("GameFavoriteNotifications", function(n) {
                n && (n.Type === "Favorite" || n.Type === "Unfavorite") && u()
            })
        }
    }

    function at() {
        if (Roblox && Roblox.RealTime) {
            var n = r();
            n.Subscribe("GameCloseNotifications", function(n) {
                n && n.Type === "Close" && f()
            })
        }
    }
    var s = "#recently-visited-places",
        ct = "#recently-visited-places-content",
        ht = "#recently-visited-places-list",
        st = "#recently-visited-places-content-spinner",
        ot = Roblox.Endpoints ? Roblox.Endpoints.getAbsoluteUrl("/home/recently-visited-places") : "",
        et = "#my-favorites-games",
        ft = "#my-favorites-games-content",
        ut = "#my-favorites-games-list",
        rt = "#my-favorites-games-content-spinner",
        it = "#game-card-link",
        tt = "#game-card-thumb-container",
        o = "#game-card-title",
        nt = "#game-card-name-secondary",
        g = "#game-card-creator-by",
        d = ".vote-container",
        k = ".vote-background",
        b = ".vote-bar",
        w = ".vote-down-count",
        p = ".vote-up-count",
        y = Roblox.Endpoints ? Roblox.Endpoints.getAbsoluteUrl("/user/favorites/places") : "",
        v = "#game-item-card-template",
        t, n = Roblox.I18nData && Roblox.I18nData.isI18nEnabledOnGames && Roblox.Intl && new Roblox.Intl,
        a = function(t, i) {
            var e = "",
                f;
            t.HasErrorOcurred || (e = n ? n.f(i.labelPlaying, {
                playerCount: t.PlayerCount
            }) : Number(t.PlayerCount).toLocaleString() + " Playing");
            var l = Number(t.TotalUpVotes).toLocaleString(),
                a = Number(t.TotalDownVotes).toLocaleString(),
                s = "";
            t.TotalUpVotes === 0 && t.TotalDownVotes === 0 && (s = "no-votes");
            var u = t.Name.escapeHTML(),
                y = u.substring(0, Math.min(u.length, 40)),
                rt = '<img class="game-card-thumb"' + (t.UseDataSrc ? "data-" : "") + 'src="' + t.Thumbnail.Url + '"' + (t.Thumbnail.Final ? "" : "data-retry-url = ") + t.Thumbnail.RetryUrl + ' alt="' + u + "\" thumbnail='" + JSON.stringify(t.Thumbnail) + "' image-retry/>",
                ut = t.CreatorName.escapeHTML(),
                h = "<a id='creator-link-bottom' class='text-link' href='" + t.CreatorAbsoluteUrl + "'>" + ut + "</a>",
                ft = n ? n.f(i.labelCreator, {
                    creatorLink: h
                }) : "By " + h,
                r = $(v).clone(),
                c = r.find(d);
            return r.find(it).attr("href", t.GameDetailReferralUrl), r.find(tt).html(rt), r.find(o).attr("title", u), r.find(o).html(y), r.find(nt).html(e), c.attr("data-upvotes", t.TotalUpVotes), c.attr("data-downvotes", t.TotalDownVotes), r.find(k).addClass(s), r.find(w).html(a), r.find(p).html(l), r.find(g).html(ft), Roblox.Voting && (f = r.find(b), f.attr("data-voting-processed", !0), Roblox.Voting.UpdateVoteBar(t.TotalUpVotes, t.TotalDownVotes, f)), r.html()
        },
        l = function(n) {
            var t = '<ul class="hlist game-cards ' + (n.ShowSmallGameIcon ? "game-cards-sm" : "") + '">',
                r = {
                    labelCreator: n.LabelCreatorByJs,
                    labelPlaying: n.LabelPlayingPhraseJs
                };
            for (i in n.GameDisplayModels) t += a(n.GameDisplayModels[i], r);
            return t += "</ul>"
        },
        e = function(n, t, i, r, u) {
            $(t).addClass("hidden"), $(r).removeClass("hidden"), $(i).addClass("game-card-list");
            var f = function(u) {
                if (u.data && (u.Data = u.data), !u || !u.Data || !u.Data.GameDisplayModels || u.Data.GameDisplayModels.length <= 0) {
                    $(r).addClass("hidden"), $(n).addClass("hidden"), $(t).html("");
                    return
                }
                var o = l(u.Data);
                $(r).hide(), $(i).removeClass("game-card-list"), $(t).removeClass("hidden").html(o)
            };
            $.getJSON(u, f)
        };
    $(document).ready(h)
}();;
"use strict";
var Roblox = Roblox || {};
Roblox.PresenceService = function() {
    function n(n) {
        for (var i = Roblox && Roblox.Endpoints ? Roblox.Endpoints.getAbsoluteUrl("/presence/users") : "/presence/users", t = 0; t < n.length; t++) t === 0 && (i += "?"), i += $.param(n[t]);
        $.ajax({
            method: "GET",
            url: i,
            success: function(n) {
                $(document).trigger("Roblox.Presence.Update", [n])
            }
        })
    }

    function t() {
        if (Roblox && Roblox.RealTime) {
            var i = Roblox.RealTime.Factory.GetClient(),
                t = Roblox.Constants.realTimeNotifications.presenceNotifications.name,
                n = Roblox.Constants.realTimeNotifications.presenceNotifications.types;
            i.Subscribe(t, function(t) {
                var i = [];
                switch (t.Type) {
                    case n.presenceOnline:
                    case n.presenceOffline:
                        i.push({
                            userIds: t.UserId
                        }), Roblox.PresenceService.getPresences(i)
                }
            })
        }
    }

    function i() {
        Roblox.PresenceService.initializeRealTimeSubscriptions()
    }
    return $(function() {
        Roblox.CurrentUser && Roblox.CurrentUser.isAuthenticated && Roblox.PresenceService.init()
    }), {
        init: i,
        initializeRealTimeSubscriptions: t,
        getPresences: n
    }
}();;
var Roblox = Roblox || {};
Roblox.Home = function() {
    function n() {
        $("#HomeContainer *[data-retry-url]").loadRobloxThumbnails()
    }

    function t(n) {
        var c = ".home-friends #friend_",
            l = ".friend-link",
            a = ".friend-status",
            o = Roblox.Constants.presenceTypes,
            v = n.UserId,
            r = $(c + v),
            u, e, i, s, h;
        if (r && r.length > 0) {
            u = r.find(a), u && u.length > 0 && u.remove();
            var f = r.find(l),
                y = n.LastLocation,
                t = $("<span />").addClass("avatar-status");
            t.attr("title", y);
            switch (n.UserPresenceType) {
                case o.inGame:
                    e = n.AbsolutePlaceUrl, i = "", e && e.length > 0 ? (i = t.addClass("icon-game"), f.append("<a class='friend-status place-link' href='" + e + "'>" + i + "</a>")) : (i = t.addClass("friend-status icon-game"), f.append(i));
                    break;
                case o.inStudio:
                    s = t.addClass("friend-status icon-studio"), f.append(s);
                    break;
                case o.online:
                    h = t.addClass("friend-status icon-online"), f.append(h)
            }
        }
    }

    function i() {
        $(document).on("Roblox.Presence.Update", function(n, i) {
            for (var r = 0; r < i.length; r++) t(i[r])
        })
    }

    function r() {
        $(document).on("GuttersHidden", function() {
            $("#LeftGutterAdContainer").hide(), $("#RightGutterAdContainer").hide()
        })
    }

    function u() {
        n(), r(), i()
    }

    function f(n, t, i, r) {
        r && Roblox.Hashcash.setWorkerFile(r), Roblox.Hashcash.setRegex(t), Roblox.Hashcash.getValueToHash(n, function(n) {
            if (n) {
                var r = "/game/report-stats",
                    u = "HashcashDuration",
                    t = n.timeDiff;
                !t || t < 0 || $.ajax({
                    cache: !1,
                    url: r,
                    type: "POST",
                    data: {
                        name: u + "_" + i,
                        value: t
                    }
                })
            }
        })
    }
    return $(function() {
        u()
    }), {
        doProofOfWork: f
    }
}();;
var Roblox = Roblox || {};
Roblox.Feeds = function() {
    function r() {
        var r = $("#statusForm"),
            s = $("#loadingImage"),
            f = ".form-group",
            h = ".form-control-label",
            e = "form-has-feedback form-has-error",
            o = "form-has-feedback form-has-success";
        if (n.prop("disabled")) return !1;
        var c = u.data("update-status-url"),
            l = n.val(),
            a = {
                status: l
            };
        return t.hide(), s.show(), r.find(f).removeClass(e).removeClass(o), $.ajax({
            cache: !1,
            url: c,
            type: "POST",
            data: a,
            success: function(t) {
                t.success ? (n.val(t.message), r.find(f).addClass(o), i.show(), setTimeout(function() {
                    i.hide(), r.find(f).removeClass(o)
                }, 2e3)) : (n.val(""), r.find(f).addClass(e), r.find(h).text(t.message).show())
                window.location.reload();
            },
            error: function() {
                n.val(""), r.find(f).addClass(e), r.find(h).show()
            },
            complete: function() {
                n.blur(), t.show(), s.hide()
            }
        }), !0
    }

    function f() {
        var i = Roblox.Constants.keyCodes.enter;
        t.click(function() {
            r()
        }), n.keypress(function(n) {
            n.which === i && r()
        })
    }
    var u = $("#feed-container"),
        n = $("#txtStatusMessage"),
        t = $("#shareButton"),
        i = $(".success-icon");
    $(function() {
        f()
    })
}();;
Roblox = Roblox || {}, Roblox.GameDetailReferral = Roblox.GameDetailReferral || {}, Roblox.GameDetailReferral.AppendUrl = function(n, t, i) {
    if (!n.data("modified")) {
        var e = $(t).length,
            u = i || n,
            f = u.attr("href"),
            r = f;
        r += f.indexOf("?") !== -1 ? "&" : "?", r += "LocalTimestamp=" + (new Date).toISOString() + "&TotalInSort=" + e, u.attr("href", r), n.data("modified", !0)
    }
}, $(function() {
    var t = ".game-card-link",
        n = "mousedown touchstart";
    $("#recently-visited-places").on(n, ".game-card", function() {
        Roblox.GameDetailReferral.AppendUrl($(this).find(t), "#recently-visited-places .list-item")
    });
    $("#my-favorites-games").on(n, ".game-card", function() {
        Roblox.GameDetailReferral.AppendUrl($(this).find(t), "#my-favorites-games .game-card")
    });
    $("#friend-activity").on(n, ".game-card", function() {
        Roblox.GameDetailReferral.AppendUrl($(this).find(t), "#friend-activity .game-card")
    });
    $("#UserPlaces div.Thumbnail").on(n, function() {
        Roblox.GameDetailReferral.AppendUrl($(this), ".Thumbnail", $(this).find("a"))
    });
    $("#GamesListsContainer").on(n, ".game-card", function() {
        var n = $(this).parent().siblings().length + 1;
        Roblox.GameDetailReferral.AppendUrl($(this).find(t), new Array(n))
    });
    $("#my-recommended-games").on(n, ".game-card", function() {
        Roblox.GameDetailReferral.AppendUrl($(this).find(t), "#my-recommended-games .game-card")
    });
    $("#HomeContainer #FeaturedGamesContainer").on(n, ".item-place a", function() {
        Roblox.GameDetailReferral.AppendUrl($(this), "#FeaturedGamesContainer .item-place")
    })
});;
"use strict";
var Roblox = Roblox || {};
Roblox.AdsHelper = Roblox.AdsHelper || {}, Roblox.AdsLibrary = {}, Roblox.AdsLibrary.adsIdList = ["Skyscraper-Abp-Left", "Skyscraper-Abp-Right", "Leaderboard-Abp", "GamePageAdDiv1", "GamePageAdDiv2", "GamePageAdDiv3", "ProfilePageAdDiv1", "ProfilePageAdDiv2"], Roblox.AdsLibrary.adsParameters = {
    "Skyscraper-Abp-Left": {
        element: $("#Skyscraper-Abp-Left"),
        template: null,
        fitTwoAds: !0,
        fitOneAd: !1,
        isSkyscraper: !0
    },
    "Skyscraper-Abp-Right": {
        element: $("#Skyscraper-Abp-Right"),
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
}, Roblox.AdsHelper.AdRefresher = function() {
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
        typeof n == "undefined" && (n = v), u = !1;
        for (f in t) {
            if (e = "#" + t[f] + " [data-js-adtype]", i = $(e), typeof i == "undefined") return;
            if (i.attr("data-js-adtype") === "iframead") o(i);
            else if (i.attr("data-js-adtype") === "gptAd")
                if (s()) u = !0;
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
        var i = n.attr("src"),
            r, u, t;
        typeof i == "string" && (r = i.indexOf("?") < 0 ? "?" : "&", u = i + r + "nocache=" + (new Date).getMilliseconds().toString(), typeof n[0] != "undefined") && (t = n[0].contentDocument, t === undefined && (t = n[0].contentWindow), t.location.href !== "about:blank" && t.location.replace(u))
    }

    function n(n, t, i) {
        i.length && c(i) && (i.append(n), r())
    }

    function b() {
        for (var u = $(window).width(), f, r, t, i = 0; i < Roblox.AdsLibrary.adsIdList.length; i++) r = Roblox.AdsLibrary.adsIdList[i], t = Roblox.AdsLibrary.adsParameters[r], t && !t.template && (f = t.element, t.template = f.html());
        for (i = 0; i < Roblox.AdsLibrary.adsIdList.length; i++)(r = Roblox.AdsLibrary.adsIdList[i], t = Roblox.AdsLibrary.adsParameters[r], t) && (t.isSkyscraper ? u >= e && t.fitTwoAds ? n(t.template, r, t.element) : u < e && u >= l ? t.fitOneAd ? n(t.template, r, t.element) : t.element.empty() : t.element.empty() : t.isLeaderboard ? u < p ? t.element.empty() : n(t.template, r, t.element) : t.isPageAd && (u < w ? t.element.empty() : n(t.template, r, t.element)))
    }
    var t = [],
        i = 20,
        u = 970,
        f = 160,
        p = 728,
        y = 100,
        v = 16,
        e = $("[data-max-width-for-two-ads]").attr("data-max-width-for-two-ads") || u + f * 2 + 48 - i,
        l = $("[data-max-width-for-one-ads]").attr("data-max-width-for-one-ads") || u + f + 24 - i,
        a = 1024,
        w = a - i;
    return {
        registerAd: h,
        refreshAds: r,
        adjustAdsFitScreen: b,
        getAds: n
    }
}(), Roblox.AdsHelper.DynamicAdCreator = function() {
    function n() {
        var n = $(".dynamic-ad").filter(".unpopulated");
        n.each(function(n, t) {
            var i = $(t),
                u = i.attr("data-ad-slot"),
                f = parseInt(i.attr("data-ad-width")),
                e = parseInt(i.attr("data-ad-height")),
                r = i.children(".ad-slot").attr("id");
            googletag.cmd.push(function() {
                var n = googletag.defineSlot(u, [f, e], r).addService(googletag.pubads());
                googletag.display(r), googletag.pubads().refresh([n])
            }), i.removeClass("unpopulated")
        })
    }
    return {
        populateNewAds: n
    }
}(), $(function() {
    $(window).resize(function() {
        Roblox.AdsHelper.AdRefresher.adjustAdsFitScreen()
    })
});;
"use strict";
var Roblox = Roblox || {};
Roblox.Hashcash = function() {
    function u(n) {
        t = n
    }

    function f(n) {
        i = n
    }

    function e(u, f) {
        if (!window.Worker) {
            f && f(!1);
            return
        }
        var e = {
            hashRegex: t,
            username: u
        };
        n = new Worker(i), n.postMessage(e), n.onmessage = function(n) {
            var t = n.data;
            f && f(t), r()
        }, n.onerror = function() {
            f && f(!1), r()
        }
    }

    function r() {
        n.terminate(), n = undefined
    }

    function o() {
        return n
    }
    var n, t, i = "/js/hashcash/worker.js";
    return {
        getValueToHash: e,
        setRegex: u,
        setWorkerFile: f,
        getWorker: o
    }
}();;

function InitStringTruncator() {
    isInitialized || (fitStringSpan = document.createElement("span"), fitStringSpan.style.display = "inline-block", fitStringSpan.style.visibility = "hidden", fitStringSpan.style.height = "0px", fitStringSpan.style.padding = "0px", document.body.appendChild(fitStringSpan), isInitialized = !0)
}

function fitStringToWidth(n, t, i) {
    function o(n) {
        return n.replace("<", "&lt;").replace(">", "&gt;")
    }
    var u, r, f, e, s;
    if (isInitialized || InitStringTruncator(), i && (fitStringSpan.className = i), u = o(n), fitStringSpan.innerHTML = u, fitStringSpan.offsetWidth > t) {
        for (r = 0, e = n.length; s = e - r >> 1;) f = r + s, fitStringSpan.innerHTML = o(n.substring(0, f)) + "&hellip;", fitStringSpan.offsetWidth > t ? e = f : r = f;
        u = n.substring(0, r) + "&hellip;"
    }
    return u
}

function fitStringToWidthSafe(n, t, i) {
    var r = fitStringToWidth(n, t, i),
        u;
    return r.indexOf("&hellip;") != -1 && (u = r.lastIndexOf(" "), u != -1 && u + 10 <= r.length && (r = r.substring(0, u + 2) + "&hellip;")), r
}

function fitStringToWidthSafeText(n, t, i) {
    return fitStringToWidthSafe(n, t, i).replace("&hellip;", "...")
}
var isInitialized = !1,
    fitStringSpan = null;;
var Roblox = Roblox || {};
Roblox.Voting = function() {
    var f = function(n, t) {
            var i = "/games/votingservice/" + t;
            $.ajax({
                url: i,
                success: function(t) {
                    n.replaceWith(t)
                }
            })
        },
        e = function() {
            $(".users-vote .upvote").unbind().click(function() {
                i($(this), !0)
            }), $(".users-vote .downvote").unbind().click(function() {
                i($(this), !1)
            });
            var t = parseInt($(".voting-panel").data("total-up-votes")),
                r = parseInt($(".voting-panel").data("total-down-votes"));
            n(t, r)
        },
        i = function(n, i) {
            var e = $(".voting-panel").data("user-authenticated");
            if (!e) {
                u("GuestUser");
                return
            }
            var o = $(".voting-panel").data("target-id"),
                r = "/voting/vote?assetId=" + o + "&vote=",
                f = $(".voting-panel").data("vote-url");
            f && (r = f), n.hasClass("selected") || n.find("i").hasClass("selected") || n.find(".icon-like, .icon-dislike").hasClass("selected") ? t(r, null) : t(r, i)
        },
        t = function(n, t) {
            $(".voting-panel .loading").show(), $.ajax({
                type: "POST",
                url: n + t,
                success: o,
                error: s
            })
        },
        o = function(t) {
            var o = $(".icon-like").length;
            if ($(".voting-panel .loading").hide(), t.Success) {
                r(t.Model.UpVotes, t.Model.DownVotes);
                var i = $(".voting-panel .upvote"),
                    f = $(".voting-panel .downvote"),
                    e = $(".users-vote");
                o && (i = $(".voting-panel .upvote .icon-like"), f = $(".voting-panel .downvote .icon-dislike")), t.Model.UserVote !== null ? e.hasClass("has-voted") || e.addClass("has-voted") : e.removeClass("has-voted"), i.hasClass("selected") && i.removeClass("selected"), f.hasClass("selected") && f.removeClass("selected"), t.Model.UserVote !== null && (t.Model.UserVote ? i.addClass("selected") : f.addClass("selected")), n(t.Model.UpVotes, t.Model.DownVotes)
            } else u(t.ModalType)
        },
        s = function() {
            $(".voting-panel .loading").hide()
        },
        n = function(n, t, i) {
            var e = i || $("#voting-section"),
                r, u, f;
            isNaN(n) || isNaN(t) || (r = n === 0 ? 0 : t === 0 ? 100 : Math.floor(n / (n + t) * 100), r > 100 && (r = 100), u = e.find(".vote-container"), f = u.find(".vote-background"), u.find(".vote-percentage").css("width", r + "%"), t > 0 ? f.addClass("has-votes") : f.removeClass("has-votes"))
        },
        r = function(t, i) {
            t = Roblox.NumberFormatting.abbreviatedFormat(t), i = Roblox.NumberFormatting.abbreviatedFormat(i), $(".voting-panel .total-upvotes-text").text(t), $(".voting-panel .total-downvotes-text").text(i), $(".voting-panel #vote-up-text").text(t), $(".voting-panel #vote-down-text").text(i), n(t, i)
        },
        h = function(n) {
            var t = {
                EmailIsVerified: {
                    titleText: Roblox.Voting.Resources.emailVerifiedTitle,
                    bodyContent: Roblox.Voting.Resources.emailVerifiedMessage,
                    onAccept: function() {
                        window.location.href = Roblox && Roblox.Endpoints ? Roblox.Endpoints.getAbsoluteUrl("/my/account?confirmemail=1") : "/my/account?confirmemail=1"
                    },
                    acceptColor: Roblox.Dialog.green,
                    acceptText: Roblox.Voting.Resources.accept,
                    declineText: Roblox.Voting.Resources.decline,
                    allowHtmlContentInBody: !0
                },
                PlayGame: {
                    titleText: Roblox.Voting.Resources.playGameTitle,
                    bodyContent: Roblox.Voting.Resources.playGameMessage,
                    showAccept: !1,
                    declineText: Roblox.Voting.Resources.ok
                },
                UseModel: {
                    titleText: Roblox.Voting.Resources.useModelTitle,
                    bodyContent: Roblox.Voting.Resources.useModelMessage,
                    showAccept: !1,
                    declineText: Roblox.Voting.Resources.ok
                },
                InstallPlugin: {
                    titleText: Roblox.Voting.Resources.installPluginTitle,
                    bodyContent: Roblox.Voting.Resources.installPluginMessage,
                    showAccept: !1,
                    declineText: Roblox.Voting.Resources.ok
                },
                BuyGamePass: {
                    titleText: Roblox.Voting.Resources.buyGamePassTitle,
                    bodyContent: Roblox.Voting.Resources.buyGamePassMessage,
                    showAccept: !1,
                    declineText: Roblox.Voting.Resources.ok
                },
                FloodCheckThresholdMet: {
                    titleText: Roblox.Voting.Resources.floodCheckThresholdMetTitle,
                    bodyContent: Roblox.Voting.Resources.floodCheckThresholdMetMessage,
                    showAccept: !1,
                    declineText: Roblox.Voting.Resources.ok
                },
                GuestUser: {
                    titleText: Roblox.Voting.Resources.guestUserTitle,
                    bodyContent: Roblox.Voting.Resources.guestUserMessage,
                    onAccept: function() {
                        window.location.href = Roblox && Roblox.Endpoints ? Roblox.Endpoints.getAbsoluteUrl(Roblox.Voting.Resources.returnUrl) : Roblox.Voting.Resources.returnUrl
                    },
                    acceptColor: Roblox.Dialog.green,
                    acceptText: Roblox.Voting.Resources.login,
                    declineText: Roblox.Voting.Resources.decline,
                    allowHtmlContentInBody: !0
                },
                Error: {
                    titleText: Roblox.Voting.Resources.unknownProblemTitle,
                    bodyContent: Roblox.Voting.Resources.unknownProblemMessage,
                    showAccept: !1,
                    declineText: Roblox.Voting.Resources.ok
                },
                AssetNotVoteable: {
                    titleText: Roblox.Voting.Resources.assetNotVoteableTitle,
                    bodyContent: Roblox.Voting.Resources.assetNotVoteableMessage,
                    showAccept: !1,
                    declineText: Roblox.Voting.Resources.ok
                }
            };
            return t[n] || t.Error
        },
        u = function(n) {
            n && Roblox.Dialog.open(h(n))
        };
    return {
        Vote: t,
        Initialize: e,
        SetVotes: r,
        UpdateVoteBar: n,
        LoadVotingService: f
    }
}();;
var Roblox = Roblox || {};
$(function() {
    var n = $("[data-voting-processed=false]");
    n.each(function(n, t) {
        var i = $(t),
            r = i.find(".vote-container"),
            u = parseInt(r.attr("data-upvotes")),
            f = parseInt(r.attr("data-downvotes"));
        Roblox.Voting.UpdateVoteBar(u, f, i), i.attr("data-voting-processed", !0)
    })
});;
var Roblox = Roblox || {};
Roblox.Popover = function() {
    "use strict";

    function u(n, i) {
        var u = $(n),
            f = $(i),
            e = $(t),
            h = e.outerWidth(),
            c = u.find(r).outerWidth(),
            l = e.offset().left,
            o = 0,
            s;
        (u.hasClass("bottom") || u.hasClass("top")) && (s = $("body").outerWidth() - parseInt(f.width() + f.offset().left), o = $("body").outerWidth() - l - s - h / 2 - c / 2, u.find(r).css("right", o))
    }

    function f(t) {
        return t.data("hiddenClassName") && (n = t.data("hiddenClassName")), n
    }

    function s() {
        $(t).on("click", function(t) {
            var s = $(this).data("bind"),
                h = s ? "#" + s : i,
                r = $(h),
                c = $(this).data("container"),
                l = c ? "#" + c : o,
                e;
            n = f(r), r.hasClass("manual") || r.toggleClass(n), e = !r.hasClass(n), $(document).triggerHandler("Roblox.Popover.Status", {
                isOpen: e,
                eventType: t.type
            }), e && u(h, l)
        })
    }

    function h() {
        $("body").on("click", function(r) {
            $(t).each(function() {
                var u = $(this).data("bind"),
                    t = u ? $("#" + u) : $(i),
                    o = "roblox-popover-open-always",
                    e = "roblox-popover-close";
                if (n = f(t), $(t).hasClass(o) && !$(r.target).hasClass(e)) return !1;
                !$(r.target).hasClass(e) && ($(this).is(r.target) || $(this).has(r.target).length !== 0 || t.has(r.target).length !== 0 || t.hasClass(n) || r.type !== "click") || (t.addClass(n), $(document).triggerHandler("Roblox.Popover.Status", {
                    isHidden: !0,
                    eventType: r.type
                }))
            })
        })
    }

    function e() {
        s(), h()
    }
    var t = ".roblox-popover",
        i = ".roblox-popover-content",
        o = ".roblox-popover-container",
        r = ".arrow",
        n = "hidden";
    return $(function() {
        e()
    }), {
        init: e,
        setUpTrianglePosition: u
    }
}();;
typeof Roblox == "undefined" && (Roblox = {}), Roblox.DevelopNavigationButtonClickEvent = function() {
    var n = function() {
            if (Roblox.EventStream) {
                var n = "header";
                Roblox.EventStream.SendEventWithTarget("navigationInteraction", n, {
                    anchorName: "Develop",
                    action: "click"
                }, Roblox.EventStream.TargetTypes.WWW)
            }
        },
        t = function() {
            $(".develop-rename-ab-test").bind("click", function() {
                n()
            })
        };
    return {
        Init: t
    }
}(), $(function() {
    Roblox.DevelopNavigationButtonClickEvent.Init()
});;
Roblox = Roblox || {}, Roblox.ShopAmazon = function() {
    function t() {
        $("a.roblox-shop-interstitial").on("click", function(n) {
            n.preventDefault(), Roblox.Dialog.open({
                titleText: "You are leaving Roblox",
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
        return "<p>Your are about to visit our amazon store. You will be redirected to Roblox merchandise store on <a class='text-link' target='_blank' href='" + n + "' >Amazon.com</a>.</p> <p>Please note that you need to be over 18 to purchase products online. The amazon store is not part of Roblox.com and is governed by a separate privacy policy.</p>"
    }

    function u() {
        t()
    }
    var n = "https://www.amazon.com/roblox?&_encoding=UTF8&tag=r05d13-20&linkCode=ur2&linkId=4ba2e1ad82f781c8e8cc98329b1066d0&camp=1789&creative=9325";
    $(function() {
        u()
    })
}();;
typeof Roblox == "undefined" && (Roblox = {}), typeof Roblox.Dialog == "undefined" && (Roblox.Dialog = function() {
    function d(f) {
        var b, c, a, p, o, w;
        n.isOpen = !0, b = {
            titleText: "",
            bodyContent: "",
            footerText: "",
            acceptText: Roblox.Resources.Dialog.yes,
            declineText: Roblox.Resources.Dialog.No,
            acceptColor: h,
            declineColor: s,
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
            showAccept: !0,
            showDecline: !0,
            allowHtmlContentInBody: !1,
            allowHtmlContentInFooter: !1,
            dismissable: !0,
            fieldValidationRequired: !1,
            onOpenCallback: function() {},
            onCloseCallback: t,
            cssClass: null,
            checkboxAgreementText: Roblox.Resources.Dialog.Agree,
            checkboxAgreementRequired: !1
        }, f = $.extend({}, b, f), i.overlayClose = f.dismissable, i.escClose = f.dismissable, f.onCloseCallback && (i.onClose = function() {
            f.onCloseCallback(), t()
        }), c = $(e), c.html(f.acceptText), c.attr("class", f.acceptColor), c.unbind(), c.bind("click", function() {
            return y(c) ? !1 : (f.fieldValidationRequired ? g(f.onAccept) : l(f.onAccept), !1)
        }), a = $(u), a.html(f.declineText), a.attr("class", f.declineColor), a.unbind(), a.bind("click", function() {
            return y(a) ? !1 : (l(f.onDecline), !1)
        }), p = $(nt), p.unbind(), p.bind("change", function() {
            p.is(":checked") ? v(c) : r(c)
        }), o = $('[data-modal-type="confirmation"]'), o.find(".modal-title").text(f.titleText), f.imageUrl == null ? o.addClass("noImage") : (o.find("img.modal-thumb").attr("src", f.imageUrl), o.removeClass("noImage")), n.extraClass && (o.removeClass(n.extraClass), n.extraClass = !1), f.cssClass != null && (o.addClass(f.cssClass), n.extraClass = f.cssClass), f.allowHtmlContentInBody ? o.find(".modal-message").html(f.bodyContent) : o.find(".modal-message").text(f.bodyContent), f.checkboxAgreementRequired ? (r(c), o.find(".modal-checkbox.checkbox > input").prop("checked", !1), o.find(".modal-checkbox.checkbox > label").text(f.checkboxAgreementText), o.find(".modal-checkbox.checkbox").show()) : (o.find(".modal-checkbox.checkbox > input").prop("checked", !0), o.find(".modal-checkbox.checkbox").hide()), $.trim(f.footerText) == "" ? o.find(".modal-footer").hide() : o.find(".modal-footer").show(), f.allowHtmlContentInFooter ? o.find(".modal-footer").html(f.footerText) : o.find(".modal-footer").text(f.footerText), o.modal(i), w = $(k + " .modal-header .close"), w.unbind(), w.bind("click", function() {
            return l(f.onCancel), !1
        }), f.xToCancel || w.hide(), f.showAccept || c.hide(), f.showDecline || a.hide(), $("#rbx-body").addClass("modal-mask"), f.onOpenCallback()
    }

    function r(n) {
        n.hasClass(s) ? n.addClass(f) : n.hasClass(a) ? n.addClass(o) : n.hasClass(h) && n.addClass(c)
    }

    function y(n) {
        return n.hasClass(c) || n.hasClass(f) || n.hasClass(o) ? !0 : !1
    }

    function it() {
        var n = $(e),
            t = $(u);
        r(n), r(t)
    }

    function v(n) {
        n.hasClass(f) ? (n.removeClass(f), n.addClass(s)) : n.hasClass(o) ? (n.removeClass(o), n.addClass(a)) : n.hasClass(c) && (n.removeClass(c), n.addClass(h))
    }

    function p() {
        var n = $(e),
            t = $(u);
        v(n), v(t)
    }

    function b() {
        if (n.isOpen) {
            var t = $(e);
            t.click()
        }
    }

    function w() {
        var n = $(u);
        n.click()
    }

    function t(t) {
        n.isOpen = !1, typeof t != "undefined" ? $.modal.close(t) : $.modal.close(), $("#rbx-body").removeClass("modal-mask")
    }

    function l(n) {
        t(), typeof n == "function" && n()
    }

    function g(n) {
        if (typeof n == "function") {
            var i = n();
            if (i !== "undefined" && i == !1) return !1
        }
        t()
    }

    function rt(n, t) {
        var i = $(".modal-body");
        n ? (i.find(".modal-btns").hide(), i.find(".modal-processing").show()) : (i.find(".modal-btns").show(), i.find(".modal-processing").hide()), typeof t != "undefined" && t !== "" && $.modal.close("." + t)
    }
    var k = ".simplemodal-container",
        a = "btn-primary-md",
        h = "btn-secondary-md",
        s = "btn-control-md",
        o = "btn-primary-md disabled",
        c = "btn-secondary-md disabled",
        f = "btn-control-md disabled",
        tt = "btn-none",
        e = ".modal-btns #confirm-btn",
        u = ".modal-btns #decline-btn",
        nt = "#modal-checkbox-input",
        n = {
            isOpen: !1
        },
        i = {
            overlayClose: !0,
            escClose: !0,
            opacity: 80,
            zIndex: 1040,
            overlayCss: {
                backgroundColor: "#000"
            },
            onClose: t,
            focus: !1
        };
    return {
        open: d,
        close: t,
        disableButtons: it,
        enableButtons: p,
        clickYes: b,
        clickNo: w,
        status: n,
        toggleProcessing: rt,
        green: a,
        blue: h,
        white: s,
        none: tt
    }
}()), $(document).keypress(function(n) {
    Roblox.Dialog.isOpen && n.which === 13 && Roblox.Dialog.clickYes()
});;
typeof Roblox == "undefined" && (Roblox = {}), typeof Roblox.FormEvents == "undefined" && (Roblox.FormEvents = function() {
    function n(n, t, i) {
        Roblox.EventStream && Roblox.EventStream.SendEvent(n, t, i)
    }

    function t(t, i, r, u) {
        var f = {
            msg: u,
            input: r,
            field: i,
            vis: !0
        };
        n("formValidation", t, f)
    }

    function i(t, i) {
        var r = {
            aType: "focus",
            field: i
        };
        n("formInteraction", t, r)
    }

    function r(t, i, r) {
        var u = {
            aType: "offFocus",
            field: i
        };
        r && (u.input = r), n("formInteraction", t, u)
    }

    function u(t, i) {
        var r = {
            aType: "click",
            field: i
        };
        n("formInteraction", t, r)
    }
    return {
        SendValidationFailed: t,
        SendInteractionFocus: i,
        SendInteractionOffFocus: r,
        SendInteractionClick: u
    }
}());;
"use strict";
robloxApp.directive("toggleLoading", [function() {
    return {
        restrict: "A",
        link: function(n, t, i) {
            var f = i.isInline,
                e = '<div class="spinner spinner-sm spinner-no-margin' + (f ? "" : " spinner-block") + '"></div>',
                r = angular.element(e),
                u;
            t.after(r), r.hide(), u = n.$watch(i.isLoading, function(n, i) {
                if (n !== i)
                    if (n) {
                        var u = t[0].offsetHeight,
                            f = t[0].offsetWidth;
                        r.css("height", u + "px"), r.css("width", f + "px"), t.hide(), r.show()
                    } else t.show(), r.hide()
            }, !0), n.$on("$destroy", function() {
                u && u()
            })
        }
    }
}]);;
"use strict";
var formEvents = angular.module("roblox.formEvents", []);;
"use strict";
formEvents.directive("rbxFormInteraction", function() {
    return {
        require: "^form",
        restrict: "A",
        link: function(n, t, i, r) {
            var u = i.sendInputValue;
            t.bind("blur", function() {
                if (Roblox.FormEvents) {
                    var n = angular.element(this),
                        t;
                    u && (t = n.val()), Roblox.FormEvents.SendInteractionOffFocus(r.context, n.attr("name"), t)
                }
            }).bind("focus", function() {
                Roblox.FormEvents && Roblox.FormEvents.SendInteractionFocus(r.context, angular.element(this).attr("name"))
            })
        }
    }
});;
"use strict";
formEvents.directive("rbxFormContext", function() {
    return {
        require: "form",
        restrict: "A",
        link: function(n, t, i, r) {
            var u = r.$name;
            r.context = i.context + u.charAt(0).toUpperCase() + u.substr(1)
        }
    }
});;
"use strict";
var contactUpsell = angular.module("contactUpsell", ["roblox.formEvents", "modal"]);;
"use strict";
contactUpsell.constant("contactUpsellConstants", {
    templates: {
        contactUpsellModal: "contact-upsell-modal",
        phoneModal: "add-phone-modal",
        emailModal: "add-email-modal",
        verifyPhoneModal: "verify-phone-modal",
        verifyEmailModal: "verify-email-modal"
    },
    controllers: {
        contactUpsellModal: "contactUpsellModalController",
        addEmailModal: "addEmailModalController",
        verifyEmailModal: "verifyEmailModalController",
        addPhoneModal: "addPhoneModalController",
        verifyPhoneModal: "verifyPhoneModalController"
    },
    urls: {
        getScreen: "/v1/user/screens/contact-upsell",
        suppressScreen: "/v1/user/screens/contact-upsell/suppress"
    },
    screenTypes: {
        none: "None",
        addContactMethod: "AddContactMethod",
        verifyEmail: "VerifyEmail",
        contactFriendFinder: "ContactFriendFinder"
    },
    modalTypes: {
        phoneUpsell: "phoneUpsell",
        emailUpsell: "emailUpsell",
        addPhone: "addPhone",
        addEmail: "addEmail",
        verifyPhone: "verifyPhone",
        verifyEmail: "verifyEmail"
    },
    upsellEventContext: "contactUpsell",
    upsellEventContextPrefix: "contactUpsell_"
});;
"use strict";
contactUpsell.constant("contactUpsellLabelConstants", {
    defaultHeader: "Don't get locked out!",
    findFriendsHeader: "Help your friends find you!",
    close: "Close",
    addNow: "Add Now",
    verifyEmail: "Verify Email",
    addPhonePrompt: "Please add a phone number to your account to ensure that you never get locked out of your account.",
    addEmailUnder13Prompt: "Please add your parent's email address to your account to ensure that you can always access your Roblox account.",
    addEmail13AndOverPrompt: "Please add an email address to your account to ensure that you can always access your Roblox account.",
    verifyEmailUnder13Prompt: "Please verify your parent's email address to ensure that you can always access your Roblox account.",
    verifyEmail13AndOverPrompt: "Please verify your email address to ensure that you can always access your Roblox account.",
    addEmailInstructionsUnder13: "Please enter your parent's email address. We will send a link to complete verification.",
    addEmailInstructions13AndOver: "Please enter your email address. We will send a link to complete verification.",
    contactFriendFinderPhoneUpsellPrompt: "Please add a phone number to your account so that your friends can find you!",
    success: "Success",
    errorMessage: "An error occurred",
    noPhone: "Don't have a phone?",
    noEmail: "Don't have an email?",
    addEmail: "Add Email",
    addPhoneNumber: "Add Phone Number",
    addEmailLink: "Add email",
    editPhoneNumber: "Edit Phone Number",
    addPhoneInstructions: "Please confirm your country code and enter your phone number. We will send a text message to complete verification. (Note: Text messaging charges may apply)",
    phoneAdded: "Phone has been successfully added."
});;
"use strict";
contactUpsell.factory("contactUpsellService", ["httpService", "contactUpsellConstants", function(n, t) {
    function i() {
        var i = Roblox.ContactUpsellMeta.accountSettingsApiDomain + t.urls.getScreen,
            r = {
                url: i
            };
        return n.httpGet(r)
    }

    function r() {
        var i = Roblox.ContactUpsellMeta.accountSettingsApiDomain + t.urls.suppressScreen,
            r = {
                url: i
            };
        return n.httpPost(r)
    }
    return {
        getScreen: i,
        suppressScreen: r
    }
}]);;
"use strict";
contactUpsell.controller("contactUpsellController", ["$scope", "$uibModal", "modalService", "eventStreamService", "contactUpsellService", "contactUpsellConstants", "contactUpsellLabelConstants", function(n, t, i, r, u, f, e) {
    n.data = {}, n.init = function() {
        n.data.isUnder13 = Roblox.CurrentUser && Roblox.CurrentUser.isUnder13, u.getScreen().then(function(t) {
            t && t.upsellScreenType && t.upsellScreenType !== f.screenTypes.none && n.launchUpsellModal(t), t.upsellScreenType !== f.screenTypes.contactFriendFinder && u.suppressScreen()
        })
    }, n.launchUpsellModal = function(i) {
        var r = i.upsellScreenType,
            u;
        n.upsellModalData = {
            upsellScreenType: r
        }, u = {
            backdrop: "static",
            templateUrl: f.templates.contactUpsellModal,
            scope: n,
            controller: f.controllers.contactUpsellModal
        }, t.open(u).result.then(function(t) {
            n.handleUpsellModalResponse(t)
        }, function() {
            n.sendModalDismissedEvent(r)
        })
    }, n.handleUpsellModalResponse = function(t) {
        t && (t.showAddPhoneModal ? n.launchAddPhoneModal() : t.showAddEmailModal ? n.launchAddEmailModal() : t.showVerifyEmailModal && n.launchVerifyEmailModal())
    }, n.launchAddEmailModal = function() {
        n.addEmailModalData = {
            eventContext: f.upsellEventContext,
            message: n.data.isUnder13 ? e.addEmailInstructionsUnder13 : e.addEmailInstructions13AndOver,
            footerText: e.noEmail,
            footerLink: e.addPhoneNumber,
            closeModalParams: {
                showAddPhoneModal: !0
            }
        };
        var i = {
            backdrop: "static",
            templateUrl: f.templates.emailModal,
            scope: n,
            controller: f.controllers.addEmailModal
        };
        t.open(i).result.then(function(t) {
            n.handleAddEmailModalResponse(t)
        }, function() {
            n.sendModalDismissedEvent(f.modalTypes.addEmail)
        })
    }, n.handleAddEmailModalResponse = function(t) {
        t && (t.success ? n.launchVerifyEmailModal() : t.showAddPhoneModal && n.launchAddPhoneModal())
    }, n.launchVerifyEmailModal = function() {
        n.verifyEmailModalData = {
            isUnder13: n.data.isUnder13
        };
        var i = {
            backdrop: "static",
            templateUrl: f.templates.verifyEmailModal,
            scope: n,
            controller: f.controllers.verifyEmailModal
        };
        t.open(i).result.then(angular.noop, angular.noop)
    }, n.launchAddPhoneModal = function() {
        n.addPhoneModalData = {
            eventContext: f.upsellEventContext,
            message: e.addPhoneInstructions,
            footerText: e.noPhone,
            footerLink: e.addEmail,
            closeModalParams: {
                showAddEmailModal: !0
            }
        };
        var i = {
            backdrop: "static",
            templateUrl: f.templates.phoneModal,
            scope: n,
            controller: f.controllers.addPhoneModal
        };
        t.open(i).result.then(function(t) {
            n.handleAddPhoneModalResponse(t)
        }, function() {
            n.sendModalDismissedEvent(f.modalTypes.addPhone)
        })
    }, n.handleAddPhoneModalResponse = function(t) {
        t && (t.success ? n.launchVerifyPhoneModal(t.phoneNumber) : t.showAddEmailModal && n.launchAddEmailModal())
    }, n.launchVerifyPhoneModal = function(i) {
        n.verifyPhoneModalData = {
            eventContext: f.upsellEventContext,
            phoneNumber: i,
            codeLength: Roblox.ContactUpsellMeta.codeLength,
            secondaryFooterOptionText: e.editPhoneNumber,
            secondaryFooterOptionCloseParams: {
                showAddPhoneModal: !0
            }
        };
        var r = {
            backdrop: "static",
            templateUrl: f.templates.verifyPhoneModal,
            scope: n,
            controller: f.controllers.verifyPhoneModal
        };
        t.open(r).result.then(function(t) {
            n.handleVerifyPhoneModalResponse(t)
        }, function() {
            n.sendModalDismissedEvent(f.modalTypes.verifyPhone)
        })
    }, n.handleVerifyPhoneModalResponse = function(t) {
        t && (t.success ? i.open({
            titleText: e.success,
            bodyText: e.phoneAdded
        }) : t.showAddPhoneModal ? n.launchAddPhoneModal() : t.showAddEmailModal && n.launchAddEmailModal())
    }, n.sendModalDismissedEvent = function(n) {
        var t = f.upsellEventContextPrefix + n;
        r.sendModalDismissedEvent(t)
    }, n.init()
}]);;
"use strict";
contactUpsell.controller("contactUpsellModalController", ["$scope", "$uibModalInstance", "eventStreamService", "regexService", "emailModalService", "contactUpsellConstants", "contactUpsellLabelConstants", function(n, t, i, r, u, f, e) {
    n.data = {}, n.layout = {
        labels: e
    }, n.init = function() {
        n.data.isUnder13 = Roblox.CurrentUser && Roblox.CurrentUser.isUnder13, n.data.isPhone = Roblox.DeviceMeta && Roblox.DeviceMeta().isPhone, n.layout.header = e.defaultHeader, n.initializeModalData()
    }, n.initializeModalData = function() {
        if (n.upsellModalData) switch (n.upsellModalData.upsellScreenType) {
            case f.screenTypes.addContactMethod:
            case f.screenTypes.contactFriendFinder:
                n.initializeAddContactMethodModal();
                break;
            case f.screenTypes.verifyEmail:
                n.initializeVerifyEmailModal()
        }
    }, n.initializeAddContactMethodModal = function() {
        n.layout.showAddContactMethod = !0, n.layout.showAddPhone = !n.data.isUnder13 && n.data.isPhone, n.layout.canShowPhoneOption = !n.data.isUnder13, n.layout.showAddPhone ? (n.setContactUpsellText(), n.layout.footerText = e.noPhone, n.layout.footerLink = e.addEmail, n.sendModalShownEvent(f.modalTypes.phoneUpsell)) : (n.layout.modalBodyText = n.data.isUnder13 ? e.addEmailUnder13Prompt : e.addEmail13AndOverPrompt, n.layout.footerText = e.noEmail, n.layout.footerLink = e.addPhoneNumber, n.sendModalShownEvent(f.modalTypes.emailUpsell))
    }, n.setContactUpsellText = function() {
        switch (n.upsellModalData.upsellScreenType) {
            case f.screenTypes.contactFriendFinder:
                n.layout.header = e.findFriendsHeader, n.layout.modalBodyText = e.contactFriendFinderPhoneUpsellPrompt;
                break;
            default:
                n.layout.modalBodyText = e.addPhonePrompt
        }
    }, n.initializeVerifyEmailModal = function() {
        n.layout.showVerifyEmail = !0, n.layout.modalBodyText = n.data.isUnder13 ? e.verifyEmailUnder13Prompt : e.verifyEmail13AndOverPrompt, n.sendModalShownEvent(f.modalTypes.verifyEmail)
    }, n.clearError = function() {
        n.layout.error = null
    }, n.getError = function() {
        return n.layout.error
    }, n.addContactMethod = function() {
        var i;
        i = n.layout.showAddPhone ? {
            showAddPhoneModal: !0
        } : {
            showAddEmailModal: !0
        }, t.close(i)
    }, n.addAlternativeContactMethod = function() {
        var i;
        i = n.layout.showAddPhone ? {
            showAddEmailModal: !0
        } : {
            showAddPhoneModal: !0
        }, t.close(i)
    }, n.sendVerificationEmail = function() {
        n.layout.isSubmitBusy = !0, n.layout.error = null, u.sendVerificationEmail().then(function(t) {
            n.handleSendVerificationEmailResponse(t)
        }, function() {
            n.layout.error = e.errorMessage, n.sendSendVerificationEmailEvent(!1)
        }).finally(function() {
            n.layout.isSubmitBusy = !1
        })
    }, n.handleSendVerificationEmailResponse = function(i) {
        if (!i) {
            n.layout.error = e.errorMessage, n.sendSendVerificationEmailEvent(!1);
            return
        }
        i.Success ? (n.sendSendVerificationEmailEvent(!0), t.close({
            showVerifyEmailModal: !0
        })) : (n.layout.error = i.Message, n.sendSendVerificationEmailEvent(!1, i.Message))
    }, n.sendModalShownEvent = function(n) {
        var t = f.upsellEventContextPrefix + n;
        i.sendModalShownEvent(t)
    }, n.sendSendVerificationEmailEvent = function(n, t) {
        i.sendEventWithTarget(i.eventNames.account.sendVerificationEmail, f.upsellEventContext, {
            success: n,
            msg: t
        })
    }, n.init()
}]);;
"use strict";
var emailModal = angular.module("emailModal", ["roblox.formEvents", "modal"]);;
"use strict";
emailModal.constant("emailModalConstants", {
    urls: {
        sendVerificationEmail: "/my/account/sendverifyemail",
        addEmail: "/account/changeemail"
    },
    modalTypes: {
        addEmail: "addEmail",
        verifyEmail: "verifyEmail"
    },
    underscore: "_"
});;
"use strict";
emailModal.constant("emailModalLabelConstants", {
    close: "Close",
    addEmail: "Add Email",
    submit: "Submit",
    ok: "OK",
    verifyEmail: "Verify Email",
    parentsEmailPlaceholder: "Parent's Email Address",
    emailPlaceholder: "Email Address",
    verifyPasswordPlaceholder: "Roblox Account Password",
    success: "Success",
    invalidEmail: "Invalid email",
    errorMessage: "An error occurred",
    verifyEmail13AndOverSuccessMessage: "Verification link has been sent to your email - please verify your email to secure your account.",
    verifyEmailUnder13SuccessMessage: "Verification link has been sent to your parent's email - please verify your parent's email to secure your account.",
    verifyEmailInstructions: "Verification link has been sent to your email. Please verify your email to secure your account. You can always visit Settings > Account Info to modify your account.",
    notReceived: "Didn't receive it?",
    resendEmail: "Resend Email"
});;
"use strict";
emailModal.factory("emailModalService", ["httpService", "emailModalConstants", function(n, t) {
    function i(i) {
        var r = t.urls.addEmail,
            u = {
                url: r
            },
            f = {
                emailAddress: i.email,
                password: i.password
            };
        return n.httpPost(u, f)
    }

    function r() {
        var i = t.urls.sendVerificationEmail,
            r = {
                url: i
            };
        return n.httpPost(r)
    }
    return {
        updateEmail: i,
        sendVerificationEmail: r
    }
}]);;
"use strict";
emailModal.controller("addEmailModalController", ["$scope", "$uibModalInstance", "eventStreamService", "regexService", "emailModalService", "emailModalConstants", "emailModalLabelConstants", function(n, t, i, r, u, f, e) {
    n.data = {}, n.forms = {
        emailForm: {}
    }, n.layout = {
        constants: f,
        labels: e
    }, n.init = function() {
        n.data.isUnder13 = Roblox.CurrentUser && Roblox.CurrentUser.isUnder13, n.initializeAddEmailModal(), n.sendModalShownEvent()
    }, n.initializeAddEmailModal = function() {
        n.layout.emailPlaceholder = n.data.isUnder13 ? e.parentsEmailPlaceholder : e.emailPlaceholder, r.getEmailRegex().then(function(t) {
            t && (n.layout.emailRegex = t.Regex)
        }), n.layout.focusOnEmailInput = !0
    }, n.closeModal = function() {
        t.close(n.addEmailModalData.closeModalParams)
    }, n.clearError = function() {
        n.layout.error = null
    }, n.getEmailError = function() {
        if (!n.isEmailValid()) return e.invalidEmail
    }, n.getError = function() {
        return n.layout.error
    }, n.isEmailValid = function() {
        return n.forms.emailForm.email.$valid
    }, n.submitEmail = function() {
        n.layout.isSubmitBusy = !0, n.layout.error = null;
        var i = {
            email: n.data.email,
            password: n.data.password
        };
        u.updateEmail(i).then(function(i) {
            if (i || (n.layout.error = e.errorMessage, n.sendAddEmailActionEvent(!1)), i.Success) n.sendAddEmailActionEvent(!0), t.close({
                success: !0
            });
            else {
                var r = i.error || i.Message;
                n.layout.error = r, n.sendAddEmailActionEvent(!1, r)
            }
        }, function() {
            n.layout.error = e.errorMessage, n.sendAddEmailActionEvent(!1)
        }).finally(function() {
            n.layout.isSubmitBusy = !1
        })
    }, n.sendModalShownEvent = function() {
        var t = n.addEmailModalData.eventContext + f.underscore + f.modalTypes.addEmail;
        i.sendModalShownEvent(t)
    }, n.sendAddEmailActionEvent = function(t, r) {
        i.sendEventWithTarget(i.eventNames.account.addEmail, n.addEmailModalData.eventContext, {
            success: t,
            msg: r
        })
    }, n.init()
}]);;
"use strict";
emailModal.controller("verifyEmailModalController", ["$scope", "emailModalService", "emailModalConstants", "emailModalLabelConstants", function(n, t, i, r) {
    n.layout = {
        labels: r
    }, n.init = function() {
        n.layout.verifyEmailInstructions = n.verifyEmailModalData.isUnder13 ? r.verifyEmailUnder13SuccessMessage : r.verifyEmail13AndOverSuccessMessage
    }, n.resendVerificationEmail = function() {
        n.layout.error = null, n.layout.isSubmitBusy = !0, t.sendVerificationEmail().then(function(t) {
            t || (n.layout.error = r.errorMessage), t.Success || (n.layout.error = t.Message)
        }, function() {
            n.layout.error = r.errorMessage
        }).finally(function() {
            n.layout.isSubmitBusy = !1
        })
    }, n.init()
}]);;
(function() {
    function kt(n, t) {
        var r = n.split("."),
            i = ru,
            u;
        for ((r[0] in i) || !i.execScript || i.execScript("var " + r[0]); r.length && (u = r.shift());) r.length || void 0 === t ? i = i[u] ? i[u] : i[u] = {} : i[u] = t
    }

    function p(n, t) {
        function i() {}
        i.prototype = t.prototype, n.ha = t.prototype, n.prototype = new i, n.prototype.constructor = n, n.ma = function(n, i) {
            for (var f = Array(arguments.length - 2), u = 2; u < arguments.length; u++) f[u - 2] = arguments[u];
            return t.prototype[i].apply(n, f)
        }
    }

    function r(n) {
        null != n && this.a.apply(this, arguments)
    }

    function f(n) {
        n.b = ""
    }

    function ur(n, t) {
        n.sort(t || fr)
    }

    function fr(n, t) {
        return n > t ? 1 : n < t ? -1 : 0
    }

    function er(n) {
        var t = [],
            r = 0,
            i;
        for (i in n) t[r++] = n[i];
        return t
    }

    function or(n, t) {
        var i, r;
        for (this.b = n, this.a = {}, i = 0; i < t.length; i++) r = t[i], this.a[r.f] = r
    }

    function sr(n) {
        return n = er(n.a), ur(n, function(n, t) {
            return n.f - t.f
        }), n
    }

    function hr(n, t) {
        this.f = n, this.g = !!t.ba, this.a = t.c, this.j = t.type, this.i = !1;
        switch (this.a) {
            case ar:
            case vr:
            case yr:
            case pr:
            case wr:
            case lr:
            case cr:
                this.i = !0
        }
        this.b = t.defaultValue
    }

    function s() {
        this.a = {}, this.f = this.h().a, this.b = this.g = null
    }

    function oi(n, t) {
        for (var r, f, i, e, c = sr(n.h()), s = 0; s < c.length; s++)
            if (i = c[s], r = i.f, null != t.a[r])
                if (n.b && delete n.b[i.f], f = 11 == i.a || 10 == i.a, i.g)
                    for (i = w(t, r) || [], e = 0; e < i.length; e++) {
                        var o = n,
                            h = r,
                            l = f ? i[e].clone() : i[e];
                        o.a[h] || (o.a[h] = []), o.a[h].push(l), o.b && delete o.b[h]
                    } else i = w(t, r), f ? (f = w(n, r)) ? oi(f, i) : u(n, r, i.clone()) : u(n, r, i)
    }

    function w(n, t) {
        var i = n.a[t],
            f, u, e, r;
        if (null == i) return null;
        if (n.g) {
            if (!(t in n.b)) {
                if (f = n.g, u = n.f[t], null != i)
                    if (u.g) {
                        for (e = [], r = 0; r < i.length; r++) e[r] = f.b(u, i[r]);
                        i = e
                    } else i = f.b(u, i);
                return n.b[t] = i
            }
            return n.b[t]
        }
        return i
    }

    function n(n, t, i) {
        var r = w(n, t);
        return n.f[t].g ? r[i || 0] : r
    }

    function i(t, i) {
        var r, u;
        if (null != t.a[i]) r = n(t, i, void 0);
        else n: {
            if (r = t.f[i], void 0 === r.b)
                if (u = r.j, u === Boolean) r.b = !1;
                else if (u === Number) r.b = 0;
            else if (u === String) r.b = r.i ? "0" : "";
            else {
                r = new u;
                break n
            }
            r = r.b
        }
        return r
    }

    function ct(n, t) {
        return n.f[t].g ? null != n.a[t] ? n.a[t].length : 0 : null != n.a[t] ? 1 : 0
    }

    function u(n, t, i) {
        n.a[t] = i, n.b && (n.b[t] = i)
    }

    function nt(n, t) {
        var r = [],
            i;
        for (i in t) 0 != i && r.push(new hr(i, t[i]));
        return new or(n, r)
    }

    function c() {
        s.call(this)
    }

    function t() {
        s.call(this)
    }

    function h() {
        s.call(this)
    }

    function l() {
        s.call(this)
    }

    function d() {}

    function rt() {}

    function k() {}

    function v() {
        this.a = {}
    }

    function iu(n) {
        var t = n.search(kr);
        return 0 <= t ? (n = n.substring(t), n = n.replace(gr, ""), t = n.search(dr), 0 <= t && (n = n.substring(0, t))) : n = "", n
    }

    function wt(n) {
        return 2 > n.length ? !1 : o(tu, n)
    }

    function pt(n) {
        return o(nu, n) ? lt(n, br) : lt(n, tt)
    }

    function ii(n) {
        var t = pt(n.toString());
        f(n), n.a(t)
    }

    function lt(n, t) {
        for (var f = new r, i, e = n.length, u = 0; u < e; ++u) i = n.charAt(u), i = t[i.toUpperCase()], null != i && f.a(i);
        return f.toString()
    }

    function at(n) {
        return null != n && isNaN(n) && n.toUpperCase() in yt
    }

    function a(n, t) {
        if (null == t) return null;
        t = t.toUpperCase();
        var i = n.a[t];
        if (null == i) {
            if (i = yt[t], null == i) return null;
            i = (new k).a(h.h(), i), n.a[t] = i
        }
        return i
    }

    function e(n, t) {
        return o(i(t, 3), n) && o(i(t, 2), n)
    }

    function vt(n) {
        return n = it[n], null == n ? "ZZ" : n[0]
    }

    function ni(n, t) {
        var r = a(n, t);
        if (null == r) throw "Invalid region code: " + t;
        return i(r, 10)
    }

    function bi(n, t) {
        return o(n, t) ? 0 : 0 == t.search(n) ? 3 : 2
    }

    function ai(n, t) {
        var r = n.toString(),
            u, f, i;
        if (0 == r.length || "0" == r.charAt(0)) return 0;
        for (f = r.length, i = 1; 3 >= i && i <= f; ++i)
            if (u = parseInt(r.substring(0, i), 10), u in it) return t.a(r.substring(i)), u;
        return 0
    }

    function bt(t, e, s, h) {
        var c, l, a;
        if (0 == t.length) return 0;
        if (t = new r(t), null != e && (c = n(e, 11)), null == c && (c = "NonMatch"), l = t.toString(), 0 == l.length ? c = 20 : b.test(l) ? (l = l.replace(b, ""), f(t), t.a(pt(l)), c = 1) : (l = new RegExp(c), ii(t), c = t.toString(), 0 == c.search(l) ? (l = c.match(l)[0].length, a = c.substring(l).match(li), a && null != a[1] && 0 < a[1].length && "0" == lt(a[1], tt) ? c = !1 : (f(t), t.a(c.substring(l)), c = !0)) : c = !1, c = c ? 5 : 20), u(h, 6, c), 20 != c) {
            if (2 >= t.b.length) throw "Phone number too short after IDD";
            if (s = ai(t, s), 0 != s) return u(h, 1, s), s;
            throw "Invalid country calling code";
        }
        if (null != e && (c = i(e, 10), l = "" + c, a = t.toString(), 0 == a.lastIndexOf(l, 0))) {
            var v = new r(a.substring(l.length)),
                a = n(e, 1),
                l = new RegExp(i(a, 2));
            if (dt(v, e, null), e = v.toString(), a = i(a, 3), !o(l, t.toString()) && o(l, e) || 3 == bi(a, t.toString())) return s.a(e), u(h, 6, 10), u(h, 1, c), c
        }
        return u(h, 1, 0), 0
    }

    function dt(t, r, u) {
        var e = t.toString(),
            f = e.length,
            h = n(r, 15),
            c, s, l;
        0 != f && null != h && 0 != h.length && (h = new RegExp("^(?:" + h + ")"), f = h.exec(e)) && (c = RegExp, s = n(r, 1), s = i(s, 2), c = new c(s), s = o(c, e), l = f.length - 1, r = n(r, 16), null == r || 0 == r.length || null == f[l] || 0 == f[l].length ? (!s || o(c, e.substring(f[0].length))) && (null != u && 0 < l && null != f[l] && u.a(f[1]), t.b = "" + e.substring(f[0].length)) : (e = e.replace(h, r), !s || o(c, e)) && (null != u && 0 < l && u.a(f[1]), t.b = "" + e))
    }

    function o(n, t) {
        var i = "string" == typeof n ? t.match("^(?:" + n + ")$") : t.match(n);
        return i && i[0].length == t.length ? !0 : !1
    }

    function di(n) {
        this.ca = RegExp("â€ˆ"), this.ea = "", this.m = new r, this.v = "", this.i = new r, this.u = new r, this.j = !0, this.w = this.o = this.ga = !1, this.da = v.a(), this.s = 0, this.b = new r, this.$ = !1, this.l = "", this.a = new r, this.f = [], this.fa = n, this.g = fi(this, this.fa)
    }

    function fi(n, t) {
        var i = at(t) ? ni(n.da, t) : 0,
            i = a(n.da, vt(i));
        return null != i ? i : et
    }

    function ri(t) {
        for (var h, c, r, u, e, o, l, a = t.f.length, s = 0; s < a; ++s) {
            if (h = t.f[s], c = i(h, 1), t.v == c) return !1;
            if (r = t, o = h, u = i(o, 1), -1 != u.indexOf("|") ? r = !1 : (u = u.replace(nr, "\\d"), u = u.replace(tr, "\\d"), f(r.m), e = r, o = i(o, 2), l = "999999999999999".match(u)[0], l.length < e.a.b.length ? e = "" : (e = l.replace(new RegExp(u, "g"), o), e = e.replace(RegExp("9", "g"), "â€ˆ")), 0 < e.length ? (r.m.a(e), r = !0) : r = !1), r) return t.v = c, t.$ = ei.test(n(h, 4)), t.s = 0, !0
        }
        return t.j = !1
    }

    function yi(t, i) {
        for (var r, f = [], e = i.length - 3, o = t.f.length, u = 0; u < o; ++u) r = t.f[u], 0 == ct(r, 3) ? f.push(t.f[u]) : (r = n(r, 3, Math.min(e, ct(r, 3) - 1)), 0 == i.search(r) && f.push(t.f[u]));
        t.f = f
    }

    function gi(n, t) {
        var i, r;
        if (n.i.a(t), i = t, li.test(i) || 1 == n.i.b.length && ir.test(i) ? (i = t, "+" == i ? (r = i, n.u.a(i)) : (r = tt[i], n.u.a(r), n.a.a(r)), t = r) : (n.j = !1, n.ga = !0), !n.j) {
            if (!n.ga)
                if (pi(n)) {
                    if (gt(n)) return si(n)
                } else if (0 < n.l.length && (i = n.a.toString(), f(n.a), n.a.a(n.l), n.a.a(i), i = n.b.toString(), r = i.lastIndexOf(n.l), f(n.b), n.b.a(i.substring(0, r))), n.l != ui(n)) return n.b.a(" "), si(n);
            return n.i.toString()
        }
        switch (n.u.b.length) {
            case 0:
            case 1:
            case 2:
                return n.i.toString();
            case 3:
                if (pi(n)) n.w = !0;
                else return n.l = ui(n), ht(n);
            default:
                return n.w ? (gt(n) && (n.w = !1), n.b.toString() + n.a.toString()) : 0 < n.f.length ? (i = wi(n, t), r = hi(n), 0 < r.length) ? r : (yi(n, n.a.toString()), ri(n) ? ci(n) : n.j ? g(n, i) : n.i.toString()) : ht(n)
        }
    }

    function si(n) {
        return n.j = !0, n.w = !1, n.f = [], n.s = 0, f(n.m), n.v = "", ht(n)
    }

    function hi(t) {
        for (var u, e, r = t.a.toString(), o = t.f.length, f = 0; f < o; ++f)
            if (u = t.f[f], e = i(u, 1), new RegExp("^(?:" + e + ")$").test(r)) return t.$ = ei.test(n(u, 4)), r = r.replace(new RegExp(e, "g"), n(u, 2)), g(t, r);
        return ""
    }

    function g(n, t) {
        var i = n.b.b.length;
        return n.$ && 0 < i && " " != n.b.toString().charAt(i - 1) ? n.b + " " + t : n.b + t
    }

    function ht(t) {
        var u = t.a.toString(),
            f, r;
        if (3 <= u.length) {
            for (var o = t.o && 0 < ct(t.g, 20) ? w(t.g, 20) || [] : w(t.g, 19) || [], s = o.length, e = 0; e < s; ++e) f = o[e], (r = null == t.g.a[12] || t.o || n(f, 6)) || (r = i(f, 4), r = 0 == r.length || rr.test(r)), r && (r = i(f, 2), ki.test(r) && t.f.push(f));
            return yi(t, u), u = hi(t), 0 < u.length ? u : ri(t) ? ci(t) : t.i.toString()
        }
        return g(t, u)
    }

    function ci(n) {
        var r = n.a.toString(),
            u = r.length,
            i, t;
        if (0 < u) {
            for (i = "", t = 0; t < u; t++) i = wi(n, r.charAt(t));
            return n.j ? g(n, i) : n.i.toString()
        }
        return n.b.toString()
    }

    function ui(t) {
        var u = t.a.toString(),
            r = 0,
            i;
        return 1 != n(t.g, 10) ? i = !1 : (i = t.a.toString(), i = "1" == i.charAt(0) && "0" != i.charAt(1) && "1" != i.charAt(1)), i ? (r = 1, t.b.a("1").a(" "), t.o = !0) : null != t.g.a[15] && (i = new RegExp("^(?:" + n(t.g, 15) + ")"), i = u.match(i), null != i && null != i[0] && 0 < i[0].length && (t.o = !0, r = i[0].length, t.b.a(u.substring(0, r)))), f(t.a), t.a.a(u.substring(r)), u.substring(0, r)
    }

    function pi(t) {
        var r = t.u.toString(),
            i = new RegExp("^(?:\\+|" + n(t.g, 11) + ")"),
            i = r.match(i);
        return null != i && null != i[0] && 0 < i[0].length ? (t.o = !0, i = i[0].length, f(t.a), t.a.a(r.substring(i)), f(t.b), t.b.a(r.substring(0, i)), "+" != r.charAt(0) && t.b.a(" "), !0) : !1
    }

    function gt(n) {
        if (0 == n.a.b.length) return !1;
        var t = new r,
            i = ai(n.a, t);
        return 0 == i ? !1 : (f(n.a), n.a.a(t.toString()), t = vt(i), "001" == t ? n.g = a(n.da, "" + i) : t != n.fa && (n.g = fi(n, t)), n.b.a("" + i).a(" "), n.l = "", !0)
    }

    function wi(n, t) {
        var i = n.m.toString(),
            r;
        return 0 <= i.substring(n.s).search(n.ca) ? (r = i.search(n.ca), i = i.replace(n.ca, t), f(n.m), n.m.a(i), n.s = r, i.substring(0, n.s + 1)) : (1 == n.f.length && (n.j = !1), n.v = "", n.i.toString())
    }
    var ru = this,
        st, ot, ft, ut, vi, it, yt, et, y;
    r.prototype.b = "", r.prototype.a = function(n, t) {
        if (this.b += n, null != t)
            for (var r = 1; r < arguments.length; r++) this.b += arguments[r];
        return this
    }, r.prototype.toString = function() {
        return this.b
    };
    var cr = 1,
        lr = 2,
        ar = 3,
        vr = 4,
        yr = 6,
        pr = 16,
        wr = 18;
    s.prototype.clone = function() {
        var n = new this.constructor;
        return n != this && (n.a = {}, n.b && (n.b = {}), oi(n, this)), n
    }, p(c, s), p(t, s), p(h, s), c.prototype.h = function() {
        return st || (st = nt(c, {
            0: {
                name: "NumberFormat",
                aa: "i18n.phonenumbers.NumberFormat"
            },
            1: {
                name: "pattern",
                required: !0,
                c: 9,
                type: String
            },
            2: {
                name: "format",
                required: !0,
                c: 9,
                type: String
            },
            3: {
                name: "leading_digits_pattern",
                ba: !0,
                c: 9,
                type: String
            },
            4: {
                name: "national_prefix_formatting_rule",
                c: 9,
                type: String
            },
            6: {
                name: "national_prefix_optional_when_formatting",
                c: 8,
                type: Boolean
            },
            5: {
                name: "domestic_carrier_code_formatting_rule",
                c: 9,
                type: String
            }
        })), st
    }, c.ctor = c, c.ctor.h = c.prototype.h, t.prototype.h = function() {
        return ot || (ot = nt(t, {
            0: {
                name: "PhoneNumberDesc",
                aa: "i18n.phonenumbers.PhoneNumberDesc"
            },
            2: {
                name: "national_number_pattern",
                c: 9,
                type: String
            },
            3: {
                name: "possible_number_pattern",
                c: 9,
                type: String
            },
            6: {
                name: "example_number",
                c: 9,
                type: String
            },
            7: {
                name: "national_number_matcher_data",
                c: 12,
                type: String
            },
            8: {
                name: "possible_number_matcher_data",
                c: 12,
                type: String
            }
        })), ot
    }, t.ctor = t, t.ctor.h = t.prototype.h, h.prototype.h = function() {
        return ft || (ft = nt(h, {
            0: {
                name: "PhoneMetadata",
                aa: "i18n.phonenumbers.PhoneMetadata"
            },
            1: {
                name: "general_desc",
                c: 11,
                type: t
            },
            2: {
                name: "fixed_line",
                c: 11,
                type: t
            },
            3: {
                name: "mobile",
                c: 11,
                type: t
            },
            4: {
                name: "toll_free",
                c: 11,
                type: t
            },
            5: {
                name: "premium_rate",
                c: 11,
                type: t
            },
            6: {
                name: "shared_cost",
                c: 11,
                type: t
            },
            7: {
                name: "personal_number",
                c: 11,
                type: t
            },
            8: {
                name: "voip",
                c: 11,
                type: t
            },
            21: {
                name: "pager",
                c: 11,
                type: t
            },
            25: {
                name: "uan",
                c: 11,
                type: t
            },
            27: {
                name: "emergency",
                c: 11,
                type: t
            },
            28: {
                name: "voicemail",
                c: 11,
                type: t
            },
            24: {
                name: "no_international_dialling",
                c: 11,
                type: t
            },
            9: {
                name: "id",
                required: !0,
                c: 9,
                type: String
            },
            10: {
                name: "country_code",
                c: 5,
                type: Number
            },
            11: {
                name: "international_prefix",
                c: 9,
                type: String
            },
            17: {
                name: "preferred_international_prefix",
                c: 9,
                type: String
            },
            12: {
                name: "national_prefix",
                c: 9,
                type: String
            },
            13: {
                name: "preferred_extn_prefix",
                c: 9,
                type: String
            },
            15: {
                name: "national_prefix_for_parsing",
                c: 9,
                type: String
            },
            16: {
                name: "national_prefix_transform_rule",
                c: 9,
                type: String
            },
            18: {
                name: "same_mobile_and_fixed_line_pattern",
                c: 8,
                defaultValue: !1,
                type: Boolean
            },
            19: {
                name: "number_format",
                ba: !0,
                c: 11,
                type: c
            },
            20: {
                name: "intl_number_format",
                ba: !0,
                c: 11,
                type: c
            },
            22: {
                name: "main_country_for_code",
                c: 8,
                defaultValue: !1,
                type: Boolean
            },
            23: {
                name: "leading_digits",
                c: 9,
                type: String
            },
            26: {
                name: "leading_zero_possible",
                c: 8,
                defaultValue: !1,
                type: Boolean
            }
        })), ft
    }, h.ctor = h, h.ctor.h = h.prototype.h, p(l, s), vi = {
        la: 1,
        ka: 5,
        ja: 10,
        ia: 20
    }, l.prototype.h = function() {
        return ut || (ut = nt(l, {
            0: {
                name: "PhoneNumber",
                aa: "i18n.phonenumbers.PhoneNumber"
            },
            1: {
                name: "country_code",
                required: !0,
                c: 5,
                type: Number
            },
            2: {
                name: "national_number",
                required: !0,
                c: 4,
                type: Number
            },
            3: {
                name: "extension",
                c: 9,
                type: String
            },
            4: {
                name: "italian_leading_zero",
                c: 8,
                type: Boolean
            },
            8: {
                name: "number_of_leading_zeros",
                c: 5,
                defaultValue: 1,
                type: Number
            },
            5: {
                name: "raw_input",
                c: 9,
                type: String
            },
            6: {
                name: "country_code_source",
                c: 14,
                defaultValue: 1,
                type: vi
            },
            7: {
                name: "preferred_domestic_carrier_code",
                c: 9,
                type: String
            }
        })), ut
    }, l.ctor = l, l.ctor.h = l.prototype.h, d.prototype.a = function(n) {
        new n.b;
        throw Error("Unimplemented");
    }, d.prototype.b = function(n, t) {
        if (11 == n.a || 10 == n.a) return t instanceof s ? t : this.a(n.j.prototype.h(), t);
        if (14 == n.a || !n.i) return t;
        var i = n.j;
        if (i === String) {
            if ("number" == typeof t) return String(t)
        } else if (i === Number && "string" == typeof t && ("Infinity" === t || "-Infinity" === t || "NaN" === t || /^-?[0-9]+$/.test(t))) return Number(t);
        return t
    }, p(rt, d), rt.prototype.a = function(n, t) {
        var i = new n.b;
        return i.g = this, i.a = t, i.b = {}, i
    }, p(k, rt), k.prototype.b = function(n, t) {
        return 8 == n.a ? !!t : d.prototype.b.apply(this, arguments)
    }, k.prototype.a = function(n, t) {
        return k.ha.a.call(this, n, t)
    }, it = {
        1: "US AG AI AS BB BM BS CA DM DO GD GU JM KN KY LC MP MS PR SX TC TT VC VG VI".split(" "),
        7: ["RU", "KZ"],
        20: ["EG"],
        27: ["ZA"],
        30: ["GR"],
        31: ["NL"],
        32: ["BE"],
        33: ["FR"],
        34: ["ES"],
        36: ["HU"],
        39: ["IT", "VA"],
        40: ["RO"],
        41: ["CH"],
        43: ["AT"],
        44: ["GB", "GG", "IM", "JE"],
        45: ["DK"],
        46: ["SE"],
        47: ["NO", "SJ"],
        48: ["PL"],
        49: ["DE"],
        51: ["PE"],
        52: ["MX"],
        53: ["CU"],
        54: ["AR"],
        55: ["BR"],
        56: ["CL"],
        57: ["CO"],
        58: ["VE"],
        60: ["MY"],
        61: ["AU", "CC", "CX"],
        62: ["ID"],
        63: ["PH"],
        64: ["NZ"],
        65: ["SG"],
        66: ["TH"],
        81: ["JP"],
        82: ["KR"],
        84: ["VN"],
        86: ["CN"],
        90: ["TR"],
        91: ["IN"],
        92: ["PK"],
        93: ["AF"],
        94: ["LK"],
        95: ["MM"],
        98: ["IR"],
        211: ["SS"],
        212: ["MA", "EH"],
        213: ["DZ"],
        216: ["TN"],
        218: ["LY"],
        220: ["GM"],
        221: ["SN"],
        222: ["MR"],
        223: ["ML"],
        224: ["GN"],
        225: ["CI"],
        226: ["BF"],
        227: ["NE"],
        228: ["TG"],
        229: ["BJ"],
        230: ["MU"],
        231: ["LR"],
        232: ["SL"],
        233: ["GH"],
        234: ["NG"],
        235: ["TD"],
        236: ["CF"],
        237: ["CM"],
        238: ["CV"],
        239: ["ST"],
        240: ["GQ"],
        241: ["GA"],
        242: ["CG"],
        243: ["CD"],
        244: ["AO"],
        245: ["GW"],
        246: ["IO"],
        247: ["AC"],
        248: ["SC"],
        249: ["SD"],
        250: ["RW"],
        251: ["ET"],
        252: ["SO"],
        253: ["DJ"],
        254: ["KE"],
        255: ["TZ"],
        256: ["UG"],
        257: ["BI"],
        258: ["MZ"],
        260: ["ZM"],
        261: ["MG"],
        262: ["RE", "YT"],
        263: ["ZW"],
        264: ["NA"],
        265: ["MW"],
        266: ["LS"],
        267: ["BW"],
        268: ["SZ"],
        269: ["KM"],
        290: ["SH", "TA"],
        291: ["ER"],
        297: ["AW"],
        298: ["FO"],
        299: ["GL"],
        350: ["GI"],
        351: ["PT"],
        352: ["LU"],
        353: ["IE"],
        354: ["IS"],
        355: ["AL"],
        356: ["MT"],
        357: ["CY"],
        358: ["FI", "AX"],
        359: ["BG"],
        370: ["LT"],
        371: ["LV"],
        372: ["EE"],
        373: ["MD"],
        374: ["AM"],
        375: ["BY"],
        376: ["AD"],
        377: ["MC"],
        378: ["SM"],
        380: ["UA"],
        381: ["RS"],
        382: ["ME"],
        385: ["HR"],
        386: ["SI"],
        387: ["BA"],
        389: ["MK"],
        420: ["CZ"],
        421: ["SK"],
        423: ["LI"],
        500: ["FK"],
        501: ["BZ"],
        502: ["GT"],
        503: ["SV"],
        504: ["HN"],
        505: ["NI"],
        506: ["CR"],
        507: ["PA"],
        508: ["PM"],
        509: ["HT"],
        590: ["GP", "BL", "MF"],
        591: ["BO"],
        592: ["GY"],
        593: ["EC"],
        594: ["GF"],
        595: ["PY"],
        596: ["MQ"],
        597: ["SR"],
        598: ["UY"],
        599: ["CW", "BQ"],
        670: ["TL"],
        672: ["NF"],
        673: ["BN"],
        674: ["NR"],
        675: ["PG"],
        676: ["TO"],
        677: ["SB"],
        678: ["VU"],
        679: ["FJ"],
        680: ["PW"],
        681: ["WF"],
        682: ["CK"],
        683: ["NU"],
        685: ["WS"],
        686: ["KI"],
        687: ["NC"],
        688: ["TV"],
        689: ["PF"],
        690: ["TK"],
        691: ["FM"],
        692: ["MH"],
        800: ["001"],
        808: ["001"],
        850: ["KP"],
        852: ["HK"],
        853: ["MO"],
        855: ["KH"],
        856: ["LA"],
        870: ["001"],
        878: ["001"],
        880: ["BD"],
        881: ["001"],
        882: ["001"],
        883: ["001"],
        886: ["TW"],
        888: ["001"],
        960: ["MV"],
        961: ["LB"],
        962: ["JO"],
        963: ["SY"],
        964: ["IQ"],
        965: ["KW"],
        966: ["SA"],
        967: ["YE"],
        968: ["OM"],
        970: ["PS"],
        971: ["AE"],
        972: ["IL"],
        973: ["BH"],
        974: ["QA"],
        975: ["BT"],
        976: ["MN"],
        977: ["NP"],
        979: ["001"],
        992: ["TJ"],
        993: ["TM"],
        994: ["AZ"],
        995: ["GE"],
        996: ["KG"],
        998: ["UZ"]
    }, yt = {
        AC: [, [, , "[46]\\d{4}|[01589]\\d{5}", "\\d{5,6}"],
            [, , "6[2-467]\\d{3}", "\\d{5}", , , "62889"],
            [, , "4\\d{4}", "\\d{5}", , , "40123"],
            [, , "NA", "NA"],
            [, , "NA", "NA"],
            [, , "NA", "NA"],
            [, , "NA", "NA"],
            [, , "NA", "NA"], "AC", 247, "00", , , , , , , , , , [, , "NA", "NA"], , , [, , "NA", "NA"],
            [, , "[01589]\\d{5}", "\\d{6}", , , "542011"], , , [, , "NA", "NA"]
        ],
        AD: [, [, , "(?:[346-9]|180)\\d{5}", "\\d{6,8}"],
            [, , "[78]\\d{5}", "\\d{6}", , , "712345"],
            [, , "[346]\\d{5}", "\\d{6}", , , "312345"],
            [, , "180[02]\\d{4}", "\\d{8}", , , "18001234"],
            [, , "9\\d{5}", "\\d{6}", , , "912345"],
            [, , "NA", "NA"],
            [, , "NA", "NA"],
            [, , "NA", "NA"], "AD", 376, "00", , , , , , , , [
                [, "(\\d{3})(\\d{3})", "$1 $2", ["[346-9]"]],
                [, "(180[02])(\\d{4})", "$1 $2", ["1"]]
            ], , [, , "NA", "NA"], , , [, , "NA", "NA"],
            [, , "NA", "NA"], , , [, , "NA", "NA"]
        ],
        AE: [, [, , "[2-79]\\d{7,8}|800\\d{2,9}", "\\d{5,12}"],
            [, , "[2-4679][2-8]\\d{6}", "\\d{7,8}", , , "22345678"],
            [, , "5[0256]\\d{7}", "\\d{9}", , , "501234567"],
            [, , "400\\d{6}|800\\d{2,9}", "\\d{5,12}", , , "800123456"],
            [, , "900[02]\\d{5}", "\\d{9}", , , "900234567"],
            [, , "700[05]\\d{5}", "\\d{9}", , , "700012345"],
            [, , "NA", "NA"],
            [, , "NA", "NA"], "AE", 971, "00", "0", , , "0", , , , [
                [, "([2-4679])(\\d{3})(\\d{4})", "$1 $2 $3", ["[2-4679][2-8]"], "0$1"],
                [, "(5[0256])(\\d{3})(\\d{4})", "$1 $2 $3", ["5"], "0$1"],
                [, "([479]00)(\\d)(\\d{5})", "$1 $2 $3", ["[479]0"], "$1"],
                [, "([68]00)(\\d{2,9})", "$1 $2", ["60|8"], "$1"]
            ], , [, , "NA", "NA"], , , [, , "NA", "NA"],
            [, , "600[25]\\d{5}", "\\d{9}", , , "600212345"], , , [, , "NA", "NA"]
        ],
        AF: [, [, , "[2-7]\\d{8}", "\\d{7,9}"],
            [, , "(?:[25][0-8]|[34][0-4]|6[0-5])[2-9]\\d{6}", "\\d{7,9}", , , "234567890"],
            [, , "7(?:[014-9]\\d{7}|2[89]\\d{6})", "\\d{9}", , , "701234567"],
            [, , "NA", "NA"],
            [, , "NA", "NA"],
            [, , "NA", "NA"],
            [, , "NA", "NA"],
            [, , "NA", "NA"], "AF", 93, "00", "0", , , "0", , , , [
                [, "([2-7]\\d)(\\d{3})(\\d{4})", "$1 $2 $3", ["[2-7]"], "0$1"]
            ], , [, , "NA", "NA"], , , [, , "NA", "NA"],
            [, , "NA", "NA"], , , [, , "NA", "NA"]
        ],
        AG: [, [, , "[2589]\\d{9}", "\\d{7}(?:\\d{3})?"],
            [, , "268(?:4(?:6[0-38]|84)|56[0-2])\\d{4}", "\\d{7}(?:\\d{3})?", , , "2684601234"],
            [, , "268(?:464|7(?:2[0-9]|64|7[0-689]|8[02-68]))\\d{4}", "\\d{10}", , , "2684641234"],
            [, , "8(?:00|44|55|66|77|88)[2-9]\\d{6}", "\\d{10}", , , "8002123456"],
            [, , "900[2-9]\\d{6}", "\\d{10}", , , "9002123456"],
            [, , "NA", "NA"],
            [, , "5(?:00|33|44|66|77)[2-9]\\d{6}", "\\d{10}", , , "5002345678"],
            [, , "26848[01]\\d{4}", "\\d{10}", , , "2684801234"], "AG", 1, "011", "1", , , "1", , , , , , [, , "26840[69]\\d{4}", "\\d{10}", , , "2684061234"], , "268", [, , "NA", "NA"],
            [, , "NA", "NA"], , , [, , "NA", "NA"]
        ],
        AI: [, [, , "[2589]\\d{9}", "\\d{7}(?:\\d{3})?"],
            [, , "2644(?:6[12]|9[78])\\d{4}", "\\d{7}(?:\\d{3})?", , , "2644612345"],
            [, , "264(?:235|476|5(?:3[6-9]|8[1-4])|7(?:29|72))\\d{4}", "\\d{10}", , , "2642351234"],
            [, , "8(?:00|44|55|66|77|88)[2-9]\\d{6}", "\\d{10}", , , "8002123456"],
            [, , "900[2-9]\\d{6}", "\\d{10}", , , "9002123456"],
            [, , "NA", "NA"],
            [, , "5(?:00|33|44|66|77)[2-9]\\d{6}", "\\d{10}", , , "5002345678"],
            [, , "NA", "NA"], "AI", 1, "011", "1", , , "1", , , , , , [, , "NA", "NA"], , "264", [, , "NA", "NA"],
            [, , "NA", "NA"], , , [, , "NA", "NA"]
        ],
        AL: [, [, , "[2-57]\\d{7}|6\\d{8}|8\\d{5,7}|9\\d{5}", "\\d{5,9}"],
            [, , "(?:2(?:[168][1-9]|[247]\\d|9[1-7])|3(?:1[1-3]|[2-6]\\d|[79][1-8]|8[1-9])|4\\d{2}|5(?:1[1-4]|[2-578]\\d|6[1-5]|9[1-7])|8(?:[19][1-5]|[2-6]\\d|[78][1-7]))\\d{5}", "\\d{5,8}", , , "22345678"],
            [, , "6[6-9]\\d{7}", "\\d{9}", , , "661234567"],
            [, , "800\\d{4}", "\\d{7}", , , "8001234"],
            [, , "900\\d{3}", "\\d{6}", , , "900123"],
            [, , "808\\d{3}", "\\d{6}", , , "808123"],
            [, , "700\\d{5}", "\\d{8}", , , "70012345"],
            [, , "NA", "NA"], "AL", 355, "00", "0", , , "0", , , , [
                [, "(4)(\\d{3})(\\d{4})", "$1 $2 $3", ["4[0-6]"], "0$1"],
                [, "(6[6-9])(\\d{3})(\\d{4})", "$1 $2 $3", ["6"], "0$1"],
                [, "(\\d{2})(\\d{3})(\\d{3})", "$1 $2 $3", ["[2358][2-5]|4[7-9]"], "0$1"],
                [, "(\\d{3})(\\d{3,5})", "$1 $2", ["[235][16-9]|8[016-9]|[79]"], "0$1"]
            ], , [, , "NA", "NA"], , , [, , "NA", "NA"],
            [, , "NA", "NA"], , , [, , "NA", "NA"]
        ],
        AM: [, [, , "[1-9]\\d{7}", "\\d{5,8}"],
            [, , "(?:1[01]\\d|2(?:2[2-46]|3[1-8]|4[2-69]|5[2-7]|6[1-9]|8[1-7])|3[12]2|47\\d)\\d{5}", "\\d{5,8}", , , "10123456"],
            [, , "(?:4[139]|55|77|9[1-9])\\d{6}", "\\d{8}", , , "77123456"],
            [, , "800\\d{5}", "\\d{8}", , , "80012345"],
            [, , "90[016]\\d{5}", "\\d{8}", , , "90012345"],
            [, , "80[1-4]\\d{5}", "\\d{8}", , , "80112345"],
            [, , "NA", "NA"],
            [, , "60[2-6]\\d{5}", "\\d{8}", , , "60271234"], "AM", 374, "00", "0", , , "0", , , , [
                [, "(\\d{2})(\\d{6})", "$1 $2", ["1|47"], "(0$1)"],
                [, "(\\d{2})(\\d{6})", "$1 $2", ["4[139]|[5-7]|9[1-9]"], "0$1"],
                [, "(\\d{3})(\\d{5})", "$1 $2", ["[23]"], "(0$1)"],
                [, "(\\d{3})(\\d{2})(\\d{3})", "$1 $2 $3", ["8|90"], "0 $1"]
            ], , [, , "NA", "NA"], , , [, , "NA", "NA"],
            [, , "NA", "NA"], , , [, , "NA", "NA"]
        ],
        AO: [, [, , "[29]\\d{8}", "\\d{9}"],
            [, , "2\\d(?:[26-9]\\d|\\d[26-9])\\d{5}", "\\d{9}", , , "222123456"],
            [, , "9[1-49]\\d{7}", "\\d{9}", , , "923123456"],
            [, , "NA", "NA"],
            [, , "NA", "NA"],
            [, , "NA", "NA"],
            [, , "NA", "NA"],
            [, , "NA", "NA"], "AO", 244, "00", , , , , , , , [
                [, "(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3"]
            ], , [, , "NA", "NA"], , , [, , "NA", "NA"],
            [, , "NA", "NA"], , , [, , "NA", "NA"]
        ],
        AR: [, [, , "11\\d{8}|[2368]\\d{9}|9\\d{10}", "\\d{6,11}"],
            [, , "11\\d{8}|(?:2(?:2(?:[013]\\d|2[13-79]|4[1-6]|5[2457]|6[124-8]|7[1-4]|8[13-6]|9[1267])|3(?:1[467]|2[03-6]|3[13-8]|[49][2-6]|5[2-8]|[067]\\d)|4(?:7[3-8]|9\\d)|6(?:[01346]\\d|2[24-6]|5[15-8])|80\\d|9(?:[0124789]\\d|3[1-6]|5[234]|6[2-46]))|3(?:3(?:2[79]|6\\d|8[2578])|4(?:[78]\\d|0[0124-9]|[1-35]\\d|4[24-7]|6[02-9]|9[123678])|5(?:[138]\\d|2[1245]|4[1-9]|6[2-4]|7[1-6])|6[24]\\d|7(?:[0469]\\d|1[1568]|2[013-9]|3[145]|5[14-8]|7[2-57]|8[0-24-9])|8(?:[013578]\\d|2[15-7]|4[13-6]|6[1-357-9]|9[124]))|670\\d)\\d{6}", "\\d{6,10}", , , "1123456789"],
            [, , "675\\d{7}|9(?:11[2-9]\\d{7}|(?:2(?:2[013]|3[067]|49|6[01346]|80|9[147-9])|3(?:36|4[12358]|5[138]|6[24]|7[069]|8[013578]))[2-9]\\d{6}|\\d{4}[2-9]\\d{5})", "\\d{6,11}", , , "91123456789"],
            [, , "800\\d{7}", "\\d{10}", , , "8001234567"],
            [, , "60[04579]\\d{7}", "\\d{10}", , , "6001234567"],
            [, , "NA", "NA"],
            [, , "NA", "NA"],
            [, , "NA", "NA"], "AR", 54, "00", "0", , , "0?(?:(11|2(?:2(?:02?|[13]|2[13-79]|4[1-6]|5[2457]|6[124-8]|7[1-4]|8[13-6]|9[1267])|3(?:02?|1[467]|2[03-6]|3[13-8]|[49][2-6]|5[2-8]|[67])|4(?:7[3-578]|9)|6(?:[0136]|2[24-6]|4[6-8]?|5[15-8])|80|9(?:0[1-3]|[19]|2\\d|3[1-6]|4[02568]?|5[2-4]|6[2-46]|72?|8[23]?))|3(?:3(?:2[79]|6|8[2578])|4(?:0[0-24-9]|[12]|3[5-8]?|4[24-7]|5[4-68]?|6[02-9]|7[126]|8[2379]?|9[1-36-8])|5(?:1|2[1245]|3[237]?|4[1-46-9]|6[2-4]|7[1-6]|8[2-5]?)|6[24]|7(?:[069]|1[1568]|2[15]|3[145]|4[13]|5[14-8]|7[2-57]|8[126])|8(?:[01]|2[15-7]|3[2578]?|4[13-6]|5[4-8]?|6[1-357-9]|7[36-8]?|8[5-8]?|9[124])))?15)?", "9$1", , , [
                [, "([68]\\d{2})(\\d{3})(\\d{4})", "$1-$2-$3", ["[68]"], "0$1"],
                [, "(\\d{2})(\\d{4})", "$1-$2", ["[2-9]"], "$1"],
                [, "(\\d{3})(\\d{4})", "$1-$2", ["[2-9]"], "$1"],
                [, "(\\d{4})(\\d{4})", "$1-$2", ["[2-9]"], "$1"],
                [, "(9)(11)(\\d{4})(\\d{4})", "$2 15-$3-$4", ["911"], "0$1"],
                [, "(9)(\\d{3})(\\d{3})(\\d{4})", "$2 15-$3-$4", ["9(?:2[234689]|3[3-8])", "9(?:2(?:2[013]|3[067]|49|6[01346]|80|9[147-9])|3(?:36|4[1-358]|5[138]|6[24]|7[069]|8[013578]))", "9(?:2(?:2(?:0[013-9]|[13])|3(?:0[013-9]|[67])|49|6(?:[0136]|4[0-59])|8|9(?:[19]|44|7[013-9]|8[14]))|3(?:36|4(?:[12]|3[456]|[58]4)|5(?:1|3[0-24-689]|8[46])|6|7[069]|8(?:[01]|34|[578][45])))", "9(?:2(?:2(?:0[013-9]|[13])|3(?:0[013-9]|[67])|49|6(?:[0136]|4[0-59])|8|9(?:[19]|44|7[013-9]|8[14]))|3(?:36|4(?:[12]|3(?:4|5[014]|6[1239])|[58]4)|5(?:1|3[0-24-689]|8[46])|6|7[069]|8(?:[01]|34|[578][45])))"], "0$1"],
                [, "(9)(\\d{4})(\\d{2})(\\d{4})", "$2 15-$3-$4", ["9[23]"], "0$1"],
                [, "(11)(\\d{4})(\\d{4})", "$1 $2-$3", ["1"], "0$1", , 1],
                [, "(\\d{3})(\\d{3})(\\d{4})", "$1 $2-$3", ["2(?:2[013]|3[067]|49|6[01346]|80|9[147-9])|3(?:36|4[1-358]|5[138]|6[24]|7[069]|8[013578])", "2(?:2(?:0[013-9]|[13])|3(?:0[013-9]|[67])|49|6(?:[0136]|4[0-59])|8|9(?:[19]|44|7[013-9]|8[14]))|3(?:36|4(?:[12]|3[456]|[58]4)|5(?:1|3[0-24-689]|8[46])|6|7[069]|8(?:[01]|34|[578][45]))", "2(?:2(?:0[013-9]|[13])|3(?:0[013-9]|[67])|49|6(?:[0136]|4[0-59])|8|9(?:[19]|44|7[013-9]|8[14]))|3(?:36|4(?:[12]|3(?:4|5[014]|6[1239])|[58]4)|5(?:1|3[0-24-689]|8[46])|6|7[069]|8(?:[01]|34|[578][45]))"], "0$1", , 1],
                [, "(\\d{4})(\\d{2})(\\d{4})", "$1 $2-$3", ["[23]"], "0$1", , 1],
                [, "(\\d{3})", "$1", ["1[012]|911"], "$1"]
            ],
            [
                [, "([68]\\d{2})(\\d{3})(\\d{4})", "$1-$2-$3", ["[68]"], "0$1"],
                [, "(9)(11)(\\d{4})(\\d{4})", "$1 $2 $3-$4", ["911"]],
                [, "(9)(\\d{3})(\\d{3})(\\d{4})", "$1 $2 $3-$4", ["9(?:2[234689]|3[3-8])", "9(?:2(?:2[013]|3[067]|49|6[01346]|80|9[147-9])|3(?:36|4[1-358]|5[138]|6[24]|7[069]|8[013578]))", "9(?:2(?:2(?:0[013-9]|[13])|3(?:0[013-9]|[67])|49|6(?:[0136]|4[0-59])|8|9(?:[19]|44|7[013-9]|8[14]))|3(?:36|4(?:[12]|3[456]|[58]4)|5(?:1|3[0-24-689]|8[46])|6|7[069]|8(?:[01]|34|[578][45])))", "9(?:2(?:2(?:0[013-9]|[13])|3(?:0[013-9]|[67])|49|6(?:[0136]|4[0-59])|8|9(?:[19]|44|7[013-9]|8[14]))|3(?:36|4(?:[12]|3(?:4|5[014]|6[1239])|[58]4)|5(?:1|3[0-24-689]|8[46])|6|7[069]|8(?:[01]|34|[578][45])))"]],
                [, "(9)(\\d{4})(\\d{2})(\\d{4})", "$1 $2 $3-$4", ["9[23]"]],
                [, "(11)(\\d{4})(\\d{4})", "$1 $2-$3", ["1"], "0$1", , 1],
                [, "(\\d{3})(\\d{3})(\\d{4})", "$1 $2-$3", ["2(?:2[013]|3[067]|49|6[01346]|80|9[147-9])|3(?:36|4[1-358]|5[138]|6[24]|7[069]|8[013578])", "2(?:2(?:0[013-9]|[13])|3(?:0[013-9]|[67])|49|6(?:[0136]|4[0-59])|8|9(?:[19]|44|7[013-9]|8[14]))|3(?:36|4(?:[12]|3[456]|[58]4)|5(?:1|3[0-24-689]|8[46])|6|7[069]|8(?:[01]|34|[578][45]))", "2(?:2(?:0[013-9]|[13])|3(?:0[013-9]|[67])|49|6(?:[0136]|4[0-59])|8|9(?:[19]|44|7[013-9]|8[14]))|3(?:36|4(?:[12]|3(?:4|5[014]|6[1239])|[58]4)|5(?:1|3[0-24-689]|8[46])|6|7[069]|8(?:[01]|34|[578][45]))"], "0$1", , 1],
                [, "(\\d{4})(\\d{2})(\\d{4})", "$1 $2-$3", ["[23]"], "0$1", , 1]
            ],
            [, , "NA", "NA"], , , [, , "810\\d{7}", "\\d{10}", , , "8101234567"],
            [, , "810\\d{7}", "\\d{10}", , , "8101234567"], , , [, , "NA", "NA"]
        ],
        AS: [, [, , "[5689]\\d{9}", "\\d{7}(?:\\d{3})?"],
            [, , "6846(?:22|33|44|55|77|88|9[19])\\d{4}", "\\d{7}(?:\\d{3})?", , , "6846221234"],
            [, , "684(?:2(?:5[2468]|72)|7(?:3[13]|70))\\d{4}", "\\d{10}", , , "6847331234"],
            [, , "8(?:00|44|55|66|77|88)[2-9]\\d{6}", "\\d{10}", , , "8002123456"],
            [, , "900[2-9]\\d{6}", "\\d{10}", , , "9002123456"],
            [, , "NA", "NA"],
            [, , "5(?:00|33|44|66|77)[2-9]\\d{6}", "\\d{10}", , , "5002345678"],
            [, , "NA", "NA"], "AS", 1, "011", "1", , , "1", , , , , , [, , "NA", "NA"], , "684", [, , "NA", "NA"],
            [, , "NA", "NA"], , , [, , "NA", "NA"]
        ],
        AT: [, [, , "[1-9]\\d{3,12}", "\\d{3,13}"],
            [, , "1\\d{3,12}|(?:2(?:1[467]|2[13-8]|5[2357]|6[1-46-8]|7[1-8]|8[124-7]|9[1458])|3(?:1[1-8]|3[23568]|4[5-7]|5[1378]|6[1-38]|8[3-68])|4(?:2[1-8]|35|63|7[1368]|8[2457])|5(?:12|2[1-8]|3[357]|4[147]|5[12578]|6[37])|6(?:13|2[1-47]|4[1-35-8]|5[468]|62)|7(?:2[1-8]|3[25]|4[13478]|5[68]|6[16-8]|7[1-6]|9[45]))\\d{3,10}", "\\d{3,13}", , , "1234567890"],
            [, , "6(?:5[0-3579]|6[013-9]|[7-9]\\d)\\d{4,10}", "\\d{7,13}", , , "664123456"],
            [, , "800\\d{6,10}", "\\d{9,13}", , , "800123456"],
            [, , "(?:9(?:0[01]|3[019]))\\d{6,10}", "\\d{9,13}", , , "900123456"],
            [, , "8(?:10\\d|2(?:[01]\\d|8\\d?))\\d{5,9}", "\\d{8,13}", , , "810123456"],
            [, , "NA", "NA"],
            [, , "780\\d{6,10}", "\\d{9,13}", , , "780123456"], "AT", 43, "00", "0", , , "0", , , , [
                [, "(116\\d{3})", "$1", ["116"], "$1"],
                [, "(1)(\\d{3,12})", "$1 $2", ["1"], "0$1"],
                [, "(5\\d)(\\d{3,5})", "$1 $2", ["5[079]"], "0$1"],
                [, "(5\\d)(\\d{3})(\\d{3,4})", "$1 $2 $3", ["5[079]"], "0$1"],
                [, "(5\\d)(\\d{4})(\\d{4,7})", "$1 $2 $3", ["5[079]"], "0$1"],
                [, "(\\d{3})(\\d{3,10})", "$1 $2", ["316|46|51|732|6(?:5[0-3579]|[6-9])|7(?:[28]0)|[89]"], "0$1"],
                [, "(\\d{4})(\\d{3,9})", "$1 $2", ["2|3(?:1[1-578]|[3-8])|4[2378]|5[2-6]|6(?:[12]|4[1-9]|5[468])|7(?:2[1-8]|35|4[1-8]|[5-79])"], "0$1"]
            ], , [, , "NA", "NA"], , , [, , "NA", "NA"],
            [, , "5(?:(?:0[1-9]|17)\\d{2,10}|[79]\\d{3,11})|720\\d{6,10}", "\\d{5,13}", , , "50123"], , , [, , "NA", "NA"]
        ],
        AU: [, [, , "[1-578]\\d{5,9}", "\\d{6,10}"],
            [, , "[237]\\d{8}|8(?:[68]\\d{3}|7[0-69]\\d{2}|9(?:[02-9]\\d{2}|1(?:[0-57-9]\\d|6[0135-9])))\\d{4}", "\\d{8,9}", , , "212345678"],
            [, , "14(?:5\\d|71)\\d{5}|4(?:[0-2]\\d|3[0-57-9]|4[47-9]|5[0-25-9]|6[6-9]|7[03-9]|8[147-9]|9[017-9])\\d{6}", "\\d{9}", , , "412345678"],
            [, , "180(?:0\\d{3}|2)\\d{3}", "\\d{7,10}", , , "1800123456"],
            [, , "190[0126]\\d{6}", "\\d{10}", , , "1900123456"],
            [, , "13(?:00\\d{2})?\\d{4}", "\\d{6,10}", , , "1300123456"],
            [, , "500\\d{6}", "\\d{9}", , , "500123456"],
            [, , "550\\d{6}", "\\d{9}", , , "550123456"], "AU", 61, "(?:14(?:1[14]|34|4[17]|[56]6|7[47]|88))?001[14-689]", "0", , , "0", , "0011", , [
                [, "([2378])(\\d{4})(\\d{4})", "$1 $2 $3", ["[2378]"], "(0$1)"],
                [, "(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["[45]|14"], "0$1"],
                [, "(16)(\\d{3})(\\d{2,4})", "$1 $2 $3", ["16"], "0$1"],
                [, "(1[389]\\d{2})(\\d{3})(\\d{3})", "$1 $2 $3", ["1(?:[38]0|90)", "1(?:[38]00|90)"], "$1"],
                [, "(180)(2\\d{3})", "$1 $2", ["180", "1802"], "$1"],
                [, "(19\\d)(\\d{3})", "$1 $2", ["19[13]"], "$1"],
                [, "(19\\d{2})(\\d{4})", "$1 $2", ["19[67]"], "$1"],
                [, "(13)(\\d{2})(\\d{2})", "$1 $2 $3", ["13[1-9]"], "$1"]
            ], , [, , "16\\d{3,7}", "\\d{5,9}", , , "1612345"], 1, , [, , "1(?:3(?:\\d{4}|00\\d{6})|80(?:0\\d{6}|2\\d{3}))", "\\d{6,10}", , , "1300123456"],
            [, , "NA", "NA"], , , [, , "NA", "NA"]
        ],
        AW: [, [, , "[25-9]\\d{6}", "\\d{7}"],
            [, , "5(?:2\\d|8[1-9])\\d{4}", "\\d{7}", , , "5212345"],
            [, , "(?:5(?:6\\d|9[2-478])|6(?:[039]0|22|4[01]|6[0-2])|7[34]\\d|9(?:6[45]|9[4-8]))\\d{4}", "\\d{7}", , , "5601234"],
            [, , "800\\d{4}", "\\d{7}", , , "8001234"],
            [, , "900\\d{4}", "\\d{7}", , , "9001234"],
            [, , "NA", "NA"],
            [, , "NA", "NA"],
            [, , "28\\d{5}|501\\d{4}", "\\d{7}", , , "5011234"], "AW", 297, "00", , , , , , , , [
                [, "(\\d{3})(\\d{4})", "$1 $2"]
            ], , [, , "NA", "NA"], , , [, , "NA", "NA"],
            [, , "NA", "NA"], , , [, , "NA", "NA"]
        ],
        AX: [, [, , "[135]\\d{5,9}|[27]\\d{4,9}|4\\d{5,10}|6\\d{7,8}|8\\d{6,9}", "\\d{5,12}"],
            [, , "18[1-8]\\d{3,9}", "\\d{6,12}", , , "1812345678"],
            [, , "4\\d{5,10}|50\\d{4,8}", "\\d{6,11}", , , "412345678"],
            [, , "800\\d{4,7}", "\\d{7,10}", , , "8001234567"],
            [, , "[67]00\\d{5,6}", "\\d{8,9}", , , "600123456"],
            [, , "NA", "NA"],
            [, , "NA", "NA"],
            [, , "NA", "NA"], "AX", 358, "00|99[049]", "0", , , "0", , , , , , [, , "NA", "NA"], , , [, , "[13]00\\d{3,7}|2(?:0(?:0\\d{3,7}|2[023]\\d{1,6}|9[89]\\d{1,6}))|60(?:[12]\\d{5,6}|6\\d{7})|7(?:1\\d{7}|3\\d{8}|5[03-9]\\d{2,7})", "\\d{5,10}", , , "100123"],
            [, , "[13]0\\d{4,8}|2(?:0(?:[016-8]\\d{3,7}|[2-59]\\d{2,7})|9\\d{4,8})|60(?:[12]\\d{5,6}|6\\d{7})|7(?:1\\d{7}|3\\d{8}|5[03-9]\\d{2,7})", "\\d{5,10}", , , "10112345"], , , [, , "NA", "NA"]
        ],
        AZ: [, [, , "[1-9]\\d{8}", "\\d{7,9}"],
            [, , "(?:1[28]\\d|2(?:02|1[24]|2[2-4]|33|[45]2|6[23])|365)\\d{6}", "\\d{7,9}", , , "123123456"],
            [, , "(?:4[04]|5[015]|60|7[07])\\d{7}", "\\d{9}", , , "401234567"],
            [, , "88\\d{7}", "\\d{9}", , , "881234567"],
            [, , "900200\\d{3}", "\\d{9}", , , "900200123"],
            [, , "NA", "NA"],
            [, , "NA", "NA"],
            [, , "NA", "NA"], "AZ", 994, "00", "0", , , "0", , , , [
                [, "(\\d{2})(\\d{3})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["(?:1[28]|2(?:[45]2|[0-36])|365)"], "(0$1)"],
                [, "(\\d{2})(\\d{3})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[4-8]"], "0$1"],
                [, "(\\d{3})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["9"], "0$1"]
            ], , [, , "NA", "NA"], , , [, , "NA", "NA"],
            [, , "NA", "NA"], , , [, , "NA", "NA"]
        ],
        BA: [, [, , "[3-9]\\d{7,8}", "\\d{6,9}"],
            [, , "(?:[35]\\d|49)\\d{6}", "\\d{6,8}", , , "30123456"],
            [, , "6(?:03|44|71|[1-356])\\d{6}", "\\d{8,9}", , , "61123456"],
            [, , "8[08]\\d{6}", "\\d{8}", , , "80123456"],
            [, , "9[0246]\\d{6}", "\\d{8}", , , "90123456"],
            [, , "8[12]\\d{6}", "\\d{8}", , , "82123456"],
            [, , "NA", "NA"],
            [, , "NA", "NA"], "BA", 387, "00", "0", , , "0", , , , [
                [, "(\\d{2})(\\d{3})(\\d{3})", "$1 $2-$3", ["[3-5]"], "0$1"],
                [, "(\\d{2})(\\d{3})(\\d{3})", "$1 $2 $3", ["6[1-356]|[7-9]"], "0$1"],
                [, "(\\d{2})(\\d{2})(\\d{2})(\\d{3})", "$1 $2 $3 $4", ["6[047]"], "0$1"]
            ], , [, , "NA", "NA"], , , [, , "NA", "NA"],
            [, , "70[23]\\d{5}", "\\d{8}", , , "70223456"], , , [, , "NA", "NA"]
        ],
        BB: [, [, , "[2589]\\d{9}", "\\d{7}(?:\\d{3})?"],
            [, , "246(?:2(?:2[78]|7[0-4])|4(?:1[024-6]|2\\d|3[2-9])|5(?:20|[34]\\d|54|7[1-3])|6(?:2\\d|38)|7(?:37|57)|9(?:1[89]|63))\\d{4}", "\\d{7}(?:\\d{3})?", , , "2464123456"],
            [, , "246(?:2(?:[356]\\d|4[0-57-9]|8[0-79])|45\\d|8(?:[2-5]\\d|83))\\d{4}", "\\d{10}", , , "2462501234"],
            [, , "8(?:00|44|55|66|77|88)[2-9]\\d{6}", "\\d{10}", , , "8002123456"],
            [, , "900\\d{7}|246976\\d{4}", "\\d{10}", , , "9002123456"],
            [, , "NA", "NA"],
            [, , "5(?:00|33|44|66|77)[2-9]\\d{3}", "\\d{10}", , , "5002345678"],
            [, , "24631\\d{5}", "\\d{10}", , , "2463101234"], "BB", 1, "011", "1", , , "1", , , , , , [, , "NA", "NA"], , "246", [, , "NA", "NA"],
            [, , "246(?:292|41[7-9]|43[01])\\d{4}", "\\d{10}", , , "2464301234"], , , [, , "NA", "NA"]
        ],
        BD: [, [, , "[2-79]\\d{5,9}|1\\d{9}|8[0-7]\\d{4,8}", "\\d{6,10}"],
            [, , "2(?:550\\d|7(?:1[0-267]|2[0-289]|3[0-29]|[46][01]|5[1-3]|7[017]|91)|8(?:0[125]|[139][1-6]|2[0157-9]|6[1-35]|7[1-5]|8[1-8]|90)|9(?:0[0-2]|1[0-4]|2[568]|3[3-6]|5[5-7]|6[0167]|7[15]|8[0146-8]))\\d{4}|3(?:12?[5-7]\\d{2}|0(?:2(?:[025-79]\\d|[348]\\d{1,2})|3(?:[2-4]\\d|[56]\\d?))|2(?:1\\d{2}|2(?:[12]\\d|[35]\\d{1,2}|4\\d?))|3(?:1\\d{2}|2(?:[2356]\\d|4\\d{1,2}))|4(?:1\\d{2}|2(?:2\\d{1,2}|[47]|5\\d{2}))|5(?:1\\d{2}|29)|[67]1\\d{2}|8(?:1\\d{2}|2(?:2\\d{2}|3|4\\d)))\\d{3}|4(?:0(?:2(?:[09]\\d|7)|33\\d{2})|1\\d{3}|2(?:1\\d{2}|2(?:[25]\\d?|[348]\\d|[67]\\d{1,2}))|3(?:1\\d{2}(?:\\d{2})?|2(?:[045]\\d|[236-9]\\d{1,2})|32\\d{2})|4(?:[18]\\d{2}|2(?:[2-46]\\d{2}|3)|5[25]\\d{2})|5(?:1\\d{2}|2(?:3\\d|5))|6(?:[18]\\d{2}|2(?:3(?:\\d{2})?|[46]\\d{1,2}|5\\d{2}|7\\d)|5(?:3\\d?|4\\d|[57]\\d{1,2}|6\\d{2}|8))|71\\d{2}|8(?:[18]\\d{2}|23\\d{2}|54\\d{2})|9(?:[18]\\d{2}|2[2-5]\\d{2}|53\\d{1,2}))\\d{3}|5(?:02[03489]\\d{2}|1\\d{2}|2(?:1\\d{2}|2(?:2(?:\\d{2})?|[457]\\d{2}))|3(?:1\\d{2}|2(?:[37](?:\\d{2})?|[569]\\d{2}))|4(?:1\\d{2}|2[46]\\d{2})|5(?:1\\d{2}|26\\d{1,2})|6(?:[18]\\d{2}|2|53\\d{2})|7(?:1|24)\\d{2}|8(?:1|26)\\d{2}|91\\d{2})\\d{3}|6(?:0(?:1\\d{2}|2(?:3\\d{2}|4\\d{1,2}))|2(?:2[2-5]\\d{2}|5(?:[3-5]\\d{2}|7)|8\\d{2})|3(?:1|2[3478])\\d{2}|4(?:1|2[34])\\d{2}|5(?:1|2[47])\\d{2}|6(?:[18]\\d{2}|6(?:2(?:2\\d|[34]\\d{2})|5(?:[24]\\d{2}|3\\d|5\\d{1,2})))|72[2-5]\\d{2}|8(?:1\\d{2}|2[2-5]\\d{2})|9(?:1\\d{2}|2[2-6]\\d{2}))\\d{3}|7(?:(?:02|[3-589]1|6[12]|72[24])\\d{2}|21\\d{3}|32)\\d{3}|8(?:(?:4[12]|[5-7]2|1\\d?)|(?:0|3[12]|[5-7]1|217)\\d)\\d{4}|9(?:[35]1|(?:[024]2|81)\\d|(?:1|[24]1)\\d{2})\\d{3}", "\\d{6,9}", , , "27111234"],
            [, , "(?:1[13-9]\\d|(?:3[78]|44)[02-9]|6(?:44|6[02-9]))\\d{7}", "\\d{10}", , , "1812345678"],
            [, , "80[03]\\d{7}", "\\d{10}", , , "8001234567"],
            [, , "NA", "NA"],
            [, , "NA", "NA"],
            [, , "NA", "NA"],
            [, , "96(?:0[49]|1[0-4]|6[69])\\d{6}", "\\d{10}", , , "9604123456"], "BD", 880, "00[12]?", "0", , , "0", , "00", , [
                [, "(2)(\\d{7,8})", "$1-$2", ["2"], "0$1"],
                [, "(\\d{2})(\\d{4,6})", "$1-$2", ["[3-79]1"], "0$1"],
                [, "(\\d{4})(\\d{3,6})", "$1-$2", ["1|3(?:0|[2-58]2)|4(?:0|[25]2|3[23]|[4689][25])|5(?:[02-578]2|6[25])|6(?:[0347-9]2|[26][25])|7[02-9]2|8(?:[023][23]|[4-7]2)|9(?:[02][23]|[458]2|6[016])"], "0$1"],
                [, "(\\d{3})(\\d{3,7})", "$1-$2", ["[3-79][2-9]|8"], "0$1"]
            ], , [, , "NA", "NA"], , , [, , "NA", "NA"],
            [, , "NA", "NA"], , , [, , "NA", "NA"]
        ],
        BE: [, [, , "[1-9]\\d{7,8}", "\\d{8,9}"],
            [, , "(?:1[0-69]|[23][2-8]|4[23]|5\\d|6[013-57-9]|71|8[1-79]|9[2-4])\\d{6}|80[2-8]\\d{5}", "\\d{8}", , , "12345678"],
            [, , "4(?:6[0135-8]|[79]\\d|8[3-9])\\d{6}", "\\d{9}", , , "470123456"],
            [, , "800\\d{5}", "\\d{8}", , , "80012345"],
            [, , "(?:70[2-467]|90[0-79])\\d{5}", "\\d{8}", , , "90123456"],
            [, , "NA", "NA"],
            [, , "NA", "NA"],
            [, , "NA", "NA"], "BE", 32, "00", "0", , , "0", , , , [
                [, "(\\d{3})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["4[6-9]"], "0$1"],
                [, "(\\d)(\\d{3})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[23]|4[23]|9[2-4]"], "0$1"],
                [, "(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[156]|7[018]|8(?:0[1-9]|[1-79])"], "0$1"],
                [, "(\\d{3})(\\d{2})(\\d{3})", "$1 $2 $3", ["(?:80|9)0"], "0$1"]
            ], , [, , "NA", "NA"], , , [, , "NA", "NA"],
            [, , "78\\d{6}", "\\d{8}", , , "78123456"], , , [, , "NA", "NA"]
        ],
        BF: [, [, , "[267]\\d{7}", "\\d{8}"],
            [, , "2(?:0(?:49|5[23]|9[016-9])|4(?:4[569]|5[4-6]|7[0179])|5(?:[34]\\d|50))\\d{4}", "\\d{8}", , , "20491234"],
            [, , "6(?:[0-689]\\d|7[0-5])\\d{5}|7\\d{7}", "\\d{8}", , , "70123456"],
            [, , "NA", "NA"],
            [, , "NA", "NA"],
            [, , "NA", "NA"],
            [, , "NA", "NA"],
            [, , "NA", "NA"], "BF", 226, "00", , , , , , , , [
                [, "(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4"]
            ], , [, , "NA", "NA"], , , [, , "NA", "NA"],
            [, , "NA", "NA"], , , [, , "NA", "NA"]
        ],
        BG: [, [, , "[23567]\\d{5,7}|[489]\\d{6,8}", "\\d{5,9}"],
            [, , "2(?:[0-8]\\d{5,6}|9\\d{4,6})|(?:[36]\\d|5[1-9]|8[1-6]|9[1-7])\\d{5,6}|(?:4(?:[124-7]\\d|3[1-6])|7(?:0[1-9]|[1-9]\\d))\\d{4,5}", "\\d{5,8}", , , "2123456"],
            [, , "(?:8[7-9]\\d|9(?:8\\d|99))\\d{6}|4(?:3[0789]|8\\d)\\d{5}", "\\d{8,9}", , , "48123456"],
            [, , "800\\d{5}", "\\d{8}", , , "80012345"],
            [, , "90\\d{6}", "\\d{8}", , , "90123456"],
            [, , "NA", "NA"],
            [, , "700\\d{5}", "\\d{5,9}", , , "70012345"],
            [, , "NA", "NA"], "BG", 359, "00", "0", , , "0", , , , [
                [, "(2)(\\d{5})", "$1 $2", ["29"], "0$1"],
                [, "(2)(\\d{3})(\\d{3,4})", "$1 $2 $3", ["2"], "0$1"],
                [, "(\\d{3})(\\d{4})", "$1 $2", ["43[124-7]|70[1-9]"], "0$1"],
                [, "(\\d{3})(\\d{3})(\\d{2})", "$1 $2 $3", ["43[124-7]|70[1-9]"], "0$1"],
                [, "(\\d{3})(\\d{2})(\\d{3})", "$1 $2 $3", ["[78]00"], "0$1"],
                [, "(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["999"], "0$1"],
                [, "(\\d{2})(\\d{3})(\\d{2,3})", "$1 $2 $3", ["[356]|4[124-7]|7[1-9]|8[1-6]|9[1-7]"], "0$1"],
                [, "(\\d{2})(\\d{3})(\\d{3,4})", "$1 $2 $3", ["48|8[7-9]|9[08]"], "0$1"]
            ], , [, , "NA", "NA"], , , [, , "NA", "NA"],
            [, , "NA", "NA"], , , [, , "NA", "NA"]
        ],
        BH: [, [, , "[136-9]\\d{7}", "\\d{8}"],
            [, , "(?:1(?:3[1356]|6[0156]|7\\d)\\d|6(?:1[16]\\d|500|6(?:0\\d|3[12]|44|7[7-9])|9[69][69])|7(?:1(?:11|78)|7\\d{2}))\\d{4}", "\\d{8}", , , "17001234"],
            [, , "(?:3(?:[1-4679]\\d|5[013569]|8[0-47-9])\\d|6(?:3(?:00|33|6[16])|6(?:[69]\\d|3[03-9]|7[0-6])))\\d{4}", "\\d{8}", , , "36001234"],
            [, , "80\\d{6}", "\\d{8}", , , "80123456"],
            [, , "(?:87|9[014578])\\d{6}", "\\d{8}", , , "90123456"],
            [, , "84\\d{6}", "\\d{8}", , , "84123456"],
            [, , "NA", "NA"],
            [, , "NA", "NA"], "BH", 973, "00", , , , , , , , [
                [, "(\\d{4})(\\d{4})", "$1 $2"]
            ], , [, , "NA", "NA"], , , [, , "NA", "NA"],
            [, , "NA", "NA"], , , [, , "NA", "NA"]
        ],
        BI: [, [, , "[267]\\d{7}", "\\d{8}"],
            [, , "22\\d{6}", "\\d{8}", , , "22201234"],
            [, , "(?:29|6[189]|7[124-9])\\d{6}", "\\d{8}", , , "79561234"],
            [, , "NA", "NA"],
            [, , "NA", "NA"],
            [, , "NA", "NA"],
            [, , "NA", "NA"],
            [, , "NA", "NA"], "BI", 257, "00", , , , , , , , [
                [, "(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4"]
            ], , [, , "NA", "NA"], , , [, , "NA", "NA"],
            [, , "NA", "NA"], , , [, , "NA", "NA"]
        ],
        BJ: [, [, , "[2689]\\d{7}|7\\d{3}", "\\d{4,8}"],
            [, , "2(?:02|1[037]|2[45]|3[68])\\d{5}", "\\d{8}", , , "20211234"],
            [, , "(?:6[146-8]|9[03-9])\\d{6}", "\\d{8}", , , "90011234"],
            [, , "7[3-5]\\d{2}", "\\d{4}", , , "7312"],
            [, , "NA", "NA"],
            [, , "NA", "NA"],
            [, , "NA", "NA"],
            [, , "857[58]\\d{4}", "\\d{8}", , , "85751234"], "BJ", 229, "00", , , , , , , , [
                [, "(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4"]
            ], , [, , "NA", "NA"], , , [, , "NA", "NA"],
            [, , "81\\d{6}", "\\d{8}", , , "81123456"], , , [, , "NA", "NA"]
        ],
        BL: [, [, , "[56]\\d{8}", "\\d{9}"],
            [, , "590(?:2[7-9]|5[12]|87)\\d{4}", "\\d{9}", , , "590271234"],
            [, , "690(?:0[0-7]|[1-9]\\d)\\d{4}", "\\d{9}", , , "690301234"],
            [, , "NA", "NA"],
            [, , "NA", "NA"],
            [, , "NA", "NA"],
            [, , "NA", "NA"],
            [, , "NA", "NA"], "BL", 590, "00", "0", , , "0", , , , , , [, , "NA", "NA"], , , [, , "NA", "NA"],
            [, , "NA", "NA"], , , [, , "NA", "NA"]
        ],
        BM: [, [, , "[4589]\\d{9}", "\\d{7}(?:\\d{3})?"],
            [, , "441(?:2(?:02|23|61|[3479]\\d)|[46]\\d{2}|5(?:4\\d|60|89)|824)\\d{4}", "\\d{7}(?:\\d{3})?", , , "4412345678"],
            [, , "441(?:[37]\\d|5[0-39])\\d{5}", "\\d{10}", , , "4413701234"],
            [, , "8(?:00|44|55|66|77|88)[2-9]\\d{6}", "\\d{10}", , , "8002123456"],
            [, , "900[2-9]\\d{6}", "\\d{10}", , , "9002123456"],
            [, , "NA", "NA"],
            [, , "5(?:00|33|44|66|77)[2-9]\\d{6}", "\\d{10}", , , "5002345678"],
            [, , "NA", "NA"], "BM", 1, "011", "1", , , "1", , , , , , [, , "NA", "NA"], , "441", [, , "NA", "NA"],
            [, , "NA", "NA"], , , [, , "NA", "NA"]
        ],
        BN: [, [, , "[2-578]\\d{6}", "\\d{7}"],
            [, , "2(?:[013-9]\\d|2[0-7])\\d{4}|[3-5]\\d{6}", "\\d{7}", , , "2345678"],
            [, , "22[89]\\d{4}|[78]\\d{6}", "\\d{7}", , , "7123456"],
            [, , "NA", "NA"],
            [, , "NA", "NA"],
            [, , "NA", "NA"],
            [, , "NA", "NA"],
            [, , "NA", "NA"], "BN", 673, "00", , , , , , , , [
                [, "([2-578]\\d{2})(\\d{4})", "$1 $2"]
            ], , [, , "NA", "NA"], , , [, , "NA", "NA"],
            [, , "NA", "NA"], , , [, , "NA", "NA"]
        ],
        BO: [, [, , "[23467]\\d{7}", "\\d{7,8}"],
            [, , "(?:2(?:2\\d{2}|5(?:11|[258]\\d|9[67])|6(?:12|2\\d|9[34])|8(?:2[34]|39|62))|3(?:3\\d{2}|4(?:6\\d|8[24])|8(?:25|42|5[257]|86|9[25])|9(?:2\\d|3[234]|4[248]|5[24]|6[2-6]|7\\d))|4(?:4\\d{2}|6(?:11|[24689]\\d|72)))\\d{4}", "\\d{7,8}", , , "22123456"],
            [, , "[67]\\d{7}", "\\d{8}", , , "71234567"],
            [, , "NA", "NA"],
            [, , "NA", "NA"],
            [, , "NA", "NA"],
            [, , "NA", "NA"],
            [, , "NA", "NA"], "BO", 591, "00(1\\d)?", "0", , , "0(1\\d)?", , , , [
                [, "([234])(\\d{7})", "$1 $2", ["[234]"], , "0$CC $1"],
                [, "([67]\\d{7})", "$1", ["[67]"], , "0$CC $1"]
            ], , [, , "NA", "NA"], , , [, , "NA", "NA"],
            [, , "NA", "NA"], , , [, , "NA", "NA"]
        ],
        BQ: [, [, , "[347]\\d{6}", "\\d{7}"],
            [, , "(?:318[023]|416[023]|7(?:1[578]|50)\\d)\\d{3}", "\\d{7}", , , "7151234"],
            [, , "(?:318[14-68]|416[15-9]|7(?:0[01]|7[07]|[89]\\d)\\d)\\d{3}", "\\d{7}", , , "3181234"],
            [, , "NA", "NA"],
            [, , "NA", "NA"],
            [, , "NA", "NA"],
            [, , "NA", "NA"],
            [, , "NA", "NA"], "BQ", 599, "00", , , , , , , , , , [, , "NA", "NA"], , , [, , "NA", "NA"],
            [, , "NA", "NA"], , , [, , "NA", "NA"]
        ],
        BR: [, [, , "[1-46-9]\\d{7,10}|5\\d{8,9}", "\\d{8,11}"],
            [, , "1[1-9][2-5]\\d{7}|(?:[4689][1-9]|2[12478]|3[1-578]|5[1-5]|7[13-579])[2-5]\\d{7}", "\\d{8,11}", , , "1123456789"],
            [, , "1[1-9](?:7|9\\d)\\d{7}|(?:2[12478]|3[1-578]|7[13-579]|[89][1-9])9?[6-9]\\d{7}|(?:[46][1-9]|5[1-5])[6-9]\\d{7}", "\\d{10,11}", , , "11961234567"],
            [, , "800\\d{6,7}", "\\d{8,11}", , , "800123456"],
            [, , "[359]00\\d{6,7}", "\\d{8,11}", , , "300123456"],
            [, , "(?:300\\d|40(?:0\\d|20))\\d{4}", "\\d{8}", , , "40041234"],
            [, , "NA", "NA"],
            [, , "NA", "NA"], "BR", 55, "00(?:1[45]|2[135]|31|4[13])", "0", , , "0(?:(1[245]|2[135]|31|4[13])(\\d{10,11}))?", "$2", , , [
                [, "(\\d{4})(\\d{4})", "$1-$2", ["[2-9](?:[1-9]|0[1-9])"], "$1"],
                [, "(\\d{5})(\\d{4})", "$1-$2", ["9(?:[1-9]|0[1-9])"], "$1"],
                [, "(\\d{3,5})", "$1", ["1[125689]"], "$1"],
                [, "(\\d{2})(\\d{5})(\\d{4})", "$1 $2-$3", ["(?:[189][1-9]|2[12478]|3[1-578]|7[13-579])9"], "($1)", "0 $CC ($1)"],
                [, "(\\d{2})(\\d{4})(\\d{4})", "$1 $2-$3", ["[1-9][1-9]"], "($1)", "0 $CC ($1)"],
                [, "(\\d{4})(\\d{4})", "$1-$2", ["(?:300|40(?:0|20))"]],
                [, "([3589]00)(\\d{2,3})(\\d{4})", "$1 $2 $3", ["[3589]00"], "0$1"]
            ],
            [
                [, "(\\d{2})(\\d{5})(\\d{4})", "$1 $2-$3", ["(?:[189][1-9]|2[12478]|3[1-578]|7[13-579])9"], "($1)", "0 $CC ($1)"],
                [, "(\\d{2})(\\d{4})(\\d{4})", "$1 $2-$3", ["[1-9][1-9]"], "($1)", "0 $CC ($1)"],
                [, "(\\d{4})(\\d{4})", "$1-$2", ["(?:300|40(?:0|20))"]],
                [, "([3589]00)(\\d{2,3})(\\d{4})", "$1 $2 $3", ["[3589]00"], "0$1"]
            ],
            [, , "NA", "NA"], , , [, , "(?:300\\d|40(?:0\\d|20))\\d{4}", "\\d{8}", , , "40041234"],
            [, , "NA", "NA"], , , [, , "NA", "NA"]
        ],
        BS: [, [, , "[2589]\\d{9}", "\\d{7}(?:\\d{3})?"],
            [, , "242(?:3(?:02|[236][1-9]|4[0-24-9]|5[0-68]|7[3467]|8[0-4]|9[2-467])|461|502|6(?:0[1-3]|12|7[67]|8[78]|9[89])|7(?:02|88))\\d{4}", "\\d{7}(?:\\d{3})?", , , "2423456789"],
            [, , "242(?:3(?:5[79]|[79]5)|4(?:[2-4][1-9]|5[1-8]|6[2-8]|7\\d|81)|5(?:2[45]|3[35]|44|5[1-9]|65|77)|6[34]6|727)\\d{4}", "\\d{10}", , , "2423591234"],
            [, , "242300\\d{4}|8(?:00|44|55|66|77|88)[2-9]\\d{6}", "\\d{10}", , , "8002123456"],
            [, , "900[2-9]\\d{6}", "\\d{10}", , , "9002123456"],
            [, , "NA", "NA"],
            [, , "5(?:00|33|44|66|77)[2-9]\\d{6}", "\\d{10}", , , "5002345678"],
            [, , "NA", "NA"], "BS", 1, "011", "1", , , "1", , , , , , [, , "NA", "NA"], , "242", [, , "NA", "NA"],
            [, , "NA", "NA"], , , [, , "NA", "NA"]
        ],
        BT: [, [, , "[1-8]\\d{6,7}", "\\d{6,8}"],
            [, , "(?:2[3-6]|[34][5-7]|5[236]|6[2-46]|7[246]|8[2-4])\\d{5}", "\\d{6,7}", , , "2345678"],
            [, , "(?:1[67]|77)\\d{6}", "\\d{8}", , , "17123456"],
            [, , "NA", "NA"],
            [, , "NA", "NA"],
            [, , "NA", "NA"],
            [, , "NA", "NA"],
            [, , "NA", "NA"], "BT", 975, "00", , , , , , , , [
                [, "(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["1|77"]],
                [, "([2-8])(\\d{3})(\\d{3})", "$1 $2 $3", ["[2-68]|7[246]"]]
            ], , [, , "NA", "NA"], , , [, , "NA", "NA"],
            [, , "NA", "NA"], , , [, , "NA", "NA"]
        ],
        BW: [, [, , "[2-79]\\d{6,7}", "\\d{7,8}"],
            [, , "(?:2(?:4[0-48]|6[0-24]|9[0578])|3(?:1[0235-9]|55|6\\d|7[01]|9[0-57])|4(?:6[03]|7[1267]|9[0-5])|5(?:3[0389]|4[0489]|7[1-47]|88|9[0-49])|6(?:2[1-35]|5[149]|8[067]))\\d{4}", "\\d{7}", , , "2401234"],
            [, , "7(?:[1-6]\\d|7[014-8])\\d{5}", "\\d{8}", , , "71123456"],
            [, , "NA", "NA"],
            [, , "90\\d{5}", "\\d{7}", , , "9012345"],
            [, , "NA", "NA"],
            [, , "NA", "NA"],
            [, , "79[12][01]\\d{4}", "\\d{8}", , , "79101234"], "BW", 267, "00", , , , , , , , [
                [, "(\\d{3})(\\d{4})", "$1 $2", ["[2-6]"]],
                [, "(7\\d)(\\d{3})(\\d{3})", "$1 $2 $3", ["7"]],
                [, "(90)(\\d{5})", "$1 $2", ["9"]]
            ], , [, , "NA", "NA"], , , [, , "NA", "NA"],
            [, , "NA", "NA"], , , [, , "NA", "NA"]
        ],
        BY: [, [, , "[1-4]\\d{8}|800\\d{3,7}|[89]\\d{9,10}", "\\d{6,11}"],
            [, , "(?:1(?:5(?:1[1-5]|[24]\\d|6[2-4]|9[1-7])|6(?:[235]\\d|4[1-7])|7\\d{2})|2(?:1(?:[246]\\d|3[0-35-9]|5[1-9])|2(?:[235]\\d|4[0-8])|3(?:[26]\\d|3[02-79]|4[024-7]|5[03-7])))\\d{5}", "\\d{6,11}", , , "152450911"],
            [, , "(?:2(?:5[5679]|9[1-9])|33\\d|44\\d)\\d{6}", "\\d{9}", , , "294911911"],
            [, , "8(?:0[13]|20\\d)\\d{7}|800\\d{3,7}", "\\d{6,11}", , , "8011234567"],
            [, , "(?:810|902)\\d{7}", "\\d{10}", , , "9021234567"],
            [, , "NA", "NA"],
            [, , "NA", "NA"],
            [, , "249\\d{6}", "\\d{9}", , , "249123456"], "BY", 375, "810", "8", , , "8?0?", , "8~10", , [
                [, "(\\d{2})(\\d{3})(\\d{2})(\\d{2})", "$1 $2-$3-$4", ["17[0-3589]|2[4-9]|[34]", "17(?:[02358]|1[0-2]|9[0189])|2[4-9]|[34]"], "8 0$1"],
                [, "(\\d{3})(\\d{2})(\\d{2})(\\d{2})", "$1 $2-$3-$4", ["1(?:5[24]|6[235]|7[467])|2(?:1[246]|2[25]|3[26])", "1(?:5[24]|6(?:2|3[04-9]|5[0346-9])|7(?:[46]|7[37-9]))|2(?:1[246]|2[25]|3[26])"], "8 0$1"],
                [, "(\\d{4})(\\d{2})(\\d{3})", "$1 $2-$3", ["1(?:5[169]|6[3-5]|7[179])|2(?:1[35]|2[34]|3[3-5])", "1(?:5[169]|6(?:3[1-3]|4|5[125])|7(?:1[3-9]|7[0-24-6]|9[2-7]))|2(?:1[35]|2[34]|3[3-5])"], "8 0$1"],
                [, "([89]\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["8[01]|9"], "8 $1"],
                [, "(82\\d)(\\d{4})(\\d{4})", "$1 $2 $3", ["82"], "8 $1"],
                [, "(800)(\\d{3})", "$1 $2", ["800"], "8 $1"],
                [, "(800)(\\d{2})(\\d{2,4})", "$1 $2 $3", ["800"], "8 $1"]
            ], , [, , "NA", "NA"], , , [, , "8(?:[013]|[12]0)\\d{8}|800\\d{3,7}|902\\d{7}", "\\d{6,11}", , , "82012345678"],
            [, , "NA", "NA"], , , [, , "NA", "NA"]
        ],
        BZ: [, [, , "[2-8]\\d{6}|0\\d{10}", "\\d{7}(?:\\d{4})?"],
            [, , "[234578][02]\\d{5}", "\\d{7}", , , "2221234"],
            [, , "6[0-367]\\d{5}", "\\d{7}", , , "6221234"],
            [, , "0800\\d{7}", "\\d{11}", , , "08001234123"],
            [, , "NA", "NA"],
            [, , "NA", "NA"],
            [, , "NA", "NA"],
            [, , "NA", "NA"], "BZ", 501, "00", , , , , , , , [
                [, "(\\d{3})(\\d{4})", "$1-$2", ["[2-8]"]],
                [, "(0)(800)(\\d{4})(\\d{3})", "$1-$2-$3-$4", ["0"]]
            ], , [, , "NA", "NA"], , , [, , "NA", "NA"],
            [, , "NA", "NA"], 1, , [, , "NA", "NA"]
        ],
        CA: [, [, , "[2-9]\\d{9}|3\\d{6}", "\\d{7}(?:\\d{3})?"],
            [, , "(?:2(?:04|[23]6|[48]9|50)|3(?:06|43|65)|4(?:03|1[68]|3[178]|50)|5(?:06|1[49]|48|79|8[17])|6(?:0[04]|13|22|39|47)|7(?:0[59]|78|8[02])|8(?:[06]7|19|73)|90[25])[2-9]\\d{6}|310\\d{4}", "\\d{7}(?:\\d{3})?", , , "2042345678"],
            [, , "(?:2(?:04|[23]6|[48]9|50)|3(?:06|43|65)|4(?:03|1[68]|3[178]|50)|5(?:06|1[49]|48|79|8[17])|6(?:0[04]|13|22|39|47)|7(?:0[59]|78|8[02])|8(?:[06]7|19|73)|90[25])[2-9]\\d{6}", "\\d{7}(?:\\d{3})?", , , "2042345678"],
            [, , "8(?:00|44|55|66|77|88)[2-9]\\d{6}|310\\d{4}", "\\d{7}(?:\\d{3})?", , , "8002123456"],
            [, , "900[2-9]\\d{6}", "\\d{10}", , , "9002123456"],
            [, , "NA", "NA"],
            [, , "5(?:00|33|44|66|77)[2-9]\\d{6}", "\\d{10}", , , "5002345678"],
            [, , "NA", "NA"], "CA", 1, "011", "1", , , "1", , , , , , [, , "NA", "NA"], , , [, , "NA", "NA"],
            [, , "NA", "NA"], , , [, , "NA", "NA"]
        ],
        CC: [, [, , "[1458]\\d{5,9}", "\\d{6,10}"],
            [, , "89162\\d{4}", "\\d{8,9}", , , "891621234"],
            [, , "14(?:5\\d|71)\\d{5}|4(?:[0-2]\\d|3[0-57-9]|4[47-9]|5[0-25-9]|6[6-9]|7[03-9]|8[147-9]|9[017-9])\\d{6}", "\\d{9}", , , "412345678"],
            [, , "180(?:0\\d{3}|2)\\d{3}", "\\d{7,10}", , , "1800123456"],
            [, , "190[0126]\\d{6}", "\\d{10}", , , "1900123456"],
            [, , "13(?:00\\d{2})?\\d{4}", "\\d{6,10}", , , "1300123456"],
            [, , "500\\d{6}", "\\d{9}", , , "500123456"],
            [, , "550\\d{6}", "\\d{9}", , , "550123456"], "CC", 61, "(?:14(?:1[14]|34|4[17]|[56]6|7[47]|88))?001[14-689]", "0", , , "0", , "0011", , , , [, , "NA", "NA"], , , [, , "NA", "NA"],
            [, , "NA", "NA"], , , [, , "NA", "NA"]
        ],
        CD: [, [, , "[2-6]\\d{6}|[18]\\d{6,8}|9\\d{8}", "\\d{7,9}"],
            [, , "1(?:2\\d{7}|\\d{6})|[2-6]\\d{6}", "\\d{7,9}", , , "1234567"],
            [, , "8(?:[0-2459]\\d{2}|8)\\d{5}|9[7-9]\\d{7}", "\\d{7,9}", , , "991234567"],
            [, , "NA", "NA"],
            [, , "NA", "NA"],
            [, , "NA", "NA"],
            [, , "NA", "NA"],
            [, , "NA", "NA"], "CD", 243, "00", "0", , , "0", , , , [
                [, "(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["12"], "0$1"],
                [, "([89]\\d{2})(\\d{3})(\\d{3})", "$1 $2 $3", ["8[0-2459]|9"], "0$1"],
                [, "(\\d{2})(\\d{2})(\\d{3})", "$1 $2 $3", ["88"], "0$1"],
                [, "(\\d{2})(\\d{5})", "$1 $2", ["[1-6]"], "0$1"]
            ], , [, , "NA", "NA"], , , [, , "NA", "NA"],
            [, , "NA", "NA"], , , [, , "NA", "NA"]
        ],
        CF: [, [, , "[278]\\d{7}", "\\d{8}"],
            [, , "2[12]\\d{6}", "\\d{8}", , , "21612345"],
            [, , "7[0257]\\d{6}", "\\d{8}", , , "70012345"],
            [, , "NA", "NA"],
            [, , "8776\\d{4}", "\\d{8}", , , "87761234"],
            [, , "NA", "NA"],
            [, , "NA", "NA"],
            [, , "NA", "NA"], "CF", 236, "00", , , , , , , , [
                [, "(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4"]
            ], , [, , "NA", "NA"], , , [, , "NA", "NA"],
            [, , "NA", "NA"], , , [, , "NA", "NA"]
        ],
        CG: [, [, , "[028]\\d{8}", "\\d{9}"],
            [, , "222[1-589]\\d{5}", "\\d{9}", , , "222123456"],
            [, , "0[14-6]\\d{7}", "\\d{9}", , , "061234567"],
            [, , "NA", "NA"],
            [, , "800\\d{6}", "\\d{9}", , , "800123456"],
            [, , "NA", "NA"],
            [, , "NA", "NA"],
            [, , "NA", "NA"], "CG", 242, "00", , , , , , , , [
                [, "(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["[02]"]],
                [, "(\\d)(\\d{4})(\\d{4})", "$1 $2 $3", ["8"]]
            ], , [, , "NA", "NA"], , , [, , "NA", "NA"],
            [, , "NA", "NA"], 1, , [, , "NA", "NA"]
        ],
        CH: [, [, , "[2-9]\\d{8}|860\\d{9}", "\\d{9}(?:\\d{3})?"],
            [, , "(?:2[12467]|3[1-4]|4[134]|5[256]|6[12]|[7-9]1)\\d{7}", "\\d{9}", , , "212345678"],
            [, , "7[5-9]\\d{7}", "\\d{9}", , , "781234567"],
            [, , "800\\d{6}", "\\d{9}", , , "800123456"],
            [, , "90[016]\\d{6}", "\\d{9}", , , "900123456"],
            [, , "84[0248]\\d{6}", "\\d{9}", , , "840123456"],
            [, , "878\\d{6}", "\\d{9}", , , "878123456"],
            [, , "NA", "NA"], "CH", 41, "00", "0", , , "0", , , , [
                [, "([2-9]\\d)(\\d{3})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[2-7]|[89]1"], "0$1"],
                [, "([89]\\d{2})(\\d{3})(\\d{3})", "$1 $2 $3", ["8[047]|90"], "0$1"],
                [, "(\\d{3})(\\d{2})(\\d{3})(\\d{2})(\\d{2})", "$1 $2 $3 $4 $5", ["860"], "0$1"]
            ], , [, , "74[0248]\\d{6}", "\\d{9}", , , "740123456"], , , [, , "NA", "NA"],
            [, , "5[18]\\d{7}", "\\d{9}", , , "581234567"], , , [, , "860\\d{9}", "\\d{12}", , , "860123456789"]
        ],
        CI: [, [, , "[02-7]\\d{7}", "\\d{8}"],
            [, , "(?:2(?:0[023]|1[02357]|[23][045]|4[03-5])|3(?:0[06]|1[069]|[2-4][07]|5[09]|6[08]))\\d{5}", "\\d{8}", , , "21234567"],
            [, , "(?:0[1-9]|4\\d|5[4-9]|6[015-79]|7[578])\\d{6}", "\\d{8}", , , "01234567"],
            [, , "NA", "NA"],
            [, , "NA", "NA"],
            [, , "NA", "NA"],
            [, , "NA", "NA"],
            [, , "NA", "NA"], "CI", 225, "00", , , , , , , , [
                [, "(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4"]
            ], , [, , "NA", "NA"], , , [, , "NA", "NA"],
            [, , "NA", "NA"], 1, , [, , "NA", "NA"]
        ],
        CK: [, [, , "[2-57]\\d{4}", "\\d{5}"],
            [, , "(?:2\\d|3[13-7]|4[1-5])\\d{3}", "\\d{5}", , , "21234"],
            [, , "(?:5[0-68]|7\\d)\\d{3}", "\\d{5}", , , "71234"],
            [, , "NA", "NA"],
            [, , "NA", "NA"],
            [, , "NA", "NA"],
            [, , "NA", "NA"],
            [, , "NA", "NA"], "CK", 682, "00", , , , , , , , [
                [, "(\\d{2})(\\d{3})", "$1 $2"]
            ], , [, , "NA", "NA"], , , [, , "NA", "NA"],
            [, , "NA", "NA"], , , [, , "NA", "NA"]
        ],
        CL: [, [, , "(?:[2-9]|600|123)\\d{7,8}", "\\d{7,11}"],
            [, , "2(?:2\\d{7}|3(?:20|22)\\d{5}|1962\\d{4})|(?:3[2-5]|[47][1-35]|5[1-3578]|6[13-57])\\d{7}", "\\d{7,9}", , , "221234567"],
            [, , "9[4-9]\\d{7}", "\\d{8,9}", , , "961234567"],
            [, , "800\\d{6}|1230\\d{7}", "\\d{9,11}", , , "800123456"],
            [, , "NA", "NA"],
            [, , "600\\d{7,8}", "\\d{10,11}", , , "6001234567"],
            [, , "NA", "NA"],
            [, , "44\\d{7}", "\\d{9}", , , "441234567"], "CL", 56, "(?:0|1(?:1[0-69]|2[0-57]|5[13-58]|69|7[0167]|8[018]))0", "0", , , "0|(1(?:1[0-69]|2[0-57]|5[13-58]|69|7[0167]|8[018]))", , , , [
                [, "(\\d)(\\d{4})(\\d{4})", "$1 $2 $3", ["2[23]"], "($1)", "$CC ($1)"],
                [, "(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["[357]|4[1-35]|6[13-57]"], "($1)", "$CC ($1)"],
                [, "(9)(\\d{4})(\\d{4})", "$1 $2 $3", ["9"], "0$1"],
                [, "(44)(\\d{3})(\\d{4})", "$1 $2 $3", ["44"], "0$1"],
                [, "([68]00)(\\d{3})(\\d{3,4})", "$1 $2 $3", ["60|8"], "$1"],
                [, "(600)(\\d{3})(\\d{2})(\\d{3})", "$1 $2 $3 $4", ["60"], "$1"],
                [, "(1230)(\\d{3})(\\d{4})", "$1 $2 $3", ["1"], "$1"],
                [, "(\\d{5})(\\d{4})", "$1 $2", ["219"], "($1)", "$CC ($1)"],
                [, "(\\d{4,5})", "$1", ["[1-9]"], "$1"]
            ],
            [
                [, "(\\d)(\\d{4})(\\d{4})", "$1 $2 $3", ["2[23]"], "($1)", "$CC ($1)"],
                [, "(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["[357]|4[1-35]|6[13-57]"], "($1)", "$CC ($1)"],
                [, "(9)(\\d{4})(\\d{4})", "$1 $2 $3", ["9"], "0$1"],
                [, "(44)(\\d{3})(\\d{4})", "$1 $2 $3", ["44"], "0$1"],
                [, "([68]00)(\\d{3})(\\d{3,4})", "$1 $2 $3", ["60|8"], "$1"],
                [, "(600)(\\d{3})(\\d{2})(\\d{3})", "$1 $2 $3 $4", ["60"], "$1"],
                [, "(1230)(\\d{3})(\\d{4})", "$1 $2 $3", ["1"], "$1"],
                [, "(\\d{5})(\\d{4})", "$1 $2", ["219"], "($1)", "$CC ($1)"]
            ],
            [, , "NA", "NA"], , , [, , "600\\d{7,8}", "\\d{10,11}", , , "6001234567"],
            [, , "NA", "NA"], , , [, , "NA", "NA"]
        ],
        CM: [, [, , "[2368]\\d{7,8}", "\\d{8,9}"],
            [, , "2(?:22|33|4[23])\\d{6}", "\\d{9}", , , "222123456"],
            [, , "6[5-9]\\d{7}", "\\d{9}", , , "671234567"],
            [, , "800\\d{5}", "\\d{8}", , , "80012345"],
            [, , "88\\d{6}", "\\d{8}", , , "88012345"],
            [, , "NA", "NA"],
            [, , "NA", "NA"],
            [, , "NA", "NA"], "CM", 237, "00", , , , , , , , [
                [, "([26])(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4 $5", ["[26]"]],
                [, "(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[23]|88"]],
                [, "(800)(\\d{2})(\\d{3})", "$1 $2 $3", ["80"]]
            ], , [, , "NA", "NA"], , , [, , "NA", "NA"],
            [, , "NA", "NA"], , , [, , "NA", "NA"]
        ],
        CN: [, [, , "[1-7]\\d{6,11}|8[0-357-9]\\d{6,9}|9\\d{7,10}", "\\d{4,12}"],
            [, , "21(?:100\\d{2}|95\\d{3,4}|\\d{8,10})|(?:10|2[02-57-9]|3(?:11|7[179])|4(?:[15]1|3[12])|5(?:1\\d|2[37]|3[12]|51|7[13-79]|9[15])|7(?:31|5[457]|6[09]|91)|8(?:[57]1|98))(?:100\\d{2}|95\\d{3,4}|\\d{8})|(?:3(?:1[02-9]|35|49|5\\d|7[02-68]|9[1-68])|4(?:1[02-9]|2[179]|3[3-9]|5[2-9]|6[4789]|7\\d|8[23])|5(?:3[03-9]|4[36]|5[02-9]|6[1-46]|7[028]|80|9[2-46-9])|6(?:3[1-5]|6[0238]|9[12])|7(?:01|[17]\\d|2[248]|3[04-9]|4[3-6]|5[0-3689]|6[2368]|9[02-9])|8(?:1[236-8]|2[5-7]|3\\d|5[4-9]|7[02-9]|8[3678]|9[1-7])|9(?:0[1-3689]|1[1-79]|[379]\\d|4[13]|5[1-5]))(?:100\\d{2}|95\\d{3,4}|\\d{7})|80(?:29|6[03578]|7[018]|81)\\d{4}", "\\d{4,12}", , , "1012345678"],
            [, , "1(?:[38]\\d|4[57]|5[0-35-9]|7[06-8])\\d{8}", "\\d{11}", , , "13123456789"],
            [, , "(?:10)?800\\d{7}", "\\d{10,12}", , , "8001234567"],
            [, , "16[08]\\d{5}", "\\d{8}", , , "16812345"],
            [, , "400\\d{7}|950\\d{7,8}|(?:10|2[0-57-9]|3(?:[157]\\d|35|49|9[1-68])|4(?:[17]\\d|2[179]|[35][1-9]|6[4789]|8[23])|5(?:[1357]\\d|2[37]|4[36]|6[1-46]|80|9[1-9])|6(?:3[1-5]|6[0238]|9[12])|7(?:01|[1579]\\d|2[248]|3[014-9]|4[3-6]|6[023689])|8(?:1[236-8]|2[5-7]|[37]\\d|5[14-9]|8[3678]|9[1-8])|9(?:0[1-3689]|1[1-79]|[379]\\d|4[13]|5[1-5]))96\\d{3,4}", "\\d{7,11}", , , "4001234567"],
            [, , "NA", "NA"],
            [, , "NA", "NA"], "CN", 86, "(1(?:[129]\\d{3}|79\\d{2}))?00", "0", , , "(1(?:[129]\\d{3}|79\\d{2}))|0", , "00", , [
                [, "(80\\d{2})(\\d{4})", "$1 $2", ["80[2678]"], "0$1", "$CC $1", 1],
                [, "([48]00)(\\d{3})(\\d{4})", "$1 $2 $3", ["[48]00"]],
                [, "(\\d{5,6})", "$1", ["100|95"]],
                [, "(\\d{2})(\\d{5,6})", "$1 $2", ["(?:10|2\\d)[19]", "(?:10|2\\d)(?:10|9[56])", "(?:10|2\\d)(?:100|9[56])"], "0$1", "$CC $1"],
                [, "(\\d{3})(\\d{5,6})", "$1 $2", ["[3-9]", "[3-9]\\d{2}[19]", "[3-9]\\d{2}(?:10|9[56])"], "0$1", "$CC $1"],
                [, "(\\d{3,4})(\\d{4})", "$1 $2", ["[2-9]"]],
                [, "(21)(\\d{4})(\\d{4,6})", "$1 $2 $3", ["21"], "0$1", "$CC $1", 1],
                [, "([12]\\d)(\\d{4})(\\d{4})", "$1 $2 $3", ["10[1-9]|2[02-9]", "10[1-9]|2[02-9]", "10(?:[1-79]|8(?:[1-9]|0[1-9]))|2[02-9]"], "0$1", "$CC $1", 1],
                [, "(\\d{3})(\\d{4})(\\d{4})", "$1 $2 $3", ["3(?:11|7[179])|4(?:[15]1|3[12])|5(?:1|2[37]|3[12]|51|7[13-79]|9[15])|7(?:31|5[457]|6[09]|91)|8(?:[57]1|98)"], "0$1", "$CC $1", 1],
                [, "(\\d{3})(\\d{3})(\\d{4})", "$1 $2 $3", ["3(?:1[02-9]|35|49|5|7[02-68]|9[1-68])|4(?:1[02-9]|2[179]|[35][2-9]|6[4789]|7\\d|8[23])|5(?:3[03-9]|4[36]|5[02-9]|6[1-46]|7[028]|80|9[2-46-9])|6(?:3[1-5]|6[0238]|9[12])|7(?:01|[1579]|2[248]|3[04-9]|4[3-6]|6[2368])|8(?:1[236-8]|2[5-7]|3|5[4-9]|7[02-9]|8[3678]|9[1-7])|9(?:0[1-3689]|1[1-79]|[379]|4[13]|5[1-5])"], "0$1", "$CC $1", 1],
                [, "(\\d{3})(\\d{4})(\\d{4})", "$1 $2 $3", ["1[3-578]"], , "$CC $1"],
                [, "(10800)(\\d{3})(\\d{4})", "$1 $2 $3", ["108", "1080", "10800"]],
                [, "(\\d{3})(\\d{7,8})", "$1 $2", ["950"]]
            ],
            [
                [, "(80\\d{2})(\\d{4})", "$1 $2", ["80[2678]"], "0$1", "$CC $1", 1],
                [, "([48]00)(\\d{3})(\\d{4})", "$1 $2 $3", ["[48]00"]],
                [, "(\\d{2})(\\d{5,6})", "$1 $2", ["(?:10|2\\d)[19]", "(?:10|2\\d)(?:10|9[56])", "(?:10|2\\d)(?:100|9[56])"], "0$1", "$CC $1"],
                [, "(\\d{3})(\\d{5,6})", "$1 $2", ["[3-9]", "[3-9]\\d{2}[19]", "[3-9]\\d{2}(?:10|9[56])"], "0$1", "$CC $1"],
                [, "(21)(\\d{4})(\\d{4,6})", "$1 $2 $3", ["21"], "0$1", "$CC $1", 1],
                [, "([12]\\d)(\\d{4})(\\d{4})", "$1 $2 $3", ["10[1-9]|2[02-9]", "10[1-9]|2[02-9]", "10(?:[1-79]|8(?:[1-9]|0[1-9]))|2[02-9]"], "0$1", "$CC $1", 1],
                [, "(\\d{3})(\\d{4})(\\d{4})", "$1 $2 $3", ["3(?:11|7[179])|4(?:[15]1|3[12])|5(?:1|2[37]|3[12]|51|7[13-79]|9[15])|7(?:31|5[457]|6[09]|91)|8(?:[57]1|98)"], "0$1", "$CC $1", 1],
                [, "(\\d{3})(\\d{3})(\\d{4})", "$1 $2 $3", ["3(?:1[02-9]|35|49|5|7[02-68]|9[1-68])|4(?:1[02-9]|2[179]|[35][2-9]|6[4789]|7\\d|8[23])|5(?:3[03-9]|4[36]|5[02-9]|6[1-46]|7[028]|80|9[2-46-9])|6(?:3[1-5]|6[0238]|9[12])|7(?:01|[1579]|2[248]|3[04-9]|4[3-6]|6[2368])|8(?:1[236-8]|2[5-7]|3|5[4-9]|7[02-9]|8[3678]|9[1-7])|9(?:0[1-3689]|1[1-79]|[379]|4[13]|5[1-5])"], "0$1", "$CC $1", 1],
                [, "(\\d{3})(\\d{4})(\\d{4})", "$1 $2 $3", ["1[3-578]"], , "$CC $1"],
                [, "(10800)(\\d{3})(\\d{4})", "$1 $2 $3", ["108", "1080", "10800"]],
                [, "(\\d{3})(\\d{7,8})", "$1 $2", ["950"]]
            ],
            [, , "NA", "NA"], , , [, , "(?:4|(?:10)?8)00\\d{7}|950\\d{7,8}", "\\d{10,12}", , , "4001234567"],
            [, , "NA", "NA"], , , [, , "NA", "NA"]
        ],
        CO: [, [, , "(?:[13]\\d{0,3}|[24-8])\\d{7}", "\\d{7,11}"],
            [, , "[124-8][2-9]\\d{6}", "\\d{8}", , , "12345678"],
            [, , "3(?:0[0-5]|1\\d|2[0-2]|5[01])\\d{7}", "\\d{10}", , , "3211234567"],
            [, , "1800\\d{7}", "\\d{11}", , , "18001234567"],
            [, , "19(?:0[01]|4[78])\\d{7}", "\\d{11}", , , "19001234567"],
            [, , "NA", "NA"],
            [, , "NA", "NA"],
            [, , "NA", "NA"], "CO", 57, "00(?:4(?:[14]4|56)|[579])", "0", , , "0([3579]|4(?:44|56))?", , , , [
                [, "(\\d)(\\d{7})", "$1 $2", ["1(?:8[2-9]|9[0-3]|[2-7])|[24-8]", "1(?:8[2-9]|9(?:09|[1-3])|[2-7])|[24-8]"], "($1)", "0$CC $1"],
                [, "(\\d{3})(\\d{7})", "$1 $2", ["3"], , "0$CC $1"],
                [, "(1)(\\d{3})(\\d{7})", "$1-$2-$3", ["1(?:80|9[04])", "1(?:800|9(?:0[01]|4[78]))"], "0$1"]
            ],
            [
                [, "(\\d)(\\d{7})", "$1 $2", ["1(?:8[2-9]|9[0-3]|[2-7])|[24-8]", "1(?:8[2-9]|9(?:09|[1-3])|[2-7])|[24-8]"], "($1)", "0$CC $1"],
                [, "(\\d{3})(\\d{7})", "$1 $2", ["3"], , "0$CC $1"],
                [, "(1)(\\d{3})(\\d{7})", "$1 $2 $3", ["1(?:80|9[04])", "1(?:800|9(?:0[01]|4[78]))"]]
            ],
            [, , "NA", "NA"], , , [, , "NA", "NA"],
            [, , "NA", "NA"], , , [, , "NA", "NA"]
        ],
        CR: [, [, , "[24-9]\\d{7,9}", "\\d{8,10}"],
            [, , "2[0-24-7]\\d{6}", "\\d{8}", , , "22123456"],
            [, , "5(?:0[01]|7[0-3])\\d{5}|6(?:[0-2]\\d|30)\\d{5}|7[0-3]\\d{6}|8[3-9]\\d{6}", "\\d{8}", , , "83123456"],
            [, , "800\\d{7}", "\\d{10}", , , "8001234567"],
            [, , "90[059]\\d{7}", "\\d{10}", , , "9001234567"],
            [, , "NA", "NA"],
            [, , "NA", "NA"],
            [, , "210[0-6]\\d{4}|4\\d{7}|5100\\d{4}", "\\d{8}", , , "40001234"], "CR", 506, "00", , , , "(19(?:0[012468]|1[09]|20|66|77|99))", , , , [
                [, "(\\d{4})(\\d{4})", "$1 $2", ["[24-7]|8[3-9]"], , "$CC $1"],
                [, "(\\d{3})(\\d{3})(\\d{4})", "$1-$2-$3", ["[89]0"], , "$CC $1"]
            ], , [, , "NA", "NA"], , , [, , "NA", "NA"],
            [, , "NA", "NA"], , , [, , "NA", "NA"]
        ],
        CU: [, [, , "[2-57]\\d{5,7}", "\\d{4,8}"],
            [, , "2[1-4]\\d{5,6}|3(?:1\\d{6}|[23]\\d{4,6})|4(?:[125]\\d{5,6}|[36]\\d{6}|[78]\\d{4,6})|7\\d{6,7}", "\\d{4,8}", , , "71234567"],
            [, , "5\\d{7}", "\\d{8}", , , "51234567"],
            [, , "NA", "NA"],
            [, , "NA", "NA"],
            [, , "NA", "NA"],
            [, , "NA", "NA"],
            [, , "NA", "NA"], "CU", 53, "119", "0", , , "0", , , , [
                [, "(\\d)(\\d{6,7})", "$1 $2", ["7"], "(0$1)"],
                [, "(\\d{2})(\\d{4,6})", "$1 $2", ["[2-4]"], "(0$1)"],
                [, "(\\d)(\\d{7})", "$1 $2", ["5"], "0$1"]
            ], , [, , "NA", "NA"], , , [, , "NA", "NA"],
            [, , "NA", "NA"], , , [, , "NA", "NA"]
        ],
        CV: [, [, , "[259]\\d{6}", "\\d{7}"],
            [, , "2(?:2[1-7]|3[0-8]|4[12]|5[1256]|6\\d|7[1-3]|8[1-5])\\d{4}", "\\d{7}", , , "2211234"],
            [, , "(?:9\\d|59)\\d{5}", "\\d{7}", , , "9911234"],
            [, , "NA", "NA"],
            [, , "NA", "NA"],
            [, , "NA", "NA"],
            [, , "NA", "NA"],
            [, , "NA", "NA"], "CV", 238, "0", , , , , , , , [
                [, "(\\d{3})(\\d{2})(\\d{2})", "$1 $2 $3"]
            ], , [, , "NA", "NA"], , , [, , "NA", "NA"],
            [, , "NA", "NA"], , , [, , "NA", "NA"]
        ],
        CW: [, [, , "[169]\\d{6,7}", "\\d{7,8}"],
            [, , "9(?:[48]\\d{2}|50\\d|7(?:2[0-24]|[34]\\d|6[35-7]|77|8[7-9]))\\d{4}", "\\d{7,8}", , , "94151234"],
            [, , "9(?:5(?:[1246]\\d|3[01])|6(?:[16-9]\\d|3[01]))\\d{4}", "\\d{7,8}", , , "95181234"],
            [, , "NA", "NA"],
            [, , "NA", "NA"],
            [, , "(?:10|69)\\d{5}", "\\d{7}", , , "1011234"],
            [, , "NA", "NA"],
            [, , "NA", "NA"], "CW", 599, "00", , , , , , , , [
                [, "(\\d{3})(\\d{4})", "$1 $2", ["[13-7]"]],
                [, "(9)(\\d{3})(\\d{4})", "$1 $2 $3", ["9"]]
            ], , [, , "955\\d{5}", "\\d{7,8}", , , "95581234"], 1, , [, , "NA", "NA"],
            [, , "NA", "NA"], , , [, , "NA", "NA"]
        ],
        CX: [, [, , "[1458]\\d{5,9}", "\\d{6,10}"],
            [, , "89164\\d{4}", "\\d{8,9}", , , "891641234"],
            [, , "14(?:5\\d|71)\\d{5}|4(?:[0-2]\\d|3[0-57-9]|4[47-9]|5[0-25-9]|6[6-9]|7[03-9]|8[147-9]|9[017-9])\\d{6}", "\\d{9}", , , "412345678"],
            [, , "180(?:0\\d{3}|2)\\d{3}", "\\d{7,10}", , , "1800123456"],
            [, , "190[0126]\\d{6}", "\\d{10}", , , "1900123456"],
            [, , "13(?:00\\d{2})?\\d{4}", "\\d{6,10}", , , "1300123456"],
            [, , "500\\d{6}", "\\d{9}", , , "500123456"],
            [, , "550\\d{6}", "\\d{9}", , , "550123456"], "CX", 61, "(?:14(?:1[14]|34|4[17]|[56]6|7[47]|88))?001[14-689]", "0", , , "0", , "0011", , , , [, , "NA", "NA"], , , [, , "NA", "NA"],
            [, , "NA", "NA"], , , [, , "NA", "NA"]
        ],
        CY: [, [, , "[257-9]\\d{7}", "\\d{8}"],
            [, , "2[2-6]\\d{6}", "\\d{8}", , , "22345678"],
            [, , "9[4-79]\\d{6}", "\\d{8}", , , "96123456"],
            [, , "800\\d{5}", "\\d{8}", , , "80001234"],
            [, , "90[09]\\d{5}", "\\d{8}", , , "90012345"],
            [, , "80[1-9]\\d{5}", "\\d{8}", , , "80112345"],
            [, , "700\\d{5}", "\\d{8}", , , "70012345"],
            [, , "NA", "NA"], "CY", 357, "00", , , , , , , , [
                [, "(\\d{2})(\\d{6})", "$1 $2"]
            ], , [, , "NA", "NA"], , , [, , "NA", "NA"],
            [, , "(?:50|77)\\d{6}", "\\d{8}", , , "77123456"], , , [, , "NA", "NA"]
        ],
        CZ: [, [, , "[2-8]\\d{8}|9\\d{8,11}", "\\d{9,12}"],
            [, , "2\\d{8}|(?:3[1257-9]|4[16-9]|5[13-9])\\d{7}", "\\d{9,12}", , , "212345678"],
            [, , "(?:60[1-8]|7(?:0[2-5]|[2379]\\d))\\d{6}", "\\d{9,12}", , , "601123456"],
            [, , "800\\d{6}", "\\d{9,12}", , , "800123456"],
            [, , "9(?:0[05689]|76)\\d{6}", "\\d{9,12}", , , "900123456"],
            [, , "8[134]\\d{7}", "\\d{9,12}", , , "811234567"],
            [, , "70[01]\\d{6}", "\\d{9,12}", , , "700123456"],
            [, , "9[17]0\\d{6}", "\\d{9,12}", , , "910123456"], "CZ", 420, "00", , , , , , , , [
                [, "([2-9]\\d{2})(\\d{3})(\\d{3})", "$1 $2 $3", ["[2-8]|9[015-7]"]],
                [, "(96\\d)(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3 $4", ["96"]],
                [, "(9\\d)(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3 $4", ["9[36]"]]
            ], , [, , "NA", "NA"], , , [, , "NA", "NA"],
            [, , "9(?:5\\d|7[234])\\d{6}", "\\d{9,12}", , , "972123456"], , , [, , "9(?:3\\d{9}|6\\d{7,10})", "\\d{9,12}", , , "93123456789"]
        ],
        DE: [, [, , "[1-35-9]\\d{3,14}|4(?:[0-8]\\d{4,12}|9(?:[0-37]\\d|4(?:[1-35-8]|4\\d?)|5\\d{1,2}|6[1-8]\\d?)\\d{2,8})", "\\d{2,15}"],
            [, , "[246]\\d{5,13}|3(?:0\\d{3,13}|2\\d{9}|[3-9]\\d{4,13})|5(?:0[2-8]|[1256]\\d|[38][0-8]|4\\d{0,2}|[79][0-7])\\d{3,11}|7(?:0[2-8]|[1-9]\\d)\\d{3,10}|8(?:0[2-9]|[1-9]\\d)\\d{3,10}|9(?:0[6-9]\\d{3,10}|1\\d{4,12}|[2-9]\\d{4,11})", "\\d{2,15}", , , "30123456"],
            [, , "1(?:5[0-25-9]\\d{8}|6[023]\\d{7,8}|7(?:[0-57-9]\\d?|6\\d)\\d{7})", "\\d{10,11}", , , "15123456789"],
            [, , "800\\d{7,12}", "\\d{10,15}", , , "8001234567890"],
            [, , "137[7-9]\\d{6}|900(?:[135]\\d{6}|9\\d{7})", "\\d{10,11}", , , "9001234567"],
            [, , "1(?:3(?:7[1-6]\\d{6}|8\\d{4})|80\\d{5,11})", "\\d{7,14}", , , "18012345"],
            [, , "700\\d{8}", "\\d{11}", , , "70012345678"],
            [, , "NA", "NA"], "DE", 49, "00", "0", , , "0", , , , [
                [, "(1\\d{2})(\\d{7,8})", "$1 $2", ["1[67]"], "0$1"],
                [, "(15\\d{3})(\\d{6})", "$1 $2", ["15[0568]"], "0$1"],
                [, "(1\\d{3})(\\d{7})", "$1 $2", ["15"], "0$1"],
                [, "(\\d{2})(\\d{3,11})", "$1 $2", ["3[02]|40|[68]9"], "0$1"],
                [, "(\\d{3})(\\d{3,11})", "$1 $2", ["2(?:\\d1|0[2389]|1[24]|28|34)|3(?:[3-9][15]|40)|[4-8][1-9]1|9(?:06|[1-9]1)"], "0$1"],
                [, "(\\d{4})(\\d{2,11})", "$1 $2", ["[24-6]|[7-9](?:\\d[1-9]|[1-9]\\d)|3(?:[3569][02-46-9]|4[2-4679]|7[2-467]|8[2-46-8])", "[24-6]|[7-9](?:\\d[1-9]|[1-9]\\d)|3(?:3(?:0[1-467]|2[127-9]|3[124578]|[46][1246]|7[1257-9]|8[1256]|9[145])|4(?:2[135]|3[1357]|4[13578]|6[1246]|7[1356]|9[1346])|5(?:0[14]|2[1-3589]|3[1357]|4[1246]|6[1-4]|7[1346]|8[13568]|9[1246])|6(?:0[356]|2[1-489]|3[124-6]|4[1347]|6[13]|7[12579]|8[1-356]|9[135])|7(?:2[1-7]|3[1357]|4[145]|6[1-5]|7[1-4])|8(?:21|3[1468]|4[1347]|6[0135-9]|7[1467]|8[136])|9(?:0[12479]|2[1358]|3[1357]|4[134679]|6[1-9]|7[136]|8[147]|9[1468]))"], "0$1"],
                [, "(3\\d{4})(\\d{1,10})", "$1 $2", ["3"], "0$1"],
                [, "(800)(\\d{7,12})", "$1 $2", ["800"], "0$1"],
                [, "(177)(99)(\\d{7,8})", "$1 $2 $3", ["177", "1779", "17799"], "0$1"],
                [, "(\\d{3})(\\d)(\\d{4,10})", "$1 $2 $3", ["(?:18|90)0|137", "1(?:37|80)|900[1359]"], "0$1"],
                [, "(1\\d{2})(\\d{5,11})", "$1 $2", ["181"], "0$1"],
                [, "(18\\d{3})(\\d{6})", "$1 $2", ["185", "1850", "18500"], "0$1"],
                [, "(18\\d{2})(\\d{7})", "$1 $2", ["18[68]"], "0$1"],
                [, "(18\\d)(\\d{8})", "$1 $2", ["18[2-579]"], "0$1"],
                [, "(700)(\\d{4})(\\d{4})", "$1 $2 $3", ["700"], "0$1"],
                [, "(138)(\\d{4})", "$1 $2", ["138"], "0$1"]
            ], , [, , "16(?:4\\d{1,10}|[89]\\d{1,11})", "\\d{4,14}", , , "16412345"], , , [, , "NA", "NA"],
            [, , "18(?:1\\d{5,11}|[2-9]\\d{8})", "\\d{8,14}", , , "18500123456"], , , [, , "17799\\d{7,8}", "\\d{12,13}", , , "177991234567"]
        ],
        DJ: [, [, , "[27]\\d{7}", "\\d{8}"],
            [, , "2(?:1[2-5]|7[45])\\d{5}", "\\d{8}", , , "21360003"],
            [, , "77[6-8]\\d{5}", "\\d{8}", , , "77831001"],
            [, , "NA", "NA"],
            [, , "NA", "NA"],
            [, , "NA", "NA"],
            [, , "NA", "NA"],
            [, , "NA", "NA"], "DJ", 253, "00", , , , , , , , [
                [, "(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4"]
            ], , [, , "NA", "NA"], , , [, , "NA", "NA"],
            [, , "NA", "NA"], , , [, , "NA", "NA"]
        ],
        DK: [, [, , "[2-9]\\d{7}", "\\d{8}"],
            [, , "(?:[2-7]\\d|8[126-9]|9[1-36-9])\\d{6}", "\\d{8}", , , "32123456"],
            [, , "(?:[2-7]\\d|8[126-9]|9[1-36-9])\\d{6}", "\\d{8}", , , "20123456"],
            [, , "80\\d{6}", "\\d{8}", , , "80123456"],
            [, , "90\\d{6}", "\\d{8}", , , "90123456"],
            [, , "NA", "NA"],
            [, , "NA", "NA"],
            [, , "NA", "NA"], "DK", 45, "00", , , , , , , 1, [
                [, "(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4"]
            ], , [, , "NA", "NA"], , , [, , "NA", "NA"],
            [, , "NA", "NA"], , , [, , "NA", "NA"]
        ],
        DM: [, [, , "[57-9]\\d{9}", "\\d{7}(?:\\d{3})?"],
            [, , "767(?:2(?:55|66)|4(?:2[01]|4[0-25-9])|50[0-4]|70[1-3])\\d{4}", "\\d{7}(?:\\d{3})?", , , "7674201234"],
            [, , "767(?:2(?:[234689]5|7[5-7])|31[5-7]|61[2-7])\\d{4}", "\\d{10}", , , "7672251234"],
            [, , "8(?:00|44|55|66|77|88)[2-9]\\d{6}", "\\d{10}", , , "8002123456"],
            [, , "900[2-9]\\d{6}", "\\d{10}", , , "9002123456"],
            [, , "NA", "NA"],
            [, , "5(?:00|33|44|66|77)[2-9]\\d{6}", "\\d{10}", , , "5002345678"],
            [, , "NA", "NA"], "DM", 1, "011", "1", , , "1", , , , , , [, , "NA", "NA"], , "767", [, , "NA", "NA"],
            [, , "NA", "NA"], , , [, , "NA", "NA"]
        ],
        DO: [, [, , "[589]\\d{9}", "\\d{7}(?:\\d{3})?"],
            [, , "8(?:[04]9[2-9]\\d{6}|29(?:2(?:[0-59]\\d|6[04-9]|7[0-27]|8[0237-9])|3(?:[0-35-9]\\d|4[7-9])|[45]\\d{2}|6(?:[0-27-9]\\d|[3-5][1-9]|6[0135-8])|7(?:0[013-9]|[1-37]\\d|4[1-35689]|5[1-4689]|6[1-57-9]|8[1-79]|9[1-8])|8(?:0[146-9]|1[0-48]|[248]\\d|3[1-79]|5[01589]|6[013-68]|7[124-8]|9[0-8])|9(?:[0-24]\\d|3[02-46-9]|5[0-79]|60|7[0169]|8[57-9]|9[02-9]))\\d{4})", "\\d{7}(?:\\d{3})?", , , "8092345678"],
            [, , "8[024]9[2-9]\\d{6}", "\\d{7}(?:\\d{3})?", , , "8092345678"],
            [, , "8(?:00|44|55|66|77|88)[2-9]\\d{6}", "\\d{10}", , , "8002123456"],
            [, , "900[2-9]\\d{6}", "\\d{10}", , , "9002123456"],
            [, , "NA", "NA"],
            [, , "5(?:00|33|44|66|77)[2-9]\\d{6}", "\\d{10}", , , "5002345678"],
            [, , "NA", "NA"], "DO", 1, "011", "1", , , "1", , , , , , [, , "NA", "NA"], , "8[024]9", [, , "NA", "NA"],
            [, , "NA", "NA"], , , [, , "NA", "NA"]
        ],
        DZ: [, [, , "(?:[1-4]|[5-9]\\d)\\d{7}", "\\d{8,9}"],
            [, , "(?:1\\d|2[013-79]|3[0-8]|4[0135689])\\d{6}|9619\\d{5}", "\\d{8,9}", , , "12345678"],
            [, , "(?:5[4-6]|7[7-9])\\d{7}|6(?:[569]\\d|7[0-6])\\d{6}", "\\d{9}", , , "551234567"],
            [, , "800\\d{6}", "\\d{9}", , , "800123456"],
            [, , "80[3-689]1\\d{5}", "\\d{9}", , , "808123456"],
            [, , "80[12]1\\d{5}", "\\d{9}", , , "801123456"],
            [, , "NA", "NA"],
            [, , "98[23]\\d{6}", "\\d{9}", , , "983123456"], "DZ", 213, "00", "0", , , "0", , , , [
                [, "([1-4]\\d)(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[1-4]"], "0$1"],
                [, "([5-8]\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[5-8]"], "0$1"],
                [, "(9\\d)(\\d{3})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["9"], "0$1"]
            ], , [, , "NA", "NA"], , , [, , "NA", "NA"],
            [, , "NA", "NA"], , , [, , "NA", "NA"]
        ],
        EC: [, [, , "1\\d{9,10}|[2-8]\\d{7}|9\\d{8}", "\\d{7,11}"],
            [, , "[2-7][2-7]\\d{6}", "\\d{7,8}", , , "22123456"],
            [, , "9(?:39|[45][89]|[67][7-9]|[89]\\d)\\d{6}", "\\d{9}", , , "991234567"],
            [, , "1800\\d{6,7}", "\\d{10,11}", , , "18001234567"],
            [, , "NA", "NA"],
            [, , "NA", "NA"],
            [, , "NA", "NA"],
            [, , "[2-7]890\\d{4}", "\\d{8}", , , "28901234"], "EC", 593, "00", "0", , , "0", , , , [
                [, "(\\d)(\\d{3})(\\d{4})", "$1 $2-$3", ["[247]|[356][2-8]"], "(0$1)"],
                [, "(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["9"], "0$1"],
                [, "(1800)(\\d{3})(\\d{3,4})", "$1 $2 $3", ["1"], "$1"]
            ],
            [
                [, "(\\d)(\\d{3})(\\d{4})", "$1-$2-$3", ["[247]|[356][2-8]"]],
                [, "(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["9"], "0$1"],
                [, "(1800)(\\d{3})(\\d{3,4})", "$1 $2 $3", ["1"], "$1"]
            ],
            [, , "NA", "NA"], , , [, , "NA", "NA"],
            [, , "NA", "NA"], , , [, , "NA", "NA"]
        ],
        EE: [, [, , "1\\d{3,4}|[3-9]\\d{6,7}|800\\d{6,7}", "\\d{4,10}"],
            [, , "(?:3[23589]|4[3-8]|6\\d|7[1-9]|88)\\d{5}", "\\d{7}", , , "3212345"],
            [, , "(?:5\\d|8[1-5])\\d{6}|5(?:[02]\\d{2}|1(?:[0-8]\\d|95)|5[0-478]\\d|64[0-4]|65[1-589])\\d{3}", "\\d{7,8}", , , "51234567"],
            [, , "800(?:0\\d{3}|1\\d|[2-9])\\d{3}", "\\d{7,10}", , , "80012345"],
            [, , "(?:40\\d{2}|900)\\d{4}", "\\d{7,8}", , , "9001234"],
            [, , "NA", "NA"],
            [, , "70[0-2]\\d{5}", "\\d{8}", , , "70012345"],
            [, , "NA", "NA"], "EE", 372, "00", , , , , , , , [
                [, "([3-79]\\d{2})(\\d{4})", "$1 $2", ["[369]|4[3-8]|5(?:[0-2]|5[0-478]|6[45])|7[1-9]", "[369]|4[3-8]|5(?:[02]|1(?:[0-8]|95)|5[0-478]|6(?:4[0-4]|5[1-589]))|7[1-9]"]],
                [, "(70)(\\d{2})(\\d{4})", "$1 $2 $3", ["70"]],
                [, "(8000)(\\d{3})(\\d{3})", "$1 $2 $3", ["800", "8000"]],
                [, "([458]\\d{3})(\\d{3,4})", "$1 $2", ["40|5|8(?:00|[1-5])", "40|5|8(?:00[1-9]|[1-5])"]]
            ], , [, , "NA", "NA"], , , [, , "1\\d{3,4}|800[2-9]\\d{3}", "\\d{4,7}", , , "8002123"],
            [, , "1(?:2[01245]|3[0-6]|4[1-489]|5[0-59]|6[1-46-9]|7[0-27-9]|8[189]|9[012])\\d{1,2}", "\\d{4,5}", , , "12123"], , , [, , "NA", "NA"]
        ],
        EG: [, [, , "1\\d{4,9}|[2456]\\d{8}|3\\d{7}|[89]\\d{8,9}", "\\d{5,10}"],
            [, , "(?:1(?:3[23]\\d|5(?:[23]|9\\d))|2[2-4]\\d{2}|3\\d{2}|4(?:0[2-5]|[578][23]|64)\\d|5(?:0[2-7]|[57][23])\\d|6[24-689]3\\d|8(?:2[2-57]|4[26]|6[237]|8[2-4])\\d|9(?:2[27]|3[24]|52|6[2356]|7[2-4])\\d)\\d{5}|1[69]\\d{3}", "\\d{5,9}", , , "234567890"],
            [, , "1(?:0[0-269]|1[0-245]|2[0-278])\\d{7}", "\\d{10}", , , "1001234567"],
            [, , "800\\d{7}", "\\d{10}", , , "8001234567"],
            [, , "900\\d{7}", "\\d{10}", , , "9001234567"],
            [, , "NA", "NA"],
            [, , "NA", "NA"],
            [, , "NA", "NA"], "EG", 20, "00", "0", , , "0", , , , [
                [, "(\\d)(\\d{7,8})", "$1 $2", ["[23]"], "0$1"],
                [, "(\\d{3})(\\d{3})(\\d{4})", "$1 $2 $3", ["1[012]|[89]00"], "0$1"],
                [, "(\\d{2})(\\d{6,7})", "$1 $2", ["1[35]|[4-6]|[89][2-9]"], "0$1"]
            ], , [, , "NA", "NA"], , , [, , "NA", "NA"],
            [, , "NA", "NA"], , , [, , "NA", "NA"]
        ],
        EH: [, [, , "[5689]\\d{8}", "\\d{9}"],
            [, , "528[89]\\d{5}", "\\d{9}", , , "528812345"],
            [, , "6(?:0[0-8]|[12-79]\\d|8[017])\\d{6}", "\\d{9}", , , "650123456"],
            [, , "80\\d{7}", "\\d{9}", , , "801234567"],
            [, , "89\\d{7}", "\\d{9}", , , "891234567"],
            [, , "NA", "NA"],
            [, , "NA", "NA"],
            [, , "NA", "NA"], "EH", 212, "00", "0", , , "0", , , , , , [, , "NA", "NA"], , "528[89]", [, , "NA", "NA"],
            [, , "NA", "NA"], , , [, , "NA", "NA"]
        ],
        ER: [, [, , "[178]\\d{6}", "\\d{6,7}"],
            [, , "1(?:1[12568]|20|40|55|6[146])\\d{4}|8\\d{6}", "\\d{6,7}", , , "8370362"],
            [, , "17[1-3]\\d{4}|7\\d{6}", "\\d{7}", , , "7123456"],
            [, , "NA", "NA"],
            [, , "NA", "NA"],
            [, , "NA", "NA"],
            [, , "NA", "NA"],
            [, , "NA", "NA"], "ER", 291, "00", "0", , , "0", , , , [
                [, "(\\d)(\\d{3})(\\d{3})", "$1 $2 $3", , "0$1"]
            ], , [, , "NA", "NA"], , , [, , "NA", "NA"],
            [, , "NA", "NA"], , , [, , "NA", "NA"]
        ],
        ES: [, [, , "[5-9]\\d{8}", "\\d{9}"],
            [, , "8(?:[13]0|[28][0-8]|[47][1-9]|5[01346-9]|6[0457-9])\\d{6}|9(?:[1238][0-8]\\d{6}|4[1-9]\\d{6}|5\\d{7}|6(?:[0-8]\\d{6}|9(?:0(?:[0-57-9]\\d{4}|6(?:0[0-8]|1[1-9]|[2-9]\\d)\\d{2})|[1-9]\\d{5}))|7(?:[124-9]\\d{2}|3(?:[0-8]\\d|9[1-9]))\\d{4})", "\\d{9}", , , "810123456"],
            [, , "(?:6\\d{6}|7[1-4]\\d{5}|9(?:6906(?:09|10)|7390\\d{2}))\\d{2}", "\\d{9}", , , "612345678"],
            [, , "[89]00\\d{6}", "\\d{9}", , , "800123456"],
            [, , "80[367]\\d{6}", "\\d{9}", , , "803123456"],
            [, , "90[12]\\d{6}", "\\d{9}", , , "901123456"],
            [, , "70\\d{7}", "\\d{9}", , , "701234567"],
            [, , "NA", "NA"], "ES", 34, "00", , , , , , , , [
                [, "([89]00)(\\d{3})(\\d{3})", "$1 $2 $3", ["[89]00"]],
                [, "([5-9]\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[568]|[79][0-8]"]]
            ], , [, , "NA", "NA"], , , [, , "NA", "NA"],
            [, , "51\\d{7}", "\\d{9}", , , "511234567"], , , [, , "NA", "NA"]
        ],
        ET: [, [, , "[1-59]\\d{8}", "\\d{7,9}"],
            [, , "(?:11(?:1(?:1[124]|2[2-57]|3[1-5]|5[5-8]|8[6-8])|2(?:13|3[6-8]|5[89]|7[05-9]|8[2-6])|3(?:2[01]|3[0-289]|4[1289]|7[1-4]|87)|4(?:1[69]|3[2-49]|4[0-3]|6[5-8])|5(?:1[57]|44|5[0-4])|6(?:18|2[69]|4[5-7]|5[1-5]|6[0-59]|8[015-8]))|2(?:2(?:11[1-9]|22[0-7]|33\\d|44[1467]|66[1-68])|5(?:11[124-6]|33[2-8]|44[1467]|55[14]|66[1-3679]|77[124-79]|880))|3(?:3(?:11[0-46-8]|22[0-6]|33[0134689]|44[04]|55[0-6]|66[01467])|4(?:44[0-8]|55[0-69]|66[0-3]|77[1-5]))|4(?:6(?:22[0-24-7]|33[1-5]|44[13-69]|55[14-689]|660|88[1-4])|7(?:11[1-9]|22[1-9]|33[13-7]|44[13-6]|55[1-689]))|5(?:7(?:227|55[05]|(?:66|77)[14-8])|8(?:11[149]|22[013-79]|33[0-68]|44[013-8]|550|66[1-5]|77\\d)))\\d{4}", "\\d{7,9}", , , "111112345"],
            [, , "9(?:[1-3]\\d|5[89])\\d{6}", "\\d{9}", , , "911234567"],
            [, , "NA", "NA"],
            [, , "NA", "NA"],
            [, , "NA", "NA"],
            [, , "NA", "NA"],
            [, , "NA", "NA"], "ET", 251, "00", "0", , , "0", , , , [
                [, "([1-59]\\d)(\\d{3})(\\d{4})", "$1 $2 $3", , "0$1"]
            ], , [, , "NA", "NA"], , , [, , "NA", "NA"],
            [, , "NA", "NA"], , , [, , "NA", "NA"]
        ],
        FI: [, [, , "1\\d{4,11}|[2-9]\\d{4,10}", "\\d{5,12}"],
            [, , "1(?:[3569][1-8]\\d{3,9}|[47]\\d{5,10})|2[1-8]\\d{3,9}|3(?:[1-8]\\d{3,9}|9\\d{4,8})|[5689][1-8]\\d{3,9}", "\\d{5,12}", , , "1312345678"],
            [, , "4\\d{5,10}|50\\d{4,8}", "\\d{6,11}", , , "412345678"],
            [, , "800\\d{4,7}", "\\d{7,10}", , , "8001234567"],
            [, , "[67]00\\d{5,6}", "\\d{8,9}", , , "600123456"],
            [, , "NA", "NA"],
            [, , "NA", "NA"],
            [, , "NA", "NA"], "FI", 358, "00|99[049]", "0", , , "0", , , , [
                [, "(\\d{3})(\\d{3,7})", "$1 $2", ["(?:[1-3]00|[6-8]0)"], "0$1"],
                [, "(116\\d{3})", "$1", ["116"], "$1"],
                [, "(\\d{2})(\\d{4,10})", "$1 $2", ["[14]|2[09]|50|7[135]"], "0$1"],
                [, "(\\d)(\\d{4,11})", "$1 $2", ["[25689][1-8]|3"], "0$1"]
            ], , [, , "NA", "NA"], 1, , [, , "[13]00\\d{3,7}|2(?:0(?:0\\d{3,7}|2[023]\\d{1,6}|9[89]\\d{1,6}))|60(?:[12]\\d{5,6}|6\\d{7})|7(?:1\\d{7}|3\\d{8}|5[03-9]\\d{2,7})", "\\d{5,10}", , , "100123"],
            [, , "[13]0\\d{4,8}|2(?:0(?:[016-8]\\d{3,7}|[2-59]\\d{2,7})|9\\d{4,8})|60(?:[12]\\d{5,6}|6\\d{7})|7(?:1\\d{7}|3\\d{8}|5[03-9]\\d{2,7})", "\\d{5,10}", , , "10112345"], , , [, , "NA", "NA"]
        ],
        FJ: [, [, , "[36-9]\\d{6}|0\\d{10}", "\\d{7}(?:\\d{4})?"],
            [, , "(?:3[0-5]|6[25-7]|8[58])\\d{5}", "\\d{7}", , , "3212345"],
            [, , "(?:7[0-8]|8[034679]|9\\d)\\d{5}", "\\d{7}", , , "7012345"],
            [, , "0800\\d{7}", "\\d{11}", , , "08001234567"],
            [, , "NA", "NA"],
            [, , "NA", "NA"],
            [, , "NA", "NA"],
            [, , "NA", "NA"], "FJ", 679, "0(?:0|52)", , , , , , "00", , [
                [, "(\\d{3})(\\d{4})", "$1 $2", ["[36-9]"]],
                [, "(\\d{4})(\\d{3})(\\d{4})", "$1 $2 $3", ["0"]]
            ], , [, , "NA", "NA"], , , [, , "NA", "NA"],
            [, , "NA", "NA"], 1, , [, , "NA", "NA"]
        ],
        FK: [, [, , "[2-7]\\d{4}", "\\d{5}"],
            [, , "[2-47]\\d{4}", "\\d{5}", , , "31234"],
            [, , "[56]\\d{4}", "\\d{5}", , , "51234"],
            [, , "NA", "NA"],
            [, , "NA", "NA"],
            [, , "NA", "NA"],
            [, , "NA", "NA"],
            [, , "NA", "NA"], "FK", 500, "00", , , , , , , , , , [, , "NA", "NA"], , , [, , "NA", "NA"],
            [, , "NA", "NA"], , , [, , "NA", "NA"]
        ],
        FM: [, [, , "[39]\\d{6}", "\\d{7}"],
            [, , "3[2357]0[1-9]\\d{3}|9[2-6]\\d{5}", "\\d{7}", , , "3201234"],
            [, , "3[2357]0[1-9]\\d{3}|9[2-7]\\d{5}", "\\d{7}", , , "3501234"],
            [, , "NA", "NA"],
            [, , "NA", "NA"],
            [, , "NA", "NA"],
            [, , "NA", "NA"],
            [, , "NA", "NA"], "FM", 691, "00", , , , , , , , [
                [, "(\\d{3})(\\d{4})", "$1 $2"]
            ], , [, , "NA", "NA"], , , [, , "NA", "NA"],
            [, , "NA", "NA"], , , [, , "NA", "NA"]
        ],
        FO: [, [, , "[2-9]\\d{5}", "\\d{6}"],
            [, , "(?:20|[3-4]\\d|8[19])\\d{4}", "\\d{6}", , , "201234"],
            [, , "(?:2[1-9]|5\\d|7[1-79])\\d{4}", "\\d{6}", , , "211234"],
            [, , "80[257-9]\\d{3}", "\\d{6}", , , "802123"],
            [, , "90(?:[1345][15-7]|2[125-7]|99)\\d{2}", "\\d{6}", , , "901123"],
            [, , "NA", "NA"],
            [, , "NA", "NA"],
            [, , "(?:6[0-36]|88)\\d{4}", "\\d{6}", , , "601234"], "FO", 298, "00", , , , "(10(?:01|[12]0|88))", , , , [
                [, "(\\d{6})", "$1", , , "$CC $1"]
            ], , [, , "NA", "NA"], , , [, , "NA", "NA"],
            [, , "NA", "NA"], , , [, , "NA", "NA"]
        ],
        FR: [, [, , "[1-9]\\d{8}", "\\d{9}"],
            [, , "[1-5]\\d{8}", "\\d{9}", , , "123456789"],
            [, , "6\\d{8}|7(?:00\\d{6}|[3-9]\\d{7})", "\\d{9}", , , "612345678"],
            [, , "80\\d{7}", "\\d{9}", , , "801234567"],
            [, , "89[1-37-9]\\d{6}", "\\d{9}", , , "891123456"],
            [, , "8(?:1[019]|2[0156]|84|90)\\d{6}", "\\d{9}", , , "810123456"],
            [, , "NA", "NA"],
            [, , "9\\d{8}", "\\d{9}", , , "912345678"], "FR", 33, "00", "0", , , "0", , , , [
                [, "([1-79])(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4 $5", ["[1-79]"], "0$1"],
                [, "(1\\d{2})(\\d{3})", "$1 $2", ["11"], "$1"],
                [, "(8\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["8"], "0 $1"]
            ],
            [
                [, "([1-79])(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4 $5", ["[1-79]"], "0$1"],
                [, "(8\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["8"], "0 $1"]
            ],
            [, , "NA", "NA"], , , [, , "NA", "NA"],
            [, , "NA", "NA"], , , [, , "NA", "NA"]
        ],
        GA: [, [, , "0?\\d{7}", "\\d{7,8}"],
            [, , "01\\d{6}", "\\d{8}", , , "01441234"],
            [, , "0?[2-7]\\d{6}", "\\d{7,8}", , , "06031234"],
            [, , "NA", "NA"],
            [, , "NA", "NA"],
            [, , "NA", "NA"],
            [, , "NA", "NA"],
            [, , "NA", "NA"], "GA", 241, "00", , , , , , , , [
                [, "(\\d)(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[2-7]"], "0$1"],
                [, "(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["0"]]
            ], , [, , "NA", "NA"], , , [, , "NA", "NA"],
            [, , "NA", "NA"], 1, , [, , "NA", "NA"]
        ],
        GB: [, [, , "\\d{7,10}", "\\d{4,10}"],
            [, , "2(?:0[01378]|3[0189]|4[017]|8[0-46-9]|9[012])\\d{7}|1(?:(?:1(?:3[0-48]|[46][0-4]|5[012789]|7[0-49]|8[01349])|21[0-7]|31[0-8]|[459]1\\d|61[0-46-9]))\\d{6}|1(?:2(?:0[024-9]|2[3-9]|3[3-79]|4[1-689]|[58][02-9]|6[0-4789]|7[013-9]|9\\d)|3(?:0\\d|[25][02-9]|3[02-579]|[468][0-46-9]|7[1235679]|9[24578])|4(?:0[03-9]|[28][02-5789]|[37]\\d|4[02-69]|5[0-8]|[69][0-79])|5(?:0[1235-9]|2[024-9]|3[015689]|4[02-9]|5[03-9]|6\\d|7[0-35-9]|8[0-468]|9[0-5789])|6(?:0[034689]|2[0-35689]|[38][013-9]|4[1-467]|5[0-69]|6[13-9]|7[0-8]|9[0124578])|7(?:0[0246-9]|2\\d|3[023678]|4[03-9]|5[0-46-9]|6[013-9]|7[0-35-9]|8[024-9]|9[02-9])|8(?:0[35-9]|2[1-5789]|3[02-578]|4[0-578]|5[124-9]|6[2-69]|7\\d|8[02-9]|9[02569])|9(?:0[02-589]|2[02-689]|3[1-5789]|4[2-9]|5[0-579]|6[234789]|7[0124578]|8\\d|9[2-57]))\\d{6}|1(?:2(?:0(?:46[1-4]|87[2-9])|545[1-79]|76(?:2\\d|3[1-8]|6[1-6])|9(?:7(?:2[0-4]|3[2-5])|8(?:2[2-8]|7[0-4789]|8[345])))|3(?:638[2-5]|647[23]|8(?:47[04-9]|64[015789]))|4(?:044[1-7]|20(?:2[23]|8\\d)|6(?:0(?:30|5[2-57]|6[1-8]|7[2-8])|140)|8(?:052|87[123]))|5(?:24(?:3[2-79]|6\\d)|276\\d|6(?:26[06-9]|686))|6(?:06(?:4\\d|7[4-79])|295[567]|35[34]\\d|47(?:24|61)|59(?:5[08]|6[67]|74)|955[0-4])|7(?:26(?:6[13-9]|7[0-7])|442\\d|50(?:2[0-3]|[3-68]2|76))|8(?:27[56]\\d|37(?:5[2-5]|8[239])|84(?:3[2-58]))|9(?:0(?:0(?:6[1-8]|85)|52\\d)|3583|4(?:66[1-8]|9(?:2[01]|81))|63(?:23|3[1-4])|9561))\\d{3}|176888[234678]\\d{2}|16977[23]\\d{3}", "\\d{4,10}", , , "1212345678"],
            [, , "7(?:[1-4]\\d\\d|5(?:0[0-8]|[13-9]\\d|2[0-35-9])|7(?:0[1-9]|[1-7]\\d|8[02-9]|9[0-689])|8(?:[014-9]\\d|[23][0-8])|9(?:[04-9]\\d|1[02-9]|2[0-35-9]|3[0-689]))\\d{6}", "\\d{10}", , , "7400123456"],
            [, , "80(?:0(?:1111|\\d{6,7})|8\\d{7})|500\\d{6}", "\\d{7}(?:\\d{2,3})?", , , "8001234567"],
            [, , "(?:87[123]|9(?:[01]\\d|8[2349]))\\d{7}", "\\d{10}", , , "9012345678"],
            [, , "8(?:4(?:5464\\d|[2-5]\\d{7})|70\\d{7})", "\\d{7}(?:\\d{3})?", , , "8431234567"],
            [, , "70\\d{8}", "\\d{10}", , , "7012345678"],
            [, , "56\\d{8}", "\\d{10}", , , "5612345678"], "GB", 44, "00", "0", " x", , "0", , , , [
                [, "(\\d{2})(\\d{4})(\\d{4})", "$1 $2 $3", ["2|5[56]|7(?:0|6[013-9])", "2|5[56]|7(?:0|6(?:[013-9]|2[0-35-9]))"], "0$1"],
                [, "(\\d{3})(\\d{3})(\\d{4})", "$1 $2 $3", ["1(?:1|\\d1)|3|9[018]"], "0$1"],
                [, "(\\d{5})(\\d{4,5})", "$1 $2", ["1(?:38|5[23]|69|76|94)", "1(?:387|5(?:24|39)|697|768|946)", "1(?:3873|5(?:242|39[456])|697[347]|768[347]|9467)"], "0$1"],
                [, "(1\\d{3})(\\d{5,6})", "$1 $2", ["1"], "0$1"],
                [, "(7\\d{3})(\\d{6})", "$1 $2", ["7(?:[1-5789]|62)", "7(?:[1-5789]|624)"], "0$1"],
                [, "(800)(\\d{4})", "$1 $2", ["800", "8001", "80011", "800111", "8001111"], "0$1"],
                [, "(845)(46)(4\\d)", "$1 $2 $3", ["845", "8454", "84546", "845464"], "0$1"],
                [, "(8\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["8(?:4[2-5]|7[0-3])"], "0$1"],
                [, "(80\\d)(\\d{3})(\\d{4})", "$1 $2 $3", ["80"], "0$1"],
                [, "([58]00)(\\d{6})", "$1 $2", ["[58]00"], "0$1"]
            ], , [, , "76(?:0[012]|2[356]|4[0134]|5[49]|6[0-369]|77|81|9[39])\\d{6}", "\\d{10}", , , "7640123456"], 1, , [, , "NA", "NA"],
            [, , "(?:3[0347]|55)\\d{8}", "\\d{10}", , , "5512345678"], , , [, , "NA", "NA"]
        ],
        GD: [, [, , "[4589]\\d{9}", "\\d{7}(?:\\d{3})?"],
            [, , "473(?:2(?:3[0-2]|69)|3(?:2[89]|86)|4(?:[06]8|3[5-9]|4[0-49]|5[5-79]|68|73|90)|63[68]|7(?:58|84)|800|938)\\d{4}", "\\d{7}(?:\\d{3})?", , , "4732691234"],
            [, , "473(?:4(?:0[2-79]|1[04-9]|20|58)|5(?:2[01]|3[3-8])|901)\\d{4}", "\\d{10}", , , "4734031234"],
            [, , "8(?:00|44|55|66|77|88)[2-9]\\d{6}", "\\d{10}", , , "8002123456"],
            [, , "900[2-9]\\d{6}", "\\d{10}", , , "9002123456"],
            [, , "NA", "NA"],
            [, , "5(?:00|33|44|66|77)[2-9]\\d{6}", "\\d{10}", , , "5002345678"],
            [, , "NA", "NA"], "GD", 1, "011", "1", , , "1", , , , , , [, , "NA", "NA"], , "473", [, , "NA", "NA"],
            [, , "NA", "NA"], , , [, , "NA", "NA"]
        ],
        GE: [, [, , "[34578]\\d{8}", "\\d{6,9}"],
            [, , "(?:3(?:[256]\\d|4[124-9]|7[0-4])|4(?:1\\d|2[2-7]|3[1-79]|4[2-8]|7[239]|9[1-7]))\\d{6}", "\\d{6,9}", , , "322123456"],
            [, , "5(?:14|5[01578]|68|7[0147-9]|9[0-35-9])\\d{6}", "\\d{9}", , , "555123456"],
            [, , "800\\d{6}", "\\d{9}", , , "800123456"],
            [, , "NA", "NA"],
            [, , "NA", "NA"],
            [, , "NA", "NA"],
            [, , "706\\d{6}", "\\d{9}", , , "706123456"], "GE", 995, "00", "0", , , "0", , , , [
                [, "(\\d{3})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[348]"], "0$1"],
                [, "(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["7"], "0$1"],
                [, "(\\d{3})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["5"], "$1"]
            ], , [, , "NA", "NA"], , , [, , "706\\d{6}", "\\d{9}", , , "706123456"],
            [, , "NA", "NA"], , , [, , "NA", "NA"]
        ],
        GF: [, [, , "[56]\\d{8}", "\\d{9}"],
            [, , "594(?:10|2[012457-9]|3[0-57-9]|4[3-9]|5[7-9]|6[0-3]|9[014])\\d{4}", "\\d{9}", , , "594101234"],
            [, , "694(?:[04][0-7]|1[0-5]|3[018]|[29]\\d)\\d{4}", "\\d{9}", , , "694201234"],
            [, , "NA", "NA"],
            [, , "NA", "NA"],
            [, , "NA", "NA"],
            [, , "NA", "NA"],
            [, , "NA", "NA"], "GF", 594, "00", "0", , , "0", , , , [
                [, "(\\d{3})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", , "0$1"]
            ], , [, , "NA", "NA"], , , [, , "NA", "NA"],
            [, , "NA", "NA"], , , [, , "NA", "NA"]
        ],
        GG: [, [, , "[135789]\\d{6,9}", "\\d{6,10}"],
            [, , "1481\\d{6}", "\\d{6,10}", , , "1481456789"],
            [, , "7(?:781|839|911)\\d{6}", "\\d{10}", , , "7781123456"],
            [, , "80(?:0(?:1111|\\d{6,7})|8\\d{7})|500\\d{6}", "\\d{7}(?:\\d{2,3})?", , , "8001234567"],
            [, , "(?:87[123]|9(?:[01]\\d|8[0-3]))\\d{7}", "\\d{10}", , , "9012345678"],
            [, , "8(?:4(?:5464\\d|[2-5]\\d{7})|70\\d{7})", "\\d{7}(?:\\d{3})?", , , "8431234567"],
            [, , "70\\d{8}", "\\d{10}", , , "7012345678"],
            [, , "56\\d{8}", "\\d{10}", , , "5612345678"], "GG", 44, "00", "0", " x", , "0", , , , , , [, , "76(?:0[012]|2[356]|4[0134]|5[49]|6[0-369]|77|81|9[39])\\d{6}", "\\d{10}", , , "7640123456"], , , [, , "NA", "NA"],
            [, , "(?:3[0347]|55)\\d{8}", "\\d{10}", , , "5512345678"], , , [, , "NA", "NA"]
        ],
        GH: [, [, , "[235]\\d{8}|8\\d{7}", "\\d{7,9}"],
            [, , "3(?:0[237]\\d|[167](?:2[0-6]|7\\d)|2(?:2[0-5]|7\\d)|3(?:2[0-3]|7\\d)|4(?:2[013-9]|3[01]|7\\d)|5(?:2[0-7]|7\\d)|8(?:2[0-2]|7\\d)|9(?:20|7\\d))\\d{5}", "\\d{7,9}", , , "302345678"],
            [, , "(?:2[034678]\\d|5(?:[047]\\d|5[3-6]|6[01]))\\d{6}", "\\d{9}", , , "231234567"],
            [, , "800\\d{5}", "\\d{8}", , , "80012345"],
            [, , "NA", "NA"],
            [, , "NA", "NA"],
            [, , "NA", "NA"],
            [, , "NA", "NA"], "GH", 233, "00", "0", , , "0", , , , [
                [, "(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["[235]"], "0$1"],
                [, "(\\d{3})(\\d{5})", "$1 $2", ["8"], "0$1"]
            ], , [, , "NA", "NA"], , , [, , "800\\d{5}", "\\d{8}", , , "80012345"],
            [, , "NA", "NA"], , , [, , "NA", "NA"]
        ],
        GI: [, [, , "[2568]\\d{7}", "\\d{8}"],
            [, , "2(?:00\\d|1(?:6[24-7]|9\\d)|2(?:00|2[2457]))\\d{4}", "\\d{8}", , , "20012345"],
            [, , "(?:5[46-8]|62)\\d{6}", "\\d{8}", , , "57123456"],
            [, , "80\\d{6}", "\\d{8}", , , "80123456"],
            [, , "8[1-689]\\d{6}", "\\d{8}", , , "88123456"],
            [, , "87\\d{6}", "\\d{8}", , , "87123456"],
            [, , "NA", "NA"],
            [, , "NA", "NA"], "GI", 350, "00", , , , , , , , [
                [, "(\\d{3})(\\d{5})", "$1 $2", ["2"]]
            ], , [, , "NA", "NA"], , , [, , "NA", "NA"],
            [, , "NA", "NA"], , , [, , "NA", "NA"]
        ],
        GL: [, [, , "[1-689]\\d{5}", "\\d{6}"],
            [, , "(?:19|3[1-6]|6[14689]|8[14-79]|9\\d)\\d{4}", "\\d{6}", , , "321000"],
            [, , "[245][2-9]\\d{4}", "\\d{6}", , , "221234"],
            [, , "80\\d{4}", "\\d{6}", , , "801234"],
            [, , "NA", "NA"],
            [, , "NA", "NA"],
            [, , "NA", "NA"],
            [, , "3[89]\\d{4}", "\\d{6}", , , "381234"], "GL", 299, "00", , , , , , , , [
                [, "(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3"]
            ], , [, , "NA", "NA"], , , [, , "NA", "NA"],
            [, , "NA", "NA"], , , [, , "NA", "NA"]
        ],
        GM: [, [, , "[2-9]\\d{6}", "\\d{7}"],
            [, , "(?:4(?:[23]\\d{2}|4(?:1[024679]|[6-9]\\d))|5(?:54[0-7]|6(?:[67]\\d)|7(?:1[04]|2[035]|3[58]|48))|8\\d{3})\\d{3}", "\\d{7}", , , "5661234"],
            [, , "(?:2[0-6]|[3679]\\d)\\d{5}", "\\d{7}", , , "3012345"],
            [, , "NA", "NA"],
            [, , "NA", "NA"],
            [, , "NA", "NA"],
            [, , "NA", "NA"],
            [, , "NA", "NA"], "GM", 220, "00", , , , , , , , [
                [, "(\\d{3})(\\d{4})", "$1 $2"]
            ], , [, , "NA", "NA"], , , [, , "NA", "NA"],
            [, , "NA", "NA"], , , [, , "NA", "NA"]
        ],
        GN: [, [, , "[367]\\d{7,8}", "\\d{8,9}"],
            [, , "30(?:24|3[12]|4[1-35-7]|5[13]|6[189]|[78]1|9[1478])\\d{4}", "\\d{8}", , , "30241234"],
            [, , "6[02356]\\d{7}", "\\d{9}", , , "601123456"],
            [, , "NA", "NA"],
            [, , "NA", "NA"],
            [, , "NA", "NA"],
            [, , "NA", "NA"],
            [, , "722\\d{6}", "\\d{9}", , , "722123456"], "GN", 224, "00", , , , , , , , [
                [, "(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["3"]],
                [, "(\\d{3})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[67]"]]
            ], , [, , "NA", "NA"], , , [, , "NA", "NA"],
            [, , "NA", "NA"], , , [, , "NA", "NA"]
        ],
        GP: [, [, , "[56]\\d{8}", "\\d{9}"],
            [, , "590(?:0[13468]|1[012]|2[0-68]|3[28]|4[0-8]|5[579]|6[0189]|70|8[0-689]|9\\d)\\d{4}", "\\d{9}", , , "590201234"],
            [, , "690(?:0[0-7]|[1-9]\\d)\\d{4}", "\\d{9}", , , "690301234"],
            [, , "NA", "NA"],
            [, , "NA", "NA"],
            [, , "NA", "NA"],
            [, , "NA", "NA"],
            [, , "NA", "NA"], "GP", 590, "00", "0", , , "0", , , , [
                [, "([56]90)(\\d{2})(\\d{4})", "$1 $2-$3", , "0$1"]
            ], , [, , "NA", "NA"], 1, , [, , "NA", "NA"],
            [, , "NA", "NA"], , , [, , "NA", "NA"]
        ],
        GQ: [, [, , "[23589]\\d{8}", "\\d{9}"],
            [, , "3(?:3(?:3\\d[7-9]|[0-24-9]\\d[46])|5\\d{2}[7-9])\\d{4}", "\\d{9}", , , "333091234"],
            [, , "(?:222|551)\\d{6}", "\\d{9}", , , "222123456"],
            [, , "80\\d[1-9]\\d{5}", "\\d{9}", , , "800123456"],
            [, , "90\\d[1-9]\\d{5}", "\\d{9}", , , "900123456"],
            [, , "NA", "NA"],
            [, , "NA", "NA"],
            [, , "NA", "NA"], "GQ", 240, "00", , , , , , , , [
                [, "(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["[235]"]],
                [, "(\\d{3})(\\d{6})", "$1 $2", ["[89]"]]
            ], , [, , "NA", "NA"], , , [, , "NA", "NA"],
            [, , "NA", "NA"], , , [, , "NA", "NA"]
        ],
        GR: [, [, , "[26-9]\\d{9}", "\\d{10}"],
            [, , "2(?:1\\d{2}|2(?:2[1-46-9]|3[1-8]|4[1-7]|5[1-4]|6[1-8]|7[1-5]|[89][1-9])|3(?:1\\d|2[1-57]|[35][1-3]|4[13]|7[1-7]|8[124-6]|9[1-79])|4(?:1\\d|2[1-8]|3[1-4]|4[13-5]|6[1-578]|9[1-5])|5(?:1\\d|[29][1-4]|3[1-5]|4[124]|5[1-6])|6(?:1\\d|3[1245]|4[1-7]|5[13-9]|[269][1-6]|7[14]|8[1-5])|7(?:1\\d|2[1-5]|3[1-6]|4[1-7]|5[1-57]|6[135]|9[125-7])|8(?:1\\d|2[1-5]|[34][1-4]|9[1-57]))\\d{6}", "\\d{10}", , , "2123456789"],
            [, , "69\\d{8}", "\\d{10}", , , "6912345678"],
            [, , "800\\d{7}", "\\d{10}", , , "8001234567"],
            [, , "90[19]\\d{7}", "\\d{10}", , , "9091234567"],
            [, , "8(?:0[16]|12|25)\\d{7}", "\\d{10}", , , "8011234567"],
            [, , "70\\d{8}", "\\d{10}", , , "7012345678"],
            [, , "NA", "NA"], "GR", 30, "00", , , , , , , , [
                [, "([27]\\d)(\\d{4})(\\d{4})", "$1 $2 $3", ["21|7"]],
                [, "(\\d{3})(\\d{3})(\\d{4})", "$1 $2 $3", ["2[2-9]1|[689]"]],
                [, "(2\\d{3})(\\d{6})", "$1 $2", ["2[2-9][02-9]"]]
            ], , [, , "NA", "NA"], , , [, , "NA", "NA"],
            [, , "NA", "NA"], , , [, , "NA", "NA"]
        ],
        GT: [, [, , "[2-7]\\d{7}|1[89]\\d{9}", "\\d{8}(?:\\d{3})?"],
            [, , "[267][2-9]\\d{6}", "\\d{8}", , , "22456789"],
            [, , "[345]\\d{7}", "\\d{8}", , , "51234567"],
            [, , "18[01]\\d{8}", "\\d{11}", , , "18001112222"],
            [, , "19\\d{9}", "\\d{11}", , , "19001112222"],
            [, , "NA", "NA"],
            [, , "NA", "NA"],
            [, , "NA", "NA"], "GT", 502, "00", , , , , , , , [
                [, "(\\d{4})(\\d{4})", "$1 $2", ["[2-7]"]],
                [, "(\\d{4})(\\d{3})(\\d{4})", "$1 $2 $3", ["1"]]
            ], , [, , "NA", "NA"], , , [, , "NA", "NA"],
            [, , "NA", "NA"], , , [, , "NA", "NA"]
        ],
        GU: [, [, , "[5689]\\d{9}", "\\d{7}(?:\\d{3})?"],
            [, , "671(?:3(?:00|3[39]|4[349]|55|6[26])|4(?:56|7[1-9]|8[236-9])|5(?:55|6[2-5]|88)|6(?:3[2-578]|4[24-9]|5[34]|78|8[5-9])|7(?:[079]7|2[0167]|3[45]|8[789])|8(?:[2-5789]8|6[48])|9(?:2[29]|6[79]|7[179]|8[789]|9[78]))\\d{4}", "\\d{7}(?:\\d{3})?", , , "6713001234"],
            [, , "671(?:3(?:00|3[39]|4[349]|55|6[26])|4(?:56|7[1-9]|8[236-9])|5(?:55|6[2-5]|88)|6(?:3[2-578]|4[24-9]|5[34]|78|8[5-9])|7(?:[079]7|2[0167]|3[45]|8[789])|8(?:[2-5789]8|6[48])|9(?:2[29]|6[79]|7[179]|8[789]|9[78]))\\d{4}", "\\d{7}(?:\\d{3})?", , , "6713001234"],
            [, , "8(?:00|44|55|66|77|88)[2-9]\\d{6}", "\\d{10}", , , "8002123456"],
            [, , "900[2-9]\\d{6}", "\\d{10}", , , "9002123456"],
            [, , "NA", "NA"],
            [, , "5(?:00|33|44|66|77)[2-9]\\d{6}", "\\d{10}", , , "5002345678"],
            [, , "NA", "NA"], "GU", 1, "011", "1", , , "1", , , 1, , , [, , "NA", "NA"], , "671", [, , "NA", "NA"],
            [, , "NA", "NA"], , , [, , "NA", "NA"]
        ],
        GW: [, [, , "(?:4(?:0\\d{5}|4\\d{7})|9\\d{8})", "\\d{7,9}"],
            [, , "443(?:2[0125]|3[1245]|4[12]|5[1-4]|70|9[1-467])\\d{4}", "\\d{7,9}", , , "443201234"],
            [, , "9(?:55\\d|6(?:6\\d|9[012])|77\\d)\\d{5}", "\\d{7,9}", , , "955012345"],
            [, , "NA", "NA"],
            [, , "NA", "NA"],
            [, , "NA", "NA"],
            [, , "NA", "NA"],
            [, , "40\\d{5}", "\\d{7,9}", , , "4012345"], "GW", 245, "00", , , , , , , , [
                [, "(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["44|9[567]"]],
                [, "(\\d{3})(\\d{4})", "$1 $2", ["40"]]
            ], , [, , "NA", "NA"], , , [, , "NA", "NA"],
            [, , "NA", "NA"], , , [, , "NA", "NA"]
        ],
        GY: [, [, , "[2-4679]\\d{6}", "\\d{7}"],
            [, , "(?:2(?:1[6-9]|2[0-35-9]|3[1-4]|5[3-9]|6\\d|7[0-24-79])|3(?:2[25-9]|3\\d)|4(?:4[0-24]|5[56])|77[1-57])\\d{4}", "\\d{7}", , , "2201234"],
            [, , "6\\d{6}", "\\d{7}", , , "6091234"],
            [, , "(?:289|862)\\d{4}", "\\d{7}", , , "2891234"],
            [, , "9008\\d{3}", "\\d{7}", , , "9008123"],
            [, , "NA", "NA"],
            [, , "NA", "NA"],
            [, , "NA", "NA"], "GY", 592, "001", , , , , , , , [
                [, "(\\d{3})(\\d{4})", "$1 $2"]
            ], , [, , "NA", "NA"], , , [, , "NA", "NA"],
            [, , "NA", "NA"], , , [, , "NA", "NA"]
        ],
        HK: [, [, , "[235-7]\\d{7}|8\\d{7,8}|9\\d{4,10}", "\\d{5,11}"],
            [, , "(?:[23]\\d|58)\\d{6}", "\\d{8}", , , "21234567"],
            [, , "(?:5[1-79]\\d|6\\d{2}|8[4-79]\\d|9(?:0[1-9]|[1-8]\\d))\\d{5}", "\\d{8}", , , "51234567"],
            [, , "800\\d{6}", "\\d{9}", , , "800123456"],
            [, , "900(?:[0-24-9]\\d{7}|3\\d{1,4})", "\\d{5,11}", , , "90012345678"],
            [, , "NA", "NA"],
            [, , "8[1-3]\\d{6}", "\\d{8}", , , "81123456"],
            [, , "NA", "NA"], "HK", 852, "00", , , , , , , , [
                [, "(\\d{4})(\\d{4})", "$1 $2", ["[235-7]|[89](?:0[1-9]|[1-9])"]],
                [, "(800)(\\d{3})(\\d{3})", "$1 $2 $3", ["800"]],
                [, "(900)(\\d{2})(\\d{3})(\\d{3})", "$1 $2 $3 $4", ["900"]],
                [, "(900)(\\d{2,5})", "$1 $2", ["900"]]
            ], , [, , "7\\d{7}", "\\d{8}", , , "71234567"], , , [, , "NA", "NA"],
            [, , "NA", "NA"], , , [, , "NA", "NA"]
        ],
        HN: [, [, , "[237-9]\\d{7}", "\\d{8}"],
            [, , "2(?:2(?:0[019]|1[1-36]|[23]\\d|4[056]|5[57]|7[01389]|8[0146-9]|9[012])|4(?:2[3-59]|3[13-689]|4[0-68]|5[1-35])|5(?:4[3-5]|5\\d|6[56]|74)|6(?:[056]\\d|34|4[0-378]|[78][0-8]|9[01])|7(?:6[46-9]|7[02-9]|8[34])|8(?:79|8[0-35789]|9[1-57-9]))\\d{4}", "\\d{8}", , , "22123456"],
            [, , "[37-9]\\d{7}", "\\d{8}", , , "91234567"],
            [, , "NA", "NA"],
            [, , "NA", "NA"],
            [, , "NA", "NA"],
            [, , "NA", "NA"],
            [, , "NA", "NA"], "HN", 504, "00", , , , , , , , [
                [, "(\\d{4})(\\d{4})", "$1-$2"]
            ], , [, , "NA", "NA"], , , [, , "NA", "NA"],
            [, , "NA", "NA"], , , [, , "NA", "NA"]
        ],
        HR: [, [, , "[1-7]\\d{5,8}|[89]\\d{6,11}", "\\d{6,12}"],
            [, , "1\\d{7}|(?:2[0-3]|3[1-5]|4[02-47-9]|5[1-3])\\d{6,7}", "\\d{6,9}", , , "12345678"],
            [, , "9(?:[1-9]\\d{6,10}|01\\d{6,9})", "\\d{8,12}", , , "912345678"],
            [, , "80[01]\\d{4,7}", "\\d{7,10}", , , "8001234567"],
            [, , "6(?:[01459]\\d{4,7})", "\\d{6,9}", , , "611234"],
            [, , "NA", "NA"],
            [, , "7[45]\\d{4,7}", "\\d{6,9}", , , "741234567"],
            [, , "NA", "NA"], "HR", 385, "00", "0", , , "0", , , , [
                [, "(1)(\\d{4})(\\d{3})", "$1 $2 $3", ["1"], "0$1"],
                [, "(6[09])(\\d{4})(\\d{3})", "$1 $2 $3", ["6[09]"], "0$1"],
                [, "([67]2)(\\d{3})(\\d{3,4})", "$1 $2 $3", ["[67]2"], "0$1"],
                [, "([2-5]\\d)(\\d{3})(\\d{3,4})", "$1 $2 $3", ["[2-5]"], "0$1"],
                [, "(9\\d)(\\d{3})(\\d{3,4})", "$1 $2 $3", ["9"], "0$1"],
                [, "(9\\d)(\\d{4})(\\d{4})", "$1 $2 $3", ["9"], "0$1"],
                [, "(9\\d)(\\d{3,4})(\\d{3})(\\d{3})", "$1 $2 $3 $4", ["9"], "0$1"],
                [, "(\\d{2})(\\d{2})(\\d{2,3})", "$1 $2 $3", ["6[0145]|7"], "0$1"],
                [, "(\\d{2})(\\d{3,4})(\\d{3})", "$1 $2 $3", ["6[0145]|7"], "0$1"],
                [, "(80[01])(\\d{2})(\\d{2,3})", "$1 $2 $3", ["8"], "0$1"],
                [, "(80[01])(\\d{3,4})(\\d{3})", "$1 $2 $3", ["8"], "0$1"]
            ], , [, , "NA", "NA"], , , [, , "NA", "NA"],
            [, , "[76]2\\d{6,7}", "\\d{8,9}", , , "62123456"], , , [, , "NA", "NA"]
        ],
        HT: [, [, , "[2-489]\\d{7}", "\\d{8}"],
            [, , "2(?:[248]\\d|5[1-5]|94)\\d{5}", "\\d{8}", , , "22453300"],
            [, , "(?:3[1-9]\\d|4\\d{2}|9(?:8[0-35]|9[5-9]))\\d{5}", "\\d{8}", , , "34101234"],
            [, , "8\\d{7}", "\\d{8}", , , "80012345"],
            [, , "NA", "NA"],
            [, , "NA", "NA"],
            [, , "NA", "NA"],
            [, , "98[89]\\d{5}", "\\d{8}", , , "98901234"], "HT", 509, "00", , , , , , , , [
                [, "(\\d{2})(\\d{2})(\\d{4})", "$1 $2 $3"]
            ], , [, , "NA", "NA"], , , [, , "NA", "NA"],
            [, , "NA", "NA"], , , [, , "NA", "NA"]
        ],
        HU: [, [, , "[1-9]\\d{7,8}", "\\d{6,9}"],
            [, , "(?:1\\d|2(?:1\\d|[2-9])|3(?:[2-7]|8\\d)|4[24-9]|5[2-79]|6[23689]|7(?:1\\d|[2-9])|8[2-57-9]|9[2-69])\\d{6}", "\\d{6,9}", , , "12345678"],
            [, , "(?:[257]0|3[01])\\d{7}", "\\d{9}", , , "201234567"],
            [, , "80\\d{6}", "\\d{8}", , , "80123456"],
            [, , "9[01]\\d{6}", "\\d{8}", , , "90123456"],
            [, , "40\\d{6}", "\\d{8}", , , "40123456"],
            [, , "NA", "NA"],
            [, , "NA", "NA"], "HU", 36, "00", "06", , , "06", , , , [
                [, "(1)(\\d{3})(\\d{4})", "$1 $2 $3", ["1"], "($1)"],
                [, "(\\d{2})(\\d{3})(\\d{3,4})", "$1 $2 $3", ["[2-9]"], "($1)"]
            ], , [, , "NA", "NA"], , , [, , "[48]0\\d{6}", "\\d{8}", , , "80123456"],
            [, , "NA", "NA"], , , [, , "NA", "NA"]
        ],
        ID: [, [, , "(?:[1-79]\\d{6,10}|8\\d{7,11})", "\\d{5,12}"],
            [, , "2(?:1(?:14\\d{3}|[0-8]\\d{6,7}|500\\d{3}|9\\d{6})|2\\d{6,8}|4\\d{7,8})|(?:2(?:[35][1-4]|6[0-8]|7[1-6]|8\\d|9[1-8])|3(?:1|[25][1-8]|3[1-68]|4[1-3]|6[1-3568]|7[0-469]|8\\d)|4(?:0[1-589]|1[01347-9]|2[0-36-8]|3[0-24-68]|43|5[1-378]|6[1-5]|7[134]|8[1245])|5(?:1[1-35-9]|2[25-8]|3[124-9]|4[1-3589]|5[1-46]|6[1-8])|6(?:19?|[25]\\d|3[1-69]|4[1-6])|7(?:02|[125][1-9]|[36]\\d|4[1-8]|7[0-36-9])|9(?:0[12]|1[013-8]|2[0-479]|5[125-8]|6[23679]|7[159]|8[01346]))\\d{5,8}", "\\d{5,11}", , , "612345678"],
            [, , "(?:2(?:1(?:3[145]|4[01]|5[1-469]|60|8[0359]|9\\d)|2(?:88|9[1256])|3[1-4]9|4(?:36|91)|5(?:1[349]|[2-4]9)|6[0-7]9|7(?:[1-36]9|4[39])|8[1-5]9|9[1-48]9)|3(?:19[1-3]|2[12]9|3[13]9|4(?:1[69]|39)|5[14]9|6(?:1[69]|2[89])|709)|4[13]19|5(?:1(?:19|8[39])|4[129]9|6[12]9)|6(?:19[12]|2(?:[23]9|77))|7(?:1[13]9|2[15]9|419|5(?:1[89]|29)|6[15]9|7[178]9))\\d{5,6}|8[1-35-9]\\d{7,10}", "\\d{9,12}", , , "812345678"],
            [, , "177\\d{6,8}|800\\d{5,7}", "\\d{8,11}", , , "8001234567"],
            [, , "809\\d{7}", "\\d{10}", , , "8091234567"],
            [, , "804\\d{7}", "\\d{10}", , , "8041234567"],
            [, , "NA", "NA"],
            [, , "NA", "NA"], "ID", 62, "0(?:0[1789]|10(?:00|1[67]))", "0", , , "0", , , , [
                [, "(\\d{2})(\\d{5,8})", "$1 $2", ["2[124]|[36]1"], "(0$1)"],
                [, "(\\d{3})(\\d{5,8})", "$1 $2", ["[4579]|2[035-9]|[36][02-9]"], "(0$1)"],
                [, "(8\\d{2})(\\d{3,4})(\\d{3,5})", "$1-$2-$3", ["8[1-35-9]"], "0$1"],
                [, "(1)(500)(\\d{3})", "$1 $2 $3", ["15"], "$1"],
                [, "(177)(\\d{6,8})", "$1 $2", ["17"], "0$1"],
                [, "(800)(\\d{5,7})", "$1 $2", ["800"], "0$1"],
                [, "(804)(\\d{3})(\\d{4})", "$1 $2 $3", ["804"], "0$1"],
                [, "(80\\d)(\\d)(\\d{3})(\\d{3})", "$1 $2 $3 $4", ["80[79]"], "0$1"]
            ], , [, , "NA", "NA"], , , [, , "8071\\d{6}", "\\d{10}", , , "8071123456"],
            [, , "1500\\d{3}|8071\\d{6}", "\\d{7,10}", , , "8071123456"], , , [, , "NA", "NA"]
        ],
        IE: [, [, , "[124-9]\\d{6,9}", "\\d{5,10}"],
            [, , "1\\d{7,8}|2(?:1\\d{6,7}|3\\d{7}|[24-9]\\d{5})|4(?:0[24]\\d{5}|[1-469]\\d{7}|5\\d{6}|7\\d{5}|8[0-46-9]\\d{7})|5(?:0[45]\\d{5}|1\\d{6}|[23679]\\d{7}|8\\d{5})|6(?:1\\d{6}|[237-9]\\d{5}|[4-6]\\d{7})|7[14]\\d{7}|9(?:1\\d{6}|[04]\\d{7}|[35-9]\\d{5})", "\\d{5,10}", , , "2212345"],
            [, , "8(?:22\\d{6}|[35-9]\\d{7})", "\\d{9}", , , "850123456"],
            [, , "1800\\d{6}", "\\d{10}", , , "1800123456"],
            [, , "15(?:1[2-8]|[2-8]0|9[089])\\d{6}", "\\d{10}", , , "1520123456"],
            [, , "18[59]0\\d{6}", "\\d{10}", , , "1850123456"],
            [, , "700\\d{6}", "\\d{9}", , , "700123456"],
            [, , "76\\d{7}", "\\d{9}", , , "761234567"], "IE", 353, "00", "0", , , "0", , , , [
                [, "(1)(\\d{3,4})(\\d{4})", "$1 $2 $3", ["1"], "(0$1)"],
                [, "(\\d{2})(\\d{5})", "$1 $2", ["2[24-9]|47|58|6[237-9]|9[35-9]"], "(0$1)"],
                [, "(\\d{3})(\\d{5})", "$1 $2", ["40[24]|50[45]"], "(0$1)"],
                [, "(48)(\\d{4})(\\d{4})", "$1 $2 $3", ["48"], "(0$1)"],
                [, "(818)(\\d{3})(\\d{3})", "$1 $2 $3", ["81"], "(0$1)"],
                [, "(\\d{2})(\\d{3})(\\d{3,4})", "$1 $2 $3", ["[24-69]|7[14]"], "(0$1)"],
                [, "([78]\\d)(\\d{3,4})(\\d{4})", "$1 $2 $3", ["76|8[35-9]"], "0$1"],
                [, "(700)(\\d{3})(\\d{3})", "$1 $2 $3", ["70"], "0$1"],
                [, "(\\d{4})(\\d{3})(\\d{3})", "$1 $2 $3", ["1(?:8[059]|5)", "1(?:8[059]0|5)"], "$1"]
            ], , [, , "NA", "NA"], , , [, , "18[59]0\\d{6}", "\\d{10}", , , "1850123456"],
            [, , "818\\d{6}", "\\d{9}", , , "818123456"], , , [, , "8[35-9]\\d{8}", "\\d{10}", , , "8501234567"]
        ],
        IL: [, [, , "[17]\\d{6,9}|[2-589]\\d{3}(?:\\d{3,6})?|6\\d{3}", "\\d{4,10}"],
            [, , "[2-489]\\d{7}", "\\d{7,8}", , , "21234567"],
            [, , "5(?:[02-47-9]\\d{2}|5(?:01|2[23]|3[2-4]|4[45]|5[5689]|6[67]|7[0178]|[89][6-9])|6[2-9]\\d)\\d{5}", "\\d{9}", , , "501234567"],
            [, , "1(?:80[019]\\d{3}|255)\\d{3}", "\\d{7,10}", , , "1800123456"],
            [, , "1(?:212|(?:9(?:0[01]|19)|200)\\d{2})\\d{4}", "\\d{8,10}", , , "1919123456"],
            [, , "1700\\d{6}", "\\d{10}", , , "1700123456"],
            [, , "NA", "NA"],
            [, , "7(?:18\\d|2[23]\\d|3[237]\\d|47\\d|6(?:5\\d|8[0168])|7\\d{2}|8(?:2\\d|33|55|77|81)|9[29]\\d)\\d{5}", "\\d{9}", , , "771234567"], "IL", 972, "0(?:0|1[2-9])", "0", , , "0", , , , [
                [, "([2-489])(\\d{3})(\\d{4})", "$1-$2-$3", ["[2-489]"], "0$1"],
                [, "([57]\\d)(\\d{3})(\\d{4})", "$1-$2-$3", ["[57]"], "0$1"],
                [, "(1)([7-9]\\d{2})(\\d{3})(\\d{3})", "$1-$2-$3-$4", ["1[7-9]"], "$1"],
                [, "(1255)(\\d{3})", "$1-$2", ["125"], "$1"],
                [, "(1200)(\\d{3})(\\d{3})", "$1-$2-$3", ["120"], "$1"],
                [, "(1212)(\\d{2})(\\d{2})", "$1-$2-$3", ["121"], "$1"],
                [, "(1599)(\\d{6})", "$1-$2", ["15"], "$1"],
                [, "(\\d{4})", "*$1", ["[2-689]"], "$1"]
            ], , [, , "NA", "NA"], , , [, , "1700\\d{6}|[2-689]\\d{3}", "\\d{4,10}", , , "1700123456"],
            [, , "[2-689]\\d{3}|1599\\d{6}", "\\d{4}(?:\\d{6})?", , , "1599123456"], , , [, , "NA", "NA"]
        ],
        IM: [, [, , "[135789]\\d{6,9}", "\\d{6,10}"],
            [, , "1624\\d{6}", "\\d{6,10}", , , "1624456789"],
            [, , "7[569]24\\d{6}", "\\d{10}", , , "7924123456"],
            [, , "808162\\d{4}", "\\d{10}", , , "8081624567"],
            [, , "(?:872299|90[0167]624)\\d{4}", "\\d{10}", , , "9016247890"],
            [, , "8(?:4(?:40[49]06|5624\\d)|70624\\d)\\d{3}", "\\d{10}", , , "8456247890"],
            [, , "70\\d{8}", "\\d{10}", , , "7012345678"],
            [, , "56\\d{8}", "\\d{10}", , , "5612345678"], "IM", 44, "00", "0", " x", , "0", , , , , , [, , "NA", "NA"], , , [, , "NA", "NA"],
            [, , "3(?:08162\\d|3\\d{5}|4(?:40[49]06|5624\\d)|7(?:0624\\d|2299\\d))\\d{3}|55\\d{8}", "\\d{10}", , , "5512345678"], , , [, , "NA", "NA"]
        ],
        IN: [, [, , "1\\d{7,12}|[2-9]\\d{9,10}", "\\d{6,13}"],
            [, , "(?:11|2[02]|33|4[04]|79)[2-7]\\d{7}|80[2-467]\\d{7}|(?:1(?:2[0-249]|3[0-25]|4[145]|[59][14]|6[014]|7[1257]|8[01346])|2(?:1[257]|3[013]|4[01]|5[0137]|6[0158]|78|8[1568]|9[14])|3(?:26|4[1-3]|5[34]|6[01489]|7[02-46]|8[159])|4(?:1[36]|2[1-47]|3[15]|5[12]|6[0-26-9]|7[0-24-9]|8[013-57]|9[014-7])|5(?:1[025]|[36][25]|22|4[28]|5[12]|[78]1|9[15])|6(?:12|[2345]1|57|6[13]|7[14]|80)|7(?:12|2[14]|3[134]|4[47]|5[15]|[67]1|88)|8(?:16|2[014]|3[126]|6[136]|7[078]|8[34]|91))[2-7]\\d{6}|(?:(?:1(?:2[35-8]|3[346-9]|4[236-9]|[59][0235-9]|6[235-9]|7[34689]|8[257-9])|2(?:1[134689]|3[24-8]|4[2-8]|5[25689]|6[2-4679]|7[13-79]|8[2-479]|9[235-9])|3(?:01|1[79]|2[1-5]|4[25-8]|5[125689]|6[235-7]|7[157-9]|8[2-467])|4(?:1[14578]|2[5689]|3[2-467]|5[4-7]|6[35]|73|8[2689]|9[2389])|5(?:[16][146-9]|2[14-8]|3[1346]|4[14-69]|5[46]|7[2-4]|8[2-8]|9[246])|6(?:1[1358]|2[2457]|3[2-4]|4[235-7]|[57][2-689]|6[24-578]|8[1-6])|8(?:1[1357-9]|2[235-8]|3[03-57-9]|4[0-24-9]|5\\d|6[2457-9]|7[1-6]|8[1256]|9[2-4]))\\d|7(?:(?:1[013-9]|2[0235-9]|3[2679]|4[1-35689]|5[2-46-9]|[67][02-9]|9\\d)\\d|8(?:2[0-6]|[013-8]\\d)))[2-7]\\d{5}", "\\d{6,10}", , , "1123456789"],
            [, , "(?:7(?:0\\d{2}|2(?:[0235679]\\d|[14][017-9]|8[0-59]|9[389])|3(?:[058]\\d|10|7[3679]|9[689])|4(?:0[1-9]|1[015-9]|[29][89]|39|8[389])|5(?:[034678]\\d|2[03-9]|5[017-9]|9[7-9])|6(?:0[0-47]|1[0-257-9]|2[0-4]|3[19]|5[4589]|[6-9]\\d)|7(?:0[2-9]|[1-79]\\d|8[1-9])|8[0-79]\\d)|8(?:0(?:[01589]\\d|6[67])|1(?:[02-57-9]\\d|1[0135-9])|2(?:[236-9]\\d|5[1-9])|3(?:[0357-9]\\d|4[1-9])|[45]\\d{2}|6[02457-9]\\d|7(?:07|[1-69]\\d)|8(?:[0-26-9]\\d|44|5[2-9])|9(?:[035-9]\\d|2[2-9]|4[0-8]))|9\\d{3})\\d{6}", "\\d{10}", , , "9123456789"],
            [, , "1(?:600\\d{6}|80(?:0\\d{4,9}|3\\d{9}))", "\\d{8,13}", , , "1800123456"],
            [, , "186[12]\\d{9}", "\\d{13}", , , "1861123456789"],
            [, , "1860\\d{7}", "\\d{11}", , , "18603451234"],
            [, , "NA", "NA"],
            [, , "NA", "NA"], "IN", 91, "00", "0", , , "0", , , , [
                [, "(\\d{5})(\\d{5})", "$1 $2", ["7(?:[0257]|3[0157-9]|4[0-389]|6[0-35-9]|8[0-79])|8(?:0[015689]|1[0-57-9]|2[2356-9]|3[0-57-9]|[45]|6[02457-9]|7[01-69]|8[0-24-9]|9[02-9])|9", "7(?:0|2(?:[0235679]|[14][017-9]|8[0-59]|9[389])|3(?:[058]|10|7[3679]|9[689])|4(?:0[1-9]|1[015-9]|[29][89]|39|8[389])|5(?:[034678]|2[03-9]|5[017-9]|9[7-9])|6(?:0[0-47]|1[0-257-9]|2[0-4]|3[19]|5[4589]|[6-9])|7(?:0[2-9]|[1-79]|8[1-9])|8[0-79])|8(?:0(?:[01589]|6[67])|1(?:[02-57-9]|1[0135-9])|2(?:[236-9]|5[1-9])|3(?:[0357-9]|4[1-9])|[45]|6[02457-9]|7(?:07|[1-69])|8(?:[0-26-9]|44|5[2-9])|9(?:[035-9]|2[2-9]|4[0-8]))|9"], "0$1", , 1],
                [, "(\\d{2})(\\d{4})(\\d{4})", "$1 $2 $3", ["11|2[02]|33|4[04]|79|80[2-46]"], "0$1", , 1],
                [, "(\\d{3})(\\d{3})(\\d{4})", "$1 $2 $3", ["1(?:2[0-249]|3[0-25]|4[145]|[569][14]|7[1257]|8[1346]|[68][1-9])|2(?:1[257]|3[013]|4[01]|5[0137]|6[0158]|78|8[1568]|9[14])|3(?:26|4[1-3]|5[34]|6[01489]|7[02-46]|8[159])|4(?:1[36]|2[1-47]|3[15]|5[12]|6[0-26-9]|7[0-24-9]|8[013-57]|9[014-7])|5(?:1[025]|[36][25]|22|4[28]|5[12]|[78]1|9[15])|6(?:12|[2345]1|57|6[13]|7[14]|80)"], "0$1", , 1],
                [, "(\\d{3})(\\d{3})(\\d{4})", "$1 $2 $3", ["7(?:12|2[14]|3[134]|4[47]|5[15]|[67]1|88)", "7(?:12|2[14]|3[134]|4[47]|5(?:1|5[2-6])|[67]1|88)"], "0$1", , 1],
                [, "(\\d{3})(\\d{3})(\\d{4})", "$1 $2 $3", ["8(?:16|2[014]|3[126]|6[136]|7[078]|8[34]|91)"], "0$1", , 1],
                [, "(\\d{4})(\\d{3})(\\d{3})", "$1 $2 $3", ["1(?:[23579]|[468][1-9])|[2-8]"], "0$1", , 1],
                [, "(1600)(\\d{2})(\\d{4})", "$1 $2 $3", ["160", "1600"], "$1", , 1],
                [, "(1800)(\\d{4,5})", "$1 $2", ["180", "1800"], "$1", , 1],
                [, "(18[06]0)(\\d{2,4})(\\d{4})", "$1 $2 $3", ["18[06]", "18[06]0"], "$1", , 1],
                [, "(140)(\\d{3})(\\d{4})", "$1 $2 $3", ["140"], "$1", , 1],
                [, "(\\d{4})(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3 $4", ["18[06]", "18(?:0[03]|6[12])"], "$1", , 1]
            ], , [, , "NA", "NA"], , , [, , "1(?:600\\d{6}|8(?:0(?:0\\d{4,9}|3\\d{9})|6(?:0\\d{7}|[12]\\d{9})))", "\\d{8,13}", , , "1800123456"],
            [, , "140\\d{7}", "\\d{10}", , , "1409305260"], , , [, , "NA", "NA"]
        ],
        IO: [, [, , "3\\d{6}", "\\d{7}"],
            [, , "37\\d{5}", "\\d{7}", , , "3709100"],
            [, , "38\\d{5}", "\\d{7}", , , "3801234"],
            [, , "NA", "NA"],
            [, , "NA", "NA"],
            [, , "NA", "NA"],
            [, , "NA", "NA"],
            [, , "NA", "NA"], "IO", 246, "00", , , , , , , , [
                [, "(\\d{3})(\\d{4})", "$1 $2"]
            ], , [, , "NA", "NA"], , , [, , "NA", "NA"],
            [, , "NA", "NA"], , , [, , "NA", "NA"]
        ],
        IQ: [, [, , "[1-7]\\d{7,9}", "\\d{6,10}"],
            [, , "1\\d{7}|(?:2[13-5]|3[02367]|4[023]|5[03]|6[026])\\d{6,7}", "\\d{6,9}", , , "12345678"],
            [, , "7[3-9]\\d{8}", "\\d{10}", , , "7912345678"],
            [, , "NA", "NA"],
            [, , "NA", "NA"],
            [, , "NA", "NA"],
            [, , "NA", "NA"],
            [, , "NA", "NA"], "IQ", 964, "00", "0", , , "0", , , , [
                [, "(1)(\\d{3})(\\d{4})", "$1 $2 $3", ["1"], "0$1"],
                [, "([2-6]\\d)(\\d{3})(\\d{3,4})", "$1 $2 $3", ["[2-6]"], "0$1"],
                [, "(7\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["7"], "0$1"]
            ], , [, , "NA", "NA"], , , [, , "NA", "NA"],
            [, , "NA", "NA"], , , [, , "NA", "NA"]
        ],
        IR: [, [, , "[1-8]\\d{9}|9(?:[0-4]\\d{8}|9\\d{2,8})", "\\d{4,10}"],
            [, , "(?:1[137]|2[13-68]|3[1458]|4[145]|5[146-8]|6[146]|7[1467]|8[13467])\\d{8}", "\\d{10}", , , "2123456789"],
            [, , "9(?:0[1-3]|[13]\\d|2[0-2]|90)\\d{7}", "\\d{10}", , , "9123456789"],
            [, , "NA", "NA"],
            [, , "NA", "NA"],
            [, , "NA", "NA"],
            [, , "NA", "NA"],
            [, , "(?:[2-6]0\\d|993)\\d{7}", "\\d{10}", , , "9932123456"], "IR", 98, "00", "0", , , "0", , , , [
                [, "(21)(\\d{3,5})", "$1 $2", ["21"], "0$1"],
                [, "(\\d{2})(\\d{4})(\\d{4})", "$1 $2 $3", ["[1-8]"], "0$1"],
                [, "(\\d{3})(\\d{3})(\\d{3,4})", "$1 $2 $3", ["9"], "0$1"],
                [, "(\\d{3})(\\d{2})(\\d{2,3})", "$1 $2 $3", ["9"], "0$1"],
                [, "(\\d{3})(\\d{3})", "$1 $2", ["9"], "0$1"]
            ], , [, , "943\\d{7}", "\\d{10}", , , "9432123456"], , , [, , "NA", "NA"],
            [, , "9990\\d{0,6}", "\\d{4,10}", , , "9990123456"], , , [, , "NA", "NA"]
        ],
        IS: [, [, , "[4-9]\\d{6}|38\\d{7}", "\\d{7,9}"],
            [, , "(?:4(?:1[0-24-6]|2[0-7]|[37][0-8]|4[0-245]|5[0-68]|6\\d|8[0-36-8])|5(?:05|[156]\\d|2[02578]|3[013-79]|4[03-7]|7[0-2578]|8[0-35-9]|9[013-689])|87[23])\\d{4}", "\\d{7}", , , "4101234"],
            [, , "38[589]\\d{6}|(?:6(?:1[1-8]|2[056]|3[089]|4[0167]|5[0159]|[67][0-69]|9\\d)|7(?:5[057]|6[0-2]|[78]\\d)|8(?:2[0-59]|3[0-4]|[469]\\d|5[1-9]))\\d{4}", "\\d{7,9}", , , "6111234"],
            [, , "800\\d{4}", "\\d{7}", , , "8001234"],
            [, , "90\\d{5}", "\\d{7}", , , "9011234"],
            [, , "NA", "NA"],
            [, , "NA", "NA"],
            [, , "49\\d{5}", "\\d{7}", , , "4921234"], "IS", 354, "1(?:0(?:01|10|20)|100)|00", , , , , , "00", , [
                [, "(\\d{3})(\\d{4})", "$1 $2", ["[4-9]"]],
                [, "(3\\d{2})(\\d{3})(\\d{3})", "$1 $2 $3", ["3"]]
            ], , [, , "NA", "NA"], , , [, , "NA", "NA"],
            [, , "809\\d{4}", "\\d{7}", , , "8091234"], , , [, , "(?:6(?:2[1-478]|49|8\\d)|8(?:7[0189]|80)|95[48])\\d{4}", "\\d{7}", , , "6211234"]
        ],
        IT: [, [, , "[01589]\\d{5,10}|3(?:[12457-9]\\d{8}|[36]\\d{7,9})", "\\d{6,11}"],
            [, , "0(?:[26]\\d{4,9}|(?:1(?:[0159]\\d|[27][1-5]|31|4[1-4]|6[1356]|8[2-57])|3(?:[0159]\\d|2[1-4]|3[12]|[48][1-6]|6[2-59]|7[1-7])|4(?:[0159]\\d|[23][1-9]|4[245]|6[1-5]|7[1-4]|81)|5(?:[0159]\\d|2[1-5]|3[2-6]|4[1-79]|6[4-6]|7[1-578]|8[3-8])|7(?:[0159]\\d|2[12]|3[1-7]|4[2346]|6[13569]|7[13-6]|8[1-59])|8(?:[0159]\\d|2[34578]|3[1-356]|[6-8][1-5])|9(?:[0159]\\d|[238][1-5]|4[12]|6[1-8]|7[1-6]))\\d{2,7})", "\\d{6,11}", , , "0212345678"],
            [, , "3(?:[12457-9]\\d{8}|6\\d{7,8}|3\\d{7,9})", "\\d{9,11}", , , "3123456789"],
            [, , "80(?:0\\d{6}|3\\d{3})", "\\d{6,9}", , , "800123456"],
            [, , "0878\\d{5}|1(?:44|6[346])\\d{6}|89(?:2\\d{3}|4(?:[0-4]\\d{2}|[5-9]\\d{4})|5(?:[0-4]\\d{2}|[5-9]\\d{6})|9\\d{6})", "\\d{6,10}", , , "899123456"],
            [, , "84(?:[08]\\d{6}|[17]\\d{3})", "\\d{6,9}", , , "848123456"],
            [, , "1(?:78\\d|99)\\d{6}", "\\d{9,10}", , , "1781234567"],
            [, , "55\\d{8}", "\\d{10}", , , "5512345678"], "IT", 39, "00", , , , , , , , [
                [, "(\\d{2})(\\d{3,4})(\\d{4})", "$1 $2 $3", ["0[26]|55"]],
                [, "(0[26])(\\d{4})(\\d{5})", "$1 $2 $3", ["0[26]"]],
                [, "(0[26])(\\d{4,6})", "$1 $2", ["0[26]"]],
                [, "(0\\d{2})(\\d{3,4})(\\d{4})", "$1 $2 $3", ["0[13-57-9][0159]"]],
                [, "(\\d{3})(\\d{3,6})", "$1 $2", ["0[13-57-9][0159]|8(?:03|4[17]|9[245])", "0[13-57-9][0159]|8(?:03|4[17]|9(?:2|[45][0-4]))"]],
                [, "(0\\d{3})(\\d{3})(\\d{4})", "$1 $2 $3", ["0[13-57-9][2-46-8]"]],
                [, "(0\\d{3})(\\d{2,6})", "$1 $2", ["0[13-57-9][2-46-8]"]],
                [, "(\\d{3})(\\d{3})(\\d{3,4})", "$1 $2 $3", ["[13]|8(?:00|4[08]|9[59])", "[13]|8(?:00|4[08]|9(?:5[5-9]|9))"]],
                [, "(\\d{4})(\\d{4})", "$1 $2", ["894", "894[5-9]"]],
                [, "(\\d{3})(\\d{4})(\\d{4})", "$1 $2 $3", ["3"]]
            ], , [, , "NA", "NA"], 1, , [, , "848\\d{6}", "\\d{9}", , , "848123456"],
            [, , "NA", "NA"], 1, , [, , "NA", "NA"]
        ],
        JE: [, [, , "[135789]\\d{6,9}", "\\d{6,10}"],
            [, , "1534\\d{6}", "\\d{6,10}", , , "1534456789"],
            [, , "7(?:509|7(?:00|97)|829|937)\\d{6}", "\\d{10}", , , "7797123456"],
            [, , "80(?:07(?:35|81)|8901)\\d{4}", "\\d{10}", , , "8007354567"],
            [, , "(?:871206|90(?:066[59]|1810|71(?:07|55)))\\d{4}", "\\d{10}", , , "9018105678"],
            [, , "8(?:4(?:4(?:4(?:05|42|69)|703)|5(?:041|800))|70002)\\d{4}", "\\d{10}", , , "8447034567"],
            [, , "701511\\d{4}", "\\d{10}", , , "7015115678"],
            [, , "56\\d{8}", "\\d{10}", , , "5612345678"], "JE", 44, "00", "0", " x", , "0", , , , , , [, , "76(?:0[012]|2[356]|4[0134]|5[49]|6[0-369]|77|81|9[39])\\d{6}", "\\d{10}", , , "7640123456"], , , [, , "NA", "NA"],
            [, , "3(?:0(?:07(?:35|81)|8901)|3\\d{4}|4(?:4(?:4(?:05|42|69)|703)|5(?:041|800))|7(?:0002|1206))\\d{4}|55\\d{8}", "\\d{10}", , , "5512345678"], , , [, , "NA", "NA"]
        ],
        JM: [, [, , "[589]\\d{9}", "\\d{7}(?:\\d{3})?"],
            [, , "876(?:5(?:0[12]|1[0-468]|2[35]|63)|6(?:0[1-3579]|1[027-9]|[23]\\d|40|5[06]|6[2-589]|7[05]|8[04]|9[4-9])|7(?:0[2-689]|[1-6]\\d|8[056]|9[45])|9(?:0[1-8]|1[02378]|[2-8]\\d|9[2-468]))\\d{4}", "\\d{7}(?:\\d{3})?", , , "8765123456"],
            [, , "876(?:2[16-9]\\d|[348]\\d{2}|5(?:0[3-9]|27|6[0-24-9]|[3-578]\\d)|7(?:0[07]|7\\d|8[1-47-9]|9[0-36-9])|9(?:[01]9|9[0579]))\\d{4}", "\\d{10}", , , "8762101234"],
            [, , "8(?:00|44|55|66|77|88)[2-9]\\d{6}", "\\d{10}", , , "8002123456"],
            [, , "900[2-9]\\d{6}", "\\d{10}", , , "9002123456"],
            [, , "NA", "NA"],
            [, , "5(?:00|33|44|66|77)[2-9]\\d{6}", "\\d{10}", , , "5002345678"],
            [, , "NA", "NA"], "JM", 1, "011", "1", , , "1", , , , , , [, , "NA", "NA"], , "876", [, , "NA", "NA"],
            [, , "NA", "NA"], , , [, , "NA", "NA"]
        ],
        JO: [, [, , "[235-9]\\d{7,8}", "\\d{8,9}"],
            [, , "(?:2(?:6(?:2[0-35-9]|3[0-57-8]|4[24-7]|5[0-24-8]|[6-8][023]|9[0-3])|7(?:0[1-79]|10|2[014-7]|3[0-689]|4[019]|5[0-3578]))|32(?:0[1-69]|1[1-35-7]|2[024-7]|3\\d|4[0-3]|[57][023]|6[03])|53(?:0[0-3]|[13][023]|2[0-59]|49|5[0-35-9]|6[15]|7[45]|8[1-6]|9[0-36-9])|6(?:2[50]0|3(?:00|33)|4(?:0[0125]|1[2-7]|2[0569]|[38][07-9]|4[025689]|6[0-589]|7\\d|9[0-2])|5(?:[01][056]|2[034]|3[0-57-9]|4[17-8]|5[0-69]|6[0-35-9]|7[1-379]|8[0-68]|9[02-39]))|87(?:[02]0|7[08]|90))\\d{4}", "\\d{8}", , , "62001234"],
            [, , "7(?:55|7[025-9]|8[015-9]|9[0-25-9])\\d{6}", "\\d{9}", , , "790123456"],
            [, , "80\\d{6}", "\\d{8}", , , "80012345"],
            [, , "900\\d{5}", "\\d{8}", , , "90012345"],
            [, , "85\\d{6}", "\\d{8}", , , "85012345"],
            [, , "70\\d{7}", "\\d{9}", , , "700123456"],
            [, , "NA", "NA"], "JO", 962, "00", "0", , , "0", , , , [
                [, "(\\d)(\\d{3})(\\d{4})", "$1 $2 $3", ["[2356]|87"], "(0$1)"],
                [, "(7)(\\d{4})(\\d{4})", "$1 $2 $3", ["7[457-9]"], "0$1"],
                [, "(\\d{3})(\\d{5,6})", "$1 $2", ["70|8[0158]|9"], "0$1"]
            ], , [, , "74(?:66|77)\\d{5}", "\\d{9}", , , "746612345"], , , [, , "NA", "NA"],
            [, , "8(?:10|8\\d)\\d{5}", "\\d{8}", , , "88101234"], , , [, , "NA", "NA"]
        ],
        JP: [, [, , "[1-9]\\d{8,9}|00(?:[36]\\d{7,14}|7\\d{5,7}|8\\d{7})", "\\d{8,17}"],
            [, , "(?:1(?:1[235-8]|2[3-6]|3[3-9]|4[2-6]|[58][2-8]|6[2-7]|7[2-9]|9[1-9])|2[2-9]\\d|[36][1-9]\\d|4(?:6[02-8]|[2-578]\\d|9[2-59])|5(?:6[1-9]|7[2-8]|[2-589]\\d)|7(?:3[4-9]|4[02-9]|[25-9]\\d)|8(?:3[2-9]|4[5-9]|5[1-9]|8[03-9]|[2679]\\d)|9(?:[679][1-9]|[2-58]\\d))\\d{6}", "\\d{9}", , , "312345678"],
            [, , "[7-9]0[1-9]\\d{7}", "\\d{10}", , , "9012345678"],
            [, , "120\\d{6}|800\\d{7}|00(?:37\\d{6,13}|66\\d{6,13}|777(?:[01]\\d{2}|5\\d{3}|8\\d{4})|882[1245]\\d{4})", "\\d{8,17}", , , "120123456"],
            [, , "990\\d{6}", "\\d{9}", , , "990123456"],
            [, , "NA", "NA"],
            [, , "60\\d{7}", "\\d{9}", , , "601234567"],
            [, , "50[1-9]\\d{7}", "\\d{10}", , , "5012345678"], "JP", 81, "010", "0", , , "0", , , , [
                [, "(\\d{3})(\\d{3})(\\d{3})", "$1-$2-$3", ["(?:12|57|99)0"], "0$1"],
                [, "(\\d{3})(\\d{3})(\\d{4})", "$1-$2-$3", ["800"], "0$1"],
                [, "(\\d{4})(\\d{4})", "$1-$2", ["0077"], "$1"],
                [, "(\\d{4})(\\d{2})(\\d{3,4})", "$1-$2-$3", ["0077"], "$1"],
                [, "(\\d{4})(\\d{2})(\\d{4})", "$1-$2-$3", ["0088"], "$1"],
                [, "(\\d{4})(\\d{3})(\\d{3,4})", "$1-$2-$3", ["00(?:37|66)"], "$1"],
                [, "(\\d{4})(\\d{4})(\\d{4,5})", "$1-$2-$3", ["00(?:37|66)"], "$1"],
                [, "(\\d{4})(\\d{5})(\\d{5,6})", "$1-$2-$3", ["00(?:37|66)"], "$1"],
                [, "(\\d{4})(\\d{6})(\\d{6,7})", "$1-$2-$3", ["00(?:37|66)"], "$1"],
                [, "(\\d{2})(\\d{4})(\\d{4})", "$1-$2-$3", ["[2579]0|80[1-9]"], "0$1"],
                [, "(\\d{4})(\\d)(\\d{4})", "$1-$2-$3", ["1(?:26|3[79]|4[56]|5[4-68]|6[3-5])|5(?:76|97)|499|746|8(?:3[89]|63|47|51)|9(?:49|80|9[16])", "1(?:267|3(?:7[247]|9[278])|4(?:5[67]|66)|5(?:47|58|64|8[67])|6(?:3[245]|48|5[4-68]))|5(?:76|97)9|499[2468]|7468|8(?:3(?:8[78]|96)|636|477|51[24])|9(?:496|802|9(?:1[23]|69))", "1(?:267|3(?:7[247]|9[278])|4(?:5[67]|66)|5(?:47|58|64|8[67])|6(?:3[245]|48|5[4-68]))|5(?:769|979[2-69])|499[2468]|7468|8(?:3(?:8[78]|96[2457-9])|636[2-57-9]|477|51[24])|9(?:496|802|9(?:1[23]|69))"], "0$1"],
                [, "(\\d{3})(\\d{2})(\\d{4})", "$1-$2-$3", ["1(?:2[3-6]|3[3-9]|4[2-6]|5[2-8]|[68][2-7]|7[2-689]|9[1-578])|2(?:2[03-689]|3[3-58]|4[0-468]|5[04-8]|6[013-8]|7[06-9]|8[02-57-9]|9[13])|4(?:2[28]|3[689]|6[035-7]|7[05689]|80|9[3-5])|5(?:3[1-36-9]|4[4578]|5[013-8]|6[1-9]|7[2-8]|8[14-7]|9[4-9])|7(?:2[15]|3[5-9]|4[02-9]|6[135-8]|7[0-4689]|9[014-9])|8(?:2[49]|3[3-8]|4[5-8]|5[2-9]|6[35-9]|7[579]|8[03-579]|9[2-8])|9(?:[23]0|4[02-46-9]|5[024-79]|6[4-9]|7[2-47-9]|8[02-7]|9[3-7])", "1(?:2[3-6]|3[3-9]|4[2-6]|5(?:[236-8]|[45][2-69])|[68][2-7]|7[2-689]|9[1-578])|2(?:2(?:[04-689]|3[23])|3[3-58]|4[0-468]|5(?:5[78]|7[2-4]|[0468][2-9])|6(?:[0135-8]|4[2-5])|7(?:[0679]|8[2-7])|8(?:[024578]|3[25-9]|9[6-9])|9(?:11|3[2-4]))|4(?:2(?:2[2-9]|8[237-9])|3[689]|6[035-7]|7(?:[059][2-8]|[68])|80|9[3-5])|5(?:3[1-36-9]|4[4578]|5[013-8]|6[1-9]|7[2-8]|8[14-7]|9(?:[89][2-8]|[4-7]))|7(?:2[15]|3[5-9]|4[02-9]|6[135-8]|7[0-4689]|9(?:[017-9]|4[6-8]|5[2-478]|6[2-589]))|8(?:2(?:4[4-8]|9[2-8])|3(?:7[2-6]|[3-6][2-9]|8[2-5])|4[5-8]|5[2-9]|6(?:[37]|5[4-7]|6[2-9]|8[2-8]|9[236-9])|7[579]|8[03-579]|9[2-8])|9(?:[23]0|4[02-46-9]|5[024-79]|6[4-9]|7[2-47-9]|8[02-7]|9(?:3[34]|[4-7]))", "1(?:2[3-6]|3[3-9]|4[2-6]|5(?:[236-8]|[45][2-69])|[68][2-7]|7[2-689]|9[1-578])|2(?:2(?:[04-689]|3[23])|3[3-58]|4[0-468]|5(?:5[78]|7[2-4]|[0468][2-9])|6(?:[0135-8]|4[2-5])|7(?:[0679]|8[2-7])|8(?:[024578]|3[25-9]|9[6-9])|9(?:11|3[2-4]))|4(?:2(?:2[2-9]|8[237-9])|3[689]|6[035-7]|7(?:[059][2-8]|[68])|80|9[3-5])|5(?:3[1-36-9]|4[4578]|5[013-8]|6[1-9]|7[2-8]|8[14-7]|9(?:[89][2-8]|[4-7]))|7(?:2[15]|3[5-9]|4[02-9]|6[135-8]|7[0-4689]|9(?:[017-9]|4[6-8]|5[2-478]|6[2-589]))|8(?:2(?:4[4-8]|9(?:[3578]|20|4[04-9]|6[56]))|3(?:7(?:[2-5]|6[0-59])|[3-6][2-9]|8[2-5])|4[5-8]|5[2-9]|6(?:[37]|5(?:[467]|5[014-9])|6(?:[2-8]|9[02-69])|8[2-8]|9(?:[236-8]|9[23]))|7[579]|8[03-579]|9[2-8])|9(?:[23]0|4[02-46-9]|5[024-79]|6[4-9]|7[2-47-9]|8[02-7]|9(?:3(?:3[02-9]|4[0-24689])|4[2-69]|[5-7]))", "1(?:2[3-6]|3[3-9]|4[2-6]|5(?:[236-8]|[45][2-69])|[68][2-7]|7[2-689]|9[1-578])|2(?:2(?:[04-689]|3[23])|3[3-58]|4[0-468]|5(?:5[78]|7[2-4]|[0468][2-9])|6(?:[0135-8]|4[2-5])|7(?:[0679]|8[2-7])|8(?:[024578]|3[25-9]|9[6-9])|9(?:11|3[2-4]))|4(?:2(?:2[2-9]|8[237-9])|3[689]|6[035-7]|7(?:[059][2-8]|[68])|80|9[3-5])|5(?:3[1-36-9]|4[4578]|5[013-8]|6[1-9]|7[2-8]|8[14-7]|9(?:[89][2-8]|[4-7]))|7(?:2[15]|3[5-9]|4[02-9]|6[135-8]|7[0-4689]|9(?:[017-9]|4[6-8]|5[2-478]|6[2-589]))|8(?:2(?:4[4-8]|9(?:[3578]|20|4[04-9]|6(?:5[25]|60)))|3(?:7(?:[2-5]|6[0-59])|[3-6][2-9]|8[2-5])|4[5-8]|5[2-9]|6(?:[37]|5(?:[467]|5[014-9])|6(?:[2-8]|9[02-69])|8[2-8]|9(?:[236-8]|9[23]))|7[579]|8[03-579]|9[2-8])|9(?:[23]0|4[02-46-9]|5[024-79]|6[4-9]|7[2-47-9]|8[02-7]|9(?:3(?:3[02-9]|4[0-24689])|4[2-69]|[5-7]))"], "0$1"],
                [, "(\\d{2})(\\d{3})(\\d{4})", "$1-$2-$3", ["1|2(?:2[37]|5[5-9]|64|78|8[39]|91)|4(?:2[2689]|64|7[347])|5(?:[2-589]|39)|60|8(?:[46-9]|3[279]|2[124589])|9(?:[235-8]|93)", "1|2(?:2[37]|5(?:[57]|[68]0|9[19])|64|78|8[39]|917)|4(?:2(?:[68]|20|9[178])|64|7[347])|5(?:[2-589]|39[67])|60|8(?:[46-9]|3[279]|2[124589])|9(?:[235-8]|93[34])", "1|2(?:2[37]|5(?:[57]|[68]0|9(?:17|99))|64|78|8[39]|917)|4(?:2(?:[68]|20|9[178])|64|7[347])|5(?:[2-589]|39[67])|60|8(?:[46-9]|3[279]|2[124589])|9(?:[235-8]|93(?:31|4))"], "0$1"],
                [, "(\\d{3})(\\d{2})(\\d{4})", "$1-$2-$3", ["2(?:9[14-79]|74|[34]7|[56]9)|82|993"], "0$1"],
                [, "(\\d)(\\d{4})(\\d{4})", "$1-$2-$3", ["3|4(?:2[09]|7[01])|6[1-9]"], "0$1"],
                [, "(\\d{2})(\\d{3})(\\d{4})", "$1-$2-$3", ["[2479][1-9]"], "0$1"]
            ],
            [
                [, "(\\d{3})(\\d{3})(\\d{3})", "$1-$2-$3", ["(?:12|57|99)0"], "0$1"],
                [, "(\\d{3})(\\d{3})(\\d{4})", "$1-$2-$3", ["800"], "0$1"],
                [, "(\\d{2})(\\d{4})(\\d{4})", "$1-$2-$3", ["[2579]0|80[1-9]"], "0$1"],
                [, "(\\d{4})(\\d)(\\d{4})", "$1-$2-$3", ["1(?:26|3[79]|4[56]|5[4-68]|6[3-5])|5(?:76|97)|499|746|8(?:3[89]|63|47|51)|9(?:49|80|9[16])", "1(?:267|3(?:7[247]|9[278])|4(?:5[67]|66)|5(?:47|58|64|8[67])|6(?:3[245]|48|5[4-68]))|5(?:76|97)9|499[2468]|7468|8(?:3(?:8[78]|96)|636|477|51[24])|9(?:496|802|9(?:1[23]|69))", "1(?:267|3(?:7[247]|9[278])|4(?:5[67]|66)|5(?:47|58|64|8[67])|6(?:3[245]|48|5[4-68]))|5(?:769|979[2-69])|499[2468]|7468|8(?:3(?:8[78]|96[2457-9])|636[2-57-9]|477|51[24])|9(?:496|802|9(?:1[23]|69))"], "0$1"],
                [, "(\\d{3})(\\d{2})(\\d{4})", "$1-$2-$3", ["1(?:2[3-6]|3[3-9]|4[2-6]|5[2-8]|[68][2-7]|7[2-689]|9[1-578])|2(?:2[03-689]|3[3-58]|4[0-468]|5[04-8]|6[013-8]|7[06-9]|8[02-57-9]|9[13])|4(?:2[28]|3[689]|6[035-7]|7[05689]|80|9[3-5])|5(?:3[1-36-9]|4[4578]|5[013-8]|6[1-9]|7[2-8]|8[14-7]|9[4-9])|7(?:2[15]|3[5-9]|4[02-9]|6[135-8]|7[0-4689]|9[014-9])|8(?:2[49]|3[3-8]|4[5-8]|5[2-9]|6[35-9]|7[579]|8[03-579]|9[2-8])|9(?:[23]0|4[02-46-9]|5[024-79]|6[4-9]|7[2-47-9]|8[02-7]|9[3-7])", "1(?:2[3-6]|3[3-9]|4[2-6]|5(?:[236-8]|[45][2-69])|[68][2-7]|7[2-689]|9[1-578])|2(?:2(?:[04-689]|3[23])|3[3-58]|4[0-468]|5(?:5[78]|7[2-4]|[0468][2-9])|6(?:[0135-8]|4[2-5])|7(?:[0679]|8[2-7])|8(?:[024578]|3[25-9]|9[6-9])|9(?:11|3[2-4]))|4(?:2(?:2[2-9]|8[237-9])|3[689]|6[035-7]|7(?:[059][2-8]|[68])|80|9[3-5])|5(?:3[1-36-9]|4[4578]|5[013-8]|6[1-9]|7[2-8]|8[14-7]|9(?:[89][2-8]|[4-7]))|7(?:2[15]|3[5-9]|4[02-9]|6[135-8]|7[0-4689]|9(?:[017-9]|4[6-8]|5[2-478]|6[2-589]))|8(?:2(?:4[4-8]|9[2-8])|3(?:7[2-6]|[3-6][2-9]|8[2-5])|4[5-8]|5[2-9]|6(?:[37]|5[4-7]|6[2-9]|8[2-8]|9[236-9])|7[579]|8[03-579]|9[2-8])|9(?:[23]0|4[02-46-9]|5[024-79]|6[4-9]|7[2-47-9]|8[02-7]|9(?:3[34]|[4-7]))", "1(?:2[3-6]|3[3-9]|4[2-6]|5(?:[236-8]|[45][2-69])|[68][2-7]|7[2-689]|9[1-578])|2(?:2(?:[04-689]|3[23])|3[3-58]|4[0-468]|5(?:5[78]|7[2-4]|[0468][2-9])|6(?:[0135-8]|4[2-5])|7(?:[0679]|8[2-7])|8(?:[024578]|3[25-9]|9[6-9])|9(?:11|3[2-4]))|4(?:2(?:2[2-9]|8[237-9])|3[689]|6[035-7]|7(?:[059][2-8]|[68])|80|9[3-5])|5(?:3[1-36-9]|4[4578]|5[013-8]|6[1-9]|7[2-8]|8[14-7]|9(?:[89][2-8]|[4-7]))|7(?:2[15]|3[5-9]|4[02-9]|6[135-8]|7[0-4689]|9(?:[017-9]|4[6-8]|5[2-478]|6[2-589]))|8(?:2(?:4[4-8]|9(?:[3578]|20|4[04-9]|6[56]))|3(?:7(?:[2-5]|6[0-59])|[3-6][2-9]|8[2-5])|4[5-8]|5[2-9]|6(?:[37]|5(?:[467]|5[014-9])|6(?:[2-8]|9[02-69])|8[2-8]|9(?:[236-8]|9[23]))|7[579]|8[03-579]|9[2-8])|9(?:[23]0|4[02-46-9]|5[024-79]|6[4-9]|7[2-47-9]|8[02-7]|9(?:3(?:3[02-9]|4[0-24689])|4[2-69]|[5-7]))", "1(?:2[3-6]|3[3-9]|4[2-6]|5(?:[236-8]|[45][2-69])|[68][2-7]|7[2-689]|9[1-578])|2(?:2(?:[04-689]|3[23])|3[3-58]|4[0-468]|5(?:5[78]|7[2-4]|[0468][2-9])|6(?:[0135-8]|4[2-5])|7(?:[0679]|8[2-7])|8(?:[024578]|3[25-9]|9[6-9])|9(?:11|3[2-4]))|4(?:2(?:2[2-9]|8[237-9])|3[689]|6[035-7]|7(?:[059][2-8]|[68])|80|9[3-5])|5(?:3[1-36-9]|4[4578]|5[013-8]|6[1-9]|7[2-8]|8[14-7]|9(?:[89][2-8]|[4-7]))|7(?:2[15]|3[5-9]|4[02-9]|6[135-8]|7[0-4689]|9(?:[017-9]|4[6-8]|5[2-478]|6[2-589]))|8(?:2(?:4[4-8]|9(?:[3578]|20|4[04-9]|6(?:5[25]|60)))|3(?:7(?:[2-5]|6[0-59])|[3-6][2-9]|8[2-5])|4[5-8]|5[2-9]|6(?:[37]|5(?:[467]|5[014-9])|6(?:[2-8]|9[02-69])|8[2-8]|9(?:[236-8]|9[23]))|7[579]|8[03-579]|9[2-8])|9(?:[23]0|4[02-46-9]|5[024-79]|6[4-9]|7[2-47-9]|8[02-7]|9(?:3(?:3[02-9]|4[0-24689])|4[2-69]|[5-7]))"], "0$1"],
                [, "(\\d{2})(\\d{3})(\\d{4})", "$1-$2-$3", ["1|2(?:2[37]|5[5-9]|64|78|8[39]|91)|4(?:2[2689]|64|7[347])|5(?:[2-589]|39)|60|8(?:[46-9]|3[279]|2[124589])|9(?:[235-8]|93)", "1|2(?:2[37]|5(?:[57]|[68]0|9[19])|64|78|8[39]|917)|4(?:2(?:[68]|20|9[178])|64|7[347])|5(?:[2-589]|39[67])|60|8(?:[46-9]|3[279]|2[124589])|9(?:[235-8]|93[34])", "1|2(?:2[37]|5(?:[57]|[68]0|9(?:17|99))|64|78|8[39]|917)|4(?:2(?:[68]|20|9[178])|64|7[347])|5(?:[2-589]|39[67])|60|8(?:[46-9]|3[279]|2[124589])|9(?:[235-8]|93(?:31|4))"], "0$1"],
                [, "(\\d{3})(\\d{2})(\\d{4})", "$1-$2-$3", ["2(?:9[14-79]|74|[34]7|[56]9)|82|993"], "0$1"],
                [, "(\\d)(\\d{4})(\\d{4})", "$1-$2-$3", ["3|4(?:2[09]|7[01])|6[1-9]"], "0$1"],
                [, "(\\d{2})(\\d{3})(\\d{4})", "$1-$2-$3", ["[2479][1-9]"], "0$1"]
            ],
            [, , "20\\d{8}", "\\d{10}", , , "2012345678"], , , [, , "00(?:37\\d{6,13}|66\\d{6,13}|777(?:[01]\\d{2}|5\\d{3}|8\\d{4})|882[1245]\\d{4})", "\\d{8,17}", , , "00777012"],
            [, , "570\\d{6}", "\\d{9}", , , "570123456"], 1, , [, , "NA", "NA"]
        ],
        KE: [, [, , "20\\d{6,7}|[4-9]\\d{6,9}", "\\d{7,10}"],
            [, , "20\\d{6,7}|4(?:[0136]\\d{7}|[245]\\d{5,7})|5(?:[08]\\d{7}|[1-79]\\d{5,7})|6(?:[01457-9]\\d{5,7}|[26]\\d{7})", "\\d{7,9}", , , "202012345"],
            [, , "7(?:[0-36]\\d|5[0-6]|7[0-5]|8[0-25-9]|9[0-4])\\d{6}", "\\d{9}", , , "712123456"],
            [, , "800[24-8]\\d{5,6}", "\\d{9,10}", , , "800223456"],
            [, , "900[02-9]\\d{5}", "\\d{9}", , , "900223456"],
            [, , "NA", "NA"],
            [, , "NA", "NA"],
            [, , "NA", "NA"], "KE", 254, "000", "0", , , "0", , , , [
                [, "(\\d{2})(\\d{5,7})", "$1 $2", ["[24-6]"], "0$1"],
                [, "(\\d{3})(\\d{6})", "$1 $2", ["7"], "0$1"],
                [, "(\\d{3})(\\d{3})(\\d{3,4})", "$1 $2 $3", ["[89]"], "0$1"]
            ], , [, , "NA", "NA"], , , [, , "NA", "NA"],
            [, , "NA", "NA"], , , [, , "NA", "NA"]
        ],
        KG: [, [, , "[235-8]\\d{8,9}", "\\d{5,10}"],
            [, , "(?:3(?:1(?:[256]\\d|3[1-9]|47)|2(?:22|3[0-479]|6[0-7])|4(?:22|5[6-9]|6\\d)|5(?:22|3[4-7]|59|6\\d)|6(?:22|5[35-7]|6\\d)|7(?:22|3[468]|4[1-9]|59|[67]\\d)|9(?:22|4[1-8]|6\\d))|6(?:09|12|2[2-4])\\d)\\d{5}", "\\d{5,10}", , , "312123456"],
            [, , "(?:20[0-35]|5[124-7]\\d|7[07]\\d)\\d{6}", "\\d{9}", , , "700123456"],
            [, , "800\\d{6,7}", "\\d{9,10}", , , "800123456"],
            [, , "NA", "NA"],
            [, , "NA", "NA"],
            [, , "NA", "NA"],
            [, , "NA", "NA"], "KG", 996, "00", "0", , , "0", , , , [
                [, "(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["[25-7]|31[25]"], "0$1"],
                [, "(\\d{4})(\\d{5})", "$1 $2", ["3(?:1[36]|[2-9])"], "0$1"],
                [, "(\\d{3})(\\d{3})(\\d)(\\d{3})", "$1 $2 $3 $4", ["8"], "0$1"]
            ], , [, , "NA", "NA"], , , [, , "NA", "NA"],
            [, , "NA", "NA"], , , [, , "NA", "NA"]
        ],
        KH: [, [, , "[1-9]\\d{7,9}", "\\d{6,10}"],
            [, , "(?:2[3-6]|3[2-6]|4[2-4]|[5-7][2-5])(?:[237-9]|4[56]|5\\d|6\\d?)\\d{5}|23(?:4[234]|8\\d{2})\\d{4}", "\\d{6,9}", , , "23756789"],
            [, , "(?:1(?:[013-9]|2\\d?)|3[18]\\d|6[016-9]|7(?:[07-9]|[16]\\d)|8(?:[013-79]|8\\d)|9(?:6\\d|7\\d?|[0-589]))\\d{6}", "\\d{8,9}", , , "91234567"],
            [, , "1800(?:1\\d|2[019])\\d{4}", "\\d{10}", , , "1800123456"],
            [, , "1900(?:1\\d|2[09])\\d{4}", "\\d{10}", , , "1900123456"],
            [, , "NA", "NA"],
            [, , "NA", "NA"],
            [, , "NA", "NA"], "KH", 855, "00[14-9]", "0", , , "0", , , , [
                [, "(\\d{2})(\\d{3})(\\d{3,4})", "$1 $2 $3", ["1\\d[1-9]|[2-9]"], "0$1"],
                [, "(1[89]00)(\\d{3})(\\d{3})", "$1 $2 $3", ["1[89]0"]]
            ], , [, , "NA", "NA"], , , [, , "NA", "NA"],
            [, , "NA", "NA"], , , [, , "NA", "NA"]
        ],
        KI: [, [, , "[2458]\\d{4}|3\\d{4,7}|7\\d{7}", "\\d{5,8}"],
            [, , "(?:[24]\\d|3[1-9]|50|8[0-5])\\d{3}", "\\d{5}", , , "31234"],
            [, , "7\\d{7}", "\\d{8}", , , "72012345"],
            [, , "NA", "NA"],
            [, , "3001\\d{4}", "\\d{5,8}", , , "30010000"],
            [, , "NA", "NA"],
            [, , "NA", "NA"],
            [, , "NA", "NA"], "KI", 686, "00", , , , "0", , , , , , [, , "NA", "NA"], , , [, , "NA", "NA"],
            [, , "NA", "NA"], , , [, , "NA", "NA"]
        ],
        KM: [, [, , "[379]\\d{6}", "\\d{7}"],
            [, , "7(?:6[0-37-9]|7[0-57-9])\\d{4}", "\\d{7}", , , "7712345"],
            [, , "3[234]\\d{5}", "\\d{7}", , , "3212345"],
            [, , "NA", "NA"],
            [, , "(?:39[01]|9[01]0)\\d{4}", "\\d{7}", , , "9001234"],
            [, , "NA", "NA"],
            [, , "NA", "NA"],
            [, , "NA", "NA"], "KM", 269, "00", , , , , , , , [
                [, "(\\d{3})(\\d{2})(\\d{2})", "$1 $2 $3"]
            ], , [, , "NA", "NA"], , , [, , "NA", "NA"],
            [, , "NA", "NA"], , , [, , "NA", "NA"]
        ],
        KN: [, [, , "[589]\\d{9}", "\\d{7}(?:\\d{3})?"],
            [, , "869(?:2(?:29|36)|302|4(?:6[015-9]|70))\\d{4}", "\\d{7}(?:\\d{3})?", , , "8692361234"],
            [, , "869(?:5(?:5[6-8]|6[5-7])|66\\d|76[02-6])\\d{4}", "\\d{10}", , , "8697652917"],
            [, , "8(?:00|44|55|66|77|88)[2-9]\\d{6}", "\\d{10}", , , "8002123456"],
            [, , "900[2-9]\\d{6}", "\\d{10}", , , "9002123456"],
            [, , "NA", "NA"],
            [, , "5(?:00|33|44|66|77)[2-9]\\d{6}", "\\d{10}", , , "5002345678"],
            [, , "NA", "NA"], "KN", 1, "011", "1", , , "1", , , , , , [, , "NA", "NA"], , "869", [, , "NA", "NA"],
            [, , "NA", "NA"], , , [, , "NA", "NA"]
        ],
        KP: [, [, , "1\\d{9}|[28]\\d{7}", "\\d{6,8}|\\d{10}"],
            [, , "2\\d{7}|85\\d{6}", "\\d{6,8}", , , "21234567"],
            [, , "19[123]\\d{7}", "\\d{10}", , , "1921234567"],
            [, , "NA", "NA"],
            [, , "NA", "NA"],
            [, , "NA", "NA"],
            [, , "NA", "NA"],
            [, , "NA", "NA"], "KP", 850, "00|99", "0", , , "0", , , , [
                [, "(\\d{3})(\\d{3})(\\d{4})", "$1 $2 $3", ["1"], "0$1"],
                [, "(\\d)(\\d{3})(\\d{4})", "$1 $2 $3", ["2"], "0$1"],
                [, "(\\d{2})(\\d{3})(\\d{3})", "$1 $2 $3", ["8"], "0$1"]
            ], , [, , "NA", "NA"], , , [, , "2(?:[0-24-9]\\d{2}|3(?:[0-79]\\d|8[02-9]))\\d{4}", "\\d{8}", , , "23821234"],
            [, , "NA", "NA"], , , [, , "NA", "NA"]
        ],
        KR: [, [, , "[1-7]\\d{3,9}|8\\d{8}", "\\d{4,10}"],
            [, , "(?:2|3[1-3]|[46][1-4]|5[1-5])(?:1\\d{2,3}|[1-9]\\d{6,7})", "\\d{4,10}", , , "22123456"],
            [, , "1[0-26-9]\\d{7,8}", "\\d{9,10}", , , "1000000000"],
            [, , "80\\d{7}", "\\d{9}", , , "801234567"],
            [, , "60[2-9]\\d{6}", "\\d{9}", , , "602345678"],
            [, , "NA", "NA"],
            [, , "50\\d{8}", "\\d{10}", , , "5012345678"],
            [, , "70\\d{8}", "\\d{10}", , , "7012345678"], "KR", 82, "00(?:[124-68]|[37]\\d{2})", "0", , , "0(8[1-46-8]|85\\d{2})?", , , , [
                [, "(\\d{2})(\\d{4})(\\d{4})", "$1-$2-$3", ["1(?:0|1[19]|[69]9|5[458])|[57]0", "1(?:0|1[19]|[69]9|5(?:44|59|8))|[57]0"], "0$1", "0$CC-$1"],
                [, "(\\d{2})(\\d{3,4})(\\d{4})", "$1-$2-$3", ["1(?:[169][2-8]|[78]|5[1-4])|[68]0|[3-6][1-9][1-9]", "1(?:[169][2-8]|[78]|5(?:[1-3]|4[56]))|[68]0|[3-6][1-9][1-9]"], "0$1", "0$CC-$1"],
                [, "(\\d{3})(\\d)(\\d{4})", "$1-$2-$3", ["131", "1312"], "0$1", "0$CC-$1"],
                [, "(\\d{3})(\\d{2})(\\d{4})", "$1-$2-$3", ["131", "131[13-9]"], "0$1", "0$CC-$1"],
                [, "(\\d{3})(\\d{3})(\\d{4})", "$1-$2-$3", ["13[2-9]"], "0$1", "0$CC-$1"],
                [, "(\\d{2})(\\d{2})(\\d{3})(\\d{4})", "$1-$2-$3-$4", ["30"], "0$1", "0$CC-$1"],
                [, "(\\d)(\\d{3,4})(\\d{4})", "$1-$2-$3", ["2[1-9]"], "0$1", "0$CC-$1"],
                [, "(\\d)(\\d{3,4})", "$1-$2", ["21[0-46-9]"], "0$1", "0$CC-$1"],
                [, "(\\d{2})(\\d{3,4})", "$1-$2", ["[3-6][1-9]1", "[3-6][1-9]1(?:[0-46-9])"], "0$1", "0$CC-$1"],
                [, "(\\d{4})(\\d{4})", "$1-$2", ["1(?:5[46-9]|6[04678]|8[0579])", "1(?:5(?:44|66|77|88|99)|6(?:00|44|6[16]|70|88)|8(?:00|55|77|99))"], "$1", "0$CC-$1"]
            ], , [, , "15\\d{7,8}", "\\d{9,10}", , , "1523456789"], , , [, , "NA", "NA"],
            [, , "1(?:5(?:44|66|77|88|99)|6(?:00|44|6[16]|70|88)|8(?:00|55|77|99))\\d{4}", "\\d{8}", , , "15441234"], , , [, , "NA", "NA"]
        ],
        KW: [, [, , "[12569]\\d{6,7}", "\\d{7,8}"],
            [, , "(?:18\\d|2(?:[23]\\d{2}|4(?:[1-35-9]\\d|44)|5(?:0[034]|[2-46]\\d|5[1-3]|7[1-7])))\\d{4}", "\\d{7,8}", , , "22345678"],
            [, , "(?:5(?:[05]\\d{2}|1[0-7]\\d|2(?:22|55))|6(?:0[034679]\\d|5[015-9]\\d|6\\d{2}|7[067]\\d|9[0369]\\d)|9(?:0[09]\\d|22\\d|4[01479]\\d|55\\d|6[0679]\\d|[79]\\d{2}|8[057-9]\\d))\\d{4}", "\\d{8}", , , "50012345"],
            [, , "NA", "NA"],
            [, , "NA", "NA"],
            [, , "NA", "NA"],
            [, , "NA", "NA"],
            [, , "NA", "NA"], "KW", 965, "00", , , , , , , , [
                [, "(\\d{4})(\\d{3,4})", "$1 $2", ["[126]|9[04-9]|52[25]"]],
                [, "(\\d{3})(\\d{5})", "$1 $2", ["5[015]|92"]]
            ], , [, , "NA", "NA"], , , [, , "NA", "NA"],
            [, , "NA", "NA"], , , [, , "NA", "NA"]
        ],
        KY: [, [, , "[3589]\\d{9}", "\\d{7}(?:\\d{3})?"],
            [, , "345(?:2(?:22|44)|444|6(?:23|38|40)|7(?:4[35-79]|6[6-9]|77)|8(?:00|1[45]|25|[48]8)|9(?:14|4[035-9]))\\d{4}", "\\d{7}(?:\\d{3})?", , , "3452221234"],
            [, , "345(?:32[1-9]|5(?:1[67]|2[5-7]|4[6-8]|76)|9(?:1[67]|2[2-9]|3[689]))\\d{4}", "\\d{10}", , , "3453231234"],
            [, , "8(?:00|44|55|66|77|88)[2-9]\\d{6}", "\\d{10}", , , "8002345678"],
            [, , "900[2-9]\\d{6}|345976\\d{4}", "\\d{10}", , , "9002345678"],
            [, , "NA", "NA"],
            [, , "5(?:00|33|44|66|77)[2-9]\\d{6}", "\\d{10}", , , "5002345678"],
            [, , "NA", "NA"], "KY", 1, "011", "1", , , "1", , , , , , [, , "345849\\d{4}", "\\d{10}", , , "3458491234"], , "345", [, , "NA", "NA"],
            [, , "NA", "NA"], , , [, , "NA", "NA"]
        ],
        KZ: [, [, , "(?:33\\d|7\\d{2}|80[09])\\d{7}", "\\d{10}"],
            [, , "33622\\d{5}|7(?:1(?:0(?:[23]\\d|4[023]|59|63)|1(?:[23]\\d|4[0-79]|59)|2(?:[23]\\d|59)|3(?:2\\d|3[1-79]|4[0-35-9]|59)|4(?:2\\d|3[013-79]|4[0-8]|5[1-79])|5(?:2\\d|3[1-8]|4[1-7]|59)|6(?:[234]\\d|5[19]|61)|72\\d|8(?:[27]\\d|3[1-46-9]|4[0-5]))|2(?:1(?:[23]\\d|4[46-9]|5[3469])|2(?:2\\d|3[0679]|46|5[12679])|3(?:[234]\\d|5[139])|4(?:2\\d|3[1235-9]|59)|5(?:[23]\\d|4[01246-8]|59|61)|6(?:2\\d|3[1-9]|4[0-4]|59)|7(?:[237]\\d|40|5[279])|8(?:[23]\\d|4[0-3]|59)|9(?:2\\d|3[124578]|59)))\\d{5}", "\\d{10}", , , "7123456789"],
            [, , "7(?:0[012578]|47|6[02-4]|7[15-8]|85)\\d{7}", "\\d{10}", , , "7710009998"],
            [, , "800\\d{7}", "\\d{10}", , , "8001234567"],
            [, , "809\\d{7}", "\\d{10}", , , "8091234567"],
            [, , "NA", "NA"],
            [, , "NA", "NA"],
            [, , "751\\d{7}", "\\d{10}", , , "7511234567"], "KZ", 7, "810", "8", , , "8", , "8~10", , , , [, , "NA", "NA"], , , [, , "751\\d{7}", "\\d{10}", , , "7511234567"],
            [, , "NA", "NA"], , , [, , "NA", "NA"]
        ],
        LA: [, [, , "[2-8]\\d{7,9}", "\\d{6,10}"],
            [, , "(?:2[13]|3(?:0\\d|[14])|[5-7][14]|41|8[1468])\\d{6}", "\\d{6,9}", , , "21212862"],
            [, , "20(?:2[2389]|5[4-689]|7[6-8]|9[15-9])\\d{6}", "\\d{10}", , , "2023123456"],
            [, , "NA", "NA"],
            [, , "NA", "NA"],
            [, , "NA", "NA"],
            [, , "NA", "NA"],
            [, , "NA", "NA"], "LA", 856, "00", "0", , , "0", , , , [
                [, "(20)(\\d{2})(\\d{3})(\\d{3})", "$1 $2 $3 $4", ["20"], "0$1"],
                [, "([2-8]\\d)(\\d{3})(\\d{3})", "$1 $2 $3", ["2[13]|3[14]|[4-8]"], "0$1"],
                [, "(30)(\\d{2})(\\d{2})(\\d{3})", "$1 $2 $3 $4", ["30"], "0$1"]
            ], , [, , "NA", "NA"], , , [, , "NA", "NA"],
            [, , "NA", "NA"], , , [, , "NA", "NA"]
        ],
        LB: [, [, , "[13-9]\\d{6,7}", "\\d{7,8}"],
            [, , "(?:[14-6]\\d{2}|7(?:[2-57]\\d|62|8[0-7]|9[04-9])|8[02-9]\\d|9\\d{2})\\d{4}", "\\d{7}", , , "1123456"],
            [, , "(?:3\\d|7(?:[01]\\d|6[013-9]|8[89]|9[1-3])|81\\d)\\d{5}", "\\d{7,8}", , , "71123456"],
            [, , "NA", "NA"],
            [, , "9[01]\\d{6}", "\\d{8}", , , "90123456"],
            [, , "80\\d{6}", "\\d{8}", , , "80123456"],
            [, , "NA", "NA"],
            [, , "NA", "NA"], "LB", 961, "00", "0", , , "0", , , , [
                [, "(\\d)(\\d{3})(\\d{3})", "$1 $2 $3", ["[13-6]|7(?:[2-57]|62|8[0-7]|9[04-9])|8[02-9]|9"], "0$1"],
                [, "([7-9]\\d)(\\d{3})(\\d{3})", "$1 $2 $3", ["[89][01]|7(?:[01]|6[013-9]|8[89]|9[1-3])"]]
            ], , [, , "NA", "NA"], , , [, , "NA", "NA"],
            [, , "NA", "NA"], , , [, , "NA", "NA"]
        ],
        LC: [, [, , "[5789]\\d{9}", "\\d{7}(?:\\d{3})?"],
            [, , "758(?:4(?:30|5[0-9]|6[2-9]|8[0-2])|57[0-2]|638)\\d{4}", "\\d{7}(?:\\d{3})?", , , "7584305678"],
            [, , "758(?:28[4-7]|384|4(?:6[01]|8[4-9])|5(?:1[89]|20|84)|7(?:1[2-9]|2[0-8]))\\d{4}", "\\d{10}", , , "7582845678"],
            [, , "8(?:00|44|55|66|77|88)[2-9]\\d{6}", "\\d{10}", , , "8002123456"],
            [, , "900[2-9]\\d{6}", "\\d{10}", , , "9002123456"],
            [, , "NA", "NA"],
            [, , "5(?:00|33|44|66|77)[2-9]\\d{6}", "\\d{10}", , , "5002345678"],
            [, , "NA", "NA"], "LC", 1, "011", "1", , , "1", , , , , , [, , "NA", "NA"], , "758", [, , "NA", "NA"],
            [, , "NA", "NA"], , , [, , "NA", "NA"]
        ],
        LI: [, [, , "6\\d{8}|[23789]\\d{6}", "\\d{7,9}"],
            [, , "(?:2(?:01|1[27]|3\\d|6[02-578]|96)|3(?:7[0135-7]|8[048]|9[0269]))\\d{4}", "\\d{7}", , , "2345678"],
            [, , "6(?:51[01]|6(?:0[0-6]|2[016-9]|39))\\d{5}|7(?:[37-9]\\d|42|56)\\d{4}", "\\d{7,9}", , , "660234567"],
            [, , "80(?:02[28]|9\\d{2})\\d{2}", "\\d{7}", , , "8002222"],
            [, , "90(?:02[258]|1(?:23|3[14])|66[136])\\d{2}", "\\d{7}", , , "9002222"],
            [, , "NA", "NA"],
            [, , "NA", "NA"],
            [, , "NA", "NA"], "LI", 423, "00", "0", , , "0", , , , [
                [, "(\\d{3})(\\d{2})(\\d{2})", "$1 $2 $3", ["[23789]"]],
                [, "(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["6[56]"]],
                [, "(69)(7\\d{2})(\\d{4})", "$1 $2 $3", ["697"]]
            ], , [, , "NA", "NA"], , , [, , "NA", "NA"],
            [, , "870(?:28|87)\\d{2}", "\\d{7}", , , "8702812"], , , [, , "697(?:42|56|[7-9]\\d)\\d{4}", "\\d{9}", , , "697861234"]
        ],
        LK: [, [, , "[1-9]\\d{8}", "\\d{7,9}"],
            [, , "(?:[189]1|2[13-7]|3[1-8]|4[157]|5[12457]|6[35-7])[2-57]\\d{6}", "\\d{7,9}", , , "112345678"],
            [, , "7[0125-8]\\d{7}", "\\d{9}", , , "712345678"],
            [, , "NA", "NA"],
            [, , "NA", "NA"],
            [, , "NA", "NA"],
            [, , "NA", "NA"],
            [, , "NA", "NA"], "LK", 94, "00", "0", , , "0", , , , [
                [, "(\\d{2})(\\d{1})(\\d{6})", "$1 $2 $3", ["[1-689]"], "0$1"],
                [, "(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["7"], "0$1"]
            ], , [, , "NA", "NA"], , , [, , "NA", "NA"],
            [, , "NA", "NA"], , , [, , "NA", "NA"]
        ],
        LR: [, [, , "2\\d{7,8}|[37-9]\\d{8}|4\\d{6}|5\\d{6,8}", "\\d{7,9}"],
            [, , "2\\d{7}", "\\d{8}", , , "21234567"],
            [, , "(?:330\\d|4[67]|5\\d|77\\d{2}|88\\d{2}|994\\d)\\d{5}|(?:20\\d{3}|33(?:0\\d{2}|2(?:02|5\\d))|555\\d{2}|77[0567]\\d{2}|88[068]\\d{2}|994\\d{2})\\d{4}", "\\d{7,9}", , , "770123456"],
            [, , "NA", "NA"],
            [, , "90[03]\\d{6}", "\\d{9}", , , "900123456"],
            [, , "NA", "NA"],
            [, , "NA", "NA"],
            [, , "332(?:0[02]|5\\d)\\d{4}", "\\d{9}", , , "332001234"], "LR", 231, "00", "0", , , "0", , , , [
                [, "(2\\d)(\\d{3})(\\d{3})", "$1 $2 $3", ["2"], "0$1"],
                [, "(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["[2579]"], "0$1"],
                [, "([4-6])(\\d{3})(\\d{3})", "$1 $2 $3", ["[4-6]"], "0$1"],
                [, "(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["[38]"], "0$1"]
            ], , [, , "NA", "NA"], , , [, , "NA", "NA"],
            [, , "NA", "NA"], , , [, , "NA", "NA"]
        ],
        LS: [, [, , "[2568]\\d{7}", "\\d{8}"],
            [, , "2\\d{7}", "\\d{8}", , , "22123456"],
            [, , "[56]\\d{7}", "\\d{8}", , , "50123456"],
            [, , "800[256]\\d{4}", "\\d{8}", , , "80021234"],
            [, , "NA", "NA"],
            [, , "NA", "NA"],
            [, , "NA", "NA"],
            [, , "NA", "NA"], "LS", 266, "00", , , , , , , , [
                [, "(\\d{4})(\\d{4})", "$1 $2"]
            ], , [, , "NA", "NA"], , , [, , "NA", "NA"],
            [, , "NA", "NA"], , , [, , "NA", "NA"]
        ],
        LT: [, [, , "[3-9]\\d{7}", "\\d{8}"],
            [, , "(?:3[1478]|4[124-6]|52)\\d{6}", "\\d{8}", , , "31234567"],
            [, , "6\\d{7}", "\\d{8}", , , "61234567"],
            [, , "800\\d{5}", "\\d{8}", , , "80012345"],
            [, , "9(?:0[0239]|10)\\d{5}", "\\d{8}", , , "90012345"],
            [, , "808\\d{5}", "\\d{8}", , , "80812345"],
            [, , "700\\d{5}", "\\d{8}", , , "70012345"],
            [, , "NA", "NA"], "LT", 370, "00", "8", , , "[08]", , , , [
                [, "([34]\\d)(\\d{6})", "$1 $2", ["37|4(?:1|5[45]|6[2-4])"], "(8-$1)", , 1],
                [, "([3-6]\\d{2})(\\d{5})", "$1 $2", ["3[148]|4(?:[24]|6[09])|528|6"], "(8-$1)", , 1],
                [, "([7-9]\\d{2})(\\d{2})(\\d{3})", "$1 $2 $3", ["[7-9]"], "8 $1", , 1],
                [, "(5)(2\\d{2})(\\d{4})", "$1 $2 $3", ["52[0-79]"], "(8-$1)", , 1]
            ], , [, , "NA", "NA"], , , [, , "NA", "NA"],
            [, , "70[67]\\d{5}", "\\d{8}", , , "70712345"], , , [, , "NA", "NA"]
        ],
        LU: [, [, , "[24-9]\\d{3,10}|3(?:[0-46-9]\\d{2,9}|5[013-9]\\d{1,8})", "\\d{4,11}"],
            [, , "(?:2[2-9]\\d{2,9}|(?:[3457]\\d{2}|8(?:0[2-9]|[13-9]\\d)|9(?:0[89]|[2-579]\\d))\\d{1,8})", "\\d{4,11}", , , "27123456"],
            [, , "6[2679][18]\\d{6}", "\\d{9}", , , "628123456"],
            [, , "800\\d{5}", "\\d{8}", , , "80012345"],
            [, , "90[015]\\d{5}", "\\d{8}", , , "90012345"],
            [, , "801\\d{5}", "\\d{8}", , , "80112345"],
            [, , "70\\d{6}", "\\d{8}", , , "70123456"],
            [, , "20(?:1\\d{5}|[2-689]\\d{1,7})", "\\d{4,10}", , , "20201234"], "LU", 352, "00", , , , "(15(?:0[06]|1[12]|35|4[04]|55|6[26]|77|88|99)\\d)", , , , [
                [, "(\\d{2})(\\d{3})", "$1 $2", ["[2-5]|7[1-9]|[89](?:[1-9]|0[2-9])"], , "$CC $1"],
                [, "(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3", ["[2-5]|7[1-9]|[89](?:[1-9]|0[2-9])"], , "$CC $1"],
                [, "(\\d{2})(\\d{2})(\\d{3})", "$1 $2 $3", ["20"], , "$CC $1"],
                [, "(\\d{2})(\\d{2})(\\d{2})(\\d{1,2})", "$1 $2 $3 $4", ["2(?:[0367]|4[3-8])"], , "$CC $1"],
                [, "(\\d{2})(\\d{2})(\\d{2})(\\d{3})", "$1 $2 $3 $4", ["20"], , "$CC $1"],
                [, "(\\d{2})(\\d{2})(\\d{2})(\\d{2})(\\d{1,2})", "$1 $2 $3 $4 $5", ["2(?:[0367]|4[3-8])"], , "$CC $1"],
                [, "(\\d{2})(\\d{2})(\\d{2})(\\d{1,4})", "$1 $2 $3 $4", ["2(?:[12589]|4[12])|[3-5]|7[1-9]|8(?:[1-9]|0[2-9])|9(?:[1-9]|0[2-46-9])"], , "$CC $1"],
                [, "(\\d{3})(\\d{2})(\\d{3})", "$1 $2 $3", ["70|80[01]|90[015]"], , "$CC $1"],
                [, "(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["6"], , "$CC $1"]
            ], , [, , "NA", "NA"], , , [, , "NA", "NA"],
            [, , "NA", "NA"], , , [, , "NA", "NA"]
        ],
        LV: [, [, , "[2689]\\d{7}", "\\d{8}"],
            [, , "6[3-8]\\d{6}", "\\d{8}", , , "63123456"],
            [, , "2\\d{7}", "\\d{8}", , , "21234567"],
            [, , "80\\d{6}", "\\d{8}", , , "80123456"],
            [, , "90\\d{6}", "\\d{8}", , , "90123456"],
            [, , "81\\d{6}", "\\d{8}", , , "81123456"],
            [, , "NA", "NA"],
            [, , "NA", "NA"], "LV", 371, "00", , , , , , , , [
                [, "([2689]\\d)(\\d{3})(\\d{3})", "$1 $2 $3"]
            ], , [, , "NA", "NA"], , , [, , "NA", "NA"],
            [, , "NA", "NA"], , , [, , "NA", "NA"]
        ],
        LY: [, [, , "[25679]\\d{8}", "\\d{7,9}"],
            [, , "(?:2[1345]|5[1347]|6[123479]|71)\\d{7}", "\\d{7,9}", , , "212345678"],
            [, , "9[1-6]\\d{7}", "\\d{9}", , , "912345678"],
            [, , "NA", "NA"],
            [, , "NA", "NA"],
            [, , "NA", "NA"],
            [, , "NA", "NA"],
            [, , "NA", "NA"], "LY", 218, "00", "0", , , "0", , , , [
                [, "([25679]\\d)(\\d{7})", "$1-$2", , "0$1"]
            ], , [, , "NA", "NA"], , , [, , "NA", "NA"],
            [, , "NA", "NA"], , , [, , "NA", "NA"]
        ],
        MA: [, [, , "[5689]\\d{8}", "\\d{9}"],
            [, , "5(?:2(?:(?:[015-7]\\d|2[2-9]|3[2-57]|4[2-8]|8[235-7])\\d|9(?:0\\d|[89]0))|3(?:(?:[0-4]\\d|[57][2-9]|6[235-8]|9[3-9])\\d|8(?:0\\d|[89]0)))\\d{4}", "\\d{9}", , , "520123456"],
            [, , "6(?:0[0-8]|[12-79]\\d|8[017])\\d{6}", "\\d{9}", , , "650123456"],
            [, , "80\\d{7}", "\\d{9}", , , "801234567"],
            [, , "89\\d{7}", "\\d{9}", , , "891234567"],
            [, , "NA", "NA"],
            [, , "NA", "NA"],
            [, , "NA", "NA"], "MA", 212, "00", "0", , , "0", , , , [
                [, "([56]\\d{2})(\\d{6})", "$1-$2", ["5(?:2[015-7]|3[0-4])|6"], "0$1"],
                [, "([58]\\d{3})(\\d{5})", "$1-$2", ["5(?:2[2-489]|3[5-9])|892", "5(?:2(?:[2-48]|90)|3(?:[5-79]|80))|892"], "0$1"],
                [, "(5\\d{4})(\\d{4})", "$1-$2", ["5(?:29|38)", "5(?:29|38)[89]"], "0$1"],
                [, "(8[09])(\\d{7})", "$1-$2", ["8(?:0|9[013-9])"], "0$1"]
            ], , [, , "NA", "NA"], 1, , [, , "NA", "NA"],
            [, , "NA", "NA"], , , [, , "NA", "NA"]
        ],
        MC: [, [, , "[4689]\\d{7,8}", "\\d{8,9}"],
            [, , "870\\d{5}|9[2-47-9]\\d{6}", "\\d{8}", , , "99123456"],
            [, , "6\\d{8}|4(?:4\\d|5[1-9])\\d{5}", "\\d{8,9}", , , "612345678"],
            [, , "90\\d{6}", "\\d{8}", , , "90123456"],
            [, , "NA", "NA"],
            [, , "NA", "NA"],
            [, , "NA", "NA"],
            [, , "NA", "NA"], "MC", 377, "00", "0", , , "0", , , , [
                [, "(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["9"], "$1"],
                [, "(\\d{2})(\\d{3})(\\d{3})", "$1 $2 $3", ["4"], "0$1"],
                [, "(6)(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4 $5", ["6"], "0$1"],
                [, "(\\d{3})(\\d{3})(\\d{2})", "$1 $2 $3", ["8"], "$1"]
            ], , [, , "NA", "NA"], , , [, , "8\\d{7}", "\\d{8}"],
            [, , "NA", "NA"], , , [, , "NA", "NA"]
        ],
        MD: [, [, , "[235-9]\\d{7}", "\\d{8}"],
            [, , "(?:2(?:1[0569]|2\\d|3[015-7]|4[1-46-9]|5[0-24689]|6[2-589]|7[1-37]|9[1347-9])|5(?:33|5[257]))\\d{5}", "\\d{8}", , , "22212345"],
            [, , "(?:562\\d|6(?:[089]\\d{2}|[12][01]\\d|7(?:[1-6]\\d|7[0-4]))|7(?:6[07]|7[457-9]|[89]\\d)\\d)\\d{4}", "\\d{8}", , , "62112345"],
            [, , "800\\d{5}", "\\d{8}", , , "80012345"],
            [, , "90[056]\\d{5}", "\\d{8}", , , "90012345"],
            [, , "808\\d{5}", "\\d{8}", , , "80812345"],
            [, , "NA", "NA"],
            [, , "3[08]\\d{6}", "\\d{8}", , , "30123456"], "MD", 373, "00", "0", , , "0", , , , [
                [, "(\\d{2})(\\d{3})(\\d{3})", "$1 $2 $3", ["22|3"], "0$1"],
                [, "([25-7]\\d{2})(\\d{2})(\\d{3})", "$1 $2 $3", ["2[13-79]|[5-7]"], "0$1"],
                [, "([89]\\d{2})(\\d{5})", "$1 $2", ["[89]"], "0$1"]
            ], , [, , "NA", "NA"], , , [, , "NA", "NA"],
            [, , "8(?:03|14)\\d{5}", "\\d{8}", , , "80312345"], , , [, , "NA", "NA"]
        ],
        ME: [, [, , "[2-9]\\d{7,8}", "\\d{6,9}"],
            [, , "(?:20[2-8]|3(?:0[2-7]|[12][35-7]|3[4-7])|4(?:0[2367]|1[267])|5(?:0[467]|1[267]|2[367]))\\d{5}", "\\d{6,8}", , , "30234567"],
            [, , "6(?:00\\d|32\\d|[89]\\d{2}|61\\d|7(?:[0-8]\\d|9(?:[3-9]|[0-2]\\d)))\\d{4}", "\\d{8,9}", , , "67622901"],
            [, , "80\\d{6}", "\\d{8}", , , "80080002"],
            [, , "(?:9(?:4[1568]|5[178]))\\d{5}", "\\d{8}", , , "94515151"],
            [, , "NA", "NA"],
            [, , "NA", "NA"],
            [, , "78[1-9]\\d{5}", "\\d{8}", , , "78108780"], "ME", 382, "00", "0", , , "0", , , , [
                [, "(\\d{2})(\\d{3})(\\d{3})", "$1 $2 $3", ["[2-57-9]|6[036-9]", "[2-57-9]|6(?:[03689]|7(?:[0-8]|9[3-9]))"], "0$1"],
                [, "(67)(9)(\\d{3})(\\d{3})", "$1 $2 $3 $4", ["679", "679[0-2]"], "0$1"]
            ], , [, , "NA", "NA"], , , [, , "NA", "NA"],
            [, , "77\\d{6}", "\\d{8}", , , "77273012"], , , [, , "NA", "NA"]
        ],
        MF: [, [, , "[56]\\d{8}", "\\d{9}"],
            [, , "590(?:[02][79]|13|5[0-268]|[78]7)\\d{4}", "\\d{9}", , , "590271234"],
            [, , "690(?:0[0-7]|[1-9]\\d)\\d{4}", "\\d{9}", , , "690301234"],
            [, , "NA", "NA"],
            [, , "NA", "NA"],
            [, , "NA", "NA"],
            [, , "NA", "NA"],
            [, , "NA", "NA"], "MF", 590, "00", "0", , , "0", , , , , , [, , "NA", "NA"], , , [, , "NA", "NA"],
            [, , "NA", "NA"], , , [, , "NA", "NA"]
        ],
        MG: [, [, , "[23]\\d{8}", "\\d{7,9}"],
            [, , "20(?:2\\d{2}|4[47]\\d|5[3467]\\d|6[279]\\d|7(?:2[29]|[35]\\d)|8[268]\\d|9[245]\\d)\\d{4}", "\\d{7,9}", , , "202123456"],
            [, , "3[2-49]\\d{7}", "\\d{9}", , , "321234567"],
            [, , "NA", "NA"],
            [, , "NA", "NA"],
            [, , "NA", "NA"],
            [, , "NA", "NA"],
            [, , "22\\d{7}", "\\d{9}", , , "221234567"], "MG", 261, "00", "0", , , "0", , , , [
                [, "([23]\\d)(\\d{2})(\\d{3})(\\d{2})", "$1 $2 $3 $4", , "0$1"]
            ], , [, , "NA", "NA"], , , [, , "NA", "NA"],
            [, , "NA", "NA"], , , [, , "NA", "NA"]
        ],
        MH: [, [, , "[2-6]\\d{6}", "\\d{7}"],
            [, , "(?:247|528|625)\\d{4}", "\\d{7}", , , "2471234"],
            [, , "(?:235|329|45[56]|545)\\d{4}", "\\d{7}", , , "2351234"],
            [, , "NA", "NA"],
            [, , "NA", "NA"],
            [, , "NA", "NA"],
            [, , "NA", "NA"],
            [, , "635\\d{4}", "\\d{7}", , , "6351234"], "MH", 692, "011", "1", , , "1", , , , [
                [, "(\\d{3})(\\d{4})", "$1-$2"]
            ], , [, , "NA", "NA"], , , [, , "NA", "NA"],
            [, , "NA", "NA"], , , [, , "NA", "NA"]
        ],
        MK: [, [, , "[2-578]\\d{7}", "\\d{8}"],
            [, , "(?:2(?:[23]\\d|5[124578]|6[01])|3(?:1[3-6]|[23][2-6]|4[2356])|4(?:[23][2-6]|4[3-6]|5[256]|6[25-8]|7[24-6]|8[4-6]))\\d{5}", "\\d{6,8}", , , "22212345"],
            [, , "7(?:[0-25-8]\\d{2}|32\\d|421)\\d{4}", "\\d{8}", , , "72345678"],
            [, , "800\\d{5}", "\\d{8}", , , "80012345"],
            [, , "5[02-9]\\d{6}", "\\d{8}", , , "50012345"],
            [, , "8(?:0[1-9]|[1-9]\\d)\\d{5}", "\\d{8}", , , "80123456"],
            [, , "NA", "NA"],
            [, , "NA", "NA"], "MK", 389, "00", "0", , , "0", , , , [
                [, "(2)(\\d{3})(\\d{4})", "$1 $2 $3", ["2"], "0$1"],
                [, "([347]\\d)(\\d{3})(\\d{3})", "$1 $2 $3", ["[347]"], "0$1"],
                [, "([58]\\d{2})(\\d)(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[58]"], "0$1"]
            ], , [, , "NA", "NA"], , , [, , "NA", "NA"],
            [, , "NA", "NA"], , , [, , "NA", "NA"]
        ],
        ML: [, [, , "[246-9]\\d{7}", "\\d{8}"],
            [, , "(?:2(?:0(?:2[0-589]|7\\d)|1(?:2[5-7]|[3-689]\\d|7[2-4689]))|44[239]\\d)\\d{4}", "\\d{8}", , , "20212345"],
            [, , "[67]\\d{7}|9[0-25-9]\\d{6}", "\\d{8}", , , "65012345"],
            [, , "800\\d{5}", "\\d{8}", , , "80012345"],
            [, , "NA", "NA"],
            [, , "NA", "NA"],
            [, , "NA", "NA"],
            [, , "NA", "NA"], "ML", 223, "00", , , , , , , , [
                [, "(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[246-9]"]],
                [, "(\\d{4})", "$1", ["67|74"]]
            ],
            [
                [, "(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[246-9]"]]
            ],
            [, , "NA", "NA"], , , [, , "NA", "NA"],
            [, , "NA", "NA"], , , [, , "NA", "NA"]
        ],
        MM: [, [, , "[14578]\\d{5,7}|[26]\\d{5,8}|9(?:2\\d{0,2}|[58]|3\\d|4\\d{1,2}|6\\d?|[79]\\d{0,2})\\d{6}", "\\d{5,10}"],
            [, , "1(?:2\\d{1,2}|[3-5]\\d|6\\d?|[89][0-6]\\d)\\d{4}|2(?:2(?:000\\d{3}|\\d{4})|3\\d{4}|4(?:0\\d{5}|\\d{4})|5(?:1\\d{3,6}|[02-9]\\d{3,5})|[6-9]\\d{4})|4(?:2[245-8]|[346][2-6]|5[3-5])\\d{4}|5(?:2(?:20?|[3-8])|3[2-68]|4(?:21?|[4-8])|5[23]|6[2-4]|7[2-8]|8[24-7]|9[2-7])\\d{4}|6(?:0[23]|1[2356]|[24][2-6]|3[24-6]|5[2-4]|6[2-8]|7(?:[2367]|4\\d|5\\d?|8[145]\\d)|8[245]|9[24])\\d{4}|7(?:[04][24-8]|[15][2-7]|22|3[2-4])\\d{4}|8(?:1(?:2\\d{1,2}|[3-689]\\d)|2(?:2\\d|3(?:\\d|20)|[4-8]\\d)|3[24]\\d|4[24-7]\\d|5[245]\\d|6[23]\\d)\\d{3}", "\\d{5,9}", , , "1234567"],
            [, , "17[01]\\d{4}|9(?:2(?:[0-4]|5\\d{2}|6[0-5]\\d)|3[0-36]\\d|4(?:0[0-4]\\d|[1379]\\d|2\\d{2}|4[0-589]\\d|5\\d{2}|88)|5[0-6]|61?\\d|7(?:3\\d|[789]\\d{2})|8\\d|9(?:1\\d|[67]\\d{2}|[089]))\\d{5}", "\\d{7,10}", , , "92123456"],
            [, , "NA", "NA"],
            [, , "NA", "NA"],
            [, , "NA", "NA"],
            [, , "NA", "NA"],
            [, , "1333\\d{4}", "\\d{8}", , , "13331234"], "MM", 95, "00", "0", , , "0", , , , [
                [, "(\\d)(\\d{3})(\\d{3,4})", "$1 $2 $3", ["1|2[245]"], "0$1"],
                [, "(2)(\\d{4})(\\d{4})", "$1 $2 $3", ["251"], "0$1"],
                [, "(\\d)(\\d{2})(\\d{3})", "$1 $2 $3", ["16|2"], "0$1"],
                [, "(\\d{2})(\\d{3})(\\d{3,4})", "$1 $2 $3", ["67|81"], "0$1"],
                [, "(\\d{2})(\\d{2})(\\d{3,4})", "$1 $2 $3", ["[4-8]"], "0$1"],
                [, "(9)(\\d{3})(\\d{4,6})", "$1 $2 $3", ["9(?:2[0-4]|[35-9]|4[137-9])"], "0$1"],
                [, "(9)([34]\\d{4})(\\d{4})", "$1 $2 $3", ["9(?:3[0-36]|4[0-57-9])"], "0$1"],
                [, "(9)(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3 $4", ["92[56]"], "0$1"],
                [, "(9)(\\d{3})(\\d{3})(\\d{2})", "$1 $2 $3 $4", ["93"], "0$1"]
            ], , [, , "NA", "NA"], , , [, , "NA", "NA"],
            [, , "NA", "NA"], , , [, , "NA", "NA"]
        ],
        MN: [, [, , "[12]\\d{7,9}|[57-9]\\d{7}", "\\d{6,10}"],
            [, , "[12](?:1\\d|2(?:[1-3]\\d?|7\\d)|3[2-8]\\d{1,2}|4[2-68]\\d{1,2}|5[1-4689]\\d{1,2})\\d{5}|5[0568]\\d{6}", "\\d{6,10}", , , "50123456"],
            [, , "(?:8(?:[05689]\\d|3[01])|9[013-9]\\d)\\d{5}", "\\d{8}", , , "88123456"],
            [, , "NA", "NA"],
            [, , "NA", "NA"],
            [, , "NA", "NA"],
            [, , "NA", "NA"],
            [, , "7[05-8]\\d{6}", "\\d{8}", , , "75123456"], "MN", 976, "001", "0", , , "0", , , , [
                [, "([12]\\d)(\\d{2})(\\d{4})", "$1 $2 $3", ["[12]1"], "0$1"],
                [, "([12]2\\d)(\\d{5,6})", "$1 $2", ["[12]2[1-3]"], "0$1"],
                [, "([12]\\d{3})(\\d{5})", "$1 $2", ["[12](?:27|[3-5])", "[12](?:27|[3-5]\\d)2"], "0$1"],
                [, "(\\d{4})(\\d{4})", "$1 $2", ["[57-9]"], "$1"],
                [, "([12]\\d{4})(\\d{4,5})", "$1 $2", ["[12](?:27|[3-5])", "[12](?:27|[3-5]\\d)[4-9]"], "0$1"]
            ], , [, , "NA", "NA"], , , [, , "NA", "NA"],
            [, , "NA", "NA"], , , [, , "NA", "NA"]
        ],
        MO: [, [, , "[268]\\d{7}", "\\d{8}"],
            [, , "(?:28[2-57-9]|8[2-57-9]\\d)\\d{5}", "\\d{8}", , , "28212345"],
            [, , "6(?:[2356]\\d|8[18])\\d{5}", "\\d{8}", , , "66123456"],
            [, , "NA", "NA"],
            [, , "NA", "NA"],
            [, , "NA", "NA"],
            [, , "NA", "NA"],
            [, , "NA", "NA"], "MO", 853, "00", , , , , , , , [
                [, "([268]\\d{3})(\\d{4})", "$1 $2"]
            ], , [, , "NA", "NA"], , , [, , "NA", "NA"],
            [, , "NA", "NA"], , , [, , "NA", "NA"]
        ],
        MP: [, [, , "[5689]\\d{9}", "\\d{7}(?:\\d{3})?"],
            [, , "670(?:2(?:3[3-7]|56|8[5-8])|32[1238]|4(?:33|8[348])|5(?:32|55|88)|6(?:64|70|82)|78[589]|8[3-9]8|989)\\d{4}", "\\d{7}(?:\\d{3})?", , , "6702345678"],
            [, , "670(?:2(?:3[3-7]|56|8[5-8])|32[1238]|4(?:33|8[348])|5(?:32|55|88)|6(?:64|70|82)|78[589]|8[3-9]8|989)\\d{4}", "\\d{7}(?:\\d{3})?", , , "6702345678"],
            [, , "8(?:00|44|55|66|77|88)[2-9]\\d{6}", "\\d{10}", , , "8002123456"],
            [, , "900[2-9]\\d{6}", "\\d{10}", , , "9002123456"],
            [, , "NA", "NA"],
            [, , "5(?:00|33|44|66|77)[2-9]\\d{6}", "\\d{10}", , , "5002345678"],
            [, , "NA", "NA"], "MP", 1, "011", "1", , , "1", , , 1, , , [, , "NA", "NA"], , "670", [, , "NA", "NA"],
            [, , "NA", "NA"], , , [, , "NA", "NA"]
        ],
        MQ: [, [, , "[56]\\d{8}", "\\d{9}"],
            [, , "596(?:0[2-5]|[12]0|3[05-9]|4[024-8]|[5-7]\\d|89|9[4-8])\\d{4}", "\\d{9}", , , "596301234"],
            [, , "696(?:[0-479]\\d|5[01]|8[0-689])\\d{4}", "\\d{9}", , , "696201234"],
            [, , "NA", "NA"],
            [, , "NA", "NA"],
            [, , "NA", "NA"],
            [, , "NA", "NA"],
            [, , "NA", "NA"], "MQ", 596, "00", "0", , , "0", , , , [
                [, "(\\d{3})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", , "0$1"]
            ], , [, , "NA", "NA"], , , [, , "NA", "NA"],
            [, , "NA", "NA"], , , [, , "NA", "NA"]
        ],
        MR: [, [, , "[2-48]\\d{7}", "\\d{8}"],
            [, , "25[08]\\d{5}|35\\d{6}|45[1-7]\\d{5}", "\\d{8}", , , "35123456"],
            [, , "[234][0-46-9]\\d{6}", "\\d{8}", , , "22123456"],
            [, , "800\\d{5}", "\\d{8}", , , "80012345"],
            [, , "NA", "NA"],
            [, , "NA", "NA"],
            [, , "NA", "NA"],
            [, , "NA", "NA"], "MR", 222, "00", , , , , , , , [
                [, "([2-48]\\d)(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4"]
            ], , [, , "NA", "NA"], , , [, , "NA", "NA"],
            [, , "NA", "NA"], , , [, , "NA", "NA"]
        ],
        MS: [, [, , "[5689]\\d{9}", "\\d{7}(?:\\d{3})?"],
            [, , "664491\\d{4}", "\\d{7}(?:\\d{3})?", , , "6644912345"],
            [, , "66449[2-6]\\d{4}", "\\d{10}", , , "6644923456"],
            [, , "8(?:00|44|55|66|77|88)[2-9]\\d{6}", "\\d{10}", , , "8002123456"],
            [, , "900[2-9]\\d{6}", "\\d{10}", , , "9002123456"],
            [, , "NA", "NA"],
            [, , "5(?:00|33|44|66|77)[2-9]\\d{6}", "\\d{10}", , , "5002345678"],
            [, , "NA", "NA"], "MS", 1, "011", "1", , , "1", , , , , , [, , "NA", "NA"], , "664", [, , "NA", "NA"],
            [, , "NA", "NA"], , , [, , "NA", "NA"]
        ],
        MT: [, [, , "[2357-9]\\d{7}", "\\d{8}"],
            [, , "2(?:0(?:1[0-6]|3[1-4]|[69]\\d)|[1-357]\\d{2})\\d{4}", "\\d{8}", , , "21001234"],
            [, , "(?:7(?:210|[79]\\d{2})|9(?:2(?:1[01]|31)|696|8(?:1[1-3]|89|97)|9\\d{2}))\\d{4}", "\\d{8}", , , "96961234"],
            [, , "800[3467]\\d{4}", "\\d{8}", , , "80071234"],
            [, , "5(?:0(?:0(?:37|43)|6\\d{2}|70\\d|9[0168])|[12]\\d0[1-5])\\d{3}", "\\d{8}", , , "50037123"],
            [, , "NA", "NA"],
            [, , "NA", "NA"],
            [, , "3550\\d{4}", "\\d{8}", , , "35501234"], "MT", 356, "00", , , , , , , , [
                [, "(\\d{4})(\\d{4})", "$1 $2"]
            ], , [, , "7117\\d{4}", "\\d{8}", , , "71171234"], , , [, , "NA", "NA"],
            [, , "501\\d{5}", "\\d{8}", , , "50112345"], , , [, , "NA", "NA"]
        ],
        MU: [, [, , "[2-9]\\d{6,7}", "\\d{7,8}"],
            [, , "(?:2(?:[03478]\\d|1[0-7]|6[1-69])|4(?:[013568]\\d|2[4-7])|5(?:44\\d|471)|6\\d{2}|8(?:14|3[129]))\\d{4}", "\\d{7,8}", , , "2012345"],
            [, , "5(?:2[59]\\d|4(?:2[1-389]|4\\d|7[1-9]|9\\d)|7\\d{2}|8(?:[0-2568]\\d|7[15-8])|9[0-8]\\d)\\d{4}", "\\d{8}", , , "52512345"],
            [, , "80[012]\\d{4}", "\\d{7}", , , "8001234"],
            [, , "30\\d{5}", "\\d{7}", , , "3012345"],
            [, , "NA", "NA"],
            [, , "NA", "NA"],
            [, , "3(?:20|9\\d)\\d{4}", "\\d{7}", , , "3201234"], "MU", 230, "0(?:0|[2-7]0|33)", , , , , , "020", , [
                [, "([2-46-9]\\d{2})(\\d{4})", "$1 $2", ["[2-46-9]"]],
                [, "(5\\d{3})(\\d{4})", "$1 $2", ["5"]]
            ], , [, , "NA", "NA"], , , [, , "NA", "NA"],
            [, , "NA", "NA"], , , [, , "NA", "NA"]
        ],
        MV: [, [, , "[3467]\\d{6}|9(?:00\\d{7}|\\d{6})", "\\d{7,10}"],
            [, , "(?:3(?:0[01]|3[0-59])|6(?:[567][02468]|8[024689]|90))\\d{4}", "\\d{7}", , , "6701234"],
            [, , "(?:46[46]|7[3-9]\\d|9[15-9]\\d)\\d{4}", "\\d{7}", , , "7712345"],
            [, , "NA", "NA"],
            [, , "900\\d{7}", "\\d{10}", , , "9001234567"],
            [, , "NA", "NA"],
            [, , "NA", "NA"],
            [, , "NA", "NA"], "MV", 960, "0(?:0|19)", , , , , , "00", , [
                [, "(\\d{3})(\\d{4})", "$1-$2", ["[3467]|9(?:[1-9]|0[1-9])"]],
                [, "(\\d{3})(\\d{3})(\\d{4})", "$1 $2 $3", ["900"]]
            ], , [, , "781\\d{4}", "\\d{7}", , , "7812345"], , , [, , "NA", "NA"],
            [, , "NA", "NA"], , , [, , "NA", "NA"]
        ],
        MW: [, [, , "(?:1(?:\\d{2})?|[2789]\\d{2})\\d{6}", "\\d{7,9}"],
            [, , "(?:1[2-9]|21\\d{2})\\d{5}", "\\d{7,9}", , , "1234567"],
            [, , "(?:111|77\\d|88\\d|99\\d)\\d{6}", "\\d{9}", , , "991234567"],
            [, , "NA", "NA"],
            [, , "NA", "NA"],
            [, , "NA", "NA"],
            [, , "NA", "NA"],
            [, , "NA", "NA"], "MW", 265, "00", "0", , , "0", , , , [
                [, "(\\d)(\\d{3})(\\d{3})", "$1 $2 $3", ["1"], "0$1"],
                [, "(2\\d{2})(\\d{3})(\\d{3})", "$1 $2 $3", ["2"], "0$1"],
                [, "(\\d{3})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[1789]"], "0$1"]
            ], , [, , "NA", "NA"], , , [, , "NA", "NA"],
            [, , "NA", "NA"], , , [, , "NA", "NA"]
        ],
        MX: [, [, , "[1-9]\\d{9,10}", "\\d{7,11}"],
            [, , "(?:33|55|81)\\d{8}|(?:2(?:0[01]|2[2-9]|3[1-35-8]|4[13-9]|7[1-689]|8[1-578]|9[467])|3(?:1[1-79]|[2458][1-9]|7[1-8]|9[1-5])|4(?:1[1-57-9]|[24-6][1-9]|[37][1-8]|8[1-35-9]|9[2-689])|5(?:88|9[1-79])|6(?:1[2-68]|[234][1-9]|5[1-3689]|6[12457-9]|7[1-7]|8[67]|9[4-8])|7(?:[13467][1-9]|2[1-8]|5[13-9]|8[1-69]|9[17])|8(?:2[13-689]|3[1-6]|4[124-6]|6[1246-9]|7[1-378]|9[12479])|9(?:1[346-9]|2[1-4]|3[2-46-8]|5[1348]|[69][1-9]|7[12]|8[1-8]))\\d{7}", "\\d{7,10}", , , "2221234567"],
            [, , "1(?:(?:33|55|81)\\d{8}|(?:2(?:2[2-9]|3[1-35-8]|4[13-9]|7[1-689]|8[1-578]|9[467])|3(?:1[1-79]|[2458][1-9]|7[1-8]|9[1-5])|4(?:1[1-57-9]|[24-6][1-9]|[37][1-8]|8[1-35-9]|9[2-689])|5(?:88|9[1-79])|6(?:1[2-68]|[2-4][1-9]|5[1-3689]|6[12457-9]|7[1-7]|8[67]|9[4-8])|7(?:[13467][1-9]|2[1-8]|5[13-9]|8[1-69]|9[17])|8(?:2[13-689]|3[1-6]|4[124-6]|6[1246-9]|7[1-378]|9[12479])|9(?:1[346-9]|2[1-4]|3[2-46-8]|5[1348]|[69][1-9]|7[12]|8[1-8]))\\d{7})", "\\d{11}", , , "12221234567"],
            [, , "8(?:00|88)\\d{7}", "\\d{10}", , , "8001234567"],
            [, , "900\\d{7}", "\\d{10}", , , "9001234567"],
            [, , "300\\d{7}", "\\d{10}", , , "3001234567"],
            [, , "500\\d{7}", "\\d{10}", , , "5001234567"],
            [, , "NA", "NA"], "MX", 52, "0[09]", "01", , , "0[12]|04[45](\\d{10})", "1$1", , , [
                [, "([358]\\d)(\\d{4})(\\d{4})", "$1 $2 $3", ["33|55|81"], "01 $1", , 1],
                [, "(\\d{3})(\\d{3})(\\d{4})", "$1 $2 $3", ["[2467]|3[0-2457-9]|5[089]|8[02-9]|9[0-35-9]"], "01 $1", , 1],
                [, "(1)([358]\\d)(\\d{4})(\\d{4})", "044 $2 $3 $4", ["1(?:33|55|81)"], "$1", , 1],
                [, "(1)(\\d{3})(\\d{3})(\\d{4})", "044 $2 $3 $4", ["1(?:[2467]|3[0-2457-9]|5[089]|8[2-9]|9[1-35-9])"], "$1", , 1]
            ],
            [
                [, "([358]\\d)(\\d{4})(\\d{4})", "$1 $2 $3", ["33|55|81"], "01 $1", , 1],
                [, "(\\d{3})(\\d{3})(\\d{4})", "$1 $2 $3", ["[2467]|3[0-2457-9]|5[089]|8[02-9]|9[0-35-9]"], "01 $1", , 1],
                [, "(1)([358]\\d)(\\d{4})(\\d{4})", "$1 $2 $3 $4", ["1(?:33|55|81)"]],
                [, "(1)(\\d{3})(\\d{3})(\\d{4})", "$1 $2 $3 $4", ["1(?:[2467]|3[0-2457-9]|5[089]|8[2-9]|9[1-35-9])"]]
            ],
            [, , "NA", "NA"], , , [, , "NA", "NA"],
            [, , "NA", "NA"], 1, , [, , "NA", "NA"]
        ],
        MY: [, [, , "[13-9]\\d{7,9}", "\\d{6,10}"],
            [, , "(?:3[2-9]\\d|[4-9][2-9])\\d{6}", "\\d{6,9}", , , "323456789"],
            [, , "1(?:1[1-5]\\d{2}|[02-4679][2-9]\\d|59\\d{2}|8(?:1[23]|[2-9]\\d))\\d{5}", "\\d{9,10}", , , "123456789"],
            [, , "1[378]00\\d{6}", "\\d{10}", , , "1300123456"],
            [, , "1600\\d{6}", "\\d{10}", , , "1600123456"],
            [, , "NA", "NA"],
            [, , "NA", "NA"],
            [, , "154\\d{7}", "\\d{10}", , , "1541234567"], "MY", 60, "00", "0", , , "0", , , , [
                [, "([4-79])(\\d{3})(\\d{4})", "$1-$2 $3", ["[4-79]"], "0$1"],
                [, "(3)(\\d{4})(\\d{4})", "$1-$2 $3", ["3"], "0$1"],
                [, "([18]\\d)(\\d{3})(\\d{3,4})", "$1-$2 $3", ["1[02-46-9][1-9]|8"], "0$1"],
                [, "(1)([36-8]00)(\\d{2})(\\d{4})", "$1-$2-$3-$4", ["1[36-8]0"]],
                [, "(11)(\\d{4})(\\d{4})", "$1-$2 $3", ["11"], "0$1"],
                [, "(15[49])(\\d{3})(\\d{4})", "$1-$2 $3", ["15"], "0$1"]
            ], , [, , "NA", "NA"], , , [, , "NA", "NA"],
            [, , "NA", "NA"], , , [, , "NA", "NA"]
        ],
        MZ: [, [, , "[28]\\d{7,8}", "\\d{8,9}"],
            [, , "2(?:[1346]\\d|5[0-2]|[78][12]|93)\\d{5}", "\\d{8}", , , "21123456"],
            [, , "8[23467]\\d{7}", "\\d{9}", , , "821234567"],
            [, , "800\\d{6}", "\\d{9}", , , "800123456"],
            [, , "NA", "NA"],
            [, , "NA", "NA"],
            [, , "NA", "NA"],
            [, , "NA", "NA"], "MZ", 258, "00", , , , , , , , [
                [, "([28]\\d)(\\d{3})(\\d{3,4})", "$1 $2 $3", ["2|8[2-7]"]],
                [, "(80\\d)(\\d{3})(\\d{3})", "$1 $2 $3", ["80"]]
            ], , [, , "NA", "NA"], , , [, , "NA", "NA"],
            [, , "NA", "NA"], , , [, , "NA", "NA"]
        ],
        NA: [, [, , "[68]\\d{7,8}", "\\d{8,9}"],
            [, , "6(?:1(?:17|2(?:[0189]\\d|[2-6]|7\\d?)|3(?:[01378]|2\\d)|4[01]|69|7[014])|2(?:17|5(?:[0-36-8]|4\\d?)|69|70)|3(?:17|2(?:[0237]\\d?|[14-689])|34|6[289]|7[01]|81)|4(?:17|2(?:[012]|7?)|4(?:[06]|1\\d)|5(?:[01357]|[25]\\d?)|69|7[01])|5(?:17|2(?:[0459]|[23678]\\d?)|69|7[01])|6(?:17|2(?:5|6\\d?)|38|42|69|7[01])|7(?:17|2(?:[569]|[234]\\d?)|3(?:0\\d?|[13])|69|7[01]))\\d{4}", "\\d{8,9}", , , "61221234"],
            [, , "(?:60|8[125])\\d{7}", "\\d{9}", , , "811234567"],
            [, , "NA", "NA"],
            [, , "8701\\d{5}", "\\d{9}", , , "870123456"],
            [, , "NA", "NA"],
            [, , "NA", "NA"],
            [, , "8(?:3\\d{2}|86)\\d{5}", "\\d{8,9}", , , "88612345"], "NA", 264, "00", "0", , , "0", , , , [
                [, "(8\\d)(\\d{3})(\\d{4})", "$1 $2 $3", ["8[1235]"], "0$1"],
                [, "(6\\d)(\\d{3})(\\d{3,4})", "$1 $2 $3", ["6"], "0$1"],
                [, "(88)(\\d{3})(\\d{3})", "$1 $2 $3", ["88"], "0$1"],
                [, "(870)(\\d{3})(\\d{3})", "$1 $2 $3", ["870"], "0$1"]
            ], , [, , "NA", "NA"], , , [, , "NA", "NA"],
            [, , "NA", "NA"], , , [, , "NA", "NA"]
        ],
        NC: [, [, , "[2-57-9]\\d{5}", "\\d{6}"],
            [, , "(?:2[03-9]|3[0-5]|4[1-7]|88)\\d{4}", "\\d{6}", , , "201234"],
            [, , "(?:5[0-4]|[79]\\d|8[0-79])\\d{4}", "\\d{6}", , , "751234"],
            [, , "NA", "NA"],
            [, , "36\\d{4}", "\\d{6}", , , "366711"],
            [, , "NA", "NA"],
            [, , "NA", "NA"],
            [, , "NA", "NA"], "NC", 687, "00", , , , , , , , [
                [, "(\\d{2})(\\d{2})(\\d{2})", "$1.$2.$3", ["[2-46-9]|5[0-4]"]]
            ], , [, , "NA", "NA"], , , [, , "NA", "NA"],
            [, , "NA", "NA"], , , [, , "NA", "NA"]
        ],
        NE: [, [, , "[0289]\\d{7}", "\\d{8}"],
            [, , "2(?:0(?:20|3[1-7]|4[134]|5[14]|6[14578]|7[1-578])|1(?:4[145]|5[14]|6[14-68]|7[169]|88))\\d{4}", "\\d{8}", , , "20201234"],
            [, , "(?:8[089]|9\\d)\\d{6}", "\\d{8}", , , "93123456"],
            [, , "08\\d{6}", "\\d{8}", , , "08123456"],
            [, , "09\\d{6}", "\\d{8}", , , "09123456"],
            [, , "NA", "NA"],
            [, , "NA", "NA"],
            [, , "NA", "NA"], "NE", 227, "00", , , , , , , , [
                [, "(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[289]|09"]],
                [, "(08)(\\d{3})(\\d{3})", "$1 $2 $3", ["08"]]
            ], , [, , "NA", "NA"], , , [, , "NA", "NA"],
            [, , "NA", "NA"], 1, , [, , "NA", "NA"]
        ],
        NF: [, [, , "[13]\\d{5}", "\\d{5,6}"],
            [, , "(?:1(?:06|17|28|39)|3[012]\\d)\\d{3}", "\\d{5,6}", , , "106609"],
            [, , "3[58]\\d{4}", "\\d{5,6}", , , "381234"],
            [, , "NA", "NA"],
            [, , "NA", "NA"],
            [, , "NA", "NA"],
            [, , "NA", "NA"],
            [, , "NA", "NA"], "NF", 672, "00", , , , , , , , [
                [, "(\\d{2})(\\d{4})", "$1 $2", ["1"]],
                [, "(\\d)(\\d{5})", "$1 $2", ["3"]]
            ], , [, , "NA", "NA"], , , [, , "NA", "NA"],
            [, , "NA", "NA"], , , [, , "NA", "NA"]
        ],
        NG: [, [, , "[1-6]\\d{5,8}|9\\d{5,9}|[78]\\d{5,13}", "\\d{5,14}"],
            [, , "[12]\\d{6,7}|9(?:0[3-9]|[1-9]\\d)\\d{5}|(?:3\\d|4[023568]|5[02368]|6[02-469]|7[4-69]|8[2-9])\\d{6}|(?:4[47]|5[14579]|6[1578]|7[0-357])\\d{5,6}|(?:78|41)\\d{5}", "\\d{5,9}", , , "12345678"],
            [, , "(?:1(?:7[34]\\d|8(?:04|[124579]\\d|8[0-3])|95\\d)|287[0-7]|3(?:18[1-8]|88[0-7]|9(?:8[5-9]|6[1-5]))|4(?:28[0-2]|6(?:7[1-9]|8[02-47])|88[0-2])|5(?:2(?:7[7-9]|8\\d)|38[1-79]|48[0-7]|68[4-7])|6(?:2(?:7[7-9]|8\\d)|4(?:3[7-9]|[68][129]|7[04-69]|9[1-8])|58[0-2]|98[7-9])|7(?:38[0-7]|69[1-8]|78[2-4])|8(?:28[3-9]|38[0-2]|4(?:2[12]|3[147-9]|5[346]|7[4-9]|8[014-689]|90)|58[1-8]|78[2-9]|88[5-7])|98[07]\\d)\\d{4}|(?:70(?:[13-9]\\d|2[1-9])|8(?:0[2-9]|1\\d)\\d|90[2359]\\d)\\d{6}", "\\d{8,10}", , , "8021234567"],
            [, , "800\\d{7,11}", "\\d{10,14}", , , "80017591759"],
            [, , "NA", "NA"],
            [, , "NA", "NA"],
            [, , "NA", "NA"],
            [, , "NA", "NA"], "NG", 234, "009", "0", , , "0", , , , [
                [, "([129])(\\d{3})(\\d{3,4})", "$1 $2 $3", ["[129]"], "0$1"],
                [, "(\\d{2})(\\d{3})(\\d{2,3})", "$1 $2 $3", ["[3-6]|7(?:[1-79]|0[1-9])|8[2-9]"], "0$1"],
                [, "(\\d{3})(\\d{3})(\\d{3,4})", "$1 $2 $3", ["70|8[01]|90[2359]"], "0$1"],
                [, "([78]00)(\\d{4})(\\d{4,5})", "$1 $2 $3", ["[78]00"], "0$1"],
                [, "([78]00)(\\d{5})(\\d{5,6})", "$1 $2 $3", ["[78]00"], "0$1"],
                [, "(78)(\\d{2})(\\d{3})", "$1 $2 $3", ["78"], "0$1"]
            ], , [, , "NA", "NA"], , , [, , "NA", "NA"],
            [, , "700\\d{7,11}", "\\d{10,14}", , , "7001234567"], , , [, , "NA", "NA"]
        ],
        NI: [, [, , "[12578]\\d{7}", "\\d{8}"],
            [, , "2\\d{7}", "\\d{8}", , , "21234567"],
            [, , "5(?:5[0-7]\\d{5}|[78]\\d{6})|7[5-8]\\d{6}|8\\d{7}", "\\d{8}", , , "81234567"],
            [, , "1800\\d{4}", "\\d{8}", , , "18001234"],
            [, , "NA", "NA"],
            [, , "NA", "NA"],
            [, , "NA", "NA"],
            [, , "NA", "NA"], "NI", 505, "00", , , , , , , , [
                [, "(\\d{4})(\\d{4})", "$1 $2"]
            ], , [, , "NA", "NA"], , , [, , "NA", "NA"],
            [, , "NA", "NA"], , , [, , "NA", "NA"]
        ],
        NL: [, [, , "1\\d{4,8}|[2-7]\\d{8}|[89]\\d{6,9}", "\\d{5,10}"],
            [, , "(?:1[0135-8]|2[02-69]|3[0-68]|4[0135-9]|[57]\\d|8[478])\\d{7}", "\\d{9}", , , "101234567"],
            [, , "6[1-58]\\d{7}", "\\d{9}", , , "612345678"],
            [, , "800\\d{4,7}", "\\d{7,10}", , , "8001234"],
            [, , "90[069]\\d{4,7}", "\\d{7,10}", , , "9061234"],
            [, , "NA", "NA"],
            [, , "NA", "NA"],
            [, , "85\\d{7}", "\\d{9}", , , "851234567"], "NL", 31, "00", "0", , , "0", , , , [
                [, "([1-578]\\d)(\\d{3})(\\d{4})", "$1 $2 $3", ["1[035]|2[0346]|3[03568]|4[0356]|5[0358]|7|8[4578]"], "0$1"],
                [, "([1-5]\\d{2})(\\d{3})(\\d{3})", "$1 $2 $3", ["1[16-8]|2[259]|3[124]|4[17-9]|5[124679]"], "0$1"],
                [, "(6)(\\d{8})", "$1 $2", ["6[0-57-9]"], "0$1"],
                [, "(66)(\\d{7})", "$1 $2", ["66"], "0$1"],
                [, "(14)(\\d{3,4})", "$1 $2", ["14"], "$1"],
                [, "([89]0\\d)(\\d{4,7})", "$1 $2", ["80|9"], "0$1"]
            ], , [, , "66\\d{7}", "\\d{9}", , , "662345678"], , , [, , "14\\d{3,4}", "\\d{5,6}"],
            [, , "140(?:1(?:[035]|[16-8]\\d)|2(?:[0346]|[259]\\d)|3(?:[03568]|[124]\\d)|4(?:[0356]|[17-9]\\d)|5(?:[0358]|[124679]\\d)|7\\d|8[458])", "\\d{5,6}", , , "14020"], , , [, , "NA", "NA"]
        ],
        NO: [, [, , "0\\d{4}|[2-9]\\d{7}", "\\d{5}(?:\\d{3})?"],
            [, , "(?:2[1-4]|3[1-3578]|5[1-35-7]|6[1-4679]|7[0-8])\\d{6}", "\\d{8}", , , "21234567"],
            [, , "(?:4[015-8]|5[89]|9\\d)\\d{6}", "\\d{8}", , , "40612345"],
            [, , "80[01]\\d{5}", "\\d{8}", , , "80012345"],
            [, , "82[09]\\d{5}", "\\d{8}", , , "82012345"],
            [, , "810(?:0[0-6]|[2-8]\\d)\\d{3}", "\\d{8}", , , "81021234"],
            [, , "880\\d{5}", "\\d{8}", , , "88012345"],
            [, , "85[0-5]\\d{5}", "\\d{8}", , , "85012345"], "NO", 47, "00", , , , , , , , [
                [, "([489]\\d{2})(\\d{2})(\\d{3})", "$1 $2 $3", ["[489]"]],
                [, "([235-7]\\d)(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[235-7]"]]
            ], , [, , "NA", "NA"], 1, , [, , "NA", "NA"],
            [, , "0\\d{4}|81(?:0(?:0[7-9]|1\\d)|5\\d{2})\\d{3}", "\\d{5}(?:\\d{3})?", , , "01234"], 1, , [, , "81[23]\\d{5}", "\\d{8}", , , "81212345"]
        ],
        NP: [, [, , "[1-8]\\d{7}|9(?:[1-69]\\d{6,8}|7[2-6]\\d{5,7}|8\\d{8})", "\\d{6,10}"],
            [, , "(?:1[0-6]\\d|2[13-79][2-6]|3[135-8][2-6]|4[146-9][2-6]|5[135-7][2-6]|6[13-9][2-6]|7[15-9][2-6]|8[1-46-9][2-6]|9[1-79][2-6])\\d{5}", "\\d{6,8}", , , "14567890"],
            [, , "9(?:6[013]|7[245]|8[0-24-6])\\d{7}", "\\d{10}", , , "9841234567"],
            [, , "NA", "NA"],
            [, , "NA", "NA"],
            [, , "NA", "NA"],
            [, , "NA", "NA"],
            [, , "NA", "NA"], "NP", 977, "00", "0", , , "0", , , , [
                [, "(1)(\\d{7})", "$1-$2", ["1[2-6]"], "0$1"],
                [, "(\\d{2})(\\d{6})", "$1-$2", ["1[01]|[2-8]|9(?:[1-69]|7[15-9])"], "0$1"],
                [, "(9\\d{2})(\\d{7})", "$1-$2", ["9(?:6[013]|7[245]|8)"], "$1"]
            ], , [, , "NA", "NA"], , , [, , "NA", "NA"],
            [, , "NA", "NA"], , , [, , "NA", "NA"]
        ],
        NR: [, [, , "[458]\\d{6}", "\\d{7}"],
            [, , "(?:444|888)\\d{4}", "\\d{7}", , , "4441234"],
            [, , "55[5-9]\\d{4}", "\\d{7}", , , "5551234"],
            [, , "NA", "NA"],
            [, , "NA", "NA"],
            [, , "NA", "NA"],
            [, , "NA", "NA"],
            [, , "NA", "NA"], "NR", 674, "00", , , , , , , , [
                [, "(\\d{3})(\\d{4})", "$1 $2"]
            ], , [, , "NA", "NA"], , , [, , "NA", "NA"],
            [, , "NA", "NA"], , , [, , "NA", "NA"]
        ],
        NU: [, [, , "[1-5]\\d{3}", "\\d{4}"],
            [, , "[34]\\d{3}", "\\d{4}", , , "4002"],
            [, , "[125]\\d{3}", "\\d{4}", , , "1234"],
            [, , "NA", "NA"],
            [, , "NA", "NA"],
            [, , "NA", "NA"],
            [, , "NA", "NA"],
            [, , "NA", "NA"], "NU", 683, "00", , , , , , , , , , [, , "NA", "NA"], , , [, , "NA", "NA"],
            [, , "NA", "NA"], , , [, , "NA", "NA"]
        ],
        NZ: [, [, , "6[235-9]\\d{6}|[2-57-9]\\d{7,10}", "\\d{7,11}"],
            [, , "(?:3[2-79]|[49][2-9]|6[235-9]|7[2-57-9])\\d{6}|24099\\d{3}", "\\d{7,8}", , , "32345678"],
            [, , "2(?:[028]\\d{7,8}|1(?:[03]\\d{5,7}|[12457]\\d{5,6}|[689]\\d{5})|[79]\\d{7})", "\\d{8,10}", , , "211234567"],
            [, , "508\\d{6,7}|80\\d{6,8}", "\\d{8,10}", , , "800123456"],
            [, , "90\\d{7,9}", "\\d{9,11}", , , "900123456"],
            [, , "NA", "NA"],
            [, , "70\\d{7}", "\\d{9}", , , "701234567"],
            [, , "NA", "NA"], "NZ", 64, "0(?:0|161)", "0", , , "0", , "00", , [
                [, "([34679])(\\d{3})(\\d{4})", "$1-$2 $3", ["[346]|7[2-57-9]|9[1-9]"], "0$1"],
                [, "(24099)(\\d{3})", "$1 $2", ["240", "2409", "24099"], "0$1"],
                [, "(\\d{2})(\\d{3})(\\d{3})", "$1 $2 $3", ["21"], "0$1"],
                [, "(\\d{2})(\\d{3})(\\d{3,5})", "$1 $2 $3", ["2(?:1[1-9]|[69]|7[0-35-9])|70|86"], "0$1"],
                [, "(2\\d)(\\d{3,4})(\\d{4})", "$1 $2 $3", ["2[028]"], "0$1"],
                [, "(\\d{3})(\\d{3})(\\d{3,4})", "$1 $2 $3", ["2(?:10|74)|5|[89]0"], "0$1"]
            ], , [, , "[28]6\\d{6,7}", "\\d{8,9}", , , "26123456"], , , [, , "NA", "NA"],
            [, , "NA", "NA"], , , [, , "NA", "NA"]
        ],
        OM: [, [, , "(?:2[2-6]|5|9\\d)\\d{6}|800\\d{5,6}", "\\d{7,9}"],
            [, , "2[2-6]\\d{6}", "\\d{8}", , , "23123456"],
            [, , "9(?:0[1-9]|[1-9]\\d)\\d{5}", "\\d{8}", , , "92123456"],
            [, , "8007\\d{4,5}|500\\d{4}", "\\d{7,9}", , , "80071234"],
            [, , "(?:900)\\d{5}", "\\d{8}", , , "90012345"],
            [, , "NA", "NA"],
            [, , "NA", "NA"],
            [, , "NA", "NA"], "OM", 968, "00", , , , , , , , [
                [, "(2\\d)(\\d{6})", "$1 $2", ["2"]],
                [, "(9\\d{3})(\\d{4})", "$1 $2", ["9"]],
                [, "([58]00)(\\d{4,6})", "$1 $2", ["[58]"]]
            ], , [, , "NA", "NA"], , , [, , "NA", "NA"],
            [, , "NA", "NA"], , , [, , "NA", "NA"]
        ],
        PA: [, [, , "[1-9]\\d{6,7}", "\\d{7,8}"],
            [, , "(?:1(?:0[0-8]|1[49]|2[37]|3[0137]|4[147]|5[05]|6[58]|7[0167]|8[58]|9[139])|2(?:[0235679]\\d|1[0-7]|4[04-9]|8[028])|3(?:[09]\\d|1[014-7]|2[0-3]|3[03]|4[03-57]|55|6[068]|7[06-8]|8[06-9])|4(?:3[013-69]|4\\d|7[0-589])|5(?:[01]\\d|2[0-7]|[56]0|79)|7(?:0[09]|2[0-267]|3[06]|[469]0|5[06-9]|7[0-24-79]|8[7-9])|8(?:09|[34]\\d|5[0134]|8[02])|9(?:0[6-9]|1[016-8]|2[036-8]|3[3679]|40|5[0489]|6[06-9]|7[046-9]|8[36-8]|9[1-9]))\\d{4}", "\\d{7}", , , "2001234"],
            [, , "(?:1[16]1|21[89]|8(?:1[01]|7[23]))\\d{4}|6(?:[024-9]\\d|1[0-5]|3[0-24-9])\\d{5}", "\\d{7,8}", , , "60012345"],
            [, , "80[09]\\d{4}", "\\d{7}", , , "8001234"],
            [, , "(?:779|8(?:55|60|7[78])|9(?:00|81))\\d{4}", "\\d{7}", , , "8601234"],
            [, , "NA", "NA"],
            [, , "NA", "NA"],
            [, , "NA", "NA"], "PA", 507, "00", , , , , , , , [
                [, "(\\d{3})(\\d{4})", "$1-$2", ["[1-57-9]"]],
                [, "(\\d{4})(\\d{4})", "$1-$2", ["6"]]
            ], , [, , "NA", "NA"], , , [, , "NA", "NA"],
            [, , "NA", "NA"], , , [, , "NA", "NA"]
        ],
        PE: [, [, , "[14-9]\\d{7,8}", "\\d{6,9}"],
            [, , "(?:1\\d|4[1-4]|5[1-46]|6[1-7]|7[2-46]|8[2-4])\\d{6}", "\\d{6,8}", , , "11234567"],
            [, , "9\\d{8}", "\\d{9}", , , "912345678"],
            [, , "800\\d{5}", "\\d{8}", , , "80012345"],
            [, , "805\\d{5}", "\\d{8}", , , "80512345"],
            [, , "801\\d{5}", "\\d{8}", , , "80112345"],
            [, , "80[24]\\d{5}", "\\d{8}", , , "80212345"],
            [, , "NA", "NA"], "PE", 51, "19(?:1[124]|77|90)00", "0", " Anexo ", , "0", , , , [
                [, "(1)(\\d{7})", "$1 $2", ["1"], "(0$1)"],
                [, "([4-8]\\d)(\\d{6})", "$1 $2", ["[4-7]|8[2-4]"], "(0$1)"],
                [, "(\\d{3})(\\d{5})", "$1 $2", ["80"], "(0$1)"],
                [, "(9\\d{2})(\\d{3})(\\d{3})", "$1 $2 $3", ["9"], "$1"]
            ], , [, , "NA", "NA"], , , [, , "NA", "NA"],
            [, , "NA", "NA"], , , [, , "NA", "NA"]
        ],
        PF: [, [, , "4\\d{5,7}|8\\d{7}", "\\d{6}(?:\\d{2})?"],
            [, , "4(?:[09][45689]\\d|4)\\d{4}", "\\d{6}(?:\\d{2})?", , , "40412345"],
            [, , "8[79]\\d{6}", "\\d{8}", , , "87123456"],
            [, , "NA", "NA"],
            [, , "NA", "NA"],
            [, , "NA", "NA"],
            [, , "NA", "NA"],
            [, , "NA", "NA"], "PF", 689, "00", , , , , , , , [
                [, "(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["4[09]|8[79]"]],
                [, "(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3", ["44"]]
            ], , [, , "NA", "NA"], , , [, , "44\\d{4}", "\\d{6}", , , "441234"],
            [, , "NA", "NA"], , , [, , "NA", "NA"]
        ],
        PG: [, [, , "[1-9]\\d{6,7}", "\\d{7,8}"],
            [, , "(?:3[0-2]\\d|4[25]\\d|5[34]\\d|64[1-9]|77(?:[0-24]\\d|30)|85[02-46-9]|9[78]\\d)\\d{4}", "\\d{7}", , , "3123456"],
            [, , "(?:20150|68\\d{2}|7(?:[0-369]\\d|75)\\d{2})\\d{3}", "\\d{7,8}", , , "6812345"],
            [, , "180\\d{4}", "\\d{7}", , , "1801234"],
            [, , "NA", "NA"],
            [, , "NA", "NA"],
            [, , "NA", "NA"],
            [, , "275\\d{4}", "\\d{7}", , , "2751234"], "PG", 675, "00", , , , , , , , [
                [, "(\\d{3})(\\d{4})", "$1 $2", ["[13-689]|27"]],
                [, "(\\d{4})(\\d{4})", "$1 $2", ["20|7"]]
            ], , [, , "NA", "NA"], , , [, , "NA", "NA"],
            [, , "NA", "NA"], , , [, , "NA", "NA"]
        ],
        PH: [, [, , "2\\d{5,7}|[3-9]\\d{7,9}|1800\\d{7,9}", "\\d{5,13}"],
            [, , "2\\d{5}(?:\\d{2})?|(?:3[2-68]|4[2-9]|5[2-6]|6[2-58]|7[24578]|8[2-8])\\d{7}|88(?:22\\d{6}|42\\d{4})", "\\d{5,10}", , , "21234567"],
            [, , "(?:81[37]|9(?:0[5-9]|1[024-9]|2[0-35-9]|3[02-9]|4[236-9]|50|7[34-79]|89|9[4-9]))\\d{7}", "\\d{10}", , , "9051234567"],
            [, , "1800\\d{7,9}", "\\d{11,13}", , , "180012345678"],
            [, , "NA", "NA"],
            [, , "NA", "NA"],
            [, , "NA", "NA"],
            [, , "NA", "NA"], "PH", 63, "00", "0", , , "0", , , , [
                [, "(2)(\\d{3})(\\d{4})", "$1 $2 $3", ["2"], "(0$1)"],
                [, "(2)(\\d{5})", "$1 $2", ["2"], "(0$1)"],
                [, "(\\d{4})(\\d{4,6})", "$1 $2", ["3(?:23|39|46)|4(?:2[3-6]|[35]9|4[26]|76)|5(?:22|44)|642|8(?:62|8[245])", "3(?:230|397|461)|4(?:2(?:35|[46]4|51)|396|4(?:22|63)|59[347]|76[15])|5(?:221|446)|642[23]|8(?:622|8(?:[24]2|5[13]))"], "(0$1)"],
                [, "(\\d{5})(\\d{4})", "$1 $2", ["346|4(?:27|9[35])|883", "3469|4(?:279|9(?:30|56))|8834"], "(0$1)"],
                [, "([3-8]\\d)(\\d{3})(\\d{4})", "$1 $2 $3", ["[3-8]"], "(0$1)"],
                [, "(\\d{3})(\\d{3})(\\d{4})", "$1 $2 $3", ["81|9"], "0$1"],
                [, "(1800)(\\d{3})(\\d{4})", "$1 $2 $3", ["1"]],
                [, "(1800)(\\d{1,2})(\\d{3})(\\d{4})", "$1 $2 $3 $4", ["1"]]
            ], , [, , "NA", "NA"], , , [, , "NA", "NA"],
            [, , "NA", "NA"], , , [, , "NA", "NA"]
        ],
        PK: [, [, , "1\\d{8}|[2-8]\\d{5,11}|9(?:[013-9]\\d{4,9}|2\\d(?:111\\d{6}|\\d{3,7}))", "\\d{6,12}"],
            [, , "(?:21|42)[2-9]\\d{7}|(?:2[25]|4[0146-9]|5[1-35-7]|6[1-8]|7[14]|8[16]|91)[2-9]\\d{6}|(?:2(?:3[2358]|4[2-4]|9[2-8])|45[3479]|54[2-467]|60[468]|72[236]|8(?:2[2-689]|3[23578]|4[3478]|5[2356])|9(?:1|2[2-8]|3[27-9]|4[2-6]|6[3569]|9[25-8]))[2-9]\\d{5,6}|58[126]\\d{7}", "\\d{6,10}", , , "2123456789"],
            [, , "3(?:0\\d|1[0-6]|2[0-5]|3[0-7]|4[0-8]|55|64)\\d{7}", "\\d{10}", , , "3012345678"],
            [, , "800\\d{5}", "\\d{8}", , , "80012345"],
            [, , "900\\d{5}", "\\d{8}", , , "90012345"],
            [, , "NA", "NA"],
            [, , "122\\d{6}", "\\d{9}", , , "122044444"],
            [, , "NA", "NA"], "PK", 92, "00", "0", , , "0", , , , [
                [, "(\\d{2})(111)(\\d{3})(\\d{3})", "$1 $2 $3 $4", ["(?:2[125]|4[0-246-9]|5[1-35-7]|6[1-8]|7[14]|8[16]|91)1", "(?:2[125]|4[0-246-9]|5[1-35-7]|6[1-8]|7[14]|8[16]|91)11", "(?:2[125]|4[0-246-9]|5[1-35-7]|6[1-8]|7[14]|8[16]|91)111"], "(0$1)"],
                [, "(\\d{3})(111)(\\d{3})(\\d{3})", "$1 $2 $3 $4", ["2[349]|45|54|60|72|8[2-5]|9[2-9]", "(?:2[349]|45|54|60|72|8[2-5]|9[2-9])\\d1", "(?:2[349]|45|54|60|72|8[2-5]|9[2-9])\\d11", "(?:2[349]|45|54|60|72|8[2-5]|9[2-9])\\d111"], "(0$1)"],
                [, "(\\d{2})(\\d{7,8})", "$1 $2", ["(?:2[125]|4[0-246-9]|5[1-35-7]|6[1-8]|7[14]|8[16]|91)[2-9]"], "(0$1)"],
                [, "(\\d{3})(\\d{6,7})", "$1 $2", ["2[349]|45|54|60|72|8[2-5]|9[2-9]", "(?:2[349]|45|54|60|72|8[2-5]|9[2-9])\\d[2-9]"], "(0$1)"],
                [, "(3\\d{2})(\\d{7})", "$1 $2", ["3"], "0$1"],
                [, "([15]\\d{3})(\\d{5,6})", "$1 $2", ["58[12]|1"], "(0$1)"],
                [, "(586\\d{2})(\\d{5})", "$1 $2", ["586"], "(0$1)"],
                [, "([89]00)(\\d{3})(\\d{2})", "$1 $2 $3", ["[89]00"], "0$1"]
            ], , [, , "NA", "NA"], , , [, , "NA", "NA"],
            [, , "(?:2(?:[125]|3[2358]|4[2-4]|9[2-8])|4(?:[0-246-9]|5[3479])|5(?:[1-35-7]|4[2-467])|6(?:[1-8]|0[468])|7(?:[14]|2[236])|8(?:[16]|2[2-689]|3[23578]|4[3478]|5[2356])|9(?:1|22|3[27-9]|4[2-6]|6[3569]|9[2-7]))111\\d{6}", "\\d{11,12}", , , "21111825888"], , , [, , "NA", "NA"]
        ],
        PL: [, [, , "[12]\\d{6,8}|[3-57-9]\\d{8}|6\\d{5,8}", "\\d{6,9}"],
            [, , "(?:1[2-8]|2[2-69]|3[2-4]|4[1-468]|5[24-689]|6[1-3578]|7[14-7]|8[1-79]|9[145])\\d{7}|[12]2\\d{5}", "\\d{6,9}", , , "123456789"],
            [, , "(?:5[0137]|6[069]|7[2389]|88)\\d{7}", "\\d{9}", , , "512345678"],
            [, , "800\\d{6}", "\\d{9}", , , "800123456"],
            [, , "70\\d{7}", "\\d{9}", , , "701234567"],
            [, , "801\\d{6}", "\\d{9}", , , "801234567"],
            [, , "NA", "NA"],
            [, , "39\\d{7}", "\\d{9}", , , "391234567"], "PL", 48, "00", , , , , , , , [
                [, "(\\d{2})(\\d{3})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[14]|2[0-57-9]|3[2-4]|5[24-689]|6[1-3578]|7[14-7]|8[1-79]|9[145]"]],
                [, "(\\d{2})(\\d{1})(\\d{4})", "$1 $2 $3", ["[12]2"]],
                [, "(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["26|39|5[0137]|6[0469]|7[02389]|8[08]"]],
                [, "(\\d{3})(\\d{2})(\\d{2,3})", "$1 $2 $3", ["64"]],
                [, "(\\d{3})(\\d{3})", "$1 $2", ["64"]]
            ], , [, , "64\\d{4,7}", "\\d{6,9}", , , "641234567"], , , [, , "NA", "NA"],
            [, , "NA", "NA"], , , [, , "NA", "NA"]
        ],
        PM: [, [, , "[45]\\d{5}", "\\d{6}"],
            [, , "41\\d{4}", "\\d{6}", , , "411234"],
            [, , "55\\d{4}", "\\d{6}", , , "551234"],
            [, , "NA", "NA"],
            [, , "NA", "NA"],
            [, , "NA", "NA"],
            [, , "NA", "NA"],
            [, , "NA", "NA"], "PM", 508, "00", "0", , , "0", , , , [
                [, "([45]\\d)(\\d{2})(\\d{2})", "$1 $2 $3", , "0$1"]
            ], , [, , "NA", "NA"], , , [, , "NA", "NA"],
            [, , "NA", "NA"], , , [, , "NA", "NA"]
        ],
        PR: [, [, , "[5789]\\d{9}", "\\d{7}(?:\\d{3})?"],
            [, , "(?:787|939)[2-9]\\d{6}", "\\d{7}(?:\\d{3})?", , , "7872345678"],
            [, , "(?:787|939)[2-9]\\d{6}", "\\d{7}(?:\\d{3})?", , , "7872345678"],
            [, , "8(?:00|44|55|66|77|88)[2-9]\\d{6}", "\\d{10}", , , "8002345678"],
            [, , "900[2-9]\\d{6}", "\\d{10}", , , "9002345678"],
            [, , "NA", "NA"],
            [, , "5(?:00|33|44|66|77)[2-9]\\d{6}", "\\d{10}", , , "5002345678"],
            [, , "NA", "NA"], "PR", 1, "011", "1", , , "1", , , 1, , , [, , "NA", "NA"], , "787|939", [, , "NA", "NA"],
            [, , "NA", "NA"], , , [, , "NA", "NA"]
        ],
        PS: [, [, , "[24589]\\d{7,8}|1(?:[78]\\d{8}|[49]\\d{2,3})", "\\d{4,10}"],
            [, , "(?:22[234789]|42[45]|82[01458]|92[369])\\d{5}", "\\d{7,8}", , , "22234567"],
            [, , "5[69]\\d{7}", "\\d{9}", , , "599123456"],
            [, , "1800\\d{6}", "\\d{10}", , , "1800123456"],
            [, , "1(?:4|9\\d)\\d{2}", "\\d{4,5}", , , "19123"],
            [, , "1700\\d{6}", "\\d{10}", , , "1700123456"],
            [, , "NA", "NA"],
            [, , "NA", "NA"], "PS", 970, "00", "0", , , "0", , , , [
                [, "([2489])(2\\d{2})(\\d{4})", "$1 $2 $3", ["[2489]"], "0$1"],
                [, "(5[69]\\d)(\\d{3})(\\d{3})", "$1 $2 $3", ["5"], "0$1"],
                [, "(1[78]00)(\\d{3})(\\d{3})", "$1 $2 $3", ["1[78]"], "$1"]
            ], , [, , "NA", "NA"], , , [, , "NA", "NA"],
            [, , "NA", "NA"], , , [, , "NA", "NA"]
        ],
        PT: [, [, , "[2-46-9]\\d{8}", "\\d{9}"],
            [, , "2(?:[12]\\d|[35][1-689]|4[1-59]|6[1-35689]|7[1-9]|8[1-69]|9[1256])\\d{6}", "\\d{9}", , , "212345678"],
            [, , "9(?:[1236]\\d{2}|480)\\d{5}", "\\d{9}", , , "912345678"],
            [, , "80[02]\\d{6}", "\\d{9}", , , "800123456"],
            [, , "6(?:0[178]|4[68])\\d{6}|76(?:0[1-57]|1[2-47]|2[237])\\d{5}", "\\d{9}", , , "760123456"],
            [, , "80(?:8\\d|9[1579])\\d{5}", "\\d{9}", , , "808123456"],
            [, , "884[0-4689]\\d{5}", "\\d{9}", , , "884123456"],
            [, , "30\\d{7}", "\\d{9}", , , "301234567"], "PT", 351, "00", , , , , , , , [
                [, "(2\\d)(\\d{3})(\\d{4})", "$1 $2 $3", ["2[12]"]],
                [, "([2-46-9]\\d{2})(\\d{3})(\\d{3})", "$1 $2 $3", ["2[3-9]|[346-9]"]]
            ], , [, , "NA", "NA"], , , [, , "NA", "NA"],
            [, , "7(?:0(?:7\\d|8[17]))\\d{5}", "\\d{9}", , , "707123456"], , , [, , "600\\d{6}", "\\d{9}", , , "600110000"]
        ],
        PW: [, [, , "[2-8]\\d{6}", "\\d{7}"],
            [, , "2552255|(?:277|345|488|5(?:35|44|87)|6(?:22|54|79)|7(?:33|47)|8(?:24|55|76))\\d{4}", "\\d{7}", , , "2771234"],
            [, , "(?:6[234689]0|77[45789])\\d{4}", "\\d{7}", , , "6201234"],
            [, , "NA", "NA"],
            [, , "NA", "NA"],
            [, , "NA", "NA"],
            [, , "NA", "NA"],
            [, , "NA", "NA"], "PW", 680, "01[12]", , , , , , , , [
                [, "(\\d{3})(\\d{4})", "$1 $2"]
            ], , [, , "NA", "NA"], , , [, , "NA", "NA"],
            [, , "NA", "NA"], , , [, , "NA", "NA"]
        ],
        PY: [, [, , "5[0-5]\\d{4,7}|[2-46-9]\\d{5,8}", "\\d{5,9}"],
            [, , "(?:[26]1|3[289]|4[124678]|7[123]|8[1236])\\d{5,7}|(?:2(?:2[4568]|7[15]|9[1-5])|3(?:18|3[167]|4[2357]|51)|4(?:18|2[45]|3[12]|5[13]|64|71|9[1-47])|5(?:[1-4]\\d|5[0234])|6(?:3[1-3]|44|7[1-4678])|7(?:17|4[0-4]|6[1-578]|75|8[0-8])|858)\\d{5,6}", "\\d{5,9}", , , "212345678"],
            [, , "9(?:6[12]|[78][1-6]|9[1-5])\\d{6}", "\\d{9}", , , "961456789"],
            [, , "NA", "NA"],
            [, , "NA", "NA"],
            [, , "NA", "NA"],
            [, , "NA", "NA"],
            [, , "8700[0-4]\\d{4}", "\\d{9}", , , "870012345"], "PY", 595, "00", "0", , , "0", , , , [
                [, "(\\d{2})(\\d{5,7})", "$1 $2", ["(?:[26]1|3[289]|4[124678]|7[123]|8[1236])"], "($1)"],
                [, "(\\d{3})(\\d{3,6})", "$1 $2", ["[2-9]0"], "0$1"],
                [, "(\\d{3})(\\d{6})", "$1 $2", ["9[1-9]"], "0$1"],
                [, "(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["8700"]],
                [, "(\\d{3})(\\d{4,6})", "$1 $2", ["[2-8][1-9]"], "($1)"]
            ], , [, , "NA", "NA"], , , [, , "NA", "NA"],
            [, , "[2-9]0\\d{4,7}", "\\d{6,9}", , , "201234567"], , , [, , "NA", "NA"]
        ],
        QA: [, [, , "[2-8]\\d{6,7}", "\\d{7,8}"],
            [, , "4[04]\\d{6}", "\\d{7,8}", , , "44123456"],
            [, , "[3567]\\d{7}", "\\d{7,8}", , , "33123456"],
            [, , "800\\d{4}", "\\d{7,8}", , , "8001234"],
            [, , "NA", "NA"],
            [, , "NA", "NA"],
            [, , "NA", "NA"],
            [, , "NA", "NA"], "QA", 974, "00", , , , , , , , [
                [, "([28]\\d{2})(\\d{4})", "$1 $2", ["[28]"]],
                [, "([3-7]\\d{3})(\\d{4})", "$1 $2", ["[3-7]"]]
            ], , [, , "2(?:[12]\\d|61)\\d{4}", "\\d{7}", , , "2123456"], , , [, , "NA", "NA"],
            [, , "NA", "NA"], , , [, , "NA", "NA"]
        ],
        RE: [, [, , "[268]\\d{8}", "\\d{9}"],
            [, , "262\\d{6}", "\\d{9}", , , "262161234"],
            [, , "6(?:9[23]|47)\\d{6}", "\\d{9}", , , "692123456"],
            [, , "80\\d{7}", "\\d{9}", , , "801234567"],
            [, , "89[1-37-9]\\d{6}", "\\d{9}", , , "891123456"],
            [, , "8(?:1[019]|2[0156]|84|90)\\d{6}", "\\d{9}", , , "810123456"],
            [, , "NA", "NA"],
            [, , "NA", "NA"], "RE", 262, "00", "0", , , "0", , , , [
                [, "([268]\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", , "0$1"]
            ], , [, , "NA", "NA"], 1, "262|6[49]|8", [, , "NA", "NA"],
            [, , "NA", "NA"], , , [, , "NA", "NA"]
        ],
        RO: [, [, , "2\\d{5,8}|[37-9]\\d{8}", "\\d{6,9}"],
            [, , "2(?:1(?:\\d{7}|9\\d{3})|[3-6](?:\\d{7}|\\d9\\d{2}))|3[13-6]\\d{7}", "\\d{6,9}", , , "211234567"],
            [, , "7(?:[0-8]\\d{2}|99\\d)\\d{5}", "\\d{9}", , , "712345678"],
            [, , "800\\d{6}", "\\d{9}", , , "800123456"],
            [, , "90[036]\\d{6}", "\\d{9}", , , "900123456"],
            [, , "801\\d{6}", "\\d{9}", , , "801123456"],
            [, , "802\\d{6}", "\\d{9}", , , "802123456"],
            [, , "NA", "NA"], "RO", 40, "00", "0", " int ", , "0", , , , [
                [, "(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["[23]1"], "0$1"],
                [, "(21)(\\d{4})", "$1 $2", ["21"], "0$1"],
                [, "(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["[23][3-7]|[7-9]"], "0$1"],
                [, "(2\\d{2})(\\d{3})", "$1 $2", ["2[3-6]"], "0$1"]
            ], , [, , "NA", "NA"], , , [, , "NA", "NA"],
            [, , "37\\d{7}", "\\d{9}", , , "372123456"], , , [, , "NA", "NA"]
        ],
        RS: [, [, , "[126-9]\\d{4,11}|3(?:[0-79]\\d{3,10}|8[2-9]\\d{2,9})", "\\d{5,12}"],
            [, , "(?:1(?:[02-9][2-9]|1[1-9])\\d|2(?:[0-24-7][2-9]\\d|[389](?:0[2-9]|[2-9]\\d))|3(?:[0-8][2-9]\\d|9(?:[2-9]\\d|0[2-9])))\\d{3,8}", "\\d{5,12}", , , "10234567"],
            [, , "6(?:[0-689]|7\\d)\\d{6,7}", "\\d{8,10}", , , "601234567"],
            [, , "800\\d{3,9}", "\\d{6,12}", , , "80012345"],
            [, , "(?:90[0169]|78\\d)\\d{3,7}", "\\d{6,12}", , , "90012345"],
            [, , "NA", "NA"],
            [, , "NA", "NA"],
            [, , "NA", "NA"], "RS", 381, "00", "0", , , "0", , , , [
                [, "([23]\\d{2})(\\d{4,9})", "$1 $2", ["(?:2[389]|39)0"], "0$1"],
                [, "([1-3]\\d)(\\d{5,10})", "$1 $2", ["1|2(?:[0-24-7]|[389][1-9])|3(?:[0-8]|9[1-9])"], "0$1"],
                [, "(6\\d)(\\d{6,8})", "$1 $2", ["6"], "0$1"],
                [, "([89]\\d{2})(\\d{3,9})", "$1 $2", ["[89]"], "0$1"],
                [, "(7[26])(\\d{4,9})", "$1 $2", ["7[26]"], "0$1"],
                [, "(7[08]\\d)(\\d{4,9})", "$1 $2", ["7[08]"], "0$1"]
            ], , [, , "NA", "NA"], , , [, , "NA", "NA"],
            [, , "7[06]\\d{4,10}", "\\d{6,12}", , , "700123456"], , , [, , "NA", "NA"]
        ],
        RU: [, [, , "[3489]\\d{9}", "\\d{10}"],
            [, , "(?:3(?:0[12]|4[1-35-79]|5[1-3]|65|8[1-58]|9[0145])|4(?:01|1[1356]|2[13467]|7[1-5]|8[1-7]|9[1-689])|8(?:1[1-8]|2[01]|3[13-6]|4[0-8]|5[15]|6[1-35-79]|7[1-37-9]))\\d{7}", "\\d{10}", , , "3011234567"],
            [, , "9\\d{9}", "\\d{10}", , , "9123456789"],
            [, , "80[04]\\d{7}", "\\d{10}", , , "8001234567"],
            [, , "80[39]\\d{7}", "\\d{10}", , , "8091234567"],
            [, , "NA", "NA"],
            [, , "NA", "NA"],
            [, , "NA", "NA"], "RU", 7, "810", "8", , , "8", , "8~10", , [
                [, "(\\d{3})(\\d{2})(\\d{2})", "$1-$2-$3", ["[1-79]"], "$1", , 1],
                [, "([3489]\\d{2})(\\d{3})(\\d{2})(\\d{2})", "$1 $2-$3-$4", ["[34689]"], "8 ($1)", , 1],
                [, "(7\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["7"], "8 ($1)", , 1]
            ],
            [
                [, "([3489]\\d{2})(\\d{3})(\\d{2})(\\d{2})", "$1 $2-$3-$4", ["[34689]"], "8 ($1)", , 1],
                [, "(7\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["7"], "8 ($1)", , 1]
            ],
            [, , "NA", "NA"], 1, , [, , "NA", "NA"],
            [, , "NA", "NA"], , , [, , "NA", "NA"]
        ],
        RW: [, [, , "[027-9]\\d{7,8}", "\\d{8,9}"],
            [, , "2[258]\\d{7}|06\\d{6}", "\\d{8,9}", , , "250123456"],
            [, , "7[238]\\d{7}", "\\d{9}", , , "720123456"],
            [, , "800\\d{6}", "\\d{9}", , , "800123456"],
            [, , "900\\d{6}", "\\d{9}", , , "900123456"],
            [, , "NA", "NA"],
            [, , "NA", "NA"],
            [, , "NA", "NA"], "RW", 250, "00", "0", , , "0", , , , [
                [, "(2\\d{2})(\\d{3})(\\d{3})", "$1 $2 $3", ["2"], "$1"],
                [, "([7-9]\\d{2})(\\d{3})(\\d{3})", "$1 $2 $3", ["[7-9]"], "0$1"],
                [, "(0\\d)(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["0"]]
            ], , [, , "NA", "NA"], , , [, , "NA", "NA"],
            [, , "NA", "NA"], 1, , [, , "NA", "NA"]
        ],
        SA: [, [, , "1\\d{7,8}|(?:[2-467]|92)\\d{7}|5\\d{8}|8\\d{9}", "\\d{7,10}"],
            [, , "11\\d{7}|1?(?:2[24-8]|3[35-8]|4[3-68]|6[2-5]|7[235-7])\\d{6}", "\\d{7,9}", , , "112345678"],
            [, , "(?:5(?:[013-689]\\d|7[0-26-8])|811\\d)\\d{6}", "\\d{9,10}", , , "512345678"],
            [, , "800\\d{7}", "\\d{10}", , , "8001234567"],
            [, , "NA", "NA"],
            [, , "92[05]\\d{6}", "\\d{9}", , , "920012345"],
            [, , "NA", "NA"],
            [, , "NA", "NA"], "SA", 966, "00", "0", , , "0", , , , [
                [, "([1-467])(\\d{3})(\\d{4})", "$1 $2 $3", ["[1-467]"], "0$1"],
                [, "(1\\d)(\\d{3})(\\d{4})", "$1 $2 $3", ["1[1-467]"], "0$1"],
                [, "(5\\d)(\\d{3})(\\d{4})", "$1 $2 $3", ["5"], "0$1"],
                [, "(92\\d{2})(\\d{5})", "$1 $2", ["92"], "$1"],
                [, "(800)(\\d{3})(\\d{4})", "$1 $2 $3", ["80"], "$1"],
                [, "(811)(\\d{3})(\\d{3,4})", "$1 $2 $3", ["81"], "0$1"]
            ], , [, , "NA", "NA"], , , [, , "NA", "NA"],
            [, , "NA", "NA"], , , [, , "NA", "NA"]
        ],
        SB: [, [, , "[1-9]\\d{4,6}", "\\d{5,7}"],
            [, , "(?:1[4-79]|[23]\\d|4[0-2]|5[03]|6[0-37])\\d{3}", "\\d{5}", , , "40123"],
            [, , "48\\d{3}|7(?:30|[46-8]\\d|5[025-9]|9[0-5])\\d{4}|8[4-8]\\d{5}|9(?:1[2-9]|2[013-9]|3[0-2]|[46]\\d|5[0-46-9]|7[0-689]|8[0-79]|9[0-8])\\d{4}", "\\d{5,7}", , , "7421234"],
            [, , "1[38]\\d{3}", "\\d{5}", , , "18123"],
            [, , "NA", "NA"],
            [, , "NA", "NA"],
            [, , "NA", "NA"],
            [, , "5[12]\\d{3}", "\\d{5}", , , "51123"], "SB", 677, "0[01]", , , , , , , , [
                [, "(\\d{2})(\\d{5})", "$1 $2", ["[7-9]"]]
            ], , [, , "NA", "NA"], , , [, , "NA", "NA"],
            [, , "NA", "NA"], , , [, , "NA", "NA"]
        ],
        SC: [, [, , "[2468]\\d{5,6}", "\\d{6,7}"],
            [, , "4[2-46]\\d{5}", "\\d{7}", , , "4217123"],
            [, , "2[5-8]\\d{5}", "\\d{7}", , , "2510123"],
            [, , "8000\\d{2}", "\\d{6}", , , "800000"],
            [, , "NA", "NA"],
            [, , "NA", "NA"],
            [, , "NA", "NA"],
            [, , "64\\d{5}", "\\d{7}", , , "6412345"], "SC", 248, "0[0-2]", , , , , , "00", , [
                [, "(\\d{3})(\\d{3})", "$1 $2", ["8"]],
                [, "(\\d)(\\d{3})(\\d{3})", "$1 $2 $3", ["[246]"]]
            ], , [, , "NA", "NA"], , , [, , "NA", "NA"],
            [, , "NA", "NA"], , , [, , "NA", "NA"]
        ],
        SD: [, [, , "[19]\\d{8}", "\\d{9}"],
            [, , "1(?:[125]\\d|8[3567])\\d{6}", "\\d{9}", , , "121231234"],
            [, , "9[0-3569]\\d{7}", "\\d{9}", , , "911231234"],
            [, , "NA", "NA"],
            [, , "NA", "NA"],
            [, , "NA", "NA"],
            [, , "NA", "NA"],
            [, , "NA", "NA"], "SD", 249, "00", "0", , , "0", , , , [
                [, "(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", , "0$1"]
            ], , [, , "NA", "NA"], , , [, , "NA", "NA"],
            [, , "NA", "NA"], , , [, , "NA", "NA"]
        ],
        SE: [, [, , "[1-9]\\d{5,9}", "\\d{5,10}"],
            [, , "1(?:0[1-8]\\d{6}|[136]\\d{5,7}|(?:2[0-35]|4[0-4]|5[0-25-9]|7[13-6]|[89]\\d)\\d{5,6})|2(?:[136]\\d{5,7}|(?:2[0-7]|4[0136-8]|5[0138]|7[018]|8[01]|9[0-57])\\d{5,6})|3(?:[356]\\d{5,7}|(?:0[0-4]|1\\d|2[0-25]|4[056]|7[0-2]|8[0-3]|9[023])\\d{5,6})|4(?:0[1-9]\\d{4,6}|[246]\\d{5,7}|(?:1[013-8]|3[0135]|5[14-79]|7[0-246-9]|8[0156]|9[0-689])\\d{5,6})|5(?:0[0-6]|[15][0-5]|2[0-68]|3[0-4]|4\\d|6[03-5]|7[013]|8[0-79]|9[01])\\d{5,6}|6(?:0[1-9]\\d{4,6}|3\\d{5,7}|(?:1[1-3]|2[0-4]|4[02-57]|5[0-37]|6[0-3]|7[0-2]|8[0247]|9[0-356])\\d{5,6})|8[1-9]\\d{5,7}|9(?:0[1-9]\\d{4,6}|(?:1[0-68]|2\\d|3[02-5]|4[0-3]|5[0-4]|[68][01]|7[0135-8])\\d{5,6})", "\\d{5,9}", , , "8123456"],
            [, , "7[02369]\\d{7}", "\\d{9}", , , "701234567"],
            [, , "20(?:0(?:0\\d{2}|[1-9](?:0\\d{1,4}|[1-9]\\d{4}))|1(?:0\\d{4}|[1-9]\\d{4,5})|[2-9]\\d{5})", "\\d{6,9}", , , "20123456"],
            [, , "9(?:00|39|44)(?:1(?:[0-26]\\d{5}|[3-57-9]\\d{2})|2(?:[0-2]\\d{5}|[3-9]\\d{2})|3(?:[0139]\\d{5}|[24-8]\\d{2})|4(?:[045]\\d{5}|[1-36-9]\\d{2})|5(?:5\\d{5}|[0-46-9]\\d{2})|6(?:[679]\\d{5}|[0-58]\\d{2})|7(?:[078]\\d{5}|[1-69]\\d{2})|8(?:[578]\\d{5}|[0-469]\\d{2}))", "\\d{7}(?:\\d{3})?", , , "9001234567"],
            [, , "77(?:0(?:0\\d{2}|[1-9](?:0\\d|[1-9]\\d{4}))|[1-6][1-9]\\d{5})", "\\d{6}(?:\\d{3})?", , , "771234567"],
            [, , "75[1-8]\\d{6}", "\\d{9}", , , "751234567"],
            [, , "NA", "NA"], "SE", 46, "00", "0", , , "0", , , , [
                [, "(8)(\\d{2,3})(\\d{2,3})(\\d{2})", "$1-$2 $3 $4", ["8"], "0$1"],
                [, "([1-69]\\d)(\\d{2,3})(\\d{2})(\\d{2})", "$1-$2 $3 $4", ["1[013689]|2[0136]|3[1356]|4[0246]|54|6[03]|90"], "0$1"],
                [, "([1-69]\\d)(\\d{3})(\\d{2})", "$1-$2 $3", ["1[13689]|2[136]|3[1356]|4[0246]|54|6[03]|90"], "0$1"],
                [, "(\\d{3})(\\d{2})(\\d{2})(\\d{2})", "$1-$2 $3 $4", ["1[2457]|2[2457-9]|3[0247-9]|4[1357-9]|5[0-35-9]|6[124-9]|9(?:[125-8]|3[0-5]|4[0-3])"], "0$1"],
                [, "(\\d{3})(\\d{2,3})(\\d{2})", "$1-$2 $3", ["1[2457]|2[2457-9]|3[0247-9]|4[1357-9]|5[0-35-9]|6[124-9]|9(?:[125-8]|3[0-5]|4[0-3])"], "0$1"],
                [, "(7\\d)(\\d{3})(\\d{2})(\\d{2})", "$1-$2 $3 $4", ["7"], "0$1"],
                [, "(77)(\\d{2})(\\d{2})", "$1-$2$3", ["7"], "0$1"],
                [, "(20)(\\d{2,3})(\\d{2})", "$1-$2 $3", ["20"], "0$1"],
                [, "(9[034]\\d)(\\d{2})(\\d{2})(\\d{3})", "$1-$2 $3 $4", ["9[034]"], "0$1"],
                [, "(9[034]\\d)(\\d{4})", "$1-$2", ["9[034]"], "0$1"]
            ],
            [
                [, "(8)(\\d{2,3})(\\d{2,3})(\\d{2})", "$1 $2 $3 $4", ["8"]],
                [, "([1-69]\\d)(\\d{2,3})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["1[013689]|2[0136]|3[1356]|4[0246]|54|6[03]|90"]],
                [, "([1-69]\\d)(\\d{3})(\\d{2})", "$1 $2 $3", ["1[13689]|2[136]|3[1356]|4[0246]|54|6[03]|90"]],
                [, "(\\d{3})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["1[2457]|2[2457-9]|3[0247-9]|4[1357-9]|5[0-35-9]|6[124-9]|9(?:[125-8]|3[0-5]|4[0-3])"]],
                [, "(\\d{3})(\\d{2,3})(\\d{2})", "$1 $2 $3", ["1[2457]|2[2457-9]|3[0247-9]|4[1357-9]|5[0-35-9]|6[124-9]|9(?:[125-8]|3[0-5]|4[0-3])"]],
                [, "(7\\d)(\\d{3})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["7"]],
                [, "(77)(\\d{2})(\\d{2})", "$1 $2 $3", ["7"]],
                [, "(20)(\\d{2,3})(\\d{2})", "$1 $2 $3", ["20"]],
                [, "(9[034]\\d)(\\d{2})(\\d{2})(\\d{3})", "$1 $2 $3 $4", ["9[034]"]],
                [, "(9[034]\\d)(\\d{4})", "$1 $2", ["9[034]"]]
            ],
            [, , "74[02-9]\\d{6}", "\\d{9}", , , "740123456"], , , [, , "NA", "NA"],
            [, , "NA", "NA"], , , [, , "NA", "NA"]
        ],
        SG: [, [, , "[36]\\d{7}|[17-9]\\d{7,10}", "\\d{8,11}"],
            [, , "6[1-9]\\d{6}", "\\d{8}", , , "61234567"],
            [, , "(?:8[1-8]|9[0-8])\\d{6}", "\\d{8}", , , "81234567"],
            [, , "1?800\\d{7}", "\\d{10,11}", , , "18001234567"],
            [, , "1900\\d{7}", "\\d{11}", , , "19001234567"],
            [, , "NA", "NA"],
            [, , "NA", "NA"],
            [, , "3[12]\\d{6}", "\\d{8}", , , "31234567"], "SG", 65, "0[0-3]\\d", , , , , , , , [
                [, "([3689]\\d{3})(\\d{4})", "$1 $2", ["[369]|8[1-9]"]],
                [, "(1[89]00)(\\d{3})(\\d{4})", "$1 $2 $3", ["1[89]"]],
                [, "(7000)(\\d{4})(\\d{3})", "$1 $2 $3", ["70"]],
                [, "(800)(\\d{3})(\\d{4})", "$1 $2 $3", ["80"]]
            ], , [, , "NA", "NA"], , , [, , "NA", "NA"],
            [, , "7000\\d{7}", "\\d{11}", , , "70001234567"], , , [, , "NA", "NA"]
        ],
        SH: [, [, , "[256]\\d{4}", "\\d{4,5}"],
            [, , "2(?:[0-57-9]\\d|6[4-9])\\d{2}", "\\d{5}", , , "22158"],
            [, , "[56]\\d{4}", "\\d{5}"],
            [, , "NA", "NA"],
            [, , "NA", "NA"],
            [, , "NA", "NA"],
            [, , "NA", "NA"],
            [, , "262\\d{2}", "\\d{5}"], "SH", 290, "00", , , , , , , , , , [, , "NA", "NA"], 1, , [, , "NA", "NA"],
            [, , "NA", "NA"], , , [, , "NA", "NA"]
        ],
        SI: [, [, , "[1-7]\\d{6,7}|[89]\\d{4,7}", "\\d{5,8}"],
            [, , "(?:1\\d|[25][2-8]|3[4-8]|4[24-8]|7[3-8])\\d{6}", "\\d{7,8}", , , "11234567"],
            [, , "(?:[37][01]|4[0139]|51|6[48])\\d{6}", "\\d{8}", , , "31234567"],
            [, , "80\\d{4,6}", "\\d{6,8}", , , "80123456"],
            [, , "90\\d{4,6}|89[1-3]\\d{2,5}", "\\d{5,8}", , , "90123456"],
            [, , "NA", "NA"],
            [, , "NA", "NA"],
            [, , "(?:59|8[1-3])\\d{6}", "\\d{8}", , , "59012345"], "SI", 386, "00", "0", , , "0", , , , [
                [, "(\\d)(\\d{3})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[12]|3[4-8]|4[24-8]|5[2-8]|7[3-8]"], "(0$1)"],
                [, "([3-7]\\d)(\\d{3})(\\d{3})", "$1 $2 $3", ["[37][01]|4[0139]|51|6"], "0$1"],
                [, "([89][09])(\\d{3,6})", "$1 $2", ["[89][09]"], "0$1"],
                [, "([58]\\d{2})(\\d{5})", "$1 $2", ["59|8[1-3]"], "0$1"]
            ], , [, , "NA", "NA"], , , [, , "NA", "NA"],
            [, , "NA", "NA"], , , [, , "NA", "NA"]
        ],
        SJ: [, [, , "0\\d{4}|[4789]\\d{7}", "\\d{5}(?:\\d{3})?"],
            [, , "79\\d{6}", "\\d{8}", , , "79123456"],
            [, , "(?:4[015-8]|5[89]|9\\d)\\d{6}", "\\d{8}", , , "41234567"],
            [, , "80[01]\\d{5}", "\\d{8}", , , "80012345"],
            [, , "82[09]\\d{5}", "\\d{8}", , , "82012345"],
            [, , "810(?:0[0-6]|[2-8]\\d)\\d{3}", "\\d{8}", , , "81021234"],
            [, , "880\\d{5}", "\\d{8}", , , "88012345"],
            [, , "85[0-5]\\d{5}", "\\d{8}", , , "85012345"], "SJ", 47, "00", , , , , , , , , , [, , "NA", "NA"], , , [, , "NA", "NA"],
            [, , "0\\d{4}|81(?:0(?:0[7-9]|1\\d)|5\\d{2})\\d{3}", "\\d{5}(?:\\d{3})?", , , "01234"], 1, , [, , "81[23]\\d{5}", "\\d{8}", , , "81212345"]
        ],
        SK: [, [, , "(?:[2-68]\\d{8}|9\\d{6,8})", "\\d{7,9}"],
            [, , "[2-5]\\d{8}", "\\d{9}", , , "212345678"],
            [, , "9(?:0[1-8]|1[0-24-9]|4[0489]|50)\\d{6}", "\\d{9}", , , "912123456"],
            [, , "800\\d{6}", "\\d{9}", , , "800123456"],
            [, , "9(?:[78]\\d{7}|00\\d{6})", "\\d{9}", , , "900123456"],
            [, , "8[5-9]\\d{7}", "\\d{9}", , , "850123456"],
            [, , "NA", "NA"],
            [, , "6(?:02|5[0-4]|9[0-6])\\d{6}", "\\d{9}", , , "690123456"], "SK", 421, "00", "0", , , "0", , , , [
                [, "(2)(\\d{3})(\\d{3})(\\d{2})", "$1/$2 $3 $4", ["2"], "0$1"],
                [, "([3-5]\\d)(\\d{3})(\\d{2})(\\d{2})", "$1/$2 $3 $4", ["[3-5]"], "0$1"],
                [, "([689]\\d{2})(\\d{3})(\\d{3})", "$1 $2 $3", ["[689]"], "0$1"],
                [, "(9090)(\\d{3})", "$1 $2", ["9090"], "0$1"]
            ], , [, , "9090\\d{3}", "\\d{7}", , , "9090123"], , , [, , "(?:602|8(?:00|[5-9]\\d)|9(?:00|[78]\\d))\\d{6}|9090\\d{3}", "\\d{7,9}", , , "800123456"],
            [, , "96\\d{7}", "\\d{9}", , , "961234567"], , , [, , "NA", "NA"]
        ],
        SL: [, [, , "[2-9]\\d{7}", "\\d{6,8}"],
            [, , "[235]2[2-4][2-9]\\d{4}", "\\d{6,8}", , , "22221234"],
            [, , "(?:2[15]|3[03-5]|4[04]|5[05]|66|7[6-9]|88|99)\\d{6}", "\\d{6,8}", , , "25123456"],
            [, , "NA", "NA"],
            [, , "NA", "NA"],
            [, , "NA", "NA"],
            [, , "NA", "NA"],
            [, , "NA", "NA"], "SL", 232, "00", "0", , , "0", , , , [
                [, "(\\d{2})(\\d{6})", "$1 $2", , "(0$1)"]
            ], , [, , "NA", "NA"], , , [, , "NA", "NA"],
            [, , "NA", "NA"], , , [, , "NA", "NA"]
        ],
        SM: [, [, , "[05-7]\\d{7,9}", "\\d{6,10}"],
            [, , "0549(?:8[0157-9]|9\\d)\\d{4}", "\\d{6,10}", , , "0549886377"],
            [, , "6[16]\\d{6}", "\\d{8}", , , "66661212"],
            [, , "NA", "NA"],
            [, , "7[178]\\d{6}", "\\d{8}", , , "71123456"],
            [, , "NA", "NA"],
            [, , "NA", "NA"],
            [, , "5[158]\\d{6}", "\\d{8}", , , "58001110"], "SM", 378, "00", , , , "(?:0549)?([89]\\d{5})", "0549$1", , , [
                [, "(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[5-7]"]],
                [, "(0549)(\\d{6})", "$1 $2", ["0"]],
                [, "(\\d{6})", "0549 $1", ["[89]"]]
            ],
            [
                [, "(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[5-7]"]],
                [, "(0549)(\\d{6})", "($1) $2", ["0"]],
                [, "(\\d{6})", "(0549) $1", ["[89]"]]
            ],
            [, , "NA", "NA"], , , [, , "NA", "NA"],
            [, , "NA", "NA"], 1, , [, , "NA", "NA"]
        ],
        SN: [, [, , "[3789]\\d{8}", "\\d{9}"],
            [, , "3(?:0(?:1[0-2]|80)|282|3(?:8[1-9]|9[3-9])|611|90[1-5])\\d{5}", "\\d{9}", , , "301012345"],
            [, , "7(?:[067]\\d|21|8[0-26]|90)\\d{6}", "\\d{9}", , , "701234567"],
            [, , "800\\d{6}", "\\d{9}", , , "800123456"],
            [, , "88[4689]\\d{6}", "\\d{9}", , , "884123456"],
            [, , "81[02468]\\d{6}", "\\d{9}", , , "810123456"],
            [, , "NA", "NA"],
            [, , "3392\\d{5}|93330\\d{4}", "\\d{9}", , , "933301234"], "SN", 221, "00", , , , , , , , [
                [, "(\\d{2})(\\d{3})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[379]"]],
                [, "(\\d{3})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["8"]]
            ], , [, , "NA", "NA"], , , [, , "NA", "NA"],
            [, , "NA", "NA"], , , [, , "NA", "NA"]
        ],
        SO: [, [, , "[1-79]\\d{6,8}", "\\d{7,9}"],
            [, , "(?:1\\d|2[0-79]|3[0-46-8]|4[0-7]|59)\\d{5}", "\\d{7}", , , "4012345"],
            [, , "(?:15\\d|2(?:4\\d|8)|6[1-35-9]?\\d{2}|7(?:[1-8]\\d|99?\\d)|9(?:07|[2-9])\\d)\\d{5}", "\\d{7,9}", , , "71123456"],
            [, , "NA", "NA"],
            [, , "NA", "NA"],
            [, , "NA", "NA"],
            [, , "NA", "NA"],
            [, , "NA", "NA"], "SO", 252, "00", "0", , , "0", , , , [
                [, "(\\d)(\\d{6})", "$1 $2", ["2[0-79]|[13-5]"]],
                [, "(\\d)(\\d{7})", "$1 $2", ["24|[67]"]],
                [, "(\\d{2})(\\d{5,7})", "$1 $2", ["15|28|6[1-35-9]|799|9[2-9]"]],
                [, "(90\\d)(\\d{3})(\\d{3})", "$1 $2 $3", ["90"]]
            ], , [, , "NA", "NA"], , , [, , "NA", "NA"],
            [, , "NA", "NA"], , , [, , "NA", "NA"]
        ],
        SR: [, [, , "[2-8]\\d{5,6}", "\\d{6,7}"],
            [, , "(?:2[1-3]|3[0-7]|4\\d|5[2-58]|68\\d)\\d{4}", "\\d{6,7}", , , "211234"],
            [, , "(?:7[124-7]|8[1-9])\\d{5}", "\\d{7}", , , "7412345"],
            [, , "NA", "NA"],
            [, , "NA", "NA"],
            [, , "NA", "NA"],
            [, , "NA", "NA"],
            [, , "5(?:6\\d{4}|90[0-4]\\d{3})", "\\d{6,7}", , , "561234"], "SR", 597, "00", , , , , , , , [
                [, "(\\d{3})(\\d{3})", "$1-$2", ["[2-4]|5[2-58]"]],
                [, "(\\d{2})(\\d{2})(\\d{2})", "$1-$2-$3", ["56"]],
                [, "(\\d{3})(\\d{4})", "$1-$2", ["59|[6-8]"]]
            ], , [, , "NA", "NA"], , , [, , "NA", "NA"],
            [, , "NA", "NA"], , , [, , "NA", "NA"]
        ],
        SS: [, [, , "[19]\\d{8}", "\\d{9}"],
            [, , "18\\d{7}", "\\d{9}", , , "181234567"],
            [, , "(?:12|9[1257])\\d{7}", "\\d{9}", , , "977123456"],
            [, , "NA", "NA"],
            [, , "NA", "NA"],
            [, , "NA", "NA"],
            [, , "NA", "NA"],
            [, , "NA", "NA"], "SS", 211, "00", "0", , , "0", , , , [
                [, "(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", , "0$1"]
            ], , [, , "NA", "NA"], , , [, , "NA", "NA"],
            [, , "NA", "NA"], , , [, , "NA", "NA"]
        ],
        ST: [, [, , "[29]\\d{6}", "\\d{7}"],
            [, , "22\\d{5}", "\\d{7}", , , "2221234"],
            [, , "9(?:0(?:0[5-9]|[1-9]\\d)|[89]\\d{2})\\d{3}", "\\d{7}", , , "9812345"],
            [, , "NA", "NA"],
            [, , "NA", "NA"],
            [, , "NA", "NA"],
            [, , "NA", "NA"],
            [, , "NA", "NA"], "ST", 239, "00", , , , , , , , [
                [, "(\\d{3})(\\d{4})", "$1 $2"]
            ], , [, , "NA", "NA"], , , [, , "NA", "NA"],
            [, , "NA", "NA"], , , [, , "NA", "NA"]
        ],
        SV: [, [, , "[267]\\d{7}|[89]\\d{6}(?:\\d{4})?", "\\d{7,8}|\\d{11}"],
            [, , "2[1-6]\\d{6}", "\\d{8}", , , "21234567"],
            [, , "[67]\\d{7}", "\\d{8}", , , "70123456"],
            [, , "800\\d{4}(?:\\d{4})?", "\\d{7}(?:\\d{4})?", , , "8001234"],
            [, , "900\\d{4}(?:\\d{4})?", "\\d{7}(?:\\d{4})?", , , "9001234"],
            [, , "NA", "NA"],
            [, , "NA", "NA"],
            [, , "NA", "NA"], "SV", 503, "00", , , , , , , , [
                [, "(\\d{4})(\\d{4})", "$1 $2", ["[267]"]],
                [, "(\\d{3})(\\d{4})", "$1 $2", ["[89]"]],
                [, "(\\d{3})(\\d{4})(\\d{4})", "$1 $2 $3", ["[89]"]]
            ], , [, , "NA", "NA"], , , [, , "NA", "NA"],
            [, , "NA", "NA"], , , [, , "NA", "NA"]
        ],
        SX: [, [, , "[5789]\\d{9}", "\\d{7}(?:\\d{3})?"],
            [, , "7215(?:4[2-8]|8[239]|9[056])\\d{4}", "\\d{7}(?:\\d{3})?", , , "7215425678"],
            [, , "7215(?:1[02]|2\\d|5[034679]|8[014-8])\\d{4}", "\\d{10}", , , "7215205678"],
            [, , "8(?:00|44|55|66|77|88)[2-9]\\d{6}", "\\d{10}", , , "8002123456"],
            [, , "900[2-9]\\d{6}", "\\d{10}", , , "9002123456"],
            [, , "NA", "NA"],
            [, , "5(?:00|33|44|66|77)[2-9]\\d{6}", "\\d{10}", , , "5002345678"],
            [, , "NA", "NA"], "SX", 1, "011", "1", , , "1", , , , , , [, , "NA", "NA"], , "721", [, , "NA", "NA"],
            [, , "NA", "NA"], , , [, , "NA", "NA"]
        ],
        SY: [, [, , "[1-59]\\d{7,8}", "\\d{6,9}"],
            [, , "(?:1(?:1\\d?|4\\d|[2356])|2(?:1\\d?|[235])|3(?:[13]\\d|4)|4[13]|5[1-3])\\d{6}", "\\d{6,9}", , , "112345678"],
            [, , "9(?:22|[35][0-8]|4\\d|6[024-9]|88|9[0-489])\\d{6}", "\\d{9}", , , "944567890"],
            [, , "NA", "NA"],
            [, , "NA", "NA"],
            [, , "NA", "NA"],
            [, , "NA", "NA"],
            [, , "NA", "NA"], "SY", 963, "00", "0", , , "0", , , , [
                [, "(\\d{2})(\\d{3})(\\d{3,4})", "$1 $2 $3", ["[1-5]"], "0$1", , 1],
                [, "(9\\d{2})(\\d{3})(\\d{3})", "$1 $2 $3", ["9"], "0$1", , 1]
            ], , [, , "NA", "NA"], , , [, , "NA", "NA"],
            [, , "NA", "NA"], , , [, , "NA", "NA"]
        ],
        SZ: [, [, , "[027]\\d{7}", "\\d{8}"],
            [, , "2[2-5]\\d{6}", "\\d{8}", , , "22171234"],
            [, , "7[6-8]\\d{6}", "\\d{8}", , , "76123456"],
            [, , "0800\\d{4}", "\\d{8}", , , "08001234"],
            [, , "NA", "NA"],
            [, , "NA", "NA"],
            [, , "NA", "NA"],
            [, , "NA", "NA"], "SZ", 268, "00", , , , , , , , [
                [, "(\\d{4})(\\d{4})", "$1 $2", ["[027]"]]
            ], , [, , "NA", "NA"], , , [, , "0800\\d{4}", "\\d{8}", , , "08001234"],
            [, , "NA", "NA"], 1, , [, , "NA", "NA"]
        ],
        TA: [, [, , "8\\d{3}", "\\d{4}"],
            [, , "8\\d{3}", "\\d{4}", , , "8999"],
            [, , "NA", "NA"],
            [, , "NA", "NA"],
            [, , "NA", "NA"],
            [, , "NA", "NA"],
            [, , "NA", "NA"],
            [, , "NA", "NA"], "TA", 290, "00", , , , , , , , , , [, , "NA", "NA"], , , [, , "NA", "NA"],
            [, , "NA", "NA"], , , [, , "NA", "NA"]
        ],
        TC: [, [, , "[5689]\\d{9}", "\\d{7}(?:\\d{3})?"],
            [, , "649(?:712|9(?:4\\d|50))\\d{4}", "\\d{7}(?:\\d{3})?", , , "6497121234"],
            [, , "649(?:2(?:3[129]|4[1-7])|3(?:3[1-389]|4[1-7])|4[34][1-3])\\d{4}", "\\d{10}", , , "6492311234"],
            [, , "8(?:00|44|55|66|77|88)[2-9]\\d{6}", "\\d{10}", , , "8002345678"],
            [, , "900[2-9]\\d{6}", "\\d{10}", , , "9002345678"],
            [, , "NA", "NA"],
            [, , "5(?:00|33|44|66|77)[2-9]\\d{6}", "\\d{10}", , , "5002345678"],
            [, , "64971[01]\\d{4}", "\\d{10}", , , "6497101234"], "TC", 1, "011", "1", , , "1", , , , , , [, , "NA", "NA"], , "649", [, , "NA", "NA"],
            [, , "NA", "NA"], , , [, , "NA", "NA"]
        ],
        TD: [, [, , "[2679]\\d{7}", "\\d{8}"],
            [, , "22(?:[3789]0|5[0-5]|6[89])\\d{4}", "\\d{8}", , , "22501234"],
            [, , "(?:6[02368]\\d|77\\d|9\\d{2})\\d{5}", "\\d{8}", , , "63012345"],
            [, , "NA", "NA"],
            [, , "NA", "NA"],
            [, , "NA", "NA"],
            [, , "NA", "NA"],
            [, , "NA", "NA"], "TD", 235, "00|16", , , , , , "00", , [
                [, "(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4"]
            ], , [, , "NA", "NA"], , , [, , "NA", "NA"],
            [, , "NA", "NA"], , , [, , "NA", "NA"]
        ],
        TG: [, [, , "[29]\\d{7}", "\\d{8}"],
            [, , "2(?:2[2-7]|3[23]|44|55|66|77)\\d{5}", "\\d{8}", , , "22212345"],
            [, , "9[0-389]\\d{6}", "\\d{8}", , , "90112345"],
            [, , "NA", "NA"],
            [, , "NA", "NA"],
            [, , "NA", "NA"],
            [, , "NA", "NA"],
            [, , "NA", "NA"], "TG", 228, "00", , , , , , , , [
                [, "(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4"]
            ], , [, , "NA", "NA"], , , [, , "NA", "NA"],
            [, , "NA", "NA"], , , [, , "NA", "NA"]
        ],
        TH: [, [, , "[2-9]\\d{7,8}|1\\d{3}(?:\\d{5,6})?", "\\d{4}|\\d{8,10}"],
            [, , "(?:2\\d|3[2-9]|4[2-5]|5[2-6]|7[3-7])\\d{6}", "\\d{8}", , , "21234567"],
            [, , "(?:14|6[1-3]|[89]\\d)\\d{7}", "\\d{9}", , , "812345678"],
            [, , "1800\\d{6}", "\\d{10}", , , "1800123456"],
            [, , "1900\\d{6}", "\\d{10}", , , "1900123456"],
            [, , "NA", "NA"],
            [, , "NA", "NA"],
            [, , "6[08]\\d{7}", "\\d{9}", , , "601234567"], "TH", 66, "00", "0", , , "0", , , , [
                [, "(2)(\\d{3})(\\d{4})", "$1 $2 $3", ["2"], "0$1"],
                [, "([13-9]\\d)(\\d{3})(\\d{3,4})", "$1 $2 $3", ["14|[3-9]"], "0$1"],
                [, "(1[89]00)(\\d{3})(\\d{3})", "$1 $2 $3", ["1"], "$1"]
            ], , [, , "NA", "NA"], , , [, , "1\\d{3}", "\\d{4}", , , "1100"],
            [, , "1\\d{3}", "\\d{4}", , , "1100"], , , [, , "NA", "NA"]
        ],
        TJ: [, [, , "[3-59]\\d{8}", "\\d{3,9}"],
            [, , "(?:3(?:1[3-5]|2[245]|3[12]|4[24-7]|5[25]|72)|4(?:46|74|87))\\d{6}", "\\d{3,9}", , , "372123456"],
            [, , "(?:50[125]|9[0-35-9]\\d)\\d{6}", "\\d{9}", , , "917123456"],
            [, , "NA", "NA"],
            [, , "NA", "NA"],
            [, , "NA", "NA"],
            [, , "NA", "NA"],
            [, , "NA", "NA"], "TJ", 992, "810", "8", , , "8", , "8~10", , [
                [, "([349]\\d{2})(\\d{2})(\\d{4})", "$1 $2 $3", ["[34]7|91[78]"], "(8) $1", , 1],
                [, "([459]\\d)(\\d{3})(\\d{4})", "$1 $2 $3", ["4[48]|5|9(?:1[59]|[0235-9])"], "(8) $1", , 1],
                [, "(331700)(\\d)(\\d{2})", "$1 $2 $3", ["331", "3317", "33170", "331700"], "(8) $1", , 1],
                [, "(\\d{4})(\\d)(\\d{4})", "$1 $2 $3", ["3[1-5]", "3(?:[1245]|3(?:[02-9]|1[0-589]))"], "(8) $1", , 1]
            ], , [, , "NA", "NA"], , , [, , "NA", "NA"],
            [, , "NA", "NA"], , , [, , "NA", "NA"]
        ],
        TK: [, [, , "[2-9]\\d{3}", "\\d{4}"],
            [, , "[2-4]\\d{3}", "\\d{4}", , , "3010"],
            [, , "[5-9]\\d{3}", "\\d{4}", , , "5190"],
            [, , "NA", "NA"],
            [, , "NA", "NA"],
            [, , "NA", "NA"],
            [, , "NA", "NA"],
            [, , "NA", "NA"], "TK", 690, "00", , , , , , , , , , [, , "NA", "NA"], , , [, , "NA", "NA"],
            [, , "NA", "NA"], , , [, , "NA", "NA"]
        ],
        TL: [, [, , "[2-489]\\d{6}|7\\d{6,7}", "\\d{7,8}"],
            [, , "(?:2[1-5]|3[1-9]|4[1-4])\\d{5}", "\\d{7}", , , "2112345"],
            [, , "7[3-8]\\d{6}", "\\d{8}", , , "77212345"],
            [, , "80\\d{5}", "\\d{7}", , , "8012345"],
            [, , "90\\d{5}", "\\d{7}", , , "9012345"],
            [, , "NA", "NA"],
            [, , "70\\d{5}", "\\d{7}", , , "7012345"],
            [, , "NA", "NA"], "TL", 670, "00", , , , , , , , [
                [, "(\\d{3})(\\d{4})", "$1 $2", ["[2-489]"]],
                [, "(\\d{4})(\\d{4})", "$1 $2", ["7"]]
            ], , [, , "NA", "NA"], , , [, , "NA", "NA"],
            [, , "NA", "NA"], , , [, , "NA", "NA"]
        ],
        TM: [, [, , "[1-6]\\d{7}", "\\d{8}"],
            [, , "(?:1(?:2\\d|3[1-9])|2(?:22|4[0-35-8])|3(?:22|4[03-9])|4(?:22|3[128]|4\\d|6[15])|5(?:22|5[7-9]|6[014-689]))\\d{5}", "\\d{8}", , , "12345678"],
            [, , "6[2-9]\\d{6}", "\\d{8}", , , "66123456"],
            [, , "NA", "NA"],
            [, , "NA", "NA"],
            [, , "NA", "NA"],
            [, , "NA", "NA"],
            [, , "NA", "NA"], "TM", 993, "810", "8", , , "8", , "8~10", , [
                [, "(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2-$3-$4", ["12"], "(8 $1)"],
                [, "(\\d{2})(\\d{6})", "$1 $2", ["6"], "8 $1"],
                [, "(\\d{3})(\\d)(\\d{2})(\\d{2})", "$1 $2-$3-$4", ["13|[2-5]"], "(8 $1)"]
            ], , [, , "NA", "NA"], , , [, , "NA", "NA"],
            [, , "NA", "NA"], , , [, , "NA", "NA"]
        ],
        TN: [, [, , "[2-57-9]\\d{7}", "\\d{8}"],
            [, , "3(?:[012]\\d|6[0-4]|91)\\d{5}|7\\d{7}|81200\\d{3}", "\\d{8}", , , "71234567"],
            [, , "(?:[259]\\d|4[0-6])\\d{6}", "\\d{8}", , , "20123456"],
            [, , "8010\\d{4}", "\\d{8}", , , "80101234"],
            [, , "88\\d{6}", "\\d{8}", , , "88123456"],
            [, , "8[12]10\\d{4}", "\\d{8}", , , "81101234"],
            [, , "NA", "NA"],
            [, , "NA", "NA"], "TN", 216, "00", , , , , , , , [
                [, "(\\d{2})(\\d{3})(\\d{3})", "$1 $2 $3"]
            ], , [, , "NA", "NA"], , , [, , "NA", "NA"],
            [, , "NA", "NA"], , , [, , "NA", "NA"]
        ],
        TO: [, [, , "[02-8]\\d{4,6}", "\\d{5,7}"],
            [, , "(?:2\\d|3[1-8]|4[1-4]|[56]0|7[0149]|8[05])\\d{3}", "\\d{5}", , , "20123"],
            [, , "(?:7[578]|8[47-9])\\d{5}", "\\d{7}", , , "7715123"],
            [, , "0800\\d{3}", "\\d{7}", , , "0800222"],
            [, , "NA", "NA"],
            [, , "NA", "NA"],
            [, , "NA", "NA"],
            [, , "NA", "NA"], "TO", 676, "00", , , , , , , , [
                [, "(\\d{2})(\\d{3})", "$1-$2", ["[1-6]|7[0-4]|8[05]"]],
                [, "(\\d{3})(\\d{4})", "$1 $2", ["7[5-9]|8[47-9]"]],
                [, "(\\d{4})(\\d{3})", "$1 $2", ["0"]]
            ], , [, , "NA", "NA"], , , [, , "NA", "NA"],
            [, , "NA", "NA"], 1, , [, , "NA", "NA"]
        ],
        TR: [, [, , "[2-589]\\d{9}|444\\d{4}", "\\d{7,10}"],
            [, , "(?:2(?:[13][26]|[28][2468]|[45][268]|[67][246])|3(?:[13][28]|[24-6][2468]|[78][02468]|92)|4(?:[16][246]|[23578][2468]|4[26]))\\d{7}", "\\d{10}", , , "2123456789"],
            [, , "5(?:0[1-7]|22|[34]\\d|5[1-59]|9[246])\\d{7}", "\\d{10}", , , "5012345678"],
            [, , "800\\d{7}", "\\d{10}", , , "8001234567"],
            [, , "900\\d{7}", "\\d{10}", , , "9001234567"],
            [, , "NA", "NA"],
            [, , "NA", "NA"],
            [, , "NA", "NA"], "TR", 90, "00", "0", , , "0", , , , [
                [, "(\\d{3})(\\d{3})(\\d{4})", "$1 $2 $3", ["[23]|4(?:[0-35-9]|4[0-35-9])"], "(0$1)", , 1],
                [, "(\\d{3})(\\d{3})(\\d{4})", "$1 $2 $3", ["[589]"], "0$1", , 1],
                [, "(444)(\\d{1})(\\d{3})", "$1 $2 $3", ["444"]]
            ], , [, , "512\\d{7}", "\\d{10}", , , "5123456789"], , , [, , "444\\d{4}", "\\d{7}", , , "4441444"],
            [, , "444\\d{4}|850\\d{7}", "\\d{7,10}", , , "4441444"], , , [, , "NA", "NA"]
        ],
        TT: [, [, , "[589]\\d{9}", "\\d{7}(?:\\d{3})?"],
            [, , "868(?:2(?:01|2[1-6]|3[1-5])|6(?:0[79]|1[02-8]|2[1-9]|[3-69]\\d|7[0-79])|82[124])\\d{4}", "\\d{7}(?:\\d{3})?", , , "8682211234"],
            [, , "868(?:2(?:[789]\\d)|3(?:0[1-9]|1[02-9]|[2-9]\\d)|4[6-9]\\d|6(?:20|78|8\\d)|7(?:0[1-9]|1[02-9]|[2-9]\\d))\\d{4}", "\\d{10}", , , "8682911234"],
            [, , "8(?:00|44|55|66|77|88)[2-9]\\d{6}", "\\d{10}", , , "8002345678"],
            [, , "900[2-9]\\d{6}", "\\d{10}", , , "9002345678"],
            [, , "NA", "NA"],
            [, , "5(?:00|33|44|66|77)[2-9]\\d{6}", "\\d{10}", , , "5002345678"],
            [, , "NA", "NA"], "TT", 1, "011", "1", , , "1", , , , , , [, , "NA", "NA"], , "868", [, , "NA", "NA"],
            [, , "NA", "NA"], , , [, , "868619\\d{4}", "\\d{10}"]
        ],
        TV: [, [, , "[29]\\d{4,5}", "\\d{5,6}"],
            [, , "2[02-9]\\d{3}", "\\d{5}", , , "20123"],
            [, , "90\\d{4}", "\\d{6}", , , "901234"],
            [, , "NA", "NA"],
            [, , "NA", "NA"],
            [, , "NA", "NA"],
            [, , "NA", "NA"],
            [, , "NA", "NA"], "TV", 688, "00", , , , , , , , , , [, , "NA", "NA"], , , [, , "NA", "NA"],
            [, , "NA", "NA"], , , [, , "NA", "NA"]
        ],
        TW: [, [, , "[2-689]\\d{7,8}|7\\d{7,9}", "\\d{8,10}"],
            [, , "[2-8]\\d{7,8}", "\\d{8,9}", , , "21234567"],
            [, , "9\\d{8}", "\\d{9}", , , "912345678"],
            [, , "800\\d{6}", "\\d{9}", , , "800123456"],
            [, , "900\\d{6}", "\\d{9}", , , "900123456"],
            [, , "NA", "NA"],
            [, , "NA", "NA"],
            [, , "70\\d{8}", "\\d{10}", , , "7012345678"], "TW", 886, "0(?:0[25679]|19)", "0", "#", , "0", , , , [
                [, "([2-8])(\\d{3,4})(\\d{4})", "$1 $2 $3", ["[2-6]|[78][1-9]"], "0$1"],
                [, "([89]\\d{2})(\\d{3})(\\d{3})", "$1 $2 $3", ["80|9"], "0$1"],
                [, "(70)(\\d{4})(\\d{4})", "$1 $2 $3", ["70"], "0$1"]
            ], , [, , "NA", "NA"], , , [, , "NA", "NA"],
            [, , "NA", "NA"], , , [, , "NA", "NA"]
        ],
        TZ: [, [, , "\\d{9}", "\\d{7,9}"],
            [, , "2[2-8]\\d{7}", "\\d{7,9}", , , "222345678"],
            [, , "(?:6[25-8]|7[13-9])\\d{7}", "\\d{9}", , , "621234567"],
            [, , "80[08]\\d{6}", "\\d{9}", , , "800123456"],
            [, , "90\\d{7}", "\\d{9}", , , "900123456"],
            [, , "8(?:40|6[01])\\d{6}", "\\d{9}", , , "840123456"],
            [, , "NA", "NA"],
            [, , "41\\d{7}", "\\d{9}", , , "412345678"], "TZ", 255, "00[056]", "0", , , "0", , , , [
                [, "([24]\\d)(\\d{3})(\\d{4})", "$1 $2 $3", ["[24]"], "0$1"],
                [, "([67]\\d{2})(\\d{3})(\\d{3})", "$1 $2 $3", ["[67]"], "0$1"],
                [, "([89]\\d{2})(\\d{2})(\\d{4})", "$1 $2 $3", ["[89]"], "0$1"]
            ], , [, , "NA", "NA"], , , [, , "NA", "NA"],
            [, , "NA", "NA"], , , [, , "NA", "NA"]
        ],
        UA: [, [, , "[3-9]\\d{8}", "\\d{5,9}"],
            [, , "(?:3[1-8]|4[13-8]|5[1-7]|6[12459])\\d{7}", "\\d{5,9}", , , "311234567"],
            [, , "(?:39|50|6[36-8]|73|9[1-9])\\d{7}", "\\d{9}", , , "391234567"],
            [, , "800\\d{6}", "\\d{9}", , , "800123456"],
            [, , "900\\d{6}", "\\d{9}", , , "900123456"],
            [, , "NA", "NA"],
            [, , "NA", "NA"],
            [, , "89\\d{7}", "\\d{9}", , , "891234567"], "UA", 380, "00", "0", , , "0", , "0~0", , [
                [, "([3-9]\\d)(\\d{3})(\\d{4})", "$1 $2 $3", ["[38]9|4(?:[45][0-5]|87)|5(?:0|6[37]|7[37])|6[36-8]|73|9[1-9]", "[38]9|4(?:[45][0-5]|87)|5(?:0|6(?:3[14-7]|7)|7[37])|6[36-8]|73|9[1-9]"], "0$1"],
                [, "([3-689]\\d{2})(\\d{3})(\\d{3})", "$1 $2 $3", ["3[1-8]2|4[13678]2|5(?:[12457]2|6[24])|6(?:[49]2|[12][29]|5[24])|8[0-8]|90", "3(?:[1-46-8]2[013-9]|52)|4(?:[1378]2|62[013-9])|5(?:[12457]2|6[24])|6(?:[49]2|[12][29]|5[24])|8[0-8]|90"], "0$1"],
                [, "([3-6]\\d{3})(\\d{5})", "$1 $2", ["3(?:5[013-9]|[1-46-8])|4(?:[137][013-9]|6|[45][6-9]|8[4-6])|5(?:[1245][013-9]|6[0135-9]|3|7[4-6])|6(?:[49][013-9]|5[0135-9]|[12][13-8])", "3(?:5[013-9]|[1-46-8](?:22|[013-9]))|4(?:[137][013-9]|6(?:[013-9]|22)|[45][6-9]|8[4-6])|5(?:[1245][013-9]|6(?:3[02389]|[015689])|3|7[4-6])|6(?:[49][013-9]|5[0135-9]|[12][13-8])"], "0$1"]
            ], , [, , "NA", "NA"], , , [, , "NA", "NA"],
            [, , "NA", "NA"], , , [, , "NA", "NA"]
        ],
        UG: [, [, , "\\d{9}", "\\d{5,9}"],
            [, , "20(?:[0147]\\d{2}|2(?:40|[5-9]\\d)|3[23]\\d|5[0-4]\\d|6[03]\\d|8[0-2]\\d)\\d{4}|[34]\\d{8}", "\\d{5,9}", , , "312345678"],
            [, , "2030\\d{5}|7(?:0[0-7]|[15789]\\d|2[03]|30|[46][0-4])\\d{6}", "\\d{9}", , , "712345678"],
            [, , "800[123]\\d{5}", "\\d{9}", , , "800123456"],
            [, , "90[123]\\d{6}", "\\d{9}", , , "901123456"],
            [, , "NA", "NA"],
            [, , "NA", "NA"],
            [, , "NA", "NA"], "UG", 256, "00[057]", "0", , , "0", , , , [
                [, "(\\d{3})(\\d{6})", "$1 $2", ["[7-9]|20(?:[013-8]|2[5-9])|4(?:6[45]|[7-9])"], "0$1"],
                [, "(\\d{2})(\\d{7})", "$1 $2", ["3|4(?:[1-5]|6[0-36-9])"], "0$1"],
                [, "(2024)(\\d{5})", "$1 $2", ["2024"], "0$1"]
            ], , [, , "NA", "NA"], , , [, , "NA", "NA"],
            [, , "NA", "NA"], , , [, , "NA", "NA"]
        ],
        US: [, [, , "[2-9]\\d{9}", "\\d{7}(?:\\d{3})?"],
            [, , "(?:2(?:0[1-35-9]|1[02-9]|2[04589]|3[149]|4[08]|5[1-46]|6[0279]|7[026]|8[13])|3(?:0[1-57-9]|1[02-9]|2[0135]|3[014679]|4[67]|5[12]|6[014]|8[56])|4(?:0[124-9]|1[02-579]|2[3-5]|3[0245]|4[0235]|58|69|7[0589]|8[04])|5(?:0[1-57-9]|1[0235-8]|20|3[0149]|4[01]|5[19]|6[1-37]|7[013-5]|8[056])|6(?:0[1-35-9]|1[024-9]|2[03689]|3[016]|4[16]|5[017]|6[0-279]|78|8[12])|7(?:0[1-46-8]|1[02-9]|2[0457]|3[1247]|4[07]|5[47]|6[02359]|7[02-59]|8[156])|8(?:0[1-68]|1[02-8]|28|3[0-25]|4[3578]|5[046-9]|6[02-5]|7[028])|9(?:0[1346-9]|1[02-9]|2[0589]|3[01678]|4[0179]|5[12469]|7[0-3589]|8[0459]))[2-9]\\d{6}", "\\d{7}(?:\\d{3})?", , , "2015555555"],
            [, , "(?:2(?:0[1-35-9]|1[02-9]|2[04589]|3[149]|4[08]|5[1-46]|6[0279]|7[026]|8[13])|3(?:0[1-57-9]|1[02-9]|2[0135]|3[014679]|4[67]|5[12]|6[014]|8[56])|4(?:0[124-9]|1[02-579]|2[3-5]|3[0245]|4[0235]|58|69|7[0589]|8[04])|5(?:0[1-57-9]|1[0235-8]|20|3[0149]|4[01]|5[19]|6[1-37]|7[013-5]|8[056])|6(?:0[1-35-9]|1[024-9]|2[03689]|3[016]|4[16]|5[017]|6[0-279]|78|8[12])|7(?:0[1-46-8]|1[02-9]|2[0457]|3[1247]|4[07]|5[47]|6[02359]|7[02-59]|8[156])|8(?:0[1-68]|1[02-8]|28|3[0-25]|4[3578]|5[046-9]|6[02-5]|7[028])|9(?:0[1346-9]|1[02-9]|2[0589]|3[01678]|4[0179]|5[12469]|7[0-3589]|8[0459]))[2-9]\\d{6}", "\\d{7}(?:\\d{3})?", , , "2015555555"],
            [, , "8(?:00|44|55|66|77|88)[2-9]\\d{6}", "\\d{10}", , , "8002345678"],
            [, , "900[2-9]\\d{6}", "\\d{10}", , , "9002345678"],
            [, , "NA", "NA"],
            [, , "5(?:00|33|44|66|77)[2-9]\\d{6}", "\\d{10}", , , "5002345678"],
            [, , "NA", "NA"], "US", 1, "011", "1", , , "1", , , 1, [
                [, "(\\d{3})(\\d{4})", "$1-$2", , , , 1],
                [, "(\\d{3})(\\d{3})(\\d{4})", "($1) $2-$3", , , , 1]
            ],
            [
                [, "(\\d{3})(\\d{3})(\\d{4})", "$1-$2-$3"]
            ],
            [, , "NA", "NA"], 1, , [, , "NA", "NA"],
            [, , "NA", "NA"], , , [, , "NA", "NA"]
        ],
        UY: [, [, , "[2489]\\d{6,7}", "\\d{7,8}"],
            [, , "2\\d{7}|4[2-7]\\d{6}", "\\d{7,8}", , , "21231234"],
            [, , "9[1-9]\\d{6}", "\\d{8}", , , "94231234"],
            [, , "80[05]\\d{4}", "\\d{7}", , , "8001234"],
            [, , "90[0-8]\\d{4}", "\\d{7}", , , "9001234"],
            [, , "NA", "NA"],
            [, , "NA", "NA"],
            [, , "NA", "NA"], "UY", 598, "0(?:1[3-9]\\d|0)", "0", " int. ", , "0", , "00", , [
                [, "(\\d{4})(\\d{4})", "$1 $2", ["[24]"]],
                [, "(\\d{2})(\\d{3})(\\d{3})", "$1 $2 $3", ["9[1-9]"], "0$1"],
                [, "(\\d{3})(\\d{4})", "$1 $2", ["[89]0"], "0$1"]
            ], , [, , "NA", "NA"], , , [, , "NA", "NA"],
            [, , "NA", "NA"], , , [, , "NA", "NA"]
        ],
        UZ: [, [, , "[679]\\d{8}", "\\d{7,9}"],
            [, , "(?:6(?:1(?:22|3[124]|4[1-4]|5[123578]|64)|2(?:22|3[0-57-9]|41)|5(?:22|3[3-7]|5[024-8])|6\\d{2}|7(?:[23]\\d|7[69])|9(?:22|4[1-8]|6[135]))|7(?:0(?:5[4-9]|6[0146]|7[12456]|9[135-8])|1[12]\\d|2(?:22|3[1345789]|4[123579]|5[14])|3(?:2\\d|3[1578]|4[1-35-7]|5[1-57]|61)|4(?:2\\d|3[1-579]|7[1-79])|5(?:22|5[1-9]|6[1457])|6(?:22|3[12457]|4[13-8])|9(?:22|5[1-9])))\\d{5}", "\\d{7,9}", , , "662345678"],
            [, , "6(?:1(?:2(?:98|2[01])|35[0-4]|50\\d|61[23]|7(?:[01][017]|4\\d|55|9[5-9]))|2(?:11\\d|2(?:[12]1|9[01379])|5(?:[126]\\d|3[0-4])|7\\d{2})|5(?:19[01]|2(?:27|9[26])|30\\d|59\\d|7\\d{2})|6(?:2(?:1[5-9]|2[0367]|38|41|52|60)|3[79]\\d|4(?:56|83)|7(?:[07]\\d|1[017]|3[07]|4[047]|5[057]|67|8[0178]|9[79])|9[0-3]\\d)|7(?:2(?:24|3[237]|4[5-9]|7[15-8])|5(?:7[12]|8[0589])|7(?:0\\d|[39][07])|9(?:0\\d|7[079]))|9(?:2(?:1[1267]|5\\d|3[01]|7[0-4])|5[67]\\d|6(?:2[0-26]|8\\d)|7\\d{2}))\\d{4}|7(?:0\\d{3}|1(?:13[01]|6(?:0[47]|1[67]|66)|71[3-69]|98\\d)|2(?:2(?:2[79]|95)|3(?:2[5-9]|6[0-6])|57\\d|7(?:0\\d|1[17]|2[27]|3[37]|44|5[057]|66|88))|3(?:2(?:1[0-6]|21|3[469]|7[159])|33\\d|5(?:0[0-4]|5[579]|9\\d)|7(?:[0-3579]\\d|4[0467]|6[67]|8[078])|9[4-6]\\d)|4(?:2(?:29|5[0257]|6[0-7]|7[1-57])|5(?:1[0-4]|8\\d|9[5-9])|7(?:0\\d|1[024589]|2[0127]|3[0137]|[46][07]|5[01]|7[5-9]|9[079])|9(?:7[015-9]|[89]\\d))|5(?:112|2(?:0\\d|2[29]|[49]4)|3[1568]\\d|52[6-9]|7(?:0[01578]|1[017]|[23]7|4[047]|[5-7]\\d|8[78]|9[079]))|6(?:2(?:2[1245]|4[2-4])|39\\d|41[179]|5(?:[349]\\d|5[0-2])|7(?:0[017]|[13]\\d|22|44|55|67|88))|9(?:22[128]|3(?:2[0-4]|7\\d)|57[05629]|7(?:2[05-9]|3[37]|4\\d|60|7[2579]|87|9[07])))\\d{4}|9[0-57-9]\\d{7}", "\\d{7,9}", , , "912345678"],
            [, , "NA", "NA"],
            [, , "NA", "NA"],
            [, , "NA", "NA"],
            [, , "NA", "NA"],
            [, , "NA", "NA"], "UZ", 998, "810", "8", , , "8", , "8~10", , [
                [, "([679]\\d)(\\d{3})(\\d{2})(\\d{2})", "$1 $2 $3 $4", , "8 $1"]
            ], , [, , "NA", "NA"], , , [, , "NA", "NA"],
            [, , "NA", "NA"], , , [, , "NA", "NA"]
        ],
        VA: [, [, , "(?:0(?:878\\d{5}|6698\\d{5})|[1589]\\d{5,10}|3(?:[12457-9]\\d{8}|[36]\\d{7,9}))", "\\d{6,11}"],
            [, , "06698\\d{5}", "\\d{10}", , , "0669812345"],
            [, , "3(?:[12457-9]\\d{8}|6\\d{7,8}|3\\d{7,9})", "\\d{9,11}", , , "3123456789"],
            [, , "80(?:0\\d{6}|3\\d{3})", "\\d{6,9}", , , "800123456"],
            [, , "0878\\d{5}|1(?:44|6[346])\\d{6}|89(?:2\\d{3}|4(?:[0-4]\\d{2}|[5-9]\\d{4})|5(?:[0-4]\\d{2}|[5-9]\\d{6})|9\\d{6})", "\\d{6,10}", , , "899123456"],
            [, , "84(?:[08]\\d{6}|[17]\\d{3})", "\\d{6,9}", , , "848123456"],
            [, , "1(?:78\\d|99)\\d{6}", "\\d{9,10}", , , "1781234567"],
            [, , "55\\d{8}", "\\d{10}", , , "5512345678"], "VA", 39, "00", , , , , , , , , , [, , "NA", "NA"], , , [, , "848\\d{6}", "\\d{9}", , , "848123456"],
            [, , "NA", "NA"], 1, , [, , "NA", "NA"]
        ],
        VC: [, [, , "[5789]\\d{9}", "\\d{7}(?:\\d{3})?"],
            [, , "784(?:266|3(?:6[6-9]|7\\d|8[0-24-6])|4(?:38|5[0-36-8]|8[0-8])|5(?:55|7[0-2]|93)|638|784)\\d{4}", "\\d{7}(?:\\d{3})?", , , "7842661234"],
            [, , "784(?:4(?:3[0-4]|5[45]|89|9[0-58])|5(?:2[6-9]|3[0-4]))\\d{4}", "\\d{10}", , , "7844301234"],
            [, , "8(?:00|44|55|66|77|88)[2-9]\\d{6}", "\\d{10}", , , "8002345678"],
            [, , "900[2-9]\\d{6}", "\\d{10}", , , "9002345678"],
            [, , "NA", "NA"],
            [, , "5(?:00|33|44|66|77)[2-9]\\d{6}", "\\d{10}", , , "5002345678"],
            [, , "NA", "NA"], "VC", 1, "011", "1", , , "1", , , , , , [, , "NA", "NA"], , "784", [, , "NA", "NA"],
            [, , "NA", "NA"], , , [, , "NA", "NA"]
        ],
        VE: [, [, , "[24589]\\d{9}", "\\d{7,10}"],
            [, , "(?:2(?:12|3[457-9]|[58][1-9]|[467]\\d|9[1-6])|50[01])\\d{7}", "\\d{7,10}", , , "2121234567"],
            [, , "4(?:1[24-8]|2[46])\\d{7}", "\\d{10}", , , "4121234567"],
            [, , "800\\d{7}", "\\d{10}", , , "8001234567"],
            [, , "900\\d{7}", "\\d{10}", , , "9001234567"],
            [, , "NA", "NA"],
            [, , "NA", "NA"],
            [, , "NA", "NA"], "VE", 58, "00", "0", , , "0", , , , [
                [, "(\\d{3})(\\d{7})", "$1-$2", , "0$1", "$CC $1"]
            ], , [, , "NA", "NA"], , , [, , "NA", "NA"],
            [, , "NA", "NA"], , , [, , "NA", "NA"]
        ],
        VG: [, [, , "[2589]\\d{9}", "\\d{7}(?:\\d{3})?"],
            [, , "284(?:(?:229|4(?:22|9[45])|774|8(?:52|6[459]))\\d{4}|496[0-5]\\d{3})", "\\d{7}(?:\\d{3})?", , , "2842291234"],
            [, , "284(?:(?:3(?:0[0-3]|4[0-367]|94)|4(?:4[0-6]|68|99)|54[0-57])\\d{4}|496[6-9]\\d{3})", "\\d{10}", , , "2843001234"],
            [, , "8(?:00|44|55|66|77|88)[2-9]\\d{6}", "\\d{10}", , , "8002345678"],
            [, , "900[2-9]\\d{6}", "\\d{10}", , , "9002345678"],
            [, , "NA", "NA"],
            [, , "5(?:00|33|44|66|77)[2-9]\\d{6}", "\\d{10}", , , "5002345678"],
            [, , "NA", "NA"], "VG", 1, "011", "1", , , "1", , , , , , [, , "NA", "NA"], , "284", [, , "NA", "NA"],
            [, , "NA", "NA"], , , [, , "NA", "NA"]
        ],
        VI: [, [, , "[3589]\\d{9}", "\\d{7}(?:\\d{3})?"],
            [, , "340(?:2(?:01|2[0678]|44|77)|3(?:32|44)|4(?:22|7[34])|5(?:1[34]|55)|6(?:26|4[23]|77|9[023])|7(?:1[2-589]|27|7\\d)|884|998)\\d{4}", "\\d{7}(?:\\d{3})?", , , "3406421234"],
            [, , "340(?:2(?:01|2[0678]|44|77)|3(?:32|44)|4(?:22|7[34])|5(?:1[34]|55)|6(?:26|4[23]|77|9[023])|7(?:1[2-589]|27|7\\d)|884|998)\\d{4}", "\\d{7}(?:\\d{3})?", , , "3406421234"],
            [, , "8(?:00|44|55|66|77|88)[2-9]\\d{6}", "\\d{10}", , , "8002345678"],
            [, , "900[2-9]\\d{6}", "\\d{10}", , , "9002345678"],
            [, , "NA", "NA"],
            [, , "5(?:00|33|44|66|77)[2-9]\\d{6}", "\\d{10}", , , "5002345678"],
            [, , "NA", "NA"], "VI", 1, "011", "1", , , "1", , , 1, , , [, , "NA", "NA"], , "340", [, , "NA", "NA"],
            [, , "NA", "NA"], , , [, , "NA", "NA"]
        ],
        VN: [, [, , "[17]\\d{6,9}|[2-69]\\d{7,9}|8\\d{6,8}", "\\d{7,10}"],
            [, , "(?:2(?:[025-79]|1[0189]|[348][01])|3(?:[0136-9]|[25][01])|4\\d|5(?:[01][01]|[2-9])|6(?:[0-46-8]|5[01])|7(?:[02-79]|[18][01])|8[1-9])\\d{7}", "\\d{9,10}", , , "2101234567"],
            [, , "(?:9\\d|1(?:2\\d|6[2-9]|8[68]|99))\\d{7}", "\\d{9,10}", , , "912345678"],
            [, , "1800\\d{4,6}", "\\d{8,10}", , , "1800123456"],
            [, , "1900\\d{4,6}", "\\d{8,10}", , , "1900123456"],
            [, , "NA", "NA"],
            [, , "NA", "NA"],
            [, , "NA", "NA"], "VN", 84, "00", "0", , , "0", , , , [
                [, "([17]99)(\\d{4})", "$1 $2", ["[17]99"], "0$1", , 1],
                [, "([48])(\\d{4})(\\d{4})", "$1 $2 $3", ["[48]"], "0$1", , 1],
                [, "([235-7]\\d)(\\d{4})(\\d{3})", "$1 $2 $3", ["2[025-79]|3[0136-9]|5[2-9]|6[0-46-8]|7[02-79]"], "0$1", , 1],
                [, "(80)(\\d{5})", "$1 $2", ["80"], "0$1", , 1],
                [, "(69\\d)(\\d{4,5})", "$1 $2", ["69"], "0$1", , 1],
                [, "([235-7]\\d{2})(\\d{4})(\\d{3})", "$1 $2 $3", ["2[1348]|3[25]|5[01]|65|7[18]"], "0$1", , 1],
                [, "(9\\d)(\\d{3})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["9"], "0$1", , 1],
                [, "(1[2689]\\d)(\\d{3})(\\d{4})", "$1 $2 $3", ["1(?:[26]|8[68]|99)"], "0$1", , 1],
                [, "(1[89]00)(\\d{4,6})", "$1 $2", ["1[89]0"], "$1", , 1]
            ], , [, , "NA", "NA"], , , [, , "[17]99\\d{4}|69\\d{5,6}", "\\d{7,8}", , , "1992000"],
            [, , "[17]99\\d{4}|69\\d{5,6}|80\\d{5}", "\\d{7,8}", , , "1992000"], , , [, , "NA", "NA"]
        ],
        VU: [, [, , "[2-57-9]\\d{4,6}", "\\d{5,7}"],
            [, , "(?:2[02-9]\\d|3(?:[5-7]\\d|8[0-8])|48[4-9]|88\\d)\\d{2}", "\\d{5}", , , "22123"],
            [, , "(?:5(?:7[2-5]|[0-689]\\d)|7[013-7]\\d)\\d{4}", "\\d{7}", , , "5912345"],
            [, , "NA", "NA"],
            [, , "NA", "NA"],
            [, , "NA", "NA"],
            [, , "NA", "NA"],
            [, , "NA", "NA"], "VU", 678, "00", , , , , , , , [
                [, "(\\d{3})(\\d{4})", "$1 $2", ["[579]"]]
            ], , [, , "NA", "NA"], , , [, , "NA", "NA"],
            [, , "3[03]\\d{3}|900\\d{4}", "\\d{5,7}", , , "30123"], , , [, , "NA", "NA"]
        ],
        WF: [, [, , "[5-7]\\d{5}", "\\d{6}"],
            [, , "(?:50|68|72)\\d{4}", "\\d{6}", , , "501234"],
            [, , "(?:50|68|72)\\d{4}", "\\d{6}", , , "501234"],
            [, , "NA", "NA"],
            [, , "NA", "NA"],
            [, , "NA", "NA"],
            [, , "NA", "NA"],
            [, , "NA", "NA"], "WF", 681, "00", , , , , , , 1, [
                [, "(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3"]
            ], , [, , "NA", "NA"], , , [, , "NA", "NA"],
            [, , "NA", "NA"], , , [, , "NA", "NA"]
        ],
        WS: [, [, , "[2-8]\\d{4,6}", "\\d{5,7}"],
            [, , "(?:[2-5]\\d|6[1-9]|84\\d{2})\\d{3}", "\\d{5,7}", , , "22123"],
            [, , "(?:60|7[25-7]\\d)\\d{4}", "\\d{6,7}", , , "601234"],
            [, , "800\\d{3}", "\\d{6}", , , "800123"],
            [, , "NA", "NA"],
            [, , "NA", "NA"],
            [, , "NA", "NA"],
            [, , "NA", "NA"], "WS", 685, "0", , , , , , , , [
                [, "(8\\d{2})(\\d{3,4})", "$1 $2", ["8"]],
                [, "(7\\d)(\\d{5})", "$1 $2", ["7"]],
                [, "(\\d{5})", "$1", ["[2-6]"]]
            ], , [, , "NA", "NA"], , , [, , "NA", "NA"],
            [, , "NA", "NA"], , , [, , "NA", "NA"]
        ],
        YE: [, [, , "[1-7]\\d{6,8}", "\\d{6,9}"],
            [, , "(?:1(?:7\\d|[2-68])|2[2-68]|3[2358]|4[2-58]|5[2-6]|6[3-58]|7[24-68])\\d{5}", "\\d{6,8}", , , "1234567"],
            [, , "7[0137]\\d{7}", "\\d{9}", , , "712345678"],
            [, , "NA", "NA"],
            [, , "NA", "NA"],
            [, , "NA", "NA"],
            [, , "NA", "NA"],
            [, , "NA", "NA"], "YE", 967, "00", "0", , , "0", , , , [
                [, "([1-7])(\\d{3})(\\d{3,4})", "$1 $2 $3", ["[1-6]|7[24-68]"], "0$1"],
                [, "(7\\d{2})(\\d{3})(\\d{3})", "$1 $2 $3", ["7[0137]"], "0$1"]
            ], , [, , "NA", "NA"], , , [, , "NA", "NA"],
            [, , "NA", "NA"], , , [, , "NA", "NA"]
        ],
        YT: [, [, , "[268]\\d{8}", "\\d{9}"],
            [, , "269(?:6[0-4]|50)\\d{4}", "\\d{9}", , , "269601234"],
            [, , "639\\d{6}", "\\d{9}", , , "639123456"],
            [, , "80\\d{7}", "\\d{9}", , , "801234567"],
            [, , "NA", "NA"],
            [, , "NA", "NA"],
            [, , "NA", "NA"],
            [, , "NA", "NA"], "YT", 262, "00", "0", , , "0", , , , , , [, , "NA", "NA"], , "269|63", [, , "NA", "NA"],
            [, , "NA", "NA"], , , [, , "NA", "NA"]
        ],
        ZA: [, [, , "[1-79]\\d{8}|8(?:[067]\\d{7}|[1-4]\\d{3,7})", "\\d{5,9}"],
            [, , "(?:1[0-8]|2[0-378]|3[1-69]|4\\d|5[1346-8])\\d{7}", "\\d{9}", , , "101234567"],
            [, , "(?:6[0-5]|7[0-46-9])\\d{7}|8[1-4]\\d{3,7}", "\\d{5,9}", , , "711234567"],
            [, , "80\\d{7}", "\\d{9}", , , "801234567"],
            [, , "86[2-9]\\d{6}|90\\d{7}", "\\d{9}", , , "862345678"],
            [, , "860\\d{6}", "\\d{9}", , , "860123456"],
            [, , "NA", "NA"],
            [, , "87\\d{7}", "\\d{9}", , , "871234567"], "ZA", 27, "00", "0", , , "0", , , , [
                [, "(860)(\\d{3})(\\d{3})", "$1 $2 $3", ["860"], "0$1"],
                [, "(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["[1-79]|8(?:[0-47]|6[1-9])"], "0$1"],
                [, "(\\d{2})(\\d{3,4})", "$1 $2", ["8[1-4]"], "0$1"],
                [, "(\\d{2})(\\d{3})(\\d{2,3})", "$1 $2 $3", ["8[1-4]"], "0$1"]
            ], , [, , "NA", "NA"], , , [, , "NA", "NA"],
            [, , "861\\d{6}", "\\d{9}", , , "861123456"], , , [, , "NA", "NA"]
        ],
        ZM: [, [, , "[289]\\d{8}", "\\d{9}"],
            [, , "21[1-8]\\d{6}", "\\d{9}", , , "211234567"],
            [, , "9(?:5[05]|6\\d|7[1-9])\\d{6}", "\\d{9}", , , "955123456"],
            [, , "800\\d{6}", "\\d{9}", , , "800123456"],
            [, , "NA", "NA"],
            [, , "NA", "NA"],
            [, , "NA", "NA"],
            [, , "NA", "NA"], "ZM", 260, "00", "0", , , "0", , , , [
                [, "([29]\\d)(\\d{7})", "$1 $2", ["[29]"], "0$1"],
                [, "(800)(\\d{3})(\\d{3})", "$1 $2 $3", ["8"], "0$1"]
            ], , [, , "NA", "NA"], , , [, , "NA", "NA"],
            [, , "NA", "NA"], , , [, , "NA", "NA"]
        ],
        ZW: [, [, , "2(?:[012457-9]\\d{3,8}|6(?:[14]\\d{7}|\\d{4}))|[13-79]\\d{4,9}|8[06]\\d{8}", "\\d{3,10}"],
            [, , "(?:2(?:0(?:4\\d|5\\d{2})|2[278]\\d|48\\d|7(?:[1-7]\\d|[089]\\d{2})|8(?:[2-57-9]|[146]\\d{2})|98)|3(?:08|17|3[78]|7(?:[19]|[56]\\d)|8[37]|98)|5[15][78]|6(?:28\\d{2}|[36]7|75\\d|[69]8|8(?:7\\d|8)))\\d{3}|(?:2(?:1[39]|2[0157]|6[14]|7[35]|84)|329)\\d{7}|(?:1(?:3\\d{2}|9\\d|[4-8])|2(?:0\\d{2}|[569]\\d)|3(?:[26]|[013459]\\d)|5(?:0|5\\d{2}|[689]\\d)|6(?:[39]|[01246]\\d|[78]\\d{2}))\\d{3}|(?:29\\d|39|54)\\d{6}|(?:(?:25|54)83|2582\\d)\\d{3}|(?:4\\d{6,7}|9[2-9]\\d{4,5})", "\\d{3,10}", , , "1312345"],
            [, , "7[1378]\\d{7}", "\\d{9}", , , "711234567"],
            [, , "800\\d{7}", "\\d{10}", , , "8001234567"],
            [, , "NA", "NA"],
            [, , "NA", "NA"],
            [, , "NA", "NA"],
            [, , "86(?:1[12]|30|44|55|77|8[367]|99)\\d{6}", "\\d{10}", , , "8686123456"], "ZW", 263, "00", "0", , , "0", , , , [
                [, "([49])(\\d{3})(\\d{2,4})", "$1 $2 $3", ["4|9[2-9]"], "0$1"],
                [, "(7\\d)(\\d{3})(\\d{3,4})", "$1 $2 $3", ["7"], "0$1"],
                [, "(86\\d{2})(\\d{3})(\\d{3})", "$1 $2 $3", ["86[24]"], "0$1"],
                [, "([2356]\\d{2})(\\d{3,5})", "$1 $2", ["2(?:0[45]|2[278]|[49]8|[78])|3(?:08|17|3[78]|7[1569]|8[37]|98)|5[15][78]|6(?:[29]8|[38]7|6[78]|75|[89]8)"], "0$1"],
                [, "(\\d{3})(\\d{3})(\\d{3,4})", "$1 $2 $3", ["2(?:1[39]|2[0157]|6[14]|7[35]|84)|329"], "0$1"],
                [, "([1-356]\\d)(\\d{3,5})", "$1 $2", ["1[3-9]|2[0569]|3[0-69]|5[05689]|6[0-46-9]"], "0$1"],
                [, "([235]\\d)(\\d{3})(\\d{3,4})", "$1 $2 $3", ["[23]9|54"], "0$1"],
                [, "([25]\\d{3})(\\d{3,5})", "$1 $2", ["(?:25|54)8", "258[23]|5483"], "0$1"],
                [, "(8\\d{3})(\\d{6})", "$1 $2", ["86"], "0$1"],
                [, "(80\\d)(\\d{3})(\\d{4})", "$1 $2 $3", ["80"], "0$1"]
            ], , [, , "NA", "NA"], , , [, , "NA", "NA"],
            [, , "NA", "NA"], , , [, , "NA", "NA"]
        ],
        800: [, [, , "\\d{8}", "\\d{8}", , , "12345678"],
            [, , "NA", "NA", , , "12345678"],
            [, , "NA", "NA", , , "12345678"],
            [, , "\\d{8}", "\\d{8}", , , "12345678"],
            [, , "NA", "NA"],
            [, , "NA", "NA"],
            [, , "NA", "NA"],
            [, , "NA", "NA"], "001", 800, , , , , , , , 1, [
                [, "(\\d{4})(\\d{4})", "$1 $2"]
            ], , [, , "NA", "NA"], , , [, , "NA", "NA"],
            [, , "NA", "NA"], 1, , [, , "NA", "NA"]
        ],
        808: [, [, , "\\d{8}", "\\d{8}", , , "12345678"],
            [, , "NA", "NA", , , "12345678"],
            [, , "NA", "NA", , , "12345678"],
            [, , "NA", "NA"],
            [, , "NA", "NA"],
            [, , "\\d{8}", "\\d{8}", , , "12345678"],
            [, , "NA", "NA"],
            [, , "NA", "NA"], "001", 808, , , , , , , , 1, [
                [, "(\\d{4})(\\d{4})", "$1 $2"]
            ], , [, , "NA", "NA"], , , [, , "NA", "NA"],
            [, , "NA", "NA"], 1, , [, , "NA", "NA"]
        ],
        870: [, [, , "[35-7]\\d{8}", "\\d{9}", , , "301234567"],
            [, , "NA", "NA", , , "301234567"],
            [, , "(?:[356]\\d|7[6-8])\\d{7}", "\\d{9}", , , "301234567"],
            [, , "NA", "NA"],
            [, , "NA", "NA"],
            [, , "NA", "NA"],
            [, , "NA", "NA"],
            [, , "NA", "NA"], "001", 870, , , , , , , , , [
                [, "(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3"]
            ], , [, , "NA", "NA"], , , [, , "NA", "NA"],
            [, , "NA", "NA"], , , [, , "NA", "NA"]
        ],
        878: [, [, , "1\\d{11}", "\\d{12}", , , "101234567890"],
            [, , "NA", "NA", , , "101234567890"],
            [, , "NA", "NA", , , "101234567890"],
            [, , "NA", "NA"],
            [, , "NA", "NA"],
            [, , "NA", "NA"],
            [, , "NA", "NA"],
            [, , "10\\d{10}", "\\d{12}", , , "101234567890"], "001", 878, , , , , , , , 1, [
                [, "(\\d{2})(\\d{5})(\\d{5})", "$1 $2 $3"]
            ], , [, , "NA", "NA"], , , [, , "NA", "NA"],
            [, , "NA", "NA"], , , [, , "NA", "NA"]
        ],
        881: [, [, , "[67]\\d{8}", "\\d{9}", , , "612345678"],
            [, , "NA", "NA", , , "612345678"],
            [, , "[67]\\d{8}", "\\d{9}", , , "612345678"],
            [, , "NA", "NA"],
            [, , "NA", "NA"],
            [, , "NA", "NA"],
            [, , "NA", "NA"],
            [, , "NA", "NA"], "001", 881, , , , , , , , , [
                [, "(\\d)(\\d{3})(\\d{5})", "$1 $2 $3", ["[67]"]]
            ], , [, , "NA", "NA"], , , [, , "NA", "NA"],
            [, , "NA", "NA"], , , [, , "NA", "NA"]
        ],
        882: [, [, , "[13]\\d{6,11}", "\\d{7,12}", , , "3451234567"],
            [, , "NA", "NA", , , "3451234567"],
            [, , "3(?:2\\d{3}|37\\d{2}|4(?:2|7\\d{3}))\\d{4}", "\\d{7,10}", , , "3451234567"],
            [, , "NA", "NA"],
            [, , "NA", "NA"],
            [, , "NA", "NA"],
            [, , "NA", "NA"],
            [, , "1(?:3(?:0[0347]|[13][0139]|2[035]|4[013568]|6[0459]|7[06]|8[15678]|9[0689])\\d{4}|6\\d{5,10})|345\\d{7}", "\\d{7,12}", , , "3451234567"], "001", 882, , , , , , , , , [
                [, "(\\d{2})(\\d{4})(\\d{3})", "$1 $2 $3", ["3[23]"]],
                [, "(\\d{2})(\\d{5})", "$1 $2", ["16|342"]],
                [, "(\\d{2})(\\d{4})(\\d{4})", "$1 $2 $3", ["34[57]"]],
                [, "(\\d{3})(\\d{4})(\\d{4})", "$1 $2 $3", ["348"]],
                [, "(\\d{2})(\\d{2})(\\d{4})", "$1 $2 $3", ["1"]],
                [, "(\\d{2})(\\d{3,4})(\\d{4})", "$1 $2 $3", ["16"]],
                [, "(\\d{2})(\\d{4,5})(\\d{5})", "$1 $2 $3", ["16"]]
            ], , [, , "NA", "NA"], , , [, , "NA", "NA"],
            [, , "NA", "NA"], , , [, , "348[57]\\d{7}", "\\d{11}", , , "3451234567"]
        ],
        883: [, [, , "51\\d{7}(?:\\d{3})?", "\\d{9}(?:\\d{3})?", , , "510012345"],
            [, , "NA", "NA", , , "510012345"],
            [, , "NA", "NA", , , "510012345"],
            [, , "NA", "NA"],
            [, , "NA", "NA"],
            [, , "NA", "NA"],
            [, , "NA", "NA"],
            [, , "51(?:00\\d{5}(?:\\d{3})?|[13]0\\d{8})", "\\d{9}(?:\\d{3})?", , , "510012345"], "001", 883, , , , , , , , 1, [
                [, "(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["510"]],
                [, "(\\d{3})(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3 $4", ["510"]],
                [, "(\\d{4})(\\d{4})(\\d{4})", "$1 $2 $3", ["51[13]"]]
            ], , [, , "NA", "NA"], , , [, , "NA", "NA"],
            [, , "NA", "NA"], , , [, , "NA", "NA"]
        ],
        888: [, [, , "\\d{11}", "\\d{11}", , , "12345678901"],
            [, , "NA", "NA", , , "12345678901"],
            [, , "NA", "NA", , , "12345678901"],
            [, , "NA", "NA"],
            [, , "NA", "NA"],
            [, , "NA", "NA"],
            [, , "NA", "NA"],
            [, , "NA", "NA"], "001", 888, , , , , , , , 1, [
                [, "(\\d{3})(\\d{3})(\\d{5})", "$1 $2 $3"]
            ], , [, , "NA", "NA"], , , [, , "NA", "NA"],
            [, , "\\d{11}", "\\d{11}", , , "12345678901"], 1, , [, , "NA", "NA"]
        ],
        979: [, [, , "\\d{9}", "\\d{9}", , , "123456789"],
            [, , "NA", "NA", , , "123456789"],
            [, , "NA", "NA", , , "123456789"],
            [, , "NA", "NA"],
            [, , "\\d{9}", "\\d{9}", , , "123456789"],
            [, , "NA", "NA"],
            [, , "NA", "NA"],
            [, , "NA", "NA"], "001", 979, , , , , , , , 1, [
                [, "(\\d)(\\d{4})(\\d{4})", "$1 $2 $3"]
            ], , [, , "NA", "NA"], , , [, , "NA", "NA"],
            [, , "NA", "NA"], 1, , [, , "NA", "NA"]
        ]
    }, v.a = function() {
        return v.b ? v.b : v.b = new v
    };
    var tt = {
            0: "0",
            1: "1",
            2: "2",
            3: "3",
            4: "4",
            5: "5",
            6: "6",
            7: "7",
            8: "8",
            9: "9",
            "ï¼": "0",
            "ï¼‘": "1",
            "ï¼’": "2",
            "ï¼“": "3",
            "ï¼”": "4",
            "ï¼•": "5",
            "ï¼–": "6",
            "ï¼—": "7",
            "ï¼˜": "8",
            "ï¼™": "9",
            "Ù ": "0",
            "Ù¡": "1",
            "Ù¢": "2",
            "Ù£": "3",
            "Ù¤": "4",
            "Ù¥": "5",
            "Ù¦": "6",
            "Ù§": "7",
            "Ù¨": "8",
            "Ù©": "9",
            "Û°": "0",
            "Û±": "1",
            "Û²": "2",
            "Û³": "3",
            "Û´": "4",
            "Ûµ": "5",
            "Û¶": "6",
            "Û·": "7",
            "Û¸": "8",
            "Û¹": "9"
        },
        br = {
            0: "0",
            1: "1",
            2: "2",
            3: "3",
            4: "4",
            5: "5",
            6: "6",
            7: "7",
            8: "8",
            9: "9",
            "ï¼": "0",
            "ï¼‘": "1",
            "ï¼’": "2",
            "ï¼“": "3",
            "ï¼”": "4",
            "ï¼•": "5",
            "ï¼–": "6",
            "ï¼—": "7",
            "ï¼˜": "8",
            "ï¼™": "9",
            "Ù ": "0",
            "Ù¡": "1",
            "Ù¢": "2",
            "Ù£": "3",
            "Ù¤": "4",
            "Ù¥": "5",
            "Ù¦": "6",
            "Ù§": "7",
            "Ù¨": "8",
            "Ù©": "9",
            "Û°": "0",
            "Û±": "1",
            "Û²": "2",
            "Û³": "3",
            "Û´": "4",
            "Ûµ": "5",
            "Û¶": "6",
            "Û·": "7",
            "Û¸": "8",
            "Û¹": "9",
            A: "2",
            B: "2",
            C: "2",
            D: "3",
            E: "3",
            F: "3",
            G: "4",
            H: "4",
            I: "4",
            J: "5",
            K: "5",
            L: "5",
            M: "6",
            N: "6",
            O: "6",
            P: "7",
            Q: "7",
            R: "7",
            S: "7",
            T: "8",
            U: "8",
            V: "8",
            W: "9",
            X: "9",
            Y: "9",
            Z: "9"
        },
        ir = RegExp("[+ï¼‹]+"),
        b = RegExp("^[+ï¼‹]+"),
        li = RegExp("([0-9ï¼-ï¼™Ù -Ù©Û°-Û¹])"),
        kr = RegExp("[+ï¼‹0-9ï¼-ï¼™Ù -Ù©Û°-Û¹]"),
        dr = /[\\\/] *x/,
        gr = RegExp("[^0-9ï¼-ï¼™Ù -Ù©Û°-Û¹A-Za-z#]+$"),
        nu = /(?:.*?[A-Za-z]){3}.*/,
        ti = RegExp("(?:;ext=([0-9ï¼-ï¼™Ù -Ù©Û°-Û¹]{1,7})|[ Â \\t,]*(?:e?xt(?:ensi(?:oÌ?|Ã³))?n?|ï½…?ï½˜ï½”ï½Ž?|[,xï½˜#ï¼ƒ~ï½ž]|int|anexo|ï½‰ï½Žï½”)[:\\.ï¼Ž]?[ Â \\t,-]*([0-9ï¼-ï¼™Ù -Ù©Û°-Û¹]{1,7})#?|[- ]+([0-9ï¼-ï¼™Ù -Ù©Û°-Û¹]{1,5})#)$", "i"),
        tu = RegExp("^[0-9ï¼-ï¼™Ù -Ù©Û°-Û¹]{2}$|^[+ï¼‹]*(?:[-xâ€-â€•âˆ’ãƒ¼ï¼-ï¼ Â Â­â€‹â ã€€()ï¼ˆï¼‰ï¼»ï¼½.\\[\\]/~â“âˆ¼ï½ž*]*[0-9ï¼-ï¼™Ù -Ù©Û°-Û¹]){3,}[-xâ€-â€•âˆ’ãƒ¼ï¼-ï¼ Â Â­â€‹â ã€€()ï¼ˆï¼‰ï¼»ï¼½.\\[\\]/~â“âˆ¼ï½ž*A-Za-z0-9ï¼-ï¼™Ù -Ù©Û°-Û¹]*(?:;ext=([0-9ï¼-ï¼™Ù -Ù©Û°-Û¹]{1,7})|[ Â \\t,]*(?:e?xt(?:ensi(?:oÌ?|Ã³))?n?|ï½…?ï½˜ï½”ï½Ž?|[,xï½˜#ï¼ƒ~ï½ž]|int|anexo|ï½‰ï½Žï½”)[:\\.ï¼Ž]?[ Â \\t,-]*([0-9ï¼-ï¼™Ù -Ù©Û°-Û¹]{1,7})#?|[- ]+([0-9ï¼-ï¼™Ù -Ù©Û°-Û¹]{1,5})#)?$", "i"),
        rr = /^\(?\$1\)?$/;
    et = new h, u(et, 11, "NA");
    var nr = /\[([^\[\]])*\]/g,
        tr = /\d(?=[^,}][^,}])/g,
        ki = RegExp("^[-xâ€-â€•âˆ’ãƒ¼ï¼-ï¼ Â Â­â€‹â ã€€()ï¼ˆï¼‰ï¼»ï¼½.\\[\\]/~â“âˆ¼ï½ž]*(\\$\\d[-xâ€-â€•âˆ’ãƒ¼ï¼-ï¼ Â Â­â€‹â ã€€()ï¼ˆï¼‰ï¼»ï¼½.\\[\\]/~â“âˆ¼ï½ž]*)+$"),
        ei = /[- ]/;
    y = v.a(), kt("phoneUtils.isValidNumberForRegion", function(t, o) {
        var s, c, h, v, p;
        if (o = o || "us", !at(o) && 0 < t.length && "+" != t.charAt(0)) throw "Invalid country calling code";
        if (c = o, null == t) throw "The string supplied did not seem to be a phone number";
        if (250 < t.length) throw "The string supplied is too long to be a phone number";
        if (h = new r, s = t.indexOf(";phone-context="), 0 < s ? (v = s + 15, "+" == t.charAt(v) && (p = t.indexOf(";", v), 0 < p ? h.a(t.substring(v, p)) : h.a(t.substring(v))), v = t.indexOf("tel:"), h.a(t.substring(0 <= v ? v + 4 : 0, s))) : h.a(iu(t)), s = h.toString(), v = s.indexOf(";isub="), 0 < v && (f(h), h.a(s.substring(0, v))), !wt(h.toString())) throw "The string supplied did not seem to be a phone number";
        if (s = h.toString(), !(at(c) || null != s && 0 < s.length && b.test(s))) throw "Invalid country calling code";
        s = new l, u(s, 5, t);
        n: {
            if (v = h.toString(), p = v.search(ti), 0 <= p && wt(v.substring(0, p)))
                for (var w = v.match(ti), k = w.length, d = 1; d < k; ++d)
                    if (null != w[d] && 0 < w[d].length) {
                        f(h), h.a(v.substring(0, p)), v = w[d];
                        break n
                    } v = ""
        }
        0 < v.length && u(s, 3, v), p = a(y, c), v = new r, w = 0, k = h.toString();
        try {
            w = bt(k, p, v, s)
        } catch (g) {
            if ("Invalid country calling code" == g && b.test(k)) {
                if (k = k.replace(b, ""), w = bt(k, p, v, s), 0 == w) throw g;
            } else throw g;
        }
        if (0 != w ? (h = vt(w), h != c && (p = "001" == h ? a(y, "" + w) : a(y, h))) : (ii(h), v.a(h.toString()), null != c ? (w = i(p, 10), u(s, 1, w)) : (delete s.a[6], s.b && delete s.b[6])), 2 > v.b.length) throw "The string supplied is too short to be a phone number";
        if (null != p && (c = new r, h = new r(v.toString()), dt(h, p, c), w = h.toString(), p = n(p, 1), p = i(p, 3), 2 != bi(p, w) && (v = h, u(s, 7, c.toString()))), c = v.toString(), h = c.length, 2 > h) throw "The string supplied is too short to be a phone number";
        if (17 < h) throw "The string supplied is too long to be a phone number";
        if (1 < c.length && "0" == c.charAt(0)) {
            for (u(s, 4, !0), h = 1; h < c.length - 1 && "0" == c.charAt(h);) h++;
            1 != h && u(s, 8, h)
        }
        return u(s, 2, parseInt(c, 10)), h = o, v = i(s, 1), c = "001" == h ? a(y, "" + v) : a(y, h), null == c || "001" != h && v != ni(y, h) ? s = !1 : (h = "" + n(s, 2), s = null != s.a[4] && n(s, 4) ? Array(i(s, 8) + 1).join("0") + h : h, s = -1 != (e(s, n(c, 1)) ? e(s, n(c, 5)) ? 4 : e(s, n(c, 4)) ? 3 : e(s, n(c, 6)) ? 5 : e(s, n(c, 8)) ? 6 : e(s, n(c, 7)) ? 7 : e(s, n(c, 21)) ? 8 : e(s, n(c, 25)) ? 9 : e(s, n(c, 28)) ? 10 : e(s, n(c, 2)) ? n(c, 18) || e(s, n(c, 3)) ? 2 : 0 : !n(c, 18) && e(s, n(c, 3)) ? 1 : -1 : -1)), s
    }), kt("phoneUtils.formatAsTyped", function(n, t) {
        for (var u = new di(t || "us"), f = n.length, i = "", r = 0; r < f; ++r) i = u, i.ea = gi(i, n.charAt(r)), i = i.ea;
        return i
    })
})();;
robloxApp.directive("phoneNumber", ["$log", "$window", function(n, t) {
    function i(n) {
        return n ? n.replace(/([^0-9|+])/g, "") : n
    }

    function r(i, r) {
        var u = i;
        try {
            u = t.phoneUtils.formatAsTyped(i, r)
        } catch (f) {
            n.debug(f)
        }
        return u
    }
    return {
        restrict: "A",
        require: "?ngModel",
        scope: {
            countryCode: "=",
            nonFormatted: "=?"
        },
        controllerAs: "",
        controller: function() {
            this.countryCode = this.countryCode || "us"
        },
        link: function(n, t, u, f) {
            function o(t) {
                var u = i(t),
                    f;
                return n.nonFormatted = u, f = "", f = u && u.length > 1 ? r(u, n.countryCode) : u, f.trim()
            }

            function s(t) {
                return f.$isEmpty(t) ? t : r(i(t), n.countryCode)
            }

            function h(t) {
                var r, u, s;
                return f.$isEmpty(t) ? (n.nonFormatted = "", t) : (r = o(t), r === t) ? t : (u = e.selectionStart, s = e.selectionEnd + r.length - t.length, t.length < r.length && (u = u + (r.length - t.length)), t.length > r.length + 1 && (u = u - (r.length - t.length)), f.$setViewValue(r), f.$render(), e.setSelectionRange(u, s), i(r))
            }
            var e = t[0];
            n.$watch("countryCode", function() {
                f.$modelValue = f.$viewValue + " "
            }), f.$formatters.push(s), f.$parsers.push(h)
        }
    }
}]);;
"use strict";
robloxApp.filter("phonePrefix", ["phoneConstants", function(n) {
    return function(t) {
        return t.name + " (" + n.phonePrefixCharacter + t.prefix + ")"
    }
}]);;
robloxApp.constant("phoneConstants", {
    templates: {
        verifyPhoneModal: "verify-phone-modal"
    },
    urls: {
        phonePrefixes: "/v1/countries/phone-prefix-list",
        addPhone: "/account/settings/phone",
        verifyPhone: "/account/settings/phone/verify",
        resendCode: "/account/settings/phone/resend"
    },
    modalTypes: {
        addPhone: "addPhone",
        verifyPhone: "verifyPhone"
    },
    underscore: "_",
    phonePrefixCharacter: "+",
    defaultCountryCode: "US",
    unitedStatesPrefix: {
        name: "United States",
        code: "US",
        prefix: 1
    }
});;
robloxApp.constant("phoneLabelConstants", {
    codeErrorPart1: "Code must be ",
    codeErrorPart2: " digits",
    generalErrorMessage: "An error occurred. Please try again later.",
    countryListError: "An error occurred loading the country list",
    close: "Close",
    addPhone: "Add Phone",
    submit: "Submit",
    verifyPhone: "Verify Phone",
    verify: "Verify",
    resendCode: "Resend Code",
    enterCodeInstructions: "Enter the code in the text sent to ",
    phonePlaceholder: "Phone Number",
    verifyPasswordPlaceholder: "Roblox Account Password",
    codePlaceholderPt1: "Enter Code (",
    codePlaceholderPt2: "- digit)",
    success: "Success",
    notReceived: "Didn't receive it?",
    or: "Or",
    invalidPhoneNumber: "Invalid phone number"
});;
robloxApp.factory("phoneService", ["$q", "httpService", "phoneConstants", function(n, t, i) {
    function f(n) {
        var i = n + r,
            f = {
                url: i
            };
        return t.httpGet(f, null).then(function(n) {
            var t;
            return _.reject(n, function(n) {
                return n.code === u ? (t = n, !0) : !1
            }), t && n.unshift(t), n
        })
    }

    function e(n) {
        var r = i.urls.addPhone,
            u = {
                url: r
            },
            f = {
                countryCode: n.countryCode,
                prefix: n.prefix,
                phone: n.phone,
                password: n.password
            };
        return t.httpPost(u, f)
    }

    function o(n) {
        var r = i.urls.verifyPhone,
            u = {
                url: r
            },
            f = {
                code: n.code
            };
        return t.httpPost(u, f)
    }

    function s() {
        var n = i.urls.resendCode,
            r = {
                url: n
            };
        return t.httpPost(r)
    }
    var r = i.urls.phonePrefixes,
        u = i.defaultCountryCode;
    return {
        getPhonePrefixes: f,
        addPhone: e,
        verifyPhone: o,
        resendCode: s
    }
}]);;
"use strict";
var phoneModal = angular.module("phoneModal", ["roblox.formEvents", "modal"]);;
"use strict";
phoneModal.controller("addPhoneModalController", ["$scope", "$uibModalInstance", "eventStreamService", "phoneService", "phoneConstants", "phoneLabelConstants", function(n, t, i, r, u, f) {
    n.data = {}, n.forms = {
        phoneForm: {}
    }, n.layout = {
        labels: f
    }, n.init = function() {
        Roblox.CurrentUser && Roblox.CurrentUser.isUnder13 || (n.initializeAddPhoneModal(), n.sendModalShownEvent())
    }, n.initializeAddPhoneModal = function() {
        r.getPhonePrefixes(Roblox.ContactUpsellMeta.apiProxyDomain).then(function(t) {
            n.data.phonePrefixes = t, n.data.phonePrefixes || (n.data.phonePrefixes = [u.unitedStatesPrefix]), n.data.phonePrefix = t[0]
        }, function() {
            n.data.phonePrefixes = [u.unitedStatesPrefix], n.layout.countryError = f.countryListError
        })
    }, n.getPhonePrefix = function() {
        return n.data.phonePrefix ? u.phonePrefixCharacter + n.data.phonePrefix.prefix : ""
    }, n.clearError = function() {
        n.layout.error = null
    }, n.getError = function() {
        return n.layout.error
    }, n.closeModal = function() {
        t.close(n.addPhoneModalData.closeModalParams)
    }, n.addPhone = function() {
        n.layout.isSubmitBusy = !0, n.layout.error = null;
        var i = {
            countryCode: n.data.phonePrefix.code,
            prefix: n.data.phonePrefix.prefix,
            phone: n.data.phone,
            password: n.data.password
        };
        r.addPhone(i).then(function(r) {
            r.isValid ? (n.sendAddPhoneActionEvent(!0), t.close({
                success: !0,
                phoneNumber: i.phone
            })) : (n.layout.error = r.data, n.sendAddPhoneActionEvent(!1, r.data))
        }, function() {
            n.layout.error = f.generalErrorMessage, n.sendAddPhoneActionEvent(!1)
        }).finally(function() {
            n.layout.isSubmitBusy = !1
        })
    }, n.sendModalShownEvent = function() {
        var t = n.addPhoneModalData.eventContext + u.underscore + u.modalTypes.addPhone;
        i.sendModalShownEvent(t)
    }, n.sendAddPhoneActionEvent = function(t, r) {
        i.sendEventWithTarget(i.eventNames.account.addPhone, n.addPhoneModalData.eventContext, {
            success: t,
            msg: r
        })
    }, n.init()
}]);;
"use strict";
phoneModal.controller("verifyPhoneModalController", ["$scope", "$uibModalInstance", "eventStreamService", "numericCodeService", "phoneService", "phoneConstants", "phoneLabelConstants", function(n, t, i, r, u, f, e) {
    n.data = {}, n.forms = {
        codeForm: {}
    }, n.layout = {
        labels: e
    }, n.init = function() {
        n.layout.enterCodeInstructions = e.enterCodeInstructions + n.verifyPhoneModalData.phoneNumber, n.layout.codePlaceholder = e.codePlaceholderPt1 + n.verifyPhoneModalData.codeLength + e.codePlaceholderPt2, n.layout.focusOnCodeInput = !0, n.sendModalShownEvent()
    }, n.closeModal = function() {
        t.close(n.verifyPhoneModalData.closeModalParams)
    }, n.clearCodeError = function() {
        n.layout.codeError = null
    }, n.submitCode = function() {
        if (n.layout.isVerifyPhoneBusy = !0, n.clearCodeError(), r.checkCode(n.data.code, n.verifyPhoneModalData.codeLength)) {
            var i = {
                code: n.data.code
            };
            u.verifyPhone(i).then(function(i) {
                i.isValid ? (n.sendVerifyPhoneActionEvent(!0), t.close({
                    success: !0
                })) : (n.layout.codeError = i.data, n.sendVerifyPhoneActionEvent(!1, i.data))
            }, function() {
                n.layout.codeError = e.generalErrorMessage, n.sendVerifyPhoneActionEvent(!1)
            }).finally(function() {
                n.layout.isVerifyPhoneBusy = !1
            })
        } else n.layout.codeError = e.codeErrorPart1 + n.verifyPhoneModalData.codeLength + e.codeErrorPart2;
        n.layout.isVerifyPhoneBusy = !1
    }, n.resendCode = function() {
        n.layout.isVerifyPhoneBusy = !0, n.clearCodeError(), u.resendCode().then(function(t) {
            t.isValid || (n.layout.codeError = t.data)
        }, function() {
            n.layout.codeError = e.generalErrorMessage
        }).finally(function() {
            n.layout.isVerifyPhoneBusy = !1
        })
    }, n.secondaryFooterOptionClick = function() {
        t.close(n.verifyPhoneModalData.secondaryFooterOptionCloseParams)
    }, n.sendModalShownEvent = function() {
        var t = n.verifyPhoneModalData.eventContext + f.underscore + f.modalTypes.verifyPhone;
        i.sendModalShownEvent(t)
    }, n.sendVerifyPhoneActionEvent = function(t, r) {
        i.sendEventWithTarget(i.eventNames.account.verifyPhone, n.verifyPhoneModalData.eventContext, {
            success: t,
            msg: r
        })
    }, n.init()
}]);;
var Roblox = Roblox || {};
Roblox.DeviceMeta = function() {
    var t = document.querySelector('meta[name="device-meta"]');
    if (t === null) {
        console.debug("Error loading device information from meta tag - please check if meta tag is present");
        return
    }
    var n = t.dataset || {},
        i = {
            android: "android",
            ios: "ios",
            xbox: "xbox",
            uwp: "uwp",
            amazon: "amazon",
            unknown: "unknown"
        },
        r = {
            computer: "computer",
            tablet: "tablet",
            phone: "phone",
            console: "console"
        };
    return function() {
        return {
            deviceType: r[n.deviceType] || "",
            appType: i[n.appType] || "",
            isInApp: n.isInApp === "true",
            isDesktop: n.isDesktop === "true",
            isPhone: n.isPhone === "true",
            isTablet: n.isTablet === "true",
            isConsole: n.isConsole === "true",
            isAndroidApp: n.isAndroidApp === "true",
            isIosApp: n.isIosApp === "true",
            isUWPApp: n.isUwpApp === "true",
            isXboxApp: n.isXboxApp === "true",
            isAmazonApp: n.isAmazonApp === "true",
            isStudio: n.isStudio === "true"
        }
    }
}();;

function showTosModal(n, t, i, r) {
    Roblox.Dialog.open({
        titleText: n,
        bodyContent: t,
        acceptText: i,
        onAccept: function() {
            submitTosAgreement(r)
        },
        acceptColor: Roblox.Dialog.blue,
        fieldValidationRequired: !1,
        dismissable: !1,
        xToCancel: !1,
        declineColor: Roblox.Dialog.none,
        allowHtmlContentInBody: !0
    })
}

function submitTosAgreement(n) {
    $.ajax({
        type: "POST",
        url: n,
        contentType: "application/json; charset=utf-8",
        success: function() {}
    })
}
$(function() {
    var n, t, i, r, u = "/UserCheck/show-tos",
        f = $("#TosAgreementInfo").data("terms-check-needed");
    $.ajax({
        type: "GET",
        url: u,
        data: {
            isLicensingTermsCheckNeeded: f
        },
        contentType: "application/json; charset=utf-8",
        success: function(u) {
            if (u.partialViewName) {
                var f = Roblox.I18nData && Roblox.Intl && Roblox.Lang && Roblox.Lang.legal && new Roblox.Intl,
                    e = '<a href="https://www.roblox.com/info/terms" class="text-link" target="_blank">',
                    s = ' <a href="https://www.roblox.com/info/privacy" class="text-link" target="_blank">',
                    o = '<a href="https://www.roblox.com/info/latest-changes" class="text-link" target="_blank">';
                u.partialViewName === "CaptureTosAgreement_v2" ? (f ? (n = f.f(Roblox.Lang.legal["Heading.TosHaveChangedTitle"]), t = f.f(Roblox.Lang.legal["Message.AgreeToTosAndPrivacyBody"], {
                    tosLinkStart: e,
                    tosLinkEnd: "</a>",
                    privacyLinkStart: s,
                    privacyLinkEnd: "</a>",
                    legalChangesLinkStart: o,
                    legalChangesLinkEnd: "</a>"
                }), i = f.f(Roblox.Lang.legal["Label.IAgree"])) : (n = "TERMS OF USE HAVE CHANGED", t = 'By clicking "I Agree", you are agreeing to the <a href="https://www.roblox.com/info/terms" class="text-link" target="_blank">Terms of Use</a> and <a href="https://www.roblox.com/info/privacy" class="text-link" target="_blank">Privacy Policy</a>. You can learn more about what is changing <a href="https://www.roblox.com/info/latest-changes" class="text-link" target="_blank">here</a>.', i = "I AGREE"), r = "/UserCheck/update-tos") : u.partialViewName === "CaptureTosAgreementWithExplicitLicenseClause" && (f ? (n = f.f(Roblox.Lang.legal["Heading.TosAgreementTitle"]), t = f.f(Roblox.Lang.legal["Message.TosAgreementBody"], {
                    tosLinkStart: e,
                    tosLinkEnd: "</a>",
                    legalChangesLinkStart: o,
                    legalChangesLinkEnd: "</a>"
                }), i = f.f(Roblox.Lang.legal["Label.IAgree"])) : (n = "TERMS OF USE AGREEMENT", t = 'By clicking "I Agree", you are agreeing to the <a href="https://www.roblox.com/info/terms" class="text-link" target="_blank">Roblox Terms of Use</a>. This includes the license to Roblox of past and future content you provide to the service for our use online, offline, and in tangible items. You can learn more about what is changing <a href="https://www.roblox.com/info/latest-changes" class="text-link" target="_blank">here</a>.', i = "I AGREE"), r = "/UserCheck/update-tos-licensing"), showTosModal(n, t, i, r)
            }
        },
        error: function() {}
    })
});;
var Roblox = Roblox || {};
Roblox.AbuseReportDispatcher = function() {
    var r = !1,
        i = Roblox.AbuseReportPVMeta,
        n = function(n, t) {
            n = n.replace(/[\[\]]/g, "\\$&");
            var r = new RegExp("[?&]" + n + "(=([^&#]*)|&|#|$)"),
                i = r.exec(t);
            return i ? i[2] ? decodeURIComponent(i[2].replace(/\+/g, " ")) : "" : null
        },
        u = function(t) {
            var e, u, f, r, s;
            if (typeof t != "string") return !1;
            if (t = t.toLowerCase(), e = t.split("?"), u = e[0], u && typeof u == "string" && (f = u.split("abusereport/")[1]), f && (r = {
                    actionName: f,
                    id: n("id", t),
                    redirectUrl: n("redirecturl", t)
                }, n("conversationid", t) && (r.conversationId = n("conversationid", t)), n("partyguid", t) && (r.partyGuid = n("partyguid", t)), r.id && r.redirectUrl)) {
                var h = $.param(r),
                    o = "abusereport/embedded/" + f + "?" + h,
                    c = Roblox.Endpoints.getAbsoluteUrl("/" + o);
                i.inApp ? i.inAppEnabled ? (s = {
                    urlPath: o,
                    feature: "Abuse Report"
                }, console.debug("Calling navigateToFeature for Hybrid Overlay"), Roblox.Hybrid.Navigation.navigateToFeature(s, function(n) {
                    console.debug("navigateToFeature ---- status:" + n)
                })) : window.location.href = t : window.location.href = i.phoneEnabled ? c : t
            }
        },
        t = function(n) {
            n.preventDefault();
            var t = $(this).attr("href");
            t && u(t)
        },
        f = function() {
            if (!r) {
                $(".abuse-report-modal").click(t);
                $(".messages-container").on("click", ".abuse-report-modal", t);
                $("#AjaxCommentsContainer").on("click", ".abuse-report-modal", t);
                $("#item-context-menu").on("click", ".abuse-report-modal", t);
                $(".GroupWallPane").on("click", ".abuse-report-modal", t);
                $(".group-details-container").on("click", ".abuse-report-modal", t);
                r = !0
            }
        };
    return {
        triggerUrlAction: u,
        initialize: f
    }
}(), $(document).ready(function() {
    Roblox.AbuseReportDispatcher.initialize()
});