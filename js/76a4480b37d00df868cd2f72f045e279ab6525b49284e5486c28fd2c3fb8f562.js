! function() {
    var n = {
            3773: function(e, t, n) {
                e.exports = n(1487)
            },
            9117: function(e, t, u) {
                "use strict";
                var c = u(717),
                    l = u(9097),
                    d = u(4717),
                    h = u(8634),
                    v = u(5816),
                    p = u(239);
                e.exports = function(i) {
                    return new Promise(function(t, n) {
                        var r = i.data,
                            a = i.headers;
                        c.isFormData(r) && delete a["Content-Type"];
                        var e, o, s = new XMLHttpRequest;
                        if (i.auth && (e = i.auth.username || "", o = i.auth.password || "", a.Authorization = "Basic " + btoa(e + ":" + o)), s.open(i.method.toUpperCase(), d(i.url, i.params, i.paramsSerializer), !0), s.timeout = i.timeout, s.onreadystatechange = function() {
                                var e;
                                s && 4 === s.readyState && (0 !== s.status || s.responseURL && 0 === s.responseURL.indexOf("file:")) && (e = "getAllResponseHeaders" in s ? h(s.getAllResponseHeaders()) : null, e = {
                                    data: i.responseType && "text" !== i.responseType ? s.response : s.responseText,
                                    status: s.status,
                                    statusText: s.statusText,
                                    headers: e,
                                    config: i,
                                    request: s
                                }, l(t, n, e), s = null)
                            }, s.onerror = function() {
                                n(p("Network Error", i, null, s)), s = null
                            }, s.ontimeout = function() {
                                n(p("timeout of " + i.timeout + "ms exceeded", i, "ECONNABORTED", s)), s = null
                            }, c.isStandardBrowserEnv() && (o = u(4076), (o = (i.withCredentials || v(i.url)) && i.xsrfCookieName ? o.read(i.xsrfCookieName) : void 0) && (a[i.xsrfHeaderName] = o)), "setRequestHeader" in s && c.forEach(a, function(e, t) {
                                void 0 === r && "content-type" === t.toLowerCase() ? delete a[t] : s.setRequestHeader(t, e)
                            }), i.withCredentials && (s.withCredentials = !0), i.responseType) try {
                            s.responseType = i.responseType
                        } catch (e) {
                            if ("json" !== i.responseType) throw e
                        }
                        "function" == typeof i.onDownloadProgress && s.addEventListener("progress", i.onDownloadProgress), "function" == typeof i.onUploadProgress && s.upload && s.upload.addEventListener("progress", i.onUploadProgress), i.cancelToken && i.cancelToken.promise.then(function(e) {
                            s && (s.abort(), n(e), s = null)
                        }), void 0 === r && (r = null), s.send(r)
                    })
                }
            },
            1487: function(e, t, n) {
                "use strict";
                var r = n(717),
                    a = n(6272),
                    o = n(1158),
                    s = n(2896);

                function i(e) {
                    var t = new o(e),
                        e = a(o.prototype.request, t);
                    return r.extend(e, o.prototype, t), r.extend(e, t), e
                }
                var u = i(s);
                u.Axios = o, u.create = function(e) {
                    return i(r.merge(s, e))
                }, u.Cancel = n(4458), u.CancelToken = n(6126), u.isCancel = n(8427), u.all = function(e) {
                    return Promise.all(e)
                }, u.spread = n(464), e.exports = u, e.exports.default = u
            },
            4458: function(e) {
                "use strict";

                function t(e) {
                    this.message = e
                }
                t.prototype.toString = function() {
                    return "Cancel" + (this.message ? ": " + this.message : "")
                }, t.prototype.__CANCEL__ = !0, e.exports = t
            },
            6126: function(e, t, n) {
                "use strict";
                var r = n(4458);

                function a(e) {
                    if ("function" != typeof e) throw new TypeError("executor must be a function.");
                    var t;
                    this.promise = new Promise(function(e) {
                        t = e
                    });
                    var n = this;
                    e(function(e) {
                        n.reason || (n.reason = new r(e), t(n.reason))
                    })
                }
                a.prototype.throwIfRequested = function() {
                    if (this.reason) throw this.reason
                }, a.source = function() {
                    var t;
                    return {
                        token: new a(function(e) {
                            t = e
                        }),
                        cancel: t
                    }
                }, e.exports = a
            },
            8427: function(e) {
                "use strict";
                e.exports = function(e) {
                    return !(!e || !e.__CANCEL__)
                }
            },
            1158: function(e, t, n) {
                "use strict";
                var a = n(2896),
                    o = n(717),
                    r = n(9143),
                    s = n(3093);

                function i(e) {
                    this.defaults = e, this.interceptors = {
                        request: new r,
                        response: new r
                    }
                }
                i.prototype.request = function(e, t) {
                    "string" == typeof e && (e = o.merge({
                        url: arguments[0]
                    }, t)), (e = o.merge(a, {
                        method: "get"
                    }, this.defaults, e)).method = e.method.toLowerCase();
                    var n = [s, void 0],
                        r = Promise.resolve(e);
                    for (this.interceptors.request.forEach(function(e) {
                            n.unshift(e.fulfilled, e.rejected)
                        }), this.interceptors.response.forEach(function(e) {
                            n.push(e.fulfilled, e.rejected)
                        }); n.length;) r = r.then(n.shift(), n.shift());
                    return r
                }, o.forEach(["delete", "get", "head", "options"], function(n) {
                    i.prototype[n] = function(e, t) {
                        return this.request(o.merge(t || {}, {
                            method: n,
                            url: e
                        }))
                    }
                }), o.forEach(["post", "put", "patch"], function(r) {
                    i.prototype[r] = function(e, t, n) {
                        return this.request(o.merge(n || {}, {
                            method: r,
                            url: e,
                            data: t
                        }))
                    }
                }), e.exports = i
            },
            9143: function(e, t, n) {
                "use strict";
                var r = n(717);

                function a() {
                    this.handlers = []
                }
                a.prototype.use = function(e, t) {
                    return this.handlers.push({
                        fulfilled: e,
                        rejected: t
                    }), this.handlers.length - 1
                }, a.prototype.eject = function(e) {
                    this.handlers[e] && (this.handlers[e] = null)
                }, a.prototype.forEach = function(t) {
                    r.forEach(this.handlers, function(e) {
                        null !== e && t(e)
                    })
                }, e.exports = a
            },
            239: function(e, t, n) {
                "use strict";
                var o = n(5120);
                e.exports = function(e, t, n, r, a) {
                    e = new Error(e);
                    return o(e, t, n, r, a)
                }
            },
            3093: function(e, t, n) {
                "use strict";
                var r = n(717),
                    a = n(5794),
                    o = n(8427),
                    s = n(2896),
                    i = n(812),
                    u = n(1474);

                function c(e) {
                    e.cancelToken && e.cancelToken.throwIfRequested()
                }
                e.exports = function(t) {
                    return c(t), t.baseURL && !i(t.url) && (t.url = u(t.baseURL, t.url)), t.headers = t.headers || {}, t.data = a(t.data, t.headers, t.transformRequest), t.headers = r.merge(t.headers.common || {}, t.headers[t.method] || {}, t.headers || {}), r.forEach(["delete", "get", "head", "post", "put", "patch", "common"], function(e) {
                        delete t.headers[e]
                    }), (t.adapter || s.adapter)(t).then(function(e) {
                        return c(t), e.data = a(e.data, e.headers, t.transformResponse), e
                    }, function(e) {
                        return o(e) || (c(t), e && e.response && (e.response.data = a(e.response.data, e.response.headers, t.transformResponse))), Promise.reject(e)
                    })
                }
            },
            5120: function(e) {
                "use strict";
                e.exports = function(e, t, n, r, a) {
                    return e.config = t, n && (e.code = n), e.request = r, e.response = a, e
                }
            },
            9097: function(e, t, n) {
                "use strict";
                var a = n(239);
                e.exports = function(e, t, n) {
                    var r = n.config.validateStatus;
                    n.status && r && !r(n.status) ? t(a("Request failed with status code " + n.status, n.config, null, n.request, n)) : e(n)
                }
            },
            5794: function(e, t, n) {
                "use strict";
                var r = n(717);
                e.exports = function(t, n, e) {
                    return r.forEach(e, function(e) {
                        t = e(t, n)
                    }), t
                }
            },
            2896: function(e, t, n) {
                "use strict";
                var r = n(717),
                    a = n(1890),
                    o = {
                        "Content-Type": "application/x-www-form-urlencoded"
                    };

                function s(e, t) {
                    !r.isUndefined(e) && r.isUndefined(e["Content-Type"]) && (e["Content-Type"] = t)
                }
                var i, u = {
                    adapter: ("undefined" == typeof XMLHttpRequest && "undefined" == typeof process || (i = n(9117)), i),
                    transformRequest: [function(e, t) {
                        return a(t, "Content-Type"), r.isFormData(e) || r.isArrayBuffer(e) || r.isBuffer(e) || r.isStream(e) || r.isFile(e) || r.isBlob(e) ? e : r.isArrayBufferView(e) ? e.buffer : r.isURLSearchParams(e) ? (s(t, "application/x-www-form-urlencoded;charset=utf-8"), e.toString()) : r.isObject(e) ? (s(t, "application/json;charset=utf-8"), JSON.stringify(e)) : e
                    }],
                    transformResponse: [function(e) {
                        if ("string" == typeof e) try {
                            e = JSON.parse(e)
                        } catch (e) {}
                        return e
                    }],
                    timeout: 0,
                    xsrfCookieName: "XSRF-TOKEN",
                    xsrfHeaderName: "X-XSRF-TOKEN",
                    maxContentLength: -1,
                    validateStatus: function(e) {
                        return 200 <= e && e < 300
                    },
                    headers: {
                        common: {
                            Accept: "application/json, text/plain, */*"
                        }
                    }
                };
                r.forEach(["delete", "get", "head"], function(e) {
                    u.headers[e] = {}
                }), r.forEach(["post", "put", "patch"], function(e) {
                    u.headers[e] = r.merge(o)
                }), e.exports = u
            },
            6272: function(e) {
                "use strict";
                e.exports = function(n, r) {
                    return function() {
                        for (var e = new Array(arguments.length), t = 0; t < e.length; t++) e[t] = arguments[t];
                        return n.apply(r, e)
                    }
                }
            },
            4717: function(e, t, n) {
                "use strict";
                var a = n(717);

                function o(e) {
                    return encodeURIComponent(e).replace(/%40/gi, "@").replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+").replace(/%5B/gi, "[").replace(/%5D/gi, "]")
                }
                e.exports = function(e, t, n) {
                    if (!t) return e;
                    var r, t = n ? n(t) : a.isURLSearchParams(t) ? t.toString() : (r = [], a.forEach(t, function(e, t) {
                        null != e && (a.isArray(e) ? t += "[]" : e = [e], a.forEach(e, function(e) {
                            a.isDate(e) ? e = e.toISOString() : a.isObject(e) && (e = JSON.stringify(e)), r.push(o(t) + "=" + o(e))
                        }))
                    }), r.join("&"));
                    return t && (e += (-1 === e.indexOf("?") ? "?" : "&") + t), e
                }
            },
            1474: function(e) {
                "use strict";
                e.exports = function(e, t) {
                    return t ? e.replace(/\/+$/, "") + "/" + t.replace(/^\/+/, "") : e
                }
            },
            4076: function(e, t, n) {
                "use strict";
                var i = n(717);
                e.exports = i.isStandardBrowserEnv() ? {
                    write: function(e, t, n, r, a, o) {
                        var s = [];
                        s.push(e + "=" + encodeURIComponent(t)), i.isNumber(n) && s.push("expires=" + new Date(n).toGMTString()), i.isString(r) && s.push("path=" + r), i.isString(a) && s.push("domain=" + a), !0 === o && s.push("secure"), document.cookie = s.join("; ")
                    },
                    read: function(e) {
                        e = document.cookie.match(new RegExp("(^|;\\s*)(" + e + ")=([^;]*)"));
                        return e ? decodeURIComponent(e[3]) : null
                    },
                    remove: function(e) {
                        this.write(e, "", Date.now() - 864e5)
                    }
                } : {
                    write: function() {},
                    read: function() {
                        return null
                    },
                    remove: function() {}
                }
            },
            812: function(e) {
                "use strict";
                e.exports = function(e) {
                    return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(e)
                }
            },
            5816: function(e, t, n) {
                "use strict";
                var r, a, o, s = n(717);

                function i(e) {
                    return a && (o.setAttribute("href", e), e = o.href), o.setAttribute("href", e), {
                        href: o.href,
                        protocol: o.protocol ? o.protocol.replace(/:$/, "") : "",
                        host: o.host,
                        search: o.search ? o.search.replace(/^\?/, "") : "",
                        hash: o.hash ? o.hash.replace(/^#/, "") : "",
                        hostname: o.hostname,
                        port: o.port,
                        pathname: "/" === o.pathname.charAt(0) ? o.pathname : "/" + o.pathname
                    }
                }
                e.exports = s.isStandardBrowserEnv() ? (a = /(msie|trident)/i.test(navigator.userAgent), o = document.createElement("a"), r = i(window.location.href), function(e) {
                    e = s.isString(e) ? i(e) : e;
                    return e.protocol === r.protocol && e.host === r.host
                }) : function() {
                    return !0
                }
            },
            1890: function(e, t, n) {
                "use strict";
                var a = n(717);
                e.exports = function(n, r) {
                    a.forEach(n, function(e, t) {
                        t !== r && t.toUpperCase() === r.toUpperCase() && (n[r] = e, delete n[t])
                    })
                }
            },
            8634: function(e, t, n) {
                "use strict";
                var a = n(717),
                    o = ["age", "authorization", "content-length", "content-type", "etag", "expires", "from", "host", "if-modified-since", "if-unmodified-since", "last-modified", "location", "max-forwards", "proxy-authorization", "referer", "retry-after", "user-agent"];
                e.exports = function(e) {
                    var t, n, r = {};
                    return e && a.forEach(e.split("\n"), function(e) {
                        n = e.indexOf(":"), t = a.trim(e.substr(0, n)).toLowerCase(), n = a.trim(e.substr(n + 1)), t && (r[t] && 0 <= o.indexOf(t) || (r[t] = "set-cookie" === t ? (r[t] || []).concat([n]) : r[t] ? r[t] + ", " + n : n))
                    }), r
                }
            },
            464: function(e) {
                "use strict";
                e.exports = function(t) {
                    return function(e) {
                        return t.apply(null, e)
                    }
                }
            },
            717: function(e, t, n) {
                "use strict";

                function o(e) {
                    return (o = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                        return typeof e
                    } : function(e) {
                        return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
                    })(e)
                }
                var a = n(6272),
                    n = n(4297),
                    r = Object.prototype.toString;

                function s(e) {
                    return "[object Array]" === r.call(e)
                }

                function i(e) {
                    return null !== e && "object" === o(e)
                }

                function u(e) {
                    return "[object Function]" === r.call(e)
                }

                function c(e, t) {
                    if (null != e)
                        if ("object" !== o(e) && (e = [e]), s(e))
                            for (var n = 0, r = e.length; n < r; n++) t.call(null, e[n], n, e);
                        else
                            for (var a in e) Object.prototype.hasOwnProperty.call(e, a) && t.call(null, e[a], a, e)
                }
                e.exports = {
                    isArray: s,
                    isArrayBuffer: function(e) {
                        return "[object ArrayBuffer]" === r.call(e)
                    },
                    isBuffer: n,
                    isFormData: function(e) {
                        return "undefined" != typeof FormData && e instanceof FormData
                    },
                    isArrayBufferView: function(e) {
                        return e = "undefined" != typeof ArrayBuffer && ArrayBuffer.isView ? ArrayBuffer.isView(e) : e && e.buffer && e.buffer instanceof ArrayBuffer
                    },
                    isString: function(e) {
                        return "string" == typeof e
                    },
                    isNumber: function(e) {
                        return "number" == typeof e
                    },
                    isObject: i,
                    isUndefined: function(e) {
                        return void 0 === e
                    },
                    isDate: function(e) {
                        return "[object Date]" === r.call(e)
                    },
                    isFile: function(e) {
                        return "[object File]" === r.call(e)
                    },
                    isBlob: function(e) {
                        return "[object Blob]" === r.call(e)
                    },
                    isFunction: u,
                    isStream: function(e) {
                        return i(e) && u(e.pipe)
                    },
                    isURLSearchParams: function(e) {
                        return "undefined" != typeof URLSearchParams && e instanceof URLSearchParams
                    },
                    isStandardBrowserEnv: function() {
                        return ("undefined" == typeof navigator || "ReactNative" !== navigator.product) && ("undefined" != typeof window && "undefined" != typeof document)
                    },
                    forEach: c,
                    merge: function n() {
                        var r = {};

                        function e(e, t) {
                            "object" === o(r[t]) && "object" === o(e) ? r[t] = n(r[t], e) : r[t] = e
                        }
                        for (var t = 0, a = arguments.length; t < a; t++) c(arguments[t], e);
                        return r
                    },
                    extend: function(n, e, r) {
                        return c(e, function(e, t) {
                            n[t] = r && "function" == typeof e ? a(e, r) : e
                        }), n
                    },
                    trim: function(e) {
                        return e.replace(/^\s*/, "").replace(/\s*$/, "")
                    }
                }
            },
            1745: function(e) {
                "use strict";

                function n(e) {
                    return (n = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                        return typeof e
                    } : function(e) {
                        return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
                    })(e)
                }
                var t = "%[a-f0-9]{2}",
                    a = new RegExp(t, "gi"),
                    i = new RegExp("(" + t + ")+", "gi");

                function u(t) {
                    try {
                        return decodeURIComponent(t)
                    } catch (e) {
                        for (var n = t.match(a), r = 1; r < n.length; r++) n = (t = function e(t, n) {
                            try {
                                return decodeURIComponent(t.join(""))
                            } catch (e) {}
                            if (1 === t.length) return t;
                            n = n || 1;
                            var r = t.slice(0, n),
                                n = t.slice(n);
                            return Array.prototype.concat.call([], e(r), e(n))
                        }(n, r).join("")).match(a);
                        return t
                    }
                }
                e.exports = function(t) {
                    if ("string" != typeof t) throw new TypeError("Expected `encodedURI` to be of type `string`, got `" + n(t) + "`");
                    try {
                        return t = t.replace(/\+/g, " "), decodeURIComponent(t)
                    } catch (e) {
                        return function(e) {
                            for (var t = {
                                    "%FE%FF": "��",
                                    "%FF%FE": "��"
                                }, n = i.exec(e); n;) {
                                try {
                                    t[n[0]] = decodeURIComponent(n[0])
                                } catch (e) {
                                    var r = u(n[0]);
                                    r !== n[0] && (t[n[0]] = r)
                                }
                                n = i.exec(e)
                            }
                            t["%C2"] = "�";
                            for (var a = Object.keys(t), o = 0; o < a.length; o++) {
                                var s = a[o];
                                e = e.replace(new RegExp(s, "g"), t[s])
                            }
                            return e
                        }(t)
                    }
                }
            },
            4297: function(e) {
                /*!
                 * Determine if an object is a Buffer
                 *
                 * @author   Feross Aboukhadijeh <https://feross.org>
                 * @license  MIT
                 */
                e.exports = function(e) {
                    return null != e && null != e.constructor && "function" == typeof e.constructor.isBuffer && e.constructor.isBuffer(e)
                }
            },
            2149: function(R, O, D) {
                var x;

                function E(e) {
                    return (E = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                        return typeof e
                    } : function(e) {
                        return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
                    })(e)
                }
                /*! https://mths.be/punycode v1.3.2 by @mathias */
                R = D.nmd(R),
                    function(e) {
                        var t = "object" == E(O) && O && !O.nodeType && O,
                            n = "object" == E(R) && R && !R.nodeType && R,
                            r = "object" == (void 0 === D.g ? "undefined" : E(D.g)) && D.g;
                        r.global !== r && r.window !== r && r.self !== r || (e = r);
                        var a, o, g = 2147483647,
                            y = 36,
                            G = 1,
                            I = 26,
                            s = 38,
                            i = 700,
                            b = 72,
                            P = 128,
                            w = "-",
                            u = /^xn--/,
                            c = /[^\x20-\x7E]/,
                            l = /[\x2E\u3002\uFF0E\uFF61]/g,
                            d = {
                                overflow: "Overflow: input needs wider integers to process",
                                "not-basic": "Illegal input >= 0x80 (not a basic code point)",
                                "invalid-input": "Invalid input"
                            },
                            h = y - G,
                            C = Math.floor,
                            T = String.fromCharCode;

                        function A(e) {
                            throw RangeError(d[e])
                        }

                        function v(e, t) {
                            for (var n = e.length, r = []; n--;) r[n] = t(e[n]);
                            return r
                        }

                        function p(e, t) {
                            var n = e.split("@"),
                                r = "";
                            return 1 < n.length && (r = n[0] + "@", e = n[1]), r + v((e = e.replace(l, ".")).split("."), t).join(".")
                        }

                        function q(e) {
                            for (var t, n, r = [], a = 0, o = e.length; a < o;) 55296 <= (t = e.charCodeAt(a++)) && t <= 56319 && a < o ? 56320 == (64512 & (n = e.charCodeAt(a++))) ? r.push(((1023 & t) << 10) + (1023 & n) + 65536) : (r.push(t), a--) : r.push(t);
                            return r
                        }

                        function f(e) {
                            return v(e, function(e) {
                                var t = "";
                                return 65535 < e && (t += T((e -= 65536) >>> 10 & 1023 | 55296), e = 56320 | 1023 & e), t += T(e)
                            }).join("")
                        }

                        function L(e, t) {
                            return e + 22 + 75 * (e < 26) - ((0 != t) << 5)
                        }

                        function S(e, t, n) {
                            var r = 0;
                            for (e = n ? C(e / i) : e >> 1, e += C(e / t); h * I >> 1 < e; r += y) e = C(e / h);
                            return C(r + (h + 1) * e / (e + s))
                        }

                        function m(e) {
                            var t, n, r, a, o, s, i, u = [],
                                c = e.length,
                                l = 0,
                                d = P,
                                h = b,
                                v = e.lastIndexOf(w);
                            for (v < 0 && (v = 0), n = 0; n < v; ++n) 128 <= e.charCodeAt(n) && A("not-basic"), u.push(e.charCodeAt(n));
                            for (r = 0 < v ? v + 1 : 0; r < c;) {
                                for (a = l, o = 1, s = y; c <= r && A("invalid-input"), i = e.charCodeAt(r++), (y <= (i = i - 48 < 10 ? i - 22 : i - 65 < 26 ? i - 65 : i - 97 < 26 ? i - 97 : y) || i > C((g - l) / o)) && A("overflow"), l += i * o, !(i < (i = s <= h ? G : h + I <= s ? I : s - h)); s += y) o > C(g / (i = y - i)) && A("overflow"), o *= i;
                                h = S(l - a, t = u.length + 1, 0 == a), C(l / t) > g - d && A("overflow"), d += C(l / t), l %= t, u.splice(l++, 0, d)
                            }
                            return f(u)
                        }

                        function U(e) {
                            for (var t, n, r, a, o, s, i, u, c, l, d, h = [], v = (e = q(e)).length, p = P, f = b, m = t = 0; m < v; ++m)(u = e[m]) < 128 && h.push(T(u));
                            for (n = r = h.length, r && h.push(w); n < v;) {
                                for (a = g, m = 0; m < v; ++m) p <= (u = e[m]) && u < a && (a = u);
                                for (a - p > C((g - t) / (c = n + 1)) && A("overflow"), t += (a - p) * c, p = a, m = 0; m < v; ++m)
                                    if ((u = e[m]) < p && ++t > g && A("overflow"), u == p) {
                                        for (o = t, s = y; !(o < (i = s <= f ? G : f + I <= s ? I : s - f)); s += y) d = o - i, l = y - i, h.push(T(L(i + d % l, 0))), o = C(d / l);
                                        h.push(T(L(o, 0))), f = S(t, c, n == r), t = 0, ++n
                                    }++ t, ++p
                            }
                            return h.join("")
                        }
                        if (a = {
                                version: "1.3.2",
                                ucs2: {
                                    decode: q,
                                    encode: f
                                },
                                decode: m,
                                encode: U,
                                toASCII: function(e) {
                                    return p(e, function(e) {
                                        return c.test(e) ? "xn--" + U(e) : e
                                    })
                                },
                                toUnicode: function(e) {
                                    return p(e, function(e) {
                                        return u.test(e) ? m(e.slice(4).toLowerCase()) : e
                                    })
                                }
                            }, "object" == E(D.amdO) && D.amdO) void 0 === (x = function() {
                            return a
                        }.call(O, D, O, R)) || (R.exports = x);
                        else if (t && n)
                            if (R.exports == t) n.exports = a;
                            else
                                for (o in a) a.hasOwnProperty(o) && (t[o] = a[o]);
                        else e.punycode = a
                    }(this)
            },
            6933: function(e, i, t) {
                "use strict";

                function p(e, t) {
                    return function(e) {
                        if (Array.isArray(e)) return e
                    }(e) || function(e, t) {
                        if ("undefined" == typeof Symbol || !(Symbol.iterator in Object(e))) return;
                        var n = [],
                            r = !0,
                            a = !1,
                            o = void 0;
                        try {
                            for (var s, i = e[Symbol.iterator](); !(r = (s = i.next()).done) && (n.push(s.value), !t || n.length !== t); r = !0);
                        } catch (e) {
                            a = !0, o = e
                        } finally {
                            try {
                                r || null == i.return || i.return()
                            } finally {
                                if (a) throw o
                            }
                        }
                        return n
                    }(e, t) || m(e, t) || function() {
                        throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
                    }()
                }

                function f(e) {
                    return (f = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                        return typeof e
                    } : function(e) {
                        return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
                    })(e)
                }

                function c(e) {
                    return function(e) {
                        if (Array.isArray(e)) return r(e)
                    }(e) || function(e) {
                        if ("undefined" != typeof Symbol && Symbol.iterator in Object(e)) return Array.from(e)
                    }(e) || m(e) || function() {
                        throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
                    }()
                }

                function m(e, t) {
                    if (e) {
                        if ("string" == typeof e) return r(e, t);
                        var n = Object.prototype.toString.call(e).slice(8, -1);
                        return "Object" === n && e.constructor && (n = e.constructor.name), "Map" === n || "Set" === n ? Array.from(e) : "Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? r(e, t) : void 0
                    }
                }

                function r(e, t) {
                    (null == t || t > e.length) && (t = e.length);
                    for (var n = 0, r = new Array(t); n < t; n++) r[n] = e[n];
                    return r
                }
                var n = t(3162),
                    a = t(1745),
                    g = t(9393);

                function y(e) {
                    if ("string" != typeof e || 1 !== e.length) throw new TypeError("arrayFormatSeparator must be single character string")
                }

                function l(e, t) {
                    return t.encode ? (t.strict ? n : encodeURIComponent)(e) : e
                }

                function G(e, t) {
                    return t.decode ? a(e) : e
                }

                function u(e) {
                    var t = e.indexOf("#");
                    return -1 !== t && (e = e.slice(0, t)), e
                }

                function o(e) {
                    var t = (e = u(e)).indexOf("?");
                    return -1 === t ? "" : e.slice(t + 1)
                }

                function I(e, t) {
                    return t.parseNumbers && !Number.isNaN(Number(e)) && "string" == typeof e && "" !== e.trim() ? e = Number(e) : !t.parseBooleans || null === e || "true" !== e.toLowerCase() && "false" !== e.toLowerCase() || (e = "true" === e.toLowerCase()), e
                }

                function s(e, t) {
                    y((t = Object.assign({
                        decode: !0,
                        sort: !0,
                        arrayFormat: "none",
                        arrayFormatSeparator: ",",
                        parseNumbers: !1,
                        parseBooleans: !1
                    }, t)).arrayFormatSeparator);
                    var n = function(o) {
                            var r;
                            switch (o.arrayFormat) {
                                case "index":
                                    return function(e, t, n) {
                                        r = /\[(\d*)\]$/.exec(e), e = e.replace(/\[\d*\]$/, ""), r ? (void 0 === n[e] && (n[e] = {}), n[e][r[1]] = t) : n[e] = t
                                    };
                                case "bracket":
                                    return function(e, t, n) {
                                        r = /(\[\])$/.exec(e), e = e.replace(/\[\]$/, ""), r ? void 0 !== n[e] ? n[e] = [].concat(n[e], t) : n[e] = [t] : n[e] = t
                                    };
                                case "comma":
                                case "separator":
                                    return function(e, t, n) {
                                        var r = "string" == typeof t && t.includes(o.arrayFormatSeparator),
                                            a = "string" == typeof t && !r && G(t, o).includes(o.arrayFormatSeparator);
                                        t = a ? G(t, o) : t;
                                        t = r || a ? t.split(o.arrayFormatSeparator).map(function(e) {
                                            return G(e, o)
                                        }) : null === t ? t : G(t, o);
                                        n[e] = t
                                    };
                                default:
                                    return function(e, t, n) {
                                        void 0 !== n[e] ? n[e] = [].concat(n[e], t) : n[e] = t
                                    }
                            }
                        }(t),
                        r = Object.create(null);
                    if ("string" != typeof e) return r;
                    if (!(e = e.trim().replace(/^[?#&]/, ""))) return r;
                    var a = function(e, t) {
                        var n;
                        if ("undefined" == typeof Symbol || null == e[Symbol.iterator]) {
                            if (Array.isArray(e) || (n = m(e)) || t && e && "number" == typeof e.length) {
                                n && (e = n);
                                var r = 0,
                                    t = function() {};
                                return {
                                    s: t,
                                    n: function() {
                                        return r >= e.length ? {
                                            done: !0
                                        } : {
                                            done: !1,
                                            value: e[r++]
                                        }
                                    },
                                    e: function(e) {
                                        throw e
                                    },
                                    f: t
                                }
                            }
                            throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
                        }
                        var a, o = !0,
                            s = !1;
                        return {
                            s: function() {
                                n = e[Symbol.iterator]()
                            },
                            n: function() {
                                var e = n.next();
                                return o = e.done, e
                            },
                            e: function(e) {
                                s = !0, a = e
                            },
                            f: function() {
                                try {
                                    o || null == n.return || n.return()
                                } finally {
                                    if (s) throw a
                                }
                            }
                        }
                    }(e.split("&"));
                    try {
                        for (a.s(); !(s = a.n()).done;) {
                            var o = s.value,
                                s = p(g(t.decode ? o.replace(/\+/g, " ") : o, "="), 2),
                                o = s[0],
                                s = void 0 === (s = s[1]) ? null : ["comma", "separator"].includes(t.arrayFormat) ? s : G(s, t);
                            n(G(o, t), s, r)
                        }
                    } catch (e) {
                        a.e(e)
                    } finally {
                        a.f()
                    }
                    for (var i = 0, u = Object.keys(r); i < u.length; i++) {
                        var c = u[i],
                            l = r[c];
                        if ("object" === f(l) && null !== l)
                            for (var d = 0, h = Object.keys(l); d < h.length; d++) {
                                var v = h[d];
                                l[v] = I(l[v], t)
                            } else r[c] = I(l, t)
                    }
                    return !1 === t.sort ? r : (!0 === t.sort ? Object.keys(r).sort() : Object.keys(r).sort(t.sort)).reduce(function(e, t) {
                        var n = r[t];
                        return Boolean(n) && "object" === f(n) && !Array.isArray(n) ? e[t] = function e(t) {
                            return Array.isArray(t) ? t.sort() : "object" === f(t) ? e(Object.keys(t)).sort(function(e, t) {
                                return Number(e) - Number(t)
                            }).map(function(e) {
                                return t[e]
                            }) : t
                        }(n) : e[t] = n, e
                    }, Object.create(null))
                }
                i.extract = o, i.parse = s, i.stringify = function(n, r) {
                    if (!n) return "";
                    y((r = Object.assign({
                        encode: !0,
                        strict: !0,
                        arrayFormat: "none",
                        arrayFormatSeparator: ","
                    }, r)).arrayFormatSeparator);
                    for (var e, a = function(a) {
                            switch (a.arrayFormat) {
                                case "index":
                                    return function(r) {
                                        return function(e, t) {
                                            var n = e.length;
                                            return void 0 === t || a.skipNull && null === t || a.skipEmptyString && "" === t ? e : [].concat(c(e), null === t ? [
                                                [l(r, a), "[", n, "]"].join("")
                                            ] : [
                                                [l(r, a), "[", l(n, a), "]=", l(t, a)].join("")
                                            ])
                                        }
                                    };
                                case "bracket":
                                    return function(n) {
                                        return function(e, t) {
                                            return void 0 === t || a.skipNull && null === t || a.skipEmptyString && "" === t ? e : [].concat(c(e), null === t ? [
                                                [l(n, a), "[]"].join("")
                                            ] : [
                                                [l(n, a), "[]=", l(t, a)].join("")
                                            ])
                                        }
                                    };
                                case "comma":
                                case "separator":
                                    return function(n) {
                                        return function(e, t) {
                                            return null == t || 0 === t.length ? e : 0 === e.length ? [
                                                [l(n, a), "=", l(t, a)].join("")
                                            ] : [
                                                [e, l(t, a)].join(a.arrayFormatSeparator)
                                            ]
                                        }
                                    };
                                default:
                                    return function(n) {
                                        return function(e, t) {
                                            return void 0 === t || a.skipNull && null === t || a.skipEmptyString && "" === t ? e : [].concat(c(e), null === t ? [l(n, a)] : [
                                                [l(n, a), "=", l(t, a)].join("")
                                            ])
                                        }
                                    }
                            }
                        }(r), t = {}, o = 0, s = Object.keys(n); o < s.length; o++) {
                        var i = s[o];
                        e = i, r.skipNull && null == n[e] || r.skipEmptyString && "" === n[e] || (t[i] = n[i])
                    }
                    var u = Object.keys(t);
                    return !1 !== r.sort && u.sort(r.sort), u.map(function(e) {
                        var t = n[e];
                        return void 0 === t ? "" : null === t ? l(e, r) : Array.isArray(t) ? t.reduce(a(e), []).join("&") : l(e, r) + "=" + l(t, r)
                    }).filter(function(e) {
                        return 0 < e.length
                    }).join("&")
                }, i.parseUrl = function(e, t) {
                    t = Object.assign({
                        decode: !0
                    }, t);
                    var n = p(g(e, "#"), 2),
                        r = n[0],
                        n = n[1];
                    return Object.assign({
                        url: r.split("?")[0] || "",
                        query: s(o(e), t)
                    }, t && t.parseFragmentIdentifier && n ? {
                        fragmentIdentifier: G(n, t)
                    } : {})
                }, i.stringifyUrl = function(e, t) {
                    t = Object.assign({
                        encode: !0,
                        strict: !0
                    }, t);
                    var n = u(e.url).split("?")[0] || "",
                        r = i.extract(e.url),
                        a = i.parse(r, {
                            sort: !1
                        }),
                        o = Object.assign(a, e.query),
                        s = (s = i.stringify(o, t)) && "?".concat(s),
                        a = (r = e.url, a = "", -1 !== (o = r.indexOf("#")) && (a = r.slice(o)), a);
                    return e.fragmentIdentifier && (a = "#".concat(l(e.fragmentIdentifier, t))), "".concat(n).concat(s).concat(a)
                }
            },
            4963: function(e) {
                "use strict";
                e.exports = function(e, t, n, r) {
                    t = t || "&", n = n || "=";
                    var a = {};
                    if ("string" != typeof e || 0 === e.length) return a;
                    var o = /\+/g;
                    e = e.split(t);
                    t = 1e3;
                    r && "number" == typeof r.maxKeys && (t = r.maxKeys);
                    var s = e.length;
                    0 < t && t < s && (s = t);
                    for (var i = 0; i < s; ++i) {
                        var u, c = e[i].replace(o, "%20"),
                            l = c.indexOf(n),
                            d = 0 <= l ? (u = c.substr(0, l), c.substr(l + 1)) : (u = c, ""),
                            h = decodeURIComponent(u),
                            l = decodeURIComponent(d);
                        c = a, d = h, Object.prototype.hasOwnProperty.call(c, d) ? Array.isArray(a[h]) ? a[h].push(l) : a[h] = [a[h], l] : a[h] = l
                    }
                    return a
                }
            },
            1467: function(e) {
                "use strict";

                function t(e) {
                    return (t = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                        return typeof e
                    } : function(e) {
                        return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
                    })(e)
                }

                function o(e) {
                    switch (t(e)) {
                        case "string":
                            return e;
                        case "boolean":
                            return e ? "true" : "false";
                        case "number":
                            return isFinite(e) ? e : "";
                        default:
                            return ""
                    }
                }
                e.exports = function(n, r, a, e) {
                    return r = r || "&", a = a || "=", null === n && (n = void 0), "object" === t(n) ? Object.keys(n).map(function(e) {
                        var t = encodeURIComponent(o(e)) + a;
                        return Array.isArray(n[e]) ? n[e].map(function(e) {
                            return t + encodeURIComponent(o(e))
                        }).join(r) : t + encodeURIComponent(o(n[e]))
                    }).join(r) : e ? encodeURIComponent(o(e)) + a + encodeURIComponent(o(n)) : ""
                }
            },
            5261: function(e, t, n) {
                "use strict";
                t.decode = t.parse = n(4963), t.encode = t.stringify = n(1467)
            },
            9393: function(e) {
                "use strict";
                e.exports = function(e, t) {
                    if ("string" != typeof e || "string" != typeof t) throw new TypeError("Expected the arguments to be of type `string`");
                    if ("" === t) return [e];
                    var n = e.indexOf(t);
                    return -1 === n ? [e] : [e.slice(0, n), e.slice(n + t.length)]
                }
            },
            3162: function(e) {
                "use strict";
                e.exports = function(e) {
                    return encodeURIComponent(e).replace(/[!'()*]/g, function(e) {
                        return "%".concat(e.charCodeAt(0).toString(16).toUpperCase())
                    })
                }
            },
            1651: function(e, t, n) {
                "use strict";

                function A(e) {
                    return (A = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                        return typeof e
                    } : function(e) {
                        return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
                    })(e)
                }
                var q = n(2149),
                    L = n(4817);

                function b() {
                    this.protocol = null, this.slashes = null, this.auth = null, this.host = null, this.port = null, this.hostname = null, this.hash = null, this.search = null, this.query = null, this.pathname = null, this.path = null, this.href = null
                }
                t.Qc = a, t.DB = function(e, t) {
                    return a(e, !1, !0).resolve(t)
                }, t.WU = function(e) {
                    L.isString(e) && (e = a(e));
                    return e instanceof b ? e.format() : b.prototype.format.call(e)
                };
                var S = /^([a-z0-9.+-]+:)/i,
                    r = /:[0-9]*$/,
                    U = /^(\/\/?(?!\/)[^\?\s]*)(\?[^\s]*)?$/,
                    t = ["{", "}", "|", "\\", "^", "`"].concat(["<", ">", '"', "`", " ", "\r", "\n", "\t"]),
                    R = ["'"].concat(t),
                    O = ["%", "/", "?", ";", "#"].concat(R),
                    D = ["/", "?", "#"],
                    x = /^[+a-z0-9A-Z_-]{0,63}$/,
                    E = /^([+a-z0-9A-Z_-]{0,63})(.*)$/,
                    B = {
                        javascript: !0,
                        "javascript:": !0
                    },
                    F = {
                        javascript: !0,
                        "javascript:": !0
                    },
                    z = {
                        http: !0,
                        https: !0,
                        ftp: !0,
                        gopher: !0,
                        file: !0,
                        "http:": !0,
                        "https:": !0,
                        "ftp:": !0,
                        "gopher:": !0,
                        "file:": !0
                    },
                    j = n(5261);

                function a(e, t, n) {
                    if (e && L.isObject(e) && e instanceof b) return e;
                    var r = new b;
                    return r.parse(e, t, n), r
                }
                b.prototype.parse = function(e, t, n) {
                    if (!L.isString(e)) throw new TypeError("Parameter 'url' must be a string, not " + A(e));
                    var r = e.indexOf("?"),
                        a = -1 !== r && r < e.indexOf("#") ? "?" : "#",
                        r = e.split(a);
                    r[0] = r[0].replace(/\\/g, "/");
                    var o = (o = e = r.join(a)).trim();
                    if (!n && 1 === e.split("#").length) {
                        var s = U.exec(o);
                        if (s) return this.path = o, this.href = o, this.pathname = s[1], s[2] ? (this.search = s[2], this.query = t ? j.parse(this.search.substr(1)) : this.search.substr(1)) : t && (this.search = "", this.query = {}), this
                    }
                    var i, s = S.exec(o);
                    if (s && (T = (s = s[0]).toLowerCase(), this.protocol = T, o = o.substr(s.length)), (n || s || o.match(/^\/\/[^@\/]+@[^@\/]+/)) && (!(i = "//" === o.substr(0, 2)) || s && F[s] || (o = o.substr(2), this.slashes = !0)), !F[s] && (i || s && !z[s])) {
                        for (var u = -1, c = 0; c < D.length; c++) - 1 !== (l = o.indexOf(D[c])) && (-1 === u || l < u) && (u = l); - 1 !== (b = -1 === u ? o.lastIndexOf("@") : o.lastIndexOf("@", u)) && (P = o.slice(0, b), o = o.slice(b + 1), this.auth = decodeURIComponent(P)), u = -1;
                        for (var l, c = 0; c < O.length; c++) - 1 !== (l = o.indexOf(O[c])) && (-1 === u || l < u) && (u = l); - 1 === u && (u = o.length), this.host = o.slice(0, u), o = o.slice(u), this.parseHost(), this.hostname = this.hostname || "";
                        var d = "[" === this.hostname[0] && "]" === this.hostname[this.hostname.length - 1];
                        if (!d)
                            for (var h = this.hostname.split(/\./), c = 0, v = h.length; c < v; c++) {
                                var p = h[c];
                                if (p && !p.match(x)) {
                                    for (var f = "", m = 0, g = p.length; m < g; m++) 127 < p.charCodeAt(m) ? f += "x" : f += p[m];
                                    if (!f.match(x)) {
                                        var y = h.slice(0, c),
                                            G = h.slice(c + 1),
                                            I = p.match(E);
                                        I && (y.push(I[1]), G.unshift(I[2])), G.length && (o = "/" + G.join(".") + o), this.hostname = y.join(".");
                                        break
                                    }
                                }
                            }
                        255 < this.hostname.length ? this.hostname = "" : this.hostname = this.hostname.toLowerCase(), d || (this.hostname = q.toASCII(this.hostname));
                        var b = this.port ? ":" + this.port : "",
                            P = this.hostname || "";
                        this.host = P + b, this.href += this.host, d && (this.hostname = this.hostname.substr(1, this.hostname.length - 2), "/" !== o[0] && (o = "/" + o))
                    }
                    if (!B[T])
                        for (c = 0, v = R.length; c < v; c++) {
                            var w, C = R[c]; - 1 !== o.indexOf(C) && ((w = encodeURIComponent(C)) === C && (w = escape(C)), o = o.split(C).join(w))
                        }
                    d = o.indexOf("#"); - 1 !== d && (this.hash = o.substr(d), o = o.slice(0, d));
                    var T, d = o.indexOf("?");
                    return -1 !== d ? (this.search = o.substr(d), this.query = o.substr(d + 1), t && (this.query = j.parse(this.query)), o = o.slice(0, d)) : t && (this.search = "", this.query = {}), o && (this.pathname = o), z[T] && this.hostname && !this.pathname && (this.pathname = "/"), (this.pathname || this.search) && (b = this.pathname || "", T = this.search || "", this.path = b + T), this.href = this.format(), this
                }, b.prototype.format = function() {
                    var e = this.auth || "";
                    e && (e = (e = encodeURIComponent(e)).replace(/%3A/i, ":"), e += "@");
                    var t = this.protocol || "",
                        n = this.pathname || "",
                        r = this.hash || "",
                        a = !1,
                        o = "";
                    this.host ? a = e + this.host : this.hostname && (a = e + (-1 === this.hostname.indexOf(":") ? this.hostname : "[" + this.hostname + "]"), this.port && (a += ":" + this.port)), this.query && L.isObject(this.query) && Object.keys(this.query).length && (o = j.stringify(this.query));
                    o = this.search || o && "?" + o || "";
                    return t && ":" !== t.substr(-1) && (t += ":"), this.slashes || (!t || z[t]) && !1 !== a ? (a = "//" + (a || ""), n && "/" !== n.charAt(0) && (n = "/" + n)) : a = a || "", r && "#" !== r.charAt(0) && (r = "#" + r), o && "?" !== o.charAt(0) && (o = "?" + o), t + a + (n = n.replace(/[?#]/g, function(e) {
                        return encodeURIComponent(e)
                    })) + (o = o.replace("#", "%23")) + r
                }, b.prototype.resolve = function(e) {
                    return this.resolveObject(a(e, !1, !0)).format()
                }, b.prototype.resolveObject = function(e) {
                    L.isString(e) && ((v = new b).parse(e, !1, !0), e = v);
                    for (var t = new b, n = Object.keys(this), r = 0; r < n.length; r++) {
                        var a = n[r];
                        t[a] = this[a]
                    }
                    if (t.hash = e.hash, "" === e.href) return t.href = t.format(), t;
                    if (e.slashes && !e.protocol) {
                        for (var o = Object.keys(e), s = 0; s < o.length; s++) {
                            var i = o[s];
                            "protocol" !== i && (t[i] = e[i])
                        }
                        return z[t.protocol] && t.hostname && !t.pathname && (t.path = t.pathname = "/"), t.href = t.format(), t
                    }
                    if (e.protocol && e.protocol !== t.protocol) {
                        if (!z[e.protocol]) {
                            for (var u = Object.keys(e), c = 0; c < u.length; c++) {
                                var l = u[c];
                                t[l] = e[l]
                            }
                            return t.href = t.format(), t
                        }
                        if (t.protocol = e.protocol, e.host || F[e.protocol]) t.pathname = e.pathname;
                        else {
                            for (var d = (e.pathname || "").split("/"); d.length && !(e.host = d.shift()););
                            e.host || (e.host = ""), e.hostname || (e.hostname = ""), "" !== d[0] && d.unshift(""), d.length < 2 && d.unshift(""), t.pathname = d.join("/")
                        }
                        return t.search = e.search, t.query = e.query, t.host = e.host || "", t.auth = e.auth, t.hostname = e.hostname || e.host, t.port = e.port, (t.pathname || t.search) && (p = t.pathname || "", f = t.search || "", t.path = p + f), t.slashes = t.slashes || e.slashes, t.href = t.format(), t
                    }
                    var h = t.pathname && "/" === t.pathname.charAt(0),
                        v = e.host || e.pathname && "/" === e.pathname.charAt(0),
                        p = v || h || t.host && e.pathname,
                        f = p,
                        m = t.pathname && t.pathname.split("/") || [],
                        d = e.pathname && e.pathname.split("/") || [],
                        h = t.protocol && !z[t.protocol];
                    if (h && (t.hostname = "", t.port = null, t.host && ("" === m[0] ? m[0] = t.host : m.unshift(t.host)), t.host = "", e.protocol && (e.hostname = null, e.port = null, e.host && ("" === d[0] ? d[0] = e.host : d.unshift(e.host)), e.host = null), p = p && ("" === d[0] || "" === m[0])), v) t.host = (e.host || "" === e.host ? e : t).host, t.hostname = (e.hostname || "" === e.hostname ? e : t).hostname, t.search = e.search, t.query = e.query, m = d;
                    else if (d.length)(m = m || []).pop(), m = m.concat(d), t.search = e.search, t.query = e.query;
                    else if (!L.isNullOrUndefined(e.search)) return h && (t.hostname = t.host = m.shift(), (I = !!(t.host && 0 < t.host.indexOf("@")) && t.host.split("@")) && (t.auth = I.shift(), t.host = t.hostname = I.shift())), t.search = e.search, t.query = e.query, L.isNull(t.pathname) && L.isNull(t.search) || (t.path = (t.pathname || "") + (t.search || "")), t.href = t.format(), t;
                    if (!m.length) return t.pathname = null, t.search ? t.path = "/" + t.search : t.path = null, t.href = t.format(), t;
                    for (var g = m.slice(-1)[0], v = (t.host || e.host || 1 < m.length) && ("." === g || ".." === g) || "" === g, y = 0, G = m.length; 0 <= G; G--) "." === (g = m[G]) ? m.splice(G, 1) : ".." === g ? (m.splice(G, 1), y++) : y && (m.splice(G, 1), y--);
                    if (!p && !f)
                        for (; y--;) m.unshift("..");
                    !p || "" === m[0] || m[0] && "/" === m[0].charAt(0) || m.unshift(""), v && "/" !== m.join("/").substr(-1) && m.push("");
                    var I, v = "" === m[0] || m[0] && "/" === m[0].charAt(0);
                    return h && (t.hostname = t.host = !v && m.length ? m.shift() : "", (I = !!(t.host && 0 < t.host.indexOf("@")) && t.host.split("@")) && (t.auth = I.shift(), t.host = t.hostname = I.shift())), (p = p || t.host && m.length) && !v && m.unshift(""), m.length ? t.pathname = m.join("/") : (t.pathname = null, t.path = null), L.isNull(t.pathname) && L.isNull(t.search) || (t.path = (t.pathname || "") + (t.search || "")), t.auth = e.auth || t.auth, t.slashes = t.slashes || e.slashes, t.href = t.format(), t
                }, b.prototype.parseHost = function() {
                    var e = this.host,
                        t = r.exec(e);
                    t && (":" !== (t = t[0]) && (this.port = t.substr(1)), e = e.substr(0, e.length - t.length)), e && (this.hostname = e)
                }
            },
            4817: function(e) {
                "use strict";

                function t(e) {
                    return (t = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                        return typeof e
                    } : function(e) {
                        return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
                    })(e)
                }
                e.exports = {
                    isString: function(e) {
                        return "string" == typeof e
                    },
                    isObject: function(e) {
                        return "object" === t(e) && null !== e
                    },
                    isNull: function(e) {
                        return null === e
                    },
                    isNullOrUndefined: function(e) {
                        return null == e
                    }
                }
            }
        },
        r = {};

    function Ks(e) {
        if (r[e]) return r[e].exports;
        var t = r[e] = {
            id: e,
            loaded: !1,
            exports: {}
        };
        return n[e].call(t.exports, t, t.exports, Ks), t.loaded = !0, t.exports
    }
    Ks.amdO = {}, Ks.n = function(e) {
            var t = e && e.__esModule ? function() {
                return e.default
            } : function() {
                return e
            };
            return Ks.d(t, {
                a: t
            }), t
        }, Ks.d = function(e, t) {
            for (var n in t) Ks.o(t, n) && !Ks.o(e, n) && Object.defineProperty(e, n, {
                enumerable: !0,
                get: t[n]
            })
        }, Ks.g = function() {
            if ("object" == typeof globalThis) return globalThis;
            try {
                return this || new Function("return this")()
            } catch (e) {
                if ("object" == typeof window) return window
            }
        }(), Ks.o = function(e, t) {
            return Object.prototype.hasOwnProperty.call(e, t)
        }, Ks.nmd = function(e) {
            return e.paths = [], e.children || (e.children = []), e
        },
        function() {
            "use strict";
            var T = Ks(1651),
                e = Ks(3773),
                d = Ks.n(e),
                i = Roblox,
                u = RobloxTracer;
            (rn = Ae = Ae || {})[rn.ok = 200] = "ok", rn[rn.accepted = 202] = "accepted", rn[rn.movedPermanently = 301] = "movedPermanently", rn[rn.badRequest = 400] = "badRequest", rn[rn.unauthorized = 401] = "unauthorized", rn[rn.forbidden = 403] = "forbidden", rn[rn.notFound = 404] = "notFound", rn[rn.methodNotAllowed = 405] = "methodNotAllowed", rn[rn.conflict = 409] = "conflict", rn[rn.payloadTooLarge = 413] = "payloadTooLarge", rn[rn.tooManyAttempts = 429] = "tooManyAttempts", rn[rn.serverError = 500] = "serverError", rn[rn.serviceUnavailable = 503] = "serviceUnavailable";
            var t = Object.freeze(Ae);
            (xe = $e = $e || {}).GET = "get", xe.HEAD = "head", xe.POST = "post", xe.PUT = "put", xe.DELETE = "delete", xe.OPTIONS = "options", xe.PATCH = "patch";
            var c = Object.freeze($e),
                l = function() {
                    return (l = Object.assign || function(e) {
                        for (var t, n = 1, r = arguments.length; n < r; n++)
                            for (var a in t = arguments[n]) Object.prototype.hasOwnProperty.call(t, a) && (e[a] = t[a]);
                        return e
                    }).apply(this, arguments)
                },
                h = "x-csrf-token",
                s = t.forbidden,
                v = i.XsrfToken.getToken();
            d().interceptors.request.use(function(e) {
                var t, n = e.method,
                    r = e.noCache,
                    a = e.headers,
                    o = e.url,
                    s = l({}, e);
                return n !== c.POST && n !== c.PATCH && n !== c.DELETE || (v = v || i.XsrfToken.getToken(), r && (s.headers = a || {}, s["Cache-Control"] = "no-cache, no-store, must-revalidate", s.Pragma = "no-cache", s.Expires = 0), s.headers[h] = v), u.isTracerEnabled && u.apiSiteRequestValidator.isApiSiteAvailableForTracing(o) && (a = u.instrumentation.createAndGetSpan(u.tracerConstants.operationNames.httpRequest), u.tags.setXHRRequestTags(a, {
                    component: "axios",
                    method: n,
                    url: o
                }), u.logs.setXHRRequestLogs(a), t = u.inject.httpRequestCarrier(a), Object.keys(t).forEach(function(e) {
                    s.headers[e] = t[e]
                }), s.tracerConfig = {
                    requestSpan: a
                }), s
            }, null), d().interceptors.response.use(function(e) {
                var t = e.status,
                    n = e.config,
                    r = n.url,
                    n = n.tracerConfig;
                return n && u.apiSiteRequestValidator.isApiSiteAvailableForTracing(r) && (n = n.requestSpan, u.tags.setXHRResponseTags(n, {
                    status: t
                }), u.logs.setXHRResponseSuccessLogs(n), u.instrumentation.finalizeSpan(n)), e
            }, function(e) {
                var t = e.config,
                    n = e.response;
                if (n) {
                    var r = n.status,
                        a = n.headers,
                        o = n.config,
                        a = a[h];
                    if (r === s && a) return o.headers[h] = a, v = a, i.XsrfToken.setToken(a), d().request(o);
                    null != o && o.tracerConfig && u.apiSiteRequestValidator.isApiSiteAvailableForTracing(o.url) && (o = o.tracerConfig.requestSpan, u.tags.setXHRResponseErrorTags(o, {
                        status: r
                    }), u.logs.setXHRResponseErrorLogs(o), u.instrumentation.finalizeSpan(o))
                }
                return null != t && t.fullError || d().isCancel(e) ? Promise.reject(e) : Promise.reject(n)
            });
            var b = d(),
                n = function() {
                    return (n = Object.assign || function(e) {
                        for (var t, n = 1, r = arguments.length; n < r; n++)
                            for (var a in t = arguments[n]) Object.prototype.hasOwnProperty.call(t, a) && (e[a] = t[a]);
                        return e
                    }).apply(this, arguments)
                };

            function r(e) {
                return e || Promise.reject(new Error("No config found")), b((e = n({}, t = e), t.noCache && (e.headers = n(n({}, e.headers), {
                    "Cache-Control": "no-cache, no-store, must-revalidate",
                    Pragma: "no-cache",
                    Expires: 0
                })), t.authBearerToken && (e.headers = n(n({}, e.headers), {
                    "X-Auth-Bearer-Token": t.authBearerToken
                })), e));
                var t
            }

            function p(e, t) {
                return r(n(n({
                    method: c.GET,
                    url: e.url
                }, e), {
                    params: t
                }))
            }

            function f(e, t) {
                return r(n(n({
                    method: c.POST,
                    url: e.url
                }, e), {
                    data: t
                }))
            }
            var a, o, m = {
                    methods: c,
                    get: p,
                    post: f,
                    delete: function(e) {
                        return r(n({
                            method: c.DELETE,
                            url: e.url
                        }, e))
                    },
                    patch: function(e, t) {
                        return r(n(n({
                            method: c.PATCH,
                            url: e.url
                        }, e), {
                            data: t
                        }))
                    },
                    buildBatchPromises: function(e, t, n, r, a) {
                        for (var o = [], s = 0, i = e.slice(s, t), u = a || "userIds"; 0 < i.length;) {
                            var c = {};
                            c[u] = i, r ? o.push(f(n, c)) : o.push(p(n, c)), s += 1, i = e.slice(s * t, s * t + t)
                        }
                        return Promise.all(o)
                    },
                    createCancelToken: function() {
                        return b.CancelToken.source()
                    },
                    isCancelled: function(e) {
                        return b.isCancel(e)
                    }
                },
                g = (a = function(e, t) {
                    return (a = Object.setPrototypeOf || {
                            __proto__: []
                        }
                        instanceof Array && function(e, t) {
                            e.__proto__ = t
                        } || function(e, t) {
                            for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n])
                        })(e, t)
                }, function(e, t) {
                    if ("function" != typeof t && null !== t) throw new TypeError("Class extends value " + String(t) + " is not a constructor or null");

                    function n() {
                        this.constructor = e
                    }
                    a(e, t), e.prototype = null === t ? Object.create(t) : (n.prototype = t.prototype, new n)
                }),
                P = i.EnvironmentUrls.catalogApi.replace(/\/+$/, ""),
                y = ",",
                G = function(e, t, n) {
                    void 0 === t && (t = P), void 0 === n && (n = b), this.basePath = t, this.axios = n, e && (this.configuration = e, this.basePath = e.basePath || this.basePath)
                },
                I = (o = Error, g(w, o), w);

            function w(e, t) {
                t = o.call(this, t) || this;
                return t.field = e, t.name = "RequiredError", t
            }
            var C, A = (C = function(e, t) {
                    return (C = Object.setPrototypeOf || {
                            __proto__: []
                        }
                        instanceof Array && function(e, t) {
                            e.__proto__ = t
                        } || function(e, t) {
                            for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n])
                        })(e, t)
                }, function(e, t) {
                    if ("function" != typeof t && null !== t) throw new TypeError("Class extends value " + String(t) + " is not a constructor or null");

                    function n() {
                        this.constructor = e
                    }
                    C(e, t), e.prototype = null === t ? Object.create(t) : (n.prototype = t.prototype, new n)
                }),
                q = function() {
                    return (q = Object.assign || function(e) {
                        for (var t, n = 1, r = arguments.length; n < r; n++)
                            for (var a in t = arguments[n]) Object.prototype.hasOwnProperty.call(t, a) && (e[a] = t[a]);
                        return e
                    }).apply(this, arguments)
                },
                L = function(e, s, i, u) {
                    return new(i = i || Promise)(function(n, t) {
                        function r(e) {
                            try {
                                o(u.next(e))
                            } catch (e) {
                                t(e)
                            }
                        }

                        function a(e) {
                            try {
                                o(u.throw(e))
                            } catch (e) {
                                t(e)
                            }
                        }

                        function o(e) {
                            var t;
                            e.done ? n(e.value) : ((t = e.value) instanceof i ? t : new i(function(e) {
                                e(t)
                            })).then(r, a)
                        }
                        o((u = u.apply(e, s || [])).next())
                    })
                },
                S = function(n, r) {
                    var a, o, s, i = {
                            label: 0,
                            sent: function() {
                                if (1 & s[0]) throw s[1];
                                return s[1]
                            },
                            trys: [],
                            ops: []
                        },
                        e = {
                            next: t(0),
                            throw: t(1),
                            return: t(2)
                        };
                    return "function" == typeof Symbol && (e[Symbol.iterator] = function() {
                        return this
                    }), e;

                    function t(t) {
                        return function(e) {
                            return function(t) {
                                if (a) throw new TypeError("Generator is already executing.");
                                for (; i;) try {
                                    if (a = 1, o && (s = 2 & t[0] ? o.return : t[0] ? o.throw || ((s = o.return) && s.call(o), 0) : o.next) && !(s = s.call(o, t[1])).done) return s;
                                    switch (o = 0, s && (t = [2 & t[0], s.value]), t[0]) {
                                        case 0:
                                        case 1:
                                            s = t;
                                            break;
                                        case 4:
                                            return i.label++, {
                                                value: t[1],
                                                done: !1
                                            };
                                        case 5:
                                            i.label++, o = t[1], t = [0];
                                            continue;
                                        case 7:
                                            t = i.ops.pop(), i.trys.pop();
                                            continue;
                                        default:
                                            if (!(s = 0 < (s = i.trys).length && s[s.length - 1]) && (6 === t[0] || 2 === t[0])) {
                                                i = 0;
                                                continue
                                            }
                                            if (3 === t[0] && (!s || t[1] > s[0] && t[1] < s[3])) {
                                                i.label = t[1];
                                                break
                                            }
                                            if (6 === t[0] && i.label < s[1]) {
                                                i.label = s[1], s = t;
                                                break
                                            }
                                            if (s && i.label < s[2]) {
                                                i.label = s[2], i.ops.push(t);
                                                break
                                            }
                                            s[2] && i.ops.pop(), i.trys.pop();
                                            continue
                                    }
                                    t = r.call(n, i)
                                } catch (e) {
                                    t = [6, e], o = 0
                                } finally {
                                    a = s = 0
                                }
                                if (5 & t[0]) throw t[1];
                                return {
                                    value: t[0] ? t[1] : void 0,
                                    done: !0
                                }
                            }([t, e])
                        }
                    }
                };

            function U(h) {
                var e = this;
                return {
                    v1AssetsAssetIdBundlesGet: function(s, i, u, c, l) {
                        return void 0 === l && (l = {}), L(e, void 0, Promise, function() {
                            var t, n, r, a, o;
                            return S(this, function(e) {
                                if (null == s) throw new I("assetId", "Required parameter assetId was null or undefined when calling v1AssetsAssetIdBundlesGet.");
                                return a = "/v1/assets/{assetId}/bundles".replace("{assetId}", encodeURIComponent(String(s))), t = T.Qc(a, !0), h && (o = h.baseOptions), n = q(q({
                                    method: "GET"
                                }, o), l), r = {}, a = {}, void 0 !== i && (a.sortOrder = i), void 0 !== u && (a.limit = u), void 0 !== c && (a.cursor = c), t.query = q(q(q({}, t.query), a), l.query), delete t.search, o = o && o.headers ? o.headers : {}, n.headers = q(q(q({}, r), o), l.headers), [2, {
                                    url: T.WU(t),
                                    options: n
                                }]
                            })
                        })
                    },
                    v1BundlesBundleIdDetailsGet: function(s, i) {
                        return void 0 === i && (i = {}), L(e, void 0, Promise, function() {
                            var t, n, r, a, o;
                            return S(this, function(e) {
                                if (null == s) throw new I("bundleId", "Required parameter bundleId was null or undefined when calling v1BundlesBundleIdDetailsGet.");
                                return a = "/v1/bundles/{bundleId}/details".replace("{bundleId}", encodeURIComponent(String(s))), t = T.Qc(a, !0), h && (o = h.baseOptions), n = q(q({
                                    method: "GET"
                                }, o), i), r = {}, a = {}, t.query = q(q(q({}, t.query), a), i.query), delete t.search, o = o && o.headers ? o.headers : {}, n.headers = q(q(q({}, r), o), i.headers), [2, {
                                    url: T.WU(t),
                                    options: n
                                }]
                            })
                        })
                    },
                    v1BundlesBundleIdRecommendationsGet: function(s, i, u) {
                        return void 0 === u && (u = {}), L(e, void 0, Promise, function() {
                            var t, n, r, a, o;
                            return S(this, function(e) {
                                if (null == s) throw new I("bundleId", "Required parameter bundleId was null or undefined when calling v1BundlesBundleIdRecommendationsGet.");
                                return a = "/v1/bundles/{bundleId}/recommendations".replace("{bundleId}", encodeURIComponent(String(s))), t = T.Qc(a, !0), h && (o = h.baseOptions), n = q(q({
                                    method: "GET"
                                }, o), u), r = {}, a = {}, void 0 !== i && (a.numItems = i), t.query = q(q(q({}, t.query), a), u.query), delete t.search, o = o && o.headers ? o.headers : {}, n.headers = q(q(q({}, r), o), u.headers), [2, {
                                    url: T.WU(t),
                                    options: n
                                }]
                            })
                        })
                    },
                    v1BundlesBundleIdUnpackPost: function(s, i) {
                        return void 0 === i && (i = {}), L(e, void 0, Promise, function() {
                            var t, n, r, a, o;
                            return S(this, function(e) {
                                if (null == s) throw new I("bundleId", "Required parameter bundleId was null or undefined when calling v1BundlesBundleIdUnpackPost.");
                                return a = "/v1/bundles/{bundleId}/unpack".replace("{bundleId}", encodeURIComponent(String(s))), t = T.Qc(a, !0), h && (o = h.baseOptions), n = q(q({
                                    method: "POST"
                                }, o), i), r = {}, a = {}, t.query = q(q(q({}, t.query), a), i.query), delete t.search, o = o && o.headers ? o.headers : {}, n.headers = q(q(q({}, r), o), i.headers), [2, {
                                    url: T.WU(t),
                                    options: n
                                }]
                            })
                        })
                    },
                    v1BundlesDetailsGet: function(s, i) {
                        return void 0 === i && (i = {}), L(e, void 0, Promise, function() {
                            var t, n, r, a, o;
                            return S(this, function(e) {
                                if (null == s) throw new I("bundleIds", "Required parameter bundleIds was null or undefined when calling v1BundlesDetailsGet.");
                                return t = T.Qc("/v1/bundles/details", !0), h && (o = h.baseOptions), n = q(q({
                                    method: "GET"
                                }, o), i), r = {}, a = {}, s && (a.bundleIds = s.join(y)), t.query = q(q(q({}, t.query), a), i.query), delete t.search, o = o && o.headers ? o.headers : {}, n.headers = q(q(q({}, r), o), i.headers), [2, {
                                    url: T.WU(t),
                                    options: n
                                }]
                            })
                        })
                    },
                    v1UsersUserIdBundlesBundleTypeGet: function(s, i, u, c, l, d) {
                        return void 0 === d && (d = {}), L(e, void 0, Promise, function() {
                            var t, n, r, a, o;
                            return S(this, function(e) {
                                if (null == s) throw new I("userId", "Required parameter userId was null or undefined when calling v1UsersUserIdBundlesBundleTypeGet.");
                                if (null == i) throw new I("bundleType", "Required parameter bundleType was null or undefined when calling v1UsersUserIdBundlesBundleTypeGet.");
                                return a = "/v1/users/{userId}/bundles/{bundleType}".replace("{userId}", encodeURIComponent(String(s))).replace("{bundleType}", encodeURIComponent(String(i))), t = T.Qc(a, !0), h && (o = h.baseOptions), n = q(q({
                                    method: "GET"
                                }, o), d), r = {}, a = {}, void 0 !== u && (a.limit = u), void 0 !== c && (a.cursor = c), void 0 !== l && (a.sortOrder = l), t.query = q(q(q({}, t.query), a), d.query), delete t.search, o = o && o.headers ? o.headers : {}, n.headers = q(q(q({}, r), o), d.headers), [2, {
                                    url: T.WU(t),
                                    options: n
                                }]
                            })
                        })
                    },
                    v1UsersUserIdBundlesGet: function(s, i, u, c, l) {
                        return void 0 === l && (l = {}), L(e, void 0, Promise, function() {
                            var t, n, r, a, o;
                            return S(this, function(e) {
                                if (null == s) throw new I("userId", "Required parameter userId was null or undefined when calling v1UsersUserIdBundlesGet.");
                                return a = "/v1/users/{userId}/bundles".replace("{userId}", encodeURIComponent(String(s))), t = T.Qc(a, !0), h && (o = h.baseOptions), n = q(q({
                                    method: "GET"
                                }, o), l), r = {}, a = {}, void 0 !== i && (a.sortOrder = i), void 0 !== u && (a.limit = u), void 0 !== c && (a.cursor = c), t.query = q(q(q({}, t.query), a), l.query), delete t.search, o = o && o.headers ? o.headers : {}, n.headers = q(q(q({}, r), o), l.headers), [2, {
                                    url: T.WU(t),
                                    options: n
                                }]
                            })
                        })
                    }
                }
            }

            function R(u) {
                return {
                    v1AssetsAssetIdBundlesGet: function(t, r, a, o, s) {
                        return L(this, void 0, Promise, function() {
                            var n;
                            return S(this, function(e) {
                                switch (e.label) {
                                    case 0:
                                        return [4, U(u).v1AssetsAssetIdBundlesGet(t, r, a, o, s)];
                                    case 1:
                                        return n = e.sent(), [2, function(e, t) {
                                            void 0 === e && (e = b), void 0 === t && (t = P);
                                            t = q(q({}, n.options), {
                                                url: t + n.url
                                            });
                                            return e.request(t)
                                        }]
                                }
                            })
                        })
                    },
                    v1BundlesBundleIdDetailsGet: function(t, r) {
                        return L(this, void 0, Promise, function() {
                            var n;
                            return S(this, function(e) {
                                switch (e.label) {
                                    case 0:
                                        return [4, U(u).v1BundlesBundleIdDetailsGet(t, r)];
                                    case 1:
                                        return n = e.sent(), [2, function(e, t) {
                                            void 0 === e && (e = b), void 0 === t && (t = P);
                                            t = q(q({}, n.options), {
                                                url: t + n.url
                                            });
                                            return e.request(t)
                                        }]
                                }
                            })
                        })
                    },
                    v1BundlesBundleIdRecommendationsGet: function(t, r, a) {
                        return L(this, void 0, Promise, function() {
                            var n;
                            return S(this, function(e) {
                                switch (e.label) {
                                    case 0:
                                        return [4, U(u).v1BundlesBundleIdRecommendationsGet(t, r, a)];
                                    case 1:
                                        return n = e.sent(), [2, function(e, t) {
                                            void 0 === e && (e = b), void 0 === t && (t = P);
                                            t = q(q({}, n.options), {
                                                url: t + n.url
                                            });
                                            return e.request(t)
                                        }]
                                }
                            })
                        })
                    },
                    v1BundlesBundleIdUnpackPost: function(t, r) {
                        return L(this, void 0, Promise, function() {
                            var n;
                            return S(this, function(e) {
                                switch (e.label) {
                                    case 0:
                                        return [4, U(u).v1BundlesBundleIdUnpackPost(t, r)];
                                    case 1:
                                        return n = e.sent(), [2, function(e, t) {
                                            void 0 === e && (e = b), void 0 === t && (t = P);
                                            t = q(q({}, n.options), {
                                                url: t + n.url
                                            });
                                            return e.request(t)
                                        }]
                                }
                            })
                        })
                    },
                    v1BundlesDetailsGet: function(t, r) {
                        return L(this, void 0, Promise, function() {
                            var n;
                            return S(this, function(e) {
                                switch (e.label) {
                                    case 0:
                                        return [4, U(u).v1BundlesDetailsGet(t, r)];
                                    case 1:
                                        return n = e.sent(), [2, function(e, t) {
                                            void 0 === e && (e = b), void 0 === t && (t = P);
                                            t = q(q({}, n.options), {
                                                url: t + n.url
                                            });
                                            return e.request(t)
                                        }]
                                }
                            })
                        })
                    },
                    v1UsersUserIdBundlesBundleTypeGet: function(t, r, a, o, s, i) {
                        return L(this, void 0, Promise, function() {
                            var n;
                            return S(this, function(e) {
                                switch (e.label) {
                                    case 0:
                                        return [4, U(u).v1UsersUserIdBundlesBundleTypeGet(t, r, a, o, s, i)];
                                    case 1:
                                        return n = e.sent(), [2, function(e, t) {
                                            void 0 === e && (e = b), void 0 === t && (t = P);
                                            t = q(q({}, n.options), {
                                                url: t + n.url
                                            });
                                            return e.request(t)
                                        }]
                                }
                            })
                        })
                    },
                    v1UsersUserIdBundlesGet: function(t, r, a, o, s) {
                        return L(this, void 0, Promise, function() {
                            var n;
                            return S(this, function(e) {
                                switch (e.label) {
                                    case 0:
                                        return [4, U(u).v1UsersUserIdBundlesGet(t, r, a, o, s)];
                                    case 1:
                                        return n = e.sent(), [2, function(e, t) {
                                            void 0 === e && (e = b), void 0 === t && (t = P);
                                            t = q(q({}, n.options), {
                                                url: t + n.url
                                            });
                                            return e.request(t)
                                        }]
                                }
                            })
                        })
                    }
                }
            }(D = {}).Accessories = "Accessories", D.All = "All", D.AvatarAnimations = "AvatarAnimations", D.BackAccessories = "BackAccessories", D.BodyParts = "BodyParts", D.Clothing = "Clothing", D.Collectibles = "Collectibles", D.FaceAccessories = "FaceAccessories", D.Faces = "Faces", D.Featured = "Featured", D.FrontAccessories = "FrontAccessories", D.Gear = "Gear", D.HairAccessories = "HairAccessories", D.Hats = "Hats", D.Heads = "Heads", D.NeckAccessories = "NeckAccessories", D.Pants = "Pants", D.Shirts = "Shirts", D.ShoulderAccessories = "ShoulderAccessories", D.Tshirts = "Tshirts", D.WaistAccessories = "WaistAccessories", D.Bundles = "Bundles", D.AnimationBundles = "AnimationBundles", D.EmoteAnimations = "EmoteAnimations", D.CommunityCreations = "CommunityCreations", D.Melee = "Melee", D.Ranged = "Ranged", D.Explosive = "Explosive", D.PowerUp = "PowerUp", D.Navigation = "Navigation", D.Musical = "Musical", D.Social = "Social", D.Building = "Building", D.Transport = "Transport", D.Premium = "Premium", D.Recommended = "Recommended", (k = {}).Accessories = "Accessories", k.All = "All", k.AvatarAnimations = "AvatarAnimations", k.BodyParts = "BodyParts", k.Clothing = "Clothing", k.Collectibles = "Collectibles", k.Featured = "Featured", k.Gear = "Gear", k.CommunityCreations = "CommunityCreations", k.Premium = "Premium", k.Recommended = "Recommended", (te = {}).Accessories = "Accessories", te.All = "All", te.AvatarAnimations = "AvatarAnimations", te.BodyParts = "BodyParts", te.Clothing = "Clothing", te.Collectibles = "Collectibles", te.Featured = "Featured", te.Gear = "Gear", te.CommunityCreations = "CommunityCreations", te.Premium = "Premium", te.Recommended = "Recommended", (de = {}).User = "User", de.Group = "Group", (he = {}).All = "All", he.Robux = "Robux", he.Tickets = "Tickets", he.CustomRobux = "CustomRobux", he.CustomTickets = "CustomTickets", he.Free = "Free", (pe = {}).Relevance = "Relevance", pe.Favorited = "Favorited", pe.Sales = "Sales", pe.Updated = "Updated", pe.PriceAsc = "PriceAsc", pe.PriceDesc = "PriceDesc", (Ge = {}).Past12Hours = "Past12Hours", Ge.PastDay = "PastDay", Ge.Past3Days = "Past3Days", Ge.PastWeek = "PastWeek", Ge.PastMonth = "PastMonth", Ge.AllTime = "AllTime", (yr = {}).Accessories = "Accessories", yr.All = "All", yr.AvatarAnimations = "AvatarAnimations", yr.BodyParts = "BodyParts", yr.Clothing = "Clothing", yr.Collectibles = "Collectibles", yr.Featured = "Featured", yr.Gear = "Gear", yr.CommunityCreations = "CommunityCreations", yr.Premium = "Premium", yr.Recommended = "Recommended", (fn = {}).Accessories = "Accessories", fn.All = "All", fn.AvatarAnimations = "AvatarAnimations", fn.BackAccessories = "BackAccessories", fn.BodyParts = "BodyParts", fn.Clothing = "Clothing", fn.Collectibles = "Collectibles", fn.FaceAccessories = "FaceAccessories", fn.Faces = "Faces", fn.Featured = "Featured", fn.FrontAccessories = "FrontAccessories", fn.Gear = "Gear", fn.HairAccessories = "HairAccessories", fn.Hats = "Hats", fn.Heads = "Heads", fn.NeckAccessories = "NeckAccessories", fn.Pants = "Pants", fn.Shirts = "Shirts", fn.ShoulderAccessories = "ShoulderAccessories", fn.Tshirts = "Tshirts", fn.WaistAccessories = "WaistAccessories", fn.Bundles = "Bundles", fn.AnimationBundles = "AnimationBundles", fn.EmoteAnimations = "EmoteAnimations", fn.CommunityCreations = "CommunityCreations", fn.Melee = "Melee", fn.Ranged = "Ranged", fn.Explosive = "Explosive", fn.PowerUp = "PowerUp", fn.Navigation = "Navigation", fn.Musical = "Musical", fn.Social = "Social", fn.Building = "Building", fn.Transport = "Transport", fn.Premium = "Premium", fn.Recommended = "Recommended", (Pn = {}).Accessories = "Accessories", Pn.All = "All", Pn.AvatarAnimations = "AvatarAnimations", Pn.BodyParts = "BodyParts", Pn.Clothing = "Clothing", Pn.Collectibles = "Collectibles", Pn.Featured = "Featured", Pn.Gear = "Gear", Pn.CommunityCreations = "CommunityCreations", Pn.Premium = "Premium", Pn.Recommended = "Recommended", (e = {}).All = "All", e.Robux = "Robux", e.Tickets = "Tickets", e.CustomRobux = "CustomRobux", e.CustomTickets = "CustomTickets", e.Free = "Free", (rn = {}).All = "All", rn.Robux = "Robux", rn.Tickets = "Tickets", rn.CustomRobux = "CustomRobux", rn.CustomTickets = "CustomTickets", rn.Free = "Free", (Ae = {}).All = "All", Ae.Robux = "Robux", Ae.Tickets = "Tickets", Ae.CustomRobux = "CustomRobux", Ae.CustomTickets = "CustomTickets", Ae.Free = "Free", (xe = {}).Asset = "Asset", xe.Bundle = "Bundle", ($e = {}).Image = "Image", $e.TShirt = "TShirt", $e.Audio = "Audio", $e.Mesh = "Mesh", $e.Lua = "Lua", $e.HTML = "HTML", $e.Text = "Text", $e.Hat = "Hat", $e.Place = "Place", $e.Model = "Model", $e.Shirt = "Shirt", $e.Pants = "Pants", $e.Decal = "Decal", $e.Avatar = "Avatar", $e.Head = "Head", $e.Face = "Face", $e.Gear = "Gear", $e.Badge = "Badge", $e.GroupEmblem = "GroupEmblem", $e.Animation = "Animation", $e.Arms = "Arms", $e.Legs = "Legs", $e.Torso = "Torso", $e.RightArm = "RightArm", $e.LeftArm = "LeftArm", $e.LeftLeg = "LeftLeg", $e.RightLeg = "RightLeg", $e.Package = "Package", $e.YouTubeVideo = "YouTubeVideo", $e.GamePass = "GamePass", $e.App = "App", $e.Code = "Code", $e.Plugin = "Plugin", $e.SolidModel = "SolidModel", $e.MeshPart = "MeshPart", $e.HairAccessory = "HairAccessory", $e.FaceAccessory = "FaceAccessory", $e.NeckAccessory = "NeckAccessory", $e.ShoulderAccessory = "ShoulderAccessory", $e.FrontAccessory = "FrontAccessory", $e.BackAccessory = "BackAccessory", $e.WaistAccessory = "WaistAccessory", $e.ClimbAnimation = "ClimbAnimation", $e.DeathAnimation = "DeathAnimation", $e.FallAnimation = "FallAnimation", $e.IdleAnimation = "IdleAnimation", $e.JumpAnimation = "JumpAnimation", $e.RunAnimation = "RunAnimation", $e.SwimAnimation = "SwimAnimation", $e.WalkAnimation = "WalkAnimation", $e.PoseAnimation = "PoseAnimation", $e.LocalizationTableManifest = "LocalizationTableManifest", $e.LocalizationTableTranslation = "LocalizationTableTranslation", $e.EmoteAnimation = "EmoteAnimation", $e.Video = "Video", $e.TexturePack = "TexturePack", (t = {}).BodyParts = "BodyParts", t.AvatarAnimations = "AvatarAnimations", (g = {}).All = "All", g.Tutorial = "Tutorial", g.Scary = "Scary", g.TownAndCity = "TownAndCity", g.War = "War", g.Funny = "Funny", g.Fantasy = "Fantasy", g.Adventure = "Adventure", g.SciFi = "SciFi", g.Pirate = "Pirate", g.FPS = "FPS", g.RPG = "RPG", g.Sports = "Sports", g.Ninja = "Ninja", g.WildWest = "WildWest", (D = {}).New = "New", D.Sale = "Sale", D.XboxExclusive = "XboxExclusive", D.AmazonExclusive = "AmazonExclusive", D.GooglePlayExclusive = "GooglePlayExclusive", D.IosExclusive = "IosExclusive", D.SaleTimer = "SaleTimer", (k = {}).ThirteenPlus = "ThirteenPlus", k.LimitedUnique = "LimitedUnique", k.Limited = "Limited", k.BuildersClub = "BuildersClub", k.TurboBuildersClub = "TurboBuildersClub", k.OutrageousBuildersClub = "OutrageousBuildersClub", k.Rthro = "Rthro", (te = {}).User = "User", te.Group = "Group", (de = {}).Asset = "Asset", de.Bundle = "Bundle", (he = {}).Image = "Image", he.TShirt = "TShirt", he.Audio = "Audio", he.Mesh = "Mesh", he.Lua = "Lua", he.HTML = "HTML", he.Text = "Text", he.Hat = "Hat", he.Place = "Place", he.Model = "Model", he.Shirt = "Shirt", he.Pants = "Pants", he.Decal = "Decal", he.Avatar = "Avatar", he.Head = "Head", he.Face = "Face", he.Gear = "Gear", he.Badge = "Badge", he.GroupEmblem = "GroupEmblem", he.Animation = "Animation", he.Arms = "Arms", he.Legs = "Legs", he.Torso = "Torso", he.RightArm = "RightArm", he.LeftArm = "LeftArm", he.LeftLeg = "LeftLeg", he.RightLeg = "RightLeg", he.Package = "Package", he.YouTubeVideo = "YouTubeVideo", he.GamePass = "GamePass", he.App = "App", he.Code = "Code", he.Plugin = "Plugin", he.SolidModel = "SolidModel", he.MeshPart = "MeshPart", he.HairAccessory = "HairAccessory", he.FaceAccessory = "FaceAccessory", he.NeckAccessory = "NeckAccessory", he.ShoulderAccessory = "ShoulderAccessory", he.FrontAccessory = "FrontAccessory", he.BackAccessory = "BackAccessory", he.WaistAccessory = "WaistAccessory", he.ClimbAnimation = "ClimbAnimation", he.DeathAnimation = "DeathAnimation", he.FallAnimation = "FallAnimation", he.IdleAnimation = "IdleAnimation", he.JumpAnimation = "JumpAnimation", he.RunAnimation = "RunAnimation", he.SwimAnimation = "SwimAnimation", he.WalkAnimation = "WalkAnimation", he.PoseAnimation = "PoseAnimation", he.LocalizationTableManifest = "LocalizationTableManifest", he.LocalizationTableTranslation = "LocalizationTableTranslation", he.EmoteAnimation = "EmoteAnimation", he.Video = "Video", he.TexturePack = "TexturePack", (pe = {}).BodyParts = "BodyParts", pe.AvatarAnimations = "AvatarAnimations", (Ge = {}).All = "All", Ge.Tutorial = "Tutorial", Ge.Scary = "Scary", Ge.TownAndCity = "TownAndCity", Ge.War = "War", Ge.Funny = "Funny", Ge.Fantasy = "Fantasy", Ge.Adventure = "Adventure", Ge.SciFi = "SciFi", Ge.Pirate = "Pirate", Ge.FPS = "FPS", Ge.RPG = "RPG", Ge.Sports = "Sports", Ge.Ninja = "Ninja", Ge.WildWest = "WildWest", (yr = {}).New = "New", yr.Sale = "Sale", yr.XboxExclusive = "XboxExclusive", yr.AmazonExclusive = "AmazonExclusive", yr.GooglePlayExclusive = "GooglePlayExclusive", yr.IosExclusive = "IosExclusive", yr.SaleTimer = "SaleTimer", (fn = {}).ThirteenPlus = "ThirteenPlus", fn.LimitedUnique = "LimitedUnique", fn.Limited = "Limited", fn.BuildersClub = "BuildersClub", fn.TurboBuildersClub = "TurboBuildersClub", fn.OutrageousBuildersClub = "OutrageousBuildersClub", fn.Rthro = "Rthro", (Pn = {}).User = "User", Pn.Group = "Group", (e = {}).Accessories = "Accessories", e.All = "All", e.AvatarAnimations = "AvatarAnimations", e.BodyParts = "BodyParts", e.Clothing = "Clothing", e.Collectibles = "Collectibles", e.Featured = "Featured", e.Gear = "Gear", e.CommunityCreations = "CommunityCreations", e.Premium = "Premium", e.Recommended = "Recommended", (rn = {}).Accessories = "Accessories", rn.All = "All", rn.AvatarAnimations = "AvatarAnimations", rn.BackAccessories = "BackAccessories", rn.BodyParts = "BodyParts", rn.Clothing = "Clothing", rn.Collectibles = "Collectibles", rn.FaceAccessories = "FaceAccessories", rn.Faces = "Faces", rn.Featured = "Featured", rn.FrontAccessories = "FrontAccessories", rn.Gear = "Gear", rn.HairAccessories = "HairAccessories", rn.Hats = "Hats", rn.Heads = "Heads", rn.NeckAccessories = "NeckAccessories", rn.Pants = "Pants", rn.Shirts = "Shirts", rn.ShoulderAccessories = "ShoulderAccessories", rn.Tshirts = "Tshirts", rn.WaistAccessories = "WaistAccessories", rn.Bundles = "Bundles", rn.AnimationBundles = "AnimationBundles", rn.EmoteAnimations = "EmoteAnimations", rn.CommunityCreations = "CommunityCreations", rn.Melee = "Melee", rn.Ranged = "Ranged", rn.Explosive = "Explosive", rn.PowerUp = "PowerUp", rn.Navigation = "Navigation", rn.Musical = "Musical", rn.Social = "Social", rn.Building = "Building", rn.Transport = "Transport", rn.Premium = "Premium", rn.Recommended = "Recommended", (Ae = {}).Past12Hours = "Past12Hours", Ae.PastDay = "PastDay", Ae.Past3Days = "Past3Days", Ae.PastWeek = "PastWeek", Ae.PastMonth = "PastMonth", Ae.AllTime = "AllTime", (xe = {}).All = "All", xe.Robux = "Robux", xe.Tickets = "Tickets", xe.CustomRobux = "CustomRobux", xe.CustomTickets = "CustomTickets", xe.Free = "Free", ($e = {}).TownAndCity = "TownAndCity", $e.Medieval = "Medieval", $e.SciFi = "SciFi", $e.Fighting = "Fighting", $e.Horror = "Horror", $e.Naval = "Naval", $e.Adventure = "Adventure", $e.Sports = "Sports", $e.Comedy = "Comedy", $e.Western = "Western", $e.Military = "Military", $e.Building = "Building", $e.Fps = "Fps", $e.Rpg = "Rpg", (t = {}).Relevance = "Relevance", t.Favorited = "Favorited", t.Sales = "Sales", t.Updated = "Updated", t.PriceAsc = "PriceAsc", t.PriceDesc = "PriceDesc", (g = {}).User = "User", g.Group = "Group", (D = {}).Asset = "Asset", D.Bundle = "Bundle", (k = {}).Accessories = "Accessories", k.All = "All", k.AvatarAnimations = "AvatarAnimations", k.BodyParts = "BodyParts", k.Clothing = "Clothing", k.Collectibles = "Collectibles", k.Featured = "Featured", k.Gear = "Gear", k.CommunityCreations = "CommunityCreations", k.Premium = "Premium", k.Recommended = "Recommended", (te = {}).TownAndCity = "TownAndCity", te.Medieval = "Medieval", te.SciFi = "SciFi", te.Fighting = "Fighting", te.Horror = "Horror", te.Naval = "Naval", te.Adventure = "Adventure", te.Sports = "Sports", te.Comedy = "Comedy", te.Western = "Western", te.Military = "Military", te.Building = "Building", te.Fps = "Fps", te.Rpg = "Rpg", (de = {}).Asset = "Asset", de.Bundle = "Bundle", (he = {}).All = "All", he.Robux = "Robux", he.Tickets = "Tickets", he.CustomRobux = "CustomRobux", he.CustomTickets = "CustomTickets", he.Free = "Free", (pe = {}).Past12Hours = "Past12Hours", pe.PastDay = "PastDay", pe.Past3Days = "Past3Days", pe.PastWeek = "PastWeek", pe.PastMonth = "PastMonth", pe.AllTime = "AllTime", (Ge = {}).Relevance = "Relevance", Ge.Favorited = "Favorited", Ge.Sales = "Sales", Ge.Updated = "Updated", Ge.PriceAsc = "PriceAsc", Ge.PriceDesc = "PriceDesc", (yr = {}).Asc = "Asc", yr.Desc = "Desc", (fn = {}).Accessories = "Accessories", fn.All = "All", fn.AvatarAnimations = "AvatarAnimations", fn.BackAccessories = "BackAccessories", fn.BodyParts = "BodyParts", fn.Clothing = "Clothing", fn.Collectibles = "Collectibles", fn.FaceAccessories = "FaceAccessories", fn.Faces = "Faces", fn.Featured = "Featured", fn.FrontAccessories = "FrontAccessories", fn.Gear = "Gear", fn.HairAccessories = "HairAccessories", fn.Hats = "Hats", fn.Heads = "Heads", fn.NeckAccessories = "NeckAccessories", fn.Pants = "Pants", fn.Shirts = "Shirts", fn.ShoulderAccessories = "ShoulderAccessories", fn.Tshirts = "Tshirts", fn.WaistAccessories = "WaistAccessories", fn.Bundles = "Bundles", fn.AnimationBundles = "AnimationBundles", fn.EmoteAnimations = "EmoteAnimations", fn.CommunityCreations = "CommunityCreations", fn.Melee = "Melee", fn.Ranged = "Ranged", fn.Explosive = "Explosive", fn.PowerUp = "PowerUp", fn.Navigation = "Navigation", fn.Musical = "Musical", fn.Social = "Social", fn.Building = "Building", fn.Transport = "Transport", fn.Premium = "Premium", fn.Recommended = "Recommended", (Pn = {}).Asc = "Asc", Pn.Desc = "Desc", (e = {}).Forward = "Forward", e.Backward = "Backward", (rn = {}).Asc = "Asc", rn.Desc = "Desc", (Ae = {}).Forward = "Forward", Ae.Backward = "Backward", (xe = {}).Asc = "Asc", xe.Desc = "Desc", ($e = {}).Forward = "Forward", $e.Backward = "Backward", (t = {}).Asc = "Asc", t.Desc = "Desc", (g = {}).Forward = "Forward", g.Backward = "Backward";
            var O, D = (A(x, O = G), x.prototype.v1AssetsAssetIdBundlesGet = function(e, t, n, r, a) {
                var o = this;
                return R(this.configuration).v1AssetsAssetIdBundlesGet(e, t, n, r, a).then(function(e) {
                    return e(o.axios, o.basePath)
                })
            }, x.prototype.v1BundlesBundleIdDetailsGet = function(e, t) {
                var n = this;
                return R(this.configuration).v1BundlesBundleIdDetailsGet(e, t).then(function(e) {
                    return e(n.axios, n.basePath)
                })
            }, x.prototype.v1BundlesBundleIdRecommendationsGet = function(e, t, n) {
                var r = this;
                return R(this.configuration).v1BundlesBundleIdRecommendationsGet(e, t, n).then(function(e) {
                    return e(r.axios, r.basePath)
                })
            }, x.prototype.v1BundlesBundleIdUnpackPost = function(e, t) {
                var n = this;
                return R(this.configuration).v1BundlesBundleIdUnpackPost(e, t).then(function(e) {
                    return e(n.axios, n.basePath)
                })
            }, x.prototype.v1BundlesDetailsGet = function(e, t) {
                var n = this;
                return R(this.configuration).v1BundlesDetailsGet(e, t).then(function(e) {
                    return e(n.axios, n.basePath)
                })
            }, x.prototype.v1UsersUserIdBundlesBundleTypeGet = function(e, t, n, r, a, o) {
                var s = this;
                return R(this.configuration).v1UsersUserIdBundlesBundleTypeGet(e, t, n, r, a, o).then(function(e) {
                    return e(s.axios, s.basePath)
                })
            }, x.prototype.v1UsersUserIdBundlesGet = function(e, t, n, r, a) {
                var o = this;
                return R(this.configuration).v1UsersUserIdBundlesGet(e, t, n, r, a).then(function(e) {
                    return e(o.axios, o.basePath)
                })
            }, x);

            function x() {
                return null !== O && O.apply(this, arguments) || this
            }

            function E(c) {
                var e = this;
                return {
                    v1CatalogItemsDetailsPost: function(s, i) {
                        return void 0 === i && (i = {}), L(e, void 0, Promise, function() {
                            var t, n, r, a, o;
                            return S(this, function(e) {
                                if (null == s) throw new I("model", "Required parameter model was null or undefined when calling v1CatalogItemsDetailsPost.");
                                return t = T.Qc("/v1/catalog/items/details", !0), c && (o = c.baseOptions), n = q(q({
                                    method: "POST"
                                }, o), i), a = {}, (r = {})["Content-Type"] = "application/json", t.query = q(q(q({}, t.query), a), i.query), delete t.search, o = o && o.headers ? o.headers : {}, n.headers = q(q(q({}, r), o), i.headers), o = "string" != typeof s || "application/json" === n.headers["Content-Type"], n.data = o ? JSON.stringify(void 0 !== s ? s : {}) : s || "", [2, {
                                    url: T.WU(t),
                                    options: n
                                }]
                            })
                        })
                    },
                    v1CatalogItemsItemIdDetailsGet: function(s, i, u) {
                        return void 0 === u && (u = {}), L(e, void 0, Promise, function() {
                            var t, n, r, a, o;
                            return S(this, function(e) {
                                if (null == s) throw new I("itemId", "Required parameter itemId was null or undefined when calling v1CatalogItemsItemIdDetailsGet.");
                                if (null == i) throw new I("itemType", "Required parameter itemType was null or undefined when calling v1CatalogItemsItemIdDetailsGet.");
                                return a = "/v1/catalog/items/{itemId}/details".replace("{itemId}", encodeURIComponent(String(s))), t = T.Qc(a, !0), c && (o = c.baseOptions), n = q(q({
                                    method: "GET"
                                }, o), u), r = {}, a = {}, void 0 !== i && (a.itemType = i), t.query = q(q(q({}, t.query), a), u.query), delete t.search, o = o && o.headers ? o.headers : {}, n.headers = q(q(q({}, r), o), u.headers), [2, {
                                    url: T.WU(t),
                                    options: n
                                }]
                            })
                        })
                    },
                    v1CatalogMetadataGet: function(s) {
                        return void 0 === s && (s = {}), L(e, void 0, Promise, function() {
                            var t, n, r, a, o;
                            return S(this, function(e) {
                                return t = T.Qc("/v1/catalog/metadata", !0), c && (o = c.baseOptions), n = q(q({
                                    method: "GET"
                                }, o), s), r = {}, a = {}, t.query = q(q(q({}, t.query), a), s.query), delete t.search, o = o && o.headers ? o.headers : {}, n.headers = q(q(q({}, r), o), s.headers), [2, {
                                    url: T.WU(t),
                                    options: n
                                }]
                            })
                        })
                    },
                    v1CatalogSortsGet: function(s) {
                        return void 0 === s && (s = {}), L(e, void 0, Promise, function() {
                            var t, n, r, a, o;
                            return S(this, function(e) {
                                return t = T.Qc("/v1/catalog/sorts", !0), c && (o = c.baseOptions), n = q(q({
                                    method: "GET"
                                }, o), s), r = {}, a = {}, t.query = q(q(q({}, t.query), a), s.query), delete t.search, o = o && o.headers ? o.headers : {}, n.headers = q(q(q({}, r), o), s.headers), [2, {
                                    url: T.WU(t),
                                    options: n
                                }]
                            })
                        })
                    }
                }
            }

            function B(o) {
                return {
                    v1CatalogItemsDetailsPost: function(t, r) {
                        return L(this, void 0, Promise, function() {
                            var n;
                            return S(this, function(e) {
                                switch (e.label) {
                                    case 0:
                                        return [4, E(o).v1CatalogItemsDetailsPost(t, r)];
                                    case 1:
                                        return n = e.sent(), [2, function(e, t) {
                                            void 0 === e && (e = b), void 0 === t && (t = P);
                                            t = q(q({}, n.options), {
                                                url: t + n.url
                                            });
                                            return e.request(t)
                                        }]
                                }
                            })
                        })
                    },
                    v1CatalogItemsItemIdDetailsGet: function(t, r, a) {
                        return L(this, void 0, Promise, function() {
                            var n;
                            return S(this, function(e) {
                                switch (e.label) {
                                    case 0:
                                        return [4, E(o).v1CatalogItemsItemIdDetailsGet(t, r, a)];
                                    case 1:
                                        return n = e.sent(), [2, function(e, t) {
                                            void 0 === e && (e = b), void 0 === t && (t = P);
                                            t = q(q({}, n.options), {
                                                url: t + n.url
                                            });
                                            return e.request(t)
                                        }]
                                }
                            })
                        })
                    },
                    v1CatalogMetadataGet: function(t) {
                        return L(this, void 0, Promise, function() {
                            var n;
                            return S(this, function(e) {
                                switch (e.label) {
                                    case 0:
                                        return [4, E(o).v1CatalogMetadataGet(t)];
                                    case 1:
                                        return n = e.sent(), [2, function(e, t) {
                                            void 0 === e && (e = b), void 0 === t && (t = P);
                                            t = q(q({}, n.options), {
                                                url: t + n.url
                                            });
                                            return e.request(t)
                                        }]
                                }
                            })
                        })
                    },
                    v1CatalogSortsGet: function(t) {
                        return L(this, void 0, Promise, function() {
                            var n;
                            return S(this, function(e) {
                                switch (e.label) {
                                    case 0:
                                        return [4, E(o).v1CatalogSortsGet(t)];
                                    case 1:
                                        return n = e.sent(), [2, function(e, t) {
                                            void 0 === e && (e = b), void 0 === t && (t = P);
                                            t = q(q({}, n.options), {
                                                url: t + n.url
                                            });
                                            return e.request(t)
                                        }]
                                }
                            })
                        })
                    }
                }
            }
            var F, z, j, N, k = (A(_, F = G), _.prototype.v1CatalogItemsDetailsPost = function(e, t) {
                var n = this;
                return B(this.configuration).v1CatalogItemsDetailsPost(e, t).then(function(e) {
                    return e(n.axios, n.basePath)
                })
            }, _.prototype.v1CatalogItemsItemIdDetailsGet = function(e, t, n) {
                var r = this;
                return B(this.configuration).v1CatalogItemsItemIdDetailsGet(e, t, n).then(function(e) {
                    return e(r.axios, r.basePath)
                })
            }, _.prototype.v1CatalogMetadataGet = function(e) {
                var t = this;
                return B(this.configuration).v1CatalogMetadataGet(e).then(function(e) {
                    return e(t.axios, t.basePath)
                })
            }, _.prototype.v1CatalogSortsGet = function(e) {
                var t = this;
                return B(this.configuration).v1CatalogSortsGet(e).then(function(e) {
                    return e(t.axios, t.basePath)
                })
            }, _);

            function _() {
                return null !== F && F.apply(this, arguments) || this
            }

            function W(i) {
                var e = this;
                return {
                    v1AssetToCategoryGet: function(s) {
                        return void 0 === s && (s = {}), L(e, void 0, Promise, function() {
                            var t, n, r, a, o;
                            return S(this, function(e) {
                                return t = T.Qc("/v1/asset-to-category", !0), i && (o = i.baseOptions), n = q(q({
                                    method: "GET"
                                }, o), s), r = {}, a = {}, t.query = q(q(q({}, t.query), a), s.query), delete t.search, o = o && o.headers ? o.headers : {}, n.headers = q(q(q({}, r), o), s.headers), [2, {
                                    url: T.WU(t),
                                    options: n
                                }]
                            })
                        })
                    },
                    v1AssetToSubcategoryGet: function(s) {
                        return void 0 === s && (s = {}), L(e, void 0, Promise, function() {
                            var t, n, r, a, o;
                            return S(this, function(e) {
                                return t = T.Qc("/v1/asset-to-subcategory", !0), i && (o = i.baseOptions), n = q(q({
                                    method: "GET"
                                }, o), s), r = {}, a = {}, t.query = q(q(q({}, t.query), a), s.query), delete t.search, o = o && o.headers ? o.headers : {}, n.headers = q(q(q({}, r), o), s.headers), [2, {
                                    url: T.WU(t),
                                    options: n
                                }]
                            })
                        })
                    },
                    v1CategoriesGet: function(s) {
                        return void 0 === s && (s = {}), L(e, void 0, Promise, function() {
                            var t, n, r, a, o;
                            return S(this, function(e) {
                                return t = T.Qc("/v1/categories", !0), i && (o = i.baseOptions), n = q(q({
                                    method: "GET"
                                }, o), s), r = {}, a = {}, t.query = q(q(q({}, t.query), a), s.query), delete t.search, o = o && o.headers ? o.headers : {}, n.headers = q(q(q({}, r), o), s.headers), [2, {
                                    url: T.WU(t),
                                    options: n
                                }]
                            })
                        })
                    },
                    v1SubcategoriesGet: function(s) {
                        return void 0 === s && (s = {}), L(e, void 0, Promise, function() {
                            var t, n, r, a, o;
                            return S(this, function(e) {
                                return t = T.Qc("/v1/subcategories", !0), i && (o = i.baseOptions), n = q(q({
                                    method: "GET"
                                }, o), s), r = {}, a = {}, t.query = q(q(q({}, t.query), a), s.query), delete t.search, o = o && o.headers ? o.headers : {}, n.headers = q(q(q({}, r), o), s.headers), [2, {
                                    url: T.WU(t),
                                    options: n
                                }]
                            })
                        })
                    }
                }
            }

            function M(r) {
                return {
                    v1AssetToCategoryGet: function(t) {
                        return L(this, void 0, Promise, function() {
                            var n;
                            return S(this, function(e) {
                                switch (e.label) {
                                    case 0:
                                        return [4, W(r).v1AssetToCategoryGet(t)];
                                    case 1:
                                        return n = e.sent(), [2, function(e, t) {
                                            void 0 === e && (e = b), void 0 === t && (t = P);
                                            t = q(q({}, n.options), {
                                                url: t + n.url
                                            });
                                            return e.request(t)
                                        }]
                                }
                            })
                        })
                    },
                    v1AssetToSubcategoryGet: function(t) {
                        return L(this, void 0, Promise, function() {
                            var n;
                            return S(this, function(e) {
                                switch (e.label) {
                                    case 0:
                                        return [4, W(r).v1AssetToSubcategoryGet(t)];
                                    case 1:
                                        return n = e.sent(), [2, function(e, t) {
                                            void 0 === e && (e = b), void 0 === t && (t = P);
                                            t = q(q({}, n.options), {
                                                url: t + n.url
                                            });
                                            return e.request(t)
                                        }]
                                }
                            })
                        })
                    },
                    v1CategoriesGet: function(t) {
                        return L(this, void 0, Promise, function() {
                            var n;
                            return S(this, function(e) {
                                switch (e.label) {
                                    case 0:
                                        return [4, W(r).v1CategoriesGet(t)];
                                    case 1:
                                        return n = e.sent(), [2, function(e, t) {
                                            void 0 === e && (e = b), void 0 === t && (t = P);
                                            t = q(q({}, n.options), {
                                                url: t + n.url
                                            });
                                            return e.request(t)
                                        }]
                                }
                            })
                        })
                    },
                    v1SubcategoriesGet: function(t) {
                        return L(this, void 0, Promise, function() {
                            var n;
                            return S(this, function(e) {
                                switch (e.label) {
                                    case 0:
                                        return [4, W(r).v1SubcategoriesGet(t)];
                                    case 1:
                                        return n = e.sent(), [2, function(e, t) {
                                            void 0 === e && (e = b), void 0 === t && (t = P);
                                            t = q(q({}, n.options), {
                                                url: t + n.url
                                            });
                                            return e.request(t)
                                        }]
                                }
                            })
                        })
                    }
                }
            }

            function Q() {
                return null !== z && z.apply(this, arguments) || this
            }

            function H(a) {
                return {
                    v1ExclusiveItemsAppStoreTypeBundlesGet: function(t, r) {
                        return L(this, void 0, Promise, function() {
                            var n;
                            return S(this, function(e) {
                                switch (e.label) {
                                    case 0:
                                        return [4, function(u) {
                                            var e = this;
                                            return {
                                                v1ExclusiveItemsAppStoreTypeBundlesGet: function(s, i) {
                                                    return void 0 === i && (i = {}), L(e, void 0, Promise, function() {
                                                        var t, n, r, a, o;
                                                        return S(this, function(e) {
                                                            if (null == s) throw new I("appStoreType", "Required parameter appStoreType was null or undefined when calling v1ExclusiveItemsAppStoreTypeBundlesGet.");
                                                            return a = "/v1/exclusive-items/{appStoreType}/bundles".replace("{appStoreType}", encodeURIComponent(String(s))), t = T.Qc(a, !0), u && (o = u.baseOptions), n = q(q({
                                                                method: "GET"
                                                            }, o), i), r = {}, a = {}, t.query = q(q(q({}, t.query), a), i.query), delete t.search, o = o && o.headers ? o.headers : {}, n.headers = q(q(q({}, r), o), i.headers), [2, {
                                                                url: T.WU(t),
                                                                options: n
                                                            }]
                                                        })
                                                    })
                                                }
                                            }
                                        }(a).v1ExclusiveItemsAppStoreTypeBundlesGet(t, r)];
                                    case 1:
                                        return n = e.sent(), [2, function(e, t) {
                                            void 0 === e && (e = b), void 0 === t && (t = P);
                                            t = q(q({}, n.options), {
                                                url: t + n.url
                                            });
                                            return e.request(t)
                                        }]
                                }
                            })
                        })
                    }
                }
            }

            function V() {
                return null !== j && j.apply(this, arguments) || this
            }

            function J(c) {
                var e = this;
                return {
                    v1FavoritesAssetsAssetIdCountGet: function(s, i) {
                        return void 0 === i && (i = {}), L(e, void 0, Promise, function() {
                            var t, n, r, a, o;
                            return S(this, function(e) {
                                if (null == s) throw new I("assetId", "Required parameter assetId was null or undefined when calling v1FavoritesAssetsAssetIdCountGet.");
                                return a = "/v1/favorites/assets/{assetId}/count".replace("{assetId}", encodeURIComponent(String(s))), t = T.Qc(a, !0), c && (o = c.baseOptions), n = q(q({
                                    method: "GET"
                                }, o), i), r = {}, a = {}, t.query = q(q(q({}, t.query), a), i.query), delete t.search, o = o && o.headers ? o.headers : {}, n.headers = q(q(q({}, r), o), i.headers), [2, {
                                    url: T.WU(t),
                                    options: n
                                }]
                            })
                        })
                    },
                    v1FavoritesBundlesBundleIdCountGet: function(s, i) {
                        return void 0 === i && (i = {}), L(e, void 0, Promise, function() {
                            var t, n, r, a, o;
                            return S(this, function(e) {
                                if (null == s) throw new I("bundleId", "Required parameter bundleId was null or undefined when calling v1FavoritesBundlesBundleIdCountGet.");
                                return a = "/v1/favorites/bundles/{bundleId}/count".replace("{bundleId}", encodeURIComponent(String(s))), t = T.Qc(a, !0), c && (o = c.baseOptions), n = q(q({
                                    method: "GET"
                                }, o), i), r = {}, a = {}, t.query = q(q(q({}, t.query), a), i.query), delete t.search, o = o && o.headers ? o.headers : {}, n.headers = q(q(q({}, r), o), i.headers), [2, {
                                    url: T.WU(t),
                                    options: n
                                }]
                            })
                        })
                    },
                    v1FavoritesUsersUserIdAssetsAssetIdFavoriteDelete: function(s, i, u) {
                        return void 0 === u && (u = {}), L(e, void 0, Promise, function() {
                            var t, n, r, a, o;
                            return S(this, function(e) {
                                if (null == s) throw new I("userId", "Required parameter userId was null or undefined when calling v1FavoritesUsersUserIdAssetsAssetIdFavoriteDelete.");
                                if (null == i) throw new I("assetId", "Required parameter assetId was null or undefined when calling v1FavoritesUsersUserIdAssetsAssetIdFavoriteDelete.");
                                return a = "/v1/favorites/users/{userId}/assets/{assetId}/favorite".replace("{userId}", encodeURIComponent(String(s))).replace("{assetId}", encodeURIComponent(String(i))), t = T.Qc(a, !0), c && (o = c.baseOptions), n = q(q({
                                    method: "DELETE"
                                }, o), u), r = {}, a = {}, t.query = q(q(q({}, t.query), a), u.query), delete t.search, o = o && o.headers ? o.headers : {}, n.headers = q(q(q({}, r), o), u.headers), [2, {
                                    url: T.WU(t),
                                    options: n
                                }]
                            })
                        })
                    },
                    v1FavoritesUsersUserIdAssetsAssetIdFavoriteGet: function(s, i, u) {
                        return void 0 === u && (u = {}), L(e, void 0, Promise, function() {
                            var t, n, r, a, o;
                            return S(this, function(e) {
                                if (null == s) throw new I("userId", "Required parameter userId was null or undefined when calling v1FavoritesUsersUserIdAssetsAssetIdFavoriteGet.");
                                if (null == i) throw new I("assetId", "Required parameter assetId was null or undefined when calling v1FavoritesUsersUserIdAssetsAssetIdFavoriteGet.");
                                return a = "/v1/favorites/users/{userId}/assets/{assetId}/favorite".replace("{userId}", encodeURIComponent(String(s))).replace("{assetId}", encodeURIComponent(String(i))), t = T.Qc(a, !0), c && (o = c.baseOptions), n = q(q({
                                    method: "GET"
                                }, o), u), r = {}, a = {}, t.query = q(q(q({}, t.query), a), u.query), delete t.search, o = o && o.headers ? o.headers : {}, n.headers = q(q(q({}, r), o), u.headers), [2, {
                                    url: T.WU(t),
                                    options: n
                                }]
                            })
                        })
                    },
                    v1FavoritesUsersUserIdAssetsAssetIdFavoritePost: function(s, i, u) {
                        return void 0 === u && (u = {}), L(e, void 0, Promise, function() {
                            var t, n, r, a, o;
                            return S(this, function(e) {
                                if (null == s) throw new I("userId", "Required parameter userId was null or undefined when calling v1FavoritesUsersUserIdAssetsAssetIdFavoritePost.");
                                if (null == i) throw new I("assetId", "Required parameter assetId was null or undefined when calling v1FavoritesUsersUserIdAssetsAssetIdFavoritePost.");
                                return a = "/v1/favorites/users/{userId}/assets/{assetId}/favorite".replace("{userId}", encodeURIComponent(String(s))).replace("{assetId}", encodeURIComponent(String(i))), t = T.Qc(a, !0), c && (o = c.baseOptions), n = q(q({
                                    method: "POST"
                                }, o), u), r = {}, a = {}, t.query = q(q(q({}, t.query), a), u.query), delete t.search, o = o && o.headers ? o.headers : {}, n.headers = q(q(q({}, r), o), u.headers), [2, {
                                    url: T.WU(t),
                                    options: n
                                }]
                            })
                        })
                    },
                    v1FavoritesUsersUserIdBundlesBundleIdFavoriteDelete: function(s, i, u) {
                        return void 0 === u && (u = {}), L(e, void 0, Promise, function() {
                            var t, n, r, a, o;
                            return S(this, function(e) {
                                if (null == s) throw new I("userId", "Required parameter userId was null or undefined when calling v1FavoritesUsersUserIdBundlesBundleIdFavoriteDelete.");
                                if (null == i) throw new I("bundleId", "Required parameter bundleId was null or undefined when calling v1FavoritesUsersUserIdBundlesBundleIdFavoriteDelete.");
                                return a = "/v1/favorites/users/{userId}/bundles/{bundleId}/favorite".replace("{userId}", encodeURIComponent(String(s))).replace("{bundleId}", encodeURIComponent(String(i))), t = T.Qc(a, !0), c && (o = c.baseOptions), n = q(q({
                                    method: "DELETE"
                                }, o), u), r = {}, a = {}, t.query = q(q(q({}, t.query), a), u.query), delete t.search, o = o && o.headers ? o.headers : {}, n.headers = q(q(q({}, r), o), u.headers), [2, {
                                    url: T.WU(t),
                                    options: n
                                }]
                            })
                        })
                    },
                    v1FavoritesUsersUserIdBundlesBundleIdFavoriteGet: function(s, i, u) {
                        return void 0 === u && (u = {}), L(e, void 0, Promise, function() {
                            var t, n, r, a, o;
                            return S(this, function(e) {
                                if (null == s) throw new I("userId", "Required parameter userId was null or undefined when calling v1FavoritesUsersUserIdBundlesBundleIdFavoriteGet.");
                                if (null == i) throw new I("bundleId", "Required parameter bundleId was null or undefined when calling v1FavoritesUsersUserIdBundlesBundleIdFavoriteGet.");
                                return a = "/v1/favorites/users/{userId}/bundles/{bundleId}/favorite".replace("{userId}", encodeURIComponent(String(s))).replace("{bundleId}", encodeURIComponent(String(i))), t = T.Qc(a, !0), c && (o = c.baseOptions), n = q(q({
                                    method: "GET"
                                }, o), u), r = {}, a = {}, t.query = q(q(q({}, t.query), a), u.query), delete t.search, o = o && o.headers ? o.headers : {}, n.headers = q(q(q({}, r), o), u.headers), [2, {
                                    url: T.WU(t),
                                    options: n
                                }]
                            })
                        })
                    },
                    v1FavoritesUsersUserIdBundlesBundleIdFavoritePost: function(s, i, u) {
                        return void 0 === u && (u = {}), L(e, void 0, Promise, function() {
                            var t, n, r, a, o;
                            return S(this, function(e) {
                                if (null == s) throw new I("userId", "Required parameter userId was null or undefined when calling v1FavoritesUsersUserIdBundlesBundleIdFavoritePost.");
                                if (null == i) throw new I("bundleId", "Required parameter bundleId was null or undefined when calling v1FavoritesUsersUserIdBundlesBundleIdFavoritePost.");
                                return a = "/v1/favorites/users/{userId}/bundles/{bundleId}/favorite".replace("{userId}", encodeURIComponent(String(s))).replace("{bundleId}", encodeURIComponent(String(i))), t = T.Qc(a, !0), c && (o = c.baseOptions), n = q(q({
                                    method: "POST"
                                }, o), u), r = {}, a = {}, t.query = q(q(q({}, t.query), a), u.query), delete t.search, o = o && o.headers ? o.headers : {}, n.headers = q(q(q({}, r), o), u.headers), [2, {
                                    url: T.WU(t),
                                    options: n
                                }]
                            })
                        })
                    }
                }
            }

            function K(o) {
                return {
                    v1FavoritesAssetsAssetIdCountGet: function(t, r) {
                        return L(this, void 0, Promise, function() {
                            var n;
                            return S(this, function(e) {
                                switch (e.label) {
                                    case 0:
                                        return [4, J(o).v1FavoritesAssetsAssetIdCountGet(t, r)];
                                    case 1:
                                        return n = e.sent(), [2, function(e, t) {
                                            void 0 === e && (e = b), void 0 === t && (t = P);
                                            t = q(q({}, n.options), {
                                                url: t + n.url
                                            });
                                            return e.request(t)
                                        }]
                                }
                            })
                        })
                    },
                    v1FavoritesBundlesBundleIdCountGet: function(t, r) {
                        return L(this, void 0, Promise, function() {
                            var n;
                            return S(this, function(e) {
                                switch (e.label) {
                                    case 0:
                                        return [4, J(o).v1FavoritesBundlesBundleIdCountGet(t, r)];
                                    case 1:
                                        return n = e.sent(), [2, function(e, t) {
                                            void 0 === e && (e = b), void 0 === t && (t = P);
                                            t = q(q({}, n.options), {
                                                url: t + n.url
                                            });
                                            return e.request(t)
                                        }]
                                }
                            })
                        })
                    },
                    v1FavoritesUsersUserIdAssetsAssetIdFavoriteDelete: function(t, r, a) {
                        return L(this, void 0, Promise, function() {
                            var n;
                            return S(this, function(e) {
                                switch (e.label) {
                                    case 0:
                                        return [4, J(o).v1FavoritesUsersUserIdAssetsAssetIdFavoriteDelete(t, r, a)];
                                    case 1:
                                        return n = e.sent(), [2, function(e, t) {
                                            void 0 === e && (e = b), void 0 === t && (t = P);
                                            t = q(q({}, n.options), {
                                                url: t + n.url
                                            });
                                            return e.request(t)
                                        }]
                                }
                            })
                        })
                    },
                    v1FavoritesUsersUserIdAssetsAssetIdFavoriteGet: function(t, r, a) {
                        return L(this, void 0, Promise, function() {
                            var n;
                            return S(this, function(e) {
                                switch (e.label) {
                                    case 0:
                                        return [4, J(o).v1FavoritesUsersUserIdAssetsAssetIdFavoriteGet(t, r, a)];
                                    case 1:
                                        return n = e.sent(), [2, function(e, t) {
                                            void 0 === e && (e = b), void 0 === t && (t = P);
                                            t = q(q({}, n.options), {
                                                url: t + n.url
                                            });
                                            return e.request(t)
                                        }]
                                }
                            })
                        })
                    },
                    v1FavoritesUsersUserIdAssetsAssetIdFavoritePost: function(t, r, a) {
                        return L(this, void 0, Promise, function() {
                            var n;
                            return S(this, function(e) {
                                switch (e.label) {
                                    case 0:
                                        return [4, J(o).v1FavoritesUsersUserIdAssetsAssetIdFavoritePost(t, r, a)];
                                    case 1:
                                        return n = e.sent(), [2, function(e, t) {
                                            void 0 === e && (e = b), void 0 === t && (t = P);
                                            t = q(q({}, n.options), {
                                                url: t + n.url
                                            });
                                            return e.request(t)
                                        }]
                                }
                            })
                        })
                    },
                    v1FavoritesUsersUserIdBundlesBundleIdFavoriteDelete: function(t, r, a) {
                        return L(this, void 0, Promise, function() {
                            var n;
                            return S(this, function(e) {
                                switch (e.label) {
                                    case 0:
                                        return [4, J(o).v1FavoritesUsersUserIdBundlesBundleIdFavoriteDelete(t, r, a)];
                                    case 1:
                                        return n = e.sent(), [2, function(e, t) {
                                            void 0 === e && (e = b), void 0 === t && (t = P);
                                            t = q(q({}, n.options), {
                                                url: t + n.url
                                            });
                                            return e.request(t)
                                        }]
                                }
                            })
                        })
                    },
                    v1FavoritesUsersUserIdBundlesBundleIdFavoriteGet: function(t, r, a) {
                        return L(this, void 0, Promise, function() {
                            var n;
                            return S(this, function(e) {
                                switch (e.label) {
                                    case 0:
                                        return [4, J(o).v1FavoritesUsersUserIdBundlesBundleIdFavoriteGet(t, r, a)];
                                    case 1:
                                        return n = e.sent(), [2, function(e, t) {
                                            void 0 === e && (e = b), void 0 === t && (t = P);
                                            t = q(q({}, n.options), {
                                                url: t + n.url
                                            });
                                            return e.request(t)
                                        }]
                                }
                            })
                        })
                    },
                    v1FavoritesUsersUserIdBundlesBundleIdFavoritePost: function(t, r, a) {
                        return L(this, void 0, Promise, function() {
                            var n;
                            return S(this, function(e) {
                                switch (e.label) {
                                    case 0:
                                        return [4, J(o).v1FavoritesUsersUserIdBundlesBundleIdFavoritePost(t, r, a)];
                                    case 1:
                                        return n = e.sent(), [2, function(e, t) {
                                            void 0 === e && (e = b), void 0 === t && (t = P);
                                            t = q(q({}, n.options), {
                                                url: t + n.url
                                            });
                                            return e.request(t)
                                        }]
                                }
                            })
                        })
                    }
                }
            }

            function $() {
                return null !== N && N.apply(this, arguments) || this
            }

            function X(l) {
                var e = this;
                return {
                    v1RecommendationsAssetAssetTypeIdGet: function(s, i, u, c) {
                        return void 0 === c && (c = {}), L(e, void 0, Promise, function() {
                            var t, n, r, a, o;
                            return S(this, function(e) {
                                if (null == s) throw new I("assetTypeId", "Required parameter assetTypeId was null or undefined when calling v1RecommendationsAssetAssetTypeIdGet.");
                                return a = "/v1/recommendations/asset/{assetTypeId}".replace("{assetTypeId}", encodeURIComponent(String(s))), t = T.Qc(a, !0), l && (o = l.baseOptions), n = q(q({
                                    method: "GET"
                                }, o), c), r = {}, a = {}, void 0 !== i && (a.numItems = i), void 0 !== u && (a.contextAssetId = u), t.query = q(q(q({}, t.query), a), c.query), delete t.search, o = o && o.headers ? o.headers : {}, n.headers = q(q(q({}, r), o), c.headers), [2, {
                                    url: T.WU(t),
                                    options: n
                                }]
                            })
                        })
                    },
                    v1RecommendationsMetadataGet: function(s, i) {
                        return void 0 === i && (i = {}), L(e, void 0, Promise, function() {
                            var t, n, r, a, o;
                            return S(this, function(e) {
                                return t = T.Qc("/v1/recommendations/metadata", !0), l && (o = l.baseOptions), n = q(q({
                                    method: "GET"
                                }, o), i), r = {}, a = {}, void 0 !== s && (a.page = s), t.query = q(q(q({}, t.query), a), i.query), delete t.search, o = o && o.headers ? o.headers : {}, n.headers = q(q(q({}, r), o), i.headers), [2, {
                                    url: T.WU(t),
                                    options: n
                                }]
                            })
                        })
                    }
                }
            }

            function Y(s) {
                return {
                    v1RecommendationsAssetAssetTypeIdGet: function(t, r, a, o) {
                        return L(this, void 0, Promise, function() {
                            var n;
                            return S(this, function(e) {
                                switch (e.label) {
                                    case 0:
                                        return [4, X(s).v1RecommendationsAssetAssetTypeIdGet(t, r, a, o)];
                                    case 1:
                                        return n = e.sent(), [2, function(e, t) {
                                            void 0 === e && (e = b), void 0 === t && (t = P);
                                            t = q(q({}, n.options), {
                                                url: t + n.url
                                            });
                                            return e.request(t)
                                        }]
                                }
                            })
                        })
                    },
                    v1RecommendationsMetadataGet: function(t, r) {
                        return L(this, void 0, Promise, function() {
                            var n;
                            return S(this, function(e) {
                                switch (e.label) {
                                    case 0:
                                        return [4, X(s).v1RecommendationsMetadataGet(t, r)];
                                    case 1:
                                        return n = e.sent(), [2, function(e, t) {
                                            void 0 === e && (e = b), void 0 === t && (t = P);
                                            t = q(q({}, n.options), {
                                                url: t + n.url
                                            });
                                            return e.request(t)
                                        }]
                                }
                            })
                        })
                    }
                }
            }
            A(Q, z = G), Q.prototype.v1AssetToCategoryGet = function(e) {
                var t = this;
                return M(this.configuration).v1AssetToCategoryGet(e).then(function(e) {
                    return e(t.axios, t.basePath)
                })
            }, Q.prototype.v1AssetToSubcategoryGet = function(e) {
                var t = this;
                return M(this.configuration).v1AssetToSubcategoryGet(e).then(function(e) {
                    return e(t.axios, t.basePath)
                })
            }, Q.prototype.v1CategoriesGet = function(e) {
                var t = this;
                return M(this.configuration).v1CategoriesGet(e).then(function(e) {
                    return e(t.axios, t.basePath)
                })
            }, Q.prototype.v1SubcategoriesGet = function(e) {
                var t = this;
                return M(this.configuration).v1SubcategoriesGet(e).then(function(e) {
                    return e(t.axios, t.basePath)
                })
            }, A(V, j = G), V.prototype.v1ExclusiveItemsAppStoreTypeBundlesGet = function(e, t) {
                var n = this;
                return H(this.configuration).v1ExclusiveItemsAppStoreTypeBundlesGet(e, t).then(function(e) {
                    return e(n.axios, n.basePath)
                })
            }, A($, N = G), $.prototype.v1FavoritesAssetsAssetIdCountGet = function(e, t) {
                var n = this;
                return K(this.configuration).v1FavoritesAssetsAssetIdCountGet(e, t).then(function(e) {
                    return e(n.axios, n.basePath)
                })
            }, $.prototype.v1FavoritesBundlesBundleIdCountGet = function(e, t) {
                var n = this;
                return K(this.configuration).v1FavoritesBundlesBundleIdCountGet(e, t).then(function(e) {
                    return e(n.axios, n.basePath)
                })
            }, $.prototype.v1FavoritesUsersUserIdAssetsAssetIdFavoriteDelete = function(e, t, n) {
                var r = this;
                return K(this.configuration).v1FavoritesUsersUserIdAssetsAssetIdFavoriteDelete(e, t, n).then(function(e) {
                    return e(r.axios, r.basePath)
                })
            }, $.prototype.v1FavoritesUsersUserIdAssetsAssetIdFavoriteGet = function(e, t, n) {
                var r = this;
                return K(this.configuration).v1FavoritesUsersUserIdAssetsAssetIdFavoriteGet(e, t, n).then(function(e) {
                    return e(r.axios, r.basePath)
                })
            }, $.prototype.v1FavoritesUsersUserIdAssetsAssetIdFavoritePost = function(e, t, n) {
                var r = this;
                return K(this.configuration).v1FavoritesUsersUserIdAssetsAssetIdFavoritePost(e, t, n).then(function(e) {
                    return e(r.axios, r.basePath)
                })
            }, $.prototype.v1FavoritesUsersUserIdBundlesBundleIdFavoriteDelete = function(e, t, n) {
                var r = this;
                return K(this.configuration).v1FavoritesUsersUserIdBundlesBundleIdFavoriteDelete(e, t, n).then(function(e) {
                    return e(r.axios, r.basePath)
                })
            }, $.prototype.v1FavoritesUsersUserIdBundlesBundleIdFavoriteGet = function(e, t, n) {
                var r = this;
                return K(this.configuration).v1FavoritesUsersUserIdBundlesBundleIdFavoriteGet(e, t, n).then(function(e) {
                    return e(r.axios, r.basePath)
                })
            }, $.prototype.v1FavoritesUsersUserIdBundlesBundleIdFavoritePost = function(e, t, n) {
                var r = this;
                return K(this.configuration).v1FavoritesUsersUserIdBundlesBundleIdFavoritePost(e, t, n).then(function(e) {
                    return e(r.axios, r.basePath)
                })
            };
            var Z, ee, te = (A(ne, Z = G), ne.prototype.v1RecommendationsAssetAssetTypeIdGet = function(e, t, n, r) {
                var a = this;
                return Y(this.configuration).v1RecommendationsAssetAssetTypeIdGet(e, t, n, r).then(function(e) {
                    return e(a.axios, a.basePath)
                })
            }, ne.prototype.v1RecommendationsMetadataGet = function(e, t) {
                var n = this;
                return Y(this.configuration).v1RecommendationsMetadataGet(e, t).then(function(e) {
                    return e(n.axios, n.basePath)
                })
            }, ne);

            function ne() {
                return null !== Z && Z.apply(this, arguments) || this
            }

            function re(C) {
                var e = this;
                return {
                    v1SearchItemsDetailsGet: function(s, i, u, c, l, d, h, v, p, f, m, g, y, G, I, b, P, w) {
                        return void 0 === w && (w = {}), L(e, void 0, Promise, function() {
                            var t, n, r, a, o;
                            return S(this, function(e) {
                                return t = T.Qc("/v1/search/items/details", !0), C && (o = C.baseOptions), n = q(q({
                                    method: "GET"
                                }, o), w), r = {}, a = {}, void 0 !== s && (a["model.category"] = s), void 0 !== i && (a["model.subcategory"] = i), void 0 !== u && (a["model.sortAggregation"] = u), void 0 !== c && (a["model.sortCurrency"] = c), l && (a["model.genres"] = l), void 0 !== d && (a["model.sortType"] = d), void 0 !== h && (a["model.creatorType"] = h), void 0 !== v && (a["model.creatorTargetId"] = v), void 0 !== p && (a["model.creatorName"] = p), void 0 !== f && (a["model.maxPrice"] = f), void 0 !== m && (a["model.minPrice"] = m), void 0 !== g && (a["model.keyword"] = g), void 0 !== y && (a["model.includeNotForSale"] = y), G && (a["model.tagNames"] = G), void 0 !== I && (a.sortOrder = I), void 0 !== b && (a.limit = b), void 0 !== P && (a.cursor = P), t.query = q(q(q({}, t.query), a), w.query), delete t.search, o = o && o.headers ? o.headers : {}, n.headers = q(q(q({}, r), o), w.headers), [2, {
                                    url: T.WU(t),
                                    options: n
                                }]
                            })
                        })
                    },
                    v1SearchItemsGet: function(s, i, u, c, l, d, h, v, p, f, m, g, y, G, I, b, P, w) {
                        return void 0 === w && (w = {}), L(e, void 0, Promise, function() {
                            var t, n, r, a, o;
                            return S(this, function(e) {
                                return t = T.Qc("/v1/search/items", !0), C && (o = C.baseOptions), n = q(q({
                                    method: "GET"
                                }, o), w), r = {}, a = {}, void 0 !== s && (a["model.category"] = s), void 0 !== i && (a["model.subcategory"] = i), void 0 !== u && (a["model.sortAggregation"] = u), void 0 !== c && (a["model.sortCurrency"] = c), l && (a["model.genres"] = l), void 0 !== d && (a["model.sortType"] = d), void 0 !== h && (a["model.creatorType"] = h), void 0 !== v && (a["model.creatorTargetId"] = v), void 0 !== p && (a["model.creatorName"] = p), void 0 !== f && (a["model.maxPrice"] = f), void 0 !== m && (a["model.minPrice"] = m), void 0 !== g && (a["model.keyword"] = g), void 0 !== y && (a["model.includeNotForSale"] = y), G && (a["model.tagNames"] = G), void 0 !== I && (a.sortOrder = I), void 0 !== b && (a.limit = b), void 0 !== P && (a.cursor = P), t.query = q(q(q({}, t.query), a), w.query), delete t.search, o = o && o.headers ? o.headers : {}, n.headers = q(q(q({}, r), o), w.headers), [2, {
                                    url: T.WU(t),
                                    options: n
                                }]
                            })
                        })
                    },
                    v1SearchNavigationMenuItemsGet: function(s) {
                        return void 0 === s && (s = {}), L(e, void 0, Promise, function() {
                            var t, n, r, a, o;
                            return S(this, function(e) {
                                return t = T.Qc("/v1/search/navigation-menu-items", !0), C && (o = C.baseOptions), n = q(q({
                                    method: "GET"
                                }, o), s), r = {}, a = {}, t.query = q(q(q({}, t.query), a), s.query), delete t.search, o = o && o.headers ? o.headers : {}, n.headers = q(q(q({}, r), o), s.headers), [2, {
                                    url: T.WU(t),
                                    options: n
                                }]
                            })
                        })
                    }
                }
            }

            function ae(I) {
                return {
                    v1SearchItemsDetailsGet: function(t, r, a, o, s, i, u, c, l, d, h, v, p, f, m, g, y, G) {
                        return L(this, void 0, Promise, function() {
                            var n;
                            return S(this, function(e) {
                                switch (e.label) {
                                    case 0:
                                        return [4, re(I).v1SearchItemsDetailsGet(t, r, a, o, s, i, u, c, l, d, h, v, p, f, m, g, y, G)];
                                    case 1:
                                        return n = e.sent(), [2, function(e, t) {
                                            void 0 === e && (e = b), void 0 === t && (t = P);
                                            t = q(q({}, n.options), {
                                                url: t + n.url
                                            });
                                            return e.request(t)
                                        }]
                                }
                            })
                        })
                    },
                    v1SearchItemsGet: function(t, r, a, o, s, i, u, c, l, d, h, v, p, f, m, g, y, G) {
                        return L(this, void 0, Promise, function() {
                            var n;
                            return S(this, function(e) {
                                switch (e.label) {
                                    case 0:
                                        return [4, re(I).v1SearchItemsGet(t, r, a, o, s, i, u, c, l, d, h, v, p, f, m, g, y, G)];
                                    case 1:
                                        return n = e.sent(), [2, function(e, t) {
                                            void 0 === e && (e = b), void 0 === t && (t = P);
                                            t = q(q({}, n.options), {
                                                url: t + n.url
                                            });
                                            return e.request(t)
                                        }]
                                }
                            })
                        })
                    },
                    v1SearchNavigationMenuItemsGet: function(t) {
                        return L(this, void 0, Promise, function() {
                            var n;
                            return S(this, function(e) {
                                switch (e.label) {
                                    case 0:
                                        return [4, re(I).v1SearchNavigationMenuItemsGet(t)];
                                    case 1:
                                        return n = e.sent(), [2, function(e, t) {
                                            void 0 === e && (e = b), void 0 === t && (t = P);
                                            t = q(q({}, n.options), {
                                                url: t + n.url
                                            });
                                            return e.request(t)
                                        }]
                                }
                            })
                        })
                    }
                }
            }

            function oe() {
                return null !== ee && ee.apply(this, arguments) || this
            }
            A(oe, ee = G), oe.prototype.v1SearchItemsDetailsGet = function(e, t, n, r, a, o, s, i, u, c, l, d, h, v, p, f, m, g) {
                var y = this;
                return ae(this.configuration).v1SearchItemsDetailsGet(e, t, n, r, a, o, s, i, u, c, l, d, h, v, p, f, m, g).then(function(e) {
                    return e(y.axios, y.basePath)
                })
            }, oe.prototype.v1SearchItemsGet = function(e, t, n, r, a, o, s, i, u, c, l, d, h, v, p, f, m, g) {
                var y = this;
                return ae(this.configuration).v1SearchItemsGet(e, t, n, r, a, o, s, i, u, c, l, d, h, v, p, f, m, g).then(function(e) {
                    return e(y.axios, y.basePath)
                })
            }, oe.prototype.v1SearchNavigationMenuItemsGet = function(e) {
                var t = this;
                return ae(this.configuration).v1SearchNavigationMenuItemsGet(e).then(function(e) {
                    return e(t.axios, t.basePath)
                })
            };
            var se, ie, ue = new D,
                ce = new k,
                le = new te,
                de = {
                    getAssetRecommendations: function(e, t, n) {
                        return le.v1RecommendationsAssetAssetTypeIdGet(e, t, n)
                    },
                    getBundleRecommendations: function(e, t) {
                        return ue.v1BundlesBundleIdRecommendationsGet(e, t, {
                            withCredentials: !0
                        })
                    },
                    postItemDetails: function(e) {
                        return ce.v1CatalogItemsDetailsPost(e, {
                            withCredentials: !0
                        })
                    }
                },
                he = (se = function(e, t) {
                    return (se = Object.setPrototypeOf || {
                            __proto__: []
                        }
                        instanceof Array && function(e, t) {
                            e.__proto__ = t
                        } || function(e, t) {
                            for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n])
                        })(e, t)
                }, function(e, t) {
                    if ("function" != typeof t && null !== t) throw new TypeError("Class extends value " + String(t) + " is not a constructor or null");

                    function n() {
                        this.constructor = e
                    }
                    se(e, t), e.prototype = null === t ? Object.create(t) : (n.prototype = t.prototype, new n)
                }),
                ve = i.EnvironmentUrls.gameInternationalizationApi.replace(/\/+$/, ""),
                pe = function(e, t, n) {
                    void 0 === t && (t = ve), void 0 === n && (n = b), this.basePath = t, this.axios = n, e && (this.configuration = e, this.basePath = e.basePath || this.basePath)
                },
                fe = (ie = Error, he(me, ie), me);

            function me(e, t) {
                t = ie.call(this, t) || this;
                return t.field = e, t.name = "RequiredError", t
            }
            var ge, ye, Ge = (ge = function(e, t) {
                    return (ge = Object.setPrototypeOf || {
                            __proto__: []
                        }
                        instanceof Array && function(e, t) {
                            e.__proto__ = t
                        } || function(e, t) {
                            for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n])
                        })(e, t)
                }, function(e, t) {
                    if ("function" != typeof t && null !== t) throw new TypeError("Class extends value " + String(t) + " is not a constructor or null");

                    function n() {
                        this.constructor = e
                    }
                    ge(e, t), e.prototype = null === t ? Object.create(t) : (n.prototype = t.prototype, new n)
                }),
                Ie = function() {
                    return (Ie = Object.assign || function(e) {
                        for (var t, n = 1, r = arguments.length; n < r; n++)
                            for (var a in t = arguments[n]) Object.prototype.hasOwnProperty.call(t, a) && (e[a] = t[a]);
                        return e
                    }).apply(this, arguments)
                },
                be = function(e, s, i, u) {
                    return new(i = i || Promise)(function(n, t) {
                        function r(e) {
                            try {
                                o(u.next(e))
                            } catch (e) {
                                t(e)
                            }
                        }

                        function a(e) {
                            try {
                                o(u.throw(e))
                            } catch (e) {
                                t(e)
                            }
                        }

                        function o(e) {
                            var t;
                            e.done ? n(e.value) : ((t = e.value) instanceof i ? t : new i(function(e) {
                                e(t)
                            })).then(r, a)
                        }
                        o((u = u.apply(e, s || [])).next())
                    })
                },
                Pe = function(n, r) {
                    var a, o, s, i = {
                            label: 0,
                            sent: function() {
                                if (1 & s[0]) throw s[1];
                                return s[1]
                            },
                            trys: [],
                            ops: []
                        },
                        e = {
                            next: t(0),
                            throw: t(1),
                            return: t(2)
                        };
                    return "function" == typeof Symbol && (e[Symbol.iterator] = function() {
                        return this
                    }), e;

                    function t(t) {
                        return function(e) {
                            return function(t) {
                                if (a) throw new TypeError("Generator is already executing.");
                                for (; i;) try {
                                    if (a = 1, o && (s = 2 & t[0] ? o.return : t[0] ? o.throw || ((s = o.return) && s.call(o), 0) : o.next) && !(s = s.call(o, t[1])).done) return s;
                                    switch (o = 0, s && (t = [2 & t[0], s.value]), t[0]) {
                                        case 0:
                                        case 1:
                                            s = t;
                                            break;
                                        case 4:
                                            return i.label++, {
                                                value: t[1],
                                                done: !1
                                            };
                                        case 5:
                                            i.label++, o = t[1], t = [0];
                                            continue;
                                        case 7:
                                            t = i.ops.pop(), i.trys.pop();
                                            continue;
                                        default:
                                            if (!(s = 0 < (s = i.trys).length && s[s.length - 1]) && (6 === t[0] || 2 === t[0])) {
                                                i = 0;
                                                continue
                                            }
                                            if (3 === t[0] && (!s || t[1] > s[0] && t[1] < s[3])) {
                                                i.label = t[1];
                                                break
                                            }
                                            if (6 === t[0] && i.label < s[1]) {
                                                i.label = s[1], s = t;
                                                break
                                            }
                                            if (s && i.label < s[2]) {
                                                i.label = s[2], i.ops.push(t);
                                                break
                                            }
                                            s[2] && i.ops.pop(), i.trys.pop();
                                            continue
                                    }
                                    t = r.call(n, i)
                                } catch (e) {
                                    t = [6, e], o = 0
                                } finally {
                                    a = s = 0
                                }
                                if (5 & t[0]) throw t[1];
                                return {
                                    value: t[0] ? t[1] : void 0,
                                    done: !0
                                }
                            }([t, e])
                        }
                    }
                };

            function we(c) {
                var e = this;
                return {
                    v1AutolocalizationGamesGameIdAutolocalizationtablePatch: function(s, i, u) {
                        return void 0 === u && (u = {}), be(e, void 0, Promise, function() {
                            var t, n, r, a, o;
                            return Pe(this, function(e) {
                                if (null == s) throw new fe("gameId", "Required parameter gameId was null or undefined when calling v1AutolocalizationGamesGameIdAutolocalizationtablePatch.");
                                if (null == i) throw new fe("request", "Required parameter request was null or undefined when calling v1AutolocalizationGamesGameIdAutolocalizationtablePatch.");
                                return r = "/v1/autolocalization/games/{gameId}/autolocalizationtable".replace("{gameId}", encodeURIComponent(String(s))), t = T.Qc(r, !0), c && (o = c.baseOptions), n = Ie(Ie({
                                    method: "PATCH"
                                }, o), u), a = {}, (r = {})["Content-Type"] = "application/json", t.query = Ie(Ie(Ie({}, t.query), a), u.query), delete t.search, o = o && o.headers ? o.headers : {}, n.headers = Ie(Ie(Ie({}, r), o), u.headers), o = "string" != typeof i || "application/json" === n.headers["Content-Type"], n.data = o ? JSON.stringify(void 0 !== i ? i : {}) : i || "", [2, {
                                    url: T.WU(t),
                                    options: n
                                }]
                            })
                        })
                    },
                    v1AutolocalizationGamesGameIdAutolocalizationtablePost: function(s, i) {
                        return void 0 === i && (i = {}), be(e, void 0, Promise, function() {
                            var t, n, r, a, o;
                            return Pe(this, function(e) {
                                if (null == s) throw new fe("gameId", "Required parameter gameId was null or undefined when calling v1AutolocalizationGamesGameIdAutolocalizationtablePost.");
                                return a = "/v1/autolocalization/games/{gameId}/autolocalizationtable".replace("{gameId}", encodeURIComponent(String(s))), t = T.Qc(a, !0), c && (o = c.baseOptions), n = Ie(Ie({
                                    method: "POST"
                                }, o), i), r = {}, a = {}, t.query = Ie(Ie(Ie({}, t.query), a), i.query), delete t.search, o = o && o.headers ? o.headers : {}, n.headers = Ie(Ie(Ie({}, r), o), i.headers), [2, {
                                    url: T.WU(t),
                                    options: n
                                }]
                            })
                        })
                    },
                    v1AutolocalizationGamesGameIdAutoscrapeCleanupRequestPost: function(s, i, u) {
                        return void 0 === u && (u = {}), be(e, void 0, Promise, function() {
                            var t, n, r, a, o;
                            return Pe(this, function(e) {
                                if (null == s) throw new fe("gameId", "Required parameter gameId was null or undefined when calling v1AutolocalizationGamesGameIdAutoscrapeCleanupRequestPost.");
                                if (null == i) throw new fe("request", "Required parameter request was null or undefined when calling v1AutolocalizationGamesGameIdAutoscrapeCleanupRequestPost.");
                                return r = "/v1/autolocalization/games/{gameId}/autoscrape-cleanup-request".replace("{gameId}", encodeURIComponent(String(s))), t = T.Qc(r, !0), c && (o = c.baseOptions), n = Ie(Ie({
                                    method: "POST"
                                }, o), u), a = {}, (r = {})["Content-Type"] = "application/json", t.query = Ie(Ie(Ie({}, t.query), a), u.query), delete t.search, o = o && o.headers ? o.headers : {}, n.headers = Ie(Ie(Ie({}, r), o), u.headers), o = "string" != typeof i || "application/json" === n.headers["Content-Type"], n.data = o ? JSON.stringify(void 0 !== i ? i : {}) : i || "", [2, {
                                    url: T.WU(t),
                                    options: n
                                }]
                            })
                        })
                    },
                    v1AutolocalizationGamesGameIdGet: function(s, i) {
                        return void 0 === i && (i = {}), be(e, void 0, Promise, function() {
                            var t, n, r, a, o;
                            return Pe(this, function(e) {
                                if (null == s) throw new fe("gameId", "Required parameter gameId was null or undefined when calling v1AutolocalizationGamesGameIdGet.");
                                return a = "/v1/autolocalization/games/{gameId}".replace("{gameId}", encodeURIComponent(String(s))), t = T.Qc(a, !0), c && (o = c.baseOptions), n = Ie(Ie({
                                    method: "GET"
                                }, o), i), r = {}, a = {}, t.query = Ie(Ie(Ie({}, t.query), a), i.query), delete t.search, o = o && o.headers ? o.headers : {}, n.headers = Ie(Ie(Ie({}, r), o), i.headers), [2, {
                                    url: T.WU(t),
                                    options: n
                                }]
                            })
                        })
                    },
                    v1AutolocalizationGamesGameIdPatch: function(s, i, u) {
                        return void 0 === u && (u = {}), be(e, void 0, Promise, function() {
                            var t, n, r, a, o;
                            return Pe(this, function(e) {
                                if (null == s) throw new fe("gameId", "Required parameter gameId was null or undefined when calling v1AutolocalizationGamesGameIdPatch.");
                                if (null == i) throw new fe("request", "Required parameter request was null or undefined when calling v1AutolocalizationGamesGameIdPatch.");
                                return r = "/v1/autolocalization/games/{gameId}".replace("{gameId}", encodeURIComponent(String(s))), t = T.Qc(r, !0), c && (o = c.baseOptions), n = Ie(Ie({
                                    method: "PATCH"
                                }, o), u), a = {}, (r = {})["Content-Type"] = "application/json", t.query = Ie(Ie(Ie({}, t.query), a), u.query), delete t.search, o = o && o.headers ? o.headers : {}, n.headers = Ie(Ie(Ie({}, r), o), u.headers), o = "string" != typeof i || "application/json" === n.headers["Content-Type"], n.data = o ? JSON.stringify(void 0 !== i ? i : {}) : i || "", [2, {
                                    url: T.WU(t),
                                    options: n
                                }]
                            })
                        })
                    },
                    v1AutolocalizationGamesGameIdSettingsPatch: function(s, i, u) {
                        return void 0 === u && (u = {}), be(e, void 0, Promise, function() {
                            var t, n, r, a, o;
                            return Pe(this, function(e) {
                                if (null == s) throw new fe("gameId", "Required parameter gameId was null or undefined when calling v1AutolocalizationGamesGameIdSettingsPatch.");
                                if (null == i) throw new fe("request", "Required parameter request was null or undefined when calling v1AutolocalizationGamesGameIdSettingsPatch.");
                                return r = "/v1/autolocalization/games/{gameId}/settings".replace("{gameId}", encodeURIComponent(String(s))), t = T.Qc(r, !0), c && (o = c.baseOptions), n = Ie(Ie({
                                    method: "PATCH"
                                }, o), u), a = {}, (r = {})["Content-Type"] = "application/json", t.query = Ie(Ie(Ie({}, t.query), a), u.query), delete t.search, o = o && o.headers ? o.headers : {}, n.headers = Ie(Ie(Ie({}, r), o), u.headers), o = "string" != typeof i || "application/json" === n.headers["Content-Type"], n.data = o ? JSON.stringify(void 0 !== i ? i : {}) : i || "", [2, {
                                    url: T.WU(t),
                                    options: n
                                }]
                            })
                        })
                    },
                    v1AutolocalizationMetadataGet: function(s) {
                        return void 0 === s && (s = {}), be(e, void 0, Promise, function() {
                            var t, n, r, a, o;
                            return Pe(this, function(e) {
                                return t = T.Qc("/v1/autolocalization/metadata", !0), c && (o = c.baseOptions), n = Ie(Ie({
                                    method: "GET"
                                }, o), s), r = {}, a = {}, t.query = Ie(Ie(Ie({}, t.query), a), s.query), delete t.search, o = o && o.headers ? o.headers : {}, n.headers = Ie(Ie(Ie({}, r), o), s.headers), [2, {
                                    url: T.WU(t),
                                    options: n
                                }]
                            })
                        })
                    }
                }
            }

            function Ce(o) {
                return {
                    v1AutolocalizationGamesGameIdAutolocalizationtablePatch: function(t, r, a) {
                        return be(this, void 0, Promise, function() {
                            var n;
                            return Pe(this, function(e) {
                                switch (e.label) {
                                    case 0:
                                        return [4, we(o).v1AutolocalizationGamesGameIdAutolocalizationtablePatch(t, r, a)];
                                    case 1:
                                        return n = e.sent(), [2, function(e, t) {
                                            void 0 === e && (e = b), void 0 === t && (t = ve);
                                            t = Ie(Ie({}, n.options), {
                                                url: t + n.url
                                            });
                                            return e.request(t)
                                        }]
                                }
                            })
                        })
                    },
                    v1AutolocalizationGamesGameIdAutolocalizationtablePost: function(t, r) {
                        return be(this, void 0, Promise, function() {
                            var n;
                            return Pe(this, function(e) {
                                switch (e.label) {
                                    case 0:
                                        return [4, we(o).v1AutolocalizationGamesGameIdAutolocalizationtablePost(t, r)];
                                    case 1:
                                        return n = e.sent(), [2, function(e, t) {
                                            void 0 === e && (e = b), void 0 === t && (t = ve);
                                            t = Ie(Ie({}, n.options), {
                                                url: t + n.url
                                            });
                                            return e.request(t)
                                        }]
                                }
                            })
                        })
                    },
                    v1AutolocalizationGamesGameIdAutoscrapeCleanupRequestPost: function(t, r, a) {
                        return be(this, void 0, Promise, function() {
                            var n;
                            return Pe(this, function(e) {
                                switch (e.label) {
                                    case 0:
                                        return [4, we(o).v1AutolocalizationGamesGameIdAutoscrapeCleanupRequestPost(t, r, a)];
                                    case 1:
                                        return n = e.sent(), [2, function(e, t) {
                                            void 0 === e && (e = b), void 0 === t && (t = ve);
                                            t = Ie(Ie({}, n.options), {
                                                url: t + n.url
                                            });
                                            return e.request(t)
                                        }]
                                }
                            })
                        })
                    },
                    v1AutolocalizationGamesGameIdGet: function(t, r) {
                        return be(this, void 0, Promise, function() {
                            var n;
                            return Pe(this, function(e) {
                                switch (e.label) {
                                    case 0:
                                        return [4, we(o).v1AutolocalizationGamesGameIdGet(t, r)];
                                    case 1:
                                        return n = e.sent(), [2, function(e, t) {
                                            void 0 === e && (e = b), void 0 === t && (t = ve);
                                            t = Ie(Ie({}, n.options), {
                                                url: t + n.url
                                            });
                                            return e.request(t)
                                        }]
                                }
                            })
                        })
                    },
                    v1AutolocalizationGamesGameIdPatch: function(t, r, a) {
                        return be(this, void 0, Promise, function() {
                            var n;
                            return Pe(this, function(e) {
                                switch (e.label) {
                                    case 0:
                                        return [4, we(o).v1AutolocalizationGamesGameIdPatch(t, r, a)];
                                    case 1:
                                        return n = e.sent(), [2, function(e, t) {
                                            void 0 === e && (e = b), void 0 === t && (t = ve);
                                            t = Ie(Ie({}, n.options), {
                                                url: t + n.url
                                            });
                                            return e.request(t)
                                        }]
                                }
                            })
                        })
                    },
                    v1AutolocalizationGamesGameIdSettingsPatch: function(t, r, a) {
                        return be(this, void 0, Promise, function() {
                            var n;
                            return Pe(this, function(e) {
                                switch (e.label) {
                                    case 0:
                                        return [4, we(o).v1AutolocalizationGamesGameIdSettingsPatch(t, r, a)];
                                    case 1:
                                        return n = e.sent(), [2, function(e, t) {
                                            void 0 === e && (e = b), void 0 === t && (t = ve);
                                            t = Ie(Ie({}, n.options), {
                                                url: t + n.url
                                            });
                                            return e.request(t)
                                        }]
                                }
                            })
                        })
                    },
                    v1AutolocalizationMetadataGet: function(t) {
                        return be(this, void 0, Promise, function() {
                            var n;
                            return Pe(this, function(e) {
                                switch (e.label) {
                                    case 0:
                                        return [4, we(o).v1AutolocalizationMetadataGet(t)];
                                    case 1:
                                        return n = e.sent(), [2, function(e, t) {
                                            void 0 === e && (e = b), void 0 === t && (t = ve);
                                            t = Ie(Ie({}, n.options), {
                                                url: t + n.url
                                            });
                                            return e.request(t)
                                        }]
                                }
                            })
                        })
                    }
                }
            }(yr = {}).User = "User", yr.Group = "Group", (fn = {}).Asc = "Asc", fn.Desc = "Desc", (Pn = {}).Approved = "Approved", Pn.PendingReview = "PendingReview", Pn.UnAvailable = "UnAvailable", Pn.Rejected = "Rejected", Pn.Error = "Error", (e = {}).Approved = "Approved", e.PendingReview = "PendingReview", e.UnAvailable = "UnAvailable", e.Rejected = "Rejected", e.Error = "Error", (rn = {}).Approved = "Approved", rn.PendingReview = "PendingReview", rn.UnAvailable = "UnAvailable", rn.Rejected = "Rejected", rn.Error = "Error", (Ae = {}).Approved = "Approved", Ae.PendingReview = "PendingReview", Ae.UnAvailable = "UnAvailable", Ae.Rejected = "Rejected", Ae.Error = "Error", (xe = {}).Name = "Name", xe.Description = "Description", ($e = {}).Asc = "Asc", $e.Desc = "Desc", (t = {}).User = "User", t.Group = "Group", (g = {}).Language = "Language", g.Locale = "Locale", (A = {}).Language = "Language", A.Locale = "Locale", (G = {}).Language = "Language", G.Locale = "Locale", (D = {}).Approved = "Approved", D.PendingReview = "PendingReview", D.UnAvailable = "UnAvailable", D.Rejected = "Rejected", D.Error = "Error", (k = ye = ye || {}).Language = "Language", k.Locale = "Locale", (te = {}).GameTranslationStatus = "GameTranslationStatus", te.GameTranslationStatusForTranslatorGroup = "GameTranslationStatusForTranslatorGroup", te.GameTranslationStatusForTranslator = "GameTranslationStatusForTranslator", te.Test = "Test", (he = {}).InProgress = "inProgress", he.Ready = "ready", he.Unavailable = "unavailable", (yr = {}).Automation = "Automation", yr.User = "User", (fn = {}).LanguageOrLocaleSupportedForGame = "LanguageOrLocaleSupportedForGame", fn.LanguageOrLocaleNotSupportedForGame = "LanguageOrLocaleNotSupportedForGame", fn.LanguageOrLocaleIsSource = "LanguageOrLocaleIsSource", fn.InsufficientPermission = "InsufficientPermission", fn.GameDoesNotExist = "GameDoesNotExist", fn.GameDoesNotHaveTable = "GameDoesNotHaveTable", fn.UnknownError = "UnknownError", (Pn = {}).Success = "Success", Pn.LanguageOrLocaleNotSupportedForGame = "LanguageOrLocaleNotSupportedForGame", (e = {}).Language = "Language", e.Locale = "Locale", (rn = {}).User = "User", rn.Automation = "Automation";
            var Te, Ae = (Ge(qe, Te = pe), qe.prototype.v1AutolocalizationGamesGameIdAutolocalizationtablePatch = function(e, t, n) {
                var r = this;
                return Ce(this.configuration).v1AutolocalizationGamesGameIdAutolocalizationtablePatch(e, t, n).then(function(e) {
                    return e(r.axios, r.basePath)
                })
            }, qe.prototype.v1AutolocalizationGamesGameIdAutolocalizationtablePost = function(e, t) {
                var n = this;
                return Ce(this.configuration).v1AutolocalizationGamesGameIdAutolocalizationtablePost(e, t).then(function(e) {
                    return e(n.axios, n.basePath)
                })
            }, qe.prototype.v1AutolocalizationGamesGameIdAutoscrapeCleanupRequestPost = function(e, t, n) {
                var r = this;
                return Ce(this.configuration).v1AutolocalizationGamesGameIdAutoscrapeCleanupRequestPost(e, t, n).then(function(e) {
                    return e(r.axios, r.basePath)
                })
            }, qe.prototype.v1AutolocalizationGamesGameIdGet = function(e, t) {
                var n = this;
                return Ce(this.configuration).v1AutolocalizationGamesGameIdGet(e, t).then(function(e) {
                    return e(n.axios, n.basePath)
                })
            }, qe.prototype.v1AutolocalizationGamesGameIdPatch = function(e, t, n) {
                var r = this;
                return Ce(this.configuration).v1AutolocalizationGamesGameIdPatch(e, t, n).then(function(e) {
                    return e(r.axios, r.basePath)
                })
            }, qe.prototype.v1AutolocalizationGamesGameIdSettingsPatch = function(e, t, n) {
                var r = this;
                return Ce(this.configuration).v1AutolocalizationGamesGameIdSettingsPatch(e, t, n).then(function(e) {
                    return e(r.axios, r.basePath)
                })
            }, qe.prototype.v1AutolocalizationMetadataGet = function(e) {
                var t = this;
                return Ce(this.configuration).v1AutolocalizationMetadataGet(e).then(function(e) {
                    return e(t.axios, t.basePath)
                })
            }, qe);

            function qe() {
                return null !== Te && Te.apply(this, arguments) || this
            }

            function Le(c) {
                var e = this;
                return {
                    v1AutomaticTranslationGamesGameIdFeatureStatusGet: function(s, i) {
                        return void 0 === i && (i = {}), be(e, void 0, Promise, function() {
                            var t, n, r, a, o;
                            return Pe(this, function(e) {
                                if (null == s) throw new fe("gameId", "Required parameter gameId was null or undefined when calling v1AutomaticTranslationGamesGameIdFeatureStatusGet.");
                                return a = "/v1/automatic-translation/games/{gameId}/feature-status".replace("{gameId}", encodeURIComponent(String(s))), t = T.Qc(a, !0), c && (o = c.baseOptions), n = Ie(Ie({
                                    method: "GET"
                                }, o), i), r = {}, a = {}, t.query = Ie(Ie(Ie({}, t.query), a), i.query), delete t.search, o = o && o.headers ? o.headers : {}, n.headers = Ie(Ie(Ie({}, r), o), i.headers), [2, {
                                    url: T.WU(t),
                                    options: n
                                }]
                            })
                        })
                    },
                    v1AutomaticTranslationGamesGameIdQuotaGet: function(s, i) {
                        return void 0 === i && (i = {}), be(e, void 0, Promise, function() {
                            var t, n, r, a, o;
                            return Pe(this, function(e) {
                                if (null == s) throw new fe("gameId", "Required parameter gameId was null or undefined when calling v1AutomaticTranslationGamesGameIdQuotaGet.");
                                return a = "/v1/automatic-translation/games/{gameId}/quota".replace("{gameId}", encodeURIComponent(String(s))), t = T.Qc(a, !0), c && (o = c.baseOptions), n = Ie(Ie({
                                    method: "GET"
                                }, o), i), r = {}, a = {}, t.query = Ie(Ie(Ie({}, t.query), a), i.query), delete t.search, o = o && o.headers ? o.headers : {}, n.headers = Ie(Ie(Ie({}, r), o), i.headers), [2, {
                                    url: T.WU(t),
                                    options: n
                                }]
                            })
                        })
                    },
                    v1AutomaticTranslationLanguagesLanguageCodeTargetLanguagesGet: function(s, i, u) {
                        return void 0 === u && (u = {}), be(e, void 0, Promise, function() {
                            var t, n, r, a, o;
                            return Pe(this, function(e) {
                                if (null == s) throw new fe("languageCode", "Required parameter languageCode was null or undefined when calling v1AutomaticTranslationLanguagesLanguageCodeTargetLanguagesGet.");
                                return a = "/v1/automatic-translation/languages/{languageCode}/target-languages".replace("{languageCode}", encodeURIComponent(String(s))), t = T.Qc(a, !0), c && (o = c.baseOptions), n = Ie(Ie({
                                    method: "GET"
                                }, o), u), r = {}, a = {}, i && (a.targetLanguages = i), t.query = Ie(Ie(Ie({}, t.query), a), u.query), delete t.search, o = o && o.headers ? o.headers : {}, n.headers = Ie(Ie(Ie({}, r), o), u.headers), [2, {
                                    url: T.WU(t),
                                    options: n
                                }]
                            })
                        })
                    }
                }
            }

            function Se(o) {
                return {
                    v1AutomaticTranslationGamesGameIdFeatureStatusGet: function(t, r) {
                        return be(this, void 0, Promise, function() {
                            var n;
                            return Pe(this, function(e) {
                                switch (e.label) {
                                    case 0:
                                        return [4, Le(o).v1AutomaticTranslationGamesGameIdFeatureStatusGet(t, r)];
                                    case 1:
                                        return n = e.sent(), [2, function(e, t) {
                                            void 0 === e && (e = b), void 0 === t && (t = ve);
                                            t = Ie(Ie({}, n.options), {
                                                url: t + n.url
                                            });
                                            return e.request(t)
                                        }]
                                }
                            })
                        })
                    },
                    v1AutomaticTranslationGamesGameIdQuotaGet: function(t, r) {
                        return be(this, void 0, Promise, function() {
                            var n;
                            return Pe(this, function(e) {
                                switch (e.label) {
                                    case 0:
                                        return [4, Le(o).v1AutomaticTranslationGamesGameIdQuotaGet(t, r)];
                                    case 1:
                                        return n = e.sent(), [2, function(e, t) {
                                            void 0 === e && (e = b), void 0 === t && (t = ve);
                                            t = Ie(Ie({}, n.options), {
                                                url: t + n.url
                                            });
                                            return e.request(t)
                                        }]
                                }
                            })
                        })
                    },
                    v1AutomaticTranslationLanguagesLanguageCodeTargetLanguagesGet: function(t, r, a) {
                        return be(this, void 0, Promise, function() {
                            var n;
                            return Pe(this, function(e) {
                                switch (e.label) {
                                    case 0:
                                        return [4, Le(o).v1AutomaticTranslationLanguagesLanguageCodeTargetLanguagesGet(t, r, a)];
                                    case 1:
                                        return n = e.sent(), [2, function(e, t) {
                                            void 0 === e && (e = b), void 0 === t && (t = ve);
                                            t = Ie(Ie({}, n.options), {
                                                url: t + n.url
                                            });
                                            return e.request(t)
                                        }]
                                }
                            })
                        })
                    }
                }
            }
            var Ue, Re, Oe, De, xe = (Ge(Ee, Ue = pe), Ee.prototype.v1AutomaticTranslationGamesGameIdFeatureStatusGet = function(e, t) {
                var n = this;
                return Se(this.configuration).v1AutomaticTranslationGamesGameIdFeatureStatusGet(e, t).then(function(e) {
                    return e(n.axios, n.basePath)
                })
            }, Ee.prototype.v1AutomaticTranslationGamesGameIdQuotaGet = function(e, t) {
                var n = this;
                return Se(this.configuration).v1AutomaticTranslationGamesGameIdQuotaGet(e, t).then(function(e) {
                    return e(n.axios, n.basePath)
                })
            }, Ee.prototype.v1AutomaticTranslationLanguagesLanguageCodeTargetLanguagesGet = function(e, t, n) {
                var r = this;
                return Se(this.configuration).v1AutomaticTranslationLanguagesLanguageCodeTargetLanguagesGet(e, t, n).then(function(e) {
                    return e(r.axios, r.basePath)
                })
            }, Ee);

            function Ee() {
                return null !== Ue && Ue.apply(this, arguments) || this
            }

            function Be(d) {
                var e = this;
                return {
                    v1BadgesBadgeIdDescriptionLanguageCodesLanguageCodePatch: function(s, i, u, c) {
                        return void 0 === c && (c = {}), be(e, void 0, Promise, function() {
                            var t, n, r, a, o;
                            return Pe(this, function(e) {
                                if (null == s) throw new fe("badgeId", "Required parameter badgeId was null or undefined when calling v1BadgesBadgeIdDescriptionLanguageCodesLanguageCodePatch.");
                                if (null == i) throw new fe("languageCode", "Required parameter languageCode was null or undefined when calling v1BadgesBadgeIdDescriptionLanguageCodesLanguageCodePatch.");
                                if (null == u) throw new fe("request", "Required parameter request was null or undefined when calling v1BadgesBadgeIdDescriptionLanguageCodesLanguageCodePatch.");
                                return r = "/v1/badges/{badgeId}/description/language-codes/{languageCode}".replace("{badgeId}", encodeURIComponent(String(s))).replace("{languageCode}", encodeURIComponent(String(i))), t = T.Qc(r, !0), d && (o = d.baseOptions), n = Ie(Ie({
                                    method: "PATCH"
                                }, o), c), a = {}, (r = {})["Content-Type"] = "application/json", t.query = Ie(Ie(Ie({}, t.query), a), c.query), delete t.search, o = o && o.headers ? o.headers : {}, n.headers = Ie(Ie(Ie({}, r), o), c.headers), o = "string" != typeof u || "application/json" === n.headers["Content-Type"], n.data = o ? JSON.stringify(void 0 !== u ? u : {}) : u || "", [2, {
                                    url: T.WU(t),
                                    options: n
                                }]
                            })
                        })
                    },
                    v1BadgesBadgeIdIconsGet: function(s, i, u, c) {
                        return void 0 === c && (c = {}), be(e, void 0, Promise, function() {
                            var t, n, r, a, o;
                            return Pe(this, function(e) {
                                if (null == s) throw new fe("badgeId", "Required parameter badgeId was null or undefined when calling v1BadgesBadgeIdIconsGet.");
                                return a = "/v1/badges/{badgeId}/icons".replace("{badgeId}", encodeURIComponent(String(s))), t = T.Qc(a, !0), d && (o = d.baseOptions), n = Ie(Ie({
                                    method: "GET"
                                }, o), c), r = {}, a = {}, void 0 !== i && (a.width = i), void 0 !== u && (a.height = u), t.query = Ie(Ie(Ie({}, t.query), a), c.query), delete t.search, o = o && o.headers ? o.headers : {}, n.headers = Ie(Ie(Ie({}, r), o), c.headers), [2, {
                                    url: T.WU(t),
                                    options: n
                                }]
                            })
                        })
                    },
                    v1BadgesBadgeIdIconsLanguageCodesLanguageCodeDelete: function(s, i, u) {
                        return void 0 === u && (u = {}), be(e, void 0, Promise, function() {
                            var t, n, r, a, o;
                            return Pe(this, function(e) {
                                if (null == s) throw new fe("badgeId", "Required parameter badgeId was null or undefined when calling v1BadgesBadgeIdIconsLanguageCodesLanguageCodeDelete.");
                                if (null == i) throw new fe("languageCode", "Required parameter languageCode was null or undefined when calling v1BadgesBadgeIdIconsLanguageCodesLanguageCodeDelete.");
                                return a = "/v1/badges/{badgeId}/icons/language-codes/{languageCode}".replace("{badgeId}", encodeURIComponent(String(s))).replace("{languageCode}", encodeURIComponent(String(i))), t = T.Qc(a, !0), d && (o = d.baseOptions), n = Ie(Ie({
                                    method: "DELETE"
                                }, o), u), r = {}, a = {}, t.query = Ie(Ie(Ie({}, t.query), a), u.query), delete t.search, o = o && o.headers ? o.headers : {}, n.headers = Ie(Ie(Ie({}, r), o), u.headers), [2, {
                                    url: T.WU(t),
                                    options: n
                                }]
                            })
                        })
                    },
                    v1BadgesBadgeIdIconsLanguageCodesLanguageCodePost: function(i, u, c, l) {
                        return void 0 === l && (l = {}), be(e, void 0, Promise, function() {
                            var t, n, r, a, o, s;
                            return Pe(this, function(e) {
                                if (null == i) throw new fe("badgeId", "Required parameter badgeId was null or undefined when calling v1BadgesBadgeIdIconsLanguageCodesLanguageCodePost.");
                                if (null == u) throw new fe("languageCode", "Required parameter languageCode was null or undefined when calling v1BadgesBadgeIdIconsLanguageCodesLanguageCodePost.");
                                return o = "/v1/badges/{badgeId}/icons/language-codes/{languageCode}".replace("{badgeId}", encodeURIComponent(String(i))).replace("{languageCode}", encodeURIComponent(String(u))), t = T.Qc(o, !0), d && (s = d.baseOptions), n = Ie(Ie({
                                    method: "POST"
                                }, s), l), r = {}, a = {}, o = new FormData, void 0 !== c && o.append("request.files", c), r["Content-Type"] = "multipart/form-data", t.query = Ie(Ie(Ie({}, t.query), a), l.query), delete t.search, s = s && s.headers ? s.headers : {}, n.headers = Ie(Ie(Ie({}, r), s), l.headers), n.data = o, [2, {
                                    url: T.WU(t),
                                    options: n
                                }]
                            })
                        })
                    },
                    v1BadgesBadgeIdNameDescriptionGet: function(s, i) {
                        return void 0 === i && (i = {}), be(e, void 0, Promise, function() {
                            var t, n, r, a, o;
                            return Pe(this, function(e) {
                                if (null == s) throw new fe("badgeId", "Required parameter badgeId was null or undefined when calling v1BadgesBadgeIdNameDescriptionGet.");
                                return a = "/v1/badges/{badgeId}/name-description".replace("{badgeId}", encodeURIComponent(String(s))), t = T.Qc(a, !0), d && (o = d.baseOptions), n = Ie(Ie({
                                    method: "GET"
                                }, o), i), r = {}, a = {}, t.query = Ie(Ie(Ie({}, t.query), a), i.query), delete t.search, o = o && o.headers ? o.headers : {}, n.headers = Ie(Ie(Ie({}, r), o), i.headers), [2, {
                                    url: T.WU(t),
                                    options: n
                                }]
                            })
                        })
                    },
                    v1BadgesBadgeIdNameDescriptionLanguageCodesLanguageCodeDelete: function(s, i, u) {
                        return void 0 === u && (u = {}), be(e, void 0, Promise, function() {
                            var t, n, r, a, o;
                            return Pe(this, function(e) {
                                if (null == s) throw new fe("badgeId", "Required parameter badgeId was null or undefined when calling v1BadgesBadgeIdNameDescriptionLanguageCodesLanguageCodeDelete.");
                                if (null == i) throw new fe("languageCode", "Required parameter languageCode was null or undefined when calling v1BadgesBadgeIdNameDescriptionLanguageCodesLanguageCodeDelete.");
                                return a = "/v1/badges/{badgeId}/name-description/language-codes/{languageCode}".replace("{badgeId}", encodeURIComponent(String(s))).replace("{languageCode}", encodeURIComponent(String(i))), t = T.Qc(a, !0), d && (o = d.baseOptions), n = Ie(Ie({
                                    method: "DELETE"
                                }, o), u), r = {}, a = {}, t.query = Ie(Ie(Ie({}, t.query), a), u.query), delete t.search, o = o && o.headers ? o.headers : {}, n.headers = Ie(Ie(Ie({}, r), o), u.headers), [2, {
                                    url: T.WU(t),
                                    options: n
                                }]
                            })
                        })
                    },
                    v1BadgesBadgeIdNameDescriptionLanguageCodesLanguageCodePatch: function(s, i, u, c) {
                        return void 0 === c && (c = {}), be(e, void 0, Promise, function() {
                            var t, n, r, a, o;
                            return Pe(this, function(e) {
                                if (null == s) throw new fe("badgeId", "Required parameter badgeId was null or undefined when calling v1BadgesBadgeIdNameDescriptionLanguageCodesLanguageCodePatch.");
                                if (null == i) throw new fe("languageCode", "Required parameter languageCode was null or undefined when calling v1BadgesBadgeIdNameDescriptionLanguageCodesLanguageCodePatch.");
                                if (null == u) throw new fe("request", "Required parameter request was null or undefined when calling v1BadgesBadgeIdNameDescriptionLanguageCodesLanguageCodePatch.");
                                return r = "/v1/badges/{badgeId}/name-description/language-codes/{languageCode}".replace("{badgeId}", encodeURIComponent(String(s))).replace("{languageCode}", encodeURIComponent(String(i))), t = T.Qc(r, !0), d && (o = d.baseOptions), n = Ie(Ie({
                                    method: "PATCH"
                                }, o), c), a = {}, (r = {})["Content-Type"] = "application/json", t.query = Ie(Ie(Ie({}, t.query), a), c.query), delete t.search, o = o && o.headers ? o.headers : {}, n.headers = Ie(Ie(Ie({}, r), o), c.headers), o = "string" != typeof u || "application/json" === n.headers["Content-Type"], n.data = o ? JSON.stringify(void 0 !== u ? u : {}) : u || "", [2, {
                                    url: T.WU(t),
                                    options: n
                                }]
                            })
                        })
                    },
                    v1BadgesBadgeIdNameLanguageCodesLanguageCodePatch: function(s, i, u, c) {
                        return void 0 === c && (c = {}), be(e, void 0, Promise, function() {
                            var t, n, r, a, o;
                            return Pe(this, function(e) {
                                if (null == s) throw new fe("badgeId", "Required parameter badgeId was null or undefined when calling v1BadgesBadgeIdNameLanguageCodesLanguageCodePatch.");
                                if (null == i) throw new fe("languageCode", "Required parameter languageCode was null or undefined when calling v1BadgesBadgeIdNameLanguageCodesLanguageCodePatch.");
                                if (null == u) throw new fe("request", "Required parameter request was null or undefined when calling v1BadgesBadgeIdNameLanguageCodesLanguageCodePatch.");
                                return r = "/v1/badges/{badgeId}/name/language-codes/{languageCode}".replace("{badgeId}", encodeURIComponent(String(s))).replace("{languageCode}", encodeURIComponent(String(i))), t = T.Qc(r, !0), d && (o = d.baseOptions), n = Ie(Ie({
                                    method: "PATCH"
                                }, o), c), a = {}, (r = {})["Content-Type"] = "application/json", t.query = Ie(Ie(Ie({}, t.query), a), c.query), delete t.search, o = o && o.headers ? o.headers : {}, n.headers = Ie(Ie(Ie({}, r), o), c.headers), o = "string" != typeof u || "application/json" === n.headers["Content-Type"], n.data = o ? JSON.stringify(void 0 !== u ? u : {}) : u || "", [2, {
                                    url: T.WU(t),
                                    options: n
                                }]
                            })
                        })
                    }
                }
            }

            function Fe(s) {
                return {
                    v1BadgesBadgeIdDescriptionLanguageCodesLanguageCodePatch: function(t, r, a, o) {
                        return be(this, void 0, Promise, function() {
                            var n;
                            return Pe(this, function(e) {
                                switch (e.label) {
                                    case 0:
                                        return [4, Be(s).v1BadgesBadgeIdDescriptionLanguageCodesLanguageCodePatch(t, r, a, o)];
                                    case 1:
                                        return n = e.sent(), [2, function(e, t) {
                                            void 0 === e && (e = b), void 0 === t && (t = ve);
                                            t = Ie(Ie({}, n.options), {
                                                url: t + n.url
                                            });
                                            return e.request(t)
                                        }]
                                }
                            })
                        })
                    },
                    v1BadgesBadgeIdIconsGet: function(t, r, a, o) {
                        return be(this, void 0, Promise, function() {
                            var n;
                            return Pe(this, function(e) {
                                switch (e.label) {
                                    case 0:
                                        return [4, Be(s).v1BadgesBadgeIdIconsGet(t, r, a, o)];
                                    case 1:
                                        return n = e.sent(), [2, function(e, t) {
                                            void 0 === e && (e = b), void 0 === t && (t = ve);
                                            t = Ie(Ie({}, n.options), {
                                                url: t + n.url
                                            });
                                            return e.request(t)
                                        }]
                                }
                            })
                        })
                    },
                    v1BadgesBadgeIdIconsLanguageCodesLanguageCodeDelete: function(t, r, a) {
                        return be(this, void 0, Promise, function() {
                            var n;
                            return Pe(this, function(e) {
                                switch (e.label) {
                                    case 0:
                                        return [4, Be(s).v1BadgesBadgeIdIconsLanguageCodesLanguageCodeDelete(t, r, a)];
                                    case 1:
                                        return n = e.sent(), [2, function(e, t) {
                                            void 0 === e && (e = b), void 0 === t && (t = ve);
                                            t = Ie(Ie({}, n.options), {
                                                url: t + n.url
                                            });
                                            return e.request(t)
                                        }]
                                }
                            })
                        })
                    },
                    v1BadgesBadgeIdIconsLanguageCodesLanguageCodePost: function(t, r, a, o) {
                        return be(this, void 0, Promise, function() {
                            var n;
                            return Pe(this, function(e) {
                                switch (e.label) {
                                    case 0:
                                        return [4, Be(s).v1BadgesBadgeIdIconsLanguageCodesLanguageCodePost(t, r, a, o)];
                                    case 1:
                                        return n = e.sent(), [2, function(e, t) {
                                            void 0 === e && (e = b), void 0 === t && (t = ve);
                                            t = Ie(Ie({}, n.options), {
                                                url: t + n.url
                                            });
                                            return e.request(t)
                                        }]
                                }
                            })
                        })
                    },
                    v1BadgesBadgeIdNameDescriptionGet: function(t, r) {
                        return be(this, void 0, Promise, function() {
                            var n;
                            return Pe(this, function(e) {
                                switch (e.label) {
                                    case 0:
                                        return [4, Be(s).v1BadgesBadgeIdNameDescriptionGet(t, r)];
                                    case 1:
                                        return n = e.sent(), [2, function(e, t) {
                                            void 0 === e && (e = b), void 0 === t && (t = ve);
                                            t = Ie(Ie({}, n.options), {
                                                url: t + n.url
                                            });
                                            return e.request(t)
                                        }]
                                }
                            })
                        })
                    },
                    v1BadgesBadgeIdNameDescriptionLanguageCodesLanguageCodeDelete: function(t, r, a) {
                        return be(this, void 0, Promise, function() {
                            var n;
                            return Pe(this, function(e) {
                                switch (e.label) {
                                    case 0:
                                        return [4, Be(s).v1BadgesBadgeIdNameDescriptionLanguageCodesLanguageCodeDelete(t, r, a)];
                                    case 1:
                                        return n = e.sent(), [2, function(e, t) {
                                            void 0 === e && (e = b), void 0 === t && (t = ve);
                                            t = Ie(Ie({}, n.options), {
                                                url: t + n.url
                                            });
                                            return e.request(t)
                                        }]
                                }
                            })
                        })
                    },
                    v1BadgesBadgeIdNameDescriptionLanguageCodesLanguageCodePatch: function(t, r, a, o) {
                        return be(this, void 0, Promise, function() {
                            var n;
                            return Pe(this, function(e) {
                                switch (e.label) {
                                    case 0:
                                        return [4, Be(s).v1BadgesBadgeIdNameDescriptionLanguageCodesLanguageCodePatch(t, r, a, o)];
                                    case 1:
                                        return n = e.sent(), [2, function(e, t) {
                                            void 0 === e && (e = b), void 0 === t && (t = ve);
                                            t = Ie(Ie({}, n.options), {
                                                url: t + n.url
                                            });
                                            return e.request(t)
                                        }]
                                }
                            })
                        })
                    },
                    v1BadgesBadgeIdNameLanguageCodesLanguageCodePatch: function(t, r, a, o) {
                        return be(this, void 0, Promise, function() {
                            var n;
                            return Pe(this, function(e) {
                                switch (e.label) {
                                    case 0:
                                        return [4, Be(s).v1BadgesBadgeIdNameLanguageCodesLanguageCodePatch(t, r, a, o)];
                                    case 1:
                                        return n = e.sent(), [2, function(e, t) {
                                            void 0 === e && (e = b), void 0 === t && (t = ve);
                                            t = Ie(Ie({}, n.options), {
                                                url: t + n.url
                                            });
                                            return e.request(t)
                                        }]
                                }
                            })
                        })
                    }
                }
            }

            function ze() {
                return null !== Re && Re.apply(this, arguments) || this
            }

            function je(d) {
                var e = this;
                return {
                    v1DeveloperProductsDeveloperProductIdDescriptionLanguageCodesLanguageCodePatch: function(s, i, u, c) {
                        return void 0 === c && (c = {}), be(e, void 0, Promise, function() {
                            var t, n, r, a, o;
                            return Pe(this, function(e) {
                                if (null == s) throw new fe("developerProductId", "Required parameter developerProductId was null or undefined when calling v1DeveloperProductsDeveloperProductIdDescriptionLanguageCodesLanguageCodePatch.");
                                if (null == i) throw new fe("languageCode", "Required parameter languageCode was null or undefined when calling v1DeveloperProductsDeveloperProductIdDescriptionLanguageCodesLanguageCodePatch.");
                                if (null == u) throw new fe("request", "Required parameter request was null or undefined when calling v1DeveloperProductsDeveloperProductIdDescriptionLanguageCodesLanguageCodePatch.");
                                return r = "/v1/developer-products/{developerProductId}/description/language-codes/{languageCode}".replace("{developerProductId}", encodeURIComponent(String(s))).replace("{languageCode}", encodeURIComponent(String(i))), t = T.Qc(r, !0), d && (o = d.baseOptions), n = Ie(Ie({
                                    method: "PATCH"
                                }, o), c), a = {}, (r = {})["Content-Type"] = "application/json", t.query = Ie(Ie(Ie({}, t.query), a), c.query), delete t.search, o = o && o.headers ? o.headers : {}, n.headers = Ie(Ie(Ie({}, r), o), c.headers), o = "string" != typeof u || "application/json" === n.headers["Content-Type"], n.data = o ? JSON.stringify(void 0 !== u ? u : {}) : u || "", [2, {
                                    url: T.WU(t),
                                    options: n
                                }]
                            })
                        })
                    },
                    v1DeveloperProductsDeveloperProductIdIconsGet: function(s, i, u, c) {
                        return void 0 === c && (c = {}), be(e, void 0, Promise, function() {
                            var t, n, r, a, o;
                            return Pe(this, function(e) {
                                if (null == s) throw new fe("developerProductId", "Required parameter developerProductId was null or undefined when calling v1DeveloperProductsDeveloperProductIdIconsGet.");
                                return a = "/v1/developer-products/{developerProductId}/icons".replace("{developerProductId}", encodeURIComponent(String(s))), t = T.Qc(a, !0), d && (o = d.baseOptions), n = Ie(Ie({
                                    method: "GET"
                                }, o), c), r = {}, a = {}, void 0 !== i && (a.width = i), void 0 !== u && (a.height = u), t.query = Ie(Ie(Ie({}, t.query), a), c.query), delete t.search, o = o && o.headers ? o.headers : {}, n.headers = Ie(Ie(Ie({}, r), o), c.headers), [2, {
                                    url: T.WU(t),
                                    options: n
                                }]
                            })
                        })
                    },
                    v1DeveloperProductsDeveloperProductIdIconsLanguageCodesLanguageCodeDelete: function(s, i, u) {
                        return void 0 === u && (u = {}), be(e, void 0, Promise, function() {
                            var t, n, r, a, o;
                            return Pe(this, function(e) {
                                if (null == s) throw new fe("developerProductId", "Required parameter developerProductId was null or undefined when calling v1DeveloperProductsDeveloperProductIdIconsLanguageCodesLanguageCodeDelete.");
                                if (null == i) throw new fe("languageCode", "Required parameter languageCode was null or undefined when calling v1DeveloperProductsDeveloperProductIdIconsLanguageCodesLanguageCodeDelete.");
                                return a = "/v1/developer-products/{developerProductId}/icons/language-codes/{languageCode}".replace("{developerProductId}", encodeURIComponent(String(s))).replace("{languageCode}", encodeURIComponent(String(i))), t = T.Qc(a, !0), d && (o = d.baseOptions), n = Ie(Ie({
                                    method: "DELETE"
                                }, o), u), r = {}, a = {}, t.query = Ie(Ie(Ie({}, t.query), a), u.query), delete t.search, o = o && o.headers ? o.headers : {}, n.headers = Ie(Ie(Ie({}, r), o), u.headers), [2, {
                                    url: T.WU(t),
                                    options: n
                                }]
                            })
                        })
                    },
                    v1DeveloperProductsDeveloperProductIdIconsLanguageCodesLanguageCodePost: function(i, u, c, l) {
                        return void 0 === l && (l = {}), be(e, void 0, Promise, function() {
                            var t, n, r, a, o, s;
                            return Pe(this, function(e) {
                                if (null == i) throw new fe("developerProductId", "Required parameter developerProductId was null or undefined when calling v1DeveloperProductsDeveloperProductIdIconsLanguageCodesLanguageCodePost.");
                                if (null == u) throw new fe("languageCode", "Required parameter languageCode was null or undefined when calling v1DeveloperProductsDeveloperProductIdIconsLanguageCodesLanguageCodePost.");
                                return o = "/v1/developer-products/{developerProductId}/icons/language-codes/{languageCode}".replace("{developerProductId}", encodeURIComponent(String(i))).replace("{languageCode}", encodeURIComponent(String(u))), t = T.Qc(o, !0), d && (s = d.baseOptions), n = Ie(Ie({
                                    method: "POST"
                                }, s), l), r = {}, a = {}, o = new FormData, void 0 !== c && o.append("request.files", c), r["Content-Type"] = "multipart/form-data", t.query = Ie(Ie(Ie({}, t.query), a), l.query), delete t.search, s = s && s.headers ? s.headers : {}, n.headers = Ie(Ie(Ie({}, r), s), l.headers), n.data = o, [2, {
                                    url: T.WU(t),
                                    options: n
                                }]
                            })
                        })
                    },
                    v1DeveloperProductsDeveloperProductIdNameDescriptionGet: function(s, i) {
                        return void 0 === i && (i = {}), be(e, void 0, Promise, function() {
                            var t, n, r, a, o;
                            return Pe(this, function(e) {
                                if (null == s) throw new fe("developerProductId", "Required parameter developerProductId was null or undefined when calling v1DeveloperProductsDeveloperProductIdNameDescriptionGet.");
                                return a = "/v1/developer-products/{developerProductId}/name-description".replace("{developerProductId}", encodeURIComponent(String(s))), t = T.Qc(a, !0), d && (o = d.baseOptions), n = Ie(Ie({
                                    method: "GET"
                                }, o), i), r = {}, a = {}, t.query = Ie(Ie(Ie({}, t.query), a), i.query), delete t.search, o = o && o.headers ? o.headers : {}, n.headers = Ie(Ie(Ie({}, r), o), i.headers), [2, {
                                    url: T.WU(t),
                                    options: n
                                }]
                            })
                        })
                    },
                    v1DeveloperProductsDeveloperProductIdNameDescriptionLanguageCodesLanguageCodeDelete: function(s, i, u) {
                        return void 0 === u && (u = {}), be(e, void 0, Promise, function() {
                            var t, n, r, a, o;
                            return Pe(this, function(e) {
                                if (null == s) throw new fe("developerProductId", "Required parameter developerProductId was null or undefined when calling v1DeveloperProductsDeveloperProductIdNameDescriptionLanguageCodesLanguageCodeDelete.");
                                if (null == i) throw new fe("languageCode", "Required parameter languageCode was null or undefined when calling v1DeveloperProductsDeveloperProductIdNameDescriptionLanguageCodesLanguageCodeDelete.");
                                return a = "/v1/developer-products/{developerProductId}/name-description/language-codes/{languageCode}".replace("{developerProductId}", encodeURIComponent(String(s))).replace("{languageCode}", encodeURIComponent(String(i))), t = T.Qc(a, !0), d && (o = d.baseOptions), n = Ie(Ie({
                                    method: "DELETE"
                                }, o), u), r = {}, a = {}, t.query = Ie(Ie(Ie({}, t.query), a), u.query), delete t.search, o = o && o.headers ? o.headers : {}, n.headers = Ie(Ie(Ie({}, r), o), u.headers), [2, {
                                    url: T.WU(t),
                                    options: n
                                }]
                            })
                        })
                    },
                    v1DeveloperProductsDeveloperProductIdNameDescriptionLanguageCodesLanguageCodePatch: function(s, i, u, c) {
                        return void 0 === c && (c = {}), be(e, void 0, Promise, function() {
                            var t, n, r, a, o;
                            return Pe(this, function(e) {
                                if (null == s) throw new fe("developerProductId", "Required parameter developerProductId was null or undefined when calling v1DeveloperProductsDeveloperProductIdNameDescriptionLanguageCodesLanguageCodePatch.");
                                if (null == i) throw new fe("languageCode", "Required parameter languageCode was null or undefined when calling v1DeveloperProductsDeveloperProductIdNameDescriptionLanguageCodesLanguageCodePatch.");
                                if (null == u) throw new fe("request", "Required parameter request was null or undefined when calling v1DeveloperProductsDeveloperProductIdNameDescriptionLanguageCodesLanguageCodePatch.");
                                return r = "/v1/developer-products/{developerProductId}/name-description/language-codes/{languageCode}".replace("{developerProductId}", encodeURIComponent(String(s))).replace("{languageCode}", encodeURIComponent(String(i))), t = T.Qc(r, !0), d && (o = d.baseOptions), n = Ie(Ie({
                                    method: "PATCH"
                                }, o), c), a = {}, (r = {})["Content-Type"] = "application/json", t.query = Ie(Ie(Ie({}, t.query), a), c.query), delete t.search, o = o && o.headers ? o.headers : {}, n.headers = Ie(Ie(Ie({}, r), o), c.headers), o = "string" != typeof u || "application/json" === n.headers["Content-Type"], n.data = o ? JSON.stringify(void 0 !== u ? u : {}) : u || "", [2, {
                                    url: T.WU(t),
                                    options: n
                                }]
                            })
                        })
                    },
                    v1DeveloperProductsDeveloperProductIdNameLanguageCodesLanguageCodePatch: function(s, i, u, c) {
                        return void 0 === c && (c = {}), be(e, void 0, Promise, function() {
                            var t, n, r, a, o;
                            return Pe(this, function(e) {
                                if (null == s) throw new fe("developerProductId", "Required parameter developerProductId was null or undefined when calling v1DeveloperProductsDeveloperProductIdNameLanguageCodesLanguageCodePatch.");
                                if (null == i) throw new fe("languageCode", "Required parameter languageCode was null or undefined when calling v1DeveloperProductsDeveloperProductIdNameLanguageCodesLanguageCodePatch.");
                                if (null == u) throw new fe("request", "Required parameter request was null or undefined when calling v1DeveloperProductsDeveloperProductIdNameLanguageCodesLanguageCodePatch.");
                                return r = "/v1/developer-products/{developerProductId}/name/language-codes/{languageCode}".replace("{developerProductId}", encodeURIComponent(String(s))).replace("{languageCode}", encodeURIComponent(String(i))), t = T.Qc(r, !0), d && (o = d.baseOptions), n = Ie(Ie({
                                    method: "PATCH"
                                }, o), c), a = {}, (r = {})["Content-Type"] = "application/json", t.query = Ie(Ie(Ie({}, t.query), a), c.query), delete t.search, o = o && o.headers ? o.headers : {}, n.headers = Ie(Ie(Ie({}, r), o), c.headers), o = "string" != typeof u || "application/json" === n.headers["Content-Type"], n.data = o ? JSON.stringify(void 0 !== u ? u : {}) : u || "", [2, {
                                    url: T.WU(t),
                                    options: n
                                }]
                            })
                        })
                    }
                }
            }

            function Ne(s) {
                return {
                    v1DeveloperProductsDeveloperProductIdDescriptionLanguageCodesLanguageCodePatch: function(t, r, a, o) {
                        return be(this, void 0, Promise, function() {
                            var n;
                            return Pe(this, function(e) {
                                switch (e.label) {
                                    case 0:
                                        return [4, je(s).v1DeveloperProductsDeveloperProductIdDescriptionLanguageCodesLanguageCodePatch(t, r, a, o)];
                                    case 1:
                                        return n = e.sent(), [2, function(e, t) {
                                            void 0 === e && (e = b), void 0 === t && (t = ve);
                                            t = Ie(Ie({}, n.options), {
                                                url: t + n.url
                                            });
                                            return e.request(t)
                                        }]
                                }
                            })
                        })
                    },
                    v1DeveloperProductsDeveloperProductIdIconsGet: function(t, r, a, o) {
                        return be(this, void 0, Promise, function() {
                            var n;
                            return Pe(this, function(e) {
                                switch (e.label) {
                                    case 0:
                                        return [4, je(s).v1DeveloperProductsDeveloperProductIdIconsGet(t, r, a, o)];
                                    case 1:
                                        return n = e.sent(), [2, function(e, t) {
                                            void 0 === e && (e = b), void 0 === t && (t = ve);
                                            t = Ie(Ie({}, n.options), {
                                                url: t + n.url
                                            });
                                            return e.request(t)
                                        }]
                                }
                            })
                        })
                    },
                    v1DeveloperProductsDeveloperProductIdIconsLanguageCodesLanguageCodeDelete: function(t, r, a) {
                        return be(this, void 0, Promise, function() {
                            var n;
                            return Pe(this, function(e) {
                                switch (e.label) {
                                    case 0:
                                        return [4, je(s).v1DeveloperProductsDeveloperProductIdIconsLanguageCodesLanguageCodeDelete(t, r, a)];
                                    case 1:
                                        return n = e.sent(), [2, function(e, t) {
                                            void 0 === e && (e = b), void 0 === t && (t = ve);
                                            t = Ie(Ie({}, n.options), {
                                                url: t + n.url
                                            });
                                            return e.request(t)
                                        }]
                                }
                            })
                        })
                    },
                    v1DeveloperProductsDeveloperProductIdIconsLanguageCodesLanguageCodePost: function(t, r, a, o) {
                        return be(this, void 0, Promise, function() {
                            var n;
                            return Pe(this, function(e) {
                                switch (e.label) {
                                    case 0:
                                        return [4, je(s).v1DeveloperProductsDeveloperProductIdIconsLanguageCodesLanguageCodePost(t, r, a, o)];
                                    case 1:
                                        return n = e.sent(), [2, function(e, t) {
                                            void 0 === e && (e = b), void 0 === t && (t = ve);
                                            t = Ie(Ie({}, n.options), {
                                                url: t + n.url
                                            });
                                            return e.request(t)
                                        }]
                                }
                            })
                        })
                    },
                    v1DeveloperProductsDeveloperProductIdNameDescriptionGet: function(t, r) {
                        return be(this, void 0, Promise, function() {
                            var n;
                            return Pe(this, function(e) {
                                switch (e.label) {
                                    case 0:
                                        return [4, je(s).v1DeveloperProductsDeveloperProductIdNameDescriptionGet(t, r)];
                                    case 1:
                                        return n = e.sent(), [2, function(e, t) {
                                            void 0 === e && (e = b), void 0 === t && (t = ve);
                                            t = Ie(Ie({}, n.options), {
                                                url: t + n.url
                                            });
                                            return e.request(t)
                                        }]
                                }
                            })
                        })
                    },
                    v1DeveloperProductsDeveloperProductIdNameDescriptionLanguageCodesLanguageCodeDelete: function(t, r, a) {
                        return be(this, void 0, Promise, function() {
                            var n;
                            return Pe(this, function(e) {
                                switch (e.label) {
                                    case 0:
                                        return [4, je(s).v1DeveloperProductsDeveloperProductIdNameDescriptionLanguageCodesLanguageCodeDelete(t, r, a)];
                                    case 1:
                                        return n = e.sent(), [2, function(e, t) {
                                            void 0 === e && (e = b), void 0 === t && (t = ve);
                                            t = Ie(Ie({}, n.options), {
                                                url: t + n.url
                                            });
                                            return e.request(t)
                                        }]
                                }
                            })
                        })
                    },
                    v1DeveloperProductsDeveloperProductIdNameDescriptionLanguageCodesLanguageCodePatch: function(t, r, a, o) {
                        return be(this, void 0, Promise, function() {
                            var n;
                            return Pe(this, function(e) {
                                switch (e.label) {
                                    case 0:
                                        return [4, je(s).v1DeveloperProductsDeveloperProductIdNameDescriptionLanguageCodesLanguageCodePatch(t, r, a, o)];
                                    case 1:
                                        return n = e.sent(), [2, function(e, t) {
                                            void 0 === e && (e = b), void 0 === t && (t = ve);
                                            t = Ie(Ie({}, n.options), {
                                                url: t + n.url
                                            });
                                            return e.request(t)
                                        }]
                                }
                            })
                        })
                    },
                    v1DeveloperProductsDeveloperProductIdNameLanguageCodesLanguageCodePatch: function(t, r, a, o) {
                        return be(this, void 0, Promise, function() {
                            var n;
                            return Pe(this, function(e) {
                                switch (e.label) {
                                    case 0:
                                        return [4, je(s).v1DeveloperProductsDeveloperProductIdNameLanguageCodesLanguageCodePatch(t, r, a, o)];
                                    case 1:
                                        return n = e.sent(), [2, function(e, t) {
                                            void 0 === e && (e = b), void 0 === t && (t = ve);
                                            t = Ie(Ie({}, n.options), {
                                                url: t + n.url
                                            });
                                            return e.request(t)
                                        }]
                                }
                            })
                        })
                    }
                }
            }

            function ke() {
                return null !== Oe && Oe.apply(this, arguments) || this
            }

            function _e(d) {
                var e = this;
                return {
                    v1GameIconGamesGameIdGet: function(s, i, u, c) {
                        return void 0 === c && (c = {}), be(e, void 0, Promise, function() {
                            var t, n, r, a, o;
                            return Pe(this, function(e) {
                                if (null == s) throw new fe("gameId", "Required parameter gameId was null or undefined when calling v1GameIconGamesGameIdGet.");
                                return a = "/v1/game-icon/games/{gameId}".replace("{gameId}", encodeURIComponent(String(s))), t = T.Qc(a, !0), d && (o = d.baseOptions), n = Ie(Ie({
                                    method: "GET"
                                }, o), c), r = {}, a = {}, void 0 !== i && (a.width = i), void 0 !== u && (a.height = u), t.query = Ie(Ie(Ie({}, t.query), a), c.query), delete t.search, o = o && o.headers ? o.headers : {}, n.headers = Ie(Ie(Ie({}, r), o), c.headers), [2, {
                                    url: T.WU(t),
                                    options: n
                                }]
                            })
                        })
                    },
                    v1GameIconGamesGameIdLanguageCodesLanguageCodeDelete: function(s, i, u) {
                        return void 0 === u && (u = {}), be(e, void 0, Promise, function() {
                            var t, n, r, a, o;
                            return Pe(this, function(e) {
                                if (null == s) throw new fe("gameId", "Required parameter gameId was null or undefined when calling v1GameIconGamesGameIdLanguageCodesLanguageCodeDelete.");
                                if (null == i) throw new fe("languageCode", "Required parameter languageCode was null or undefined when calling v1GameIconGamesGameIdLanguageCodesLanguageCodeDelete.");
                                return a = "/v1/game-icon/games/{gameId}/language-codes/{languageCode}".replace("{gameId}", encodeURIComponent(String(s))).replace("{languageCode}", encodeURIComponent(String(i))), t = T.Qc(a, !0), d && (o = d.baseOptions), n = Ie(Ie({
                                    method: "DELETE"
                                }, o), u), r = {}, a = {}, t.query = Ie(Ie(Ie({}, t.query), a), u.query), delete t.search, o = o && o.headers ? o.headers : {}, n.headers = Ie(Ie(Ie({}, r), o), u.headers), [2, {
                                    url: T.WU(t),
                                    options: n
                                }]
                            })
                        })
                    },
                    v1GameIconGamesGameIdLanguageCodesLanguageCodePost: function(i, u, c, l) {
                        return void 0 === l && (l = {}), be(e, void 0, Promise, function() {
                            var t, n, r, a, o, s;
                            return Pe(this, function(e) {
                                if (null == i) throw new fe("gameId", "Required parameter gameId was null or undefined when calling v1GameIconGamesGameIdLanguageCodesLanguageCodePost.");
                                if (null == u) throw new fe("languageCode", "Required parameter languageCode was null or undefined when calling v1GameIconGamesGameIdLanguageCodesLanguageCodePost.");
                                return o = "/v1/game-icon/games/{gameId}/language-codes/{languageCode}".replace("{gameId}", encodeURIComponent(String(i))).replace("{languageCode}", encodeURIComponent(String(u))), t = T.Qc(o, !0), d && (s = d.baseOptions), n = Ie(Ie({
                                    method: "POST"
                                }, s), l), r = {}, a = {}, o = new FormData, void 0 !== c && o.append("request.files", c), r["Content-Type"] = "multipart/form-data", t.query = Ie(Ie(Ie({}, t.query), a), l.query), delete t.search, s = s && s.headers ? s.headers : {}, n.headers = Ie(Ie(Ie({}, r), s), l.headers), n.data = o, [2, {
                                    url: T.WU(t),
                                    options: n
                                }]
                            })
                        })
                    }
                }
            }

            function We(s) {
                return {
                    v1GameIconGamesGameIdGet: function(t, r, a, o) {
                        return be(this, void 0, Promise, function() {
                            var n;
                            return Pe(this, function(e) {
                                switch (e.label) {
                                    case 0:
                                        return [4, _e(s).v1GameIconGamesGameIdGet(t, r, a, o)];
                                    case 1:
                                        return n = e.sent(), [2, function(e, t) {
                                            void 0 === e && (e = b), void 0 === t && (t = ve);
                                            t = Ie(Ie({}, n.options), {
                                                url: t + n.url
                                            });
                                            return e.request(t)
                                        }]
                                }
                            })
                        })
                    },
                    v1GameIconGamesGameIdLanguageCodesLanguageCodeDelete: function(t, r, a) {
                        return be(this, void 0, Promise, function() {
                            var n;
                            return Pe(this, function(e) {
                                switch (e.label) {
                                    case 0:
                                        return [4, _e(s).v1GameIconGamesGameIdLanguageCodesLanguageCodeDelete(t, r, a)];
                                    case 1:
                                        return n = e.sent(), [2, function(e, t) {
                                            void 0 === e && (e = b), void 0 === t && (t = ve);
                                            t = Ie(Ie({}, n.options), {
                                                url: t + n.url
                                            });
                                            return e.request(t)
                                        }]
                                }
                            })
                        })
                    },
                    v1GameIconGamesGameIdLanguageCodesLanguageCodePost: function(t, r, a, o) {
                        return be(this, void 0, Promise, function() {
                            var n;
                            return Pe(this, function(e) {
                                switch (e.label) {
                                    case 0:
                                        return [4, _e(s).v1GameIconGamesGameIdLanguageCodesLanguageCodePost(t, r, a, o)];
                                    case 1:
                                        return n = e.sent(), [2, function(e, t) {
                                            void 0 === e && (e = b), void 0 === t && (t = ve);
                                            t = Ie(Ie({}, n.options), {
                                                url: t + n.url
                                            });
                                            return e.request(t)
                                        }]
                                }
                            })
                        })
                    }
                }
            }

            function Me() {
                return null !== De && De.apply(this, arguments) || this
            }

            function Qe(l) {
                var e = this;
                return {
                    v1GameLocalizationStatusGameIdTranslationCountsGet: function(s, i) {
                        return void 0 === i && (i = {}), be(e, void 0, Promise, function() {
                            var t, n, r, a, o;
                            return Pe(this, function(e) {
                                if (null == s) throw new fe("gameId", "Required parameter gameId was null or undefined when calling v1GameLocalizationStatusGameIdTranslationCountsGet.");
                                return a = "/v1/game-localization-status/{gameId}/translation-counts".replace("{gameId}", encodeURIComponent(String(s))), t = T.Qc(a, !0), l && (o = l.baseOptions), n = Ie(Ie({
                                    method: "GET"
                                }, o), i), r = {}, a = {}, t.query = Ie(Ie(Ie({}, t.query), a), i.query), delete t.search, o = o && o.headers ? o.headers : {}, n.headers = Ie(Ie(Ie({}, r), o), i.headers), [2, {
                                    url: T.WU(t),
                                    options: n
                                }]
                            })
                        })
                    },
                    v1GameLocalizationStatusTranslationCountsForLanguageOrLocaleGet: function(s, i, u, c) {
                        return void 0 === c && (c = {}), be(e, void 0, Promise, function() {
                            var t, n, r, a, o;
                            return Pe(this, function(e) {
                                if (null == s) throw new fe("gameIds", "Required parameter gameIds was null or undefined when calling v1GameLocalizationStatusTranslationCountsForLanguageOrLocaleGet.");
                                if (null == i) throw new fe("languageOrLocaleCode", "Required parameter languageOrLocaleCode was null or undefined when calling v1GameLocalizationStatusTranslationCountsForLanguageOrLocaleGet.");
                                if (null == u) throw new fe("languageOrLocaleType", "Required parameter languageOrLocaleType was null or undefined when calling v1GameLocalizationStatusTranslationCountsForLanguageOrLocaleGet.");
                                return t = T.Qc("/v1/game-localization-status/translation-counts-for-language-or-locale", !0), l && (o = l.baseOptions), n = Ie(Ie({
                                    method: "GET"
                                }, o), c), r = {}, a = {}, s && (a.gameIds = s), void 0 !== i && (a.languageOrLocaleCode = i), void 0 !== u && (a.languageOrLocaleType = u), t.query = Ie(Ie(Ie({}, t.query), a), c.query), delete t.search, o = o && o.headers ? o.headers : {}, n.headers = Ie(Ie(Ie({}, r), o), c.headers), [2, {
                                    url: T.WU(t),
                                    options: n
                                }]
                            })
                        })
                    }
                }
            }

            function He(s) {
                return {
                    v1GameLocalizationStatusGameIdTranslationCountsGet: function(t, r) {
                        return be(this, void 0, Promise, function() {
                            var n;
                            return Pe(this, function(e) {
                                switch (e.label) {
                                    case 0:
                                        return [4, Qe(s).v1GameLocalizationStatusGameIdTranslationCountsGet(t, r)];
                                    case 1:
                                        return n = e.sent(), [2, function(e, t) {
                                            void 0 === e && (e = b), void 0 === t && (t = ve);
                                            t = Ie(Ie({}, n.options), {
                                                url: t + n.url
                                            });
                                            return e.request(t)
                                        }]
                                }
                            })
                        })
                    },
                    v1GameLocalizationStatusTranslationCountsForLanguageOrLocaleGet: function(t, r, a, o) {
                        return be(this, void 0, Promise, function() {
                            var n;
                            return Pe(this, function(e) {
                                switch (e.label) {
                                    case 0:
                                        return [4, Qe(s).v1GameLocalizationStatusTranslationCountsForLanguageOrLocaleGet(t, r, a, o)];
                                    case 1:
                                        return n = e.sent(), [2, function(e, t) {
                                            void 0 === e && (e = b), void 0 === t && (t = ve);
                                            t = Ie(Ie({}, n.options), {
                                                url: t + n.url
                                            });
                                            return e.request(t)
                                        }]
                                }
                            })
                        })
                    }
                }
            }
            Ge(ze, Re = pe), ze.prototype.v1BadgesBadgeIdDescriptionLanguageCodesLanguageCodePatch = function(e, t, n, r) {
                var a = this;
                return Fe(this.configuration).v1BadgesBadgeIdDescriptionLanguageCodesLanguageCodePatch(e, t, n, r).then(function(e) {
                    return e(a.axios, a.basePath)
                })
            }, ze.prototype.v1BadgesBadgeIdIconsGet = function(e, t, n, r) {
                var a = this;
                return Fe(this.configuration).v1BadgesBadgeIdIconsGet(e, t, n, r).then(function(e) {
                    return e(a.axios, a.basePath)
                })
            }, ze.prototype.v1BadgesBadgeIdIconsLanguageCodesLanguageCodeDelete = function(e, t, n) {
                var r = this;
                return Fe(this.configuration).v1BadgesBadgeIdIconsLanguageCodesLanguageCodeDelete(e, t, n).then(function(e) {
                    return e(r.axios, r.basePath)
                })
            }, ze.prototype.v1BadgesBadgeIdIconsLanguageCodesLanguageCodePost = function(e, t, n, r) {
                var a = this;
                return Fe(this.configuration).v1BadgesBadgeIdIconsLanguageCodesLanguageCodePost(e, t, n, r).then(function(e) {
                    return e(a.axios, a.basePath)
                })
            }, ze.prototype.v1BadgesBadgeIdNameDescriptionGet = function(e, t) {
                var n = this;
                return Fe(this.configuration).v1BadgesBadgeIdNameDescriptionGet(e, t).then(function(e) {
                    return e(n.axios, n.basePath)
                })
            }, ze.prototype.v1BadgesBadgeIdNameDescriptionLanguageCodesLanguageCodeDelete = function(e, t, n) {
                var r = this;
                return Fe(this.configuration).v1BadgesBadgeIdNameDescriptionLanguageCodesLanguageCodeDelete(e, t, n).then(function(e) {
                    return e(r.axios, r.basePath)
                })
            }, ze.prototype.v1BadgesBadgeIdNameDescriptionLanguageCodesLanguageCodePatch = function(e, t, n, r) {
                var a = this;
                return Fe(this.configuration).v1BadgesBadgeIdNameDescriptionLanguageCodesLanguageCodePatch(e, t, n, r).then(function(e) {
                    return e(a.axios, a.basePath)
                })
            }, ze.prototype.v1BadgesBadgeIdNameLanguageCodesLanguageCodePatch = function(e, t, n, r) {
                var a = this;
                return Fe(this.configuration).v1BadgesBadgeIdNameLanguageCodesLanguageCodePatch(e, t, n, r).then(function(e) {
                    return e(a.axios, a.basePath)
                })
            }, Ge(ke, Oe = pe), ke.prototype.v1DeveloperProductsDeveloperProductIdDescriptionLanguageCodesLanguageCodePatch = function(e, t, n, r) {
                var a = this;
                return Ne(this.configuration).v1DeveloperProductsDeveloperProductIdDescriptionLanguageCodesLanguageCodePatch(e, t, n, r).then(function(e) {
                    return e(a.axios, a.basePath)
                })
            }, ke.prototype.v1DeveloperProductsDeveloperProductIdIconsGet = function(e, t, n, r) {
                var a = this;
                return Ne(this.configuration).v1DeveloperProductsDeveloperProductIdIconsGet(e, t, n, r).then(function(e) {
                    return e(a.axios, a.basePath)
                })
            }, ke.prototype.v1DeveloperProductsDeveloperProductIdIconsLanguageCodesLanguageCodeDelete = function(e, t, n) {
                var r = this;
                return Ne(this.configuration).v1DeveloperProductsDeveloperProductIdIconsLanguageCodesLanguageCodeDelete(e, t, n).then(function(e) {
                    return e(r.axios, r.basePath)
                })
            }, ke.prototype.v1DeveloperProductsDeveloperProductIdIconsLanguageCodesLanguageCodePost = function(e, t, n, r) {
                var a = this;
                return Ne(this.configuration).v1DeveloperProductsDeveloperProductIdIconsLanguageCodesLanguageCodePost(e, t, n, r).then(function(e) {
                    return e(a.axios, a.basePath)
                })
            }, ke.prototype.v1DeveloperProductsDeveloperProductIdNameDescriptionGet = function(e, t) {
                var n = this;
                return Ne(this.configuration).v1DeveloperProductsDeveloperProductIdNameDescriptionGet(e, t).then(function(e) {
                    return e(n.axios, n.basePath)
                })
            }, ke.prototype.v1DeveloperProductsDeveloperProductIdNameDescriptionLanguageCodesLanguageCodeDelete = function(e, t, n) {
                var r = this;
                return Ne(this.configuration).v1DeveloperProductsDeveloperProductIdNameDescriptionLanguageCodesLanguageCodeDelete(e, t, n).then(function(e) {
                    return e(r.axios, r.basePath)
                })
            }, ke.prototype.v1DeveloperProductsDeveloperProductIdNameDescriptionLanguageCodesLanguageCodePatch = function(e, t, n, r) {
                var a = this;
                return Ne(this.configuration).v1DeveloperProductsDeveloperProductIdNameDescriptionLanguageCodesLanguageCodePatch(e, t, n, r).then(function(e) {
                    return e(a.axios, a.basePath)
                })
            }, ke.prototype.v1DeveloperProductsDeveloperProductIdNameLanguageCodesLanguageCodePatch = function(e, t, n, r) {
                var a = this;
                return Ne(this.configuration).v1DeveloperProductsDeveloperProductIdNameLanguageCodesLanguageCodePatch(e, t, n, r).then(function(e) {
                    return e(a.axios, a.basePath)
                })
            }, Ge(Me, De = pe), Me.prototype.v1GameIconGamesGameIdGet = function(e, t, n, r) {
                var a = this;
                return We(this.configuration).v1GameIconGamesGameIdGet(e, t, n, r).then(function(e) {
                    return e(a.axios, a.basePath)
                })
            }, Me.prototype.v1GameIconGamesGameIdLanguageCodesLanguageCodeDelete = function(e, t, n) {
                var r = this;
                return We(this.configuration).v1GameIconGamesGameIdLanguageCodesLanguageCodeDelete(e, t, n).then(function(e) {
                    return e(r.axios, r.basePath)
                })
            }, Me.prototype.v1GameIconGamesGameIdLanguageCodesLanguageCodePost = function(e, t, n, r) {
                var a = this;
                return We(this.configuration).v1GameIconGamesGameIdLanguageCodesLanguageCodePost(e, t, n, r).then(function(e) {
                    return e(a.axios, a.basePath)
                })
            };
            var Ve, Je, Ke, $e = (Ge(Xe, Ve = pe), Xe.prototype.v1GameLocalizationStatusGameIdTranslationCountsGet = function(e, t) {
                var n = this;
                return He(this.configuration).v1GameLocalizationStatusGameIdTranslationCountsGet(e, t).then(function(e) {
                    return e(n.axios, n.basePath)
                })
            }, Xe.prototype.v1GameLocalizationStatusTranslationCountsForLanguageOrLocaleGet = function(e, t, n, r) {
                var a = this;
                return He(this.configuration).v1GameLocalizationStatusTranslationCountsForLanguageOrLocaleGet(e, t, n, r).then(function(e) {
                    return e(a.axios, a.basePath)
                })
            }, Xe);

            function Xe() {
                return null !== Ve && Ve.apply(this, arguments) || this
            }

            function Ye(d) {
                var e = this;
                return {
                    v1GamePassesGamePassIdDescriptionLanguageCodesLanguageCodePatch: function(s, i, u, c) {
                        return void 0 === c && (c = {}), be(e, void 0, Promise, function() {
                            var t, n, r, a, o;
                            return Pe(this, function(e) {
                                if (null == s) throw new fe("gamePassId", "Required parameter gamePassId was null or undefined when calling v1GamePassesGamePassIdDescriptionLanguageCodesLanguageCodePatch.");
                                if (null == i) throw new fe("languageCode", "Required parameter languageCode was null or undefined when calling v1GamePassesGamePassIdDescriptionLanguageCodesLanguageCodePatch.");
                                if (null == u) throw new fe("request", "Required parameter request was null or undefined when calling v1GamePassesGamePassIdDescriptionLanguageCodesLanguageCodePatch.");
                                return r = "/v1/game-passes/{gamePassId}/description/language-codes/{languageCode}".replace("{gamePassId}", encodeURIComponent(String(s))).replace("{languageCode}", encodeURIComponent(String(i))), t = T.Qc(r, !0), d && (o = d.baseOptions), n = Ie(Ie({
                                    method: "PATCH"
                                }, o), c), a = {}, (r = {})["Content-Type"] = "application/json", t.query = Ie(Ie(Ie({}, t.query), a), c.query), delete t.search, o = o && o.headers ? o.headers : {}, n.headers = Ie(Ie(Ie({}, r), o), c.headers), o = "string" != typeof u || "application/json" === n.headers["Content-Type"], n.data = o ? JSON.stringify(void 0 !== u ? u : {}) : u || "", [2, {
                                    url: T.WU(t),
                                    options: n
                                }]
                            })
                        })
                    },
                    v1GamePassesGamePassIdIconsGet: function(s, i, u, c) {
                        return void 0 === c && (c = {}), be(e, void 0, Promise, function() {
                            var t, n, r, a, o;
                            return Pe(this, function(e) {
                                if (null == s) throw new fe("gamePassId", "Required parameter gamePassId was null or undefined when calling v1GamePassesGamePassIdIconsGet.");
                                return a = "/v1/game-passes/{gamePassId}/icons".replace("{gamePassId}", encodeURIComponent(String(s))), t = T.Qc(a, !0), d && (o = d.baseOptions), n = Ie(Ie({
                                    method: "GET"
                                }, o), c), r = {}, a = {}, void 0 !== i && (a.width = i), void 0 !== u && (a.height = u), t.query = Ie(Ie(Ie({}, t.query), a), c.query), delete t.search, o = o && o.headers ? o.headers : {}, n.headers = Ie(Ie(Ie({}, r), o), c.headers), [2, {
                                    url: T.WU(t),
                                    options: n
                                }]
                            })
                        })
                    },
                    v1GamePassesGamePassIdIconsLanguageCodesLanguageCodeDelete: function(s, i, u) {
                        return void 0 === u && (u = {}), be(e, void 0, Promise, function() {
                            var t, n, r, a, o;
                            return Pe(this, function(e) {
                                if (null == s) throw new fe("gamePassId", "Required parameter gamePassId was null or undefined when calling v1GamePassesGamePassIdIconsLanguageCodesLanguageCodeDelete.");
                                if (null == i) throw new fe("languageCode", "Required parameter languageCode was null or undefined when calling v1GamePassesGamePassIdIconsLanguageCodesLanguageCodeDelete.");
                                return a = "/v1/game-passes/{gamePassId}/icons/language-codes/{languageCode}".replace("{gamePassId}", encodeURIComponent(String(s))).replace("{languageCode}", encodeURIComponent(String(i))), t = T.Qc(a, !0), d && (o = d.baseOptions), n = Ie(Ie({
                                    method: "DELETE"
                                }, o), u), r = {}, a = {}, t.query = Ie(Ie(Ie({}, t.query), a), u.query), delete t.search, o = o && o.headers ? o.headers : {}, n.headers = Ie(Ie(Ie({}, r), o), u.headers), [2, {
                                    url: T.WU(t),
                                    options: n
                                }]
                            })
                        })
                    },
                    v1GamePassesGamePassIdIconsLanguageCodesLanguageCodePost: function(i, u, c, l) {
                        return void 0 === l && (l = {}), be(e, void 0, Promise, function() {
                            var t, n, r, a, o, s;
                            return Pe(this, function(e) {
                                if (null == i) throw new fe("gamePassId", "Required parameter gamePassId was null or undefined when calling v1GamePassesGamePassIdIconsLanguageCodesLanguageCodePost.");
                                if (null == u) throw new fe("languageCode", "Required parameter languageCode was null or undefined when calling v1GamePassesGamePassIdIconsLanguageCodesLanguageCodePost.");
                                return o = "/v1/game-passes/{gamePassId}/icons/language-codes/{languageCode}".replace("{gamePassId}", encodeURIComponent(String(i))).replace("{languageCode}", encodeURIComponent(String(u))), t = T.Qc(o, !0), d && (s = d.baseOptions), n = Ie(Ie({
                                    method: "POST"
                                }, s), l), r = {}, a = {}, o = new FormData, void 0 !== c && o.append("request.files", c), r["Content-Type"] = "multipart/form-data", t.query = Ie(Ie(Ie({}, t.query), a), l.query), delete t.search, s = s && s.headers ? s.headers : {}, n.headers = Ie(Ie(Ie({}, r), s), l.headers), n.data = o, [2, {
                                    url: T.WU(t),
                                    options: n
                                }]
                            })
                        })
                    },
                    v1GamePassesGamePassIdNameDescriptionGet: function(s, i) {
                        return void 0 === i && (i = {}), be(e, void 0, Promise, function() {
                            var t, n, r, a, o;
                            return Pe(this, function(e) {
                                if (null == s) throw new fe("gamePassId", "Required parameter gamePassId was null or undefined when calling v1GamePassesGamePassIdNameDescriptionGet.");
                                return a = "/v1/game-passes/{gamePassId}/name-description".replace("{gamePassId}", encodeURIComponent(String(s))), t = T.Qc(a, !0), d && (o = d.baseOptions), n = Ie(Ie({
                                    method: "GET"
                                }, o), i), r = {}, a = {}, t.query = Ie(Ie(Ie({}, t.query), a), i.query), delete t.search, o = o && o.headers ? o.headers : {}, n.headers = Ie(Ie(Ie({}, r), o), i.headers), [2, {
                                    url: T.WU(t),
                                    options: n
                                }]
                            })
                        })
                    },
                    v1GamePassesGamePassIdNameDescriptionLanguageCodesLanguageCodeDelete: function(s, i, u) {
                        return void 0 === u && (u = {}), be(e, void 0, Promise, function() {
                            var t, n, r, a, o;
                            return Pe(this, function(e) {
                                if (null == s) throw new fe("gamePassId", "Required parameter gamePassId was null or undefined when calling v1GamePassesGamePassIdNameDescriptionLanguageCodesLanguageCodeDelete.");
                                if (null == i) throw new fe("languageCode", "Required parameter languageCode was null or undefined when calling v1GamePassesGamePassIdNameDescriptionLanguageCodesLanguageCodeDelete.");
                                return a = "/v1/game-passes/{gamePassId}/name-description/language-codes/{languageCode}".replace("{gamePassId}", encodeURIComponent(String(s))).replace("{languageCode}", encodeURIComponent(String(i))), t = T.Qc(a, !0), d && (o = d.baseOptions), n = Ie(Ie({
                                    method: "DELETE"
                                }, o), u), r = {}, a = {}, t.query = Ie(Ie(Ie({}, t.query), a), u.query), delete t.search, o = o && o.headers ? o.headers : {}, n.headers = Ie(Ie(Ie({}, r), o), u.headers), [2, {
                                    url: T.WU(t),
                                    options: n
                                }]
                            })
                        })
                    },
                    v1GamePassesGamePassIdNameDescriptionLanguageCodesLanguageCodePatch: function(s, i, u, c) {
                        return void 0 === c && (c = {}), be(e, void 0, Promise, function() {
                            var t, n, r, a, o;
                            return Pe(this, function(e) {
                                if (null == s) throw new fe("gamePassId", "Required parameter gamePassId was null or undefined when calling v1GamePassesGamePassIdNameDescriptionLanguageCodesLanguageCodePatch.");
                                if (null == i) throw new fe("languageCode", "Required parameter languageCode was null or undefined when calling v1GamePassesGamePassIdNameDescriptionLanguageCodesLanguageCodePatch.");
                                if (null == u) throw new fe("request", "Required parameter request was null or undefined when calling v1GamePassesGamePassIdNameDescriptionLanguageCodesLanguageCodePatch.");
                                return r = "/v1/game-passes/{gamePassId}/name-description/language-codes/{languageCode}".replace("{gamePassId}", encodeURIComponent(String(s))).replace("{languageCode}", encodeURIComponent(String(i))), t = T.Qc(r, !0), d && (o = d.baseOptions), n = Ie(Ie({
                                    method: "PATCH"
                                }, o), c), a = {}, (r = {})["Content-Type"] = "application/json", t.query = Ie(Ie(Ie({}, t.query), a), c.query), delete t.search, o = o && o.headers ? o.headers : {}, n.headers = Ie(Ie(Ie({}, r), o), c.headers), o = "string" != typeof u || "application/json" === n.headers["Content-Type"], n.data = o ? JSON.stringify(void 0 !== u ? u : {}) : u || "", [2, {
                                    url: T.WU(t),
                                    options: n
                                }]
                            })
                        })
                    },
                    v1GamePassesGamePassIdNameLanguageCodesLanguageCodePatch: function(s, i, u, c) {
                        return void 0 === c && (c = {}), be(e, void 0, Promise, function() {
                            var t, n, r, a, o;
                            return Pe(this, function(e) {
                                if (null == s) throw new fe("gamePassId", "Required parameter gamePassId was null or undefined when calling v1GamePassesGamePassIdNameLanguageCodesLanguageCodePatch.");
                                if (null == i) throw new fe("languageCode", "Required parameter languageCode was null or undefined when calling v1GamePassesGamePassIdNameLanguageCodesLanguageCodePatch.");
                                if (null == u) throw new fe("request", "Required parameter request was null or undefined when calling v1GamePassesGamePassIdNameLanguageCodesLanguageCodePatch.");
                                return r = "/v1/game-passes/{gamePassId}/name/language-codes/{languageCode}".replace("{gamePassId}", encodeURIComponent(String(s))).replace("{languageCode}", encodeURIComponent(String(i))), t = T.Qc(r, !0), d && (o = d.baseOptions), n = Ie(Ie({
                                    method: "PATCH"
                                }, o), c), a = {}, (r = {})["Content-Type"] = "application/json", t.query = Ie(Ie(Ie({}, t.query), a), c.query), delete t.search, o = o && o.headers ? o.headers : {}, n.headers = Ie(Ie(Ie({}, r), o), c.headers), o = "string" != typeof u || "application/json" === n.headers["Content-Type"], n.data = o ? JSON.stringify(void 0 !== u ? u : {}) : u || "", [2, {
                                    url: T.WU(t),
                                    options: n
                                }]
                            })
                        })
                    }
                }
            }

            function Ze(s) {
                return {
                    v1GamePassesGamePassIdDescriptionLanguageCodesLanguageCodePatch: function(t, r, a, o) {
                        return be(this, void 0, Promise, function() {
                            var n;
                            return Pe(this, function(e) {
                                switch (e.label) {
                                    case 0:
                                        return [4, Ye(s).v1GamePassesGamePassIdDescriptionLanguageCodesLanguageCodePatch(t, r, a, o)];
                                    case 1:
                                        return n = e.sent(), [2, function(e, t) {
                                            void 0 === e && (e = b), void 0 === t && (t = ve);
                                            t = Ie(Ie({}, n.options), {
                                                url: t + n.url
                                            });
                                            return e.request(t)
                                        }]
                                }
                            })
                        })
                    },
                    v1GamePassesGamePassIdIconsGet: function(t, r, a, o) {
                        return be(this, void 0, Promise, function() {
                            var n;
                            return Pe(this, function(e) {
                                switch (e.label) {
                                    case 0:
                                        return [4, Ye(s).v1GamePassesGamePassIdIconsGet(t, r, a, o)];
                                    case 1:
                                        return n = e.sent(), [2, function(e, t) {
                                            void 0 === e && (e = b), void 0 === t && (t = ve);
                                            t = Ie(Ie({}, n.options), {
                                                url: t + n.url
                                            });
                                            return e.request(t)
                                        }]
                                }
                            })
                        })
                    },
                    v1GamePassesGamePassIdIconsLanguageCodesLanguageCodeDelete: function(t, r, a) {
                        return be(this, void 0, Promise, function() {
                            var n;
                            return Pe(this, function(e) {
                                switch (e.label) {
                                    case 0:
                                        return [4, Ye(s).v1GamePassesGamePassIdIconsLanguageCodesLanguageCodeDelete(t, r, a)];
                                    case 1:
                                        return n = e.sent(), [2, function(e, t) {
                                            void 0 === e && (e = b), void 0 === t && (t = ve);
                                            t = Ie(Ie({}, n.options), {
                                                url: t + n.url
                                            });
                                            return e.request(t)
                                        }]
                                }
                            })
                        })
                    },
                    v1GamePassesGamePassIdIconsLanguageCodesLanguageCodePost: function(t, r, a, o) {
                        return be(this, void 0, Promise, function() {
                            var n;
                            return Pe(this, function(e) {
                                switch (e.label) {
                                    case 0:
                                        return [4, Ye(s).v1GamePassesGamePassIdIconsLanguageCodesLanguageCodePost(t, r, a, o)];
                                    case 1:
                                        return n = e.sent(), [2, function(e, t) {
                                            void 0 === e && (e = b), void 0 === t && (t = ve);
                                            t = Ie(Ie({}, n.options), {
                                                url: t + n.url
                                            });
                                            return e.request(t)
                                        }]
                                }
                            })
                        })
                    },
                    v1GamePassesGamePassIdNameDescriptionGet: function(t, r) {
                        return be(this, void 0, Promise, function() {
                            var n;
                            return Pe(this, function(e) {
                                switch (e.label) {
                                    case 0:
                                        return [4, Ye(s).v1GamePassesGamePassIdNameDescriptionGet(t, r)];
                                    case 1:
                                        return n = e.sent(), [2, function(e, t) {
                                            void 0 === e && (e = b), void 0 === t && (t = ve);
                                            t = Ie(Ie({}, n.options), {
                                                url: t + n.url
                                            });
                                            return e.request(t)
                                        }]
                                }
                            })
                        })
                    },
                    v1GamePassesGamePassIdNameDescriptionLanguageCodesLanguageCodeDelete: function(t, r, a) {
                        return be(this, void 0, Promise, function() {
                            var n;
                            return Pe(this, function(e) {
                                switch (e.label) {
                                    case 0:
                                        return [4, Ye(s).v1GamePassesGamePassIdNameDescriptionLanguageCodesLanguageCodeDelete(t, r, a)];
                                    case 1:
                                        return n = e.sent(), [2, function(e, t) {
                                            void 0 === e && (e = b), void 0 === t && (t = ve);
                                            t = Ie(Ie({}, n.options), {
                                                url: t + n.url
                                            });
                                            return e.request(t)
                                        }]
                                }
                            })
                        })
                    },
                    v1GamePassesGamePassIdNameDescriptionLanguageCodesLanguageCodePatch: function(t, r, a, o) {
                        return be(this, void 0, Promise, function() {
                            var n;
                            return Pe(this, function(e) {
                                switch (e.label) {
                                    case 0:
                                        return [4, Ye(s).v1GamePassesGamePassIdNameDescriptionLanguageCodesLanguageCodePatch(t, r, a, o)];
                                    case 1:
                                        return n = e.sent(), [2, function(e, t) {
                                            void 0 === e && (e = b), void 0 === t && (t = ve);
                                            t = Ie(Ie({}, n.options), {
                                                url: t + n.url
                                            });
                                            return e.request(t)
                                        }]
                                }
                            })
                        })
                    },
                    v1GamePassesGamePassIdNameLanguageCodesLanguageCodePatch: function(t, r, a, o) {
                        return be(this, void 0, Promise, function() {
                            var n;
                            return Pe(this, function(e) {
                                switch (e.label) {
                                    case 0:
                                        return [4, Ye(s).v1GamePassesGamePassIdNameLanguageCodesLanguageCodePatch(t, r, a, o)];
                                    case 1:
                                        return n = e.sent(), [2, function(e, t) {
                                            void 0 === e && (e = b), void 0 === t && (t = ve);
                                            t = Ie(Ie({}, n.options), {
                                                url: t + n.url
                                            });
                                            return e.request(t)
                                        }]
                                }
                            })
                        })
                    }
                }
            }

            function et() {
                return null !== Je && Je.apply(this, arguments) || this
            }

            function tt(d) {
                var e = this;
                return {
                    v1GameThumbnailsGamesGameIdImagesGet: function(s, i, u, c) {
                        return void 0 === c && (c = {}), be(e, void 0, Promise, function() {
                            var t, n, r, a, o;
                            return Pe(this, function(e) {
                                if (null == s) throw new fe("gameId", "Required parameter gameId was null or undefined when calling v1GameThumbnailsGamesGameIdImagesGet.");
                                return a = "/v1/game-thumbnails/games/{gameId}/images".replace("{gameId}", encodeURIComponent(String(s))), t = T.Qc(a, !0), d && (o = d.baseOptions), n = Ie(Ie({
                                    method: "GET"
                                }, o), c), r = {}, a = {}, void 0 !== i && (a.width = i), void 0 !== u && (a.height = u), t.query = Ie(Ie(Ie({}, t.query), a), c.query), delete t.search, o = o && o.headers ? o.headers : {}, n.headers = Ie(Ie(Ie({}, r), o), c.headers), [2, {
                                    url: T.WU(t),
                                    options: n
                                }]
                            })
                        })
                    },
                    v1GameThumbnailsGamesGameIdLanguageCodesLanguageCodeImagePost: function(i, u, c, l) {
                        return void 0 === l && (l = {}), be(e, void 0, Promise, function() {
                            var t, n, r, a, o, s;
                            return Pe(this, function(e) {
                                if (null == i) throw new fe("gameId", "Required parameter gameId was null or undefined when calling v1GameThumbnailsGamesGameIdLanguageCodesLanguageCodeImagePost.");
                                if (null == u) throw new fe("languageCode", "Required parameter languageCode was null or undefined when calling v1GameThumbnailsGamesGameIdLanguageCodesLanguageCodeImagePost.");
                                return o = "/v1/game-thumbnails/games/{gameId}/language-codes/{languageCode}/image".replace("{gameId}", encodeURIComponent(String(i))).replace("{languageCode}", encodeURIComponent(String(u))), t = T.Qc(o, !0), d && (s = d.baseOptions), n = Ie(Ie({
                                    method: "POST"
                                }, s), l), r = {}, a = {}, o = new FormData, void 0 !== c && o.append("gameThumbnailRequest.files", c), r["Content-Type"] = "multipart/form-data", t.query = Ie(Ie(Ie({}, t.query), a), l.query), delete t.search, s = s && s.headers ? s.headers : {}, n.headers = Ie(Ie(Ie({}, r), s), l.headers), n.data = o, [2, {
                                    url: T.WU(t),
                                    options: n
                                }]
                            })
                        })
                    },
                    v1GameThumbnailsGamesGameIdLanguageCodesLanguageCodeImagesImageIdDelete: function(s, i, u, c) {
                        return void 0 === c && (c = {}), be(e, void 0, Promise, function() {
                            var t, n, r, a, o;
                            return Pe(this, function(e) {
                                if (null == s) throw new fe("gameId", "Required parameter gameId was null or undefined when calling v1GameThumbnailsGamesGameIdLanguageCodesLanguageCodeImagesImageIdDelete.");
                                if (null == i) throw new fe("languageCode", "Required parameter languageCode was null or undefined when calling v1GameThumbnailsGamesGameIdLanguageCodesLanguageCodeImagesImageIdDelete.");
                                if (null == u) throw new fe("imageId", "Required parameter imageId was null or undefined when calling v1GameThumbnailsGamesGameIdLanguageCodesLanguageCodeImagesImageIdDelete.");
                                return a = "/v1/game-thumbnails/games/{gameId}/language-codes/{languageCode}/images/{imageId}".replace("{gameId}", encodeURIComponent(String(s))).replace("{languageCode}", encodeURIComponent(String(i))).replace("{imageId}", encodeURIComponent(String(u))), t = T.Qc(a, !0), d && (o = d.baseOptions), n = Ie(Ie({
                                    method: "DELETE"
                                }, o), c), r = {}, a = {}, t.query = Ie(Ie(Ie({}, t.query), a), c.query), delete t.search, o = o && o.headers ? o.headers : {}, n.headers = Ie(Ie(Ie({}, r), o), c.headers), [2, {
                                    url: T.WU(t),
                                    options: n
                                }]
                            })
                        })
                    },
                    v1GameThumbnailsGamesGameIdLanguageCodesLanguageCodeImagesOrderPost: function(s, i, u, c) {
                        return void 0 === c && (c = {}), be(e, void 0, Promise, function() {
                            var t, n, r, a, o;
                            return Pe(this, function(e) {
                                if (null == s) throw new fe("gameId", "Required parameter gameId was null or undefined when calling v1GameThumbnailsGamesGameIdLanguageCodesLanguageCodeImagesOrderPost.");
                                if (null == i) throw new fe("languageCode", "Required parameter languageCode was null or undefined when calling v1GameThumbnailsGamesGameIdLanguageCodesLanguageCodeImagesOrderPost.");
                                if (null == u) throw new fe("request", "Required parameter request was null or undefined when calling v1GameThumbnailsGamesGameIdLanguageCodesLanguageCodeImagesOrderPost.");
                                return r = "/v1/game-thumbnails/games/{gameId}/language-codes/{languageCode}/images/order".replace("{gameId}", encodeURIComponent(String(s))).replace("{languageCode}", encodeURIComponent(String(i))), t = T.Qc(r, !0), d && (o = d.baseOptions), n = Ie(Ie({
                                    method: "POST"
                                }, o), c), a = {}, (r = {})["Content-Type"] = "application/json", t.query = Ie(Ie(Ie({}, t.query), a), c.query), delete t.search, o = o && o.headers ? o.headers : {}, n.headers = Ie(Ie(Ie({}, r), o), c.headers), o = "string" != typeof u || "application/json" === n.headers["Content-Type"], n.data = o ? JSON.stringify(void 0 !== u ? u : {}) : u || "", [2, {
                                    url: T.WU(t),
                                    options: n
                                }]
                            })
                        })
                    }
                }
            }

            function nt(s) {
                return {
                    v1GameThumbnailsGamesGameIdImagesGet: function(t, r, a, o) {
                        return be(this, void 0, Promise, function() {
                            var n;
                            return Pe(this, function(e) {
                                switch (e.label) {
                                    case 0:
                                        return [4, tt(s).v1GameThumbnailsGamesGameIdImagesGet(t, r, a, o)];
                                    case 1:
                                        return n = e.sent(), [2, function(e, t) {
                                            void 0 === e && (e = b), void 0 === t && (t = ve);
                                            t = Ie(Ie({}, n.options), {
                                                url: t + n.url
                                            });
                                            return e.request(t)
                                        }]
                                }
                            })
                        })
                    },
                    v1GameThumbnailsGamesGameIdLanguageCodesLanguageCodeImagePost: function(t, r, a, o) {
                        return be(this, void 0, Promise, function() {
                            var n;
                            return Pe(this, function(e) {
                                switch (e.label) {
                                    case 0:
                                        return [4, tt(s).v1GameThumbnailsGamesGameIdLanguageCodesLanguageCodeImagePost(t, r, a, o)];
                                    case 1:
                                        return n = e.sent(), [2, function(e, t) {
                                            void 0 === e && (e = b), void 0 === t && (t = ve);
                                            t = Ie(Ie({}, n.options), {
                                                url: t + n.url
                                            });
                                            return e.request(t)
                                        }]
                                }
                            })
                        })
                    },
                    v1GameThumbnailsGamesGameIdLanguageCodesLanguageCodeImagesImageIdDelete: function(t, r, a, o) {
                        return be(this, void 0, Promise, function() {
                            var n;
                            return Pe(this, function(e) {
                                switch (e.label) {
                                    case 0:
                                        return [4, tt(s).v1GameThumbnailsGamesGameIdLanguageCodesLanguageCodeImagesImageIdDelete(t, r, a, o)];
                                    case 1:
                                        return n = e.sent(), [2, function(e, t) {
                                            void 0 === e && (e = b), void 0 === t && (t = ve);
                                            t = Ie(Ie({}, n.options), {
                                                url: t + n.url
                                            });
                                            return e.request(t)
                                        }]
                                }
                            })
                        })
                    },
                    v1GameThumbnailsGamesGameIdLanguageCodesLanguageCodeImagesOrderPost: function(t, r, a, o) {
                        return be(this, void 0, Promise, function() {
                            var n;
                            return Pe(this, function(e) {
                                switch (e.label) {
                                    case 0:
                                        return [4, tt(s).v1GameThumbnailsGamesGameIdLanguageCodesLanguageCodeImagesOrderPost(t, r, a, o)];
                                    case 1:
                                        return n = e.sent(), [2, function(e, t) {
                                            void 0 === e && (e = b), void 0 === t && (t = ve);
                                            t = Ie(Ie({}, n.options), {
                                                url: t + n.url
                                            });
                                            return e.request(t)
                                        }]
                                }
                            })
                        })
                    }
                }
            }

            function rt() {
                return null !== Ke && Ke.apply(this, arguments) || this
            }

            function at(l) {
                var e = this;
                return {
                    v1LocalizationtableAvailableLanguagesGet: function(s) {
                        return void 0 === s && (s = {}), be(e, void 0, Promise, function() {
                            var t, n, r, a, o;
                            return Pe(this, function(e) {
                                return t = T.Qc("/v1/localizationtable/available-languages", !0), l && (o = l.baseOptions), n = Ie(Ie({
                                    method: "GET"
                                }, o), s), r = {}, a = {}, t.query = Ie(Ie(Ie({}, t.query), a), s.query), delete t.search, o = o && o.headers ? o.headers : {}, n.headers = Ie(Ie(Ie({}, r), o), s.headers), [2, {
                                    url: T.WU(t),
                                    options: n
                                }]
                            })
                        })
                    },
                    v1LocalizationtableGamesGameIdAssetsGenerationRequestPost: function(s, i) {
                        return void 0 === i && (i = {}), be(e, void 0, Promise, function() {
                            var t, n, r, a, o;
                            return Pe(this, function(e) {
                                if (null == s) throw new fe("gameId", "Required parameter gameId was null or undefined when calling v1LocalizationtableGamesGameIdAssetsGenerationRequestPost.");
                                return a = "/v1/localizationtable/games/{gameId}/assets-generation-request".replace("{gameId}", encodeURIComponent(String(s))), t = T.Qc(a, !0), l && (o = l.baseOptions), n = Ie(Ie({
                                    method: "POST"
                                }, o), i), r = {}, a = {}, t.query = Ie(Ie(Ie({}, t.query), a), i.query), delete t.search, o = o && o.headers ? o.headers : {}, n.headers = Ie(Ie(Ie({}, r), o), i.headers), [2, {
                                    url: T.WU(t),
                                    options: n
                                }]
                            })
                        })
                    },
                    v1LocalizationtableGametablesGameIdPatch: function(s, i, u) {
                        return void 0 === u && (u = {}), be(e, void 0, Promise, function() {
                            var t, n, r, a, o;
                            return Pe(this, function(e) {
                                if (null == s) throw new fe("gameId", "Required parameter gameId was null or undefined when calling v1LocalizationtableGametablesGameIdPatch.");
                                if (null == i) throw new fe("request", "Required parameter request was null or undefined when calling v1LocalizationtableGametablesGameIdPatch.");
                                return r = "/v1/localizationtable/gametables/{gameId}".replace("{gameId}", encodeURIComponent(String(s))), t = T.Qc(r, !0), l && (o = l.baseOptions), n = Ie(Ie({
                                    method: "PATCH"
                                }, o), u), a = {}, (r = {})["Content-Type"] = "application/json", t.query = Ie(Ie(Ie({}, t.query), a), u.query), delete t.search, o = o && o.headers ? o.headers : {}, n.headers = Ie(Ie(Ie({}, r), o), u.headers), o = "string" != typeof i || "application/json" === n.headers["Content-Type"], n.data = o ? JSON.stringify(void 0 !== i ? i : {}) : i || "", [2, {
                                    url: T.WU(t),
                                    options: n
                                }]
                            })
                        })
                    },
                    v1LocalizationtableTablesGet: function(s, i) {
                        return void 0 === i && (i = {}), be(e, void 0, Promise, function() {
                            var t, n, r, a, o;
                            return Pe(this, function(e) {
                                if (null == s) throw new fe("assetId", "Required parameter assetId was null or undefined when calling v1LocalizationtableTablesGet.");
                                return t = T.Qc("/v1/localizationtable/tables", !0), l && (o = l.baseOptions), n = Ie(Ie({
                                    method: "GET"
                                }, o), i), r = {}, a = {}, void 0 !== s && (a.assetId = s), t.query = Ie(Ie(Ie({}, t.query), a), i.query), delete t.search, o = o && o.headers ? o.headers : {}, n.headers = Ie(Ie(Ie({}, r), o), i.headers), [2, {
                                    url: T.WU(t),
                                    options: n
                                }]
                            })
                        })
                    },
                    v1LocalizationtableTablesPost: function(s, i) {
                        return void 0 === i && (i = {}), be(e, void 0, Promise, function() {
                            var t, n, r, a, o;
                            return Pe(this, function(e) {
                                if (null == s) throw new fe("request", "Required parameter request was null or undefined when calling v1LocalizationtableTablesPost.");
                                return t = T.Qc("/v1/localizationtable/tables", !0), l && (o = l.baseOptions), n = Ie(Ie({
                                    method: "POST"
                                }, o), i), a = {}, (r = {})["Content-Type"] = "application/json", t.query = Ie(Ie(Ie({}, t.query), a), i.query), delete t.search, o = o && o.headers ? o.headers : {}, n.headers = Ie(Ie(Ie({}, r), o), i.headers), o = "string" != typeof s || "application/json" === n.headers["Content-Type"], n.data = o ? JSON.stringify(void 0 !== s ? s : {}) : s || "", [2, {
                                    url: T.WU(t),
                                    options: n
                                }]
                            })
                        })
                    },
                    v1LocalizationtableTablesTableIdEntriesGet: function(s, i, u, c) {
                        return void 0 === c && (c = {}), be(e, void 0, Promise, function() {
                            var t, n, r, a, o;
                            return Pe(this, function(e) {
                                if (null == s) throw new fe("tableId", "Required parameter tableId was null or undefined when calling v1LocalizationtableTablesTableIdEntriesGet.");
                                return a = "/v1/localizationtable/tables/{tableId}/entries".replace("{tableId}", encodeURIComponent(String(s))), t = T.Qc(a, !0), l && (o = l.baseOptions), n = Ie(Ie({
                                    method: "GET"
                                }, o), c), r = {}, a = {}, void 0 !== i && (a.cursor = i), void 0 !== u && (a.gameId = u), t.query = Ie(Ie(Ie({}, t.query), a), c.query), delete t.search, o = o && o.headers ? o.headers : {}, n.headers = Ie(Ie(Ie({}, r), o), c.headers), [2, {
                                    url: T.WU(t),
                                    options: n
                                }]
                            })
                        })
                    },
                    v1LocalizationtableTablesTableIdEntriesTranslationHistoryPost: function(s, i, u, c) {
                        return void 0 === c && (c = {}), be(e, void 0, Promise, function() {
                            var t, n, r, a, o;
                            return Pe(this, function(e) {
                                if (null == s) throw new fe("tableId", "Required parameter tableId was null or undefined when calling v1LocalizationtableTablesTableIdEntriesTranslationHistoryPost.");
                                if (null == i) throw new fe("request", "Required parameter request was null or undefined when calling v1LocalizationtableTablesTableIdEntriesTranslationHistoryPost.");
                                return a = "/v1/localizationtable/tables/{tableId}/entries/translation-history".replace("{tableId}", encodeURIComponent(String(s))), t = T.Qc(a, !0), l && (o = l.baseOptions), n = Ie(Ie({
                                    method: "POST"
                                }, o), c), r = {}, a = {}, void 0 !== u && (a.gameId = u), r["Content-Type"] = "application/json", t.query = Ie(Ie(Ie({}, t.query), a), c.query), delete t.search, o = o && o.headers ? o.headers : {}, n.headers = Ie(Ie(Ie({}, r), o), c.headers), o = "string" != typeof i || "application/json" === n.headers["Content-Type"], n.data = o ? JSON.stringify(void 0 !== i ? i : {}) : i || "", [2, {
                                    url: T.WU(t),
                                    options: n
                                }]
                            })
                        })
                    },
                    v1LocalizationtableTablesTableIdEntryCountGet: function(s, i, u) {
                        return void 0 === u && (u = {}), be(e, void 0, Promise, function() {
                            var t, n, r, a, o;
                            return Pe(this, function(e) {
                                if (null == s) throw new fe("tableId", "Required parameter tableId was null or undefined when calling v1LocalizationtableTablesTableIdEntryCountGet.");
                                return a = "/v1/localizationtable/tables/{tableId}/entry-count".replace("{tableId}", encodeURIComponent(String(s))), t = T.Qc(a, !0), l && (o = l.baseOptions), n = Ie(Ie({
                                    method: "GET"
                                }, o), u), r = {}, a = {}, void 0 !== i && (a.gameId = i), t.query = Ie(Ie(Ie({}, t.query), a), u.query), delete t.search, o = o && o.headers ? o.headers : {}, n.headers = Ie(Ie(Ie({}, r), o), u.headers), [2, {
                                    url: T.WU(t),
                                    options: n
                                }]
                            })
                        })
                    },
                    v1LocalizationtableTablesTableIdGet: function(s, i) {
                        return void 0 === i && (i = {}), be(e, void 0, Promise, function() {
                            var t, n, r, a, o;
                            return Pe(this, function(e) {
                                if (null == s) throw new fe("tableId", "Required parameter tableId was null or undefined when calling v1LocalizationtableTablesTableIdGet.");
                                return a = "/v1/localizationtable/tables/{tableId}".replace("{tableId}", encodeURIComponent(String(s))), t = T.Qc(a, !0), l && (o = l.baseOptions), n = Ie(Ie({
                                    method: "GET"
                                }, o), i), r = {}, a = {}, t.query = Ie(Ie(Ie({}, t.query), a), i.query), delete t.search, o = o && o.headers ? o.headers : {}, n.headers = Ie(Ie(Ie({}, r), o), i.headers), [2, {
                                    url: T.WU(t),
                                    options: n
                                }]
                            })
                        })
                    },
                    v1LocalizationtableTablesTableIdPatch: function(s, i, u, c) {
                        return void 0 === c && (c = {}), be(e, void 0, Promise, function() {
                            var t, n, r, a, o;
                            return Pe(this, function(e) {
                                if (null == s) throw new fe("tableId", "Required parameter tableId was null or undefined when calling v1LocalizationtableTablesTableIdPatch.");
                                if (null == i) throw new fe("request", "Required parameter request was null or undefined when calling v1LocalizationtableTablesTableIdPatch.");
                                return a = "/v1/localizationtable/tables/{tableId}".replace("{tableId}", encodeURIComponent(String(s))), t = T.Qc(a, !0), l && (o = l.baseOptions), n = Ie(Ie({
                                    method: "PATCH"
                                }, o), c), r = {}, a = {}, void 0 !== u && (a.gameId = u), r["Content-Type"] = "application/json", t.query = Ie(Ie(Ie({}, t.query), a), c.query), delete t.search, o = o && o.headers ? o.headers : {}, n.headers = Ie(Ie(Ie({}, r), o), c.headers), o = "string" != typeof i || "application/json" === n.headers["Content-Type"], n.data = o ? JSON.stringify(void 0 !== i ? i : {}) : i || "", [2, {
                                    url: T.WU(t),
                                    options: n
                                }]
                            })
                        })
                    }
                }
            }

            function ot(s) {
                return {
                    v1LocalizationtableAvailableLanguagesGet: function(t) {
                        return be(this, void 0, Promise, function() {
                            var n;
                            return Pe(this, function(e) {
                                switch (e.label) {
                                    case 0:
                                        return [4, at(s).v1LocalizationtableAvailableLanguagesGet(t)];
                                    case 1:
                                        return n = e.sent(), [2, function(e, t) {
                                            void 0 === e && (e = b), void 0 === t && (t = ve);
                                            t = Ie(Ie({}, n.options), {
                                                url: t + n.url
                                            });
                                            return e.request(t)
                                        }]
                                }
                            })
                        })
                    },
                    v1LocalizationtableGamesGameIdAssetsGenerationRequestPost: function(t, r) {
                        return be(this, void 0, Promise, function() {
                            var n;
                            return Pe(this, function(e) {
                                switch (e.label) {
                                    case 0:
                                        return [4, at(s).v1LocalizationtableGamesGameIdAssetsGenerationRequestPost(t, r)];
                                    case 1:
                                        return n = e.sent(), [2, function(e, t) {
                                            void 0 === e && (e = b), void 0 === t && (t = ve);
                                            t = Ie(Ie({}, n.options), {
                                                url: t + n.url
                                            });
                                            return e.request(t)
                                        }]
                                }
                            })
                        })
                    },
                    v1LocalizationtableGametablesGameIdPatch: function(t, r, a) {
                        return be(this, void 0, Promise, function() {
                            var n;
                            return Pe(this, function(e) {
                                switch (e.label) {
                                    case 0:
                                        return [4, at(s).v1LocalizationtableGametablesGameIdPatch(t, r, a)];
                                    case 1:
                                        return n = e.sent(), [2, function(e, t) {
                                            void 0 === e && (e = b), void 0 === t && (t = ve);
                                            t = Ie(Ie({}, n.options), {
                                                url: t + n.url
                                            });
                                            return e.request(t)
                                        }]
                                }
                            })
                        })
                    },
                    v1LocalizationtableTablesGet: function(t, r) {
                        return be(this, void 0, Promise, function() {
                            var n;
                            return Pe(this, function(e) {
                                switch (e.label) {
                                    case 0:
                                        return [4, at(s).v1LocalizationtableTablesGet(t, r)];
                                    case 1:
                                        return n = e.sent(), [2, function(e, t) {
                                            void 0 === e && (e = b), void 0 === t && (t = ve);
                                            t = Ie(Ie({}, n.options), {
                                                url: t + n.url
                                            });
                                            return e.request(t)
                                        }]
                                }
                            })
                        })
                    },
                    v1LocalizationtableTablesPost: function(t, r) {
                        return be(this, void 0, Promise, function() {
                            var n;
                            return Pe(this, function(e) {
                                switch (e.label) {
                                    case 0:
                                        return [4, at(s).v1LocalizationtableTablesPost(t, r)];
                                    case 1:
                                        return n = e.sent(), [2, function(e, t) {
                                            void 0 === e && (e = b), void 0 === t && (t = ve);
                                            t = Ie(Ie({}, n.options), {
                                                url: t + n.url
                                            });
                                            return e.request(t)
                                        }]
                                }
                            })
                        })
                    },
                    v1LocalizationtableTablesTableIdEntriesGet: function(t, r, a, o) {
                        return be(this, void 0, Promise, function() {
                            var n;
                            return Pe(this, function(e) {
                                switch (e.label) {
                                    case 0:
                                        return [4, at(s).v1LocalizationtableTablesTableIdEntriesGet(t, r, a, o)];
                                    case 1:
                                        return n = e.sent(), [2, function(e, t) {
                                            void 0 === e && (e = b), void 0 === t && (t = ve);
                                            t = Ie(Ie({}, n.options), {
                                                url: t + n.url
                                            });
                                            return e.request(t)
                                        }]
                                }
                            })
                        })
                    },
                    v1LocalizationtableTablesTableIdEntriesTranslationHistoryPost: function(t, r, a, o) {
                        return be(this, void 0, Promise, function() {
                            var n;
                            return Pe(this, function(e) {
                                switch (e.label) {
                                    case 0:
                                        return [4, at(s).v1LocalizationtableTablesTableIdEntriesTranslationHistoryPost(t, r, a, o)];
                                    case 1:
                                        return n = e.sent(), [2, function(e, t) {
                                            void 0 === e && (e = b), void 0 === t && (t = ve);
                                            t = Ie(Ie({}, n.options), {
                                                url: t + n.url
                                            });
                                            return e.request(t)
                                        }]
                                }
                            })
                        })
                    },
                    v1LocalizationtableTablesTableIdEntryCountGet: function(t, r, a) {
                        return be(this, void 0, Promise, function() {
                            var n;
                            return Pe(this, function(e) {
                                switch (e.label) {
                                    case 0:
                                        return [4, at(s).v1LocalizationtableTablesTableIdEntryCountGet(t, r, a)];
                                    case 1:
                                        return n = e.sent(), [2, function(e, t) {
                                            void 0 === e && (e = b), void 0 === t && (t = ve);
                                            t = Ie(Ie({}, n.options), {
                                                url: t + n.url
                                            });
                                            return e.request(t)
                                        }]
                                }
                            })
                        })
                    },
                    v1LocalizationtableTablesTableIdGet: function(t, r) {
                        return be(this, void 0, Promise, function() {
                            var n;
                            return Pe(this, function(e) {
                                switch (e.label) {
                                    case 0:
                                        return [4, at(s).v1LocalizationtableTablesTableIdGet(t, r)];
                                    case 1:
                                        return n = e.sent(), [2, function(e, t) {
                                            void 0 === e && (e = b), void 0 === t && (t = ve);
                                            t = Ie(Ie({}, n.options), {
                                                url: t + n.url
                                            });
                                            return e.request(t)
                                        }]
                                }
                            })
                        })
                    },
                    v1LocalizationtableTablesTableIdPatch: function(t, r, a, o) {
                        return be(this, void 0, Promise, function() {
                            var n;
                            return Pe(this, function(e) {
                                switch (e.label) {
                                    case 0:
                                        return [4, at(s).v1LocalizationtableTablesTableIdPatch(t, r, a, o)];
                                    case 1:
                                        return n = e.sent(), [2, function(e, t) {
                                            void 0 === e && (e = b), void 0 === t && (t = ve);
                                            t = Ie(Ie({}, n.options), {
                                                url: t + n.url
                                            });
                                            return e.request(t)
                                        }]
                                }
                            })
                        })
                    }
                }
            }
            Ge(et, Je = pe), et.prototype.v1GamePassesGamePassIdDescriptionLanguageCodesLanguageCodePatch = function(e, t, n, r) {
                var a = this;
                return Ze(this.configuration).v1GamePassesGamePassIdDescriptionLanguageCodesLanguageCodePatch(e, t, n, r).then(function(e) {
                    return e(a.axios, a.basePath)
                })
            }, et.prototype.v1GamePassesGamePassIdIconsGet = function(e, t, n, r) {
                var a = this;
                return Ze(this.configuration).v1GamePassesGamePassIdIconsGet(e, t, n, r).then(function(e) {
                    return e(a.axios, a.basePath)
                })
            }, et.prototype.v1GamePassesGamePassIdIconsLanguageCodesLanguageCodeDelete = function(e, t, n) {
                var r = this;
                return Ze(this.configuration).v1GamePassesGamePassIdIconsLanguageCodesLanguageCodeDelete(e, t, n).then(function(e) {
                    return e(r.axios, r.basePath)
                })
            }, et.prototype.v1GamePassesGamePassIdIconsLanguageCodesLanguageCodePost = function(e, t, n, r) {
                var a = this;
                return Ze(this.configuration).v1GamePassesGamePassIdIconsLanguageCodesLanguageCodePost(e, t, n, r).then(function(e) {
                    return e(a.axios, a.basePath)
                })
            }, et.prototype.v1GamePassesGamePassIdNameDescriptionGet = function(e, t) {
                var n = this;
                return Ze(this.configuration).v1GamePassesGamePassIdNameDescriptionGet(e, t).then(function(e) {
                    return e(n.axios, n.basePath)
                })
            }, et.prototype.v1GamePassesGamePassIdNameDescriptionLanguageCodesLanguageCodeDelete = function(e, t, n) {
                var r = this;
                return Ze(this.configuration).v1GamePassesGamePassIdNameDescriptionLanguageCodesLanguageCodeDelete(e, t, n).then(function(e) {
                    return e(r.axios, r.basePath)
                })
            }, et.prototype.v1GamePassesGamePassIdNameDescriptionLanguageCodesLanguageCodePatch = function(e, t, n, r) {
                var a = this;
                return Ze(this.configuration).v1GamePassesGamePassIdNameDescriptionLanguageCodesLanguageCodePatch(e, t, n, r).then(function(e) {
                    return e(a.axios, a.basePath)
                })
            }, et.prototype.v1GamePassesGamePassIdNameLanguageCodesLanguageCodePatch = function(e, t, n, r) {
                var a = this;
                return Ze(this.configuration).v1GamePassesGamePassIdNameLanguageCodesLanguageCodePatch(e, t, n, r).then(function(e) {
                    return e(a.axios, a.basePath)
                })
            }, Ge(rt, Ke = pe), rt.prototype.v1GameThumbnailsGamesGameIdImagesGet = function(e, t, n, r) {
                var a = this;
                return nt(this.configuration).v1GameThumbnailsGamesGameIdImagesGet(e, t, n, r).then(function(e) {
                    return e(a.axios, a.basePath)
                })
            }, rt.prototype.v1GameThumbnailsGamesGameIdLanguageCodesLanguageCodeImagePost = function(e, t, n, r) {
                var a = this;
                return nt(this.configuration).v1GameThumbnailsGamesGameIdLanguageCodesLanguageCodeImagePost(e, t, n, r).then(function(e) {
                    return e(a.axios, a.basePath)
                })
            }, rt.prototype.v1GameThumbnailsGamesGameIdLanguageCodesLanguageCodeImagesImageIdDelete = function(e, t, n, r) {
                var a = this;
                return nt(this.configuration).v1GameThumbnailsGamesGameIdLanguageCodesLanguageCodeImagesImageIdDelete(e, t, n, r).then(function(e) {
                    return e(a.axios, a.basePath)
                })
            }, rt.prototype.v1GameThumbnailsGamesGameIdLanguageCodesLanguageCodeImagesOrderPost = function(e, t, n, r) {
                var a = this;
                return nt(this.configuration).v1GameThumbnailsGamesGameIdLanguageCodesLanguageCodeImagesOrderPost(e, t, n, r).then(function(e) {
                    return e(a.axios, a.basePath)
                })
            };
            var st, it, ut, t = (Ge(ct, st = pe), ct.prototype.v1LocalizationtableAvailableLanguagesGet = function(e) {
                var t = this;
                return ot(this.configuration).v1LocalizationtableAvailableLanguagesGet(e).then(function(e) {
                    return e(t.axios, t.basePath)
                })
            }, ct.prototype.v1LocalizationtableGamesGameIdAssetsGenerationRequestPost = function(e, t) {
                var n = this;
                return ot(this.configuration).v1LocalizationtableGamesGameIdAssetsGenerationRequestPost(e, t).then(function(e) {
                    return e(n.axios, n.basePath)
                })
            }, ct.prototype.v1LocalizationtableGametablesGameIdPatch = function(e, t, n) {
                var r = this;
                return ot(this.configuration).v1LocalizationtableGametablesGameIdPatch(e, t, n).then(function(e) {
                    return e(r.axios, r.basePath)
                })
            }, ct.prototype.v1LocalizationtableTablesGet = function(e, t) {
                var n = this;
                return ot(this.configuration).v1LocalizationtableTablesGet(e, t).then(function(e) {
                    return e(n.axios, n.basePath)
                })
            }, ct.prototype.v1LocalizationtableTablesPost = function(e, t) {
                var n = this;
                return ot(this.configuration).v1LocalizationtableTablesPost(e, t).then(function(e) {
                    return e(n.axios, n.basePath)
                })
            }, ct.prototype.v1LocalizationtableTablesTableIdEntriesGet = function(e, t, n, r) {
                var a = this;
                return ot(this.configuration).v1LocalizationtableTablesTableIdEntriesGet(e, t, n, r).then(function(e) {
                    return e(a.axios, a.basePath)
                })
            }, ct.prototype.v1LocalizationtableTablesTableIdEntriesTranslationHistoryPost = function(e, t, n, r) {
                var a = this;
                return ot(this.configuration).v1LocalizationtableTablesTableIdEntriesTranslationHistoryPost(e, t, n, r).then(function(e) {
                    return e(a.axios, a.basePath)
                })
            }, ct.prototype.v1LocalizationtableTablesTableIdEntryCountGet = function(e, t, n) {
                var r = this;
                return ot(this.configuration).v1LocalizationtableTablesTableIdEntryCountGet(e, t, n).then(function(e) {
                    return e(r.axios, r.basePath)
                })
            }, ct.prototype.v1LocalizationtableTablesTableIdGet = function(e, t) {
                var n = this;
                return ot(this.configuration).v1LocalizationtableTablesTableIdGet(e, t).then(function(e) {
                    return e(n.axios, n.basePath)
                })
            }, ct.prototype.v1LocalizationtableTablesTableIdPatch = function(e, t, n, r) {
                var a = this;
                return ot(this.configuration).v1LocalizationtableTablesTableIdPatch(e, t, n, r).then(function(e) {
                    return e(a.axios, a.basePath)
                })
            }, ct);

            function ct() {
                return null !== st && st.apply(this, arguments) || this
            }

            function lt(c) {
                var e = this;
                return {
                    v1NameDescriptionGamesGameIdGet: function(s, i) {
                        return void 0 === i && (i = {}), be(e, void 0, Promise, function() {
                            var t, n, r, a, o;
                            return Pe(this, function(e) {
                                if (null == s) throw new fe("gameId", "Required parameter gameId was null or undefined when calling v1NameDescriptionGamesGameIdGet.");
                                return a = "/v1/name-description/games/{gameId}".replace("{gameId}", encodeURIComponent(String(s))), t = T.Qc(a, !0), c && (o = c.baseOptions), n = Ie(Ie({
                                    method: "GET"
                                }, o), i), r = {}, a = {}, t.query = Ie(Ie(Ie({}, t.query), a), i.query), delete t.search, o = o && o.headers ? o.headers : {}, n.headers = Ie(Ie(Ie({}, r), o), i.headers), [2, {
                                    url: T.WU(t),
                                    options: n
                                }]
                            })
                        })
                    },
                    v1NameDescriptionGamesGameIdHistoryPost: function(s, i, u) {
                        return void 0 === u && (u = {}), be(e, void 0, Promise, function() {
                            var t, n, r, a, o;
                            return Pe(this, function(e) {
                                if (null == s) throw new fe("gameId", "Required parameter gameId was null or undefined when calling v1NameDescriptionGamesGameIdHistoryPost.");
                                if (null == i) throw new fe("request", "Required parameter request was null or undefined when calling v1NameDescriptionGamesGameIdHistoryPost.");
                                return r = "/v1/name-description/games/{gameId}/history".replace("{gameId}", encodeURIComponent(String(s))), t = T.Qc(r, !0), c && (o = c.baseOptions), n = Ie(Ie({
                                    method: "POST"
                                }, o), u), a = {}, (r = {})["Content-Type"] = "application/json", t.query = Ie(Ie(Ie({}, t.query), a), u.query), delete t.search, o = o && o.headers ? o.headers : {}, n.headers = Ie(Ie(Ie({}, r), o), u.headers), o = "string" != typeof i || "application/json" === n.headers["Content-Type"], n.data = o ? JSON.stringify(void 0 !== i ? i : {}) : i || "", [2, {
                                    url: T.WU(t),
                                    options: n
                                }]
                            })
                        })
                    },
                    v1NameDescriptionGamesGameIdPatch: function(s, i, u) {
                        return void 0 === u && (u = {}), be(e, void 0, Promise, function() {
                            var t, n, r, a, o;
                            return Pe(this, function(e) {
                                if (null == s) throw new fe("gameId", "Required parameter gameId was null or undefined when calling v1NameDescriptionGamesGameIdPatch.");
                                if (null == i) throw new fe("request", "Required parameter request was null or undefined when calling v1NameDescriptionGamesGameIdPatch.");
                                return r = "/v1/name-description/games/{gameId}".replace("{gameId}", encodeURIComponent(String(s))), t = T.Qc(r, !0), c && (o = c.baseOptions), n = Ie(Ie({
                                    method: "PATCH"
                                }, o), u), a = {}, (r = {})["Content-Type"] = "application/json", t.query = Ie(Ie(Ie({}, t.query), a), u.query), delete t.search, o = o && o.headers ? o.headers : {}, n.headers = Ie(Ie(Ie({}, r), o), u.headers), o = "string" != typeof i || "application/json" === n.headers["Content-Type"], n.data = o ? JSON.stringify(void 0 !== i ? i : {}) : i || "", [2, {
                                    url: T.WU(t),
                                    options: n
                                }]
                            })
                        })
                    },
                    v1NameDescriptionMetadataGet: function(s) {
                        return void 0 === s && (s = {}), be(e, void 0, Promise, function() {
                            var t, n, r, a, o;
                            return Pe(this, function(e) {
                                return t = T.Qc("/v1/name-description/metadata", !0), c && (o = c.baseOptions), n = Ie(Ie({
                                    method: "GET"
                                }, o), s), r = {}, a = {}, t.query = Ie(Ie(Ie({}, t.query), a), s.query), delete t.search, o = o && o.headers ? o.headers : {}, n.headers = Ie(Ie(Ie({}, r), o), s.headers), [2, {
                                    url: T.WU(t),
                                    options: n
                                }]
                            })
                        })
                    }
                }
            }

            function dt(o) {
                return {
                    v1NameDescriptionGamesGameIdGet: function(t, r) {
                        return be(this, void 0, Promise, function() {
                            var n;
                            return Pe(this, function(e) {
                                switch (e.label) {
                                    case 0:
                                        return [4, lt(o).v1NameDescriptionGamesGameIdGet(t, r)];
                                    case 1:
                                        return n = e.sent(), [2, function(e, t) {
                                            void 0 === e && (e = b), void 0 === t && (t = ve);
                                            t = Ie(Ie({}, n.options), {
                                                url: t + n.url
                                            });
                                            return e.request(t)
                                        }]
                                }
                            })
                        })
                    },
                    v1NameDescriptionGamesGameIdHistoryPost: function(t, r, a) {
                        return be(this, void 0, Promise, function() {
                            var n;
                            return Pe(this, function(e) {
                                switch (e.label) {
                                    case 0:
                                        return [4, lt(o).v1NameDescriptionGamesGameIdHistoryPost(t, r, a)];
                                    case 1:
                                        return n = e.sent(), [2, function(e, t) {
                                            void 0 === e && (e = b), void 0 === t && (t = ve);
                                            t = Ie(Ie({}, n.options), {
                                                url: t + n.url
                                            });
                                            return e.request(t)
                                        }]
                                }
                            })
                        })
                    },
                    v1NameDescriptionGamesGameIdPatch: function(t, r, a) {
                        return be(this, void 0, Promise, function() {
                            var n;
                            return Pe(this, function(e) {
                                switch (e.label) {
                                    case 0:
                                        return [4, lt(o).v1NameDescriptionGamesGameIdPatch(t, r, a)];
                                    case 1:
                                        return n = e.sent(), [2, function(e, t) {
                                            void 0 === e && (e = b), void 0 === t && (t = ve);
                                            t = Ie(Ie({}, n.options), {
                                                url: t + n.url
                                            });
                                            return e.request(t)
                                        }]
                                }
                            })
                        })
                    },
                    v1NameDescriptionMetadataGet: function(t) {
                        return be(this, void 0, Promise, function() {
                            var n;
                            return Pe(this, function(e) {
                                switch (e.label) {
                                    case 0:
                                        return [4, lt(o).v1NameDescriptionMetadataGet(t)];
                                    case 1:
                                        return n = e.sent(), [2, function(e, t) {
                                            void 0 === e && (e = b), void 0 === t && (t = ve);
                                            t = Ie(Ie({}, n.options), {
                                                url: t + n.url
                                            });
                                            return e.request(t)
                                        }]
                                }
                            })
                        })
                    }
                }
            }

            function ht() {
                return null !== it && it.apply(this, arguments) || this
            }

            function vt(l) {
                var e = this;
                return {
                    v1PlayerPoliciesAllValuesGet: function(s) {
                        return void 0 === s && (s = {}), be(e, void 0, Promise, function() {
                            var t, n, r, a, o;
                            return Pe(this, function(e) {
                                return t = T.Qc("/v1/player-policies/all-values", !0), l && (o = l.baseOptions), n = Ie(Ie({
                                    method: "GET"
                                }, o), s), r = {}, a = {}, t.query = Ie(Ie(Ie({}, t.query), a), s.query), delete t.search, o = o && o.headers ? o.headers : {}, n.headers = Ie(Ie(Ie({}, r), o), s.headers), [2, {
                                    url: T.WU(t),
                                    options: n
                                }]
                            })
                        })
                    },
                    v1PlayerPoliciesClientGet: function(s) {
                        return void 0 === s && (s = {}), be(e, void 0, Promise, function() {
                            var t, n, r, a, o;
                            return Pe(this, function(e) {
                                return t = T.Qc("/v1/player-policies-client", !0), l && (o = l.baseOptions), n = Ie(Ie({
                                    method: "GET"
                                }, o), s), r = {}, a = {}, t.query = Ie(Ie(Ie({}, t.query), a), s.query), delete t.search, o = o && o.headers ? o.headers : {}, n.headers = Ie(Ie(Ie({}, r), o), s.headers), [2, {
                                    url: T.WU(t),
                                    options: n
                                }]
                            })
                        })
                    },
                    v1PlayerPoliciesRccGet: function(s, i, u, c) {
                        return void 0 === c && (c = {}), be(e, void 0, Promise, function() {
                            var t, n, r, a, o;
                            return Pe(this, function(e) {
                                if (null == s) throw new fe("userId", "Required parameter userId was null or undefined when calling v1PlayerPoliciesRccGet.");
                                if (null == i) throw new fe("ipAddress", "Required parameter ipAddress was null or undefined when calling v1PlayerPoliciesRccGet.");
                                if (null == u) throw new fe("userAgent", "Required parameter userAgent was null or undefined when calling v1PlayerPoliciesRccGet.");
                                return t = T.Qc("/v1/player-policies-rcc", !0), l && (o = l.baseOptions), n = Ie(Ie({
                                    method: "GET"
                                }, o), c), r = {}, a = {}, void 0 !== s && (a.userId = s), void 0 !== i && (a.ipAddress = i), void 0 !== u && (a.userAgent = u), t.query = Ie(Ie(Ie({}, t.query), a), c.query), delete t.search, o = o && o.headers ? o.headers : {}, n.headers = Ie(Ie(Ie({}, r), o), c.headers), [2, {
                                    url: T.WU(t),
                                    options: n
                                }]
                            })
                        })
                    }
                }
            }

            function pt(s) {
                return {
                    v1PlayerPoliciesAllValuesGet: function(t) {
                        return be(this, void 0, Promise, function() {
                            var n;
                            return Pe(this, function(e) {
                                switch (e.label) {
                                    case 0:
                                        return [4, vt(s).v1PlayerPoliciesAllValuesGet(t)];
                                    case 1:
                                        return n = e.sent(), [2, function(e, t) {
                                            void 0 === e && (e = b), void 0 === t && (t = ve);
                                            t = Ie(Ie({}, n.options), {
                                                url: t + n.url
                                            });
                                            return e.request(t)
                                        }]
                                }
                            })
                        })
                    },
                    v1PlayerPoliciesClientGet: function(t) {
                        return be(this, void 0, Promise, function() {
                            var n;
                            return Pe(this, function(e) {
                                switch (e.label) {
                                    case 0:
                                        return [4, vt(s).v1PlayerPoliciesClientGet(t)];
                                    case 1:
                                        return n = e.sent(), [2, function(e, t) {
                                            void 0 === e && (e = b), void 0 === t && (t = ve);
                                            t = Ie(Ie({}, n.options), {
                                                url: t + n.url
                                            });
                                            return e.request(t)
                                        }]
                                }
                            })
                        })
                    },
                    v1PlayerPoliciesRccGet: function(t, r, a, o) {
                        return be(this, void 0, Promise, function() {
                            var n;
                            return Pe(this, function(e) {
                                switch (e.label) {
                                    case 0:
                                        return [4, vt(s).v1PlayerPoliciesRccGet(t, r, a, o)];
                                    case 1:
                                        return n = e.sent(), [2, function(e, t) {
                                            void 0 === e && (e = b), void 0 === t && (t = ve);
                                            t = Ie(Ie({}, n.options), {
                                                url: t + n.url
                                            });
                                            return e.request(t)
                                        }]
                                }
                            })
                        })
                    }
                }
            }

            function ft() {
                return null !== ut && ut.apply(this, arguments) || this
            }

            function mt(c) {
                var e = this;
                return {
                    v1SourceLanguageGamesGameIdGet: function(s, i) {
                        return void 0 === i && (i = {}), be(e, void 0, Promise, function() {
                            var t, n, r, a, o;
                            return Pe(this, function(e) {
                                if (null == s) throw new fe("gameId", "Required parameter gameId was null or undefined when calling v1SourceLanguageGamesGameIdGet.");
                                return a = "/v1/source-language/games/{gameId}".replace("{gameId}", encodeURIComponent(String(s))), t = T.Qc(a, !0), c && (o = c.baseOptions), n = Ie(Ie({
                                    method: "GET"
                                }, o), i), r = {}, a = {}, t.query = Ie(Ie(Ie({}, t.query), a), i.query), delete t.search, o = o && o.headers ? o.headers : {}, n.headers = Ie(Ie(Ie({}, r), o), i.headers), [2, {
                                    url: T.WU(t),
                                    options: n
                                }]
                            })
                        })
                    },
                    v1SourceLanguageGamesGameIdPatch: function(s, i, u) {
                        return void 0 === u && (u = {}), be(e, void 0, Promise, function() {
                            var t, n, r, a, o;
                            return Pe(this, function(e) {
                                if (null == s) throw new fe("gameId", "Required parameter gameId was null or undefined when calling v1SourceLanguageGamesGameIdPatch.");
                                if (null == i) throw new fe("languageCode", "Required parameter languageCode was null or undefined when calling v1SourceLanguageGamesGameIdPatch.");
                                return a = "/v1/source-language/games/{gameId}".replace("{gameId}", encodeURIComponent(String(s))), t = T.Qc(a, !0), c && (o = c.baseOptions), n = Ie(Ie({
                                    method: "PATCH"
                                }, o), u), r = {}, a = {}, void 0 !== i && (a.languageCode = i), t.query = Ie(Ie(Ie({}, t.query), a), u.query), delete t.search, o = o && o.headers ? o.headers : {}, n.headers = Ie(Ie(Ie({}, r), o), u.headers), [2, {
                                    url: T.WU(t),
                                    options: n
                                }]
                            })
                        })
                    }
                }
            }

            function gt(o) {
                return {
                    v1SourceLanguageGamesGameIdGet: function(t, r) {
                        return be(this, void 0, Promise, function() {
                            var n;
                            return Pe(this, function(e) {
                                switch (e.label) {
                                    case 0:
                                        return [4, mt(o).v1SourceLanguageGamesGameIdGet(t, r)];
                                    case 1:
                                        return n = e.sent(), [2, function(e, t) {
                                            void 0 === e && (e = b), void 0 === t && (t = ve);
                                            t = Ie(Ie({}, n.options), {
                                                url: t + n.url
                                            });
                                            return e.request(t)
                                        }]
                                }
                            })
                        })
                    },
                    v1SourceLanguageGamesGameIdPatch: function(t, r, a) {
                        return be(this, void 0, Promise, function() {
                            var n;
                            return Pe(this, function(e) {
                                switch (e.label) {
                                    case 0:
                                        return [4, mt(o).v1SourceLanguageGamesGameIdPatch(t, r, a)];
                                    case 1:
                                        return n = e.sent(), [2, function(e, t) {
                                            void 0 === e && (e = b), void 0 === t && (t = ve);
                                            t = Ie(Ie({}, n.options), {
                                                url: t + n.url
                                            });
                                            return e.request(t)
                                        }]
                                }
                            })
                        })
                    }
                }
            }
            Ge(ht, it = pe), ht.prototype.v1NameDescriptionGamesGameIdGet = function(e, t) {
                var n = this;
                return dt(this.configuration).v1NameDescriptionGamesGameIdGet(e, t).then(function(e) {
                    return e(n.axios, n.basePath)
                })
            }, ht.prototype.v1NameDescriptionGamesGameIdHistoryPost = function(e, t, n) {
                var r = this;
                return dt(this.configuration).v1NameDescriptionGamesGameIdHistoryPost(e, t, n).then(function(e) {
                    return e(r.axios, r.basePath)
                })
            }, ht.prototype.v1NameDescriptionGamesGameIdPatch = function(e, t, n) {
                var r = this;
                return dt(this.configuration).v1NameDescriptionGamesGameIdPatch(e, t, n).then(function(e) {
                    return e(r.axios, r.basePath)
                })
            }, ht.prototype.v1NameDescriptionMetadataGet = function(e) {
                var t = this;
                return dt(this.configuration).v1NameDescriptionMetadataGet(e).then(function(e) {
                    return e(t.axios, t.basePath)
                })
            }, Ge(ft, ut = pe), ft.prototype.v1PlayerPoliciesAllValuesGet = function(e) {
                var t = this;
                return pt(this.configuration).v1PlayerPoliciesAllValuesGet(e).then(function(e) {
                    return e(t.axios, t.basePath)
                })
            }, ft.prototype.v1PlayerPoliciesClientGet = function(e) {
                var t = this;
                return pt(this.configuration).v1PlayerPoliciesClientGet(e).then(function(e) {
                    return e(t.axios, t.basePath)
                })
            }, ft.prototype.v1PlayerPoliciesRccGet = function(e, t, n, r) {
                var a = this;
                return pt(this.configuration).v1PlayerPoliciesRccGet(e, t, n, r).then(function(e) {
                    return e(a.axios, a.basePath)
                })
            };
            var yt, g = (Ge(Gt, yt = pe), Gt.prototype.v1SourceLanguageGamesGameIdGet = function(e, t) {
                var n = this;
                return gt(this.configuration).v1SourceLanguageGamesGameIdGet(e, t).then(function(e) {
                    return e(n.axios, n.basePath)
                })
            }, Gt.prototype.v1SourceLanguageGamesGameIdPatch = function(e, t, n) {
                var r = this;
                return gt(this.configuration).v1SourceLanguageGamesGameIdPatch(e, t, n).then(function(e) {
                    return e(r.axios, r.basePath)
                })
            }, Gt);

            function Gt() {
                return null !== yt && yt.apply(this, arguments) || this
            }

            function It(l) {
                var e = this;
                return {
                    v1SupportedLanguagesGamesGameIdAutomaticTranslationStatusGet: function(s, i) {
                        return void 0 === i && (i = {}), be(e, void 0, Promise, function() {
                            var t, n, r, a, o;
                            return Pe(this, function(e) {
                                if (null == s) throw new fe("gameId", "Required parameter gameId was null or undefined when calling v1SupportedLanguagesGamesGameIdAutomaticTranslationStatusGet.");
                                return a = "/v1/supported-languages/games/{gameId}/automatic-translation-status".replace("{gameId}", encodeURIComponent(String(s))), t = T.Qc(a, !0), l && (o = l.baseOptions), n = Ie(Ie({
                                    method: "GET"
                                }, o), i), r = {}, a = {}, t.query = Ie(Ie(Ie({}, t.query), a), i.query), delete t.search, o = o && o.headers ? o.headers : {}, n.headers = Ie(Ie(Ie({}, r), o), i.headers), [2, {
                                    url: T.WU(t),
                                    options: n
                                }]
                            })
                        })
                    },
                    v1SupportedLanguagesGamesGameIdGet: function(s, i) {
                        return void 0 === i && (i = {}), be(e, void 0, Promise, function() {
                            var t, n, r, a, o;
                            return Pe(this, function(e) {
                                if (null == s) throw new fe("gameId", "Required parameter gameId was null or undefined when calling v1SupportedLanguagesGamesGameIdGet.");
                                return a = "/v1/supported-languages/games/{gameId}".replace("{gameId}", encodeURIComponent(String(s))), t = T.Qc(a, !0), l && (o = l.baseOptions), n = Ie(Ie({
                                    method: "GET"
                                }, o), i), r = {}, a = {}, t.query = Ie(Ie(Ie({}, t.query), a), i.query), delete t.search, o = o && o.headers ? o.headers : {}, n.headers = Ie(Ie(Ie({}, r), o), i.headers), [2, {
                                    url: T.WU(t),
                                    options: n
                                }]
                            })
                        })
                    },
                    v1SupportedLanguagesGamesGameIdLanguagesLanguageCodeAutomaticTranslationStatusPatch: function(s, i, u, c) {
                        return void 0 === c && (c = {}), be(e, void 0, Promise, function() {
                            var t, n, r, a, o;
                            return Pe(this, function(e) {
                                if (null == s) throw new fe("gameId", "Required parameter gameId was null or undefined when calling v1SupportedLanguagesGamesGameIdLanguagesLanguageCodeAutomaticTranslationStatusPatch.");
                                if (null == i) throw new fe("languageCode", "Required parameter languageCode was null or undefined when calling v1SupportedLanguagesGamesGameIdLanguagesLanguageCodeAutomaticTranslationStatusPatch.");
                                if (null == u) throw new fe("enableAutomaticTranslation", "Required parameter enableAutomaticTranslation was null or undefined when calling v1SupportedLanguagesGamesGameIdLanguagesLanguageCodeAutomaticTranslationStatusPatch.");
                                return r = "/v1/supported-languages/games/{gameId}/languages/{languageCode}/automatic-translation-status".replace("{gameId}", encodeURIComponent(String(s))).replace("{languageCode}", encodeURIComponent(String(i))), t = T.Qc(r, !0), l && (o = l.baseOptions), n = Ie(Ie({
                                    method: "PATCH"
                                }, o), c), a = {}, (r = {})["Content-Type"] = "application/json", t.query = Ie(Ie(Ie({}, t.query), a), c.query), delete t.search, o = o && o.headers ? o.headers : {}, n.headers = Ie(Ie(Ie({}, r), o), c.headers), o = "string" != typeof u || "application/json" === n.headers["Content-Type"], n.data = o ? JSON.stringify(void 0 !== u ? u : {}) : u || "", [2, {
                                    url: T.WU(t),
                                    options: n
                                }]
                            })
                        })
                    },
                    v1SupportedLanguagesGamesGameIdLanguagesLanguageCodeUniverseDisplayInfoAutomaticTranslationSettingsPatch: function(s, i, u, c) {
                        return void 0 === c && (c = {}), be(e, void 0, Promise, function() {
                            var t, n, r, a, o;
                            return Pe(this, function(e) {
                                if (null == s) throw new fe("gameId", "Required parameter gameId was null or undefined when calling v1SupportedLanguagesGamesGameIdLanguagesLanguageCodeUniverseDisplayInfoAutomaticTranslationSettingsPatch.");
                                if (null == i) throw new fe("languageCode", "Required parameter languageCode was null or undefined when calling v1SupportedLanguagesGamesGameIdLanguagesLanguageCodeUniverseDisplayInfoAutomaticTranslationSettingsPatch.");
                                if (null == u) throw new fe("enableUniverseDisplayInfoAutomaticTranslation", "Required parameter enableUniverseDisplayInfoAutomaticTranslation was null or undefined when calling v1SupportedLanguagesGamesGameIdLanguagesLanguageCodeUniverseDisplayInfoAutomaticTranslationSettingsPatch.");
                                return r = "/v1/supported-languages/games/{gameId}/languages/{languageCode}/universe-display-info-automatic-translation-settings".replace("{gameId}", encodeURIComponent(String(s))).replace("{languageCode}", encodeURIComponent(String(i))), t = T.Qc(r, !0), l && (o = l.baseOptions), n = Ie(Ie({
                                    method: "PATCH"
                                }, o), c), a = {}, (r = {})["Content-Type"] = "application/json", t.query = Ie(Ie(Ie({}, t.query), a), c.query), delete t.search, o = o && o.headers ? o.headers : {}, n.headers = Ie(Ie(Ie({}, r), o), c.headers), o = "string" != typeof u || "application/json" === n.headers["Content-Type"], n.data = o ? JSON.stringify(void 0 !== u ? u : {}) : u || "", [2, {
                                    url: T.WU(t),
                                    options: n
                                }]
                            })
                        })
                    },
                    v1SupportedLanguagesGamesGameIdPatch: function(s, i, u) {
                        return void 0 === u && (u = {}), be(e, void 0, Promise, function() {
                            var t, n, r, a, o;
                            return Pe(this, function(e) {
                                if (null == s) throw new fe("gameId", "Required parameter gameId was null or undefined when calling v1SupportedLanguagesGamesGameIdPatch.");
                                if (null == i) throw new fe("languages", "Required parameter languages was null or undefined when calling v1SupportedLanguagesGamesGameIdPatch.");
                                return r = "/v1/supported-languages/games/{gameId}".replace("{gameId}", encodeURIComponent(String(s))), t = T.Qc(r, !0), l && (o = l.baseOptions), n = Ie(Ie({
                                    method: "PATCH"
                                }, o), u), a = {}, (r = {})["Content-Type"] = "application/json", t.query = Ie(Ie(Ie({}, t.query), a), u.query), delete t.search, o = o && o.headers ? o.headers : {}, n.headers = Ie(Ie(Ie({}, r), o), u.headers), o = "string" != typeof i || "application/json" === n.headers["Content-Type"], n.data = o ? JSON.stringify(void 0 !== i ? i : {}) : i || "", [2, {
                                    url: T.WU(t),
                                    options: n
                                }]
                            })
                        })
                    },
                    v1SupportedLanguagesGamesGameIdUniverseDisplayInfoAutomaticTranslationSettingsGet: function(s, i) {
                        return void 0 === i && (i = {}), be(e, void 0, Promise, function() {
                            var t, n, r, a, o;
                            return Pe(this, function(e) {
                                if (null == s) throw new fe("gameId", "Required parameter gameId was null or undefined when calling v1SupportedLanguagesGamesGameIdUniverseDisplayInfoAutomaticTranslationSettingsGet.");
                                return a = "/v1/supported-languages/games/{gameId}/universe-display-info-automatic-translation-settings".replace("{gameId}", encodeURIComponent(String(s))), t = T.Qc(a, !0), l && (o = l.baseOptions), n = Ie(Ie({
                                    method: "GET"
                                }, o), i), r = {}, a = {}, t.query = Ie(Ie(Ie({}, t.query), a), i.query), delete t.search, o = o && o.headers ? o.headers : {}, n.headers = Ie(Ie(Ie({}, r), o), i.headers), [2, {
                                    url: T.WU(t),
                                    options: n
                                }]
                            })
                        })
                    },
                    v1SupportedLanguagesMetadataGet: function(s) {
                        return void 0 === s && (s = {}), be(e, void 0, Promise, function() {
                            var t, n, r, a, o;
                            return Pe(this, function(e) {
                                return t = T.Qc("/v1/supported-languages/metadata", !0), l && (o = l.baseOptions), n = Ie(Ie({
                                    method: "GET"
                                }, o), s), r = {}, a = {}, t.query = Ie(Ie(Ie({}, t.query), a), s.query), delete t.search, o = o && o.headers ? o.headers : {}, n.headers = Ie(Ie(Ie({}, r), o), s.headers), [2, {
                                    url: T.WU(t),
                                    options: n
                                }]
                            })
                        })
                    }
                }
            }

            function bt(s) {
                return {
                    v1SupportedLanguagesGamesGameIdAutomaticTranslationStatusGet: function(t, r) {
                        return be(this, void 0, Promise, function() {
                            var n;
                            return Pe(this, function(e) {
                                switch (e.label) {
                                    case 0:
                                        return [4, It(s).v1SupportedLanguagesGamesGameIdAutomaticTranslationStatusGet(t, r)];
                                    case 1:
                                        return n = e.sent(), [2, function(e, t) {
                                            void 0 === e && (e = b), void 0 === t && (t = ve);
                                            t = Ie(Ie({}, n.options), {
                                                url: t + n.url
                                            });
                                            return e.request(t)
                                        }]
                                }
                            })
                        })
                    },
                    v1SupportedLanguagesGamesGameIdGet: function(t, r) {
                        return be(this, void 0, Promise, function() {
                            var n;
                            return Pe(this, function(e) {
                                switch (e.label) {
                                    case 0:
                                        return [4, It(s).v1SupportedLanguagesGamesGameIdGet(t, r)];
                                    case 1:
                                        return n = e.sent(), [2, function(e, t) {
                                            void 0 === e && (e = b), void 0 === t && (t = ve);
                                            t = Ie(Ie({}, n.options), {
                                                url: t + n.url
                                            });
                                            return e.request(t)
                                        }]
                                }
                            })
                        })
                    },
                    v1SupportedLanguagesGamesGameIdLanguagesLanguageCodeAutomaticTranslationStatusPatch: function(t, r, a, o) {
                        return be(this, void 0, Promise, function() {
                            var n;
                            return Pe(this, function(e) {
                                switch (e.label) {
                                    case 0:
                                        return [4, It(s).v1SupportedLanguagesGamesGameIdLanguagesLanguageCodeAutomaticTranslationStatusPatch(t, r, a, o)];
                                    case 1:
                                        return n = e.sent(), [2, function(e, t) {
                                            void 0 === e && (e = b), void 0 === t && (t = ve);
                                            t = Ie(Ie({}, n.options), {
                                                url: t + n.url
                                            });
                                            return e.request(t)
                                        }]
                                }
                            })
                        })
                    },
                    v1SupportedLanguagesGamesGameIdLanguagesLanguageCodeUniverseDisplayInfoAutomaticTranslationSettingsPatch: function(t, r, a, o) {
                        return be(this, void 0, Promise, function() {
                            var n;
                            return Pe(this, function(e) {
                                switch (e.label) {
                                    case 0:
                                        return [4, It(s).v1SupportedLanguagesGamesGameIdLanguagesLanguageCodeUniverseDisplayInfoAutomaticTranslationSettingsPatch(t, r, a, o)];
                                    case 1:
                                        return n = e.sent(), [2, function(e, t) {
                                            void 0 === e && (e = b), void 0 === t && (t = ve);
                                            t = Ie(Ie({}, n.options), {
                                                url: t + n.url
                                            });
                                            return e.request(t)
                                        }]
                                }
                            })
                        })
                    },
                    v1SupportedLanguagesGamesGameIdPatch: function(t, r, a) {
                        return be(this, void 0, Promise, function() {
                            var n;
                            return Pe(this, function(e) {
                                switch (e.label) {
                                    case 0:
                                        return [4, It(s).v1SupportedLanguagesGamesGameIdPatch(t, r, a)];
                                    case 1:
                                        return n = e.sent(), [2, function(e, t) {
                                            void 0 === e && (e = b), void 0 === t && (t = ve);
                                            t = Ie(Ie({}, n.options), {
                                                url: t + n.url
                                            });
                                            return e.request(t)
                                        }]
                                }
                            })
                        })
                    },
                    v1SupportedLanguagesGamesGameIdUniverseDisplayInfoAutomaticTranslationSettingsGet: function(t, r) {
                        return be(this, void 0, Promise, function() {
                            var n;
                            return Pe(this, function(e) {
                                switch (e.label) {
                                    case 0:
                                        return [4, It(s).v1SupportedLanguagesGamesGameIdUniverseDisplayInfoAutomaticTranslationSettingsGet(t, r)];
                                    case 1:
                                        return n = e.sent(), [2, function(e, t) {
                                            void 0 === e && (e = b), void 0 === t && (t = ve);
                                            t = Ie(Ie({}, n.options), {
                                                url: t + n.url
                                            });
                                            return e.request(t)
                                        }]
                                }
                            })
                        })
                    },
                    v1SupportedLanguagesMetadataGet: function(t) {
                        return be(this, void 0, Promise, function() {
                            var n;
                            return Pe(this, function(e) {
                                switch (e.label) {
                                    case 0:
                                        return [4, It(s).v1SupportedLanguagesMetadataGet(t)];
                                    case 1:
                                        return n = e.sent(), [2, function(e, t) {
                                            void 0 === e && (e = b), void 0 === t && (t = ve);
                                            t = Ie(Ie({}, n.options), {
                                                url: t + n.url
                                            });
                                            return e.request(t)
                                        }]
                                }
                            })
                        })
                    }
                }
            }
            var Pt, A = (Ge(wt, Pt = pe), wt.prototype.v1SupportedLanguagesGamesGameIdAutomaticTranslationStatusGet = function(e, t) {
                var n = this;
                return bt(this.configuration).v1SupportedLanguagesGamesGameIdAutomaticTranslationStatusGet(e, t).then(function(e) {
                    return e(n.axios, n.basePath)
                })
            }, wt.prototype.v1SupportedLanguagesGamesGameIdGet = function(e, t) {
                var n = this;
                return bt(this.configuration).v1SupportedLanguagesGamesGameIdGet(e, t).then(function(e) {
                    return e(n.axios, n.basePath)
                })
            }, wt.prototype.v1SupportedLanguagesGamesGameIdLanguagesLanguageCodeAutomaticTranslationStatusPatch = function(e, t, n, r) {
                var a = this;
                return bt(this.configuration).v1SupportedLanguagesGamesGameIdLanguagesLanguageCodeAutomaticTranslationStatusPatch(e, t, n, r).then(function(e) {
                    return e(a.axios, a.basePath)
                })
            }, wt.prototype.v1SupportedLanguagesGamesGameIdLanguagesLanguageCodeUniverseDisplayInfoAutomaticTranslationSettingsPatch = function(e, t, n, r) {
                var a = this;
                return bt(this.configuration).v1SupportedLanguagesGamesGameIdLanguagesLanguageCodeUniverseDisplayInfoAutomaticTranslationSettingsPatch(e, t, n, r).then(function(e) {
                    return e(a.axios, a.basePath)
                })
            }, wt.prototype.v1SupportedLanguagesGamesGameIdPatch = function(e, t, n) {
                var r = this;
                return bt(this.configuration).v1SupportedLanguagesGamesGameIdPatch(e, t, n).then(function(e) {
                    return e(r.axios, r.basePath)
                })
            }, wt.prototype.v1SupportedLanguagesGamesGameIdUniverseDisplayInfoAutomaticTranslationSettingsGet = function(e, t) {
                var n = this;
                return bt(this.configuration).v1SupportedLanguagesGamesGameIdUniverseDisplayInfoAutomaticTranslationSettingsGet(e, t).then(function(e) {
                    return e(n.axios, n.basePath)
                })
            }, wt.prototype.v1SupportedLanguagesMetadataGet = function(e) {
                var t = this;
                return bt(this.configuration).v1SupportedLanguagesMetadataGet(e).then(function(e) {
                    return e(t.axios, t.basePath)
                })
            }, wt);

            function wt() {
                return null !== Pt && Pt.apply(this, arguments) || this
            }

            function Ct(h) {
                var e = this;
                return {
                    v1TranslationAnalyticsGamesGameIdDownloadTranslationAnalyticsReportGet: function(s, i, u, c, l, d) {
                        return void 0 === d && (d = {}), be(e, void 0, Promise, function() {
                            var t, n, r, a, o;
                            return Pe(this, function(e) {
                                if (null == s) throw new fe("gameId", "Required parameter gameId was null or undefined when calling v1TranslationAnalyticsGamesGameIdDownloadTranslationAnalyticsReportGet.");
                                if (null == i) throw new fe("startDateTime", "Required parameter startDateTime was null or undefined when calling v1TranslationAnalyticsGamesGameIdDownloadTranslationAnalyticsReportGet.");
                                if (null == u) throw new fe("endDateTime", "Required parameter endDateTime was null or undefined when calling v1TranslationAnalyticsGamesGameIdDownloadTranslationAnalyticsReportGet.");
                                if (null == c) throw new fe("reportType", "Required parameter reportType was null or undefined when calling v1TranslationAnalyticsGamesGameIdDownloadTranslationAnalyticsReportGet.");
                                if (null == l) throw new fe("reportSubjectTargetId", "Required parameter reportSubjectTargetId was null or undefined when calling v1TranslationAnalyticsGamesGameIdDownloadTranslationAnalyticsReportGet.");
                                return a = "/v1/translation-analytics/games/{gameId}/download-translation-analytics-report".replace("{gameId}", encodeURIComponent(String(s))), t = T.Qc(a, !0), h && (o = h.baseOptions), n = Ie(Ie({
                                    method: "GET"
                                }, o), d), r = {}, a = {}, void 0 !== i && (a.startDateTime = i), void 0 !== u && (a.endDateTime = u), void 0 !== c && (a.reportType = c), void 0 !== l && (a.reportSubjectTargetId = l), t.query = Ie(Ie(Ie({}, t.query), a), d.query), delete t.search, o = o && o.headers ? o.headers : {}, n.headers = Ie(Ie(Ie({}, r), o), d.headers), [2, {
                                    url: T.WU(t),
                                    options: n
                                }]
                            })
                        })
                    },
                    v1TranslationAnalyticsGamesGameIdRequestTranslationAnalyticsReportPost: function(s, i, u) {
                        return void 0 === u && (u = {}), be(e, void 0, Promise, function() {
                            var t, n, r, a, o;
                            return Pe(this, function(e) {
                                if (null == s) throw new fe("gameId", "Required parameter gameId was null or undefined when calling v1TranslationAnalyticsGamesGameIdRequestTranslationAnalyticsReportPost.");
                                if (null == i) throw new fe("request", "Required parameter request was null or undefined when calling v1TranslationAnalyticsGamesGameIdRequestTranslationAnalyticsReportPost.");
                                return r = "/v1/translation-analytics/games/{gameId}/request-translation-analytics-report".replace("{gameId}", encodeURIComponent(String(s))), t = T.Qc(r, !0), h && (o = h.baseOptions), n = Ie(Ie({
                                    method: "POST"
                                }, o), u), a = {}, (r = {})["Content-Type"] = "application/json", t.query = Ie(Ie(Ie({}, t.query), a), u.query), delete t.search, o = o && o.headers ? o.headers : {}, n.headers = Ie(Ie(Ie({}, r), o), u.headers), o = "string" != typeof i || "application/json" === n.headers["Content-Type"], n.data = o ? JSON.stringify(void 0 !== i ? i : {}) : i || "", [2, {
                                    url: T.WU(t),
                                    options: n
                                }]
                            })
                        })
                    },
                    v1TranslationAnalyticsMetadataGet: function(s) {
                        return void 0 === s && (s = {}), be(e, void 0, Promise, function() {
                            var t, n, r, a, o;
                            return Pe(this, function(e) {
                                return t = T.Qc("/v1/translation-analytics/metadata", !0), h && (o = h.baseOptions), n = Ie(Ie({
                                    method: "GET"
                                }, o), s), r = {}, a = {}, t.query = Ie(Ie(Ie({}, t.query), a), s.query), delete t.search, o = o && o.headers ? o.headers : {}, n.headers = Ie(Ie(Ie({}, r), o), s.headers), [2, {
                                    url: T.WU(t),
                                    options: n
                                }]
                            })
                        })
                    }
                }
            }

            function Tt(u) {
                return {
                    v1TranslationAnalyticsGamesGameIdDownloadTranslationAnalyticsReportGet: function(t, r, a, o, s, i) {
                        return be(this, void 0, Promise, function() {
                            var n;
                            return Pe(this, function(e) {
                                switch (e.label) {
                                    case 0:
                                        return [4, Ct(u).v1TranslationAnalyticsGamesGameIdDownloadTranslationAnalyticsReportGet(t, r, a, o, s, i)];
                                    case 1:
                                        return n = e.sent(), [2, function(e, t) {
                                            void 0 === e && (e = b), void 0 === t && (t = ve);
                                            t = Ie(Ie({}, n.options), {
                                                url: t + n.url
                                            });
                                            return e.request(t)
                                        }]
                                }
                            })
                        })
                    },
                    v1TranslationAnalyticsGamesGameIdRequestTranslationAnalyticsReportPost: function(t, r, a) {
                        return be(this, void 0, Promise, function() {
                            var n;
                            return Pe(this, function(e) {
                                switch (e.label) {
                                    case 0:
                                        return [4, Ct(u).v1TranslationAnalyticsGamesGameIdRequestTranslationAnalyticsReportPost(t, r, a)];
                                    case 1:
                                        return n = e.sent(), [2, function(e, t) {
                                            void 0 === e && (e = b), void 0 === t && (t = ve);
                                            t = Ie(Ie({}, n.options), {
                                                url: t + n.url
                                            });
                                            return e.request(t)
                                        }]
                                }
                            })
                        })
                    },
                    v1TranslationAnalyticsMetadataGet: function(t) {
                        return be(this, void 0, Promise, function() {
                            var n;
                            return Pe(this, function(e) {
                                switch (e.label) {
                                    case 0:
                                        return [4, Ct(u).v1TranslationAnalyticsMetadataGet(t)];
                                    case 1:
                                        return n = e.sent(), [2, function(e, t) {
                                            void 0 === e && (e = b), void 0 === t && (t = ve);
                                            t = Ie(Ie({}, n.options), {
                                                url: t + n.url
                                            });
                                            return e.request(t)
                                        }]
                                }
                            })
                        })
                    }
                }
            }
            var At, qt, G = (Ge(Lt, At = pe), Lt.prototype.v1TranslationAnalyticsGamesGameIdDownloadTranslationAnalyticsReportGet = function(e, t, n, r, a, o) {
                var s = this;
                return Tt(this.configuration).v1TranslationAnalyticsGamesGameIdDownloadTranslationAnalyticsReportGet(e, t, n, r, a, o).then(function(e) {
                    return e(s.axios, s.basePath)
                })
            }, Lt.prototype.v1TranslationAnalyticsGamesGameIdRequestTranslationAnalyticsReportPost = function(e, t, n) {
                var r = this;
                return Tt(this.configuration).v1TranslationAnalyticsGamesGameIdRequestTranslationAnalyticsReportPost(e, t, n).then(function(e) {
                    return e(r.axios, r.basePath)
                })
            }, Lt.prototype.v1TranslationAnalyticsMetadataGet = function(e) {
                var t = this;
                return Tt(this.configuration).v1TranslationAnalyticsMetadataGet(e).then(function(e) {
                    return e(t.axios, t.basePath)
                })
            }, Lt);

            function Lt() {
                return null !== At && At.apply(this, arguments) || this
            }

            function St(r) {
                return {
                    v1UiConfigurationsGet: function(t) {
                        return be(this, void 0, Promise, function() {
                            var n;
                            return Pe(this, function(e) {
                                switch (e.label) {
                                    case 0:
                                        return [4, function(i) {
                                            var e = this;
                                            return {
                                                v1UiConfigurationsGet: function(s) {
                                                    return void 0 === s && (s = {}), be(e, void 0, Promise, function() {
                                                        var t, n, r, a, o;
                                                        return Pe(this, function(e) {
                                                            return t = T.Qc("/v1/ui-configurations", !0), i && (o = i.baseOptions), n = Ie(Ie({
                                                                method: "GET"
                                                            }, o), s), r = {}, a = {}, t.query = Ie(Ie(Ie({}, t.query), a), s.query), delete t.search, o = o && o.headers ? o.headers : {}, n.headers = Ie(Ie(Ie({}, r), o), s.headers), [2, {
                                                                url: T.WU(t),
                                                                options: n
                                                            }]
                                                        })
                                                    })
                                                }
                                            }
                                        }(r).v1UiConfigurationsGet(t)];
                                    case 1:
                                        return n = e.sent(), [2, function(e, t) {
                                            void 0 === e && (e = b), void 0 === t && (t = ve);
                                            t = Ie(Ie({}, n.options), {
                                                url: t + n.url
                                            });
                                            return e.request(t)
                                        }]
                                }
                            })
                        })
                    }
                }
            }

            function Ut() {
                return null !== qt && qt.apply(this, arguments) || this
            }
            Ge(Ut, qt = pe), Ut.prototype.v1UiConfigurationsGet = function(e) {
                var t = this;
                return St(this.configuration).v1UiConfigurationsGet(e).then(function(e) {
                    return e(t.axios, t.basePath)
                })
            };
            var Rt, Ot, D = (Rt = function(e, t) {
                    return (Rt = Object.setPrototypeOf || {
                            __proto__: []
                        }
                        instanceof Array && function(e, t) {
                            e.__proto__ = t
                        } || function(e, t) {
                            for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n])
                        })(e, t)
                }, function(e, t) {
                    if ("function" != typeof t && null !== t) throw new TypeError("Class extends value " + String(t) + " is not a constructor or null");

                    function n() {
                        this.constructor = e
                    }
                    Rt(e, t), e.prototype = null === t ? Object.create(t) : (n.prototype = t.prototype, new n)
                }),
                Dt = i.EnvironmentUrls.localizationTablesApi.replace(/\/+$/, ""),
                k = function(e, t, n) {
                    void 0 === t && (t = Dt), void 0 === n && (n = b), this.basePath = t, this.axios = n, e && (this.configuration = e, this.basePath = e.basePath || this.basePath)
                },
                xt = (Ot = Error, D(Et, Ot), Et);

            function Et(e, t) {
                t = Ot.call(this, t) || this;
                return t.field = e, t.name = "RequiredError", t
            }

            function Bt(e, t, n) {
                if (null == n) throw new xt(t, "Required parameter " + t + " was null or undefined when calling " + e + ".")
            }

            function Ft(e) {
                for (var t = [], n = 1; n < arguments.length; n++) t[n - 1] = arguments[n];
                for (var r = new URLSearchParams(e.search), a = 0, o = t; a < o.length; a++) {
                    var s, i = o[a];
                    for (s in i) r.set(s, i[s])
                }
                e.search = r.toString()
            }

            function zt(e, t, n) {
                var r = "string" != typeof e;
                return (r && n && n.isJsonMime ? n.isJsonMime(t.headers["Content-Type"]) : r) ? JSON.stringify(void 0 !== e ? e : {}) : e || ""
            }

            function jt(e) {
                return e.pathname + e.search + e.hash
            }

            function Nt(n, r, a, o) {
                return function(e, t) {
                    void 0 === e && (e = r), void 0 === t && (t = a);
                    t = _t(_t({}, n.options), {
                        url: ((null == o ? void 0 : o.basePath) || t) + n.url
                    });
                    return e.request(t)
                }
            }
            var kt, _t = function() {
                    return (_t = Object.assign || function(e) {
                        for (var t, n = 1, r = arguments.length; n < r; n++)
                            for (var a in t = arguments[n]) Object.prototype.hasOwnProperty.call(t, a) && (e[a] = t[a]);
                        return e
                    }).apply(this, arguments)
                },
                Wt = "https://example.com",
                te = (kt = function(e, t) {
                    return (kt = Object.setPrototypeOf || {
                            __proto__: []
                        }
                        instanceof Array && function(e, t) {
                            e.__proto__ = t
                        } || function(e, t) {
                            for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n])
                        })(e, t)
                }, function(e, t) {
                    if ("function" != typeof t && null !== t) throw new TypeError("Class extends value " + String(t) + " is not a constructor or null");

                    function n() {
                        this.constructor = e
                    }
                    kt(e, t), e.prototype = null === t ? Object.create(t) : (n.prototype = t.prototype, new n)
                }),
                Mt = function() {
                    return (Mt = Object.assign || function(e) {
                        for (var t, n = 1, r = arguments.length; n < r; n++)
                            for (var a in t = arguments[n]) Object.prototype.hasOwnProperty.call(t, a) && (e[a] = t[a]);
                        return e
                    }).apply(this, arguments)
                },
                Qt = function(e, s, i, u) {
                    return new(i = i || Promise)(function(n, t) {
                        function r(e) {
                            try {
                                o(u.next(e))
                            } catch (e) {
                                t(e)
                            }
                        }

                        function a(e) {
                            try {
                                o(u.throw(e))
                            } catch (e) {
                                t(e)
                            }
                        }

                        function o(e) {
                            var t;
                            e.done ? n(e.value) : ((t = e.value) instanceof i ? t : new i(function(e) {
                                e(t)
                            })).then(r, a)
                        }
                        o((u = u.apply(e, s || [])).next())
                    })
                },
                Ht = function(n, r) {
                    var a, o, s, i = {
                            label: 0,
                            sent: function() {
                                if (1 & s[0]) throw s[1];
                                return s[1]
                            },
                            trys: [],
                            ops: []
                        },
                        e = {
                            next: t(0),
                            throw: t(1),
                            return: t(2)
                        };
                    return "function" == typeof Symbol && (e[Symbol.iterator] = function() {
                        return this
                    }), e;

                    function t(t) {
                        return function(e) {
                            return function(t) {
                                if (a) throw new TypeError("Generator is already executing.");
                                for (; i;) try {
                                    if (a = 1, o && (s = 2 & t[0] ? o.return : t[0] ? o.throw || ((s = o.return) && s.call(o), 0) : o.next) && !(s = s.call(o, t[1])).done) return s;
                                    switch (o = 0, s && (t = [2 & t[0], s.value]), t[0]) {
                                        case 0:
                                        case 1:
                                            s = t;
                                            break;
                                        case 4:
                                            return i.label++, {
                                                value: t[1],
                                                done: !1
                                            };
                                        case 5:
                                            i.label++, o = t[1], t = [0];
                                            continue;
                                        case 7:
                                            t = i.ops.pop(), i.trys.pop();
                                            continue;
                                        default:
                                            if (!(s = 0 < (s = i.trys).length && s[s.length - 1]) && (6 === t[0] || 2 === t[0])) {
                                                i = 0;
                                                continue
                                            }
                                            if (3 === t[0] && (!s || t[1] > s[0] && t[1] < s[3])) {
                                                i.label = t[1];
                                                break
                                            }
                                            if (6 === t[0] && i.label < s[1]) {
                                                i.label = s[1], s = t;
                                                break
                                            }
                                            if (s && i.label < s[2]) {
                                                i.label = s[2], i.ops.push(t);
                                                break
                                            }
                                            s[2] && i.ops.pop(), i.trys.pop();
                                            continue
                                    }
                                    t = r.call(n, i)
                                } catch (e) {
                                    t = [6, e], o = 0
                                } finally {
                                    a = s = 0
                                }
                                if (5 & t[0]) throw t[1];
                                return {
                                    value: t[0] ? t[1] : void 0,
                                    done: !0
                                }
                            }([t, e])
                        }
                    }
                };

            function Vt(s) {
                var i = function(l) {
                    var e = this;
                    return {
                        v1AutoLocalizationTableGamesGameIdAssetsGenerationRequestPost: function(o, s) {
                            return void 0 === s && (s = {}), Qt(e, void 0, Promise, function() {
                                var t, n, r, a;
                                return Ht(this, function(e) {
                                    return Bt("v1AutoLocalizationTableGamesGameIdAssetsGenerationRequestPost", "gameId", o), r = "/v1/auto-localization-table/games/{gameId}/assets-generation-request".replace("{gameId}", encodeURIComponent(String(o))), t = new URL(r, Wt), l && (a = l.baseOptions), n = Mt(Mt({
                                        method: "POST"
                                    }, a), s), r = {}, Ft(t, {}, s.query), a = a && a.headers ? a.headers : {}, n.headers = Mt(Mt(Mt({}, r), a), s.headers), [2, {
                                        url: jt(t),
                                        options: n
                                    }]
                                })
                            })
                        },
                        v1AutoLocalizationTableGamesGameIdAutoScrapeCleanupRequestPost: function(s, i, u) {
                            return void 0 === u && (u = {}), Qt(e, void 0, Promise, function() {
                                var t, n, r, a, o;
                                return Ht(this, function(e) {
                                    return Bt("v1AutoLocalizationTableGamesGameIdAutoScrapeCleanupRequestPost", "gameId", s), Bt("v1AutoLocalizationTableGamesGameIdAutoScrapeCleanupRequestPost", "request", i), r = "/v1/auto-localization-table/games/{gameId}/auto-scrape-cleanup-request".replace("{gameId}", encodeURIComponent(String(s))), t = new URL(r, Wt), l && (o = l.baseOptions), n = Mt(Mt({
                                        method: "POST"
                                    }, o), u), a = {}, (r = {})["Content-Type"] = "application/json", Ft(t, a, u.query), o = o && o.headers ? o.headers : {}, n.headers = Mt(Mt(Mt({}, r), o), u.headers), n.data = zt(i, n, l), [2, {
                                        url: jt(t),
                                        options: n
                                    }]
                                })
                            })
                        },
                        v1AutoLocalizationTableGamesGameIdPatch: function(s, i, u, c) {
                            return void 0 === c && (c = {}), Qt(e, void 0, Promise, function() {
                                var t, n, r, a, o;
                                return Ht(this, function(e) {
                                    return Bt("v1AutoLocalizationTableGamesGameIdPatch", "gameId", s), Bt("v1AutoLocalizationTableGamesGameIdPatch", "request", i), a = "/v1/auto-localization-table/games/{gameId}".replace("{gameId}", encodeURIComponent(String(s))), t = new URL(a, Wt), l && (o = l.baseOptions), n = Mt(Mt({
                                        method: "PATCH"
                                    }, o), c), r = {}, a = {}, null != u && (r["Roblox-Game-Id"] = String(u)), r["Content-Type"] = "application/json", Ft(t, a, c.query), o = o && o.headers ? o.headers : {}, n.headers = Mt(Mt(Mt({}, r), o), c.headers), n.data = zt(i, n, l), [2, {
                                        url: jt(t),
                                        options: n
                                    }]
                                })
                            })
                        }
                    }
                }(s);
                return {
                    v1AutoLocalizationTableGamesGameIdAssetsGenerationRequestPost: function(n, r) {
                        return Qt(this, void 0, Promise, function() {
                            var t;
                            return Ht(this, function(e) {
                                switch (e.label) {
                                    case 0:
                                        return [4, i.v1AutoLocalizationTableGamesGameIdAssetsGenerationRequestPost(n, r)];
                                    case 1:
                                        return t = e.sent(), [2, Nt(t, d(), Dt, s)]
                                }
                            })
                        })
                    },
                    v1AutoLocalizationTableGamesGameIdAutoScrapeCleanupRequestPost: function(n, r, a) {
                        return Qt(this, void 0, Promise, function() {
                            var t;
                            return Ht(this, function(e) {
                                switch (e.label) {
                                    case 0:
                                        return [4, i.v1AutoLocalizationTableGamesGameIdAutoScrapeCleanupRequestPost(n, r, a)];
                                    case 1:
                                        return t = e.sent(), [2, Nt(t, d(), Dt, s)]
                                }
                            })
                        })
                    },
                    v1AutoLocalizationTableGamesGameIdPatch: function(n, r, a, o) {
                        return Qt(this, void 0, Promise, function() {
                            var t;
                            return Ht(this, function(e) {
                                switch (e.label) {
                                    case 0:
                                        return [4, i.v1AutoLocalizationTableGamesGameIdPatch(n, r, a, o)];
                                    case 1:
                                        return t = e.sent(), [2, Nt(t, d(), Dt, s)]
                                }
                            })
                        })
                    }
                }
            }(he = {}).User = "User", he.Group = "Group", (yr = {}).Asc = "Asc", yr.Desc = "Desc", (fn = {}).User = "User", fn.Group = "Group", (Pn = {}).User = "User", Pn.Automation = "Automation";
            var Jt, Kt, e = (te($t, Jt = k), $t.prototype.v1AutoLocalizationTableGamesGameIdAssetsGenerationRequestPost = function(e, t) {
                var n = this;
                return Vt(this.configuration).v1AutoLocalizationTableGamesGameIdAssetsGenerationRequestPost(e, t).then(function(e) {
                    return e(n.axios, n.basePath)
                })
            }, $t.prototype.v1AutoLocalizationTableGamesGameIdAutoScrapeCleanupRequestPost = function(e, t, n) {
                var r = this;
                return Vt(this.configuration).v1AutoLocalizationTableGamesGameIdAutoScrapeCleanupRequestPost(e, t, n).then(function(e) {
                    return e(r.axios, r.basePath)
                })
            }, $t.prototype.v1AutoLocalizationTableGamesGameIdPatch = function(e, t, n, r) {
                var a = this;
                return Vt(this.configuration).v1AutoLocalizationTableGamesGameIdPatch(e, t, n, r).then(function(e) {
                    return e(a.axios, a.basePath)
                })
            }, $t);

            function $t() {
                return null !== Jt && Jt.apply(this, arguments) || this
            }

            function Xt(s) {
                var i = function(l) {
                    var e = this;
                    return {
                        v1LocalizationTableAvailableLanguagesGet: function(o) {
                            return void 0 === o && (o = {}), Qt(e, void 0, Promise, function() {
                                var t, n, r, a;
                                return Ht(this, function(e) {
                                    return t = new URL("/v1/localization-table/available-languages", Wt), l && (a = l.baseOptions), n = Mt(Mt({
                                        method: "GET"
                                    }, a), o), r = {}, Ft(t, {}, o.query), a = a && a.headers ? a.headers : {}, n.headers = Mt(Mt(Mt({}, r), a), o.headers), [2, {
                                        url: jt(t),
                                        options: n
                                    }]
                                })
                            })
                        },
                        v1LocalizationTableLimitsGet: function(o) {
                            return void 0 === o && (o = {}), Qt(e, void 0, Promise, function() {
                                var t, n, r, a;
                                return Ht(this, function(e) {
                                    return t = new URL("/v1/localization-table/limits", Wt), l && (a = l.baseOptions), n = Mt(Mt({
                                        method: "GET"
                                    }, a), o), r = {}, Ft(t, {}, o.query), a = a && a.headers ? a.headers : {}, n.headers = Mt(Mt(Mt({}, r), a), o.headers), [2, {
                                        url: jt(t),
                                        options: n
                                    }]
                                })
                            })
                        },
                        v1LocalizationTableMetadataGet: function(o) {
                            return void 0 === o && (o = {}), Qt(e, void 0, Promise, function() {
                                var t, n, r, a;
                                return Ht(this, function(e) {
                                    return t = new URL("/v1/localization-table/metadata", Wt), l && (a = l.baseOptions), n = Mt(Mt({
                                        method: "GET"
                                    }, a), o), r = {}, Ft(t, {}, o.query), a = a && a.headers ? a.headers : {}, n.headers = Mt(Mt(Mt({}, r), a), o.headers), [2, {
                                        url: jt(t),
                                        options: n
                                    }]
                                })
                            })
                        },
                        v1LocalizationTableTablesAssetIdGet: function(o, s) {
                            return void 0 === s && (s = {}), Qt(e, void 0, Promise, function() {
                                var t, n, r, a;
                                return Ht(this, function(e) {
                                    return Bt("v1LocalizationTableTablesAssetIdGet", "assetId", o), r = "/v1/localization-table/tables/{assetId}".replace("{assetId}", encodeURIComponent(String(o))), t = new URL(r, Wt), l && (a = l.baseOptions), n = Mt(Mt({
                                        method: "GET"
                                    }, a), s), r = {}, Ft(t, {}, s.query), a = a && a.headers ? a.headers : {}, n.headers = Mt(Mt(Mt({}, r), a), s.headers), [2, {
                                        url: jt(t),
                                        options: n
                                    }]
                                })
                            })
                        },
                        v1LocalizationTableTablesPost: function(s, i) {
                            return void 0 === i && (i = {}), Qt(e, void 0, Promise, function() {
                                var t, n, r, a, o;
                                return Ht(this, function(e) {
                                    return Bt("v1LocalizationTableTablesPost", "request", s), t = new URL("/v1/localization-table/tables", Wt), l && (o = l.baseOptions), n = Mt(Mt({
                                        method: "POST"
                                    }, o), i), a = {}, (r = {})["Content-Type"] = "application/json", Ft(t, a, i.query), o = o && o.headers ? o.headers : {}, n.headers = Mt(Mt(Mt({}, r), o), i.headers), n.data = zt(s, n, l), [2, {
                                        url: jt(t),
                                        options: n
                                    }]
                                })
                            })
                        },
                        v1LocalizationTableTablesTableIdEntriesGet: function(s, i, u, c) {
                            return void 0 === c && (c = {}), Qt(e, void 0, Promise, function() {
                                var t, n, r, a, o;
                                return Ht(this, function(e) {
                                    return Bt("v1LocalizationTableTablesTableIdEntriesGet", "tableId", s), a = "/v1/localization-table/tables/{tableId}/entries".replace("{tableId}", encodeURIComponent(String(s))), t = new URL(a, Wt), l && (o = l.baseOptions), n = Mt(Mt({
                                        method: "GET"
                                    }, o), c), r = {}, a = {}, void 0 !== i && (a.cursor = i), void 0 !== u && (a.gameId = u), Ft(t, a, c.query), o = o && o.headers ? o.headers : {}, n.headers = Mt(Mt(Mt({}, r), o), c.headers), [2, {
                                        url: jt(t),
                                        options: n
                                    }]
                                })
                            })
                        },
                        v1LocalizationTableTablesTableIdEntriesTranslationHistoryPost: function(s, i, u, c) {
                            return void 0 === c && (c = {}), Qt(e, void 0, Promise, function() {
                                var t, n, r, a, o;
                                return Ht(this, function(e) {
                                    return Bt("v1LocalizationTableTablesTableIdEntriesTranslationHistoryPost", "tableId", s), Bt("v1LocalizationTableTablesTableIdEntriesTranslationHistoryPost", "request", i), a = "/v1/localization-table/tables/{tableId}/entries/translation-history".replace("{tableId}", encodeURIComponent(String(s))), t = new URL(a, Wt), l && (o = l.baseOptions), n = Mt(Mt({
                                        method: "POST"
                                    }, o), c), r = {}, a = {}, void 0 !== u && (a.gameId = u), r["Content-Type"] = "application/json", Ft(t, a, c.query), o = o && o.headers ? o.headers : {}, n.headers = Mt(Mt(Mt({}, r), o), c.headers), n.data = zt(i, n, l), [2, {
                                        url: jt(t),
                                        options: n
                                    }]
                                })
                            })
                        },
                        v1LocalizationTableTablesTableIdEntryCountGet: function(s, i, u) {
                            return void 0 === u && (u = {}), Qt(e, void 0, Promise, function() {
                                var t, n, r, a, o;
                                return Ht(this, function(e) {
                                    return Bt("v1LocalizationTableTablesTableIdEntryCountGet", "tableId", s), a = "/v1/localization-table/tables/{tableId}/entry-count".replace("{tableId}", encodeURIComponent(String(s))), t = new URL(a, Wt), l && (o = l.baseOptions), n = Mt(Mt({
                                        method: "GET"
                                    }, o), u), r = {}, a = {}, void 0 !== i && (a.gameId = i), Ft(t, a, u.query), o = o && o.headers ? o.headers : {}, n.headers = Mt(Mt(Mt({}, r), o), u.headers), [2, {
                                        url: jt(t),
                                        options: n
                                    }]
                                })
                            })
                        },
                        v1LocalizationTableTablesTableIdGet: function(o, s) {
                            return void 0 === s && (s = {}), Qt(e, void 0, Promise, function() {
                                var t, n, r, a;
                                return Ht(this, function(e) {
                                    return Bt("v1LocalizationTableTablesTableIdGet", "tableId", o), r = "/v1/localization-table/tables/{tableId}".replace("{tableId}", encodeURIComponent(String(o))), t = new URL(r, Wt), l && (a = l.baseOptions), n = Mt(Mt({
                                        method: "GET"
                                    }, a), s), r = {}, Ft(t, {}, s.query), a = a && a.headers ? a.headers : {}, n.headers = Mt(Mt(Mt({}, r), a), s.headers), [2, {
                                        url: jt(t),
                                        options: n
                                    }]
                                })
                            })
                        },
                        v1LocalizationTableTablesTableIdLanguageTranslationCountsGet: function(s, i, u, c) {
                            return void 0 === c && (c = {}), Qt(e, void 0, Promise, function() {
                                var t, n, r, a, o;
                                return Ht(this, function(e) {
                                    return Bt("v1LocalizationTableTablesTableIdLanguageTranslationCountsGet", "tableId", s), Bt("v1LocalizationTableTablesTableIdLanguageTranslationCountsGet", "locales", i), a = "/v1/localization-table/tables/{tableId}/language-translation-counts".replace("{tableId}", encodeURIComponent(String(s))), t = new URL(a, Wt), l && (o = l.baseOptions), n = Mt(Mt({
                                        method: "GET"
                                    }, o), c), r = {}, a = {}, i && (a.locales = i), void 0 !== u && (a.gameId = u), Ft(t, a, c.query), o = o && o.headers ? o.headers : {}, n.headers = Mt(Mt(Mt({}, r), o), c.headers), [2, {
                                        url: jt(t),
                                        options: n
                                    }]
                                })
                            })
                        },
                        v1LocalizationTableTablesTableIdPatch: function(s, i, u, c) {
                            return void 0 === c && (c = {}), Qt(e, void 0, Promise, function() {
                                var t, n, r, a, o;
                                return Ht(this, function(e) {
                                    return Bt("v1LocalizationTableTablesTableIdPatch", "tableId", s), Bt("v1LocalizationTableTablesTableIdPatch", "request", i), a = "/v1/localization-table/tables/{tableId}".replace("{tableId}", encodeURIComponent(String(s))), t = new URL(a, Wt), l && (o = l.baseOptions), n = Mt(Mt({
                                        method: "PATCH"
                                    }, o), c), r = {}, a = {}, void 0 !== u && (a.gameId = u), r["Content-Type"] = "application/json", Ft(t, a, c.query), o = o && o.headers ? o.headers : {}, n.headers = Mt(Mt(Mt({}, r), o), c.headers), n.data = zt(i, n, l), [2, {
                                        url: jt(t),
                                        options: n
                                    }]
                                })
                            })
                        }
                    }
                }(s);
                return {
                    v1LocalizationTableAvailableLanguagesGet: function(n) {
                        return Qt(this, void 0, Promise, function() {
                            var t;
                            return Ht(this, function(e) {
                                switch (e.label) {
                                    case 0:
                                        return [4, i.v1LocalizationTableAvailableLanguagesGet(n)];
                                    case 1:
                                        return t = e.sent(), [2, Nt(t, d(), Dt, s)]
                                }
                            })
                        })
                    },
                    v1LocalizationTableLimitsGet: function(n) {
                        return Qt(this, void 0, Promise, function() {
                            var t;
                            return Ht(this, function(e) {
                                switch (e.label) {
                                    case 0:
                                        return [4, i.v1LocalizationTableLimitsGet(n)];
                                    case 1:
                                        return t = e.sent(), [2, Nt(t, d(), Dt, s)]
                                }
                            })
                        })
                    },
                    v1LocalizationTableMetadataGet: function(n) {
                        return Qt(this, void 0, Promise, function() {
                            var t;
                            return Ht(this, function(e) {
                                switch (e.label) {
                                    case 0:
                                        return [4, i.v1LocalizationTableMetadataGet(n)];
                                    case 1:
                                        return t = e.sent(), [2, Nt(t, d(), Dt, s)]
                                }
                            })
                        })
                    },
                    v1LocalizationTableTablesAssetIdGet: function(n, r) {
                        return Qt(this, void 0, Promise, function() {
                            var t;
                            return Ht(this, function(e) {
                                switch (e.label) {
                                    case 0:
                                        return [4, i.v1LocalizationTableTablesAssetIdGet(n, r)];
                                    case 1:
                                        return t = e.sent(), [2, Nt(t, d(), Dt, s)]
                                }
                            })
                        })
                    },
                    v1LocalizationTableTablesPost: function(n, r) {
                        return Qt(this, void 0, Promise, function() {
                            var t;
                            return Ht(this, function(e) {
                                switch (e.label) {
                                    case 0:
                                        return [4, i.v1LocalizationTableTablesPost(n, r)];
                                    case 1:
                                        return t = e.sent(), [2, Nt(t, d(), Dt, s)]
                                }
                            })
                        })
                    },
                    v1LocalizationTableTablesTableIdEntriesGet: function(n, r, a, o) {
                        return Qt(this, void 0, Promise, function() {
                            var t;
                            return Ht(this, function(e) {
                                switch (e.label) {
                                    case 0:
                                        return [4, i.v1LocalizationTableTablesTableIdEntriesGet(n, r, a, o)];
                                    case 1:
                                        return t = e.sent(), [2, Nt(t, d(), Dt, s)]
                                }
                            })
                        })
                    },
                    v1LocalizationTableTablesTableIdEntriesTranslationHistoryPost: function(n, r, a, o) {
                        return Qt(this, void 0, Promise, function() {
                            var t;
                            return Ht(this, function(e) {
                                switch (e.label) {
                                    case 0:
                                        return [4, i.v1LocalizationTableTablesTableIdEntriesTranslationHistoryPost(n, r, a, o)];
                                    case 1:
                                        return t = e.sent(), [2, Nt(t, d(), Dt, s)]
                                }
                            })
                        })
                    },
                    v1LocalizationTableTablesTableIdEntryCountGet: function(n, r, a) {
                        return Qt(this, void 0, Promise, function() {
                            var t;
                            return Ht(this, function(e) {
                                switch (e.label) {
                                    case 0:
                                        return [4, i.v1LocalizationTableTablesTableIdEntryCountGet(n, r, a)];
                                    case 1:
                                        return t = e.sent(), [2, Nt(t, d(), Dt, s)]
                                }
                            })
                        })
                    },
                    v1LocalizationTableTablesTableIdGet: function(n, r) {
                        return Qt(this, void 0, Promise, function() {
                            var t;
                            return Ht(this, function(e) {
                                switch (e.label) {
                                    case 0:
                                        return [4, i.v1LocalizationTableTablesTableIdGet(n, r)];
                                    case 1:
                                        return t = e.sent(), [2, Nt(t, d(), Dt, s)]
                                }
                            })
                        })
                    },
                    v1LocalizationTableTablesTableIdLanguageTranslationCountsGet: function(n, r, a, o) {
                        return Qt(this, void 0, Promise, function() {
                            var t;
                            return Ht(this, function(e) {
                                switch (e.label) {
                                    case 0:
                                        return [4, i.v1LocalizationTableTablesTableIdLanguageTranslationCountsGet(n, r, a, o)];
                                    case 1:
                                        return t = e.sent(), [2, Nt(t, d(), Dt, s)]
                                }
                            })
                        })
                    },
                    v1LocalizationTableTablesTableIdPatch: function(n, r, a, o) {
                        return Qt(this, void 0, Promise, function() {
                            var t;
                            return Ht(this, function(e) {
                                switch (e.label) {
                                    case 0:
                                        return [4, i.v1LocalizationTableTablesTableIdPatch(n, r, a, o)];
                                    case 1:
                                        return t = e.sent(), [2, Nt(t, d(), Dt, s)]
                                }
                            })
                        })
                    }
                }
            }

            function Yt() {
                return null !== Kt && Kt.apply(this, arguments) || this
            }
            te(Yt, Kt = k), Yt.prototype.v1LocalizationTableAvailableLanguagesGet = function(e) {
                var t = this;
                return Xt(this.configuration).v1LocalizationTableAvailableLanguagesGet(e).then(function(e) {
                    return e(t.axios, t.basePath)
                })
            }, Yt.prototype.v1LocalizationTableLimitsGet = function(e) {
                var t = this;
                return Xt(this.configuration).v1LocalizationTableLimitsGet(e).then(function(e) {
                    return e(t.axios, t.basePath)
                })
            }, Yt.prototype.v1LocalizationTableMetadataGet = function(e) {
                var t = this;
                return Xt(this.configuration).v1LocalizationTableMetadataGet(e).then(function(e) {
                    return e(t.axios, t.basePath)
                })
            }, Yt.prototype.v1LocalizationTableTablesAssetIdGet = function(e, t) {
                var n = this;
                return Xt(this.configuration).v1LocalizationTableTablesAssetIdGet(e, t).then(function(e) {
                    return e(n.axios, n.basePath)
                })
            }, Yt.prototype.v1LocalizationTableTablesPost = function(e, t) {
                var n = this;
                return Xt(this.configuration).v1LocalizationTableTablesPost(e, t).then(function(e) {
                    return e(n.axios, n.basePath)
                })
            }, Yt.prototype.v1LocalizationTableTablesTableIdEntriesGet = function(e, t, n, r) {
                var a = this;
                return Xt(this.configuration).v1LocalizationTableTablesTableIdEntriesGet(e, t, n, r).then(function(e) {
                    return e(a.axios, a.basePath)
                })
            }, Yt.prototype.v1LocalizationTableTablesTableIdEntriesTranslationHistoryPost = function(e, t, n, r) {
                var a = this;
                return Xt(this.configuration).v1LocalizationTableTablesTableIdEntriesTranslationHistoryPost(e, t, n, r).then(function(e) {
                    return e(a.axios, a.basePath)
                })
            }, Yt.prototype.v1LocalizationTableTablesTableIdEntryCountGet = function(e, t, n) {
                var r = this;
                return Xt(this.configuration).v1LocalizationTableTablesTableIdEntryCountGet(e, t, n).then(function(e) {
                    return e(r.axios, r.basePath)
                })
            }, Yt.prototype.v1LocalizationTableTablesTableIdGet = function(e, t) {
                var n = this;
                return Xt(this.configuration).v1LocalizationTableTablesTableIdGet(e, t).then(function(e) {
                    return e(n.axios, n.basePath)
                })
            }, Yt.prototype.v1LocalizationTableTablesTableIdLanguageTranslationCountsGet = function(e, t, n, r) {
                var a = this;
                return Xt(this.configuration).v1LocalizationTableTablesTableIdLanguageTranslationCountsGet(e, t, n, r).then(function(e) {
                    return e(a.axios, a.basePath)
                })
            }, Yt.prototype.v1LocalizationTableTablesTableIdPatch = function(e, t, n, r) {
                var a = this;
                return Xt(this.configuration).v1LocalizationTableTablesTableIdPatch(e, t, n, r).then(function(e) {
                    return e(a.axios, a.basePath)
                })
            };
            var Zt, en, tn = new Ae,
                nn = new e,
                rn = {
                    getAutolocalizationConfiguration: function(e) {
                        return tn.v1AutolocalizationGamesGameIdAutolocalizationtablePost(e, {
                            withCredentials: !0
                        })
                    },
                    setAutolocalizationConfiguration: function(e, t) {
                        t = {
                            isAutolocalizationEnabled: t
                        };
                        return tn.v1AutolocalizationGamesGameIdSettingsPatch(e, t, {
                            withCredentials: !0
                        })
                    },
                    setUseAutoLocalizationTable: function(e, t) {
                        t = {
                            shouldUseLocalizationTable: t
                        };
                        return tn.v1AutolocalizationGamesGameIdSettingsPatch(e, t, {
                            withCredentials: !0
                        })
                    },
                    flushAutoLocalizationTable: function(e, t) {
                        t = {
                            maxAgeForFlush: t
                        };
                        return nn.v1AutoLocalizationTableGamesGameIdAutoScrapeCleanupRequestPost(e, t, {
                            withCredentials: !0
                        })
                    },
                    getMetadata: function() {
                        return tn.v1AutolocalizationMetadataGet({
                            withCredentials: !0
                        })
                    }
                },
                an = new xe,
                Ge = {
                    getGameFeatureStatus: function(e) {
                        return an.v1AutomaticTranslationGamesGameIdFeatureStatusGet(e, {
                            withCredentials: !0
                        })
                    },
                    getTargetLanguages: function(e, t) {
                        return an.v1AutomaticTranslationLanguagesLanguageCodeTargetLanguagesGet(e, t, {
                            withCredentials: !0
                        })
                    },
                    getGameAutoLocalizationQuota: function(e) {
                        return an.v1AutomaticTranslationGamesGameIdQuotaGet(e, {
                            withCredentials: !0
                        })
                    }
                },
                pe = (Zt = function(e, t) {
                    return (Zt = Object.setPrototypeOf || {
                            __proto__: []
                        }
                        instanceof Array && function(e, t) {
                            e.__proto__ = t
                        } || function(e, t) {
                            for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n])
                        })(e, t)
                }, function(e, t) {
                    if ("function" != typeof t && null !== t) throw new TypeError("Class extends value " + String(t) + " is not a constructor or null");

                    function n() {
                        this.constructor = e
                    }
                    Zt(e, t), e.prototype = null === t ? Object.create(t) : (n.prototype = t.prototype, new n)
                }),
                on = i.EnvironmentUrls.gameInternationalizationApi.replace(/\/+$/, ""),
                D = function(e, t, n) {
                    void 0 === t && (t = on), void 0 === n && (n = b), this.basePath = t, this.axios = n, e && (this.configuration = e, this.basePath = e.basePath || this.basePath)
                },
                sn = (en = Error, pe(un, en), un);

            function un(e, t) {
                t = en.call(this, t) || this;
                return t.field = e, t.name = "RequiredError", t
            }
            var cn, he = (cn = function(e, t) {
                    return (cn = Object.setPrototypeOf || {
                            __proto__: []
                        }
                        instanceof Array && function(e, t) {
                            e.__proto__ = t
                        } || function(e, t) {
                            for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n])
                        })(e, t)
                }, function(e, t) {
                    if ("function" != typeof t && null !== t) throw new TypeError("Class extends value " + String(t) + " is not a constructor or null");

                    function n() {
                        this.constructor = e
                    }
                    cn(e, t), e.prototype = null === t ? Object.create(t) : (n.prototype = t.prototype, new n)
                }),
                ln = function() {
                    return (ln = Object.assign || function(e) {
                        for (var t, n = 1, r = arguments.length; n < r; n++)
                            for (var a in t = arguments[n]) Object.prototype.hasOwnProperty.call(t, a) && (e[a] = t[a]);
                        return e
                    }).apply(this, arguments)
                },
                dn = function(e, s, i, u) {
                    return new(i = i || Promise)(function(n, t) {
                        function r(e) {
                            try {
                                o(u.next(e))
                            } catch (e) {
                                t(e)
                            }
                        }

                        function a(e) {
                            try {
                                o(u.throw(e))
                            } catch (e) {
                                t(e)
                            }
                        }

                        function o(e) {
                            var t;
                            e.done ? n(e.value) : ((t = e.value) instanceof i ? t : new i(function(e) {
                                e(t)
                            })).then(r, a)
                        }
                        o((u = u.apply(e, s || [])).next())
                    })
                },
                hn = function(n, r) {
                    var a, o, s, i = {
                            label: 0,
                            sent: function() {
                                if (1 & s[0]) throw s[1];
                                return s[1]
                            },
                            trys: [],
                            ops: []
                        },
                        e = {
                            next: t(0),
                            throw: t(1),
                            return: t(2)
                        };
                    return "function" == typeof Symbol && (e[Symbol.iterator] = function() {
                        return this
                    }), e;

                    function t(t) {
                        return function(e) {
                            return function(t) {
                                if (a) throw new TypeError("Generator is already executing.");
                                for (; i;) try {
                                    if (a = 1, o && (s = 2 & t[0] ? o.return : t[0] ? o.throw || ((s = o.return) && s.call(o), 0) : o.next) && !(s = s.call(o, t[1])).done) return s;
                                    switch (o = 0, s && (t = [2 & t[0], s.value]), t[0]) {
                                        case 0:
                                        case 1:
                                            s = t;
                                            break;
                                        case 4:
                                            return i.label++, {
                                                value: t[1],
                                                done: !1
                                            };
                                        case 5:
                                            i.label++, o = t[1], t = [0];
                                            continue;
                                        case 7:
                                            t = i.ops.pop(), i.trys.pop();
                                            continue;
                                        default:
                                            if (!(s = 0 < (s = i.trys).length && s[s.length - 1]) && (6 === t[0] || 2 === t[0])) {
                                                i = 0;
                                                continue
                                            }
                                            if (3 === t[0] && (!s || t[1] > s[0] && t[1] < s[3])) {
                                                i.label = t[1];
                                                break
                                            }
                                            if (6 === t[0] && i.label < s[1]) {
                                                i.label = s[1], s = t;
                                                break
                                            }
                                            if (s && i.label < s[2]) {
                                                i.label = s[2], i.ops.push(t);
                                                break
                                            }
                                            s[2] && i.ops.pop(), i.trys.pop();
                                            continue
                                    }
                                    t = r.call(n, i)
                                } catch (e) {
                                    t = [6, e], o = 0
                                } finally {
                                    a = s = 0
                                }
                                if (5 & t[0]) throw t[1];
                                return {
                                    value: t[0] ? t[1] : void 0,
                                    done: !0
                                }
                            }([t, e])
                        }
                    }
                };

            function vn(a) {
                return {
                    v2SupportedLanguagesGamesGameIdGet: function(t, r) {
                        return dn(this, void 0, Promise, function() {
                            var n;
                            return hn(this, function(e) {
                                switch (e.label) {
                                    case 0:
                                        return [4, function(u) {
                                            var e = this;
                                            return {
                                                v2SupportedLanguagesGamesGameIdGet: function(s, i) {
                                                    return void 0 === i && (i = {}), dn(e, void 0, Promise, function() {
                                                        var t, n, r, a, o;
                                                        return hn(this, function(e) {
                                                            if (null == s) throw new sn("gameId", "Required parameter gameId was null or undefined when calling v2SupportedLanguagesGamesGameIdGet.");
                                                            return a = "/v2/supported-languages/games/{gameId}".replace("{gameId}", encodeURIComponent(String(s))), t = T.Qc(a, !0), u && (o = u.baseOptions), n = ln(ln({
                                                                method: "GET"
                                                            }, o), i), r = {}, a = {}, t.query = ln(ln(ln({}, t.query), a), i.query), delete t.search, o = o && o.headers ? o.headers : {}, n.headers = ln(ln(ln({}, r), o), i.headers), [2, {
                                                                url: T.WU(t),
                                                                options: n
                                                            }]
                                                        })
                                                    })
                                                }
                                            }
                                        }(a).v2SupportedLanguagesGamesGameIdGet(t, r)];
                                    case 1:
                                        return n = e.sent(), [2, function(e, t) {
                                            void 0 === e && (e = b), void 0 === t && (t = on);
                                            t = ln(ln({}, n.options), {
                                                url: t + n.url
                                            });
                                            return e.request(t)
                                        }]
                                }
                            })
                        })
                    }
                }
            }(yr = {}).EnUs = "en_us", yr.EsEs = "es_es", yr.FrFr = "fr_fr", yr.IdId = "id_id", yr.ItIt = "it_it", yr.JaJp = "ja_jp", yr.KoKr = "ko_kr", yr.RuRu = "ru_ru", yr.ThTh = "th_th", yr.TrTr = "tr_tr", yr.ViVn = "vi_vn", yr.PtBr = "pt_br", yr.DeDe = "de_de", yr.ZhCn = "zh_cn", yr.ZhTw = "zh_tw", yr.BgBg = "bg_bg", yr.BnBd = "bn_bd", yr.CsCz = "cs_cz", yr.DaDk = "da_dk", yr.ElGr = "el_gr", yr.EtEe = "et_ee", yr.FiFi = "fi_fi", yr.HiIn = "hi_in", yr.HrHr = "hr_hr", yr.HuHu = "hu_hu", yr.KaGe = "ka_ge", yr.KkKz = "kk_kz", yr.KmKh = "km_kh", yr.LtLt = "lt_lt", yr.LvLv = "lv_lv", yr.MsMy = "ms_my", yr.MyMm = "my_mm", yr.NbNo = "nb_no", yr.NlNl = "nl_nl", yr.FilPh = "fil_ph", yr.PlPl = "pl_pl", yr.RoRo = "ro_ro", yr.UkUa = "uk_ua", yr.SiLk = "si_lk", yr.SkSk = "sk_sk", yr.SlSl = "sl_sl", yr.SqAl = "sq_al", yr.BsBa = "bs_ba", yr.SrRs = "sr_rs", yr.SvSe = "sv_se", yr.ZhCjv = "zh_cjv";
            var pn, fn = (he(mn, pn = D), mn.prototype.v2SupportedLanguagesGamesGameIdGet = function(e, t) {
                var n = this;
                return vn(this.configuration).v2SupportedLanguagesGamesGameIdGet(e, t).then(function(e) {
                    return e(n.axios, n.basePath)
                })
            }, mn);

            function mn() {
                return null !== pn && pn.apply(this, arguments) || this
            }
            var gn, yn, Gn = new A,
                In = new fn,
                bn = new t,
                Pn = {
                    getGameLanguageRolloutSettings: function() {
                        return Gn.v1SupportedLanguagesMetadataGet({
                            withCredentials: !0
                        })
                    },
                    getGameLanguages: function(e) {
                        return Gn.v1SupportedLanguagesGamesGameIdGet(e, {
                            withCredentials: !0
                        })
                    },
                    getGameLanguagesV2: function(e) {
                        return In.v2SupportedLanguagesGamesGameIdGet(e, {
                            withCredentials: !0
                        })
                    },
                    addLanguages: function(e, t) {
                        t = t.map(function(e) {
                            return {
                                languageCodeType: ye.Language,
                                languageCode: e
                            }
                        });
                        return Gn.v1SupportedLanguagesGamesGameIdPatch(e, t, {
                            withCredentials: !0
                        })
                    },
                    deleteLanguages: function(e, t) {
                        t = t.map(function(e) {
                            return {
                                languageCodeType: ye.Language,
                                languageCode: e,
                                delete: !0
                            }
                        });
                        return Gn.v1SupportedLanguagesGamesGameIdPatch(e, t, {
                            withCredentials: !0
                        })
                    },
                    getAvailableLanguages: function() {
                        return bn.v1LocalizationtableAvailableLanguagesGet()
                    },
                    getAutomaticTranslationStatus: function(e) {
                        return Gn.v1SupportedLanguagesGamesGameIdAutomaticTranslationStatusGet(e, {
                            withCredentials: !0
                        })
                    },
                    setAutomaticTranslationStatus: function(e, t, n) {
                        return Gn.v1SupportedLanguagesGamesGameIdLanguagesLanguageCodeAutomaticTranslationStatusPatch(e, n, t, {
                            withCredentials: !0
                        })
                    },
                    getAutomaticTranslationSwitchesValues: function(e) {
                        return Gn.v1SupportedLanguagesGamesGameIdUniverseDisplayInfoAutomaticTranslationSettingsGet(e, {
                            withCredentials: !0
                        })
                    },
                    setAutomaticTranslationSwitchesValue: function(e, t, n) {
                        return Gn.v1SupportedLanguagesGamesGameIdLanguagesLanguageCodeUniverseDisplayInfoAutomaticTranslationSettingsPatch(e, n, t, {
                            withCredentials: !0
                        })
                    }
                },
                wn = new g,
                te = {
                    getSourceLanguage: function(e) {
                        return wn.v1SourceLanguageGamesGameIdGet(e, {
                            withCredentials: !0
                        })
                    },
                    updateSourceLanguage: function(e, t) {
                        return wn.v1SourceLanguageGamesGameIdPatch(e, t, {
                            withCredentials: !0
                        })
                    }
                },
                k = (gn = function(e, t) {
                    return (gn = Object.setPrototypeOf || {
                            __proto__: []
                        }
                        instanceof Array && function(e, t) {
                            e.__proto__ = t
                        } || function(e, t) {
                            for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n])
                        })(e, t)
                }, function(e, t) {
                    if ("function" != typeof t && null !== t) throw new TypeError("Class extends value " + String(t) + " is not a constructor or null");

                    function n() {
                        this.constructor = e
                    }
                    gn(e, t), e.prototype = null === t ? Object.create(t) : (n.prototype = t.prototype, new n)
                }),
                Cn = i.EnvironmentUrls.thumbnailsApi.replace(/\/+$/, ""),
                Tn = ",",
                Ae = function(e, t, n) {
                    void 0 === t && (t = Cn), void 0 === n && (n = b), this.basePath = t, this.axios = n, e && (this.configuration = e, this.basePath = e.basePath || this.basePath)
                },
                An = (yn = Error, k(qn, yn), qn);

            function qn(e, t) {
                t = yn.call(this, t) || this;
                return t.field = e, t.name = "RequiredError", t
            }

            function Ln(e, t, n) {
                if (null == n) throw new An(t, "Required parameter " + t + " was null or undefined when calling " + e + ".")
            }

            function Sn(e) {
                for (var t = [], n = 1; n < arguments.length; n++) t[n - 1] = arguments[n];
                for (var r = new URLSearchParams(e.search), a = 0, o = t; a < o.length; a++) {
                    var s, i = o[a];
                    for (s in i) r.set(s, i[s])
                }
                e.search = r.toString()
            }

            function Un(e) {
                return e.pathname + e.search + e.hash
            }

            function Rn(n, r, a, o) {
                return function(e, t) {
                    void 0 === e && (e = r), void 0 === t && (t = a);
                    t = Dn(Dn({}, n.options), {
                        url: ((null == o ? void 0 : o.basePath) || t) + n.url
                    });
                    return e.request(t)
                }
            }
            var On, Dn = function() {
                    return (Dn = Object.assign || function(e) {
                        for (var t, n = 1, r = arguments.length; n < r; n++)
                            for (var a in t = arguments[n]) Object.prototype.hasOwnProperty.call(t, a) && (e[a] = t[a]);
                        return e
                    }).apply(this, arguments)
                },
                xn = "https://example.com",
                e = (On = function(e, t) {
                    return (On = Object.setPrototypeOf || {
                            __proto__: []
                        }
                        instanceof Array && function(e, t) {
                            e.__proto__ = t
                        } || function(e, t) {
                            for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n])
                        })(e, t)
                }, function(e, t) {
                    if ("function" != typeof t && null !== t) throw new TypeError("Class extends value " + String(t) + " is not a constructor or null");

                    function n() {
                        this.constructor = e
                    }
                    On(e, t), e.prototype = null === t ? Object.create(t) : (n.prototype = t.prototype, new n)
                }),
                En = function() {
                    return (En = Object.assign || function(e) {
                        for (var t, n = 1, r = arguments.length; n < r; n++)
                            for (var a in t = arguments[n]) Object.prototype.hasOwnProperty.call(t, a) && (e[a] = t[a]);
                        return e
                    }).apply(this, arguments)
                },
                Bn = function(e, s, i, u) {
                    return new(i = i || Promise)(function(n, t) {
                        function r(e) {
                            try {
                                o(u.next(e))
                            } catch (e) {
                                t(e)
                            }
                        }

                        function a(e) {
                            try {
                                o(u.throw(e))
                            } catch (e) {
                                t(e)
                            }
                        }

                        function o(e) {
                            var t;
                            e.done ? n(e.value) : ((t = e.value) instanceof i ? t : new i(function(e) {
                                e(t)
                            })).then(r, a)
                        }
                        o((u = u.apply(e, s || [])).next())
                    })
                },
                Fn = function(n, r) {
                    var a, o, s, i = {
                            label: 0,
                            sent: function() {
                                if (1 & s[0]) throw s[1];
                                return s[1]
                            },
                            trys: [],
                            ops: []
                        },
                        e = {
                            next: t(0),
                            throw: t(1),
                            return: t(2)
                        };
                    return "function" == typeof Symbol && (e[Symbol.iterator] = function() {
                        return this
                    }), e;

                    function t(t) {
                        return function(e) {
                            return function(t) {
                                if (a) throw new TypeError("Generator is already executing.");
                                for (; i;) try {
                                    if (a = 1, o && (s = 2 & t[0] ? o.return : t[0] ? o.throw || ((s = o.return) && s.call(o), 0) : o.next) && !(s = s.call(o, t[1])).done) return s;
                                    switch (o = 0, s && (t = [2 & t[0], s.value]), t[0]) {
                                        case 0:
                                        case 1:
                                            s = t;
                                            break;
                                        case 4:
                                            return i.label++, {
                                                value: t[1],
                                                done: !1
                                            };
                                        case 5:
                                            i.label++, o = t[1], t = [0];
                                            continue;
                                        case 7:
                                            t = i.ops.pop(), i.trys.pop();
                                            continue;
                                        default:
                                            if (!(s = 0 < (s = i.trys).length && s[s.length - 1]) && (6 === t[0] || 2 === t[0])) {
                                                i = 0;
                                                continue
                                            }
                                            if (3 === t[0] && (!s || t[1] > s[0] && t[1] < s[3])) {
                                                i.label = t[1];
                                                break
                                            }
                                            if (6 === t[0] && i.label < s[1]) {
                                                i.label = s[1], s = t;
                                                break
                                            }
                                            if (s && i.label < s[2]) {
                                                i.label = s[2], i.ops.push(t);
                                                break
                                            }
                                            s[2] && i.ops.pop(), i.trys.pop();
                                            continue
                                    }
                                    t = r.call(n, i)
                                } catch (e) {
                                    t = [6, e], o = 0
                                } finally {
                                    a = s = 0
                                }
                                if (5 & t[0]) throw t[1];
                                return {
                                    value: t[0] ? t[1] : void 0,
                                    done: !0
                                }
                            }([t, e])
                        }
                    }
                };

            function zn(u) {
                var c = function(h) {
                    var e = this;
                    return {
                        v1AssetsGet: function(s, i, u, c, l, d) {
                            return void 0 === d && (d = {}), Bn(e, void 0, Promise, function() {
                                var t, n, r, a, o;
                                return Fn(this, function(e) {
                                    return Ln("v1AssetsGet", "assetIds", s), t = new URL("/v1/assets", xn), h && (o = h.baseOptions), n = En(En({
                                        method: "GET"
                                    }, o), d), r = {}, a = {}, s && (a.assetIds = s.join(Tn)), void 0 !== i && (a.returnPolicy = i), void 0 !== u && (a.size = u), void 0 !== c && (a.format = c), void 0 !== l && (a.isCircular = l), Sn(t, a, d.query), o = o && o.headers ? o.headers : {}, n.headers = En(En(En({}, r), o), d.headers), [2, {
                                        url: Un(t),
                                        options: n
                                    }]
                                })
                            })
                        },
                        v1AssetsThumbnail3dGet: function(s, i) {
                            return void 0 === i && (i = {}), Bn(e, void 0, Promise, function() {
                                var t, n, r, a, o;
                                return Fn(this, function(e) {
                                    return Ln("v1AssetsThumbnail3dGet", "assetId", s), t = new URL("/v1/assets-thumbnail-3d", xn), h && (o = h.baseOptions), n = En(En({
                                        method: "GET"
                                    }, o), i), r = {}, a = {}, void 0 !== s && (a.assetId = s), Sn(t, a, i.query), o = o && o.headers ? o.headers : {}, n.headers = En(En(En({}, r), o), i.headers), [2, {
                                        url: Un(t),
                                        options: n
                                    }]
                                })
                            })
                        }
                    }
                }(u);
                return {
                    v1AssetsGet: function(n, r, a, o, s, i) {
                        return Bn(this, void 0, Promise, function() {
                            var t;
                            return Fn(this, function(e) {
                                switch (e.label) {
                                    case 0:
                                        return [4, c.v1AssetsGet(n, r, a, o, s, i)];
                                    case 1:
                                        return t = e.sent(), [2, Rn(t, d(), Cn, u)]
                                }
                            })
                        })
                    },
                    v1AssetsThumbnail3dGet: function(n, r) {
                        return Bn(this, void 0, Promise, function() {
                            var t;
                            return Fn(this, function(e) {
                                switch (e.label) {
                                    case 0:
                                        return [4, c.v1AssetsThumbnail3dGet(n, r)];
                                    case 1:
                                        return t = e.sent(), [2, Rn(t, d(), Cn, u)]
                                }
                            })
                        })
                    }
                }
            }(xe = {}).Avatar = "Avatar", xe.AvatarHeadShot = "AvatarHeadShot", xe.GameIcon = "GameIcon", xe.BadgeIcon = "BadgeIcon", xe.GameThumbnail = "GameThumbnail", xe.GamePass = "GamePass", xe.Asset = "Asset", xe.BundleThumbnail = "BundleThumbnail", xe.Outfit = "Outfit", xe.GroupIcon = "GroupIcon", xe.DeveloperProduct = "DeveloperProduct", xe.AvatarBust = "AvatarBust", xe.AutoGeneratedAsset = "AutoGeneratedAsset", (pe = {}).Error = "Error", pe.Completed = "Completed", pe.InReview = "InReview", pe.Pending = "Pending", pe.Blocked = "Blocked", (yr = {}).Error = "Error", yr.Completed = "Completed", yr.InReview = "InReview", yr.Pending = "Pending", yr.Blocked = "Blocked";
            var jn, he = (e(Nn, jn = Ae), Nn.prototype.v1AssetsGet = function(e, t, n, r, a, o) {
                var s = this;
                return zn(this.configuration).v1AssetsGet(e, t, n, r, a, o).then(function(e) {
                    return e(s.axios, s.basePath)
                })
            }, Nn.prototype.v1AssetsThumbnail3dGet = function(e, t) {
                var n = this;
                return zn(this.configuration).v1AssetsThumbnail3dGet(e, t).then(function(e) {
                    return e(n.axios, n.basePath)
                })
            }, Nn);

            function Nn() {
                return null !== jn && jn.apply(this, arguments) || this
            }

            function kn(i) {
                var u = function(d) {
                    var e = this;
                    return {
                        v1UsersAvatar3dGet: function(s, i) {
                            return void 0 === i && (i = {}), Bn(e, void 0, Promise, function() {
                                var t, n, r, a, o;
                                return Fn(this, function(e) {
                                    return Ln("v1UsersAvatar3dGet", "userId", s), t = new URL("/v1/users/avatar-3d", xn), d && (o = d.baseOptions), n = En(En({
                                        method: "GET"
                                    }, o), i), r = {}, a = {}, void 0 !== s && (a.userId = s), Sn(t, a, i.query), o = o && o.headers ? o.headers : {}, n.headers = En(En(En({}, r), o), i.headers), [2, {
                                        url: Un(t),
                                        options: n
                                    }]
                                })
                            })
                        },
                        v1UsersAvatarBustGet: function(s, i, u, c, l) {
                            return void 0 === l && (l = {}), Bn(e, void 0, Promise, function() {
                                var t, n, r, a, o;
                                return Fn(this, function(e) {
                                    return Ln("v1UsersAvatarBustGet", "userIds", s), t = new URL("/v1/users/avatar-bust", xn), d && (o = d.baseOptions), n = En(En({
                                        method: "GET"
                                    }, o), l), r = {}, a = {}, s && (a.userIds = s.join(Tn)), void 0 !== i && (a.size = i), void 0 !== u && (a.format = u), void 0 !== c && (a.isCircular = c), Sn(t, a, l.query), o = o && o.headers ? o.headers : {}, n.headers = En(En(En({}, r), o), l.headers), [2, {
                                        url: Un(t),
                                        options: n
                                    }]
                                })
                            })
                        },
                        v1UsersAvatarGet: function(s, i, u, c, l) {
                            return void 0 === l && (l = {}), Bn(e, void 0, Promise, function() {
                                var t, n, r, a, o;
                                return Fn(this, function(e) {
                                    return Ln("v1UsersAvatarGet", "userIds", s), t = new URL("/v1/users/avatar", xn), d && (o = d.baseOptions), n = En(En({
                                        method: "GET"
                                    }, o), l), r = {}, a = {}, s && (a.userIds = s.join(Tn)), void 0 !== i && (a.size = i), void 0 !== u && (a.format = u), void 0 !== c && (a.isCircular = c), Sn(t, a, l.query), o = o && o.headers ? o.headers : {}, n.headers = En(En(En({}, r), o), l.headers), [2, {
                                        url: Un(t),
                                        options: n
                                    }]
                                })
                            })
                        },
                        v1UsersAvatarHeadshotGet: function(s, i, u, c, l) {
                            return void 0 === l && (l = {}), Bn(e, void 0, Promise, function() {
                                var t, n, r, a, o;
                                return Fn(this, function(e) {
                                    return Ln("v1UsersAvatarHeadshotGet", "userIds", s), t = new URL("/v1/users/avatar-headshot", xn), d && (o = d.baseOptions), n = En(En({
                                        method: "GET"
                                    }, o), l), r = {}, a = {}, s && (a.userIds = s.join(Tn)), void 0 !== i && (a.size = i), void 0 !== u && (a.format = u), void 0 !== c && (a.isCircular = c), Sn(t, a, l.query), o = o && o.headers ? o.headers : {}, n.headers = En(En(En({}, r), o), l.headers), [2, {
                                        url: Un(t),
                                        options: n
                                    }]
                                })
                            })
                        }
                    }
                }(i);
                return {
                    v1UsersAvatar3dGet: function(n, r) {
                        return Bn(this, void 0, Promise, function() {
                            var t;
                            return Fn(this, function(e) {
                                switch (e.label) {
                                    case 0:
                                        return [4, u.v1UsersAvatar3dGet(n, r)];
                                    case 1:
                                        return t = e.sent(), [2, Rn(t, d(), Cn, i)]
                                }
                            })
                        })
                    },
                    v1UsersAvatarBustGet: function(n, r, a, o, s) {
                        return Bn(this, void 0, Promise, function() {
                            var t;
                            return Fn(this, function(e) {
                                switch (e.label) {
                                    case 0:
                                        return [4, u.v1UsersAvatarBustGet(n, r, a, o, s)];
                                    case 1:
                                        return t = e.sent(), [2, Rn(t, d(), Cn, i)]
                                }
                            })
                        })
                    },
                    v1UsersAvatarGet: function(n, r, a, o, s) {
                        return Bn(this, void 0, Promise, function() {
                            var t;
                            return Fn(this, function(e) {
                                switch (e.label) {
                                    case 0:
                                        return [4, u.v1UsersAvatarGet(n, r, a, o, s)];
                                    case 1:
                                        return t = e.sent(), [2, Rn(t, d(), Cn, i)]
                                }
                            })
                        })
                    },
                    v1UsersAvatarHeadshotGet: function(n, r, a, o, s) {
                        return Bn(this, void 0, Promise, function() {
                            var t;
                            return Fn(this, function(e) {
                                switch (e.label) {
                                    case 0:
                                        return [4, u.v1UsersAvatarHeadshotGet(n, r, a, o, s)];
                                    case 1:
                                        return t = e.sent(), [2, Rn(t, d(), Cn, i)]
                                }
                            })
                        })
                    }
                }
            }
            var _n, D = (e(Wn, _n = Ae), Wn.prototype.v1UsersAvatar3dGet = function(e, t) {
                var n = this;
                return kn(this.configuration).v1UsersAvatar3dGet(e, t).then(function(e) {
                    return e(n.axios, n.basePath)
                })
            }, Wn.prototype.v1UsersAvatarBustGet = function(e, t, n, r, a) {
                var o = this;
                return kn(this.configuration).v1UsersAvatarBustGet(e, t, n, r, a).then(function(e) {
                    return e(o.axios, o.basePath)
                })
            }, Wn.prototype.v1UsersAvatarGet = function(e, t, n, r, a) {
                var o = this;
                return kn(this.configuration).v1UsersAvatarGet(e, t, n, r, a).then(function(e) {
                    return e(o.axios, o.basePath)
                })
            }, Wn.prototype.v1UsersAvatarHeadshotGet = function(e, t, n, r, a) {
                var o = this;
                return kn(this.configuration).v1UsersAvatarHeadshotGet(e, t, n, r, a).then(function(e) {
                    return e(o.axios, o.basePath)
                })
            }, Wn);

            function Wn() {
                return null !== _n && _n.apply(this, arguments) || this
            }

            function Mn(i) {
                var u = function(d) {
                    var e = this;
                    return {
                        v1BadgesIconsGet: function(s, i, u, c, l) {
                            return void 0 === l && (l = {}), Bn(e, void 0, Promise, function() {
                                var t, n, r, a, o;
                                return Fn(this, function(e) {
                                    return Ln("v1BadgesIconsGet", "badgeIds", s), t = new URL("/v1/badges/icons", xn), d && (o = d.baseOptions), n = En(En({
                                        method: "GET"
                                    }, o), l), r = {}, a = {}, s && (a.badgeIds = s.join(Tn)), void 0 !== i && (a.size = i), void 0 !== u && (a.format = u), void 0 !== c && (a.isCircular = c), Sn(t, a, l.query), o = o && o.headers ? o.headers : {}, n.headers = En(En(En({}, r), o), l.headers), [2, {
                                        url: Un(t),
                                        options: n
                                    }]
                                })
                            })
                        }
                    }
                }(i);
                return {
                    v1BadgesIconsGet: function(n, r, a, o, s) {
                        return Bn(this, void 0, Promise, function() {
                            var t;
                            return Fn(this, function(e) {
                                switch (e.label) {
                                    case 0:
                                        return [4, u.v1BadgesIconsGet(n, r, a, o, s)];
                                    case 1:
                                        return t = e.sent(), [2, Rn(t, d(), Cn, i)]
                                }
                            })
                        })
                    }
                }
            }
            var Qn, A = (e(Hn, Qn = Ae), Hn.prototype.v1BadgesIconsGet = function(e, t, n, r, a) {
                var o = this;
                return Mn(this.configuration).v1BadgesIconsGet(e, t, n, r, a).then(function(e) {
                    return e(o.axios, o.basePath)
                })
            }, Hn);

            function Hn() {
                return null !== Qn && Qn.apply(this, arguments) || this
            }

            function Vn(h) {
                var e = this;
                return {
                    v1BatchPost: function(l, d) {
                        return void 0 === d && (d = {}), Bn(e, void 0, Promise, function() {
                            var o, s, i, u, c;
                            return Fn(this, function(e) {
                                var t, n, r, a;
                                return Ln("v1BatchPost", "requests", l), o = new URL("/v1/batch", xn), h && (c = h.baseOptions), s = En(En({
                                    method: "POST"
                                }, c), d), u = {}, (i = {})["Content-Type"] = "application/json", Sn(o, u, d.query), c = c && c.headers ? c.headers : {}, s.headers = En(En(En({}, i), c), d.headers), s.data = (n = s, r = h, ((a = "string" != typeof(t = l)) && r && r.isJsonMime ? r.isJsonMime(n.headers["Content-Type"]) : a) ? JSON.stringify(void 0 !== t ? t : {}) : t || ""), [2, {
                                    url: Un(o),
                                    options: s
                                }]
                            })
                        })
                    }
                }
            }

            function Jn(a) {
                var o = Vn(a);
                return {
                    v1BatchPost: function(n, r) {
                        return Bn(this, void 0, Promise, function() {
                            var t;
                            return Fn(this, function(e) {
                                switch (e.label) {
                                    case 0:
                                        return [4, o.v1BatchPost(n, r)];
                                    case 1:
                                        return t = e.sent(), [2, Rn(t, d(), Cn, a)]
                                }
                            })
                        })
                    }
                }
            }
            var Kn, fn = (e($n, Kn = Ae), $n.prototype.v1BatchPost = function(e, t) {
                var n = this;
                return Jn(this.configuration).v1BatchPost(e, t).then(function(e) {
                    return e(n.axios, n.basePath)
                })
            }, $n);

            function $n() {
                return null !== Kn && Kn.apply(this, arguments) || this
            }

            function Xn(i) {
                var u = function(d) {
                    var e = this;
                    return {
                        v1BundlesThumbnailsGet: function(s, i, u, c, l) {
                            return void 0 === l && (l = {}), Bn(e, void 0, Promise, function() {
                                var t, n, r, a, o;
                                return Fn(this, function(e) {
                                    return Ln("v1BundlesThumbnailsGet", "bundleIds", s), t = new URL("/v1/bundles/thumbnails", xn), d && (o = d.baseOptions), n = En(En({
                                        method: "GET"
                                    }, o), l), r = {}, a = {}, s && (a.bundleIds = s.join(Tn)), void 0 !== i && (a.size = i), void 0 !== u && (a.format = u), void 0 !== c && (a.isCircular = c), Sn(t, a, l.query), o = o && o.headers ? o.headers : {}, n.headers = En(En(En({}, r), o), l.headers), [2, {
                                        url: Un(t),
                                        options: n
                                    }]
                                })
                            })
                        }
                    }
                }(i);
                return {
                    v1BundlesThumbnailsGet: function(n, r, a, o, s) {
                        return Bn(this, void 0, Promise, function() {
                            var t;
                            return Fn(this, function(e) {
                                switch (e.label) {
                                    case 0:
                                        return [4, u.v1BundlesThumbnailsGet(n, r, a, o, s)];
                                    case 1:
                                        return t = e.sent(), [2, Rn(t, d(), Cn, i)]
                                }
                            })
                        })
                    }
                }
            }
            var Yn, t = (e(Zn, Yn = Ae), Zn.prototype.v1BundlesThumbnailsGet = function(e, t, n, r, a) {
                var o = this;
                return Xn(this.configuration).v1BundlesThumbnailsGet(e, t, n, r, a).then(function(e) {
                    return e(o.axios, o.basePath)
                })
            }, Zn);

            function Zn() {
                return null !== Yn && Yn.apply(this, arguments) || this
            }

            function er(i) {
                var u = function(d) {
                    var e = this;
                    return {
                        v1DeveloperProductsIconsGet: function(s, i, u, c, l) {
                            return void 0 === l && (l = {}), Bn(e, void 0, Promise, function() {
                                var t, n, r, a, o;
                                return Fn(this, function(e) {
                                    return Ln("v1DeveloperProductsIconsGet", "developerProductIds", s), t = new URL("/v1/developer-products/icons", xn), d && (o = d.baseOptions), n = En(En({
                                        method: "GET"
                                    }, o), l), r = {}, a = {}, s && (a.developerProductIds = s.join(Tn)), void 0 !== i && (a.size = i), void 0 !== u && (a.format = u), void 0 !== c && (a.isCircular = c), Sn(t, a, l.query), o = o && o.headers ? o.headers : {}, n.headers = En(En(En({}, r), o), l.headers), [2, {
                                        url: Un(t),
                                        options: n
                                    }]
                                })
                            })
                        }
                    }
                }(i);
                return {
                    v1DeveloperProductsIconsGet: function(n, r, a, o, s) {
                        return Bn(this, void 0, Promise, function() {
                            var t;
                            return Fn(this, function(e) {
                                switch (e.label) {
                                    case 0:
                                        return [4, u.v1DeveloperProductsIconsGet(n, r, a, o, s)];
                                    case 1:
                                        return t = e.sent(), [2, Rn(t, d(), Cn, i)]
                                }
                            })
                        })
                    }
                }
            }
            var tr, g = (e(nr, tr = Ae), nr.prototype.v1DeveloperProductsIconsGet = function(e, t, n, r, a) {
                var o = this;
                return er(this.configuration).v1DeveloperProductsIconsGet(e, t, n, r, a).then(function(e) {
                    return e(o.axios, o.basePath)
                })
            }, nr);

            function nr() {
                return null !== tr && tr.apply(this, arguments) || this
            }

            function rr(i) {
                var u = function(d) {
                    var e = this;
                    return {
                        v1GamePassesGet: function(s, i, u, c, l) {
                            return void 0 === l && (l = {}), Bn(e, void 0, Promise, function() {
                                var t, n, r, a, o;
                                return Fn(this, function(e) {
                                    return Ln("v1GamePassesGet", "gamePassIds", s), t = new URL("/v1/game-passes", xn), d && (o = d.baseOptions), n = En(En({
                                        method: "GET"
                                    }, o), l), r = {}, a = {}, s && (a.gamePassIds = s.join(Tn)), void 0 !== i && (a.size = i), void 0 !== u && (a.format = u), void 0 !== c && (a.isCircular = c), Sn(t, a, l.query), o = o && o.headers ? o.headers : {}, n.headers = En(En(En({}, r), o), l.headers), [2, {
                                        url: Un(t),
                                        options: n
                                    }]
                                })
                            })
                        }
                    }
                }(i);
                return {
                    v1GamePassesGet: function(n, r, a, o, s) {
                        return Bn(this, void 0, Promise, function() {
                            var t;
                            return Fn(this, function(e) {
                                switch (e.label) {
                                    case 0:
                                        return [4, u.v1GamePassesGet(n, r, a, o, s)];
                                    case 1:
                                        return t = e.sent(), [2, Rn(t, d(), Cn, i)]
                                }
                            })
                        })
                    }
                }
            }
            var ar, k = (e(or, ar = Ae), or.prototype.v1GamePassesGet = function(e, t, n, r, a) {
                var o = this;
                return rr(this.configuration).v1GamePassesGet(e, t, n, r, a).then(function(e) {
                    return e(o.axios, o.basePath)
                })
            }, or);

            function or() {
                return null !== ar && ar.apply(this, arguments) || this
            }

            function sr(c) {
                var l = function(v) {
                    var e = this;
                    return {
                        v1GamesIconsGet: function(s, i, u, c, l, d) {
                            return void 0 === d && (d = {}), Bn(e, void 0, Promise, function() {
                                var t, n, r, a, o;
                                return Fn(this, function(e) {
                                    return Ln("v1GamesIconsGet", "universeIds", s), t = new URL("/v1/games/icons", xn), v && (o = v.baseOptions), n = En(En({
                                        method: "GET"
                                    }, o), d), r = {}, a = {}, s && (a.universeIds = s.join(Tn)), void 0 !== i && (a.returnPolicy = i), void 0 !== u && (a.size = u), void 0 !== c && (a.format = c), void 0 !== l && (a.isCircular = l), Sn(t, a, d.query), o = o && o.headers ? o.headers : {}, n.headers = En(En(En({}, r), o), d.headers), [2, {
                                        url: Un(t),
                                        options: n
                                    }]
                                })
                            })
                        },
                        v1GamesMultigetThumbnailsGet: function(s, i, u, c, l, d, h) {
                            return void 0 === h && (h = {}), Bn(e, void 0, Promise, function() {
                                var t, n, r, a, o;
                                return Fn(this, function(e) {
                                    return Ln("v1GamesMultigetThumbnailsGet", "universeIds", s), t = new URL("/v1/games/multiget/thumbnails", xn), v && (o = v.baseOptions), n = En(En({
                                        method: "GET"
                                    }, o), h), r = {}, a = {}, s && (a.universeIds = s.join(Tn)), void 0 !== i && (a.countPerUniverse = i), void 0 !== u && (a.defaults = u), void 0 !== c && (a.size = c), void 0 !== l && (a.format = l), void 0 !== d && (a.isCircular = d), Sn(t, a, h.query), o = o && o.headers ? o.headers : {}, n.headers = En(En(En({}, r), o), h.headers), [2, {
                                        url: Un(t),
                                        options: n
                                    }]
                                })
                            })
                        },
                        v1GamesUniverseIdThumbnailsGet: function(s, i, u, c, l, d) {
                            return void 0 === d && (d = {}), Bn(e, void 0, Promise, function() {
                                var t, n, r, a, o;
                                return Fn(this, function(e) {
                                    return Ln("v1GamesUniverseIdThumbnailsGet", "universeId", s), Ln("v1GamesUniverseIdThumbnailsGet", "thumbnailIds", i), a = "/v1/games/{universeId}/thumbnails".replace("{universeId}", encodeURIComponent(String(s))), t = new URL(a, xn), v && (o = v.baseOptions), n = En(En({
                                        method: "GET"
                                    }, o), d), r = {}, a = {}, i && (a.thumbnailIds = i.join(Tn)), void 0 !== u && (a.size = u), void 0 !== c && (a.format = c), void 0 !== l && (a.isCircular = l), Sn(t, a, d.query), o = o && o.headers ? o.headers : {}, n.headers = En(En(En({}, r), o), d.headers), [2, {
                                        url: Un(t),
                                        options: n
                                    }]
                                })
                            })
                        }
                    }
                }(c);
                return {
                    v1GamesIconsGet: function(n, r, a, o, s, i) {
                        return Bn(this, void 0, Promise, function() {
                            var t;
                            return Fn(this, function(e) {
                                switch (e.label) {
                                    case 0:
                                        return [4, l.v1GamesIconsGet(n, r, a, o, s, i)];
                                    case 1:
                                        return t = e.sent(), [2, Rn(t, d(), Cn, c)]
                                }
                            })
                        })
                    },
                    v1GamesMultigetThumbnailsGet: function(n, r, a, o, s, i, u) {
                        return Bn(this, void 0, Promise, function() {
                            var t;
                            return Fn(this, function(e) {
                                switch (e.label) {
                                    case 0:
                                        return [4, l.v1GamesMultigetThumbnailsGet(n, r, a, o, s, i, u)];
                                    case 1:
                                        return t = e.sent(), [2, Rn(t, d(), Cn, c)]
                                }
                            })
                        })
                    },
                    v1GamesUniverseIdThumbnailsGet: function(n, r, a, o, s, i) {
                        return Bn(this, void 0, Promise, function() {
                            var t;
                            return Fn(this, function(e) {
                                switch (e.label) {
                                    case 0:
                                        return [4, l.v1GamesUniverseIdThumbnailsGet(n, r, a, o, s, i)];
                                    case 1:
                                        return t = e.sent(), [2, Rn(t, d(), Cn, c)]
                                }
                            })
                        })
                    }
                }
            }
            var ir, xe = (e(ur, ir = Ae), ur.prototype.v1GamesIconsGet = function(e, t, n, r, a, o) {
                var s = this;
                return sr(this.configuration).v1GamesIconsGet(e, t, n, r, a, o).then(function(e) {
                    return e(s.axios, s.basePath)
                })
            }, ur.prototype.v1GamesMultigetThumbnailsGet = function(e, t, n, r, a, o, s) {
                var i = this;
                return sr(this.configuration).v1GamesMultigetThumbnailsGet(e, t, n, r, a, o, s).then(function(e) {
                    return e(i.axios, i.basePath)
                })
            }, ur.prototype.v1GamesUniverseIdThumbnailsGet = function(e, t, n, r, a, o) {
                var s = this;
                return sr(this.configuration).v1GamesUniverseIdThumbnailsGet(e, t, n, r, a, o).then(function(e) {
                    return e(s.axios, s.basePath)
                })
            }, ur);

            function ur() {
                return null !== ir && ir.apply(this, arguments) || this
            }

            function cr(i) {
                var u = function(d) {
                    var e = this;
                    return {
                        v1GroupsIconsGet: function(s, i, u, c, l) {
                            return void 0 === l && (l = {}), Bn(e, void 0, Promise, function() {
                                var t, n, r, a, o;
                                return Fn(this, function(e) {
                                    return Ln("v1GroupsIconsGet", "groupIds", s), t = new URL("/v1/groups/icons", xn), d && (o = d.baseOptions), n = En(En({
                                        method: "GET"
                                    }, o), l), r = {}, a = {}, s && (a.groupIds = s.join(Tn)), void 0 !== i && (a.size = i), void 0 !== u && (a.format = u), void 0 !== c && (a.isCircular = c), Sn(t, a, l.query), o = o && o.headers ? o.headers : {}, n.headers = En(En(En({}, r), o), l.headers), [2, {
                                        url: Un(t),
                                        options: n
                                    }]
                                })
                            })
                        }
                    }
                }(i);
                return {
                    v1GroupsIconsGet: function(n, r, a, o, s) {
                        return Bn(this, void 0, Promise, function() {
                            var t;
                            return Fn(this, function(e) {
                                switch (e.label) {
                                    case 0:
                                        return [4, u.v1GroupsIconsGet(n, r, a, o, s)];
                                    case 1:
                                        return t = e.sent(), [2, Rn(t, d(), Cn, i)]
                                }
                            })
                        })
                    }
                }
            }
            var lr, dr, pe = (e(hr, lr = Ae), hr.prototype.v1GroupsIconsGet = function(e, t, n, r, a) {
                var o = this;
                return cr(this.configuration).v1GroupsIconsGet(e, t, n, r, a).then(function(e) {
                    return e(o.axios, o.basePath)
                })
            }, hr);

            function hr() {
                return null !== lr && lr.apply(this, arguments) || this
            }

            function vr(r) {
                var a = function(s) {
                    var e = this;
                    return {
                        v1MetadataGet: function(o) {
                            return void 0 === o && (o = {}), Bn(e, void 0, Promise, function() {
                                var t, n, r, a;
                                return Fn(this, function(e) {
                                    return t = new URL("/v1/metadata", xn), s && (a = s.baseOptions), n = En(En({
                                        method: "GET"
                                    }, a), o), r = {}, Sn(t, {}, o.query), a = a && a.headers ? a.headers : {}, n.headers = En(En(En({}, r), a), o.headers), [2, {
                                        url: Un(t),
                                        options: n
                                    }]
                                })
                            })
                        }
                    }
                }(r);
                return {
                    v1MetadataGet: function(n) {
                        return Bn(this, void 0, Promise, function() {
                            var t;
                            return Fn(this, function(e) {
                                switch (e.label) {
                                    case 0:
                                        return [4, a.v1MetadataGet(n)];
                                    case 1:
                                        return t = e.sent(), [2, Rn(t, d(), Cn, r)]
                                }
                            })
                        })
                    }
                }
            }

            function pr() {
                return null !== dr && dr.apply(this, arguments) || this
            }

            function fr(i) {
                var u = function(d) {
                    var e = this;
                    return {
                        v1UsersOutfitsGet: function(s, i, u, c, l) {
                            return void 0 === l && (l = {}), Bn(e, void 0, Promise, function() {
                                var t, n, r, a, o;
                                return Fn(this, function(e) {
                                    return Ln("v1UsersOutfitsGet", "userOutfitIds", s), t = new URL("/v1/users/outfits", xn), d && (o = d.baseOptions), n = En(En({
                                        method: "GET"
                                    }, o), l), r = {}, a = {}, s && (a.userOutfitIds = s.join(Tn)), void 0 !== i && (a.size = i), void 0 !== u && (a.format = u), void 0 !== c && (a.isCircular = c), Sn(t, a, l.query), o = o && o.headers ? o.headers : {}, n.headers = En(En(En({}, r), o), l.headers), [2, {
                                        url: Un(t),
                                        options: n
                                    }]
                                })
                            })
                        }
                    }
                }(i);
                return {
                    v1UsersOutfitsGet: function(n, r, a, o, s) {
                        return Bn(this, void 0, Promise, function() {
                            var t;
                            return Fn(this, function(e) {
                                switch (e.label) {
                                    case 0:
                                        return [4, u.v1UsersOutfitsGet(n, r, a, o, s)];
                                    case 1:
                                        return t = e.sent(), [2, Rn(t, d(), Cn, i)]
                                }
                            })
                        })
                    }
                }
            }
            e(pr, dr = Ae), pr.prototype.v1MetadataGet = function(e) {
                var t = this;
                return vr(this.configuration).v1MetadataGet(e).then(function(e) {
                    return e(t.axios, t.basePath)
                })
            };
            var mr, gr, yr = (e(Gr, mr = Ae), Gr.prototype.v1UsersOutfitsGet = function(e, t, n, r, a) {
                var o = this;
                return fr(this.configuration).v1UsersOutfitsGet(e, t, n, r, a).then(function(e) {
                    return e(o.axios, o.basePath)
                })
            }, Gr);

            function Gr() {
                return null !== mr && mr.apply(this, arguments) || this
            }

            function Ir(u) {
                var c = function(h) {
                    var e = this;
                    return {
                        v1PlacesGameiconsGet: function(s, i, u, c, l, d) {
                            return void 0 === d && (d = {}), Bn(e, void 0, Promise, function() {
                                var t, n, r, a, o;
                                return Fn(this, function(e) {
                                    return Ln("v1PlacesGameiconsGet", "placeIds", s), t = new URL("/v1/places/gameicons", xn), h && (o = h.baseOptions), n = En(En({
                                        method: "GET"
                                    }, o), d), r = {}, a = {}, s && (a.placeIds = s.join(Tn)), void 0 !== i && (a.returnPolicy = i), void 0 !== u && (a.size = u), void 0 !== c && (a.format = c), void 0 !== l && (a.isCircular = l), Sn(t, a, d.query), o = o && o.headers ? o.headers : {}, n.headers = En(En(En({}, r), o), d.headers), [2, {
                                        url: Un(t),
                                        options: n
                                    }]
                                })
                            })
                        }
                    }
                }(u);
                return {
                    v1PlacesGameiconsGet: function(n, r, a, o, s, i) {
                        return Bn(this, void 0, Promise, function() {
                            var t;
                            return Fn(this, function(e) {
                                switch (e.label) {
                                    case 0:
                                        return [4, c.v1PlacesGameiconsGet(n, r, a, o, s, i)];
                                    case 1:
                                        return t = e.sent(), [2, Rn(t, d(), Cn, u)]
                                }
                            })
                        })
                    }
                }
            }

            function br() {
                return null !== gr && gr.apply(this, arguments) || this
            }
            e(br, gr = Ae), br.prototype.v1PlacesGameiconsGet = function(e, t, n, r, a, o) {
                var s = this;
                return Ir(this.configuration).v1PlacesGameiconsGet(e, t, n, r, a, o).then(function(e) {
                    return e(s.axios, s.basePath)
                })
            };
            var Pr = i.EnvironmentUrls.thumbnailsApi,
                wr = new xe,
                Cr = new k;
            (xe = Lr = Lr || {}).PlaceHolder = "PlaceHolder", xe.AutoGenerated = "AutoGenerated", xe.ForceAutoGenerated = "ForceAutoGenerated", (k = Rr = Rr || {}).Large = "150x150", k.Default = "50x50", (xe = Br = Br || {}).width768 = "768x432", xe.width576 = "576x324", xe.width480 = "480x270", xe.width384 = "384x216", xe.width256 = "256x144", (Wr = Wr || {}).Png = "Png";
            var Tr, Ar, k = {
                    getIcons: function(e, t, n, r, a) {
                        return wr.v1GamesIconsGet(e, t, n, r, a, {
                            withCredentials: !0
                        })
                    },
                    getUniverseThumbnails: function(e, t, n, r) {
                        return wr.v1GamesMultigetThumbnailsGet(e, 1, !0, t, n, r, {
                            withCredentials: !0
                        }).then(function(e) {
                            var t = e.data,
                                n = e.status,
                                r = e.statusText,
                                a = e.headers,
                                e = e.request;
                            return {
                                data: {
                                    data: null === (t = null == t ? void 0 : t.data) || void 0 === t ? void 0 : t.map(function(e) {
                                        var t = null === (t = e.thumbnails) || void 0 === t ? void 0 : t[0];
                                        return {
                                            targetId: e.universeId,
                                            state: null == t ? void 0 : t.state,
                                            imageUrl: null == t ? void 0 : t.imageUrl
                                        }
                                    })
                                },
                                status: n,
                                statusText: r,
                                headers: a,
                                request: e
                            }
                        })
                    },
                    getAllUniverseThumbnails: function(e, t, n, r, a) {
                        return void 0 === a && (a = 10), wr.v1GamesMultigetThumbnailsGet(e, a, !0, t, n, r, {
                            withCredentials: !0
                        })
                    },
                    getGamePassIcons: function(e, t, n, r) {
                        return Cr.v1GamePassesGet(e, t, n, r, {
                            withCredentials: !0
                        })
                    },
                    getThumbnailsByThumbnailIds: function(e, t, n, r, a) {
                        return wr.v1GamesUniverseIdThumbnailsGet(e, t, n, r, a, {
                            withCredentials: !0
                        })
                    },
                    getPlacesGameIcons: function(e, t, n, r, a) {
                        var o = {
                            url: Pr + "/v1/places/gameicons",
                            withCredentials: !0,
                            retryable: !0
                        };
                        return m.get(o, {
                            placeIds: e,
                            returnPolicy: t,
                            size: n,
                            format: r,
                            isCircular: a
                        })
                    },
                    ReturnPolicy: Lr,
                    Size: Rr,
                    GameThumbnailSize: Br,
                    FileType: Wr
                },
                qr = new G,
                xe = {
                    getMetadata: function() {
                        return qr.v1TranslationAnalyticsMetadataGet({
                            withCredentials: !0
                        })
                    },
                    requestReport: function(e, t, n, r, a) {
                        a = {
                            startDateTime: t,
                            endDateTime: n,
                            reportType: r,
                            reportSubjectTargetId: a
                        };
                        return qr.v1TranslationAnalyticsGamesGameIdRequestTranslationAnalyticsReportPost(e, a, {
                            withCredentials: !0
                        })
                    },
                    downloadReport: function(e, t, n, r, a) {
                        return qr.v1TranslationAnalyticsGamesGameIdDownloadTranslationAnalyticsReportGet(e, t, n, r, a, {
                            withCredentials: !0,
                            responseType: "arraybuffer"
                        })
                    }
                },
                Lr = (Tr = function(e, t) {
                    return (Tr = Object.setPrototypeOf || {
                            __proto__: []
                        }
                        instanceof Array && function(e, t) {
                            e.__proto__ = t
                        } || function(e, t) {
                            for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n])
                        })(e, t)
                }, function(e, t) {
                    if ("function" != typeof t && null !== t) throw new TypeError("Class extends value " + String(t) + " is not a constructor or null");

                    function n() {
                        this.constructor = e
                    }
                    Tr(e, t), e.prototype = null === t ? Object.create(t) : (n.prototype = t.prototype, new n)
                }),
                Sr = i.EnvironmentUrls.gamesApi.replace(/\/+$/, ""),
                Ur = ",",
                Rr = function(e, t, n) {
                    void 0 === t && (t = Sr), void 0 === n && (n = b), this.basePath = t, this.axios = n, e && (this.configuration = e, this.basePath = e.basePath || this.basePath)
                },
                Or = (Ar = Error, Lr(Dr, Ar), Dr);

            function Dr(e, t) {
                t = Ar.call(this, t) || this;
                return t.field = e, t.name = "RequiredError", t
            }
            var xr, Er, Br = (xr = function(e, t) {
                    return (xr = Object.setPrototypeOf || {
                            __proto__: []
                        }
                        instanceof Array && function(e, t) {
                            e.__proto__ = t
                        } || function(e, t) {
                            for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n])
                        })(e, t)
                }, function(e, t) {
                    if ("function" != typeof t && null !== t) throw new TypeError("Class extends value " + String(t) + " is not a constructor or null");

                    function n() {
                        this.constructor = e
                    }
                    xr(e, t), e.prototype = null === t ? Object.create(t) : (n.prototype = t.prototype, new n)
                }),
                Fr = function() {
                    return (Fr = Object.assign || function(e) {
                        for (var t, n = 1, r = arguments.length; n < r; n++)
                            for (var a in t = arguments[n]) Object.prototype.hasOwnProperty.call(t, a) && (e[a] = t[a]);
                        return e
                    }).apply(this, arguments)
                };

            function zr(o) {
                return {
                    v1GamesUniverseIdFavoritesCountGet: function(e, t) {
                        if (void 0 === t && (t = {}), null == e) throw new Or("universeId", "Required parameter universeId was null or undefined when calling v1GamesUniverseIdFavoritesCountGet.");
                        e = "/v1/games/{universeId}/favorites/count".replace("{universeId}", encodeURIComponent(String(e))), e = T.Qc(e, !0);
                        o && (n = o.baseOptions);
                        var n = Fr(Fr({
                            method: "GET"
                        }, n), t);
                        return e.query = Fr(Fr(Fr({}, e.query), {}), t.query), delete e.search, n.headers = Fr(Fr({}, {}), t.headers), {
                            url: T.WU(e),
                            options: n
                        }
                    },
                    v1GamesUniverseIdFavoritesGet: function(e, t) {
                        if (void 0 === t && (t = {}), null == e) throw new Or("universeId", "Required parameter universeId was null or undefined when calling v1GamesUniverseIdFavoritesGet.");
                        e = "/v1/games/{universeId}/favorites".replace("{universeId}", encodeURIComponent(String(e))), e = T.Qc(e, !0);
                        o && (n = o.baseOptions);
                        var n = Fr(Fr({
                            method: "GET"
                        }, n), t);
                        return e.query = Fr(Fr(Fr({}, e.query), {}), t.query), delete e.search, n.headers = Fr(Fr({}, {}), t.headers), {
                            url: T.WU(e),
                            options: n
                        }
                    },
                    v1GamesUniverseIdFavoritesPost: function(e, t, n) {
                        if (void 0 === n && (n = {}), null == e) throw new Or("universeId", "Required parameter universeId was null or undefined when calling v1GamesUniverseIdFavoritesPost.");
                        if (null == t) throw new Or("request", "Required parameter request was null or undefined when calling v1GamesUniverseIdFavoritesPost.");
                        var r = "/v1/games/{universeId}/favorites".replace("{universeId}", encodeURIComponent(String(e))),
                            e = T.Qc(r, !0);
                        o && (a = o.baseOptions);
                        var r = Fr(Fr({
                                method: "POST"
                            }, a), n),
                            a = {};
                        a["Content-Type"] = "application/json", e.query = Fr(Fr(Fr({}, e.query), {}), n.query), delete e.search, r.headers = Fr(Fr({}, a), n.headers);
                        return r.data = JSON.stringify(void 0 !== t ? t : {}), {
                            url: T.WU(e),
                            options: r
                        }
                    }
                }
            }

            function jr(a) {
                return {
                    v1GamesUniverseIdFavoritesCountGet: function(e, t) {
                        var n = zr(a).v1GamesUniverseIdFavoritesCountGet(e, t);
                        return function(e, t) {
                            void 0 === e && (e = b), void 0 === t && (t = Sr);
                            t = Fr(Fr({}, n.options), {
                                url: t + n.url
                            });
                            return e.request(t)
                        }
                    },
                    v1GamesUniverseIdFavoritesGet: function(e, t) {
                        var n = zr(a).v1GamesUniverseIdFavoritesGet(e, t);
                        return function(e, t) {
                            void 0 === e && (e = b), void 0 === t && (t = Sr);
                            t = Fr(Fr({}, n.options), {
                                url: t + n.url
                            });
                            return e.request(t)
                        }
                    },
                    v1GamesUniverseIdFavoritesPost: function(e, t, n) {
                        var r = zr(a).v1GamesUniverseIdFavoritesPost(e, t, n);
                        return function(e, t) {
                            void 0 === e && (e = b), void 0 === t && (t = Sr);
                            t = Fr(Fr({}, r.options), {
                                url: t + r.url
                            });
                            return e.request(t)
                        }
                    }
                }
            }

            function Nr() {
                return null !== Er && Er.apply(this, arguments) || this
            }

            function kr(s) {
                return {
                    v1GamesUniverseIdGamePassesGet: function(e, t, n, r, a) {
                        var i, o = (i = s, function(e, t, n, r, a) {
                            if (void 0 === a && (a = {}), null == e) throw new Or("universeId", "Required parameter universeId was null or undefined when calling v1GamesUniverseIdGamePassesGet.");
                            var o = "/v1/games/{universeId}/game-passes".replace("{universeId}", encodeURIComponent(String(e))),
                                e = T.Qc(o, !0);
                            i && (s = i.baseOptions);
                            var o = Fr(Fr({
                                    method: "GET"
                                }, s), a),
                                s = {};
                            return void 0 !== t && (s.sortOrder = t), void 0 !== n && (s.limit = n), void 0 !== r && (s.cursor = r), e.query = Fr(Fr(Fr({}, e.query), s), a.query), delete e.search, o.headers = Fr(Fr({}, {}), a.headers), {
                                url: T.WU(e),
                                options: o
                            }
                        }(e, t, n, r, a));
                        return function(e, t) {
                            void 0 === e && (e = b), void 0 === t && (t = Sr);
                            t = Fr(Fr({}, o.options), {
                                url: t + o.url
                            });
                            return e.request(t)
                        }
                    }
                }
            }(Wr = {}).GamesDefaultSorts = "GamesDefaultSorts", Wr.GamesAllSorts = "GamesAllSorts", Wr.HomeSorts = "HomeSorts", Wr.ChatSorts = "ChatSorts", Wr.UnifiedHomeSorts = "UnifiedHomeSorts", Wr.AbTestSorts = "AbTestSorts", Wr.GamesPageAbTestSorts1 = "GamesPageAbTestSorts1", Wr.GamesPageAbTestSorts2 = "GamesPageAbTestSorts2", (G = {}).MorphToR6 = "MorphToR6", G.PlayerChoice = "PlayerChoice", G.MorphToR15 = "MorphToR15", (Lr = {}).UnplayableOtherReason = "UnplayableOtherReason", Lr.Playable = "Playable", Lr.GuestProhibited = "GuestProhibited", Lr.GameUnapproved = "GameUnapproved", Lr.IncorrectConfiguration = "IncorrectConfiguration", Lr.UniverseRootPlaceIsPrivate = "UniverseRootPlaceIsPrivate", Lr.InsufficientPermissionFriendsOnly = "InsufficientPermissionFriendsOnly", Lr.InsufficientPermissionGroupOnly = "InsufficientPermissionGroupOnly", Lr.DeviceRestricted = "DeviceRestricted", Lr.UnderReview = "UnderReview", Lr.PurchaseRequired = "PurchaseRequired", Lr.AccountRestricted = "AccountRestricted", Lr.TemporarilyUnavailable = "TemporarilyUnavailable", (Wr = {}).Facebook = "Facebook", Wr.Twitter = "Twitter", Wr.YouTube = "YouTube", Wr.Twitch = "Twitch", Wr.GooglePlus = "GooglePlus", Wr.Discord = "Discord", Wr.RobloxGroup = "RobloxGroup", Wr.Amazon = "Amazon", (G = {}).Asc = "Asc", G.Desc = "Desc", (Lr = {}).Forward = "Forward", Lr.Backward = "Backward", Br(Nr, Er = Rr), Nr.prototype.v1GamesUniverseIdFavoritesCountGet = function(e, t) {
                return jr(this.configuration).v1GamesUniverseIdFavoritesCountGet(e, t)(this.axios, this.basePath)
            }, Nr.prototype.v1GamesUniverseIdFavoritesGet = function(e, t) {
                return jr(this.configuration).v1GamesUniverseIdFavoritesGet(e, t)(this.axios, this.basePath)
            }, Nr.prototype.v1GamesUniverseIdFavoritesPost = function(e, t, n) {
                return jr(this.configuration).v1GamesUniverseIdFavoritesPost(e, t, n)(this.axios, this.basePath)
            };
            var _r, Wr = (Br(Mr, _r = Rr), Mr.prototype.v1GamesUniverseIdGamePassesGet = function(e, t, n, r, a) {
                return kr(this.configuration).v1GamesUniverseIdGamePassesGet(e, t, n, r, a)(this.axios, this.basePath)
            }, Mr);

            function Mr() {
                return null !== _r && _r.apply(this, arguments) || this
            }

            function Qr(G) {
                return {
                    v1GamesGameThumbnailGet: function(e, t, n, r) {
                        if (void 0 === r && (r = {}), null == e) throw new Or("imageToken", "Required parameter imageToken was null or undefined when calling v1GamesGameThumbnailGet.");
                        var a = T.Qc("/v1/games/game-thumbnail", !0);
                        G && (s = G.baseOptions);
                        var o = Fr(Fr({
                                method: "GET"
                            }, s), r),
                            s = {};
                        return void 0 !== e && (s.imageToken = e), void 0 !== t && (s.height = t), void 0 !== n && (s.width = n), a.query = Fr(Fr(Fr({}, a.query), s), r.query), delete a.search, o.headers = Fr(Fr({}, {}), r.headers), {
                            url: T.WU(a),
                            options: o
                        }
                    },
                    v1GamesGameThumbnailsGet: function(e, t, n, r) {
                        if (void 0 === r && (r = {}), null == e) throw new Or("imageTokens", "Required parameter imageTokens was null or undefined when calling v1GamesGameThumbnailsGet.");
                        var a = T.Qc("/v1/games/game-thumbnails", !0);
                        G && (s = G.baseOptions);
                        var o = Fr(Fr({
                                method: "GET"
                            }, s), r),
                            s = {};
                        return e && (s.imageTokens = e), void 0 !== t && (s.height = t), void 0 !== n && (s.width = n), a.query = Fr(Fr(Fr({}, a.query), s), r.query), delete a.search, o.headers = Fr(Fr({}, {}), r.headers), {
                            url: T.WU(a),
                            options: o
                        }
                    },
                    v1GamesGamesProductInfoGet: function(e, t) {
                        if (void 0 === t && (t = {}), null == e) throw new Or("universeIds", "Required parameter universeIds was null or undefined when calling v1GamesGamesProductInfoGet.");
                        var n = T.Qc("/v1/games/games-product-info", !0);
                        G && (a = G.baseOptions);
                        var r = Fr(Fr({
                                method: "GET"
                            }, a), t),
                            a = {};
                        return e && (a.universeIds = e.join(Ur)), n.query = Fr(Fr(Fr({}, n.query), a), t.query), delete n.search, r.headers = Fr(Fr({}, {}), t.headers), {
                            url: T.WU(n),
                            options: r
                        }
                    },
                    v1GamesGet: function(e, t) {
                        if (void 0 === t && (t = {}), null == e) throw new Or("universeIds", "Required parameter universeIds was null or undefined when calling v1GamesGet.");
                        var n = T.Qc("/v1/games", !0);
                        G && (a = G.baseOptions);
                        var r = Fr(Fr({
                                method: "GET"
                            }, a), t),
                            a = {};
                        return e && (a.universeIds = e.join(Ur)), n.query = Fr(Fr(Fr({}, n.query), a), t.query), delete n.search, r.headers = Fr(Fr({}, {}), t.headers), {
                            url: T.WU(n),
                            options: r
                        }
                    },
                    v1GamesListGet: function(e, t, n, r, a, o, s, i, u, c, l, d, h, v, p, f) {
                        void 0 === f && (f = {});
                        var m = T.Qc("/v1/games/list", !0);
                        G && (y = G.baseOptions);
                        var g = Fr(Fr({
                                method: "GET"
                            }, y), f),
                            y = {};
                        return void 0 !== e && (y["model.sortToken"] = e), void 0 !== t && (y["model.gameFilter"] = t), void 0 !== n && (y["model.timeFilter"] = n), void 0 !== r && (y["model.genreFilter"] = r), void 0 !== a && (y["model.exclusiveStartId"] = a), void 0 !== o && (y["model.sortOrder"] = o), void 0 !== s && (y["model.gameSetTargetId"] = s), void 0 !== i && (y["model.keyword"] = i), void 0 !== u && (y["model.startRows"] = u), void 0 !== c && (y["model.maxRows"] = c), void 0 !== l && (y["model.isKeywordSuggestionEnabled"] = l), void 0 !== d && (y["model.contextCountryRegionId"] = d), void 0 !== h && (y["model.contextUniverseId"] = h), void 0 !== v && (y["model.pageId"] = v), void 0 !== p && (y["model.sortPosition"] = p), m.query = Fr(Fr(Fr({}, m.query), y), f.query), delete m.search, g.headers = Fr(Fr({}, {}), f.headers), {
                            url: T.WU(m),
                            options: g
                        }
                    },
                    v1GamesMultigetPlaceDetailsGet: function(e, t) {
                        if (void 0 === t && (t = {}), null == e) throw new Or("placeIds", "Required parameter placeIds was null or undefined when calling v1GamesMultigetPlaceDetailsGet.");
                        var n = T.Qc("/v1/games/multiget-place-details", !0);
                        G && (a = G.baseOptions);
                        var r = Fr(Fr({
                                method: "GET"
                            }, a), t),
                            a = {};
                        return e && (a.placeIds = e), n.query = Fr(Fr(Fr({}, n.query), a), t.query), delete n.search, r.headers = Fr(Fr({}, {}), t.headers), {
                            url: T.WU(n),
                            options: r
                        }
                    },
                    v1GamesMultigetPlayabilityStatusGet: function(e, t) {
                        if (void 0 === t && (t = {}), null == e) throw new Or("universeIds", "Required parameter universeIds was null or undefined when calling v1GamesMultigetPlayabilityStatusGet.");
                        var n = T.Qc("/v1/games/multiget-playability-status", !0);
                        G && (a = G.baseOptions);
                        var r = Fr(Fr({
                                method: "GET"
                            }, a), t),
                            a = {};
                        return e && (a.universeIds = e.join(Ur)), n.query = Fr(Fr(Fr({}, n.query), a), t.query), delete n.search, r.headers = Fr(Fr({}, {}), t.headers), {
                            url: T.WU(n),
                            options: r
                        }
                    },
                    v1GamesPlaceIdServersServerTypeGet: function(e, t, n, r, a, o) {
                        if (void 0 === o && (o = {}), null == e) throw new Or("placeId", "Required parameter placeId was null or undefined when calling v1GamesPlaceIdServersServerTypeGet.");
                        if (null == t) throw new Or("serverType", "Required parameter serverType was null or undefined when calling v1GamesPlaceIdServersServerTypeGet.");
                        e = "/v1/games/{placeId}/servers/{serverType}".replace("{placeId}", encodeURIComponent(String(e))).replace("{serverType}", encodeURIComponent(String(t))), t = T.Qc(e, !0);
                        G && (s = G.baseOptions);
                        var e = Fr(Fr({
                                method: "GET"
                            }, s), o),
                            s = {};
                        return void 0 !== n && (s.sortOrder = n), void 0 !== r && (s.limit = r), void 0 !== a && (s.cursor = a), t.query = Fr(Fr(Fr({}, t.query), s), o.query), delete t.search, e.headers = Fr(Fr({}, {}), o.headers), {
                            url: T.WU(t),
                            options: e
                        }
                    },
                    v1GamesPlacesPlaceIdMetadataPost: function(e, t, n) {
                        if (void 0 === n && (n = {}), null == e) throw new Or("placeId", "Required parameter placeId was null or undefined when calling v1GamesPlacesPlaceIdMetadataPost.");
                        if (null == t) throw new Or("request", "Required parameter request was null or undefined when calling v1GamesPlacesPlaceIdMetadataPost.");
                        var r = "/v1/games/places/{placeId}/metadata".replace("{placeId}", encodeURIComponent(String(e))),
                            e = T.Qc(r, !0);
                        G && (a = G.baseOptions);
                        var r = Fr(Fr({
                                method: "POST"
                            }, a), n),
                            a = {};
                        a["Content-Type"] = "application/json", e.query = Fr(Fr(Fr({}, e.query), {}), n.query), delete e.search, r.headers = Fr(Fr({}, a), n.headers);
                        return r.data = JSON.stringify(void 0 !== t ? t : {}), {
                            url: T.WU(e),
                            options: r
                        }
                    },
                    v1GamesRecommendationsAlgorithmAlgorithmNameGet: function(e, t, n, r) {
                        if (void 0 === r && (r = {}), null == e) throw new Or("algorithmName", "Required parameter algorithmName was null or undefined when calling v1GamesRecommendationsAlgorithmAlgorithmNameGet.");
                        var a = "/v1/games/recommendations/algorithm/{algorithmName}".replace("{algorithmName}", encodeURIComponent(String(e))),
                            e = T.Qc(a, !0);
                        G && (o = G.baseOptions);
                        var a = Fr(Fr({
                                method: "GET"
                            }, o), r),
                            o = {};
                        return void 0 !== t && (o["model.paginationKey"] = t), void 0 !== n && (o["model.maxRows"] = n), e.query = Fr(Fr(Fr({}, e.query), o), r.query), delete e.search, a.headers = Fr(Fr({}, {}), r.headers), {
                            url: T.WU(e),
                            options: a
                        }
                    },
                    v1GamesRecommendationsGameUniverseIdGet: function(e, t, n, r) {
                        if (void 0 === r && (r = {}), null == e) throw new Or("universeId", "Required parameter universeId was null or undefined when calling v1GamesRecommendationsGameUniverseIdGet.");
                        var a = "/v1/games/recommendations/game/{universeId}".replace("{universeId}", encodeURIComponent(String(e))),
                            e = T.Qc(a, !0);
                        G && (o = G.baseOptions);
                        var a = Fr(Fr({
                                method: "GET"
                            }, o), r),
                            o = {};
                        return void 0 !== t && (o["model.paginationKey"] = t), void 0 !== n && (o["model.maxRows"] = n), e.query = Fr(Fr(Fr({}, e.query), o), r.query), delete e.search, a.headers = Fr(Fr({}, {}), r.headers), {
                            url: T.WU(e),
                            options: a
                        }
                    },
                    v1GamesSortsGet: function(e, t) {
                        void 0 === t && (t = {});
                        var n = T.Qc("/v1/games/sorts", !0);
                        G && (a = G.baseOptions);
                        var r = Fr(Fr({
                                method: "GET"
                            }, a), t),
                            a = {};
                        return void 0 !== e && (a["model.gameSortsContext"] = e), n.query = Fr(Fr(Fr({}, n.query), a), t.query), delete n.search, r.headers = Fr(Fr({}, {}), t.headers), {
                            url: T.WU(n),
                            options: r
                        }
                    },
                    v1GamesUniverseIdIconGet: function(e, t) {
                        if (void 0 === t && (t = {}), null == e) throw new Or("universeId", "Required parameter universeId was null or undefined when calling v1GamesUniverseIdIconGet.");
                        e = "/v1/games/{universeId}/icon".replace("{universeId}", encodeURIComponent(String(e))), e = T.Qc(e, !0);
                        G && (n = G.baseOptions);
                        var n = Fr(Fr({
                            method: "GET"
                        }, n), t);
                        return e.query = Fr(Fr(Fr({}, e.query), {}), t.query), delete e.search, n.headers = Fr(Fr({}, {}), t.headers), {
                            url: T.WU(e),
                            options: n
                        }
                    },
                    v1GamesUniverseIdMediaGet: function(e, t) {
                        if (void 0 === t && (t = {}), null == e) throw new Or("universeId", "Required parameter universeId was null or undefined when calling v1GamesUniverseIdMediaGet.");
                        e = "/v1/games/{universeId}/media".replace("{universeId}", encodeURIComponent(String(e))), e = T.Qc(e, !0);
                        G && (n = G.baseOptions);
                        var n = Fr(Fr({
                            method: "GET"
                        }, n), t);
                        return e.query = Fr(Fr(Fr({}, e.query), {}), t.query), delete e.search, n.headers = Fr(Fr({}, {}), t.headers), {
                            url: T.WU(e),
                            options: n
                        }
                    }
                }
            }

            function Hr(g) {
                return {
                    v1GamesGameThumbnailGet: function(e, t, n, r) {
                        var a = Qr(g).v1GamesGameThumbnailGet(e, t, n, r);
                        return function(e, t) {
                            void 0 === e && (e = b), void 0 === t && (t = Sr);
                            t = Fr(Fr({}, a.options), {
                                url: t + a.url
                            });
                            return e.request(t)
                        }
                    },
                    v1GamesGameThumbnailsGet: function(e, t, n, r) {
                        var a = Qr(g).v1GamesGameThumbnailsGet(e, t, n, r);
                        return function(e, t) {
                            void 0 === e && (e = b), void 0 === t && (t = Sr);
                            t = Fr(Fr({}, a.options), {
                                url: t + a.url
                            });
                            return e.request(t)
                        }
                    },
                    v1GamesGamesProductInfoGet: function(e, t) {
                        var n = Qr(g).v1GamesGamesProductInfoGet(e, t);
                        return function(e, t) {
                            void 0 === e && (e = b), void 0 === t && (t = Sr);
                            t = Fr(Fr({}, n.options), {
                                url: t + n.url
                            });
                            return e.request(t)
                        }
                    },
                    v1GamesGet: function(e, t) {
                        var n = Qr(g).v1GamesGet(e, t);
                        return function(e, t) {
                            void 0 === e && (e = b), void 0 === t && (t = Sr);
                            t = Fr(Fr({}, n.options), {
                                url: t + n.url
                            });
                            return e.request(t)
                        }
                    },
                    v1GamesListGet: function(e, t, n, r, a, o, s, i, u, c, l, d, h, v, p, f) {
                        var m = Qr(g).v1GamesListGet(e, t, n, r, a, o, s, i, u, c, l, d, h, v, p, f);
                        return function(e, t) {
                            void 0 === e && (e = b), void 0 === t && (t = Sr);
                            t = Fr(Fr({}, m.options), {
                                url: t + m.url
                            });
                            return e.request(t)
                        }
                    },
                    v1GamesMultigetPlaceDetailsGet: function(e, t) {
                        var n = Qr(g).v1GamesMultigetPlaceDetailsGet(e, t);
                        return function(e, t) {
                            void 0 === e && (e = b), void 0 === t && (t = Sr);
                            t = Fr(Fr({}, n.options), {
                                url: t + n.url
                            });
                            return e.request(t)
                        }
                    },
                    v1GamesMultigetPlayabilityStatusGet: function(e, t) {
                        var n = Qr(g).v1GamesMultigetPlayabilityStatusGet(e, t);
                        return function(e, t) {
                            void 0 === e && (e = b), void 0 === t && (t = Sr);
                            t = Fr(Fr({}, n.options), {
                                url: t + n.url
                            });
                            return e.request(t)
                        }
                    },
                    v1GamesPlaceIdServersServerTypeGet: function(e, t, n, r, a, o) {
                        var s = Qr(g).v1GamesPlaceIdServersServerTypeGet(e, t, n, r, a, o);
                        return function(e, t) {
                            void 0 === e && (e = b), void 0 === t && (t = Sr);
                            t = Fr(Fr({}, s.options), {
                                url: t + s.url
                            });
                            return e.request(t)
                        }
                    },
                    v1GamesPlacesPlaceIdMetadataPost: function(e, t, n) {
                        var r = Qr(g).v1GamesPlacesPlaceIdMetadataPost(e, t, n);
                        return function(e, t) {
                            void 0 === e && (e = b), void 0 === t && (t = Sr);
                            t = Fr(Fr({}, r.options), {
                                url: t + r.url
                            });
                            return e.request(t)
                        }
                    },
                    v1GamesRecommendationsAlgorithmAlgorithmNameGet: function(e, t, n, r) {
                        var a = Qr(g).v1GamesRecommendationsAlgorithmAlgorithmNameGet(e, t, n, r);
                        return function(e, t) {
                            void 0 === e && (e = b), void 0 === t && (t = Sr);
                            t = Fr(Fr({}, a.options), {
                                url: t + a.url
                            });
                            return e.request(t)
                        }
                    },
                    v1GamesRecommendationsGameUniverseIdGet: function(e, t, n, r) {
                        var a = Qr(g).v1GamesRecommendationsGameUniverseIdGet(e, t, n, r);
                        return function(e, t) {
                            void 0 === e && (e = b), void 0 === t && (t = Sr);
                            t = Fr(Fr({}, a.options), {
                                url: t + a.url
                            });
                            return e.request(t)
                        }
                    },
                    v1GamesSortsGet: function(e, t) {
                        var n = Qr(g).v1GamesSortsGet(e, t);
                        return function(e, t) {
                            void 0 === e && (e = b), void 0 === t && (t = Sr);
                            t = Fr(Fr({}, n.options), {
                                url: t + n.url
                            });
                            return e.request(t)
                        }
                    },
                    v1GamesUniverseIdIconGet: function(e, t) {
                        var n = Qr(g).v1GamesUniverseIdIconGet(e, t);
                        return function(e, t) {
                            void 0 === e && (e = b), void 0 === t && (t = Sr);
                            t = Fr(Fr({}, n.options), {
                                url: t + n.url
                            });
                            return e.request(t)
                        }
                    },
                    v1GamesUniverseIdMediaGet: function(e, t) {
                        var n = Qr(g).v1GamesUniverseIdMediaGet(e, t);
                        return function(e, t) {
                            void 0 === e && (e = b), void 0 === t && (t = Sr);
                            t = Fr(Fr({}, n.options), {
                                url: t + n.url
                            });
                            return e.request(t)
                        }
                    }
                }
            }
            var Vr, Jr, Kr, $r, G = (Br(Xr, Vr = Rr), Xr.prototype.v1GamesGameThumbnailGet = function(e, t, n, r) {
                return Hr(this.configuration).v1GamesGameThumbnailGet(e, t, n, r)(this.axios, this.basePath)
            }, Xr.prototype.v1GamesGameThumbnailsGet = function(e, t, n, r) {
                return Hr(this.configuration).v1GamesGameThumbnailsGet(e, t, n, r)(this.axios, this.basePath)
            }, Xr.prototype.v1GamesGamesProductInfoGet = function(e, t) {
                return Hr(this.configuration).v1GamesGamesProductInfoGet(e, t)(this.axios, this.basePath)
            }, Xr.prototype.v1GamesGet = function(e, t) {
                return Hr(this.configuration).v1GamesGet(e, t)(this.axios, this.basePath)
            }, Xr.prototype.v1GamesListGet = function(e, t, n, r, a, o, s, i, u, c, l, d, h, v, p, f) {
                return Hr(this.configuration).v1GamesListGet(e, t, n, r, a, o, s, i, u, c, l, d, h, v, p, f)(this.axios, this.basePath)
            }, Xr.prototype.v1GamesMultigetPlaceDetailsGet = function(e, t) {
                return Hr(this.configuration).v1GamesMultigetPlaceDetailsGet(e, t)(this.axios, this.basePath)
            }, Xr.prototype.v1GamesMultigetPlayabilityStatusGet = function(e, t) {
                return Hr(this.configuration).v1GamesMultigetPlayabilityStatusGet(e, t)(this.axios, this.basePath)
            }, Xr.prototype.v1GamesPlaceIdServersServerTypeGet = function(e, t, n, r, a, o) {
                return Hr(this.configuration).v1GamesPlaceIdServersServerTypeGet(e, t, n, r, a, o)(this.axios, this.basePath)
            }, Xr.prototype.v1GamesPlacesPlaceIdMetadataPost = function(e, t, n) {
                return Hr(this.configuration).v1GamesPlacesPlaceIdMetadataPost(e, t, n)(this.axios, this.basePath)
            }, Xr.prototype.v1GamesRecommendationsAlgorithmAlgorithmNameGet = function(e, t, n, r) {
                return Hr(this.configuration).v1GamesRecommendationsAlgorithmAlgorithmNameGet(e, t, n, r)(this.axios, this.basePath)
            }, Xr.prototype.v1GamesRecommendationsGameUniverseIdGet = function(e, t, n, r) {
                return Hr(this.configuration).v1GamesRecommendationsGameUniverseIdGet(e, t, n, r)(this.axios, this.basePath)
            }, Xr.prototype.v1GamesSortsGet = function(e, t) {
                return Hr(this.configuration).v1GamesSortsGet(e, t)(this.axios, this.basePath)
            }, Xr.prototype.v1GamesUniverseIdIconGet = function(e, t) {
                return Hr(this.configuration).v1GamesUniverseIdIconGet(e, t)(this.axios, this.basePath)
            }, Xr.prototype.v1GamesUniverseIdMediaGet = function(e, t) {
                return Hr(this.configuration).v1GamesUniverseIdMediaGet(e, t)(this.axios, this.basePath)
            }, Xr);

            function Xr() {
                return null !== Vr && Vr.apply(this, arguments) || this
            }

            function Yr(a) {
                return {
                    v1GamesUniverseIdSocialLinksListGet: function(e, t) {
                        var r, n = (r = a, function(e, t) {
                            if (void 0 === t && (t = {}), null == e) throw new Or("universeId", "Required parameter universeId was null or undefined when calling v1GamesUniverseIdSocialLinksListGet.");
                            e = "/v1/games/{universeId}/social-links/list".replace("{universeId}", encodeURIComponent(String(e))), e = T.Qc(e, !0);
                            r && (n = r.baseOptions);
                            var n = Fr(Fr({
                                method: "GET"
                            }, n), t);
                            return e.query = Fr(Fr(Fr({}, e.query), {}), t.query), delete e.search, n.headers = Fr(Fr({}, {}), t.headers), {
                                url: T.WU(e),
                                options: n
                            }
                        }(e, t));
                        return function(e, t) {
                            void 0 === e && (e = b), void 0 === t && (t = Sr);
                            t = Fr(Fr({}, n.options), {
                                url: t + n.url
                            });
                            return e.request(t)
                        }
                    }
                }
            }

            function Zr() {
                return null !== Jr && Jr.apply(this, arguments) || this
            }

            function ea(o) {
                return {
                    v1GamesVipServersUniverseIdPost: function(e, t, n) {
                        if (void 0 === n && (n = {}), null == e) throw new Or("universeId", "Required parameter universeId was null or undefined when calling v1GamesVipServersUniverseIdPost.");
                        if (null == t) throw new Or("requestBody", "Required parameter requestBody was null or undefined when calling v1GamesVipServersUniverseIdPost.");
                        var r = "/v1/games/vip-servers/{universeId}".replace("{universeId}", encodeURIComponent(String(e))),
                            e = T.Qc(r, !0);
                        o && (a = o.baseOptions);
                        var r = Fr(Fr({
                                method: "POST"
                            }, a), n),
                            a = {};
                        a["Content-Type"] = "application/json", e.query = Fr(Fr(Fr({}, e.query), {}), n.query), delete e.search, r.headers = Fr(Fr({}, a), n.headers);
                        return r.data = JSON.stringify(void 0 !== t ? t : {}), {
                            url: T.WU(e),
                            options: r
                        }
                    },
                    v1VipServersIdGet: function(e, t) {
                        if (void 0 === t && (t = {}), null == e) throw new Or("id", "Required parameter id was null or undefined when calling v1VipServersIdGet.");
                        e = "/v1/vip-servers/{id}".replace("{id}", encodeURIComponent(String(e))), e = T.Qc(e, !0);
                        o && (n = o.baseOptions);
                        var n = Fr(Fr({
                            method: "GET"
                        }, n), t);
                        return e.query = Fr(Fr(Fr({}, e.query), {}), t.query), delete e.search, n.headers = Fr(Fr({}, {}), t.headers), {
                            url: T.WU(e),
                            options: n
                        }
                    },
                    v1VipServersIdPatch: function(e, t, n) {
                        if (void 0 === n && (n = {}), null == e) throw new Or("id", "Required parameter id was null or undefined when calling v1VipServersIdPatch.");
                        if (null == t) throw new Or("request", "Required parameter request was null or undefined when calling v1VipServersIdPatch.");
                        var r = "/v1/vip-servers/{id}".replace("{id}", encodeURIComponent(String(e))),
                            e = T.Qc(r, !0);
                        o && (a = o.baseOptions);
                        var r = Fr(Fr({
                                method: "PATCH"
                            }, a), n),
                            a = {};
                        a["Content-Type"] = "application/json", e.query = Fr(Fr(Fr({}, e.query), {}), n.query), delete e.search, r.headers = Fr(Fr({}, a), n.headers);
                        return r.data = JSON.stringify(void 0 !== t ? t : {}), {
                            url: T.WU(e),
                            options: r
                        }
                    },
                    v1VipServersIdPermissionsPatch: function(e, t, n) {
                        if (void 0 === n && (n = {}), null == e) throw new Or("id", "Required parameter id was null or undefined when calling v1VipServersIdPermissionsPatch.");
                        if (null == t) throw new Or("request", "Required parameter request was null or undefined when calling v1VipServersIdPermissionsPatch.");
                        var r = "/v1/vip-servers/{id}/permissions".replace("{id}", encodeURIComponent(String(e))),
                            e = T.Qc(r, !0);
                        o && (a = o.baseOptions);
                        var r = Fr(Fr({
                                method: "PATCH"
                            }, a), n),
                            a = {};
                        a["Content-Type"] = "application/json", e.query = Fr(Fr(Fr({}, e.query), {}), n.query), delete e.search, r.headers = Fr(Fr({}, a), n.headers);
                        return r.data = JSON.stringify(void 0 !== t ? t : {}), {
                            url: T.WU(e),
                            options: r
                        }
                    },
                    v1VipServersIdSubscriptionPatch: function(e, t, n) {
                        if (void 0 === n && (n = {}), null == e) throw new Or("id", "Required parameter id was null or undefined when calling v1VipServersIdSubscriptionPatch.");
                        if (null == t) throw new Or("request", "Required parameter request was null or undefined when calling v1VipServersIdSubscriptionPatch.");
                        var r = "/v1/vip-servers/{id}/subscription".replace("{id}", encodeURIComponent(String(e))),
                            e = T.Qc(r, !0);
                        o && (a = o.baseOptions);
                        var r = Fr(Fr({
                                method: "PATCH"
                            }, a), n),
                            a = {};
                        a["Content-Type"] = "application/json", e.query = Fr(Fr(Fr({}, e.query), {}), n.query), delete e.search, r.headers = Fr(Fr({}, a), n.headers);
                        return r.data = JSON.stringify(void 0 !== t ? t : {}), {
                            url: T.WU(e),
                            options: r
                        }
                    }
                }
            }

            function ta(a) {
                return {
                    v1GamesVipServersUniverseIdPost: function(e, t, n) {
                        var r = ea(a).v1GamesVipServersUniverseIdPost(e, t, n);
                        return function(e, t) {
                            void 0 === e && (e = b), void 0 === t && (t = Sr);
                            t = Fr(Fr({}, r.options), {
                                url: t + r.url
                            });
                            return e.request(t)
                        }
                    },
                    v1VipServersIdGet: function(e, t) {
                        var n = ea(a).v1VipServersIdGet(e, t);
                        return function(e, t) {
                            void 0 === e && (e = b), void 0 === t && (t = Sr);
                            t = Fr(Fr({}, n.options), {
                                url: t + n.url
                            });
                            return e.request(t)
                        }
                    },
                    v1VipServersIdPatch: function(e, t, n) {
                        var r = ea(a).v1VipServersIdPatch(e, t, n);
                        return function(e, t) {
                            void 0 === e && (e = b), void 0 === t && (t = Sr);
                            t = Fr(Fr({}, r.options), {
                                url: t + r.url
                            });
                            return e.request(t)
                        }
                    },
                    v1VipServersIdPermissionsPatch: function(e, t, n) {
                        var r = ea(a).v1VipServersIdPermissionsPatch(e, t, n);
                        return function(e, t) {
                            void 0 === e && (e = b), void 0 === t && (t = Sr);
                            t = Fr(Fr({}, r.options), {
                                url: t + r.url
                            });
                            return e.request(t)
                        }
                    },
                    v1VipServersIdSubscriptionPatch: function(e, t, n) {
                        var r = ea(a).v1VipServersIdSubscriptionPatch(e, t, n);
                        return function(e, t) {
                            void 0 === e && (e = b), void 0 === t && (t = Sr);
                            t = Fr(Fr({}, r.options), {
                                url: t + r.url
                            });
                            return e.request(t)
                        }
                    }
                }
            }

            function na() {
                return null !== Kr && Kr.apply(this, arguments) || this
            }

            function ra(o) {
                return {
                    v1GamesUniverseIdUserVotesPatch: function(e, t, n) {
                        if (void 0 === n && (n = {}), null == e) throw new Or("universeId", "Required parameter universeId was null or undefined when calling v1GamesUniverseIdUserVotesPatch.");
                        if (null == t) throw new Or("requestBody", "Required parameter requestBody was null or undefined when calling v1GamesUniverseIdUserVotesPatch.");
                        var r = "/v1/games/{universeId}/user-votes".replace("{universeId}", encodeURIComponent(String(e))),
                            e = T.Qc(r, !0);
                        o && (a = o.baseOptions);
                        var r = Fr(Fr({
                                method: "PATCH"
                            }, a), n),
                            a = {};
                        a["Content-Type"] = "application/json", e.query = Fr(Fr(Fr({}, e.query), {}), n.query), delete e.search, r.headers = Fr(Fr({}, a), n.headers);
                        return r.data = JSON.stringify(void 0 !== t ? t : {}), {
                            url: T.WU(e),
                            options: r
                        }
                    },
                    v1GamesUniverseIdVotesGet: function(e, t) {
                        if (void 0 === t && (t = {}), null == e) throw new Or("universeId", "Required parameter universeId was null or undefined when calling v1GamesUniverseIdVotesGet.");
                        e = "/v1/games/{universeId}/votes".replace("{universeId}", encodeURIComponent(String(e))), e = T.Qc(e, !0);
                        o && (n = o.baseOptions);
                        var n = Fr(Fr({
                            method: "GET"
                        }, n), t);
                        return e.query = Fr(Fr(Fr({}, e.query), {}), t.query), delete e.search, n.headers = Fr(Fr({}, {}), t.headers), {
                            url: T.WU(e),
                            options: n
                        }
                    },
                    v1GamesUniverseIdVotesUserGet: function(e, t) {
                        if (void 0 === t && (t = {}), null == e) throw new Or("universeId", "Required parameter universeId was null or undefined when calling v1GamesUniverseIdVotesUserGet.");
                        e = "/v1/games/{universeId}/votes/user".replace("{universeId}", encodeURIComponent(String(e))), e = T.Qc(e, !0);
                        o && (n = o.baseOptions);
                        var n = Fr(Fr({
                            method: "GET"
                        }, n), t);
                        return e.query = Fr(Fr(Fr({}, e.query), {}), t.query), delete e.search, n.headers = Fr(Fr({}, {}), t.headers), {
                            url: T.WU(e),
                            options: n
                        }
                    },
                    v1GamesVotesGet: function(e, t) {
                        if (void 0 === t && (t = {}), null == e) throw new Or("universeIds", "Required parameter universeIds was null or undefined when calling v1GamesVotesGet.");
                        var n = T.Qc("/v1/games/votes", !0);
                        o && (a = o.baseOptions);
                        var r = Fr(Fr({
                                method: "GET"
                            }, a), t),
                            a = {};
                        return e && (a.universeIds = e.join(Ur)), n.query = Fr(Fr(Fr({}, n.query), a), t.query), delete n.search, r.headers = Fr(Fr({}, {}), t.headers), {
                            url: T.WU(n),
                            options: r
                        }
                    }
                }
            }

            function aa(a) {
                return {
                    v1GamesUniverseIdUserVotesPatch: function(e, t, n) {
                        var r = ra(a).v1GamesUniverseIdUserVotesPatch(e, t, n);
                        return function(e, t) {
                            void 0 === e && (e = b), void 0 === t && (t = Sr);
                            t = Fr(Fr({}, r.options), {
                                url: t + r.url
                            });
                            return e.request(t)
                        }
                    },
                    v1GamesUniverseIdVotesGet: function(e, t) {
                        var n = ra(a).v1GamesUniverseIdVotesGet(e, t);
                        return function(e, t) {
                            void 0 === e && (e = b), void 0 === t && (t = Sr);
                            t = Fr(Fr({}, n.options), {
                                url: t + n.url
                            });
                            return e.request(t)
                        }
                    },
                    v1GamesUniverseIdVotesUserGet: function(e, t) {
                        var n = ra(a).v1GamesUniverseIdVotesUserGet(e, t);
                        return function(e, t) {
                            void 0 === e && (e = b), void 0 === t && (t = Sr);
                            t = Fr(Fr({}, n.options), {
                                url: t + n.url
                            });
                            return e.request(t)
                        }
                    },
                    v1GamesVotesGet: function(e, t) {
                        var n = ra(a).v1GamesVotesGet(e, t);
                        return function(e, t) {
                            void 0 === e && (e = b), void 0 === t && (t = Sr);
                            t = Fr(Fr({}, n.options), {
                                url: t + n.url
                            });
                            return e.request(t)
                        }
                    }
                }
            }

            function oa() {
                return null !== $r && $r.apply(this, arguments) || this
            }
            Br(Zr, Jr = Rr), Zr.prototype.v1GamesUniverseIdSocialLinksListGet = function(e, t) {
                return Yr(this.configuration).v1GamesUniverseIdSocialLinksListGet(e, t)(this.axios, this.basePath)
            }, Br(na, Kr = Rr), na.prototype.v1GamesVipServersUniverseIdPost = function(e, t, n) {
                return ta(this.configuration).v1GamesVipServersUniverseIdPost(e, t, n)(this.axios, this.basePath)
            }, na.prototype.v1VipServersIdGet = function(e, t) {
                return ta(this.configuration).v1VipServersIdGet(e, t)(this.axios, this.basePath)
            }, na.prototype.v1VipServersIdPatch = function(e, t, n) {
                return ta(this.configuration).v1VipServersIdPatch(e, t, n)(this.axios, this.basePath)
            }, na.prototype.v1VipServersIdPermissionsPatch = function(e, t, n) {
                return ta(this.configuration).v1VipServersIdPermissionsPatch(e, t, n)(this.axios, this.basePath)
            }, na.prototype.v1VipServersIdSubscriptionPatch = function(e, t, n) {
                return ta(this.configuration).v1VipServersIdSubscriptionPatch(e, t, n)(this.axios, this.basePath)
            }, Br(oa, $r = Rr), oa.prototype.v1GamesUniverseIdUserVotesPatch = function(e, t, n) {
                return aa(this.configuration).v1GamesUniverseIdUserVotesPatch(e, t, n)(this.axios, this.basePath)
            }, oa.prototype.v1GamesUniverseIdVotesGet = function(e, t) {
                return aa(this.configuration).v1GamesUniverseIdVotesGet(e, t)(this.axios, this.basePath)
            }, oa.prototype.v1GamesUniverseIdVotesUserGet = function(e, t) {
                return aa(this.configuration).v1GamesUniverseIdVotesUserGet(e, t)(this.axios, this.basePath)
            }, oa.prototype.v1GamesVotesGet = function(e, t) {
                return aa(this.configuration).v1GamesVotesGet(e, t)(this.axios, this.basePath)
            };
            var sa, ia, Lr = (sa = function(e, t) {
                    return (sa = Object.setPrototypeOf || {
                            __proto__: []
                        }
                        instanceof Array && function(e, t) {
                            e.__proto__ = t
                        } || function(e, t) {
                            for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n])
                        })(e, t)
                }, function(e, t) {
                    if ("function" != typeof t && null !== t) throw new TypeError("Class extends value " + String(t) + " is not a constructor or null");

                    function n() {
                        this.constructor = e
                    }
                    sa(e, t), e.prototype = null === t ? Object.create(t) : (n.prototype = t.prototype, new n)
                }),
                ua = i.EnvironmentUrls.gamesApi.replace(/\/+$/, ""),
                Br = function(e, t, n) {
                    void 0 === t && (t = ua), void 0 === n && (n = b), this.basePath = t, this.axios = n, e && (this.configuration = e, this.basePath = e.basePath || this.basePath)
                },
                ca = (ia = Error, Lr(la, ia), la);

            function la(e, t) {
                t = ia.call(this, t) || this;
                return t.field = e, t.name = "RequiredError", t
            }

            function da(e, t, n) {
                if (null == n) throw new ca(t, "Required parameter " + t + " was null or undefined when calling " + e + ".")
            }

            function ha(e) {
                for (var t = [], n = 1; n < arguments.length; n++) t[n - 1] = arguments[n];
                for (var r = new URLSearchParams(e.search), a = 0, o = t; a < o.length; a++) {
                    var s, i = o[a];
                    for (s in i) r.set(s, i[s])
                }
                e.search = r.toString()
            }

            function va(e) {
                return e.pathname + e.search + e.hash
            }

            function pa(n, r, a, o) {
                return function(e, t) {
                    void 0 === e && (e = r), void 0 === t && (t = a);
                    t = ma(ma({}, n.options), {
                        url: ((null == o ? void 0 : o.basePath) || t) + n.url
                    });
                    return e.request(t)
                }
            }
            var fa, ma = function() {
                    return (ma = Object.assign || function(e) {
                        for (var t, n = 1, r = arguments.length; n < r; n++)
                            for (var a in t = arguments[n]) Object.prototype.hasOwnProperty.call(t, a) && (e[a] = t[a]);
                        return e
                    }).apply(this, arguments)
                },
                ga = "https://example.com",
                Rr = (fa = function(e, t) {
                    return (fa = Object.setPrototypeOf || {
                            __proto__: []
                        }
                        instanceof Array && function(e, t) {
                            e.__proto__ = t
                        } || function(e, t) {
                            for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n])
                        })(e, t)
                }, function(e, t) {
                    if ("function" != typeof t && null !== t) throw new TypeError("Class extends value " + String(t) + " is not a constructor or null");

                    function n() {
                        this.constructor = e
                    }
                    fa(e, t), e.prototype = null === t ? Object.create(t) : (n.prototype = t.prototype, new n)
                }),
                ya = function() {
                    return (ya = Object.assign || function(e) {
                        for (var t, n = 1, r = arguments.length; n < r; n++)
                            for (var a in t = arguments[n]) Object.prototype.hasOwnProperty.call(t, a) && (e[a] = t[a]);
                        return e
                    }).apply(this, arguments)
                },
                Ga = function(e, s, i, u) {
                    return new(i = i || Promise)(function(n, t) {
                        function r(e) {
                            try {
                                o(u.next(e))
                            } catch (e) {
                                t(e)
                            }
                        }

                        function a(e) {
                            try {
                                o(u.throw(e))
                            } catch (e) {
                                t(e)
                            }
                        }

                        function o(e) {
                            var t;
                            e.done ? n(e.value) : ((t = e.value) instanceof i ? t : new i(function(e) {
                                e(t)
                            })).then(r, a)
                        }
                        o((u = u.apply(e, s || [])).next())
                    })
                },
                Ia = function(n, r) {
                    var a, o, s, i = {
                            label: 0,
                            sent: function() {
                                if (1 & s[0]) throw s[1];
                                return s[1]
                            },
                            trys: [],
                            ops: []
                        },
                        e = {
                            next: t(0),
                            throw: t(1),
                            return: t(2)
                        };
                    return "function" == typeof Symbol && (e[Symbol.iterator] = function() {
                        return this
                    }), e;

                    function t(t) {
                        return function(e) {
                            return function(t) {
                                if (a) throw new TypeError("Generator is already executing.");
                                for (; i;) try {
                                    if (a = 1, o && (s = 2 & t[0] ? o.return : t[0] ? o.throw || ((s = o.return) && s.call(o), 0) : o.next) && !(s = s.call(o, t[1])).done) return s;
                                    switch (o = 0, s && (t = [2 & t[0], s.value]), t[0]) {
                                        case 0:
                                        case 1:
                                            s = t;
                                            break;
                                        case 4:
                                            return i.label++, {
                                                value: t[1],
                                                done: !1
                                            };
                                        case 5:
                                            i.label++, o = t[1], t = [0];
                                            continue;
                                        case 7:
                                            t = i.ops.pop(), i.trys.pop();
                                            continue;
                                        default:
                                            if (!(s = 0 < (s = i.trys).length && s[s.length - 1]) && (6 === t[0] || 2 === t[0])) {
                                                i = 0;
                                                continue
                                            }
                                            if (3 === t[0] && (!s || t[1] > s[0] && t[1] < s[3])) {
                                                i.label = t[1];
                                                break
                                            }
                                            if (6 === t[0] && i.label < s[1]) {
                                                i.label = s[1], s = t;
                                                break
                                            }
                                            if (s && i.label < s[2]) {
                                                i.label = s[2], i.ops.push(t);
                                                break
                                            }
                                            s[2] && i.ops.pop(), i.trys.pop();
                                            continue
                                    }
                                    t = r.call(n, i)
                                } catch (e) {
                                    t = [6, e], o = 0
                                } finally {
                                    a = s = 0
                                }
                                if (5 & t[0]) throw t[1];
                                return {
                                    value: t[0] ? t[1] : void 0,
                                    done: !0
                                }
                            }([t, e])
                        }
                    }
                };

            function ba(u) {
                var c = function(h) {
                    var e = this;
                    return {
                        v2GamesUniverseIdMediaGet: function(o, s) {
                            return void 0 === s && (s = {}), Ga(e, void 0, Promise, function() {
                                var t, n, r, a;
                                return Ia(this, function(e) {
                                    return da("v2GamesUniverseIdMediaGet", "universeId", o), r = "/v2/games/{universeId}/media".replace("{universeId}", encodeURIComponent(String(o))), t = new URL(r, ga), h && (a = h.baseOptions), n = ya(ya({
                                        method: "GET"
                                    }, a), s), r = {}, ha(t, {}, s.query), a = a && a.headers ? a.headers : {}, n.headers = ya(ya(ya({}, r), a), s.headers), [2, {
                                        url: va(t),
                                        options: n
                                    }]
                                })
                            })
                        },
                        v2GroupsGroupIdGamesGet: function(s, i, u, c, l, d) {
                            return void 0 === d && (d = {}), Ga(e, void 0, Promise, function() {
                                var t, n, r, a, o;
                                return Ia(this, function(e) {
                                    return da("v2GroupsGroupIdGamesGet", "groupId", s), a = "/v2/groups/{groupId}/games".replace("{groupId}", encodeURIComponent(String(s))), t = new URL(a, ga), h && (o = h.baseOptions), n = ya(ya({
                                        method: "GET"
                                    }, o), d), r = {}, a = {}, void 0 !== i && (a.accessFilter = i), void 0 !== u && (a.sortOrder = u), void 0 !== c && (a.limit = c), void 0 !== l && (a.cursor = l), ha(t, a, d.query), o = o && o.headers ? o.headers : {}, n.headers = ya(ya(ya({}, r), o), d.headers), [2, {
                                        url: va(t),
                                        options: n
                                    }]
                                })
                            })
                        },
                        v2GroupsGroupIdGamesV2Get: function(s, i, u, c, l, d) {
                            return void 0 === d && (d = {}), Ga(e, void 0, Promise, function() {
                                var t, n, r, a, o;
                                return Ia(this, function(e) {
                                    return da("v2GroupsGroupIdGamesV2Get", "groupId", s), a = "/v2/groups/{groupId}/gamesV2".replace("{groupId}", encodeURIComponent(String(s))), t = new URL(a, ga), h && (o = h.baseOptions), n = ya(ya({
                                        method: "GET"
                                    }, o), d), r = {}, a = {}, void 0 !== i && (a.accessFilter = i), void 0 !== u && (a.sortOrder = u), void 0 !== c && (a.limit = c), void 0 !== l && (a.cursor = l), ha(t, a, d.query), o = o && o.headers ? o.headers : {}, n.headers = ya(ya(ya({}, r), o), d.headers), [2, {
                                        url: va(t),
                                        options: n
                                    }]
                                })
                            })
                        },
                        v2UsersUserIdFavoriteGamesGet: function(s, i, u, c, l, d) {
                            return void 0 === d && (d = {}), Ga(e, void 0, Promise, function() {
                                var t, n, r, a, o;
                                return Ia(this, function(e) {
                                    return da("v2UsersUserIdFavoriteGamesGet", "userId", s), a = "/v2/users/{userId}/favorite/games".replace("{userId}", encodeURIComponent(String(s))), t = new URL(a, ga), h && (o = h.baseOptions), n = ya(ya({
                                        method: "GET"
                                    }, o), d), r = {}, a = {}, void 0 !== i && (a.accessFilter = i), void 0 !== u && (a.sortOrder = u), void 0 !== c && (a.limit = c), void 0 !== l && (a.cursor = l), ha(t, a, d.query), o = o && o.headers ? o.headers : {}, n.headers = ya(ya(ya({}, r), o), d.headers), [2, {
                                        url: va(t),
                                        options: n
                                    }]
                                })
                            })
                        },
                        v2UsersUserIdGamesGet: function(s, i, u, c, l, d) {
                            return void 0 === d && (d = {}), Ga(e, void 0, Promise, function() {
                                var t, n, r, a, o;
                                return Ia(this, function(e) {
                                    return da("v2UsersUserIdGamesGet", "userId", s), a = "/v2/users/{userId}/games".replace("{userId}", encodeURIComponent(String(s))), t = new URL(a, ga), h && (o = h.baseOptions), n = ya(ya({
                                        method: "GET"
                                    }, o), d), r = {}, a = {}, void 0 !== i && (a.accessFilter = i), void 0 !== u && (a.sortOrder = u), void 0 !== c && (a.limit = c), void 0 !== l && (a.cursor = l), ha(t, a, d.query), o = o && o.headers ? o.headers : {}, n.headers = ya(ya(ya({}, r), o), d.headers), [2, {
                                        url: va(t),
                                        options: n
                                    }]
                                })
                            })
                        }
                    }
                }(u);
                return {
                    v2GamesUniverseIdMediaGet: function(n, r) {
                        return Ga(this, void 0, Promise, function() {
                            var t;
                            return Ia(this, function(e) {
                                switch (e.label) {
                                    case 0:
                                        return [4, c.v2GamesUniverseIdMediaGet(n, r)];
                                    case 1:
                                        return t = e.sent(), [2, pa(t, d(), ua, u)]
                                }
                            })
                        })
                    },
                    v2GroupsGroupIdGamesGet: function(n, r, a, o, s, i) {
                        return Ga(this, void 0, Promise, function() {
                            var t;
                            return Ia(this, function(e) {
                                switch (e.label) {
                                    case 0:
                                        return [4, c.v2GroupsGroupIdGamesGet(n, r, a, o, s, i)];
                                    case 1:
                                        return t = e.sent(), [2, pa(t, d(), ua, u)]
                                }
                            })
                        })
                    },
                    v2GroupsGroupIdGamesV2Get: function(n, r, a, o, s, i) {
                        return Ga(this, void 0, Promise, function() {
                            var t;
                            return Ia(this, function(e) {
                                switch (e.label) {
                                    case 0:
                                        return [4, c.v2GroupsGroupIdGamesV2Get(n, r, a, o, s, i)];
                                    case 1:
                                        return t = e.sent(), [2, pa(t, d(), ua, u)]
                                }
                            })
                        })
                    },
                    v2UsersUserIdFavoriteGamesGet: function(n, r, a, o, s, i) {
                        return Ga(this, void 0, Promise, function() {
                            var t;
                            return Ia(this, function(e) {
                                switch (e.label) {
                                    case 0:
                                        return [4, c.v2UsersUserIdFavoriteGamesGet(n, r, a, o, s, i)];
                                    case 1:
                                        return t = e.sent(), [2, pa(t, d(), ua, u)]
                                }
                            })
                        })
                    },
                    v2UsersUserIdGamesGet: function(n, r, a, o, s, i) {
                        return Ga(this, void 0, Promise, function() {
                            var t;
                            return Ia(this, function(e) {
                                switch (e.label) {
                                    case 0:
                                        return [4, c.v2UsersUserIdGamesGet(n, r, a, o, s, i)];
                                    case 1:
                                        return t = e.sent(), [2, pa(t, d(), ua, u)]
                                }
                            })
                        })
                    }
                }
            }(Lr = {}).Asc = "Asc", Lr.Desc = "Desc", (Lr = {}).Forward = "Forward", Lr.Backward = "Backward", (Lr = {}).Asc = "Asc", Lr.Desc = "Desc", (Lr = {}).Forward = "Forward", Lr.Backward = "Backward", (Lr = {}).Image = "Image", Lr.TShirt = "TShirt", Lr.Audio = "Audio", Lr.Mesh = "Mesh", Lr.Lua = "Lua", Lr.Html = "HTML", Lr.Text = "Text", Lr.Hat = "Hat", Lr.Place = "Place", Lr.Model = "Model", Lr.Shirt = "Shirt", Lr.Pants = "Pants", Lr.Decal = "Decal", Lr.Avatar = "Avatar", Lr.Head = "Head", Lr.Face = "Face", Lr.Gear = "Gear", Lr.Badge = "Badge", Lr.GroupEmblem = "GroupEmblem", Lr.Animation = "Animation", Lr.Arms = "Arms", Lr.Legs = "Legs", Lr.Torso = "Torso", Lr.RightArm = "RightArm", Lr.LeftArm = "LeftArm", Lr.LeftLeg = "LeftLeg", Lr.RightLeg = "RightLeg", Lr.Package = "Package", Lr.YouTubeVideo = "YouTubeVideo", Lr.GamePass = "GamePass", Lr.App = "App", Lr.Code = "Code", Lr.Plugin = "Plugin", Lr.SolidModel = "SolidModel", Lr.MeshPart = "MeshPart", Lr.HairAccessory = "HairAccessory", Lr.FaceAccessory = "FaceAccessory", Lr.NeckAccessory = "NeckAccessory", Lr.ShoulderAccessory = "ShoulderAccessory", Lr.FrontAccessory = "FrontAccessory", Lr.BackAccessory = "BackAccessory", Lr.WaistAccessory = "WaistAccessory", Lr.ClimbAnimation = "ClimbAnimation", Lr.DeathAnimation = "DeathAnimation", Lr.FallAnimation = "FallAnimation", Lr.IdleAnimation = "IdleAnimation", Lr.JumpAnimation = "JumpAnimation", Lr.RunAnimation = "RunAnimation", Lr.SwimAnimation = "SwimAnimation", Lr.WalkAnimation = "WalkAnimation", Lr.PoseAnimation = "PoseAnimation", Lr.LocalizationTableManifest = "LocalizationTableManifest", Lr.LocalizationTableTranslation = "LocalizationTableTranslation", Lr.EmoteAnimation = "EmoteAnimation", Lr.Video = "Video", Lr.TexturePack = "TexturePack", (Lr = {}).User = "User", Lr.Group = "Group";
            var Pa, Rr = (Rr(wa, Pa = Br), wa.prototype.v2GamesUniverseIdMediaGet = function(e, t) {
                var n = this;
                return ba(this.configuration).v2GamesUniverseIdMediaGet(e, t).then(function(e) {
                    return e(n.axios, n.basePath)
                })
            }, wa.prototype.v2GroupsGroupIdGamesGet = function(e, t, n, r, a, o) {
                var s = this;
                return ba(this.configuration).v2GroupsGroupIdGamesGet(e, t, n, r, a, o).then(function(e) {
                    return e(s.axios, s.basePath)
                })
            }, wa.prototype.v2GroupsGroupIdGamesV2Get = function(e, t, n, r, a, o) {
                var s = this;
                return ba(this.configuration).v2GroupsGroupIdGamesV2Get(e, t, n, r, a, o).then(function(e) {
                    return e(s.axios, s.basePath)
                })
            }, wa.prototype.v2UsersUserIdFavoriteGamesGet = function(e, t, n, r, a, o) {
                var s = this;
                return ba(this.configuration).v2UsersUserIdFavoriteGamesGet(e, t, n, r, a, o).then(function(e) {
                    return e(s.axios, s.basePath)
                })
            }, wa.prototype.v2UsersUserIdGamesGet = function(e, t, n, r, a, o) {
                var s = this;
                return ba(this.configuration).v2UsersUserIdGamesGet(e, t, n, r, a, o).then(function(e) {
                    return e(s.axios, s.basePath)
                })
            }, wa);

            function wa() {
                return null !== Pa && Pa.apply(this, arguments) || this
            }
            var Ca, Ta, Aa = new G,
                qa = new Rr,
                La = new Wr,
                Br = {
                    getUniverseMedia: function(e) {
                        return qa.v2GamesUniverseIdMediaGet(e, {
                            withCredentials: !0
                        })
                    },
                    getPlayabilityStatus: function(e) {
                        return Aa.v1GamesMultigetPlayabilityStatusGet(e, {
                            withCredentials: !0
                        })
                    },
                    getPlaceDetails: function(e) {
                        return Aa.v1GamesMultigetPlaceDetailsGet(e, {
                            withCredentials: !0
                        })
                    },
                    getProductInfo: function(e) {
                        return Aa.v1GamesGamesProductInfoGet(e, {
                            withCredentials: !0
                        })
                    },
                    getGameDetails: function(e) {
                        return Aa.v1GamesGet(e, {
                            withCredentials: !0
                        })
                    },
                    getGamePasses: function(e, t, n, r) {
                        return La.v1GamesUniverseIdGamePassesGet(e, t, n, r)
                    },
                    getGamesSorts: function(e) {
                        return Aa.v1GamesSortsGet(e)
                    },
                    getGamesList: function(e, t, n, r, a, o, s, i, u, c, l, d, h, v, p, f) {
                        return Aa.v1GamesListGet(e, t, n, r, a, o, s, i, u, c, l, d, h, v, p, f)
                    }
                },
                G = (Ca = function(e, t) {
                    return (Ca = Object.setPrototypeOf || {
                            __proto__: []
                        }
                        instanceof Array && function(e, t) {
                            e.__proto__ = t
                        } || function(e, t) {
                            for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n])
                        })(e, t)
                }, function(e, t) {
                    if ("function" != typeof t && null !== t) throw new TypeError("Class extends value " + String(t) + " is not a constructor or null");

                    function n() {
                        this.constructor = e
                    }
                    Ca(e, t), e.prototype = null === t ? Object.create(t) : (n.prototype = t.prototype, new n)
                }),
                Sa = i.EnvironmentUrls.inventoryApi.replace(/\/+$/, ""),
                Rr = function(e, t, n) {
                    void 0 === t && (t = Sa), void 0 === n && (n = b), this.basePath = t, this.axios = n, e && (this.configuration = e, this.basePath = e.basePath || this.basePath)
                },
                Ua = (Ta = Error, G(Ra, Ta), Ra);

            function Ra(e, t) {
                t = Ta.call(this, t) || this;
                return t.field = e, t.name = "RequiredError", t
            }
            var Oa, Wr = (Oa = function(e, t) {
                    return (Oa = Object.setPrototypeOf || {
                            __proto__: []
                        }
                        instanceof Array && function(e, t) {
                            e.__proto__ = t
                        } || function(e, t) {
                            for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n])
                        })(e, t)
                }, function(e, t) {
                    if ("function" != typeof t && null !== t) throw new TypeError("Class extends value " + String(t) + " is not a constructor or null");

                    function n() {
                        this.constructor = e
                    }
                    Oa(e, t), e.prototype = null === t ? Object.create(t) : (n.prototype = t.prototype, new n)
                }),
                Da = function() {
                    return (Da = Object.assign || function(e) {
                        for (var t, n = 1, r = arguments.length; n < r; n++)
                            for (var a in t = arguments[n]) Object.prototype.hasOwnProperty.call(t, a) && (e[a] = t[a]);
                        return e
                    }).apply(this, arguments)
                };

            function xa(u) {
                return {
                    v2AssetsAssetIdOwnersGet: function(e, t, n, r, a) {
                        if (void 0 === a && (a = {}), null == e) throw new Ua("assetId", "Required parameter assetId was null or undefined when calling v2AssetsAssetIdOwnersGet.");
                        var o = "/v2/assets/{assetId}/owners".replace("{assetId}", encodeURIComponent(String(e))),
                            e = T.Qc(o, !0);
                        u && (s = u.baseOptions);
                        var o = Da(Da({
                                method: "GET"
                            }, s), a),
                            s = {};
                        return void 0 !== t && (s.sortOrder = t), void 0 !== n && (s.limit = n), void 0 !== r && (s.cursor = r), e.query = Da(Da(Da({}, e.query), s), a.query), delete e.search, o.headers = Da(Da({}, {}), a.headers), {
                            url: T.WU(e),
                            options: o
                        }
                    },
                    v2RecommendationsAssetTypeIdGet: function(e, t, n, r, a, o) {
                        if (void 0 === o && (o = {}), null == e) throw new Ua("assetTypeId", "Required parameter assetTypeId was null or undefined when calling v2RecommendationsAssetTypeIdGet.");
                        var s = "/v2/recommendations/{assetTypeId}".replace("{assetTypeId}", encodeURIComponent(String(e))),
                            e = T.Qc(s, !0);
                        u && (i = u.baseOptions);
                        var s = Da(Da({
                                method: "GET"
                            }, i), o),
                            i = {};
                        return void 0 !== t && (i.numItems = t), void 0 !== n && (i.contextAssetId = n), void 0 !== r && (i.thumbWidth = r), void 0 !== a && (i.thumbHeight = a), e.query = Da(Da(Da({}, e.query), i), o.query), delete e.search, s.headers = Da(Da({}, {}), o.headers), {
                            url: T.WU(e),
                            options: s
                        }
                    }
                }
            }

            function Ea(i) {
                return {
                    v2AssetsAssetIdOwnersGet: function(e, t, n, r, a) {
                        var o = xa(i).v2AssetsAssetIdOwnersGet(e, t, n, r, a);
                        return function(e, t) {
                            void 0 === e && (e = b), void 0 === t && (t = Sa);
                            t = Da(Da({}, o.options), {
                                url: t + o.url
                            });
                            return e.request(t)
                        }
                    },
                    v2RecommendationsAssetTypeIdGet: function(e, t, n, r, a, o) {
                        var s = xa(i).v2RecommendationsAssetTypeIdGet(e, t, n, r, a, o);
                        return function(e, t) {
                            void 0 === e && (e = b), void 0 === t && (t = Sa);
                            t = Da(Da({}, s.options), {
                                url: t + s.url
                            });
                            return e.request(t)
                        }
                    }
                }
            }(G = {}).Asc = "Asc", G.Desc = "Desc", (G = {}).Forward = "Forward", G.Backward = "Backward", (G = {}).User = "User", G.Group = "Group", (G = {}).None = "None", G.BC = "BC", G.TBC = "TBC", G.OBC = "OBC", G.RobloxPremium = "RobloxPremium";
            var Ba, Fa, G = (Wr(za, Ba = Rr), za.prototype.v2AssetsAssetIdOwnersGet = function(e, t, n, r, a) {
                return Ea(this.configuration).v2AssetsAssetIdOwnersGet(e, t, n, r, a)(this.axios, this.basePath)
            }, za.prototype.v2RecommendationsAssetTypeIdGet = function(e, t, n, r, a, o) {
                return Ea(this.configuration).v2RecommendationsAssetTypeIdGet(e, t, n, r, a, o)(this.axios, this.basePath)
            }, za);

            function za() {
                return null !== Ba && Ba.apply(this, arguments) || this
            }

            function ja(u) {
                return {
                    v2UsersUserIdInventoryAssetTypeIdGet: function(e, t, n, r, a, o) {
                        var i, s = (i = u, function(e, t, n, r, a, o) {
                            if (void 0 === o && (o = {}), null == e) throw new Ua("userId", "Required parameter userId was null or undefined when calling v2UsersUserIdInventoryAssetTypeIdGet.");
                            if (null == t) throw new Ua("assetTypeId", "Required parameter assetTypeId was null or undefined when calling v2UsersUserIdInventoryAssetTypeIdGet.");
                            e = "/v2/users/{userId}/inventory/{assetTypeId}".replace("{userId}", encodeURIComponent(String(e))).replace("{assetTypeId}", encodeURIComponent(String(t))), t = T.Qc(e, !0);
                            i && (s = i.baseOptions);
                            var e = Da(Da({
                                    method: "GET"
                                }, s), o),
                                s = {};
                            return void 0 !== n && (s.sortOrder = n), void 0 !== r && (s.limit = r), void 0 !== a && (s.cursor = a), t.query = Da(Da(Da({}, t.query), s), o.query), delete t.search, e.headers = Da(Da({}, {}), o.headers), {
                                url: T.WU(t),
                                options: e
                            }
                        }(e, t, n, r, a, o));
                        return function(e, t) {
                            void 0 === e && (e = b), void 0 === t && (t = Sa);
                            t = Da(Da({}, s.options), {
                                url: t + s.url
                            });
                            return e.request(t)
                        }
                    }
                }
            }

            function Na() {
                return null !== Fa && Fa.apply(this, arguments) || this
            }
            Wr(Na, Fa = Rr), Na.prototype.v2UsersUserIdInventoryAssetTypeIdGet = function(e, t, n, r, a, o) {
                return ja(this.configuration).v2UsersUserIdInventoryAssetTypeIdGet(e, t, n, r, a, o)(this.axios, this.basePath)
            };
            var ka, _a, Wa = new G,
                Wr = {
                    getRecommendations: function(e, t, n) {
                        return Wa.v2RecommendationsAssetTypeIdGet(e, t, n)
                    }
                },
                Ma = {
                    getUserKey: function(e) {
                        return "user_" + e
                    },
                    storage: function() {
                        return i.LocalStorage ? i.LocalStorage.isAvailable() : localStorage
                    },
                    getLength: function() {
                        return this.storage() ? localStorage.length : 0
                    },
                    getKey: function(e) {
                        return this.storage() ? localStorage.key(e) : ""
                    },
                    setLocalStorage: function(e, t) {
                        this.storage() && localStorage.setItem(e, JSON.stringify(t))
                    },
                    getLocalStorage: function(e) {
                        if (this.storage()) return JSON.parse(localStorage.getItem(e))
                    },
                    listenLocalStorage: function(e) {
                        this.storage() && void 0 !== e && (window.addEventListener ? window.addEventListener("storage", e, !1) : window.attachEvent("onstorage", e))
                    },
                    removeLocalStorage: function(e) {
                        this.storage() && localStorage.removeItem(e)
                    },
                    saveDataByTimeStamp: function(e, t) {
                        var n = (new Date).getTime(),
                            r = this.getLocalStorage(e);
                        (r = r || {}).data = t, r.timeStamp = n, this.setLocalStorage(e, r)
                    },
                    fetchNonExpiredCachedData: function(e, t) {
                        var n = (new Date).getTime(),
                            r = this.getLocalStorage(e);
                        if (r && r.timeStamp) {
                            if (n - r.timeStamp < (t = t || 3e4)) return r;
                            this.removeLocalStorage(e)
                        }
                        return null
                    }
                },
                Rr = (ka = function(e, t) {
                    return (ka = Object.setPrototypeOf || {
                            __proto__: []
                        }
                        instanceof Array && function(e, t) {
                            e.__proto__ = t
                        } || function(e, t) {
                            for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n])
                        })(e, t)
                }, function(e, t) {
                    if ("function" != typeof t && null !== t) throw new TypeError("Class extends value " + String(t) + " is not a constructor or null");

                    function n() {
                        this.constructor = e
                    }
                    ka(e, t), e.prototype = null === t ? Object.create(t) : (n.prototype = t.prototype, new n)
                }),
                Qa = i.EnvironmentUrls.localeApi.replace(/\/+$/, ""),
                G = function(e, t, n) {
                    void 0 === t && (t = Qa), void 0 === n && (n = b), this.basePath = t, this.axios = n, e && (this.configuration = e, this.basePath = e.basePath || this.basePath)
                },
                Ha = (_a = Error, Rr(Va, _a), Va);

            function Va(e, t) {
                t = _a.call(this, t) || this;
                return t.field = e, t.name = "RequiredError", t
            }

            function Ja(o) {
                return {
                    v1CountryRegionsGet: function(e) {
                        void 0 === e && (e = {});
                        var t = T.Qc("/v1/country-regions", !0);
                        o && (n = o.baseOptions);
                        var n = eo(eo({
                            method: "GET"
                        }, n), e);
                        return t.query = eo(eo(eo({}, t.query), {}), e.query), delete t.search, n.headers = eo(eo({}, {}), e.headers), {
                            url: T.WU(t),
                            options: n
                        }
                    },
                    v1CountryRegionsUserCountryRegionGet: function(e) {
                        void 0 === e && (e = {});
                        var t = T.Qc("/v1/country-regions/user-country-region", !0);
                        o && (n = o.baseOptions);
                        var n = eo(eo({
                            method: "GET"
                        }, n), e);
                        return t.query = eo(eo(eo({}, t.query), {}), e.query), delete t.search, n.headers = eo(eo({}, {}), e.headers), {
                            url: T.WU(t),
                            options: n
                        }
                    },
                    v1CountryRegionsUserCountryRegionPatch: function(e, t) {
                        if (void 0 === t && (t = {}), null == e) throw new Ha("userRequest", "Required parameter userRequest was null or undefined when calling v1CountryRegionsUserCountryRegionPatch.");
                        var n = T.Qc("/v1/country-regions/user-country-region", !0);
                        o && (a = o.baseOptions);
                        var r = eo(eo({
                                method: "PATCH"
                            }, a), t),
                            a = {};
                        a["Content-Type"] = "application/json", n.query = eo(eo(eo({}, n.query), {}), t.query), delete n.search, r.headers = eo(eo({}, a), t.headers);
                        return r.data = JSON.stringify(void 0 !== e ? e : {}), {
                            url: T.WU(n),
                            options: r
                        }
                    }
                }
            }

            function Ka(r) {
                return {
                    v1CountryRegionsGet: function(e) {
                        var n = Ja(r).v1CountryRegionsGet(e);
                        return function(e, t) {
                            void 0 === e && (e = b), void 0 === t && (t = Qa);
                            t = eo(eo({}, n.options), {
                                url: t + n.url
                            });
                            return e.request(t)
                        }
                    },
                    v1CountryRegionsUserCountryRegionGet: function(e) {
                        var n = Ja(r).v1CountryRegionsUserCountryRegionGet(e);
                        return function(e, t) {
                            void 0 === e && (e = b), void 0 === t && (t = Qa);
                            t = eo(eo({}, n.options), {
                                url: t + n.url
                            });
                            return e.request(t)
                        }
                    },
                    v1CountryRegionsUserCountryRegionPatch: function(e, t) {
                        var n = Ja(r).v1CountryRegionsUserCountryRegionPatch(e, t);
                        return function(e, t) {
                            void 0 === e && (e = b), void 0 === t && (t = Qa);
                            t = eo(eo({}, n.options), {
                                url: t + n.url
                            });
                            return e.request(t)
                        }
                    }
                }
            }
            var $a, Xa, Ya, Za, Rr = ($a = function(e, t) {
                    return ($a = Object.setPrototypeOf || {
                            __proto__: []
                        }
                        instanceof Array && function(e, t) {
                            e.__proto__ = t
                        } || function(e, t) {
                            for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n])
                        })(e, t)
                }, function(e, t) {
                    if ("function" != typeof t && null !== t) throw new TypeError("Class extends value " + String(t) + " is not a constructor or null");

                    function n() {
                        this.constructor = e
                    }
                    $a(e, t), e.prototype = null === t ? Object.create(t) : (n.prototype = t.prototype, new n)
                }),
                eo = function() {
                    return (eo = Object.assign || function(e) {
                        for (var t, n = 1, r = arguments.length; n < r; n++)
                            for (var a in t = arguments[n]) Object.prototype.hasOwnProperty.call(t, a) && (e[a] = t[a]);
                        return e
                    }).apply(this, arguments)
                };

            function to() {
                return null !== Xa && Xa.apply(this, arguments) || this
            }

            function no(r) {
                return {
                    v1LanguagesGet: function(e) {
                        void 0 === e && (e = {});
                        var t = T.Qc("/v1/languages", !0);
                        r && (n = r.baseOptions);
                        var n = eo(eo({
                            method: "GET"
                        }, n), e);
                        return t.query = eo(eo(eo({}, t.query), {}), e.query), delete t.search, n.headers = eo(eo({}, {}), e.headers), {
                            url: T.WU(t),
                            options: n
                        }
                    },
                    v1LanguagesUserGeneratedContentGet: function(e) {
                        void 0 === e && (e = {});
                        var t = T.Qc("/v1/languages/user-generated-content", !0);
                        r && (n = r.baseOptions);
                        var n = eo(eo({
                            method: "GET"
                        }, n), e);
                        return t.query = eo(eo(eo({}, t.query), {}), e.query), delete t.search, n.headers = eo(eo({}, {}), e.headers), {
                            url: T.WU(t),
                            options: n
                        }
                    }
                }
            }

            function ro(t) {
                return {
                    v1LanguagesGet: function(e) {
                        var n = no(t).v1LanguagesGet(e);
                        return function(e, t) {
                            void 0 === e && (e = b), void 0 === t && (t = Qa);
                            t = eo(eo({}, n.options), {
                                url: t + n.url
                            });
                            return e.request(t)
                        }
                    },
                    v1LanguagesUserGeneratedContentGet: function(e) {
                        var n = no(t).v1LanguagesUserGeneratedContentGet(e);
                        return function(e, t) {
                            void 0 === e && (e = b), void 0 === t && (t = Qa);
                            t = eo(eo({}, n.options), {
                                url: t + n.url
                            });
                            return e.request(t)
                        }
                    }
                }
            }

            function ao() {
                return null !== Ya && Ya.apply(this, arguments) || this
            }

            function oo(o) {
                return {
                    v1LocalesGet: function(e) {
                        void 0 === e && (e = {});
                        var t = T.Qc("/v1/locales", !0);
                        o && (n = o.baseOptions);
                        var n = eo(eo({
                            method: "GET"
                        }, n), e);
                        return t.query = eo(eo(eo({}, t.query), {}), e.query), delete t.search, n.headers = eo(eo({}, {}), e.headers), {
                            url: T.WU(t),
                            options: n
                        }
                    },
                    v1LocalesSetUserSupportedLocalePost: function(e, t) {
                        if (void 0 === t && (t = {}), null == e) throw new Ha("userRequest", "Required parameter userRequest was null or undefined when calling v1LocalesSetUserSupportedLocalePost.");
                        var n = T.Qc("/v1/locales/set-user-supported-locale", !0);
                        o && (a = o.baseOptions);
                        var r = eo(eo({
                                method: "POST"
                            }, a), t),
                            a = {};
                        a["Content-Type"] = "application/json", n.query = eo(eo(eo({}, n.query), {}), t.query), delete n.search, r.headers = eo(eo({}, a), t.headers);
                        return r.data = JSON.stringify(void 0 !== e ? e : {}), {
                            url: T.WU(n),
                            options: r
                        }
                    },
                    v1LocalesSupportedLocalesGet: function(e) {
                        void 0 === e && (e = {});
                        var t = T.Qc("/v1/locales/supported-locales", !0);
                        o && (n = o.baseOptions);
                        var n = eo(eo({
                            method: "GET"
                        }, n), e);
                        return t.query = eo(eo(eo({}, t.query), {}), e.query), delete t.search, n.headers = eo(eo({}, {}), e.headers), {
                            url: T.WU(t),
                            options: n
                        }
                    },
                    v1LocalesUserLocaleGet: function(e) {
                        void 0 === e && (e = {});
                        var t = T.Qc("/v1/locales/user-locale", !0);
                        o && (n = o.baseOptions);
                        var n = eo(eo({
                            method: "GET"
                        }, n), e);
                        return t.query = eo(eo(eo({}, t.query), {}), e.query), delete t.search, n.headers = eo(eo({}, {}), e.headers), {
                            url: T.WU(t),
                            options: n
                        }
                    },
                    v1LocalesUserLocalizationLocusSupportedLocalesGet: function(e) {
                        void 0 === e && (e = {});
                        var t = T.Qc("/v1/locales/user-localization-locus-supported-locales", !0);
                        o && (n = o.baseOptions);
                        var n = eo(eo({
                            method: "GET"
                        }, n), e);
                        return t.query = eo(eo(eo({}, t.query), {}), e.query), delete t.search, n.headers = eo(eo({}, {}), e.headers), {
                            url: T.WU(t),
                            options: n
                        }
                    }
                }
            }

            function so(r) {
                return {
                    v1LocalesGet: function(e) {
                        var n = oo(r).v1LocalesGet(e);
                        return function(e, t) {
                            void 0 === e && (e = b), void 0 === t && (t = Qa);
                            t = eo(eo({}, n.options), {
                                url: t + n.url
                            });
                            return e.request(t)
                        }
                    },
                    v1LocalesSetUserSupportedLocalePost: function(e, t) {
                        var n = oo(r).v1LocalesSetUserSupportedLocalePost(e, t);
                        return function(e, t) {
                            void 0 === e && (e = b), void 0 === t && (t = Qa);
                            t = eo(eo({}, n.options), {
                                url: t + n.url
                            });
                            return e.request(t)
                        }
                    },
                    v1LocalesSupportedLocalesGet: function(e) {
                        var n = oo(r).v1LocalesSupportedLocalesGet(e);
                        return function(e, t) {
                            void 0 === e && (e = b), void 0 === t && (t = Qa);
                            t = eo(eo({}, n.options), {
                                url: t + n.url
                            });
                            return e.request(t)
                        }
                    },
                    v1LocalesUserLocaleGet: function(e) {
                        var n = oo(r).v1LocalesUserLocaleGet(e);
                        return function(e, t) {
                            void 0 === e && (e = b), void 0 === t && (t = Qa);
                            t = eo(eo({}, n.options), {
                                url: t + n.url
                            });
                            return e.request(t)
                        }
                    },
                    v1LocalesUserLocalizationLocusSupportedLocalesGet: function(e) {
                        var n = oo(r).v1LocalesUserLocalizationLocusSupportedLocalesGet(e);
                        return function(e, t) {
                            void 0 === e && (e = b), void 0 === t && (t = Qa);
                            t = eo(eo({}, n.options), {
                                url: t + n.url
                            });
                            return e.request(t)
                        }
                    }
                }
            }

            function io() {
                return null !== Za && Za.apply(this, arguments) || this
            }
            Rr(to, Xa = G), to.prototype.v1CountryRegionsGet = function(e) {
                return Ka(this.configuration).v1CountryRegionsGet(e)(this.axios, this.basePath)
            }, to.prototype.v1CountryRegionsUserCountryRegionGet = function(e) {
                return Ka(this.configuration).v1CountryRegionsUserCountryRegionGet(e)(this.axios, this.basePath)
            }, to.prototype.v1CountryRegionsUserCountryRegionPatch = function(e, t) {
                return Ka(this.configuration).v1CountryRegionsUserCountryRegionPatch(e, t)(this.axios, this.basePath)
            }, Rr(ao, Ya = G), ao.prototype.v1LanguagesGet = function(e) {
                return ro(this.configuration).v1LanguagesGet(e)(this.axios, this.basePath)
            }, ao.prototype.v1LanguagesUserGeneratedContentGet = function(e) {
                return ro(this.configuration).v1LanguagesUserGeneratedContentGet(e)(this.axios, this.basePath)
            };
            var uo, co = new(Rr(io, Za = G), io.prototype.v1LocalesGet = function(e) {
                return so(this.configuration).v1LocalesGet(e)(this.axios, this.basePath)
            }, io.prototype.v1LocalesSetUserSupportedLocalePost = function(e, t) {
                return so(this.configuration).v1LocalesSetUserSupportedLocalePost(e, t)(this.axios, this.basePath)
            }, io.prototype.v1LocalesSupportedLocalesGet = function(e) {
                return so(this.configuration).v1LocalesSupportedLocalesGet(e)(this.axios, this.basePath)
            }, io.prototype.v1LocalesUserLocaleGet = function(e) {
                return so(this.configuration).v1LocalesUserLocaleGet(e)(this.axios, this.basePath)
            }, io.prototype.v1LocalesUserLocalizationLocusSupportedLocalesGet = function(e) {
                return so(this.configuration).v1LocalesUserLocalizationLocusSupportedLocalesGet(e)(this.axios, this.basePath)
            }, io);

            function lo() {
                return co.v1LocalesGet({
                    withCredentials: !0
                })
            }(uo = uo || {}).getLocales = "Roblox.Api.Locales.getLocales";
            var ho, G = {
                    getLocales: lo,
                    getUserLocale: function() {
                        return co.v1LocalesUserLocalizationLocusSupportedLocalesGet({
                            withCredentials: !0
                        })
                    },
                    setUserLocale: function(e) {
                        e = {
                            supportedLocaleCode: e
                        };
                        return co.v1LocalesSetUserSupportedLocalePost(e, {
                            withCredentials: !0
                        })
                    },
                    getLocalesWithCache: function(e) {
                        return r = lo, a = uo.getLocales, o = e, new Promise(function(t, n) {
                            var e = Ma.fetchNonExpiredCachedData(a, o);
                            e ? t(e.data) : r().then(function(e) {
                                Ma.saveDataByTimeStamp(a, e.data), t(e.data)
                            }, function(e) {
                                return n(e)
                            })
                        });
                        var r, a, o
                    }
                },
                vo = new he,
                po = new t,
                fo = new D,
                mo = new pe,
                go = new A,
                yo = new g,
                Go = new yr,
                Io = new fn,
                pe = {
                    getAssets: function(e, t, n, r, a) {
                        return vo.v1AssetsGet(e, t, n, r, a, {
                            withCredentials: !0
                        })
                    },
                    getAvatars: function(e, t, n, r) {
                        return fo.v1UsersAvatarGet(e, t, n, r, {
                            withCredentials: !0
                        })
                    },
                    getAvatarHeadshots: function(e, t, n, r) {
                        return fo.v1UsersAvatarHeadshotGet(e, t, n, r, {
                            withCredentials: !0
                        })
                    },
                    getGroupIcons: function(e, t, n, r) {
                        return mo.v1GroupsIconsGet(e, t, n, r, {
                            withCredentials: !0
                        })
                    },
                    getBadgeIcons: function(e, t, n, r) {
                        return go.v1BadgesIconsGet(e, t, n, r, {
                            withCredentials: !0
                        })
                    },
                    getDeveloperProductIcons: function(e, t, n, r) {
                        return yo.v1DeveloperProductsIconsGet(e, t, n, r, {
                            withCredentials: !0
                        })
                    },
                    getBundles: function(e, t, n, r) {
                        return po.v1BundlesThumbnailsGet(e, t, n, r, {
                            withCredentials: !0
                        })
                    },
                    getUserOutfits: function(e, t, n, r) {
                        return Go.v1UsersOutfitsGet(e, t, n, r, {
                            withCredentials: !0
                        })
                    },
                    getBatchThumbnails: function(e) {
                        return Io.v1BatchPost(e, {
                            withCredentials: !0
                        })
                    }
                },
                bo = new $e;
            (A = ho = ho || {}).Language = "Language", A.Locale = "Locale";
            var Po, wo, g = {
                    getTranslationProgress: function(e, t) {
                        return bo.v1GameLocalizationStatusTranslationCountsForLanguageOrLocaleGet(e, t, ho.Language, {
                            withCredentials: !0
                        })
                    }
                },
                yr = (Po = function(e, t) {
                    return (Po = Object.setPrototypeOf || {
                            __proto__: []
                        }
                        instanceof Array && function(e, t) {
                            e.__proto__ = t
                        } || function(e, t) {
                            for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n])
                        })(e, t)
                }, function(e, t) {
                    if ("function" != typeof t && null !== t) throw new TypeError("Class extends value " + String(t) + " is not a constructor or null");

                    function n() {
                        this.constructor = e
                    }
                    Po(e, t), e.prototype = null === t ? Object.create(t) : (n.prototype = t.prototype, new n)
                }),
                Co = i.EnvironmentUrls.translationRolesApi.replace(/\/+$/, ""),
                fn = function(e, t, n) {
                    void 0 === t && (t = Co), void 0 === n && (n = b), this.basePath = t, this.axios = n, e && (this.configuration = e, this.basePath = e.basePath || this.basePath)
                },
                To = (wo = Error, yr(Ao, wo), Ao);

            function Ao(e, t) {
                t = wo.call(this, t) || this;
                return t.field = e, t.name = "RequiredError", t
            }
            var qo, Lo, $e = (qo = function(e, t) {
                    return (qo = Object.setPrototypeOf || {
                            __proto__: []
                        }
                        instanceof Array && function(e, t) {
                            e.__proto__ = t
                        } || function(e, t) {
                            for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n])
                        })(e, t)
                }, function(e, t) {
                    if ("function" != typeof t && null !== t) throw new TypeError("Class extends value " + String(t) + " is not a constructor or null");

                    function n() {
                        this.constructor = e
                    }
                    qo(e, t), e.prototype = null === t ? Object.create(t) : (n.prototype = t.prototype, new n)
                }),
                So = function() {
                    return (So = Object.assign || function(e) {
                        for (var t, n = 1, r = arguments.length; n < r; n++)
                            for (var a in t = arguments[n]) Object.prototype.hasOwnProperty.call(t, a) && (e[a] = t[a]);
                        return e
                    }).apply(this, arguments)
                };

            function Uo(s) {
                return {
                    v1GameLocalizationRolesGamesGameIdCurrentUserRolesGet: function(e, t) {
                        if (void 0 === t && (t = {}), null == e) throw new To("gameId", "Required parameter gameId was null or undefined when calling v1GameLocalizationRolesGamesGameIdCurrentUserRolesGet.");
                        e = "/v1/game-localization-roles/games/{gameId}/current-user/roles".replace("{gameId}", encodeURIComponent(String(e))), e = T.Qc(e, !0);
                        s && (n = s.baseOptions);
                        var n = So(So({
                            method: "GET"
                        }, n), t);
                        return e.query = So(So(So({}, e.query), {}), t.query), delete e.search, n.headers = So(So({}, {}), t.headers), {
                            url: T.WU(e),
                            options: n
                        }
                    },
                    v1GameLocalizationRolesGamesGameIdPatch: function(e, t, n) {
                        if (void 0 === n && (n = {}), null == e) throw new To("gameId", "Required parameter gameId was null or undefined when calling v1GameLocalizationRolesGamesGameIdPatch.");
                        if (null == t) throw new To("request", "Required parameter request was null or undefined when calling v1GameLocalizationRolesGamesGameIdPatch.");
                        var r = "/v1/game-localization-roles/games/{gameId}".replace("{gameId}", encodeURIComponent(String(e))),
                            e = T.Qc(r, !0);
                        s && (a = s.baseOptions);
                        var r = So(So({
                                method: "PATCH"
                            }, a), n),
                            a = {};
                        a["Content-Type"] = "application/json", e.query = So(So(So({}, e.query), {}), n.query), delete e.search, r.headers = So(So({}, a), n.headers);
                        return r.data = JSON.stringify(void 0 !== t ? t : {}), {
                            url: T.WU(e),
                            options: r
                        }
                    },
                    v1GameLocalizationRolesGamesGameIdRolesRoleAssigneesGet: function(e, t, n) {
                        if (void 0 === n && (n = {}), null == e) throw new To("gameId", "Required parameter gameId was null or undefined when calling v1GameLocalizationRolesGamesGameIdRolesRoleAssigneesGet.");
                        if (null == t) throw new To("role", "Required parameter role was null or undefined when calling v1GameLocalizationRolesGamesGameIdRolesRoleAssigneesGet.");
                        t = "/v1/game-localization-roles/games/{gameId}/roles/{role}/assignees".replace("{gameId}", encodeURIComponent(String(e))).replace("{role}", encodeURIComponent(String(t))), t = T.Qc(t, !0);
                        s && (r = s.baseOptions);
                        var r = So(So({
                            method: "GET"
                        }, r), n);
                        return t.query = So(So(So({}, t.query), {}), n.query), delete t.search, r.headers = So(So({}, {}), n.headers), {
                            url: T.WU(t),
                            options: r
                        }
                    },
                    v1GameLocalizationRolesRolesRoleCurrentUserGet: function(e, t, n, r) {
                        if (void 0 === r && (r = {}), null == e) throw new To("role", "Required parameter role was null or undefined when calling v1GameLocalizationRolesRolesRoleCurrentUserGet.");
                        var a = "/v1/game-localization-roles/roles/{role}/current-user".replace("{role}", encodeURIComponent(String(e))),
                            e = T.Qc(a, !0);
                        s && (o = s.baseOptions);
                        var a = So(So({
                                method: "GET"
                            }, o), r),
                            o = {};
                        return void 0 !== t && (o.exclusiveStartKey = t), void 0 !== n && (o.pageSize = n), e.query = So(So(So({}, e.query), o), r.query), delete e.search, a.headers = So(So({}, {}), r.headers), {
                            url: T.WU(e),
                            options: a
                        }
                    }
                }
            }

            function Ro(o) {
                return {
                    v1GameLocalizationRolesGamesGameIdCurrentUserRolesGet: function(e, t) {
                        var n = Uo(o).v1GameLocalizationRolesGamesGameIdCurrentUserRolesGet(e, t);
                        return function(e, t) {
                            void 0 === e && (e = b), void 0 === t && (t = Co);
                            t = So(So({}, n.options), {
                                url: t + n.url
                            });
                            return e.request(t)
                        }
                    },
                    v1GameLocalizationRolesGamesGameIdPatch: function(e, t, n) {
                        var r = Uo(o).v1GameLocalizationRolesGamesGameIdPatch(e, t, n);
                        return function(e, t) {
                            void 0 === e && (e = b), void 0 === t && (t = Co);
                            t = So(So({}, r.options), {
                                url: t + r.url
                            });
                            return e.request(t)
                        }
                    },
                    v1GameLocalizationRolesGamesGameIdRolesRoleAssigneesGet: function(e, t, n) {
                        var r = Uo(o).v1GameLocalizationRolesGamesGameIdRolesRoleAssigneesGet(e, t, n);
                        return function(e, t) {
                            void 0 === e && (e = b), void 0 === t && (t = Co);
                            t = So(So({}, r.options), {
                                url: t + r.url
                            });
                            return e.request(t)
                        }
                    },
                    v1GameLocalizationRolesRolesRoleCurrentUserGet: function(e, t, n, r) {
                        var a = Uo(o).v1GameLocalizationRolesRolesRoleCurrentUserGet(e, t, n, r);
                        return function(e, t) {
                            void 0 === e && (e = b), void 0 === t && (t = Co);
                            t = So(So({}, a.options), {
                                url: t + a.url
                            });
                            return e.request(t)
                        }
                    }
                }
            }

            function Oo() {
                return null !== Lo && Lo.apply(this, arguments) || this
            }(A = {}).User = "user", A.Group = "group", A.GroupRole = "groupRole", (yr = {}).User = "user", yr.Group = "group", yr.GroupRole = "groupRole", (A = {}).User = "user", A.Group = "group", A.GroupRole = "groupRole";
            var Do, xo = new($e(Oo, Lo = fn), Oo.prototype.v1GameLocalizationRolesGamesGameIdCurrentUserRolesGet = function(e, t) {
                return Ro(this.configuration).v1GameLocalizationRolesGamesGameIdCurrentUserRolesGet(e, t)(this.axios, this.basePath)
            }, Oo.prototype.v1GameLocalizationRolesGamesGameIdPatch = function(e, t, n) {
                return Ro(this.configuration).v1GameLocalizationRolesGamesGameIdPatch(e, t, n)(this.axios, this.basePath)
            }, Oo.prototype.v1GameLocalizationRolesGamesGameIdRolesRoleAssigneesGet = function(e, t, n) {
                return Ro(this.configuration).v1GameLocalizationRolesGamesGameIdRolesRoleAssigneesGet(e, t, n)(this.axios, this.basePath)
            }, Oo.prototype.v1GameLocalizationRolesRolesRoleCurrentUserGet = function(e, t, n, r) {
                return Ro(this.configuration).v1GameLocalizationRolesRolesRoleCurrentUserGet(e, t, n, r)(this.axios, this.basePath)
            }, Oo);
            (Do = Do || {}).Translator = "translator";
            var Eo, yr = {
                    getGamesListForTranslator: function(e, t) {
                        return xo.v1GameLocalizationRolesRolesRoleCurrentUserGet(Do.Translator, t, e, {
                            withCredentials: !0
                        })
                    }
                },
                Bo = {
                    useCache: !1,
                    expirationWindowMS: 3e4
                };

            function Fo(t, n) {
                return function(e) {
                    e = Math.pow(2, e - 1) * t;
                    return Math.min(n, e)
                }
            }

            function zo(e, t) {
                this.store = new Map, this.useCache = e || !1, this.expirationWindowMS = t || 3e4, this.storeKeyPrefix = "CacheStore:BatchRequestProcessor::"
            }(A = Eo = Eo || {}).processFailure = "processFailure", A.unretriableFailure = "unretriableFailure", A.maxAttemptsReached = "maxAttemptsReached";
            var jo = (zo.prototype.getCacheKey = function(e) {
                    return "" + this.storeKeyPrefix + e
                }, zo.prototype.has = function(e, t) {
                    var n = t.useCache,
                        t = t.expirationWindowMS,
                        e = this.getCacheKey(e);
                    return (n || this.useCache) && localStorage ? !!Ma.fetchNonExpiredCachedData(e, t || this.expirationWindowMS) : this.store.has(e)
                }, zo.prototype.set = function(e, t, n) {
                    n = n.useCache, e = this.getCacheKey(e);
                    (n || this.useCache) && localStorage && Ma.saveDataByTimeStamp(e, t), this.store.set(e, t)
                }, zo.prototype.get = function(e, t) {
                    var n, r = t.useCache,
                        t = t.expirationWindowMS,
                        e = this.getCacheKey(e);
                    return (r || this.useCache) && localStorage ? null == (n = Ma.fetchNonExpiredCachedData(e, t || this.expirationWindowMS)) ? void 0 : n.data : (n && this.store.set(e, null == n ? void 0 : n.data), this.store.get(e))
                }, zo.prototype.delete = function(e) {
                    e = this.getCacheKey(e);
                    localStorage && Ma.removeLocalStorage(e), this.store.delete(e)
                }, zo.prototype.clear = function() {
                    if (this.store.clear(), localStorage) {
                        for (var e = [], t = 0; t < localStorage.length; t++) {
                            var n = localStorage.key(t);
                            n.includes(this.storeKeyPrefix) && e.push(n)
                        }
                        for (var r = 0; r < e.length; r++) localStorage.removeItem(e[r])
                    }
                }, zo),
                No = function() {
                    return (No = Object.assign || function(e) {
                        for (var t, n = 1, r = arguments.length; n < r; n++)
                            for (var a in t = arguments[n]) Object.prototype.hasOwnProperty.call(t, a) && (e[a] = t[a]);
                        return e
                    }).apply(this, arguments)
                };

            function ko(e, t, n) {
                this.requestQueue = [], this.concurrentRequestCount = 1, this.isQueueActive = !1, this.debug = !1;
                var r = n.cacheProperties,
                    a = n.processBatchWaitTime,
                    o = n.batchSize,
                    s = n.maxRetryAttempts,
                    i = n.getItemExpiration,
                    u = n.getFailureCooldown,
                    c = n.debugMode,
                    l = n.concurrentRequestCount,
                    d = r.useCache,
                    n = r.expirationWindowMS;
                this.cacheProperties = r, this.completeItems = new jo(d, n), this.processBatchWaitTime = a, this.batchSize = o, this.maxRetryAttempts = s, this.getItemExpiration = i, this.getFailureCooldown = u, this.itemsProcessor = e, this.itemsSerializer = t, this.debug = c || !1, this.processorId = Date.now(), this.concurrentRequestCount = l
            }
            var _o = (ko.prototype.handleBatchResult = function(e, n) {
                var r = this,
                    a = 0,
                    o = (new Date).getTime();
                e.forEach(function(e) {
                    var t;
                    r.completeItems.has(e.key, e.cacheProperties) ? (t = (new Date).getTime(), e.resolve(No(No({}, r.completeItems.get(e.key, e.cacheProperties)), {
                        performance: {
                            duration: t - e.startTime.getTime(),
                            retryAttempts: e.retryAttempts
                        }
                    }))) : r.maxRetryAttempts && n !== Eo.unretriableFailure ? (t = r.getFailureCooldown ? r.getFailureCooldown(e.retryAttempts) : 1e3, a = 0 < a ? Math.min(a, t) : t, ++e.retryAttempts <= r.maxRetryAttempts ? (e.queueAfter = o + t, r.requestQueue.unshift(e)) : e.reject(Eo.maxAttemptsReached)) : (console.debug(n, e), e.reject(n))
                }), this.processEndTime = Date.now(), this.debug && console.debug(this.processorId + ": process queue ended", {
                    duration: this.processEndTime - this.processStartTime,
                    requestQueue: this.requestQueue,
                    minimumCooldown: a,
                    processBatchWaitTime: this.processBatchWaitTime
                }), 0 < a && setTimeout(function() {
                    return r.processQueue()
                }, a + this.processBatchWaitTime), this.concurrentRequestCount += 1, this.processQueue()
            }, ko.prototype.processQueue = function() {
                var e, r = this;
                if (0 !== this.concurrentRequestCount && !this.isQueueActive) {
                    this.processStartTime = Date.now();
                    var t = [],
                        a = new Map,
                        n = [],
                        o = (new Date).getTime();
                    for (this.isQueueActive = !0; t.length < this.batchSize && 0 < this.requestQueue.length;) {
                        var s, i = this.requestQueue.shift();
                        i.queueAfter > o ? (a.set(i.key, i), n.push(i)) : this.completeItems.has(i.key, i.cacheProperties) ? (s = (new Date).getTime(), i.resolve(No(No({}, this.completeItems.get(i.key, i.cacheProperties)), {
                            performance: {
                                duration: s - i.startTime.getTime()
                            }
                        }))) : a.has(i.key) ? n.push(i) : (a.set(i.key, i), t.push(i))
                    }(e = this.requestQueue).push.apply(e, n), this.isQueueActive = !1, t.length <= 0 || (--this.concurrentRequestCount, this.processQueue(), this.debug && console.debug(this.processorId + ": process queue start", {
                        timeSinceLastStart: this.processEndTime ? this.processStartTime - this.processEndTime : 0,
                        startTime: this.processStartTime,
                        requestQueue: this.requestQueue,
                        batch: t.map(function(e) {
                            return e.key
                        })
                    }), this.itemsProcessor(t).then(function(e) {
                        Object.entries(e).forEach(function(e) {
                            var t = e[0],
                                n = e[1],
                                e = a.get(t);
                            r.saveCompleteItem(t, n, null == e ? void 0 : e.cacheProperties)
                        }), r.handleBatchResult(t, Eo.processFailure)
                    }, function(e) {
                        r.handleBatchResult(t, e)
                    }))
                }
            }, ko.prototype.saveCompleteItem = function(e, t, n) {
                var r = this;
                this.completeItems.set(e, t, n || this.cacheProperties), this.getItemExpiration && setTimeout(function() {
                    r.completeItems.delete(e)
                }, this.getItemExpiration(e))
            }, ko.prototype.queueItem = function(n, r, a) {
                var o = this;
                return new Promise(function(e, t) {
                    o.requestQueue.push({
                        key: r || o.itemsSerializer(n),
                        itemId: n,
                        data: n,
                        retryAttempts: 0,
                        queueAfter: 0,
                        startTime: new Date,
                        cacheProperties: a || o.cacheProperties,
                        resolve: e,
                        reject: t
                    }), setTimeout(function() {
                        return o.processQueue()
                    }, o.processBatchWaitTime)
                })
            }, ko.prototype.invalidateItem = function(e, t) {
                e = t || this.itemsSerializer(e);
                return this.completeItems.delete(e)
            }, ko.prototype.clearCache = function() {
                this.completeItems.clear()
            }, ko);

            function Wo() {
                this.createExponentialBackoffCooldown = Fo
            }
            new($e = (Wo.prototype.createRequestProcessor = function(e, t, n) {
                return n.processBatchWaitTime || (n.processBatchWaitTime = 10), n.maxRetryAttempts || (n.maxRetryAttempts = 2), n.cacheProperties || (n.cacheProperties = Bo), n.concurrentRequestCount || (n.concurrentRequestCount = 1), new _o(e, t, n)
            }, Wo));
            var Mo, Qo = i.EnvironmentUrls.friendsApi,
                Ho = i.EnvironmentUrls.presenceApi,
                Vo = i.EnvironmentUrls.usersApi;

            function Jo(e, t) {
                return t = Qo + "/v1/users/" + t + "/" + e, e === Mo.Requests && (t = Qo + "/v1/my/friends/requests"), {
                    url: t,
                    retryable: !0,
                    withCredentials: !0
                }
            }

            function Ko() {
                return {
                    url: Ho + "/v1/presence/users",
                    retryable: !1,
                    withCredentials: !0
                }
            }

            function $o(i) {
                return function(e) {
                    var t, n, r = e[0],
                        u = r.key,
                        a = r.data,
                        o = a.userId,
                        c = a.isGuest,
                        s = Jo(i, o),
                        t = (n = (t = a).cursor, e = t.sortOrder, r = t.userSort, o = t.limit, a = t.fetchMutualFriends, t = {}, n && Object.assign(t, {
                            cursor: n
                        }), e && Object.assign(t, {
                            sortOrder: e
                        }), r && Object.assign(t, {
                            userSort: r
                        }), o && Object.assign(t, {
                            limit: o
                        }), a && Object.assign(t, {
                            fetchMutualFriends: a
                        }), t);
                    return m.get(s, t).then(function(e) {
                        var r = {};
                        if (null == e || !e.data) return r[u] = {
                            userData: []
                        }, r;
                        var t, n = e.data,
                            a = n.data,
                            o = n.previousPageCursor,
                            s = n.nextPageCursor,
                            i = (t = {}, a.forEach(function(e) {
                                t[e.id] = e, t[e.id].profileUrl = "/users/" + e.id + "/profile", t[e.id].presence = {}
                            }), t);
                        if (c) return r[u] = {
                            userData: a,
                            prevCursor: o,
                            nextCursor: s
                        }, r;
                        e = Ko(), n = Object.keys(i).map(function(e) {
                            return parseInt(e, 10)
                        });
                        return m.post(e, {
                            userIds: n
                        }).then(function(e) {
                            var t, n;
                            return t = i, 0 < (null === (e = null === (e = null == (n = e) ? void 0 : n.data) || void 0 === e ? void 0 : e.userPresences) || void 0 === e ? void 0 : e.length) && (n = n.data.userPresences, es([], n).forEach(function(e) {
                                t[e.userId].presence = e
                            })), r[u] = {
                                userData: a,
                                prevCursor: o,
                                nextCursor: s
                            }, r
                        }).catch(function(e) {
                            return console.debug(e), r[u] = {
                                userData: a,
                                prevCursor: o,
                                nextCursor: s
                            }, r
                        })
                    }).catch(function(e) {
                        return console.debug(e), {}
                    })
                }
            }

            function Xo(e) {
                return e = 0 < arguments.length && void 0 !== e ? e : window.location.search, os.parse(e)
            }

            function Yo(e) {
                return e = 0 < arguments.length && void 0 !== e ? e : {}, os.stringify(e)
            }

            function Zo(e) {
                return i.Endpoints ? i.Endpoints.getAbsoluteUrl(e) : e
            }(fn = Mo = Mo || {}).Friends = "friends", fn.Followers = "followers", fn.Followings = "followings", fn.Requests = "requests", (A = as = as || {}).Alphabetical = "Alphabetical", A.StatusAlphabetical = "StatusAlphabetical", A.StatusFrequents = "StatusFrequents";
            var es = function(e, t) {
                    for (var n = 0, r = t.length, a = e.length; n < r; n++, a++) e[a] = t[n];
                    return e
                },
                ts = (new $e).createRequestProcessor(function(e) {
                    var t = {
                            url: Vo + "/v1/users",
                            retryable: !0,
                            withCredentials: !0
                        },
                        e = e.map(function(e) {
                            return e.data.userId
                        });
                    return m.post(t, {
                        userIds: e,
                        excludeBannedUsers: !0
                    }).then(function(e) {
                        var e = e.data.data,
                            t = {};
                        return e.forEach(function(e) {
                            t[e.id] = e
                        }), t
                    })
                }, function(e) {
                    e = e.userId;
                    return null == e ? void 0 : e.toString()
                }, {
                    batchSize: 100,
                    processBatchWaitTime: 1e3
                }),
                ns = new $e,
                rs = new Map,
                fn = function(r) {
                    var a = function(e, t, n) {
                        if (rs.has(e)) return rs.get(e);
                        n = ns.createRequestProcessor(t, n, {
                            batchSize: 1
                        });
                        return rs.set(e, n), n
                    }(r, $o(r), function(e) {
                        e = e.userId;
                        return null == e ? void 0 : e.toString()
                    });
                    return function(e, t) {
                        var n, n = r + ":" + (n = e).userId + ":" + n.cursor + ":" + n.sortOrder + ":" + n.userSort + ":" + n.limit;
                        return null != t && t.refreshCache && a.invalidateItem(e, n), a.queueItem(e, n, t)
                    }
                },
                as = (null === (A = null === (A = window.CoreRobloxUtilities) || void 0 === A ? void 0 : A.dataStores) || void 0 === A ? void 0 : A.userDataStoreV2) || {
                    getFriends: fn(Mo.Friends),
                    getFollowers: fn(Mo.Followers),
                    getFollowings: fn(Mo.Followings),
                    getFriendsRequests: fn(Mo.Requests),
                    getUser: function(e) {
                        return ts.queueItem({
                            userId: e
                        })
                    },
                    clearUserDataStoreCache: function() {
                        rs.forEach(function(e) {
                            e.clearCache()
                        })
                    },
                    maxFriendRequestNotificationCount: 500,
                    FriendsUserSortType: as
                },
                Br = {
                    catalogDataStore: de,
                    gameAutoLocalizationDataStore: rn,
                    gameAutomaticTranslationDataStore: Ge,
                    gameLanguagesDataStore: Pn,
                    gameSourceLanguageDataStore: te,
                    gameThumbnailsDataStore: k,
                    gameTranslationAnalyticsDataStore: xe,
                    gamesDataStore: Br,
                    inventoryDataStore: Wr,
                    localeDataStore: G,
                    thumbnailsDataStore: pe,
                    translationProgressDataStore: g,
                    translationRolesDataStore: yr,
                    userDataStore: as,
                    userDataStoreV2: as
                },
                os = Ks(6933),
                ss = {
                    getAbsoluteUrl: Zo,
                    parseQueryString: Xo,
                    composeQueryString: Yo,
                    getQueryParam: function(e) {
                        return Xo()[e]
                    },
                    formatUrl: T.WU,
                    resolveUrl: T.DB,
                    parseUrl: T.Qc,
                    parseUrlAndQueryString: os.parseUrl,
                    extractQueryString: os.extract,
                    getGameDetailReferralUrls: function(e) {
                        return Zo("/games/refer?".concat(Yo(e)))
                    },
                    getUrlWithQueries: function(e, t) {
                        return Zo("".concat(e, "?").concat(Yo(t)))
                    }
                };

            function is() {}
            var us, cs, Wr = (is.prototype.getAbsoluteUrl = function(e) {
                if ("number" != typeof e) return null;
                var t = i.EnvironmentUrls.websiteUrl,
                    e = ss.formatUrl({
                        pathname: this.getRelativePath(e)
                    });
                return ss.resolveUrl(t, e)
            }, is.prototype.navigateTo = function(e) {
                e = this.getAbsoluteUrl(e);
                e && window.location.assign(e)
            }, is);

            function ls() {
                return null !== cs && cs.apply(this, arguments) || this
            }
            var ds, hs, G = ((us = function(e, t) {
                return (us = Object.setPrototypeOf || {
                        __proto__: []
                    }
                    instanceof Array && function(e, t) {
                        e.__proto__ = t
                    } || function(e, t) {
                        for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n])
                    })(e, t)
            }, function(e, t) {
                if ("function" != typeof t && null !== t) throw new TypeError("Class extends value " + String(t) + " is not a constructor or null");

                function n() {
                    this.constructor = e
                }
                us(e, t), e.prototype = null === t ? Object.create(t) : (n.prototype = t.prototype, new n)
            })(ls, cs = Wr), ls.prototype.getRelativePath = function(e) {
                return "/games/" + e
            }, ls.prototype.getReferralPath = function() {
                return "/games/refer"
            }, ls);

            function vs() {
                return null !== hs && hs.apply(this, arguments) || this
            }
            var ps, fs, pe = ((ds = function(e, t) {
                return (ds = Object.setPrototypeOf || {
                        __proto__: []
                    }
                    instanceof Array && function(e, t) {
                        e.__proto__ = t
                    } || function(e, t) {
                        for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n])
                    })(e, t)
            }, function(e, t) {
                if ("function" != typeof t && null !== t) throw new TypeError("Class extends value " + String(t) + " is not a constructor or null");

                function n() {
                    this.constructor = e
                }
                ds(e, t), e.prototype = null === t ? Object.create(t) : (n.prototype = t.prototype, new n)
            })(vs, hs = Wr), vs.prototype.getRelativePath = function(e) {
                return "/groups/" + e
            }, vs.prototype.getReferralPath = function() {
                return "/groups/refer"
            }, vs);

            function ms() {
                return null !== fs && fs.apply(this, arguments) || this
            }

            function gs(t, e) {
                var n, r = Object.keys(t);
                return Object.getOwnPropertySymbols && (n = Object.getOwnPropertySymbols(t), e && (n = n.filter(function(e) {
                    return Object.getOwnPropertyDescriptor(t, e).enumerable
                })), r.push.apply(r, n)), r
            }

            function ys(r) {
                for (var e = 1; e < arguments.length; e++) {
                    var a = null != arguments[e] ? arguments[e] : {};
                    e % 2 ? gs(Object(a), !0).forEach(function(e) {
                        var t, n;
                        t = r, e = a[n = e], n in t ? Object.defineProperty(t, n, {
                            value: e,
                            enumerable: !0,
                            configurable: !0,
                            writable: !0
                        }) : t[n] = e
                    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(r, Object.getOwnPropertyDescriptors(a)) : gs(Object(a)).forEach(function(e) {
                        Object.defineProperty(r, e, Object.getOwnPropertyDescriptor(a, e))
                    })
                }
                return r
            }

            function Gs() {
                return void 0 !== i.EventStream
            }

            function Is(e, t, n, r) {
                Gs() && i.EventStream.SendEventWithTarget && (r = Object.values(bs).includes(r) ? r : bs.WWW, i.EventStream.SendEventWithTarget(e, t, n, r))
            }(ps = function(e, t) {
                return (ps = Object.setPrototypeOf || {
                        __proto__: []
                    }
                    instanceof Array && function(e, t) {
                        e.__proto__ = t
                    } || function(e, t) {
                        for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n])
                    })(e, t)
            }, function(e, t) {
                if ("function" != typeof t && null !== t) throw new TypeError("Class extends value " + String(t) + " is not a constructor or null");

                function n() {
                    this.constructor = e
                }
                ps(e, t), e.prototype = null === t ? Object.create(t) : (n.prototype = t.prototype, new n)
            })(ms, fs = Wr), ms.prototype.getRelativePath = function(e) {
                return "/users/" + e + "/profile"
            }, ms.prototype.getReferralPath = function() {
                return "/users/refer"
            }, g = ms, yr = {
                game: new G,
                group: new pe,
                user: new g
            };
            var bs = ys(ys({}, {
                    DEFAULT: 0,
                    WWW: 1,
                    STUDIO: 2,
                    DIAGNOSTIC: 3
                }), Gs() ? i.EventStream.TargetTypes : {}),
                Ps = {
                    eventTypes: {
                        formInteraction: "formInteraction",
                        modalAction: "modalAction",
                        pageLoad: "pageLoad"
                    },
                    targetTypes: bs,
                    sendEvent: function(e, t) {
                        var n = e.name,
                            r = e.type,
                            a = e.context,
                            e = e.requiredParams,
                            o = ys({
                                btn: n
                            }, t);
                        Array.isArray(e) && e.forEach(function(e) {
                            Object.prototype.hasOwnProperty.call(o, e) || console.info("A required event parameter '".concat(e, "' is not provided"))
                        }), Is(r, a, o)
                    },
                    sendEventWithTarget: Is,
                    sendGamePlayEvent: function(e, t, n) {
                        i.GamePlayEvents && i.GamePlayEvents.SendGamePlayIntent && i.GamePlayEvents.SendGamePlayIntent(e, t, n)
                    }
                },
                ws = (as = i.Hybrid || {}).Chat,
                Cs = as.Navigation,
                Ts = as.Overlay,
                As = as.Game,
                qs = as.Localization;

            function Ls(e) {
                return void 0 === e ? function() {} : e
            }

            function Ss(e) {
                var t = e.eventName,
                    n = e.ctx,
                    e = e.properties;
                Ps.sendEventWithTarget(t, n, e)
            }

            function Us(e, t) {
                Ps.sendGamePlayEvent(e, t)
            }
            var Wr = {
                    startChatConversation: function(e, t) {
                        ws && ws.startChatConversation(e, Ls(t))
                    },
                    startWebChatConversation: function(e, t) {
                        Cs && Cs.startWebChatConversation(e, Ls(t))
                    },
                    navigateToFeature: function(e, t) {
                        Cs && Cs.navigateToFeature(e, Ls(t))
                    },
                    openUserProfile: function(e, t) {
                        Cs && Cs.openUserProfile(e, Ls(t))
                    },
                    close: function(e) {
                        Ts && Ts.close(Ls(e))
                    },
                    launchGame: function(e, t) {
                        As && As.launchGame(e, Ls(t))
                    },
                    localization: function(e, t) {
                        qs && qs.languageChangeTrigger && qs.languageChangeTrigger(e, Ls(t))
                    }
                },
                Rs = (i.CurrentUser || {}).userId,
                Os = {
                    friends: "Friends",
                    followers: "Followers",
                    requests: "Requests",
                    followings: "Followings"
                },
                Ds = {
                    friendsDict: function(e) {
                        return "Roblox.".concat(Os[e], "Dict.UserId").concat(Rs || 0)
                    }
                },
                G = {
                    buildPlayGameProperties: function(e, t, n, r) {
                        return {
                            rootPlaceId: e,
                            placeId: t,
                            gameInstanceId: n,
                            playerId: r
                        }
                    },
                    launchGame: function(e, t) {
                        var n, r, a, o;
                        i.GameLauncher && (n = t, r = e.rootPlaceId, a = e.placeId, o = e.gameInstanceId, t = e.playerId, a === r && o ? (n.properties.gameInstanceId = o, Ss(n), Us(n.gamePlayIntentEventCtx, r), e = a, o = o, i.GameLauncher.joinGameInstance(e, o, !0, !0)) : r && t ? (n.properties.playerId = t, Ss(n), Us(n.gamePlayIntentEventCtx, r), t = t, i.GameLauncher.followPlayerIntoGame(t)) : (Ss(n), Us(n.gamePlayIntentEventCtx, a), a = a, i.GameLauncher.joinMultiplayerGame(a)))
                    }
                },
                xs = i.EnvironmentUrls.friendsApi,
                Es = i.EnvironmentUrls.presenceApi,
                Bs = i.EnvironmentUrls.websiteUrl,
                Fs = function(e) {
                    return "".concat(Bs, "/users/").concat(e, "/profile")
                },
                zs = function() {
                    return "".concat(Es, "/v1/presence/users")
                },
                js = 100,
                Ns = {
                    friends: function(e) {
                        return "".concat(xs, "/v1/users/").concat(e, "/friends")
                    },
                    followers: function(e) {
                        return "".concat(xs, "/v1/users/").concat(e, "/followers")
                    },
                    followings: function(e) {
                        return "".concat(xs, "/v1/users/").concat(e, "/followings")
                    },
                    friendrequests: function() {
                        return "".concat(xs, "/v1/my/friends/requests")
                    }
                };

            function ks(r, a, o) {
                var e = {
                        url: Ns[a](i.CurrentUser.userId),
                        retryable: !0,
                        withCredentials: !0
                    },
                    t = {
                        url: zs(),
                        retryable: !0,
                        withCredentials: !0
                    };
                return m.get(e).then(function(e) {
                    var e = e.data.data || e,
                        n = [];
                    return r[a] = {}, e.forEach(function(e) {
                        var t = e.id;
                        n.push(t), e.profileUrl = Fs(t), r[a][t] = e
                    }), m.buildBatchPromises(n, js, t, !0).then(function(e) {
                        var t, n;
                        return e && 0 < e.length && (t = [], e.forEach(function(e) {
                            e = e.data.userPresences;
                            t = t.concat(e)
                        }), t.forEach(function(e) {
                            r[a][e.userId].presence = e
                        })), o && (Ma.saveDataByTimeStamp(Ds.friendsDict(a), r[a]), n = a, document.addEventListener("Roblox.Logout", function() {
                            Ma.removeLocalStorage(Ds.friendsDict(n))
                        })), r[a]
                    })
                })
            }

            function _s(e, t, n) {
                var r = n.expirationMS,
                    a = n.isEnabled;
                if (a) {
                    var o = (n = t, r = r, (r = Ma.fetchNonExpiredCachedData(Ds.friendsDict(n), r)) ? r.data : null);
                    if (o) return new Promise(function(e) {
                        e(o)
                    })
                }
                return ks(e, t, a)
            }

            function Ws(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var r = t[n];
                    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
                }
            }(pe = new(function() {
                function t() {
                    ! function(e) {
                        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                    }(this), this.callbacks = new Set, this.friendsDict = {}
                }
                var e, n, r;
                return e = t, (n = [{
                    key: "unSubscribe",
                    value: function(e) {
                        this.callbacks.delete(e)
                    }
                }, {
                    key: "subscribe",
                    value: function(e, a, t) {
                        var o = this,
                            n = "function" == typeof e,
                            s = t && t.isEnabled;
                        n && this.callbacks.add(e), s && this.friendsDict[a] ? n && e(this.friendsDict[a]) : _s(this.friendsDict, a, t).then(function(t) {
                            var n, r;
                            s && (n = a, (r = t) && document.addEventListener("Roblox.Presence.Update", function(e, t) {
                                t && setTimeout(function() {
                                    t.forEach(function(e) {
                                        var t = e.userId;
                                        r[t] && (r[t].presence = e)
                                    }), Ma.saveDataByTimeStamp(Ds.friendsDict(n), r)
                                })
                            })), o.friendsDict[a] = t, o.callbacks.forEach(function(e) {
                                e(t)
                            })
                        })
                    }
                }, {
                    key: "refreshCacheData",
                    value: function(e, t) {
                        t = t.isEnabled;
                        return ks(this.friendsDict, e, t)
                    }
                }]) && Ws(e.prototype, n), r && Ws(e, r), t
            }())).TYPE = {
                FRIENDS: "friends",
                FOLLOWERS: "followers",
                FOLLOWINGS: "followings",
                FRIENDREQUESTS: "friendrequests"
            };
            var g = pe,
                Ms = i.EnvironmentUrls.metricsApi,
                as = function() {
                    var e = document.getElementsByName("performance")[0];
                    return e ? {
                        performanceMetricsBatchWaitTime: function(e) {
                            if (!e) return 0;
                            e = e.split(":");
                            return 1e3 * (60 * parseInt(e[0], 10) * 60 + 60 * parseInt(e[1], 10) + parseInt(e[2], 10))
                        }(e.getAttribute("data-ui-performance-metrics-batch-wait-time")),
                        performanceMetricsBatchSize: parseInt(e.getAttribute("data-ui-performance-metrics-batch-size"), 10)
                    } : {}
                },
                Qs = function() {
                    return (Qs = Object.assign || function(e) {
                        for (var t, n = 1, r = arguments.length; n < r; n++)
                            for (var a in t = arguments[n]) Object.prototype.hasOwnProperty.call(t, a) && (e[a] = t[a]);
                        return e
                    }).apply(this, arguments)
                },
                Hs = function(e, t) {
                    var n = {};
                    for (a in e) Object.prototype.hasOwnProperty.call(e, a) && t.indexOf(a) < 0 && (n[a] = e[a]);
                    if (null != e && "function" == typeof Object.getOwnPropertySymbols)
                        for (var r = 0, a = Object.getOwnPropertySymbols(e); r < a.length; r++) t.indexOf(a[r]) < 0 && Object.prototype.propertyIsEnumerable.call(e, a[r]) && (n[a[r]] = e[a[r]]);
                    return n
                },
                pe = new $e,
                Vs = 0,
                as = ($e = as()).performanceMetricsBatchWaitTime,
                $e = $e.performanceMetricsBatchSize,
                Js = pe.createRequestProcessor(function(e) {
                    var t = {
                            url: Ms + "/v1/performance/measurements",
                            retryable: !0,
                            withCredentials: !0
                        },
                        n = e.map(function(e) {
                            e = e.data, e.taskId, e = Hs(e, ["taskId"]);
                            return Qs({}, e)
                        });
                    return m.post(t, n).then(function() {
                        var t = {};
                        return e.forEach(function(e) {
                            e = e.key;
                            t[e] = !0
                        }), t
                    })
                }, function(e) {
                    e = e.taskId;
                    return null == e ? void 0 : e.toString()
                }, {
                    batchSize: $e || 100,
                    processBatchWaitTime: as || 1e4
                }),
                as = {
                    logMeasurement: function(e) {
                        var t = Vs;
                        return Vs += 1, Js.queueItem(Qs({
                            taskId: t
                        }, e))
                    }
                };
            window.CoreRobloxUtilities = {
                dataStores: Br,
                entityUrl: yr,
                eventStreamService: Ps,
                hybridService: Wr,
                localStorageService: Ma,
                localStorageNames: Ds,
                playGameService: G,
                userInfoService: g,
                metricsService: as
            }
        }()
}();
//# sourceMappingURL=https://js.rbxcdn.com/bb32bbe19b61b2170d45-coreRobloxUtilities.js.map

/* Bundle detector */
window.Roblox && window.Roblox.BundleDetector && window.Roblox.BundleDetector.bundleDetected("CoreRobloxUtilities");