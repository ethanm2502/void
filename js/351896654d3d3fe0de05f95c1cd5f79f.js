;;;/*!
* Bootstrap v3.3.5 (http://getbootstrap.com)
* Copyright 2011-2015 Twitter, Inc.
* Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
*/
/*!
* Generated using the Bootstrap Customizer (http://getbootstrap.com/customize/?id=b8480475c6c7b955a207)
* Config saved to config.json and https://gist.github.com/b8480475c6c7b955a207
*/
if ("undefined" == typeof jQuery)
    throw new Error("Bootstrap's JavaScript requires jQuery");
+function(t) {
    "use strict";
    var e = t.fn.jquery.split(" ")[0].split(".");
    if (e[0] < 2 && e[1] < 9 || 1 == e[0] && 9 == e[1] && e[2] < 1)
        throw new Error("Bootstrap's JavaScript requires jQuery version 1.9.1 or higher")
}(jQuery),
+function(t) {
    "use strict";
    function e(e) {
        return this.each(function() {
            var i = t(this)
              , n = i.data("bs.alert");
            n || i.data("bs.alert", n = new o(this)),
            "string" == typeof e && n[e].call(i)
        })
    }
    var i = '[data-dismiss="alert"]'
      , o = function(e) {
        t(e).on("click", i, this.close)
    };
    o.VERSION = "3.3.5",
    o.TRANSITION_DURATION = 150,
    o.prototype.close = function(e) {
        function i() {
            a.detach().trigger("closed.bs.alert").remove()
        }
        var n = t(this)
          , s = n.attr("data-target");
        s || (s = n.attr("href"),
        s = s && s.replace(/.*(?=#[^\s]*$)/, ""));
        var a = t(s);
        e && e.preventDefault(),
        a.length || (a = n.closest(".alert")),
        a.trigger(e = t.Event("close.bs.alert")),
        e.isDefaultPrevented() || (a.removeClass("in"),
        t.support.transition && a.hasClass("fade") ? a.one("bsTransitionEnd", i).emulateTransitionEnd(o.TRANSITION_DURATION) : i())
    }
    ;
    var n = t.fn.alert;
    t.fn.alert = e,
    t.fn.alert.Constructor = o,
    t.fn.alert.noConflict = function() {
        return t.fn.alert = n,
        this
    }
    ,
    t(document).on("click.bs.alert.data-api", i, o.prototype.close)
}(jQuery),
+function(t) {
    "use strict";
    function e(e) {
        return this.each(function() {
            var o = t(this)
              , n = o.data("bs.button")
              , s = "object" == typeof e && e;
            n || o.data("bs.button", n = new i(this,s)),
            "toggle" == e ? n.toggle() : e && n.setState(e)
        })
    }
    var i = function(e, o) {
        this.$element = t(e),
        this.options = t.extend({}, i.DEFAULTS, o),
        this.isLoading = !1
    };
    i.VERSION = "3.3.5",
    i.DEFAULTS = {
        loadingText: "loading..."
    },
    i.prototype.setState = function(e) {
        var i = "disabled"
          , o = this.$element
          , n = o.is("input") ? "val" : "html"
          , s = o.data();
        e += "Text",
        null == s.resetText && o.data("resetText", o[n]()),
        setTimeout(t.proxy(function() {
            o[n](null == s[e] ? this.options[e] : s[e]),
            "loadingText" == e ? (this.isLoading = !0,
            o.addClass(i).attr(i, i)) : this.isLoading && (this.isLoading = !1,
            o.removeClass(i).removeAttr(i))
        }, this), 0)
    }
    ,
    i.prototype.toggle = function() {
        var t = !0
          , e = this.$element.closest('[data-toggle="buttons"]');
        if (e.length) {
            var i = this.$element.find("input");
            "radio" == i.prop("type") ? (i.prop("checked") && (t = !1),
            e.find(".active").removeClass("active"),
            this.$element.addClass("active")) : "checkbox" == i.prop("type") && (i.prop("checked") !== this.$element.hasClass("active") && (t = !1),
            this.$element.toggleClass("active")),
            i.prop("checked", this.$element.hasClass("active")),
            t && i.trigger("change")
        } else
            this.$element.attr("aria-pressed", !this.$element.hasClass("active")),
            this.$element.toggleClass("active")
    }
    ;
    var o = t.fn.button;
    t.fn.button = e,
    t.fn.button.Constructor = i,
    t.fn.button.noConflict = function() {
        return t.fn.button = o,
        this
    }
    ,
    t(document).on("click.bs.button.data-api", '[data-toggle^="button"]', function(i) {
        var o = t(i.target);
        o.hasClass("btn") || (o = o.closest(".btn")),
        e.call(o, "toggle"),
        t(i.target).is('input[type="radio"]') || t(i.target).is('input[type="checkbox"]') || i.preventDefault()
    }).on("focus.bs.button.data-api blur.bs.button.data-api", '[data-toggle^="button"]', function(e) {
        t(e.target).closest(".btn").toggleClass("focus", /^focus(in)?$/.test(e.type))
    })
}(jQuery),
+function(t) {
    "use strict";
    function e(e) {
        return this.each(function() {
            var o = t(this)
              , n = o.data("bs.carousel")
              , s = t.extend({}, i.DEFAULTS, o.data(), "object" == typeof e && e)
              , a = "string" == typeof e ? e : s.slide;
            n || o.data("bs.carousel", n = new i(this,s)),
            "number" == typeof e ? n.to(e) : a ? n[a]() : s.interval && n.pause().cycle()
        })
    }
    var i = function(e, i) {
        this.$element = t(e),
        this.$indicators = this.$element.find(".carousel-indicators"),
        this.options = i,
        this.paused = null,
        this.sliding = null,
        this.interval = null,
        this.$active = null,
        this.$items = null,
        this.options.keyboard && this.$element.on("keydown.bs.carousel", t.proxy(this.keydown, this)),
        "hover" == this.options.pause && !("ontouchstart"in document.documentElement) && this.$element.on("mouseenter.bs.carousel", t.proxy(this.pause, this)).on("mouseleave.bs.carousel", t.proxy(this.cycle, this))
    };
    i.VERSION = "3.3.5",
    i.TRANSITION_DURATION = 600,
    i.DEFAULTS = {
        interval: 5e3,
        pause: "hover",
        wrap: !0,
        keyboard: !0
    },
    i.prototype.keydown = function(t) {
        if (!/input|textarea/i.test(t.target.tagName)) {
            switch (t.which) {
            case 37:
                this.prev();
                break;
            case 39:
                this.next();
                break;
            default:
                return
            }
            t.preventDefault()
        }
    }
    ,
    i.prototype.cycle = function(e) {
        return e || (this.paused = !1),
        this.interval && clearInterval(this.interval),
        this.options.interval && !this.paused && (this.interval = setInterval(t.proxy(this.next, this), this.options.interval)),
        this
    }
    ,
    i.prototype.getItemIndex = function(t) {
        return this.$items = t.parent().children(".item"),
        this.$items.index(t || this.$active)
    }
    ,
    i.prototype.getItemForDirection = function(t, e) {
        var i = this.getItemIndex(e)
          , o = "prev" == t && 0 === i || "next" == t && i == this.$items.length - 1;
        if (o && !this.options.wrap)
            return e;
        var n = "prev" == t ? -1 : 1
          , s = (i + n) % this.$items.length;
        return this.$items.eq(s)
    }
    ,
    i.prototype.to = function(t) {
        var e = this
          , i = this.getItemIndex(this.$active = this.$element.find(".item.active"));
        return t > this.$items.length - 1 || 0 > t ? void 0 : this.sliding ? this.$element.one("slid.bs.carousel", function() {
            e.to(t)
        }) : i == t ? this.pause().cycle() : this.slide(t > i ? "next" : "prev", this.$items.eq(t))
    }
    ,
    i.prototype.pause = function(e) {
        return e || (this.paused = !0),
        this.$element.find(".next, .prev").length && t.support.transition && (this.$element.trigger(t.support.transition.end),
        this.cycle(!0)),
        this.interval = clearInterval(this.interval),
        this
    }
    ,
    i.prototype.next = function() {
        return this.sliding ? void 0 : this.slide("next")
    }
    ,
    i.prototype.prev = function() {
        return this.sliding ? void 0 : this.slide("prev")
    }
    ,
    i.prototype.slide = function(e, o) {
        var n = this.$element.find(".item.active")
          , s = o || this.getItemForDirection(e, n)
          , a = this.interval
          , r = "next" == e ? "left" : "right"
          , l = this;
        if (s.hasClass("active"))
            return this.sliding = !1;
        var h = s[0]
          , d = t.Event("slide.bs.carousel", {
            relatedTarget: h,
            direction: r
        });
        if (this.$element.trigger(d),
        !d.isDefaultPrevented()) {
            if (this.sliding = !0,
            a && this.pause(),
            this.$indicators.length) {
                this.$indicators.find(".active").removeClass("active");
                var p = t(this.$indicators.children()[this.getItemIndex(s)]);
                p && p.addClass("active")
            }
            var c = t.Event("slid.bs.carousel", {
                relatedTarget: h,
                direction: r
            });
            return t.support.transition && this.$element.hasClass("slide") ? (s.addClass(e),
            s[0].offsetWidth,
            n.addClass(r),
            s.addClass(r),
            n.one("bsTransitionEnd", function() {
                s.removeClass([e, r].join(" ")).addClass("active"),
                n.removeClass(["active", r].join(" ")),
                l.sliding = !1,
                setTimeout(function() {
                    l.$element.trigger(c)
                }, 0)
            }).emulateTransitionEnd(i.TRANSITION_DURATION)) : (n.removeClass("active"),
            s.addClass("active"),
            this.sliding = !1,
            this.$element.trigger(c)),
            a && this.cycle(),
            this
        }
    }
    ;
    var o = t.fn.carousel;
    t.fn.carousel = e,
    t.fn.carousel.Constructor = i,
    t.fn.carousel.noConflict = function() {
        return t.fn.carousel = o,
        this
    }
    ;
    var n = function(i) {
        var o, n = t(this), s = t(n.attr("data-target") || (o = n.attr("href")) && o.replace(/.*(?=#[^\s]+$)/, ""));
        if (s.hasClass("carousel")) {
            var a = t.extend({}, s.data(), n.data())
              , r = n.attr("data-slide-to");
            r && (a.interval = !1),
            e.call(s, a),
            r && s.data("bs.carousel").to(r),
            i.preventDefault()
        }
    };
    t(document).on("click.bs.carousel.data-api", "[data-slide]", n).on("click.bs.carousel.data-api", "[data-slide-to]", n),
    t(window).on("load", function() {
        t('[data-ride="carousel"]').each(function() {
            var i = t(this);
            e.call(i, i.data())
        })
    })
}(jQuery),
+function(t) {
    "use strict";
    function e(e) {
        var i = e.attr("data-target");
        i || (i = e.attr("href"),
        i = i && /#[A-Za-z]/.test(i) && i.replace(/.*(?=#[^\s]*$)/, ""));
        var o = i && t(i);
        return o && o.length ? o : e.parent()
    }
    function i(i) {
        i && 3 === i.which || (t(n).remove(),
        t(s).each(function() {
            var o = t(this)
              , n = e(o)
              , s = {
                relatedTarget: this
            };
            n.hasClass("open") && (i && "click" == i.type && /input|textarea/i.test(i.target.tagName) && t.contains(n[0], i.target) || (n.trigger(i = t.Event("hide.bs.dropdown", s)),
            i.isDefaultPrevented() || (o.attr("aria-expanded", "false"),
            n.removeClass("open").trigger("hidden.bs.dropdown", s))))
        }))
    }
    function o(e) {
        return this.each(function() {
            var i = t(this)
              , o = i.data("bs.dropdown");
            o || i.data("bs.dropdown", o = new a(this)),
            "string" == typeof e && o[e].call(i)
        })
    }
    var n = ".dropdown-backdrop"
      , s = '[data-toggle="dropdown"]'
      , a = function(e) {
        t(e).on("click.bs.dropdown", this.toggle)
    };
    a.VERSION = "3.3.5",
    a.prototype.toggle = function(o) {
        var n = t(this);
        if (!n.is(".disabled, :disabled")) {
            var s = e(n)
              , a = s.hasClass("open");
            if (i(),
            !a) {
                "ontouchstart"in document.documentElement && !s.closest(".navbar-nav").length && t(document.createElement("div")).addClass("dropdown-backdrop").insertAfter(t(this)).on("click", i);
                var r = {
                    relatedTarget: this
                };
                if (s.trigger(o = t.Event("show.bs.dropdown", r)),
                o.isDefaultPrevented())
                    return;
                n.trigger("focus").attr("aria-expanded", "true"),
                s.toggleClass("open").trigger("shown.bs.dropdown", r)
            }
            return !1
        }
    }
    ,
    a.prototype.keydown = function(i) {
        if (/(38|40|27|32)/.test(i.which) && !/input|textarea/i.test(i.target.tagName)) {
            var o = t(this);
            if (i.preventDefault(),
            i.stopPropagation(),
            !o.is(".disabled, :disabled")) {
                var n = e(o)
                  , a = n.hasClass("open");
                if (!a && 27 != i.which || a && 27 == i.which)
                    return 27 == i.which && n.find(s).trigger("focus"),
                    o.trigger("click");
                var r = " li:not(.disabled):visible a"
                  , l = n.find(".dropdown-menu" + r);
                if (l.length) {
                    var h = l.index(i.target);
                    38 == i.which && h > 0 && h--,
                    40 == i.which && h < l.length - 1 && h++,
                    ~h || (h = 0),
                    l.eq(h).trigger("focus")
                }
            }
        }
    }
    ;
    var r = t.fn.dropdown;
    t.fn.dropdown = o,
    t.fn.dropdown.Constructor = a,
    t.fn.dropdown.noConflict = function() {
        return t.fn.dropdown = r,
        this
    }
    ,
    t(document).on("click.bs.dropdown.data-api", i).on("click.bs.dropdown.data-api", ".dropdown form", function(t) {
        t.stopPropagation()
    }).on("click.bs.dropdown.data-api", s, a.prototype.toggle).on("keydown.bs.dropdown.data-api", s, a.prototype.keydown).on("keydown.bs.dropdown.data-api", ".dropdown-menu", a.prototype.keydown)
}(jQuery),
+function(t) {
    "use strict";
    function e(e, o) {
        return this.each(function() {
            var n = t(this)
              , s = n.data("bs.modal")
              , a = t.extend({}, i.DEFAULTS, n.data(), "object" == typeof e && e);
            s || n.data("bs.modal", s = new i(this,a)),
            "string" == typeof e ? s[e](o) : a.show && s.show(o)
        })
    }
    var i = function(e, i) {
        this.options = i,
        this.$body = t(document.body),
        this.$element = t(e),
        this.$dialog = this.$element.find(".modal-dialog"),
        this.$backdrop = null,
        this.isShown = null,
        this.originalBodyPad = null,
        this.scrollbarWidth = 0,
        this.ignoreBackdropClick = !1,
        this.options.remote && this.$element.find(".modal-content").load(this.options.remote, t.proxy(function() {
            this.$element.trigger("loaded.bs.modal")
        }, this))
    };
    i.VERSION = "3.3.5",
    i.TRANSITION_DURATION = 300,
    i.BACKDROP_TRANSITION_DURATION = 150,
    i.DEFAULTS = {
        backdrop: !0,
        keyboard: !0,
        show: !0
    },
    i.prototype.toggle = function(t) {
        return this.isShown ? this.hide() : this.show(t)
    }
    ,
    i.prototype.show = function(e) {
        var o = this
          , n = t.Event("show.bs.modal", {
            relatedTarget: e
        });
        this.$element.trigger(n),
        this.isShown || n.isDefaultPrevented() || (this.isShown = !0,
        this.checkScrollbar(),
        this.setScrollbar(),
        this.$body.addClass("modal-open"),
        this.escape(),
        this.resize(),
        this.$element.on("click.dismiss.bs.modal", '[data-dismiss="modal"]', t.proxy(this.hide, this)),
        this.$dialog.on("mousedown.dismiss.bs.modal", function() {
            o.$element.one("mouseup.dismiss.bs.modal", function(e) {
                t(e.target).is(o.$element) && (o.ignoreBackdropClick = !0)
            })
        }),
        this.backdrop(function() {
            var n = t.support.transition && o.$element.hasClass("fade");
            o.$element.parent().length || o.$element.appendTo(o.$body),
            o.$element.show().scrollTop(0),
            o.adjustDialog(),
            n && o.$element[0].offsetWidth,
            o.$element.addClass("in"),
            o.enforceFocus();
            var s = t.Event("shown.bs.modal", {
                relatedTarget: e
            });
            n ? o.$dialog.one("bsTransitionEnd", function() {
                o.$element.trigger("focus").trigger(s)
            }).emulateTransitionEnd(i.TRANSITION_DURATION) : o.$element.trigger("focus").trigger(s)
        }))
    }
    ,
    i.prototype.hide = function(e) {
        e && e.preventDefault(),
        e = t.Event("hide.bs.modal"),
        this.$element.trigger(e),
        this.isShown && !e.isDefaultPrevented() && (this.isShown = !1,
        this.escape(),
        this.resize(),
        t(document).off("focusin.bs.modal"),
        this.$element.removeClass("in").off("click.dismiss.bs.modal").off("mouseup.dismiss.bs.modal"),
        this.$dialog.off("mousedown.dismiss.bs.modal"),
        t.support.transition && this.$element.hasClass("fade") ? this.$element.one("bsTransitionEnd", t.proxy(this.hideModal, this)).emulateTransitionEnd(i.TRANSITION_DURATION) : this.hideModal())
    }
    ,
    i.prototype.enforceFocus = function() {
        t(document).off("focusin.bs.modal").on("focusin.bs.modal", t.proxy(function(t) {
            this.$element[0] === t.target || this.$element.has(t.target).length || this.$element.trigger("focus")
        }, this))
    }
    ,
    i.prototype.escape = function() {
        this.isShown && this.options.keyboard ? this.$element.on("keydown.dismiss.bs.modal", t.proxy(function(t) {
            27 == t.which && this.hide()
        }, this)) : this.isShown || this.$element.off("keydown.dismiss.bs.modal")
    }
    ,
    i.prototype.resize = function() {
        this.isShown ? t(window).on("resize.bs.modal", t.proxy(this.handleUpdate, this)) : t(window).off("resize.bs.modal")
    }
    ,
    i.prototype.hideModal = function() {
        var t = this;
        this.$element.hide(),
        this.backdrop(function() {
            t.$body.removeClass("modal-open"),
            t.resetAdjustments(),
            t.resetScrollbar(),
            t.$element.trigger("hidden.bs.modal")
        })
    }
    ,
    i.prototype.removeBackdrop = function() {
        this.$backdrop && this.$backdrop.remove(),
        this.$backdrop = null
    }
    ,
    i.prototype.backdrop = function(e) {
        var o = this
          , n = this.$element.hasClass("fade") ? "fade" : "";
        if (this.isShown && this.options.backdrop) {
            var s = t.support.transition && n;
            if (this.$backdrop = t(document.createElement("div")).addClass("modal-backdrop " + n).appendTo(this.$body),
            this.$element.on("click.dismiss.bs.modal", t.proxy(function(t) {
                return this.ignoreBackdropClick ? void (this.ignoreBackdropClick = !1) : void (t.target === t.currentTarget && ("static" == this.options.backdrop ? this.$element[0].focus() : this.hide()))
            }, this)),
            s && this.$backdrop[0].offsetWidth,
            this.$backdrop.addClass("in"),
            !e)
                return;
            s ? this.$backdrop.one("bsTransitionEnd", e).emulateTransitionEnd(i.BACKDROP_TRANSITION_DURATION) : e()
        } else if (!this.isShown && this.$backdrop) {
            this.$backdrop.removeClass("in");
            var a = function() {
                o.removeBackdrop(),
                e && e()
            };
            t.support.transition && this.$element.hasClass("fade") ? this.$backdrop.one("bsTransitionEnd", a).emulateTransitionEnd(i.BACKDROP_TRANSITION_DURATION) : a()
        } else
            e && e()
    }
    ,
    i.prototype.handleUpdate = function() {
        this.adjustDialog()
    }
    ,
    i.prototype.adjustDialog = function() {
        var t = this.$element[0].scrollHeight > document.documentElement.clientHeight;
        this.$element.css({
            paddingLeft: !this.bodyIsOverflowing && t ? this.scrollbarWidth : "",
            paddingRight: this.bodyIsOverflowing && !t ? this.scrollbarWidth : ""
        })
    }
    ,
    i.prototype.resetAdjustments = function() {
        this.$element.css({
            paddingLeft: "",
            paddingRight: ""
        })
    }
    ,
    i.prototype.checkScrollbar = function() {
        var t = window.innerWidth;
        if (!t) {
            var e = document.documentElement.getBoundingClientRect();
            t = e.right - Math.abs(e.left)
        }
        this.bodyIsOverflowing = document.body.clientWidth < t,
        this.scrollbarWidth = this.measureScrollbar()
    }
    ,
    i.prototype.setScrollbar = function() {
        var t = parseInt(this.$body.css("padding-right") || 0, 10);
        this.originalBodyPad = document.body.style.paddingRight || "",
        this.bodyIsOverflowing && this.$body.css("padding-right", t + this.scrollbarWidth)
    }
    ,
    i.prototype.resetScrollbar = function() {
        this.$body.css("padding-right", this.originalBodyPad)
    }
    ,
    i.prototype.measureScrollbar = function() {
        var t = document.createElement("div");
        t.className = "modal-scrollbar-measure",
        this.$body.append(t);
        var e = t.offsetWidth - t.clientWidth;
        return this.$body[0].removeChild(t),
        e
    }
    ;
    var o = t.fn.modal;
    t.fn.modal = e,
    t.fn.modal.Constructor = i,
    t.fn.modal.noConflict = function() {
        return t.fn.modal = o,
        this
    }
    ,
    t(document).on("click.bs.modal.data-api", '[data-toggle="modal"]', function(i) {
        var o = t(this)
          , n = o.attr("href")
          , s = t(o.attr("data-target") || n && n.replace(/.*(?=#[^\s]+$)/, ""))
          , a = s.data("bs.modal") ? "toggle" : t.extend({
            remote: !/#/.test(n) && n
        }, s.data(), o.data());
        o.is("a") && i.preventDefault(),
        s.one("show.bs.modal", function(t) {
            t.isDefaultPrevented() || s.one("hidden.bs.modal", function() {
                o.is(":visible") && o.trigger("focus")
            })
        }),
        e.call(s, a, this)
    })
}(jQuery),
+function(t) {
    "use strict";
    function e(e) {
        return this.each(function() {
            var o = t(this)
              , n = o.data("bs.tooltip")
              , s = "object" == typeof e && e;
            (n || !/destroy|hide/.test(e)) && (n || o.data("bs.tooltip", n = new i(this,s)),
            "string" == typeof e && n[e]())
        })
    }
    var i = function(t, e) {
        this.type = null,
        this.options = null,
        this.enabled = null,
        this.timeout = null,
        this.hoverState = null,
        this.$element = null,
        this.inState = null,
        this.init("tooltip", t, e)
    };
    i.VERSION = "3.3.5",
    i.TRANSITION_DURATION = 150,
    i.DEFAULTS = {
        animation: !0,
        placement: "top",
        selector: !1,
        template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
        trigger: "hover focus",
        title: "",
        delay: 0,
        html: !1,
        container: !1,
        viewport: {
            selector: "body",
            padding: 0
        }
    },
    i.prototype.init = function(e, i, o) {
        if (this.enabled = !0,
        this.type = e,
        this.$element = t(i),
        this.options = this.getOptions(o),
        this.$viewport = this.options.viewport && t(t.isFunction(this.options.viewport) ? this.options.viewport.call(this, this.$element) : this.options.viewport.selector || this.options.viewport),
        this.inState = {
            click: !1,
            hover: !1,
            focus: !1
        },
        this.$element[0]instanceof document.constructor && !this.options.selector)
            throw new Error("`selector` option must be specified when initializing " + this.type + " on the window.document object!");
        for (var n = this.options.trigger.split(" "), s = n.length; s--; ) {
            var a = n[s];
            if ("click" == a)
                this.$element.on("click." + this.type, this.options.selector, t.proxy(this.toggle, this));
            else if ("manual" != a) {
                var r = "hover" == a ? "mouseenter" : "focusin"
                  , l = "hover" == a ? "mouseleave" : "focusout";
                this.$element.on(r + "." + this.type, this.options.selector, t.proxy(this.enter, this)),
                this.$element.on(l + "." + this.type, this.options.selector, t.proxy(this.leave, this))
            }
        }
        this.options.selector ? this._options = t.extend({}, this.options, {
            trigger: "manual",
            selector: ""
        }) : this.fixTitle()
    }
    ,
    i.prototype.getDefaults = function() {
        return i.DEFAULTS
    }
    ,
    i.prototype.getOptions = function(e) {
        return e = t.extend({}, this.getDefaults(), this.$element.data(), e),
        e.delay && "number" == typeof e.delay && (e.delay = {
            show: e.delay,
            hide: e.delay
        }),
        e
    }
    ,
    i.prototype.getDelegateOptions = function() {
        var e = {}
          , i = this.getDefaults();
        return this._options && t.each(this._options, function(t, o) {
            i[t] != o && (e[t] = o)
        }),
        e
    }
    ,
    i.prototype.enter = function(e) {
        var i = e instanceof this.constructor ? e : t(e.currentTarget).data("bs." + this.type);
        return i || (i = new this.constructor(e.currentTarget,this.getDelegateOptions()),
        t(e.currentTarget).data("bs." + this.type, i)),
        e instanceof t.Event && (i.inState["focusin" == e.type ? "focus" : "hover"] = !0),
        i.tip().hasClass("in") || "in" == i.hoverState ? void (i.hoverState = "in") : (clearTimeout(i.timeout),
        i.hoverState = "in",
        i.options.delay && i.options.delay.show ? void (i.timeout = setTimeout(function() {
            "in" == i.hoverState && i.show()
        }, i.options.delay.show)) : i.show())
    }
    ,
    i.prototype.isInStateTrue = function() {
        for (var t in this.inState)
            if (this.inState[t])
                return !0;
        return !1
    }
    ,
    i.prototype.leave = function(e) {
        var i = e instanceof this.constructor ? e : t(e.currentTarget).data("bs." + this.type);
        return i || (i = new this.constructor(e.currentTarget,this.getDelegateOptions()),
        t(e.currentTarget).data("bs." + this.type, i)),
        e instanceof t.Event && (i.inState["focusout" == e.type ? "focus" : "hover"] = !1),
        i.isInStateTrue() ? void 0 : (clearTimeout(i.timeout),
        i.hoverState = "out",
        i.options.delay && i.options.delay.hide ? void (i.timeout = setTimeout(function() {
            "out" == i.hoverState && i.hide()
        }, i.options.delay.hide)) : i.hide())
    }
    ,
    i.prototype.show = function() {
        var e = t.Event("show.bs." + this.type);
        if (this.hasContent() && this.enabled) {
            this.$element.trigger(e);
            var o = t.contains(this.$element[0].ownerDocument.documentElement, this.$element[0]);
            if (e.isDefaultPrevented() || !o)
                return;
            var n = this
              , s = this.tip()
              , a = this.getUID(this.type);
            this.setContent(),
            s.attr("id", a),
            this.$element.attr("aria-describedby", a),
            this.options.animation && s.addClass("fade");
            var r = "function" == typeof this.options.placement ? this.options.placement.call(this, s[0], this.$element[0]) : this.options.placement
              , l = /\s?auto?\s?/i
              , h = l.test(r);
            h && (r = r.replace(l, "") || "top"),
            s.detach().css({
                top: 0,
                left: 0,
                display: "block"
            }).addClass(r).data("bs." + this.type, this),
            this.options.container ? s.appendTo(this.options.container) : s.insertAfter(this.$element),
            this.$element.trigger("inserted.bs." + this.type);
            var d = this.getPosition()
              , p = s[0].offsetWidth
              , c = s[0].offsetHeight;
            if (h) {
                var f = r
                  , u = this.getPosition(this.$viewport);
                r = "bottom" == r && d.bottom + c > u.bottom ? "top" : "top" == r && d.top - c < u.top ? "bottom" : "right" == r && d.right + p > u.width ? "left" : "left" == r && d.left - p < u.left ? "right" : r,
                s.removeClass(f).addClass(r)
            }
            var g = this.getCalculatedOffset(r, d, p, c);
            this.applyPlacement(g, r);
            var m = function() {
                var t = n.hoverState;
                n.$element.trigger("shown.bs." + n.type),
                n.hoverState = null,
                "out" == t && n.leave(n)
            };
            t.support.transition && this.$tip.hasClass("fade") ? s.one("bsTransitionEnd", m).emulateTransitionEnd(i.TRANSITION_DURATION) : m()
        }
    }
    ,
    i.prototype.applyPlacement = function(e, i) {
        var o = this.tip()
          , n = o[0].offsetWidth
          , s = o[0].offsetHeight
          , a = parseInt(o.css("margin-top"), 10)
          , r = parseInt(o.css("margin-left"), 10);
        isNaN(a) && (a = 0),
        isNaN(r) && (r = 0),
        e.top += a,
        e.left += r,
        t.offset.setOffset(o[0], t.extend({
            using: function(t) {
                o.css({
                    top: Math.round(t.top),
                    left: Math.round(t.left)
                })
            }
        }, e), 0),
        o.addClass("in");
        var l = o[0].offsetWidth
          , h = o[0].offsetHeight;
        "top" == i && h != s && (e.top = e.top + s - h);
        var d = this.getViewportAdjustedDelta(i, e, l, h);
        d.left ? e.left += d.left : e.top += d.top;
        var p = /top|bottom/.test(i)
          , c = p ? 2 * d.left - n + l : 2 * d.top - s + h
          , f = p ? "offsetWidth" : "offsetHeight";
        o.offset(e),
        this.replaceArrow(c, o[0][f], p)
    }
    ,
    i.prototype.replaceArrow = function(t, e, i) {
        this.arrow().css(i ? "left" : "top", 50 * (1 - t / e) + "%").css(i ? "top" : "left", "")
    }
    ,
    i.prototype.setContent = function() {
        var t = this.tip()
          , e = this.getTitle();
        t.find(".tooltip-inner")[this.options.html ? "html" : "text"](e),
        t.removeClass("fade in top bottom left right")
    }
    ,
    i.prototype.hide = function(e) {
        function o() {
            "in" != n.hoverState && s.detach(),
            n.$element.removeAttr("aria-describedby").trigger("hidden.bs." + n.type),
            e && e()
        }
        var n = this
          , s = t(this.$tip)
          , a = t.Event("hide.bs." + this.type);
        return this.$element.trigger(a),
        a.isDefaultPrevented() ? void 0 : (s.removeClass("in"),
        t.support.transition && s.hasClass("fade") ? s.one("bsTransitionEnd", o).emulateTransitionEnd(i.TRANSITION_DURATION) : o(),
        this.hoverState = null,
        this)
    }
    ,
    i.prototype.fixTitle = function() {
        var t = this.$element;
        (t.attr("title") || "string" != typeof t.attr("data-original-title")) && t.attr("data-original-title", t.attr("title") || "").attr("title", "")
    }
    ,
    i.prototype.hasContent = function() {
        return this.getTitle()
    }
    ,
    i.prototype.getPosition = function(e) {
        e = e || this.$element;
        var i = e[0]
          , o = "BODY" == i.tagName
          , n = i.getBoundingClientRect();
        null == n.width && (n = t.extend({}, n, {
            width: n.right - n.left,
            height: n.bottom - n.top
        }));
        var s = o ? {
            top: 0,
            left: 0
        } : e.offset()
          , a = {
            scroll: o ? document.documentElement.scrollTop || document.body.scrollTop : e.scrollTop()
        }
          , r = o ? {
            width: t(window).width(),
            height: t(window).height()
        } : null;
        return t.extend({}, n, a, r, s)
    }
    ,
    i.prototype.getCalculatedOffset = function(t, e, i, o) {
        return "bottom" == t ? {
            top: e.top + e.height,
            left: e.left + e.width / 2 - i / 2
        } : "top" == t ? {
            top: e.top - o,
            left: e.left + e.width / 2 - i / 2
        } : "left" == t ? {
            top: e.top + e.height / 2 - o / 2,
            left: e.left - i
        } : {
            top: e.top + e.height / 2 - o / 2,
            left: e.left + e.width
        }
    }
    ,
    i.prototype.getViewportAdjustedDelta = function(t, e, i, o) {
        var n = {
            top: 0,
            left: 0
        };
        if (!this.$viewport)
            return n;
        var s = this.options.viewport && this.options.viewport.padding || 0
          , a = this.getPosition(this.$viewport);
        if (/right|left/.test(t)) {
            var r = e.top - s - a.scroll
              , l = e.top + s - a.scroll + o;
            r < a.top ? n.top = a.top - r : l > a.top + a.height && (n.top = a.top + a.height - l)
        } else {
            var h = e.left - s
              , d = e.left + s + i;
            h < a.left ? n.left = a.left - h : d > a.right && (n.left = a.left + a.width - d)
        }
        return n
    }
    ,
    i.prototype.getTitle = function() {
        var t, e = this.$element, i = this.options;
        return t = e.attr("data-original-title") || ("function" == typeof i.title ? i.title.call(e[0]) : i.title)
    }
    ,
    i.prototype.getUID = function(t) {
        do
            t += ~~(1e6 * Math.random());
        while (document.getElementById(t));
        return t
    }
    ,
    i.prototype.tip = function() {
        if (!this.$tip && (this.$tip = t(this.options.template),
        1 != this.$tip.length))
            throw new Error(this.type + " `template` option must consist of exactly 1 top-level element!");
        return this.$tip
    }
    ,
    i.prototype.arrow = function() {
        return this.$arrow = this.$arrow || this.tip().find(".tooltip-arrow")
    }
    ,
    i.prototype.enable = function() {
        this.enabled = !0
    }
    ,
    i.prototype.disable = function() {
        this.enabled = !1
    }
    ,
    i.prototype.toggleEnabled = function() {
        this.enabled = !this.enabled
    }
    ,
    i.prototype.toggle = function(e) {
        var i = this;
        e && (i = t(e.currentTarget).data("bs." + this.type),
        i || (i = new this.constructor(e.currentTarget,this.getDelegateOptions()),
        t(e.currentTarget).data("bs." + this.type, i))),
        e ? (i.inState.click = !i.inState.click,
        i.isInStateTrue() ? i.enter(i) : i.leave(i)) : i.tip().hasClass("in") ? i.leave(i) : i.enter(i)
    }
    ,
    i.prototype.destroy = function() {
        var t = this;
        clearTimeout(this.timeout),
        this.hide(function() {
            t.$element.off("." + t.type).removeData("bs." + t.type),
            t.$tip && t.$tip.detach(),
            t.$tip = null,
            t.$arrow = null,
            t.$viewport = null
        })
    }
    ;
    var o = t.fn.tooltip;
    t.fn.tooltip = e,
    t.fn.tooltip.Constructor = i,
    t.fn.tooltip.noConflict = function() {
        return t.fn.tooltip = o,
        this
    }
}(jQuery),
+function(t) {
    "use strict";
    function e(e) {
        return this.each(function() {
            var o = t(this)
              , n = o.data("bs.popover")
              , s = "object" == typeof e && e;
            (n || !/destroy|hide/.test(e)) && (n || o.data("bs.popover", n = new i(this,s)),
            "string" == typeof e && n[e]())
        })
    }
    var i = function(t, e) {
        this.init("popover", t, e)
    };
    if (!t.fn.tooltip)
        throw new Error("Popover requires tooltip.js");
    i.VERSION = "3.3.5",
    i.DEFAULTS = t.extend({}, t.fn.tooltip.Constructor.DEFAULTS, {
        placement: "right",
        trigger: "click",
        content: "",
        template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
    }),
    i.prototype = t.extend({}, t.fn.tooltip.Constructor.prototype),
    i.prototype.constructor = i,
    i.prototype.getDefaults = function() {
        return i.DEFAULTS
    }
    ,
    i.prototype.setContent = function() {
        var t = this.tip()
          , e = this.getTitle()
          , i = this.getContent();
        t.find(".popover-title")[this.options.html ? "html" : "text"](e),
        t.find(".popover-content").children().detach().end()[this.options.html ? "string" == typeof i ? "html" : "append" : "text"](i),
        t.removeClass("fade top bottom left right in"),
        t.find(".popover-title").html() || t.find(".popover-title").hide()
    }
    ,
    i.prototype.hasContent = function() {
        return this.getTitle() || this.getContent()
    }
    ,
    i.prototype.getContent = function() {
        var t = this.$element
          , e = this.options;
        return t.attr("data-content") || ("function" == typeof e.content ? e.content.call(t[0]) : e.content)
    }
    ,
    i.prototype.arrow = function() {
        return this.$arrow = this.$arrow || this.tip().find(".arrow")
    }
    ;
    var o = t.fn.popover;
    t.fn.popover = e,
    t.fn.popover.Constructor = i,
    t.fn.popover.noConflict = function() {
        return t.fn.popover = o,
        this
    }
}(jQuery),
+function(t) {
    "use strict";
    function e(e) {
        return this.each(function() {
            var o = t(this)
              , n = o.data("bs.tab");
            n || o.data("bs.tab", n = new i(this)),
            "string" == typeof e && n[e]()
        })
    }
    var i = function(e) {
        this.element = t(e)
    };
    i.VERSION = "3.3.5",
    i.TRANSITION_DURATION = 150,
    i.prototype.show = function() {
        var e = this.element
          , i = e.closest("ul:not(.dropdown-menu)")
          , o = e.data("target");
        if (o || (o = e.attr("href"),
        o = o && o.replace(/.*(?=#[^\s]*$)/, "")),
        !e.parent("li").hasClass("active")) {
            var n = i.find(".active:last a")
              , s = t.Event("hide.bs.tab", {
                relatedTarget: e[0]
            })
              , a = t.Event("show.bs.tab", {
                relatedTarget: n[0]
            });
            if (n.trigger(s),
            e.trigger(a),
            !a.isDefaultPrevented() && !s.isDefaultPrevented()) {
                var r = t(o);
                this.activate(e.closest("li"), i),
                this.activate(r, r.parent(), function() {
                    n.trigger({
                        type: "hidden.bs.tab",
                        relatedTarget: e[0]
                    }),
                    e.trigger({
                        type: "shown.bs.tab",
                        relatedTarget: n[0]
                    })
                })
            }
        }
    }
    ,
    i.prototype.activate = function(e, o, n) {
        function s() {
            a.removeClass("active").find("> .dropdown-menu > .active").removeClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded", !1),
            e.addClass("active").find('[data-toggle="tab"]').attr("aria-expanded", !0),
            r ? (e[0].offsetWidth,
            e.addClass("in")) : e.removeClass("fade"),
            e.parent(".dropdown-menu").length && e.closest("li.dropdown").addClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded", !0),
            n && n()
        }
        var a = o.find("> .active")
          , r = n && t.support.transition && (a.length && a.hasClass("fade") || !!o.find("> .fade").length);
        a.length && r ? a.one("bsTransitionEnd", s).emulateTransitionEnd(i.TRANSITION_DURATION) : s(),
        a.removeClass("in")
    }
    ;
    var o = t.fn.tab;
    t.fn.tab = e,
    t.fn.tab.Constructor = i,
    t.fn.tab.noConflict = function() {
        return t.fn.tab = o,
        this
    }
    ;
    var n = function(i) {
        i.preventDefault(),
        e.call(t(this), "show")
    };
    t(document).on("click.bs.tab.data-api", '[data-toggle="tab"]', n).on("click.bs.tab.data-api", '[data-toggle="pill"]', n)
}(jQuery),
+function(t) {
    "use strict";
    function e(e) {
        return this.each(function() {
            var o = t(this)
              , n = o.data("bs.affix")
              , s = "object" == typeof e && e;
            n || o.data("bs.affix", n = new i(this,s)),
            "string" == typeof e && n[e]()
        })
    }
    var i = function(e, o) {
        this.options = t.extend({}, i.DEFAULTS, o),
        this.$target = t(this.options.target).on("scroll.bs.affix.data-api", t.proxy(this.checkPosition, this)).on("click.bs.affix.data-api", t.proxy(this.checkPositionWithEventLoop, this)),
        this.$element = t(e),
        this.affixed = null,
        this.unpin = null,
        this.pinnedOffset = null,
        this.checkPosition()
    };
    i.VERSION = "3.3.5",
    i.RESET = "affix affix-top affix-bottom",
    i.DEFAULTS = {
        offset: 0,
        target: window
    },
    i.prototype.getState = function(t, e, i, o) {
        var n = this.$target.scrollTop()
          , s = this.$element.offset()
          , a = this.$target.height();
        if (null != i && "top" == this.affixed)
            return i > n ? "top" : !1;
        if ("bottom" == this.affixed)
            return null != i ? n + this.unpin <= s.top ? !1 : "bottom" : t - o >= n + a ? !1 : "bottom";
        var r = null == this.affixed
          , l = r ? n : s.top
          , h = r ? a : e;
        return null != i && i >= n ? "top" : null != o && l + h >= t - o ? "bottom" : !1
    }
    ,
    i.prototype.getPinnedOffset = function() {
        if (this.pinnedOffset)
            return this.pinnedOffset;
        this.$element.removeClass(i.RESET).addClass("affix");
        var t = this.$target.scrollTop()
          , e = this.$element.offset();
        return this.pinnedOffset = e.top - t
    }
    ,
    i.prototype.checkPositionWithEventLoop = function() {
        setTimeout(t.proxy(this.checkPosition, this), 1)
    }
    ,
    i.prototype.checkPosition = function() {
        if (this.$element.is(":visible")) {
            var e = this.$element.height()
              , o = this.options.offset
              , n = o.top
              , s = o.bottom
              , a = Math.max(t(document).height(), t(document.body).height());
            "object" != typeof o && (s = n = o),
            "function" == typeof n && (n = o.top(this.$element)),
            "function" == typeof s && (s = o.bottom(this.$element));
            var r = this.getState(a, e, n, s);
            if (this.affixed != r) {
                null != this.unpin && this.$element.css("top", "");
                var l = "affix" + (r ? "-" + r : "")
                  , h = t.Event(l + ".bs.affix");
                if (this.$element.trigger(h),
                h.isDefaultPrevented())
                    return;
                this.affixed = r,
                this.unpin = "bottom" == r ? this.getPinnedOffset() : null,
                this.$element.removeClass(i.RESET).addClass(l).trigger(l.replace("affix", "affixed") + ".bs.affix")
            }
            "bottom" == r && this.$element.offset({
                top: a - e - s
            })
        }
    }
    ;
    var o = t.fn.affix;
    t.fn.affix = e,
    t.fn.affix.Constructor = i,
    t.fn.affix.noConflict = function() {
        return t.fn.affix = o,
        this
    }
    ,
    t(window).on("load", function() {
        t('[data-spy="affix"]').each(function() {
            var i = t(this)
              , o = i.data();
            o.offset = o.offset || {},
            null != o.offsetBottom && (o.offset.bottom = o.offsetBottom),
            null != o.offsetTop && (o.offset.top = o.offsetTop),
            e.call(i, o)
        })
    })
}(jQuery),
+function(t) {
    "use strict";
    function e(e) {
        var i, o = e.attr("data-target") || (i = e.attr("href")) && i.replace(/.*(?=#[^\s]+$)/, "");
        return t(o)
    }
    function i(e) {
        return this.each(function() {
            var i = t(this)
              , n = i.data("bs.collapse")
              , s = t.extend({}, o.DEFAULTS, i.data(), "object" == typeof e && e);
            !n && s.toggle && /show|hide/.test(e) && (s.toggle = !1),
            n || i.data("bs.collapse", n = new o(this,s)),
            "string" == typeof e && n[e]()
        })
    }
    var o = function(e, i) {
        this.$element = t(e),
        this.options = t.extend({}, o.DEFAULTS, i),
        this.$trigger = t('[data-toggle="collapse"][href="#' + e.id + '"],[data-toggle="collapse"][data-target="#' + e.id + '"]'),
        this.transitioning = null,
        this.options.parent ? this.$parent = this.getParent() : this.addAriaAndCollapsedClass(this.$element, this.$trigger),
        this.options.toggle && this.toggle()
    };
    o.VERSION = "3.3.5",
    o.TRANSITION_DURATION = 350,
    o.DEFAULTS = {
        toggle: !0
    },
    o.prototype.dimension = function() {
        var t = this.$element.hasClass("width");
        return t ? "width" : "height"
    }
    ,
    o.prototype.show = function() {
        if (!this.transitioning && !this.$element.hasClass("in")) {
            var e, n = this.$parent && this.$parent.children(".panel").children(".in, .collapsing");
            if (!(n && n.length && (e = n.data("bs.collapse"),
            e && e.transitioning))) {
                var s = t.Event("show.bs.collapse");
                if (this.$element.trigger(s),
                !s.isDefaultPrevented()) {
                    n && n.length && (i.call(n, "hide"),
                    e || n.data("bs.collapse", null));
                    var a = this.dimension();
                    this.$element.removeClass("collapse").addClass("collapsing")[a](0).attr("aria-expanded", !0),
                    this.$trigger.removeClass("collapsed").attr("aria-expanded", !0),
                    this.transitioning = 1;
                    var r = function() {
                        this.$element.removeClass("collapsing").addClass("collapse in")[a](""),
                        this.transitioning = 0,
                        this.$element.trigger("shown.bs.collapse")
                    };
                    if (!t.support.transition)
                        return r.call(this);
                    var l = t.camelCase(["scroll", a].join("-"));
                    this.$element.one("bsTransitionEnd", t.proxy(r, this)).emulateTransitionEnd(o.TRANSITION_DURATION)[a](this.$element[0][l]);
                }
            }
        }
    }
    ,
    o.prototype.hide = function() {
        if (!this.transitioning && this.$element.hasClass("in")) {
            var e = t.Event("hide.bs.collapse");
            if (this.$element.trigger(e),
            !e.isDefaultPrevented()) {
                var i = this.dimension();
                this.$element[i](this.$element[i]())[0].offsetHeight,
                this.$element.addClass("collapsing").removeClass("collapse in").attr("aria-expanded", !1),
                this.$trigger.addClass("collapsed").attr("aria-expanded", !1),
                this.transitioning = 1;
                var n = function() {
                    this.transitioning = 0,
                    this.$element.removeClass("collapsing").addClass("collapse").trigger("hidden.bs.collapse")
                };
                return t.support.transition ? void this.$element[i](0).one("bsTransitionEnd", t.proxy(n, this)).emulateTransitionEnd(o.TRANSITION_DURATION) : n.call(this)
            }
        }
    }
    ,
    o.prototype.toggle = function() {
        this[this.$element.hasClass("in") ? "hide" : "show"]()
    }
    ,
    o.prototype.getParent = function() {
        return t(this.options.parent).find('[data-toggle="collapse"][data-parent="' + this.options.parent + '"]').each(t.proxy(function(i, o) {
            var n = t(o);
            this.addAriaAndCollapsedClass(e(n), n)
        }, this)).end()
    }
    ,
    o.prototype.addAriaAndCollapsedClass = function(t, e) {
        var i = t.hasClass("in");
        t.attr("aria-expanded", i),
        e.toggleClass("collapsed", !i).attr("aria-expanded", i)
    }
    ;
    var n = t.fn.collapse;
    t.fn.collapse = i,
    t.fn.collapse.Constructor = o,
    t.fn.collapse.noConflict = function() {
        return t.fn.collapse = n,
        this
    }
    ,
    t(document).on("click.bs.collapse.data-api", '[data-toggle="collapse"]', function(o) {
        var n = t(this);
        n.attr("data-target") || o.preventDefault();
        var s = e(n)
          , a = s.data("bs.collapse")
          , r = a ? "toggle" : n.data();
        i.call(s, r)
    })
}(jQuery),
+function(t) {
    "use strict";
    function e(i, o) {
        this.$body = t(document.body),
        this.$scrollElement = t(t(i).is(document.body) ? window : i),
        this.options = t.extend({}, e.DEFAULTS, o),
        this.selector = (this.options.target || "") + " .nav li > a",
        this.offsets = [],
        this.targets = [],
        this.activeTarget = null,
        this.scrollHeight = 0,
        this.$scrollElement.on("scroll.bs.scrollspy", t.proxy(this.process, this)),
        this.refresh(),
        this.process()
    }
    function i(i) {
        return this.each(function() {
            var o = t(this)
              , n = o.data("bs.scrollspy")
              , s = "object" == typeof i && i;
            n || o.data("bs.scrollspy", n = new e(this,s)),
            "string" == typeof i && n[i]()
        })
    }
    e.VERSION = "3.3.5",
    e.DEFAULTS = {
        offset: 10
    },
    e.prototype.getScrollHeight = function() {
        return this.$scrollElement[0].scrollHeight || Math.max(this.$body[0].scrollHeight, document.documentElement.scrollHeight)
    }
    ,
    e.prototype.refresh = function() {
        var e = this
          , i = "offset"
          , o = 0;
        this.offsets = [],
        this.targets = [],
        this.scrollHeight = this.getScrollHeight(),
        t.isWindow(this.$scrollElement[0]) || (i = "position",
        o = this.$scrollElement.scrollTop()),
        this.$body.find(this.selector).map(function() {
            var e = t(this)
              , n = e.data("target") || e.attr("href")
              , s = /^#./.test(n) && t(n);
            return s && s.length && s.is(":visible") && [[s[i]().top + o, n]] || null
        }).sort(function(t, e) {
            return t[0] - e[0]
        }).each(function() {
            e.offsets.push(this[0]),
            e.targets.push(this[1])
        })
    }
    ,
    e.prototype.process = function() {
        var t, e = this.$scrollElement.scrollTop() + this.options.offset, i = this.getScrollHeight(), o = this.options.offset + i - this.$scrollElement.height(), n = this.offsets, s = this.targets, a = this.activeTarget;
        if (this.scrollHeight != i && this.refresh(),
        e >= o)
            return a != (t = s[s.length - 1]) && this.activate(t);
        if (a && e < n[0])
            return this.activeTarget = null,
            this.clear();
        for (t = n.length; t--; )
            a != s[t] && e >= n[t] && (void 0 === n[t + 1] || e < n[t + 1]) && this.activate(s[t])
    }
    ,
    e.prototype.activate = function(e) {
        this.activeTarget = e,
        this.clear();
        var i = this.selector + '[data-target="' + e + '"],' + this.selector + '[href="' + e + '"]'
          , o = t(i).parents("li").addClass("active");
        o.parent(".dropdown-menu").length && (o = o.closest("li.dropdown").addClass("active")),
        o.trigger("activate.bs.scrollspy")
    }
    ,
    e.prototype.clear = function() {
        t(this.selector).parentsUntil(this.options.target, ".active").removeClass("active")
    }
    ;
    var o = t.fn.scrollspy;
    t.fn.scrollspy = i,
    t.fn.scrollspy.Constructor = e,
    t.fn.scrollspy.noConflict = function() {
        return t.fn.scrollspy = o,
        this
    }
    ,
    t(window).on("load.bs.scrollspy.data-api", function() {
        t('[data-spy="scroll"]').each(function() {
            var e = t(this);
            i.call(e, e.data())
        })
    })
}(jQuery),
+function(t) {
    "use strict";
    function e() {
        var t = document.createElement("bootstrap")
          , e = {
            WebkitTransition: "webkitTransitionEnd",
            MozTransition: "transitionend",
            OTransition: "oTransitionEnd otransitionend",
            transition: "transitionend"
        };
        for (var i in e)
            if (void 0 !== t.style[i])
                return {
                    end: e[i]
                };
        return !1
    }
    t.fn.emulateTransitionEnd = function(e) {
        var i = !1
          , o = this;
        t(this).one("bsTransitionEnd", function() {
            i = !0
        });
        var n = function() {
            i || t(o).trigger(t.support.transition.end)
        };
        return setTimeout(n, e),
        this
    }
    ,
    t(function() {
        t.support.transition = e(),
        t.support.transition && (t.event.special.bsTransitionEnd = {
            bindType: t.support.transition.end,
            delegateType: t.support.transition.end,
            handle: function(e) {
                return t(e.target).is(this) ? e.handleObj.handler.apply(this, arguments) : void 0
            }
        })
    })
}(jQuery);
;$.fn.bootstrapModal = $.fn.modal;
;(function() {
    function et(t) {
        function r(n, i, r, u, f, e) {
            for (; f >= 0 && e > f; f += t) {
                var o = u ? u[f] : f;
                r = i(r, n[o], o, n)
            }
            return r
        }
        return function(u, f, o, s) {
            f = e(f, s, 4);
            var h = !i(u) && n.keys(u)
              , l = (h || u).length
              , c = t > 0 ? 0 : l - 1;
            return arguments.length < 3 && (o = u[h ? h[c] : c],
            c += t),
            r(u, f, o, h, c, l)
        }
    }
    function rt(n) {
        return function(i, r, f) {
            r = t(r, f);
            for (var o = u(i), e = n > 0 ? 0 : o - 1; e >= 0 && o > e; e += n)
                if (r(i[e], e, i))
                    return e;
            return -1
        }
    }
    function ut(t, i, f) {
        return function(e, o, s) {
            var c = 0
              , h = u(e);
            if ("number" == typeof s)
                t > 0 ? c = s >= 0 ? s : Math.max(s + h, c) : h = s >= 0 ? Math.min(s + 1, h) : s + h + 1;
            else if (f && s && h)
                return s = f(e, o),
                e[s] === o ? s : -1;
            if (o !== o)
                return s = i(r.call(e, c, h), n.isNaN),
                s >= 0 ? s + c : -1;
            for (s = t > 0 ? c : h - 1; s >= 0 && h > s; s += t)
                if (e[s] === o)
                    return s;
            return -1
        }
    }
    function ft(t, i) {
        var u = k.length
          , f = t.constructor
          , e = n.isFunction(f) && f.prototype || w
          , r = "constructor";
        for (n.has(t, r) && !n.contains(i, r) && i.push(r); u--; )
            r = k[u],
            r in t && t[r] !== e[r] && !n.contains(i, r) && i.push(r)
    }
    var a = this, lt = a._, l = Array.prototype, w = Object.prototype, gt = Function.prototype, dt = l.push, r = l.slice, o = w.toString, wt = w.hasOwnProperty, pt = Array.isArray, ct = Object.keys, y = gt.bind, ht = Object.create, p = function() {}, n = function(t) {
        return t instanceof n ? t : this instanceof n ? void (this._wrapped = t) : new n(t)
    }, e, t, h, f, g, d, k, s, nt, c;
    "undefined" != typeof exports ? ("undefined" != typeof module && module.exports && (exports = module.exports = n),
    exports._ = n) : a._ = n,
    n.VERSION = "1.8.3",
    e = function(n, t, i) {
        if (t === void 0)
            return n;
        switch (null == i ? 3 : i) {
        case 1:
            return function(i) {
                return n.call(t, i)
            }
            ;
        case 2:
            return function(i, r) {
                return n.call(t, i, r)
            }
            ;
        case 3:
            return function(i, r, u) {
                return n.call(t, i, r, u)
            }
            ;
        case 4:
            return function(i, r, u, f) {
                return n.call(t, i, r, u, f)
            }
        }
        return function() {
            return n.apply(t, arguments)
        }
    }
    ,
    t = function(t, i, r) {
        return null == t ? n.identity : n.isFunction(t) ? e(t, i, r) : n.isObject(t) ? n.matcher(t) : n.property(t)
    }
    ,
    n.iteratee = function(n, i) {
        return t(n, i, 1 / 0)
    }
    ;
    var b = function(n, t) {
        return function(i) {
            var e = arguments.length, r, u;
            if (2 > e || null == i)
                return i;
            for (r = 1; e > r; r++)
                for (var o = arguments[r], s = n(o), h = s.length, f = 0; h > f; f++)
                    u = s[f],
                    t && i[u] !== void 0 || (i[u] = o[u]);
            return i
        }
    }
      , st = function(t) {
        if (!n.isObject(t))
            return {};
        if (ht)
            return ht(t);
        p.prototype = t;
        var i = new p;
        return p.prototype = null,
        i
    }
      , ot = function(n) {
        return function(t) {
            if (null != t)
                return t[n]
        }
    }
      , at = Math.pow(2, 53) - 1
      , u = ot("length")
      , i = function(n) {
        var t = u(n);
        return "number" == typeof t && t >= 0 && at >= t
    };
    n.each = n.forEach = function(t, r, u) {
        var f, o, s;
        if (r = e(r, u),
        i(t))
            for (f = 0,
            o = t.length; o > f; f++)
                r(t[f], f, t);
        else
            for (s = n.keys(t),
            f = 0,
            o = s.length; o > f; f++)
                r(t[s[f]], s[f], t);
        return t
    }
    ,
    n.map = n.collect = function(r, u, f) {
        var s;
        u = t(u, f);
        for (var o = !i(r) && n.keys(r), h = (o || r).length, c = Array(h), e = 0; h > e; e++)
            s = o ? o[e] : e,
            c[e] = u(r[s], s, r);
        return c
    }
    ,
    n.reduce = n.foldl = n.inject = et(1),
    n.reduceRight = n.foldr = et(-1),
    n.find = n.detect = function(t, r, u) {
        var f;
        return f = i(t) ? n.findIndex(t, r, u) : n.findKey(t, r, u),
        f !== void 0 && f !== -1 ? t[f] : void 0
    }
    ,
    n.filter = n.select = function(i, r, u) {
        var f = [];
        return r = t(r, u),
        n.each(i, function(n, t, i) {
            r(n, t, i) && f.push(n)
        }),
        f
    }
    ,
    n.reject = function(i, r, u) {
        return n.filter(i, n.negate(t(r)), u)
    }
    ,
    n.every = n.all = function(r, u, f) {
        var s;
        u = t(u, f);
        for (var o = !i(r) && n.keys(r), h = (o || r).length, e = 0; h > e; e++)
            if (s = o ? o[e] : e,
            !u(r[s], s, r))
                return !1;
        return !0
    }
    ,
    n.some = n.any = function(r, u, f) {
        var s;
        u = t(u, f);
        for (var o = !i(r) && n.keys(r), h = (o || r).length, e = 0; h > e; e++)
            if (s = o ? o[e] : e,
            u(r[s], s, r))
                return !0;
        return !1
    }
    ,
    n.contains = n.includes = n.include = function(t, r, u, f) {
        return i(t) || (t = n.values(t)),
        ("number" != typeof u || f) && (u = 0),
        n.indexOf(t, r, u) >= 0
    }
    ,
    n.invoke = function(t, i) {
        var u = r.call(arguments, 2)
          , f = n.isFunction(i);
        return n.map(t, function(n) {
            var t = f ? i : n[i];
            return null == t ? t : t.apply(n, u)
        })
    }
    ,
    n.pluck = function(t, i) {
        return n.map(t, n.property(i))
    }
    ,
    n.where = function(t, i) {
        return n.filter(t, n.matcher(i))
    }
    ,
    n.findWhere = function(t, i) {
        return n.find(t, n.matcher(i))
    }
    ,
    n.max = function(r, u, f) {
        var h, o, e = -1 / 0, c = -1 / 0, s, l;
        if (null == u && null != r)
            for (r = i(r) ? r : n.values(r),
            s = 0,
            l = r.length; l > s; s++)
                h = r[s],
                h > e && (e = h);
        else
            u = t(u, f),
            n.each(r, function(n, t, i) {
                o = u(n, t, i),
                (o > c || o === -1 / 0 && e === -1 / 0) && (e = n,
                c = o)
            });
        return e
    }
    ,
    n.min = function(r, u, f) {
        var h, o, e = 1 / 0, c = 1 / 0, s, l;
        if (null == u && null != r)
            for (r = i(r) ? r : n.values(r),
            s = 0,
            l = r.length; l > s; s++)
                h = r[s],
                e > h && (e = h);
        else
            u = t(u, f),
            n.each(r, function(n, t, i) {
                o = u(n, t, i),
                (c > o || 1 / 0 === o && 1 / 0 === e) && (e = n,
                c = o)
            });
        return e
    }
    ,
    n.shuffle = function(t) {
        for (var u, e = i(t) ? t : n.values(t), o = e.length, f = Array(o), r = 0; o > r; r++)
            u = n.random(0, r),
            u !== r && (f[r] = f[u]),
            f[u] = e[r];
        return f
    }
    ,
    n.sample = function(t, r, u) {
        return null == r || u ? (i(t) || (t = n.values(t)),
        t[n.random(t.length - 1)]) : n.shuffle(t).slice(0, Math.max(0, r))
    }
    ,
    n.sortBy = function(i, r, u) {
        return r = t(r, u),
        n.pluck(n.map(i, function(n, t, i) {
            return {
                value: n,
                index: t,
                criteria: r(n, t, i)
            }
        }).sort(function(n, t) {
            var i = n.criteria
              , r = t.criteria;
            if (i !== r) {
                if (i > r || i === void 0)
                    return 1;
                if (r > i || r === void 0)
                    return -1
            }
            return n.index - t.index
        }), "value")
    }
    ,
    h = function(i) {
        return function(r, u, f) {
            var e = {};
            return u = t(u, f),
            n.each(r, function(n, t) {
                var f = u(n, t, r);
                i(e, n, f)
            }),
            e
        }
    }
    ,
    n.groupBy = h(function(t, i, r) {
        n.has(t, r) ? t[r].push(i) : t[r] = [i]
    }),
    n.indexBy = h(function(n, t, i) {
        n[i] = t
    }),
    n.countBy = h(function(t, i, r) {
        n.has(t, r) ? t[r]++ : t[r] = 1
    }),
    n.toArray = function(t) {
        return t ? n.isArray(t) ? r.call(t) : i(t) ? n.map(t, n.identity) : n.values(t) : []
    }
    ,
    n.size = function(t) {
        return null == t ? 0 : i(t) ? t.length : n.keys(t).length
    }
    ,
    n.partition = function(i, r, u) {
        r = t(r, u);
        var f = []
          , e = [];
        return n.each(i, function(n, t, i) {
            (r(n, t, i) ? f : e).push(n)
        }),
        [f, e]
    }
    ,
    n.first = n.head = n.take = function(t, i, r) {
        if (null != t)
            return null == i || r ? t[0] : n.initial(t, t.length - i)
    }
    ,
    n.initial = function(n, t, i) {
        return r.call(n, 0, Math.max(0, n.length - (null == t || i ? 1 : t)))
    }
    ,
    n.last = function(t, i, r) {
        if (null != t)
            return null == i || r ? t[t.length - 1] : n.rest(t, Math.max(0, t.length - i))
    }
    ,
    n.rest = n.tail = n.drop = function(n, t, i) {
        return r.call(n, null == t || i ? 1 : t)
    }
    ,
    n.compact = function(t) {
        return n.filter(t, n.identity)
    }
    ,
    f = function(t, r, e, o) {
        for (var s, l, a, h = [], v = 0, c = o || 0, y = u(t); y > c; c++)
            if (s = t[c],
            i(s) && (n.isArray(s) || n.isArguments(s)))
                for (r || (s = f(s, r, e)),
                l = 0,
                a = s.length,
                h.length += a; a > l; )
                    h[v++] = s[l++];
            else
                e || (h[v++] = s);
        return h
    }
    ,
    n.flatten = function(n, t) {
        return f(n, t, !1)
    }
    ,
    n.without = function(t) {
        return n.difference(t, r.call(arguments, 1))
    }
    ,
    n.uniq = n.unique = function(i, r, f, e) {
        var o, c;
        n.isBoolean(r) || (e = f,
        f = r,
        r = !1),
        null != f && (f = t(f, e));
        for (var s = [], l = [], h = 0, a = u(i); a > h; h++)
            o = i[h],
            c = f ? f(o, h, i) : o,
            r ? (h && l === c || s.push(o),
            l = c) : f ? n.contains(l, c) || (l.push(c),
            s.push(o)) : n.contains(s, o) || s.push(o);
        return s
    }
    ,
    n.union = function() {
        return n.uniq(f(arguments, !0, !0))
    }
    ,
    n.intersection = function(t) {
        for (var r, i, f = [], o = arguments.length, e = 0, s = u(t); s > e; e++)
            if (r = t[e],
            !n.contains(f, r)) {
                for (i = 1; o > i && n.contains(arguments[i], r); i++)
                    ;
                i === o && f.push(r)
            }
        return f
    }
    ,
    n.difference = function(t) {
        var i = f(arguments, !0, !0, 1);
        return n.filter(t, function(t) {
            return !n.contains(i, t)
        })
    }
    ,
    n.zip = function() {
        return n.unzip(arguments)
    }
    ,
    n.unzip = function(t) {
        for (var r = t && n.max(t, u).length || 0, f = Array(r), i = 0; r > i; i++)
            f[i] = n.pluck(t, i);
        return f
    }
    ,
    n.object = function(n, t) {
        for (var r = {}, i = 0, f = u(n); f > i; i++)
            t ? r[n[i]] = t[i] : r[n[i][0]] = n[i][1];
        return r
    }
    ,
    n.findIndex = rt(1),
    n.findLastIndex = rt(-1),
    n.sortedIndex = function(n, i, r, f) {
        var o;
        r = t(r, f, 1);
        for (var h = r(i), e = 0, s = u(n); s > e; )
            o = Math.floor((e + s) / 2),
            r(n[o]) < h ? e = o + 1 : s = o;
        return e
    }
    ,
    n.indexOf = ut(1, n.findIndex, n.sortedIndex),
    n.lastIndexOf = ut(-1, n.findLastIndex),
    n.range = function(n, t, i) {
        null == t && (t = n || 0,
        n = 0),
        i = i || 1;
        for (var u = Math.max(Math.ceil((t - n) / i), 0), f = Array(u), r = 0; u > r; r++,
        n += i)
            f[r] = n;
        return f
    }
    ,
    g = function(t, i, r, u, f) {
        if (!(u instanceof i))
            return t.apply(r, f);
        var e = st(t.prototype)
          , o = t.apply(e, f);
        return n.isObject(o) ? o : e
    }
    ,
    n.bind = function(t, i) {
        if (y && t.bind === y)
            return y.apply(t, r.call(arguments, 1));
        if (!n.isFunction(t))
            throw new TypeError("Bind must be called on a function");
        var f = r.call(arguments, 2)
          , u = function() {
            return g(t, u, i, this, f.concat(r.call(arguments)))
        };
        return u
    }
    ,
    n.partial = function(t) {
        var i = r.call(arguments, 1)
          , u = function() {
            for (var f = 0, o = i.length, e = Array(o), r = 0; o > r; r++)
                e[r] = i[r] === n ? arguments[f++] : i[r];
            for (; f < arguments.length; )
                e.push(arguments[f++]);
            return g(t, u, this, this, e)
        };
        return u
    }
    ,
    n.bindAll = function(t) {
        var i, r, u = arguments.length;
        if (1 >= u)
            throw new Error("bindAll must be passed function names");
        for (i = 1; u > i; i++)
            r = arguments[i],
            t[r] = n.bind(t[r], t);
        return t
    }
    ,
    n.memoize = function(t, i) {
        var r = function(u) {
            var f = r.cache
              , e = "" + (i ? i.apply(this, arguments) : u);
            return n.has(f, e) || (f[e] = t.apply(this, arguments)),
            f[e]
        };
        return r.cache = {},
        r
    }
    ,
    n.delay = function(n, t) {
        var i = r.call(arguments, 2);
        return setTimeout(function() {
            return n.apply(null, i)
        }, t)
    }
    ,
    n.defer = n.partial(n.delay, n, 1),
    n.throttle = function(t, i, r) {
        var f, e, s, u = null, o = 0, h;
        return r || (r = {}),
        h = function() {
            o = r.leading === !1 ? 0 : n.now(),
            u = null,
            s = t.apply(f, e),
            u || (f = e = null)
        }
        ,
        function() {
            var l = n.now(), c;
            return o || r.leading !== !1 || (o = l),
            c = i - (l - o),
            f = this,
            e = arguments,
            0 >= c || c > i ? (u && (clearTimeout(u),
            u = null),
            o = l,
            s = t.apply(f, e),
            u || (f = e = null)) : u || r.trailing === !1 || (u = setTimeout(h, c)),
            s
        }
    }
    ,
    n.debounce = function(t, i, r) {
        var u, f, e, s, o, h = function() {
            var c = n.now() - s;
            i > c && c >= 0 ? u = setTimeout(h, i - c) : (u = null,
            r || (o = t.apply(e, f),
            u || (e = f = null)))
        };
        return function() {
            e = this,
            f = arguments,
            s = n.now();
            var c = r && !u;
            return u || (u = setTimeout(h, i)),
            c && (o = t.apply(e, f),
            e = f = null),
            o
        }
    }
    ,
    n.wrap = function(t, i) {
        return n.partial(i, t)
    }
    ,
    n.negate = function(n) {
        return function() {
            return !n.apply(this, arguments)
        }
    }
    ,
    n.compose = function() {
        var n = arguments
          , t = n.length - 1;
        return function() {
            for (var r = t, i = n[t].apply(this, arguments); r--; )
                i = n[r].call(this, i);
            return i
        }
    }
    ,
    n.after = function(n, t) {
        return function() {
            if (--n < 1)
                return t.apply(this, arguments)
        }
    }
    ,
    n.before = function(n, t) {
        var i;
        return function() {
            return --n > 0 && (i = t.apply(this, arguments)),
            1 >= n && (t = null),
            i
        }
    }
    ,
    n.once = n.partial(n.before, 2),
    d = !{
        toString: null
    }.propertyIsEnumerable("toString"),
    k = ["valueOf", "isPrototypeOf", "toString", "propertyIsEnumerable", "hasOwnProperty", "toLocaleString"],
    n.keys = function(t) {
        var i, r;
        if (!n.isObject(t))
            return [];
        if (ct)
            return ct(t);
        i = [];
        for (r in t)
            n.has(t, r) && i.push(r);
        return d && ft(t, i),
        i
    }
    ,
    n.allKeys = function(t) {
        var i, r;
        if (!n.isObject(t))
            return [];
        i = [];
        for (r in t)
            i.push(r);
        return d && ft(t, i),
        i
    }
    ,
    n.values = function(t) {
        for (var r = n.keys(t), u = r.length, f = Array(u), i = 0; u > i; i++)
            f[i] = t[r[i]];
        return f
    }
    ,
    n.mapObject = function(i, r, u) {
        r = t(r, u);
        for (var f, o = n.keys(i), h = o.length, s = {}, e = 0; h > e; e++)
            f = o[e],
            s[f] = r(i[f], f, i);
        return s
    }
    ,
    n.pairs = function(t) {
        for (var r = n.keys(t), u = r.length, f = Array(u), i = 0; u > i; i++)
            f[i] = [r[i], t[r[i]]];
        return f
    }
    ,
    n.invert = function(t) {
        for (var u = {}, r = n.keys(t), i = 0, f = r.length; f > i; i++)
            u[t[r[i]]] = r[i];
        return u
    }
    ,
    n.functions = n.methods = function(t) {
        var r = [], i;
        for (i in t)
            n.isFunction(t[i]) && r.push(i);
        return r.sort()
    }
    ,
    n.extend = b(n.allKeys),
    n.extendOwn = n.assign = b(n.keys),
    n.findKey = function(i, r, u) {
        r = t(r, u);
        for (var f, o = n.keys(i), e = 0, s = o.length; s > e; e++)
            if (f = o[e],
            r(i[f], f, i))
                return f
    }
    ,
    n.pick = function(t, i, r) {
        var c, o, l = {}, u = t, s, v, h, a;
        if (null == u)
            return l;
        for (n.isFunction(i) ? (o = n.allKeys(u),
        c = e(i, r)) : (o = f(arguments, !1, !1, 1),
        c = function(n, t, i) {
            return t in i
        }
        ,
        u = Object(u)),
        s = 0,
        v = o.length; v > s; s++)
            h = o[s],
            a = u[h],
            c(a, h, u) && (l[h] = a);
        return l
    }
    ,
    n.omit = function(t, i, r) {
        if (n.isFunction(i))
            i = n.negate(i);
        else {
            var u = n.map(f(arguments, !1, !1, 1), String);
            i = function(t, i) {
                return !n.contains(u, i)
            }
        }
        return n.pick(t, i, r)
    }
    ,
    n.defaults = b(n.allKeys, !0),
    n.create = function(t, i) {
        var r = st(t);
        return i && n.extendOwn(r, i),
        r
    }
    ,
    n.clone = function(t) {
        return n.isObject(t) ? n.isArray(t) ? t.slice() : n.extend({}, t) : t
    }
    ,
    n.tap = function(n, t) {
        return t(n),
        n
    }
    ,
    n.isMatch = function(t, i) {
        var e = n.keys(i), o = e.length, f, r, u;
        if (null == t)
            return !o;
        for (f = Object(t),
        r = 0; o > r; r++)
            if (u = e[r],
            i[u] !== f[u] || !(u in f))
                return !1;
        return !0
    }
    ,
    s = function(t, i, r, u) {
        var c, a, e, h, f, l, v;
        if (t === i)
            return 0 !== t || 1 / t == 1 / i;
        if (null == t || null == i)
            return t === i;
        if (t instanceof n && (t = t._wrapped),
        i instanceof n && (i = i._wrapped),
        c = o.call(t),
        c !== o.call(i))
            return !1;
        switch (c) {
        case "[object RegExp]":
        case "[object String]":
            return "" + t == "" + i;
        case "[object Number]":
            return +t != +t ? +i != +i : 0 == +t ? 1 / +t == 1 / i : +t == +i;
        case "[object Date]":
        case "[object Boolean]":
            return +t == +i
        }
        if (a = "[object Array]" === c,
        !a && ("object" != typeof t || "object" != typeof i || (e = t.constructor,
        h = i.constructor,
        e !== h && !(n.isFunction(e) && e instanceof e && n.isFunction(h) && h instanceof h) && "constructor"in t && "constructor"in i)))
            return !1;
        for (r = r || [],
        u = u || [],
        f = r.length; f--; )
            if (r[f] === t)
                return u[f] === i;
        if (r.push(t),
        u.push(i),
        a) {
            if (f = t.length,
            f !== i.length)
                return !1;
            for (; f--; )
                if (!s(t[f], i[f], r, u))
                    return !1
        } else {
            if (v = n.keys(t),
            f = v.length,
            n.keys(i).length !== f)
                return !1;
            for (; f--; )
                if (l = v[f],
                !n.has(i, l) || !s(t[l], i[l], r, u))
                    return !1
        }
        return r.pop(),
        u.pop(),
        !0
    }
    ,
    n.isEqual = function(n, t) {
        return s(n, t)
    }
    ,
    n.isEmpty = function(t) {
        return null == t ? !0 : i(t) && (n.isArray(t) || n.isString(t) || n.isArguments(t)) ? 0 === t.length : 0 === n.keys(t).length
    }
    ,
    n.isElement = function(n) {
        return !(!n || 1 !== n.nodeType)
    }
    ,
    n.isArray = pt || function(n) {
        return "[object Array]" === o.call(n)
    }
    ,
    n.isObject = function(n) {
        var t = typeof n;
        return "function" === t || "object" === t && !!n
    }
    ,
    n.each(["Arguments", "Function", "String", "Number", "Date", "RegExp", "Error"], function(t) {
        n["is" + t] = function(n) {
            return o.call(n) === "[object " + t + "]"
        }
    }),
    n.isArguments(arguments) || (n.isArguments = function(t) {
        return n.has(t, "callee")
    }
    ),
    "function" != typeof /./ && "object" != typeof Int8Array && (n.isFunction = function(n) {
        return "function" == typeof n || !1
    }
    ),
    n.isFinite = function(n) {
        return isFinite(n) && !isNaN(parseFloat(n))
    }
    ,
    n.isNaN = function(t) {
        return n.isNumber(t) && t !== +t
    }
    ,
    n.isBoolean = function(n) {
        return n === !0 || n === !1 || "[object Boolean]" === o.call(n)
    }
    ,
    n.isNull = function(n) {
        return null === n
    }
    ,
    n.isUndefined = function(n) {
        return n === void 0
    }
    ,
    n.has = function(n, t) {
        return null != n && wt.call(n, t)
    }
    ,
    n.noConflict = function() {
        return a._ = lt,
        this
    }
    ,
    n.identity = function(n) {
        return n
    }
    ,
    n.constant = function(n) {
        return function() {
            return n
        }
    }
    ,
    n.noop = function() {}
    ,
    n.property = ot,
    n.propertyOf = function(n) {
        return null == n ? function() {}
        : function(t) {
            return n[t]
        }
    }
    ,
    n.matcher = n.matches = function(t) {
        return t = n.extendOwn({}, t),
        function(i) {
            return n.isMatch(i, t)
        }
    }
    ,
    n.times = function(n, t, i) {
        var u = Array(Math.max(0, n)), r;
        for (t = e(t, i, 1),
        r = 0; n > r; r++)
            u[r] = t(r);
        return u
    }
    ,
    n.random = function(n, t) {
        return null == t && (t = n,
        n = 0),
        n + Math.floor(Math.random() * (t - n + 1))
    }
    ,
    n.now = Date.now || function() {
        return +new Date
    }
    ;
    var it = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#x27;",
        "`": "&#x60;"
    }
      , yt = n.invert(it)
      , tt = function(t) {
        var r = function(n) {
            return t[n]
        }
          , i = "(?:" + n.keys(t).join("|") + ")"
          , u = RegExp(i)
          , f = RegExp(i, "g");
        return function(n) {
            return n = null == n ? "" : "" + n,
            u.test(n) ? n.replace(f, r) : n
        }
    };
    n.escape = tt(it),
    n.unescape = tt(yt),
    n.result = function(t, i, r) {
        var u = null == t ? void 0 : t[i];
        return u === void 0 && (u = r),
        n.isFunction(u) ? u.call(t) : u
    }
    ,
    nt = 0,
    n.uniqueId = function(n) {
        var t = ++nt + "";
        return n ? n + t : t
    }
    ,
    n.templateSettings = {
        evaluate: /<%([\s\S]+?)%>/g,
        interpolate: /<%=([\s\S]+?)%>/g,
        escape: /<%-([\s\S]+?)%>/g
    };
    var v = /(.)^/
      , bt = {
        "'": "'",
        "\\": "\\",
        "\r": "r",
        "\n": "n",
        "\u2028": "u2028",
        "\u2029": "u2029"
    }
      , kt = /\\|'|\r|\n|\u2028|\u2029/g
      , vt = function(n) {
        return "\\" + bt[n]
    };
    n.template = function(t, i, r) {
        var o, f, s;
        !i && r && (i = r),
        i = n.defaults({}, i, n.templateSettings);
        var h = RegExp([(i.escape || v).source, (i.interpolate || v).source, (i.evaluate || v).source].join("|") + "|$", "g")
          , e = 0
          , u = "__p+='";
        t.replace(h, function(n, i, r, f, o) {
            return u += t.slice(e, o).replace(kt, vt),
            e = o + n.length,
            i ? u += "'+\n((__t=(" + i + "))==null?'':_.escape(__t))+\n'" : r ? u += "'+\n((__t=(" + r + "))==null?'':__t)+\n'" : f && (u += "';\n" + f + "\n__p+='"),
            n
        }),
        u += "';\n",
        i.variable || (u = "with(obj||{}){\n" + u + "}\n"),
        u = "var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};\n" + u + "return __p;\n";
        try {
            o = new Function(i.variable || "obj","_",u)
        } catch (c) {
            throw c.source = u,
            c;
        }
        return f = function(t) {
            return o.call(this, t, n)
        }
        ,
        s = i.variable || "obj",
        f.source = "function(" + s + "){\n" + u + "}",
        f
    }
    ,
    n.chain = function(t) {
        var i = n(t);
        return i._chain = !0,
        i
    }
    ,
    c = function(t, i) {
        return t._chain ? n(i).chain() : i
    }
    ,
    n.mixin = function(t) {
        n.each(n.functions(t), function(i) {
            var r = n[i] = t[i];
            n.prototype[i] = function() {
                var t = [this._wrapped];
                return dt.apply(t, arguments),
                c(this, r.apply(n, t))
            }
        })
    }
    ,
    n.mixin(n),
    n.each(["pop", "push", "reverse", "shift", "sort", "splice", "unshift"], function(t) {
        var i = l[t];
        n.prototype[t] = function() {
            var n = this._wrapped;
            return i.apply(n, arguments),
            "shift" !== t && "splice" !== t || 0 !== n.length || delete n[0],
            c(this, n)
        }
    }),
    n.each(["concat", "join", "slice"], function(t) {
        var i = l[t];
        n.prototype[t] = function() {
            return c(this, i.apply(this._wrapped, arguments))
        }
    }),
    n.prototype.value = function() {
        return this._wrapped
    }
    ,
    n.prototype.valueOf = n.prototype.toJSON = n.prototype.value,
    n.prototype.toString = function() {
        return "" + this._wrapped
    }
    ,
    "function" == typeof define && define.amd && define("underscore", [], function() {
        return n
    })
}
).call(this);
;function makeGoogleAnalyticsLogObject(n) {
    var t = {};
    return t.event = n,
    t.timestamp = +new Date,
    t
}
function GoogleAnalyticsTimingTracker(n, t, i, r) {
    this.maxTime = 6e4,
    this.category = n,
    this.variable = t,
    this.label = i ? i : undefined,
    this.isDebug = r
}
var GoogleAnalyticsEvents = {
    LocalEventLog: [],
    SetCustomVar: function(n, t, i, r) {
        window._gaq && (window.GoogleAnalyticsDisableRoblox2 || _gaq.push(["_setCustomVar", n, t, i, r]),
        _gaq.push(["b._setCustomVar", n, t, i, r]))
    },
    FireEvent: function(n) {
        var t, i;
        window._gaq && (window.GoogleAnalyticsDisableRoblox2 || (t = ["_trackEvent"],
        t = t.concat(n),
        _gaq.push(t),
        GoogleAnalyticsEvents.LocalEventLog.push(makeGoogleAnalyticsLogObject(t))),
        i = ["b._trackEvent"],
        i = i.concat(n),
        _gaq.push(i),
        GoogleAnalyticsEvents.LocalEventLog.push(makeGoogleAnalyticsLogObject(i)))
    },
    ViewVirtual: function(n) {
        var t, i;
        window._gaq && (window.GoogleAnalyticsDisableRoblox2 || (t = ["_trackPageview", n],
        window._gaq.push(t),
        GoogleAnalyticsEvents.LocalEventLog.push(makeGoogleAnalyticsLogObject(t))),
        i = ["b._trackPageview", n],
        window._gaq.push(i),
        GoogleAnalyticsEvents.LocalEventLog.push(makeGoogleAnalyticsLogObject(i)))
    },
    TrackTransaction: function(n, t) {
        if (window._gaq) {
            var i = ["_addTrans", n, "Roblox", t, "0", "0", "San Mateo", "California", "USA"];
            window.GoogleAnalyticsDisableRoblox2 || (_gaq.push(i),
            GoogleAnalyticsEvents.LocalEventLog.push(makeGoogleAnalyticsLogObject(i))),
            i[0] = "b." + i[0],
            _gaq.push(i),
            GoogleAnalyticsEvents.LocalEventLog.push(makeGoogleAnalyticsLogObject(i))
        }
    },
    TrackTransactionItem: function(n, t, i, r, u) {
        if (window._gaq) {
            var f = ["_addItem", n, t, i, r, u, 1]
              , e = ["_trackTrans"];
            window.GoogleAnalyticsDisableRoblox2 || (_gaq.push(f),
            GoogleAnalyticsEvents.LocalEventLog.push(makeGoogleAnalyticsLogObject(f)),
            _gaq.push(e),
            GoogleAnalyticsEvents.LocalEventLog.push(makeGoogleAnalyticsLogObject(e))),
            f[0] = "b." + f[0],
            e[0] = "b." + e[0],
            _gaq.push(f),
            GoogleAnalyticsEvents.LocalEventLog.push(makeGoogleAnalyticsLogObject(f)),
            _gaq.push(e),
            GoogleAnalyticsEvents.LocalEventLog.push(makeGoogleAnalyticsLogObject(e))
        }
    },
    Log: function(n) {
        GoogleAnalyticsEvents.LocalEventLog.push(makeGoogleAnalyticsLogObject(n))
    }
};
GoogleAnalyticsTimingTracker.prototype.getTimeStamp = function() {
    return window.performance && window.performance.now ? Math.round(window.performance.now()) : +new Date
}
,
GoogleAnalyticsTimingTracker.prototype.start = function() {
    this.startTime = this.getTimeStamp()
}
,
GoogleAnalyticsTimingTracker.prototype.stop = function() {
    this.elapsedTime = this.getTimeStamp() - this.startTime
}
,
GoogleAnalyticsTimingTracker.prototype.send = function() {
    if (0 < this.elapsedTime && this.elapsedTime < this.maxTime) {
        var n = ["b._trackTiming", this.category, this.variable, this.elapsedTime, this.label, 100];
        window._gaq.push(n)
    }
}
;
;typeof Roblox == "undefined" && (Roblox = {}),
Roblox.JSErrorTracker = {
    showAlert: !1,
    defaultPixel: "GA",
    javascriptStackTraceEnabled: !1,
    suppressConsoleError: !1,
    data: {
        category: "JavascriptExceptions"
    },
    initialize: function(n) {
        $.extend(Roblox.JSErrorTracker, n),
        this.addOnErrorEventHandler(this.errorHandler)
    },
    errorHandler: function(n, t, i, r, u) {
        try {
            var f = "";
            r && (f = " errCol = " + r),
            u && (f = " fileName = " + u.fileName + ",  stackTrace = " + JSON.stringify(u.stack)),
            Roblox.JSErrorTracker.data.msg = n + f,
            Roblox.JSErrorTracker.data.url = t,
            Roblox.JSErrorTracker.data.line = i,
            Roblox.JSErrorTracker.data.ua = window.navigator.userAgent,
            Roblox.JSErrorTracker.logException(Roblox.JSErrorTracker.data)
        } catch (e) {}
        return Roblox.JSErrorTracker.suppressConsoleError
    },
    addOnErrorEventHandler: function(n) {
        var t = window.onerror;
        window.onerror = typeof window.onerror == "function" ? function(i, r, u, f, e) {
            t(i, r, u, f, e),
            n(i, r, u, f, e)
        }
        : n
    },
    processException: function(n, t) {
        if (typeof n != "undefined") {
            typeof n.category == "undefined" && (n.category = Roblox.JSErrorTracker.data.category);
            switch (t) {
            case "GA":
                var i = {
                    category: "category",
                    url: "action",
                    msg: "opt_label",
                    line: "opt_value"
                };
                Roblox.JSErrorTracker.fireGAPixel(Roblox.JSErrorTracker.distillGAData(n, i));
                break;
            default:
                console.log("Roblox JSErrorTracker received an unknown pixel to fire")
            }
            return !0
        }
    },
    logException: function(n) {
        Roblox.JSErrorTracker.processException(n, Roblox.JSErrorTracker.defaultPixel),
        Roblox.JSErrorTracker.showErrorMessage(n.msg)
    },
    distillData: function(n, t) {
        var r = {}, i;
        for (i in t)
            typeof n[i] != "undefined" && (r[t[i]] = encodeURIComponent(n[i]));
        return r
    },
    distillGAData: function(n, t) {
        var i = Roblox.JSErrorTracker.distillData(n, t)
          , r = [decodeURIComponent([i.category])];
        return typeof i.action != typeof undefined ? (r = r.concat(decodeURIComponent(i.action)),
        typeof i.opt_label != typeof undefined && (r = r.concat(decodeURIComponent(i.opt_label)),
        typeof i.opt_value != typeof undefined && (r = r.concat(parseInt(decodeURIComponent(i.opt_value)))))) : Roblox.JSErrorTracker.showAlert && alert("Missing a required parameter for GA"),
        r
    },
    createURL: function(n, t, i) {
        var r = n, f = Roblox.JSErrorTracker.distillData(t, i), u;
        if (r += "?",
        f != null)
            for (u in f)
                typeof u != typeof undefined && t.hasOwnProperty(u) && (r += u + "=" + f[u] + "&");
        return r = r.slice(0, r.length - 1)
    },
    fireGAPixel: function(n) {
        typeof _gaq != "undefined" && _gaq.push(["c._trackEvent"].concat(n))
    },
    showErrorMessage: function(n) {
        Roblox.JSErrorTracker.showAlert && (n !== null ? alert(n) : alert("An error occured"))
    }
};
;function RBXBaseEventListener() {
    if (!(this instanceof RBXBaseEventListener))
        return new RBXBaseEventListener;
    this.init = function() {
        for (eventKey in this.events)
            this.events.hasOwnProperty(eventKey) && $(document).bind(this.events[eventKey], $.proxy(this.localCopy, this))
    }
    ,
    this.events = [],
    this.localCopy = function(n, t) {
        var i = $.extend(!0, {}, n)
          , r = $.extend(!0, {}, t);
        this.handleEvent(i, r)
    }
    ,
    this.distillData = function() {
        return console.log("RBXEventListener distillData - Please implement me"),
        !1
    }
    ,
    this.handleEvent = function() {
        return console.log("EventListener handleEvent - Please implement me"),
        !1
    }
    ,
    this.fireEvent = function() {
        return console.log("EventListener fireEvent - Please implement me"),
        !1
    }
}
RobloxEventManager = new function() {
    var n = []
      , t = {};
    this.enabled = !1,
    this.initialized = !1,
    this.eventQueue = [],
    this.initialize = function(n) {
        for (this.initialized = !0,
        this.enabled = n; this.eventQueue.length > 0; ) {
            var t = this.eventQueue.pop();
            this.triggerEvent(t.eventName, t.args)
        }
    }
    ,
    this.triggerEvent = function(n, t) {
        this.initialized ? this.enabled && (typeof t == "undefined" && (t = {}),
        t.guid = Roblox.Cookies.getBrowserTrackerId(),
        t.guid != -1 && $(document).trigger(n, [t])) : this.eventQueue.push({
            eventName: n,
            args: t
        })
    }
    ,
    this.registerCookieStoreEvent = function(t) {
        n.push(t)
    }
    ,
    this.insertDataStoreKeyValuePair = function(n, i) {
        t[n] = i
    }
    ,
    this.monitorCookieStore = function() {
        var i, r, u, t, f;
        try {
            if (typeof Roblox == "undefined" || typeof Roblox.Client == "undefined" || window.location.protocol == "https:")
                return;
            if (i = Roblox.Client.CreateLauncher(!1),
            i == null)
                return;
            for (r = 0; r < n.length; r++)
                try {
                    u = n[r],
                    t = i.GetKeyValue(u),
                    t != "" && t != "-1" && t != "RBX_NOT_VALID" && (f = eval("(" + t + ")"),
                    f.userType = f.userId > 0 ? "user" : "guest",
                    RobloxEventManager.triggerEvent(u, f),
                    i.SetKeyValue(u, "RBX_NOT_VALID"))
                } catch (e) {}
        } catch (e) {}
    }
    ,
    this.startMonitor = function() {
        function f() {
            i ? r() : e()
        }
        function r() {
            clearTimeout(t),
            t = setTimeout(f, RobloxEventManager._idleInterval),
            i = !1;
            $(document).one("mousemove", function() {
                i = !0
            })
        }
        function u() {
            clearInterval(n),
            n = setInterval(RobloxEventManager.monitorCookieStore, 5e3),
            r()
        }
        function e() {
            clearTimeout(t),
            clearInterval(n);
            var i = document.getElementById("robloxpluginobj");
            Roblox.Client.ReleaseLauncher(i, !1, !1);
            $(document).one("mousemove", u)
        }
        var n, t, i;
        $("#PlaceLauncherStatusPanel").data("is-protocol-handler-launch-enabled") != "True" && typeof Roblox != "undefined" && typeof Roblox.Client != "undefined" && window.location.protocol != "https:" && u()
    }
}
;
;GoogleListener = new RBXBaseEventListener,
GoogleListener.handleEvent = function(n, t) {
    function r(n) {
        return n = n.toLowerCase(),
        n == "win32" ? n = "Windows" : n == "osx" && (n = "Mac"),
        n
    }
    var f, u, i;
    switch (n.type) {
    case "rbx_evt_initial_install_begin":
        t.os = r(t.os),
        t.category = "Bootstrapper Install Begin",
        i = {
            os: "action"
        };
        break;
    case "rbx_evt_ftp":
        t.os = r(t.os),
        t.category = "First Time Played",
        i = {
            os: "action"
        };
        break;
    case "rbx_evt_initial_install_success":
        t.os = r(t.os),
        t.category = "Bootstrapper Install Success",
        i = {
            os: "action"
        };
        break;
    case "rbx_evt_fmp":
        t.os = r(t.os),
        t.category = "Five Minute Play",
        i = {
            os: "action"
        };
        break;
    case "rbx_evt_abtest":
        i = {
            experiment: "category",
            variation: "action",
            version: "opt_label"
        };
        break;
    case "rbx_evt_card_redemption":
        t.category = "CardRedemption",
        i = {
            merchant: "action",
            cardValue: "opt_label"
        };
        break;
    default:
        return console.log("GoogleListener - Event registered without handling instructions: " + n.type),
        !1
    }
    return i.category = "category",
    u = this.distillData(t, i),
    this.fireEvent(u),
    !0
}
,
GoogleListener.distillData = function(n, t) {
    var i = {}, r;
    for (dataKey in t)
        typeof n[dataKey] != typeof undefined && (i[t[dataKey]] = n[dataKey]);
    return r = [i.category, i.action],
    i.opt_label != null && (r = r.concat(i.opt_label)),
    i.opt_value != null && (r = r.concat(i.opt_value)),
    r
}
,
GoogleListener.fireEvent = function(n) {
    if (typeof _gaq != typeof undefined) {
        var t = ["_trackEvent"]
          , i = ["b._trackEvent"];
        _gaq.push(t.concat(n)),
        _gaq.push(i.concat(n))
    }
}
,
GoogleListener.events = ["rbx_evt_initial_install_begin", "rbx_evt_ftp", "rbx_evt_initial_install_success", "rbx_evt_fmp", "rbx_evt_abtest", "rbx_evt_card_redemption"];
;Roblox = Roblox || {},
typeof Roblox.UpsellAdModal == "undefined" && (Roblox.UpsellAdModal = function() {
    var n = function() {
        var n = {
            titleText: Roblox.UpsellAdModal.Resources.title,
            bodyContent: Roblox.UpsellAdModal.Resources.body,
            footerText: "",
            overlayClose: !0,
            escClose: !0,
            acceptText: Roblox.UpsellAdModal.Resources.accept,
            declineText: Roblox.UpsellAdModal.Resources.decline,
            acceptColor: Roblox.GenericConfirmation.green,
            onAccept: function() {
                window.location.href = "/premium/membership"
            },
            imageUrl: "/images/BuildersClub-110x110_small.png"
        };
        Roblox.GenericConfirmation.open(n)
    };
    return {
        open: n
    }
}()),
$(function() {
    $("a.UpsellAdButton").click(function() {
        return Roblox.UpsellAdModal.open(),
        !1
    })
});
;typeof Roblox == typeof undefined && (Roblox = {}),
Roblox.Endpoints = Roblox.Endpoints || {
    addCrossDomainOptionsToAllRequests: !1
},
Roblox.Endpoints.isAbsolute = function(n) {
    var t = new RegExp("^([a-z]+://|//)");
    return t.test(n)
}
,
Roblox.Endpoints.splitAtQueryString = function(n) {
    var i = new RegExp("\\?(?!})")
      , t = i.exec(n);
    return t === null ? {
        url: n,
        query: ""
    } : {
        url: n.substring(0, t.index),
        query: n.substring(t.index)
    }
}
,
Roblox.Endpoints.ajaxPrefilter = function(n) {
    var r = Roblox.Endpoints.generateAbsoluteUrl(n.url, n.data, n.crossDomain);
    n.url = r,
    Roblox.Endpoints.addCrossDomainOptionsToAllRequests && n.url.indexOf("rbxcdn.com") < 0 && n.url.indexOf("s3.amazonaws.com") < 0 && (n.crossDomain = !0,
    n.xhrFields = n.xhrFields || {},
    n.xhrFields.withCredentials = !0)
}
,
Roblox.Endpoints.generateAbsoluteUrl = function(n, t, i) {
    var f = Roblox.Endpoints.splitAtQueryString(n)
      , u = f.url.toLowerCase()
      , r = u;
    return typeof Roblox.Endpoints.Urls != typeof undefined && i && typeof Roblox.Endpoints.Urls[u.toLowerCase()] != typeof undefined && (r = Roblox.Endpoints.getAbsoluteUrl(u)),
    r.indexOf("{") > -1 && $.each(t, function(n, t) {
        var i = new RegExp("{" + n.toLowerCase() + "(:.*?)?\\??}");
        r = r.replace(i, t)
    }),
    r + f.query
}
,
Roblox.Endpoints.getAbsoluteUrl = function(n) {
    var t, r, i, u;
    return typeof Roblox.Endpoints.Urls == typeof undefined ? n : n.length === 0 || Roblox.Endpoints.isAbsolute(n) ? n : (n.indexOf("/") !== 0 && (t = window.location.pathname,
    r = t.slice(0, t.lastIndexOf("/") + 1),
    n = r + n),
    i = Roblox.Endpoints.Urls[n.toLowerCase()],
    i === undefined) ? (u = window.location.protocol + "//" + window.location.hostname,
    u + n) : i
}
,
function() {
    function n(n) {
        return typeof n != "string" && (n = ""),
        n.replace(/'/g, "").replace(/[^a-zA-Z0-9]+/g, "-").replace(/^-+|-+$/g, "") || "unnamed"
    }
    Roblox.Endpoints.getCatalogItemUrl = function(t, i) {
        return Roblox.Endpoints.getAbsoluteUrl("/catalog/" + t + "/" + n(i))
    }
    ,
    Roblox.Endpoints.getBadgeDetailsUrl = function(t, i) {
        return Roblox.Endpoints.getAbsoluteUrl("/badges/" + t + "/" + n(i))
    }
}(),
$.ajaxPrefilter(Roblox.Endpoints.ajaxPrefilter);
;Roblox = Roblox || {},
Roblox.DeviceFeatureDetection = function() {
    function i() {
        !t.hasClass("in-studio") && ("ontouchstart"in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0) && (n = !0,
        t.addClass("touch"))
    }
    var n = !1
      , t = $(".container-main");
    return i(),
    {
        isTouch: n
    }
}();
;"use strict";
Roblox = Roblox || {},
Roblox.LazyLoad = function() {
    function n(n) {
        if (n) {
            var t = n.attr("data-delaysrc");
            typeof t != "undefined" && n.attr("src", t).addClass("src-replaced")
        }
    }
    function u() {
        window.addEventListener("load", function() {
            $(t + ", " + i).each(function() {
                n($(this))
            })
        }, !1)
    }
    function f() {
        $(r).one("click touchstart", function() {
            var t = $("#iframe-login:not('.src-replaced')");
            n(t)
        })
    }
    function e() {
        u(),
        f()
    }
    var t = "img[data-delaysrc]"
      , i = "iframe[data-delaysrc]:not('.src-replaced')"
      , r = "#head-login, #header-login";
    $(document).ready(function() {
        e()
    })
}();
;var Roblox = Roblox || {};
Roblox.UrlParser = function() {
    var n = function(n, t) {
        var f, r, u, e, i;
        if (typeof t == "undefined" ? t = !0 : t === !1 && (n = n.toLowerCase()),
        f = decodeURIComponent(window.location.search.substring(1)),
        r = f && f.split("&"),
        !r)
            return null;
        for (u = 0; u < r.length; u++)
            if (e = r[u],
            i = e && e.split("="),
            t === !1 && (i[0] = i[0].toLowerCase()),
            i && i.length > 1 && i[0] === n)
                return i[1];
        return null
    }
      , t = function(n, t, i) {
        var r = new RegExp("([?&])" + t + "=.*?(&|$)","i")
          , u = n.indexOf("?") !== -1 ? "&" : "?";
        return n.match(r) ? n.replace(r, "$1" + t + "=" + i + "$2") : n + u + t + "=" + i
    };
    return {
        getParameterValueByName: n,
        addOrUpdateQueryStringParameter: t
    }
}();
;"use strict";
var Roblox = Roblox || {};
Roblox.TouchMovementSensitivity = function() {
    function n(n, t) {
        return /touch/.test(n.type) ? (n.originalEvent || n).changedTouches[0][t] : n[t]
    }
    function r(r) {
        var o, s, u = 0, f = 0, e = 20;
        $(".container-main").on("touchstart", r, function(r) {
            o = n(r, t),
            s = n(r, i)
        }).on("touchmove", function(r) {
            u = Math.max(u, Math.abs(n(r, t) - o)),
            f = Math.max(f, Math.abs(n(r, i) - s))
        }).on("touchend", function(r) {
            var h = n(r, t)
              , c = n(r, i);
            Math.abs(h - o) < e && Math.abs(c - s) < e && u < e && f < e && (r.preventDefault(),
            r.target.click()),
            u = 0,
            f = 0
        })
    }
    var t = "clientX"
      , i = "clientY";
    return {
        improveTouchHandling: r
    }
}(),
$(function() {
    Roblox.TouchMovementSensitivity.improveTouchHandling(".game-card-container"),
    Roblox.TouchMovementSensitivity.improveTouchHandling(".VisitButton a")
});
;var Roblox = Roblox || {};
Roblox.SubmitButton = function() {
    function s() {
        $(e).each(function(n, r) {
            var u = $(r), f = u.data(i), s;
            if (f && typeof f == "object") {
                var l = u.data(o) === "true"
                  , a = h(u, f, l)
                  , e = c(u, a);
                u.on(t, e);
                s = u.data(i) !== "false",
                e(null, s)
            }
        })
    }
    function h(i, r, u) {
        return function(f) {
            var l = i.data(n) === "true", o, s, e, h, c;
            if (!l) {
                f.preventDefault();
                return
            }
            if (o = !1,
            r) {
                for (s = r.object.split("."),
                e = window[s[0]],
                h = 1; h < s.length; h++)
                    e = e[s[h]];
                if (e && (c = e[r.func],
                typeof c == "function"))
                    try {
                        c(),
                        o = !0
                    } catch (f) {
                        o = !1
                    }
            }
            !u && o && i.trigger(t, !1)
        }
    }
    function c(t, i) {
        return function(e, o) {
            if (o) {
                t.data(n, "true"),
                t.addClass(r).removeClass(u).removeClass(f);
                t.on("click", i)
            } else
                t.addClass(u).addClass(f).removeClass(r),
                t.data(n, "false"),
                t.off("click")
        }
    }
    var e = ".submit-button"
      , n = "clickable"
      , o = "allow-multi-click"
      , i = "callback"
      , r = "btn-primary"
      , u = "btn-disabled-primary"
      , f = "disabled"
      , t = "Roblox.SubmitButton.toggleButton";
    return {
        init: s,
        submitToggleEvent: t
    }
}(),
$(function() {
    Roblox.SubmitButton.init()
});
;typeof Roblox == "undefined" && (Roblox = {}),
Roblox.XsrfToken = function() {
    function f(t) {
        n = t
    }
    function e() {
        return n
    }
    var r = ["POST", "PUT", "DELETE", "PATCH"], n = "", t = "X-CSRF-TOKEN", u = 403, i;
    return $(document).ajaxSend(function(t, i, u) {
        n !== "" && r.indexOf(u.type.toUpperCase()) >= 0 && i.setRequestHeader("X-CSRF-TOKEN", n)
    }),
    $.ajaxPrefilter(function(i, r, f) {
        if (i.dataType != "jsonp" && i.dataType != "script" && n !== "") {
            r.error && (r._error = r.error),
            i.error = $.noop();
            var e = $.Deferred();
            return f.done(e.resolve),
            f.fail(function() {
                var o = Array.prototype.slice.call(arguments), i;
                if (f.status == u && f.getResponseHeader(t) != null) {
                    if (i = f.getResponseHeader(t),
                    i == null) {
                        e.rejectWith(f, o);
                        return
                    }
                    n = i,
                    $.ajax(r).then(e.resolve, e.reject)
                } else
                    r._error && e.fail(r._error),
                    e.rejectWith(f, o)
            }),
            e.promise(f)
        }
    }),
    i = {
        setToken: f,
        getToken: e
    }
}();
;typeof Roblox == "undefined" && (Roblox = {}),
typeof Roblox.DeveloperConsoleWarning == "undefined" && (Roblox.DeveloperConsoleWarning = function() {
    var n = "\n      _______      _________      _____       ______     _\n     / _____ \\    |____ ____|    / ___ \\     | ____ \\   | |\n    / /     \\_\\       | |       / /   \\ \\    | |   \\ \\  | |\n    | |               | |      / /     \\ \\   | |   | |  | |\n    \\ \\______         | |      | |     | |   | |___/ /  | |\n     \\______ \\        | |      | |     | |   |  ____/   | |\n            \\ \\       | |      | |     | |   | |        | |\n     _      | |       | |      \\ \\     / /   | |        |_|\n    \\ \\_____/ /       | |       \\ \\___/ /    | |         _\n     \\_______/        |_|        \\_____/     |_|        |_|\n\n     Keep your account safe! Do not send any information from\n     here to anyone or paste any text here.\n\n     If someone is asking you to copy or paste text here then\n     you're giving someone access to your account, your gear,\n     and your Robux.\n\n     To learn more about keeping your account safe you can go to\n\n     https://en.help.roblox.com/hc/en-us/articles/203313380-Account-Security-Theft-Keeping-your-Account-Safe-"
      , t = function() {
        typeof console != "undefined" && typeof console.log != "undefined" && console.log(n)
    };
    return {
        showWarning: t
    }
}());
;!function(a) {
    "function" == typeof define && define.amd ? define(["jquery"], a) : "object" == typeof exports ? module.exports = a : a(jQuery)
}(function(a) {
    function b(b) {
        var g = b || window.event
          , h = i.call(arguments, 1)
          , j = 0
          , l = 0
          , m = 0
          , n = 0
          , o = 0
          , p = 0;
        if (b = a.event.fix(g),
        b.type = "mousewheel",
        "detail"in g && (m = -1 * g.detail),
        "wheelDelta"in g && (m = g.wheelDelta),
        "wheelDeltaY"in g && (m = g.wheelDeltaY),
        "wheelDeltaX"in g && (l = -1 * g.wheelDeltaX),
        "axis"in g && g.axis === g.HORIZONTAL_AXIS && (l = -1 * m,
        m = 0),
        j = 0 === m ? l : m,
        "deltaY"in g && (m = -1 * g.deltaY,
        j = m),
        "deltaX"in g && (l = g.deltaX,
        0 === m && (j = -1 * l)),
        0 !== m || 0 !== l) {
            if (1 === g.deltaMode) {
                var q = a.data(this, "mousewheel-line-height");
                j *= q,
                m *= q,
                l *= q
            } else if (2 === g.deltaMode) {
                var r = a.data(this, "mousewheel-page-height");
                j *= r,
                m *= r,
                l *= r
            }
            if (n = Math.max(Math.abs(m), Math.abs(l)),
            (!f || f > n) && (f = n,
            d(g, n) && (f /= 40)),
            d(g, n) && (j /= 40,
            l /= 40,
            m /= 40),
            j = Math[j >= 1 ? "floor" : "ceil"](j / f),
            l = Math[l >= 1 ? "floor" : "ceil"](l / f),
            m = Math[m >= 1 ? "floor" : "ceil"](m / f),
            k.settings.normalizeOffset && this.getBoundingClientRect) {
                var s = this.getBoundingClientRect();
                o = b.clientX - s.left,
                p = b.clientY - s.top
            }
            return b.deltaX = l,
            b.deltaY = m,
            b.deltaFactor = f,
            b.offsetX = o,
            b.offsetY = p,
            b.deltaMode = 0,
            h.unshift(b, j, l, m),
            e && clearTimeout(e),
            e = setTimeout(c, 200),
            (a.event.dispatch || a.event.handle).apply(this, h)
        }
    }
    function c() {
        f = null
    }
    function d(a, b) {
        return k.settings.adjustOldDeltas && "mousewheel" === a.type && b % 120 === 0
    }
    var e, f, g = ["wheel", "mousewheel", "DOMMouseScroll", "MozMousePixelScroll"], h = "onwheel"in document || document.documentMode >= 9 ? ["wheel"] : ["mousewheel", "DomMouseScroll", "MozMousePixelScroll"], i = Array.prototype.slice;
    if (a.event.fixHooks)
        for (var j = g.length; j; )
            a.event.fixHooks[g[--j]] = a.event.mouseHooks;
    var k = a.event.special.mousewheel = {
        version: "3.1.12",
        setup: function() {
            if (this.addEventListener)
                for (var c = h.length; c; )
                    this.addEventListener(h[--c], b, !1);
            else
                this.onmousewheel = b;
            a.data(this, "mousewheel-line-height", k.getLineHeight(this)),
            a.data(this, "mousewheel-page-height", k.getPageHeight(this))
        },
        teardown: function() {
            if (this.removeEventListener)
                for (var c = h.length; c; )
                    this.removeEventListener(h[--c], b, !1);
            else
                this.onmousewheel = null;
            a.removeData(this, "mousewheel-line-height"),
            a.removeData(this, "mousewheel-page-height")
        },
        getLineHeight: function(b) {
            var c = a(b)
              , d = c["offsetParent"in a.fn ? "offsetParent" : "parent"]();
            return d.length || (d = a("body")),
            parseInt(d.css("fontSize"), 10) || parseInt(c.css("fontSize"), 10) || 16
        },
        getPageHeight: function(b) {
            return a(b).height()
        },
        settings: {
            adjustOldDeltas: !0,
            normalizeOffset: !0
        }
    };
    a.fn.extend({
        mousewheel: function(a) {
            return a ? this.bind("mousewheel", a) : this.trigger("mousewheel")
        },
        unmousewheel: function(a) {
            return this.unbind("mousewheel", a)
        }
    })
});
!function(e) {
    "undefined" != typeof module && module.exports ? module.exports = e : e(jQuery, window, document)
}(function(e) {
    !function(t) {
        var o = "function" == typeof define && define.amd
          , a = "undefined" != typeof module && module.exports
          , n = "https:" == document.location.protocol ? "https:" : "http:"
          , i = "cdnjs.cloudflare.com/ajax/libs/jquery-mousewheel/3.1.12/jquery.mousewheel.min.js";
        o || (a ? require("jquery-mousewheel")(e) : e.event.special.mousewheel || e("head").append(decodeURI("%3Cscript src=" + n + "//" + i + "%3E%3C/script%3E"))),
        t()
    }(function() {
        var t, o = "mCustomScrollbar", a = "mCS", n = ".mCustomScrollbar", i = {
            setTop: 0,
            setLeft: 0,
            axis: "y",
            scrollbarPosition: "inside",
            scrollInertia: 950,
            autoDraggerLength: !0,
            alwaysShowScrollbar: 0,
            snapOffset: 0,
            mouseWheel: {
                enable: !0,
                scrollAmount: "auto",
                axis: "y",
                deltaFactor: "auto",
                disableOver: ["select", "option", "keygen", "datalist", "textarea"]
            },
            scrollButtons: {
                scrollType: "stepless",
                scrollAmount: "auto"
            },
            keyboard: {
                enable: !0,
                scrollType: "stepless",
                scrollAmount: "auto"
            },
            contentTouchScroll: 25,
            advanced: {
                autoScrollOnFocus: "input,textarea,select,button,datalist,keygen,a[tabindex],area,object,[contenteditable='true']",
                updateOnContentResize: !0,
                updateOnImageLoad: "auto",
                autoUpdateTimeout: 60
            },
            theme: "light",
            callbacks: {
                onTotalScrollOffset: 0,
                onTotalScrollBackOffset: 0,
                alwaysTriggerOffsets: !0
            }
        }, r = 0, l = {}, s = window.attachEvent && !window.addEventListener ? 1 : 0, c = !1, d = ["mCSB_dragger_onDrag", "mCSB_scrollTools_onDrag", "mCS_img_loaded", "mCS_disabled", "mCS_destroyed", "mCS_no_scrollbar", "mCS-autoHide", "mCS-dir-rtl", "mCS_no_scrollbar_y", "mCS_no_scrollbar_x", "mCS_y_hidden", "mCS_x_hidden", "mCSB_draggerContainer", "mCSB_buttonUp", "mCSB_buttonDown", "mCSB_buttonLeft", "mCSB_buttonRight"], u = {
            init: function(t) {
                var t = e.extend(!0, {}, i, t)
                  , o = f.call(this);
                if (t.live) {
                    var s = t.liveSelector || this.selector || n
                      , c = e(s);
                    if ("off" === t.live)
                        return void m(s);
                    l[s] = setTimeout(function() {
                        c.mCustomScrollbar(t),
                        "once" === t.live && c.length && m(s)
                    }, 500)
                } else
                    m(s);
                return t.setWidth = t.set_width ? t.set_width : t.setWidth,
                t.setHeight = t.set_height ? t.set_height : t.setHeight,
                t.axis = t.horizontalScroll ? "x" : p(t.axis),
                t.scrollInertia = t.scrollInertia > 0 && t.scrollInertia < 17 ? 17 : t.scrollInertia,
                "object" != typeof t.mouseWheel && 1 == t.mouseWheel && (t.mouseWheel = {
                    enable: !0,
                    scrollAmount: "auto",
                    axis: "y",
                    preventDefault: !1,
                    deltaFactor: "auto",
                    normalizeDelta: !1,
                    invert: !1
                }),
                t.mouseWheel.scrollAmount = t.mouseWheelPixels ? t.mouseWheelPixels : t.mouseWheel.scrollAmount,
                t.mouseWheel.normalizeDelta = t.advanced.normalizeMouseWheelDelta ? t.advanced.normalizeMouseWheelDelta : t.mouseWheel.normalizeDelta,
                t.scrollButtons.scrollType = g(t.scrollButtons.scrollType),
                h(t),
                e(o).each(function() {
                    var o = e(this);
                    if (!o.data(a)) {
                        o.data(a, {
                            idx: ++r,
                            opt: t,
                            scrollRatio: {
                                y: null,
                                x: null
                            },
                            overflowed: null,
                            contentReset: {
                                y: null,
                                x: null
                            },
                            bindEvents: !1,
                            tweenRunning: !1,
                            sequential: {},
                            langDir: o.css("direction"),
                            cbOffsets: null,
                            trigger: null,
                            poll: {
                                size: {
                                    o: 0,
                                    n: 0
                                },
                                img: {
                                    o: 0,
                                    n: 0
                                },
                                change: {
                                    o: 0,
                                    n: 0
                                }
                            }
                        });
                        var n = o.data(a)
                          , i = n.opt
                          , l = o.data("mcs-axis")
                          , s = o.data("mcs-scrollbar-position")
                          , c = o.data("mcs-theme");
                        l && (i.axis = l),
                        s && (i.scrollbarPosition = s),
                        c && (i.theme = c,
                        h(i)),
                        v.call(this),
                        n && i.callbacks.onCreate && "function" == typeof i.callbacks.onCreate && i.callbacks.onCreate.call(this),
                        e("#mCSB_" + n.idx + "_container img:not(." + d[2] + ")").addClass(d[2]),
                        u.update.call(null, o)
                    }
                })
            },
            update: function(t, o) {
                var n = t || f.call(this);
                return e(n).each(function() {
                    var t = e(this);
                    if (t.data(a)) {
                        var n = t.data(a)
                          , i = n.opt
                          , r = e("#mCSB_" + n.idx + "_container")
                          , l = e("#mCSB_" + n.idx)
                          , s = [e("#mCSB_" + n.idx + "_dragger_vertical"), e("#mCSB_" + n.idx + "_dragger_horizontal")];
                        if (!r.length)
                            return;
                        n.tweenRunning && N(t),
                        o && n && i.callbacks.onBeforeUpdate && "function" == typeof i.callbacks.onBeforeUpdate && i.callbacks.onBeforeUpdate.call(this),
                        t.hasClass(d[3]) && t.removeClass(d[3]),
                        t.hasClass(d[4]) && t.removeClass(d[4]),
                        l.height() !== t.height() && l.css("max-height", t.height()),
                        _.call(this),
                        "y" === i.axis || i.advanced.autoExpandHorizontalScroll || r.css("width", x(r)),
                        n.overflowed = y.call(this),
                        M.call(this),
                        i.autoDraggerLength && S.call(this),
                        b.call(this),
                        T.call(this);
                        var c = [Math.abs(r[0].offsetTop), Math.abs(r[0].offsetLeft)];
                        "x" !== i.axis && (n.overflowed[0] ? s[0].height() > s[0].parent().height() ? B.call(this) : (V(t, c[0].toString(), {
                            dir: "y",
                            dur: 0,
                            overwrite: "none"
                        }),
                        n.contentReset.y = null) : (B.call(this),
                        "y" === i.axis ? k.call(this) : "yx" === i.axis && n.overflowed[1] && V(t, c[1].toString(), {
                            dir: "x",
                            dur: 0,
                            overwrite: "none"
                        }))),
                        "y" !== i.axis && (n.overflowed[1] ? s[1].width() > s[1].parent().width() ? B.call(this) : (V(t, c[1].toString(), {
                            dir: "x",
                            dur: 0,
                            overwrite: "none"
                        }),
                        n.contentReset.x = null) : (B.call(this),
                        "x" === i.axis ? k.call(this) : "yx" === i.axis && n.overflowed[0] && V(t, c[0].toString(), {
                            dir: "y",
                            dur: 0,
                            overwrite: "none"
                        }))),
                        o && n && (2 === o && i.callbacks.onImageLoad && "function" == typeof i.callbacks.onImageLoad ? i.callbacks.onImageLoad.call(this) : 3 === o && i.callbacks.onSelectorChange && "function" == typeof i.callbacks.onSelectorChange ? i.callbacks.onSelectorChange.call(this) : i.callbacks.onUpdate && "function" == typeof i.callbacks.onUpdate && i.callbacks.onUpdate.call(this)),
                        j.call(this)
                    }
                })
            },
            scrollTo: function(t, o) {
                if ("undefined" != typeof t && null != t) {
                    var n = f.call(this);
                    return e(n).each(function() {
                        var n = e(this);
                        if (n.data(a)) {
                            var i = n.data(a)
                              , r = i.opt
                              , l = {
                                trigger: "external",
                                scrollInertia: r.scrollInertia,
                                scrollEasing: "mcsEaseInOut",
                                moveDragger: !1,
                                timeout: 60,
                                callbacks: !0,
                                onStart: !0,
                                onUpdate: !0,
                                onComplete: !0
                            }
                              , s = e.extend(!0, {}, l, o)
                              , c = q.call(this, t)
                              , d = s.scrollInertia > 0 && s.scrollInertia < 17 ? 17 : s.scrollInertia;
                            c[0] = Y.call(this, c[0], "y"),
                            c[1] = Y.call(this, c[1], "x"),
                            s.moveDragger && (c[0] *= i.scrollRatio.y,
                            c[1] *= i.scrollRatio.x),
                            s.dur = d,
                            setTimeout(function() {
                                null !== c[0] && "undefined" != typeof c[0] && "x" !== r.axis && i.overflowed[0] && (s.dir = "y",
                                s.overwrite = "all",
                                V(n, c[0].toString(), s)),
                                null !== c[1] && "undefined" != typeof c[1] && "y" !== r.axis && i.overflowed[1] && (s.dir = "x",
                                s.overwrite = "none",
                                V(n, c[1].toString(), s))
                            }, s.timeout)
                        }
                    })
                }
            },
            stop: function() {
                var t = f.call(this);
                return e(t).each(function() {
                    var t = e(this);
                    t.data(a) && N(t)
                })
            },
            disable: function(t) {
                var o = f.call(this);
                return e(o).each(function() {
                    var o = e(this);
                    if (o.data(a)) {
                        {
                            o.data(a)
                        }
                        j.call(this, "remove"),
                        k.call(this),
                        t && B.call(this),
                        M.call(this, !0),
                        o.addClass(d[3])
                    }
                })
            },
            destroy: function() {
                var t = f.call(this);
                return e(t).each(function() {
                    var n = e(this);
                    if (n.data(a)) {
                        var i = n.data(a)
                          , r = i.opt
                          , l = e("#mCSB_" + i.idx)
                          , s = e("#mCSB_" + i.idx + "_container")
                          , c = e(".mCSB_" + i.idx + "_scrollbar");
                        r.live && m(r.liveSelector || e(t).selector),
                        j.call(this, "remove"),
                        k.call(this),
                        B.call(this),
                        n.removeData(a),
                        K(this, "mcs"),
                        c.remove(),
                        s.find("img." + d[2]).removeClass(d[2]),
                        l.replaceWith(s.contents()),
                        n.removeClass(o + " _" + a + "_" + i.idx + " " + d[6] + " " + d[7] + " " + d[5] + " " + d[3]).addClass(d[4])
                    }
                })
            }
        }, f = function() {
            return "object" != typeof e(this) || e(this).length < 1 ? n : this
        }, h = function(t) {
            var o = ["rounded", "rounded-dark", "rounded-dots", "rounded-dots-dark"]
              , a = ["rounded-dots", "rounded-dots-dark", "3d", "3d-dark", "3d-thick", "3d-thick-dark", "inset", "inset-dark", "inset-2", "inset-2-dark", "inset-3", "inset-3-dark"]
              , n = ["minimal", "minimal-dark"]
              , i = ["minimal", "minimal-dark"]
              , r = ["minimal", "minimal-dark"];
            t.autoDraggerLength = e.inArray(t.theme, o) > -1 ? !1 : t.autoDraggerLength,
            t.autoExpandScrollbar = e.inArray(t.theme, a) > -1 ? !1 : t.autoExpandScrollbar,
            t.scrollButtons.enable = e.inArray(t.theme, n) > -1 ? !1 : t.scrollButtons.enable,
            t.autoHideScrollbar = e.inArray(t.theme, i) > -1 ? !0 : t.autoHideScrollbar,
            t.scrollbarPosition = e.inArray(t.theme, r) > -1 ? "outside" : t.scrollbarPosition
        }, m = function(e) {
            l[e] && (clearTimeout(l[e]),
            K(l, e))
        }, p = function(e) {
            return "yx" === e || "xy" === e || "auto" === e ? "yx" : "x" === e || "horizontal" === e ? "x" : "y"
        }, g = function(e) {
            return "stepped" === e || "pixels" === e || "step" === e || "click" === e ? "stepped" : "stepless"
        }, v = function() {
            var t = e(this)
              , n = t.data(a)
              , i = n.opt
              , r = i.autoExpandScrollbar ? " " + d[1] + "_expand" : ""
              , l = ["<div id='mCSB_" + n.idx + "_scrollbar_vertical' class='mCSB_scrollTools mCSB_" + n.idx + "_scrollbar mCS-" + i.theme + " mCSB_scrollTools_vertical" + r + "'><div class='" + d[12] + "'><div id='mCSB_" + n.idx + "_dragger_vertical' class='mCSB_dragger' style='position:absolute;' oncontextmenu='return false;'><div class='mCSB_dragger_bar' /></div><div class='mCSB_draggerRail' /></div></div>", "<div id='mCSB_" + n.idx + "_scrollbar_horizontal' class='mCSB_scrollTools mCSB_" + n.idx + "_scrollbar mCS-" + i.theme + " mCSB_scrollTools_horizontal" + r + "'><div class='" + d[12] + "'><div id='mCSB_" + n.idx + "_dragger_horizontal' class='mCSB_dragger' style='position:absolute;' oncontextmenu='return false;'><div class='mCSB_dragger_bar' /></div><div class='mCSB_draggerRail' /></div></div>"]
              , s = "yx" === i.axis ? "mCSB_vertical_horizontal" : "x" === i.axis ? "mCSB_horizontal" : "mCSB_vertical"
              , c = "yx" === i.axis ? l[0] + l[1] : "x" === i.axis ? l[1] : l[0]
              , u = "yx" === i.axis ? "<div id='mCSB_" + n.idx + "_container_wrapper' class='mCSB_container_wrapper' />" : ""
              , f = i.autoHideScrollbar ? " " + d[6] : ""
              , h = "x" !== i.axis && "rtl" === n.langDir ? " " + d[7] : "";
            i.setWidth && t.css("width", i.setWidth),
            i.setHeight && t.css("height", i.setHeight),
            i.setLeft = "y" !== i.axis && "rtl" === n.langDir ? "989999px" : i.setLeft,
            t.addClass(o + " _" + a + "_" + n.idx + f + h).wrapInner("<div id='mCSB_" + n.idx + "' class='mCustomScrollBox mCS-" + i.theme + " " + s + "'><div id='mCSB_" + n.idx + "_container' class='mCSB_container' style='position:relative; top:" + i.setTop + "; left:" + i.setLeft + ";' dir=" + n.langDir + " /></div>");
            var m = e("#mCSB_" + n.idx)
              , p = e("#mCSB_" + n.idx + "_container");
            "y" === i.axis || i.advanced.autoExpandHorizontalScroll || p.css("width", x(p)),
            "outside" === i.scrollbarPosition ? ("static" === t.css("position") && t.css("position", "relative"),
            t.css("overflow", "visible"),
            m.addClass("mCSB_outside").after(c)) : (m.addClass("mCSB_inside").append(c),
            p.wrap(u)),
            w.call(this);
            var g = [e("#mCSB_" + n.idx + "_dragger_vertical"), e("#mCSB_" + n.idx + "_dragger_horizontal")];
            g[0].css("min-height", g[0].height()),
            g[1].css("min-width", g[1].width())
        }, x = function(t) {
            var o = [t[0].scrollWidth, Math.max.apply(Math, t.children().map(function() {
                return e(this).outerWidth(!0)
            }).get())]
              , a = t.parent().width();
            return o[0] > a ? o[0] : o[1] > a ? o[1] : "100%"
        }, _ = function() {
            var t = e(this)
              , o = t.data(a)
              , n = o.opt
              , i = e("#mCSB_" + o.idx + "_container");
            if (n.advanced.autoExpandHorizontalScroll && "y" !== n.axis) {
                i.css({
                    width: "auto",
                    "min-width": 0,
                    "overflow-x": "scroll"
                });
                var r = Math.ceil(i[0].scrollWidth);
                3 === n.advanced.autoExpandHorizontalScroll || 2 !== n.advanced.autoExpandHorizontalScroll && r > i.parent().width() ? i.css({
                    width: r,
                    "min-width": "100%",
                    "overflow-x": "inherit"
                }) : i.css({
                    "overflow-x": "inherit",
                    position: "absolute"
                }).wrap("<div class='mCSB_h_wrapper' style='position:relative; left:0; width:999999px;' />").css({
                    width: Math.ceil(i[0].getBoundingClientRect().right + .4) - Math.floor(i[0].getBoundingClientRect().left),
                    "min-width": "100%",
                    position: "relative"
                }).unwrap()
            }
        }, w = function() {
            var t = e(this)
              , o = t.data(a)
              , n = o.opt
              , i = e(".mCSB_" + o.idx + "_scrollbar:first")
              , r = ee(n.scrollButtons.tabindex) ? "tabindex='" + n.scrollButtons.tabindex + "'" : ""
              , l = ["<a href='#' class='" + d[13] + "' oncontextmenu='return false;' " + r + " />", "<a href='#' class='" + d[14] + "' oncontextmenu='return false;' " + r + " />", "<a href='#' class='" + d[15] + "' oncontextmenu='return false;' " + r + " />", "<a href='#' class='" + d[16] + "' oncontextmenu='return false;' " + r + " />"]
              , s = ["x" === n.axis ? l[2] : l[0], "x" === n.axis ? l[3] : l[1], l[2], l[3]];
            n.scrollButtons.enable && i.prepend(s[0]).append(s[1]).next(".mCSB_scrollTools").prepend(s[2]).append(s[3])
        }, S = function() {
            var t = e(this)
              , o = t.data(a)
              , n = e("#mCSB_" + o.idx)
              , i = e("#mCSB_" + o.idx + "_container")
              , r = [e("#mCSB_" + o.idx + "_dragger_vertical"), e("#mCSB_" + o.idx + "_dragger_horizontal")]
              , l = [n.height() / i.outerHeight(!1), n.width() / i.outerWidth(!1)]
              , c = [parseInt(r[0].css("min-height")), Math.round(l[0] * r[0].parent().height()), parseInt(r[1].css("min-width")), Math.round(l[1] * r[1].parent().width())]
              , d = s && c[1] < c[0] ? c[0] : c[1]
              , u = s && c[3] < c[2] ? c[2] : c[3];
            r[0].css({
                height: d,
                "max-height": r[0].parent().height() - 10
            }).find(".mCSB_dragger_bar").css({
                "line-height": c[0] + "px"
            }),
            r[1].css({
                width: u,
                "max-width": r[1].parent().width() - 10
            })
        }, b = function() {
            var t = e(this)
              , o = t.data(a)
              , n = e("#mCSB_" + o.idx)
              , i = e("#mCSB_" + o.idx + "_container")
              , r = [e("#mCSB_" + o.idx + "_dragger_vertical"), e("#mCSB_" + o.idx + "_dragger_horizontal")]
              , l = [i.outerHeight(!1) - n.height(), i.outerWidth(!1) - n.width()]
              , s = [l[0] / (r[0].parent().height() - r[0].height()), l[1] / (r[1].parent().width() - r[1].width())];
            o.scrollRatio = {
                y: s[0],
                x: s[1]
            }
        }, C = function(e, t, o) {
            var a = o ? d[0] + "_expanded" : ""
              , n = e.closest(".mCSB_scrollTools");
            "active" === t ? (e.toggleClass(d[0] + " " + a),
            n.toggleClass(d[1]),
            e[0]._draggable = e[0]._draggable ? 0 : 1) : e[0]._draggable || ("hide" === t ? (e.removeClass(d[0]),
            n.removeClass(d[1])) : (e.addClass(d[0]),
            n.addClass(d[1])))
        }, y = function() {
            var t = e(this)
              , o = t.data(a)
              , n = e("#mCSB_" + o.idx)
              , i = e("#mCSB_" + o.idx + "_container")
              , r = null == o.overflowed ? i.height() : i.outerHeight(!1)
              , l = null == o.overflowed ? i.width() : i.outerWidth(!1)
              , s = i[0].scrollHeight
              , c = i[0].scrollWidth;
            return s > r && (r = s),
            c > l && (l = c),
            [r > n.height(), l > n.width()]
        }, B = function() {
            var t = e(this)
              , o = t.data(a)
              , n = o.opt
              , i = e("#mCSB_" + o.idx)
              , r = e("#mCSB_" + o.idx + "_container")
              , l = [e("#mCSB_" + o.idx + "_dragger_vertical"), e("#mCSB_" + o.idx + "_dragger_horizontal")];
            if (N(t),
            ("x" !== n.axis && !o.overflowed[0] || "y" === n.axis && o.overflowed[0]) && (l[0].add(r).css("top", 0),
            V(t, "_resetY")),
            "y" !== n.axis && !o.overflowed[1] || "x" === n.axis && o.overflowed[1]) {
                var s = dx = 0;
                "rtl" === o.langDir && (s = i.width() - r.outerWidth(!1),
                dx = Math.abs(s / o.scrollRatio.x)),
                r.css("left", s),
                l[1].css("left", dx),
                V(t, "_resetX")
            }
        }, T = function() {
            function t() {
                r = setTimeout(function() {
                    e.event.special.mousewheel ? (clearTimeout(r),
                    E.call(o[0])) : t()
                }, 100)
            }
            var o = e(this)
              , n = o.data(a)
              , i = n.opt;
            if (!n.bindEvents) {
                if (I.call(this),
                i.contentTouchScroll && R.call(this),
                D.call(this),
                i.mouseWheel.enable) {
                    var r;
                    t()
                }
                z.call(this),
                P.call(this),
                i.advanced.autoScrollOnFocus && A.call(this),
                i.scrollButtons.enable && H.call(this),
                i.keyboard.enable && U.call(this),
                n.bindEvents = !0
            }
        }, k = function() {
            var t = e(this)
              , o = t.data(a)
              , n = o.opt
              , i = a + "_" + o.idx
              , r = ".mCSB_" + o.idx + "_scrollbar"
              , l = e("#mCSB_" + o.idx + ",#mCSB_" + o.idx + "_container,#mCSB_" + o.idx + "_container_wrapper," + r + " ." + d[12] + ",#mCSB_" + o.idx + "_dragger_vertical,#mCSB_" + o.idx + "_dragger_horizontal," + r + ">a")
              , s = e("#mCSB_" + o.idx + "_container");
            n.advanced.releaseDraggableSelectors && l.add(e(n.advanced.releaseDraggableSelectors)),
            o.bindEvents && (e(document).unbind("." + i),
            l.each(function() {
                e(this).unbind("." + i)
            }),
            clearTimeout(t[0]._focusTimeout),
            K(t[0], "_focusTimeout"),
            clearTimeout(o.sequential.step),
            K(o.sequential, "step"),
            clearTimeout(s[0].onCompleteTimeout),
            K(s[0], "onCompleteTimeout"),
            o.bindEvents = !1)
        }, M = function(t) {
            var o = e(this)
              , n = o.data(a)
              , i = n.opt
              , r = e("#mCSB_" + n.idx + "_container_wrapper")
              , l = r.length ? r : e("#mCSB_" + n.idx + "_container")
              , s = [e("#mCSB_" + n.idx + "_scrollbar_vertical"), e("#mCSB_" + n.idx + "_scrollbar_horizontal")]
              , c = [s[0].find(".mCSB_dragger"), s[1].find(".mCSB_dragger")];
            "x" !== i.axis && (n.overflowed[0] && !t ? (s[0].add(c[0]).add(s[0].children("a")).css("display", "block"),
            l.removeClass(d[8] + " " + d[10])) : (i.alwaysShowScrollbar ? (2 !== i.alwaysShowScrollbar && c[0].css("display", "none"),
            l.removeClass(d[10])) : (s[0].css("display", "none"),
            l.addClass(d[10])),
            l.addClass(d[8]))),
            "y" !== i.axis && (n.overflowed[1] && !t ? (s[1].add(c[1]).add(s[1].children("a")).css("display", "block"),
            l.removeClass(d[9] + " " + d[11])) : (i.alwaysShowScrollbar ? (2 !== i.alwaysShowScrollbar && c[1].css("display", "none"),
            l.removeClass(d[11])) : (s[1].css("display", "none"),
            l.addClass(d[11])),
            l.addClass(d[9]))),
            n.overflowed[0] || n.overflowed[1] ? o.removeClass(d[5]) : o.addClass(d[5])
        }, O = function(e) {
            var t = e.type;
            switch (t) {
            case "pointerdown":
            case "MSPointerDown":
            case "pointermove":
            case "MSPointerMove":
            case "pointerup":
            case "MSPointerUp":
                return e.target.ownerDocument !== document ? [e.originalEvent.screenY, e.originalEvent.screenX, !1] : [e.originalEvent.pageY, e.originalEvent.pageX, !1];
            case "touchstart":
            case "touchmove":
            case "touchend":
                var o = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0]
                  , a = e.originalEvent.touches.length || e.originalEvent.changedTouches.length;
                return e.target.ownerDocument !== document ? [o.screenY, o.screenX, a > 1] : [o.pageY, o.pageX, a > 1];
            default:
                return [e.pageY, e.pageX, !1]
            }
        }, I = function() {
            function t(e) {
                var t = m.find("iframe");
                if (t.length) {
                    var o = e ? "auto" : "none";
                    t.css("pointer-events", o)
                }
            }
            function o(e, t, o, a) {
                if (m[0].idleTimer = u.scrollInertia < 233 ? 250 : 0,
                n.attr("id") === h[1])
                    var i = "x"
                      , r = (n[0].offsetLeft - t + a) * d.scrollRatio.x;
                else
                    var i = "y"
                      , r = (n[0].offsetTop - e + o) * d.scrollRatio.y;
                V(l, r.toString(), {
                    dir: i,
                    drag: !0
                })
            }
            var n, i, r, l = e(this), d = l.data(a), u = d.opt, f = a + "_" + d.idx, h = ["mCSB_" + d.idx + "_dragger_vertical", "mCSB_" + d.idx + "_dragger_horizontal"], m = e("#mCSB_" + d.idx + "_container"), p = e("#" + h[0] + ",#" + h[1]), g = u.advanced.releaseDraggableSelectors ? p.add(e(u.advanced.releaseDraggableSelectors)) : p;
            p.bind("mousedown." + f + " touchstart." + f + " pointerdown." + f + " MSPointerDown." + f, function(o) {
                if (o.stopImmediatePropagation(),
                o.preventDefault(),
                Z(o)) {
                    c = !0,
                    s && (document.onselectstart = function() {
                        return !1
                    }
                    ),
                    t(!1),
                    N(l),
                    n = e(this);
                    var a = n.offset()
                      , d = O(o)[0] - a.top
                      , f = O(o)[1] - a.left
                      , h = n.height() + a.top
                      , m = n.width() + a.left;
                    h > d && d > 0 && m > f && f > 0 && (i = d,
                    r = f),
                    C(n, "active", u.autoExpandScrollbar)
                }
            }).bind("touchmove." + f, function(e) {
                e.stopImmediatePropagation(),
                e.preventDefault();
                var t = n.offset()
                  , a = O(e)[0] - t.top
                  , l = O(e)[1] - t.left;
                o(i, r, a, l)
            }),
            e(document).bind("mousemove." + f + " pointermove." + f + " MSPointerMove." + f, function(e) {
                if (n) {
                    var t = n.offset()
                      , a = O(e)[0] - t.top
                      , l = O(e)[1] - t.left;
                    if (i === a)
                        return;
                    o(i, r, a, l)
                }
            }).add(g).bind("mouseup." + f + " touchend." + f + " pointerup." + f + " MSPointerUp." + f, function(e) {
                n && (C(n, "active", u.autoExpandScrollbar),
                n = null),
                c = !1,
                s && (document.onselectstart = null),
                t(!0)
            })
        }, R = function() {
            function o(e) {
                if (!$(e) || c || O(e)[2])
                    return void (t = 0);
                t = 1,
                b = 0,
                C = 0,
                d = 1,
                y.removeClass("mCS_touch_action");
                var o = I.offset();
                u = O(e)[0] - o.top,
                f = O(e)[1] - o.left,
                A = [O(e)[0], O(e)[1]]
            }
            function n(e) {
                if ($(e) && !c && !O(e)[2] && (e.stopImmediatePropagation(),
                (!C || b) && d)) {
                    g = G();
                    var t = M.offset()
                      , o = O(e)[0] - t.top
                      , a = O(e)[1] - t.left
                      , n = "mcsLinearOut";
                    if (D.push(o),
                    E.push(a),
                    A[2] = Math.abs(O(e)[0] - A[0]),
                    A[3] = Math.abs(O(e)[1] - A[1]),
                    B.overflowed[0])
                        var i = R[0].parent().height() - R[0].height()
                          , r = u - o > 0 && o - u > -(i * B.scrollRatio.y) && (2 * A[3] < A[2] || "yx" === T.axis);
                    if (B.overflowed[1])
                        var l = R[1].parent().width() - R[1].width()
                          , h = f - a > 0 && a - f > -(l * B.scrollRatio.x) && (2 * A[2] < A[3] || "yx" === T.axis);
                    r || h ? (U || e.preventDefault(),
                    b = 1) : (C = 1,
                    y.addClass("mCS_touch_action")),
                    U && e.preventDefault(),
                    w = "yx" === T.axis ? [u - o, f - a] : "x" === T.axis ? [null, f - a] : [u - o, null],
                    I[0].idleTimer = 250,
                    B.overflowed[0] && s(w[0], L, n, "y", "all", !0),
                    B.overflowed[1] && s(w[1], L, n, "x", z, !0)
                }
            }
            function i(e) {
                if (!$(e) || c || O(e)[2])
                    return void (t = 0);
                t = 1,
                e.stopImmediatePropagation(),
                N(y),
                p = G();
                var o = M.offset();
                h = O(e)[0] - o.top,
                m = O(e)[1] - o.left,
                D = [],
                E = []
            }
            function r(e) {
                if ($(e) && !c && !O(e)[2]) {
                    d = 0,
                    e.stopImmediatePropagation(),
                    b = 0,
                    C = 0,
                    v = G();
                    var t = M.offset()
                      , o = O(e)[0] - t.top
                      , a = O(e)[1] - t.left;
                    if (!(v - g > 30)) {
                        _ = 1e3 / (v - p);
                        var n = "mcsEaseOut"
                          , i = 2.5 > _
                          , r = i ? [D[D.length - 2], E[E.length - 2]] : [0, 0];
                        x = i ? [o - r[0], a - r[1]] : [o - h, a - m];
                        var u = [Math.abs(x[0]), Math.abs(x[1])];
                        _ = i ? [Math.abs(x[0] / 4), Math.abs(x[1] / 4)] : [_, _];
                        var f = [Math.abs(I[0].offsetTop) - x[0] * l(u[0] / _[0], _[0]), Math.abs(I[0].offsetLeft) - x[1] * l(u[1] / _[1], _[1])];
                        w = "yx" === T.axis ? [f[0], f[1]] : "x" === T.axis ? [null, f[1]] : [f[0], null],
                        S = [4 * u[0] + T.scrollInertia, 4 * u[1] + T.scrollInertia];
                        var y = parseInt(T.contentTouchScroll) || 0;
                        w[0] = u[0] > y ? w[0] : 0,
                        w[1] = u[1] > y ? w[1] : 0,
                        B.overflowed[0] && s(w[0], S[0], n, "y", z, !1),
                        B.overflowed[1] && s(w[1], S[1], n, "x", z, !1)
                    }
                }
            }
            function l(e, t) {
                var o = [1.5 * t, 2 * t, t / 1.5, t / 2];
                return e > 90 ? t > 4 ? o[0] : o[3] : e > 60 ? t > 3 ? o[3] : o[2] : e > 30 ? t > 8 ? o[1] : t > 6 ? o[0] : t > 4 ? t : o[2] : t > 8 ? t : o[3]
            }
            function s(e, t, o, a, n, i) {
                e && V(y, e.toString(), {
                    dur: t,
                    scrollEasing: o,
                    dir: a,
                    overwrite: n,
                    drag: i
                })
            }
            var d, u, f, h, m, p, g, v, x, _, w, S, b, C, y = e(this), B = y.data(a), T = B.opt, k = a + "_" + B.idx, M = e("#mCSB_" + B.idx), I = e("#mCSB_" + B.idx + "_container"), R = [e("#mCSB_" + B.idx + "_dragger_vertical"), e("#mCSB_" + B.idx + "_dragger_horizontal")], D = [], E = [], L = 0, z = "yx" === T.axis ? "none" : "all", A = [], P = I.find("iframe"), H = ["touchstart." + k + " pointerdown." + k + " MSPointerDown." + k, "touchmove." + k + " pointermove." + k + " MSPointerMove." + k, "touchend." + k + " pointerup." + k + " MSPointerUp." + k], U = void 0 !== document.body.style.touchAction;
            I.bind(H[0], function(e) {
                o(e)
            }).bind(H[1], function(e) {
                n(e)
            }),
            M.bind(H[0], function(e) {
                i(e)
            }).bind(H[2], function(e) {
                r(e)
            }),
            P.length && P.each(function() {
                e(this).load(function() {
                    W(this) && e(this.contentDocument || this.contentWindow.document).bind(H[0], function(e) {
                        o(e),
                        i(e)
                    }).bind(H[1], function(e) {
                        n(e)
                    }).bind(H[2], function(e) {
                        r(e)
                    })
                })
            })
        }, D = function() {
            function o() {
                return window.getSelection ? window.getSelection().toString() : document.selection && "Control" != document.selection.type ? document.selection.createRange().text : 0
            }
            function n(e, t, o) {
                d.type = o && i ? "stepped" : "stepless",
                d.scrollAmount = 10,
                F(r, e, t, "mcsLinearOut", o ? 60 : null)
            }
            var i, r = e(this), l = r.data(a), s = l.opt, d = l.sequential, u = a + "_" + l.idx, f = e("#mCSB_" + l.idx + "_container"), h = f.parent();
            f.bind("mousedown." + u, function(e) {
                t || i || (i = 1,
                c = !0)
            }).add(document).bind("mousemove." + u, function(e) {
                if (!t && i && o()) {
                    var a = f.offset()
                      , r = O(e)[0] - a.top + f[0].offsetTop
                      , c = O(e)[1] - a.left + f[0].offsetLeft;
                    r > 0 && r < h.height() && c > 0 && c < h.width() ? d.step && n("off", null, "stepped") : ("x" !== s.axis && l.overflowed[0] && (0 > r ? n("on", 38) : r > h.height() && n("on", 40)),
                    "y" !== s.axis && l.overflowed[1] && (0 > c ? n("on", 37) : c > h.width() && n("on", 39)))
                }
            }).bind("mouseup." + u + " dragend." + u, function(e) {
                t || (i && (i = 0,
                n("off", null)),
                c = !1)
            })
        }, E = function() {
            function t(t, a) {
                if (N(o),
                !L(o, t.target)) {
                    var r = "auto" !== i.mouseWheel.deltaFactor ? parseInt(i.mouseWheel.deltaFactor) : s && t.deltaFactor < 100 ? 100 : t.deltaFactor || 100;
                    if ("x" === i.axis || "x" === i.mouseWheel.axis)
                        var d = "x"
                          , u = [Math.round(r * n.scrollRatio.x), parseInt(i.mouseWheel.scrollAmount)]
                          , f = "auto" !== i.mouseWheel.scrollAmount ? u[1] : u[0] >= l.width() ? .9 * l.width() : u[0]
                          , h = Math.abs(e("#mCSB_" + n.idx + "_container")[0].offsetLeft)
                          , m = c[1][0].offsetLeft
                          , p = c[1].parent().width() - c[1].width()
                          , g = t.deltaX || t.deltaY || a;
                    else
                        var d = "y"
                          , u = [Math.round(r * n.scrollRatio.y), parseInt(i.mouseWheel.scrollAmount)]
                          , f = "auto" !== i.mouseWheel.scrollAmount ? u[1] : u[0] >= l.height() ? .9 * l.height() : u[0]
                          , h = Math.abs(e("#mCSB_" + n.idx + "_container")[0].offsetTop)
                          , m = c[0][0].offsetTop
                          , p = c[0].parent().height() - c[0].height()
                          , g = t.deltaY || a;
                    "y" === d && !n.overflowed[0] || "x" === d && !n.overflowed[1] || ((i.mouseWheel.invert || t.webkitDirectionInvertedFromDevice) && (g = -g),
                    i.mouseWheel.normalizeDelta && (g = 0 > g ? -1 : 1),
                    (g > 0 && 0 !== m || 0 > g && m !== p || i.mouseWheel.preventDefault) && (t.stopImmediatePropagation(),
                    t.preventDefault()),
                    V(o, (h - g * f).toString(), {
                        dir: d
                    }))
                }
            }
            if (e(this).data(a)) {
                var o = e(this)
                  , n = o.data(a)
                  , i = n.opt
                  , r = a + "_" + n.idx
                  , l = e("#mCSB_" + n.idx)
                  , c = [e("#mCSB_" + n.idx + "_dragger_vertical"), e("#mCSB_" + n.idx + "_dragger_horizontal")]
                  , d = e("#mCSB_" + n.idx + "_container").find("iframe");
                d.length && d.each(function() {
                    e(this).load(function() {
                        W(this) && e(this.contentDocument || this.contentWindow.document).bind("mousewheel." + r, function(e, o) {
                            t(e, o)
                        })
                    })
                }),
                l.bind("mousewheel." + r, function(e, o) {
                    t(e, o)
                })
            }
        }, W = function(e) {
            var t = null;
            try {
                var o = e.contentDocument || e.contentWindow.document;
                t = o.body.innerHTML
            } catch (a) {}
            return null !== t
        }, L = function(t, o) {
            var n = o.nodeName.toLowerCase()
              , i = t.data(a).opt.mouseWheel.disableOver
              , r = ["select", "textarea"];
            return e.inArray(n, i) > -1 && !(e.inArray(n, r) > -1 && !e(o).is(":focus"))
        }, z = function() {
            var t = e(this)
              , o = t.data(a)
              , n = a + "_" + o.idx
              , i = e("#mCSB_" + o.idx + "_container")
              , r = i.parent()
              , l = e(".mCSB_" + o.idx + "_scrollbar ." + d[12]);
            l.bind("touchstart." + n + " pointerdown." + n + " MSPointerDown." + n, function(e) {
                c = !0
            }).bind("touchend." + n + " pointerup." + n + " MSPointerUp." + n, function(e) {
                c = !1
            }).bind("click." + n, function(a) {
                if (e(a.target).hasClass(d[12]) || e(a.target).hasClass("mCSB_draggerRail")) {
                    N(t);
                    var n = e(this)
                      , l = n.find(".mCSB_dragger");
                    if (n.parent(".mCSB_scrollTools_horizontal").length > 0) {
                        if (!o.overflowed[1])
                            return;
                        var s = "x"
                          , c = a.pageX > l.offset().left ? -1 : 1
                          , u = Math.abs(i[0].offsetLeft) - .9 * c * r.width()
                    } else {
                        if (!o.overflowed[0])
                            return;
                        var s = "y"
                          , c = a.pageY > l.offset().top ? -1 : 1
                          , u = Math.abs(i[0].offsetTop) - .9 * c * r.height()
                    }
                    V(t, u.toString(), {
                        dir: s,
                        scrollEasing: "mcsEaseInOut"
                    })
                }
            })
        }, A = function() {
            var t = e(this)
              , o = t.data(a)
              , n = o.opt
              , i = a + "_" + o.idx
              , r = e("#mCSB_" + o.idx + "_container")
              , l = r.parent();
            r.bind("focusin." + i, function(o) {
                var a = e(document.activeElement)
                  , i = r.find(".mCustomScrollBox").length
                  , s = 0;
                a.is(n.advanced.autoScrollOnFocus) && (N(t),
                clearTimeout(t[0]._focusTimeout),
                t[0]._focusTimer = i ? (s + 17) * i : 0,
                t[0]._focusTimeout = setTimeout(function() {
                    var e = [te(a)[0], te(a)[1]]
                      , o = [r[0].offsetTop, r[0].offsetLeft]
                      , i = [o[0] + e[0] >= 0 && o[0] + e[0] < l.height() - a.outerHeight(!1), o[1] + e[1] >= 0 && o[0] + e[1] < l.width() - a.outerWidth(!1)]
                      , c = "yx" !== n.axis || i[0] || i[1] ? "all" : "none";
                    "x" === n.axis || i[0] || V(t, e[0].toString(), {
                        dir: "y",
                        scrollEasing: "mcsEaseInOut",
                        overwrite: c,
                        dur: s
                    }),
                    "y" === n.axis || i[1] || V(t, e[1].toString(), {
                        dir: "x",
                        scrollEasing: "mcsEaseInOut",
                        overwrite: c,
                        dur: s
                    })
                }, t[0]._focusTimer))
            })
        }, P = function() {
            var t = e(this)
              , o = t.data(a)
              , n = a + "_" + o.idx
              , i = e("#mCSB_" + o.idx + "_container").parent();
            i.bind("scroll." + n, function(t) {
                (0 !== i.scrollTop() || 0 !== i.scrollLeft()) && e(".mCSB_" + o.idx + "_scrollbar").css("visibility", "hidden")
            })
        }, H = function() {
            var t = e(this)
              , o = t.data(a)
              , n = o.opt
              , i = o.sequential
              , r = a + "_" + o.idx
              , l = ".mCSB_" + o.idx + "_scrollbar"
              , s = e(l + ">a");
            s.bind("mousedown." + r + " touchstart." + r + " pointerdown." + r + " MSPointerDown." + r + " mouseup." + r + " touchend." + r + " pointerup." + r + " MSPointerUp." + r + " mouseout." + r + " pointerout." + r + " MSPointerOut." + r + " click." + r, function(a) {
                function r(e, o) {
                    i.scrollAmount = n.snapAmount || n.scrollButtons.scrollAmount,
                    F(t, e, o)
                }
                if (a.preventDefault(),
                Z(a)) {
                    var l = e(this).attr("class");
                    switch (i.type = n.scrollButtons.scrollType,
                    a.type) {
                    case "mousedown":
                    case "touchstart":
                    case "pointerdown":
                    case "MSPointerDown":
                        if ("stepped" === i.type)
                            return;
                        c = !0,
                        o.tweenRunning = !1,
                        r("on", l);
                        break;
                    case "mouseup":
                    case "touchend":
                    case "pointerup":
                    case "MSPointerUp":
                    case "mouseout":
                    case "pointerout":
                    case "MSPointerOut":
                        if ("stepped" === i.type)
                            return;
                        c = !1,
                        i.dir && r("off", l);
                        break;
                    case "click":
                        if ("stepped" !== i.type || o.tweenRunning)
                            return;
                        r("on", l)
                    }
                }
            })
        }, U = function() {
            function t(t) {
                function a(e, t) {
                    r.type = i.keyboard.scrollType,
                    r.scrollAmount = i.snapAmount || i.keyboard.scrollAmount,
                    "stepped" === r.type && n.tweenRunning || F(o, e, t)
                }
                switch (t.type) {
                case "blur":
                    n.tweenRunning && r.dir && a("off", null);
                    break;
                case "keydown":
                case "keyup":
                    var l = t.keyCode ? t.keyCode : t.which
                      , s = "on";
                    if ("x" !== i.axis && (38 === l || 40 === l) || "y" !== i.axis && (37 === l || 39 === l)) {
                        if ((38 === l || 40 === l) && !n.overflowed[0] || (37 === l || 39 === l) && !n.overflowed[1])
                            return;
                        "keyup" === t.type && (s = "off"),
                        e(document.activeElement).is(u) || (t.preventDefault(),
                        t.stopImmediatePropagation(),
                        a(s, l))
                    } else if (33 === l || 34 === l) {
                        if ((n.overflowed[0] || n.overflowed[1]) && (t.preventDefault(),
                        t.stopImmediatePropagation()),
                        "keyup" === t.type) {
                            N(o);
                            var f = 34 === l ? -1 : 1;
                            if ("x" === i.axis || "yx" === i.axis && n.overflowed[1] && !n.overflowed[0])
                                var h = "x"
                                  , m = Math.abs(c[0].offsetLeft) - .9 * f * d.width();
                            else
                                var h = "y"
                                  , m = Math.abs(c[0].offsetTop) - .9 * f * d.height();
                            V(o, m.toString(), {
                                dir: h,
                                scrollEasing: "mcsEaseInOut"
                            })
                        }
                    } else if ((35 === l || 36 === l) && !e(document.activeElement).is(u) && ((n.overflowed[0] || n.overflowed[1]) && (t.preventDefault(),
                    t.stopImmediatePropagation()),
                    "keyup" === t.type)) {
                        if ("x" === i.axis || "yx" === i.axis && n.overflowed[1] && !n.overflowed[0])
                            var h = "x"
                              , m = 35 === l ? Math.abs(d.width() - c.outerWidth(!1)) : 0;
                        else
                            var h = "y"
                              , m = 35 === l ? Math.abs(d.height() - c.outerHeight(!1)) : 0;
                        V(o, m.toString(), {
                            dir: h,
                            scrollEasing: "mcsEaseInOut"
                        })
                    }
                }
            }
            var o = e(this)
              , n = o.data(a)
              , i = n.opt
              , r = n.sequential
              , l = a + "_" + n.idx
              , s = e("#mCSB_" + n.idx)
              , c = e("#mCSB_" + n.idx + "_container")
              , d = c.parent()
              , u = "input,textarea,select,datalist,keygen,[contenteditable='true']"
              , f = c.find("iframe")
              , h = ["blur." + l + " keydown." + l + " keyup." + l];
            f.length && f.each(function() {
                e(this).load(function() {
                    W(this) && e(this.contentDocument || this.contentWindow.document).bind(h[0], function(e) {
                        t(e)
                    })
                })
            }),
            s.attr("tabindex", "0").bind(h[0], function(e) {
                t(e)
            })
        }, F = function(t, o, n, i, r) {
            function l(e) {
                var o = "stepped" !== f.type
                  , a = r ? r : e ? o ? p / 1.5 : g : 1e3 / 60
                  , n = e ? o ? 7.5 : 40 : 2.5
                  , s = [Math.abs(h[0].offsetTop), Math.abs(h[0].offsetLeft)]
                  , d = [c.scrollRatio.y > 10 ? 10 : c.scrollRatio.y, c.scrollRatio.x > 10 ? 10 : c.scrollRatio.x]
                  , u = "x" === f.dir[0] ? s[1] + f.dir[1] * d[1] * n : s[0] + f.dir[1] * d[0] * n
                  , m = "x" === f.dir[0] ? s[1] + f.dir[1] * parseInt(f.scrollAmount) : s[0] + f.dir[1] * parseInt(f.scrollAmount)
                  , v = "auto" !== f.scrollAmount ? m : u
                  , x = i ? i : e ? o ? "mcsLinearOut" : "mcsEaseInOut" : "mcsLinear"
                  , _ = e ? !0 : !1;
                return e && 17 > a && (v = "x" === f.dir[0] ? s[1] : s[0]),
                V(t, v.toString(), {
                    dir: f.dir[0],
                    scrollEasing: x,
                    dur: a,
                    onComplete: _
                }),
                e ? void (f.dir = !1) : (clearTimeout(f.step),
                void (f.step = setTimeout(function() {
                    l()
                }, a)))
            }
            function s() {
                clearTimeout(f.step),
                K(f, "step"),
                N(t)
            }
            var c = t.data(a)
              , u = c.opt
              , f = c.sequential
              , h = e("#mCSB_" + c.idx + "_container")
              , m = "stepped" === f.type ? !0 : !1
              , p = u.scrollInertia < 26 ? 26 : u.scrollInertia
              , g = u.scrollInertia < 1 ? 17 : u.scrollInertia;
            switch (o) {
            case "on":
                if (f.dir = [n === d[16] || n === d[15] || 39 === n || 37 === n ? "x" : "y", n === d[13] || n === d[15] || 38 === n || 37 === n ? -1 : 1],
                N(t),
                ee(n) && "stepped" === f.type)
                    return;
                l(m);
                break;
            case "off":
                s(),
                (m || c.tweenRunning && f.dir) && l(!0)
            }
        }, q = function(t) {
            var o = e(this).data(a).opt
              , n = [];
            return "function" == typeof t && (t = t()),
            t instanceof Array ? n = t.length > 1 ? [t[0], t[1]] : "x" === o.axis ? [null, t[0]] : [t[0], null] : (n[0] = t.y ? t.y : t.x || "x" === o.axis ? null : t,
            n[1] = t.x ? t.x : t.y || "y" === o.axis ? null : t),
            "function" == typeof n[0] && (n[0] = n[0]()),
            "function" == typeof n[1] && (n[1] = n[1]()),
            n
        }, Y = function(t, o) {
            if (null != t && "undefined" != typeof t) {
                var n = e(this)
                  , i = n.data(a)
                  , r = i.opt
                  , l = e("#mCSB_" + i.idx + "_container")
                  , s = l.parent()
                  , c = typeof t;
                o || (o = "x" === r.axis ? "x" : "y");
                var d = "x" === o ? l.outerWidth(!1) : l.outerHeight(!1)
                  , f = "x" === o ? l[0].offsetLeft : l[0].offsetTop
                  , h = "x" === o ? "left" : "top";
                switch (c) {
                case "function":
                    return t();
                case "object":
                    var m = t.jquery ? t : e(t);
                    if (!m.length)
                        return;
                    return "x" === o ? te(m)[1] : te(m)[0];
                case "string":
                case "number":
                    if (ee(t))
                        return Math.abs(t);
                    if (-1 !== t.indexOf("%"))
                        return Math.abs(d * parseInt(t) / 100);
                    if (-1 !== t.indexOf("-="))
                        return Math.abs(f - parseInt(t.split("-=")[1]));
                    if (-1 !== t.indexOf("+=")) {
                        var p = f + parseInt(t.split("+=")[1]);
                        return p >= 0 ? 0 : Math.abs(p)
                    }
                    if (-1 !== t.indexOf("px") && ee(t.split("px")[0]))
                        return Math.abs(t.split("px")[0]);
                    if ("top" === t || "left" === t)
                        return 0;
                    if ("bottom" === t)
                        return Math.abs(s.height() - l.outerHeight(!1));
                    if ("right" === t)
                        return Math.abs(s.width() - l.outerWidth(!1));
                    if ("first" === t || "last" === t) {
                        var m = l.find(":" + t);
                        return "x" === o ? te(m)[1] : te(m)[0]
                    }
                    return e(t).length ? "x" === o ? te(e(t))[1] : te(e(t))[0] : (l.css(h, t),
                    void u.update.call(null, n[0]))
                }
            }
        }, j = function(t) {
            function o() {
                return clearTimeout(f[0].autoUpdate),
                0 === l.parents("html").length ? void (l = null) : void (f[0].autoUpdate = setTimeout(function() {
                    return c.advanced.updateOnSelectorChange && (s.poll.change.n = i(),
                    s.poll.change.n !== s.poll.change.o) ? (s.poll.change.o = s.poll.change.n,
                    void r(3)) : c.advanced.updateOnContentResize && (s.poll.size.n = l[0].scrollHeight + l[0].scrollWidth + f[0].offsetHeight + l[0].offsetHeight,
                    s.poll.size.n !== s.poll.size.o) ? (s.poll.size.o = s.poll.size.n,
                    void r(1)) : !c.advanced.updateOnImageLoad || "auto" === c.advanced.updateOnImageLoad && "y" === c.axis || (s.poll.img.n = f.find("img").length,
                    s.poll.img.n === s.poll.img.o) ? void ((c.advanced.updateOnSelectorChange || c.advanced.updateOnContentResize || c.advanced.updateOnImageLoad) && o()) : (s.poll.img.o = s.poll.img.n,
                    void f.find("img").each(function() {
                        n(this)
                    }))
                }, c.advanced.autoUpdateTimeout))
            }
            function n(t) {
                function o(e, t) {
                    return function() {
                        return t.apply(e, arguments)
                    }
                }
                function a() {
                    this.onload = null,
                    e(t).addClass(d[2]),
                    r(2)
                }
                if (e(t).hasClass(d[2]))
                    return void r();
                var n = new Image;
                n.onload = o(n, a),
                n.src = t.src
            }
            function i() {
                c.advanced.updateOnSelectorChange === !0 && (c.advanced.updateOnSelectorChange = "*");
                var e = 0
                  , t = f.find(c.advanced.updateOnSelectorChange);
                return c.advanced.updateOnSelectorChange && t.length > 0 && t.each(function() {
                    e += this.offsetHeight + this.offsetWidth
                }),
                e
            }
            function r(e) {
                clearTimeout(f[0].autoUpdate),
                u.update.call(null, l[0], e)
            }
            var l = e(this)
              , s = l.data(a)
              , c = s.opt
              , f = e("#mCSB_" + s.idx + "_container");
            return t ? (clearTimeout(f[0].autoUpdate),
            void K(f[0], "autoUpdate")) : void o()
        }, X = function(e, t, o) {
            return Math.round(e / t) * t - o
        }, N = function(t) {
            var o = t.data(a)
              , n = e("#mCSB_" + o.idx + "_container,#mCSB_" + o.idx + "_container_wrapper,#mCSB_" + o.idx + "_dragger_vertical,#mCSB_" + o.idx + "_dragger_horizontal");
            n.each(function() {
                J.call(this)
            })
        }, V = function(t, o, n) {
            function i(e) {
                return s && c.callbacks[e] && "function" == typeof c.callbacks[e]
            }
            function r() {
                return [c.callbacks.alwaysTriggerOffsets || _ >= w[0] + b, c.callbacks.alwaysTriggerOffsets || -y >= _]
            }
            function l() {
                var e = [h[0].offsetTop, h[0].offsetLeft]
                  , o = [v[0].offsetTop, v[0].offsetLeft]
                  , a = [h.outerHeight(!1), h.outerWidth(!1)]
                  , i = [f.height(), f.width()];
                t[0].mcs = {
                    content: h,
                    top: e[0],
                    left: e[1],
                    draggerTop: o[0],
                    draggerLeft: o[1],
                    topPct: Math.round(100 * Math.abs(e[0]) / (Math.abs(a[0]) - i[0])),
                    leftPct: Math.round(100 * Math.abs(e[1]) / (Math.abs(a[1]) - i[1])),
                    direction: n.dir
                }
            }
            var s = t.data(a)
              , c = s.opt
              , d = {
                trigger: "internal",
                dir: "y",
                scrollEasing: "mcsEaseOut",
                drag: !1,
                dur: c.scrollInertia,
                overwrite: "all",
                callbacks: !0,
                onStart: !0,
                onUpdate: !0,
                onComplete: !0
            }
              , n = e.extend(d, n)
              , u = [n.dur, n.drag ? 0 : n.dur]
              , f = e("#mCSB_" + s.idx)
              , h = e("#mCSB_" + s.idx + "_container")
              , m = h.parent()
              , p = c.callbacks.onTotalScrollOffset ? q.call(t, c.callbacks.onTotalScrollOffset) : [0, 0]
              , g = c.callbacks.onTotalScrollBackOffset ? q.call(t, c.callbacks.onTotalScrollBackOffset) : [0, 0];
            if (s.trigger = n.trigger,
            (0 !== m.scrollTop() || 0 !== m.scrollLeft()) && (e(".mCSB_" + s.idx + "_scrollbar").css("visibility", "visible"),
            m.scrollTop(0).scrollLeft(0)),
            "_resetY" !== o || s.contentReset.y || (i("onOverflowYNone") && c.callbacks.onOverflowYNone.call(t[0]),
            s.contentReset.y = 1),
            "_resetX" !== o || s.contentReset.x || (i("onOverflowXNone") && c.callbacks.onOverflowXNone.call(t[0]),
            s.contentReset.x = 1),
            "_resetY" !== o && "_resetX" !== o) {
                switch (!s.contentReset.y && t[0].mcs || !s.overflowed[0] || (i("onOverflowY") && c.callbacks.onOverflowY.call(t[0]),
                s.contentReset.x = null),
                !s.contentReset.x && t[0].mcs || !s.overflowed[1] || (i("onOverflowX") && c.callbacks.onOverflowX.call(t[0]),
                s.contentReset.x = null),
                c.snapAmount && (o = X(o, c.snapAmount, c.snapOffset)),
                n.dir) {
                case "x":
                    var v = e("#mCSB_" + s.idx + "_dragger_horizontal")
                      , x = "left"
                      , _ = h[0].offsetLeft
                      , w = [f.width() - h.outerWidth(!1), v.parent().width() - v.width()]
                      , S = [o, 0 === o ? 0 : o / s.scrollRatio.x]
                      , b = p[1]
                      , y = g[1]
                      , B = b > 0 ? b / s.scrollRatio.x : 0
                      , T = y > 0 ? y / s.scrollRatio.x : 0;
                    break;
                case "y":
                    var v = e("#mCSB_" + s.idx + "_dragger_vertical")
                      , x = "top"
                      , _ = h[0].offsetTop
                      , w = [f.height() - h.outerHeight(!1), v.parent().height() - v.height()]
                      , S = [o, 0 === o ? 0 : o / s.scrollRatio.y]
                      , b = p[0]
                      , y = g[0]
                      , B = b > 0 ? b / s.scrollRatio.y : 0
                      , T = y > 0 ? y / s.scrollRatio.y : 0
                }
                S[1] < 0 || 0 === S[0] && 0 === S[1] ? S = [0, 0] : S[1] >= w[1] ? S = [w[0], w[1]] : S[0] = -S[0],
                t[0].mcs || (l(),
                i("onInit") && c.callbacks.onInit.call(t[0])),
                clearTimeout(h[0].onCompleteTimeout),
                (s.tweenRunning || !(0 === _ && S[0] >= 0 || _ === w[0] && S[0] <= w[0])) && (Q(v[0], x, Math.round(S[1]), u[1], n.scrollEasing),
                Q(h[0], x, Math.round(S[0]), u[0], n.scrollEasing, n.overwrite, {
                    onStart: function() {
                        n.callbacks && n.onStart && !s.tweenRunning && (i("onScrollStart") && (l(),
                        c.callbacks.onScrollStart.call(t[0])),
                        s.tweenRunning = !0,
                        C(v),
                        s.cbOffsets = r())
                    },
                    onUpdate: function() {
                        n.callbacks && n.onUpdate && i("whileScrolling") && (l(),
                        c.callbacks.whileScrolling.call(t[0]))
                    },
                    onComplete: function() {
                        if (n.callbacks && n.onComplete) {
                            "yx" === c.axis && clearTimeout(h[0].onCompleteTimeout);
                            var e = h[0].idleTimer || 0;
                            h[0].onCompleteTimeout = setTimeout(function() {
                                i("onScroll") && (l(),
                                c.callbacks.onScroll.call(t[0])),
                                i("onTotalScroll") && S[1] >= w[1] - B && s.cbOffsets[0] && (l(),
                                c.callbacks.onTotalScroll.call(t[0])),
                                i("onTotalScrollBack") && S[1] <= T && s.cbOffsets[1] && (l(),
                                c.callbacks.onTotalScrollBack.call(t[0])),
                                s.tweenRunning = !1,
                                h[0].idleTimer = 0,
                                C(v, "hide")
                            }, e)
                        }
                    }
                }))
            }
        }, Q = function(e, t, o, a, n, i, r) {
            function l() {
                S.stop || (x || m.call(),
                x = G() - v,
                s(),
                x >= S.time && (S.time = x > S.time ? x + f - (x - S.time) : x + f - 1,
                S.time < x + 1 && (S.time = x + 1)),
                S.time < a ? S.id = h(l) : g.call())
            }
            function s() {
                a > 0 ? (S.currVal = u(S.time, _, b, a, n),
                w[t] = Math.round(S.currVal) + "px") : w[t] = o + "px",
                p.call()
            }
            function c() {
                f = 1e3 / 60,
                S.time = x + f,
                h = window.requestAnimationFrame ? window.requestAnimationFrame : function(e) {
                    return s(),
                    setTimeout(e, .01)
                }
                ,
                S.id = h(l)
            }
            function d() {
                null != S.id && (window.requestAnimationFrame ? window.cancelAnimationFrame(S.id) : clearTimeout(S.id),
                S.id = null)
            }
            function u(e, t, o, a, n) {
                switch (n) {
                case "linear":
                case "mcsLinear":
                    return o * e / a + t;
                case "mcsLinearOut":
                    return e /= a,
                    e--,
                    o * Math.sqrt(1 - e * e) + t;
                case "easeInOutSmooth":
                    return e /= a / 2,
                    1 > e ? o / 2 * e * e + t : (e--,
                    -o / 2 * (e * (e - 2) - 1) + t);
                case "easeInOutStrong":
                    return e /= a / 2,
                    1 > e ? o / 2 * Math.pow(2, 10 * (e - 1)) + t : (e--,
                    o / 2 * (-Math.pow(2, -10 * e) + 2) + t);
                case "easeInOut":
                case "mcsEaseInOut":
                    return e /= a / 2,
                    1 > e ? o / 2 * e * e * e + t : (e -= 2,
                    o / 2 * (e * e * e + 2) + t);
                case "easeOutSmooth":
                    return e /= a,
                    e--,
                    -o * (e * e * e * e - 1) + t;
                case "easeOutStrong":
                    return o * (-Math.pow(2, -10 * e / a) + 1) + t;
                case "easeOut":
                case "mcsEaseOut":
                default:
                    var i = (e /= a) * e
                      , r = i * e;
                    return t + o * (.499999999999997 * r * i + -2.5 * i * i + 5.5 * r + -6.5 * i + 4 * e)
                }
            }
            e._mTween || (e._mTween = {
                top: {},
                left: {}
            });
            var f, h, r = r || {}, m = r.onStart || function() {}
            , p = r.onUpdate || function() {}
            , g = r.onComplete || function() {}
            , v = G(), x = 0, _ = e.offsetTop, w = e.style, S = e._mTween[t];
            "left" === t && (_ = e.offsetLeft);
            var b = o - _;
            S.stop = 0,
            "none" !== i && d(),
            c()
        }, G = function() {
            return window.performance && window.performance.now ? window.performance.now() : window.performance && window.performance.webkitNow ? window.performance.webkitNow() : Date.now ? Date.now() : (new Date).getTime()
        }, J = function() {
            var e = this;
            e._mTween || (e._mTween = {
                top: {},
                left: {}
            });
            for (var t = ["top", "left"], o = 0; o < t.length; o++) {
                var a = t[o];
                e._mTween[a].id && (window.requestAnimationFrame ? window.cancelAnimationFrame(e._mTween[a].id) : clearTimeout(e._mTween[a].id),
                e._mTween[a].id = null,
                e._mTween[a].stop = 1)
            }
        }, K = function(e, t) {
            try {
                delete e[t]
            } catch (o) {
                e[t] = null
            }
        }, Z = function(e) {
            return !(e.which && 1 !== e.which)
        }, $ = function(e) {
            var t = e.originalEvent.pointerType;
            return !(t && "touch" !== t && 2 !== t)
        }, ee = function(e) {
            return !isNaN(parseFloat(e)) && isFinite(e)
        }, te = function(e) {
            var t = e.parents(".mCSB_container");
            return [e.offset().top - t.offset().top, e.offset().left - t.offset().left]
        };
        e.fn[o] = function(t) {
            return u[t] ? u[t].apply(this, Array.prototype.slice.call(arguments, 1)) : "object" != typeof t && t ? void e.error("Method " + t + " does not exist") : u.init.apply(this, arguments)
        }
        ,
        e[o] = function(t) {
            return u[t] ? u[t].apply(this, Array.prototype.slice.call(arguments, 1)) : "object" != typeof t && t ? void e.error("Method " + t + " does not exist") : u.init.apply(this, arguments)
        }
        ,
        e[o].defaults = i,
        window[o] = !0,
        e(window).load(function() {
            e(n)[o](),
            e.extend(e.expr[":"], {
                mcsInView: e.expr[":"].mcsInView || function(t) {
                    var o, a, n = e(t), i = n.parents(".mCSB_container");
                    if (i.length)
                        return o = i.parent(),
                        a = [i[0].offsetTop, i[0].offsetLeft],
                        a[0] + te(n)[0] >= 0 && a[0] + te(n)[0] < o.height() - n.outerHeight(!1) && a[1] + te(n)[1] >= 0 && a[1] + te(n)[1] < o.width() - n.outerWidth(!1)
                }
                ,
                mcsOverflow: e.expr[":"].mcsOverflow || function(t) {
                    var o = e(t).data(a);
                    if (o)
                        return o.overflowed[0] || o.overflowed[1]
                }
            })
        })
    })
});
;var Roblox = Roblox || {};
Roblox.Navigation = function() {
    "use strict";
    function n(n, t) {
        n.attr("href", t.Url),
        n.attr("data-count", t.TotalCount);
        var i = n.find(".notification-blue");
        i.html(t.DiaplayCount),
        i.attr("title", t.TotalCount),
        t.TotalCount > 0 ? i.removeClass("hide") : i.addClass("hide")
    }
    function i(n) {
        var i = $("#navbar-robux")
          , t = i.find("#nav-robux-icon");
        n.HasError && (t.children().wrapAll("<span id='nav-robux-error' data-toggle='tooltip' data-original-title='" + n.ErrorMessage + "' data-placement='bottom'></span>"),
        t.find("#nav-robux-error").tooltip()),
        t.find("#nav-robux-amount").text(n.RobuxText),
        $(".dropdown-menu #nav-robux-balance").text(n.RobuxMessage)
    }
    function r() {
        var t = Roblox.Endpoints.getAbsoluteUrl("/navigation/userData");
        $.ajax({
            url: t,
            success: function(t) {
                var o = t.FriendUserDataModel, s = $("#nav-friends"), u, f, r, e;
                n(s, o),
                u = t.MessageUserDataModel,
                f = $("#nav-message"),
                n(f, u),
                i(t.CurrencyBalancesDisplay),
                r = t.TradeUserDataModel,
                r && (e = $("#nav-trade"),
                n(e, r))
            }
        })
    }
    function t() {
        var t = "/navigation/friendRequestData";
        $.ajax({
            cache: !1,
            url: t,
            success: function(t) {
                var i = $("#nav-friends");
                n(i, t)
            }
        })
    }
    function u() {
        var t = Roblox.websiteLinks.GetMyUnreadMessagesCountLink;
        $.ajax({
            url: t,
            success: function(t) {
                var i = $("#nav-message");
                n(i, t)
            }
        })
    }
    function f() {
        if (Roblox && Roblox.RealTime) {
            var n = Roblox.RealTime.Factory.GetClient();
            n.Subscribe("FriendshipNotifications", function(n) {
                switch (n.Type) {
                case "FriendshipCreated":
                case "FriendshipDestroyed":
                case "FriendshipDeclined":
                case "FriendshipRequested":
                    t()
                }
            })
        }
    }
    function e() {
        var n = $("#header")
          , i = n && n.data("isauthenticated");
        if (i) {
            n && f();
            $(document).on("Roblox.Friends.CountChanged", function() {
                t()
            });
            $(document).on("Roblox.Messages.CountChanged", function() {
                u()
            });
            r()
        }
    }
    return {
        init: e
    }
}(),
$(function() {
    "use strict";
    function o(n) {
        var i = $('[data-behavior="univeral-search"] .rbx-navbar-search-option')
          , t = -1;
        $.each(i, function(n, i) {
            $(i).hasClass("selected") && ($(i).removeClass("selected"),
            t = n)
        }),
        t += n.which === 38 ? i.length - 1 : 1,
        t %= i.length,
        $(i[t]).addClass("selected")
    }
    var i = 1, u, f;
    $('[data-behavior="nav-notification"]').click(function() {
        $('[data-behavior="left-col"]').toggleClass("nav-show", 100)
    });
    var t = $("#navbar-universal-search")
      , n = $("#navbar-universal-search #navbar-search-input")
      , r = $("#navbar-universal-search .rbx-navbar-search-option")
      , e = $("#navbar-universal-search #navbar-search-btn");
    n.on("keydown", function(n) {
        var t = $(this).val();
        (n.which === 9 || n.which === 38 || n.which === 40) && t.length > 0 && (n.stopPropagation(),
        n.preventDefault(),
        o(n))
    });
    n.on("keyup", function(n) {
        var r = $(this).val(), u, f;
        n.which === 13 ? (n.stopPropagation(),
        n.preventDefault(),
        u = t.find(".rbx-navbar-search-option.selected"),
        f = u.data("searchurl"),
        r.length >= i && (window.location = f + encodeURIComponent(r))) : r.length > 0 ? (t.toggleClass("rbx-navbar-search-open", !0),
        $(".rbx-navbar-search-option").each(function() {
            var n = $(this)
              , t = n.data("searchurl");
            n.find(".rbx-navbar-search-string").text(r),
            n.find(".rbx-navbar-search-anchor").attr("href", t + encodeURIComponent(r))
        })) : t.toggleClass("rbx-navbar-search-open", !1)
    });
    e.click(function(t) {
        t.stopPropagation(),
        t.preventDefault();
        var r = n.val()
          , u = $("#navbar-universal-search .rbx-navbar-search-option.selected")
          , f = u.data("searchurl");
        r.length >= i && (window.location = f + encodeURIComponent(r))
    });
    r.on("touchstart", function(t) {
        var r, u;
        t.stopPropagation(),
        r = n.val(),
        r.length >= i && (u = $(this).data("searchurl"),
        window.location = u + encodeURIComponent(r))
    });
    r.on("mouseover", function() {
        r.removeClass("selected"),
        $(this).addClass("selected")
    });
    n.on("focus", function() {
        var i = n.val();
        i.length > 0 && t.addClass("rbx-navbar-search-open")
    });
    $('[data-toggle="toggle-search"]').on("click touchstart", function(n) {
        return n.stopPropagation(),
        $('[data-behavior="univeral-search"]').toggleClass("show"),
        !1
    });
    $(".rbx-navbar-right").on("click touchstart", '[data-behavior="logout"]', function(n) {
        var i, t;
        n.stopPropagation(),
        n.preventDefault(),
        i = $(this),
        typeof angular == "undefined" || angular.isUndefined(angular.element("#chat-container").scope()) || (t = angular.element("#chat-container").scope(),
        t.$digest(t.$broadcast("Roblox.Chat.destroyChatCookie"))),
        $.post(i.attr("data-bind"), {
            redirectTohome: !1
        }, function() {
            var t = Roblox && Roblox.Endpoints ? Roblox.Endpoints.getAbsoluteUrl("/") : "/";
            window.location.href = t
        })
    });
    $("#nav-robux-icon").on("show.bs.popover", function() {
        $("body").scrollLeft(0)
    });
    u = function(n) {
        var t, i;
        typeof n == "string" && (n.indexOf("resize") != -1 && (t = n.split(","),
        $("#iframe-login").css({
            height: t[1]
        })),
        n.indexOf("fbRegister") != -1 && (t = n.split("^"),
        i = "&fbname=" + encodeURIComponent(t[1]) + "&fbem=" + encodeURIComponent(t[2]) + "&fbdt=" + encodeURIComponent(t[3]),
        window.location.href = "../Login/Default.aspx?iFrameFacebookSync=true" + i))
    }
    ,
    $.receiveMessage && $.receiveMessage(function(n) {
        u(n.data)
    });
    $("body").on("click touchstart", function(n) {
        $('[data-behavior="univeral-search"]').each(function() {
            $(this).is(n.target) || $(this).has(n.target).length !== 0 || $(this).removeClass("rbx-navbar-search-open"),
            $(this).has(n.target).length === 0 && $('[data-toggle="toggle-search"]').has(n.target).length === 0 && $('[data-behavior="univeral-search"]').css("display") === "block" && $('[data-behavior="univeral-search"]').removeClass("show")
        }),
        $(n.target).closest("#login-dropdown").length || $(n.target).is("#login-dropdown") || $(n.target).closest("#head-login").length || $(n.target).is("#head-login") || $("#login-dropdown").hasClass("show") && $("#login-dropdown").removeClass("show")
    });
    f = function() {
        $("#head-login").click(function() {
            $("#login-dropdown").toggleClass("show")
        })
    }
    ,
    f(),
    Roblox.Navigation.init()
});
;var Roblox = Roblox || {};
Roblox.BootstrapWidgets = function() {
    function a() {
        $("#horizontal-tabs a").on("click", function(n) {
            n.preventDefault(),
            $(this).tab("show")
        });
        $("#horizontal-tabs a").on("touchstart", function(n) {
            n.preventDefault(),
            $(this).trigger("click")
        });
        $("#vertical-tabs a").click(function(n) {
            n.preventDefault(),
            $(this).tab("show")
        })
    }
    function tt() {
        $('[data-toggle="dropdown-menu"] li').click(function(n) {
            var t = $(n.currentTarget);
            return t.closest(".input-group-btn").find('[data-bind="label"]').text(t.text()).end().toggleClass("open"),
            t.hasClass("rbx-clickable-li") ? void 0 : !1
        })
    }
    function t(n, t) {
        var i = n.data("expanded-icon") || "icon-up-16x16"
          , r = n.data("collapsed-icon") || "icon-down-16x16"
          , f = t ? i : r
          , u = t ? r : i;
        n.prev(".panel-heading").find("." + u).removeClass(u).addClass(f)
    }
    function nt() {
        $('[data-toggle="collapsible-element"]').on("show.bs.collapse", function(n) {
            t($(n.target), !0)
        });
        $('[data-toggle="collapsible-element"]').on("hide.bs.collapse", function(n) {
            t($(n.target), !1)
        })
    }
    function g(n) {
        $(n).collapse("show")
    }
    function d() {
        if ("ontouchstart"in window)
            $('[data-toggle-mobile="true"]').tooltip({
                placement: "bottom",
                trigger: "manual"
            }).unbind().on("touchstart", function() {
                $(this).tooltip("toggle")
            });
        else
            $('[data-toggle="tooltip"]').tooltip({
                placement: "bottom"
            })
    }
    function k(n, t) {
        $(n).attr("title", t).tooltip("fixTitle")
    }
    function b() {
        $("body").on("click touchstart", function(n) {
            $('[data-toggle="tooltip"]').each(function() {
                if (!$(this).is(n.target) && $(this).has(n.target).length === 0) {
                    var t = n.type === "click" ? !0 : $(".tooltip").has(n.target).length === 0;
                    if (t)
                        try {
                            $(this).tooltip("hide")
                        } catch (n) {
                            return !1
                        }
                }
            })
        })
    }
    function w(n, t, i) {
        n || (n = "bottom"),
        t || (t = {
            selector: "body",
            padding: 4
        }),
        i || (i = "[data-toggle='popover']");
        $(i).popover({
            trigger: "manual",
            html: !0,
            placement: n,
            viewport: t,
            content: function() {
                var n = $(this).attr("data-bind");
                return $('[data-toggle="' + n + '"]').html()
            }
        }).unbind().on("click", function() {
            $(this).popover("toggle")
        })
    }
    function p() {
        $("body").on("click touchstart", function(n) {
            $('[data-toggle="popover"]').each(function() {
                if (!$(this).is(n.target) && $(this).has(n.target).length === 0) {
                    var t = $(".popover").has(n.target).length === 0;
                    n.type === "touchstart" && $(".popover").has(n.target).length > 0 ? t = !0 : n.type === "click" && (t = !0),
                    t && $(this).popover("hide")
                }
            })
        })
    }
    function y() {
        $('[data-toggle="scrollbar"]').mCustomScrollbar({
            autoHideScrollbar: !1,
            autoExpandScrollbar: !1,
            scrollInertia: 0,
            alwaysShowScrollbar: 1,
            mouseWheel: {
                preventDefault: !0
            }
        })
    }
    function v() {
        var n = $('[data-toggle="pagination"]')
          , t = $('[data-toggle="pager"]');
        (n.twbsPagination || t.twbsPagination) && (n.twbsPagination({
            totalPages: 35,
            visiblePages: 7,
            first: 1,
            last: 35,
            prev: '<span class="icon-left"></span>',
            next: '<span class="icon-right"></span>'
        }),
        t.twbsPagination({
            isPager: !0,
            totalPages: 35,
            visiblePages: 7,
            first: '<span class="icon-first-page"></span>',
            last: '<span class="icon-last-page"></span>',
            prev: '<span class="icon-left"></span>',
            next: '<span class="icon-right"></span>'
        }))
    }
    function n(n, t, i, r) {
        if (typeof n != "undefined") {
            var u, f;
            r && (u = n.clone(),
            u.html(r),
            n.after(u),
            f = n.detach()),
            t = typeof t == "undefined" ? 200 : t,
            i = typeof i == "undefined" ? 3e3 : i,
            setTimeout(function() {
                u ? u.addClass("on") : n.addClass("on")
            }, t),
            setTimeout(function() {
                u ? u.removeClass("on") : n.removeClass("on"),
                u && f && (u.after(f),
                u.remove())
            }, i)
        }
    }
    function l() {
        $("#toggle-alert-loading").click(function() {
            n($(".sg-alert-section .alert-loading"), 100, 1e3)
        }),
        $("#toggle-alert-success").click(function() {
            n($(".sg-alert-section .alert-success"), 100, 1e3)
        }),
        $("#toggle-alert-warning").click(function() {
            var n = $(".sg-alert-section .alert-warning"), t;
            setTimeout(function() {
                n.addClass("on")
            }, 100),
            t = $(".alert-system-feedback #close"),
            t.click(function() {
                n.removeClass("on")
            })
        })
    }
    function c() {
        $("input[placeholder]").focus(function() {
            var n = $(this);
            n.val() == n.attr("placeholder") && (n.val(""),
            n.removeClass("rbx-placeholder"))
        }).blur(function() {
            var n = $(this);
            (n.val() == "" || n.val() == n.attr("placeholder")) && (n.addClass("rbx-placeholder"),
            n.val(n.attr("placeholder")))
        })
    }
    function s() {
        h.each(function() {
            var t = $(this)
              , n = $(this).clone().hide().height("auto");
            n.width(t.width()),
            $("body").append(n),
            n.height() <= t.height() && (t.removeClass(i),
            $(this).find(".toggle-para").hide()),
            n.remove()
        })
    }
    function o(n, t) {
        var i = "para-overflow-toggle"
          , r = $("." + i)
          , u = "para-height"
          , f = "para-overflow-page-loading";
        n = n ? n : 24,
        t = t ? t : 5,
        $(".toggle-para").show(),
        r.each(function() {
            var r = $(this), e = $(this).clone().hide().height("auto"), o;
            e.width(r.width()),
            $("body").append(e),
            o = n * t,
            (e.height() <= o || e.height() <= r.height()) && (r.removeClass(i).removeClass(u),
            r.find(".toggle-para").last().hide()),
            r.removeClass(f),
            e.remove()
        })
    }
    function e() {
        var n = "para-overflow-toggle-off"
          , t = "para-height"
          , i = function() {
            $(this).bind("click touchstart", function() {
                var i = $(".para-overflow-toggle")
                  , r = $(this).data("show-label")
                  , u = $(this).data("hide-label");
                $(this).text() === r ? (i.removeClass(t).addClass(n),
                $(this).text(u)) : (i.removeClass(n).addClass(t),
                $(this).text(r))
            })
        };
        $(".toggle-para").each(i)
    }
    function f() {
        var n = "content-overflow-toggle"
          , t = $("." + n)
          , i = "content-height"
          , r = "content-overflow-page-loading";
        $(".toggle-content").removeClass("hidden"),
        t.each(function() {
            var t = $(this)
              , u = $(this).clone().hide().height("auto").width(t.width());
            t.parent().append(u),
            u.css("font-weight", t.css("font-weight"));
            var f = t.attr("id")
              , e = $(".toggle-content[data-container-id='" + f + "']")
              , o = $(".show-more-end[data-container-id='" + f + "']");
            o.removeClass("hide"),
            (u.height() <= t.height() || !e.is(":visible")) && (t.removeClass(n).removeClass(i),
            e.hide(),
            o.addClass("hide")),
            t.removeClass(r),
            u.remove()
        })
    }
    function u() {
        var n = "content-overflow-toggle-off"
          , t = "content-height"
          , i = function() {
            var i = $(this).data("show-label")
              , r = $(this).data("hide-label");
            $(this).unbind("click"),
            $(this).bind("click", function() {
                var f = $(this).data("container-id")
                  , u = $("#" + f);
                $(this).text() === i ? (u.removeClass(t).addClass(n),
                $(this).text(r),
                u.find(".show-more-end").addClass("hide")) : (u.removeClass(n).addClass(t),
                $(this).text(i),
                u.find(".show-more-end").removeClass("hide"))
            })
        };
        $(".toggle-content").each(i)
    }
    function r(n) {
        n = n ? n : "#carousel",
        $(n).carousel({
            interval: 6e3,
            pause: "hover"
        })
    }
    function it() {
        $(".btn-toggle").bind("click", function() {
            if ($(this).hasClass("disabled"))
                return !1;
            $(this).toggleClass("on"),
            $(this).trigger("toggleBtnClick", {
                id: $(this).attr("id"),
                toggleOn: $(this).hasClass("on")
            })
        })
    }
    function rt() {
        var i = 0
          , r = 0
          , u = ".menu-secondary-container"
          , n = $(".submenus")
          , f = n.find("li")
          , t = n.find("li " + u)
          , e = n.find("li " + u + "[hover=true]");
        t.on("mouseover touchstart", function() {
            $(this).attr("hover", "true")
        });
        t.mouseout(function() {
            $(this).attr("hover", "false")
        });
        f.on("mouseover touchstart", function() {
            var i = $(this).data("delay"), f;
            e.length === 0 && ($(this).attr("hover", "true"),
            i !== "never" && (r === 1 || i === "always") ? window.setTimeout(function() {
                if (e.length === 0) {
                    var i = n.find("li[hover=true] " + u);
                    t.hide(),
                    i.length !== 0 && i.show()
                }
            }, 1e3) : (t.hide(),
            f = $(this).find(u),
            f.show()))
        });
        f.mouseout(function() {
            $(this).removeAttr("hover")
        }),
        n.mouseleave(function() {
            window.setTimeout(function() {
                t.hide()
            }, 100),
            i = 0,
            r = 0
        }),
        n.mousemove(function(n) {
            var t = i;
            i = n.pageX,
            (t === i || t === 0) && (r = 0),
            r = t < i ? 1 : -1
        });
        $("body").on("touchstart", function(i) {
            n.is(i.target) || n.has(i.target).length !== 0 || t.hide()
        })
    }
    var i = "para-overflow"
      , h = $("." + i);
    return {
        SetupTabs: a,
        SetupDropdown: tt,
        SetupAccordion: nt,
        ShowAccordionMenu: g,
        SetupTooltip: d,
        UpdateTooltip: k,
        CloseTooltip: b,
        SetupPopover: w,
        ClosePopover: p,
        SetupScrollbar: y,
        SetupPagination: v,
        Placeholder: c,
        IsTruncated: s,
        TruncateParagraph: o,
        ToggleParagraph: e,
        SetupCarousel: r,
        SetupToggleButton: it,
        SetupSystemFeedback: l,
        ToggleSystemMessage: n,
        SetupVerticalMenu: rt,
        TruncateContent: f,
        ToggleContent: u
    }
}(),
$(function() {
    Roblox.BootstrapWidgets.SetupTabs(),
    Roblox.BootstrapWidgets.SetupDropdown(),
    Roblox.BootstrapWidgets.SetupAccordion(),
    Roblox.BootstrapWidgets.SetupTooltip(),
    Roblox.BootstrapWidgets.CloseTooltip(),
    Roblox.BootstrapWidgets.SetupPopover(),
    Roblox.BootstrapWidgets.ClosePopover(),
    Roblox.BootstrapWidgets.SetupScrollbar(),
    Roblox.BootstrapWidgets.SetupPagination(),
    typeof Modernizr == "undefined" || Modernizr.input.placeholder || Roblox.BootstrapWidgets.Placeholder(),
    Roblox.BootstrapWidgets.IsTruncated(),
    Roblox.BootstrapWidgets.TruncateParagraph(),
    Roblox.BootstrapWidgets.ToggleParagraph(),
    Roblox.BootstrapWidgets.SetupCarousel(),
    Roblox.BootstrapWidgets.SetupToggleButton(),
    Roblox.BootstrapWidgets.SetupSystemFeedback(),
    Roblox.BootstrapWidgets.ToggleSystemMessage(),
    Roblox.BootstrapWidgets.SetupVerticalMenu(),
    Roblox.BootstrapWidgets.TruncateContent(),
    Roblox.BootstrapWidgets.ToggleContent()
});
;typeof Roblox == "undefined" && (Roblox = {}),
typeof Roblox.CookieUpgrader == "undefined" && (Roblox.CookieUpgrader = {}),
Roblox.CookieUpgrader.domain = "",
Roblox.CookieUpgrader.oneMonthInMs = 2592e6,
Roblox.CookieUpgrader.upgrade = function(n, t) {
    function e(n) {
        var u = null, i, t, r;
        if (document.cookie && document.cookie !== "")
            for (i = document.cookie.split(";"),
            t = 0; t < i.length; t++)
                if (r = jQuery.trim(i[t]),
                r.substring(0, n.length + 1) === n + "=") {
                    u = r.substring(n.length + 1);
                    break
                }
        return u
    }
    var i, o, r, f, s, u, h;
    if (Roblox.CookieUpgrader.domain !== "" && (i = e(n),
    i != null))
        try {
            if (o = document.cookie.length,
            document.cookie = n + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/",
            document.cookie = n + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; domain=" + window.location.host,
            document.cookie.length === o)
                return;
            if (r = n,
            typeof t.newCookieName != "undefined" && (r = t.newCookieName),
            f = e(n),
            f != null) {
                typeof GoogleAnalyticsEvents != "undefined" && GoogleAnalyticsEvents.FireEvent(["CookieUpgrader", "DeletedRedundantCookie", n]),
                s = {
                    cookieName: n,
                    cookieValue: f
                },
                Roblox.EventStream && Roblox.EventStream.SendEventWithTarget("CookieUpgrader", "DeletedRedundantCookie", s, Roblox.EventStream.TargetTypes.DIAGNOSTIC);
                return
            }
            u = r + "=" + i + "; ",
            u += "expires=" + t.expires(i).toUTCString() + "; ",
            u += "path=/; domain=" + Roblox.CookieUpgrader.domain,
            document.cookie = u,
            typeof GoogleAnalyticsEvents != "undefined" && GoogleAnalyticsEvents.FireEvent(["CookieUpgrader", "ConvertedCookie", n]),
            h = {
                cookieName: n,
                cookieValue: i,
                newCookieName: r
            },
            Roblox.EventStream && Roblox.EventStream.SendEventWithTarget("CookieUpgrader", "ConvertedCookie", h, Roblox.EventStream.TargetTypes.DIAGNOSTIC)
        } catch (c) {
            typeof GoogleAnalyticsEvents != "undefined" && GoogleAnalyticsEvents.FireEvent(["CookieUpgrader", "ExceptionDuringConvertOf" + n, c.message])
        }
}
,
Roblox.CookieUpgrader.getExpirationFromCookieValue = function(n, t) {
    var f = new RegExp(n + "=(\\d+)/(\\d+)/(\\d+)"), i = t.match(f), u = +new Date, r;
    return i != null && i.length != 0 && (r = new Date(i[3],i[1] - 1,i[2]),
    isNaN(r.getTime()) || (u = r.getTime())),
    new Date(u + Roblox.CookieUpgrader.oneMonthInMs)
}
,
Roblox.CookieUpgrader.thirtyDaysFromNow = function() {
    return new Date(+new Date + Roblox.CookieUpgrader.oneMonthInMs)
}
,
Roblox.CookieUpgrader.thirtyYearsFromNow = function() {
    return new Date(+new Date + 94608e7)
}
,
Roblox.CookieUpgrader.fourHoursFromNow = function() {
    return new Date(+new Date + 144e5)
}
;
;typeof Roblox == "undefined" && (Roblox = {}),
typeof Roblox.GamePlayEvents == "undefined" && (Roblox.GamePlayEvents = function() {
    function r() {
        var n = window.location.pathname.toLowerCase()
          , t = "profile"
          , i = n.lastIndexOf(t);
        return i !== -1 && n.length === i + t.length ? t : n.indexOf("/develop") != -1 ? "develop" : "gameDetail"
    }
    function u(n, t) {
        var i = $("#PlaceLauncherStatusPanel");
        return {
            lType: i && i.data("is-protocol-handler-launch-enabled") && i.data("is-protocol-handler-launch-enabled").toLowerCase() == "true" ? "protocol" : "plugin",
            pid: n,
            refuid: t,
            pg: r()
        }
    }
    function n(n, i, r, f) {
        Roblox.EventStream && (i != null && i != "" && i != "unknown" ? t.lastContext = i : i = t.lastContext,
        Roblox.EventStream.SendEvent(n, i, u(r, f)))
    }
    function f(t, i, r) {
        n("gamePlayIntent", t, i, r),
        $(document).trigger("playButton:gamePlayIntent")
    }
    function e(t, i) {
        n("developIntent", t, i)
    }
    function o(t, i) {
        n("installBegin", t, i)
    }
    function s(t, i) {
        n("installSuccess", t, i)
    }
    function h(t, i) {
        n("clientStartAttempt", t, i)
    }
    function c(t, i) {
        n("clientStartSuccessWeb", t, i)
    }
    function l(t, i) {
        n("manualDownload", t, i)
    }
    var i = {
        joinUser: "JoinUser"
    }
      , t = {
        SendGamePlayIntent: f,
        SendDevelopIntent: e,
        SendInstallBegin: o,
        SendInstallSuccess: s,
        SendClientStartAttempt: h,
        SendClientStartSuccessWeb: c,
        SendManualDownloadClick: l,
        lastContext: "unknown",
        contextCategories: i
    };
    return t
}()),
$(function() {
    var t = "#rbx-running-games"
      , i = ".rbx-game-server-item .rbx-game-server-join"
      , r = "#rbx-friends-running-games"
      , u = ".rbx-friends-game-server-item .rbx-friends-game-server-join"
      , f = "#game-instances"
      , e = "#rbx-vip-servers .rbx-vip-server-item .rbx-vip-server-join"
      , n = "click";
    $("body").on(n, ".VisitButtonPlay, .VisitButtonPlayGLI", function() {
        var n, t = $(this), i;
        if ((t.hasClass("VisitButtonPlay") || t.hasClass("VisitButtonPlayGLI")) && (n = "PlayButton"),
        n) {
            var r = $(this).attr("placeid")
              , u = $(this).data("universe-id")
              , f = $(this).data("user-id")
              , e = $(this).data("originator-type")
              , o = $(this).data("originator-id");
            e === "GameUpdateNotification" && $.ajax({
                url: Roblox.EnvironmentUrls.notificationApi + "/v2/stream-notifications/game-update-notification-interacted",
                type: "POST",
                data: {
                    universeId: u,
                    createdOn: new Date(o),
                    interactionType: "Played",
                    currentUserId: f
                }
            }),
            i = Roblox.UrlParser ? Roblox.UrlParser.getParameterValueByName("rbxp") : null,
            Roblox.GamePlayEvents.SendGamePlayIntent(n, r, i)
        }
    });
    $("body").on(n, ".VisitButtonEdit, .VisitButtonEditGLI", function() {
        var n = $(this).attr("placeid");
        Roblox.GamePlayEvents.SendDevelopIntent("Edit", n)
    });
    $(t).on(n, i, function() {
        var n = $(this).data("placeid");
        n && Roblox.GamePlayEvents.SendGamePlayIntent("JoinInstance", n)
    });
    $(r).on(n, u, function() {
        var n = $(this).data("placeid");
        n && Roblox.GamePlayEvents.SendGamePlayIntent("JoinInstance", n)
    });
    $(f).on(n, e, function() {
        var n = $(this).data("placeid");
        n && Roblox.GamePlayEvents.SendGamePlayIntent("PrivateServer", n)
    });
    $("#build-page").on(n, ".roblox-edit-button", function() {
        var n = $(this).parents("table.item-table")
          , t = n.data("rootplace-id") || n.data("item-id");
        t && Roblox.GamePlayEvents.SendDevelopIntent("Edit", t)
    })
});
;"modal"in $.fn && "noConflict"in $.fn.modal && ($.fn.bootstrapModal = $.fn.modal.noConflict());
;"use strict";
var RobloxError = function() {
    var n = function(n, t) {
        var i = t && t.name;
        switch (i) {
        case "TypeError":
            this.error = new TypeError(n);
            break;
        case "EvalError":
            this.error = new EvalError(n);
            break;
        case "RangeError":
            this.error = new RangeError(n);
            break;
        case "ReferenceError":
            this.error = new ReferenceError(n);
            break;
        default:
            this.error = new Error(n)
        }
    };
    return n.prototype.throw = function(n) {
        if (Roblox && Roblox.jsConsoleEnabled)
            throw this.error;
        n && typeof n == "function" && n()
    }
    ,
    n
}();
;!function(e, r) {
    "object" == typeof exports && "undefined" != typeof module ? module.exports = r() : "function" == typeof define && define.amd ? define(r) : e.IntlPolyfill = r()
}(this, function() {
    "use strict";
    function e(e) {
        if ("function" == typeof Math.log10)
            return Math.floor(Math.log10(e));
        var r = Math.round(Math.log(e) * Math.LOG10E);
        return r - (Number("1e" + r) > e)
    }
    function r(e) {
        for (var t in e)
            (e instanceof r || Ue.call(e, t)) && Ke(this, t, {
                value: e[t],
                enumerable: !0,
                writable: !0,
                configurable: !0
            })
    }
    function t() {
        Ke(this, "length", {
            writable: !0,
            value: 0
        }),
        arguments.length && Ve.apply(this, We.call(arguments))
    }
    function n() {
        if (rr.disableRegExpRestore)
            return function() {}
            ;
        for (var e = {
            lastMatch: RegExp.lastMatch || "",
            leftContext: RegExp.leftContext,
            multiline: RegExp.multiline,
            input: RegExp.input
        }, r = !1, t = 1; t <= 9; t++)
            r = (e["$" + t] = RegExp["$" + t]) || r;
        return function() {
            var t = /[.?*+^$[\]\\(){}|-]/g
              , n = e.lastMatch.replace(t, "\\$&")
              , o = "";
            if (r)
                for (var i = 1; i <= 9; i++) {
                    var a = e["$" + i];
                    a ? (a = a.replace(t, "\\$&"),
                    o += n.substring(0, n.indexOf(a)) + "(",
                    n = a + ")" + n.substring(n.indexOf(a) + a.length)) : (o += "(",
                    n = ")" + n)
                }
            o += n,
            o = o.replace(/((^|[^\\])((\\\\)*\\[()])+|[^()])+/g, function(e) {
                return "[\\s\\S]{" + e.replace(/\\(.)/g, "$1").length + "}"
            });
            var l = new RegExp(o,e.multiline ? "gm" : "g");
            l.lastIndex = e.leftContext.length,
            l.exec(e.input)
        }
    }
    function o(e) {
        if (null === e)
            throw new TypeError("Cannot convert null or undefined to object");
        return "object" === (void 0 === e ? "undefined" : Ze.typeof(e)) ? e : Object(e)
    }
    function i(e) {
        return "number" == typeof e ? e : Number(e)
    }
    function a(e) {
        var r = i(e);
        return isNaN(r) ? 0 : 0 === r || -0 === r || r === 1 / 0 || r === -1 / 0 ? r : r < 0 ? -1 * Math.floor(Math.abs(r)) : Math.floor(Math.abs(r))
    }
    function l(e) {
        var r = a(e);
        return r <= 0 ? 0 : r === 1 / 0 ? Math.pow(2, 53) - 1 : Math.min(r, Math.pow(2, 53) - 1)
    }
    function s(e) {
        return Ue.call(e, "__getInternalProperties") ? e.__getInternalProperties(tr) : He(null)
    }
    function u(e) {
        ur = e
    }
    function c(e) {
        for (var r = e.length; r--; ) {
            var t = e.charAt(r);
            t >= "a" && t <= "z" && (e = e.slice(0, r) + t.toUpperCase() + e.slice(r + 1))
        }
        return e
    }
    function f(e) {
        return !!ir.test(e) && (!ar.test(e) && !lr.test(e))
    }
    function g(e) {
        var r = void 0
          , t = void 0;
        e = e.toLowerCase(),
        t = e.split("-");
        for (var n = 1, o = t.length; n < o; n++)
            if (2 === t[n].length)
                t[n] = t[n].toUpperCase();
            else if (4 === t[n].length)
                t[n] = t[n].charAt(0).toUpperCase() + t[n].slice(1);
            else if (1 === t[n].length && "x" !== t[n])
                break;
        e = Je.call(t, "-"),
        (r = e.match(sr)) && r.length > 1 && (r.sort(),
        e = e.replace(RegExp("(?:" + sr.source + ")+", "i"), Je.call(r, ""))),
        Ue.call(cr.tags, e) && (e = cr.tags[e]),
        t = e.split("-");
        for (var i = 1, a = t.length; i < a; i++)
            Ue.call(cr.subtags, t[i]) ? t[i] = cr.subtags[t[i]] : Ue.call(cr.extLang, t[i]) && (t[i] = cr.extLang[t[i]][0],
            1 === i && cr.extLang[t[1]][1] === t[0] && (t = We.call(t, i++),
            a -= 1));
        return Je.call(t, "-")
    }
    function h() {
        return ur
    }
    function m(e) {
        var r = String(e)
          , t = c(r);
        return !1 !== fr.test(t)
    }
    function v(e) {
        if (void 0 === e)
            return new t;
        var r = new t;
        e = "string" == typeof e ? [e] : e;
        for (var n = o(e), i = l(n.length), a = 0; a < i; ) {
            var s = String(a);
            if (s in n) {
                var u = n[s];
                if (null === u || "string" != typeof u && "object" !== (void 0 === u ? "undefined" : Ze.typeof(u)))
                    throw new TypeError("String or Object type expected");
                var c = String(u);
                if (!f(c))
                    throw new RangeError("'" + c + "' is not a structurally valid language tag");
                c = g(c),
                -1 === Ye.call(r, c) && Ve.call(r, c)
            }
            a++
        }
        return r
    }
    function p(e, r) {
        for (var t = r; t; ) {
            if (Ye.call(e, t) > -1)
                return t;
            var n = t.lastIndexOf("-");
            if (n < 0)
                return;
            n >= 2 && "-" === t.charAt(n - 2) && (n -= 2),
            t = t.substring(0, n)
        }
    }
    function d(e, t) {
        for (var n = 0, o = t.length, i = void 0, a = void 0, l = void 0; n < o && !i; )
            a = t[n],
            l = String(a).replace(gr, ""),
            i = p(e, l),
            n++;
        var s = new r;
        if (void 0 !== i) {
            if (s["[[locale]]"] = i,
            String(a) !== String(l)) {
                var u = a.match(gr)[0]
                  , c = a.indexOf("-u-");
                s["[[extension]]"] = u,
                s["[[extensionIndex]]"] = c
            }
        } else
            s["[[locale]]"] = h();
        return s
    }
    function y(e, r) {
        return d(e, r)
    }
    function b(e) {
        var r = e.length;
        if (0 === r)
            return [];
        for (var t = [], n = !0, o = 3, i = o, a = o; o < r; ) {
            if (45 === e.codePointAt(o)) {
                if (o - i == 2) {
                    if (i - a > 1) {
                        var l = e.substring(a, i - 1);
                        t.push(l)
                    }
                    var s = e.substring(i, o);
                    t.push(s),
                    a = o + 1,
                    n = !1
                } else if (!0 === n) {
                    var u = e.substring(i, o);
                    t.push(u),
                    a = o + 1
                }
                i = o + 1
            }
            o += 1
        }
        if (r - i == 2) {
            if (i - a > 1) {
                var c = e.substring(a, i - 1);
                t.push(c)
            }
            a = i
        }
        var f = e.substring(a, r);
        return t.push(f),
        t
    }
    function w(e, t, n, o, i) {
        if (0 === e.length)
            throw new ReferenceError("No locale data has been provided for this object yet.");
        var a = n["[[localeMatcher]]"]
          , l = void 0;
        l = "lookup" === a ? d(e, t) : y(e, t);
        var s = l["[[locale]]"]
          , u = void 0
          , c = void 0;
        if (Ue.call(l, "[[extension]]")) {
            u = b(l["[[extension]]"]),
            c = u.length
        }
        var f = new r;
        f["[[dataLocale]]"] = s;
        for (var h = "-u", m = 0, v = o.length; m < v; ) {
            var p = o[m]
              , w = i[s]
              , k = w[p]
              , S = k[0]
              , x = ""
              , j = Ye;
            if (void 0 !== u) {
                var z = j.call(u, p);
                if (-1 !== z)
                    if (z + 1 < c && u[z + 1].length > 2) {
                        var D = u[z + 1]
                          , F = j.call(k, D);
                        -1 !== F && (S = D,
                        x = "-" + p + "-" + S)
                    } else {
                        var O = j(k, "true");
                        -1 !== O && (S = "true")
                    }
            }
            if (Ue.call(n, "[[" + p + "]]")) {
                var N = n["[[" + p + "]]"];
                -1 !== j.call(k, N) && N !== S && (S = N,
                x = "")
            }
            f["[[" + p + "]]"] = S,
            h += x,
            m++
        }
        if (h.length > 2) {
            var P = s.indexOf("-x-");
            if (-1 === P)
                s += h;
            else {
                s = s.substring(0, P) + h + s.substring(P)
            }
            s = g(s)
        }
        return f["[[locale]]"] = s,
        f
    }
    function k(e, r) {
        for (var n = r.length, o = new t, i = 0; i < n; ) {
            var a = r[i];
            void 0 !== p(e, String(a).replace(gr, "")) && Ve.call(o, a),
            i++
        }
        return We.call(o)
    }
    function S(e, r) {
        return k(e, r)
    }
    function x(e, t, n) {
        var i = void 0
          , a = void 0;
        if (void 0 !== n && (n = new r(o(n)),
        void 0 !== (i = n.localeMatcher) && "lookup" !== (i = String(i)) && "best fit" !== i))
            throw new RangeError('matcher should be "lookup" or "best fit"');
        a = void 0 === i || "best fit" === i ? S(e, t) : k(e, t);
        for (var l in a)
            Ue.call(a, l) && Ke(a, l, {
                writable: !1,
                configurable: !1,
                value: a[l]
            });
        try {
            Ke(a, "length", {
                writable: !1
            })
        } catch (e) {}
        return a
    }
    function j(e, r, t, n, o) {
        var i = e[r];
        if (void 0 !== i) {
            if (i = "boolean" === t ? Boolean(i) : "string" === t ? String(i) : i,
            void 0 !== n && -1 === Ye.call(n, i))
                throw new RangeError("'" + i + "' is not an allowed value for `" + r + "`");
            return i
        }
        return o
    }
    function z(e, r, t, n, o) {
        var i = e[r];
        if (void 0 !== i) {
            if (i = Number(i),
            isNaN(i) || i < t || i > n)
                throw new RangeError("Value is not a number or outside accepted range");
            return Math.floor(i)
        }
        return o
    }
    function D(e) {
        for (var r = v(e), t = [], n = r.length, o = 0; o < n; )
            t[o] = r[o],
            o++;
        return t
    }
    function F() {
        var e = arguments[0]
          , r = arguments[1];
        return this && this !== hr ? N(o(this), e, r) : new hr.NumberFormat(e,r)
    }
    function O(e, r, t) {
        var n = z(r, "minimumIntegerDigits", 1, 21, 1)
          , o = z(r, "minimumFractionDigits", 0, 20, t)
          , i = z(r, "maximumFractionDigits", o, 20)
          , a = r.minimumSignificantDigits
          , l = r.maximumSignificantDigits;
        e["[[minimumIntegerDigits]]"] = n,
        e["[[minimumFractionDigits]]"] = o,
        e["[[maximumFractionDigits]]"] = i,
        void 0 === a && void 0 === l || (a = z(r, "minimumSignificantDigits", 1, 21, 1),
        l = z(r, "maximumSignificantDigits", a, 21, 21),
        e["[[minimumSignificantDigits]]"] = a,
        e["[[maximumSignificantDigits]]"] = l)
    }
    function N(e, i, a) {
        var l = s(e)
          , u = n();
        if (!0 === l["[[initializedIntlObject]]"])
            throw new TypeError("`this` object has already been initialized as an Intl object");
        Ke(e, "__getInternalProperties", {
            value: function() {
                if (arguments[0] === tr)
                    return l
            }
        }),
        l["[[initializedIntlObject]]"] = !0;
        var c = v(i);
        a = void 0 === a ? {} : o(a);
        var f = new r
          , g = j(a, "localeMatcher", "string", new t("lookup","best fit"), "best fit");
        f["[[localeMatcher]]"] = g;
        var h = rr.NumberFormat["[[localeData]]"]
          , p = w(rr.NumberFormat["[[availableLocales]]"], c, f, rr.NumberFormat["[[relevantExtensionKeys]]"], h);
        l["[[locale]]"] = p["[[locale]]"],
        l["[[numberingSystem]]"] = p["[[nu]]"],
        l["[[dataLocale]]"] = p["[[dataLocale]]"];
        var d = p["[[dataLocale]]"]
          , y = j(a, "style", "string", new t("decimal","percent","currency"), "decimal");
        l["[[style]]"] = y;
        var b = j(a, "currency", "string");
        if (void 0 !== b && !m(b))
            throw new RangeError("'" + b + "' is not a valid currency code");
        if ("currency" === y && void 0 === b)
            throw new TypeError("Currency code is required when style is currency");
        var k = void 0;
        "currency" === y && (b = b.toUpperCase(),
        l["[[currency]]"] = b,
        k = P(b));
        var S = j(a, "currencyDisplay", "string", new t("code","symbol","name"), "symbol");
        "currency" === y && (l["[[currencyDisplay]]"] = S),
        O(l, a, "currency" === y ? k : 0),
        void 0 === l["[[maximumFractionDigits]]"] && (l["[[maximumFractionDigits]]"] = "currency" === y ? Math.max(l["[[minimumFractionDigits]]"], k) : "percent" === y ? Math.max(l["[[minimumFractionDigits]]"], 0) : Math.max(l["[[minimumFractionDigits]]"], 3));
        var x = j(a, "useGrouping", "boolean", void 0, !0);
        l["[[useGrouping]]"] = x;
        var z = h[d]
          , D = z.patterns
          , F = D[y];
        return l["[[positivePattern]]"] = F.positivePattern,
        l["[[negativePattern]]"] = F.negativePattern,
        l["[[boundFormat]]"] = void 0,
        l["[[initializedNumberFormat]]"] = !0,
        Be && (e.format = E.call(e)),
        u(),
        e
    }
    function P(e) {
        return void 0 !== mr[e] ? mr[e] : 2
    }
    function E() {
        var e = null !== this && "object" === Ze.typeof(this) && s(this);
        if (!e || !e["[[initializedNumberFormat]]"])
            throw new TypeError("`this` value for format() is not an initialized Intl.NumberFormat object.");
        if (void 0 === e["[[boundFormat]]"]) {
            var r = function(e) {
                return R(this, Number(e))
            }
              , t = er.call(r, this);
            e["[[boundFormat]]"] = t
        }
        return e["[[boundFormat]]"]
    }
    function L() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : void 0
          , r = null !== this && "object" === Ze.typeof(this) && s(this);
        if (!r || !r["[[initializedNumberFormat]]"])
            throw new TypeError("`this` value for formatToParts() is not an initialized Intl.NumberFormat object.");
        return _(this, Number(e))
    }
    function _(e, r) {
        for (var t = I(e, r), n = [], o = 0, i = 0; t.length > i; i++) {
            var a = t[i]
              , l = {};
            l.type = a["[[type]]"],
            l.value = a["[[value]]"],
            n[o] = l,
            o += 1
        }
        return n
    }
    function T(e, r) {
        var t = s(e);
        return Ue.call(t, "[[minimumSignificantDigits]]") && Ue.call(t, "[[maximumSignificantDigits]]") ? M(r, t["[[minimumSignificantDigits]]"], t["[[maximumSignificantDigits]]"]) : A(r, t["[[minimumIntegerDigits]]"], t["[[minimumFractionDigits]]"], t["[[maximumFractionDigits]]"])
    }
    function I(e, r) {
        var n = s(e)
          , o = n["[[dataLocale]]"]
          , i = n["[[numberingSystem]]"]
          , a = rr.NumberFormat["[[localeData]]"][o]
          , l = a.symbols[i] || a.symbols.latn
          , u = void 0;
        !isNaN(r) && r < 0 ? (r = -r,
        u = n["[[negativePattern]]"]) : u = n["[[positivePattern]]"];
        for (var c = new t, f = u.indexOf("{", 0), g = 0, h = 0, m = u.length; f > -1 && f < m; ) {
            if (-1 === (g = u.indexOf("}", f)))
                throw new Error;
            if (f > h) {
                var v = u.substring(h, f);
                Ve.call(c, {
                    "[[type]]": "literal",
                    "[[value]]": v
                })
            }
            var p = u.substring(f + 1, g);
            if ("number" === p)
                if (isNaN(r)) {
                    var d = l.nan;
                    Ve.call(c, {
                        "[[type]]": "nan",
                        "[[value]]": d
                    })
                } else if (isFinite(r)) {
                    "percent" === n["[[style]]"] && (r *= 100);
                    var y = T(e, r);
                    vr[i] ? function() {
                        var e = vr[i];
                        y = String(y).replace(/\d/g, function(r) {
                            return e[r]
                        })
                    }() : y = String(y);
                    var b = void 0
                      , w = void 0
                      , k = y.indexOf(".", 0);
                    if (k > 0 ? (b = y.substring(0, k),
                    w = y.substring(k + 1, k.length)) : (b = y,
                    w = void 0),
                    !0 === n["[[useGrouping]]"]) {
                        var S = l.group
                          , x = []
                          , j = a.patterns.primaryGroupSize || 3
                          , z = a.patterns.secondaryGroupSize || j;
                        if (b.length > j) {
                            var D = b.length - j
                              , F = D % z
                              , O = b.slice(0, F);
                            for (O.length && Ve.call(x, O); F < D; )
                                Ve.call(x, b.slice(F, F + z)),
                                F += z;
                            Ve.call(x, b.slice(D))
                        } else
                            Ve.call(x, b);
                        if (0 === x.length)
                            throw new Error;
                        for (; x.length; ) {
                            var N = Qe.call(x);
                            Ve.call(c, {
                                "[[type]]": "integer",
                                "[[value]]": N
                            }),
                            x.length && Ve.call(c, {
                                "[[type]]": "group",
                                "[[value]]": S
                            })
                        }
                    } else
                        Ve.call(c, {
                            "[[type]]": "integer",
                            "[[value]]": b
                        });
                    if (void 0 !== w) {
                        var P = l.decimal;
                        Ve.call(c, {
                            "[[type]]": "decimal",
                            "[[value]]": P
                        }),
                        Ve.call(c, {
                            "[[type]]": "fraction",
                            "[[value]]": w
                        })
                    }
                } else {
                    var E = l.infinity;
                    Ve.call(c, {
                        "[[type]]": "infinity",
                        "[[value]]": E
                    })
                }
            else if ("plusSign" === p) {
                var L = l.plusSign;
                Ve.call(c, {
                    "[[type]]": "plusSign",
                    "[[value]]": L
                })
            } else if ("minusSign" === p) {
                var _ = l.minusSign;
                Ve.call(c, {
                    "[[type]]": "minusSign",
                    "[[value]]": _
                })
            } else if ("percentSign" === p && "percent" === n["[[style]]"]) {
                var I = l.percentSign;
                Ve.call(c, {
                    "[[type]]": "literal",
                    "[[value]]": I
                })
            } else if ("currency" === p && "currency" === n["[[style]]"]) {
                var R = n["[[currency]]"]
                  , M = void 0;
                "code" === n["[[currencyDisplay]]"] ? M = R : "symbol" === n["[[currencyDisplay]]"] ? M = a.currencies[R] || R : "name" === n["[[currencyDisplay]]"] && (M = R),
                Ve.call(c, {
                    "[[type]]": "currency",
                    "[[value]]": M
                })
            } else {
                var A = u.substring(f, g);
                Ve.call(c, {
                    "[[type]]": "literal",
                    "[[value]]": A
                })
            }
            h = g + 1,
            f = u.indexOf("{", h)
        }
        if (h < m) {
            var q = u.substring(h, m);
            Ve.call(c, {
                "[[type]]": "literal",
                "[[value]]": q
            })
        }
        return c
    }
    function R(e, r) {
        for (var t = I(e, r), n = "", o = 0; t.length > o; o++) {
            n += t[o]["[[value]]"]
        }
        return n
    }
    function M(r, t, n) {
        var o = n
          , i = void 0
          , a = void 0;
        if (0 === r)
            i = Je.call(Array(o + 1), "0"),
            a = 0;
        else {
            a = e(Math.abs(r));
            var l = Math.round(Math.exp(Math.abs(a - o + 1) * Math.LN10));
            i = String(Math.round(a - o + 1 < 0 ? r * l : r / l))
        }
        if (a >= o)
            return i + Je.call(Array(a - o + 1 + 1), "0");
        if (a === o - 1)
            return i;
        if (a >= 0 ? i = i.slice(0, a + 1) + "." + i.slice(a + 1) : a < 0 && (i = "0." + Je.call(Array(1 - (a + 1)), "0") + i),
        i.indexOf(".") >= 0 && n > t) {
            for (var s = n - t; s > 0 && "0" === i.charAt(i.length - 1); )
                i = i.slice(0, -1),
                s--;
            "." === i.charAt(i.length - 1) && (i = i.slice(0, -1))
        }
        return i
    }
    function A(e, r, t, n) {
        var o = n
          , i = Math.pow(10, o) * e
          , a = 0 === i ? "0" : i.toFixed(0)
          , l = void 0
          , s = (l = a.indexOf("e")) > -1 ? a.slice(l + 1) : 0;
        s && (a = a.slice(0, l).replace(".", ""),
        a += Je.call(Array(s - (a.length - 1) + 1), "0"));
        var u = void 0;
        if (0 !== o) {
            var c = a.length;
            if (c <= o) {
                a = Je.call(Array(o + 1 - c + 1), "0") + a,
                c = o + 1
            }
            var f = a.substring(0, c - o);
            a = f + "." + a.substring(c - o, a.length),
            u = f.length
        } else
            u = a.length;
        for (var g = n - t; g > 0 && "0" === a.slice(-1); )
            a = a.slice(0, -1),
            g--;
        if ("." === a.slice(-1) && (a = a.slice(0, -1)),
        u < r) {
            a = Je.call(Array(r - u + 1), "0") + a
        }
        return a
    }
    function q(e) {
        for (var r = 0; r < wr.length; r += 1)
            if (e.hasOwnProperty(wr[r]))
                return !1;
        return !0
    }
    function C(e) {
        for (var r = 0; r < br.length; r += 1)
            if (e.hasOwnProperty(br[r]))
                return !1;
        return !0
    }
    function G(e, r) {
        for (var t = {
            _: {}
        }, n = 0; n < br.length; n += 1)
            e[br[n]] && (t[br[n]] = e[br[n]]),
            e._[br[n]] && (t._[br[n]] = e._[br[n]]);
        for (var o = 0; o < wr.length; o += 1)
            r[wr[o]] && (t[wr[o]] = r[wr[o]]),
            r._[wr[o]] && (t._[wr[o]] = r._[wr[o]]);
        return t
    }
    function Z(e) {
        return e.pattern12 = e.extendedPattern.replace(/'([^']*)'/g, function(e, r) {
            return r || "'"
        }),
        e.pattern = e.pattern12.replace("{ampm}", "").replace(dr, ""),
        e
    }
    function $(e, r) {
        switch (e.charAt(0)) {
        case "G":
            return r.era = ["short", "short", "short", "long", "narrow"][e.length - 1],
            "{era}";
        case "y":
        case "Y":
        case "u":
        case "U":
        case "r":
            return r.year = 2 === e.length ? "2-digit" : "numeric",
            "{year}";
        case "Q":
        case "q":
            return r.quarter = ["numeric", "2-digit", "short", "long", "narrow"][e.length - 1],
            "{quarter}";
        case "M":
        case "L":
            return r.month = ["numeric", "2-digit", "short", "long", "narrow"][e.length - 1],
            "{month}";
        case "w":
            return r.week = 2 === e.length ? "2-digit" : "numeric",
            "{weekday}";
        case "W":
            return r.week = "numeric",
            "{weekday}";
        case "d":
            return r.day = 2 === e.length ? "2-digit" : "numeric",
            "{day}";
        case "D":
        case "F":
        case "g":
            return r.day = "numeric",
            "{day}";
        case "E":
            return r.weekday = ["short", "short", "short", "long", "narrow", "short"][e.length - 1],
            "{weekday}";
        case "e":
            return r.weekday = ["numeric", "2-digit", "short", "long", "narrow", "short"][e.length - 1],
            "{weekday}";
        case "c":
            return r.weekday = ["numeric", void 0, "short", "long", "narrow", "short"][e.length - 1],
            "{weekday}";
        case "a":
        case "b":
        case "B":
            return r.hour12 = !0,
            "{ampm}";
        case "h":
        case "H":
            return r.hour = 2 === e.length ? "2-digit" : "numeric",
            "{hour}";
        case "k":
        case "K":
            return r.hour12 = !0,
            r.hour = 2 === e.length ? "2-digit" : "numeric",
            "{hour}";
        case "m":
            return r.minute = 2 === e.length ? "2-digit" : "numeric",
            "{minute}";
        case "s":
            return r.second = 2 === e.length ? "2-digit" : "numeric",
            "{second}";
        case "S":
        case "A":
            return r.second = "numeric",
            "{second}";
        case "z":
        case "Z":
        case "O":
        case "v":
        case "V":
        case "X":
        case "x":
            return r.timeZoneName = e.length < 4 ? "short" : "long",
            "{timeZoneName}"
        }
    }
    function B(e, r) {
        if (!yr.test(r)) {
            var t = {
                originalPattern: r,
                _: {}
            };
            return t.extendedPattern = r.replace(pr, function(e) {
                return $(e, t._)
            }),
            e.replace(pr, function(e) {
                return $(e, t)
            }),
            Z(t)
        }
    }
    function U(e) {
        var r = e.availableFormats
          , t = e.timeFormats
          , n = e.dateFormats
          , o = []
          , i = void 0
          , a = void 0
          , l = void 0
          , s = void 0
          , u = void 0
          , c = []
          , f = [];
        for (i in r)
            r.hasOwnProperty(i) && (a = r[i],
            (l = B(i, a)) && (o.push(l),
            q(l) ? f.push(l) : C(l) && c.push(l)));
        for (i in t)
            t.hasOwnProperty(i) && (a = t[i],
            (l = B(i, a)) && (o.push(l),
            c.push(l)));
        for (i in n)
            n.hasOwnProperty(i) && (a = n[i],
            (l = B(i, a)) && (o.push(l),
            f.push(l)));
        for (s = 0; s < c.length; s += 1)
            for (u = 0; u < f.length; u += 1)
                a = "long" === f[u].month ? f[u].weekday ? e.full : e.long : "short" === f[u].month ? e.medium : e.short,
                l = G(f[u], c[s]),
                l.originalPattern = a,
                l.extendedPattern = a.replace("{0}", c[s].extendedPattern).replace("{1}", f[u].extendedPattern).replace(/^[,\s]+|[,\s]+$/gi, ""),
                o.push(Z(l));
        return o
    }
    function K(e, r) {
        if (kr[e] && kr[e][r]) {
            var t;
            return t = {
                originalPattern: kr[e][r],
                _: ke({}, e, r),
                extendedPattern: "{" + e + "}"
            },
            ke(t, e, r),
            ke(t, "pattern12", "{" + e + "}"),
            ke(t, "pattern", "{" + e + "}"),
            t
        }
    }
    function Y(e, r, t, n, o) {
        var i = e[r] && e[r][t] ? e[r][t] : e.gregory[t]
          , a = {
            narrow: ["short", "long"],
            short: ["long", "narrow"],
            long: ["short", "narrow"]
        }
          , l = Ue.call(i, n) ? i[n] : Ue.call(i, a[n][0]) ? i[a[n][0]] : i[a[n][1]];
        return null !== o ? l[o] : l
    }
    function H() {
        var e = arguments[0]
          , r = arguments[1];
        return this && this !== hr ? W(o(this), e, r) : new hr.DateTimeFormat(e,r)
    }
    function W(e, o, i) {
        var a = s(e)
          , l = n();
        if (!0 === a["[[initializedIntlObject]]"])
            throw new TypeError("`this` object has already been initialized as an Intl object");
        Ke(e, "__getInternalProperties", {
            value: function() {
                if (arguments[0] === tr)
                    return a
            }
        }),
        a["[[initializedIntlObject]]"] = !0;
        var u = v(o);
        i = V(i, "any", "date");
        var f = new r
          , g = j(i, "localeMatcher", "string", new t("lookup","best fit"), "best fit");
        f["[[localeMatcher]]"] = g;
        var h = rr.DateTimeFormat
          , m = h["[[localeData]]"]
          , p = w(h["[[availableLocales]]"], u, f, h["[[relevantExtensionKeys]]"], m);
        a["[[locale]]"] = p["[[locale]]"],
        a["[[calendar]]"] = p["[[ca]]"],
        a["[[numberingSystem]]"] = p["[[nu]]"],
        a["[[dataLocale]]"] = p["[[dataLocale]]"];
        var d = p["[[dataLocale]]"]
          , y = i.timeZone;
        if (void 0 !== y && "UTC" !== (y = c(y)))
            throw new RangeError("timeZone is not supported.");
        a["[[timeZone]]"] = y,
        f = new r;
        for (var b in xr)
            if (Ue.call(xr, b)) {
                var k = j(i, b, "string", xr[b]);
                f["[[" + b + "]]"] = k
            }
        var S = void 0
          , x = m[d]
          , z = X(x.formats);
        if (g = j(i, "formatMatcher", "string", new t("basic","best fit"), "best fit"),
        x.formats = z,
        "basic" === g)
            S = J(f, z);
        else {
            var D = j(i, "hour12", "boolean");
            f.hour12 = void 0 === D ? x.hour12 : D,
            S = Q(f, z)
        }
        for (var F in xr)
            if (Ue.call(xr, F) && Ue.call(S, F)) {
                var O = S[F];
                O = S._ && Ue.call(S._, F) ? S._[F] : O,
                a["[[" + F + "]]"] = O
            }
        var N = void 0
          , P = j(i, "hour12", "boolean");
        if (a["[[hour]]"])
            if (P = void 0 === P ? x.hour12 : P,
            a["[[hour12]]"] = P,
            !0 === P) {
                var E = x.hourNo0;
                a["[[hourNo0]]"] = E,
                N = S.pattern12
            } else
                N = S.pattern;
        else
            N = S.pattern;
        return a["[[pattern]]"] = N,
        a["[[boundFormat]]"] = void 0,
        a["[[initializedDateTimeFormat]]"] = !0,
        Be && (e.format = ee.call(e)),
        l(),
        e
    }
    function X(e) {
        return "[object Array]" === Object.prototype.toString.call(e) ? e : U(e)
    }
    function V(e, t, n) {
        if (void 0 === e)
            e = null;
        else {
            var i = o(e);
            e = new r;
            for (var a in i)
                e[a] = i[a]
        }
        e = He(e);
        var l = !0;
        return "date" !== t && "any" !== t || void 0 === e.weekday && void 0 === e.year && void 0 === e.month && void 0 === e.day || (l = !1),
        "time" !== t && "any" !== t || void 0 === e.hour && void 0 === e.minute && void 0 === e.second || (l = !1),
        !l || "date" !== n && "all" !== n || (e.year = e.month = e.day = "numeric"),
        !l || "time" !== n && "all" !== n || (e.hour = e.minute = e.second = "numeric"),
        e
    }
    function J(e, r) {
        for (var t = -1 / 0, n = void 0, o = 0, i = r.length; o < i; ) {
            var a = r[o]
              , l = 0;
            for (var s in xr)
                if (Ue.call(xr, s)) {
                    var u = e["[[" + s + "]]"]
                      , c = Ue.call(a, s) ? a[s] : void 0;
                    if (void 0 === u && void 0 !== c)
                        l -= 20;
                    else if (void 0 !== u && void 0 === c)
                        l -= 120;
                    else {
                        var f = ["2-digit", "numeric", "narrow", "short", "long"]
                          , g = Ye.call(f, u)
                          , h = Ye.call(f, c)
                          , m = Math.max(Math.min(h - g, 2), -2);
                        2 === m ? l -= 6 : 1 === m ? l -= 3 : -1 === m ? l -= 6 : -2 === m && (l -= 8)
                    }
                }
            l > t && (t = l,
            n = a),
            o++
        }
        return n
    }
    function Q(e, r) {
        var t = [];
        for (var n in xr)
            Ue.call(xr, n) && void 0 !== e["[[" + n + "]]"] && t.push(n);
        if (1 === t.length) {
            var o = K(t[0], e["[[" + t[0] + "]]"]);
            if (o)
                return o
        }
        for (var i = -1 / 0, a = void 0, l = 0, s = r.length; l < s; ) {
            var u = r[l]
              , c = 0;
            for (var f in xr)
                if (Ue.call(xr, f)) {
                    var g = e["[[" + f + "]]"]
                      , h = Ue.call(u, f) ? u[f] : void 0
                      , m = Ue.call(u._, f) ? u._[f] : void 0;
                    if (g !== m && (c -= 2),
                    void 0 === g && void 0 !== h)
                        c -= 20;
                    else if (void 0 !== g && void 0 === h)
                        c -= 120;
                    else {
                        var v = ["2-digit", "numeric", "narrow", "short", "long"]
                          , p = Ye.call(v, g)
                          , d = Ye.call(v, h)
                          , y = Math.max(Math.min(d - p, 2), -2);
                        d <= 1 && p >= 2 || d >= 2 && p <= 1 ? y > 0 ? c -= 6 : y < 0 && (c -= 8) : y > 1 ? c -= 3 : y < -1 && (c -= 6)
                    }
                }
            u._.hour12 !== e.hour12 && (c -= 1),
            c > i && (i = c,
            a = u),
            l++
        }
        return a
    }
    function ee() {
        var e = null !== this && "object" === Ze.typeof(this) && s(this);
        if (!e || !e["[[initializedDateTimeFormat]]"])
            throw new TypeError("`this` value for format() is not an initialized Intl.DateTimeFormat object.");
        if (void 0 === e["[[boundFormat]]"]) {
            var r = function() {
                var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : void 0;
                return ne(this, void 0 === e ? Date.now() : i(e))
            }
              , t = er.call(r, this);
            e["[[boundFormat]]"] = t
        }
        return e["[[boundFormat]]"]
    }
    function re() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : void 0
          , r = null !== this && "object" === Ze.typeof(this) && s(this);
        if (!r || !r["[[initializedDateTimeFormat]]"])
            throw new TypeError("`this` value for formatToParts() is not an initialized Intl.DateTimeFormat object.");
        return oe(this, void 0 === e ? Date.now() : i(e))
    }
    function te(e, r) {
        if (!isFinite(r))
            throw new RangeError("Invalid valid date passed to format");
        var o = e.__getInternalProperties(tr);
        n();
        for (var i = o["[[locale]]"], a = new hr.NumberFormat([i],{
            useGrouping: !1
        }), l = new hr.NumberFormat([i],{
            minimumIntegerDigits: 2,
            useGrouping: !1
        }), s = ie(r, o["[[calendar]]"], o["[[timeZone]]"]), u = o["[[pattern]]"], c = new t, f = 0, g = u.indexOf("{"), h = 0, m = o["[[dataLocale]]"], v = rr.DateTimeFormat["[[localeData]]"][m].calendars, p = o["[[calendar]]"]; -1 !== g; ) {
            var d = void 0;
            if (-1 === (h = u.indexOf("}", g)))
                throw new Error("Unclosed pattern");
            g > f && Ve.call(c, {
                type: "literal",
                value: u.substring(f, g)
            });
            var y = u.substring(g + 1, h);
            if (xr.hasOwnProperty(y)) {
                var b = o["[[" + y + "]]"]
                  , w = s["[[" + y + "]]"];
                if ("year" === y && w <= 0 ? w = 1 - w : "month" === y ? w++ : "hour" === y && !0 === o["[[hour12]]"] && 0 === (w %= 12) && !0 === o["[[hourNo0]]"] && (w = 12),
                "numeric" === b)
                    d = R(a, w);
                else if ("2-digit" === b)
                    d = R(l, w),
                    d.length > 2 && (d = d.slice(-2));
                else if (b in Sr)
                    switch (y) {
                    case "month":
                        d = Y(v, p, "months", b, s["[[" + y + "]]"]);
                        break;
                    case "weekday":
                        try {
                            d = Y(v, p, "days", b, s["[[" + y + "]]"])
                        } catch (e) {
                            throw new Error("Could not find weekday data for locale " + i)
                        }
                        break;
                    case "timeZoneName":
                        d = "";
                        break;
                    case "era":
                        try {
                            d = Y(v, p, "eras", b, s["[[" + y + "]]"])
                        } catch (e) {
                            throw new Error("Could not find era data for locale " + i)
                        }
                        break;
                    default:
                        d = s["[[" + y + "]]"]
                    }
                Ve.call(c, {
                    type: y,
                    value: d
                })
            } else if ("ampm" === y) {
                var k = s["[[hour]]"];
                d = Y(v, p, "dayPeriods", k > 11 ? "pm" : "am", null),
                Ve.call(c, {
                    type: "dayPeriod",
                    value: d
                })
            } else
                Ve.call(c, {
                    type: "literal",
                    value: u.substring(g, h + 1)
                });
            f = h + 1,
            g = u.indexOf("{", f)
        }
        return h < u.length - 1 && Ve.call(c, {
            type: "literal",
            value: u.substr(h + 1)
        }),
        c
    }
    function ne(e, r) {
        for (var t = te(e, r), n = "", o = 0; t.length > o; o++) {
            n += t[o].value
        }
        return n
    }
    function oe(e, r) {
        for (var t = te(e, r), n = [], o = 0; t.length > o; o++) {
            var i = t[o];
            n.push({
                type: i.type,
                value: i.value
            })
        }
        return n
    }
    function ie(e, t, n) {
        var o = new Date(e)
          , i = "get" + (n || "");
        return new r({
            "[[weekday]]": o[i + "Day"](),
            "[[era]]": +(o[i + "FullYear"]() >= 0),
            "[[year]]": o[i + "FullYear"](),
            "[[month]]": o[i + "Month"](),
            "[[day]]": o[i + "Date"](),
            "[[hour]]": o[i + "Hours"](),
            "[[minute]]": o[i + "Minutes"](),
            "[[second]]": o[i + "Seconds"](),
            "[[inDST]]": !1
        })
    }
    function ae() {
        var e = arguments[0]
          , r = arguments[1];
        return this && this !== hr ? le(o(this), e, r) : new hr.PluralRules(e,r)
    }
    function le(e, n, i) {
        var a = s(e);
        if (!0 === a["[[InitializedIntlObject]]"])
            throw new TypeError("`this` object has already been initialized as an Intl object");
        Ke(e, "__getInternalProperties", {
            value: function() {
                if (arguments[0] === tr)
                    return a
            }
        }),
        a["[[InitializedIntlObject]]"] = !0;
        var l = v(n);
        i = void 0 === i ? {} : o(i);
        var u = j(i, "type", "string", new t("cardinal","ordinal"), "cardinal");
        a["[[type]]"] = u;
        var c = new r
          , f = j(i, "localeMatcher", "string", new t("lookup","best fit"), "best fit");
        c["[[localeMatcher]]"] = f,
        O(rr, i, 0),
        void 0 === rr["[[maximumFractionDigits]]"] && (rr["[[maximumFractionDigits]]"] = Math.max(rr["[[minimumFractionDigits]]"], 3));
        var g = rr.PluralRules["[[localeData]]"]
          , h = w(rr.PluralRules["[[availableLocales]]"], l, c, rr.PluralRules["[[relevantExtensionKeys]]"], g);
        return a["[[locale]]"] = h["[[locale]]"],
        a["[[InitializedPluralRules]]"] = !0,
        e
    }
    function se(e, r, t) {
        for (var n = e; n; n = n.replace(/[-_]?[^-_]*$/, "")) {
            var o = Dr[n];
            if (o)
                return o(t, "ordinal" === r)
        }
        return "other"
    }
    function ue(e, r) {
        if (!Number.isFinite(r))
            return "other";
        var t = s(e);
        return se(t["[[locale]]"], t["[[type]]"], r)
    }
    function ce(e, r) {
        if (!e.number)
            throw new Error("Object passed doesn't contain locale data for Intl.NumberFormat");
        var t = void 0
          , n = [r]
          , o = r.split("-");
        for (o.length > 2 && 4 === o[1].length && Ve.call(n, o[0] + "-" + o[2]); t = Qe.call(n); )
            Ve.call(rr.NumberFormat["[[availableLocales]]"], t),
            rr.NumberFormat["[[localeData]]"][t] = e.number,
            e.date && (e.date.nu = e.number.nu,
            Ve.call(rr.DateTimeFormat["[[availableLocales]]"], t),
            rr.DateTimeFormat["[[localeData]]"][t] = e.date);
        void 0 === ur && u(r)
    }
    var fe = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
        return typeof e
    }
    : function(e) {
        return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
    }
      , ge = function() {
        var e = "function" == typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103;
        return function(r, t, n, o) {
            var i = r && r.defaultProps
              , a = arguments.length - 3;
            if (t || 0 === a || (t = {}),
            t && i)
                for (var l in i)
                    void 0 === t[l] && (t[l] = i[l]);
            else
                t || (t = i || {});
            if (1 === a)
                t.children = o;
            else if (a > 1) {
                for (var s = Array(a), u = 0; u < a; u++)
                    s[u] = arguments[u + 3];
                t.children = s
            }
            return {
                $$typeof: e,
                type: r,
                key: void 0 === n ? null : "" + n,
                ref: null,
                props: t,
                _owner: null
            }
        }
    }()
      , he = function(e) {
        if ("function" == typeof Symbol) {
            if (Symbol.asyncIterator) {
                var r = e[Symbol.asyncIterator];
                if (null != r)
                    return r.call(e)
            }
            if (Symbol.iterator)
                return e[Symbol.iterator]()
        }
        throw new TypeError("Object is not async iterable")
    }
      , me = function() {
        function e(e) {
            this.value = e
        }
        function r(r) {
            function t(e, r) {
                return new Promise(function(t, o) {
                    var l = {
                        key: e,
                        arg: r,
                        resolve: t,
                        reject: o,
                        next: null
                    };
                    a ? a = a.next = l : (i = a = l,
                    n(e, r))
                }
                )
            }
            function n(t, i) {
                try {
                    var a = r[t](i)
                      , l = a.value;
                    l instanceof e ? Promise.resolve(l.value).then(function(e) {
                        n("next", e)
                    }, function(e) {
                        n("throw", e)
                    }) : o(a.done ? "return" : "normal", a.value)
                } catch (e) {
                    o("throw", e)
                }
            }
            function o(e, r) {
                switch (e) {
                case "return":
                    i.resolve({
                        value: r,
                        done: !0
                    });
                    break;
                case "throw":
                    i.reject(r);
                    break;
                default:
                    i.resolve({
                        value: r,
                        done: !1
                    })
                }
                i = i.next,
                i ? n(i.key, i.arg) : a = null
            }
            var i, a;
            this._invoke = t,
            "function" != typeof r.return && (this.return = void 0)
        }
        return "function" == typeof Symbol && Symbol.asyncIterator && (r.prototype[Symbol.asyncIterator] = function() {
            return this
        }
        ),
        r.prototype.next = function(e) {
            return this._invoke("next", e)
        }
        ,
        r.prototype.throw = function(e) {
            return this._invoke("throw", e)
        }
        ,
        r.prototype.return = function(e) {
            return this._invoke("return", e)
        }
        ,
        {
            wrap: function(e) {
                return function() {
                    return new r(e.apply(this, arguments))
                }
            },
            await: function(r) {
                return new e(r)
            }
        }
    }()
      , ve = function(e, r) {
        function t(t, n) {
            return o = !0,
            n = new Promise(function(r) {
                r(e[t](n))
            }
            ),
            {
                done: !1,
                value: r(n)
            }
        }
        var n = {}
          , o = !1;
        return "function" == typeof Symbol && Symbol.iterator && (n[Symbol.iterator] = function() {
            return this
        }
        ),
        n.next = function(e) {
            return o ? (o = !1,
            e) : t("next", e)
        }
        ,
        "function" == typeof e.throw && (n.throw = function(e) {
            if (o)
                throw o = !1,
                e;
            return t("throw", e)
        }
        ),
        "function" == typeof e.return && (n.return = function(e) {
            return t("return", e)
        }
        ),
        n
    }
      , pe = function(e) {
        return function() {
            var r = e.apply(this, arguments);
            return new Promise(function(e, t) {
                function n(o, i) {
                    try {
                        var a = r[o](i)
                          , l = a.value
                    } catch (e) {
                        return void t(e)
                    }
                    if (!a.done)
                        return Promise.resolve(l).then(function(e) {
                            n("next", e)
                        }, function(e) {
                            n("throw", e)
                        });
                    e(l)
                }
                return n("next")
            }
            )
        }
    }
      , de = function(e, r) {
        if (!(e instanceof r))
            throw new TypeError("Cannot call a class as a function")
    }
      , ye = function() {
        function e(e, r) {
            for (var t = 0; t < r.length; t++) {
                var n = r[t];
                n.enumerable = n.enumerable || !1,
                n.configurable = !0,
                "value"in n && (n.writable = !0),
                Object.defineProperty(e, n.key, n)
            }
        }
        return function(r, t, n) {
            return t && e(r.prototype, t),
            n && e(r, n),
            r
        }
    }()
      , be = function(e, r) {
        for (var t in r) {
            var n = r[t];
            n.configurable = n.enumerable = !0,
            "value"in n && (n.writable = !0),
            Object.defineProperty(e, t, n)
        }
        return e
    }
      , we = function(e, r) {
        for (var t = Object.getOwnPropertyNames(r), n = 0; n < t.length; n++) {
            var o = t[n]
              , i = Object.getOwnPropertyDescriptor(r, o);
            i && i.configurable && void 0 === e[o] && Object.defineProperty(e, o, i)
        }
        return e
    }
      , ke = function(e, r, t) {
        return r in e ? Object.defineProperty(e, r, {
            value: t,
            enumerable: !0,
            configurable: !0,
            writable: !0
        }) : e[r] = t,
        e
    }
      , Se = Object.assign || function(e) {
        for (var r = 1; r < arguments.length; r++) {
            var t = arguments[r];
            for (var n in t)
                Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n])
        }
        return e
    }
      , xe = function e(r, t, n) {
        null === r && (r = Function.prototype);
        var o = Object.getOwnPropertyDescriptor(r, t);
        if (void 0 === o) {
            var i = Object.getPrototypeOf(r);
            return null === i ? void 0 : e(i, t, n)
        }
        if ("value"in o)
            return o.value;
        var a = o.get;
        if (void 0 !== a)
            return a.call(n)
    }
      , je = function(e, r) {
        if ("function" != typeof r && null !== r)
            throw new TypeError("Super expression must either be null or a function, not " + typeof r);
        e.prototype = Object.create(r && r.prototype, {
            constructor: {
                value: e,
                enumerable: !1,
                writable: !0,
                configurable: !0
            }
        }),
        r && (Object.setPrototypeOf ? Object.setPrototypeOf(e, r) : e.__proto__ = r)
    }
      , ze = function(e, r) {
        return null != r && "undefined" != typeof Symbol && r[Symbol.hasInstance] ? r[Symbol.hasInstance](e) : e instanceof r
    }
      , De = function(e) {
        return e && e.__esModule ? e : {
            default: e
        }
    }
      , Fe = function(e) {
        if (e && e.__esModule)
            return e;
        var r = {};
        if (null != e)
            for (var t in e)
                Object.prototype.hasOwnProperty.call(e, t) && (r[t] = e[t]);
        return r.default = e,
        r
    }
      , Oe = function(e, r) {
        if (e !== r)
            throw new TypeError("Cannot instantiate an arrow function")
    }
      , Ne = function(e) {
        if (null == e)
            throw new TypeError("Cannot destructure undefined")
    }
      , Pe = function(e, r) {
        var t = {};
        for (var n in e)
            r.indexOf(n) >= 0 || Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
        return t
    }
      , Ee = function(e, r) {
        if (!e)
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return !r || "object" != typeof r && "function" != typeof r ? e : r
    }
      , Le = "undefined" == typeof global ? self : global
      , _e = function e(r, t, n, o) {
        var i = Object.getOwnPropertyDescriptor(r, t);
        if (void 0 === i) {
            var a = Object.getPrototypeOf(r);
            null !== a && e(a, t, n, o)
        } else if ("value"in i && i.writable)
            i.value = n;
        else {
            var l = i.set;
            void 0 !== l && l.call(o, n)
        }
        return n
    }
      , Te = function() {
        function e(e, r) {
            var t = []
              , n = !0
              , o = !1
              , i = void 0;
            try {
                for (var a, l = e[Symbol.iterator](); !(n = (a = l.next()).done) && (t.push(a.value),
                !r || t.length !== r); n = !0)
                    ;
            } catch (e) {
                o = !0,
                i = e
            } finally {
                try {
                    !n && l.return && l.return()
                } finally {
                    if (o)
                        throw i
                }
            }
            return t
        }
        return function(r, t) {
            if (Array.isArray(r))
                return r;
            if (Symbol.iterator in Object(r))
                return e(r, t);
            throw new TypeError("Invalid attempt to destructure non-iterable instance")
        }
    }()
      , Ie = function(e, r) {
        if (Array.isArray(e))
            return e;
        if (Symbol.iterator in Object(e)) {
            for (var t, n = [], o = e[Symbol.iterator](); !(t = o.next()).done && (n.push(t.value),
            !r || n.length !== r); )
                ;
            return n
        }
        throw new TypeError("Invalid attempt to destructure non-iterable instance")
    }
      , Re = function(e, r) {
        return Object.freeze(Object.defineProperties(e, {
            raw: {
                value: Object.freeze(r)
            }
        }))
    }
      , Me = function(e, r) {
        return e.raw = r,
        e
    }
      , Ae = function(e, r, t) {
        if (e === t)
            throw new ReferenceError(r + " is not defined - temporal dead zone");
        return e
    }
      , qe = {}
      , Ce = function(e) {
        return Array.isArray(e) ? e : Array.from(e)
    }
      , Ge = function(e) {
        if (Array.isArray(e)) {
            for (var r = 0, t = Array(e.length); r < e.length; r++)
                t[r] = e[r];
            return t
        }
        return Array.from(e)
    }
      , Ze = Object.freeze({
        jsx: ge,
        asyncIterator: he,
        asyncGenerator: me,
        asyncGeneratorDelegate: ve,
        asyncToGenerator: pe,
        classCallCheck: de,
        createClass: ye,
        defineEnumerableProperties: be,
        defaults: we,
        defineProperty: ke,
        get: xe,
        inherits: je,
        interopRequireDefault: De,
        interopRequireWildcard: Fe,
        newArrowCheck: Oe,
        objectDestructuringEmpty: Ne,
        objectWithoutProperties: Pe,
        possibleConstructorReturn: Ee,
        selfGlobal: Le,
        set: _e,
        slicedToArray: Te,
        slicedToArrayLoose: Ie,
        taggedTemplateLiteral: Re,
        taggedTemplateLiteralLoose: Me,
        temporalRef: Ae,
        temporalUndefined: qe,
        toArray: Ce,
        toConsumableArray: Ge,
        typeof: fe,
        extends: Se,
        instanceof: ze
    })
      , $e = function() {
        var e = function() {};
        try {
            return Object.defineProperty(e, "a", {
                get: function() {
                    return 1
                }
            }),
            Object.defineProperty(e, "prototype", {
                writable: !1
            }),
            1 === e.a && e.prototype instanceof Object
        } catch (e) {
            return !1
        }
    }()
      , Be = !$e && !Object.prototype.__defineGetter__
      , Ue = Object.prototype.hasOwnProperty
      , Ke = $e ? Object.defineProperty : function(e, r, t) {
        "get"in t && e.__defineGetter__ ? e.__defineGetter__(r, t.get) : (!Ue.call(e, r) || "value"in t) && (e[r] = t.value)
    }
      , Ye = Array.prototype.indexOf || function(e) {
        var r = this;
        if (!r.length)
            return -1;
        for (var t = arguments[1] || 0, n = r.length; t < n; t++)
            if (r[t] === e)
                return t;
        return -1
    }
      , He = Object.create || function(e, r) {
        function t() {}
        var n = void 0;
        t.prototype = e,
        n = new t;
        for (var o in r)
            Ue.call(r, o) && Ke(n, o, r[o]);
        return n
    }
      , We = Array.prototype.slice
      , Xe = Array.prototype.concat
      , Ve = Array.prototype.push
      , Je = Array.prototype.join
      , Qe = Array.prototype.shift
      , er = Function.prototype.bind || function(e) {
        var r = this
          , t = We.call(arguments, 1);
        return r.length,
        function() {
            return r.apply(e, Xe.call(t, We.call(arguments)))
        }
    }
      , rr = He(null)
      , tr = Math.random();
    r.prototype = He(null),
    t.prototype = He(null);
    var nr = "(?:[a-z0-9]{5,8}|\\d[a-z0-9]{3})"
      , or = "[0-9a-wy-z](?:-[a-z0-9]{2,8})+"
      , ir = RegExp("^(?:(?:[a-z]{2,3}(?:-[a-z]{3}(?:-[a-z]{3}){0,2})?|[a-z]{4}|[a-z]{5,8})(?:-[a-z]{4})?(?:-(?:[a-z]{2}|\\d{3}))?(?:-" + nr + ")*(?:-" + or + ")*(?:-x(?:-[a-z0-9]{1,8})+)?|x(?:-[a-z0-9]{1,8})+|(?:(?:en-GB-oed|i-(?:ami|bnn|default|enochian|hak|klingon|lux|mingo|navajo|pwn|tao|tay|tsu)|sgn-(?:BE-FR|BE-NL|CH-DE))|(?:art-lojban|cel-gaulish|no-bok|no-nyn|zh-(?:guoyu|hakka|min|min-nan|xiang))))$", "i")
      , ar = RegExp("^(?!x).*?-(" + nr + ")-(?:\\w{4,8}-(?!x-))*\\1\\b", "i")
      , lr = RegExp("^(?!x).*?-([0-9a-wy-z])-(?:\\w+-(?!x-))*\\1\\b", "i")
      , sr = RegExp("-" + or, "ig")
      , ur = void 0
      , cr = {
        tags: {
            "art-lojban": "jbo",
            "i-ami": "ami",
            "i-bnn": "bnn",
            "i-hak": "hak",
            "i-klingon": "tlh",
            "i-lux": "lb",
            "i-navajo": "nv",
            "i-pwn": "pwn",
            "i-tao": "tao",
            "i-tay": "tay",
            "i-tsu": "tsu",
            "no-bok": "nb",
            "no-nyn": "nn",
            "sgn-BE-FR": "sfb",
            "sgn-BE-NL": "vgt",
            "sgn-CH-DE": "sgg",
            "zh-guoyu": "cmn",
            "zh-hakka": "hak",
            "zh-min-nan": "nan",
            "zh-xiang": "hsn",
            "sgn-BR": "bzs",
            "sgn-CO": "csn",
            "sgn-DE": "gsg",
            "sgn-DK": "dsl",
            "sgn-ES": "ssp",
            "sgn-FR": "fsl",
            "sgn-GB": "bfi",
            "sgn-GR": "gss",
            "sgn-IE": "isg",
            "sgn-IT": "ise",
            "sgn-JP": "jsl",
            "sgn-MX": "mfs",
            "sgn-NI": "ncs",
            "sgn-NL": "dse",
            "sgn-NO": "nsl",
            "sgn-PT": "psr",
            "sgn-SE": "swl",
            "sgn-US": "ase",
            "sgn-ZA": "sfs",
            "zh-cmn": "cmn",
            "zh-cmn-Hans": "cmn-Hans",
            "zh-cmn-Hant": "cmn-Hant",
            "zh-gan": "gan",
            "zh-wuu": "wuu",
            "zh-yue": "yue"
        },
        subtags: {
            BU: "MM",
            DD: "DE",
            FX: "FR",
            TP: "TL",
            YD: "YE",
            ZR: "CD",
            heploc: "alalc97",
            in: "id",
            iw: "he",
            ji: "yi",
            jw: "jv",
            mo: "ro",
            ayx: "nun",
            bjd: "drl",
            ccq: "rki",
            cjr: "mom",
            cka: "cmr",
            cmk: "xch",
            drh: "khk",
            drw: "prs",
            gav: "dev",
            hrr: "jal",
            ibi: "opa",
            kgh: "kml",
            lcq: "ppr",
            mst: "mry",
            myt: "mry",
            sca: "hle",
            tie: "ras",
            tkk: "twm",
            tlw: "weo",
            tnf: "prs",
            ybd: "rki",
            yma: "lrr"
        },
        extLang: {
            aao: ["aao", "ar"],
            abh: ["abh", "ar"],
            abv: ["abv", "ar"],
            acm: ["acm", "ar"],
            acq: ["acq", "ar"],
            acw: ["acw", "ar"],
            acx: ["acx", "ar"],
            acy: ["acy", "ar"],
            adf: ["adf", "ar"],
            ads: ["ads", "sgn"],
            aeb: ["aeb", "ar"],
            aec: ["aec", "ar"],
            aed: ["aed", "sgn"],
            aen: ["aen", "sgn"],
            afb: ["afb", "ar"],
            afg: ["afg", "sgn"],
            ajp: ["ajp", "ar"],
            apc: ["apc", "ar"],
            apd: ["apd", "ar"],
            arb: ["arb", "ar"],
            arq: ["arq", "ar"],
            ars: ["ars", "ar"],
            ary: ["ary", "ar"],
            arz: ["arz", "ar"],
            ase: ["ase", "sgn"],
            asf: ["asf", "sgn"],
            asp: ["asp", "sgn"],
            asq: ["asq", "sgn"],
            asw: ["asw", "sgn"],
            auz: ["auz", "ar"],
            avl: ["avl", "ar"],
            ayh: ["ayh", "ar"],
            ayl: ["ayl", "ar"],
            ayn: ["ayn", "ar"],
            ayp: ["ayp", "ar"],
            bbz: ["bbz", "ar"],
            bfi: ["bfi", "sgn"],
            bfk: ["bfk", "sgn"],
            bjn: ["bjn", "ms"],
            bog: ["bog", "sgn"],
            bqn: ["bqn", "sgn"],
            bqy: ["bqy", "sgn"],
            btj: ["btj", "ms"],
            bve: ["bve", "ms"],
            bvl: ["bvl", "sgn"],
            bvu: ["bvu", "ms"],
            bzs: ["bzs", "sgn"],
            cdo: ["cdo", "zh"],
            cds: ["cds", "sgn"],
            cjy: ["cjy", "zh"],
            cmn: ["cmn", "zh"],
            coa: ["coa", "ms"],
            cpx: ["cpx", "zh"],
            csc: ["csc", "sgn"],
            csd: ["csd", "sgn"],
            cse: ["cse", "sgn"],
            csf: ["csf", "sgn"],
            csg: ["csg", "sgn"],
            csl: ["csl", "sgn"],
            csn: ["csn", "sgn"],
            csq: ["csq", "sgn"],
            csr: ["csr", "sgn"],
            czh: ["czh", "zh"],
            czo: ["czo", "zh"],
            doq: ["doq", "sgn"],
            dse: ["dse", "sgn"],
            dsl: ["dsl", "sgn"],
            dup: ["dup", "ms"],
            ecs: ["ecs", "sgn"],
            esl: ["esl", "sgn"],
            esn: ["esn", "sgn"],
            eso: ["eso", "sgn"],
            eth: ["eth", "sgn"],
            fcs: ["fcs", "sgn"],
            fse: ["fse", "sgn"],
            fsl: ["fsl", "sgn"],
            fss: ["fss", "sgn"],
            gan: ["gan", "zh"],
            gds: ["gds", "sgn"],
            gom: ["gom", "kok"],
            gse: ["gse", "sgn"],
            gsg: ["gsg", "sgn"],
            gsm: ["gsm", "sgn"],
            gss: ["gss", "sgn"],
            gus: ["gus", "sgn"],
            hab: ["hab", "sgn"],
            haf: ["haf", "sgn"],
            hak: ["hak", "zh"],
            hds: ["hds", "sgn"],
            hji: ["hji", "ms"],
            hks: ["hks", "sgn"],
            hos: ["hos", "sgn"],
            hps: ["hps", "sgn"],
            hsh: ["hsh", "sgn"],
            hsl: ["hsl", "sgn"],
            hsn: ["hsn", "zh"],
            icl: ["icl", "sgn"],
            ils: ["ils", "sgn"],
            inl: ["inl", "sgn"],
            ins: ["ins", "sgn"],
            ise: ["ise", "sgn"],
            isg: ["isg", "sgn"],
            isr: ["isr", "sgn"],
            jak: ["jak", "ms"],
            jax: ["jax", "ms"],
            jcs: ["jcs", "sgn"],
            jhs: ["jhs", "sgn"],
            jls: ["jls", "sgn"],
            jos: ["jos", "sgn"],
            jsl: ["jsl", "sgn"],
            jus: ["jus", "sgn"],
            kgi: ["kgi", "sgn"],
            knn: ["knn", "kok"],
            kvb: ["kvb", "ms"],
            kvk: ["kvk", "sgn"],
            kvr: ["kvr", "ms"],
            kxd: ["kxd", "ms"],
            lbs: ["lbs", "sgn"],
            lce: ["lce", "ms"],
            lcf: ["lcf", "ms"],
            liw: ["liw", "ms"],
            lls: ["lls", "sgn"],
            lsg: ["lsg", "sgn"],
            lsl: ["lsl", "sgn"],
            lso: ["lso", "sgn"],
            lsp: ["lsp", "sgn"],
            lst: ["lst", "sgn"],
            lsy: ["lsy", "sgn"],
            ltg: ["ltg", "lv"],
            lvs: ["lvs", "lv"],
            lzh: ["lzh", "zh"],
            max: ["max", "ms"],
            mdl: ["mdl", "sgn"],
            meo: ["meo", "ms"],
            mfa: ["mfa", "ms"],
            mfb: ["mfb", "ms"],
            mfs: ["mfs", "sgn"],
            min: ["min", "ms"],
            mnp: ["mnp", "zh"],
            mqg: ["mqg", "ms"],
            mre: ["mre", "sgn"],
            msd: ["msd", "sgn"],
            msi: ["msi", "ms"],
            msr: ["msr", "sgn"],
            mui: ["mui", "ms"],
            mzc: ["mzc", "sgn"],
            mzg: ["mzg", "sgn"],
            mzy: ["mzy", "sgn"],
            nan: ["nan", "zh"],
            nbs: ["nbs", "sgn"],
            ncs: ["ncs", "sgn"],
            nsi: ["nsi", "sgn"],
            nsl: ["nsl", "sgn"],
            nsp: ["nsp", "sgn"],
            nsr: ["nsr", "sgn"],
            nzs: ["nzs", "sgn"],
            okl: ["okl", "sgn"],
            orn: ["orn", "ms"],
            ors: ["ors", "ms"],
            pel: ["pel", "ms"],
            pga: ["pga", "ar"],
            pks: ["pks", "sgn"],
            prl: ["prl", "sgn"],
            prz: ["prz", "sgn"],
            psc: ["psc", "sgn"],
            psd: ["psd", "sgn"],
            pse: ["pse", "ms"],
            psg: ["psg", "sgn"],
            psl: ["psl", "sgn"],
            pso: ["pso", "sgn"],
            psp: ["psp", "sgn"],
            psr: ["psr", "sgn"],
            pys: ["pys", "sgn"],
            rms: ["rms", "sgn"],
            rsi: ["rsi", "sgn"],
            rsl: ["rsl", "sgn"],
            sdl: ["sdl", "sgn"],
            sfb: ["sfb", "sgn"],
            sfs: ["sfs", "sgn"],
            sgg: ["sgg", "sgn"],
            sgx: ["sgx", "sgn"],
            shu: ["shu", "ar"],
            slf: ["slf", "sgn"],
            sls: ["sls", "sgn"],
            sqk: ["sqk", "sgn"],
            sqs: ["sqs", "sgn"],
            ssh: ["ssh", "ar"],
            ssp: ["ssp", "sgn"],
            ssr: ["ssr", "sgn"],
            svk: ["svk", "sgn"],
            swc: ["swc", "sw"],
            swh: ["swh", "sw"],
            swl: ["swl", "sgn"],
            syy: ["syy", "sgn"],
            tmw: ["tmw", "ms"],
            tse: ["tse", "sgn"],
            tsm: ["tsm", "sgn"],
            tsq: ["tsq", "sgn"],
            tss: ["tss", "sgn"],
            tsy: ["tsy", "sgn"],
            tza: ["tza", "sgn"],
            ugn: ["ugn", "sgn"],
            ugy: ["ugy", "sgn"],
            ukl: ["ukl", "sgn"],
            uks: ["uks", "sgn"],
            urk: ["urk", "ms"],
            uzn: ["uzn", "uz"],
            uzs: ["uzs", "uz"],
            vgt: ["vgt", "sgn"],
            vkk: ["vkk", "ms"],
            vkt: ["vkt", "ms"],
            vsi: ["vsi", "sgn"],
            vsl: ["vsl", "sgn"],
            vsv: ["vsv", "sgn"],
            wuu: ["wuu", "zh"],
            xki: ["xki", "sgn"],
            xml: ["xml", "sgn"],
            xmm: ["xmm", "ms"],
            xms: ["xms", "sgn"],
            yds: ["yds", "sgn"],
            ysl: ["ysl", "sgn"],
            yue: ["yue", "zh"],
            zib: ["zib", "sgn"],
            zlm: ["zlm", "ms"],
            zmi: ["zmi", "ms"],
            zsl: ["zsl", "sgn"],
            zsm: ["zsm", "ms"]
        }
    }
      , fr = /^[A-Z]{3}$/
      , gr = /-u(?:-[0-9a-z]{2,8})+/gi
      , hr = {};
    Object.defineProperty(hr, "getCanonicalLocales", {
        enumerable: !1,
        configurable: !0,
        writable: !0,
        value: D
    });
    var mr = {
        BHD: 3,
        BYR: 0,
        XOF: 0,
        BIF: 0,
        XAF: 0,
        CLF: 4,
        CLP: 0,
        KMF: 0,
        DJF: 0,
        XPF: 0,
        GNF: 0,
        ISK: 0,
        IQD: 3,
        JPY: 0,
        JOD: 3,
        KRW: 0,
        KWD: 3,
        LYD: 3,
        OMR: 3,
        PYG: 0,
        RWF: 0,
        TND: 3,
        UGX: 0,
        UYI: 0,
        VUV: 0,
        VND: 0
    };
    Ke(hr, "NumberFormat", {
        configurable: !0,
        writable: !0,
        value: F
    }),
    Ke(hr.NumberFormat, "prototype", {
        writable: !1
    }),
    rr.NumberFormat = {
        "[[availableLocales]]": [],
        "[[relevantExtensionKeys]]": ["nu"],
        "[[localeData]]": {}
    },
    Ke(hr.NumberFormat, "supportedLocalesOf", {
        configurable: !0,
        writable: !0,
        value: er.call(function(e) {
            if (!Ue.call(this, "[[availableLocales]]"))
                throw new TypeError("supportedLocalesOf() is not a constructor");
            var r = n()
              , t = arguments[1]
              , o = this["[[availableLocales]]"]
              , i = v(e);
            return r(),
            x(o, i, t)
        }, rr.NumberFormat)
    }),
    Ke(hr.NumberFormat.prototype, "format", {
        configurable: !0,
        get: E
    }),
    Object.defineProperty(hr.NumberFormat.prototype, "formatToParts", {
        configurable: !0,
        enumerable: !1,
        writable: !0,
        value: L
    });
    var vr = {
        arab: ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"],
        arabext: ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"],
        bali: ["᭐", "᭑", "᭒", "᭓", "᭔", "᭕", "᭖", "᭗", "᭘", "᭙"],
        beng: ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"],
        deva: ["०", "१", "२", "३", "४", "५", "६", "७", "८", "९"],
        fullwide: ["０", "１", "２", "３", "４", "５", "６", "７", "８", "９"],
        gujr: ["૦", "૧", "૨", "૩", "૪", "૫", "૬", "૭", "૮", "૯"],
        guru: ["੦", "੧", "੨", "੩", "੪", "੫", "੬", "੭", "੮", "੯"],
        hanidec: ["〇", "一", "二", "三", "四", "五", "六", "七", "八", "九"],
        khmr: ["០", "១", "២", "៣", "៤", "៥", "៦", "៧", "៨", "៩"],
        knda: ["೦", "೧", "೨", "೩", "೪", "೫", "೬", "೭", "೮", "೯"],
        laoo: ["໐", "໑", "໒", "໓", "໔", "໕", "໖", "໗", "໘", "໙"],
        latn: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
        limb: ["᥆", "᥇", "᥈", "᥉", "᥊", "᥋", "᥌", "᥍", "᥎", "᥏"],
        mlym: ["൦", "൧", "൨", "൩", "൪", "൫", "൬", "൭", "൮", "൯"],
        mong: ["᠐", "᠑", "᠒", "᠓", "᠔", "᠕", "᠖", "᠗", "᠘", "᠙"],
        mymr: ["၀", "၁", "၂", "၃", "၄", "၅", "၆", "၇", "၈", "၉"],
        orya: ["୦", "୧", "୨", "୩", "୪", "୫", "୬", "୭", "୮", "୯"],
        tamldec: ["௦", "௧", "௨", "௩", "௪", "௫", "௬", "௭", "௮", "௯"],
        telu: ["౦", "౧", "౨", "౩", "౪", "౫", "౬", "౭", "౮", "౯"],
        thai: ["๐", "๑", "๒", "๓", "๔", "๕", "๖", "๗", "๘", "๙"],
        tibt: ["༠", "༡", "༢", "༣", "༤", "༥", "༦", "༧", "༨", "༩"]
    };
    Ke(hr.NumberFormat.prototype, "resolvedOptions", {
        configurable: !0,
        writable: !0,
        value: function() {
            var e = void 0
              , t = new r
              , n = ["locale", "numberingSystem", "style", "currency", "currencyDisplay", "minimumIntegerDigits", "minimumFractionDigits", "maximumFractionDigits", "minimumSignificantDigits", "maximumSignificantDigits", "useGrouping"]
              , o = null !== this && "object" === Ze.typeof(this) && s(this);
            if (!o || !o["[[initializedNumberFormat]]"])
                throw new TypeError("`this` value for resolvedOptions() is not an initialized Intl.NumberFormat object.");
            for (var i = 0, a = n.length; i < a; i++)
                Ue.call(o, e = "[[" + n[i] + "]]") && (t[n[i]] = {
                    value: o[e],
                    writable: !0,
                    configurable: !0,
                    enumerable: !0
                });
            return He({}, t)
        }
    });
    var pr = /(?:[Eec]{1,6}|G{1,5}|[Qq]{1,5}|(?:[yYur]+|U{1,5})|[ML]{1,5}|d{1,2}|D{1,3}|F{1}|[abB]{1,5}|[hkHK]{1,2}|w{1,2}|W{1}|m{1,2}|s{1,2}|[zZOvVxX]{1,4})(?=([^']*'[^']*')*[^']*$)/g
      , dr = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g
      , yr = /[rqQASjJgwWIQq]/
      , br = ["era", "year", "month", "day", "weekday", "quarter"]
      , wr = ["hour", "minute", "second", "hour12", "timeZoneName"]
      , kr = {
        second: {
            numeric: "s",
            "2-digit": "ss"
        },
        minute: {
            numeric: "m",
            "2-digit": "mm"
        },
        year: {
            numeric: "y",
            "2-digit": "yy"
        },
        day: {
            numeric: "d",
            "2-digit": "dd"
        },
        month: {
            numeric: "L",
            "2-digit": "LL",
            narrow: "LLLLL",
            short: "LLL",
            long: "LLLL"
        },
        weekday: {
            narrow: "ccccc",
            short: "ccc",
            long: "cccc"
        }
    }
      , Sr = He(null, {
        narrow: {},
        short: {},
        long: {}
    });
    Ke(hr, "DateTimeFormat", {
        configurable: !0,
        writable: !0,
        value: H
    }),
    Ke(H, "prototype", {
        writable: !1
    });
    var xr = {
        weekday: ["narrow", "short", "long"],
        era: ["narrow", "short", "long"],
        year: ["2-digit", "numeric"],
        month: ["2-digit", "numeric", "narrow", "short", "long"],
        day: ["2-digit", "numeric"],
        hour: ["2-digit", "numeric"],
        minute: ["2-digit", "numeric"],
        second: ["2-digit", "numeric"],
        timeZoneName: ["short", "long"]
    };
    rr.DateTimeFormat = {
        "[[availableLocales]]": [],
        "[[relevantExtensionKeys]]": ["ca", "nu"],
        "[[localeData]]": {}
    },
    Ke(hr.DateTimeFormat, "supportedLocalesOf", {
        configurable: !0,
        writable: !0,
        value: er.call(function(e) {
            if (!Ue.call(this, "[[availableLocales]]"))
                throw new TypeError("supportedLocalesOf() is not a constructor");
            var r = n()
              , t = arguments[1]
              , o = this["[[availableLocales]]"]
              , i = v(e);
            return r(),
            x(o, i, t)
        }, rr.NumberFormat)
    }),
    Ke(hr.DateTimeFormat.prototype, "format", {
        configurable: !0,
        get: ee
    }),
    Object.defineProperty(hr.DateTimeFormat.prototype, "formatToParts", {
        enumerable: !1,
        writable: !0,
        configurable: !0,
        value: re
    }),
    Ke(hr.DateTimeFormat.prototype, "resolvedOptions", {
        writable: !0,
        configurable: !0,
        value: function() {
            var e = void 0
              , t = new r
              , n = ["locale", "calendar", "numberingSystem", "timeZone", "hour12", "weekday", "era", "year", "month", "day", "hour", "minute", "second", "timeZoneName"]
              , o = null !== this && "object" === Ze.typeof(this) && s(this);
            if (!o || !o["[[initializedDateTimeFormat]]"])
                throw new TypeError("`this` value for resolvedOptions() is not an initialized Intl.DateTimeFormat object.");
            for (var i = 0, a = n.length; i < a; i++)
                Ue.call(o, e = "[[" + n[i] + "]]") && (t[n[i]] = {
                    value: o[e],
                    writable: !0,
                    configurable: !0,
                    enumerable: !0
                });
            return He({}, t)
        }
    });
    var jr = hr.__localeSensitiveProtos = {
        Number: {},
        Date: {}
    };
    jr.Number.toLocaleString = function() {
        if ("[object Number]" !== Object.prototype.toString.call(this))
            throw new TypeError("`this` value must be a number for Number.prototype.toLocaleString()");
        return R(new F(arguments[0],arguments[1]), this)
    }
    ,
    jr.Date.toLocaleString = function() {
        if ("[object Date]" !== Object.prototype.toString.call(this))
            throw new TypeError("`this` value must be a Date instance for Date.prototype.toLocaleString()");
        var e = +this;
        if (isNaN(e))
            return "Invalid Date";
        var r = arguments[0]
          , t = arguments[1];
        return t = V(t, "any", "all"),
        ne(new H(r,t), e)
    }
    ,
    jr.Date.toLocaleDateString = function() {
        if ("[object Date]" !== Object.prototype.toString.call(this))
            throw new TypeError("`this` value must be a Date instance for Date.prototype.toLocaleDateString()");
        var e = +this;
        if (isNaN(e))
            return "Invalid Date";
        var r = arguments[0]
          , t = arguments[1];
        return t = V(t, "date", "date"),
        ne(new H(r,t), e)
    }
    ,
    jr.Date.toLocaleTimeString = function() {
        if ("[object Date]" !== Object.prototype.toString.call(this))
            throw new TypeError("`this` value must be a Date instance for Date.prototype.toLocaleTimeString()");
        var e = +this;
        if (isNaN(e))
            return "Invalid Date";
        var r = arguments[0]
          , t = arguments[1];
        return t = V(t, "time", "time"),
        ne(new H(r,t), e)
    }
    ;
    var zr = [function(e, r) {
        return "other"
    }
    , function(e, r) {
        return r ? "other" : 1 == e ? "one" : "other"
    }
    , function(e, r) {
        return r ? "other" : 0 == e || 1 == e ? "one" : "other"
    }
    , function(e, r) {
        var t = String(e).split(".")
          , n = !t[1];
        return r ? "other" : 1 == e && n ? "one" : "other"
    }
    ]
      , Dr = {
        af: zr[1],
        ak: zr[2],
        am: function(e, r) {
            return r ? "other" : e >= 0 && e <= 1 ? "one" : "other"
        },
        ar: function(e, r) {
            var t = String(e).split(".")
              , n = Number(t[0]) == e
              , o = n && t[0].slice(-2);
            return r ? "other" : 0 == e ? "zero" : 1 == e ? "one" : 2 == e ? "two" : o >= 3 && o <= 10 ? "few" : o >= 11 && o <= 99 ? "many" : "other"
        },
        ars: function(e, r) {
            var t = String(e).split(".")
              , n = Number(t[0]) == e
              , o = n && t[0].slice(-2);
            return r ? "other" : 0 == e ? "zero" : 1 == e ? "one" : 2 == e ? "two" : o >= 3 && o <= 10 ? "few" : o >= 11 && o <= 99 ? "many" : "other"
        },
        as: function(e, r) {
            return r ? 1 == e || 5 == e || 7 == e || 8 == e || 9 == e || 10 == e ? "one" : 2 == e || 3 == e ? "two" : 4 == e ? "few" : 6 == e ? "many" : "other" : e >= 0 && e <= 1 ? "one" : "other"
        },
        asa: zr[1],
        ast: zr[3],
        az: function(e, r) {
            var t = String(e).split(".")
              , n = t[0]
              , o = n.slice(-1)
              , i = n.slice(-2)
              , a = n.slice(-3);
            return r ? 1 == o || 2 == o || 5 == o || 7 == o || 8 == o || 20 == i || 50 == i || 70 == i || 80 == i ? "one" : 3 == o || 4 == o || 100 == a || 200 == a || 300 == a || 400 == a || 500 == a || 600 == a || 700 == a || 800 == a || 900 == a ? "few" : 0 == n || 6 == o || 40 == i || 60 == i || 90 == i ? "many" : "other" : 1 == e ? "one" : "other"
        },
        be: function(e, r) {
            var t = String(e).split(".")
              , n = Number(t[0]) == e
              , o = n && t[0].slice(-1)
              , i = n && t[0].slice(-2);
            return r ? 2 != o && 3 != o || 12 == i || 13 == i ? "other" : "few" : 1 == o && 11 != i ? "one" : o >= 2 && o <= 4 && (i < 12 || i > 14) ? "few" : n && 0 == o || o >= 5 && o <= 9 || i >= 11 && i <= 14 ? "many" : "other"
        },
        bem: zr[1],
        bez: zr[1],
        bg: zr[1],
        bh: zr[2],
        bm: zr[0],
        bn: function(e, r) {
            return r ? 1 == e || 5 == e || 7 == e || 8 == e || 9 == e || 10 == e ? "one" : 2 == e || 3 == e ? "two" : 4 == e ? "few" : 6 == e ? "many" : "other" : e >= 0 && e <= 1 ? "one" : "other"
        },
        bo: zr[0],
        br: function(e, r) {
            var t = String(e).split(".")
              , n = Number(t[0]) == e
              , o = n && t[0].slice(-1)
              , i = n && t[0].slice(-2)
              , a = n && t[0].slice(-6);
            return r ? "other" : 1 == o && 11 != i && 71 != i && 91 != i ? "one" : 2 == o && 12 != i && 72 != i && 92 != i ? "two" : (3 == o || 4 == o || 9 == o) && (i < 10 || i > 19) && (i < 70 || i > 79) && (i < 90 || i > 99) ? "few" : 0 != e && n && 0 == a ? "many" : "other"
        },
        brx: zr[1],
        bs: function(e, r) {
            var t = String(e).split(".")
              , n = t[0]
              , o = t[1] || ""
              , i = !t[1]
              , a = n.slice(-1)
              , l = n.slice(-2)
              , s = o.slice(-1)
              , u = o.slice(-2);
            return r ? "other" : i && 1 == a && 11 != l || 1 == s && 11 != u ? "one" : i && a >= 2 && a <= 4 && (l < 12 || l > 14) || s >= 2 && s <= 4 && (u < 12 || u > 14) ? "few" : "other"
        },
        ca: function(e, r) {
            var t = String(e).split(".")
              , n = !t[1];
            return r ? 1 == e || 3 == e ? "one" : 2 == e ? "two" : 4 == e ? "few" : "other" : 1 == e && n ? "one" : "other"
        },
        ce: zr[1],
        cgg: zr[1],
        chr: zr[1],
        ckb: zr[1],
        cs: function(e, r) {
            var t = String(e).split(".")
              , n = t[0]
              , o = !t[1];
            return r ? "other" : 1 == e && o ? "one" : n >= 2 && n <= 4 && o ? "few" : o ? "other" : "many"
        },
        cy: function(e, r) {
            return r ? 0 == e || 7 == e || 8 == e || 9 == e ? "zero" : 1 == e ? "one" : 2 == e ? "two" : 3 == e || 4 == e ? "few" : 5 == e || 6 == e ? "many" : "other" : 0 == e ? "zero" : 1 == e ? "one" : 2 == e ? "two" : 3 == e ? "few" : 6 == e ? "many" : "other"
        },
        da: function(e, r) {
            var t = String(e).split(".")
              , n = t[0]
              , o = Number(t[0]) == e;
            return r ? "other" : 1 != e && (o || 0 != n && 1 != n) ? "other" : "one"
        },
        de: zr[3],
        dsb: function(e, r) {
            var t = String(e).split(".")
              , n = t[0]
              , o = t[1] || ""
              , i = !t[1]
              , a = n.slice(-2)
              , l = o.slice(-2);
            return r ? "other" : i && 1 == a || 1 == l ? "one" : i && 2 == a || 2 == l ? "two" : i && (3 == a || 4 == a) || 3 == l || 4 == l ? "few" : "other"
        },
        dv: zr[1],
        dz: zr[0],
        ee: zr[1],
        el: zr[1],
        en: function(e, r) {
            var t = String(e).split(".")
              , n = !t[1]
              , o = Number(t[0]) == e
              , i = o && t[0].slice(-1)
              , a = o && t[0].slice(-2);
            return r ? 1 == i && 11 != a ? "one" : 2 == i && 12 != a ? "two" : 3 == i && 13 != a ? "few" : "other" : 1 == e && n ? "one" : "other"
        },
        eo: zr[1],
        es: zr[1],
        et: zr[3],
        eu: zr[1],
        fa: function(e, r) {
            return r ? "other" : e >= 0 && e <= 1 ? "one" : "other"
        },
        ff: function(e, r) {
            return r ? "other" : e >= 0 && e < 2 ? "one" : "other"
        },
        fi: zr[3],
        fil: function(e, r) {
            var t = String(e).split(".")
              , n = t[0]
              , o = t[1] || ""
              , i = !t[1]
              , a = n.slice(-1)
              , l = o.slice(-1);
            return r ? 1 == e ? "one" : "other" : i && (1 == n || 2 == n || 3 == n) || i && 4 != a && 6 != a && 9 != a || !i && 4 != l && 6 != l && 9 != l ? "one" : "other"
        },
        fo: zr[1],
        fr: function(e, r) {
            return r ? 1 == e ? "one" : "other" : e >= 0 && e < 2 ? "one" : "other"
        },
        fur: zr[1],
        fy: zr[3],
        ga: function(e, r) {
            var t = String(e).split(".")
              , n = Number(t[0]) == e;
            return r ? 1 == e ? "one" : "other" : 1 == e ? "one" : 2 == e ? "two" : n && e >= 3 && e <= 6 ? "few" : n && e >= 7 && e <= 10 ? "many" : "other"
        },
        gd: function(e, r) {
            var t = String(e).split(".")
              , n = Number(t[0]) == e;
            return r ? "other" : 1 == e || 11 == e ? "one" : 2 == e || 12 == e ? "two" : n && e >= 3 && e <= 10 || n && e >= 13 && e <= 19 ? "few" : "other"
        },
        gl: zr[3],
        gsw: zr[1],
        gu: function(e, r) {
            return r ? 1 == e ? "one" : 2 == e || 3 == e ? "two" : 4 == e ? "few" : 6 == e ? "many" : "other" : e >= 0 && e <= 1 ? "one" : "other"
        },
        guw: zr[2],
        gv: function(e, r) {
            var t = String(e).split(".")
              , n = t[0]
              , o = !t[1]
              , i = n.slice(-1)
              , a = n.slice(-2);
            return r ? "other" : o && 1 == i ? "one" : o && 2 == i ? "two" : !o || 0 != a && 20 != a && 40 != a && 60 != a && 80 != a ? o ? "other" : "many" : "few"
        },
        ha: zr[1],
        haw: zr[1],
        he: function(e, r) {
            var t = String(e).split(".")
              , n = t[0]
              , o = !t[1]
              , i = Number(t[0]) == e
              , a = i && t[0].slice(-1);
            return r ? "other" : 1 == e && o ? "one" : 2 == n && o ? "two" : o && (e < 0 || e > 10) && i && 0 == a ? "many" : "other"
        },
        hi: function(e, r) {
            return r ? 1 == e ? "one" : 2 == e || 3 == e ? "two" : 4 == e ? "few" : 6 == e ? "many" : "other" : e >= 0 && e <= 1 ? "one" : "other"
        },
        hr: function(e, r) {
            var t = String(e).split(".")
              , n = t[0]
              , o = t[1] || ""
              , i = !t[1]
              , a = n.slice(-1)
              , l = n.slice(-2)
              , s = o.slice(-1)
              , u = o.slice(-2);
            return r ? "other" : i && 1 == a && 11 != l || 1 == s && 11 != u ? "one" : i && a >= 2 && a <= 4 && (l < 12 || l > 14) || s >= 2 && s <= 4 && (u < 12 || u > 14) ? "few" : "other"
        },
        hsb: function(e, r) {
            var t = String(e).split(".")
              , n = t[0]
              , o = t[1] || ""
              , i = !t[1]
              , a = n.slice(-2)
              , l = o.slice(-2);
            return r ? "other" : i && 1 == a || 1 == l ? "one" : i && 2 == a || 2 == l ? "two" : i && (3 == a || 4 == a) || 3 == l || 4 == l ? "few" : "other"
        },
        hu: function(e, r) {
            return r ? 1 == e || 5 == e ? "one" : "other" : 1 == e ? "one" : "other"
        },
        hy: function(e, r) {
            return r ? 1 == e ? "one" : "other" : e >= 0 && e < 2 ? "one" : "other"
        },
        id: zr[0],
        ig: zr[0],
        ii: zr[0],
        in: zr[0],
        is: function(e, r) {
            var t = String(e).split(".")
              , n = t[0]
              , o = Number(t[0]) == e
              , i = n.slice(-1)
              , a = n.slice(-2);
            return r ? "other" : o && 1 == i && 11 != a || !o ? "one" : "other"
        },
        it: function(e, r) {
            var t = String(e).split(".")
              , n = !t[1];
            return r ? 11 == e || 8 == e || 80 == e || 800 == e ? "many" : "other" : 1 == e && n ? "one" : "other"
        },
        iu: function(e, r) {
            return r ? "other" : 1 == e ? "one" : 2 == e ? "two" : "other"
        },
        iw: function(e, r) {
            var t = String(e).split(".")
              , n = t[0]
              , o = !t[1]
              , i = Number(t[0]) == e
              , a = i && t[0].slice(-1);
            return r ? "other" : 1 == e && o ? "one" : 2 == n && o ? "two" : o && (e < 0 || e > 10) && i && 0 == a ? "many" : "other"
        },
        ja: zr[0],
        jbo: zr[0],
        jgo: zr[1],
        ji: zr[3],
        jmc: zr[1],
        jv: zr[0],
        jw: zr[0],
        ka: function(e, r) {
            var t = String(e).split(".")
              , n = t[0]
              , o = n.slice(-2);
            return r ? 1 == n ? "one" : 0 == n || o >= 2 && o <= 20 || 40 == o || 60 == o || 80 == o ? "many" : "other" : 1 == e ? "one" : "other"
        },
        kab: function(e, r) {
            return r ? "other" : e >= 0 && e < 2 ? "one" : "other"
        },
        kaj: zr[1],
        kcg: zr[1],
        kde: zr[0],
        kea: zr[0],
        kk: function(e, r) {
            var t = String(e).split(".")
              , n = Number(t[0]) == e
              , o = n && t[0].slice(-1);
            return r ? 6 == o || 9 == o || n && 0 == o && 0 != e ? "many" : "other" : 1 == e ? "one" : "other"
        },
        kkj: zr[1],
        kl: zr[1],
        km: zr[0],
        kn: function(e, r) {
            return r ? "other" : e >= 0 && e <= 1 ? "one" : "other"
        },
        ko: zr[0],
        ks: zr[1],
        ksb: zr[1],
        ksh: function(e, r) {
            return r ? "other" : 0 == e ? "zero" : 1 == e ? "one" : "other"
        },
        ku: zr[1],
        kw: function(e, r) {
            return r ? "other" : 1 == e ? "one" : 2 == e ? "two" : "other"
        },
        ky: zr[1],
        lag: function(e, r) {
            var t = String(e).split(".")
              , n = t[0];
            return r ? "other" : 0 == e ? "zero" : 0 != n && 1 != n || 0 == e ? "other" : "one"
        },
        lb: zr[1],
        lg: zr[1],
        lkt: zr[0],
        ln: zr[2],
        lo: function(e, r) {
            return r && 1 == e ? "one" : "other"
        },
        lt: function(e, r) {
            var t = String(e).split(".")
              , n = t[1] || ""
              , o = Number(t[0]) == e
              , i = o && t[0].slice(-1)
              , a = o && t[0].slice(-2);
            return r ? "other" : 1 == i && (a < 11 || a > 19) ? "one" : i >= 2 && i <= 9 && (a < 11 || a > 19) ? "few" : 0 != n ? "many" : "other"
        },
        lv: function(e, r) {
            var t = String(e).split(".")
              , n = t[1] || ""
              , o = n.length
              , i = Number(t[0]) == e
              , a = i && t[0].slice(-1)
              , l = i && t[0].slice(-2)
              , s = n.slice(-2)
              , u = n.slice(-1);
            return r ? "other" : i && 0 == a || l >= 11 && l <= 19 || 2 == o && s >= 11 && s <= 19 ? "zero" : 1 == a && 11 != l || 2 == o && 1 == u && 11 != s || 2 != o && 1 == u ? "one" : "other"
        },
        mas: zr[1],
        mg: zr[2],
        mgo: zr[1],
        mk: function(e, r) {
            var t = String(e).split(".")
              , n = t[0]
              , o = t[1] || ""
              , i = !t[1]
              , a = n.slice(-1)
              , l = n.slice(-2)
              , s = o.slice(-1);
            return r ? 1 == a && 11 != l ? "one" : 2 == a && 12 != l ? "two" : 7 != a && 8 != a || 17 == l || 18 == l ? "other" : "many" : i && 1 == a || 1 == s ? "one" : "other"
        },
        ml: zr[1],
        mn: zr[1],
        mo: function(e, r) {
            var t = String(e).split(".")
              , n = !t[1]
              , o = Number(t[0]) == e
              , i = o && t[0].slice(-2);
            return r ? 1 == e ? "one" : "other" : 1 == e && n ? "one" : !n || 0 == e || 1 != e && i >= 1 && i <= 19 ? "few" : "other"
        },
        mr: function(e, r) {
            return r ? 1 == e ? "one" : 2 == e || 3 == e ? "two" : 4 == e ? "few" : "other" : e >= 0 && e <= 1 ? "one" : "other"
        },
        ms: function(e, r) {
            return r && 1 == e ? "one" : "other"
        },
        mt: function(e, r) {
            var t = String(e).split(".")
              , n = Number(t[0]) == e
              , o = n && t[0].slice(-2);
            return r ? "other" : 1 == e ? "one" : 0 == e || o >= 2 && o <= 10 ? "few" : o >= 11 && o <= 19 ? "many" : "other"
        },
        my: zr[0],
        nah: zr[1],
        naq: function(e, r) {
            return r ? "other" : 1 == e ? "one" : 2 == e ? "two" : "other"
        },
        nb: zr[1],
        nd: zr[1],
        ne: function(e, r) {
            var t = String(e).split(".")
              , n = Number(t[0]) == e;
            return r ? n && e >= 1 && e <= 4 ? "one" : "other" : 1 == e ? "one" : "other"
        },
        nl: zr[3],
        nn: zr[1],
        nnh: zr[1],
        no: zr[1],
        nqo: zr[0],
        nr: zr[1],
        nso: zr[2],
        ny: zr[1],
        nyn: zr[1],
        om: zr[1],
        or: zr[1],
        os: zr[1],
        pa: zr[2],
        pap: zr[1],
        pl: function(e, r) {
            var t = String(e).split(".")
              , n = t[0]
              , o = !t[1]
              , i = n.slice(-1)
              , a = n.slice(-2);
            return r ? "other" : 1 == e && o ? "one" : o && i >= 2 && i <= 4 && (a < 12 || a > 14) ? "few" : o && 1 != n && (0 == i || 1 == i) || o && i >= 5 && i <= 9 || o && a >= 12 && a <= 14 ? "many" : "other"
        },
        prg: function(e, r) {
            var t = String(e).split(".")
              , n = t[1] || ""
              , o = n.length
              , i = Number(t[0]) == e
              , a = i && t[0].slice(-1)
              , l = i && t[0].slice(-2)
              , s = n.slice(-2)
              , u = n.slice(-1);
            return r ? "other" : i && 0 == a || l >= 11 && l <= 19 || 2 == o && s >= 11 && s <= 19 ? "zero" : 1 == a && 11 != l || 2 == o && 1 == u && 11 != s || 2 != o && 1 == u ? "one" : "other"
        },
        ps: zr[1],
        pt: function(e, r) {
            var t = String(e).split(".")
              , n = Number(t[0]) == e;
            return r ? "other" : n && e >= 0 && e <= 2 && 2 != e ? "one" : "other"
        },
        "pt-PT": zr[3],
        rm: zr[1],
        ro: function(e, r) {
            var t = String(e).split(".")
              , n = !t[1]
              , o = Number(t[0]) == e
              , i = o && t[0].slice(-2);
            return r ? 1 == e ? "one" : "other" : 1 == e && n ? "one" : !n || 0 == e || 1 != e && i >= 1 && i <= 19 ? "few" : "other"
        },
        rof: zr[1],
        root: zr[0],
        ru: function(e, r) {
            var t = String(e).split(".")
              , n = t[0]
              , o = !t[1]
              , i = n.slice(-1)
              , a = n.slice(-2);
            return r ? "other" : o && 1 == i && 11 != a ? "one" : o && i >= 2 && i <= 4 && (a < 12 || a > 14) ? "few" : o && 0 == i || o && i >= 5 && i <= 9 || o && a >= 11 && a <= 14 ? "many" : "other"
        },
        rwk: zr[1],
        sah: zr[0],
        saq: zr[1],
        sdh: zr[1],
        se: function(e, r) {
            return r ? "other" : 1 == e ? "one" : 2 == e ? "two" : "other"
        },
        seh: zr[1],
        ses: zr[0],
        sg: zr[0],
        sh: function(e, r) {
            var t = String(e).split(".")
              , n = t[0]
              , o = t[1] || ""
              , i = !t[1]
              , a = n.slice(-1)
              , l = n.slice(-2)
              , s = o.slice(-1)
              , u = o.slice(-2);
            return r ? "other" : i && 1 == a && 11 != l || 1 == s && 11 != u ? "one" : i && a >= 2 && a <= 4 && (l < 12 || l > 14) || s >= 2 && s <= 4 && (u < 12 || u > 14) ? "few" : "other"
        },
        shi: function(e, r) {
            var t = String(e).split(".")
              , n = Number(t[0]) == e;
            return r ? "other" : e >= 0 && e <= 1 ? "one" : n && e >= 2 && e <= 10 ? "few" : "other"
        },
        si: function(e, r) {
            var t = String(e).split(".")
              , n = t[0]
              , o = t[1] || "";
            return r ? "other" : 0 == e || 1 == e || 0 == n && 1 == o ? "one" : "other"
        },
        sk: function(e, r) {
            var t = String(e).split(".")
              , n = t[0]
              , o = !t[1];
            return r ? "other" : 1 == e && o ? "one" : n >= 2 && n <= 4 && o ? "few" : o ? "other" : "many"
        },
        sl: function(e, r) {
            var t = String(e).split(".")
              , n = t[0]
              , o = !t[1]
              , i = n.slice(-2);
            return r ? "other" : o && 1 == i ? "one" : o && 2 == i ? "two" : o && (3 == i || 4 == i) || !o ? "few" : "other"
        },
        sma: function(e, r) {
            return r ? "other" : 1 == e ? "one" : 2 == e ? "two" : "other"
        },
        smi: function(e, r) {
            return r ? "other" : 1 == e ? "one" : 2 == e ? "two" : "other"
        },
        smj: function(e, r) {
            return r ? "other" : 1 == e ? "one" : 2 == e ? "two" : "other"
        },
        smn: function(e, r) {
            return r ? "other" : 1 == e ? "one" : 2 == e ? "two" : "other"
        },
        sms: function(e, r) {
            return r ? "other" : 1 == e ? "one" : 2 == e ? "two" : "other"
        },
        sn: zr[1],
        so: zr[1],
        sq: function(e, r) {
            var t = String(e).split(".")
              , n = Number(t[0]) == e
              , o = n && t[0].slice(-1)
              , i = n && t[0].slice(-2);
            return r ? 1 == e ? "one" : 4 == o && 14 != i ? "many" : "other" : 1 == e ? "one" : "other"
        },
        sr: function(e, r) {
            var t = String(e).split(".")
              , n = t[0]
              , o = t[1] || ""
              , i = !t[1]
              , a = n.slice(-1)
              , l = n.slice(-2)
              , s = o.slice(-1)
              , u = o.slice(-2);
            return r ? "other" : i && 1 == a && 11 != l || 1 == s && 11 != u ? "one" : i && a >= 2 && a <= 4 && (l < 12 || l > 14) || s >= 2 && s <= 4 && (u < 12 || u > 14) ? "few" : "other"
        },
        ss: zr[1],
        ssy: zr[1],
        st: zr[1],
        sv: function(e, r) {
            var t = String(e).split(".")
              , n = !t[1]
              , o = Number(t[0]) == e
              , i = o && t[0].slice(-1)
              , a = o && t[0].slice(-2);
            return r ? 1 != i && 2 != i || 11 == a || 12 == a ? "other" : "one" : 1 == e && n ? "one" : "other"
        },
        sw: zr[3],
        syr: zr[1],
        ta: zr[1],
        te: zr[1],
        teo: zr[1],
        th: zr[0],
        ti: zr[2],
        tig: zr[1],
        tk: zr[1],
        tl: function(e, r) {
            var t = String(e).split(".")
              , n = t[0]
              , o = t[1] || ""
              , i = !t[1]
              , a = n.slice(-1)
              , l = o.slice(-1);
            return r ? 1 == e ? "one" : "other" : i && (1 == n || 2 == n || 3 == n) || i && 4 != a && 6 != a && 9 != a || !i && 4 != l && 6 != l && 9 != l ? "one" : "other"
        },
        tn: zr[1],
        to: zr[0],
        tr: zr[1],
        ts: zr[1],
        tzm: function(e, r) {
            var t = String(e).split(".")
              , n = Number(t[0]) == e;
            return r ? "other" : 0 == e || 1 == e || n && e >= 11 && e <= 99 ? "one" : "other"
        },
        ug: zr[1],
        uk: function(e, r) {
            var t = String(e).split(".")
              , n = t[0]
              , o = !t[1]
              , i = Number(t[0]) == e
              , a = i && t[0].slice(-1)
              , l = i && t[0].slice(-2)
              , s = n.slice(-1)
              , u = n.slice(-2);
            return r ? 3 == a && 13 != l ? "few" : "other" : o && 1 == s && 11 != u ? "one" : o && s >= 2 && s <= 4 && (u < 12 || u > 14) ? "few" : o && 0 == s || o && s >= 5 && s <= 9 || o && u >= 11 && u <= 14 ? "many" : "other"
        },
        ur: zr[3],
        uz: zr[1],
        ve: zr[1],
        vi: function(e, r) {
            return r && 1 == e ? "one" : "other"
        },
        vo: zr[1],
        vun: zr[1],
        wa: zr[2],
        wae: zr[1],
        wo: zr[0],
        xh: zr[1],
        xog: zr[1],
        yi: zr[3],
        yo: zr[0],
        yue: zr[0],
        zh: zr[0],
        zu: function(e, r) {
            return r ? "other" : e >= 0 && e <= 1 ? "one" : "other"
        }
    };
    if (Ke(hr, "PluralRules", {
        configurable: !0,
        writable: !0,
        value: ae
    }),
    Ke(ae, "prototype", {
        writable: !1
    }),
    rr.PluralRules = {
        "[[availableLocales]]": Object.keys(Dr),
        "[[relevantExtensionKeys]]": [],
        "[[localeData]]": {}
    },
    Ke(hr.PluralRules, "supportedLocalesOf", {
        configurable: !0,
        writable: !0,
        value: er.call(function(e) {
            if (!Ue.call(this, "[[availableLocales]]"))
                throw new TypeError("supportedLocalesOf() is not a constructor");
            var r = n()
              , t = arguments[1]
              , o = this["[[availableLocales]]"]
              , i = v(e);
            return r(),
            x(o, i, t)
        }, rr.PluralRules)
    }),
    Ke(hr.PluralRules.prototype, "select", {
        configurable: !0,
        value: function(e) {
            return ue(this, Number(e))
        }
    }),
    Ke(hr.PluralRules.prototype, "resolvedOptions", {
        configurable: !0,
        writable: !0,
        value: function() {
            var e = void 0
              , t = new r
              , n = ["locale", "type", "minimumIntegerDigits", "minimumFractionDigits", "maximumFractionDigits", "minimumSignificantDigits", "maximumSignificantDigits"]
              , o = null !== this && "object" === Ze.typeof(this) && s(this);
            if (!o || !o["[[InitializedPluralRules]]"])
                throw new TypeError("`this` value for resolvedOptions() is not an initialized Intl.PluralRules object.");
            for (var i = 0, a = n.length; i < a; i++)
                Ue.call(o, e = "[[" + n[i] + "]]") && (t[n[i]] = {
                    value: o[e],
                    writable: !0,
                    configurable: !0,
                    enumerable: !0
                });
            return He({}, t)
        }
    }),
    Ke(hr, "__applyLocaleSensitivePrototypes", {
        writable: !0,
        configurable: !0,
        value: function() {
            Ke(Number.prototype, "toLocaleString", {
                writable: !0,
                configurable: !0,
                value: jr.Number.toLocaleString
            }),
            Ke(Date.prototype, "toLocaleString", {
                writable: !0,
                configurable: !0,
                value: jr.Date.toLocaleString
            });
            for (var e in jr.Date)
                Ue.call(jr.Date, e) && Ke(Date.prototype, e, {
                    writable: !0,
                    configurable: !0,
                    value: jr.Date[e]
                })
        }
    }),
    Ke(hr, "__addLocaleData", {
        value: function(e) {
            if (!f(e.locale))
                throw new Error('Invalid language tag "' + e.locale + '" when calling __addLocaleData("' + e.locale + '", ...) to register new locale data.');
            ce(e, e.locale)
        }
    }),
    Ke(hr, "__disableRegExpRestore", {
        value: function() {
            rr.disableRegExpRestore = !0
        }
    }),
    "undefined" == typeof Intl)
        try {
            window.Intl = hr,
            hr.__applyLocaleSensitivePrototypes()
        } catch (e) {}
    return hr
});
;IntlPolyfill.__addLocaleData({
    locale: "en",
    date: {
        ca: ["gregory", "generic"],
        hourNo0: !0,
        hour12: !0,
        formats: {
            short: "{1}, {0}",
            medium: "{1}, {0}",
            full: "{1} 'at' {0}",
            long: "{1} 'at' {0}",
            availableFormats: {
                d: "d",
                E: "ccc",
                Ed: "d E",
                Ehm: "E h:mm a",
                EHm: "E HH:mm",
                Ehms: "E h:mm:ss a",
                EHms: "E HH:mm:ss",
                Gy: "y G",
                GyMMM: "MMM y G",
                GyMMMd: "MMM d, y G",
                GyMMMEd: "E, MMM d, y G",
                h: "h a",
                H: "HH",
                hm: "h:mm a",
                Hm: "HH:mm",
                hms: "h:mm:ss a",
                Hms: "HH:mm:ss",
                hmsv: "h:mm:ss a v",
                Hmsv: "HH:mm:ss v",
                hmv: "h:mm a v",
                Hmv: "HH:mm v",
                M: "L",
                Md: "M/d",
                MEd: "E, M/d",
                MMM: "LLL",
                MMMd: "MMM d",
                MMMEd: "E, MMM d",
                MMMMd: "MMMM d",
                ms: "mm:ss",
                y: "y",
                yM: "M/y",
                yMd: "M/d/y",
                yMEd: "E, M/d/y",
                yMMM: "MMM y",
                yMMMd: "MMM d, y",
                yMMMEd: "E, MMM d, y",
                yMMMM: "MMMM y",
                yQQQ: "QQQ y",
                yQQQQ: "QQQQ y"
            },
            dateFormats: {
                yMMMMEEEEd: "EEEE, MMMM d, y",
                yMMMMd: "MMMM d, y",
                yMMMd: "MMM d, y",
                yMd: "M/d/yy"
            },
            timeFormats: {
                hmmsszzzz: "h:mm:ss a zzzz",
                hmsz: "h:mm:ss a z",
                hms: "h:mm:ss a",
                hm: "h:mm a"
            }
        },
        calendars: {
            generic: {
                months: {
                    narrow: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
                    short: ["M01", "M02", "M03", "M04", "M05", "M06", "M07", "M08", "M09", "M10", "M11", "M12"],
                    long: ["M01", "M02", "M03", "M04", "M05", "M06", "M07", "M08", "M09", "M10", "M11", "M12"]
                },
                days: {
                    narrow: ["S", "M", "T", "W", "T", "F", "S"],
                    short: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
                    long: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
                },
                eras: {
                    narrow: ["ERA0", "ERA1"],
                    short: ["ERA0", "ERA1"],
                    long: ["ERA0", "ERA1"]
                },
                dayPeriods: {
                    am: "AM",
                    pm: "PM"
                }
            },
            gregory: {
                months: {
                    narrow: ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"],
                    short: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
                    long: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
                },
                days: {
                    narrow: ["S", "M", "T", "W", "T", "F", "S"],
                    short: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
                    long: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
                },
                eras: {
                    narrow: ["B", "A", "BCE", "CE"],
                    short: ["BC", "AD", "BCE", "CE"],
                    long: ["Before Christ", "Anno Domini", "Before Common Era", "Common Era"]
                },
                dayPeriods: {
                    am: "AM",
                    pm: "PM"
                }
            }
        }
    },
    number: {
        nu: ["latn"],
        patterns: {
            decimal: {
                positivePattern: "{number}",
                negativePattern: "{minusSign}{number}"
            },
            currency: {
                positivePattern: "{currency}{number}",
                negativePattern: "{minusSign}{currency}{number}"
            },
            percent: {
                positivePattern: "{number}{percentSign}",
                negativePattern: "{minusSign}{number}{percentSign}"
            }
        },
        symbols: {
            latn: {
                decimal: ".",
                group: ",",
                nan: "NaN",
                plusSign: "+",
                minusSign: "-",
                percentSign: "%",
                infinity: "∞"
            }
        },
        currencies: {
            AUD: "A$",
            BRL: "R$",
            CAD: "CA$",
            CNY: "CN¥",
            EUR: "€",
            GBP: "£",
            HKD: "HK$",
            ILS: "₪",
            INR: "₹",
            JPY: "¥",
            KRW: "₩",
            MXN: "MX$",
            NZD: "NZ$",
            TWD: "NT$",
            USD: "$",
            VND: "₫",
            XAF: "FCFA",
            XCD: "EC$",
            XOF: "CFA",
            XPF: "CFPF"
        }
    }
});
;IntlPolyfill.__addLocaleData({
    locale: "es",
    date: {
        ca: ["gregory", "generic"],
        hourNo0: !0,
        hour12: !1,
        formats: {
            short: "{1} {0}",
            medium: "{1} {0}",
            full: "{1}, {0}",
            long: "{1}, {0}",
            availableFormats: {
                d: "d",
                E: "ccc",
                Ed: "E d",
                Ehm: "E, h:mm a",
                EHm: "E, H:mm",
                Ehms: "E, h:mm:ss a",
                EHms: "E, H:mm:ss",
                Gy: "y G",
                GyMMM: "MMM y G",
                GyMMMd: "d MMM y G",
                GyMMMEd: "E, d MMM y G",
                GyMMMM: "MMMM 'de' y G",
                GyMMMMd: "d 'de' MMMM 'de' y G",
                GyMMMMEd: "E, d 'de' MMMM 'de' y G",
                h: "h a",
                H: "H",
                hm: "h:mm a",
                Hm: "H:mm",
                hms: "h:mm:ss a",
                Hms: "H:mm:ss",
                hmsv: "h:mm:ss a v",
                Hmsv: "H:mm:ss v",
                hmsvvvv: "h:mm:ss a (vvvv)",
                Hmsvvvv: "H:mm:ss (vvvv)",
                hmv: "h:mm a v",
                Hmv: "H:mm v",
                M: "L",
                Md: "d/M",
                MEd: "E, d/M",
                MMd: "d/M",
                MMdd: "d/M",
                MMM: "LLL",
                MMMd: "d MMM",
                MMMEd: "E, d MMM",
                MMMMd: "d 'de' MMMM",
                MMMMEd: "E, d 'de' MMMM",
                ms: "mm:ss",
                y: "y",
                yM: "M/y",
                yMd: "d/M/y",
                yMEd: "EEE, d/M/y",
                yMM: "M/y",
                yMMM: "MMM y",
                yMMMd: "d MMM y",
                yMMMEd: "EEE, d MMM y",
                yMMMM: "MMMM 'de' y",
                yMMMMd: "d 'de' MMMM 'de' y",
                yMMMMEd: "EEE, d 'de' MMMM 'de' y",
                yQQQ: "QQQ y",
                yQQQQ: "QQQQ 'de' y"
            },
            dateFormats: {
                yMMMMEEEEd: "EEEE, d 'de' MMMM 'de' y",
                yMMMMd: "d 'de' MMMM 'de' y",
                yMMMd: "d MMM y",
                yMd: "d/M/yy"
            },
            timeFormats: {
                hmmsszzzz: "H:mm:ss (zzzz)",
                hmsz: "H:mm:ss z",
                hms: "H:mm:ss",
                hm: "H:mm"
            }
        },
        calendars: {
            generic: {
                months: {
                    narrow: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
                    short: ["M01", "M02", "M03", "M04", "M05", "M06", "M07", "M08", "M09", "M10", "M11", "M12"],
                    long: ["M01", "M02", "M03", "M04", "M05", "M06", "M07", "M08", "M09", "M10", "M11", "M12"]
                },
                days: {
                    narrow: ["D", "L", "M", "X", "J", "V", "S"],
                    short: ["dom.", "lun.", "mar.", "mié.", "jue.", "vie.", "sáb."],
                    long: ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"]
                },
                eras: {
                    narrow: ["ERA0", "ERA1"],
                    short: ["ERA0", "ERA1"],
                    long: ["ERA0", "ERA1"]
                },
                dayPeriods: {
                    am: "a. m.",
                    pm: "p. m."
                }
            },
            gregory: {
                months: {
                    narrow: ["E", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"],
                    short: ["ene.", "feb.", "mar.", "abr.", "may.", "jun.", "jul.", "ago.", "sept.", "oct.", "nov.", "dic."],
                    long: ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"]
                },
                days: {
                    narrow: ["D", "L", "M", "X", "J", "V", "S"],
                    short: ["dom.", "lun.", "mar.", "mié.", "jue.", "vie.", "sáb."],
                    long: ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"]
                },
                eras: {
                    narrow: ["a. C.", "d. C.", "a. e. c.", "e. c."],
                    short: ["a. C.", "d. C.", "a. e. c.", "e. c."],
                    long: ["antes de Cristo", "después de Cristo", "antes de la era común", "era común"]
                },
                dayPeriods: {
                    am: "a. m.",
                    pm: "p. m."
                }
            }
        }
    },
    number: {
        nu: ["latn"],
        patterns: {
            decimal: {
                positivePattern: "{number}",
                negativePattern: "{minusSign}{number}"
            },
            currency: {
                positivePattern: "{number} {currency}",
                negativePattern: "{minusSign}{number} {currency}"
            },
            percent: {
                positivePattern: "{number} {percentSign}",
                negativePattern: "{minusSign}{number} {percentSign}"
            }
        },
        symbols: {
            latn: {
                decimal: ",",
                group: ".",
                nan: "NaN",
                plusSign: "+",
                minusSign: "-",
                percentSign: "%",
                infinity: "∞"
            }
        },
        currencies: {
            CAD: "CA$",
            ESP: "₧",
            EUR: "€",
            THB: "฿",
            USD: "$",
            VND: "₫",
            XPF: "CFPF"
        }
    }
});
;(function(n) {
    function t(r) {
        if (i[r])
            return i[r].exports;
        var u = i[r] = {
            i: r,
            l: !1,
            exports: {}
        };
        return n[r].call(u.exports, u, u.exports, t),
        u.l = !0,
        u.exports
    }
    var i = {};
    return t.m = n,
    t.c = i,
    t.d = function(n, i, r) {
        t.o(n, i) || Object.defineProperty(n, i, {
            configurable: !1,
            enumerable: !0,
            get: r
        })
    }
    ,
    t.n = function(n) {
        var i = n && n.__esModule ? function() {
            return n["default"]
        }
        : function() {
            return n
        }
        ;
        return t.d(i, "a", i),
        i
    }
    ,
    t.o = function(n, t) {
        return Object.prototype.hasOwnProperty.call(n, t)
    }
    ,
    t.p = "",
    t(t.s = 1)
}
)([function(n, t, i) {
    "use strict";
    function u(n) {
        for (var f = Array.prototype.slice.call(arguments, 1), t, u, i = 0, e = f.length; i < e; i += 1)
            if (t = f[i],
            t)
                for (u in t)
                    r.call(t, u) && (n[u] = t[u]);
        return n
    }
    i.d(t, "b", function() {
        return r
    }),
    t.a = u;
    var r = Object.prototype.hasOwnProperty
}
, function(n, t, i) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var r = i(2)
      , u = i(7)
      , f = i(8);
    r.a.__addLocaleData(u.a),
    r.a.defaultLocale = "en",
    Roblox = Roblox || {},
    function(n) {
        var t = function(t, i, r) {
            var o = "RobloxLocaleCode", e = !1, u;
            if (typeof localStorage != "undefined" && (e = n && n.LocalStorage ? n.LocalStorage.isAvailable() : localStorage && localStorage.getItem && localStorage.setItem),
            !t) {
                if (u = document.querySelector('meta[name="locale-data"]'),
                u && u.dataset && u.dataset.languageCode && (t = u.dataset.languageCode),
                e && !t && (t = localStorage.getItem(o)),
                !t)
                    throw new Error("Unable to initialize intl - localeCode not provided and could not load from meta tags or local storage");
                t = t.replace(/_/g, "-")
            }
            this.locale = t,
            this.defaultLocale = ["en-us"],
            this.localeApiUrl = u && u.dataset && u.dataset.localeApiUrl,
            this.timeZone = i || "America/Los_Angeles",
            this.currency = r || "USD",
            this.monthsList = {},
            this.weekdaysList = {},
            e && localStorage.setItem(o, this.locale),
            this.langSensitiveCompare = Object(f.a)(this.locale)
        };
        t.prototype.getLocale = function() {
            return this.locale
        }
        ,
        t.prototype.getLocaleApiUrl = function() {
            return this.localeApiUrl
        }
        ,
        t.prototype.getTimeZone = function() {
            return this.timeZone
        }
        ,
        t.prototype.getCurrency = function() {
            return this.currency
        }
        ,
        t.prototype.f = function(n, t, i) {
            if (typeof n != "string")
                throw new TypeError("'message' must be a string");
            var u = new r.a(n,this.locale,i);
            return u.format(t)
        }
        ,
        t.prototype.d = function(n, t) {
            if (typeof n != "object" || !Date.prototype.isPrototypeOf(n))
                throw new TypeError("'dateObj' must be a JavaScript date object");
            var i, r = {
                short: {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit"
                },
                full: {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                    hour: "2-digit",
                    minute: "2-digit"
                },
                time: {
                    hour: "2-digit",
                    minute: "2-digit"
                }
            };
            if (typeof t == "string" || t === undefined)
                i = r[t] || r.short;
            else if (typeof t == "object")
                i = t;
            else
                throw new TypeError("'options' must be either of type string or object based on Intl.DateTimeFormat");
            try {
                return new Intl.DateTimeFormat(this.defaultLocale,i).format(n)
            } catch (u) {
                return n.toLocaleString(this.defaultLocale)
            }
        }
        ,
        t.prototype.n = function(n, t) {
            if (isNaN(n))
                throw new TypeError("The argument 'number' must be of type number");
            var i, r = {
                currency: {
                    style: "currency",
                    currency: this.currency
                },
                percent: {
                    style: "percent",
                    maximumFractionDigits: 2
                },
                decimal: {
                    style: "decimal",
                    maximumFractionDigits: 2
                }
            };
            if (typeof t == "string" || t === undefined)
                i = r[t] || r.decimal;
            else if (typeof t == "object")
                i = t;
            else
                throw new TypeError("'options' must be of type string or object based on Intl.NumberFormat");
            try {
                return new Intl.NumberFormat(this.defaultLocale,i).format(n)
            } catch (u) {
                return n
            }
        }
        ,
        t.prototype.getMonthsList = function(n) {
            var r = ["numeric", "2-digit", "narrow", "short", "long"], t = r.indexOf(n) > -1 ? n : "short", u = 2017, f = this, i;
            return this.monthsList[t] && this.monthsList[t].length > 0 ? this.monthsList[t] : (i = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(function(n) {
                return new Date(u,n - 1)
            }),
            this.monthsList[t] = i.map(function(n, i) {
                return {
                    value: i + 1,
                    name: Intl.DateTimeFormat(f.locale, {
                        month: t
                    }).format(n)
                }
            }))
        }
        ,
        t.prototype.getWeekdaysList = function(n) {
            var r = ["narrow", "short", "long"], t = r.indexOf(n) > -1 ? n : "short", u = 2017, f = 4, e = this, i;
            return this.weekdaysList[t] && this.weekdaysList[t].length > 0 ? this.weekdaysList[t] : (i = [1, 2, 3, 4, 5, 6, 7].map(function(n) {
                return new Date(u,f,n)
            }),
            this.weekdaysList[t] = i.map(function(n, i) {
                return {
                    value: i + 1,
                    name: Intl.DateTimeFormat(e.locale, {
                        weekday: t
                    }).format(n)
                }
            }))
        }
        ,
        n.Intl = t
    }(Roblox)
}
, function(n, t, i) {
    "use strict";
    function r(n, t, i) {
        var f = typeof n == "string" ? r.__parse(n) : n;
        if (!(f && f.type === "messageFormatPattern"))
            throw new TypeError("A message must be provided as a String or AST.");
        i = this._mergeFormats(r.formats, i),
        Object(u.a)(this, "_locale", {
            value: this._resolveLocale(t)
        });
        var e = this._findPluralRuleFunction(this._locale)
          , o = this._compilePattern(f, t, i, e)
          , s = this;
        this.format = function(n) {
            return s._format(o, n)
        }
    }
    var f = i(0)
      , u = i(3)
      , e = i(4)
      , o = i(5)
      , s = i.n(o);
    t.a = r,
    Object(u.a)(r, "formats", {
        enumerable: !0,
        value: {
            number: {
                currency: {
                    style: "currency"
                },
                percent: {
                    style: "percent"
                }
            },
            date: {
                short: {
                    month: "numeric",
                    day: "numeric",
                    year: "2-digit"
                },
                medium: {
                    month: "short",
                    day: "numeric",
                    year: "numeric"
                },
                long: {
                    month: "long",
                    day: "numeric",
                    year: "numeric"
                },
                full: {
                    weekday: "long",
                    month: "long",
                    day: "numeric",
                    year: "numeric"
                }
            },
            time: {
                short: {
                    hour: "numeric",
                    minute: "numeric"
                },
                medium: {
                    hour: "numeric",
                    minute: "numeric",
                    second: "numeric"
                },
                long: {
                    hour: "numeric",
                    minute: "numeric",
                    second: "numeric",
                    timeZoneName: "short"
                },
                full: {
                    hour: "numeric",
                    minute: "numeric",
                    second: "numeric",
                    timeZoneName: "short"
                }
            }
        }
    }),
    Object(u.a)(r, "__localeData__", {
        value: Object(u.b)(null)
    }),
    Object(u.a)(r, "__addLocaleData", {
        value: function(n) {
            if (!(n && n.locale))
                throw new Error("Locale data provided to IntlMessageFormat is missing a `locale` property");
            r.__localeData__[n.locale.toLowerCase()] = n
        }
    }),
    Object(u.a)(r, "__parse", {
        value: s.a.parse
    }),
    Object(u.a)(r, "defaultLocale", {
        enumerable: !0,
        writable: !0,
        value: undefined
    }),
    r.prototype.resolvedOptions = function() {
        return {
            locale: this._locale
        }
    }
    ,
    r.prototype._compilePattern = function(n, t, i, r) {
        var u = new e.a(t,i,r);
        return u.compile(n)
    }
    ,
    r.prototype._findPluralRuleFunction = function(n) {
        for (var i = r.__localeData__, t = i[n.toLowerCase()]; t; ) {
            if (t.pluralRuleFunction)
                return t.pluralRuleFunction;
            t = t.parentLocale && i[t.parentLocale.toLowerCase()]
        }
        throw new Error("Locale data added to IntlMessageFormat is missing a `pluralRuleFunction` for :" + n);
    }
    ,
    r.prototype._format = function(n, t) {
        for (var r = "", i, e, o, u = 0, s = n.length; u < s; u += 1) {
            if (i = n[u],
            typeof i == "string") {
                r += i;
                continue
            }
            if (e = i.id,
            !(t && f.b.call(t, e)))
                throw new Error("A value must be provided for: " + e);
            o = t[e],
            r += i.options ? this._format(i.getOption(o), t) : i.format(o)
        }
        return r
    }
    ,
    r.prototype._mergeFormats = function(n, t) {
        var r = {}, i, e;
        for (i in n)
            f.b.call(n, i) && (r[i] = e = Object(u.b)(n[i]),
            t && f.b.call(t, i) && Object(f.a)(e, t[i]));
        return r
    }
    ,
    r.prototype._resolveLocale = function(n) {
        var f, t, e, i, u, o;
        for (typeof n == "string" && (n = [n]),
        n = (n || []).concat(r.defaultLocale),
        f = r.__localeData__,
        t = 0,
        e = n.length; t < e; t += 1)
            for (i = n[t].toLowerCase().split("-"); i.length; ) {
                if (u = f[i.join("-")],
                u)
                    return u.locale;
                i.pop()
            }
        o = n.pop();
        throw new Error("No locale data has been added to IntlMessageFormat for: " + n.join(", ") + ", or the default locale: " + o);
    }
}
, function(n, t, i) {
    "use strict";
    i.d(t, "a", function() {
        return f
    }),
    i.d(t, "b", function() {
        return e
    });
    var r = i(0)
      , u = function() {
        try {
            return !!Object.defineProperty({}, "a", {})
        } catch (n) {
            return !1
        }
    }()
      , o = !u && !Object.prototype.__defineGetter__
      , f = u ? Object.defineProperty : function(n, t, i) {
        "get"in i && n.__defineGetter__ ? n.__defineGetter__(t, i.get) : (!r.b.call(n, t) || "value"in i) && (n[t] = i.value)
    }
      , e = Object.create || function(n, t) {
        function e() {}
        var u, i;
        e.prototype = n,
        u = new e;
        for (i in t)
            r.b.call(t, i) && f(u, i, t[i]);
        return u
    }
}
, function(n, t) {
    "use strict";
    function r(n, t, i) {
        this.locales = n,
        this.formats = t,
        this.pluralFn = i
    }
    function u(n) {
        this.id = n
    }
    function f(n, t, i, r, u) {
        this.id = n,
        this.useOrdinal = t,
        this.offset = i,
        this.options = r,
        this.pluralFn = u
    }
    function e(n, t, i, r) {
        this.id = n,
        this.offset = t,
        this.numberFormat = i,
        this.string = r
    }
    function o(n, t) {
        this.id = n,
        this.options = t
    }
    t.a = r,
    r.prototype.compile = function(n) {
        return this.pluralStack = [],
        this.currentPlural = null,
        this.pluralNumberFormat = null,
        this.compileMessage(n)
    }
    ,
    r.prototype.compileMessage = function(n) {
        if (!(n && n.type === "messageFormatPattern"))
            throw new Error('Message AST is not of type: "messageFormatPattern"');
        for (var u = n.elements, r = [], i, t = 0, f = u.length; t < f; t += 1) {
            i = u[t];
            switch (i.type) {
            case "messageTextElement":
                r.push(this.compileMessageText(i));
                break;
            case "argumentElement":
                r.push(this.compileArgument(i));
                break;
            default:
                throw new Error("Message element does not have a valid type");
            }
        }
        return r
    }
    ,
    r.prototype.compileMessageText = function(n) {
        return this.currentPlural && /(^|[^\\])#/g.test(n.value) ? (this.pluralNumberFormat || (this.pluralNumberFormat = new Intl.NumberFormat(this.locales)),
        new e(this.currentPlural.id,this.currentPlural.format.offset,this.pluralNumberFormat,n.value)) : n.value.replace(/\\#/g, "#")
    }
    ,
    r.prototype.compileArgument = function(n) {
        var i = n.format;
        if (!i)
            return new u(n.id);
        var r = this.formats, e = this.locales, s = this.pluralFn, t;
        switch (i.type) {
        case "numberFormat":
            return t = r.number[i.style],
            {
                id: n.id,
                format: new Intl.NumberFormat(e,t).format
            };
        case "dateFormat":
            return t = r.date[i.style],
            {
                id: n.id,
                format: new Intl.DateTimeFormat(e,t).format
            };
        case "timeFormat":
            return t = r.time[i.style],
            {
                id: n.id,
                format: new Intl.DateTimeFormat(e,t).format
            };
        case "pluralFormat":
            return t = this.compileOptions(n),
            new f(n.id,i.ordinal,i.offset,t,s);
        case "selectFormat":
            return t = this.compileOptions(n),
            new o(n.id,t);
        default:
            throw new Error("Message element does not have a valid format type");
        }
    }
    ,
    r.prototype.compileOptions = function(n) {
        var r = n.format, u = r.options, f = {}, t, e, i;
        for (this.pluralStack.push(this.currentPlural),
        this.currentPlural = r.type === "pluralFormat" ? n : null,
        t = 0,
        e = u.length; t < e; t += 1)
            i = u[t],
            f[i.selector] = this.compileMessage(i.value);
        return this.currentPlural = this.pluralStack.pop(),
        f
    }
    ,
    u.prototype.format = function(n) {
        return !n && typeof n != "number" ? "" : typeof n == "string" ? n : String(n)
    }
    ,
    f.prototype.getOption = function(n) {
        var t = this.options
          , i = t["=" + n] || t[this.pluralFn(n - this.offset, this.useOrdinal)];
        return i || t.other
    }
    ,
    e.prototype.format = function(n) {
        var t = this.numberFormat.format(n - this.offset);
        return this.string.replace(/(^|[^\\])#/g, "$1" + t).replace(/\\#/g, "#")
    }
    ,
    o.prototype.getOption = function(n) {
        var t = this.options;
        return t[n] || t.other
    }
}
, function(n, t, i) {
    "use strict";
    t = n.exports = i(6)["default"],
    t["default"] = t
}
, function(n, t) {
    "use strict";
    t["default"] = function() {
        function t(n, t) {
            function i() {
                this.constructor = n
            }
            i.prototype = t.prototype,
            n.prototype = new i
        }
        function n(t, i, r, u) {
            this.message = t,
            this.expected = i,
            this.found = r,
            this.location = u,
            this.name = "SyntaxError",
            typeof Error.captureStackTrace == "function" && Error.captureStackTrace(this, n)
        }
        function i(t) {
            function h() {
                return c(e, r)
            }
            function et(n) {
                var i = w[n], r, u;
                if (i)
                    return i;
                for (r = n - 1; !w[r]; )
                    r--;
                for (i = w[r],
                i = {
                    line: i.line,
                    column: i.column,
                    seenCR: i.seenCR
                }; r < n; )
                    u = t.charAt(r),
                    u === "\n" ? (i.seenCR || i.line++,
                    i.column = 1,
                    i.seenCR = !1) : u === "\r" || u === "\u2028" || u === "\u2029" ? (i.line++,
                    i.column = 1,
                    i.seenCR = !0) : (i.column++,
                    i.seenCR = !1),
                    r++;
                return w[n] = i,
                i
            }
            function c(n, t) {
                var i = et(n)
                  , r = et(t);
                return {
                    start: {
                        offset: n,
                        line: i.line,
                        column: i.column
                    },
                    end: {
                        offset: t,
                        line: r.line,
                        column: r.column
                    }
                }
            }
            function f(n) {
                r < s || (r > s && (s = r,
                tt = []),
                tt.push(n))
            }
            function g(t, i, r, u) {
                function f(n) {
                    var t = 1;
                    for (n.sort(function(n, t) {
                        return n.description < t.description ? -1 : n.description > t.description ? 1 : 0
                    }); t < n.length; )
                        n[t - 1] === n[t] ? n.splice(t, 1) : t++
                }
                function e(n, t) {
                    function e(n) {
                        function t(n) {
                            return n.charCodeAt(0).toString(16).toUpperCase()
                        }
                        return n.replace(/\\/g, "\\\\").replace(/"/g, '\\"').replace(/\x08/g, "\\b").replace(/\t/g, "\\t").replace(/\n/g, "\\n").replace(/\f/g, "\\f").replace(/\r/g, "\\r").replace(/[\x00-\x07\x0B\x0E\x0F]/g, function(n) {
                            return "\\x0" + t(n)
                        }).replace(/[\x10-\x1F\x80-\xFF]/g, function(n) {
                            return "\\x" + t(n)
                        }).replace(/[\u0100-\u0FFF]/g, function(n) {
                            return "\\u0" + t(n)
                        }).replace(/[\u1000-\uFFFF]/g, function(n) {
                            return "\\u" + t(n)
                        })
                    }
                    for (var r = new Array(n.length), u, f, i = 0; i < n.length; i++)
                        r[i] = n[i].description;
                    return u = n.length > 1 ? r.slice(0, -1).join(", ") + " or " + r[n.length - 1] : r[0],
                    f = t ? '"' + e(t) + '"' : "end of input",
                    "Expected " + u + " but " + f + " found."
                }
                return i !== null && f(i),
                new n(t !== null ? t : e(i, r),i,r,u)
            }
            function ut() {
                var n;
                return n = rt()
            }
            function rt() {
                var t, n, u;
                for (t = r,
                n = [],
                u = ct(); u !== i; )
                    n.push(u),
                    u = ct();
                return n !== i && (e = t,
                n = di(n)),
                t = n
            }
            function ct() {
                var n;
                return n = fr(),
                n === i && (n = ir()),
                n
            }
            function yi() {
                var s, u, n, f, h, c;
                if (s = r,
                u = [],
                n = r,
                f = o(),
                f !== i ? (h = b(),
                h !== i ? (c = o(),
                c !== i ? (f = [f, h, c],
                n = f) : (r = n,
                n = i)) : (r = n,
                n = i)) : (r = n,
                n = i),
                n !== i)
                    while (n !== i)
                        u.push(n),
                        n = r,
                        f = o(),
                        f !== i ? (h = b(),
                        h !== i ? (c = o(),
                        c !== i ? (f = [f, h, c],
                        n = f) : (r = n,
                        n = i)) : (r = n,
                        n = i)) : (r = n,
                        n = i);
                else
                    u = i;
                return u !== i && (e = s,
                u = bi(u)),
                s = u,
                s === i && (s = r,
                u = nt(),
                s = u !== i ? t.substring(s, r) : u),
                s
            }
            function fr() {
                var t, n;
                return t = r,
                n = yi(),
                n !== i && (e = t,
                n = wi(n)),
                t = n
            }
            function rr() {
                var n, o, e;
                if (n = d(),
                n === i) {
                    if (n = r,
                    o = [],
                    st.test(t.charAt(r)) ? (e = t.charAt(r),
                    r++) : (e = i,
                    u === 0 && f(ht)),
                    e !== i)
                        while (e !== i)
                            o.push(e),
                            st.test(t.charAt(r)) ? (e = t.charAt(r),
                            r++) : (e = i,
                            u === 0 && f(ht));
                    else
                        o = i;
                    n = o !== i ? t.substring(n, r) : o
                }
                return n
            }
            function ir() {
                var n, v, w, y, b, s, h, c, p;
                return n = r,
                t.charCodeAt(r) === 123 ? (v = lt,
                r++) : (v = i,
                u === 0 && f(vt)),
                v !== i ? (w = o(),
                w !== i ? (y = rr(),
                y !== i ? (b = o(),
                b !== i ? (s = r,
                t.charCodeAt(r) === 44 ? (h = l,
                r++) : (h = i,
                u === 0 && f(a)),
                h !== i ? (c = o(),
                c !== i ? (p = tr(),
                p !== i ? (h = [h, c, p],
                s = h) : (r = s,
                s = i)) : (r = s,
                s = i)) : (r = s,
                s = i),
                s === i && (s = null),
                s !== i ? (h = o(),
                h !== i ? (t.charCodeAt(r) === 125 ? (c = wt,
                r++) : (c = i,
                u === 0 && f(yt)),
                c !== i ? (e = n,
                v = er(y, s),
                n = v) : (r = n,
                n = i)) : (r = n,
                n = i)) : (r = n,
                n = i)) : (r = n,
                n = i)) : (r = n,
                n = i)) : (r = n,
                n = i)) : (r = n,
                n = i),
                n
            }
            function tr() {
                var n;
                return n = nr(),
                n === i && (n = gi(),
                n === i && (n = ki(),
                n === i && (n = pi()))),
                n
            }
            function nr() {
                var h, n, p, s, c, v, y;
                return h = r,
                t.substr(r, 6) === ti ? (n = ti,
                r += 6) : (n = i,
                u === 0 && f(tu)),
                n === i && (t.substr(r, 4) === ri ? (n = ri,
                r += 4) : (n = i,
                u === 0 && f(nu)),
                n === i && (t.substr(r, 4) === ui ? (n = ui,
                r += 4) : (n = i,
                u === 0 && f(gr)))),
                n !== i ? (p = o(),
                p !== i ? (s = r,
                t.charCodeAt(r) === 44 ? (c = l,
                r++) : (c = i,
                u === 0 && f(a)),
                c !== i ? (v = o(),
                v !== i ? (y = b(),
                y !== i ? (c = [c, v, y],
                s = c) : (r = s,
                s = i)) : (r = s,
                s = i)) : (r = s,
                s = i),
                s === i && (s = null),
                s !== i ? (e = h,
                n = dr(n, s),
                h = n) : (r = h,
                h = i)) : (r = h,
                h = i)) : (r = h,
                h = i),
                h
            }
            function gi() {
                var n, s, v, h, y, c;
                return n = r,
                t.substr(r, 6) === ei ? (s = ei,
                r += 6) : (s = i,
                u === 0 && f(kr)),
                s !== i ? (v = o(),
                v !== i ? (t.charCodeAt(r) === 44 ? (h = l,
                r++) : (h = i,
                u === 0 && f(a)),
                h !== i ? (y = o(),
                y !== i ? (c = oi(),
                c !== i ? (e = n,
                s = br(c),
                n = s) : (r = n,
                n = i)) : (r = n,
                n = i)) : (r = n,
                n = i)) : (r = n,
                n = i)) : (r = n,
                n = i),
                n
            }
            function ki() {
                var n, s, v, h, y, c;
                return n = r,
                t.substr(r, 13) === si ? (s = si,
                r += 13) : (s = i,
                u === 0 && f(iu)),
                s !== i ? (v = o(),
                v !== i ? (t.charCodeAt(r) === 44 ? (h = l,
                r++) : (h = i,
                u === 0 && f(a)),
                h !== i ? (y = o(),
                y !== i ? (c = oi(),
                c !== i ? (e = n,
                s = wr(c),
                n = s) : (r = n,
                n = i)) : (r = n,
                n = i)) : (r = n,
                n = i)) : (r = n,
                n = i)) : (r = n,
                n = i),
                n
            }
            function pi() {
                var n, s, p, v, w, h, c;
                if (n = r,
                t.substr(r, 6) === ni ? (s = ni,
                r += 6) : (s = i,
                u === 0 && f(yr)),
                s !== i)
                    if (p = o(),
                    p !== i)
                        if (t.charCodeAt(r) === 44 ? (v = l,
                        r++) : (v = i,
                        u === 0 && f(a)),
                        v !== i)
                            if (w = o(),
                            w !== i) {
                                if (h = [],
                                c = y(),
                                c !== i)
                                    while (c !== i)
                                        h.push(c),
                                        c = y();
                                else
                                    h = i;
                                h !== i ? (e = n,
                                s = vr(h),
                                n = s) : (r = n,
                                n = i)
                            } else
                                r = n,
                                n = i;
                        else
                            r = n,
                            n = i;
                    else
                        r = n,
                        n = i;
                else
                    r = n,
                    n = i;
                return n
            }
            function vi() {
                var e, n, o, s;
                return e = r,
                n = r,
                t.charCodeAt(r) === 61 ? (o = ar,
                r++) : (o = i,
                u === 0 && f(lr)),
                o !== i ? (s = d(),
                s !== i ? (o = [o, s],
                n = o) : (r = n,
                n = i)) : (r = n,
                n = i),
                e = n !== i ? t.substring(e, r) : n,
                e === i && (e = b()),
                e
            }
            function y() {
                var n, s, h, v, c, y, l, p, a;
                return n = r,
                s = o(),
                s !== i ? (h = vi(),
                h !== i ? (v = o(),
                v !== i ? (t.charCodeAt(r) === 123 ? (c = lt,
                r++) : (c = i,
                u === 0 && f(vt)),
                c !== i ? (y = o(),
                y !== i ? (l = rt(),
                l !== i ? (p = o(),
                p !== i ? (t.charCodeAt(r) === 125 ? (a = wt,
                r++) : (a = i,
                u === 0 && f(yt)),
                a !== i ? (e = n,
                s = cr(h, l),
                n = s) : (r = n,
                n = i)) : (r = n,
                n = i)) : (r = n,
                n = i)) : (r = n,
                n = i)) : (r = n,
                n = i)) : (r = n,
                n = i)) : (r = n,
                n = i)) : (r = n,
                n = i),
                n
            }
            function ai() {
                var n, s, c, h;
                return n = r,
                t.substr(r, 7) === ii ? (s = ii,
                r += 7) : (s = i,
                u === 0 && f(hr)),
                s !== i ? (c = o(),
                c !== i ? (h = d(),
                h !== i ? (e = n,
                s = pr(h),
                n = s) : (r = n,
                n = i)) : (r = n,
                n = i)) : (r = n,
                n = i),
                n
            }
            function oi() {
                var n, t, s, u, f;
                if (n = r,
                t = ai(),
                t === i && (t = null),
                t !== i)
                    if (s = o(),
                    s !== i) {
                        if (u = [],
                        f = y(),
                        f !== i)
                            while (f !== i)
                                u.push(f),
                                f = y();
                        else
                            u = i;
                        u !== i ? (e = n,
                        t = uu(t, u),
                        n = t) : (r = n,
                        n = i)
                    } else
                        r = n,
                        n = i;
                else
                    r = n,
                    n = i;
                return n
            }
            function nt() {
                var e, n;
                if (u++,
                e = [],
                it.test(t.charAt(r)) ? (n = t.charAt(r),
                r++) : (n = i,
                u === 0 && f(dt)),
                n !== i)
                    while (n !== i)
                        e.push(n),
                        it.test(t.charAt(r)) ? (n = t.charAt(r),
                        r++) : (n = i,
                        u === 0 && f(dt));
                else
                    e = i;
                return u--,
                e === i && (n = i,
                u === 0 && f(au)),
                e
            }
            function o() {
                var n, e, o;
                for (u++,
                n = r,
                e = [],
                o = nt(); o !== i; )
                    e.push(o),
                    o = nt();
                return n = e !== i ? t.substring(n, r) : e,
                u--,
                n === i && (e = i,
                u === 0 && f(fu)),
                n
            }
            function fi() {
                var n;
                return gu.test(t.charAt(r)) ? (n = t.charAt(r),
                r++) : (n = i,
                u === 0 && f(du)),
                n
            }
            function v() {
                var n;
                return ku.test(t.charAt(r)) ? (n = t.charAt(r),
                r++) : (n = i,
                u === 0 && f(bu)),
                n
            }
            function d() {
                var h, n, o, s, c, l;
                if (h = r,
                t.charCodeAt(r) === 48 ? (n = wu,
                r++) : (n = i,
                u === 0 && f(pu)),
                n === i) {
                    if (n = r,
                    o = r,
                    yu.test(t.charAt(r)) ? (s = t.charAt(r),
                    r++) : (s = i,
                    u === 0 && f(nf)),
                    s !== i) {
                        for (c = [],
                        l = fi(); l !== i; )
                            c.push(l),
                            l = fi();
                        c !== i ? (s = [s, c],
                        o = s) : (r = o,
                        o = i)
                    } else
                        r = o,
                        o = i;
                    n = o !== i ? t.substring(n, r) : o
                }
                return n !== i && (e = h,
                n = tf(n)),
                h = n
            }
            function ot() {
                var n, o, h, s, c, l, a, y;
                return vu.test(t.charAt(r)) ? (n = t.charAt(r),
                r++) : (n = i,
                u === 0 && f(lu)),
                n === i && (n = r,
                t.substr(r, 2) === kt ? (o = kt,
                r += 2) : (o = i,
                u === 0 && f(cu)),
                o !== i && (e = n,
                o = hu()),
                n = o,
                n === i && (n = r,
                t.substr(r, 2) === at ? (o = at,
                r += 2) : (o = i,
                u === 0 && f(su)),
                o !== i && (e = n,
                o = or()),
                n = o,
                n === i && (n = r,
                t.substr(r, 2) === pt ? (o = pt,
                r += 2) : (o = i,
                u === 0 && f(ou)),
                o !== i && (e = n,
                o = eu()),
                n = o,
                n === i && (n = r,
                t.substr(r, 2) === bt ? (o = bt,
                r += 2) : (o = i,
                u === 0 && f(sr)),
                o !== i && (e = n,
                o = ru()),
                n = o,
                n === i && (n = r,
                t.substr(r, 2) === gt ? (o = gt,
                r += 2) : (o = i,
                u === 0 && f(ur)),
                o !== i ? (h = r,
                s = r,
                c = v(),
                c !== i ? (l = v(),
                l !== i ? (a = v(),
                a !== i ? (y = v(),
                y !== i ? (c = [c, l, a, y],
                s = c) : (r = s,
                s = i)) : (r = s,
                s = i)) : (r = s,
                s = i)) : (r = s,
                s = i),
                h = s !== i ? t.substring(h, r) : s,
                h !== i ? (e = n,
                o = ci(h),
                n = o) : (r = n,
                n = i)) : (r = n,
                n = i)))))),
                n
            }
            function b() {
                var u, n, t;
                if (u = r,
                n = [],
                t = ot(),
                t !== i)
                    while (t !== i)
                        n.push(t),
                        t = ot();
                else
                    n = i;
                return n !== i && (e = u,
                n = li(n)),
                u = n
            }
            var k = arguments.length > 1 ? arguments[1] : {}, rf = this, i = {}, hi = {
                start: ut
            }, ft = ut, di = function(n) {
                return {
                    type: "messageFormatPattern",
                    elements: n,
                    location: h()
                }
            }, bi = function(n) {
                for (var u = "", i, r, e, t = 0, f = n.length; t < f; t += 1)
                    for (r = n[t],
                    i = 0,
                    e = r.length; i < e; i += 1)
                        u += r[i];
                return u
            }, wi = function(n) {
                return {
                    type: "messageTextElement",
                    value: n,
                    location: h()
                }
            }, st = /^[^ \t\n\r,.+={}#]/, ht = {
                type: "class",
                value: "[^ \\t\\n\\r,.+={}#]",
                description: "[^ \\t\\n\\r,.+={}#]"
            }, lt = "{", vt = {
                type: "literal",
                value: "{",
                description: '"{"'
            }, l = ",", a = {
                type: "literal",
                value: ",",
                description: '","'
            }, wt = "}", yt = {
                type: "literal",
                value: "}",
                description: '"}"'
            }, er = function(n, t) {
                return {
                    type: "argumentElement",
                    id: n,
                    format: t && t[2],
                    location: h()
                }
            }, ti = "number", tu = {
                type: "literal",
                value: "number",
                description: '"number"'
            }, ri = "date", nu = {
                type: "literal",
                value: "date",
                description: '"date"'
            }, ui = "time", gr = {
                type: "literal",
                value: "time",
                description: '"time"'
            }, dr = function(n, t) {
                return {
                    type: n + "Format",
                    style: t && t[2],
                    location: h()
                }
            }, ei = "plural", kr = {
                type: "literal",
                value: "plural",
                description: '"plural"'
            }, br = function(n) {
                return {
                    type: n.type,
                    ordinal: !1,
                    offset: n.offset || 0,
                    options: n.options,
                    location: h()
                }
            }, si = "selectordinal", iu = {
                type: "literal",
                value: "selectordinal",
                description: '"selectordinal"'
            }, wr = function(n) {
                return {
                    type: n.type,
                    ordinal: !0,
                    offset: n.offset || 0,
                    options: n.options,
                    location: h()
                }
            }, ni = "select", yr = {
                type: "literal",
                value: "select",
                description: '"select"'
            }, vr = function(n) {
                return {
                    type: "selectFormat",
                    options: n,
                    location: h()
                }
            }, ar = "=", lr = {
                type: "literal",
                value: "=",
                description: '"="'
            }, cr = function(n, t) {
                return {
                    type: "optionalFormatPattern",
                    selector: n,
                    value: t,
                    location: h()
                }
            }, ii = "offset:", hr = {
                type: "literal",
                value: "offset:",
                description: '"offset:"'
            }, pr = function(n) {
                return n
            }, uu = function(n, t) {
                return {
                    type: "pluralFormat",
                    offset: n,
                    options: t,
                    location: h()
                }
            }, au = {
                type: "other",
                description: "whitespace"
            }, it = /^[ \t\n\r]/, dt = {
                type: "class",
                value: "[ \\t\\n\\r]",
                description: "[ \\t\\n\\r]"
            }, fu = {
                type: "other",
                description: "optionalWhitespace"
            }, gu = /^[0-9]/, du = {
                type: "class",
                value: "[0-9]",
                description: "[0-9]"
            }, ku = /^[0-9a-f]/i, bu = {
                type: "class",
                value: "[0-9a-f]i",
                description: "[0-9a-f]i"
            }, wu = "0", pu = {
                type: "literal",
                value: "0",
                description: '"0"'
            }, yu = /^[1-9]/, nf = {
                type: "class",
                value: "[1-9]",
                description: "[1-9]"
            }, tf = function(n) {
                return parseInt(n, 10)
            }, vu = /^[^{}\\\0-\x1F \t\n\r]/, lu = {
                type: "class",
                value: "[^{}\\\\\\0-\\x1F\\x7f \\t\\n\\r]",
                description: "[^{}\\\\\\0-\\x1F\\x7f \\t\\n\\r]"
            }, kt = "\\\\", cu = {
                type: "literal",
                value: "\\\\",
                description: '"\\\\\\\\"'
            }, hu = function() {
                return "\\"
            }, at = "\\#", su = {
                type: "literal",
                value: "\\#",
                description: '"\\\\#"'
            }, or = function() {
                return "\\#"
            }, pt = "\\{", ou = {
                type: "literal",
                value: "\\{",
                description: '"\\\\{"'
            }, eu = function() {
                return "{"
            }, bt = "\\}", sr = {
                type: "literal",
                value: "\\}",
                description: '"\\\\}"'
            }, ru = function() {
                return "}"
            }, gt = "\\u", ur = {
                type: "literal",
                value: "\\u",
                description: '"\\\\u"'
            }, ci = function(n) {
                return String.fromCharCode(parseInt(n, 16))
            }, li = function(n) {
                return n.join("")
            }, r = 0, e = 0, w = [{
                line: 1,
                column: 1,
                seenCR: !1
            }], s = 0, tt = [], u = 0, p;
            if ("startRule"in k) {
                if (!(k.startRule in hi))
                    throw new Error("Can't start parsing from rule \"" + k.startRule + '".');
                ft = hi[k.startRule]
            }
            if (p = ft(),
            p !== i && r === t.length)
                return p;
            p !== i && r < t.length && f({
                type: "end",
                description: "end of input"
            });
            throw g(null, tt, s < t.length ? t.charAt(s) : null, s < t.length ? c(s, s + 1) : c(s, s));
        }
        return t(n, Error),
        {
            SyntaxError: n,
            parse: i
        }
    }()
}
, function(n, t) {
    "use strict";
    t.a = {
        locale: "en",
        pluralRuleFunction: function(n, t) {
            var i = String(n).split(".")
              , e = !i[1]
              , f = Number(i[0]) == n
              , r = f && i[0].slice(-1)
              , u = f && i[0].slice(-2);
            return t ? r == 1 && u != 11 ? "one" : r == 2 && u != 12 ? "two" : r == 3 && u != 13 ? "few" : "other" : n == 1 && e ? "one" : "other"
        }
    }
}
, function(n, t) {
    "use strict";
    function r() {
        return typeof Intl.Collator != "undefined"
    }
    function u() {
        if (typeof String.prototype.localeCompare != "undefined")
            try {
                "foo".localeCompare("bar", "i")
            } catch (n) {
                return n.name === "RangeError"
            }
        return !1
    }
    function f(n, t) {
        return n < t ? -1 : n > t ? 1 : 0
    }
    function e(n) {
        return r() ? new Intl.Collator(n).compare : u() ? function(t, i) {
            return t.localeCompare(i, n)
        }
        : f
    }
    t.a = e
}
]);
;!function(n) {
    function t(r) {
        if (i[r])
            return i[r].exports;
        var u = i[r] = {
            i: r,
            l: !1,
            exports: {}
        };
        return n[r].call(u.exports, u, u.exports, t),
        u.l = !0,
        u.exports
    }
    var i = {};
    t.m = n,
    t.c = i,
    t.d = function(n, i, r) {
        t.o(n, i) || Object.defineProperty(n, i, {
            enumerable: !0,
            get: r
        })
    }
    ,
    t.r = function(n) {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(n, Symbol.toStringTag, {
            value: "Module"
        }),
        Object.defineProperty(n, "__esModule", {
            value: !0
        })
    }
    ,
    t.t = function(n, i) {
        var r, u;
        if ((1 & i && (n = t(n)),
        8 & i) || 4 & i && "object" == typeof n && n && n.__esModule)
            return n;
        if (r = Object.create(null),
        t.r(r),
        Object.defineProperty(r, "default", {
            enumerable: !0,
            value: n
        }),
        2 & i && "string" != typeof n)
            for (u in n)
                t.d(r, u, function(t) {
                    return n[t]
                }
                .bind(null, u));
        return r
    }
    ,
    t.n = function(n) {
        var i = n && n.__esModule ? function() {
            return n.default
        }
        : function() {
            return n
        }
        ;
        return t.d(i, "a", i),
        i
    }
    ,
    t.o = function(n, t) {
        return Object.prototype.hasOwnProperty.call(n, t)
    }
    ,
    t.p = "",
    t(t.s = 0)
}([function(n, t, i) {
    "use strict";
    var u = function() {
        function n(n, t) {
            for (var i, r = 0; r < t.length; r++)
                i = t[r],
                i.enumerable = i.enumerable || !1,
                i.configurable = !0,
                "value"in i && (i.writable = !0),
                Object.defineProperty(n, i.key, i)
        }
        return function(t, i, r) {
            return i && n(t.prototype, i),
            r && n(t, r),
            t
        }
    }()
      , f = function(n, t) {
        return Object.freeze(Object.defineProperties(n, {
            raw: {
                value: Object.freeze(t)
            }
        }))
    }(["The namespace {nameSpace} was not found"], ["The namespace {nameSpace} was not found"])
      , r = function(n) {
        return n && n.__esModule ? n : {
            "default": n
        }
    }(i(1))
      , e = function() {
        function n() {
            !function(n, t) {
                if (!(n instanceof t))
                    throw new TypeError("Cannot call a class as a function");
            }(this, n)
        }
        return u(n, [{
            key: "getTranslationResource",
            value: function(n) {
                var t, i;
                return Roblox.Lang && Roblox.Lang[n] ? (t = Object.assign({}, Roblox.Lang[n]),
                new r.default(t,n)) : (i = $(f),
                new RobloxError(i,ReferenceError).throw(),
                new r.default({},n))
            }
        }]),
        n
    }();
    window.Roblox && (Roblox.TranslationResourceProvider = e,
    Roblox.TranslationResource = r.default)
}
, function(n, t) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var r = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(n) {
        return typeof n
    }
    : function(n) {
        return n && "function" == typeof Symbol && n.constructor === Symbol && n !== Symbol.prototype ? "symbol" : typeof n
    }
      , u = function() {
        function n(n, t) {
            for (var i, r = 0; r < t.length; r++)
                i = t[r],
                i.enumerable = i.enumerable || !1,
                i.configurable = !0,
                "value"in i && (i.writable = !0),
                Object.defineProperty(n, i.key, i)
        }
        return function(t, i, r) {
            return i && n(t.prototype, i),
            r && n(t, r),
            t
        }
    }()
      , f = function(n, t) {
        return Object.freeze(Object.defineProperties(n, {
            raw: {
                value: Object.freeze(t)
            }
        }))
    }(["The translation key '{key}' not found. Please check for a missing string or a typo"], ["The translation key '{key}' not found. Please check for a missing string or a typo"])
      , e = function() {
        function n(t, i) {
            !function(n, t) {
                if (!(n instanceof t))
                    throw new TypeError("Cannot call a class as a function");
            }(this, n),
            this.nameSpace = i,
            this.resourceMap = t,
            this.intl = new Roblox.Intl
        }
        return u(n, [{
            key: "get",
            value: function(n) {
                var e;
                if (!n || "string" != typeof n)
                    throw new TypeError("Parameter 'key' must be provided and it should be a string");
                var i = void 0
                  , u = void 0
                  , t = this.resourceMap[n];
                if (t || (e = $(f),
                new RobloxError(e).throw()),
                2 === arguments.length && arguments[1]) {
                    if ("object" === r(arguments[1]) && !Array.isArray(arguments[1]))
                        return i = arguments[1],
                        t ? this.intl.f(t, i) : "";
                    if ("string" == typeof arguments[1])
                        return u = arguments[1],
                        t || u;
                    new RobloxError("Second parameter must be either an object or a string").throw()
                }
                if (3 === arguments.length && arguments[1] && arguments[2]) {
                    if ("object" === r(arguments[1]) && !Array.isArray(arguments[1]) && "string" == typeof arguments[2])
                        return i = arguments[1],
                        u = arguments[2],
                        t ? this.intl.f(t, i) : this.intl.f(u, i);
                    new RobloxError("Second and third parameters must be an object and a string respectively").throw()
                }
                return t || ""
            }
        }, {
            key: "addKeyForDevelopment",
            value: function(n, t) {
                if (this.resourceMap[n])
                    throw new Error("'key' " + n + " is already present");
                this.resourceMap[n] = t
            }
        }]),
        n
    }();
    t.default = e
}
]);
;var Roblox = Roblox || {};
Roblox.LanguageSwitcher = function() {
    var n = function(n) {
        var t = document.querySelector('meta[name="page-meta"]'), i = "", r, u, f;
        if (t && t.dataset && t.dataset.internalPageName && (i = t.dataset.internalPageName),
        i === "RollerCoaster" || i === "Landing") {
            r = Roblox.UrlParser.addOrUpdateQueryStringParameter(location.search, "locale", n),
            u = Roblox.Endpoints.getAbsoluteUrl(location.pathname + r),
            location.href = u;
            return
        }
        f = Roblox.EnvironmentUrls.localeApi + "/v1/locales/set-user-supported-locale",
        $.post(f, {
            supportedLocaleCode: n
        }).then(function(n) {
            n.success && location.reload()
        }, function(n) {
            console.debug(n)
        })
    };
    $(function() {
        $("#language-switcher").change(function() {
            var t = $(this).val();
            n(t)
        }),
        $(".locale-option").click(function() {
            var t = $(this).data("locale");
            n(t)
        })
    })
}();
;var Roblox = Roblox || {};
Roblox.Lang = Roblox.Lang || {},
Roblox.Lang["CommonUI.Controls"] = {
    "Action.Accept": "Accept",
    "Action.Agree": "Agree",
    "Action.Allow": "Allow",
    "Action.Back": "Back",
    "Action.Cancel": "Cancel",
    "Action.Confirm": "Confirm",
    "Action.No": "No",
    "Action.OK": "OK",
    "Action.Submit": "Submit",
    "Action.Yes": "Yes",
    "Birthdaypicker.Label.Date": "Date",
    "Label.April": "April",
    "Label.August": "August",
    "Label.CurrentPage": "Page {currentPage}",
    "Label.Day": "Day",
    "Label.December": "December",
    "Label.February": "February",
    "Label.January": "January",
    "Label.July": "July",
    "Label.June": "June",
    "Label.March": "March",
    "Label.May": "May",
    "Label.Month": "Month",
    "Label.Next": "Next",
    "Label.November": "November",
    "Label.October": "October",
    "Label.Previous": "Previous",
    "Label.September": "September",
    "Label.Year": "Year"
},
Roblox.Lang.ControlsResources = Roblox.Lang["CommonUI.Controls"];
;(function(n) {
    function t(n, t) {
        return typeof n == "function" ? n.call(t) : n
    }
    function r(n) {
        while (n = n.parentNode)
            if (n == document)
                return !0;
        return !1
    }
    function i(t, i) {
        this.$element = n(t),
        this.options = i,
        this.enabled = !0,
        this.fixTitle()
    }
    i.prototype = {
        show: function() {
            var s = this.getTitle(), r;
            if (s && this.enabled) {
                r = this.tip(),
                r.find(".tipsy-inner")[this.options.html ? "html" : "text"](s),
                r[0].className = "tipsy",
                r.remove().css({
                    top: 0,
                    left: 0,
                    visibility: "hidden",
                    display: "block"
                }).prependTo(document.body);
                var i = n.extend({}, this.$element.offset(), {
                    width: this.$element[0].offsetWidth,
                    height: this.$element[0].offsetHeight
                }), e = r[0].offsetWidth, o = r[0].offsetHeight, f = t(this.options.gravity, this.$element[0]), u;
                switch (f.charAt(0)) {
                case "n":
                    u = {
                        top: i.top + i.height + this.options.offset,
                        left: i.left + i.width / 2 - e / 2
                    };
                    break;
                case "s":
                    u = {
                        top: i.top - o - this.options.offset,
                        left: i.left + i.width / 2 - e / 2
                    };
                    break;
                case "e":
                    u = {
                        top: i.top + i.height / 2 - o / 2,
                        left: i.left - e - this.options.offset
                    };
                    break;
                case "w":
                    u = {
                        top: i.top + i.height / 2 - o / 2,
                        left: i.left + i.width + this.options.offset
                    }
                }
                f.length == 2 && (u.left = f.charAt(1) == "w" ? i.left + i.width / 2 - 15 : i.left + i.width / 2 - e + 15),
                r.css(u).addClass("tipsy-" + f),
                r.find(".tipsy-arrow")[0].className = "tipsy-arrow tipsy-arrow-" + f.charAt(0),
                this.options.className && r.addClass(t(this.options.className, this.$element[0])),
                this.options.fade ? r.stop().css({
                    opacity: 0,
                    display: "block",
                    visibility: "visible"
                }).animate({
                    opacity: this.options.opacity
                }) : r.css({
                    visibility: "visible",
                    opacity: this.options.opacity
                })
            }
        },
        hide: function() {
            this.options.fade ? this.tip().stop().fadeOut(function() {
                n(this).remove()
            }) : this.tip().remove()
        },
        fixTitle: function() {
            var n = this.$element;
            (n.attr("title") || typeof n.attr("original-title") != "string") && n.attr("original-title", n.attr("title") || "").removeAttr("title")
        },
        getTitle: function() {
            var i = this.$element, n = this.options, t;
            return this.fixTitle(),
            n = this.options,
            typeof n.title == "string" ? t = i.attr(n.title == "title" ? "original-title" : n.title) : typeof n.title == "function" && (t = n.title.call(i[0])),
            t = ("" + t).replace(/(^\s*|\s*$)/, ""),
            t || n.fallback
        },
        tip: function() {
            return this.$tip || (this.$tip = n('<div class="tipsy"></div>').html('<div class="tipsy-arrow"></div><div class="tipsy-inner"></div>'),
            this.$tip.data("tipsy-pointee", this.$element[0])),
            this.$tip
        },
        validate: function() {
            this.$element[0].parentNode || (this.hide(),
            this.$element = null,
            this.options = null)
        },
        enable: function() {
            this.enabled = !0
        },
        disable: function() {
            this.enabled = !1
        },
        toggleEnabled: function() {
            this.enabled = !this.enabled
        }
    },
    n.fn.tipsy = function(t) {
        function u(r) {
            var u = n.data(r, "tipsy");
            return u || (u = new i(r,n.fn.tipsy.elementOptions(r, t)),
            n.data(r, "tipsy", u)),
            u
        }
        function e() {
            var n = u(this);
            n.hoverState = "in",
            t.delayIn == 0 ? n.show() : (n.fixTitle(),
            setTimeout(function() {
                n.hoverState == "in" && n.show()
            }, t.delayIn))
        }
        function o() {
            var n = u(this);
            n.hoverState = "out",
            t.delayOut == 0 ? n.hide() : setTimeout(function() {
                n.hoverState == "out" && n.hide()
            }, t.delayOut)
        }
        var r;
        if (t === !0)
            return this.data("tipsy");
        if (typeof t == "string")
            return r = this.data("tipsy"),
            r && r[t](),
            this;
        if (t = n.extend({}, n.fn.tipsy.defaults, t),
        t.live || this.each(function() {
            u(this)
        }),
        t.trigger != "manual") {
            var f = t.live ? "live" : "bind"
              , s = t.trigger == "hover" ? "mouseenter" : "focus"
              , h = t.trigger == "hover" ? "mouseleave" : "blur";
            this[f](s, e)[f](h, o)
        }
        return this
    }
    ,
    n.fn.tipsy.defaults = {
        className: null,
        delayIn: 0,
        delayOut: 0,
        fade: !1,
        fallback: "",
        gravity: "n",
        html: !1,
        live: !1,
        offset: 0,
        opacity: .8,
        title: "title",
        trigger: "hover"
    },
    n.fn.tipsy.revalidate = function() {
        n(".tipsy").each(function() {
            var t = n.data(this, "tipsy-pointee");
            t && r(t) || n(this).remove()
        })
    }
    ,
    n.fn.tipsy.elementOptions = function(t, i) {
        return n.metadata ? n.extend({}, i, n(t).metadata()) : i
    }
    ,
    n.fn.tipsy.autoNS = function() {
        return n(this).offset().top > n(document).scrollTop() + n(window).height() / 2 ? "s" : "n"
    }
    ,
    n.fn.tipsy.autoWE = function() {
        return n(this).offset().left > n(document).scrollLeft() + n(window).width() / 2 ? "e" : "w"
    }
    ,
    n.fn.tipsy.autoBounds = function(t, i) {
        return function() {
            var r = {
                ns: i[0],
                ew: i.length > 1 ? i[1] : !1
            }
              , f = n(document).scrollTop() + t
              , e = n(document).scrollLeft() + t
              , u = n(this);
            return u.offset().top < f && (r.ns = "n"),
            u.offset().left < e && (r.ew = "w"),
            n(window).width() + n(document).scrollLeft() - u.offset().left < t && (r.ew = "e"),
            n(window).height() + n(document).scrollTop() - u.offset().top < t && (r.ns = "s"),
            r.ns + (r.ew ? r.ew : "")
        }
    }
}
)(jQuery);
;$.extend(String.prototype, function() {
    function n() {
        return this.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;")
    }
    return {
        escapeHTML: n
    }
}());
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
;$(function() {
    try {
        $(".tooltip").tipsy(),
        $(".tooltip-top").tipsy({
            gravity: "s"
        }),
        $(".tooltip-right").tipsy({
            gravity: "w"
        }),
        $(".tooltip-left").tipsy({
            gravity: "e"
        }),
        $(".tooltip-bottom").tipsy({
            gravity: "n"
        })
    } catch (n) {}
    $("a.btn-disabled-primary[disabled]").prop("disabled", !0)
}),
typeof Roblox == "undefined" && (Roblox = {}),
Roblox.FixedUI = function() {
    function t() {
        var n = 1024;
        return document.body && document.body.offsetWidth && (n = document.body.offsetWidth),
        window.innerWidth && window.innerHeight && (n = window.innerWidth),
        n
    }
    function i() {
        return !$(".nav-container").hasClass("no-gutter-ads")
    }
    function e() {
        return t() > u
    }
    var u = 700, n = navigator.userAgent.toLowerCase(), f = /mobile/i.test(n) || /ipad/i.test(n) || /iphone/i.test(n) || /android/i.test(n) || /playbook/i.test(n) || /blackberry/i.test(n), r;
    return $(function() {
        var n, t;
        i() && (n = $("#LeftGutterAdContainer iframe"),
        n.length > 0 && (t = $(".ad-annotations", n.contents()),
        t.addClass("left-gutter-ad")))
    }),
    r = {
        isMobile: f,
        gutterAdsEnabled: i,
        isHeaderFixed: e,
        getWindowWidth: t
    }
}();
;/*!jPlayer 2.9.2 for jQuery ~ (c) 2009-2014 Happyworm Ltd ~ MIT License*/
!function(a, b) {
    "function" == typeof define && define.amd ? define(["jquery"], b) : b("object" == typeof exports ? require("jquery") : a.jQuery ? a.jQuery : a.Zepto)
}(this, function(a, b) {
    a.fn.jPlayer = function(c) {
        var d = "jPlayer"
          , e = "string" == typeof c
          , f = Array.prototype.slice.call(arguments, 1)
          , g = this;
        return c = !e && f.length ? a.extend.apply(null, [!0, c].concat(f)) : c,
        e && "_" === c.charAt(0) ? g : (this.each(e ? function() {
            var e = a(this).data(d)
              , h = e && a.isFunction(e[c]) ? e[c].apply(e, f) : e;
            return h !== e && h !== b ? (g = h,
            !1) : void 0
        }
        : function() {
            var b = a(this).data(d);
            b ? b.option(c || {}) : a(this).data(d, new a.jPlayer(c,this))
        }
        ),
        g)
    }
    ,
    a.jPlayer = function(b, c) {
        if (arguments.length) {
            this.element = a(c),
            this.options = a.extend(!0, {}, this.options, b);
            var d = this;
            this.element.bind("remove.jPlayer", function() {
                d.destroy()
            }),
            this._init()
        }
    }
    ,
    "function" != typeof a.fn.stop && (a.fn.stop = function() {}
    ),
    a.jPlayer.emulateMethods = "load play pause",
    a.jPlayer.emulateStatus = "src readyState networkState currentTime duration paused ended playbackRate",
    a.jPlayer.emulateOptions = "muted volume",
    a.jPlayer.reservedEvent = "ready flashreset resize repeat error warning",
    a.jPlayer.event = {},
    a.each(["ready", "setmedia", "flashreset", "resize", "repeat", "click", "error", "warning", "loadstart", "progress", "suspend", "abort", "emptied", "stalled", "play", "pause", "loadedmetadata", "loadeddata", "waiting", "playing", "canplay", "canplaythrough", "seeking", "seeked", "timeupdate", "ended", "ratechange", "durationchange", "volumechange"], function() {
        a.jPlayer.event[this] = "jPlayer_" + this
    }),
    a.jPlayer.htmlEvent = ["loadstart", "abort", "emptied", "stalled", "loadedmetadata", "canplay", "canplaythrough"],
    a.jPlayer.pause = function() {
        a.jPlayer.prototype.destroyRemoved(),
        a.each(a.jPlayer.prototype.instances, function(a, b) {
            b.data("jPlayer").status.srcSet && b.jPlayer("pause")
        })
    }
    ,
    a.jPlayer.timeFormat = {
        showHour: !1,
        showMin: !0,
        showSec: !0,
        padHour: !1,
        padMin: !0,
        padSec: !0,
        sepHour: ":",
        sepMin: ":",
        sepSec: ""
    };
    var c = function() {
        this.init()
    };
    c.prototype = {
        init: function() {
            this.options = {
                timeFormat: a.jPlayer.timeFormat
            }
        },
        time: function(a) {
            a = a && "number" == typeof a ? a : 0;
            var b = new Date(1e3 * a)
              , c = b.getUTCHours()
              , d = this.options.timeFormat.showHour ? b.getUTCMinutes() : b.getUTCMinutes() + 60 * c
              , e = this.options.timeFormat.showMin ? b.getUTCSeconds() : b.getUTCSeconds() + 60 * d
              , f = this.options.timeFormat.padHour && 10 > c ? "0" + c : c
              , g = this.options.timeFormat.padMin && 10 > d ? "0" + d : d
              , h = this.options.timeFormat.padSec && 10 > e ? "0" + e : e
              , i = "";
            return i += this.options.timeFormat.showHour ? f + this.options.timeFormat.sepHour : "",
            i += this.options.timeFormat.showMin ? g + this.options.timeFormat.sepMin : "",
            i += this.options.timeFormat.showSec ? h + this.options.timeFormat.sepSec : ""
        }
    };
    var d = new c;
    a.jPlayer.convertTime = function(a) {
        return d.time(a)
    }
    ,
    a.jPlayer.uaBrowser = function(a) {
        var b = a.toLowerCase()
          , c = /(webkit)[ \/]([\w.]+)/
          , d = /(opera)(?:.*version)?[ \/]([\w.]+)/
          , e = /(msie) ([\w.]+)/
          , f = /(mozilla)(?:.*? rv:([\w.]+))?/
          , g = c.exec(b) || d.exec(b) || e.exec(b) || b.indexOf("compatible") < 0 && f.exec(b) || [];
        return {
            browser: g[1] || "",
            version: g[2] || "0"
        }
    }
    ,
    a.jPlayer.uaPlatform = function(a) {
        var b = a.toLowerCase()
          , c = /(ipad|iphone|ipod|android|blackberry|playbook|windows ce|webos)/
          , d = /(ipad|playbook)/
          , e = /(android)/
          , f = /(mobile)/
          , g = c.exec(b) || []
          , h = d.exec(b) || !f.exec(b) && e.exec(b) || [];
        return g[1] && (g[1] = g[1].replace(/\s/g, "_")),
        {
            platform: g[1] || "",
            tablet: h[1] || ""
        }
    }
    ,
    a.jPlayer.browser = {},
    a.jPlayer.platform = {};
    var e = a.jPlayer.uaBrowser(navigator.userAgent);
    e.browser && (a.jPlayer.browser[e.browser] = !0,
    a.jPlayer.browser.version = e.version);
    var f = a.jPlayer.uaPlatform(navigator.userAgent);
    f.platform && (a.jPlayer.platform[f.platform] = !0,
    a.jPlayer.platform.mobile = !f.tablet,
    a.jPlayer.platform.tablet = !!f.tablet),
    a.jPlayer.getDocMode = function() {
        var b;
        return a.jPlayer.browser.msie && (document.documentMode ? b = document.documentMode : (b = 5,
        document.compatMode && "CSS1Compat" === document.compatMode && (b = 7))),
        b
    }
    ,
    a.jPlayer.browser.documentMode = a.jPlayer.getDocMode(),
    a.jPlayer.nativeFeatures = {
        init: function() {
            var a, b, c, d = document, e = d.createElement("video"), f = {
                w3c: ["fullscreenEnabled", "fullscreenElement", "requestFullscreen", "exitFullscreen", "fullscreenchange", "fullscreenerror"],
                moz: ["mozFullScreenEnabled", "mozFullScreenElement", "mozRequestFullScreen", "mozCancelFullScreen", "mozfullscreenchange", "mozfullscreenerror"],
                webkit: ["", "webkitCurrentFullScreenElement", "webkitRequestFullScreen", "webkitCancelFullScreen", "webkitfullscreenchange", ""],
                webkitVideo: ["webkitSupportsFullscreen", "webkitDisplayingFullscreen", "webkitEnterFullscreen", "webkitExitFullscreen", "", ""],
                ms: ["", "msFullscreenElement", "msRequestFullscreen", "msExitFullscreen", "MSFullscreenChange", "MSFullscreenError"]
            }, g = ["w3c", "moz", "webkit", "webkitVideo", "ms"];
            for (this.fullscreen = a = {
                support: {
                    w3c: !!d[f.w3c[0]],
                    moz: !!d[f.moz[0]],
                    webkit: "function" == typeof d[f.webkit[3]],
                    webkitVideo: "function" == typeof e[f.webkitVideo[2]],
                    ms: "function" == typeof e[f.ms[2]]
                },
                used: {}
            },
            b = 0,
            c = g.length; c > b; b++) {
                var h = g[b];
                if (a.support[h]) {
                    a.spec = h,
                    a.used[h] = !0;
                    break
                }
            }
            if (a.spec) {
                var i = f[a.spec];
                a.api = {
                    fullscreenEnabled: !0,
                    fullscreenElement: function(a) {
                        return a = a ? a : d,
                        a[i[1]]
                    },
                    requestFullscreen: function(a) {
                        return a[i[2]]()
                    },
                    exitFullscreen: function(a) {
                        return a = a ? a : d,
                        a[i[3]]()
                    }
                },
                a.event = {
                    fullscreenchange: i[4],
                    fullscreenerror: i[5]
                }
            } else
                a.api = {
                    fullscreenEnabled: !1,
                    fullscreenElement: function() {
                        return null
                    },
                    requestFullscreen: function() {},
                    exitFullscreen: function() {}
                },
                a.event = {}
        }
    },
    a.jPlayer.nativeFeatures.init(),
    a.jPlayer.focus = null,
    a.jPlayer.keyIgnoreElementNames = "A INPUT TEXTAREA SELECT BUTTON";
    var g = function(b) {
        var c, d = a.jPlayer.focus;
        d && (a.each(a.jPlayer.keyIgnoreElementNames.split(/\s+/g), function(a, d) {
            return b.target.nodeName.toUpperCase() === d.toUpperCase() ? (c = !0,
            !1) : void 0
        }),
        c || a.each(d.options.keyBindings, function(c, e) {
            return e && a.isFunction(e.fn) && ("number" == typeof e.key && b.which === e.key || "string" == typeof e.key && b.key === e.key) ? (b.preventDefault(),
            e.fn(d),
            !1) : void 0
        }))
    };
    a.jPlayer.keys = function(b) {
        var c = "keydown.jPlayer";
        a(document.documentElement).unbind(c),
        b && a(document.documentElement).bind(c, g)
    }
    ,
    a.jPlayer.keys(!0),
    a.jPlayer.prototype = {
        count: 0,
        version: {
            script: "2.9.2",
            needFlash: "2.9.0",
            flash: "unknown"
        },
        options: {
            swfPath: "js",
            solution: "html, flash",
            supplied: "mp3",
            auroraFormats: "wav",
            preload: "metadata",
            volume: .8,
            muted: !1,
            remainingDuration: !1,
            toggleDuration: !1,
            captureDuration: !0,
            playbackRate: 1,
            defaultPlaybackRate: 1,
            minPlaybackRate: .5,
            maxPlaybackRate: 4,
            wmode: "opaque",
            backgroundColor: "#000000",
            cssSelectorAncestor: "#jp_container_1",
            cssSelector: {
                videoPlay: ".jp-video-play",
                play: ".jp-play",
                pause: ".jp-pause",
                stop: ".jp-stop",
                seekBar: ".jp-seek-bar",
                playBar: ".jp-play-bar",
                mute: ".jp-mute",
                unmute: ".jp-unmute",
                volumeBar: ".jp-volume-bar",
                volumeBarValue: ".jp-volume-bar-value",
                volumeMax: ".jp-volume-max",
                playbackRateBar: ".jp-playback-rate-bar",
                playbackRateBarValue: ".jp-playback-rate-bar-value",
                currentTime: ".jp-current-time",
                duration: ".jp-duration",
                title: ".jp-title",
                fullScreen: ".jp-full-screen",
                restoreScreen: ".jp-restore-screen",
                repeat: ".jp-repeat",
                repeatOff: ".jp-repeat-off",
                gui: ".jp-gui",
                noSolution: ".jp-no-solution"
            },
            stateClass: {
                playing: "jp-state-playing",
                seeking: "jp-state-seeking",
                muted: "jp-state-muted",
                looped: "jp-state-looped",
                fullScreen: "jp-state-full-screen",
                noVolume: "jp-state-no-volume"
            },
            useStateClassSkin: !1,
            autoBlur: !0,
            smoothPlayBar: !1,
            fullScreen: !1,
            fullWindow: !1,
            autohide: {
                restored: !1,
                full: !0,
                fadeIn: 200,
                fadeOut: 600,
                hold: 1e3
            },
            loop: !1,
            repeat: function(b) {
                b.jPlayer.options.loop ? a(this).unbind(".jPlayerRepeat").bind(a.jPlayer.event.ended + ".jPlayer.jPlayerRepeat", function() {
                    a(this).jPlayer("play")
                }) : a(this).unbind(".jPlayerRepeat")
            },
            nativeVideoControls: {},
            noFullWindow: {
                msie: /msie [0-6]\./,
                ipad: /ipad.*?os [0-4]\./,
                iphone: /iphone/,
                ipod: /ipod/,
                android_pad: /android [0-3]\.(?!.*?mobile)/,
                android_phone: /(?=.*android)(?!.*chrome)(?=.*mobile)/,
                blackberry: /blackberry/,
                windows_ce: /windows ce/,
                iemobile: /iemobile/,
                webos: /webos/
            },
            noVolume: {
                ipad: /ipad/,
                iphone: /iphone/,
                ipod: /ipod/,
                android_pad: /android(?!.*?mobile)/,
                android_phone: /android.*?mobile/,
                blackberry: /blackberry/,
                windows_ce: /windows ce/,
                iemobile: /iemobile/,
                webos: /webos/,
                playbook: /playbook/
            },
            timeFormat: {},
            keyEnabled: !1,
            audioFullScreen: !1,
            keyBindings: {
                play: {
                    key: 80,
                    fn: function(a) {
                        a.status.paused ? a.play() : a.pause()
                    }
                },
                fullScreen: {
                    key: 70,
                    fn: function(a) {
                        (a.status.video || a.options.audioFullScreen) && a._setOption("fullScreen", !a.options.fullScreen)
                    }
                },
                muted: {
                    key: 77,
                    fn: function(a) {
                        a._muted(!a.options.muted)
                    }
                },
                volumeUp: {
                    key: 190,
                    fn: function(a) {
                        a.volume(a.options.volume + .1)
                    }
                },
                volumeDown: {
                    key: 188,
                    fn: function(a) {
                        a.volume(a.options.volume - .1)
                    }
                },
                loop: {
                    key: 76,
                    fn: function(a) {
                        a._loop(!a.options.loop)
                    }
                }
            },
            verticalVolume: !1,
            verticalPlaybackRate: !1,
            globalVolume: !1,
            idPrefix: "jp",
            noConflict: "jQuery",
            emulateHtml: !1,
            consoleAlerts: !0,
            errorAlerts: !1,
            warningAlerts: !1
        },
        optionsAudio: {
            size: {
                width: "0px",
                height: "0px",
                cssClass: ""
            },
            sizeFull: {
                width: "0px",
                height: "0px",
                cssClass: ""
            }
        },
        optionsVideo: {
            size: {
                width: "480px",
                height: "270px",
                cssClass: "jp-video-270p"
            },
            sizeFull: {
                width: "100%",
                height: "100%",
                cssClass: "jp-video-full"
            }
        },
        instances: {},
        status: {
            src: "",
            media: {},
            paused: !0,
            format: {},
            formatType: "",
            waitForPlay: !0,
            waitForLoad: !0,
            srcSet: !1,
            video: !1,
            seekPercent: 0,
            currentPercentRelative: 0,
            currentPercentAbsolute: 0,
            currentTime: 0,
            duration: 0,
            remaining: 0,
            videoWidth: 0,
            videoHeight: 0,
            readyState: 0,
            networkState: 0,
            playbackRate: 1,
            ended: 0
        },
        internal: {
            ready: !1
        },
        solution: {
            html: !0,
            aurora: !0,
            flash: !0
        },
        format: {
            mp3: {
                codec: "audio/mpeg",
                flashCanPlay: !0,
                media: "audio"
            },
            m4a: {
                codec: 'audio/mp4; codecs="mp4a.40.2"',
                flashCanPlay: !0,
                media: "audio"
            },
            m3u8a: {
                codec: 'application/vnd.apple.mpegurl; codecs="mp4a.40.2"',
                flashCanPlay: !1,
                media: "audio"
            },
            m3ua: {
                codec: "audio/mpegurl",
                flashCanPlay: !1,
                media: "audio"
            },
            oga: {
                codec: 'audio/ogg; codecs="vorbis, opus"',
                flashCanPlay: !1,
                media: "audio"
            },
            flac: {
                codec: "audio/x-flac",
                flashCanPlay: !1,
                media: "audio"
            },
            wav: {
                codec: 'audio/wav; codecs="1"',
                flashCanPlay: !1,
                media: "audio"
            },
            webma: {
                codec: 'audio/webm; codecs="vorbis"',
                flashCanPlay: !1,
                media: "audio"
            },
            fla: {
                codec: "audio/x-flv",
                flashCanPlay: !0,
                media: "audio"
            },
            rtmpa: {
                codec: 'audio/rtmp; codecs="rtmp"',
                flashCanPlay: !0,
                media: "audio"
            },
            m4v: {
                codec: 'video/mp4; codecs="avc1.42E01E, mp4a.40.2"',
                flashCanPlay: !0,
                media: "video"
            },
            m3u8v: {
                codec: 'application/vnd.apple.mpegurl; codecs="avc1.42E01E, mp4a.40.2"',
                flashCanPlay: !1,
                media: "video"
            },
            m3uv: {
                codec: "audio/mpegurl",
                flashCanPlay: !1,
                media: "video"
            },
            ogv: {
                codec: 'video/ogg; codecs="theora, vorbis"',
                flashCanPlay: !1,
                media: "video"
            },
            webmv: {
                codec: 'video/webm; codecs="vorbis, vp8"',
                flashCanPlay: !1,
                media: "video"
            },
            flv: {
                codec: "video/x-flv",
                flashCanPlay: !0,
                media: "video"
            },
            rtmpv: {
                codec: 'video/rtmp; codecs="rtmp"',
                flashCanPlay: !0,
                media: "video"
            }
        },
        _init: function() {
            var c = this;
            if (this.element.empty(),
            this.status = a.extend({}, this.status),
            this.internal = a.extend({}, this.internal),
            this.options.timeFormat = a.extend({}, a.jPlayer.timeFormat, this.options.timeFormat),
            this.internal.cmdsIgnored = a.jPlayer.platform.ipad || a.jPlayer.platform.iphone || a.jPlayer.platform.ipod,
            this.internal.domNode = this.element.get(0),
            this.options.keyEnabled && !a.jPlayer.focus && (a.jPlayer.focus = this),
            this.androidFix = {
                setMedia: !1,
                play: !1,
                pause: !1,
                time: 0 / 0
            },
            a.jPlayer.platform.android && (this.options.preload = "auto" !== this.options.preload ? "metadata" : "auto"),
            this.formats = [],
            this.solutions = [],
            this.require = {},
            this.htmlElement = {},
            this.html = {},
            this.html.audio = {},
            this.html.video = {},
            this.aurora = {},
            this.aurora.formats = [],
            this.aurora.properties = [],
            this.flash = {},
            this.css = {},
            this.css.cs = {},
            this.css.jq = {},
            this.ancestorJq = [],
            this.options.volume = this._limitValue(this.options.volume, 0, 1),
            a.each(this.options.supplied.toLowerCase().split(","), function(b, d) {
                var e = d.replace(/^\s+|\s+$/g, "");
                if (c.format[e]) {
                    var f = !1;
                    a.each(c.formats, function(a, b) {
                        return e === b ? (f = !0,
                        !1) : void 0
                    }),
                    f || c.formats.push(e)
                }
            }),
            a.each(this.options.solution.toLowerCase().split(","), function(b, d) {
                var e = d.replace(/^\s+|\s+$/g, "");
                if (c.solution[e]) {
                    var f = !1;
                    a.each(c.solutions, function(a, b) {
                        return e === b ? (f = !0,
                        !1) : void 0
                    }),
                    f || c.solutions.push(e)
                }
            }),
            a.each(this.options.auroraFormats.toLowerCase().split(","), function(b, d) {
                var e = d.replace(/^\s+|\s+$/g, "");
                if (c.format[e]) {
                    var f = !1;
                    a.each(c.aurora.formats, function(a, b) {
                        return e === b ? (f = !0,
                        !1) : void 0
                    }),
                    f || c.aurora.formats.push(e)
                }
            }),
            this.internal.instance = "jp_" + this.count,
            this.instances[this.internal.instance] = this.element,
            this.element.attr("id") || this.element.attr("id", this.options.idPrefix + "_jplayer_" + this.count),
            this.internal.self = a.extend({}, {
                id: this.element.attr("id"),
                jq: this.element
            }),
            this.internal.audio = a.extend({}, {
                id: this.options.idPrefix + "_audio_" + this.count,
                jq: b
            }),
            this.internal.video = a.extend({}, {
                id: this.options.idPrefix + "_video_" + this.count,
                jq: b
            }),
            this.internal.flash = a.extend({}, {
                id: this.options.idPrefix + "_flash_" + this.count,
                jq: b,
                swf: this.options.swfPath + (".swf" !== this.options.swfPath.toLowerCase().slice(-4) ? (this.options.swfPath && "/" !== this.options.swfPath.slice(-1) ? "/" : "") + "jquery.jplayer.swf" : "")
            }),
            this.internal.poster = a.extend({}, {
                id: this.options.idPrefix + "_poster_" + this.count,
                jq: b
            }),
            a.each(a.jPlayer.event, function(a, d) {
                c.options[a] !== b && (c.element.bind(d + ".jPlayer", c.options[a]),
                c.options[a] = b)
            }),
            this.require.audio = !1,
            this.require.video = !1,
            a.each(this.formats, function(a, b) {
                c.require[c.format[b].media] = !0
            }),
            this.options = this.require.video ? a.extend(!0, {}, this.optionsVideo, this.options) : a.extend(!0, {}, this.optionsAudio, this.options),
            this._setSize(),
            this.status.nativeVideoControls = this._uaBlocklist(this.options.nativeVideoControls),
            this.status.noFullWindow = this._uaBlocklist(this.options.noFullWindow),
            this.status.noVolume = this._uaBlocklist(this.options.noVolume),
            a.jPlayer.nativeFeatures.fullscreen.api.fullscreenEnabled && this._fullscreenAddEventListeners(),
            this._restrictNativeVideoControls(),
            this.htmlElement.poster = document.createElement("img"),
            this.htmlElement.poster.id = this.internal.poster.id,
            this.htmlElement.poster.onload = function() {
                (!c.status.video || c.status.waitForPlay) && c.internal.poster.jq.show()
            }
            ,
            this.element.append(this.htmlElement.poster),
            this.internal.poster.jq = a("#" + this.internal.poster.id),
            this.internal.poster.jq.css({
                width: this.status.width,
                height: this.status.height
            }),
            this.internal.poster.jq.hide(),
            this.internal.poster.jq.bind("click.jPlayer", function() {
                c._trigger(a.jPlayer.event.click)
            }),
            this.html.audio.available = !1,
            this.require.audio && (this.htmlElement.audio = document.createElement("audio"),
            this.htmlElement.audio.id = this.internal.audio.id,
            this.html.audio.available = !!this.htmlElement.audio.canPlayType && this._testCanPlayType(this.htmlElement.audio)),
            this.html.video.available = !1,
            this.require.video && (this.htmlElement.video = document.createElement("video"),
            this.htmlElement.video.id = this.internal.video.id,
            this.html.video.available = !!this.htmlElement.video.canPlayType && this._testCanPlayType(this.htmlElement.video)),
            this.flash.available = this._checkForFlash(10.1),
            this.html.canPlay = {},
            this.aurora.canPlay = {},
            this.flash.canPlay = {},
            a.each(this.formats, function(b, d) {
                c.html.canPlay[d] = c.html[c.format[d].media].available && "" !== c.htmlElement[c.format[d].media].canPlayType(c.format[d].codec),
                c.aurora.canPlay[d] = a.inArray(d, c.aurora.formats) > -1,
                c.flash.canPlay[d] = c.format[d].flashCanPlay && c.flash.available
            }),
            this.html.desired = !1,
            this.aurora.desired = !1,
            this.flash.desired = !1,
            a.each(this.solutions, function(b, d) {
                if (0 === b)
                    c[d].desired = !0;
                else {
                    var e = !1
                      , f = !1;
                    a.each(c.formats, function(a, b) {
                        c[c.solutions[0]].canPlay[b] && ("video" === c.format[b].media ? f = !0 : e = !0)
                    }),
                    c[d].desired = c.require.audio && !e || c.require.video && !f
                }
            }),
            this.html.support = {},
            this.aurora.support = {},
            this.flash.support = {},
            a.each(this.formats, function(a, b) {
                c.html.support[b] = c.html.canPlay[b] && c.html.desired,
                c.aurora.support[b] = c.aurora.canPlay[b] && c.aurora.desired,
                c.flash.support[b] = c.flash.canPlay[b] && c.flash.desired
            }),
            this.html.used = !1,
            this.aurora.used = !1,
            this.flash.used = !1,
            a.each(this.solutions, function(b, d) {
                a.each(c.formats, function(a, b) {
                    return c[d].support[b] ? (c[d].used = !0,
                    !1) : void 0
                })
            }),
            this._resetActive(),
            this._resetGate(),
            this._cssSelectorAncestor(this.options.cssSelectorAncestor),
            this.html.used || this.aurora.used || this.flash.used ? this.css.jq.noSolution.length && this.css.jq.noSolution.hide() : (this._error({
                type: a.jPlayer.error.NO_SOLUTION,
                context: "{solution:'" + this.options.solution + "', supplied:'" + this.options.supplied + "'}",
                message: a.jPlayer.errorMsg.NO_SOLUTION,
                hint: a.jPlayer.errorHint.NO_SOLUTION
            }),
            this.css.jq.noSolution.length && this.css.jq.noSolution.show()),
            this.flash.used) {
                var d, e = "jQuery=" + encodeURI(this.options.noConflict) + "&id=" + encodeURI(this.internal.self.id) + "&vol=" + this.options.volume + "&muted=" + this.options.muted;
                if (a.jPlayer.browser.msie && (Number(a.jPlayer.browser.version) < 9 || a.jPlayer.browser.documentMode < 9)) {
                    var f = '<object id="' + this.internal.flash.id + '" classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" width="0" height="0" tabindex="-1"></object>'
                      , g = ['<param name="movie" value="' + this.internal.flash.swf + '" />', '<param name="FlashVars" value="' + e + '" />', '<param name="allowScriptAccess" value="always" />', '<param name="bgcolor" value="' + this.options.backgroundColor + '" />', '<param name="wmode" value="' + this.options.wmode + '" />'];
                    d = document.createElement(f);
                    for (var h = 0; h < g.length; h++)
                        d.appendChild(document.createElement(g[h]))
                } else {
                    var i = function(a, b, c) {
                        var d = document.createElement("param");
                        d.setAttribute("name", b),
                        d.setAttribute("value", c),
                        a.appendChild(d)
                    };
                    d = document.createElement("object"),
                    d.setAttribute("id", this.internal.flash.id),
                    d.setAttribute("name", this.internal.flash.id),
                    d.setAttribute("data", this.internal.flash.swf),
                    d.setAttribute("type", "application/x-shockwave-flash"),
                    d.setAttribute("width", "1"),
                    d.setAttribute("height", "1"),
                    d.setAttribute("tabindex", "-1"),
                    i(d, "flashvars", e),
                    i(d, "allowscriptaccess", "always"),
                    i(d, "bgcolor", this.options.backgroundColor),
                    i(d, "wmode", this.options.wmode)
                }
                this.element.append(d),
                this.internal.flash.jq = a(d)
            }
            this.status.playbackRateEnabled = this.html.used && !this.flash.used ? this._testPlaybackRate("audio") : !1,
            this._updatePlaybackRate(),
            this.html.used && (this.html.audio.available && (this._addHtmlEventListeners(this.htmlElement.audio, this.html.audio),
            this.element.append(this.htmlElement.audio),
            this.internal.audio.jq = a("#" + this.internal.audio.id)),
            this.html.video.available && (this._addHtmlEventListeners(this.htmlElement.video, this.html.video),
            this.element.append(this.htmlElement.video),
            this.internal.video.jq = a("#" + this.internal.video.id),
            this.internal.video.jq.css(this.status.nativeVideoControls ? {
                width: this.status.width,
                height: this.status.height
            } : {
                width: "0px",
                height: "0px"
            }),
            this.internal.video.jq.bind("click.jPlayer", function() {
                c._trigger(a.jPlayer.event.click)
            }))),
            this.aurora.used,
            this.options.emulateHtml && this._emulateHtmlBridge(),
            !this.html.used && !this.aurora.used || this.flash.used || setTimeout(function() {
                c.internal.ready = !0,
                c.version.flash = "n/a",
                c._trigger(a.jPlayer.event.repeat),
                c._trigger(a.jPlayer.event.ready)
            }, 100),
            this._updateNativeVideoControls(),
            this.css.jq.videoPlay.length && this.css.jq.videoPlay.hide(),
            a.jPlayer.prototype.count++
        },
        destroy: function() {
            this.clearMedia(),
            this._removeUiClass(),
            this.css.jq.currentTime.length && this.css.jq.currentTime.text(""),
            this.css.jq.duration.length && this.css.jq.duration.text(""),
            a.each(this.css.jq, function(a, b) {
                b.length && b.unbind(".jPlayer")
            }),
            this.internal.poster.jq.unbind(".jPlayer"),
            this.internal.video.jq && this.internal.video.jq.unbind(".jPlayer"),
            this._fullscreenRemoveEventListeners(),
            this === a.jPlayer.focus && (a.jPlayer.focus = null),
            this.options.emulateHtml && this._destroyHtmlBridge(),
            this.element.removeData("jPlayer"),
            this.element.unbind(".jPlayer"),
            this.element.empty(),
            delete this.instances[this.internal.instance]
        },
        destroyRemoved: function() {
            var b = this;
            a.each(this.instances, function(a, c) {
                b.element !== c && (c.data("jPlayer") || (c.jPlayer("destroy"),
                delete b.instances[a]))
            })
        },
        enable: function() {},
        disable: function() {},
        _testCanPlayType: function(a) {
            try {
                return a.canPlayType(this.format.mp3.codec),
                !0
            } catch (b) {
                return !1
            }
        },
        _testPlaybackRate: function(a) {
            var b, c = .5;
            a = "string" == typeof a ? a : "audio",
            b = document.createElement(a);
            try {
                return "playbackRate"in b ? (b.playbackRate = c,
                b.playbackRate === c) : !1
            } catch (d) {
                return !1
            }
        },
        _uaBlocklist: function(b) {
            var c = navigator.userAgent.toLowerCase()
              , d = !1;
            return a.each(b, function(a, b) {
                return b && b.test(c) ? (d = !0,
                !1) : void 0
            }),
            d
        },
        _restrictNativeVideoControls: function() {
            this.require.audio && this.status.nativeVideoControls && (this.status.nativeVideoControls = !1,
            this.status.noFullWindow = !0)
        },
        _updateNativeVideoControls: function() {
            this.html.video.available && this.html.used && (this.htmlElement.video.controls = this.status.nativeVideoControls,
            this._updateAutohide(),
            this.status.nativeVideoControls && this.require.video ? (this.internal.poster.jq.hide(),
            this.internal.video.jq.css({
                width: this.status.width,
                height: this.status.height
            })) : this.status.waitForPlay && this.status.video && (this.internal.poster.jq.show(),
            this.internal.video.jq.css({
                width: "0px",
                height: "0px"
            })))
        },
        _addHtmlEventListeners: function(b, c) {
            var d = this;
            b.preload = this.options.preload,
            b.muted = this.options.muted,
            b.volume = this.options.volume,
            this.status.playbackRateEnabled && (b.defaultPlaybackRate = this.options.defaultPlaybackRate,
            b.playbackRate = this.options.playbackRate),
            b.addEventListener("progress", function() {
                c.gate && (d.internal.cmdsIgnored && this.readyState > 0 && (d.internal.cmdsIgnored = !1),
                d._getHtmlStatus(b),
                d._updateInterface(),
                d._trigger(a.jPlayer.event.progress))
            }, !1),
            b.addEventListener("loadeddata", function() {
                c.gate && (d.androidFix.setMedia = !1,
                d.androidFix.play && (d.androidFix.play = !1,
                d.play(d.androidFix.time)),
                d.androidFix.pause && (d.androidFix.pause = !1,
                d.pause(d.androidFix.time)),
                d._trigger(a.jPlayer.event.loadeddata))
            }, !1),
            b.addEventListener("timeupdate", function() {
                c.gate && (d._getHtmlStatus(b),
                d._updateInterface(),
                d._trigger(a.jPlayer.event.timeupdate))
            }, !1),
            b.addEventListener("durationchange", function() {
                c.gate && (d._getHtmlStatus(b),
                d._updateInterface(),
                d._trigger(a.jPlayer.event.durationchange))
            }, !1),
            b.addEventListener("play", function() {
                c.gate && (d._updateButtons(!0),
                d._html_checkWaitForPlay(),
                d._trigger(a.jPlayer.event.play))
            }, !1),
            b.addEventListener("playing", function() {
                c.gate && (d._updateButtons(!0),
                d._seeked(),
                d._trigger(a.jPlayer.event.playing))
            }, !1),
            b.addEventListener("pause", function() {
                c.gate && (d._updateButtons(!1),
                d._trigger(a.jPlayer.event.pause))
            }, !1),
            b.addEventListener("waiting", function() {
                c.gate && (d._seeking(),
                d._trigger(a.jPlayer.event.waiting))
            }, !1),
            b.addEventListener("seeking", function() {
                c.gate && (d._seeking(),
                d._trigger(a.jPlayer.event.seeking))
            }, !1),
            b.addEventListener("seeked", function() {
                c.gate && (d._seeked(),
                d._trigger(a.jPlayer.event.seeked))
            }, !1),
            b.addEventListener("volumechange", function() {
                c.gate && (d.options.volume = b.volume,
                d.options.muted = b.muted,
                d._updateMute(),
                d._updateVolume(),
                d._trigger(a.jPlayer.event.volumechange))
            }, !1),
            b.addEventListener("ratechange", function() {
                c.gate && (d.options.defaultPlaybackRate = b.defaultPlaybackRate,
                d.options.playbackRate = b.playbackRate,
                d._updatePlaybackRate(),
                d._trigger(a.jPlayer.event.ratechange))
            }, !1),
            b.addEventListener("suspend", function() {
                c.gate && (d._seeked(),
                d._trigger(a.jPlayer.event.suspend))
            }, !1),
            b.addEventListener("ended", function() {
                c.gate && (a.jPlayer.browser.webkit || (d.htmlElement.media.currentTime = 0),
                d.htmlElement.media.pause(),
                d._updateButtons(!1),
                d._getHtmlStatus(b, !0),
                d._updateInterface(),
                d._trigger(a.jPlayer.event.ended))
            }, !1),
            b.addEventListener("error", function() {
                c.gate && (d._updateButtons(!1),
                d._seeked(),
                d.status.srcSet && (clearTimeout(d.internal.htmlDlyCmdId),
                d.status.waitForLoad = !0,
                d.status.waitForPlay = !0,
                d.status.video && !d.status.nativeVideoControls && d.internal.video.jq.css({
                    width: "0px",
                    height: "0px"
                }),
                d._validString(d.status.media.poster) && !d.status.nativeVideoControls && d.internal.poster.jq.show(),
                d.css.jq.videoPlay.length && d.css.jq.videoPlay.show(),
                d._error({
                    type: a.jPlayer.error.URL,
                    context: d.status.src,
                    message: a.jPlayer.errorMsg.URL,
                    hint: a.jPlayer.errorHint.URL
                })))
            }, !1),
            a.each(a.jPlayer.htmlEvent, function(e, f) {
                b.addEventListener(this, function() {
                    c.gate && d._trigger(a.jPlayer.event[f])
                }, !1)
            })
        },
        _addAuroraEventListeners: function(b, c) {
            var d = this;
            b.volume = 100 * this.options.volume,
            b.on("progress", function() {
                c.gate && (d.internal.cmdsIgnored && this.readyState > 0 && (d.internal.cmdsIgnored = !1),
                d._getAuroraStatus(b),
                d._updateInterface(),
                d._trigger(a.jPlayer.event.progress),
                b.duration > 0 && d._trigger(a.jPlayer.event.timeupdate))
            }, !1),
            b.on("ready", function() {
                c.gate && d._trigger(a.jPlayer.event.loadeddata)
            }, !1),
            b.on("duration", function() {
                c.gate && (d._getAuroraStatus(b),
                d._updateInterface(),
                d._trigger(a.jPlayer.event.durationchange))
            }, !1),
            b.on("end", function() {
                c.gate && (d._updateButtons(!1),
                d._getAuroraStatus(b, !0),
                d._updateInterface(),
                d._trigger(a.jPlayer.event.ended))
            }, !1),
            b.on("error", function() {
                c.gate && (d._updateButtons(!1),
                d._seeked(),
                d.status.srcSet && (d.status.waitForLoad = !0,
                d.status.waitForPlay = !0,
                d.status.video && !d.status.nativeVideoControls && d.internal.video.jq.css({
                    width: "0px",
                    height: "0px"
                }),
                d._validString(d.status.media.poster) && !d.status.nativeVideoControls && d.internal.poster.jq.show(),
                d.css.jq.videoPlay.length && d.css.jq.videoPlay.show(),
                d._error({
                    type: a.jPlayer.error.URL,
                    context: d.status.src,
                    message: a.jPlayer.errorMsg.URL,
                    hint: a.jPlayer.errorHint.URL
                })))
            }, !1)
        },
        _getHtmlStatus: function(a, b) {
            var c = 0
              , d = 0
              , e = 0
              , f = 0;
            isFinite(a.duration) && (this.status.duration = a.duration),
            c = a.currentTime,
            d = this.status.duration > 0 ? 100 * c / this.status.duration : 0,
            "object" == typeof a.seekable && a.seekable.length > 0 ? (e = this.status.duration > 0 ? 100 * a.seekable.end(a.seekable.length - 1) / this.status.duration : 100,
            f = this.status.duration > 0 ? 100 * a.currentTime / a.seekable.end(a.seekable.length - 1) : 0) : (e = 100,
            f = d),
            b && (c = 0,
            f = 0,
            d = 0),
            this.status.seekPercent = e,
            this.status.currentPercentRelative = f,
            this.status.currentPercentAbsolute = d,
            this.status.currentTime = c,
            this.status.remaining = this.status.duration - this.status.currentTime,
            this.status.videoWidth = a.videoWidth,
            this.status.videoHeight = a.videoHeight,
            this.status.readyState = a.readyState,
            this.status.networkState = a.networkState,
            this.status.playbackRate = a.playbackRate,
            this.status.ended = a.ended
        },
        _getAuroraStatus: function(a, b) {
            var c = 0
              , d = 0
              , e = 0
              , f = 0;
            this.status.duration = a.duration / 1e3,
            c = a.currentTime / 1e3,
            d = this.status.duration > 0 ? 100 * c / this.status.duration : 0,
            a.buffered > 0 ? (e = this.status.duration > 0 ? a.buffered * this.status.duration / this.status.duration : 100,
            f = this.status.duration > 0 ? c / (a.buffered * this.status.duration) : 0) : (e = 100,
            f = d),
            b && (c = 0,
            f = 0,
            d = 0),
            this.status.seekPercent = e,
            this.status.currentPercentRelative = f,
            this.status.currentPercentAbsolute = d,
            this.status.currentTime = c,
            this.status.remaining = this.status.duration - this.status.currentTime,
            this.status.readyState = 4,
            this.status.networkState = 0,
            this.status.playbackRate = 1,
            this.status.ended = !1
        },
        _resetStatus: function() {
            this.status = a.extend({}, this.status, a.jPlayer.prototype.status)
        },
        _trigger: function(b, c, d) {
            var e = a.Event(b);
            e.jPlayer = {},
            e.jPlayer.version = a.extend({}, this.version),
            e.jPlayer.options = a.extend(!0, {}, this.options),
            e.jPlayer.status = a.extend(!0, {}, this.status),
            e.jPlayer.html = a.extend(!0, {}, this.html),
            e.jPlayer.aurora = a.extend(!0, {}, this.aurora),
            e.jPlayer.flash = a.extend(!0, {}, this.flash),
            c && (e.jPlayer.error = a.extend({}, c)),
            d && (e.jPlayer.warning = a.extend({}, d)),
            this.element.trigger(e)
        },
        jPlayerFlashEvent: function(b, c) {
            if (b === a.jPlayer.event.ready)
                if (this.internal.ready) {
                    if (this.flash.gate) {
                        if (this.status.srcSet) {
                            var d = this.status.currentTime
                              , e = this.status.paused;
                            this.setMedia(this.status.media),
                            this.volumeWorker(this.options.volume),
                            d > 0 && (e ? this.pause(d) : this.play(d))
                        }
                        this._trigger(a.jPlayer.event.flashreset)
                    }
                } else
                    this.internal.ready = !0,
                    this.internal.flash.jq.css({
                        width: "0px",
                        height: "0px"
                    }),
                    this.version.flash = c.version,
                    this.version.needFlash !== this.version.flash && this._error({
                        type: a.jPlayer.error.VERSION,
                        context: this.version.flash,
                        message: a.jPlayer.errorMsg.VERSION + this.version.flash,
                        hint: a.jPlayer.errorHint.VERSION
                    }),
                    this._trigger(a.jPlayer.event.repeat),
                    this._trigger(b);
            if (this.flash.gate)
                switch (b) {
                case a.jPlayer.event.progress:
                    this._getFlashStatus(c),
                    this._updateInterface(),
                    this._trigger(b);
                    break;
                case a.jPlayer.event.timeupdate:
                    this._getFlashStatus(c),
                    this._updateInterface(),
                    this._trigger(b);
                    break;
                case a.jPlayer.event.play:
                    this._seeked(),
                    this._updateButtons(!0),
                    this._trigger(b);
                    break;
                case a.jPlayer.event.pause:
                    this._updateButtons(!1),
                    this._trigger(b);
                    break;
                case a.jPlayer.event.ended:
                    this._updateButtons(!1),
                    this._trigger(b);
                    break;
                case a.jPlayer.event.click:
                    this._trigger(b);
                    break;
                case a.jPlayer.event.error:
                    this.status.waitForLoad = !0,
                    this.status.waitForPlay = !0,
                    this.status.video && this.internal.flash.jq.css({
                        width: "0px",
                        height: "0px"
                    }),
                    this._validString(this.status.media.poster) && this.internal.poster.jq.show(),
                    this.css.jq.videoPlay.length && this.status.video && this.css.jq.videoPlay.show(),
                    this.status.video ? this._flash_setVideo(this.status.media) : this._flash_setAudio(this.status.media),
                    this._updateButtons(!1),
                    this._error({
                        type: a.jPlayer.error.URL,
                        context: c.src,
                        message: a.jPlayer.errorMsg.URL,
                        hint: a.jPlayer.errorHint.URL
                    });
                    break;
                case a.jPlayer.event.seeking:
                    this._seeking(),
                    this._trigger(b);
                    break;
                case a.jPlayer.event.seeked:
                    this._seeked(),
                    this._trigger(b);
                    break;
                case a.jPlayer.event.ready:
                    break;
                default:
                    this._trigger(b)
                }
            return !1
        },
        _getFlashStatus: function(a) {
            this.status.seekPercent = a.seekPercent,
            this.status.currentPercentRelative = a.currentPercentRelative,
            this.status.currentPercentAbsolute = a.currentPercentAbsolute,
            this.status.currentTime = a.currentTime,
            this.status.duration = a.duration,
            this.status.remaining = a.duration - a.currentTime,
            this.status.videoWidth = a.videoWidth,
            this.status.videoHeight = a.videoHeight,
            this.status.readyState = 4,
            this.status.networkState = 0,
            this.status.playbackRate = 1,
            this.status.ended = !1
        },
        _updateButtons: function(a) {
            a === b ? a = !this.status.paused : this.status.paused = !a,
            a ? this.addStateClass("playing") : this.removeStateClass("playing"),
            !this.status.noFullWindow && this.options.fullWindow ? this.addStateClass("fullScreen") : this.removeStateClass("fullScreen"),
            this.options.loop ? this.addStateClass("looped") : this.removeStateClass("looped"),
            this.css.jq.play.length && this.css.jq.pause.length && (a ? (this.css.jq.play.hide(),
            this.css.jq.pause.show()) : (this.css.jq.play.show(),
            this.css.jq.pause.hide())),
            this.css.jq.restoreScreen.length && this.css.jq.fullScreen.length && (this.status.noFullWindow ? (this.css.jq.fullScreen.hide(),
            this.css.jq.restoreScreen.hide()) : this.options.fullWindow ? (this.css.jq.fullScreen.hide(),
            this.css.jq.restoreScreen.show()) : (this.css.jq.fullScreen.show(),
            this.css.jq.restoreScreen.hide())),
            this.css.jq.repeat.length && this.css.jq.repeatOff.length && (this.options.loop ? (this.css.jq.repeat.hide(),
            this.css.jq.repeatOff.show()) : (this.css.jq.repeat.show(),
            this.css.jq.repeatOff.hide()))
        },
        _updateInterface: function() {
            this.css.jq.seekBar.length && this.css.jq.seekBar.width(this.status.seekPercent + "%"),
            this.css.jq.playBar.length && (this.options.smoothPlayBar ? this.css.jq.playBar.stop().animate({
                width: this.status.currentPercentAbsolute + "%"
            }, 250, "linear") : this.css.jq.playBar.width(this.status.currentPercentRelative + "%"));
            var a = "";
            this.css.jq.currentTime.length && (a = this._convertTime(this.status.currentTime),
            a !== this.css.jq.currentTime.text() && this.css.jq.currentTime.text(this._convertTime(this.status.currentTime)));
            var b = ""
              , c = this.status.duration
              , d = this.status.remaining;
            this.css.jq.duration.length && ("string" == typeof this.status.media.duration ? b = this.status.media.duration : ("number" == typeof this.status.media.duration && (c = this.status.media.duration,
            d = c - this.status.currentTime),
            b = this.options.remainingDuration ? (d > 0 ? "-" : "") + this._convertTime(d) : this._convertTime(c)),
            b !== this.css.jq.duration.text() && this.css.jq.duration.text(b))
        },
        _convertTime: c.prototype.time,
        _seeking: function() {
            this.css.jq.seekBar.length && this.css.jq.seekBar.addClass("jp-seeking-bg"),
            this.addStateClass("seeking")
        },
        _seeked: function() {
            this.css.jq.seekBar.length && this.css.jq.seekBar.removeClass("jp-seeking-bg"),
            this.removeStateClass("seeking")
        },
        _resetGate: function() {
            this.html.audio.gate = !1,
            this.html.video.gate = !1,
            this.aurora.gate = !1,
            this.flash.gate = !1
        },
        _resetActive: function() {
            this.html.active = !1,
            this.aurora.active = !1,
            this.flash.active = !1
        },
        _escapeHtml: function(a) {
            return a.split("&").join("&amp;").split("<").join("&lt;").split(">").join("&gt;").split('"').join("&quot;")
        },
        _qualifyURL: function(a) {
            var b = document.createElement("div");
            return b.innerHTML = '<a href="' + this._escapeHtml(a) + '">x</a>',
            b.firstChild.href
        },
        _absoluteMediaUrls: function(b) {
            var c = this;
            return a.each(b, function(a, d) {
                d && c.format[a] && "data:" !== d.substr(0, 5) && (b[a] = c._qualifyURL(d))
            }),
            b
        },
        addStateClass: function(a) {
            this.ancestorJq.length && this.ancestorJq.addClass(this.options.stateClass[a])
        },
        removeStateClass: function(a) {
            this.ancestorJq.length && this.ancestorJq.removeClass(this.options.stateClass[a])
        },
        setMedia: function(b) {
            var c = this
              , d = !1
              , e = this.status.media.poster !== b.poster;
            this._resetMedia(),
            this._resetGate(),
            this._resetActive(),
            this.androidFix.setMedia = !1,
            this.androidFix.play = !1,
            this.androidFix.pause = !1,
            b = this._absoluteMediaUrls(b),
            a.each(this.formats, function(e, f) {
                var g = "video" === c.format[f].media;
                return a.each(c.solutions, function(e, h) {
                    if (c[h].support[f] && c._validString(b[f])) {
                        var i = "html" === h
                          , j = "aurora" === h;
                        return g ? (i ? (c.html.video.gate = !0,
                        c._html_setVideo(b),
                        c.html.active = !0) : (c.flash.gate = !0,
                        c._flash_setVideo(b),
                        c.flash.active = !0),
                        c.css.jq.videoPlay.length && c.css.jq.videoPlay.show(),
                        c.status.video = !0) : (i ? (c.html.audio.gate = !0,
                        c._html_setAudio(b),
                        c.html.active = !0,
                        a.jPlayer.platform.android && (c.androidFix.setMedia = !0)) : j ? (c.aurora.gate = !0,
                        c._aurora_setAudio(b),
                        c.aurora.active = !0) : (c.flash.gate = !0,
                        c._flash_setAudio(b),
                        c.flash.active = !0),
                        c.css.jq.videoPlay.length && c.css.jq.videoPlay.hide(),
                        c.status.video = !1),
                        d = !0,
                        !1
                    }
                }),
                d ? !1 : void 0
            }),
            d ? (this.status.nativeVideoControls && this.html.video.gate || this._validString(b.poster) && (e ? this.htmlElement.poster.src = b.poster : this.internal.poster.jq.show()),
            "string" == typeof b.title && (this.css.jq.title.length && this.css.jq.title.html(b.title),
            this.htmlElement.audio && this.htmlElement.audio.setAttribute("title", b.title),
            this.htmlElement.video && this.htmlElement.video.setAttribute("title", b.title)),
            this.status.srcSet = !0,
            this.status.media = a.extend({}, b),
            this._updateButtons(!1),
            this._updateInterface(),
            this._trigger(a.jPlayer.event.setmedia)) : this._error({
                type: a.jPlayer.error.NO_SUPPORT,
                context: "{supplied:'" + this.options.supplied + "'}",
                message: a.jPlayer.errorMsg.NO_SUPPORT,
                hint: a.jPlayer.errorHint.NO_SUPPORT
            })
        },
        _resetMedia: function() {
            this._resetStatus(),
            this._updateButtons(!1),
            this._updateInterface(),
            this._seeked(),
            this.internal.poster.jq.hide(),
            clearTimeout(this.internal.htmlDlyCmdId),
            this.html.active ? this._html_resetMedia() : this.aurora.active ? this._aurora_resetMedia() : this.flash.active && this._flash_resetMedia()
        },
        clearMedia: function() {
            this._resetMedia(),
            this.html.active ? this._html_clearMedia() : this.aurora.active ? this._aurora_clearMedia() : this.flash.active && this._flash_clearMedia(),
            this._resetGate(),
            this._resetActive()
        },
        load: function() {
            this.status.srcSet ? this.html.active ? this._html_load() : this.aurora.active ? this._aurora_load() : this.flash.active && this._flash_load() : this._urlNotSetError("load")
        },
        focus: function() {
            this.options.keyEnabled && (a.jPlayer.focus = this)
        },
        play: function(a) {
            var b = "object" == typeof a;
            b && this.options.useStateClassSkin && !this.status.paused ? this.pause(a) : (a = "number" == typeof a ? a : 0 / 0,
            this.status.srcSet ? (this.focus(),
            this.html.active ? this._html_play(a) : this.aurora.active ? this._aurora_play(a) : this.flash.active && this._flash_play(a)) : this._urlNotSetError("play"))
        },
        videoPlay: function() {
            this.play()
        },
        pause: function(a) {
            a = "number" == typeof a ? a : 0 / 0,
            this.status.srcSet ? this.html.active ? this._html_pause(a) : this.aurora.active ? this._aurora_pause(a) : this.flash.active && this._flash_pause(a) : this._urlNotSetError("pause")
        },
        tellOthers: function(b, c) {
            var d = this
              , e = "function" == typeof c
              , f = Array.prototype.slice.call(arguments);
            "string" == typeof b && (e && f.splice(1, 1),
            a.jPlayer.prototype.destroyRemoved(),
            a.each(this.instances, function() {
                d.element !== this && (!e || c.call(this.data("jPlayer"), d)) && this.jPlayer.apply(this, f)
            }))
        },
        pauseOthers: function(a) {
            this.tellOthers("pause", function() {
                return this.status.srcSet
            }, a)
        },
        stop: function() {
            this.status.srcSet ? this.html.active ? this._html_pause(0) : this.aurora.active ? this._aurora_pause(0) : this.flash.active && this._flash_pause(0) : this._urlNotSetError("stop")
        },
        playHead: function(a) {
            a = this._limitValue(a, 0, 100),
            this.status.srcSet ? this.html.active ? this._html_playHead(a) : this.aurora.active ? this._aurora_playHead(a) : this.flash.active && this._flash_playHead(a) : this._urlNotSetError("playHead")
        },
        _muted: function(a) {
            this.mutedWorker(a),
            this.options.globalVolume && this.tellOthers("mutedWorker", function() {
                return this.options.globalVolume
            }, a)
        },
        mutedWorker: function(b) {
            this.options.muted = b,
            this.html.used && this._html_setProperty("muted", b),
            this.aurora.used && this._aurora_mute(b),
            this.flash.used && this._flash_mute(b),
            this.html.video.gate || this.html.audio.gate || (this._updateMute(b),
            this._updateVolume(this.options.volume),
            this._trigger(a.jPlayer.event.volumechange))
        },
        mute: function(a) {
            var c = "object" == typeof a;
            c && this.options.useStateClassSkin && this.options.muted ? this._muted(!1) : (a = a === b ? !0 : !!a,
            this._muted(a))
        },
        unmute: function(a) {
            a = a === b ? !0 : !!a,
            this._muted(!a)
        },
        _updateMute: function(a) {
            a === b && (a = this.options.muted),
            a ? this.addStateClass("muted") : this.removeStateClass("muted"),
            this.css.jq.mute.length && this.css.jq.unmute.length && (this.status.noVolume ? (this.css.jq.mute.hide(),
            this.css.jq.unmute.hide()) : a ? (this.css.jq.mute.hide(),
            this.css.jq.unmute.show()) : (this.css.jq.mute.show(),
            this.css.jq.unmute.hide()))
        },
        volume: function(a) {
            this.volumeWorker(a),
            this.options.globalVolume && this.tellOthers("volumeWorker", function() {
                return this.options.globalVolume
            }, a)
        },
        volumeWorker: function(b) {
            b = this._limitValue(b, 0, 1),
            this.options.volume = b,
            this.html.used && this._html_setProperty("volume", b),
            this.aurora.used && this._aurora_volume(b),
            this.flash.used && this._flash_volume(b),
            this.html.video.gate || this.html.audio.gate || (this._updateVolume(b),
            this._trigger(a.jPlayer.event.volumechange))
        },
        volumeBar: function(b) {
            if (this.css.jq.volumeBar.length) {
                var c = a(b.currentTarget)
                  , d = c.offset()
                  , e = b.pageX - d.left
                  , f = c.width()
                  , g = c.height() - b.pageY + d.top
                  , h = c.height();
                this.volume(this.options.verticalVolume ? g / h : e / f)
            }
            this.options.muted && this._muted(!1)
        },
        _updateVolume: function(a) {
            a === b && (a = this.options.volume),
            a = this.options.muted ? 0 : a,
            this.status.noVolume ? (this.addStateClass("noVolume"),
            this.css.jq.volumeBar.length && this.css.jq.volumeBar.hide(),
            this.css.jq.volumeBarValue.length && this.css.jq.volumeBarValue.hide(),
            this.css.jq.volumeMax.length && this.css.jq.volumeMax.hide()) : (this.removeStateClass("noVolume"),
            this.css.jq.volumeBar.length && this.css.jq.volumeBar.show(),
            this.css.jq.volumeBarValue.length && (this.css.jq.volumeBarValue.show(),
            this.css.jq.volumeBarValue[this.options.verticalVolume ? "height" : "width"](100 * a + "%")),
            this.css.jq.volumeMax.length && this.css.jq.volumeMax.show())
        },
        volumeMax: function() {
            this.volume(1),
            this.options.muted && this._muted(!1)
        },
        _cssSelectorAncestor: function(b) {
            var c = this;
            this.options.cssSelectorAncestor = b,
            this._removeUiClass(),
            this.ancestorJq = b ? a(b) : [],
            b && 1 !== this.ancestorJq.length && this._warning({
                type: a.jPlayer.warning.CSS_SELECTOR_COUNT,
                context: b,
                message: a.jPlayer.warningMsg.CSS_SELECTOR_COUNT + this.ancestorJq.length + " found for cssSelectorAncestor.",
                hint: a.jPlayer.warningHint.CSS_SELECTOR_COUNT
            }),
            this._addUiClass(),
            a.each(this.options.cssSelector, function(a, b) {
                c._cssSelector(a, b)
            }),
            this._updateInterface(),
            this._updateButtons(),
            this._updateAutohide(),
            this._updateVolume(),
            this._updateMute()
        },
        _cssSelector: function(b, c) {
            var d = this;
            if ("string" == typeof c)
                if (a.jPlayer.prototype.options.cssSelector[b]) {
                    if (this.css.jq[b] && this.css.jq[b].length && this.css.jq[b].unbind(".jPlayer"),
                    this.options.cssSelector[b] = c,
                    this.css.cs[b] = this.options.cssSelectorAncestor + " " + c,
                    this.css.jq[b] = c ? a(this.css.cs[b]) : [],
                    this.css.jq[b].length && this[b]) {
                        var e = function(c) {
                            c.preventDefault(),
                            d[b](c),
                            d.options.autoBlur ? a(this).blur() : a(this).focus()
                        };
                        this.css.jq[b].bind("click.jPlayer", e)
                    }
                    c && 1 !== this.css.jq[b].length && this._warning({
                        type: a.jPlayer.warning.CSS_SELECTOR_COUNT,
                        context: this.css.cs[b],
                        message: a.jPlayer.warningMsg.CSS_SELECTOR_COUNT + this.css.jq[b].length + " found for " + b + " method.",
                        hint: a.jPlayer.warningHint.CSS_SELECTOR_COUNT
                    })
                } else
                    this._warning({
                        type: a.jPlayer.warning.CSS_SELECTOR_METHOD,
                        context: b,
                        message: a.jPlayer.warningMsg.CSS_SELECTOR_METHOD,
                        hint: a.jPlayer.warningHint.CSS_SELECTOR_METHOD
                    });
            else
                this._warning({
                    type: a.jPlayer.warning.CSS_SELECTOR_STRING,
                    context: c,
                    message: a.jPlayer.warningMsg.CSS_SELECTOR_STRING,
                    hint: a.jPlayer.warningHint.CSS_SELECTOR_STRING
                })
        },
        duration: function(a) {
            this.options.toggleDuration && (this.options.captureDuration && a.stopPropagation(),
            this._setOption("remainingDuration", !this.options.remainingDuration))
        },
        seekBar: function(b) {
            if (this.css.jq.seekBar.length) {
                var c = a(b.currentTarget)
                  , d = c.offset()
                  , e = b.pageX - d.left
                  , f = c.width()
                  , g = 100 * e / f;
                this.playHead(g)
            }
        },
        playbackRate: function(a) {
            this._setOption("playbackRate", a)
        },
        playbackRateBar: function(b) {
            if (this.css.jq.playbackRateBar.length) {
                var c, d, e = a(b.currentTarget), f = e.offset(), g = b.pageX - f.left, h = e.width(), i = e.height() - b.pageY + f.top, j = e.height();
                c = this.options.verticalPlaybackRate ? i / j : g / h,
                d = c * (this.options.maxPlaybackRate - this.options.minPlaybackRate) + this.options.minPlaybackRate,
                this.playbackRate(d)
            }
        },
        _updatePlaybackRate: function() {
            var a = this.options.playbackRate
              , b = (a - this.options.minPlaybackRate) / (this.options.maxPlaybackRate - this.options.minPlaybackRate);
            this.status.playbackRateEnabled ? (this.css.jq.playbackRateBar.length && this.css.jq.playbackRateBar.show(),
            this.css.jq.playbackRateBarValue.length && (this.css.jq.playbackRateBarValue.show(),
            this.css.jq.playbackRateBarValue[this.options.verticalPlaybackRate ? "height" : "width"](100 * b + "%"))) : (this.css.jq.playbackRateBar.length && this.css.jq.playbackRateBar.hide(),
            this.css.jq.playbackRateBarValue.length && this.css.jq.playbackRateBarValue.hide())
        },
        repeat: function(a) {
            var b = "object" == typeof a;
            this._loop(b && this.options.useStateClassSkin && this.options.loop ? !1 : !0)
        },
        repeatOff: function() {
            this._loop(!1)
        },
        _loop: function(b) {
            this.options.loop !== b && (this.options.loop = b,
            this._updateButtons(),
            this._trigger(a.jPlayer.event.repeat))
        },
        option: function(c, d) {
            var e = c;
            if (0 === arguments.length)
                return a.extend(!0, {}, this.options);
            if ("string" == typeof c) {
                var f = c.split(".");
                if (d === b) {
                    for (var g = a.extend(!0, {}, this.options), h = 0; h < f.length; h++) {
                        if (g[f[h]] === b)
                            return this._warning({
                                type: a.jPlayer.warning.OPTION_KEY,
                                context: c,
                                message: a.jPlayer.warningMsg.OPTION_KEY,
                                hint: a.jPlayer.warningHint.OPTION_KEY
                            }),
                            b;
                        g = g[f[h]]
                    }
                    return g
                }
                e = {};
                for (var i = e, j = 0; j < f.length; j++)
                    j < f.length - 1 ? (i[f[j]] = {},
                    i = i[f[j]]) : i[f[j]] = d
            }
            return this._setOptions(e),
            this
        },
        _setOptions: function(b) {
            var c = this;
            return a.each(b, function(a, b) {
                c._setOption(a, b)
            }),
            this
        },
        _setOption: function(b, c) {
            var d = this;
            switch (b) {
            case "volume":
                this.volume(c);
                break;
            case "muted":
                this._muted(c);
                break;
            case "globalVolume":
                this.options[b] = c;
                break;
            case "cssSelectorAncestor":
                this._cssSelectorAncestor(c);
                break;
            case "cssSelector":
                a.each(c, function(a, b) {
                    d._cssSelector(a, b)
                });
                break;
            case "playbackRate":
                this.options[b] = c = this._limitValue(c, this.options.minPlaybackRate, this.options.maxPlaybackRate),
                this.html.used && this._html_setProperty("playbackRate", c),
                this._updatePlaybackRate();
                break;
            case "defaultPlaybackRate":
                this.options[b] = c = this._limitValue(c, this.options.minPlaybackRate, this.options.maxPlaybackRate),
                this.html.used && this._html_setProperty("defaultPlaybackRate", c),
                this._updatePlaybackRate();
                break;
            case "minPlaybackRate":
                this.options[b] = c = this._limitValue(c, .1, this.options.maxPlaybackRate - .1),
                this._updatePlaybackRate();
                break;
            case "maxPlaybackRate":
                this.options[b] = c = this._limitValue(c, this.options.minPlaybackRate + .1, 16),
                this._updatePlaybackRate();
                break;
            case "fullScreen":
                if (this.options[b] !== c) {
                    var e = a.jPlayer.nativeFeatures.fullscreen.used.webkitVideo;
                    (!e || e && !this.status.waitForPlay) && (e || (this.options[b] = c),
                    c ? this._requestFullscreen() : this._exitFullscreen(),
                    e || this._setOption("fullWindow", c))
                }
                break;
            case "fullWindow":
                this.options[b] !== c && (this._removeUiClass(),
                this.options[b] = c,
                this._refreshSize());
                break;
            case "size":
                this.options.fullWindow || this.options[b].cssClass === c.cssClass || this._removeUiClass(),
                this.options[b] = a.extend({}, this.options[b], c),
                this._refreshSize();
                break;
            case "sizeFull":
                this.options.fullWindow && this.options[b].cssClass !== c.cssClass && this._removeUiClass(),
                this.options[b] = a.extend({}, this.options[b], c),
                this._refreshSize();
                break;
            case "autohide":
                this.options[b] = a.extend({}, this.options[b], c),
                this._updateAutohide();
                break;
            case "loop":
                this._loop(c);
                break;
            case "remainingDuration":
                this.options[b] = c,
                this._updateInterface();
                break;
            case "toggleDuration":
                this.options[b] = c;
                break;
            case "nativeVideoControls":
                this.options[b] = a.extend({}, this.options[b], c),
                this.status.nativeVideoControls = this._uaBlocklist(this.options.nativeVideoControls),
                this._restrictNativeVideoControls(),
                this._updateNativeVideoControls();
                break;
            case "noFullWindow":
                this.options[b] = a.extend({}, this.options[b], c),
                this.status.nativeVideoControls = this._uaBlocklist(this.options.nativeVideoControls),
                this.status.noFullWindow = this._uaBlocklist(this.options.noFullWindow),
                this._restrictNativeVideoControls(),
                this._updateButtons();
                break;
            case "noVolume":
                this.options[b] = a.extend({}, this.options[b], c),
                this.status.noVolume = this._uaBlocklist(this.options.noVolume),
                this._updateVolume(),
                this._updateMute();
                break;
            case "emulateHtml":
                this.options[b] !== c && (this.options[b] = c,
                c ? this._emulateHtmlBridge() : this._destroyHtmlBridge());
                break;
            case "timeFormat":
                this.options[b] = a.extend({}, this.options[b], c);
                break;
            case "keyEnabled":
                this.options[b] = c,
                c || this !== a.jPlayer.focus || (a.jPlayer.focus = null);
                break;
            case "keyBindings":
                this.options[b] = a.extend(!0, {}, this.options[b], c);
                break;
            case "audioFullScreen":
                this.options[b] = c;
                break;
            case "autoBlur":
                this.options[b] = c
            }
            return this
        },
        _refreshSize: function() {
            this._setSize(),
            this._addUiClass(),
            this._updateSize(),
            this._updateButtons(),
            this._updateAutohide(),
            this._trigger(a.jPlayer.event.resize)
        },
        _setSize: function() {
            this.options.fullWindow ? (this.status.width = this.options.sizeFull.width,
            this.status.height = this.options.sizeFull.height,
            this.status.cssClass = this.options.sizeFull.cssClass) : (this.status.width = this.options.size.width,
            this.status.height = this.options.size.height,
            this.status.cssClass = this.options.size.cssClass),
            this.element.css({
                width: this.status.width,
                height: this.status.height
            })
        },
        _addUiClass: function() {
            this.ancestorJq.length && this.ancestorJq.addClass(this.status.cssClass)
        },
        _removeUiClass: function() {
            this.ancestorJq.length && this.ancestorJq.removeClass(this.status.cssClass)
        },
        _updateSize: function() {
            this.internal.poster.jq.css({
                width: this.status.width,
                height: this.status.height
            }),
            !this.status.waitForPlay && this.html.active && this.status.video || this.html.video.available && this.html.used && this.status.nativeVideoControls ? this.internal.video.jq.css({
                width: this.status.width,
                height: this.status.height
            }) : !this.status.waitForPlay && this.flash.active && this.status.video && this.internal.flash.jq.css({
                width: this.status.width,
                height: this.status.height
            })
        },
        _updateAutohide: function() {
            var a = this
              , b = "mousemove.jPlayer"
              , c = ".jPlayerAutohide"
              , d = b + c
              , e = function(b) {
                var c, d, e = !1;
                "undefined" != typeof a.internal.mouse ? (c = a.internal.mouse.x - b.pageX,
                d = a.internal.mouse.y - b.pageY,
                e = Math.floor(c) > 0 || Math.floor(d) > 0) : e = !0,
                a.internal.mouse = {
                    x: b.pageX,
                    y: b.pageY
                },
                e && a.css.jq.gui.fadeIn(a.options.autohide.fadeIn, function() {
                    clearTimeout(a.internal.autohideId),
                    a.internal.autohideId = setTimeout(function() {
                        a.css.jq.gui.fadeOut(a.options.autohide.fadeOut)
                    }, a.options.autohide.hold)
                })
            };
            this.css.jq.gui.length && (this.css.jq.gui.stop(!0, !0),
            clearTimeout(this.internal.autohideId),
            delete this.internal.mouse,
            this.element.unbind(c),
            this.css.jq.gui.unbind(c),
            this.status.nativeVideoControls ? this.css.jq.gui.hide() : this.options.fullWindow && this.options.autohide.full || !this.options.fullWindow && this.options.autohide.restored ? (this.element.bind(d, e),
            this.css.jq.gui.bind(d, e),
            this.css.jq.gui.hide()) : this.css.jq.gui.show())
        },
        fullScreen: function(a) {
            var b = "object" == typeof a;
            b && this.options.useStateClassSkin && this.options.fullScreen ? this._setOption("fullScreen", !1) : this._setOption("fullScreen", !0)
        },
        restoreScreen: function() {
            this._setOption("fullScreen", !1)
        },
        _fullscreenAddEventListeners: function() {
            var b = this
              , c = a.jPlayer.nativeFeatures.fullscreen;
            c.api.fullscreenEnabled && c.event.fullscreenchange && ("function" != typeof this.internal.fullscreenchangeHandler && (this.internal.fullscreenchangeHandler = function() {
                b._fullscreenchange()
            }
            ),
            document.addEventListener(c.event.fullscreenchange, this.internal.fullscreenchangeHandler, !1))
        },
        _fullscreenRemoveEventListeners: function() {
            var b = a.jPlayer.nativeFeatures.fullscreen;
            this.internal.fullscreenchangeHandler && document.removeEventListener(b.event.fullscreenchange, this.internal.fullscreenchangeHandler, !1)
        },
        _fullscreenchange: function() {
            this.options.fullScreen && !a.jPlayer.nativeFeatures.fullscreen.api.fullscreenElement() && this._setOption("fullScreen", !1)
        },
        _requestFullscreen: function() {
            var b = this.ancestorJq.length ? this.ancestorJq[0] : this.element[0]
              , c = a.jPlayer.nativeFeatures.fullscreen;
            c.used.webkitVideo && (b = this.htmlElement.video),
            c.api.fullscreenEnabled && c.api.requestFullscreen(b)
        },
        _exitFullscreen: function() {
            var b, c = a.jPlayer.nativeFeatures.fullscreen;
            c.used.webkitVideo && (b = this.htmlElement.video),
            c.api.fullscreenEnabled && c.api.exitFullscreen(b)
        },
        _html_initMedia: function(b) {
            var c = a(this.htmlElement.media).empty();
            a.each(b.track || [], function(a, b) {
                var d = document.createElement("track");
                d.setAttribute("kind", b.kind ? b.kind : ""),
                d.setAttribute("src", b.src ? b.src : ""),
                d.setAttribute("srclang", b.srclang ? b.srclang : ""),
                d.setAttribute("label", b.label ? b.label : ""),
                b.def && d.setAttribute("default", b.def),
                c.append(d)
            }),
            this.htmlElement.media.src = this.status.src,
            "none" !== this.options.preload && this._html_load(),
            this._trigger(a.jPlayer.event.timeupdate)
        },
        _html_setFormat: function(b) {
            var c = this;
            a.each(this.formats, function(a, d) {
                return c.html.support[d] && b[d] ? (c.status.src = b[d],
                c.status.format[d] = !0,
                c.status.formatType = d,
                !1) : void 0
            })
        },
        _html_setAudio: function(a) {
            this._html_setFormat(a),
            this.htmlElement.media = this.htmlElement.audio,
            this._html_initMedia(a)
        },
        _html_setVideo: function(a) {
            this._html_setFormat(a),
            this.status.nativeVideoControls && (this.htmlElement.video.poster = this._validString(a.poster) ? a.poster : ""),
            this.htmlElement.media = this.htmlElement.video,
            this._html_initMedia(a)
        },
        _html_resetMedia: function() {
            this.htmlElement.media && (this.htmlElement.media.id !== this.internal.video.id || this.status.nativeVideoControls || this.internal.video.jq.css({
                width: "0px",
                height: "0px"
            }),
            this.htmlElement.media.pause())
        },
        _html_clearMedia: function() {
            this.htmlElement.media && (this.htmlElement.media.src = "about:blank",
            this.htmlElement.media.load())
        },
        _html_load: function() {
            this.status.waitForLoad && (this.status.waitForLoad = !1,
            this.htmlElement.media.load()),
            clearTimeout(this.internal.htmlDlyCmdId)
        },
        _html_play: function(a) {
            var b = this
              , c = this.htmlElement.media;
            if (this.androidFix.pause = !1,
            this._html_load(),
            this.androidFix.setMedia)
                this.androidFix.play = !0,
                this.androidFix.time = a;
            else if (isNaN(a))
                c.play();
            else {
                this.internal.cmdsIgnored && c.play();
                try {
                    if (c.seekable && !("object" == typeof c.seekable && c.seekable.length > 0))
                        throw 1;
                    c.currentTime = a,
                    c.play()
                } catch (d) {
                    return void (this.internal.htmlDlyCmdId = setTimeout(function() {
                        b.play(a)
                    }, 250))
                }
            }
            this._html_checkWaitForPlay()
        },
        _html_pause: function(a) {
            var b = this
              , c = this.htmlElement.media;
            if (this.androidFix.play = !1,
            a > 0 ? this._html_load() : clearTimeout(this.internal.htmlDlyCmdId),
            c.pause(),
            this.androidFix.setMedia)
                this.androidFix.pause = !0,
                this.androidFix.time = a;
            else if (!isNaN(a))
                try {
                    if (c.seekable && !("object" == typeof c.seekable && c.seekable.length > 0))
                        throw 1;
                    c.currentTime = a
                } catch (d) {
                    return void (this.internal.htmlDlyCmdId = setTimeout(function() {
                        b.pause(a)
                    }, 250))
                }
            a > 0 && this._html_checkWaitForPlay()
        },
        _html_playHead: function(a) {
            var b = this
              , c = this.htmlElement.media;
            this._html_load();
            try {
                if ("object" == typeof c.seekable && c.seekable.length > 0)
                    c.currentTime = a * c.seekable.end(c.seekable.length - 1) / 100;
                else {
                    if (!(c.duration > 0) || isNaN(c.duration))
                        throw "e";
                    c.currentTime = a * c.duration / 100
                }
            } catch (d) {
                return void (this.internal.htmlDlyCmdId = setTimeout(function() {
                    b.playHead(a)
                }, 250))
            }
            this.status.waitForLoad || this._html_checkWaitForPlay()
        },
        _html_checkWaitForPlay: function() {
            this.status.waitForPlay && (this.status.waitForPlay = !1,
            this.css.jq.videoPlay.length && this.css.jq.videoPlay.hide(),
            this.status.video && (this.internal.poster.jq.hide(),
            this.internal.video.jq.css({
                width: this.status.width,
                height: this.status.height
            })))
        },
        _html_setProperty: function(a, b) {
            this.html.audio.available && (this.htmlElement.audio[a] = b),
            this.html.video.available && (this.htmlElement.video[a] = b)
        },
        _aurora_setAudio: function(b) {
            var c = this;
            a.each(this.formats, function(a, d) {
                return c.aurora.support[d] && b[d] ? (c.status.src = b[d],
                c.status.format[d] = !0,
                c.status.formatType = d,
                !1) : void 0
            }),
            this.aurora.player = new AV.Player.fromURL(this.status.src),
            this._addAuroraEventListeners(this.aurora.player, this.aurora),
            "auto" === this.options.preload && (this._aurora_load(),
            this.status.waitForLoad = !1)
        },
        _aurora_resetMedia: function() {
            this.aurora.player && this.aurora.player.stop()
        },
        _aurora_clearMedia: function() {},
        _aurora_load: function() {
            this.status.waitForLoad && (this.status.waitForLoad = !1,
            this.aurora.player.preload())
        },
        _aurora_play: function(b) {
            this.status.waitForLoad || isNaN(b) || this.aurora.player.seek(b),
            this.aurora.player.playing || this.aurora.player.play(),
            this.status.waitForLoad = !1,
            this._aurora_checkWaitForPlay(),
            this._updateButtons(!0),
            this._trigger(a.jPlayer.event.play)
        },
        _aurora_pause: function(b) {
            isNaN(b) || this.aurora.player.seek(1e3 * b),
            this.aurora.player.pause(),
            b > 0 && this._aurora_checkWaitForPlay(),
            this._updateButtons(!1),
            this._trigger(a.jPlayer.event.pause)
        },
        _aurora_playHead: function(a) {
            this.aurora.player.duration > 0 && this.aurora.player.seek(a * this.aurora.player.duration / 100),
            this.status.waitForLoad || this._aurora_checkWaitForPlay()
        },
        _aurora_checkWaitForPlay: function() {
            this.status.waitForPlay && (this.status.waitForPlay = !1)
        },
        _aurora_volume: function(a) {
            this.aurora.player.volume = 100 * a
        },
        _aurora_mute: function(a) {
            a ? (this.aurora.properties.lastvolume = this.aurora.player.volume,
            this.aurora.player.volume = 0) : this.aurora.player.volume = this.aurora.properties.lastvolume,
            this.aurora.properties.muted = a
        },
        _flash_setAudio: function(b) {
            var c = this;
            try {
                a.each(this.formats, function(a, d) {
                    if (c.flash.support[d] && b[d]) {
                        switch (d) {
                        case "m4a":
                        case "fla":
                            c._getMovie().fl_setAudio_m4a(b[d]);
                            break;
                        case "mp3":
                            c._getMovie().fl_setAudio_mp3(b[d]);
                            break;
                        case "rtmpa":
                            c._getMovie().fl_setAudio_rtmp(b[d])
                        }
                        return c.status.src = b[d],
                        c.status.format[d] = !0,
                        c.status.formatType = d,
                        !1
                    }
                }),
                "auto" === this.options.preload && (this._flash_load(),
                this.status.waitForLoad = !1)
            } catch (d) {
                this._flashError(d)
            }
        },
        _flash_setVideo: function(b) {
            var c = this;
            try {
                a.each(this.formats, function(a, d) {
                    if (c.flash.support[d] && b[d]) {
                        switch (d) {
                        case "m4v":
                        case "flv":
                            c._getMovie().fl_setVideo_m4v(b[d]);
                            break;
                        case "rtmpv":
                            c._getMovie().fl_setVideo_rtmp(b[d])
                        }
                        return c.status.src = b[d],
                        c.status.format[d] = !0,
                        c.status.formatType = d,
                        !1
                    }
                }),
                "auto" === this.options.preload && (this._flash_load(),
                this.status.waitForLoad = !1)
            } catch (d) {
                this._flashError(d)
            }
        },
        _flash_resetMedia: function() {
            this.internal.flash.jq.css({
                width: "0px",
                height: "0px"
            }),
            this._flash_pause(0 / 0)
        },
        _flash_clearMedia: function() {
            try {
                this._getMovie().fl_clearMedia()
            } catch (a) {
                this._flashError(a)
            }
        },
        _flash_load: function() {
            try {
                this._getMovie().fl_load()
            } catch (a) {
                this._flashError(a)
            }
            this.status.waitForLoad = !1
        },
        _flash_play: function(a) {
            try {
                this._getMovie().fl_play(a)
            } catch (b) {
                this._flashError(b)
            }
            this.status.waitForLoad = !1,
            this._flash_checkWaitForPlay()
        },
        _flash_pause: function(a) {
            try {
                this._getMovie().fl_pause(a)
            } catch (b) {
                this._flashError(b)
            }
            a > 0 && (this.status.waitForLoad = !1,
            this._flash_checkWaitForPlay())
        },
        _flash_playHead: function(a) {
            try {
                this._getMovie().fl_play_head(a)
            } catch (b) {
                this._flashError(b)
            }
            this.status.waitForLoad || this._flash_checkWaitForPlay()
        },
        _flash_checkWaitForPlay: function() {
            this.status.waitForPlay && (this.status.waitForPlay = !1,
            this.css.jq.videoPlay.length && this.css.jq.videoPlay.hide(),
            this.status.video && (this.internal.poster.jq.hide(),
            this.internal.flash.jq.css({
                width: this.status.width,
                height: this.status.height
            })))
        },
        _flash_volume: function(a) {
            try {
                this._getMovie().fl_volume(a)
            } catch (b) {
                this._flashError(b)
            }
        },
        _flash_mute: function(a) {
            try {
                this._getMovie().fl_mute(a)
            } catch (b) {
                this._flashError(b)
            }
        },
        _getMovie: function() {
            return document[this.internal.flash.id]
        },
        _getFlashPluginVersion: function() {
            var a, b = 0;
            if (window.ActiveXObject)
                try {
                    if (a = new ActiveXObject("ShockwaveFlash.ShockwaveFlash")) {
                        var c = a.GetVariable("$version");
                        c && (c = c.split(" ")[1].split(","),
                        b = parseInt(c[0], 10) + "." + parseInt(c[1], 10))
                    }
                } catch (d) {}
            else
                navigator.plugins && navigator.mimeTypes.length > 0 && (a = navigator.plugins["Shockwave Flash"],
                a && (b = navigator.plugins["Shockwave Flash"].description.replace(/.*\s(\d+\.\d+).*/, "$1")));
            return 1 * b
        },
        _checkForFlash: function(a) {
            var b = !1;
            return this._getFlashPluginVersion() >= a && (b = !0),
            b
        },
        _validString: function(a) {
            return a && "string" == typeof a
        },
        _limitValue: function(a, b, c) {
            return b > a ? b : a > c ? c : a
        },
        _urlNotSetError: function(b) {
            this._error({
                type: a.jPlayer.error.URL_NOT_SET,
                context: b,
                message: a.jPlayer.errorMsg.URL_NOT_SET,
                hint: a.jPlayer.errorHint.URL_NOT_SET
            })
        },
        _flashError: function(b) {
            var c;
            c = this.internal.ready ? "FLASH_DISABLED" : "FLASH",
            this._error({
                type: a.jPlayer.error[c],
                context: this.internal.flash.swf,
                message: a.jPlayer.errorMsg[c] + b.message,
                hint: a.jPlayer.errorHint[c]
            }),
            this.internal.flash.jq.css({
                width: "1px",
                height: "1px"
            })
        },
        _error: function(b) {
            this._trigger(a.jPlayer.event.error, b),
            this.options.errorAlerts && this._alert("Error!" + (b.message ? "\n" + b.message : "") + (b.hint ? "\n" + b.hint : "") + "\nContext: " + b.context)
        },
        _warning: function(c) {
            this._trigger(a.jPlayer.event.warning, b, c),
            this.options.warningAlerts && this._alert("Warning!" + (c.message ? "\n" + c.message : "") + (c.hint ? "\n" + c.hint : "") + "\nContext: " + c.context)
        },
        _alert: function(a) {
            var b = "jPlayer " + this.version.script + " : id='" + this.internal.self.id + "' : " + a;
            this.options.consoleAlerts ? window.console && window.console.log && window.console.log(b) : alert(b)
        },
        _emulateHtmlBridge: function() {
            var b = this;
            a.each(a.jPlayer.emulateMethods.split(/\s+/g), function(a, c) {
                b.internal.domNode[c] = function(a) {
                    b[c](a)
                }
            }),
            a.each(a.jPlayer.event, function(c, d) {
                var e = !0;
                a.each(a.jPlayer.reservedEvent.split(/\s+/g), function(a, b) {
                    return b === c ? (e = !1,
                    !1) : void 0
                }),
                e && b.element.bind(d + ".jPlayer.jPlayerHtml", function() {
                    b._emulateHtmlUpdate();
                    var a = document.createEvent("Event");
                    a.initEvent(c, !1, !0),
                    b.internal.domNode.dispatchEvent(a)
                })
            })
        },
        _emulateHtmlUpdate: function() {
            var b = this;
            a.each(a.jPlayer.emulateStatus.split(/\s+/g), function(a, c) {
                b.internal.domNode[c] = b.status[c]
            }),
            a.each(a.jPlayer.emulateOptions.split(/\s+/g), function(a, c) {
                b.internal.domNode[c] = b.options[c]
            })
        },
        _destroyHtmlBridge: function() {
            var b = this;
            this.element.unbind(".jPlayerHtml");
            var c = a.jPlayer.emulateMethods + " " + a.jPlayer.emulateStatus + " " + a.jPlayer.emulateOptions;
            a.each(c.split(/\s+/g), function(a, c) {
                delete b.internal.domNode[c]
            })
        }
    },
    a.jPlayer.error = {
        FLASH: "e_flash",
        FLASH_DISABLED: "e_flash_disabled",
        NO_SOLUTION: "e_no_solution",
        NO_SUPPORT: "e_no_support",
        URL: "e_url",
        URL_NOT_SET: "e_url_not_set",
        VERSION: "e_version"
    },
    a.jPlayer.errorMsg = {
        FLASH: "jPlayer's Flash fallback is not configured correctly, or a command was issued before the jPlayer Ready event. Details: ",
        FLASH_DISABLED: "jPlayer's Flash fallback has been disabled by the browser due to the CSS rules you have used. Details: ",
        NO_SOLUTION: "No solution can be found by jPlayer in this browser. Neither HTML nor Flash can be used.",
        NO_SUPPORT: "It is not possible to play any media format provided in setMedia() on this browser using your current options.",
        URL: "Media URL could not be loaded.",
        URL_NOT_SET: "Attempt to issue media playback commands, while no media url is set.",
        VERSION: "jPlayer " + a.jPlayer.prototype.version.script + " needs Jplayer.swf version " + a.jPlayer.prototype.version.needFlash + " but found "
    },
    a.jPlayer.errorHint = {
        FLASH: "Check your swfPath option and that Jplayer.swf is there.",
        FLASH_DISABLED: "Check that you have not display:none; the jPlayer entity or any ancestor.",
        NO_SOLUTION: "Review the jPlayer options: support and supplied.",
        NO_SUPPORT: "Video or audio formats defined in the supplied option are missing.",
        URL: "Check media URL is valid.",
        URL_NOT_SET: "Use setMedia() to set the media URL.",
        VERSION: "Update jPlayer files."
    },
    a.jPlayer.warning = {
        CSS_SELECTOR_COUNT: "e_css_selector_count",
        CSS_SELECTOR_METHOD: "e_css_selector_method",
        CSS_SELECTOR_STRING: "e_css_selector_string",
        OPTION_KEY: "e_option_key"
    },
    a.jPlayer.warningMsg = {
        CSS_SELECTOR_COUNT: "The number of css selectors found did not equal one: ",
        CSS_SELECTOR_METHOD: "The methodName given in jPlayer('cssSelector') is not a valid jPlayer method.",
        CSS_SELECTOR_STRING: "The methodCssSelector given in jPlayer('cssSelector') is not a String or is empty.",
        OPTION_KEY: "The option requested in jPlayer('option') is undefined."
    },
    a.jPlayer.warningHint = {
        CSS_SELECTOR_COUNT: "Check your css selector and the ancestor.",
        CSS_SELECTOR_METHOD: "Check your method name.",
        CSS_SELECTOR_STRING: "Check your css selector is a string.",
        OPTION_KEY: "Check your option name."
    }
});
;(function(n) {
    typeof define == "function" && define.amd ? define(["jquery"], n) : n(jQuery)
}
)(function(n) {
    var r = []
      , e = n(document)
      , u = navigator.userAgent.toLowerCase()
      , f = n(window)
      , i = []
      , t = {
        ieQuirks: null,
        msie: /msie/.test(u) && !/opera/.test(u),
        opera: /opera/.test(u)
    };
    t.ie6 = t.msie && /msie 6./.test(u) && typeof window.XMLHttpRequest != "object",
    t.ie7 = t.msie && /msie 7.0/.test(u),
    t.boxModel = document.compatMode === "CSS1Compat",
    n.modal = function(t, i) {
        return n.modal.impl.init(t, i)
    }
    ,
    n.modal.close = function() {
        n.modal.impl.close()
    }
    ,
    n.modal.focus = function(t) {
        n.modal.impl.focus(t)
    }
    ,
    n.modal.setContainerDimensions = function() {
        n.modal.impl.setContainerDimensions()
    }
    ,
    n.modal.setPosition = function() {
        n.modal.impl.setPosition()
    }
    ,
    n.modal.update = function(t, i) {
        n.modal.impl.update(t, i)
    }
    ,
    n.fn.modal = function(t) {
        return n.modal.impl.init(this, t)
    }
    ,
    n.modal.defaults = {
        appendTo: "body",
        focus: !0,
        opacity: 50,
        overlayId: "simplemodal-overlay",
        overlayCss: {},
        containerId: "simplemodal-container",
        containerCss: {},
        dataId: "simplemodal-data",
        dataCss: {},
        minHeight: null,
        minWidth: null,
        maxHeight: null,
        maxWidth: null,
        autoResize: !1,
        autoPosition: !0,
        zIndex: 1e3,
        close: !0,
        closeHTML: '<a class="modalCloseImg" title="Close"></a>',
        closeClass: "simplemodal-close",
        escClose: !0,
        overlayClose: !1,
        fixed: !0,
        position: null,
        persist: !1,
        modal: !0,
        onOpen: null,
        onShow: null,
        onClose: null
    },
    n.modal.impl = {
        d: {},
        init: function(i, r) {
            var u = this;
            if (u.d.data)
                return !1;
            if (t.ieQuirks = t.msie && !(n.support.boxModel === undefined) && !n.support.boxModel,
            u.o = n.extend({}, n.modal.defaults, r),
            u.zIndex = u.o.zIndex,
            u.occb = !1,
            typeof i == "object")
                i = i instanceof n ? i : n(i),
                u.d.placeholder = !1,
                i.parent().parent().size() > 0 && (i.before(n("<span></span>").attr("id", "simplemodal-placeholder").css({
                    display: "none"
                })),
                u.d.placeholder = !0,
                u.display = i.css("display"),
                u.o.persist || (u.d.orig = i.clone(!0)));
            else if (typeof i == "string" || typeof i == "number")
                i = n("<div></div>").html(i);
            else
                return alert("SimpleModal Error: Unsupported data type: " + typeof i),
                u;
            return u.create(i),
            i = null,
            u.open(),
            n.isFunction(u.o.onShow) && u.o.onShow.apply(u, [u.d]),
            u
        },
        create: function(u) {
            var f = this;
            f.getDimensions(),
            f.o.modal && t.ie6 && (f.d.iframe = n('<iframe src="javascript:false;"></iframe>').css(n.extend(f.o.iframeCss, {
                display: "none",
                opacity: 0,
                position: "fixed",
                height: i[0],
                width: i[1],
                zIndex: f.o.zIndex,
                top: 0,
                left: 0
            })).appendTo(f.o.appendTo)),
            f.d.overlay = n("<div></div>").attr("id", f.o.overlayId).addClass("simplemodal-overlay").css(n.extend(f.o.overlayCss, {
                display: "none",
                opacity: f.o.opacity / 100,
                height: f.o.modal ? r[0] : 0,
                width: f.o.modal ? r[1] : 0,
                position: "fixed",
                left: 0,
                top: 0,
                zIndex: f.o.zIndex + 1
            })).appendTo(f.o.appendTo),
            f.d.container = n("<div></div>").attr("id", f.o.containerId).addClass("simplemodal-container").css(n.extend({
                position: f.o.fixed ? "fixed" : "absolute"
            }, f.o.containerCss, {
                display: "none",
                zIndex: f.o.zIndex + 2
            })).append(f.o.close && f.o.closeHTML ? n(f.o.closeHTML).addClass(f.o.closeClass) : "").appendTo(f.o.appendTo),
            f.d.wrap = n("<div></div>").attr("tabIndex", -1).addClass("simplemodal-wrap").css({
                height: "100%",
                outline: 0,
                width: "100%"
            }).appendTo(f.d.container),
            f.d.data = u.attr("id", u.attr("id") || f.o.dataId).addClass("simplemodal-data").css(n.extend(f.o.dataCss, {
                display: "none"
            })).appendTo("body"),
            u = null,
            f.setContainerDimensions(),
            f.d.data.appendTo(f.d.wrap),
            (t.ie6 || t.ieQuirks) && f.fixIE()
        },
        bindEvents: function() {
            var u = this;
            n("." + u.o.closeClass).bind("click.simplemodal", function(n) {
                n.preventDefault(),
                u.close()
            }),
            u.o.modal && u.o.close && u.o.overlayClose && u.d.overlay.bind("click.simplemodal", function(n) {
                n.preventDefault(),
                u.close()
            }),
            e.bind("keydown.simplemodal", function(n) {
                u.o.modal && n.keyCode === 9 ? u.watchTab(n) : u.o.close && u.o.escClose && n.keyCode === 27 && (n.preventDefault(),
                u.close())
            }),
            f.bind("resize.simplemodal orientationchange.simplemodal", function() {
                u.getDimensions(),
                u.o.autoResize ? u.setContainerDimensions() : u.o.autoPosition && u.setPosition(),
                t.ie6 || t.ieQuirks ? u.fixIE() : u.o.modal && (u.d.iframe && u.d.iframe.css({
                    height: i[0],
                    width: i[1]
                }),
                u.d.overlay.css({
                    height: r[0],
                    width: r[1]
                }))
            })
        },
        unbindEvents: function() {
            n("." + this.o.closeClass).unbind("click.simplemodal"),
            e.unbind("keydown.simplemodal"),
            f.unbind(".simplemodal"),
            this.d.overlay.unbind("click.simplemodal")
        },
        fixIE: function() {
            var i = this
              , t = i.o.position;
            n.each([i.d.iframe || null, i.o.modal ? i.d.overlay : null, i.d.container.css("position") === "fixed" ? i.d.container : null], function(n, i) {
                var l, a, e, o;
                if (i) {
                    var h = "document.body.clientHeight"
                      , s = "document.body.clientWidth"
                      , w = "document.body.scrollHeight"
                      , c = "document.body.scrollLeft"
                      , v = "document.body.scrollTop"
                      , y = "document.body.scrollWidth"
                      , b = "document.documentElement.clientHeight"
                      , p = "document.documentElement.clientWidth"
                      , f = "document.documentElement.scrollLeft"
                      , u = "document.documentElement.scrollTop"
                      , r = i[0].style;
                    r.position = "absolute",
                    n < 2 ? (r.removeExpression("height"),
                    r.removeExpression("width"),
                    r.setExpression("height", "" + w + " > " + h + " ? " + w + " : " + h + ' + "px"'),
                    r.setExpression("width", "" + y + " > " + s + " ? " + y + " : " + s + ' + "px"')) : (t && t.constructor === Array ? (e = t[0] ? typeof t[0] == "number" ? t[0].toString() : t[0].replace(/px/, "") : i.css("top").replace(/px/, ""),
                    l = e.indexOf("%") === -1 ? e + " + (t = " + u + " ? " + u + " : " + v + ') + "px"' : parseInt(e.replace(/%/, "")) + " * ((" + b + " || " + h + ") / 100) + (t = " + u + " ? " + u + " : " + v + ') + "px"',
                    t[1] && (o = typeof t[1] == "number" ? t[1].toString() : t[1].replace(/px/, ""),
                    a = o.indexOf("%") === -1 ? o + " + (t = " + f + " ? " + f + " : " + c + ') + "px"' : parseInt(o.replace(/%/, "")) + " * ((" + p + " || " + s + ") / 100) + (t = " + f + " ? " + f + " : " + c + ') + "px"')) : (l = "(" + b + " || " + h + ") / 2 - (this.offsetHeight / 2) + (t = " + u + " ? " + u + " : " + v + ') + "px"',
                    a = "(" + p + " || " + s + ") / 2 - (this.offsetWidth / 2) + (t = " + f + " ? " + f + " : " + c + ') + "px"'),
                    r.removeExpression("top"),
                    r.removeExpression("left"),
                    r.setExpression("top", l),
                    r.setExpression("left", a))
                }
            })
        },
        focus: function(t) {
            var i = this
              , u = t && n.inArray(t, ["first", "last"]) !== -1 ? t : "first"
              , r = n(":input:enabled:visible:" + u, i.d.wrap);
            setTimeout(function() {
                r.length > 0 ? r.focus() : i.d.wrap.focus()
            }, 10)
        },
        getDimensions: function() {
            var t = this
              , n = typeof window.innerHeight == "undefined" ? f.height() : window.innerHeight;
            r = [e.height(), e.width()],
            i = [n, f.width()]
        },
        getVal: function(n, t) {
            return n ? typeof n == "number" ? n : n === "auto" ? 0 : n.indexOf("%") > 0 ? parseInt(n.replace(/%/, "")) / 100 * (t === "h" ? i[0] : i[1]) : parseInt(n.replace(/px/, "")) : null
        },
        update: function(n, t) {
            var i = this;
            if (!i.d.data)
                return !1;
            i.d.origHeight = i.getVal(n, "h"),
            i.d.origWidth = i.getVal(t, "w"),
            i.d.data.hide(),
            n && i.d.container.css("height", n),
            t && i.d.container.css("width", t),
            i.setContainerDimensions(),
            i.d.data.show(),
            i.o.focus && i.focus(),
            i.unbindEvents(),
            i.bindEvents()
        },
        setContainerDimensions: function() {
            var n = this, v = t.ie6 || t.ie7, r = n.d.origHeight ? n.d.origHeight : t.opera ? n.d.container.height() : n.getVal(v ? n.d.container[0].currentStyle.height : n.d.container.css("height"), "h"), u = n.d.origWidth ? n.d.origWidth : t.opera ? n.d.container.width() : n.getVal(v ? n.d.container[0].currentStyle.width : n.d.container.css("width"), "w"), o = n.d.data.outerHeight(!0), s = n.d.data.outerWidth(!0), f;
            n.d.origHeight = n.d.origHeight || r,
            n.d.origWidth = n.d.origWidth || u;
            var l = n.o.maxHeight ? n.getVal(n.o.maxHeight, "h") : null
              , a = n.o.maxWidth ? n.getVal(n.o.maxWidth, "w") : null
              , h = l && l < i[0] ? l : i[0]
              , c = a && a < i[1] ? a : i[1]
              , e = n.o.minHeight ? n.getVal(n.o.minHeight, "h") : "auto";
            r = r ? n.o.autoResize && r > h ? h : r < e ? e : r : o ? o > h ? h : n.o.minHeight && e !== "auto" && o < e ? e : o : e,
            f = n.o.minWidth ? n.getVal(n.o.minWidth, "w") : "auto",
            u = u ? n.o.autoResize && u > c ? c : u < f ? f : u : s ? s > c ? c : n.o.minWidth && f !== "auto" && s < f ? f : s : f,
            n.d.container.css({
                height: r,
                width: u
            }),
            n.d.wrap.css({
                overflow: o > r || s > u ? "auto" : "visible"
            }),
            n.o.autoPosition && n.setPosition()
        },
        setPosition: function() {
            var n = this, t, r, u = i[0] / 2 - n.d.container.outerHeight(!0) / 2, e = i[1] / 2 - n.d.container.outerWidth(!0) / 2, o = n.d.container.css("position") !== "fixed" ? f.scrollTop() : 0;
            n.o.position && Object.prototype.toString.call(n.o.position) === "[object Array]" ? (t = o + (n.o.position[0] || u),
            r = n.o.position[1] || e) : (t = o + u,
            r = e),
            n.d.container.css({
                left: r,
                top: t
            })
        },
        watchTab: function(t) {
            var i = this, r;
            n(t.target).parents(".simplemodal-container").length > 0 ? (i.inputs = n(":input:enabled:visible:first, :input:enabled:visible:last", i.d.data[0]),
            (!t.shiftKey && t.target === i.inputs[i.inputs.length - 1] || t.shiftKey && t.target === i.inputs[0] || i.inputs.length === 0) && (t.preventDefault(),
            r = t.shiftKey ? "last" : "first",
            i.focus(r))) : (t.preventDefault(),
            i.focus())
        },
        open: function() {
            var t = this;
            t.d.iframe && t.d.iframe.show(),
            n.isFunction(t.o.onOpen) ? t.o.onOpen.apply(t, [t.d]) : (t.d.overlay.show(),
            t.d.container.show(),
            t.d.data.show()),
            t.o.focus && t.focus(),
            t.bindEvents()
        },
        close: function() {
            var t = this, i;
            if (!t.d.data)
                return !1;
            t.unbindEvents(),
            n.isFunction(t.o.onClose) && !t.occb ? (t.occb = !0,
            t.o.onClose.apply(t, [t.d])) : (t.d.placeholder ? (i = n("#simplemodal-placeholder"),
            t.o.persist ? i.replaceWith(t.d.data.removeClass("simplemodal-data").css("display", t.display)) : (t.d.data.hide().remove(),
            i.replaceWith(t.d.orig))) : t.d.data.hide().remove(),
            t.d.container.hide().remove(),
            t.d.overlay.hide(),
            t.d.iframe && t.d.iframe.hide().remove(),
            t.d.overlay.remove(),
            t.d = {})
        }
    }
});
;$(function() {
    function o(n, t) {
        var r = t.el.is("img") ? t.el : t.el.find("img")
          , i = r.length === 1 ? r : t.el.find("img.original-image");
        !i.attr("src") && i.hasClass("lazy") ? i.attr("data-original", n.Url) : i.attr("src", n.Url),
        t.el.removeAttr("data-retry-url"),
        t.el.trigger("thumbnailLoaded")
    }
    function s(n) {
        var i = +new Date - n.start;
        t(["ThumbnailGenTime", "2D", "Success", i]),
        t(["ThumbnailGenRetries", "2D", "Success", n.retryCount])
    }
    function h(n) {
        var i = +new Date - n.start;
        t(["ThumbnailGenRetries", "2D", "Gave Up", n.retryCount]),
        t(["ThumbnailGenTime", "2D", "Gave Up", i])
    }
    function c(n, t) {
        n.Final ? (t.realRegeneration && s(t),
        o(n, t)) : (t.realRegeneration = !0,
        t.retryCount++,
        t.retryCount < u ? setTimeout(function() {
            t.retryFunction(t)
        }, r) : h(t))
    }
    function i(n) {
        var t = n.el.data("retry-url");
        t && $.ajax({
            url: t,
            dataType: "json",
            cache: !1,
            crossDomain: !0,
            xhrFields: {
                withCredentials: !0
            },
            success: function(t) {
                c(t, n)
            }
        })
    }
    var n = $("#image-retry-data")
      , r = n ? n.data("image-retry-timer") : 1500
      , u = n ? n.data("image-retry-max-times") : 10
      , f = n ? n.data("ga-logging-percent") : 0
      , e = window.GoogleAnalyticsEvents && GoogleAnalyticsEvents.FireEvent || function() {}
      , t = function(n) {
        Math.random() <= f / 100 && e(n)
    };
    $.fn.loadRobloxThumbnails = function() {
        return this.each(function() {
            var n = {
                retryCount: 0,
                realRegeneration: !1,
                start: +new Date,
                el: $(this),
                retryFunction: i
            };
            setTimeout(function() {
                i(n)
            }, 0)
        })
    }
});
;Roblox = Roblox || {},
Roblox.Linkify = function() {
    "use strict";
    function f() {
        var n = $("#roblox-linkify");
        if (n.length) {
            var r = n.data("regex")
              , u = n.data("regex-flags")
              , f = n.data("as-http-regex")
              , e = {
                enabled: n.data("enabled"),
                regex: new RegExp(r,u),
                doNotUpgradeToHttpsRegex: new RegExp(f)
            };
            i(e)
        }
        t = !0
    }
    function i(t) {
        $.extend(n, t)
    }
    function e(n) {
        return $("<div>" + n + "</div>").find("a[href]").length > 0
    }
    function r(t) {
        return t.match(n.doNotUpgradeToHttpsRegex)
    }
    function o(n) {
        return n.replace(/\&amp;/g, "&")
    }
    function s(n) {
        return n.replace(/\.+$/g, "")
    }
    function h(n) {
        return n.clone().wrap("<div>").parent().html()
    }
    function c(t) {
        return t.match(n.hasProtocolRegex) || (t = r(t) ? n.httpProtocol + t : n.defaultProtocol + t),
        t
    }
    function l(n) {
        return r(n) ? n.replace("https://", "http://") : n.replace("http://", "https://")
    }
    function a(t) {
        var f, r, i;
        return t = o(t),
        f = t,
        t = s(t),
        r = c(t),
        r = l(r),
        i = $("<a></a>"),
        i.addClass(n.cssClass),
        i.attr("href", r),
        i.text(f),
        u || i.attr("target", "_blank"),
        i.attr("rel", "noopener noreferrer"),
        h(i)
    }
    function v(i) {
        return t || f(),
        n.enabled && !e(i) && (i = i.replace(n.regex, a)),
        i
    }
    var n = {
        enabled: !1,
        hasProtocolRegex: /(https?:\/\/)/,
        defaultProtocol: "https://",
        httpProtocol: "http://",
        cssClass: "text-link"
    }
      , t = !1
      , u = Roblox.FixedUI && Roblox.FixedUI.isMobile;
    return {
        String: v,
        SetOptions: i
    }
}(),
$.fn.linkify = function() {
    return this.each(function() {
        var t = $(this), n = t.html(), i;
        typeof n != "undefined" && n !== null && (i = Roblox.Linkify.String(n),
        t.html(i))
    })
}
,
$(function() {
    $(".linkify").linkify()
});
;typeof Roblox == "undefined" && (Roblox = {}),
typeof Roblox.CookieUpgrader == "undefined" && (Roblox.CookieUpgrader = {}),
Roblox.CookieUpgrader.domain = "",
Roblox.CookieUpgrader.oneMonthInMs = 2592e6,
Roblox.CookieUpgrader.upgrade = function(n, t) {
    function e(n) {
        var u = null, i, t, r;
        if (document.cookie && document.cookie !== "")
            for (i = document.cookie.split(";"),
            t = 0; t < i.length; t++)
                if (r = jQuery.trim(i[t]),
                r.substring(0, n.length + 1) === n + "=") {
                    u = r.substring(n.length + 1);
                    break
                }
        return u
    }
    var i, o, r, f, s, u, h;
    if (Roblox.CookieUpgrader.domain !== "" && (i = e(n),
    i != null))
        try {
            if (o = document.cookie.length,
            document.cookie = n + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/",
            document.cookie = n + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; domain=" + window.location.host,
            document.cookie.length === o)
                return;
            if (r = n,
            typeof t.newCookieName != "undefined" && (r = t.newCookieName),
            f = e(n),
            f != null) {
                typeof GoogleAnalyticsEvents != "undefined" && GoogleAnalyticsEvents.FireEvent(["CookieUpgrader", "DeletedRedundantCookie", n]),
                s = {
                    cookieName: n,
                    cookieValue: f
                },
                Roblox.EventStream && Roblox.EventStream.SendEventWithTarget("CookieUpgrader", "DeletedRedundantCookie", s, Roblox.EventStream.TargetTypes.DIAGNOSTIC);
                return
            }
            u = r + "=" + i + "; ",
            u += "expires=" + t.expires(i).toUTCString() + "; ",
            u += "path=/; domain=" + Roblox.CookieUpgrader.domain,
            document.cookie = u,
            typeof GoogleAnalyticsEvents != "undefined" && GoogleAnalyticsEvents.FireEvent(["CookieUpgrader", "ConvertedCookie", n]),
            h = {
                cookieName: n,
                cookieValue: i,
                newCookieName: r
            },
            Roblox.EventStream && Roblox.EventStream.SendEventWithTarget("CookieUpgrader", "ConvertedCookie", h, Roblox.EventStream.TargetTypes.DIAGNOSTIC)
        } catch (c) {
            typeof GoogleAnalyticsEvents != "undefined" && GoogleAnalyticsEvents.FireEvent(["CookieUpgrader", "ExceptionDuringConvertOf" + n, c.message])
        }
}
,
Roblox.CookieUpgrader.getExpirationFromCookieValue = function(n, t) {
    var f = new RegExp(n + "=(\\d+)/(\\d+)/(\\d+)"), i = t.match(f), u = +new Date, r;
    return i != null && i.length != 0 && (r = new Date(i[3],i[1] - 1,i[2]),
    isNaN(r.getTime()) || (u = r.getTime())),
    new Date(u + Roblox.CookieUpgrader.oneMonthInMs)
}
,
Roblox.CookieUpgrader.thirtyDaysFromNow = function() {
    return new Date(+new Date + Roblox.CookieUpgrader.oneMonthInMs)
}
,
Roblox.CookieUpgrader.thirtyYearsFromNow = function() {
    return new Date(+new Date + 94608e7)
}
,
Roblox.CookieUpgrader.fourHoursFromNow = function() {
    return new Date(+new Date + 144e5)
}
;
;var Roblox = Roblox || {};
Roblox.StringFormat = function() {
    String.prototype.format = function() {
        var n = arguments;
        return this.replace(/\{(\d+)\}/g, function(t, i) {
            return n[i] || ""
        })
    }
}();
;var Roblox = Roblox || {};
Roblox.SignupTrackingScript = function() {
    function n(n, t) {
        RobloxEventManager.triggerEvent("rbx_evt_signup", {
            age: n,
            gender: t
        })
    }
    return {
        trackingScript: n
    }
}();
;var Roblox = Roblox || {};
Roblox.AsyncGoogleOnScript = function() {
    function n(n, t) {
        GoogleAnalyticsEvents && GoogleAnalyticsEvents.FireEvent(["Signup", "Signup - Roblox", n, t])
    }
    return {
        googleGoalFire: n
    }
}();
;typeof Roblox == "undefined" && (Roblox = {}),
Roblox.VideoPreRollDFP = {
    newValue: "",
    showVideoPreRoll: !0,
    videoInitialized: !1,
    videoStarted: !1,
    videoCompleted: !1,
    videoSkipped: !1,
    videoCancelled: !1,
    videoErrored: !1,
    loadingBarMaxTime: 3e4,
    loadingBarCurrentTime: 0,
    loadingBarIntervalID: 0,
    loadingBarID: "videoPrerollLoadingBar",
    loadingBarInnerID: "videoPrerollLoadingBarCompleted",
    loadingBarPercentageID: "videoPrerollLoadingPercent",
    videoDiv: "videoPrerollMainDiv",
    companionAdDiv: "videoPrerollCompanionAd",
    contentElement: "contentElement",
    videoLoadingTimeout: 7e3,
    videoPlayingTimeout: 23e3,
    videoLogNote: "",
    logsEnabled: !1,
    includedPlaceIds: "",
    isSwfPreloaderEnabled: !1,
    isFlashInstalled: !1,
    isPrerollShownEveryXMinutesEnabled: !1,
    isAgeTargetingEnabled: !0,
    isAgeOrSegmentTargetingEnabled: !1,
    adUnit: "",
    adTime: 0,
    placeId: 0,
    customTargeting: {
        userAge: "",
        userAgeOrSegment: "",
        userGender: "",
        gameGenres: "",
        environment: "",
        adTime: "",
        PLVU: !1
    },
    adsManager: null,
    adsLoader: null,
    adDisplayContainer: null,
    intervalTimer: null,
    videoContent: null,
    isCompanionAdRenderedByGoogleTag: !1,
    contentEndedListener: function() {
        adsLoader.contentComplete()
    },
    createVideoContent: function() {
        Roblox.VideoPreRollDFP.videoContent = document.getElementById(this.contentElement)
    },
    createAdDisplayContainer: function() {
        adDisplayContainer = new google.ima.AdDisplayContainer(document.getElementById(this.videoDiv),Roblox.VideoPreRollDFP.videoContent)
    },
    requestAds: function() {
        google.ima.settings.setVpaidAllowed(!0),
        this.createVideoContent(),
        this.createAdDisplayContainer(),
        adDisplayContainer.initialize(),
        adsLoader = new google.ima.AdsLoader(adDisplayContainer),
        adsLoader.addEventListener(google.ima.AdsManagerLoadedEvent.Type.ADS_MANAGER_LOADED, this.onAdsManagerLoaded, !1),
        adsLoader.addEventListener(google.ima.AdErrorEvent.Type.AD_ERROR, this.onAdError, !1),
        this.videoContent.addEventListener("ended", this.contentEndedListener);
        var n = new google.ima.AdsRequest
          , t = this.constructUrl();
        n.adTagUrl = t,
        n.linearAdSlotWidth = 400,
        n.linearAdSlotHeight = 300,
        n.nonLinearAdSlotWidth = 400,
        n.nonLinearAdSlotHeight = 300,
        adsLoader.requestAds(n)
    },
    constructUrl: function() {
        var r = "http://pubads.g.doubleclick.net/gampad/ads?impl=s&gdfp_req=1&env=vp&output=xml_vast2&unviewed_position_start=1&url=[referrer_url]&description_url=[description_url]&correlator=[timestamp]", u = "&sz=400x300", f = "&iu=" + this.adUnit, e = "&ciu_szs=300x250", n = "", t, i;
        return this.isAgeTargetingEnabled && (n += "&Age=" + this.customTargeting.userAge),
        this.isAgeOrSegmentTargetingEnabled && (n += "&A=" + this.customTargeting.userAgeOrSegment),
        t = encodeURIComponent("Env=" + this.customTargeting.environment + "&Gender=" + this.customTargeting.userGender + n + "&Genres=" + this.customTargeting.gameGenres + "&PlaceID=" + this.placeId + "&Time=" + this.customTargeting.adTime + "&PLVU=" + this.customTargeting.PLVU),
        i = r + u + f + e + "&cust_params=" + t + "&",
        i
    },
    onAdsManagerLoaded: function(n) {
        adsManager = n.getAdsManager(Roblox.VideoPreRollDFP.videoContent),
        adsManager.addEventListener(google.ima.AdErrorEvent.Type.AD_ERROR, Roblox.VideoPreRollDFP.onAdError),
        adsManager.addEventListener(google.ima.AdEvent.Type.ALL_ADS_COMPLETED, Roblox.VideoPreRollDFP.onAdEvent),
        adsManager.addEventListener(google.ima.AdEvent.Type.LOADED, Roblox.VideoPreRollDFP.onAdEvent),
        adsManager.addEventListener(google.ima.AdEvent.Type.STARTED, Roblox.VideoPreRollDFP.onAdEvent),
        adsManager.addEventListener(google.ima.AdEvent.Type.SKIPPED, Roblox.VideoPreRollDFP.onAdEvent),
        adsManager.addEventListener(google.ima.AdEvent.Type.COMPLETE, Roblox.VideoPreRollDFP.onAdEvent);
        try {
            adsManager.init(400, 300, google.ima.ViewMode.NORMAL),
            adsManager.start()
        } catch (t) {
            Roblox.VideoPreRollDFP.onAdError()
        }
    },
    onAdEvent: function(n) {
        var i, t;
        switch (n.type) {
        case google.ima.AdEvent.Type.STARTED:
            if (Roblox.VideoPreRollDFP.videoStarted = !0,
            Roblox.VideoPreRollDFP.isCompanionAdRenderedByGoogleTag) {
                if (!googletag)
                    break;
                function r() {
                    googletag.defineSlot(Roblox.VideoPreRollDFP.adUnit, [300, 250], Roblox.VideoPreRollDFP.companionAdDiv).addService(googletag.companionAds()),
                    googletag.enableServices(),
                    googletag.display(Roblox.VideoPreRollDFP.companionAdDiv)
                }
                googletag.cmd.push(r)
            } else if (i = n.getAd(),
            t = i.getCompanionAds(300, 250),
            t.length > 0) {
                var u = t[0]
                  , f = u.getContent()
                  , e = document.getElementById(Roblox.VideoPreRollDFP.companionAdDiv);
                e.innerHTML = f
            }
            break;
        case google.ima.AdEvent.Type.SKIPPED:
            Roblox.VideoPreRollDFP.videoCompleted = !0,
            Roblox.VideoPreRollDFP.videoSkipped = !0,
            Roblox.VideoPreRollDFP.showVideoPreRoll = !1;
            break;
        case google.ima.AdEvent.Type.COMPLETE:
            Roblox.VideoPreRollDFP.videoStarted && Roblox.VideoPreRollDFP.videoCancelled == !1 && (Roblox.VideoPreRollDFP.videoCompleted = !0,
            Roblox.VideoPreRollDFP.showVideoPreRoll = !1,
            Roblox.VideoPreRollDFP.newValue != "" && $.cookie("RBXVPR", Roblox.VideoPreRollDFP.newValue, 180))
        }
    },
    onAdError: function() {
        Roblox.VideoPreRollDFP.videoCompleted = !0,
        Roblox.VideoPreRollDFP.videoErrored = !0,
        Roblox.VideoPreRollDFP.videoLogNote = "AdError"
    },
    checkEligibility: function() {
		Roblox.VideoPreRollDFP.showVideoPreRoll = !0
    },
    checkFlashEnabled: function() {
        var n = !1, t;
        try {
            t = new ActiveXObject("ShockwaveFlash.ShockwaveFlash"),
            t && (n = !0)
        } catch (i) {
            navigator.mimeTypes && navigator.mimeTypes["application/x-shockwave-flash"] != undefined && navigator.mimeTypes["application/x-shockwave-flash"].enabledPlugin && (n = !0)
        }
        return n
    },
    start: function() {
        this.placeId === 0 && typeof play_placeId != "undefined" && (this.placeId = play_placeId),
        this.videoInitialized = !0,
        this.videoStarted = !1,
        this.videoCancelled = !1,
        this.videoCompleted = !1,
        this.videoSkipped = !1,
        this.loadingBarCurrentTime = 0,
        this.videoLogNote = "";
        var n = 1e3;
        LoadingBar.init(this.loadingBarID, this.loadingBarInnerID, this.loadingBarPercentageID),
        this.loadingBarIntervalID = setInterval(function() {
            Roblox.VideoPreRollDFP.loadingBarCurrentTime += n,
            LoadingBar.update(Roblox.VideoPreRollDFP.loadingBarID, Roblox.VideoPreRollDFP.loadingBarCurrentTime / Roblox.VideoPreRollDFP.loadingBarMaxTime)
        }, n)
    },
    cancel: function() {
        this.videoCancelled = !0,
        $.modal.close()
    },
    skip: function() {
        this.videoCompleted = !0,
        this.videoSkipped = !0,
        this.showVideoPreRoll = !1
    },
    close: function() {
        MadStatus.running && MadStatus.stop(""),
        RobloxLaunch.launcher && (RobloxLaunch.launcher._cancelled = !0),
        clearInterval(this.loadingBarIntervalID),
        LoadingBar.dispose(this.loadingBarID),
        this.isPlaying() && (this.videoCancelled = !0),
        $.modal.close(),
        this.logVideoPreRoll(),
        this.isPrerollShownEveryXMinutesEnabled && this.videoInitialized && this.videoCompleted && this.updatePrerollCount()
    },
    logVideoPreRoll: function() {
        if (Roblox.VideoPreRollDFP.logsEnabled) {
            var n = "";
            if (Roblox.VideoPreRollDFP.videoCompleted)
                n = "Complete",
                Roblox.VideoPreRollDFP.videoLogNote == "" && (Roblox.VideoPreRollDFP.videoLogNote = "NoTimeout"),
                Roblox.VideoPreRollDFP.logsEnabled = !1;
            else if (Roblox.VideoPreRollDFP.videoCancelled)
                n = "Cancelled",
                Roblox.VideoPreRollDFP.videoLogNote = RobloxLaunch.state;
            else if (Roblox.VideoPreRollDFP.videoInitialized == !1 && Roblox.VideoPreRollDFP.videoLogNote != "")
                n = "Failed",
                Roblox.VideoPreRollDFP.logsEnabled = !1;
            else
                return;
            Roblox.GaEventSettings.gaDFPPreRollEnabled && GoogleAnalyticsEvents && GoogleAnalyticsEvents.FireEvent(["DFPPreRoll", n, Roblox.VideoPreRollDFP.videoLogNote])
        }
    },
    isPlaying: function() {
        return Roblox.VideoPreRollDFP.videoInitialized ? (Roblox.VideoPreRollDFP.videoInitialized && !Roblox.VideoPreRollDFP.videoStarted && Roblox.VideoPreRollDFP.loadingBarCurrentTime > Roblox.VideoPreRollDFP.videoLoadingTimeout && (Roblox.VideoPreRollDFP.videoCompleted = !0,
        Roblox.VideoPreRollDFP.videoLogNote = "LoadingTimeout"),
        Roblox.VideoPreRollDFP.videoStarted && !Roblox.VideoPreRollDFP.videoCompleted && Roblox.VideoPreRollDFP.loadingBarCurrentTime > Roblox.VideoPreRollDFP.videoPlayingTimeout && (Roblox.VideoPreRollDFP.videoCompleted = !0,
        Roblox.VideoPreRollDFP.videoLogNote = "PlayingTimeout"),
        !Roblox.VideoPreRollDFP.videoCompleted) : !1
    },
    correctIEModalPosition: function(n) {
        if (n.container.innerHeight() <= 30) {
            var t = $("#videoPrerollPanel")
              , i = -Math.floor(t.innerHeight() / 2);
            t.css({
                position: "relative",
                top: i + "px"
            }),
            n.container.find(".VprCloseButton").css({
                top: i - 10 + "px",
                "z-index": "1003"
            })
        }
    },
    test: function() {
        _popupOptions = {
            escClose: !0,
            opacity: 80,
            overlayCss: {
                backgroundColor: "#000"
            },
            onShow: function() {
                Test.VideoPreRollDFP.start(),
                $("#prerollClose").hide(),
                $("#prerollClose").delay(1e3 * Roblox.VideoPreRollDFP.adTime).show(300)
            },
            onClose: function() {
                Roblox.VideoPreRollDFP.close()
            },
            closeHTML: '<a href="#" class="ImageButton closeBtnCircle_35h ABCloseCircle VprCloseButton"></a>'
        },
        $("#videoPrerollPanel").modal(_popupOptions),
        MadStatus.running || (MadStatus.init($("#videoPrerollPanel").find(".MadStatusField"), $("#videoPrerollPanel").find(".MadStatusBackBuffer"), 2e3, 800),
        MadStatus.start()),
        $("#videoPrerollPanel").find(".MadStatusStarting").css("display", "none"),
        $("#videoPrerollPanel").find(".MadStatusSpinner").css("visibility", status === 3 || status === 4 || status === 5 ? "hidden" : "visible")
    },
    renderImaPreloader: function() {
        var n = encodeURIComponent(Roblox.VideoPreRollDFP.constructUrl())
          , t = "adTagUrl=" + n;
        $.ajax({
            url: "/game/preloader",
            data: {
                url: t
            },
            method: "GET",
            crossDomain: !0,
            xhrFields: {
                withCredentials: !0
            }
        }).success(function(n) {
            $("#videoPrerollMainDiv").html(n),
            Roblox.VideoPreRollDFP.videoErrored || (Roblox.VideoPreRollDFP.videoStarted = !0)
        })
    },
    updatePrerollCount: function() {
        $.ajax({
            url: "/game/updateprerollcount",
            method: "GET",
            crossDomain: !0,
            xhrFields: {
                withCredentials: !0
            }
        })
    }
};
var LoadingBar = {
    bars: [],
    init: function(n, t, i, r) {
        var u = this.get(n);
        u == null && (u = {}),
        u.barID = n,
        u.innerBarID = t,
        u.percentageID = i,
        typeof r == "undefined" && (u.percentComplete = 0),
        this.bars.push(u),
        this.update(n, u.percentComplete)
    },
    get: function(n) {
        for (var t = 0; t < this.bars.length; t++)
            if (this.bars[t].barID == n)
                return this.bars[t];
        return null
    },
    dispose: function(n) {
        for (var t = 0; t < this.bars.length; t++)
            this.bars[t].barID == n && this.bars.splice(t, 1)
    },
    update: function(n, t) {
        var i = this.get(n), r, u;
        i && (t > 1 && (t = 1),
        r = $("#" + n).width(),
        u = Math.round(r * t),
        $("#" + i.innerBarID).animate({
            width: u
        }, 200, "swing"),
        i.percentageID && $("#" + i.percentageID).length > 0 && $("#" + i.percentageID).html(Math.round(t * 100) + "%"),
        i.percentComplete = t)
    }
};
;MadStatus = {
    running: !1,
    init: function(n, t, i, r) {
        (MadStatus.running || MadStatus.timeout || MadStatus.resumeTimeout) && MadStatus.stop(),
        MadStatus.updateInterval = i ? i : 2e3,
        MadStatus.fadeInterval = r ? r : 1e3,
        MadStatus.timeout = null,
        MadStatus.resumeTimeout = null,
        MadStatus.running = !0,
        MadStatus.field = n,
        MadStatus.backBuffer = t,
        MadStatus.field.show(),
        MadStatus.backBuffer.hide()
    },
    newLib: function() {
        return MadStatus.participle[Math.floor(Math.random() * MadStatus.participle.length)] + " " + MadStatus.modifier[Math.floor(Math.random() * MadStatus.modifier.length)] + " " + MadStatus.subject[Math.floor(Math.random() * MadStatus.subject.length)] + "..."
    },
    start: function() {
        MadStatus.timeout == null && (MadStatus.timeout = setInterval("MadStatus.update()", MadStatus.updateInterval),
        MadStatus.running = !0)
    },
    stop: function(n) {
        clearInterval(MadStatus.timeout),
        MadStatus.timeout = null,
        clearTimeout(MadStatus.resumeTimeout),
        MadStatus.resumeTimeout = null,
        MadStatus.field[0].innerHTML = typeof n != typeof undefined ? n : "",
        MadStatus.running = !1
    },
    manualUpdate: function(n, t, i) {
        (MadStatus.timeout || MadStatus.resumeTimeout) && MadStatus.stop(),
        this.update(n, i),
        t && (MadStatus.resumeTimeout = setTimeout("MadStatus.start()", 1e3))
    },
    update: function(n, t) {
        (MadStatus.backBuffer[0].innerHTML = typeof n != typeof undefined ? n : this.newLib(),
        typeof t == typeof undefined || t != !1) && (this.field.hide(),
        this.backBuffer.fadeIn(this.fadeInterval + 2, function() {
            MadStatus.field[0].innerHTML = MadStatus.backBuffer[0].innerHTML,
            MadStatus.field.show(),
            MadStatus.backBuffer.hide()
        }))
    },
    participle: ["Accelerating", "Aggregating", "Allocating", "Acquiring", "Automating", "Backtracing", "Bloxxing", "Bootstrapping", "Calibrating", "Correlating", "De-noobing", "De-ionizing", "Deriving", "Energizing", "Filtering", "Generating", "Indexing", "Loading", "Noobing", "Optimizing", "Oxidizing", "Queueing", "Parsing", "Processing", "Rasterizing", "Reading", "Registering", "Re-routing", "Resolving", "Sampling", "Updating", "Writing"],
    modifier: ["Blox", "Count Zero", "Cylon", "Data", "Ectoplasm", "Encryption", "Event", "Farnsworth", "Bebop", "Flux Capacitor", "Fusion", "Game", "Gibson", "Host", "Mainframe", "Metaverse", "Nerf Herder", "Neutron", "Noob", "Photon", "Profile", "Script", "Skynet", "TARDIS", "Virtual"],
    subject: ["Analogs", "Blocks", "Cannon", "Channels", "Core", "Database", "Dimensions", "Directives", "Engine", "Files", "Gear", "Index", "Layer", "Matrix", "Paradox", "Parameters", "Parsecs", "Pipeline", "Players", "Ports", "Protocols", "Reactors", "Sphere", "Stream", "Switches", "Table", "Targets", "Throttle", "Tokens", "Torpedoes", "Tubes"]
};
;var RBX = {}
  , RobloxLaunchStates = {
    StartingServer: "StartingServer",
    StartingClient: "StartingClient",
    Upgrading: "Upgrading",
    None: "None"
}
  , RobloxLaunch = {
    launchGamePage: "/install/download.aspx",
    launcher: null,
    googleAnalyticsCallback: function() {
        RobloxLaunch._GoogleAnalyticsCallback && RobloxLaunch._GoogleAnalyticsCallback()
    },
    state: RobloxLaunchStates.None,
    protocolNameForClient: "",
    protocolNameForStudio: "",
    protocolUrlSeparator: ""
}
  , RobloxPlaceLauncherService = {
    RequestGame: function(n, t, i, r, u, f) {
        i = i !== null && i !== undefined ? i : "",
        $.ajax({
            method: "GET",
            url: "/Game/PlaceLauncher.ashx",
            data: {
                request: "RequestGame",
                placeId: n,
                isPartyLeader: t,
                gender: i
            },
            crossDomain: !0,
            xhrFields: {
                withCredentials: !0
            }
        }).done(function(n) {
            n.Error ? u(n.Error, f) : r(n, f)
        })
    },
    RequestPlayWithParty: function(n, t, i, r, u, f) {
        $.ajax({
            method: "GET",
            url: "/Game/PlaceLauncher.ashx",
            data: {
                request: "RequestPlayWithParty",
                placeId: n,
                partyGuid: t,
                gameId: i
            },
            crossDomain: !0,
            xhrFields: {
                withCredentials: !0
            }
        }).done(function(n) {
            n.Error ? u(n.Error, f) : r(n, f)
        })
    },
    RequestFollowUser: function(n, t, i, r) {
        $.ajax({
            method: "GET",
            url: "/Game/PlaceLauncher.ashx",
            data: {
                request: "RequestFollowUser",
                userId: n
            },
            crossDomain: !0,
            xhrFields: {
                withCredentials: !0
            }
        }).done(function(n) {
            n.Error ? i(n.Error, r) : t(n, r)
        })
    },
    RequestGameJob: function(n, t, i, r, u) {
        $.ajax({
            method: "GET",
            url: "/Game/PlaceLauncher.ashx",
            data: {
                request: "RequestGameJob",
                placeId: n,
                gameId: t
            },
            crossDomain: !0,
            xhrFields: {
                withCredentials: !0
            }
        }).done(function(n) {
            n.Error ? r(n.Error, u) : i(n, u)
        })
    },
    CheckGameJobStatus: function(n, t, i, r) {
        $.ajax({
            method: "GET",
            url: "/Game/PlaceLauncher.ashx",
            data: {
                request: "CheckGameJobStatus",
                jobId: n
            },
            crossDomain: !0,
            xhrFields: {
                withCredentials: !0
            }
        }).done(function(n) {
            n.Error ? i(n.Error, r) : t(n, r)
        })
    },
    RequestPrivateGame: function(n, t, i, r, u, f, e) {
        i = i !== null && i !== undefined ? i : "",
        $.ajax({
            method: "GET",
            url: "/Game/PlaceLauncher.ashx",
            data: {
                request: "RequestPrivateGame",
                placeId: n,
                accessCode: t,
                gender: i,
                linkCode: r
            },
            crossDomain: !0,
            xhrFields: {
                withCredentials: !0
            }
        }).done(function(n) {
            n.Error ? f(n.Error, e) : u(n, e)
        })
    }
};
RobloxLaunch.RequestPlayWithParty = function(n, t, i, r) {
    EventTracker && EventTracker.start("Launch"),
    RobloxLaunch.state = RobloxLaunchStates.None,
    checkRobloxInstall() && (RobloxLaunch.launcher === null && (RobloxLaunch.launcher = new RBX.PlaceLauncher(n)),
    RobloxLaunch.launcher.RequestPlayWithParty(t, i, r))
}
,
RobloxLaunch.RequestGame = function(n, t, i) {
    EventTracker && EventTracker.start("Launch"),
    RobloxLaunch.state = RobloxLaunchStates.None,
    checkRobloxInstall() && (RobloxLaunch.launcher === null && (RobloxLaunch.launcher = new RBX.PlaceLauncher(n)),
    RobloxLaunch.launcher.RequestGame(t, i))
}
,
RobloxLaunch.RequestPrivateGame = function(n, t, i, r, u) {
    EventTracker && EventTracker.start("Launch"),
    RobloxLaunch.state = RobloxLaunchStates.None,
    checkRobloxInstall() && (RobloxLaunch.launcher === null && (RobloxLaunch.launcher = new RBX.PlaceLauncher(n)),
    RobloxLaunch.launcher.RequestPrivateGame(t, i, r, u))
}
,
RobloxLaunch.RequestGameJob = function(n, t, i) {
    EventTracker && EventTracker.start("Launch"),
    RobloxLaunch.state = RobloxLaunchStates.None,
    checkRobloxInstall() && (RobloxLaunch.launcher === null && (RobloxLaunch.launcher = new RBX.PlaceLauncher(n)),
    RobloxLaunch.launcher.RequestGameJob(t, i))
}
,
RobloxLaunch.RequestFollowUser = function(n, t) {
    EventTracker && EventTracker.start("Launch"),
    RobloxLaunch.state = RobloxLaunchStates.None,
    checkRobloxInstall() && (RobloxLaunch.launcher === null && (RobloxLaunch.launcher = new RBX.PlaceLauncher(n)),
    RobloxLaunch.launcher.RequestFollowUser(t))
}
,
RobloxLaunch.StartGame = function(n, t, i, r, u) {
    var f = function(r) {
        RobloxLaunch.StartGameWork(n, t, i, r, u)
    }, e;
    r == "FETCH" ? (e = Roblox.Endpoints.getAbsoluteUrl("/Game/GetAuthTicket"),
    $.ajax({
        method: "GET",
        url: e,
        crossDomain: !0,
        xhrFields: {
            withCredentials: !0
        },
        headers: {
            "RBX-For-Gameauth": "true"
        }
    }).done(f)) : f(r)
}
,
RobloxLaunch.StartGameWork = function(n, t, i, r, u) {
    var o, f, s, e, h;
    i = i.replace("http://", "https://"),
    n.indexOf("http") >= 0 && (n = typeof RobloxLaunch.SeleniumTestMode == "undefined" ? n + "&testmode=false" : n + "&testmode=true"),
    GoogleAnalyticsEvents && GoogleAnalyticsEvents.ViewVirtual("Visit/Try/" + t),
    RobloxLaunch.state = RobloxLaunchStates.StartingClient,
    RobloxLaunch.googleAnalyticsCallback !== null && RobloxLaunch.googleAnalyticsCallback(),
    o = null;
    try {
        if (typeof window.external != "undefined" && window.external.IsRoblox2App && (n.indexOf("visit") != -1 || u))
            window.external.StartGame(r, i, n);
        else if (o = "RobloxProxy/",
        f = Roblox.Client.CreateLauncher(!0),
        f) {
            o = "RobloxProxy/StartGame/";
            try {
                try {
                    Roblox.Client.IsIE() ? f.AuthenticationTicket = r : f.Put_AuthenticationTicket(r),
                    u && f.SetEditMode()
                } catch (l) {}
                try {
                    if (Roblox.Client._silentModeEnabled)
                        f.SetSilentModeEnabled(!0),
                        s = Roblox.VideoPreRollDFP,
                        s && s.videoInitialized && s.isPlaying() && Roblox.Client.SetStartInHiddenMode(!0),
                        f.StartGame(i, n),
                        RobloxLaunch.CheckGameStarted(f, t);
                    else
                        throw new Error("silent mode is disabled, fall back");
                } catch (l) {
                    if (f.StartGame(i, n),
                    Roblox.Client._bringAppToFrontEnabled)
                        try {
                            f.BringAppToFront()
                        } catch (a) {}
                    Roblox.Client.ReleaseLauncher(f, !0, !1),
                    $.modal.close()
                }
            } catch (l) {
                Roblox.Client.ReleaseLauncher(f, !0, !1);
                throw l;
            }
        } else {
            try {
                parent.playFromUrl(n);
                return
            } catch (c) {}
            if (Roblox.Client.isRobloxBrowser())
                try {
                    window.external.StartGame(r, i, n)
                } catch (c) {
                    throw new Error("window.external fallback failed, Roblox must not be installed or IE cannot access ActiveX");
                }
            else
                throw new Error("launcher is null or undefined and external is missing");
            RobloxLaunch.state = RobloxLaunchStates.None,
            $.modal.close()
        }
    } catch (l) {
        if (GoogleAnalyticsEvents && GoogleAnalyticsEvents.ViewVirtual("Visit/CreateLauncher/" + Roblox.Client._whyIsRobloxLauncherNotCreated),
        e = l.message,
        e === "User cancelled")
            return GoogleAnalyticsEvents && GoogleAnalyticsEvents.ViewVirtual("Visit/UserCancelled/" + t),
            !1;
        try {
            h = new ActiveXObject("Microsoft.XMLHTTP")
        } catch (v) {
            e = "FailedXMLHTTP/" + e
        }
        return Roblox.Client.isRobloxBrowser() ? GoogleAnalyticsEvents && GoogleAnalyticsEvents.ViewVirtual("Visit/Fail/" + o + encodeURIComponent(e)) : (GoogleAnalyticsEvents && GoogleAnalyticsEvents.ViewVirtual("Visit/Redirect/" + o + encodeURIComponent(e)),
        window.location = RobloxLaunch.launchGamePage),
        !1
    }
    return GoogleAnalyticsEvents && GoogleAnalyticsEvents.ViewVirtual("Visit/Success/" + t),
    !0
}
,
RobloxLaunch.CheckGameStarted = function(n, t) {
    function u() {
        var e, o;
        try {
            if (r || (r = Roblox.Client.IsIE() ? n.IsGameStarted : n.Get_GameStarted()),
            r && !f && (EventTracker && EventTracker.endSuccess("StartClient"),
            EventTracker && EventTracker.endSuccess("Launch"),
            $("#PlaceLauncherStatusPanel").data("new-plugin-events-enabled") == "True" && (e = $("#PlaceLauncherStatusPanel").data("os-name"),
            e == "Windows" && (e = "Win32"),
            EventTracker && EventTracker.fireEvent("GameLaunchSuccessWeb_" + e),
            EventTracker && EventTracker.fireEvent("GameLaunchSuccessWeb_" + e + "_Plugin"),
            GoogleAnalyticsEvents && GoogleAnalyticsEvents.FireEvent(["Plugin", "Launch Success", t]),
            $("#PlaceLauncherStatusPanel").data("event-stream-for-plugin-enabled") == "True" && typeof Roblox.GamePlayEvents != "undefined" && Roblox.GamePlayEvents.SendClientStartSuccessWeb(null, play_placeId)),
            f = !0),
            o = Roblox.VideoPreRollDFP,
            r && !o.isPlaying()) {
                if (MadStatus.stop("Connecting to Players..."),
                RobloxLaunch.state = RobloxLaunchStates.None,
                $.modal.close(),
                i._cancelled = !0,
                Roblox.Client._hiddenModeEnabled && Roblox.Client.UnhideApp(),
                Roblox.Client._bringAppToFrontEnabled)
                    try {
                        n.BringAppToFront()
                    } catch (s) {}
                Roblox.Client.ReleaseLauncher(n, !0, !1),
                googletag.cmd.push(function() {
                    googletag.pubads().refresh()
                })
            } else
                i._cancelled || setTimeout(u, 1e3)
        } catch (h) {
            i._cancelled || setTimeout(u, 1e3)
        }
    }
    var f = !1, i = RobloxLaunch.launcher, r;
    i === null && (i = new RBX.PlaceLauncher("PlaceLauncherStatusPanel"),
    i._showDialog(),
    i._updateStatus(0)),
    r = !1,
    u()
}
,
RobloxLaunch.CheckRobloxInstall = function(n) {
    if (Roblox.Client.IsRobloxInstalled())
        return Roblox.Client.Update(),
        !0;
    window.location = n
}
,
RBX.PlaceLauncher = function(n) {
    this._cancelled = !1,
    this._popupID = n,
    this._popup = $("#" + n)
}
,
RBX.PlaceLauncher.prototype = {
    _showDialog: function() {
        var n, t, i;
        this._cancelled = !1,
        _popupOptions = {
            escClose: !0,
            opacity: 80,
            overlayCss: {
                backgroundColor: "#000"
            },
            zIndex: 1031
        },
        n = Roblox.VideoPreRollDFP,
        this._popupID == "PlaceLauncherStatusPanel" && (n && n.showVideoPreRoll ? (this._popup = $("#videoPrerollPanel"),
        _popupOptions.onShow = function(t) {
            n.correctIEModalPosition(t),
            n.start(),
            $("#prerollClose").hide(),
            $("#prerollClose").delay(1e3 * n.adTime + n.videoLoadingTimeout).show(300)
        }
        ,
        _popupOptions.onClose = function() {
            n.close()
        }
        ,
        _popupOptions.closeHTML = '<a href="#" id = "prerollClose" class="ImageButton closeBtnCircle_35h ABCloseCircle VprCloseButton"></a>') : (this._popup = $("#" + this._popupID),
        _popupOptions.onClose = function() {
            n.logVideoPreRoll(),
            $.modal.close()
        }
        )),
        t = this,
        setTimeout(function() {
            t._popup.modal(_popupOptions)
        }, 0),
        i = this,
        $(".CancelPlaceLauncherButton").click(function() {
            i.CancelLaunch()
        }),
        $(".CancelPlaceLauncherButton").show()
    },
    _onGameStatus: function(n) {
        if (this._cancelled) {
            EventTracker && EventTracker.endCancel("GetConnection"),
            EventTracker && EventTracker.endCancel("Launch");
            return
        }
        if (this._updateStatus(n.status),
        n.status === 2)
            EventTracker && EventTracker.endSuccess("GetConnection"),
            EventTracker && EventTracker.start("StartClient"),
            RobloxLaunch.StartGame(n.joinScriptUrl, "Join", n.authenticationUrl, n.authenticationTicket);
        else if (n.status < 2 || n.status === 6) {
            var t = function(n, t) {
                t._onGameStatus(n)
            }
              , i = function(n, t) {
                t._onGameError(n)
            }
              , r = this
              , u = function() {
                RobloxPlaceLauncherService.CheckGameJobStatus(n.jobId, t, i, r)
            };
            window.setTimeout(u, 2e3)
        } else
            n.status === 4 && (EventTracker && EventTracker.endFailure("GetConnection"),
            EventTracker && EventTracker.endFailure("Launch"))
    },
    _updateStatus: function(n) {
        MadStatus.running || (MadStatus.init($(this._popup).find(".MadStatusField"), $(this._popup).find(".MadStatusBackBuffer"), 2e3, 800),
        MadStatus.start());
        switch (n) {
        case 0:
            break;
        case 1:
            MadStatus.manualUpdate("A server is loading the game...", !0);
            break;
        case 2:
            MadStatus.manualUpdate("The server is ready. Joining the game...", !0, !1);
            break;
        case 3:
            MadStatus.manualUpdate("Joining games is temporarily disabled while we upgrade. Please try again soon.", !1);
            break;
        case 4:
            MadStatus.manualUpdate("An error occurred. Please try again later.", !1);
            break;
        case 5:
            MadStatus.manualUpdate("The game you requested has ended.", !1);
            break;
        case 6:
            MadStatus.manualUpdate("The game you requested is currently full. Waiting for an opening...", !0, !0);
            break;
        case 7:
            MadStatus.manualUpdate("Roblox is updating. Please wait...", !0);
            break;
        case 8:
            MadStatus.manualUpdate("Requesting a server", !0);
            break;
        case 10:
            MadStatus.manualUpdate("The user has left the game.", !1);
            break;
        case 11:
            MadStatus.manualUpdate("The game you requested is not available on your platform.", !1);
            break;
        case 12:
            MadStatus.manualUpdate("You are not authorized to join this game.", !1);
            break;
        default:
            MadStatus.stop("Connecting to Players...")
        }
        $(this._popup).find(".MadStatusStarting").css("display", "none"),
        $(this._popup).find(".MadStatusSpinner").css("visibility", n === 3 || n === 4 || n === 5 ? "hidden" : "visible")
    },
    _onGameError: function() {
        this._updateStatus(4)
    },
    _startUpdatePolling: function(n) {
        var t, i;
        try {
            if (RobloxLaunch.state = RobloxLaunchStates.Upgrading,
            t = Roblox.Client.CreateLauncher(!0),
            i = Roblox.Client.IsIE() ? t.IsUpToDate : t.Get_IsUpToDate(),
            i || i === undefined) {
                try {
                    t.PreStartGame()
                } catch (e) {}
                Roblox.Client.ReleaseLauncher(t, !0, !1),
                RobloxLaunch.state = RobloxLaunchStates.StartingServer,
                EventTracker && EventTracker.endSuccess("UpdateClient"),
                n();
                return
            }
            var r = function(t, i, r) {
                r._onUpdateStatus(t, i, n)
            }
              , u = function(n, t) {
                t._onUpdateError(n)
            }
              , f = this;
            this.CheckUpdateStatus(r, u, t, n, f)
        } catch (e) {
            Roblox.Client.ReleaseLauncher(t, !0, !1),
            EventTracker && EventTracker.endSuccess("UpdateClient"),
            n()
        }
    },
    _onUpdateStatus: function(n, t, i) {
        if (!this._cancelled)
            if (this._updateStatus(n),
            n === 8)
                Roblox.Client.ReleaseLauncher(t, !0, !0),
                Roblox.Client.Refresh(),
                RobloxLaunch.state = RobloxLaunchStates.StartingServer,
                EventTracker && EventTracker.endSuccess("UpdateClient"),
                i();
            else if (n === 7) {
                var u = function(n, t, r) {
                    r._onUpdateStatus(n, t, i)
                }
                  , f = function(n, t) {
                    t._onUpdateError(n)
                }
                  , r = this
                  , e = function() {
                    r.CheckUpdateStatus(u, f, t, i, r)
                };
                window.setTimeout(e, 2e3)
            }
    },
    _onUpdateError: function() {
        this._updateStatus(2)
    },
    CheckUpdateStatus: function(n, t, i, r, u) {
        try {
            if (i.PreStartGame(),
            Roblox.Client.IsIE())
                var f = i.IsUpToDate;
            else
                f = i.Get_IsUpToDate();
            f || f === undefined ? n(8, i, u) : n(7, i, u)
        } catch (e) {
            n(8, i, u)
        }
    },
    RequestGame: function(n, t) {
        var r;
        this._showDialog();
        var u = function(n, t) {
            t._onGameStatus(n)
        }
          , f = function(n, t) {
            t._onGameError(n)
        }
          , e = this
          , i = !1;
        return typeof Party != "undefined" && typeof Party.AmILeader == "function" && (i = Party.AmILeader()),
        typeof angular == "undefined" || angular.isUndefined(angular.element("#chat-container").scope()) || (i = angular.element("#chat-container").scope().isPartyLeader()),
        r = function() {
            EventTracker && EventTracker.start("GetConnection"),
            RobloxPlaceLauncherService.RequestGame(n, i, t, u, f, e)
        }
        ,
        this._startUpdatePolling(r),
        !1
    },
    RequestPrivateGame: function(n, t, i, r) {
        this._showDialog();
        var u = function(n, t) {
            t._onGameStatus(n)
        }
          , f = function(n, t) {
            t._onGameError(n)
        }
          , e = this
          , o = function() {
            EventTracker && EventTracker.start("GetConnection"),
            RobloxPlaceLauncherService.RequestPrivateGame(n, t, i, r, u, f, e)
        };
        return this._startUpdatePolling(o),
        !1
    },
    RequestPlayWithParty: function(n, t, i) {
        this._showDialog();
        var r = function(n, t) {
            t._onGameStatus(n)
        }
          , u = function(n, t) {
            t._onGameError(n)
        }
          , f = this
          , e = function() {
            EventTracker && EventTracker.start("GetConnection"),
            RobloxPlaceLauncherService.RequestPlayWithParty(n, t, i, r, u, f)
        };
        return this._startUpdatePolling(e),
        !1
    },
    RequestFollowUser: function(n) {
        this._showDialog();
        var t = function(n, t) {
            t._onGameStatus(n)
        }
          , i = function(n, t) {
            t._onError(n)
        }
          , r = this
          , u = function() {
            EventTracker && EventTracker.start("GetConnection"),
            RobloxPlaceLauncherService.RequestFollowUser(n, t, i, r)
        };
        return this._startUpdatePolling(u),
        !1
    },
    RequestGameJob: function(n, t) {
        this._showDialog();
        var i = function(n, t) {
            t._onGameStatus(n)
        }
          , r = function(n, t) {
            t._onGameError(n)
        }
          , u = this
          , f = function() {
            EventTracker && EventTracker.start("GetConnection"),
            RobloxPlaceLauncherService.RequestGameJob(n, t, i, r, u)
        };
        return this._startUpdatePolling(f),
        !1
    },
    CancelLaunch: function() {
        return this._cancelled = !0,
        $.modal.close(),
        !1
    },
    dispose: function() {
        RBX.PlaceLauncher.callBaseMethod(this, "dispose")
    }
};
;var Roblox = Roblox || {};
Roblox.Lang = Roblox.Lang || {},
Roblox.Lang["Feature.GameLaunchGuestMode"] = {
    "Action.Dialog.Close": "Close",
    "Action.Dialog.Login": "Log In",
    "Action.Dialog.Ok": "OK",
    "Action.Dialog.SignUp": "Sign Up",
    "Action.Dialog.SignUpNow": "Sign up now!",
    "Description.Dialog.SignUpOrLogin": "To play games, chat with friends, or customize your avatar, you'll need an account. Sign up for a free account or log in to play now.",
    "Description.Dialog.SignUpTodayOneDayRemaining": "You are playing in guest mode. To use all features available on Roblox, you will need to create an account. You have less than a day left before we require free sign up.",
    "Description.Dialog.SignUpTodaySomeDaysRemaining": "You are playing in guest mode. To use all features available on Roblox, you will need to create an account. You have less than {numDays} days left before we require free sign up.",
    "Description.Dialog.TrialOver": "Your trial period has ended. Please sign up to play games - it's free!",
    "Description.Dialog.YouArePlayingOneDayRemaining": "You are playing in guest mode. To use all features available on Roblox, you will need to create an account. You have 1 gameplay left before we require free sign up.",
    "Description.Dialog.YouArePlayingSomeDaysRemaining": "You are playing in guest mode. To use all features available on Roblox, you will need to create an account. You have {numDays} gameplays left before we require free sign up.",
    "Heading.ChooseAvatar": "Choose Your Avatar",
    "Heading.Dialog.SignUpOrLogin": "Sign up for a free account or log in!",
    "Heading.Dialog.SignUpToday": "Sign Up Today!",
    "Label.HaveAccount": "I have an account"
},
Roblox.Lang.GameLaunchGuestModeResources = Roblox.Lang["Feature.GameLaunchGuestMode"];
;Roblox = window.Roblox || {},
Roblox.GameLauncher = function() {
    function t(t, i, r) {
        n.gameLaunchInterface.editGameInStudio(t, i, r)
    }
    function r() {
        n.gameLaunchInterface.openStudio()
    }
    function u() {
        n.gameLaunchInterface.returnToStudio()
    }
    function f(t) {
        n.gameLaunchInterface.openPluginInStudio(t)
    }
    function i(t, i, r) {
        typeof i == "undefined" && (i = !0),
        r = r === !0;
        var u = {
            placeId: t,
            isPlayTogetherGame: r
        };
        return n.bcUpsellModalInterface.checkBcRequirement(u, i).then(n.authenticationChecker.restrictGuests).then(n.prerollPlayer.waitForPreroll).then(n.gameLaunchInterface.joinMultiplayerGame)
    }
    function e(t) {
        var i = {
            userId: t
        };
        return n.authenticationChecker.restrictGuests(i).then(n.prerollPlayer.waitForPreroll).then(n.gameLaunchInterface.followPlayerIntoGame)
    }
    function o(t, i, r, u) {
        u = u === !0;
        var f = {
            placeId: t,
            gameId: i,
            isPlayTogetherGame: u
        };
        return n.authenticationChecker.restrictGuests(f).then(n.prerollPlayer.waitForPreroll).then(n.gameLaunchInterface.joinGameInstance)
    }
    function s(t, i, r) {
        var u = {
            placeId: t,
            accessCode: i,
            linkCode: r
        };
        return n.prerollPlayer.waitForPreroll(u).then(n.gameLaunchInterface.joinPrivateGame)
    }
    function h(t, i) {
        var r = {
            placeId: t,
            conversationId: i
        };
        return n.bcUpsellModalInterface.checkBcRequirement(r, !0).then(n.authenticationChecker.restrictGuests).then(n.prerollPlayer.waitForPreroll).then(n.gameLaunchInterface.playTogetherGame)
    }
    $(function() {
        n.gameLaunchLogger || typeof Roblox.GameLaunchLogger == "undefined" || (n.gameLaunchLogger = Roblox.GameLaunchLogger),
        n.authenticationChecker || typeof Roblox.AuthenticationChecker == "undefined" || (n.authenticationChecker = Roblox.AuthenticationChecker),
        n.prerollPlayer || typeof Roblox.PrerollPlayer == "undefined" || (n.prerollPlayer = Roblox.PrerollPlayer),
        n.bcUpsellModalInterface || typeof Roblox.BCUpsellModalInterface == "undefined" || (n.bcUpsellModalInterface = Roblox.BCUpsellModalInterface),
        $("body").bindGameLaunch()
    }),
    $.fn.bindGameLaunch = function() {
        return this.find(".VisitButtonPlayGLI").click(function() {
            var n = $(this)
              , t = n.attr("placeid")
              , r = n.data("is-membership-level-ok");
            i(t, r)
        }),
        this.find(".VisitButtonEditGLI").click(function() {
            var n = $(this)
              , i = n.attr("placeid")
              , r = n.data("universeid")
              , u = n.data("allowupload") ? !0 : !1;
            t(i, r, u)
        }),
        this
    }
    ;
    var n = {
        authenticationChecker: null,
        prerollPlayer: null,
        gameLaunchLogger: null,
        gameLaunchInterface: null,
        bcUpsellModalInterface: null,
        joinMultiplayerGame: i,
        openStudio: r,
        returnToStudio: u,
        openPluginInStudio: f,
        editGameInStudio: t,
        followPlayerIntoGame: e,
        joinGameInstance: o,
        joinPrivateGame: s,
        playTogetherGame: h,
        startClientAttemptedEvent: "startClientAttempted",
        startClientFailedEvent: "startClientFailed",
        startClientSucceededEvent: "startClientSucceeded",
        beginInstallEvent: "beginInstall",
        successfulInstallEvent: "successfulInstall",
        manualDownloadEvent: "manualDownload"
    };
    return n
}(),
Roblox.AuthenticationChecker = function() {
    function r(t) {
        var r = "gameDetails", i;
        Roblox.FormEvents && Roblox.FormEvents.SendInteractionClick(r, t),
        i = n.signupUrl + encodeURIComponent(window.location.pathname + window.location.search),
        window.location.href = Roblox && Roblox.Endpoints ? Roblox.Endpoints.getAbsoluteUrl(i) : i
    }
    function u(u) {
        var f = new $.Deferred;
        return $("#PlaceLauncherStatusPanel").data("is-user-logged-in") == "True" ? (f.resolve(u),
        f) : (Roblox.Dialog.open({
            titleText: t.f(i["Heading.Dialog.SignUpOrLogin"]),
            bodyContent: t.f(i["Description.Dialog.SignUpOrLogin"]),
            cssClass: n.modalClassName,
            acceptColor: Roblox.Dialog.green,
            acceptText: t.f(i["Action.Dialog.SignUp"]),
            declineText: t.f(i["Action.Dialog.Login"]),
            onDecline: function() {
                Roblox.FormEvents && Roblox.FormEvents.SendInteractionClick(n.eventContext, n.loginField);
                var t = n.loginUrl + encodeURIComponent(window.location.pathname + window.location.search);
                window.location.href = Roblox && Roblox.Endpoints ? Roblox.Endpoints.getAbsoluteUrl(t) : t
            },
            onAccept: function() {
                r(n.signupField)
            }
        }),
        f)
    }
    var t = new Roblox.Intl
      , i = Roblox.Lang && Roblox.Lang.GameLaunchGuestModeResources
      , n = {
        modalClassName: "soli-modal",
        loginUrl: "/login?returnurl=",
        signupUrl: "/?returnurl=",
        eventContext: "gameDetails",
        loginField: "gameLaunch_login",
        signupField: "gameLaunch_signup"
    };
    return {
        restrictGuests: u
    }
}(),
Roblox.PrerollPlayer = {
    waitForPreroll: function(n) {
        var r = new $.Deferred, t = Roblox.VideoPreRollDFP, i, u;
        return t.placeId = typeof n.placeId != "undefined" ? n.placeId : 0,
        t && t.showVideoPreRoll ? (i = {
            escClose: !0,
            opacity: 80,
            overlayCss: {
                backgroundColor: "#000"
            },
            zIndex: 1031
        },
        i.onShow = function(n) {
            t.correctIEModalPosition(n),
            t.start(),
            $("#prerollClose").hide(),
            $("#prerollClose").delay(1e3 * t.adTime).show(300)
        }
        ,
        i.onClose = function() {
            t.close()
        }
        ,
        i.closeHTML = '<a href="#" id="prerollClose" class="ImageButton closeBtnCircle_35h ABCloseCircle VprCloseButton"></a>',
        $("#videoPrerollPanel").modal(i),
        u = setInterval(function() {
            t.isPlaying() || ($.modal.close(),
            clearInterval(u),
            t.videoCancelled ? r.reject(n) : r.resolve(n))
        }, 200)) : (r.resolve(n),
        t.logVideoPreRoll()),
        r
    }
},
Roblox.BCUpsellModalInterface = {
    checkBcRequirement: function(n, t) {
        var i = new $.Deferred;
        return t ? i.resolve(n) : typeof Roblox.BCUpsellModal != "undefined" ? (Roblox.BCUpsellModal.open(),
        i.reject(n)) : typeof showBCOnlyModal != "undefined" ? (showBCOnlyModal(),
        i.reject(n)) : i.resolve(n),
        i
    }
};
;Roblox = window.Roblox || {},
Roblox.GameLaunchLogger = function() {
    function u(n) {
        r.logToConsoleEnabled && console && console.log && console.log(n)
    }
    function f(n, t) {
        if (r.logToEphemeralCountersEnabled) {
            var i = h();
            i == "Windows" && (i = "Win32"),
            n = n.replace("<os>", i),
            n = n.replace("<launchmethod>", t),
            typeof EventTracker != "undefined" && EventTracker && EventTracker.fireEvent && EventTracker.fireEvent(n)
        }
    }
    function e(n, t, i, u) {
        typeof GoogleAnalyticsEvents != "undefined" && r.logToGAEnabled && GoogleAnalyticsEvents && GoogleAnalyticsEvents.FireEvent && GoogleAnalyticsEvents.FireEvent([n, t, i, u])
    }
    function o(r, o) {
        u(r.type + ": " + JSON.stringify(o)),
        i[r.type] && $.each(i[r.type], function(n, t) {
            f(t, o.launchMethod)
        }),
        n[r.type] && e(o.launchMethod, n[r.type], s(o), 0),
        $("#PlaceLauncherStatusPanel").data("event-stream-for-protocol-enabled") == "True" && t[r.type] && t[r.type](null, o.params.placeId)
    }
    function s(n) {
        return n.params.launchMode
    }
    function h() {
        return $("#PlaceLauncherStatusPanel").data("os-name")
    }
    var i, n, t, r;
    return $(function() {
        var n = [Roblox.GameLauncher.startClientAttemptedEvent, Roblox.GameLauncher.startClientFailedEvent, Roblox.GameLauncher.startClientSucceededEvent, Roblox.GameLauncher.beginInstallEvent, Roblox.GameLauncher.successfulInstallEvent, Roblox.GameLauncher.manualDownloadEvent];
        $(Roblox.GameLauncher).on(n.join(" "), o)
    }),
    i = {},
    i[Roblox.GameLauncher.startClientAttemptedEvent] = ["GameLaunchAttempt_<os>", "GameLaunchAttempt_<os>_<launchmethod>"],
    i[Roblox.GameLauncher.startClientSucceededEvent] = ["GameLaunchSuccessWeb_<os>", "GameLaunchSuccessWeb_<os>_<launchmethod>"],
    n = {},
    Roblox.GaEventSettings.gaLaunchAttemptAndLaunchSuccessEnabled && (n[Roblox.GameLauncher.startClientAttemptedEvent] = "Launch Attempt",
    n[Roblox.GameLauncher.startClientSucceededEvent] = "Launch Success"),
    n[Roblox.GameLauncher.beginInstallEvent] = "Install Begin",
    n[Roblox.GameLauncher.successfulInstallEvent] = "Install Success",
    n[Roblox.GameLauncher.manualDownloadEvent] = "Manual Download",
    t = {},
    typeof Roblox.GamePlayEvents != "undefined" && (t[Roblox.GameLauncher.startClientAttemptedEvent] = Roblox.GamePlayEvents.SendClientStartAttempt,
    t[Roblox.GameLauncher.startClientSucceededEvent] = Roblox.GamePlayEvents.SendClientStartSuccessWeb,
    t[Roblox.GameLauncher.beginInstallEvent] = Roblox.GamePlayEvents.SendInstallBegin,
    t[Roblox.GameLauncher.successfulInstallEvent] = Roblox.GamePlayEvents.SendInstallSuccess,
    t[Roblox.GameLauncher.manualDownloadEvent] = Roblox.GamePlayEvents.SendManualDownloadClick),
    r = {
        logToConsoleEnabled: !1,
        logToGAEnabled: !0,
        logToEphemeralCountersEnabled: !0,
        logToConsole: u,
        logToEphemeralCounters: f,
        logToGA: e
    }
}();
;var Roblox = Roblox || {};
Roblox.Lang = Roblox.Lang || {},
Roblox.Lang["Common.VisitGame"] = {
    "Action.GamePerformPoorly": "{warning} This game may perform poorly on your device.",
    "Action.Retry": "Retry",
    "Heading.ErrorStartingGame": "Error starting game",
    "Heading.SwitchToDesktopToPlay": "Switch to Desktop Mode to Play Games",
    "Label.BuyAccess": "Buy Access for {robux} Robux",
    "Label.Cancel": "Cancel",
    "Label.CheckingForStudio": "Checking for Roblox Studio...",
    "Label.ClickHereForHelp": "Click here for help",
    "Label.ConnectingToPlayers": "Connecting to Players...",
    "Label.DevelopPageTitle": "Develop",
    "Label.DownloadInstallRoblox": "Download and Install Roblox",
    "Label.DownloadStudio": "Download Studio",
    "Label.GameConfigurePageTitle": "Game Configure",
    "Label.GameFreeSoothsayer": "Free because you are a soothsayer",
    "Label.GameIsPrivatePlayableByGroupOnly": "Only developers can play because this game is private. Make it public on the {linkStart}Configure Game{linkEnd} page.",
    "Label.GameIsPrivatePlayableByOwnerOnly": "Only you can play because this game is private. Make it public on the {linkStart}Configure Game{linkEnd} page.",
    "Label.GameUnavailableAccountResrictions": "The game is unavailable due to account restrictions settings.",
    "Label.GameUnavailableCannotPlayGamesStudio": "You cannot play games from Studio. Please use a web browser to play this game.",
    "Label.GameUnavailableClosedToVisitors": "Sorry, this place is currently closed to visitors.",
    "Label.GameUnavailableCurrentlyIsPrivateGroup": "Only developers can play because this game is private. Make it public on the {linkStart}Develop{linkEnd} page.",
    "Label.GameUnavailableCurrentlyIsPrivateOwner": "Only you can play because this game is private. Make it public on the {linkStart}Develop{linkEnd} page.",
    "Label.GameUnavailableCurrentlyIsPrivateVisitor": "Sorry, this game is private.",
    "Label.GameUnavailableCurrentlyPrivate": "This {gameTypeName} is currently private. Make it public on the {developPageLink} page to make it playable.",
    "Label.GameUnavailableGameInsecure": "Sorry, your account is restricted from playing Experimental Games unless you are friends with the creator.",
    "Label.GameUnavailableNoRootPlace": "This place is part of a game that has no root place. Add a root place on the {gameConfigureLink} page to make it playable.",
    "Label.GameUnavailablePermissionLevels": "The permission levels on this place prevent you from entering.",
    "Label.GameUnavailablePlaceNotPartOfGame": "This place is not currently part of a Game. Add it to a game on the {developPageLink} page to make it playable.",
    "Label.GameUnavailablePlaceUnderReview": "Sorry, this place is currently under review. Try again later.",
    "Label.GameUnavailablePlatform": "This game is not available on your platform.  Check the games page to see all playable games.",
    "Label.GameWarning": "Warning",
    "Label.InstallationInstructions": "Installation Instructions",
    "Label.LaunchApplication": "Launch Application",
    "Label.OperaInstallSteps": "1) A window will open. Click {startBold}Open{endBold}.{breakLine}2) Doubleclick the Roblox icon.",
    "Label.PersuadeToDevelopRoblox": "Get started creating your own games!",
    "Label.PersuadeToInstallRoblox": "You're moments away from getting into the game!",
    "Label.Play": "Play",
    "Label.PlayInApp": "Play in App",
    "Label.RobloxLoadingToPlay": "Roblox is now loading. Get ready to play!",
    "Label.StartingRoblox": "Starting Roblox...",
    "Label.SwitchToDesktopMode": "Switch to Desktop Mode",
    "Label.UniverseConfigurePageTitle": "Universe Configuration",
    "Response.CheckAlwaysOpenRoblox": "Check {startBold}Always open links for Roblox{endBold} and click {startBold2}Open Roblox{endBold2} in the dialog box above to join games faster in the future!",
    "Response.CheckAlwaysOpenRobloxURL": "Check {startBold}Always open links for URL: Roblox Protocol{endBold} and click {startBold2}Open URL: Roblox Protocol{endBold2} in the dialog box above to join games faster in the future!",
    "Response.CheckRememberMyChoiceOK": "Check {startBold}Remember my choice{endBold} and click {startBold2}OK{endBold2} in the dialog box above to join games faster in the future!",
    "Response.Dialog.ClickHere": "Click here!",
    "Response.Dialog.ErrorLaunching": "An error occurred trying to launch the game.  Please try again later.",
    "Response.Dialog.HavingTroubleInstallQuestion": "Having trouble installing Roblox?",
    "Response.Dialog.InstallingMessageWithLink": "The Roblox installer should download shortly. If it doesn’t, start the {linkStart}download now.{linkEnd}",
    "Response.Dialog.MacChromeFifthInstruction": "After installation, click {startBold}Play{endBold} below to join the action!",
    "Response.Dialog.MacChromeFirstInstruction": "Click {startBold}Roblox.dmg{endBold} to run the Roblox installer, which just downloaded via your web browser.",
    "Response.Dialog.MacChromeFourthInstruction": "Click {startBold}Ok{endBold} once you've successfully installed Roblox.",
    "Response.Dialog.MacChromeSecondInstruction": "Double-click the Roblox app icon to begin the installation process.",
    "Response.Dialog.MacChromeThirdInstruction": "Click {startBold}Open{endBold} when prompted by your computer.",
    "Response.Dialog.MacFirefoxFifthInstruction": "Then select the {startBold}Remember my choice...{endBold} checkbox and click {startBold2}OK{endBold2}",
    "Response.Dialog.MacFirefoxFirstInstruction": "Select {startBold}Open with{endBold} and click {startBold2}OK{endBold2}",
    "Response.Dialog.MacFirefoxFourthInstruction": "Once installed, click {startBold}Play{endBold} to join the action!",
    "Response.Dialog.MacFirefoxSecondInstruction": "Double-click the {startBold}Roblox Icon{endBold} to begin the installation process",
    "Response.Dialog.MacFirefoxThirdInstruction": "You will receive a warning, click {startBold}Open{endBold}",
    "Response.Dialog.MacSafariFirstInstruction": "Go to Downloads and double-click {startBold}Roblox.dmg{endBold}",
    "Response.Dialog.MacSafariFourthInstruction": "Once installed, click {startBold}Play{endBold} to join the action!",
    "Response.Dialog.MacSafariSecondInstruction": "Double-click the {startBold}Roblox Icon{endBold} to begin the installation process",
    "Response.Dialog.MacSafariThirdInstruction": "You will receive a warning, click {startBold}Open{endBold}",
    "Response.Dialog.PcChromeFirstInstruction": "Click {startBold}RobloxPlayer.exe{endBold} to run the Roblox installer, which just downloaded via your web browser.",
    "Response.Dialog.PcChromeFourthInstruction": "After installation, click {startBold}Play{endBold} below to join the action!",
    "Response.Dialog.PcChromeSecondInstruction": "Click {startBold}Run{endBold} when prompted by your computer to begin the installation process.",
    "Response.Dialog.PcChromeThirdInstruction": "Click {startBold}Ok{endBold} once you've successfully installed Roblox.",
    "Response.Dialog.PcEdgeFirstInstruction": "Click {startBold}Run{endBold} to install Roblox after the download finishes",
    "Response.Dialog.PcEdgeSecondInstruction": "Click {startBold}Ok{endBold} to finish installing Roblox",
    "Response.Dialog.PcEdgeThirdInstruction": "Click the {startBold}Play{endBold} button to join the action!",
    "Response.Dialog.PcFirefoxFifthInstruction": "Click {startBold}Ok{endBold} when the alert pops up",
    "Response.Dialog.PcFirefoxFirstInstruction": "Click {startBold}Save File{endBold} when the download window pops up",
    "Response.Dialog.PcFirefoxFourthInstruction": "Once installed, click {startBold}Play{endBold} to join the action!",
    "Response.Dialog.PcFirefoxSecondInstruction": "Go to Downloads and double click {startBold}RobloxPlayer.exe{endBold}",
    "Response.Dialog.PcFirefoxThirdInstruction": "Click {startBold}Run{endBold}",
    "Response.Dialog.PcIEFirstInstruction": "You will receive a warning, click {startBold}Run{endBold}",
    "Response.Dialog.PcIeInstructionOne": "You will receive a warning, click {startBold}Run{endBold}",
    "Response.Dialog.PcIeInstructionThree": "Click {startBold}Run{endBold}",
    "Response.Dialog.PcIeInstructionTwo": "Go to Downloads and double click {startBold}RobloxPlayer.exe{endBold}",
    "Response.Dialog.PcIESecondInstruction": "Click {startBold}Ok{endBold} once you've installed Roblox",
    "Response.Dialog.PcIEThirdInstruction": "Once installed, click {startBold}Play{endBold} to join the action!",
    "Response.Dialog.ThanksForPlayingRoblox": "Thanks for playing Roblox",
    "Response.GameTemporarilyUnavailable": "Unable to verify that you have access to this game.  Please try again later.",
    "Response.RememberMyChoiceAppLaunch": "Check {startBold}Remember my choice{endBold} and click {appLaunchLink} in the dialog box above to join games faster in the future!"
},
Roblox.Lang.VisitGameResources = Roblox.Lang["Common.VisitGame"];
;Roblox = Roblox || {},
Roblox.ProtocolHandlerImplementation = function() {
    function ut(n, t) {
        var i = function() {
            clearTimeout(r),
            n()
        }, r;
        ct(i, t.launchMode),
        r = setTimeout(function() {
            $.modal.close(),
            at(i, t)
        }, 5e3)
    }
    function ct(n, t) {
        var e = Roblox.PlaceLauncher.Resources.RefactorEnabled === "True", r = t === i.edit || t === i.plugin, u, f;
        if (e) {
            u = r ? Roblox.PlaceLauncher.Resources.ProtocolHandlerStartingDialog.studio.content : Roblox.PlaceLauncher.Resources.ProtocolHandlerStartingDialog.play.content,
            f = Roblox.PlaceLauncher.Resources.ProtocolHandlerStartingDialog.loader,
            Roblox.Dialog.open({
                bodyContent: u + f,
                allowHtmlContentInBody: !0,
                showAccept: !1,
                showDecline: !1,
                dismissable: !1,
                cssClass: "protocolhandler-starting-modal",
                onCloseCallback: n,
                onCancel: function() {
                    n(),
                    $.modal.close()
                }
            });
            return
        }
        r ? $(".protocol-handler-container").each(function() {
            $(this).find(".play-modal").addClass("hidden"),
            $(this).find(".studio-modal").removeClass("hidden")
        }) : $(".protocol-handler-container").each(function() {
            $(this).find(".play-modal").removeClass("hidden"),
            $(this).find(".studio-modal").addClass("hidden")
        }),
        $("#ProtocolHandlerStartingDialog").modal({
            escClose: !0,
            opacity: 80,
            overlayCss: {
                backgroundColor: "#000"
            },
            onClose: function() {
                n(),
                $.modal.close()
            },
            zIndex: 1031
        })
    }
    function it() {
        $.modal.close(),
        Roblox.Dialog.open({
            titleText: Roblox.Lang.VisitGameResources["Heading.ErrorStartingGame"],
            bodyContent: Roblox.Lang.VisitGameResources["Response.Dialog.ErrorLaunching"],
            acceptText: Roblox.Lang.ControlsResources["Action.OK"] || "OK",
            showDecline: !1
        })
    }
    function o(n) {
        var t = n.launchMode
          , r = t === i.edit || t === i.plugin;
        $.modal.close(),
        r || (Roblox.Dialog.open({
            titleText: $("#InstallationInstructions .ph-modal-header .title").text(),
            allowHtmlContentInBody: !0,
            bodyContent: $("#InstallationInstructions .modal-content-container").html(),
            allowHtmlContentInFooter: !0,
            footerText: $("#InstallationInstructions .xsmall").html(),
            acceptColor: Roblox.Dialog.none,
            declineColor: Roblox.Dialog.none,
            cssClass: "install-instructions-modal",
            xToCancel: !0,
            onCloseCallback: function() {
                $("#ProtocolHandlerClickAlwaysAllowed").hide()
            }
        }),
        setTimeout(function() {
            $(".VisitButtonContinueGLI a").removeClass("disabled").click(n, lt)
        }, 5e3)),
        v(n, r)
    }
    function at(n, t) {
        var f = Roblox.PlaceLauncher.Resources.RefactorEnabled === "True", u = t.launchMode, e = u === i.edit || u === i.plugin, r;
        if (f) {
            r = e ? Roblox.PlaceLauncher.Resources.ProtocolHandlerAreYouInstalled.studio : Roblox.PlaceLauncher.Resources.ProtocolHandlerAreYouInstalled.play,
            Roblox.Dialog.open({
                bodyContent: r.content,
                allowHtmlContentInBody: !0,
                showAccept: !0,
                acceptColor: Roblox.Dialog.green,
                acceptText: r.buttonText,
                showDecline: !1,
                dismissable: !1,
                xToCancel: !0,
                footerText: r.footerContent,
                allowHtmlContentInFooter: !0,
                onAccept: function() {
                    o(t)
                },
                cssClass: "protocolhandler-are-you-installed-modal"
            });
            return
        }
        $("#ProtocolHandlerAreYouInstalled").modal({
            escClose: !0,
            opacity: 80,
            overlayCss: {
                backgroundColor: "#000"
            },
            onClose: function() {
                n(),
                $("#ProtocolHandlerInstallButton").off("click"),
                $.modal.close()
            },
            zIndex: 1031
        }),
        $("#ProtocolHandlerInstallButton, #ProtocolHandlerStudioInstallButton").click(function() {
            o(t)
        })
    }
    function lt(n) {
        var i = $(this), t;
        return i.hasClass("disabled") || (c(n.data),
        t = $("#ProtocolHandlerClickAlwaysAllowed"),
        typeof t.data("hideRememberOverlay") == "undefined" && t.show()),
        !1
    }
    function t(t) {
        return t.launchTime = +new Date,
        t.otherParams.browsertrackerid = Roblox.Cookies.getBrowserTrackerId(),
        n.sendingLocalesEnabled && (t.otherParams.robloxLocale = n.robloxLocale,
        t.otherParams.gameLocale = n.gameLocale),
        $(Roblox.GameLauncher).trigger(Roblox.GameLauncher.startClientAttemptedEvent, {
            launchMethod: "Protocol",
            params: t
        }),
        n.showDialog(function() {}, t),
        $.when(ft(t), et()).then(c, n.showLaunchFailureDialog).then(ht).then(n.cleanUpAndLogSuccess, n.cleanUpAndLogFailure)
    }
    function ht(n) {
        var t = new $.Deferred;
        return clearInterval(e),
        e = setInterval(function() {
            var i = Roblox.Endpoints.getAbsoluteUrl("/client-status");
            $.ajax(i, {
                success: function(i) {
                    i != "Unknown" && (t.resolve(n),
                    clearInterval(e))
                },
                cache: !1
            })
        }, 3e3),
        t
    }
    function st(n) {
        $.modal.close();
        var t = {
            launchMethod: "Protocol",
            params: n
        };
        $(Roblox.GameLauncher).trigger(Roblox.GameLauncher.startClientSucceededEvent, t),
        f && ($(Roblox.GameLauncher).trigger(Roblox.GameLauncher.successfulInstallEvent, t),
        f = !1)
    }
    function ot() {}
    function et() {
        var n = Roblox.Endpoints.getAbsoluteUrl("/client-status/set?status=Unknown");
        return $.ajax({
            method: "POST",
            url: n
        })
    }
    function ft(n) {
        return h().then(function(t) {
            var i = new $.Deferred;
            return n.gameInfo = t,
            i.resolve(n),
            i
        })
    }
    function h() {
        var n = Roblox.Endpoints.getAbsoluteUrl("/game-auth/getauthticket");
        return $.ajax({
            method: "GET",
            url: n,
            headers: {
                "RBX-For-Gameauth": "true"
            }
        })
    }
    function c(t) {
        var f = new $.Deferred
          , e = n.protocolUrlSeparator
          , u = t.protocolName + ":"
          , r = [];
        return r.push(1),
        r.push("launchmode:" + t.launchMode),
        t.gameInfo && (t.protocolName !== n.protocolNameForStudio || t.gameInfo.indexOf("Guest:") !== 0) && r.push("gameinfo:" + encodeURIComponent(t.gameInfo)),
        n.protocolUrlIncludesLaunchTime && r.push("launchtime:" + t.launchTime),
        Roblox.PlaceLauncher.Resources.IsProtocolHandlerBaseUrlParamEnabled === "True" && t.launchMode === i.play && r.push("baseUrl:" + encodeURIComponent("https:" + window.location.host)),
        $.each(t.otherParams, function(n, t) {
            n === t ? r.push(n) : r.push(n + ":" + encodeURIComponent(t))
        }),
        u += r.join(e),
        Roblox.GameLauncher.gameLaunchLogger.logToConsole("launchProtocolUrl: " + JSON.stringify({
            url: u,
            params: t
        })),
        n.setLocationHref(u),
        f.resolve(t),
        f
    }
    function yt(t) {
        if (n.protocolDetectionEnabled && typeof navigator.msLaunchUri != "undefined")
            navigator.msLaunchUri(t, function() {}, function() {});
        else {
            var i = $("iframe#gamelaunch");
            i.length > 0 && i.remove(),
            i = $("<iframe id='gamelaunch' class='hidden'></iframe>").attr("src", t),
            $("body").append(i)
        }
    }
    function r(n, t) {
        var i = " ", u, f, r;
        return Roblox.Endpoints && Roblox.Endpoints.Urls && (i = Roblox.Endpoints.getAbsoluteUrl("/Game/PlaceLauncher.ashx") + "?"),
        i[0] != "h" && (u = "http://" + window.location.host,
        f = "/Game/PlaceLauncher.ashx?",
        i = u + f),
        i = i.replace("placelauncher", "PlaceLauncher"),
        r = {
            request: n,
            browserTrackerId: Roblox.Cookies.getBrowserTrackerId()
        },
        $.extend(r, t),
        i + $.param(r)
    }
    function rt(n, t, i) {
        return tt("Edit.ashx", n, t, i)
    }
    function tt(n, t, i, r) {
        var u = " ", f, e, o;
        return typeof Roblox.Endpoints != typeof undefined && typeof Roblox.Endpoints.Urls != typeof undefined && (u = Roblox.Endpoints.getAbsoluteUrl("/Game/" + n) + "?"),
        u[0] != "h" && (f = "http://" + window.location.host,
        e = "/Game/" + n + "?",
        u = f + e),
        o = {
            placeId: t,
            upload: r ? t : "",
            universeId: i,
            testMode: !1
        },
        u + $.param(o)
    }
    function vt() {
        var i = {};
        return n.avatarParamEnabled && (i.avatar = "avatar"),
        t({
            protocolName: n.protocolNameForStudio,
            launchMode: "edit",
            otherParams: i
        })
    }
    function nt() {
        var i = {
            task: "ReturnFromLogin"
        };
        return n.avatarParamEnabled && (i.avatar = "avatar"),
        t({
            protocolName: n.protocolNameForStudio,
            launchMode: "edit",
            otherParams: i
        })
    }
    function g(i) {
        var r = {
            pluginid: i
        };
        n.avatarParamEnabled && (r.avatar = "avatar"),
        t({
            protocolName: n.protocolNameForStudio,
            launchMode: "plugin",
            otherParams: r
        })
    }
    function d(i, r, u) {
        var f, e;
        n.separateScriptParamsEnabled ? f = {
            task: "EditPlace",
            placeId: i,
            universeId: r
        } : (e = rt(i, r, u),
        f = {
            script: e
        }),
        n.avatarParamEnabled && (f.avatar = "avatar"),
        t({
            protocolName: n.protocolNameForStudio,
            launchMode: "edit",
            otherParams: f,
            placeId: i
        })
    }
    function k(i) {
        var u = n.protocolNameForClient
          , f = "play"
          , e = r("RequestGame", i)
          , o = i.isPlayTogetherGame === !0
          , s = {
            placelauncherurl: e
        }
          , h = {
            protocolName: u,
            launchMode: f,
            otherParams: s,
            placeId: i.placeId,
            isPlayTogetherGame: o
        };
        return t(h)
    }
    function b(i) {
        var u = n.protocolNameForClient
          , f = "play"
          , e = r("RequestFollowUser", i)
          , o = {
            placelauncherurl: e
        }
          , s = {
            protocolName: u,
            launchMode: f,
            otherParams: o
        };
        return t(s)
    }
    function w(i) {
        var u = n.protocolNameForClient
          , f = "play"
          , e = r("RequestGameJob", i)
          , o = i.isPlayTogetherGame === !0
          , s = {
            placelauncherurl: e
        }
          , h = {
            protocolName: u,
            launchMode: f,
            otherParams: s,
            placeId: i.placeId,
            isPlayTogetherGame: o
        };
        return t(h)
    }
    function p(i) {
        var u = n.protocolNameForClient
          , f = "play"
          , e = r("RequestPrivateGame", i)
          , o = {
            placelauncherurl: e
        }
          , s = {
            protocolName: u,
            launchMode: f,
            otherParams: o,
            placeId: i.placeId
        };
        return t(s)
    }
    function y(i) {
        var u = n.protocolNameForClient
          , f = "play"
          , e = r("RequestPlayTogetherGame", i)
          , o = {
            placelauncherurl: e
        }
          , s = {
            protocolName: u,
            launchMode: f,
            otherParams: o,
            placeId: i.placeId,
            conversationId: i.conversationId
        };
        return t(s)
    }
    function v(n, t) {
        var i = n.gameInfo;
        typeof n.gameInfo != "undefined" && (n.gameInfo = undefined),
        $(Roblox.GameLauncher).trigger(Roblox.GameLauncher.beginInstallEvent, {
            launchMethod: "Protocol",
            params: n
        }),
        f = !0,
        n.url = window.location.href,
        typeof i != "undefined" && (n.gameInfo = i),
        t ? l() : u()
    }
    function s() {
        $(Roblox.GameLauncher).trigger(Roblox.GameLauncher.manualDownloadEvent, {
            launchMethod: "Protocol",
            params: {}
        }),
        u()
    }
    function a() {
        $("body #GameLaunchManualInstallLink").click(function() {
            return s(),
            !1
        })
    }
    function l() {
        var n = document.getElementById("downloadInstallerIFrame");
        n.src = "/install/setupStudio.ashx"
    }
    function u() {
        var n = document.getElementById("downloadInstallerIFrame");
        n.src = "/install/setup.ashx"
    }
    var f = !1
      , e = 0
      , i = {
        edit: "edit",
        plugin: "plugin",
        play: "play",
        build: "build"
    }
      , n = {
        waitTimeBeforeFailure: 300,
        protocolNameForStudio: "roblox-studio",
        protocolNameForClient: "roblox-client",
        protocolUrlSeparator: "+",
        protocolUrlIncludesLaunchTime: !1,
        protocolDetectionEnabled: !1,
        launchModes: i,
        separateScriptParamsEnabled: !1,
        avatarParamEnabled: !0,
        sendingLocalesEnabled: !1,
        robloxLocale: "",
        gameLocale: "",
        joinMultiplayerGame: k,
        openStudio: vt,
        returnToStudio: nt,
        openPluginInStudio: g,
        editGameInStudio: d,
        followPlayerIntoGame: b,
        joinGameInstance: w,
        joinPrivateGame: p,
        playTogetherGame: y,
        manualDownload: s,
        attachManualDownloadToLink: a,
        startDownload: u,
        setLocationHref: yt,
        doAuthTicketRequest: h,
        showDialog: ut,
        showLaunchFailureDialog: it,
        cleanUpAndLogSuccess: st,
        cleanUpAndLogFailure: ot
    };
    return $(function() {
        Roblox.GameLauncher.gameLaunchInterface = Roblox.ProtocolHandlerClientInterface;
        var t = $("#PlaceLauncherStatusPanel");
        n.protocolNameForClient = t.data("protocol-name-for-client"),
        n.protocolNameForStudio = t.data("protocol-name-for-studio"),
        n.protocolUrlIncludesLaunchTime = t.data("protocol-url-includes-launchtime"),
        n.protocolDetectionEnabled = t.data("protocol-detection-enabled"),
        n.separateScriptParamsEnabled = t.data("protocol-separate-script-parameters-enabled"),
        n.avatarParamEnabled = t.data("protocol-avatar-parameter-enabled"),
        n.sendingLocalesEnabled = t.data("protocol-sending-locales-enabled"),
        n.robloxLocale = t.data("protocol-roblox-locale"),
        n.gameLocale = t.data("protocol-game-locale"),
        n.logger || typeof Roblox.ProtocolHandlerLogger == "undefined" || (n.logger = Roblox.ProtocolHandlerLogger)
    }),
    n
}
,
Roblox.ProtocolHandlerClientInterface = Roblox.ProtocolHandlerImplementation();
;$(function() {
    $(Roblox.GameLauncher).on(Roblox.GameLauncher.startClientSucceededEvent, function() {
        typeof googletag != "undefined" && googletag.cmd.push(function() {
            googletag.pubads().refresh()
        })
    })
});
;Roblox && Roblox.BundleDetector && Roblox.BundleDetector.bundleDetected('leanbase');
