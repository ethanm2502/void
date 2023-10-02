! function(r) {
    var n = {};

    function a(e) {
        if (n[e]) return n[e].exports;
        var t = n[e] = {
            i: e,
            l: !1,
            exports: {}
        };
        return r[e].call(t.exports, t, t.exports, a), t.l = !0, t.exports
    }
    a.m = r, a.c = n, a.d = function(e, t, r) {
        a.o(e, t) || Object.defineProperty(e, t, {
            enumerable: !0,
            get: r
        })
    }, a.r = function(e) {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
            value: "Module"
        }), Object.defineProperty(e, "__esModule", {
            value: !0
        })
    }, a.t = function(t, e) {
        if (1 & e && (t = a(t)), 8 & e) return t;
        if (4 & e && "object" == typeof t && t && t.__esModule) return t;
        var r = Object.create(null);
        if (a.r(r), Object.defineProperty(r, "default", {
                enumerable: !0,
                value: t
            }), 2 & e && "string" != typeof t)
            for (var n in t) a.d(r, n, function(e) {
                return t[e]
            }.bind(null, n));
        return r
    }, a.n = function(e) {
        var t = e && e.__esModule ? function() {
            return e.default
        } : function() {
            return e
        };
        return a.d(t, "a", t), t
    }, a.o = function(e, t) {
        return Object.prototype.hasOwnProperty.call(e, t)
    }, a.p = "", a(a.s = 78)
}({
    0: function(e, t) {
        e.exports = React
    },
    1: function(e, t) {
        e.exports = Roblox
    },
    12: function(e, t) {
        e.exports = RobloxThumbnails
    },
    15: function(e, t) {
        e.exports = ReactDOM
    },
    17: function(e, t) {
        e.exports = HeaderScripts
    },
    2: function(e, t) {
        e.exports = PropTypes
    },
    4: function(e, t) {
        e.exports = ReactStyleGuide
    },
    7: function(e, t) {
        e.exports = CoreUtilities
    },
    76: function(e, t, r) {},
    78: function(e, t, r) {
        "use strict";
        r.r(t);
        var n = r(7),
            a = r(0),
            s = r.n(a),
            i = r(15),
            o = r(17),
            u = r(8),
            l = r(2),
            c = r.n(l),
            m = r(4),
            d = r(12);

        function p(e) {
            var t = e.userId,
                r = e.profileLink;
            return s.a.createElement(m.Link, {
                url: r,
                className: "user-avatar-container avatar avatar-headshot-lg"
            }, s.a.createElement(d.Thumbnail2d, {
                type: d.ThumbnailTypes.avatarHeadshot,
                size: d.DefaultThumbnailSize,
                targetId: t,
                containerClass: "avatar-card-image"
            }))
        }
        p.propTypes = {
            userId: c.a.number.isRequired,
            profileLink: c.a.string.isRequired
        };
        var f = p,
            y = r(1);

        function b(e) {
            var t, r = e.profileLink,
                n = e.name,
                a = e.isPremiumUser,
                i = e.displayName,
                o = (null === y.DisplayNames || void 0 === y.DisplayNames ? void 0 : y.DisplayNames.Enabled()) ? i : n;
            return a && (t = s.a.createElement("div", {
                className: "user-icon-container"
            }, s.a.createElement("span", {
                className: "medium-icon icon-premium-medium"
            }), s.a.createElement("span", {
                className: "small-icon icon-premium-small"
            }))), s.a.createElement("div", {
                className: "user-info-container"
            }, t, s.a.createElement("h1", {
                className: "user-name-container"
            }, s.a.createElement(m.Link, {
                url: r
            }, o)))
        }
        b.defaultProps = {
            isPremiumUser: !1,
            displayName: null
        }, b.propTypes = {
            profileLink: c.a.string.isRequired,
            name: c.a.string.isRequired,
            isPremiumUser: c.a.bool,
            displayName: c.a.string
        };
        var v = b;

function h() {
    var e = o.authenticatedUser.name,
        t = o.authenticatedUser.id,
        r = o.authenticatedUser.isPremiumUser,
        n = o.authenticatedUser.displayName,
        a = u.entityUrl.user.getAbsoluteUrl(t);
    var usernameWithHello = "Hello, " + e;
    return s.a.createElement("div", {
        className: "home-header"
    }, s.a.createElement(f, {
        userId: t,
        profileLink: a
    }), s.a.createElement(v, {
        profileLink: a,
        isPremiumUser: r,
        name: usernameWithHello,
        displayName: n
    }))
}


        function x() {
            return s.a.createElement(h, null)
        }
        r(76);
        Object(n.ready)(function() {
            Object(i.render)(s.a.createElement(x, null), document.getElementById("home-header"))
        })
    },
    8: function(e, t) {
        e.exports = CoreRobloxUtilities
    }
});
//# sourceMappingURL=https://js.rbxcdn.com/d923dde6f3556b794028-homeHeader.js.map

/* Bundle detector */
window.Roblox && window.Roblox.BundleDetector && window.Roblox.BundleDetector.bundleDetected("HomeHeader");