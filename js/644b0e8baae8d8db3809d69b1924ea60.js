
// bundle: idewelcomepage___8821d31b625860a1a0417424580a1aaf_m
// files: roblox.js, GoogleAnalytics/GoogleAnalyticsEvents.js, PlaceLauncher.js, ClientInstaller.js, jquery.simplemodal-1.3.5.js, GenericModal.js, GenericConfirmation.js, jquery.ba-postmessage.min.js, parentFrameLogin.js, IDE/Welcome.js, IDE/BuildTemplates.js, StringTruncator.js

// roblox.js
(function(n, t) {
  function p(n, i) {
    var r = i.split(".");
    for (i = r.shift(); r.length > 0; n = n[i], i = r.shift())
      if (n[i] === t) return t;
    return n[i]
  }

  function k(n, i, r) {
    var u = i.split(".");
    for (i = u.shift(); u.length > 0; n = n[i], i = u.shift()) n[i] === t && (n[i] = {});
    n[i] = r
  }

  function nt(n, t) {
    var i = f.createElement("link");
    i.href = n, i.rel = "stylesheet", i.type = "text/css", u.parentNode.insertBefore(i, u), t()
  }

  function g(n, t) {
    var i = f.createElement("script");
    i.type = "text/javascript", i.src = n, i.onload = i.onreadystatechange = function() {
      i.readyState && i.readyState != "loaded" && i.readyState != "complete" || (t(), i.onload = i.onreadystatechange = null)
    }, u.parentNode.insertBefore(i, u)
  }

  function d(n) {
    return n.split(".").pop().split("?").shift()
  }

  function o(n) {
    if (n.indexOf(".js") < 0) return n;
    if (n.indexOf(r.modulePath) >= 0) return n.split(r.modulePath + "/").pop().split(".").shift().replace("/", ".");
    for (var t in r.paths)
      if (r.paths[t] == n) return t;
    return n
  }

  function v(n) {
    return n.indexOf(".js") >= 0 || n.indexOf(".css") >= 0 ? n : r.paths[n] || r.baseUrl + r.modulePath + "/" + n.replace(".", "/") + ".js"
  }

  function s(n) {
    for (var r, u = [], i = 0; i < n.length; i++) r = p(Roblox, o(n[i])), r !== t && u.push(r);
    return u
  }

  function e(n) {
    var t = i[n];
    if (t.loaded && t.depsLoaded)
      while (t.listeners.length > 0) t.listeners.shift()()
  }

  function a(n, u) {
    var f, s, h;
    if (!b(n) || r.externalResources.toString().indexOf(n) >= 0) return u();
    f = o(n), i[f] === t ? (i[f] = {
      loaded: !1,
      depsLoaded: !0,
      listeners: []
    }, i[f].listeners.push(u), s = v(f), h = d(s) == "css" ? nt : g, h(s, function() {
      i[f].loaded = !0, e(f)
    })) : (i[f].listeners.push(u), e(f))
  }

  function h(n, t) {
    var r = n.shift(),
        i = n.length == 0 ? t : function() {
          h(n, t)
        };
    a(r, i)
  }

  function l(n, t) {
    c(n) || (n = [n]);
    var i = function() {
      t.apply(null, s(n))
    };
    h(n.slice(0), i)
  }

  function y(n, t, r) {
    w(t) ? (r = t, t = []) : c(t) || (t = [t]), i[n] = i[n] || {
      loaded: !0,
      listeners: []
    }, i[n].depsLoaded = !1, i[n].listeners.unshift(function() {
      k(Roblox, n, r.apply(null, s(t)))
    }), l(t, function() {
      i[n].depsLoaded = !0, e(n)
    })
  }
  var f = n.document,
      u = f.getElementsByTagName("script")[0],
      b = function(n) {
        return typeof n == "string"
      },
      c = function(n) {
        return Object.prototype.toString.call(n) == "[object Array]"
      },
      w = function(n) {
        return Object.prototype.toString.call(n) == "[object Function]"
      },
      i = {},
      r = {
        baseUrl: "",
        modulePath: "/js/modules",
        paths: {},
        externalResources: []
      };
  typeof Roblox == "undefined" && (Roblox = {}, Roblox.config = r, Roblox.require = l, Roblox.define = y)
})(window);


// PlaceLauncher.js
var RBX = {},
    RobloxLaunchStates = {
      StartingServer: "StartingServer",
      StartingClient: "StartingClient",
      Upgrading: "Upgrading",
      None: "None"
    },
    RobloxLaunch = {
      launchGamePage: "/install/download.aspx",
      timer: null,
      clientMetricType: null,
      launcher: null,
      googleAnalyticsCallback: function() {},
      state: RobloxLaunchStates.None
    },
    RobloxPlaceLauncherService = {
      LogJoinClick: function() {
        $.get("/Game/Placelauncher.ashx", {
          request: "LogJoinClick"
        })
      },
      RequestGame: function(n, t, i, r, u, f) {
        i = i !== null && i !== undefined ? i : "", $.getJSON("/Game/PlaceLauncher.ashx", {
          request: "RequestGame",
          placeId: n,
          isPartyLeader: t,
          gender: i
        }, function(n) {
          n.Error ? u(n.Error, f) : r(n, f)
        })
      },
      RequestPlayWithParty: function(n, t, i, r, u, f) {
        $.getJSON("/Game/PlaceLauncher.ashx", {
          request: "RequestPlayWithParty",
          placeId: n,
          partyGuid: t,
          gameId: i
        }, function(n) {
          n.Error ? u(n.Error, f) : r(n, f)
        })
      },
      RequestGroupBuildGame: function(n, t, i, r) {
        $.getJSON("/Game/PlaceLauncher.ashx", {
          request: "RequestGroupBuildGame",
          placeId: n
        }, function(n) {
          n.Error ? i(n.Error, r) : t(n, r)
        })
      },
      RequestFollowUser: function(n, t, i, r) {
        $.getJSON("/Game/PlaceLauncher.ashx", {
          request: "RequestFollowUser",
          userId: n
        }, function(n) {
          n.Error ? i(n.Error, r) : t(n, r)
        })
      },
      RequestGameJob: function(n, t, i, r, u, f) {
        $.getJSON("/Game/PlaceLauncher.ashx", {
          request: "RequestGameJob",
          placeId: n,
          gameId: t,
          gameJobId: i
        }, function(n) {
          n.Error ? u(n.Error, f) : r(n, f)
        })
      },
      CheckGameJobStatus: function(n, t, i, r) {
        $.getJSON("/Game/PlaceLauncher.ashx", {
          request: "CheckGameJobStatus",
          jobId: n
        }, function(n) {
          n.Error ? i(n.Error, r) : t(n, r)
        })
      }
    };
RobloxLaunch.RequestPlayWithParty = function(n, t, i, r) {
  RobloxPlaceLauncherService.LogJoinClick(), RobloxLaunch.timer = new Date, RobloxLaunch.state = RobloxLaunchStates.None, RobloxLaunch.clientMetricType = "WebPlay", checkRobloxInstall() && (RobloxLaunch.launcher === null && (RobloxLaunch.launcher = new RBX.PlaceLauncher(n)), RobloxLaunch.launcher.RequestPlayWithParty(t, i, r))
}, RobloxLaunch.RequestGame = function(n, t, i) {
  RobloxPlaceLauncherService.LogJoinClick(), RobloxLaunch.timer = new Date, RobloxLaunch.state = RobloxLaunchStates.None, RobloxLaunch.clientMetricType = "WebPlay", checkRobloxInstall() && (RobloxLaunch.launcher === null && (RobloxLaunch.launcher = new RBX.PlaceLauncher(n)), RobloxLaunch.launcher.RequestGame(t, i))
}, RobloxLaunch.RequestGroupBuildGame = function(n, t) {
  RobloxPlaceLauncherService.LogJoinClick(), RobloxLaunch.timer = new Date, RobloxLaunch.state = RobloxLaunchStates.None, RobloxLaunch.clientMetricType = "WebPlay", checkRobloxInstall() && (RobloxLaunch.launcher === null && (RobloxLaunch.launcher = new RBX.PlaceLauncher(n)), RobloxLaunch.launcher.RequestGroupBuildGame(t))
}, RobloxLaunch.RequestGameJob = function(n, t, i, r) {
  RobloxPlaceLauncherService.LogJoinClick(), RobloxLaunch.timer = new Date, RobloxLaunch.state = RobloxLaunchStates.None, RobloxLaunch.clientMetricType = "WebJoin", checkRobloxInstall() && (RobloxLaunch.launcher === null && (RobloxLaunch.launcher = new RBX.PlaceLauncher(n)), RobloxLaunch.launcher.RequestGameJob(t, i, r))
}, RobloxLaunch.RequestFollowUser = function(n, t) {
  RobloxPlaceLauncherService.LogJoinClick(), RobloxLaunch.timer = new Date, RobloxLaunch.state = RobloxLaunchStates.None, RobloxLaunch.clientMetricType = "WebFollow", checkRobloxInstall() && (RobloxLaunch.launcher === null && (RobloxLaunch.launcher = new RBX.PlaceLauncher(n)), RobloxLaunch.launcher.RequestFollowUser(t))
}, RobloxLaunch.StartGame = function(n, t, i, r, u) {
  var f = function(r) {
    RobloxLaunch.StartGameWork(n, t, i, r, u)
  };
  r == "FETCH" ? $.get("/Game/GetAuthTicket", f) : f(r)
}, RobloxLaunch.StartGameWork = function(n, t, i, r, u) {
  var o, f, e, s;
  i = i.replace("http://", "https://"), n.indexOf("http") >= 0 && (n = typeof RobloxLaunch.SeleniumTestMode == "undefined" ? n + "&testmode=false" : n + "&testmode=true"), typeof urchinTracker != "undefined" && urchinTracker("Visit/Try/" + t), RobloxLaunch.state = RobloxLaunchStates.StartingClient, RobloxLaunch.googleAnalyticsCallback !== null && RobloxLaunch.googleAnalyticsCallback(), o = null;
  try {
    if (typeof window.external != "undefined" && window.external.IsRoblox2App && (n.indexOf("visit") != -1 || u)) window.external.StartGame(r, i, n);
    else if (o = "RobloxProxy/", f = Roblox.Client.CreateLauncher(!0), f) {
      o = "RobloxProxy/StartGame/";
      try {
        try {
          window.ActiveXObject ? f.AuthenticationTicket = r : f.Put_AuthenticationTicket(r), u && f.SetEditMode()
        } catch (a) {}
        try {
          if (Roblox.Client._silentModeEnabled) f.SetSilentModeEnabled(!0), Roblox.VideoPreRoll.videoInitialized && Roblox.VideoPreRoll.isPlaying() && Roblox.Client.SetStartInHiddenMode(!0), f.StartGame(i, n), RobloxLaunch.CheckGameStarted(f);
          else throw "silent mode is disabled, fall back";
        } catch (a) {
          if (f.StartGame(i, n), Roblox.Client._bringAppToFrontEnabled) try {
            f.BringAppToFront()
          } catch (h) {}
          Roblox.Client.ReleaseLauncher(f, !0, !1), $.modal.close()
        }
      } catch (a) {
        Roblox.Client.ReleaseLauncher(f, !0, !1);
        throw a;
      }
    } else {
      try {
        parent.playFromUrl(n);
        return
      } catch (l) {}
      if (Roblox.Client.isRobloxBrowser()) try {
        window.external.StartGame(r, i, n)
      } catch (l) {
        throw "window.external fallback failed, Roblox must not be installed or IE cannot access ActiveX";
      } else throw "launcher is null or undefined and external is missing";
      RobloxLaunch.state = RobloxLaunchStates.None, $.modal.close()
    }
  } catch (a) {
    if (e = a.message, e === "User cancelled" && typeof urchinTracker != "undefined") return urchinTracker("Visit/UserCancelled/" + t), !1;
    try {
      s = new ActiveXObject("Microsoft.XMLHTTP")
    } catch (c) {
      e = "FailedXMLHTTP/" + e
    }
    return Roblox.Client.isRobloxBrowser() ? typeof urchinTracker != "undefined" && urchinTracker("Visit/Fail/" + o + encodeURIComponent(e)) : (typeof urchinTracker != "undefined" && urchinTracker("Visit/Redirect/" + o + encodeURIComponent(e)), window.location = RobloxLaunch.launchGamePage), !1
  }
  return typeof urchinTracker != "undefined" && urchinTracker("Visit/Success/" + t), !0
}, RobloxLaunch.StartApp = function(n, t) {
  var i = function(i) {
    RobloxLaunch.StartAppWork(n, t, i)
  };
  $.get("/Game/GetAuthTicket", i)
}, RobloxLaunch.StartAppWork = function(n, t, i) {
  var f, r, u;
  RobloxLaunch.state = RobloxLaunchStates.StartingClient, f = null;
  try {
    if (typeof window.external != "undefined" && window.external.IsRoblox2App) window.external.StartGame(i, t, n);
    else if (f = "RobloxProxy/", r = Roblox.Client.CreateLauncher(!0), r) {
      f = "RobloxProxy/StartGame/";
      try {
        try {
          window.ActiveXObject ? r.AuthenticationTicket = i : r.Put_AuthenticationTicket(i)
        } catch (h) {}
        try {
          if (Roblox.Client._silentModeEnabled) r.SetSilentModeEnabled(!0), Roblox.VideoPreRoll.videoInitialized && Roblox.VideoPreRoll.isPlaying() && Roblox.Client.SetStartInHiddenMode(!0), r.StartGame(t, n), RobloxLaunch.CheckGameStarted(r);
          else throw "silent mode is disabled, fall back";
        } catch (h) {
          if (r.StartGame(t, n), Roblox.Client._bringAppToFrontEnabled) try {
            r.BringAppToFront()
          } catch (e) {}
          Roblox.Client.ReleaseLauncher(r, !0, !1), $.modal.close()
        }
      } catch (h) {
        Roblox.Client.ReleaseLauncher(r, !0, !1);
        throw h;
      }
    } else {
      try {
        parent.playFromUrl(n);
        return
      } catch (s) {}
      if (Roblox.Client.isRobloxBrowser()) try {
        window.external.StartGame(i, t, n)
      } catch (s) {
        throw "window.external fallback failed, Roblox must not be installed or IE cannot access ActiveX";
      } else throw "launcher is null or undefined and external is missing";
      RobloxLaunch.state = RobloxLaunchStates.None, $.modal.close()
    }
  } catch (h) {
    if (u = h.message, u === "User cancelled") return !1;
    try {
      new ActiveXObject("Microsoft.XMLHTTP")
    } catch (o) {
      u = "FailedXMLHTTP/" + u
    }
    return Roblox.Client.isRobloxBrowser() || (window.location = RobloxLaunch.launchGamePage), !1
  }
  return !0
}, RobloxLaunch.CheckGameStarted = function(n) {
  function r() {
    var e = !1;
    try {
      if (i || (i = window.ActiveXObject ? n.IsGameStarted : n.Get_GameStarted()), i && !Roblox.VideoPreRoll.isPlaying()) {
        if (MadStatus.stop("Connecting to Players..."), RobloxLaunch.state = RobloxLaunchStates.None, $.modal.close(), t._cancelled = !0, Roblox.Client._hiddenModeEnabled && Roblox.Client.UnhideApp(), Roblox.Client._bringAppToFrontEnabled) try {
          n.BringAppToFront()
        } catch (f) {}
        Roblox.Client.ReleaseLauncher(n, !0, !1)
      } else t._cancelled || setTimeout(r, 1e3)
    } catch (u) {
      t._cancelled || setTimeout(r, 1e3)
    }
  }
  var t = RobloxLaunch.launcher,
      i;
  t === null && (t = new RBX.PlaceLauncher("PlaceLauncherStatusPanel"), t._showDialog(), t._updateStatus(0)), i = !1, r()
}, RobloxLaunch.CheckRobloxInstall = function(n) {
  if (Roblox.Client.IsRobloxInstalled()) return Roblox.Client.Update(), !0;
  window.location = n
}, RBX.PlaceLauncher = function(n) {
  this._cancelled = !1, this._popupID = n, this._popup = $("#" + n)
}, RBX.PlaceLauncher.prototype = {
  _showDialog: function() {
    this._cancelled = !1, _popupOptions = {
      escClose: !0,
      opacity: 80,
      overlayCss: {
        backgroundColor: "#000"
      }
    }, this._popupID == "PlaceLauncherStatusPanel" && (Roblox.VideoPreRoll && Roblox.VideoPreRoll.showVideoPreRoll && !Roblox.VideoPreRoll.isExcluded() ? (this._popup = $("#videoPrerollPanel"), _popupOptions.onShow = function(n) {
      Roblox.VideoPreRoll.correctIEModalPosition(n), Roblox.VideoPreRoll.start()
    }, _popupOptions.onClose = function() {
      Roblox.VideoPreRoll.close()
    }, _popupOptions.closeHTML = '<a href="#" class="ImageButton closeBtnCircle_35h ABCloseCircle VprCloseButton"></a>') : (this._popup = $("#" + this._popupID), _popupOptions.onClose = function() {
      Roblox.VideoPreRoll.logVideoPreRoll(), $.modal.close()
    })), this._popup.modal(_popupOptions);
    var n = this;
    $(".CancelPlaceLauncherButton").click(function() {
      n.CancelLaunch()
    }), $(".CancelPlaceLauncherButton").show()
  },
  _reportDuration: function(n, t) {
    $.ajax({
      type: "GET",
      async: !0,
      cache: !1,
      timeout: 5e4,
      url: "/Game/JoinRate.ashx?c=" + RobloxLaunch.clientMetricType + "&r=" + t + "&d=" + n,
      success: function() {}
    })
  },
  _onGameStatus: function(n) {
    var r, i, t;
    if (this._cancelled) {
      r = +new Date - RobloxLaunch.timer.getTime(), this._reportDuration(r, "Cancel");
      return
    }
    if (this._updateStatus(n.status), n.status === 2) RobloxLaunch.StartGame(n.joinScriptUrl, "Join", n.authenticationUrl, n.authenticationTicket), i = +new Date - RobloxLaunch.timer.getTime(), this._reportDuration(i, "Success");
    else if (n.status < 2 || n.status === 6) {
      var f = function(n, t) {
            t._onGameStatus(n)
          },
          e = function(n, t) {
            t._onGameError(n)
          },
          o = this,
          u = function() {
            RobloxPlaceLauncherService.CheckGameJobStatus(n.jobId, f, e, o)
          };
      window.setTimeout(u, 2e3)
    } else n.status === 4 && (t = +new Date - RobloxLaunch.timer.getTime(), this._reportDuration(t, "Failure"))
  },
  _updateStatus: function(n) {
    MadStatus.running || (MadStatus.init($(this._popup).find(".MadStatusField"), $(this._popup).find(".MadStatusBackBuffer"), 2e3, 800), MadStatus.start());
    switch (n) {
      case 0:
        break;
      case 1:
        MadStatus.manualUpdate("A server is loading the game...", !0);
        break;
      case 2:
        MadStatus.manualUpdate("The server is ready. Joining the game...", !0);
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
        MadStatus.manualUpdate("The game you requested is currently full. Waiting for an opening...", !0, !1);
        break;
      case 7:
        MadStatus.manualUpdate("Roblox is updating. Please wait...", !0);
        break;
      case 8:
        MadStatus.manualUpdate("Requesting a server", !0);
        break;
      default:
        MadStatus.stop("Connecting to Players...")
    }
    $(this._popup).find(".MadStatusStarting").css("display", "none"), $(this._popup).find(".MadStatusSpinner").css("visibility", n === 3 || n === 4 || n === 5 ? "hidden" : "visible")
  },
  _onGameError: function() {
    this._updateStatus(4)
  },
  _startUpdatePolling: function(n) {
    var t, i;
    try {
      if (RobloxLaunch.state = RobloxLaunchStates.Upgrading, t = Roblox.Client.CreateLauncher(!0), i = window.ActiveXObject ? t.IsUpToDate : t.Get_IsUpToDate(), i || i === undefined) {
        try {
          t.PreStartGame()
        } catch (e) {}
        Roblox.Client.ReleaseLauncher(t, !0, !1), RobloxLaunch.state = RobloxLaunchStates.StartingServer, n();
        return
      }
      var f = function(t, i, r) {
            r._onUpdateStatus(t, i, n)
          },
          u = function(n, t) {
            t._onUpdateError(n)
          },
          r = this;
      this.CheckUpdateStatus(f, u, t, n, r)
    } catch (e) {
      Roblox.Client.ReleaseLauncher(t, !0, !1), n()
    }
  },
  _onUpdateStatus: function(n, t, i) {
    if (!this._cancelled)
      if (this._updateStatus(n), n === 8) Roblox.Client.ReleaseLauncher(t, !0, !0), Roblox.Client.Refresh(), RobloxLaunch.state = RobloxLaunchStates.StartingServer, i();
      else if (n === 7) {
        var f = function(n, t, r) {
              r._onUpdateStatus(n, t, i)
            },
            e = function(n, t) {
              t._onUpdateError(n)
            },
            r = this,
            u = function() {
              r.CheckUpdateStatus(f, e, t, i, r)
            };
        window.setTimeout(u, 2e3)
      } else alert("Unknown status from CheckUpdateStatus")
  },
  _onUpdateError: function() {
    this._updateStatus(2)
  },
  CheckUpdateStatus: function(n, t, i, r, u) {
    try {
      if (i.PreStartGame(), window.ActiveXObject) var f = i.IsUpToDate;
      else f = i.Get_IsUpToDate();
      f || f === undefined ? n(8, i, u) : n(7, i, u)
    } catch (e) {
      n(8, i, u)
    }
  },
  RequestGame: function(n, t) {
    var r;
    this._showDialog();
    var f = function(n, t) {
          t._onGameStatus(n)
        },
        u = function(n, t) {
          t._onGameError(n)
        },
        e = this,
        i = !1;
    return typeof Party != "undefined" && typeof Party.AmILeader == "function" && (i = Party.AmILeader()), r = function() {
      RobloxPlaceLauncherService.RequestGame(n, i, t, f, u, e)
    }, this._startUpdatePolling(r), !1
  },
  RequestPlayWithParty: function(n, t, i) {
    this._showDialog();
    var f = function(n, t) {
          t._onGameStatus(n)
        },
        e = function(n, t) {
          t._onGameError(n)
        },
        r = this,
        u = function() {
          RobloxPlaceLauncherService.RequestPlayWithParty(n, t, i, f, e, r)
        };
    return this._startUpdatePolling(u), !1
  },
  RequestGroupBuildGame: function(n) {
    this._showDialog();
    var r = function(n, t) {
          t._onGameStatus(n, !0)
        },
        u = function(n, t) {
          t._onGameError(n)
        },
        t = this,
        i = function() {
          RobloxPlaceLauncherService.RequestGroupBuildGame(n, r, u, t)
        };
    return this._startUpdatePolling(i), !1
  },
  RequestFollowUser: function(n) {
    this._showDialog();
    var r = function(n, t) {
          t._onGameStatus(n)
        },
        u = function(n, t) {
          t._onError(n)
        },
        t = this,
        i = function() {
          RobloxPlaceLauncherService.RequestFollowUser(n, r, u, t)
        };
    return this._startUpdatePolling(i), !1
  },
  RequestGameJob: function(n, t, i) {
    this._showDialog();
    var f = function(n, t) {
          t._onGameStatus(n)
        },
        e = function(n, t) {
          t._onGameError(n)
        },
        r = this,
        u = function() {
          RobloxPlaceLauncherService.RequestGameJob(n, t, i, f, e, r)
        };
    return this._startUpdatePolling(u), !1
  },
  CancelLaunch: function() {
    return this._cancelled = !0, $.modal.close(), !1
  },
  dispose: function() {
    RBX.PlaceLauncher.callBaseMethod(this, "dispose")
  }
};

// ClientInstaller.js
function tryToDownload() {
  oIFrm = document.getElementById("downloadInstallerIFrame"), oIFrm.src = "/install/setup.ashx"
}

function logStatistics(n) {
  $.get("/install/VisitButtonHandler.ashx?reqtype=" + n, function() {})
}
Roblox.Client = {}
Roblox.Client._installHost = null, Roblox.Client._installSuccess = null, Roblox.Client._CLSID = null, Roblox.Client._continuation = null, Roblox.Client._skip = null, Roblox.Client._isIDE = null, Roblox.Client._isRobloxBrowser = null, Roblox.Client._isPlaceLaunch = !1, Roblox.Client._silentModeEnabled = !1, Roblox.Client._bringAppToFrontEnabled = !1, Roblox.Client._numLocks = 0, Roblox.Client._logTiming = !1, Roblox.Client._logStartTime = null, Roblox.Client._logEndTime = null, Roblox.Client._hiddenModeEnabled = !1, Roblox.Client._runInstallABTest = function() {}, Roblox.Client.ReleaseLauncher = function(n, t, i) {
  if (t && Roblox.Client._numLocks--, (i || Roblox.Client._numLocks <= 0) && (n != null && (document.getElementById("pluginObjDiv").innerHTML = "", n = null), Roblox.Client._numLocks = 0), Roblox.Client._logTiming) {
    Roblox.Client._logEndTime = new Date;
    var r = Roblox.Client._logEndTime.getTime() - Roblox.Client._logStartTime.getTime();
    console && console.log && console.log("Roblox.Client: " + r + "ms from Create to Release.")
  }
}, Roblox.Client.GetInstallHost = function(n) {
  if (window.ActiveXObject) return n.InstallHost;
  var t = n.Get_InstallHost();
  return t.match(/rbx2016.nl$/) ? t : t.substring(0, t.length - 1)
}, Roblox.Client.CreateLauncher = function(n) {
  var i, u, t, r;
  Roblox.Client._logTiming && (Roblox.Client._logStartTime = new Date), n && Roblox.Client._numLocks++, (Roblox.Client._installHost == null || Roblox.Client._CLSID == null) && typeof initClientProps == "function" && initClientProps(), i = document.getElementById("robloxpluginobj"), u = $("#pluginObjDiv"), i || (Roblox.Client._hiddenModeEnabled = !1, window.ActiveXObject ? (t = '<object classid="clsid:' + Roblox.Client._CLSID + '"', t += ' id="robloxpluginobj" type="application/x-vnd-roblox-launcher"', t += ' codebase="' + Roblox.Client._installHost + '">Failed to INIT Plugin</object>', $(u).append(t)) : (t = '<object id="robloxpluginobj" type="application/x-vnd-roblox-launcher">', t += "<p>" + Roblox.Client.Resources.youNeedTheLatest, t += '<a href="' + Roblox.Client._installHost + '">' + Roblox.Client.Resources.here + "</a>.</p></object>", $(u).append(t)), i = document.getElementById("robloxpluginobj"));
  try {
    if (i || (typeof console.log == "undefined" ? alert(Roblox.Client.Resources.plugInInstallationFailed) : console.log("Plugin installation failed!")), i.Hello(), r = Roblox.Client.GetInstallHost(i), !r || r != Roblox.Client._installHost) throw "wrong InstallHost: (plugins):  " + r + "  (servers):  " + Roblox.Client._installHost;
    return i
  } catch (f) {
    return Roblox.Client.ReleaseLauncher(i, n, !1), null
  }
}, Roblox.Client.isIDE = function() {
  if (Roblox.Client._isIDE == null && (Roblox.Client._isIDE = !1, Roblox.Client._isRobloxBrowser = !1, window.external)) try {
    window.external.IsRobloxAppIDE !== undefined && (Roblox.Client._isIDE = window.external.IsRobloxAppIDE, Roblox.Client._isRobloxBrowser = !0)
  } catch (n) {}
  return Roblox.Client._isIDE
}, Roblox.Client.isRobloxBrowser = function() {
  return Roblox.Client.isIDE(), Roblox.Client._isRobloxBrowser
}, Roblox.Client.robloxBrowserInstallHost = function() {
  if (window.external) try {
    return window.external.InstallHost
  } catch (n) {}
  return ""
}, Roblox.Client.IsRobloxProxyInstalled = function() {
  var t = Roblox.Client.CreateLauncher(!1),
      n = !1;
  return (t != null && (n = !0), Roblox.Client.ReleaseLauncher(t, !1, !1), n || Roblox.Client.isRobloxBrowser()) ? !0 : !1
}, Roblox.Client.IsRobloxInstalled = function() {
  try {
    var t = Roblox.Client.CreateLauncher(!1),
        n = Roblox.Client.GetInstallHost(t);
    return Roblox.Client.ReleaseLauncher(t, !1, !1), n == Roblox.Client._installHost
  } catch (i) {
    return Roblox.Client.isRobloxBrowser() ? (n = Roblox.Client.robloxBrowserInstallHost(), n == Roblox.Client._installHost) : !1
  }
}, Roblox.Client.SetStartInHiddenMode = function(n) {
  try {
    var t = Roblox.Client.CreateLauncher(!1);
    if (t !== null) return t.SetStartInHiddenMode(n), Roblox.Client._hiddenModeEnabled = n, !0
  } catch (i) {}
  return !1
}, Roblox.Client.UnhideApp = function() {
  try {
    if (Roblox.Client._hiddenModeEnabled) {
      var n = Roblox.Client.CreateLauncher(!1);
      n.UnhideApp()
    }
  } catch (t) {}
}, Roblox.Client.Update = function() {
  try {
    var n = Roblox.Client.CreateLauncher(!1);
    n.Update(), Roblox.Client.ReleaseLauncher(n, !1, !1)
  } catch (t) {
    alert(Roblox.Client.Resources.errorUpdating + ": " + t)
  }
}, Roblox.Client.WaitForRoblox = function(n) {
  if (Roblox.Client._skip) return window.location = Roblox.Client._skip, !1;
  if (Roblox.Client._continuation = n, Roblox.Client._cancelled = !1, !Roblox.Client.IsRobloxProxyInstalled() && Roblox.Client.ImplementsProxy) {
    Roblox.InstallationInstructions.show(), Roblox.Client._runInstallABTest();
    var t = "Windows";
    return navigator.appVersion.indexOf("Mac") != -1 && (t = "Mac"), typeof _gaq != typeof undefined && (_gaq.push(["_trackEvent", "Install Begin", t]), _gaq.push(["b._trackEvent", "Install Begin", t])), RobloxEventManager.triggerEvent("rbx_evt_install_begin", {
      os: t
    }), window.chrome && (window.location.hash = "#chromeInstall", $.cookie("chromeInstall", n.toString().replace(/play_placeId/, play_placeId.toString()))), window.setTimeout(function() {
      Roblox.Client._ontimer()
    }, 1e3), tryToDownload(), !0
  }
  return Roblox.Client._continuation(), !1
}, Roblox.Client.ResumeTimer = function(n) {
  Roblox.Client._continuation = n, Roblox.Client._cancelled = !1, window.setTimeout(function() {
    Roblox.Client._ontimer()
  }, 0)
}, Roblox.Client.Refresh = function() {
  try {
    navigator.plugins.refresh(!1)
  } catch (n) {}
}, Roblox.Client._onCancel = function() {
  return Roblox.InstallationInstructions.hide(), Roblox.Client._cancelled = !0, !1
}, Roblox.Client._ontimer = function() {
  Roblox.Client._cancelled || (Roblox.Client.Refresh(), Roblox.Client.IsRobloxProxyInstalled() ? (Roblox.InstallationInstructions.hide(), window.setTimeout(function() {
    window.chrome && window.location.hash == "#chromeInstall" && (window.location.hash = "", $.cookie("chromeInstall", null))
  }, 5e3), Roblox.Client._continuation(), Roblox.Client._installSuccess && Roblox.Client._installSuccess()) : window.setTimeout(function() {
    Roblox.Client._ontimer()
  }, 1e3))
};

// jquery.simplemodal-1.3.5.js
(function(n) {
  var i = n.browser.msie && parseInt(n.browser.version) == 6 && typeof window.XMLHttpRequest != "object",
      r = !1,
      t = [];
  n.modal = function(t, i) {
    return n.modal.impl.init(t, i)
  }, n.modal.close = function() {
    n.modal.impl.close()
  }, n.fn.modal = function(t) {
    return n.modal.impl.init(this, t)
  }, n.modal.defaults = {
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
    zIndex: 1e4,
    close: !0,
    closeHTML: '<a class="modalCloseImg" title="Close"></a>',
    closeClass: "simplemodal-close",
    escClose: !0,
    overlayClose: !1,
    position: null,
    persist: !1,
    modal: !0,
    onOpen: null,
    onShow: null,
    onClose: null
  }, n.modal.impl = {
    o: null,
    d: {},
    init: function(t, i) {
      var r = this;
      if (r.d.data) return !1;
      if (r.o = n.extend({}, n.modal.defaults, i), r.zIndex = r.o.zIndex, r.occb = !1, typeof t == "object") t = t instanceof jQuery ? t : n(t), r.d.Roblox = !1, t.parent().parent().size() > 0 && (t.before(n("<span></span>").attr("id", "simplemodal-Roblox").css({
        display: "none"
      })), r.d.Roblox = !0, r.display = t.css("display"), r.o.persist || (r.d.orig = t.clone(!0)));
      else if (typeof t == "string" || typeof t == "number") t = n("<div></div>").html(t);
      else return alert("SimpleModal Error: Unsupported data type: " + typeof t), r;
      return r.create(t), t = null, r.open(), n.isFunction(r.o.onShow) && r.o.onShow.apply(r, [r.d]), r
    },
    create: function(r) {
      var u = this;
      t = u.getDimensions(), u.o.modal && i && (u.d.iframe = n('<iframe src="javascript:false;"></iframe>').css(n.extend(u.o.iframeCss, {
        display: "none",
        opacity: 0,
        position: "fixed",
        height: t[0],
        width: t[1],
        zIndex: u.o.zIndex,
        top: 0,
        left: 0
      })).appendTo(u.o.appendTo)), u.d.overlay = n("<div></div>").attr("id", u.o.overlayId).addClass("simplemodal-overlay").css(n.extend(u.o.overlayCss, {
        display: "none",
        opacity: u.o.opacity / 100,
        height: u.o.modal ? t[0] : 0,
        width: u.o.modal ? t[1] : 0,
        position: "fixed",
        left: 0,
        top: 0,
        zIndex: u.o.zIndex + 1
      })).appendTo(u.o.appendTo), u.d.container = n("<div></div>").attr("id", u.o.containerId).addClass("simplemodal-container").css(n.extend(u.o.containerCss, {
        display: "none",
        position: "fixed",
        zIndex: u.o.zIndex + 2
      })).append(u.o.close && u.o.closeHTML ? n(u.o.closeHTML).addClass(u.o.closeClass) : "").appendTo(u.o.appendTo), u.d.wrap = n("<div></div>").attr("tabIndex", -1).addClass("simplemodal-wrap").css({
        height: "100%",
        outline: 0,
        width: "100%",
        overflow: "visible"
      }).appendTo(u.d.container), u.d.data = r.attr("id", r.attr("id") || u.o.dataId).addClass("simplemodal-data").css(n.extend(u.o.dataCss, {
        display: "none"
      })).appendTo("body"), r = null, u.setContainerDimensions(), u.d.data.appendTo(u.d.wrap), i && u.fixIE()
    },
    bindEvents: function() {
      var r = this;
      n("." + r.o.closeClass).bind("click.simplemodal", function(n) {
        n.preventDefault(), r.close()
      }), r.o.modal && r.o.close && r.o.overlayClose && r.d.overlay.bind("click.simplemodal", function(n) {
        n.preventDefault(), r.close()
      }), n(document).bind("keydown.simplemodal", function(n) {
        r.o.modal && r.o.focus && n.keyCode == 9 ? r.watchTab(n) : r.o.close && r.o.escClose && n.keyCode == 27 && (n.preventDefault(), r.close())
      }), n(window).bind("resize.simplemodal", function() {
        t = r.getDimensions(), r.setContainerDimensions(!0), i ? r.fixIE() : r.o.modal && (r.d.iframe && r.d.iframe.css({
          height: t[0],
          width: t[1]
        }), r.d.overlay.css({
          height: t[0],
          width: t[1]
        }))
      })
    },
    unbindEvents: function() {
      n("." + this.o.closeClass).unbind("click.simplemodal"), n(document).unbind("keydown.simplemodal"), n(window).unbind("resize.simplemodal"), this.d.overlay.unbind("click.simplemodal")
    },
    fixIE: function() {
      var i = this,
          t = i.o.position;
      n.each([i.d.iframe || null, i.o.modal ? i.d.overlay : null, i.d.container], function(n, i) {
        var l, c, o, e;
        if (i) {
          var s = "document.body.clientHeight",
              h = "document.body.clientWidth",
              b = "document.body.scrollHeight",
              a = "document.body.scrollLeft",
              v = "document.body.scrollTop",
              p = "document.body.scrollWidth",
              y = "document.documentElement.clientHeight",
              w = "document.documentElement.clientWidth",
              u = "document.documentElement.scrollLeft",
              f = "document.documentElement.scrollTop",
              r = i[0].style;
          r.position = "absolute", n < 2 ? (r.removeExpression("height"), r.removeExpression("width"), r.setExpression("height", "" + b + " > " + s + " ? " + b + " : " + s + ' + "px"'), r.setExpression("width", "" + p + " > " + h + " ? " + p + " : " + h + ' + "px"')) : (t && t.constructor == Array ? (o = t[0] ? typeof t[0] == "number" ? t[0].toString() : t[0].replace(/px/, "") : i.css("top").replace(/px/, ""), l = o.indexOf("%") == -1 ? o + " + (t = " + f + " ? " + f + " : " + v + ') + "px"' : parseInt(o.replace(/%/, "")) + " * ((" + y + " || " + s + ") / 100) + (t = " + f + " ? " + f + " : " + v + ') + "px"', t[1] && (e = typeof t[1] == "number" ? t[1].toString() : t[1].replace(/px/, ""), c = e.indexOf("%") == -1 ? e + " + (t = " + u + " ? " + u + " : " + a + ') + "px"' : parseInt(e.replace(/%/, "")) + " * ((" + w + " || " + h + ") / 100) + (t = " + u + " ? " + u + " : " + a + ') + "px"')) : (l = "(" + y + " || " + s + ") / 2 - (this.offsetHeight / 2) + (t = " + f + " ? " + f + " : " + v + ') + "px"', c = "(" + w + " || " + h + ") / 2 - (this.offsetWidth / 2) + (t = " + u + " ? " + u + " : " + a + ') + "px"'), r.removeExpression("top"), r.removeExpression("left"), r.setExpression("top", l), r.setExpression("left", c))
        }
      })
    },
    focus: function(t) {
      var r = this,
          u = t || "first",
          i = n(":input:enabled:visible:" + u, r.d.wrap);
      i.length > 0 ? i.focus() : r.d.wrap.focus()
    },
    getDimensions: function() {
      var t = n(window),
          i = n.browser.opera && n.browser.version > "9.5" && n.fn.jquery <= "1.2.6" ? document.documentElement.clientHeight : n.browser.opera && n.browser.version < "9.5" && n.fn.jquery > "1.2.6" ? window.innerHeight : t.height();
      return [i, t.width()]
    },
    getVal: function(n) {
      return n == "auto" ? 0 : n.indexOf("%") > 0 ? n : parseInt(n.replace(/px/, ""))
    },
    setContainerDimensions: function(i) {
      var r = this;
      if (!i || i && r.o.autoResize) {
        var f = n.browser.opera ? r.d.container.height() : r.getVal(r.d.container.css("height")),
            u = n.browser.opera ? r.d.container.width() : r.getVal(r.d.container.css("width")),
            s = r.d.data.outerHeight(!0),
            h = r.d.data.outerWidth(!0),
            e = r.o.maxHeight && r.o.maxHeight < t[0] ? r.o.maxHeight : t[0],
            o = r.o.maxWidth && r.o.maxWidth < t[1] ? r.o.maxWidth : t[1];
        f = f ? f > e ? e : f : s ? s > e ? e : s < r.o.minHeight ? r.o.minHeight : s : r.o.minHeight, u = u ? u > o ? o : u : h ? h > o ? o : h < r.o.minWidth ? r.o.minWidth : h : r.o.minWidth, r.d.container.css({
          height: f,
          width: u
        })
      }
      r.o.autoPosition && r.setPosition()
    },
    setPosition: function() {
      var n = this,
          r, i, f = t[0] / 2 - n.d.container.outerHeight(!0) / 2,
          u = t[1] / 2 - n.d.container.outerWidth(!0) / 2;
      n.o.position && Object.prototype.toString.call(n.o.position) === "[object Array]" ? (r = n.o.position[0] || f, i = n.o.position[1] || u) : (r = f, i = u), n.d.container.css({
        left: i,
        top: r
      })
    },
    watchTab: function(t) {
      var i = this,
          r;
      n(t.target).parents(".simplemodal-container").length > 0 ? (i.inputs = n(":input:enabled:visible:first, :input:enabled:visible:last", i.d.data[0]), (!t.shiftKey && t.target == i.inputs[i.inputs.length - 1] || t.shiftKey && t.target == i.inputs[0] || i.inputs.length == 0) && (t.preventDefault(), r = t.shiftKey ? "last" : "first", setTimeout(function() {
        i.focus(r)
      }, 10))) : (t.preventDefault(), setTimeout(function() {
        i.focus()
      }, 10))
    },
    open: function() {
      var t = this;
      t.d.iframe && t.d.iframe.show(), n.isFunction(t.o.onOpen) ? t.o.onOpen.apply(t, [t.d]) : (t.d.overlay.show(), t.d.container.show(), t.d.data.show()), t.focus(), t.bindEvents()
    },
    close: function() {
      var t = this,
          i;
      if (!t.d.data) return !1;
      t.unbindEvents(), n.isFunction(t.o.onClose) && !t.occb ? (t.occb = !0, t.o.onClose.apply(t, [t.d])) : (t.d.Roblox ? (i = n("#simplemodal-Roblox"), t.o.persist ? i.replaceWith(t.d.data.removeClass("simplemodal-data").css("display", t.display)) : (t.d.data.hide().remove(), i.replaceWith(t.d.orig))) : t.d.data.hide().remove(), t.d.container.hide().remove(), t.d.overlay.hide().remove(), t.d.iframe && t.d.iframe.hide().remove(), t.d = {})
    }
  }
})(jQuery);

// GenericModal.js
typeof Roblox.GenericModal == "undefined" && (Roblox.GenericModal = function() {
  function i(t, i, u, f, e) {
    n = f;
    var o = $("div.GenericModal").filter(":first");
    o.find("div.Title").text(t), i === null ? o.addClass("noImage") : (o.find("img.GenericModalImage").attr("src", i), o.removeClass("noImage")), o.find("div.Message").html(u), e && (o.removeClass("smallModal"), o.addClass("largeModal")), o.modal(r)
  }

  function t() {
    $.modal.close(), typeof n == "function" && n()
  }
  var r = {
        overlayClose: !0,
        escClose: !0,
        opacity: 80,
        overlayCss: {
          backgroundColor: "#000"
        }
      },
      n;
  return $(function() {
    $(document).on("click", ".GenericModal .roblox-ok", function() {
      t()
    })
  }), {
    open: i
  }
}());

// GenericConfirmation.js
typeof Roblox == "undefined" && (Roblox = {}), typeof Roblox.GenericConfirmation == "undefined" && (Roblox.GenericConfirmation = function() {
  function s(n) {
    var c = {
          titleText: "",
          bodyContent: "",
          footerText: "",
          acceptText: Roblox.GenericConfirmation.Resources.yes,
          declineText: Roblox.GenericConfirmation.Resources.No,
          acceptColor: u,
          declineColor: r,
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
        o, e, h, s;
    n = $.extend({}, c, n), i.overlayClose = n.dismissable, i.escClose = n.dismissable, o = $("[roblox-confirm-btn]"), o.html(n.acceptText + "<span class='btn-text'>" + n.acceptText + "</span>"), o.attr("class", "btn-large " + n.acceptColor), o.unbind(), o.bind("click", function() {
      return n.fieldValidationRequired ? f(n.onAccept) : t(n.onAccept), !1
    }), e = $("[roblox-decline-btn]"), e.html(n.declineText + "<span class='btn-text'>" + n.declineText + "</span>"), e.attr("class", "btn-large " + n.declineColor), e.unbind(), e.bind("click", function() {
      return t(n.onDecline), !1
    }), $('[data-modal-handle="confirmation"] div.Title').text(n.titleText), h = $("[data-modal-handle='confirmation']"), n.imageUrl == null ? h.addClass("noImage") : (h.find("img.GenericModalImage").attr("src", n.imageUrl), h.removeClass("noImage")), n.allowHtmlContentInBody ? $("[data-modal-handle='confirmation'] div.Message").html(n.bodyContent) : $("[data-modal-handle='confirmation'] div.Message").text(n.bodyContent), $.trim(n.footerText) == "" ? $('[data-modal-handle="confirmation"] div.ConfirmationModalFooter').hide() : $('[data-modal-handle="confirmation"] div.ConfirmationModalFooter').show(), n.allowHtmlContentInFooter ? $('[data-modal-handle="confirmation"] div.ConfirmationModalFooter').html(n.footerText) : $('[data-modal-handle="confirmation"] div.ConfirmationModalFooter').text(n.footerText), $("[data-modal-handle='confirmation']").modal(i), s = $("a.genericmodal-close"), s.unbind(), s.bind("click", function() {
      return t(n.onCancel), !1
    }), n.xToCancel || s.hide(), n.onOpenCallback()
  }

  function n(n) {
    typeof n != "undefined" ? $.modal.close(n) : $.modal.close()
  }

  function t(t) {
    n(), typeof t == "function" && t()
  }

  function f(t) {
    if (typeof t == "function") {
      var i = t();
      if (i !== "undefined" && i == !1) return !1
    }
    n()
  }
  var o = "btn-primary",
      u = "btn-neutral",
      r = "btn-negative",
      e = "btn-none",
      i = {
        overlayClose: !0,
        escClose: !0,
        opacity: 80,
        overlayCss: {
          backgroundColor: "#000"
        }
      };
  return {
    open: s,
    close: n,
    green: o,
    blue: u,
    gray: r,
    none: e
  }
}());

// jquery.ba-postmessage.min.js
/*
  * jQuery postMessage - v0.5 - 9/11/2009
  * http://benalman.com/projects/jquery-postmessage-plugin/
  *
  * Copyright (c) 2009 "Cowboy" Ben Alman
  * Dual licensed under the MIT and GPL licenses.
  * http://benalman.com/about/license/
  */
(function($) {
  var g, d, j = 1,
      a, b = this,
      f = !1,
      h = "postMessage",
      e = "addEventListener",
      c, i = b[h] && !$.browser.opera;
  $[h] = function(k, l, m) {
    if (!l) {
      return
    }
    k = typeof k === "string" ? k : $.param(k);
    m = m || parent;
    if (i) {
      m[h](k, l.replace(/([^:]+:\/\/[^\/]+).*/, "$1"))
    } else {
      if (l) {
        m.location = l.replace(/#.*$/, "") + "#" + (+new Date) + (j++) + "&" + k
      }
    }
  };
  $.receiveMessage = c = function(l, m, k) {
    if (i) {
      if (l) {
        a && c();
        a = function(n) {
          if ((typeof m === "string" && n.origin !== m) || ($.isFunction(m) && m(n.origin) === f)) {
            return f
          }
          l(n)
        }
      }
      if (b[e]) {
        b[l ? e : "removeEventListener"]("message", a, f)
      } else {
        b[l ? "attachEvent" : "detachEvent"]("onmessage", a)
      }
    } else {
      g && clearInterval(g);
      g = null;
      if (l) {
        k = typeof m === "number" ? m : typeof k === "number" ? k : 100;
        g = setInterval(function() {
          var o = document.location.hash,
              n = /^#?\d+&/;
          if (o !== d && n.test(o)) {
            d = o;
            l({
              data: o.replace(n, "")
            })
          }
        }, k)
      }
    }
  }
})(jQuery);

// parentFrameLogin.js
$(function() {
  var n = !1,
      t, i;
  $("#header-login").click(function(i) {
    return n = !n, t(n), $("#iFrameLogin").toggle(), $("#header-login").toggleClass("active"), i.stopPropagation(), !1
  }), $("#headerLogin").click(function(i) {
    return n = !n, t(n), $("#iFrameLogin").toggle(), $("#headerLogin").toggleClass("active"), i.stopPropagation(), !1
  }), $(document).click(function() {
    n && ($("#header-login").removeClass("active"), $("#headerLogin").removeClass("active"), $("#iFrameLogin").hide(), n = !1)
  }), t = function(n) {
    $(".IframeAdHide").each(function() {
      $(this).height() == 90 && $(this).width() == 728 && (n ? $(this).css("visibility", "hidden") : $(this).css("visibility", "visible"))
    })
  }, i = function(n) {
    var t, i;
    n.indexOf("resize") != -1 && (t = n.split(","), $("#iFrameLogin").css({
      height: t[1]
    })), n.indexOf("fbRegister") != -1 && (t = n.split("^"), i = "&fbname=" + encodeURIComponent(t[1]) + "&fbem=" + encodeURIComponent(t[2]) + "&fbdt=" + encodeURIComponent(t[3]), window.location.href = "../Login/Default.aspx?iFrameFacebookSync=true" + i)
  }, $.receiveMessage(function(n) {
    i(n.data)
  }), $("#header-login-wrapper").data("display-opened") == "True" && ($("#header-login").addClass("active"), $("#iFrameLogin").css("display", "block"))
});

// IDE/Welcome.js
$(function() {
  function n() {
    Roblox.GenericConfirmation.open({
      titleText: Roblox.IDEWelcome.Resources.emailVerifiedTitle,
      bodyContent: Roblox.IDEWelcome.Resources.emailVerifiedMessage,
      onAccept: function() {
        window.location.href = "/My/Account.aspx?confirmemail=1"
      },
      acceptColor: Roblox.GenericConfirmation.blue,
      acceptText: Roblox.IDEWelcome.Resources.verify,
      declineText: Roblox.IDEWelcome.Resources.cancel,
      allowHtmlContentInBody: !0
    })
  }

  function i(n) {
    var r = "/ide/placelist",
        i, t;
    return n && (i = $("div.place").length, t = "?startRow=" + i, r += t), r
  }

  function t(n, t) {
    $.ajax({
      url: t,
      cache: !1,
      dataType: "html",
      success: function(t) {
        n.remove();
        var i = $("#AssetList");
        i.append($(t)), $(t).animate({
          opacity: 1
        }, "fast"), $(".place").unbind("click"), $(".place").click(function() {
          $(this).hasClass("place-selected") ? ($(this).removeClass("place-selected"), $("div#ButtonRow").hide()) : ($(".place.place-selected").removeClass("place-selected"), $(this).addClass("place-selected"), $("div#ButtonRow").show())
        }), $(".place a").removeAttr("href")
      }
    })
  }
  $(window).resize(function() {
    var n = $(".main div.welcome-content-area:visible");
    $(window).height() < n.height() ? $(".navbar").height(n.height()) : $(".navbar").height($(window).height() - 124), n.height($(window).height() - 170)
  }), $(".navbar").height($(window).height() - 124), $("ul.filelist li a").each(function() {
    this.innerHTML = fitStringToWidthSafe($(this).text(), $(".navlist li p").width())
  }), $("#PublishedProjects").length > 0 ? $("#MyProjects").addClass("navselected") : $(".navlist li").first().addClass("navselected"), $("ul.filelist li a").click(function() {
    Roblox.Client.isIDE() ? window.external.OpenRecentFile($(this).attr("js-data-file")) : Roblox.GenericModal.open(Roblox.IDEWelcome.Resources.openProject, "/images/Icons/img-alert.png", Roblox.IDEWelcome.Resources.openProjectText + " <a target='_blank' href='http://wiki.rbx2016.nl/index.php/Studio'>" + Roblox.IDEWelcome.Resources.robloxStudio + "</a>.")
  }), $("#header-signup").click(function() {
    window.open("/Login/NewAge.aspx")
  }), $("#HeaderHome").click(function() {
    window.location = "/Home/Default.aspx"
  }), $("#MyProjects").click(function() {
    $("#TemplatesView").hide(), $("#MyProjectsView").show(), $(".navlist li.navselected").removeClass("navselected"), $(this).addClass("navselected")
  }), $("#NewProject").click(function() {
    $("#TemplatesView").show(), $("#MyProjectsView").hide(), $(".navlist li.navselected").removeClass("navselected"), $(this).addClass("navselected")
  }), $(".place").click(function() {
    $(this).hasClass("place-selected") ? ($(this).removeClass("place-selected"), $("div#ButtonRow").hide()) : ($(".place.place-selected").removeClass("place-selected"), $(this).addClass("place-selected"), $("div#ButtonRow").show())
  }), $(".place a").removeAttr("href"), $("ul.navlist li").last().addClass("lastnav"), $("#EditButton").click(function() {
    var i, t;
    $(this).hasClass("btn-disabled-primary") || ($("#BuildButton, #EditButton").addClass("btn-disabled-primary"), $("#CollapseButton").addClass("btn-disabled-negative"), i = $(".place.place-selected"), Roblox.Client.isIDE() ? $("#verifiedEmail").data("email-verified-required") == "True" ? n() : (t = i.attr("data-placeid"), window.play_placeId = t, window.editGameInStudio(t)) : Roblox.GenericModal.open(Roblox.IDEWelcome.Resources.editPlace, "/images/Icons/img-alert.png", Roblox.IDEWelcome.Resources.toEdit + i.find("p").text() + Roblox.IDEWelcome.Resources.openPage + "<a target='_blank' href='http://wiki.rbx2016.nl/index.php/Studio'>" + Roblox.IDEWelcome.Resources.robloxStudio + "</a>."), $("#BuildButton").removeClass("btn-disabled-primary"), $("#EditButton").removeClass("btn-disabled-primary"), $("#CollapseButton").removeClass("btn-disabled-negative"), $("#CollapseButton").trigger("click"))
  }), $("#BuildButton").click(function() {
    var t, r, i;
    $(this).hasClass("btn-disabled-primary") || ($("#BuildButton, #EditButton").addClass("btn-disabled-primary"), $("#CollapseButton").addClass("btn-disabled-negative"), t = $(".place.place-selected"), Roblox.Client.isIDE() ? $("#verifiedEmail").data("email-verified-required") == "True" ? n() : (r = t.attr("data-active") == "True", r ? (i = t.attr("data-placeid"), window.play_placeId = i, buildGameInStudio(i)) : Roblox.GenericModal.open(Roblox.IDEWelcome.Resources.placeInactive, "/images/Icons/img-alert.png", Roblox.IDEWelcome.Resources.toBuild + t.find("p").text() + Roblox.IDEWelcome.Resources.activate)) : Roblox.GenericModal.open(Roblox.IDEWelcome.Resources.buildPlace, "/images/Icons/img-alert.png", Roblox.IDEWelcome.Resources.toBuild + t.find("p").text() + Roblox.IDEWelcome.Resources.openPage + "<a target='_blank' href='http://wiki.rbx2016.nl/index.php/Studio'>" + Roblox.IDEWelcome.Resources.robloxStudio + "</a>."), $("#BuildButton").removeClass("btn-disabled-primary"), $("#EditButton").removeClass("btn-disabled-primary"), $("#CollapseButton").removeClass("btn-disabled-negative"), $("#CollapseButton").trigger("click"))
  }), $("#CollapseButton").click(function() {
    $(this).hasClass("btn-disabled-negative") || ($(".place.place-selected").removeClass("place-selected"), $("div#ButtonRow").hide())
  }), $("#StudioRecentFiles").length == 0 && $("ul.navlist").css("border-bottom", "none");
  $("#AssetList").on("click", "#load-more-assets", function() {
    var r = $(this).parent(),
        n = i(!0);
    t(r, n)
  })
});

// IDE/BuildTemplates.js
function getSelectedTemplateType() {
  return $('div.templates[js-data-templatetype="' + $("ul.templatetypes li.selectedType").attr("js-data-templatetype") + '"]')
}
$(function() {
  var t = $("ul.templatetypes li"),
      n;
  t.click(function() {
    var n = getSelectedTemplateType();
    n.hide(), $("ul.templatetypes li.selectedType").removeClass("selectedType"), $(this).addClass("selectedType"), n = getSelectedTemplateType(), n.show()
  }), n = t.first(), n.addClass("selectedType"), getSelectedTemplateType().show(), Roblox.require("Widgets.PlaceImage", function() {
    Roblox.Widgets.PlaceImage.populate()
  }), $(".template").click(function() {
    Roblox.Client.isIDE() ? window.editTemplateInStudio($(this).attr("placeid")) : Roblox.GenericModal.open("New Project", "/images/Icons/img-alert.png", "To build using this template, open to this page in <a target='_blank' href='http://wiki.rbx2016.nl/index.php/Studio'>ROBLOX Studio</a>.")
  }), $(".template a").removeAttr("href")
});

// StringTruncator.js
function InitStringTruncator() {
  isInitialized || (fitStringSpan = document.createElement("span"), fitStringSpan.style.display = "inline", fitStringSpan.style.visibility = "hidden", fitStringSpan.style.padding = "0px", document.body.appendChild(fitStringSpan), isInitialized = !0)
}

function fitStringToWidth(n, t, i) {
  function s(n) {
    return n.replace("<", "&lt;").replace(">", "&gt;")
  }
  var f, r, u, e, o;
  if (isInitialized || InitStringTruncator(), i && (fitStringSpan.className = i), f = s(n), fitStringSpan.innerHTML = f, fitStringSpan.offsetWidth > t) {
    for (r = 0, e = n.length; o = e - r >> 1;) u = r + o, fitStringSpan.innerHTML = s(n.substring(0, u)) + "&hellip;", fitStringSpan.offsetWidth > t ? e = u : r = u;
    f = n.substring(0, r) + "&hellip;"
  }
  return f
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
    fitStringSpan = null;