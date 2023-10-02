/* dist/js/chat.bundle.min.js */ ! function(t) {
    var i = {};

    function r(e) {
        if (i[e]) return i[e].exports;
        var a = i[e] = {
            i: e,
            l: !1,
            exports: {}
        };
        return t[e].call(a.exports, a, a.exports, r), a.l = !0, a.exports
    }
    r.m = t, r.c = i, r.d = function(e, a, t) {
        r.o(e, a) || Object.defineProperty(e, a, {
            enumerable: !0,
            get: t
        })
    }, r.r = function(e) {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
            value: "Module"
        }), Object.defineProperty(e, "__esModule", {
            value: !0
        })
    }, r.t = function(a, e) {
        if (1 & e && (a = r(a)), 8 & e) return a;
        if (4 & e && "object" == typeof a && a && a.__esModule) return a;
        var t = Object.create(null);
        if (r.r(t), Object.defineProperty(t, "default", {
                enumerable: !0,
                value: a
            }), 2 & e && "string" != typeof a)
            for (var i in a) r.d(t, i, function(e) {
                return a[e]
            }.bind(null, i));
        return t
    }, r.n = function(e) {
        var a = e && e.__esModule ? function() {
            return e.default
        } : function() {
            return e
        };
        return r.d(a, "a", a), a
    }, r.o = function(e, a) {
        return Object.prototype.hasOwnProperty.call(e, a)
    }, r.p = "", r(r.s = 3)
}([function(e, a, t) {
    "use strict";
    Object.defineProperty(a, "__esModule", {
        value: !0
    });
    var i, r = t(2),
        s = t(1);
    var n = ((i = s) && i.__esModule ? i : {
        default: i
    }).default.module("chat", ["robloxApp", "monospaced.elastic", "modal", "ui.bootstrap.popover", "toast"]).config(["msdElasticConfig", "languageResourceProvider", function(e, a) {
        e.append = "\n", r.Lang.ChatResources && a.setLanguageKeysFromFile(r.Lang.ChatResources)
    }]);
    a.default = n
}, function(e, a) {
    e.exports = angular
}, function(e, a) {
    e.exports = Roblox
}, function(e, a, t) {
    "use strict";
    var i = n(t(1)),
        r = t(4);
    t(5);
    var s = n(t(0));

    function n(e) {
        return e && e.__esModule ? e : {
            default: e
        }
    }(0, r.importFilesUnderPath)(t(6)), (0, r.importFilesUnderPath)(t(14)), (0, r.importFilesUnderPath)(t(44)), (0, r.importFilesUnderPath)(t(57));
    var o = t(78),
        l = (0, r.templateCacheGenerator)(i.default, "chatAppTemplates", o);
    i.default.element(function() {
        i.default.bootstrap("#chat-container", [s.default.name, l.name])
    })
}, function(e, a, t) {
    "use strict";

    function s(e) {
        return e.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase()
    }

    function n(e) {
        return e.split("/").pop().replace(".html", "")
    }
    var i = {
        importFilesUnderPath: function(e) {
            e.keys().forEach(e)
        },
        templateCacheGenerator: function(e, a, i, r) {
            return e.module(a, []).run(["$templateCache", function(t) {
                i && i.keys().forEach(function(e) {
                    var a = s(n(e));
                    t.put(a, i(e))
                }), r && r.keys().forEach(function(e) {
                    var a = s(n(e));
                    t.put(a, function(e) {
                        return e.replace(/<\/?script[^>]*>/gi, "")
                    }(r(e)))
                })
            }])
        }
    };
    e.exports = i
}, function(e, a, t) {}, function(e, a, t) {
    var i = {
        "./apiParamsInitialization.js": 7,
        "./gameParameters.js": 8,
        "./httpResponse.js": 9,
        "./messageHelper.js": 10,
        "./notificationType.js": 11,
        "./notificationsName.js": 12,
        "./resources.js": 13
    };

    function r(e) {
        var a = s(e);
        return t(a)
    }

    function s(e) {
        if (t.o(i, e)) return i[e];
        var a = new Error("Cannot find module '" + e + "'");
        throw a.code = "MODULE_NOT_FOUND", a
    }
    r.keys = function() {
        return Object.keys(i)
    }, r.resolve = s, (e.exports = r).id = 6
}, function(e, a, t) {
    "use strict";
    Object.defineProperty(a, "__esModule", {
        value: !0
    });
    var i, r = t(0),
        s = (i = r) && i.__esModule ? i : {
            default: i
        },
        n = t(2);
    var o = {
        chatApiParams: {
            pageNumberOfUnreadConversations: 1,
            pageSizeOfUnreadConversations: 30,
            pageNumberOfConversations: 1,
            pageSizeOfConversations: 30,
            pageSizeOfDisplayMessages: 1,
            pageSizeOfUnreadMessages: 30,
            pageSizeOfGetMessages: 30,
            startIndexOfFriendList: 0,
            pageSizeOfFriendList: 50,
            loadMoreUnreadConversations: !1,
            loadMoreConversations: !1,
            loadMoreFriends: !1
        },
        dialogParams: {
            loadMoreMessages: !0,
            sendingMessage: !1,
            sendMessageHasError: !1,
            loadMoreFriends: !1,
            startIndexOfFriendList: 0,
            pageSizeOfFriendList: 50,
            pageSizeOfGetMessages: 30,
            smallestPageSizeOfGetMessages: 3
        },
        gameUrls: {
            multiGetPlaceDetails: "/v1/games/multiget-place-details",
            multiGetGameIcons: "/v1/games/game-thumbnails",
            GetGamesSorts: "/v1/games/sorts?model.gameSortsContext=ChatSorts",
            GetGamesList: "/v1/games/list",
            getGamesByUniverseIds: n.EnvironmentUrls ? n.EnvironmentUrls.gamesApi + "/v1/games" : "/v1/games",
            multiGetPlayabilityStatus: n.EnvironmentUrls ? n.EnvironmentUrls.gamesApi + "/v1/games/multiget-playability-status" : "/v1/games/multiget-playability-status"
        },
        thumbnailUrls: {
            multiGetGameIcons: "/v1/games/icons?size=150x150&format=png"
        },
        gameIconSize: {
            lg: {
                width: 150,
                height: 150
            },
            sm: {
                width: 50,
                height: 50
            }
        },
        chatUrls: {
            setConversationUniverse: "/v2/set-conversation-universe",
            resetConversationUniverse: "/v2/reset-conversation-universe",
            getConversations: "/v2/get-conversations"
        },
        apiSets: {
            multiGetAvatarHeadshots: {
                url: n.EnvironmentUrls ? n.EnvironmentUrls.thumbnailsApi + "/v1/users/avatar-headshot?size=48x48&format=png" : "/v1/users/avatar-headshot?size=48x48&format=png",
                retryable: !0,
                withCredentials: !0
            },
            multiGetPresence: {
                url: n.EnvironmentUrls ? n.EnvironmentUrls.presenceApi + "/v1/presence/users" : "/v1/presence/users",
                retryable: !0,
                withCredentials: !0
            },
            getMetaData: {
                url: n.EnvironmentUrls ? n.EnvironmentUrls.chatApi + "/v2/metadata" : "/v2/metadata",
                retryable: !1,
                withCredentials: !0
            }
        }
    };
    s.default.constant("apiParamsInitialization", o), a.default = o
}, function(e, a, t) {
    "use strict";
    Object.defineProperty(a, "__esModule", {
        value: !0
    });
    var i, r = t(0);
    var s = {
        reasonProhibitedMessage: {
            None: "None",
            Playable: "Playable",
            AnonymousAccessProhibited: "AnonymousAccessProhibited",
            AssetUnapproved: "AssetUnapproved",
            IncorrectAssetType: "IncorrectAssetType",
            IncorrectAssetConfiguration: "IncorrectAssetConfiguration",
            PlaceHasNoUniverse: "PlaceHasNoUniverse",
            UniverseDoesNotHaveARootPlace: "This game has no root place.",
            UniverseRootPlaceIsNotAPlace: "UniverseRootPlaceIsNotAPlace",
            UniverseRootPlaceIsNotActive: "UniverseRootPlaceIsNotActive",
            InsufficientPermissionCopylocked: "InsufficientPermissionCopylocked",
            InsufficientPermissionFriendsOnly: "This game is friends only.",
            InsufficientPermissionGroupOnly: "Group members only.",
            InsufficientPermissionOwnerOnly: "InsufficientPermissionOwnerOnly",
            InsufficientPermissionMembershipLevel: "InsufficientPermissionMembershipLevel",
            InsufficientPermissionRoleSet: "InsufficientPermissionRoleSet",
            PermissionDenied: "PermissionDenied",
            RequiredValueNotSet: "RequiredValueNotSet",
            AssetUnavailable: "AssetUnavailable",
            DeviceRestricted: "DeviceRestricted",
            UnderReview: "This game is under moderation review.",
            PurchaseRequired: "PurchaseRequired",
            AccountRestricted: "AccountRestricted"
        },
        sortNames: {
            myRecent: "MyRecent"
        },
        maxRowsOfMyRecentGames: 1,
        gameIconMultiGetLimit: 30,
        gameUrl: "/games/{placeId}/robloxgame"
    };
    ((i = r) && i.__esModule ? i : {
        default: i
    }).default.constant("gameParameters", s), a.default = s
}, function(e, a, t) {
    "use strict";
    Object.defineProperty(a, "__esModule", {
        value: !0
    });
    var i, r = t(0);
    var s = {
        sendMessageErrorCode: {
            textTooLong: "TextTooLong"
        }
    };
    ((i = r) && i.__esModule ? i : {
        default: i
    }).default.constant("httpResponse", s), a.default = s
}, function(e, a, t) {
    "use strict";
    Object.defineProperty(a, "__esModule", {
        value: !0
    });
    var i, r = t(0),
        s = (i = r) && i.__esModule ? i : {
            default: i
        };
    var n = {
        linkCardTypes: {
            gameCard: "gameCard",
            catalogItemCard: "catalogItemCard",
            libraryItemCard: "libraryItemCard"
        },
        messageRegexs: {
            gameCard: new RegExp(/\/games\/(\d+)/)
        },
        gameCardRegexs: {
            privateServerLinkCode: new RegExp(/privateServerLinkCode=(\S+)/)
        },
        urlRegex: new RegExp(/(https?:\/\/(?:www\.|(?!www)|(?:web\.))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|web\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www)|(?:web\.))[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9]\.[^\s]{2,})/),
        onlyNewLineRegex: new RegExp(/^[\r|\n|\s]+$/),
        removeNewLineRegex: new RegExp(/^\n+|\n+$/g),
        emojiRegex: new RegExp(/\u200D|\uFE0F|(?:[\xA9\xAE\u2122\u23E9-\u23EF\u23F3\u23F8-\u23FA\u24C2\u25B6\u2600-\u27BF\u2934\u2935\u2B05-\u2B07\u2B1B\u2B1C\u2B50\u2B55\u3030\u303D\u3297\u3299]|\uD83C[\uDC04\uDCCF\uDD70\uDD71\uDD7E\uDD7F\uDD8E\uDD91-\uDE51\uDF00-\uDFFF]|\uD83D[\uDC00-\uDE4F\uDE80-\uDEFF]|\uD83E[\uDD00-\uDDFF])/g),
        zwjRegex: new RegExp(/\u200D/),
        emojiRepRegex: new RegExp(/\uFE0F/),
        senderTypes: {
            user: "User",
            system: "System"
        },
        messageTypes: {
            plainText: {
                name: "PlainText"
            },
            link: {
                name: "Link"
            },
            eventBased: {
                name: "EventBased",
                setConversationUniverse: "SetConversationUniverse"
            }
        }
    };
    s.default.constant("messageHelper", n), a.default = n
}, function(e, a, t) {
    "use strict";
    Object.defineProperty(a, "__esModule", {
        value: !0
    });
    var i, r = t(0);
    var s = {
        newMessage: "NewMessage",
        newMessageBySelf: "NewMessageBySelf",
        newConversation: "NewConversation",
        addedToConversation: "AddedToConversation",
        removedFromConversation: "RemovedFromConversation",
        participantAdded: "ParticipantAdded",
        participantLeft: "ParticipantLeft",
        friendshipDestroyed: "FriendshipDestroyed",
        friendshipCreated: "FriendshipCreated",
        presenceOffline: "UserOffline",
        presenceOnline: "UserOnline",
        presenceChanged: "PresenceChanged",
        conversationTitleModerated: "ConversationTitleModerated",
        chatEnabled: "ChatEnabled",
        chatDisabled: "ChatDisabled",
        conversationTitleChanged: "ConversationTitleChanged",
        participantTyping: "ParticipantTyping",
        conversationUniverseChanged: "ConversationUniverseChanged"
    };
    ((i = r) && i.__esModule ? i : {
        default: i
    }).default.constant("notificationType", s), a.default = s
}, function(e, a, t) {
    "use strict";
    Object.defineProperty(a, "__esModule", {
        value: !0
    });
    var i, r = t(0);
    var s = {
        ChatNotifications: "ChatNotifications",
        FriendshipNotifications: "FriendshipNotifications",
        PresenceNotifications: "PresenceNotifications",
        ChatPrivacySettingNotifications: "ChatPrivacySettingNotifications",
        PresenceBulkNotifications: "PresenceBulkNotifications"
    };
    ((i = r) && i.__esModule ? i : {
        default: i
    }).default.constant("notificationsName", s), a.default = s
}, function(e, a, t) {
    "use strict";
    Object.defineProperty(a, "__esModule", {
        value: !0
    });
    var i, r = t(0),
        s = (i = r) && i.__esModule ? i : {
            default: i
        },
        n = t(2);
    var o = {
        templates: {
            chatBaseTemplate: "chat-base",
            chatBarTemplate: "chat-bar",
            abuseReportTemplate: "chat-abuse-report",
            dialogTemplate: "chat-dialog",
            groupDialogTemplate: "chat-group-dialog",
            dialogMinimizeTemplate: "dialog-minimize",
            chatPlaceholderTemplate: "chat-placeholder",
            confirmNegativeActionTemplate: "confirm-negative-action",
            userConversationInfoTemplate: "user-conversation-info",
            selectFriendsTemplate: "select-friends",
            createChatGroupTemplate: "create-chat-group",
            conversationTitleTemplate: "conversation-title",
            conversationTitleEditorTemplate: "conversation-title-editor",
            detailsTemplate: "details",
            addFriendsTemplate: "add-friends",
            toastTemplate: "toast",
            linkCard: "link-card",
            gamesList: "games-list",
            dialogHeader: "dialog-header",
            systemMessage: "system-message",
            displayMessage: "display-message"
        },
        eventStreamParams: {
            actions: {
                click: "click",
                hover: "hover",
                render: "render"
            },
            properties: {},
            clickPlayFromLinkCardInChat: "clickBtnFromLinkCardInChat",
            clickLinkCardInChat: "clickLinkCardInChat",
            clickPlayButtonInPlayTogether: "clickPlayButtonInPlayTogether",
            clickJoinButtonInPlayTogether: "clickJoinButtonInPlayTogether",
            clickBuyButtonInPlayTogether: "clickBuyButtonInPlayTogether",
            clickViewDetailsButtonInPlayTogether: "clickViewDetailsButtonInPlayTogether",
            openGameListInPlayTogether: "openGameListInPlayTogether",
            pinGameInPlayTogether: "pinGameInPlayTogether",
            unpinGameInPlayTogether: "unpinGameInPlayTogether",
            pinGameInLinkCard: "pinGameInLinkCard",
            unpinGameInLinkCard: "unpinGameInLinkCard",
            loadGameLinkCardInChat: "loadGameLinkCardInChat",
            context: {
                gamePlayFromLinkCard: "PlayGameFromLinkCard",
                gamePlayFromPlayTogether: "PlayGameFromPlayTogether"
            }
        },
        urlParamNames: {
            startConversationWithUserId: "startConversationWithUserId",
            conversationId: "conversationId"
        },
        events: {
            openGameList: "openGameList"
        },
        hoverPopoverParams: {
            isOpen: !1,
            triggerSelector: "",
            hoverPopoverSelector: ""
        },
        performanceMeasurements: {
            messageSend: "MessageSend",
            messageReceive: "MessageReceive"
        },
        chatDataLSNamePrefix: n.CurrentUser ? "Roblox.Chat." + n.CurrentUser.userId : "Roblox.Chat"
    };
    s.default.constant("resources", o), a.default = o
}, function(e, a, t) {
    var i = {
        "./abuseReportDirective.js": 15,
        "./addFriendsDirective.js": 16,
        "./backBtnDirective.js": 17,
        "./chatBarDirective.js": 18,
        "./chatBaseDirective.js": 19,
        "./chatPlaceholderDirective.js": 20,
        "./confirmNegativeActionDirective.js": 21,
        "./confirmRemoveMemberDirective.js": 22,
        "./conversationTitleDirective.js": 23,
        "./conversationTitleEditorDirective.js": 24,
        "./detailsDirective.js": 25,
        "./detailsScrollbarDirective.js": 26,
        "./dialogDirective.js": 27,
        "./dialogHeaderDirective.js": 28,
        "./dialogLazyLoadDirective.js": 29,
        "./dialogMinimizeDirective.js": 30,
        "./displayMessageDirective.js": 31,
        "./friendsLazyLoadDirective.js": 32,
        "./groupSelectDirective.js": 33,
        "./lazyLoadDirective.js": 34,
        "./linkCardDirective.js": 35,
        "./minimizeItemDirective.js": 36,
        "./removeFocusDirective.js": 37,
        "./repeatDoneDirective.js": 38,
        "./selectFriendsDirective.js": 39,
        "./selectFriendsResizeDirective.js": 40,
        "./systemMessageDirective.js": 41,
        "./togglePopoverDirective.js": 42,
        "./userConversationInfoDirective.js": 43
    };

    function r(e) {
        var a = s(e);
        return t(a)
    }

    function s(e) {
        if (t.o(i, e)) return i[e];
        var a = new Error("Cannot find module '" + e + "'");
        throw a.code = "MODULE_NOT_FOUND", a
    }
    r.keys = function() {
        return Object.keys(i)
    }, r.resolve = s, (e.exports = r).id = 14
}, function(e, a, t) {
    "use strict";
    Object.defineProperty(a, "__esModule", {
        value: !0
    });
    var i, r = t(0),
        s = (i = r) && i.__esModule ? i : {
            default: i
        };

    function n(e) {
        return {
            restrict: "A",
            templateUrl: e.templates.abuseReportTemplate
        }
    }
    n.$inject = ["resources"], s.default.directive("abuseReport", n), a.default = n
}, function(e, a, t) {
    "use strict";
    Object.defineProperty(a, "__esModule", {
        value: !0
    });
    var i, r = t(0),
        s = (i = r) && i.__esModule ? i : {
            default: i
        };

    function n(e) {
        return {
            restrict: "A",
            replace: !0,
            templateUrl: e.templates.addFriendsTemplate
        }
    }
    n.$inject = ["resources"], s.default.directive("addFriends", n), a.default = n
}, function(e, a, t) {
    "use strict";
    Object.defineProperty(a, "__esModule", {
        value: !0
    });
    var i, r = t(0),
        s = (i = r) && i.__esModule ? i : {
            default: i
        };

    function n(e) {
        return {
            restrict: "A",
            scope: !0,
            link: function(a, e, t) {
                e.bind("click touchstart", function(e) {
                    e.preventDefault(), a.closeDialog(a.dialogData.layoutId)
                })
            }
        }
    }
    n.$inject = ["$log"], s.default.directive("backBtn", n), a.default = n
}, function(e, a, t) {
    "use strict";
    Object.defineProperty(a, "__esModule", {
        value: !0
    });
    var i, r = t(0),
        s = (i = r) && i.__esModule ? i : {
            default: i
        };

    function n(e) {
        return {
            restrict: "A",
            scope: !0,
            replace: !0,
            templateUrl: e.templates.chatBarTemplate
        }
    }
    n.$inject = ["resources"], s.default.directive("chatBar", n), a.default = n
}, function(e, a, t) {
    "use strict";
    Object.defineProperty(a, "__esModule", {
        value: !0
    });
    var i, r = t(0),
        s = (i = r) && i.__esModule ? i : {
            default: i
        };

    function n(e) {
        return {
            restrict: "A",
            scope: !0,
            replace: !0,
            templateUrl: e.templates.chatBaseTemplate
        }
    }
    n.$inject = ["resources"], s.default.directive("chatBase", n), a.default = n
}, function(e, a, t) {
    "use strict";
    Object.defineProperty(a, "__esModule", {
        value: !0
    });
    var i, r = t(0),
        s = (i = r) && i.__esModule ? i : {
            default: i
        };

    function n(e) {
        return {
            restrict: "A",
            scope: !0,
            templateUrl: e.templates.chatPlaceholderTemplate
        }
    }
    n.$inject = ["resources"], s.default.directive("chatPlaceholder", n), a.default = n
}, function(e, a, t) {
    "use strict";
    Object.defineProperty(a, "__esModule", {
        value: !0
    });
    var i, r = t(0),
        s = (i = r) && i.__esModule ? i : {
            default: i
        };

    function n(e) {
        return {
            restrict: "A",
            scope: {
                chatLibrary: "=",
                dialogLayout: "=",
                confirmCallback: "&"
            },
            templateUrl: e.templates.confirmNegativeActionTemplate
        }
    }
    n.$inject = ["resources"], s.default.directive("confirmNegativeAction", n), a.default = n
}, function(e, a, t) {
    "use strict";
    Object.defineProperty(a, "__esModule", {
        value: !0
    });
    var i, r = t(0),
        s = (i = r) && i.__esModule ? i : {
            default: i
        };

    function n(e) {
        return {
            restrict: "A",
            scope: {
                dialogLayout: "=",
                confirmCallback: "&"
            },
            templateUrl: e.templates.confirmNegativeActionTemplate
        }
    }
    n.$inject = ["resources"], s.default.directive("confirmRemoveMember", n), a.default = n
}, function(e, a, t) {
    "use strict";
    Object.defineProperty(a, "__esModule", {
        value: !0
    });
    var i, r = t(0),
        s = (i = r) && i.__esModule ? i : {
            default: i
        };

    function n(e) {
        return {
            restrict: "A",
            replace: !0,
            templateUrl: e.templates.conversationTitleTemplate
        }
    }
    n.$inject = ["resources"], s.default.directive("conversationTitle", n), a.default = n
}, function(e, a, t) {
    "use strict";
    Object.defineProperty(a, "__esModule", {
        value: !0
    });
    var i, r = t(0),
        s = (i = r) && i.__esModule ? i : {
            default: i
        };

    function n(e) {
        return {
            restrict: "A",
            replace: !0,
            templateUrl: e.templates.conversationTitleEditorTemplate
        }
    }
    n.$inject = ["resources"], s.default.directive("conversationTitleEditor", n), a.default = n
}, function(e, a, t) {
    "use strict";
    Object.defineProperty(a, "__esModule", {
        value: !0
    });
    var i, r = t(0),
        s = (i = r) && i.__esModule ? i : {
            default: i
        };

    function n(e) {
        return {
            restrict: "A",
            replace: !0,
            scope: !0,
            templateUrl: e.templates.detailsTemplate
        }
    }
    n.$inject = ["resources"], s.default.directive("details", n), a.default = n
}, function(e, a, t) {
    "use strict";
    Object.defineProperty(a, "__esModule", {
        value: !0
    });
    var i, r = t(0),
        s = (i = r) && i.__esModule ? i : {
            default: i
        };

    function n(e) {
        return {
            restrict: "A",
            scope: !0,
            link: function(e, a, t) {
                a.mCustomScrollbar({
                    autoExpandScrollbar: !1,
                    scrollInertia: 5,
                    contentTouchScroll: 1,
                    mouseWheel: {
                        preventDefault: !0
                    }
                })
            }
        }
    }
    n.$inject = ["$log"], s.default.directive("detailsScrollbar", n), a.default = n
}, function(e, a, t) {
    "use strict";
    Object.defineProperty(a, "__esModule", {
        value: !0
    });
    var I = r(t(1)),
        i = r(t(0));

    function r(e) {
        return e && e.__esModule ? e : {
            default: e
        }
    }

    function s(g, c, d, p, y, h, i, m, f, v, b, L) {
        return {
            restrict: "A",
            scope: {
                dialogData: "=",
                chatLibrary: "=",
                closeDialog: "&",
                sendInvite: "&"
            },
            link: function(u, n, e) {
                function o() {
                    u.isOverLoaded(), u.dialogData.currentUserId = u.currentUserId;
                    var e = f.templates.dialogTemplate,
                        a = f.templates.groupDialogTemplate,
                        t = f.templates.createChatGroupTemplate;
                    switch (u.dialogData.dialogType) {
                        case y.dialogType.CHAT:
                            var i;
                            I.default.forEach(u.dialogData.userIds, function(e) {
                                e !== u.chatLibrary.userId && (i = e)
                            }), u.dialogLayout.title = u.chatLibrary.friendsDict[i] ? u.chatLibrary.friendsDict[i].name : u.dialogData.title, u.dialogLayout.templateUrl = e, u.dialogLayout.scrollbarElm = y.getScrollBarSelector(u.dialogData, y.scrollBarType.MESSAGE), u.dialogData.name = u.chatLibrary.friendsDict[i] ? u.chatLibrary.friendsDict[i].name : u.dialogData.title, u.dialogData.nameLink = u.chatLibrary.friendsDict[i] ? u.chatLibrary.friendsDict[i].profileUrl : "";
                            break;
                        case y.dialogType.GROUPCHAT:
                            u.dialogLayout.templateUrl = a, u.dialogLayout.limitMemberDisplay = r, u.dialogLayout.scrollbarElm = y.getScrollBarSelector(u.dialogData, y.scrollBarType.MESSAGE), u.dialogData.name = u.dialogData.title;
                            break;
                        case y.dialogType.NEWGROUPCHAT:
                            u.dialogLayout.title = u.dialogData.title, u.dialogLayout.templateUrl = t
                    }
                    u.updateDialogStyle()
                }

                function l() {
                    (u.dialogLayout.IsdialogContainerVisible || n.find(".dialog-container")) && (u.dialogLayout.IsdialogContainerVisible = !1, n.empty());
                    var e = I.default.element(d.get(u.dialogLayout.templateUrl));
                    ! function() {
                        var e;
                        u.chatLibrary && u.chatLibrary.dialogScopeLib[u.dialogData.id] && (e = u.chatLibrary.dialogScopeLib[u.dialogData.id]), u.$$childHead && null != u.$$childHead && u.$$childHead.timeStamp === e && u.$$childHead.$destroy()
                    }();
                    var a = u.$new(),
                        t = Date.now();
                    u.chatLibrary && (u.chatLibrary.dialogScopeLib[u.dialogData.id] = t), a.timeStamp = t;
                    var i = c(e);
                    n.append(e), i(a)
                }
                var r = y.dialogLayout.limitMemberDisplay,
                    a = 0;
                u.saveIntoDialogsLayout = function() {
                    var e = u.dialogData.layoutId;
                    u.dialogLayout && u.dialogLayout.layoutId === e && (u.chatLibrary.dialogsLayout[e] = u.dialogLayout, h.updateStorage(h.storageDictionary.dialogsLayout, u.chatLibrary.dialogsLayout, u.chatLibrary.cookieOption))
                };

                function s(e) {
                    var a = I.default.isDefined(u.dialogData.userIds) ? u.dialogData.userIds.indexOf(e) : -1,
                        t = I.default.isDefined(u.dialogData.selectedUserIds) ? u.dialogData.selectedUserIds.indexOf(e) : -1;
                    return a < 0 && t < 0
                }

                function t() {
                    u.dialogLibrary = i.getLocalStorage(u.chatLibrary.dialogLocalStorageName) ? i.getLocalStorage(u.chatLibrary.dialogLocalStorageName) : {}
                }
                u.updateDialogStyle = function() {
                    y.updateDialogStyle(u.dialogData, u.dialogLayout, u.chatLibrary)
                }, u.updateFriends = function(e) {
                    var a = [];
                    if (e) {
                        var t = y.sortFriendList(u.chatLibrary, e);
                        t && (t.forEach(function(e) {
                            s(e.id) && a.push(e.id), u.chatLibrary.friendsDict[e.id] || (u.chatLibrary.friendsDict[e.id] = e)
                        }), u.dialogData.friendIds = a)
                    } else {
                        var i = u.chatLibrary.friendIds.slice();
                        I.default.forEach(i, function(e) {
                            s(e) && a.push(e)
                        }), u.dialogData.friendIds = a
                    }
                }, u.isOverLoaded = function() {
                    I.default.isUndefined(u.dialogData.selectedUserIds) && (u.dialogData.selectedUserIds = [], u.dialogData.selectedUsersDict = {}), u.dialogData.dialogType !== y.dialogType.FRIEND && (u.dialogData.dialogType === y.dialogType.NEWGROUPCHAT ? u.dialogData.numberOfSelected = u.dialogData.selectedUserIds.length : u.dialogData.dialogType === y.dialogType.CHAT ? u.dialogData.numberOfSelected = u.dialogData.userIds.length + u.dialogData.selectedUserIds.length : u.dialogData.numberOfSelected = u.dialogData.userIds.length + u.dialogData.selectedUserIds.length - 1, u.dialogLayout.isMembersOverloaded = u.dialogData.numberOfSelected >= u.chatLibrary.quotaOfGroupChatMembers)
                }, u.dialogData.selectedUserIds = [], u.dialogData.selectedUsersDict = {}, u.selectFriends = function(e) {
                    var a = u.dialogData.selectedUserIds.indexOf(e);
                    a < 0 && !u.dialogLayout.isMembersOverloaded ? (u.dialogData.selectedUserIds.push(e), u.dialogData.selectedUsersDict[e] = I.default.copy(u.chatLibrary.friendsDict[e])) : -1 < a && (u.dialogData.selectedUserIds.splice(a, 1), delete u.dialogData.selectedUsersDict[e]), u.dialogData.searchTerm = "", u.isOverLoaded()
                }, u.isNumberOfMemberOverloaded = function() {
                    var e = u.dialogData.selectedUserIds ? u.dialogData.selectedUserIds.length : 0,
                        a = 0;
                    return u.dialogData.userIds && (a = u.dialogData.dialogType === y.dialogType.CHAT ? u.dialogData.userIds.length : u.dialogData.userIds.length - 1), e + a >= u.chatLibrary.quotaOfGroupChatMembers && (u.dialogLayout.isMembersOverloaded = !0, !u.dialogLayout.details.isEnabled && u.dialogData.dialogType !== y.dialogType.NEWGROUPCHAT || (u.toastLayout.isNeeded = !0, u.toastLayout.text || (u.toastLayout.text = u.dialogLayout.memberDisplay.toastText(u.chatLibrary.quotaOfGroupChatMembers))), !0)
                }, u.toggleFriendSelection = function(e, a) {
                    a && a.preventDefault();
                    var t = u.dialogData.selectedUserIds.indexOf(e);
                    t < 0 && !u.isNumberOfMemberOverloaded() ? (u.dialogData.selectedUserIds.push(e), u.dialogData.selectedUsersDict[e] = I.default.copy(u.chatLibrary.friendsDict[e]), u.dialogData.selectedUsersDict[e].isSelected = !0) : -1 < t && (u.dialogData.selectedUserIds.splice(t, 1), delete u.dialogData.selectedUsersDict[e]), u.dialogData.searchTerm = "", u.isOverLoaded()
                }, u.toggleDialogContainer = function() {
                    u.dialogLayout.collapsed = !u.dialogLayout.collapsed, u.toggleDialogFocusStatus(!u.dialogLayout.collapsed), u.saveIntoDialogsLayout(), y.updateDialogsPosition(u.chatLibrary)
                }, u.toggleDialogFocusStatus = function(e) {
                    e && (y.updateFocusedDialog(u.chatLibrary, u.dialogData.layoutId), m.markMessagesAsRead(u.dialogData, u.chatLibrary.shouldRespectConversationHasUnreadMessageToMarkAsRead)), (u.dialogLayout.hasFocus = e) && u.dialogLayout.active && u.markInactive();
                    var a = e && ! function() {
                        var e = "";
                        return I.default.isDefined(window.getSelection) ? e = window.getSelection().toString() : I.default.isDefined(window.document.selection) && "Text" === window.document.selection.type && (e = window.document.selection.createRange().text), 0 < e.length
                    }() && !u.dialogLayout.collapsed && !u.dialogLayout.renameEditor.isEnabled;
                    return u.dialogLayout.focusMeEnabled = a, u.saveIntoDialogsLayout(), !1
                }, u.getTitle = function(e) {
                    var a, t, i = u.dialogData.chatMessages;
                    if (i && 0 < i.length) {
                        var r = i[0].senderTargetId;
                        if (!r) return !1;
                        t = u.chatLibrary.friendsDict[r].name
                    } else t = u.dialogData.initiator.name;
                    a = p("formatString")(y.chatLayout.defaultTitleForMessage, {
                        userName: t
                    }), u.title = a
                }, u.changeTitle = function() {
                    g.document.title = a % 2 == 0 ? u.title : u.chatLibrary.currentTabTitle, a++
                }, u.markInactive = function() {
                    u.dialogLayout.active && (u.dialogLayout.active = !1, t(), u.dialogLibrary && u.dialogLibrary[u.dialogData.layoutId] && u.dialogLibrary[u.dialogData.layoutId].active && (L.debug(" --------------- markInactive -------------- set into local storage"), I.default.isUndefined(u.dialogLibrary[u.dialogData.layoutId]) && (u.dialogLibrary[u.dialogData.layoutId] = {}), u.dialogLibrary[u.dialogData.layoutId].active = !1, u.dialogLibrary[u.dialogData.layoutId].played = !1, i.setLocalStorage(u.chatLibrary.dialogLocalStorageName, u.dialogLibrary)))
                }, u.markActive = function(e) {
                    t(), I.default.isUndefined(u.dialogLibrary[u.dialogData.layoutId]) && (u.dialogLibrary[u.dialogData.layoutId] = {}), u.dialogLibrary[u.dialogData.layoutId].active = !0, u.dialogLibrary[u.dialogData.layoutId].played = !1, i.setLocalStorage(u.chatLibrary.dialogLocalStorageName, u.dialogLibrary), u.dialogLayout.collapsed || u.chatLibrary.chatLayout.focusedLayoutId !== u.dialogData.layoutId ? (u.dialogLayout.active = !0, u.dialogLayout.focusMeEnabled && (u.dialogLayout.focusMeEnabled = !1)) : m.markMessagesAsRead(u.dialogData)
                }, u.handleLocalStorage = function(e) {
                    e.key === u.chatLibrary.dialogLocalStorageName && (t(), u.dialogLayout.active && u.dialogLibrary && u.dialogLibrary[u.dialogData.layoutId] && !u.dialogLibrary[u.dialogData.layoutId].active && u.markInactive())
                }, u.checkNewGenerationDialogStatus = function() {
                    u.dialogData.isRenameEditorNeeded && (u.dialogLayout.focusMeEnabled && (u.dialogLayout.focusMeEnabled = !1), u.dialogData.isRenameEditorNeeded = !1, u.dialogLayout.renameEditor.isEnabled = !0, u.dialogLayout.renameEditor.hasFocus = !0)
                }, u.getRecentGames = function() {
                    u.chatLibrary.isGetRecentGamesCalled || (u.chatLibrary.isGetRecentGamesCalled || (u.chatLibrary.isGetRecentGamesCalled = !0), v.getRecentGame().then(function(e) {
                        if (e && 0 < e.length) {
                            var a = e[0],
                                t = a.placeId,
                                i = {};
                            i[t] = a, v.buildPlacesLibrary(u.chatLibrary, i), u.chatLibrary.placesLibrary[a.placeId].buttonLayoutForMe = Object.assign({}, b.playButtons.play), u.chatLibrary.myRecentPlaceId = t;
                            var r = [a.universeId];
                            v.getGameIcons(r).then(function(e) {
                                if (e) {
                                    var a = e[0];
                                    u.chatLibrary.placesLibrary[t].gameIconUrl = a.imageUrl
                                }
                            })
                        }
                    }))
                }, u.dialogData.friendIds = u.chatLibrary.friendIds ? u.chatLibrary.friendIds.slice() : [], u.dialogMessages = [], u.dialogType = Object.assign({}, y.dialogType), u.memberStatus = Object.assign({}, y.memberStatus), u.dialogBannerTypes = Object.assign({}, y.dialogBannerTypes), u.dialogLayout = I.default.isDefined(u.chatLibrary.dialogsLayout[u.dialogData.layoutId]) ? u.chatLibrary.dialogsLayout[u.dialogData.layoutId] : I.default.copy(y.dialogLayout), u.dialogLayout.layoutId = u.dialogData.layoutId, u.toastLayout = {
                    isEnabled: u.dialogLayout.isMembersOverloaded,
                    timeout: u.dialogLayout.memberDisplay.timeoutToast
                }, u.dialogLayout.defaultStyle = {}, u.isOverLoaded(), u.$watch(function() {
                    return u.chatLibrary.dialogDict
                }, function(e, a) {
                    if (I.default.isDefined(e) && I.default.isDefined(e[u.dialogData.layoutId])) {
                        var t = u.dialogData.layoutId,
                            i = u.chatLibrary,
                            r = i.dialogIdList.indexOf(t),
                            s = e[t];
                        if (!a[t] || s.isUpdated) {
                            switch (I.default.isDefined(u.chatLibrary.dialogsLayout[u.dialogData.layoutId]) ? u.dialogLayout = u.chatLibrary.dialogsLayout[u.dialogData.layoutId] : I.default.isUndefined(u.dialogLayout) ? u.dialogLayout = I.default.copy(y.dialogLayout) : s.updateStatus === y.dialogStatus.INIT && u.dialogLayout && (u.dialogLayout.renameEditor = Object.assign({}, y.dialogLayout.renameEditor)), s.isUpdated = !1, s.updateStatus) {
                                case y.dialogStatus.REPLACE:
                                    -1 < r && (u.dialogLayout.collapsed && (u.dialogLayout.collapsed = !1), s.updateStatus = y.dialogStatus.INIT, u.toggleDialogFocusStatus(!0));
                                case y.dialogStatus.INIT:
                                    -1 < r && (u.dialogLayout.focusMeEnabled === s.autoOpen && (u.dialogLayout.focusMeEnabled = !s.autoOpen, s.autoOpen || m.markMessagesAsRead(u.dialogData)), u.checkNewGenerationDialogStatus(), o(), l());
                                    break;
                                case y.dialogStatus.MINIMIZE:
                                    o(), u.chatLibrary.minimizedDialogIdList.indexOf(t) < 0 && (u.chatLibrary.minimizedDialogIdList.push(t), u.chatLibrary.minimizedDialogData[t] = u.dialogData), n.empty();
                                    break;
                                case y.dialogStatus.REFRESH:
                                    o(), s.updateStatus = y.dialogStatus.INIT
                            }
                            0 === r && u.getRecentGames()
                        }
                        h.updateStorage(h.storageDictionary.dialogIdList, u.chatLibrary.dialogIdList, u.chatLibrary.cookieOption), h.updateStorage(h.storageDictionary.dialogDict, u.chatLibrary.dialogDict, u.chatLibrary.cookieOption), u.saveIntoDialogsLayout(), -1 < r && (function(e) {
                            var a = u.dialogData.layoutId,
                                t = "#" + a,
                                i = u.chatLibrary.chatLayout,
                                r = I.default.element(document.querySelector(t)).find(".dialog-container"),
                                s = i.widthOfChat,
                                n = i.widthOfDialog + i.spaceOfDialog,
                                o = e.indexOf(a),
                                l = u.chatLibrary,
                                c = +s + y.calculateRightPosition(l, o) + i.spaceOfDialog;
                            if (g.innerWidth < c + n) {
                                var d = +i.defaultChatZIndex + 1;
                                r.css("z-index", d)
                            } else {
                                d = +i.defaultChatZIndex + o;
                                y.updateDialogsPosition(l), r.css("z-index", d)
                            }
                            r.addClass("dialog-visible")
                        }(i.dialogIdList), s.markAsActive && (u.markActive(s.activeType), s.markAsActive = !1))
                    }
                }, !0), u.$on("Roblox.Chat.MarkDialogInactive", function(e, a) {
                    a.layoutId === u.dialogData.layoutId && u.markInactive()
                }), i.listenLocalStorage(u.handleLocalStorage)
            }
        }
    }
    s.$inject = ["$window", "$compile", "$templateCache", "$filter", "chatUtility", "chatClientStorageUtilityService", "localStorageService", "messageService", "resources", "gameService", "gameLayout", "$log"], i.default.directive("dialog", s), a.default = s
}, function(e, a, t) {
    "use strict";
    Object.defineProperty(a, "__esModule", {
        value: !0
    });
    var i, r = t(0),
        s = (i = r) && i.__esModule ? i : {
            default: i
        };

    function n(e) {
        return {
            restrict: "A",
            replace: !0,
            scope: !0,
            templateUrl: e.templates.dialogHeader
        }
    }
    n.$inject = ["resources"], s.default.directive("dialogHeader", n), a.default = n
}, function(e, a, t) {
    "use strict";
    Object.defineProperty(a, "__esModule", {
        value: !0
    });
    var i, r = t(0),
        s = (i = r) && i.__esModule ? i : {
            default: i
        };

    function n(i, e, r, s, n) {
        return {
            restrict: "A",
            scope: !0,
            link: function(t, e, a) {
                t.callbackScrollToBottom = function() {
                    t.updateDialog()
                }, t.callbackLazyLoad = function() {
                    if (!t.dialogParams.loadMoreMessages || !t.dialogLayout.IsdialogContainerVisible) return !1;
                    t.dialogLayout.isChatLoading = !0;
                    var e = t.dialogData.chatMessages.length;
                    i.getMessages(t.dialogData.id, t.dialogData.chatMessages[e - 1].id, t.dialogParams.pageSizeOfGetMessages).then(function(e) {
                        if (t.dialogLayout.isChatLoading = !1, e) {
                            if (0 < e.length) {
                                t.dialogLayout.scrollToBottom = !1, r.preProcessMessages(t.chatLibrary, t.dialogData, e);
                                for (var a = 0; a < e.length; a++) r.buildFallbackTimeStamp(e[a], t.dialogData), r.setFallbackClusterMaster(t.dialogData, e[a]);
                                s.fetchDataForLinkCard(e, t.chatLibrary)
                            }
                            e.length < t.dialogParams.pageSizeOfGetMessages && (t.dialogParams.loadMoreMessages = !1)
                        } else t.dialogParams.loadMoreMessages = !1, r.processMessages(t.chatLibrary, t.dialogData, e, t.chatLibrary.friendsDict), s.fetchDataForLinkCard(e, t.chatLibrary)
                    }, function() {
                        t.dialogLayout.isChatLoading = !1, n.debug("---error from get getMessages in dialogLazyLoadDirective.js---")
                    })
                };
                e.mCustomScrollbar({
                    autoExpandScrollbar: !1,
                    scrollInertia: 5,
                    contentTouchScroll: 1,
                    mouseWheel: {
                        preventDefault: !0
                    },
                    callbacks: {
                        onInit: function() {
                            n.debug("---- onInit callback ---- Scrollbars updated"), t.dialogLayout.scrollToBottom = !0
                        },
                        onUpdate: function() {
                            n.debug("---- onUpdate callback ---- Scrollbars updated" + t.dialogLayout.scrollToBottom), t.dialogLayout.scrollToBottom ? e.mCustomScrollbar("scrollTo", "bottom", {
                                scrollInertia: 0
                            }) : t.dialogLayout.scrollToBottom = !0, e.hasClass("mCS_no_scrollbar") && t.updateDialog()
                        },
                        onTotalScroll: t.callbackScrollToBottom,
                        onTotalScrollOffset: 60,
                        onTotalScrollBack: t.callbackLazyLoad
                    }
                })
            }
        }
    }
    n.$inject = ["chatService", "chatUtility", "messageService", "gameService", "$log"], s.default.directive("dialogLazyLoad", n), a.default = n
}, function(e, a, t) {
    "use strict";
    Object.defineProperty(a, "__esModule", {
        value: !0
    });
    t(2);
    var o = r(t(1)),
        i = r(t(0));

    function r(e) {
        return e && e.__esModule ? e : {
            default: e
        }
    }

    function s(s, e, n) {
        return {
            restrict: "A",
            scope: {
                chatLibrary: "="
            },
            templateUrl: e.templates.dialogMinimizeTemplate,
            link: function(i, r, e) {
                function t() {
                    var e = i.chatLibrary.chatLayout,
                        a = i.chatLibrary.dialogIdList.length,
                        t = +e.widthOfChat + s.calculateRightPosition(i.chatLibrary, a) + e.spaceOfDialog;
                    r.css("right", t)
                }
                i.dialogType = s.dialogType, i.hasMinimizedDialogs = !1, i.layoutIdHasClicked = !1, i.openDialog = function(e) {
                    n.debug(" -------------------openDialog------------------ " + e);
                    var a = i.chatLibrary.dialogIdList.pop();
                    i.chatLibrary.dialogDict[a].isUpdated = !0, i.chatLibrary.dialogDict[a].updateStatus = s.dialogStatus.MINIMIZE, i.chatLibrary.dialogIdList.push(e), i.chatLibrary.dialogDict[e].isUpdated = !0, i.chatLibrary.dialogDict[e].updateStatus = s.dialogStatus.REPLACE;
                    var t = i.chatLibrary.minimizedDialogIdList.indexOf(e); - 1 < t && (i.chatLibrary.minimizedDialogIdList.splice(t, 1), delete i.chatLibrary.minimizedDialogData[e])
                }, i.remove = function(e) {
                    var a = i.chatLibrary.minimizedDialogIdList.indexOf(e); - 1 < a && (i.chatLibrary.minimizedDialogIdList.splice(a, 1), delete i.chatLibrary.minimizedDialogData[e], delete i.chatLibrary.dialogDict[e])
                }, Roblox.BootstrapWidgets.SetupPopover("top", {
                    selector: "#dialogs-minimize"
                }, "#dialogs-minimize-container"), i.$watch(function() {
                    return i.chatLibrary.minimizedDialogIdList
                }, function(e, a) {
                    o.default.isUndefined(e) || e == a || (n.debug("------ watch minimizedDialogIdList ----- "), 0 < e.length ? (i.hasMinimizedDialogs || (i.hasMinimizedDialogs = !0), t()) : 0 === e.length && (i.hasMinimizedDialogs = !1))
                }, !0), i.$watch(function() {
                    return i.chatLibrary.chatLayout.areDialogsUpdated
                }, function(e, a) {
                    e && e !== a && (i.$evalAsync(function() {
                        i.chatLibrary.chatLayout.areDialogsUpdated = !1
                    }), t())
                }, !0)
            }
        }
    }
    s.$inject = ["chatUtility", "resources", "$log"], i.default.directive("dialogMinimize", s), a.default = s
}, function(e, a, t) {
    "use strict";
    Object.defineProperty(a, "__esModule", {
        value: !0
    });
    var i, r = t(0),
        s = (i = r) && i.__esModule ? i : {
            default: i
        };

    function n(e, i) {
        return {
            restrict: "A",
            replace: !0,
            scope: !0,
            templateUrl: e.templates.displayMessage,
            link: function(e, a, t) {
                e.initializeDisplayMessage = function() {
                    e.messageHelper = i, e.displayMessage = e.chatUser.displayMessage
                }, e.initializeDisplayMessage()
            }
        }
    }
    n.$inject = ["resources", "messageHelper"], s.default.directive("displayMessage", n), a.default = n
}, function(e, a, t) {
    "use strict";
    Object.defineProperty(a, "__esModule", {
        value: !0
    });
    var i, r = t(0),
        s = (i = r) && i.__esModule ? i : {
            default: i
        };

    function n(e) {
        return {
            restrict: "A",
            scope: !0,
            link: function(e, a, t) {
                function i() {
                    if (!e.dialogParams.loadMoreFriends) return !1;
                    e.dialogLayout.isChatLoading = !0
                }
                a.mCustomScrollbar({
                    autoExpandScrollbar: !1,
                    scrollInertia: 5,
                    contentTouchScroll: 1,
                    mouseWheel: {
                        preventDefault: !0
                    },
                    callbacks: {
                        onTotalScroll: i,
                        onOverflowYNone: i
                    }
                })
            }
        }
    }
    n.$inject = ["$log"], s.default.directive("friendsLazyLoad", n), a.default = n
}, function(e, a, t) {
    "use strict";
    Object.defineProperty(a, "__esModule", {
        value: !0
    });
    var d = r(t(1)),
        i = r(t(0));

    function r(e) {
        return e && e.__esModule ? e : {
            default: e
        }
    }

    function s(e) {
        return {
            restrict: "A",
            link: function(l, e, a) {
                var c = l.chatLibrary.layout.topBarHeight;
                l.$watch(function() {
                    return e.innerHeight()
                }, function(e, a) {
                    if (e && e !== a) {
                        var t, i, r = "#" + l.dialogData.layoutId + " .dialog-container",
                            s = "#" + l.dialogData.layoutId + " " + l.friendsScrollbarElm,
                            n = d.default.element(r),
                            o = d.default.element(s);
                        i = c + e, t = n.height() - i, o.css("height", t), o.mCustomScrollbar("update")
                    }
                }, !0)
            }
        }
    }
    s.$inject = ["$log"], i.default.directive("groupSelect", s), a.default = s
}, function(e, a, t) {
    "use strict";
    Object.defineProperty(a, "__esModule", {
        value: !0
    });
    var i, r = t(0),
        s = (i = r) && i.__esModule ? i : {
            default: i
        };

    function n(r, s, n, o) {
        return {
            restrict: "A",
            scope: !0,
            link: function(a, e, t) {
                function i() {
                    a.initializeFriends(), a.chatLibrary.chatLayout.isChatLoading = !1, a.chatApiParams.loadMoreFriends = !1
                }
                a.callbackLazyLoad = function() {
                    if (!a.chatApiParams || a.chatLibrary.chatLayout.errorMaskEnable || !a.chatApiParams.loadMoreConversations && !a.chatApiParams.loadMoreFriends) return !1;
                    a.chatLibrary.chatLayout.isChatLoading = !0, a.chatApiParams.loadMoreConversations && r.getUserConversations(a.chatApiParams.pageNumberOfConversations, a.chatApiParams.pageSizeOfConversations, a.chatLibrary.friendsDict).then(function(e) {
                        a.chatLibrary.chatLayout.isChatLoading = !1, e && 0 < e.length ? (a.buildChatUserListByConversations(e), a.chatApiParams.pageNumberOfConversations++, s.updateScrollbar(s.chatLayout.scrollbarClassName), e.length < a.chatApiParams.pageSizeOfConversations && (a.chatApiParams.loadMoreConversations = !1, a.chatApiParams.loadMoreFriends = !0, a.chatApiParams.pageNumberOfConversations = 1, i())) : (a.chatApiParams.loadMoreConversations = !1, a.chatApiParams.loadMoreFriends = !0, a.chatApiParams.pageNumberOfConversations = 1, i())
                    }, function() {
                        a.chatLibrary.chatLayout.isChatLoading = !1, n.debug("---error from get Conversations in lazyLoadDirective.js---")
                    }), a.chatApiParams.loadMoreFriends && i()
                }, a.callbackScrollStart = function() {
                    a.$broadcast("Roblox.Chat.ConversationListScroll"), o.triggerHandler("HoverPopover.EnableClose")
                }, e.mCustomScrollbar({
                    autoExpandScrollbar: !1,
                    scrollInertia: 5,
                    contentTouchScroll: 1,
                    mouseWheel: {
                        preventDefault: !0
                    },
                    callbacks: {
                        onTotalScrollOffset: 100,
                        onTotalScroll: a.callbackLazyLoad,
                        onOverflowYNone: a.callbackLazyLoad,
                        onScrollStart: a.callbackScrollStart
                    }
                })
            }
        }
    }
    n.$inject = ["chatService", "chatUtility", "$log", "$document"], s.default.directive("lazyLoad", n), a.default = n
}, function(e, a, t) {
    "use strict";
    Object.defineProperty(a, "__esModule", {
        value: !0
    });
    var i, r = t(0),
        s = (i = r) && i.__esModule ? i : {
            default: i
        };

    function n(e) {
        return {
            restrict: "A",
            scope: !0,
            replace: !0,
            templateUrl: e.templates.linkCard
        }
    }
    n.$inject = ["resources"], s.default.directive("linkCard", n), a.default = n
}, function(e, a, t) {
    "use strict";
    Object.defineProperty(a, "__esModule", {
        value: !0
    });
    var i = s(t(1)),
        r = s(t(0));

    function s(e) {
        return e && e.__esModule ? e : {
            default: e
        }
    }

    function n(e) {
        return {
            restrict: "A",
            scope: !0,
            link: function(e, a, t) {
                i.default.element("#dialogs-minimize").on("click touchstart", ".popover-content #" + e.dialogLayoutId + " .minimize-title", function() {
                    e.$apply(e.openDialog(e.dialogLayoutId))
                });
                i.default.element("#dialogs-minimize").on("click touchstart", ".popover-content #" + e.dialogLayoutId + " .minimize-close", function() {
                    e.$apply(e.remove(e.dialogLayoutId))
                })
            }
        }
    }
    n.$inject = ["$log"], r.default.directive("minimizeItem", n), a.default = n
}, function(e, a, t) {
    "use strict";
    Object.defineProperty(a, "__esModule", {
        value: !0
    });
    var i, r = t(0),
        s = (i = r) && i.__esModule ? i : {
            default: i
        };

    function n(e) {
        return {
            restrict: "A",
            scope: !0,
            link: function(a, e, t) {
                e.bind("click touchstart", function(e) {
                    e.preventDefault(), a.sendMessage()
                })
            }
        }
    }
    n.$inject = ["$log"], s.default.directive("removeFocus", n), a.default = n
}, function(e, a, t) {
    "use strict";
    Object.defineProperty(a, "__esModule", {
        value: !0
    });
    var i, r = t(0),
        s = (i = r) && i.__esModule ? i : {
            default: i
        };

    function n(i, r) {
        return {
            link: function(e, a, t) {
                i.buildScrollbar(r.gameListScrollListSelector)
            }
        }
    }
    n.$inject = ["chatUtility", "playTogetherLayout"], s.default.directive("repeatDone", n), a.default = n
}, function(e, a, t) {
    "use strict";
    Object.defineProperty(a, "__esModule", {
        value: !0
    });
    var s = r(t(1)),
        i = r(t(0));

    function r(e) {
        return e && e.__esModule ? e : {
            default: e
        }
    }

    function n(r, e) {
        return {
            restrict: "A",
            replace: !0,
            templateUrl: e.templates.selectFriendsTemplate,
            link: function(e, a, t) {
                function i() {
                    if (s.default.isUndefined(e.dialogData) || s.default.isUndefined(e.dialogData.selectedUserIds)) return !1;
                    e.dialogData.dialogType === r.dialogType.NEWGROUPCHAT ? e.dialogLayout.inviteBtnDisabled = e.dialogData.selectedUserIds.length < 2 : e.dialogLayout.inviteBtnDisabled = 0 === e.dialogData.selectedUserIds.length
                }
                i(), e.$watch(function() {
                    return e.dialogData && e.dialogData.selectedUserIds
                }, function() {
                    i()
                }, !0)
            }
        }
    }
    n.$inject = ["chatUtility", "resources"], i.default.directive("selectFriends", n), a.default = n
}, function(e, a, t) {
    "use strict";
    Object.defineProperty(a, "__esModule", {
        value: !0
    });
    var u = r(t(1)),
        i = r(t(0));

    function r(e) {
        return e && e.__esModule ? e : {
            default: e
        }
    }

    function s(d, e) {
        return {
            restrict: "A",
            link: function(l, e, a) {
                var c = l.chatLibrary.layout.topBarHeight;
                l.$watch(function() {
                    return e.innerHeight()
                }, function(e, a) {
                    if (e && e !== a) {
                        var t, i = "#" + l.dialogData.layoutId + " .dialog-container",
                            r = "#" + l.dialogData.layoutId + " " + l.friendsScrollbarElm,
                            s = u.default.element(i),
                            n = u.default.element(r),
                            o = c + l.chatLibrary.layout.detailsActionHeight + e;
                        l.dialogData.dialogType === d.dialogType.NEWGROUPCHAT && (o += l.chatLibrary.layout.detailsInputHeight), t = s.height() - o, n.css("height", t), n.mCustomScrollbar("update")
                    }
                }, !0)
            }
        }
    }
    s.$inject = ["chatUtility", "$log"], i.default.directive("selectFriendsResize", s), a.default = s
}, function(e, a, t) {
    "use strict";
    Object.defineProperty(a, "__esModule", {
        value: !0
    });
    var i, r = t(0),
        s = (i = r) && i.__esModule ? i : {
            default: i
        };

    function n(e, i) {
        return {
            restrict: "A",
            replace: !0,
            scope: !0,
            templateUrl: e.templates.systemMessage,
            link: function(e, a, t) {
                e.messageHelper = i
            }
        }
    }
    n.$inject = ["resources", "messageHelper"], s.default.directive("systemMessage", n), a.default = n
}, function(e, a, t) {
    "use strict";
    Object.defineProperty(a, "__esModule", {
        value: !0
    });
    var y = r(t(1)),
        i = r(t(0));

    function r(e) {
        return e && e.__esModule ? e : {
            default: e
        }
    }

    function s(e, p) {
        return {
            restrict: "A",
            replace: !0,
            scope: !0,
            link: function(t, e, a) {
                var i = t.dialogLayout.togglePopoverParams,
                    r = i.dialogSelector,
                    s = i.triggerSelector,
                    n = i.pinIconClassName,
                    o = i.dialogTriggerClassSelector,
                    l = i.isExclusiveClickSelector ? i.isExclusiveClickSelector : "is-exclusive-click";

                function c() {
                    p.on("click", function(e) {
                        e.stopPropagation();
                        var a = y.default.element(e.target);
                        d(a) || function(e) {
                            var a = y.default.element(r);
                            return a.find(e) && 0 < a.find(e).length
                        }(a) || function(e) {
                            var a = !1;
                            ! function(e) {
                                return e.hasClass(n)
                            }(e) || (a = t.dialogData.playTogetherIds && 0 < t.dialogData.playTogetherIds.length || t.dialogData.pinGame);
                            ! function(e) {
                                var a = y.default.element(o);
                                return a.is(e) || a.find(e) && 0 < a.find(e).length
                            }(e) || (a = !0);
                            e.hasClass(l) && (a = !0);
                            return a
                        }(a) || (t.dialogLayout.togglePopoverParams.isOpen = !1)
                    })
                }

                function d(e) {
                    var a = y.default.element(s);
                    return a.is(e) || a.find(e) && 0 < a.find(e).length
                }
                e.on("click", function(e) {
                    d(y.default.element(e.target)) && (t.dialogLayout.togglePopoverParams.isOpen = !t.dialogLayout.togglePopoverParams.isOpen)
                });
                var u = t.$watch(function() {
                        return t.dialogData.playTogetherIds
                    }, function(e, a) {
                        e !== a && e && 0 < e.length && (t.dialogLayout.togglePopoverParams.isOpen || (t.dialogLayout.togglePopoverParams.isOpen = !0))
                    }, !0),
                    g = t.$watch(function() {
                        return t.dialogLayout.togglePopoverParams.isFirstTimeOpen
                    }, function(e, a) {
                        e && c()
                    }, !0);
                t.$on("$destroy", function() {
                    u(), g()
                })
            }
        }
    }
    s.$inject = ["$log", "$document"], i.default.directive("togglePopover", s), a.default = s
}, function(e, a, t) {
    "use strict";
    Object.defineProperty(a, "__esModule", {
        value: !0
    });
    var i, r = t(0),
        s = (i = r) && i.__esModule ? i : {
            default: i
        };

    function n(e) {
        return {
            restrict: "A",
            replace: !0,
            scope: !0,
            templateUrl: e.templates.userConversationInfoTemplate
        }
    }
    n.$inject = ["resources"], s.default.directive("userConversationInfo", n), a.default = n
}, function(e, a, t) {
    var i = {
        "./chatBarController.js": 45,
        "./chatController.js": 46,
        "./detailsController.js": 47,
        "./dialogController.js": 48,
        "./dialogHeaderController.js": 49,
        "./dialogMessagesController.js": 50,
        "./dialogsController.js": 51,
        "./friendsController.js": 52,
        "./linkCardController.js": 53,
        "./linkCardMessagesController.js": 54,
        "./playTogetherController.js": 55,
        "./userConversationInfoController.js": 56
    };

    function r(e) {
        var a = s(e);
        return t(a)
    }

    function s(e) {
        if (t.o(i, e)) return i[e];
        var a = new Error("Cannot find module '" + e + "'");
        throw a.code = "MODULE_NOT_FOUND", a
    }
    r.keys = function() {
        return Object.keys(i)
    }, r.resolve = s, (e.exports = r).id = 44
}, function(e, a, t) {
    "use strict";
    Object.defineProperty(a, "__esModule", {
        value: !0
    });
    var i, r = t(0),
        s = (i = r) && i.__esModule ? i : {
            default: i
        };

    function n(a, e, t) {
        a.cancelSearch = function() {
            a.chatViewModel.searchTerm = "", a.chatLibrary.chatLayout.searchFocus = !1
        }, a.saveChatBarLayoutInCookie = function() {
            var e = {
                collapsed: a.chatLibrary.chatLayout.collapsed
            };
            t.updateStorage(t.storageDictionary.chatBarLayout, e, a.chatLibrary.cookieOption)
        }, a.toggleChatContainer = function() {
            a.chatLibrary.chatLayout.collapsed = !a.chatLibrary.chatLayout.collapsed, a.updateUnreadConversationCount(), a.chatLibrary.chatLayout.chatBarInitialized = !0, a.saveChatBarLayoutInCookie()
        }, a.isChatDisconnected = function() {
            var e = a.chatLibrary.chatLayout;
            return e.chatEnabledByPrivacySettingTypes && e.isChatEnabledByPrivacySetting === e.chatEnabledByPrivacySettingTypes.enabled && (e.errorMaskEnable || e.pageDataLoading)
        }
    }
    n.$inject = ["$scope", "$log", "chatClientStorageUtilityService"], s.default.controller("chatBarController", n), a.default = n
}, function(e, a, t) {
    "use strict";
    Object.defineProperty(a, "__esModule", {
        value: !0
    });
    var A = r(t(1)),
        i = r(t(0)),
        F = t(2);

    function r(e) {
        return e && e.__esModule ? e : {
            default: e
        }
    }

    function s(h, i, r, t, l, m, o, f, v, c, e, s, n, b, a, d, u, g, p, L, y, I, T, D, C) {
        function M() {
            var e = r.innerWidth() - v.chatLayout.widthOfChat - v.chatLayout.widthOfDialogMinimize,
                a = v.chatLayout.widthOfDialog + v.chatLayout.spaceOfDialog;
            h.chatLibrary.chatLayout.availableNumberOfDialogs = Math.floor(e / a), h.chatLibrary.chatLayout.numberOfDialogs = h.chatLibrary.dialogIdList.length, h.chatLibrary.chatLayout.numberOfMinimizedDialogs = h.chatLibrary.minimizedDialogIdList.length, m.debug(" -------------numberOfDialogs = -------------- " + h.chatLibrary.chatLayout.numberOfDialogs), m.debug(" -------------availableNumberOfDialogs = -------------- " + h.chatLibrary.chatLayout.availableNumberOfDialogs)
        }

        function P(e) {
            h.chatLibrary.dialogDict[e.layoutId] && function(e) {
                h.chatLibrary.dialogDict[e] && (h.chatLibrary.dialogDict[e].isUpdated = !0, h.chatLibrary.dialogDict[e].updateStatus = v.dialogStatus.REFRESH)
            }(e.layoutId), !h.chatLibrary.dialogDict[e.layoutId] && e.displayMessage && e.displayMessage.content && h.launchDialog(e.layoutId, !0)
        }
        h.dialogsOverflowWindow = function() {
            var e = r.innerWidth();
            return h.chatLibrary.chatLayout.numberOfDialogs >= h.chatLibrary.chatLayout.availableNumberOfDialogs && e > v.chatLayout.thresholdMobile
        }, h.getMessageForConversations = function(e) {
            0 < e.length && o.multiGetLatestMessages(e, v.chatApiParams.pageSizeOfDisplayMessages).then(function(e) {
                e && 0 < e.length && A.default.forEach(e, function(e) {
                    var a = e.chatMessages,
                        t = 0 < a.length ? a[0] : {};
                    if (h.chatLibrary.conversationsDict[e.conversationId]) {
                        var i = h.chatLibrary.conversationsDict[e.conversationId].layoutId,
                            r = h.chatUserDict[i];
                        r.hasUnreadMessages = r.hasUnreadMessages || n.hasUnreadMessages(r, a), h.chatLibrary.isRespectingMessageTypeEnabled ? (f.categorizeMessageType(h.chatLibrary, a, r), r.displayMessage = f.getDisplayMessageForUser(a)) : (v.sanitizeMessage(t), r.displayMessage = f.buildDisplayMessage(t)), f.resetConversationUnreadStatus(h.chatUserDict[i], a), f.formatTimestampInConversation(h.chatUserDict[i])
                    }
                })
            }, function() {
                m.debug("----- multiGetLatestMessages request is failed ! ------")
            })
        }, h.updateUnreadConversationCount = function() {
            o.getUnreadConversationCount().then(function(e) {
                if (e) {
                    var a = e.count;
                    h.chatViewModel.unreadConversationCount = a, i.document.title = 0 < a ? "(" + a + ") " + h.chatLibrary.currentTabTitle : h.chatLibrary.currentTabTitle
                }
            }, function() {
                m.debug("----- getUnreadConversationCount request is failed ! ------"), i.document.title = h.chatLibrary.currentTabTitle
            })
        };

        function S(e) {
            var a = [];
            a.push(e), o.getConversations(a).then(function(e) {
                e && (h.buildChatUserListByUnreadConversations(e), h.getPlaceDetailsForNewPlaceIds(e))
            })
        }

        function U(e, a, t) {
            f.appendMessages(h.chatLibrary, a, e), g.fetchDataForLinkCard(e, h.chatLibrary), n.hasUnreadMessages(a, e);
            var i = {
                status: !1,
                userId: e[0].senderTargetId
            };
            if (h.updateConverationTypingStatus(a.id, i), h.updateChatViewModel(a, !0), P(a), !t) {
                ! function(e, a) {
                    h.chatLibrary.dialogDict[e] && (h.chatLibrary.dialogDict[e].markAsActive = !0, h.chatLibrary.dialogDict[e].activeType = a)
                }(a.layoutId, v.activeType.NEWMESSAGE);
                var r = v.getDataForMarkingSeen(h.chatUserDict);
                0 < r.length && o.markAsSeen(r)
            }
        }

        function k(e, a) {
            var t = h.getLayoutId(e, v.dialogType.CHAT);
            A.default.isUndefined(h.chatUserDict[t]) ? S(e) : function(e, a, t, i) {
                var r = [],
                    s = h.chatUserDict[e],
                    n = null;
                i || (n = (new Date).getTime());
                o.getMessagesByPageSize(s, t, v.dialogParams.smallestPageSizeOfGetMessages, r, function(e) {
                    if (U(r, s, i), e) {
                        var a = (new Date).getTime() - e;
                        o.sendPerformanceData(I.performanceMeasurements.messageReceive, a)
                    }
                }, n)
            }(t, 0, null, a)
        }
        h.resetDialogLayout = function(t) {
            if (t) {
                var e = Object.assign({}, v.dialogLayout),
                    a = Object.assign({}, v.dialogLayoutResetConstant);
                A.default.forEach(e, function(e, a) {
                    A.default.isUndefined(t[a]) && (t[a] = Object.assign({}, e))
                }), A.default.forEach(a, function(e, a) {
                    t[a] = Object.assign({}, e)
                })
            }
        }, h.retrieveDialogStatus = function() {
            if (A.default.isDefined(h.preSetChatLibrary) && A.default.isDefined(h.preSetChatLibrary.dialogIdList)) {
                var e = Object.assign({}, h.preSetChatLibrary.dialogIdList);
                if (0 === e.length) return h.preSetChatLibrary.dialogDict = {}, h.preSetChatLibrary.dialogsLayout = {}, c.removeFromStorage(c.storageDictionary.dialogDict, h.chatLibrary.cookieOption), c.removeFromStorage(c.storageDictionary.dialogsLayout, h.chatLibrary.cookieOption), !1;
                var t = h.preSetChatLibrary.dialogDict,
                    i = h.preSetChatLibrary.dialogsLayout;
                A.default.forEach(e, function(e, a) {
                    e === v.newGroup.layoutId || h.chatUserDict[e] || (h.preSetChatLibrary.dialogIdList.splice(a, 1), delete t[e], delete i[e]), h.resetDialogLayout(i[e])
                }), h.chatLibrary.dialogIdList = h.preSetChatLibrary.dialogIdList, A.default.forEach(t, function(e, a) {
                    e.isUpdated || (e.isUpdated = !0), a === v.newGroup.layoutId && (h.chatUserDict[v.newGroup.layoutId] = h.newGroup), h.chatLibrary.dialogDict[a] = e, i[a] && (h.chatLibrary.dialogsLayout[a] = i[a])
                })
            }
        };

        function E() {
            return i.innerWidth >= v.chatLayout.thresholdChatBarOpen && !h.chatLibrary.isTakeOverOn && !A.default.element("#GamesPageLeftColumn").length
        }
        var O;
        h.setup = function() {
            h.chatUserDict = {}, h.dialogType = Object.assign({}, v.dialogType), h.memberStatus = Object.assign({}, v.memberStatus), h.userPresenceTypes = Object.assign({}, v.userPresenceTypes), h.newGroup = Object.assign({}, d.newGroup), h.selectedFriendIds = [], h.chatLibrary = Object.assign({}, u.chatLibrary), A.default.isDefined(F.RealTime) && (O = F.RealTime.Factory.GetClient())
        }, h.initializePresetData = function() {
            h.preSetChatLibrary = {}, c.isStorageDefined(c.storageDictionary.dialogIdList) && c.isStorageDefined(c.storageDictionary.dialogDict) ? h.preSetChatLibrary = {
                dialogIdList: c.getFromStorage(c.storageDictionary.dialogIdList),
                dialogDict: c.getFromStorage(c.storageDictionary.dialogDict),
                dialogsLayout: c.isStorageDefined(c.storageDictionary.dialogsLayout) ? c.getFromStorage(c.storageDictionary.dialogsLayout) : {}
            } : h.preSetChatLibrary = {
                dialogIdList: [],
                dialogDict: {},
                dialogsLayout: {}
            }, c.isStorageDefined(c.storageDictionary.chatBarLayout) && (h.preSetChatLibrary.chatBarLayout = c.getFromStorage(c.storageDictionary.chatBarLayout)), h.chatApiParams = Object.assign({}, v.chatApiParams)
        }, h.initializeChatBar = function() {
            h.chatLibrary.chatLayout.chatBarInitialized || (E() && !h.preSetChatLibrary.chatBarLayout ? h.chatLibrary.chatLayout.collapsed = !1 : h.preSetChatLibrary.chatBarLayout ? h.chatLibrary.chatLayout.collapsed = h.preSetChatLibrary.chatBarLayout.collapsed : E() || (h.chatLibrary.chatLayout.collapsed = !0), h.chatLibrary.chatLayout.chatBarInitialized = !0), s.logSinglePerformanceMark(v.performanceMarkLabels.chatPageDataLoaded)
        };

        function G(e, a) {
            var t = h.chatLibrary.layoutIdList.indexOf(e);
            a && -1 < t ? h.chatLibrary.layoutIdList.splice(t, 1) : !a && t < 0 && h.chatLibrary.layoutIdList.push(e)
        }

        function w(e) {
            return h.chatLibrary.userConversationsDict[e] ? h.chatLibrary.userConversationsDict[e] : null
        }
        h.removeFriend = function(e) {
            var a = w(e);
            a = a || h.getLayoutId(e, v.dialogType.FRIEND);
            var t = h.chatUserDict[a];
            if (t && t.isConversation) {
                var i = h.chatUserDict[a].id;
                h.chatLibrary.conversationsDict[i].remove = !0
            } else if (t) {
                var r = h.chatLibrary.chatLayoutIds.indexOf(a); - 1 < r && (h.chatLibrary.chatLayoutIds.splice(r, 1), delete h.chatUserDict[a], G(a, !0))
            }
            if (-1 < h.chatViewModel.friendsHasConversation.indexOf(e)) {
                var s = h.chatViewModel.friendsHasConversation.indexOf(e);
                h.chatViewModel.friendsHasConversation.splice(s, 1)
            } - 1 < h.chatLibrary.chatLayoutIds.indexOf(a) && h.closeDialog(a), 0 === h.chatLibrary.chatLayoutIds.length && (h.chatLibrary.chatLayout.chatLandingEnabled = !0)
        };
        h.getAllFriends = function(e, a) {
            h.initializeFriends()
        }, h.updateDialogList = function(e, a) {
            for (M(); h.chatLibrary.chatLayout.numberOfDialogs + h.chatLibrary.chatLayout.numberOfMinimizedDialogs >= h.chatLibrary.chatLayout.maxOpenDialogs;) {
                var t = h.chatLibrary.dialogIdList[0];
                h.closeDialog(t), M()
            }
            if (h.dialogsOverflowWindow())
                for (; h.chatLibrary.dialogIdList.length >= h.chatLibrary.chatLayout.availableNumberOfDialogs;) {
                    var i = h.chatLibrary.dialogIdList.pop();
                    if (A.default.isUndefined(i)) break;
                    h.chatLibrary.dialogDict[i].isUpdated = !0, h.chatLibrary.dialogDict[i].updateStatus = v.dialogStatus.MINIMIZE;
                    var r = h.chatLibrary.minimizedDialogIdList.indexOf(e); - 1 < r && (h.chatLibrary.dialogsLayout[e].collapsed && (h.chatLibrary.dialogsLayout[e].collapsed = !1), h.chatLibrary.minimizedDialogIdList.splice(r, 1), delete h.chatLibrary.minimizedDialogData[e])
                }
            h.chatLibrary.dialogIdList.indexOf(e) < 0 && h.chatLibrary.dialogIdList.push(e);
            var s = Object.assign({}, v.dialogInitValue);
            A.default.isDefined(a) && a && (s.autoOpen = !0), h.chatLibrary.dialogDict[e] = s
        }, h.getUserConversations = function() {
            o.getUserConversations(h.chatApiParams.pageNumberOfConversations, h.chatApiParams.pageSizeOfConversations, h.chatLibrary.friendsDict).then(function(e) {
                s.logSinglePerformanceMark(v.performanceMarkLabels.chatConversationsLoaded), e && 0 < e.length && (h.buildChatUserListByConversations(e, !1), h.chatApiParams.pageNumberOfConversations++, h.retrieveDialogStatus()), !e || e.length < h.chatApiParams.pageSizeOfConversations ? (h.chatApiParams.loadMoreConversations = !1, h.chatApiParams.pageNumberOfConversations = 1, e && 0 === e.length && (h.chatLibrary.chatLayout.chatLandingEnabled = !0), h.getAllFriends()) : (h.chatLibrary.chatLayout.pageDataLoading && (h.chatLibrary.chatLayout.pageDataLoading = !1), h.chatApiParams.loadMoreConversations = !0), h.chatLibrary.chatLayout.urlParseInitialized || function() {
                    if (window && window.location) {
                        m.debug("--- -initialzeUrlParser- ---");
                        var e = window.location.search;
                        e && -1 < e.indexOf("?") && (e = e.substr(1)).split("&").forEach(function(e) {
                            var a = e.split("="),
                                t = a[0],
                                i = decodeURIComponent(a[1]);
                            switch (t) {
                                case v.urlParamNames.startConversationWithUserId:
                                    h.startSpecificConversationFromUserId(i);
                                    break;
                                case v.urlParamNames.conversationId:
                                    h.chatLibrary.chatLayout.urlParseInitialized = !0, h.startSpecificConversationFromConvId(i)
                            }
                        })
                    }
                }()
            }, function() {
                m.debug("--getConversations-error---")
            })
        }, h.updateConversationTitle = function(i, r) {
            var e = [i];
            o.getConversations(e).then(function(e) {
                e && A.default.forEach(e, function(e) {
                    if (e.id === i) {
                        var a;
                        a = h.chatLibrary.conversationsDict[i] ? h.chatLibrary.conversationsDict[i].layoutId : h.getLayoutId(i, v.dialogType.CHAT);
                        var t = h.chatUserDict[a];
                        v.updateConversationTitle(t, e.title), h.chatLibrary.userId !== r && (t.actorUsername = h.chatLibrary.friendsDict[r].name, f.buildSystemMessage(v.notificationType.conversationTitleChanged, t))
                    }
                })
            }, function() {
                m.debug(" -------- getConversations request failed ------ ")
            })
        }, h.resetTypingStatusAsReceiver = function(e, a) {
            m.debug("--------- resetTypingStatusAsReceiver has been called-----------");
            var t = e.typing,
                i = e.typing.userTypingDict[a],
                r = e.typing.userIds.indexOf(a);
            e.typing.userIds.splice(r), e.typing.isTypingFromSender = !1, i.status = !1, i.lastTimeReceiveTypingEvent = null, l.cancel(i.lastTimeReceiveTimer), delete e.typing.userTypingDict[a], l.cancel(t.lastTimeReceiveTimer)
        }, h.typingStatusForReceiverExpirationInterval = function(e, a, t) {
            e.typing.userIds.indexOf(t) < 0 && e.typing.userIds.push(t);
            var i = a || (new Date).getTime(),
                r = e.typing.userTypingDict[t];
            r.lastTimeReceiveTypingEvent || (r.lastTimeReceiveTypingEvent = i), (i - r.lastTimeReceiveTypingEvent > h.chatLibrary.typingInChatForReceiverExpirationMs || !r.status) && h.resetTypingStatusAsReceiver(e, t)
        }, h.updateConverationTypingStatus = function(e, a) {
            var t = h.chatLibrary.conversationsDict[e] ? h.chatLibrary.conversationsDict[e].layoutId : h.getLayoutId(e),
                i = h.chatUserDict[t],
                r = a.status,
                s = a.userId,
                n = h.chatLibrary.dialogsLayout[t];
            if (n) {
                n.typing.userTypingDict[s] || (n.typing.userTypingDict[s] = {}), n.typing.isTypingFromSender = r;
                var o = n.typing.userTypingDict[s];
                o.status = r, f.refreshTypingStatus(i, s, r, n), r && !o.lastTimeReceiveTimer ? (m.debug("--------- start a new timer-----------" + s), h.typingStatusForReceiverExpirationInterval(n, null, s), o.lastTimeReceiveTimer = l(function() {
                    return h.typingStatusForReceiverExpirationInterval(n, null, s)
                }, h.chatLibrary.typingInChatForReceiverExpirationMs)) : !r && o.lastTimeReceiveTimer && (m.debug("--------- cancel timer-----------" + s), h.resetTypingStatusAsReceiver(n, s))
            }
        }, h.fetchPlaceDetailsIntoPlacesLibrary = function(e, t) {
            e && 0 < e.length && g.multiGetPlaceDetails(e).then(function(e) {
                g.buildPlacesLibrary(h.chatLibrary, e);
                var a = h.chatLibrary.placesLibrary;
                A.default.forEach(t, function(e) {
                    g.buildButtonLayoutPerConversation(e, a)
                })
            })
        }, h.handleChatNotifications = function(a) {
            m.debug("--------- this is ChatNotifications subscription -----------" + a.Type);
            try {
                var e = a.Type,
                    t = a.ConversationId;
                switch (e) {
                    case v.notificationType.newMessage:
                        k(t);
                        break;
                    case v.notificationType.newMessageBySelf:
                        k(t, !0);
                        break;
                    case v.notificationType.newConversation:
                    case v.notificationType.addedToConversation:
                    case v.notificationType.participantAdded:
                    case v.notificationType.participantLeft:
                        S(t);
                        break;
                    case v.notificationType.removedFromConversation:
                        if (!h.chatLibrary.conversationsDict[t].remove) {
                            var i = h.chatLibrary.conversationsDict[t].layoutId;
                            h.chatLibrary.conversationsDict[t].remove = !0, h.closeDialog(i)
                        }
                        break;
                    case v.notificationType.conversationTitleChanged:
                        var r = a.ActorTargetId;
                        h.updateConversationTitle(t, r);
                        break;
                    case v.notificationType.participantTyping:
                        var s = {
                            status: a.IsTyping,
                            userId: a.UserId
                        };
                        h.updateConverationTypingStatus(t, s);
                        break;
                    case v.notificationType.conversationUniverseChanged:
                        if (h.chatLibrary.conversationsDict[t]) {
                            var n = a.RootPlaceId,
                                o = a.UniverseId,
                                l = (r = a.ActorTargetId, i = h.chatLibrary.conversationsDict[t].layoutId, h.chatUserDict[i]),
                                c = h.chatLibrary.placesLibrary && h.chatLibrary.placesLibrary[n] ? h.chatLibrary.placesLibrary[n].placeName : "",
                                d = h.chatLibrary.placesLibrary && h.chatLibrary.placesLibrary[n] ? h.chatLibrary.placesLibrary[n].encodedPlaceName : "",
                                u = {
                                    rootPlaceId: n,
                                    universeId: o,
                                    actorUsername: h.chatLibrary.friendsDict[r].name,
                                    userId: a.ActorTargetId,
                                    placeName: c,
                                    encodedPlaceName: d
                                },
                                g = [n],
                                p = [l];
                            h.fetchPlaceDetailsIntoPlacesLibrary(g, p), L.setPinGameData(l, u), n && r !== h.chatLibrary.userId && !h.chatLibrary.isRespectingMessageTypeEnabled && f.buildSystemMessage(v.notificationType.conversationUniverseChanged, l)
                        }
                }
            } catch (e) {
                var y = "ChatNotifications:" + a.Type + ": ";
                e && e.message && (y += e.message), b.fireEvent(h.chatLibrary.googleAnalyticsEvent.category, h.chatLibrary.googleAnalyticsEvent.action, y)
            }
        }, h.handleFriendshipNotifications = function(a) {
            m.debug("--------- this is FriendshipNotifications subscription -----------" + a.Type);
            try {
                var e = (new Date).getTime();
                switch (a.Type) {
                    case v.notificationType.friendshipDestroyed:
                        var t = a.EventArgs;
                        A.default.forEach(t, function(e) {
                            e !== h.chatLibrary.userId && h.$digest(h.removeFriend(e))
                        }), c.updateChatFriendsListReloadTime(e), r.triggerHandler("Roblox.Friends.CountChanged");
                        break;
                    case v.notificationType.friendshipCreated:
                        h.getAllFriends(e), c.updateChatFriendsListReloadTime(e), r.triggerHandler("Roblox.Friends.CountChanged")
                }
            } catch (e) {
                var i = "FriendshipNotifications:" + a.Type + ": ";
                e && e.message && (i += e.message), b.fireEvent(h.chatLibrary.googleAnalyticsEvent.category, h.chatLibrary.googleAnalyticsEvent.action, i)
            }
        }, h.buildPlayTogetherInConversationFromPresence = function(e, r, s) {
            A.default.forEach(e, function(e) {
                var a = h.chatUserDict[e],
                    t = [r];
                if (p.sortPlayTogetherIds(a, s), h.fetchPlaceDetailsIntoPlacesLibrary(t, [a]), h.chatLibrary.dialogDict[e]) {
                    a.pinGame && r === a.pinGame.rootPlaceId && s.userId !== h.chatLibrary.userId && (a.recentUserIdFromPresence = s.userId, a.recentPlaceIdFromPresence = r, f.buildSystemMessage(v.notificationType.presenceOnline, a));
                    var i = h.chatLibrary.dialogsLayout[e];
                    !i.togglePopoverParams.isOpen && !a.placeForShown && a.playTogetherIds && 0 < a.playTogetherIds.length && (i.togglePopoverParams.isOpen = !0)
                }
                p.setPlaceForShown(a)
            })
        }, h.releasePlayerFromActivePlaceLists = function(e, r) {
            A.default.forEach(e, function(e) {
                var t = h.chatUserDict[e],
                    i = [];
                if (A.default.forEach(t.playTogetherDict, function(e, a) {
                        if (a = parseInt(a), -1 < e.playerIds.indexOf(r)) {
                            var t = e.playerIds.indexOf(r);
                            e.playerIds.splice(t, 1), 0 === e.playerIds.length && i.push(a)
                        }
                    }), i && 0 < i.length && A.default.forEach(i, function(e) {
                        var a = t.playTogetherIds.indexOf(e);
                        t.playTogetherIds.splice(a, 1), delete t.playTogetherDict[e]
                    }), p.setPlaceForShown(t), t.pinGame && t.pinGame.rootPlaceId) {
                    var a = t.pinGame.rootPlaceId;
                    g.updateButtonLayoutPerConversation(t, a)
                }
            })
        }, h.vanishRootPlaceIdFromPlayTogether = function(r, s, e) {
            A.default.forEach(e, function(e) {
                var t = h.chatUserDict[e],
                    i = [];
                A.default.forEach(t.playTogetherDict, function(e, a) {
                    a = parseInt(a), s === a && 1 === e.playerIds.length && -1 < e.playerIds.indexOf(r) && i.push(a)
                }), i && 0 < i.length && A.default.forEach(i, function(e) {
                    var a = t.playTogetherIds.indexOf(e);
                    t.playTogetherIds.splice(a, 1), delete t.playTogetherDict[e]
                })
            })
        }, h.updatePresenceInFriendDict = function(e) {
            h.chatLibrary.friendsDict[e.userId].userPresenceType = e.userPresenceType, h.chatLibrary.friendsDict[e.userId].presenceData = e, h.chatLibrary.friendsDict[e.userId].presence = e
        }, h.updatePresenceStatus = function(e) {
            for (var a = 0; a < e.length; a++) {
                var t = e[a],
                    i = t.userId;
                h.chatLibrary.friendsDict[i] || (h.chatLibrary.friendsDict[i] = {});
                var r = t.userPresenceType,
                    s = h.chatLibrary.friendsDict[i].presence,
                    n = null;
                switch (r) {
                    case y.status.inGame:
                        var o = t.rootPlaceId;
                        s && r === s.userPresenceType && o === s.rootPlaceId || (n = h.chatLibrary.layoutIdsDictPerUserId[i], s && s.rootPlaceId && h.vanishRootPlaceIdFromPlayTogether(i, s.rootPlaceId, n), h.updatePresenceInFriendDict(t), o && h.buildPlayTogetherInConversationFromPresence(n, o, t));
                        break;
                    default:
                        s && r === s.userPresenceType || (h.updatePresenceInFriendDict(t), s && s.userPresenceType === y.status.inGame && (n = h.chatLibrary.layoutIdsDictPerUserId[i], h.releasePlayerFromActivePlaceLists(n, i)))
                }
            }
        }, h.listenToPresenceServiceInWeb = function() {
            r.on("Roblox.Presence.Update", function(e, a) {
                h.updatePresenceStatus(a)
            })
        }, h.handlePresenceBulkNotifications = function(a) {
            m.debug("--------- this is PresenceBulkNotifications subscription -----------" + a.Type);
            try {
                var t = [];
                A.default.forEach(a, function(e) {
                    switch (e.Type) {
                        case v.notificationType.presenceChanged:
                            var a = e.UserId;
                            t.push(a)
                    }
                }), 0 < t.length && C.getUserPresence(t, h.chatLibrary.friendsDict).then(function(e) {
                    if (e && e.userPresences) {
                        var a = e.userPresences;
                        h.updatePresenceStatus(a)
                    }
                })
            } catch (e) {
                var i = "PresenceBulkNotifications:" + a.Type + ": ";
                e && e.message && (i += e.message), b.fireEvent(h.chatLibrary.googleAnalyticsEvent.category, h.chatLibrary.googleAnalyticsEvent.action, i)
            }
        }, h.unsubscribeRealTimeForChat = function() {
            O.Unsubscribe(v.notificationsName.ChatNotifications, h.handleChatNotifications), O.Unsubscribe(v.notificationsName.FriendshipNotifications, h.handleFriendshipNotifications), O.Unsubscribe(v.notificationsName.PresenceBulkNotifications, h.handlePresenceBulkNotifications)
        }, h.handleChatPrivacySetting = function(a) {
            m.debug("--------- this is ChatPrivacySettingNotifications subscription -----------" + a.Type);
            try {
                switch (a.Type) {
                    case v.notificationType.chatEnabled:
                        h.chatLibrary.chatLayout.isChatEnabledByPrivacySetting = h.chatLibrary.chatLayout.chatEnabledByPrivacySettingTypes.enabled, h.handleSignalRSuccess(!0), h.initializeRealTimeSubscriptionsForChat();
                        break;
                    case v.notificationType.chatDisabled:
                        h.chatLibrary.chatLayout.isChatEnabledByPrivacySetting = h.chatLibrary.chatLayout.chatEnabledByPrivacySettingTypes.disabled, h.unsubscribeRealTimeForChat()
                }
            } catch (e) {
                var t = "ChatPrivacySettingNotifications:" + a.Type + ": ";
                e && e.message && (t += e.message), b.fireEvent(h.chatLibrary.googleAnalyticsEvent.category, h.chatLibrary.googleAnalyticsEvent.action, t)
            }
        }, h.initializeRealTimeSubscriptionsForChatPrivacySetting = function() {
            A.default.isDefined(O) && O.Subscribe(v.notificationsName.ChatPrivacySettingNotifications, h.handleChatPrivacySetting)
        }, h.initializeRealTimeSubscriptionsForChat = function() {
            A.default.isDefined(O) && (s.logSinglePerformanceMark(v.performanceMarkLabels.chatSignalRInitializing), O.SubscribeToConnectionEvents(h.handleSignalRSuccess, h.handleSignalRSuccess, h.handleSignalRError, v.notificationsName.ChatNotifications), O.Subscribe(v.notificationsName.ChatNotifications, h.handleChatNotifications), O.Subscribe(v.notificationsName.FriendshipNotifications, h.handleFriendshipNotifications), h.chatLibrary.isPresenceServiceInWebEnabled ? h.listenToPresenceServiceInWeb() : O.Subscribe(v.notificationsName.PresenceBulkNotifications, h.handlePresenceBulkNotifications))
        }, h.handleSignalRSuccess = function(e) {
            if (m.debug(" -------- Signal R is connected ------ "), h.chatLibrary.chatLayout.errorMaskEnable && h.$apply(function() {
                    h.chatLibrary.chatLayout.errorMaskEnable = !1
                }), h.chatLibrary.timer && t.cancel(h.chatLibrary.timer), e || s.logSinglePerformanceMark(v.performanceMarkLabels.chatSignalRSucceeded), h.chatLibrary.chatLayout.pageInitializing) h.chatLibrary.chatLayout.pageInitializing = !1;
            else try {
                e && (h.initializePresetData(), h.initializeChat())
            } catch (e) {
                var a = "handleSignalRSuccess: ";
                e && e.message && (a += e.message), b.fireEvent(h.chatLibrary.googleAnalyticsEvent.category, h.chatLibrary.googleAnalyticsEvent.action, a)
            }
        }, h.handleSignalRError = function() {
            m.debug(" -------- Signal R is disconnected ------ "), h.chatLibrary.timer = t(function() {
                h.chatLibrary.chatLayout.errorMaskEnable = !0
            }, parseInt(h.chatLibrary.signalRDisconnectionResponseInMilliseconds))
        }, h.onResize = function() {
            if (h.chatLibrary.chatLayout.numberOfDialogs > h.chatLibrary.chatLayout.availableNumberOfDialogs)
                for (; h.chatLibrary.dialogIdList.length > h.chatLibrary.chatLayout.availableNumberOfDialogs;) {
                    m.debug(" -------------overflow ------ $scope.chatLibrary.dialogIdList.length ------------- " + h.chatLibrary.dialogIdList.length);
                    var e = h.chatLibrary.dialogIdList.pop();
                    if (A.default.isUndefined(e)) break;
                    e && h.chatLibrary.dialogDict[e] && (h.chatLibrary.dialogDict[e].isUpdated = !0, h.chatLibrary.dialogDict[e].updateStatus = v.dialogStatus.MINIMIZE)
                } else if (h.chatLibrary.chatLayout.numberOfDialogs < h.chatLibrary.chatLayout.availableNumberOfDialogs)
                    for (; h.chatLibrary.dialogIdList.length < h.chatLibrary.chatLayout.availableNumberOfDialogs;) {
                        m.debug(" -------------fit ------ $scope.chatLibrary.dialogIdList.length ------------- " + h.chatLibrary.dialogIdList.length);
                        e = h.chatLibrary.minimizedDialogIdList.pop();
                        if (A.default.isUndefined(e)) break;
                        if (e && h.chatLibrary.minimizedDialogData[e]) {
                            delete h.chatLibrary.minimizedDialogData[e], h.chatLibrary.dialogIdList.push(e);
                            var a = Object.assign({}, v.dialogInitValue);
                            h.chatLibrary.dialogDict[e] = a
                        }
                    }
            h.chatLibrary.chatLayout.resizing = !1
        }, h.getLayoutId = function(e, a) {
            switch (a) {
                case v.dialogType.FRIEND:
                    return "friend_" + e;
                case v.dialogType.NEWGROUPCHAT:
                    return v.newGroup.dialogType;
                case v.dialogType.CHAT:
                case v.dialogType.GROUPCHAT:
                case v.dialogType.ADDFRIENDS:
                default:
                    return "conv_" + e
            }
        }, h.formatUserDataByType = function(e) {
            switch (e.type) {
                case v.participantType.user:
                    e.userId = e.targetId, e.id = e.targetId
            }
        }, h.getUserInfoForConversation = function(i) {
            if (i.initiator && h.formatUserDataByType(i.initiator), i.participants) {
                i.userIds = [], i.candidatePlayerIds = [];
                var r = [];
                i.participants.forEach(function(e) {
                    h.formatUserDataByType(e);
                    var a = e.userId,
                        t = e.name;
                    switch (i.dialogType) {
                        case h.dialogType.GROUPCHAT:
                            i.userIds.push(a), a !== h.chatLibrary.userId && (i.playerIds && i.playerIds.indexOf(a) < 0 || !i.playerIds) && i.candidatePlayerIds.push(a);
                            break;
                        case h.dialogType.CHAT:
                            a !== h.chatLibrary.userId && (i.userIds.push(a), i.displayUserId = a, i.username = t, (i.playerIds && i.playerIds.indexOf(a) < 0 || !i.playerIds) && i.candidatePlayerIds.push(a));
                            break;
                        default:
                            i.userIds.push(a)
                    }
                    a !== h.chatLibrary.userId && h.buildPlayTogetherListForEachConveration(e, i), h.chatLibrary.friendsDict[a] || (r.push(a), h.chatLibrary.friendsDict[a] = {
                        id: a,
                        name: e.name
                    }), !i.isGroupChat && h.chatViewModel.friendsHasConversation.indexOf(a) < 0 && h.chatViewModel.friendsHasConversation.push(a), h.chatLibrary.layoutIdsDictPerUserId[a] || (h.chatLibrary.layoutIdsDictPerUserId[a] = []), h.chatLibrary.layoutIdsDictPerUserId[a].indexOf(i.layoutId) < 0 && h.chatLibrary.layoutIdsDictPerUserId[a].push(i.layoutId)
                }), 0 < r.length && C.getUserInfo(r, h.chatLibrary.friendsDict).then(function(e) {
                    e && r.forEach(function(e) {
                        var a = h.chatLibrary.friendsDict[e];
                        h.buildPlayTogetherListForEachConveration(a, i), h.getPlaceDetailsForNewPlaceIds([i])
                    })
                }), p.setPlaceForShown(i)
            }
        }, h.buildPlayTogetherListForEachConveration = function(e, a) {
            if (!h.chatLibrary.friendsDict) return !1;
            var t = h.chatLibrary.friendsDict[e.id];
            t && t.presence && t.presence.userPresenceType === y.status.inGame && p.sortPlayTogetherIds(a, t.presence)
        }, h.updateChatViewModel = function(r, e) {
            switch (r.isGroupChat || r.dialogType !== v.dialogType.CHAT || r.participants.forEach(function(e) {
                    var a = e.targetId;
                    if (a !== h.chatLibrary.userId) {
                        var t = h.getLayoutId(a, v.dialogType.FRIEND),
                            i = h.chatLibrary.chatLayoutIds.indexOf(t); - 1 < i && (h.chatLibrary.chatLayoutIds.splice(i, 1), delete h.chatUserDict[t]), G(t, !0), h.chatLibrary.userConversationsDict[a] = r.layoutId
                    }
                }), r.dialogType) {
                case h.dialogType.GROUPCHAT:
                case h.dialogType.CHAT:
                    r.name = r.title, h.chatLibrary.allConversationLayoutIdsDict[r.id] = r.layoutId;
                    break;
                default:
                    A.default.isDefined(r.Username) && (r.name = r.Username)
            }
            h.chatUserDict[r.layoutId] = r;
            var a = h.chatLibrary.chatLayoutIds.indexOf(r.layoutId);
            if (-1 < a && h.chatLibrary.chatLayoutIds.splice(a, 1), r.isConversation)
                if (e) {
                    var t = h.chatLibrary.chatLayoutIds[0];
                    h.chatUserDict[t];
                    h.chatLibrary.chatLayoutIds.unshift(r.layoutId)
                } else h.chatLibrary.chatLayoutIds.push(r.layoutId);
            G(r.layoutId), r.isConversation && !h.chatLibrary.conversationsDict[r.id] && (h.chatLibrary.conversationsDict[r.id] = Object.assign({}, v.conversationInitStatus), h.chatLibrary.conversationsDict[r.id].layoutId = r.layoutId)
        }, h.filterFriends = function(e) {
            var a = [];
            e = v.sortFriendList(h.chatLibrary, e), h.chatLibrary.friendIds = [], h.chatLibrary.friendLayoutIds = [], e.forEach(function(e) {
                ! function(e) {
                    if (h.chatLibrary.friendIds.indexOf(e.id) < 0 && h.chatLibrary.friendIds.push(e.id), !h.chatLibrary.friendsDict[e.id]) {
                        var a = Object.assign({}, e);
                        h.chatLibrary.friendsDict[e.id] = a
                    }
                    if (h.chatViewModel.friendsHasConversation.indexOf(e.id) < 0) {
                        var t = h.getLayoutId(e.id, v.dialogType.FRIEND);
                        e.layoutId = t, e.isConversation = !1, e.dialogType = v.dialogType.FRIEND, h.chatLibrary.friendLayoutIds.indexOf(t) < 0 && h.chatLibrary.friendLayoutIds.push(t), h.updateChatViewModel(e, !1), h.chatLibrary.chatLayout.chatLandingEnabled && (h.chatLibrary.chatLayout.chatLandingEnabled = !1), h.buildPlayTogetherListForEachConveration(e, e), p.setPlaceForShown(e)
                    }
                }(e)
            }), h.getPlaceDetailsForNewPlaceIds(e), h.chatLibrary.chatLayoutIds.forEach(function(e) {
                h.chatUserDict[e].isConversation && a.push(e)
            });
            var t = a.concat(h.chatLibrary.friendLayoutIds);
            h.chatLibrary.chatLayoutIds = t
        }, h.updateConversationInLocalStorage = function(e) {
            var a = {
                    pageNumber: 1,
                    pageSize: h.chatApiParams.pageSizeOfConversations
                },
                t = T.getStorageName(T.chatDataName.getUserConversations, a),
                i = T.getChatDataFromLocalStorage(t);
            if (i) {
                var r = i.data;
                r.unshift(e), T.saveChatDataToLocalStorage(t, r)
            }
        }, h.buildChatUserListByUnreadConversations = function(e, a) {
            e.forEach(function(e) {
                e.isGroupChat = v.conversationType.multiUserConversation === e.conversationType, f.formatTimestampInConversation(e);
                var a = h.getLayoutId(e.id, v.dialogType.CHAT);
                if (h.chatUserDict[a]) {
                    var t = h.chatUserDict[a];
                    e.hasUnreadMessages && e.chatMessages && 0 < e.chatMessages.length && (t.hasUnreadMessages = !0, h.chatLibrary.dialogDict[a] && -1 < h.chatLibrary.dialogIdList.indexOf(a) && (f.processMessages(h.chatLibrary, t, e.chatMessages, h.chatLibrary.friendsDict), g.fetchDataForLinkCard(e.chatMessages, h.chatLibrary)), h.chatLibrary.isRespectingMessageTypeEnabled ? t.displayMessage = f.getDisplayMessageForUser(e.chatMessages) : (v.sanitizeMessage(e.chatMessages[0]), t.displayMessage = f.buildDisplayMessage(e.chatMessages[0])), h.updateChatViewModel(t, !0)), t.participants = e.participants, h.getUserInfoForConversation(t), P(t)
                } else h.updateConversationInLocalStorage(e), e.layoutId = a, e.isConversation = !0, e.dialogType = e.isGroupChat ? v.dialogType.GROUPCHAT : v.dialogType.CHAT, h.getUserInfoForConversation(e), h.updateChatViewModel(e, !0), P(e)
            })
        }, h.getPlaceDetailsForNewPlaceIds = function(e) {
            var r = [],
                s = [];
            if (e.forEach(function(t) {
                    var i = h.chatLibrary.placesLibrary;
                    if (t.pinGame) {
                        var e = t.pinGame.rootPlaceId;
                        !v.isPlaceDetailQualifiedInLibrary(i, e) && r.indexOf(e) < 0 && r.push(e)
                    }
                    t.playTogetherIds && 0 < t.playTogetherIds.length && t.playTogetherIds.forEach(function(e) {
                        !v.isPlaceDetailQualifiedInLibrary(i, e) && r.indexOf(e) < 0 && r.push(e);
                        var a = t.id;
                        t.placeButtonLayout && t.placeButtonLayout[e] || !(s.indexOf(a) < 0) || s.push(a)
                    })
                }), 0 < r.length) h.fetchPlaceDetailsIntoPlacesLibrary(r, e);
            else if (0 < s.length) {
                var a = h.chatLibrary.placesLibrary;
                A.default.forEach(e, function(e) {
                    -1 < s.indexOf(e.id) && g.buildButtonLayoutPerConversation(e, a)
                })
            }
        }, h.isConversationExistedInViewModel = function(e) {
            if (e && e.layoutId) {
                var a = e.layoutId;
                return h.chatUserDict && h.chatUserDict[a]
            }
            return !1
        }, h.buildChatUserListByConversations = function(e, t) {
            var i = [];
            e.forEach(function(e) {
                var a = h.getLayoutId(e.id, e.dialogType);
                i.push(e.id), e.layoutId = a, e.isConversation = !0, h.getUserInfoForConversation(e), h.isConversationExistedInViewModel(e) || h.updateChatViewModel(e, t)
            }), h.getMessageForConversations(i), h.getPlaceDetailsForNewPlaceIds(e)
        }, h.openConversation = function(e, r) {
            var s = h.chatLibrary.dialogRequestedToOpenParams.layoutId,
                n = h.chatLibrary.dialogRequestedToOpenParams.autoPop;
            if (h.chatUserDict[s] && h.chatUserDict[s].isConversation) h.updateDialogList(s, n);
            else {
                var a = e || h.chatUserDict[s].id;
                r = void 0 === r || "boolean" != typeof r || r, o.startOneToOneConversation(a).then(function(e) {
                    var a = h.chatLibrary.chatLayoutIds.indexOf(s);
                    h.chatLibrary.chatLayoutIds.splice(a, 1), delete h.chatUserDict[s], G(s, !0);
                    var t = h.getLayoutId(e.id, v.dialogType.CHAT);
                    if (e.layoutId = t, e.isConversation = !0, e.dialogType = v.dialogType.CHAT, e.chatMessages = [], e.isGroupChat = e.conversationType === v.conversationType.multiUserConversation, h.getUserInfoForConversation(e), g.buildButtonLayoutPerConversation(e, h.chatLibrary.placesLibrary), h.updateChatViewModel(e, r), h.updateDialogList(t, n), e.pinGame) {
                        var i = e.pinGame.rootPlaceId;
                        h.fetchPlaceDetailsIntoPlacesLibrary([i], [e])
                    }
                    v.updateFocusedDialog(h.chatLibrary, t), f.formatTimestampInConversation(e)
                }, function() {
                    m.debug(" ---- startOneToOneConversation ---- failed!")
                })
            }
        }, h.destroyDialogLayout = function(e) {
            var a = "#" + e;
            A.default.element(a).empty()
        }, h.deleteLayoutIdFromDialogList = function(e) {
            for (var a = h.chatLibrary.dialogIdList, t = [], i = 0; i < a.length; i++) a[i] === e && t.push(i);
            if (0 < t.length) {
                for (var r = t.length - 1; 0 <= r; r--) h.chatLibrary.dialogIdList.splice(t[r], 1);
                delete h.chatLibrary.dialogDict[e]
            }
        }, h.expandGameListInConversation = function(e) {
            var a = h.chatUserDict[e];
            h.chatLibrary.playTogetherLibrary && h.chatLibrary.playTogetherLibrary[a.id] && (h.chatLibrary.playTogetherLibrary[a.id].layout.activeGamesList.isCollapsed = !0)
        }, h.launchDialog = function(e, a) {
            if (h.chatLibrary.dialogRequestedToOpenParams.layoutId = e, h.chatLibrary.dialogRequestedToOpenParams.autoPop = a, h.chatLibrary.dialogIdList.indexOf(e) < 0 && e === v.newGroup.layoutId) h.updateDialogList(e, a), h.chatUserDict[v.newGroup.layoutId] = h.newGroup;
            else if (h.chatLibrary.dialogIdList.indexOf(e) < 0 && h.chatUserDict[e]) h.openConversation(), h.expandGameListInConversation(e), a || v.updateFocusedDialog(h.chatLibrary, e);
            else if (-1 < h.chatLibrary.dialogIdList.indexOf(e) && h.chatLibrary.dialogsLayout[e]) {
                var t = h.chatLibrary.dialogsLayout[e];
                t.focusMeEnabled = !0, v.updateFocusedDialog(h.chatLibrary, e), t.collapsed && (t.collapsed = !1, v.updateDialogsPosition(h.chatLibrary))
            }
        }, h.closeDialog = function(e) {
            var a, t, i = h.chatUserDict[e];
            i && (a = v.getScrollBarSelector(i), t = A.default.element(a));
            A.default.element("#chat-main");
            if (h.chatLibrary.chatLayout.focusedLayoutId === e && v.updateFocusedDialog(h.chatLibrary, null), h.deleteLayoutIdFromDialogList(e), i && i.dialogType === v.dialogType.NEWGROUPCHAT && (i.selectedUserIds = [], i.selectedUsersDict = {}, i.numberOfSelected = 0), t && 0 < t.length && t.mCustomScrollbar("destroy"), h.$broadcast("Roblox.Chat.MarkDialogInactive", {
                    layoutId: e
                }), i) {
                var r = i.id;
                if (h.chatLibrary.conversationsDict[r] && h.chatLibrary.conversationsDict[r].remove) {
                    var s = h.chatLibrary.chatLayoutIds.indexOf(e); - 1 < s && i && (h.chatLibrary.chatLayoutIds.splice(s, 1), delete h.chatUserDict[e], A.default.equals(h.chatUserDict, {}) && (h.chatLibrary.chatLayout.chatLandingEnabled = !0)), G(e, !0)
                } else f.processMessages(h.chatLibrary, i, null)
            }
            if (h.destroyDialogLayout(e), 0 < h.chatLibrary.minimizedDialogIdList.length) {
                var n = h.chatLibrary.minimizedDialogIdList.shift();
                delete h.chatLibrary.minimizedDialogData[n], h.chatLibrary.dialogIdList.push(n), h.chatLibrary.dialogDict[n].isUpdated = !0, h.chatLibrary.dialogDict[n].updateStatus = v.dialogStatus.REPLACE
            }
            c.updateStorage(c.storageDictionary.dialogIdList, h.chatLibrary.dialogIdList, h.chatLibrary.cookieOption), c.updateStorage(c.storageDictionary.dialogDict, h.chatLibrary.dialogDict, h.chatLibrary.cookieOption), h.chatLibrary.dialogsLayout && h.chatLibrary.dialogsLayout[e] && (h.chatLibrary.dialogsLayout[e].collapsed = !1), delete h.chatLibrary.dialogsLayout[e], c.updateStorage(c.storageDictionary.dialogsLayout, h.chatLibrary.dialogsLayout, h.chatLibrary.cookieOption)
        }, h.validLayoutId = function(e, a) {
            if (h.chatUserDict[e]) return !0;
            switch (a) {
                case v.dialogType.FRIEND:
                    h.chatApiParams.loadMoreFriends ? h.getAllFriends() : h.chatLibrary.chatLayout.urlParseInitialized = !0;
                    break;
                case v.dialogType.CHAT:
                default:
                    h.chatApiParams.loadMoreConversations ? h.getUserConversations() : h.chatLibrary.chatLayout.urlParseInitialized = !0
            }
            return !1
        }, h.startSpecificConversationFromUserId = function(e) {
            var a = w(e),
                t = v.dialogType.CHAT;
            a || (a = h.getLayoutId(e, v.dialogType.FRIEND), t = v.dialogType.FRIEND), h.validLayoutId(a, t) ? (h.chatLibrary.chatLayout.urlParseInitialized = !0, h.launchDialog(a, !0)) : (h.chatLibrary.dialogRequestedToOpenParams.layoutId = a, h.chatLibrary.dialogRequestedToOpenParams.autoPop = !0, h.openConversation(e, !1))
        }, h.startSpecificConversationFromConvId = function(e) {
            var a = h.getLayoutId(e, v.dialogType.CHAT);
            m.debug("--attempting to open specific conversation on load: " + e + "--"), h.validLayoutId(a, v.dialogType.CHAT) && (h.chatLibrary.chatLayout.urlParseInitialized = !0, h.launchDialog(a))
        }, h.openSettingsPage = function() {
            window.location.href = a.getAbsoluteUrl(v.linksLibrary.settingLink)
        }, h.getAvatars = function(e) {
            e && 0 < e.length && C.getAvatarHeadshots(e, h.chatLibrary.friendsDict)
        }, h.getFriendsInfo = function(e) {
            h.chatLibrary.chatLayout.pageDataLoading && (h.chatLibrary.chatLayout.pageDataLoading = !1);
            var t = [];
            A.default.forEach(e, function(e, a) {
                t.push(a), e.id = parseInt(a), e.userId = parseInt(a), h.chatLibrary.friendsDict[a] || (h.chatLibrary.friendsDict[a] = e)
            }), h.filterFriends(e), h.getAvatars(t)
        }, h.initializeChat = function() {
            h.chatUserDict && h.chatLibrary || h.setup(), s.logSinglePerformanceMark(v.performanceMarkLabels.chatConversationsLoading), h.updateUnreadConversationCount(), h.getUserConversations()
        }, h.initializeFriends = function() {
            var e = {
                isEnabled: h.chatLibrary.isUsingCacheToLoadFriendsInfoEnabled,
                expirationMS: h.chatLibrary.cachedDataFromLocalStorageExpirationMS
            };
            F.sharedFriendsService.register(h.getFriendsInfo, e)
        }, h.initializeEvents = function() {
            A.default.element(i).bind("resize", function() {
                !h.chatLibrary.chatLayout.resizing && (0 < h.chatLibrary.dialogIdList.length || 0 < h.chatLibrary.minimizedDialogIdList.length) && (h.chatLibrary.chatLayout.resizing = !0, M(), h.dialogsOverflowWindow() || function() {
                    var e = r.innerWidth();
                    return h.chatLibrary.chatLayout.numberOfDialogs < h.chatLibrary.chatLayout.availableNumberOfDialogs && e > v.chatLayout.thresholdMobile
                }() ? (m.debug(" ------- need to resize -------------- "), h.onResize()) : h.chatLibrary.chatLayout.resizing = !1)
            }), h.$on("Roblox.Chat.destroyChatCookie", function() {
                c.removeFromStorage(c.storageDictionary.dialogIdList, h.chatLibrary.cookieOption), c.removeFromStorage(c.storageDictionary.dialogDict, h.chatLibrary.cookieOption), c.removeFromStorage(c.storageDictionary.dialogsLayout, h.chatLibrary.cookieOption), c.removeFromStorage(c.storageDictionary.chatBarLayout, h.chatLibrary.cookieOption), c.removeFromStorage(c.storageDictionary.chatFriendsListReloadTime), e.removeLocalStorage(h.chatLibrary.dialogLocalStorageName), T.clearLocalStorage()
            }), h.$on("Roblox.Chat.LoadUnreadConversationCount", function() {
                h.updateUnreadConversationCount()
            }), r.bind("Roblox.Chat.StartChat", function(e, a) {
                h.startSpecificConversationFromUserId(a.userId)
            })
        }, h.initializeServices = function(e) {
            o.setParams(), f.setParams(e), g.setParams(F.EnvironmentUrls.chatApi, F.EnvironmentUrls.gamesApi), T.setStorageParams(e)
        }, h.initializeChatLibrary = function(e) {
            var a = F.EnvironmentUrls.domain;
            h.chatLibrary.chatLayout.chatEnabledByPrivacySettingTypes = v.chatEnabledByPrivacySettingTypes, h.chatLibrary.chatLayout.isChatEnabledByPrivacySetting = e.isChatEnabledByPrivacySetting, h.chatLibrary.chatLayout.languageForPrivacySettingUnavailable = e.languageForPrivacySettingUnavailable, h.chatLibrary.cookieOption = {
                domain: a,
                path: "/",
                expires: null
            }, h.chatLibrary.currentTabTitle = i.document.title, h.chatLibrary.dialogLocalStorageName = u.dialogLocalStorageNamePrefix + a, h.chatLibrary.domain = a, h.chatLibrary.isPresenceServiceInWebEnabled = F.PresenceService, h.chatLibrary.isUserUnder13 = F.CurrentUser.isUnder13, h.chatLibrary.maxConversationTitleLengthInput = e.maxConversationTitleLength, h.chatLibrary.partyChromeDisplayTimeStampInterval = e.partyChromeDisplayTimeStampInterval, h.chatLibrary.quotaOfGroupChatMembers = e.numberOfMembersForPartyChrome - 1, h.chatLibrary.screenHeight = window.screen ? window.screen.height : 0, h.chatLibrary.signalRDisconnectionResponseInMilliseconds = e.signalRDisconnectionResponseInMilliseconds, h.chatLibrary.typingInChatAsSenderThrottleMs = e.typingInChatFromSenderThrottleMs, h.chatLibrary.typingInChatForReceiverExpirationMs = e.typingInChatForReceiverExpirationMs, h.chatLibrary.userId = parseInt(F.CurrentUser.userId), h.chatLibrary.username = F.CurrentUser.name;
            var t = b.eventActions.Chat;
            t += ": " + b.getUserAgent(), h.chatLibrary.googleAnalyticsEvent = {
                category: b.eventCategories.JSErrors,
                action: t
            }, h.chatLibrary.senderTypesForUnknownMessageTypeError = e.senderTypesForUnknownMessageTypeError, h.chatLibrary.eventStreamParams = Object.assign({}, v.eventStreamParams), h.chatLibrary.relativeValueToRecordUiPerformance = e.relativeValueToRecordUiPerformance, h.chatLibrary.isUsingCacheToLoadFriendsInfoEnabled = e.isUsingCacheToLoadFriendsInfoEnabled, h.chatLibrary.cachedDataFromLocalStorageExpirationMS = e.cachedDataFromLocalStorageExpirationMS, h.chatLibrary.isInvalidMessageTypeFallbackEnabled = e.isInvalidMessageTypeFallbackEnabled, h.chatLibrary.isRespectingMessageTypeEnabled = e.isRespectingMessageTypeEnabled, h.chatLibrary.validMessageTypesWhiteList = e.validMessageTypesWhiteList, h.chatLibrary.shouldRespectConversationHasUnreadMessageToMarkAsRead = e.shouldRespectConversationHasUnreadMessageToMarkAsRead
        }, h.initializeChatViewModel = function() {
            h.chatViewModel = Object.assign({}, u.chatViewModel), h.chatViewModel.chatDomain = F.EnvironmentUrls.chatApi
        }, h.bootstrapAllInitialization = function(e) {
            h.initializeChatViewModel(), h.initializeChatLibrary(e), h.initializeServices(e), h.initializeRealTimeSubscriptionsForChatPrivacySetting(), h.initializePresetData(), h.initializeChatBar(), h.chatLibrary.chatLayout.chatEnabledByPrivacySettingTypes && h.chatLibrary.chatLayout.isChatEnabledByPrivacySetting === h.chatLibrary.chatLayout.chatEnabledByPrivacySettingTypes.enabled && (h.chatLibrary.chatLayout.pageDataLoading = !0, h.initializeChat(), h.initializeRealTimeSubscriptionsForChat()), h.chatLibrary.chatLayout.pageInitializing && (h.chatLibrary.chatLayout.pageInitializing = !1)
        }, h.initialize = function() {
            h.setup(), h.initializeEvents(), h.chatLibrary.chatLayout.pageInitializing = !0, o.getMetaData().then(function(e) {
                h.bootstrapAllInitialization(e)
            })
        }, h.initialize()
    }
    s.$inject = ["$scope", "$window", "$document", "$timeout", "$interval", "$log", "chatService", "messageService", "chatUtility", "chatClientStorageUtilityService", "localStorageService", "performanceService", "messageUtility", "googleAnalyticsEventsService", "urlService", "dialogAttributes", "libraryInitialization", "gameService", "playTogetherService", "pinGameService", "presenceLayout", "resources", "storageService", "friendsInfoService", "usersService"], i.default.controller("chatController", s), a.default = s
}, function(e, a, t) {
    "use strict";
    Object.defineProperty(a, "__esModule", {
        value: !0
    });
    var i, r = t(0),
        s = (i = r) && i.__esModule ? i : {
            default: i
        };

    function n(e, a) {
        var t = e.dialogData.initiator,
            i = e.chatLibrary.userId;
        e.canConversationRemoveMember = function() {
            return e.dialogData.dialogType !== e.dialogType.CHAT && (t && t.id === i)
        }
    }
    n.$inject = ["$scope", "$log"], s.default.controller("detailsController", n), a.default = n
}, function(e, a, t) {
    "use strict";
    Object.defineProperty(a, "__esModule", {
        value: !0
    });
    var y = t(2),
        h = r(t(1)),
        i = r(t(0));

    function r(e) {
        return e && e.__esModule ? e : {
            default: e
        }
    }

    function s(c, r, s, n, i, o, l, d, u, g, p) {
        c.removeFromConversation = function(e, a) {
            s.removeFromConversation(c.chatLibrary.userId, e), c.chatLibrary.chatLayoutIds && -1 < c.chatLibrary.chatLayoutIds.indexOf(a) && (c.chatLibrary.conversationsDict[e].remove = !0, c.closeDialog({
                layoutId: a
            }))
        }, c.sendPerformanceData = function(e) {
            if (Math.random() < c.chatLibrary.relativeValueToRecordUiPerformance) {
                var a = e.startSendingTime,
                    t = (new Date).getTime() - a;
                s.sendPerformanceData(u.performanceMeasurements.messageSend, t)
            }
        };

        function a(t) {
            s.sendMessage(c.dialogData.id, t.rawContent).then(function(e) {
                if (e)
                    if (t.sendingMessage = !1, t.canResend = !1, c.sendPerformanceData(t), e.resultType !== n.resultType.SUCCESS) {
                        if (t.sendMessageHasError = !0, t.error = n.errorMessages.default, e.resultType === n.resultType.MODERATED) {
                            if (t.error = n.errorMessages.messageContentModerated, t.content = n.hashOutContent(t.content), n.sanitizeMessage(t), t.hasLinkCard) t.linkCardMessages.forEach(function(e) {
                                e.isCard || (e.content = n.hashOutContent(e.content))
                            })
                        } else t.canResend = !0
                    } else {
                        var a = e.content;
                        t.sendMessageHasError = !1, h.default.isUndefined(c.dialogData.messagesDict) && (c.dialogData.messagesDict = {}), t.id = e.messageId, t.sent = e.sent, t.messageType = e.messageType, i.buildTimeStamp(t, c.dialogData), i.buildDisplayMessage(t), t.resetClusterMessage = !0, n.sanitizeMessage(e), t.content = e.content, t.pieces = e.pieces, t.filteredForReceivers = e.filteredForReceivers, t.messageType = e.messageType, t.senderType = p.senderTypes.user, i.setClusterMaster(c.dialogData, t), t.hasLinkCard && t.rawContent !== a && (e.hasLinkCard ? (d.fetchDataForLinkCard([e], c.chatLibrary), t.linkCardMessages = e.linkCardMessages) : t.hasLinkCard = !1), c.dialogData.messagesDict[e.messageId] = t
                    }
            }, function(e) {
                r.debug(" ------ sendMessage error -------"), t.sendingMessage = !1, t.sendMessageHasError = !0, t.canResend = !0, e === n.sendMessageErrorCode.textTooLong && (t.error = n.errorMessages.textTooLong)
            })
        }
        c.toggleDetails = function() {
            c.dialogLayout.details.isEnabled = !c.dialogLayout.details.isEnabled, c.saveIntoDialogsLayout()
        }, c.toggleConversationEditor = function() {
            c.dialogLayout.details.isConversationTitleEditorEnabled = !c.dialogLayout.details.isConversationTitleEditorEnabled, c.dialogLayout.focusMeEnabled = c.dialogLayout.details.isConversationTitleEditorEnabled, c.saveIntoDialogsLayout()
        }, c.toggleAddFriends = function() {
            c.dialogLayout.details.isAddFriendsEnabled = !c.dialogLayout.details.isAddFriendsEnabled, c.dialogLayout.details.isAddFriendsEnabled ? c.addFriends() : c.dialogData.addMoreFriends = !1, c.getLimitLinkNameForMemberList(), c.saveIntoDialogsLayout()
        }, c.getLimitLinkNameForMemberList = function(e) {
            var a = c.dialogData.userIds.length;
            c.dialogData.selectedUserIds && (a += c.dialogData.selectedUserIds.length), e && (a -= e), c.dialogLayout.memberDisplay.linkName = c.dialogLayout.memberDisplay.isAll ? c.dialogLayout.memberDisplay.seeLessLink : c.dialogLayout.memberDisplay.seeMoreLink + " (" + (a - c.dialogLayout.memberDisplay.defaultLimit) + ")"
        }, c.toggleMemberList = function() {
            c.dialogLayout.memberDisplay.isAll = !c.dialogLayout.memberDisplay.isAll, c.dialogLayout.memberDisplay.limitNumber = c.dialogLayout.memberDisplay.isAll ? c.dialogData.userIds.length : c.dialogLayout.memberDisplay.defaultLimit, c.getLimitLinkNameForMemberList()
        }, c.toggleFriendsMenu = function(e, a) {
            a && c.dialogLayout.details.friendIdForMenuOn === e ? (c.dialogLayout.details.friendMenuAction = {}, c.dialogLayout.details.friendIdForMenuOn = null) : e && !a && (c.dialogLayout.details.friendMenuAction[e] = !c.dialogLayout.details.friendMenuAction[e], c.dialogLayout.details.friendIdForMenuOn = e)
        }, c.updatePopoverParams = function() {
            var e = c.dialogData,
                a = e.id,
                t = e.playTogetherIds,
                i = c.dialogLayout.togglePopoverParams,
                r = i.dialogSelectorPrefix,
                s = i.popoverTriggerSelectorPrefix,
                n = i.dialogTriggerClassPrefix,
                o = c.dialogLayout.togglePopoverParams,
                l = {
                    dialogSelect: r + a,
                    triggerSelector: s + a,
                    dialogTriggerClassSelector: n + a,
                    isOpen: !!t && 0 < t.length,
                    isFirstTimeOpen: !0
                };
            Object.assign(o, l)
        }, c.dialogParams = Object.assign({}, n.dialogParams), c.userPresenceTypes = n.userPresenceTypes, c.dialogData.messageForSend = "", c.dialogLayout.scrollbarElm = n.getScrollBarSelector(c.dialogData, n.scrollBarType.MESSAGE), c.dialogLayout.listenToScrollInitialized = !1, c.friendsScrollbarElm = n.getScrollBarSelector(c.dialogData, n.scrollBarType.FRIENDSELECTION), c.updatePopoverParams(), c.updateDialog = function() {
            r.debug("---- updateDialog callback ---- Scrollbars updated"), c.dialogLayout.IsdialogContainerVisible || (h.default.element(c.dialogLayout.scrollbarElm).find(".mCustomScrollBox").addClass("dialog-visible"), c.dialogLayout.IsdialogContainerVisible = !0);
            return !1
        }, c.buildNewMessage = function(e) {
            return {
                read: !0,
                content: e,
                rawContent: e,
                senderTargetId: c.chatLibrary.userId,
                sendingMessage: !0,
                sendMessageHasError: !1,
                startSendingTime: (new Date).getTime(),
                messageType: "PlainText",
                senderType: "User"
            }
        }, c.sendMessage = function() {
            if (0 < c.dialogData.messageForSend.length) {
                var e = c.buildNewMessage(c.dialogData.messageForSend);
                n.sanitizeMessage(e), d.fetchDataForLinkCard([e], c.chatLibrary), c.dialogData.messageForSend = "", h.default.isUndefined(c.dialogData.chatMessages) && (c.dialogData.chatMessages = []), i.setClusterMaster(c.dialogData, e), c.dialogData.displayMessage = e, a(e)
            }
        }, c.resendMessage = function(e) {
            a(e)
        }, c.keyPressEnter = function() {
            c.sendMessage(), c.dialogLayout.typing.isTypingAsSender && (c.dialogLayout.typing.lastTimeTypingAsSender = null, c.dialogLayout.typing.isTypingAsSender = !1)
        }, c.typing = function(e, a, t) {
            if (a) {
                if (e.which !== l.enter) {
                    var i = t || (new Date).getTime(),
                        r = c.dialogLayout.typing;
                    (!r.lastTimeTypingAsSender || i - r.lastTimeTypingAsSender > c.chatLibrary.typingInChatAsSenderThrottleMs) && (r.lastTimeTypingAsSender = i, r.isTypingAsSender = !0, s.updateUserTypingStatus(c.dialogData.id, !0))
                }
                c.toggleDialogFocusStatus(!0)
            }
        }, c.abuseReport = function(e, a) {
            if (c.dialogLayout.isConfirmationOn = !0, e && (c.dialogLayout.userIdForAbuseReport = e), a && c.dialogLayout.userIdForAbuseReport) {
                var t = g("formatString")(n.chatLayout.abuseReportUrl, {
                        userId: c.dialogLayout.userIdForAbuseReport,
                        location: escape(window.location),
                        conversationId: c.dialogData.id
                    }),
                    i = y.Endpoints ? y.Endpoints.getAbsoluteUrl(t) : t;
                y.AbuseReportDispatcher ? y.AbuseReportDispatcher.triggerUrlAction(i) : window.location.href = i, c.dialogLayout.userIdForAbuseReport = null, c.dialogLayout.isConfirmationOn = !1
            }
            c.saveIntoDialogsLayout()
        }, c.leaveGroupChat = function(e) {
            if (e) c.chatLibrary.conversationsDict[c.dialogData.id].remove = !0, c.removeFromConversation(c.dialogData.id, c.dialogData.layoutId), c.resetConfirmDialog();
            else {
                c.dialogLayout.confirmDialog.isOpen = !0;
                var a = o.negativeAction.leaveChatGroup;
                c.dialogLayout.confirmDialog.title = a.title, c.dialogLayout.confirmDialog.headerTitle = a.headerTitle, c.dialogLayout.confirmDialog.btnName = a.btnName, c.dialogLayout.confirmDialog.cancelBtnName = a.cancelBtnName, c.dialogLayout.confirmDialog.type = a.type
            }
        }, c.addFriends = function() {
            c.dialogData.addMoreFriends = !0, 0 < c.chatLibrary.friendIds.length && c.updateFriends(), c.dialogData.scrollBarType = n.scrollBarType.FRIENDSELECTION
        }, c.viewParticipants = function() {
            c.dialogLayout.lookUpMembers = !c.dialogLayout.lookUpMembers
        }, c.toggleGroupNameEditor = function() {
            c.dialogLayout.renameEditor.isEnabled = !c.dialogLayout.renameEditor.isEnabled, c.dialogLayout.renameEditor.hasFocus = !c.dialogLayout.renameEditor.hasFocus, c.updateDialogStyle(), c.dialogLayout.focusMeEnabled = !c.dialogLayout.renameEditor.isEnabled
        }, c.renameTitle = function() {
            var a = c.dialogData.title;
            s.renameGroupConversation(c.dialogData.id, c.dialogData.name).then(function(e) {
                if (e) {
                    switch (e.resultType) {
                        case n.resultType.MODERATED:
                            i.buildSystemMessage(n.notificationType.conversationTitleModerated, c.dialogData, !0), n.updateConversationTitle(c.dialogData, a);
                            break;
                        case n.resultType.SUCCESS:
                            n.updateConversationTitle(c.dialogData, e.conversationTitle)
                    }
                    c.toggleConversationEditor()
                }
            })
        }, c.removeMember = function(e, a) {
            if (a) c.resetConfirmDialog(), c.getLimitLinkNameForMemberList(1), s.removeFromConversation(e, c.dialogData.id).then(function() {
                c.isOverLoaded()
            });
            else {
                c.dialogLayout.confirmDialog.isOpen = !0;
                var t = o.negativeAction.removeUser;
                c.dialogLayout.confirmDialog.title = t.title, c.dialogLayout.confirmDialog.headerTitle = t.headerTitle, c.dialogLayout.confirmDialog.btnName = t.btnName, c.dialogLayout.confirmDialog.cancelBtnName = t.cancelBtnName, c.dialogLayout.confirmDialog.type = t.type, c.dialogLayout.confirmDialog.params = {
                    userId: e
                }
            }
        }, c.resetConfirmDialog = function() {
            Object.assign(c.dialogLayout.confirmDialog, {
                isOpen: !1,
                title: "",
                btnName: "",
                type: "",
                params: {}
            })
        }, c.confirmCallBack = function() {
            var e = c.dialogLayout.confirmDialog;
            switch (e.type) {
                case o.negativeAction.removeUser.type:
                    c.removeMember(e.params.userId, !0);
                    break;
                case o.negativeAction.leaveChatGroup.type:
                    c.leaveGroupChat(!0)
            }
        }, c.updateDialogHeader = function(e) {
            c.dialogLayout.collapsed && (c.dialogLayout.hoverOnCollapsed = e)
        }, s.getMessages(c.dialogData.id, null, c.dialogParams.pageSizeOfGetMessages).then(function(e) {
            e && 0 < e.length ? (c.dialogData.chatMessages = [], c.dialogData.messagesDict = {}, i.processMessages(c.chatLibrary, c.dialogData, e, c.chatLibrary.friendsDict), d.fetchDataForLinkCard(e, c.chatLibrary), c.dialogData.scrollBarType = n.scrollBarType.MESSAGE) : (c.dialogData.scrollBarType = n.scrollBarType.MESSAGE, c.updateDialog())
        }), c.$on("elastic:resize", function(e, a, t, i) {
            r.debug("---- oldHeight -----" + t + "---- newHeight -----" + i), t !== i && (e.preventDefault(), e.stopPropagation(), n.setResizeInputLayout(c.chatLibrary, i, c.dialogData, c.dialogLayout))
        }), c.init = function() {
            c.getLimitLinkNameForMemberList()
        }, c.init()
    }
    s.$inject = ["$scope", "$log", "chatService", "chatUtility", "messageService", "dialogAttributes", "keyCode", "gameService", "resources", "$filter", "messageHelper"], i.default.controller("dialogController", s), a.default = s
}, function(e, a, t) {
    "use strict";
    Object.defineProperty(a, "__esModule", {
        value: !0
    });
    var i, r = t(0),
        s = (i = r) && i.__esModule ? i : {
            default: i
        };

    function n(t, e, i, r) {
        t.isGameIconAvailable = function() {
            return t.isPinOrActiveGameAvailable() || t.isMyRecentGameAvailable()
        }, t.isPinOrActiveGameAvailable = function() {
            return t.dialogData.placeForShown && t.dialogData.placeForShown.rootPlaceId
        }, t.isMyRecentGameAvailable = function() {
            return t.chatLibrary.myRecentPlaceId
        }, t.openGameList = function() {
            var e = i.eventStreamParams.openGameListInPlayTogether,
                a = {
                    conversationId: t.dialogData.id
                };
            r.sendEventWithTarget(e, i.eventStreamParams.actions.click, a)
        }, t.init = function() {
            t.gamesListTemplateUrl = i.templates.gamesList
        }, t.init()
    }
    n.$inject = ["$scope", "$log", "resources", "eventStreamService"], s.default.controller("dialogHeaderController", n), a.default = n
}, function(e, a, t) {
    "use strict";
    Object.defineProperty(a, "__esModule", {
        value: !0
    });
    var i, r = t(0),
        s = (i = r) && i.__esModule ? i : {
            default: i
        };

    function n(a, e, t) {
        a.isSenderTypeAllowed = function(e) {
            return -1 < a.chatLibrary.senderTypesForUnknownMessageTypeError.indexOf(e.senderType)
        }, a.canRenderMessage = function(e) {
            return !!e.sendingMessage || (!a.chatLibrary.isRespectingMessageTypeEnabled || (e.isSystemMessage || t.isMessageTypeInWhiteList(a.chatLibrary, e) && t.isMessageTypeLegal(e) && t.isSenderTypeLegal(e)))
        }, a.shouldShowInvalidMessageTypePrompt = function(e) {
            return a.chatLibrary.isInvalidMessageTypeFallbackEnabled && a.isSenderTypeAllowed(e)
        }
    }
    n.$inject = ["$scope", "$log", "messageUtility"], s.default.controller("dialogMessagesController", n), a.default = n
}, function(e, a, t) {
    "use strict";
    Object.defineProperty(a, "__esModule", {
        value: !0
    });
    var c = r(t(1)),
        i = r(t(0));

    function r(e) {
        return e && e.__esModule ? e : {
            default: e
        }
    }

    function s(s, n, o, l, r) {
        s.isNewGroupChat = function(e) {
            return e.dialogType === o.dialogType.NEWGROUPCHAT || e.addMoreFriends && !e.isGroupChat
        }, s.canAddFriendInExistedConversation = function(e) {
            return e.addMoreFriends && e.isGroupChat
        }, s.resetPreviousDialog = function(e, a, t) {
            s.chatUserDict[e].selectedUserIds = [], s.chatUserDict[e].selectedUsersDict = {}, t.preserved ? s.chatUserDict[e].addMoreFriends = !1 : delete s.chatUserDict[e];
            var i = s.chatLibrary.dialogIdList.indexOf(e); - 1 < i && !t.preserved ? (s.destroyDialogLayout(e), delete s.chatLibrary.dialogDict[e], t.isDuplicatedConversation ? s.chatLibrary.dialogIdList.splice(i) : (s.chatLibrary.dialogIdList[i] = a, s.chatLibrary.dialogDict[a] = Object.assign({}, o.dialogInitValue))) : s.updateDialogList(a, !0)
        }, s.generateDialog = function(e, a, t) {
            var i = t.layoutId,
                r = s.getLayoutId(e.id, a);
            e.dialogType = a, i !== r ? (s.getUserInfoForConversation(e), e.layoutId = r, e.isConversation = !0, s.updateChatViewModel(e, !0), s.resetPreviousDialog(i, r, t)) : (s.getUserInfoForConversation(e), s.updateChatViewModel(e, !0), s.chatLibrary.dialogDict[i].isUpdated = !0, s.chatLibrary.dialogDict[i].updateStatus = o.dialogStatus.REFRESH)
        }, s.createNewGroupChat = function(e, i) {
            if (!s.newGroupChatLocked) {
                s.newGroupChatLocked = !0;
                var r = {
                        layoutId: e
                    },
                    a = i.name;
                if (i.addMoreFriends && !i.isGroupChat) {
                    var t = i.participants;
                    c.default.forEach(t, function(e) {
                        var a = e.targetId;
                        a !== s.chatLibrary.userId && (i.selectedUserIds.push(a), i.selectedUsersDict[a] = c.default.copy(s.chatLibrary.friendsDict[a]), i.selectedUsersDict[a].hiddenFromSelection = !0)
                    }), r.preserved = !0, a = ""
                }
                n.startGroupConversation(i.selectedUserIds, a).then(function(e) {
                    if (e.resultType === o.resultType.SUCCESS) {
                        var a = e.conversation,
                            t = s.chatLibrary.allConversationLayoutIdsDict[a.id];
                        t ? (r.isDuplicatedConversation = !0, s.resetPreviousDialog(i.layoutId, t, r), s.chatLibrary.dialogIdList.indexOf(t) < 0 && s.launchDialog(t, !0)) : (a.isGroupChat = a.conversationType === o.conversationType.multiUserConversation, l.formatTimestampInConversation(a), s.generateDialog(a, o.dialogType.GROUPCHAT, r))
                    }
                    s.newGroupChatLocked = !1
                }).catch(function(e) {
                    s.newGroupChatLocked = !1
                })
            }
        }, s.sendInvite = function(e) {
            r.debug("------------- sendInvite ------------");
            var a = s.chatUserDict[e];
            if (a.dialogType !== o.dialogType.CHAT && a.dialogType !== o.dialogType.GROUPCHAT || a.addMoreFriends) s.canAddFriendInExistedConversation(a) ? n.addToConversation(a.selectedUserIds, a.id).then(function(e) {
                e && e.resultType === o.resultType.SUCCESS && e.conversationId && (a.addMoreFriends = !1, a.userIds = a.userIds.concat(a.selectedUserIds), a.selectedUserIds = [], a.selectedUsersDict = {})
            }) : s.isNewGroupChat(a) && s.createNewGroupChat(e, a);
            else {
                var t = a.userIds,
                    i = t.indexOf(s.chatLibrary.userId); - 1 < i && t.splice(i, 1), a.selectedUserIds = t
            }
        }
    }
    s.$inject = ["$scope", "chatService", "chatUtility", "messageService", "$log"], i.default.controller("dialogsController", s), a.default = s
}, function(e, a, t) {
    "use strict";
    Object.defineProperty(a, "__esModule", {
        value: !0
    });
    var s = t(2),
        n = r(t(1)),
        i = r(t(0));

    function r(e) {
        return e && e.__esModule ? e : {
            default: e
        }
    }

    function o(i, e, a, r) {
        i.dialogLayout.scrollToBottom = !1, i.dialogLayout.IsdialogContainerVisible = !1, i.dialogParams = Object.assign({}, e.dialogParams), i.dialogType = Object.assign({}, e.dialogType), i.userPresenceTypes = Object.assign({}, e.userPresenceTypes), i.friendsScrollbarElm = e.getScrollBarSelector(i.dialogData, e.scrollBarType.FRIENDSELECTION), i.dialogData.scrollBarType = e.scrollBarType.FRIENDSELECTION, i.dialogData.isCreated = !0, i.updateFriendsDictData = function(e) {
            var t = [];
            n.default.forEach(e, function(e, a) {
                e.id = parseInt(a), i.chatLibrary.friendsDict[a] || (i.chatLibrary.friendsDict[a] = e, t.push(a))
            }), i.updateFriends(e), t && 0 < t.length && r.getAvatarHeadshots(t, i.chatLibrary.friendsDict)
        };
        var t;
        0 < i.chatLibrary.friendIds.length && i.updateFriends(), t = {
            isEnabled: i.chatLibrary.isUsingCacheToLoadFriendsInfoEnabled,
            expirationMS: i.chatLibrary.cachedDataFromLocalStorageExpirationMS
        }, s.sharedFriendsService.register(i.updateFriendsDictData, t), i.isOverLoaded()
    }
    o.$inject = ["$scope", "chatUtility", "friendsInfoService", "usersService"], i.default.controller("friendsController", o), a.default = o
}, function(e, a, t) {
    "use strict";
    Object.defineProperty(a, "__esModule", {
        value: !0
    });
    var i, r = t(0),
        s = (i = r) && i.__esModule ? i : {
            default: i
        };

    function n(n, o, i, r, l, t, c, s, d) {
        n.isLinkCardAvailableAndParsedByClientSide = function(e) {
            return !e.isLinkCard && e.isCard
        }, n.sendEventStream = function(e, a) {
            var t = {
                placeId: a,
                conversationId: n.dialogData.id
            };
            i.sendEventWithTarget(e, n.chatLibrary.eventStreamParams.actions.click, t)
        }, n.sendLoadLinkCardEvent = function(e) {
            var a = {
                placeId: e,
                conversationId: n.dialogData.id
            };
            i.sendEventWithTarget(n.chatLibrary.eventStreamParams.loadGameLinkCardInChat, n.chatLibrary.eventStreamParams.actions.render, a)
        }, n.sendGamePlayEnvent = function(e) {
            var a = n.chatLibrary.eventStreamParams.context;
            i.sendGamePlayEvent(a.gamePlayFromLinkCard, e)
        }, n.playGame = function(e, a, t) {
            n.sendEventStream(a, e), n.sendGamePlayEnvent(e), t && t.privateServerLinkCode ? r.playPrivateServerGame(e, t.privateServerLinkCode) : r.playRegularGame(e)
        }, n.buyAccess = function(e, a) {
            var t = n.chatLibrary.placesLibrary[e],
                i = t.gameIconUrl,
                r = c("formatString")(a.buyAccess.bodyText(), {
                    placeName: t.placeName,
                    creatorName: t.creatorName,
                    price: t.price
                }),
                s = {
                    titleText: a.buyAccess.title,
                    bodyText: r,
                    imageUrl: i,
                    actionButtonShow: !0,
                    actionButtonText: a.buyAccess.yesButtonText,
                    actionButtonClass: a.buyAccess.yesButtonClass,
                    neutralButtonText: a.buyAccess.noButtonText,
                    closeButtonShow: !0
                };
            n.dialogLayout.playTogetherButton.isPlayButtonDisabled = !0, l.open(s).result.then(function() {
                o.debug("--- purchase ---"), n.dialogLayout.playTogetherButton.isPlayButtonDisabled = !1
            }, function() {
                o.debug("--- cancel ---"), n.dialogLayout.playTogetherButton.isPlayButtonDisabled = !1
            })
        }, n.goToPlaceDetails = function(e, a) {
            n.sendEventStream(a, e), t.location.href = n.chatLibrary.placesLibrary[e].placeUrl
        }, n.play = function(e, a, t) {
            switch (n.chatLibrary.placesLibrary[e].buttonLayoutForLinkCard.type) {
                case d.playButtonTypes.play:
                    n.playGame(e, a, t);
                    break;
                case d.playButtonTypes.buy:
                    n.buyAccess(e, d);
                    break;
                case d.playButtonTypes.details:
                    n.goToPlaceDetails(e, a)
            }
        }, n.pinGame = function(e, a) {
            e = parseInt(e), a = parseInt(a);
            var t = "";
            if (!n.dialogData.pinGame || n.dialogData.pinGame.rootPlaceId !== parseInt(a)) {
                t = n.chatLibrary.eventStreamParams.pinGameInLinkCard, s.sendPinGameEvent(t, a, n.dialogData);
                var i = {
                    rootPlaceId: a,
                    universeId: e,
                    actorUsername: n.chatLibrary.username,
                    userId: n.chatLibrary.userId,
                    placeName: n.chatLibrary.placesLibrary && n.chatLibrary.placesLibrary[a] ? n.chatLibrary.placesLibrary[a].placeName : "",
                    encodedPlaceName: n.chatLibrary.placesLibrary && n.chatLibrary.placesLibrary[a] ? n.chatLibrary.placesLibrary[a].encodedPlaceName : ""
                };
                s.setPinGameData(n.dialogData, i), s.pinGame(n.dialogData, e), r.buildButtonLayoutPerConversation(n.dialogData, n.chatLibrary.placesLibrary)
            }
        }
    }
    n.$inject = ["$scope", "$log", "eventStreamService", "gameService", "modalService", "$window", "$filter", "pinGameService", "gameLayout"], s.default.controller("linkCardController", n), a.default = n
}, function(e, a, t) {
    "use strict";
    Object.defineProperty(a, "__esModule", {
        value: !0
    });
    var i = s(t(1)),
        r = s(t(0));

    function s(e) {
        return e && e.__esModule ? e : {
            default: e
        }
    }

    function n(e, a) {
        e.pinGameLayout = i.default.copy(a), e.linkCardMessages = e.message.linkCardMessages
    }
    n.$inject = ["$scope", "pinGameLayout"], r.default.controller("linkCardMessagesController", n), a.default = n
}, function(e, a, t) {
    "use strict";
    Object.defineProperty(a, "__esModule", {
        value: !0
    });
    var i, r = t(0),
        s = (i = r) && i.__esModule ? i : {
            default: i
        };

    function n(g, o, t, l, r, p, s, n, y, i, h, m, c) {
        g.sendEventStream = function(e, a, t) {
            var i = {
                placeId: a,
                conversationId: g.playTogether.id
            };
            t && (i.gameInstanceId = t), s.sendEventWithTarget(e, g.chatLibrary.eventStreamParams.actions.click, i)
        }, g.sendGamePlayEnvent = function(e) {
            var a = g.chatLibrary.eventStreamParams.context;
            s.sendGamePlayEvent(a.gamePlayFromPlayTogether, e)
        }, g.buyAccess = function(e, a) {
            var t = g.chatLibrary.eventStreamParams.clickBuyButtonInPlayTogether;
            g.sendEventStream(t, e), g.dialogLayout.playTogetherButton.isPlayButtonDisabled = !0;
            var i = g.chatLibrary.placesLibrary[e],
                r = i.gameIconUrl,
                s = a.buyAccess.bodyText(i.encodedPlaceName, i.encodedCreatorName, i.price),
                n = {
                    titleText: a.buyAccess.title,
                    bodyText: s,
                    imageUrl: r,
                    actionButtonShow: !0,
                    actionButtonText: a.buyAccess.yesButtonText,
                    actionButtonClass: a.buyAccess.yesButtonClass,
                    neutralButtonText: a.buyAccess.noButtonText,
                    closeButtonShow: !0
                };
            l.open(n).result.then(function() {
                o.debug("--- purchase ---"), g.dialogLayout.playTogetherButton.isPlayButtonDisabled = !1
            }, function() {
                o.debug("--- cancel ---"), g.dialogLayout.playTogetherButton.isPlayButtonDisabled = !1
            })
        }, g.goToPlaceDetails = function(e) {
            var a = g.chatLibrary.eventStreamParams.clickViewDetailsButtonInPlayTogether;
            g.sendEventStream(a, e), t.location.href = g.chatLibrary.placesLibrary[e].placeUrl
        }, g.joinGame = function(e) {
            g.chatLibrary.eventStreamParams.clickJoinButtonInPlayTogether;
            var a = g.playTogether.playTogetherDict[e].placeId,
                t = g.playTogether.playTogetherDict[e].gameInstanceId,
                i = g.playTogether.playTogetherDict[e].playerIds ? g.playTogether.playTogetherDict[e].playerIds[0] : null,
                r = c.buildPlayGameProperties(e, a, t, i),
                s = {
                    placeId: e,
                    conversationId: g.playTogether.id
                };
            t && (s.gameInstanceId = t);
            var n = {
                eventName: g.chatLibrary.eventStreamParams.clickJoinButtonInPlayTogether,
                ctx: g.chatLibrary.eventStreamParams.actions.click,
                properties: s,
                gamePlayIntentEventCtx: g.chatLibrary.eventStreamParams.context.gamePlayFromPlayTogether
            };
            c.launchGame(r, n)
        }, g.playGame = function(e, a) {
            var t = g.chatLibrary.eventStreamParams.clickPlayButtonInPlayTogether;
            g.sendEventStream(t, e), g.sendGamePlayEnvent(e), r.playTogetherGame(e, a)
        }, g.joinGameFromPlayTogether = function(e) {
            e = parseInt(e);
            var a = g.playTogether.placeButtonLayout[e].type,
                t = g.playTogether.id;
            switch (a) {
                case h.playButtonTypes.join:
                    g.joinGame(e);
                    break;
                case h.playButtonTypes.play:
                    g.playGame(e, t);
                    break;
                case h.playButtonTypes.buy:
                    g.buyAccess(e, h);
                    break;
                case h.playButtonTypes.details:
                    g.goToPlaceDetails(e)
            }
        }, g.toggleActiveGameList = function() {
            g.playTogetherLayout.activeGamesList.isCollapsed = !g.playTogetherLayout.activeGamesList.isCollapsed, g.playTogetherLayout.activeGamesList.isCollapsed ? (g.playTogetherLayout.activeGamesList.toggleMenuText = g.playTogetherLayout.activeGamesList.showMoreText, g.playTogetherLayout.activeGamesList.limitNumber = g.playTogetherLayout.activeGamesList.minNumberForFit) : (g.playTogetherLayout.activeGamesList.toggleMenuText = g.playTogetherLayout.activeGamesList.showLess, g.playTogetherLayout.activeGamesList.limitNumber = g.playTogetherLayout.numberOfActiveGames)
        }, g.hasPinGameAndActiveGames = function() {
            return !(!g.hasActiveGames() || !g.playTogether.pinGame) && (1 !== g.playTogether.playTogetherIds.length || g.playTogether.playTogetherIds[0] !== g.playTogether.pinGame.rootPlaceId)
        }, g.hasActiveGames = function() {
            var e = !1;
            return g.playTogether.playTogetherIds ? (g.playTogether.pinGame && (e = -1 < g.playTogether.playTogetherIds.indexOf(g.playTogether.pinGame.rootPlaceId), g.playTogetherLayout.activeGamesList.pinGameIsInActiveGames = e), e ? g.playTogether.playTogetherIds.length - 1 : g.playTogether.playTogetherIds.length) : 0
        }, g.hasNoPinGameAndNoActiveGame = function() {
            return !(g.playTogether.pinGame && g.playTogether.pinGame.rootPlaceId || g.hasActiveGames())
        }, g.isMyRecentAvaliable = function() {
            return g.hasNoPinGameAndNoActiveGame() && g.chatLibrary.myRecentPlaceId
        }, g.unPinGame = function() {
            if (g.playTogether && g.playTogether.pinGame) {
                var e = g.chatLibrary.eventStreamParams.unpinGameInPlayTogether,
                    a = g.playTogether.pinGame.rootPlaceId;
                n.sendPinGameEvent(e, a, g.playTogether), n.setPinGameData(g.playTogether), n.unpinGame(g.playTogether), r.updateButtonLayoutPerConversation(g.playTogether, a), i.updateScrollbar(p.gameListScrollListSelector)
            }
        }, g.pinGame = function(e, a) {
            e = parseInt(e), a = parseInt(a);
            var t = g.chatLibrary.eventStreamParams.pinGameInPlayTogether;
            n.sendPinGameEvent(t, a, g.playTogether);
            var i = {
                rootPlaceId: a,
                universeId: e,
                actorUsername: g.chatLibrary.name,
                userId: g.chatLibrary.userId,
                placeName: g.chatLibrary.placesLibrary && g.chatLibrary.placesLibrary[a] ? g.chatLibrary.placesLibrary[a].placeName : "",
                encodedPlaceName: g.chatLibrary.placesLibrary && g.chatLibrary.placesLibrary[a] ? g.chatLibrary.placesLibrary[a].encodedPlaceName : ""
            };
            n.setPinGameData(g.playTogether, i), n.pinGame(g.playTogether, e), r.updateButtonLayoutPerConversation(g.playTogether, a)
        }, g.initData = function() {
            if (g.playTogetherLayout = Object.assign({}, p), g.gameParameters = Object.assign({}, y), g.gameLayout = Object.assign({}, h), g.pinGameLayout = Object.assign({}, m), g.dialogData) {
                g.playTogether = g.dialogData, g.playTogether.inDialog = !0, g.playTogetherLayout.numberOfActiveGames = g.hasActiveGames();
                var e = g.playTogetherLayout.numberOfActiveGames,
                    a = g.playTogetherLayout.activeGamesList,
                    t = a.isCollapsed,
                    i = a.pinGameIsInActiveGames,
                    r = a.limitNumber,
                    s = a.minNumberForFit,
                    n = a.maxNumberForFit,
                    o = a.showLess;
                if (i) {
                    var l = {
                            limitNumber: r + 1,
                            minNumberForFit: s + 1,
                            maxNumberForFit: n + 1
                        },
                        c = g.playTogetherLayout.activeGamesList;
                    Object.assign(c, l)
                }
                var d = e - s;
                d = 0 < d ? d : 0;
                var u = g.playTogetherLayout.activeGamesList.showMore(d);
                g.playTogetherLayout.activeGamesList.showMoreText = u, 1 < g.playTogetherLayout.numberOfActiveGames && (g.playTogetherLayout.activeGamesList.toggleMenuText = t ? u : o)
            } else g.playTogether = g.chatUser, g.playTogether.inDialog = !1, g.playTogetherLayout.numberOfActiveGames = g.hasActiveGames(), g.playTogetherLayout.activeGamesList.limitNumber = g.playTogetherLayout.numberOfActiveGames;
            g.chatLibrary.playTogetherLibrary[g.playTogether.id] = {
                layout: g.playTogetherLayout
            }
        }, g.initData()
    }
    n.$inject = ["$scope", "$log", "$window", "modalService", "gameService", "playTogetherLayout", "eventStreamService", "pinGameService", "gameParameters", "chatUtility", "gameLayout", "pinGameLayout", "playGameService"], s.default.controller("playTogetherController", n), a.default = n
}, function(e, a, t) {
    "use strict";
    Object.defineProperty(a, "__esModule", {
        value: !0
    });
    var i, r = t(0),
        s = (i = r) && i.__esModule ? i : {
            default: i
        };

    function n(t, e, i, r) {
        t.hasGameAlbum = function() {
            var e = 0,
                a = null;
            return t.chatUser.pinGame && (e++, a = t.chatUser.pinGame.rootPlaceId), t.chatUser.playTogetherIds && (a && -1 < t.chatUser.playTogetherIds.indexOf(a) ? e = e + t.chatUser.playTogetherIds.length - 1 : e += t.chatUser.playTogetherIds.length), 1 < e
        }, t.isGameAvailableInChat = function() {
            return t.chatUser.placeForShown && t.chatUser.placeForShown.rootPlaceId
        }, t.openGameList = function() {
            if (t.hoverPopoverParams && !t.hoverPopoverParams.isOpen) {
                var e = i.eventStreamParams.openGameListInPlayTogether,
                    a = {
                        conversationId: t.chatUser.id
                    };
                r.sendEventWithTarget(e, i.eventStreamParams.actions.hover, a)
            }
        }, t.setupHoverPopover = function() {
            t.hoverPopoverParams = Object.assign({}, i.hoverPopoverParams), t.hoverPopoverParams.triggerSelector = ".chat-friend-" + t.chatUser.id, t.hoverPopoverParams.hoverPopoverSelector = ".game-list-" + t.chatUser.id
        }, t.init = function() {
            t.gamesListTemplateUrl = i.templates.gamesList, t.setupHoverPopover()
        }, t.init()
    }
    n.$inject = ["$scope", "$log", "resources", "eventStreamService"], s.default.controller("userConversationInfoController", n), a.default = n
}, function(e, a, t) {
    var i = {
        "./chatClientStorageUtilityService.js": 58,
        "./chatService.js": 59,
        "./chatUtilityService.js": 60,
        "./cookieService.js": 61,
        "./dialogAttributesService.js": 63,
        "./gameLayoutService.js": 64,
        "./gameService.js": 65,
        "./gameUtility.js": 66,
        "./libraryInitializationService.js": 67,
        "./messageService.js": 68,
        "./messageUtility.js": 69,
        "./pinGameLayoutService.js": 70,
        "./pinGameService.js": 71,
        "./playTogetherLayoutService.js": 72,
        "./playTogetherService.js": 73,
        "./presenceLayoutService.js": 74,
        "./storageService.js": 75,
        "./systemMessagesService.js": 76,
        "./usersService.js": 77
    };

    function r(e) {
        var a = s(e);
        return t(a)
    }

    function s(e) {
        if (t.o(i, e)) return i[e];
        var a = new Error("Cannot find module '" + e + "'");
        throw a.code = "MODULE_NOT_FOUND", a
    }
    r.keys = function() {
        return Object.keys(i)
    }, r.resolve = s, (e.exports = r).id = 57
}, function(e, a, t) {
    "use strict";
    Object.defineProperty(a, "__esModule", {
        value: !0
    });
    var i, r = t(0),
        s = (i = r) && i.__esModule ? i : {
            default: i
        };

    function n(e, i, r) {
        return {
            storageDictionary: {
                dialogIdList: "dialogIdList",
                dialogDict: "dialogDict",
                dialogsLayout: "dialogsLayout",
                chatBarLayout: "chatBarLayout",
                chatFriendsListReloadTime: "chatFriendsListReloadTime"
            },
            isStorageDefined: function(e) {
                return void 0 !== window.Storage ? this.getFromStorage(e) : r.isCookieDefined(e)
            },
            getFromStorage: function(e) {
                return void 0 !== window.Storage ? i.getLocalStorage(e) : r.retrieveCookie(e)
            },
            updateStorage: function(e, a, t) {
                void 0 !== window.Storage ? i.setLocalStorage(e, a) : r.updateCookie(e, a, t)
            },
            removeFromStorage: function(e, a) {
                void 0 !== window.Storage ? i.removeLocalStorage(e) : r.destroyCookie(e, a)
            },
            updateChatFriendsListReloadTime: function(e) {
                this.updateStorage(this.storageDictionary.chatFriendsListReloadTime, e)
            }
        }
    }
    n.$inject = ["chatUtility", "localStorageService", "cookieService"], s.default.factory("chatClientStorageUtilityService", n), a.default = n
}, function(e, a, t) {
    "use strict";
    Object.defineProperty(a, "__esModule", {
        value: !0
    });
    var r = t(2),
        y = s(t(1)),
        i = s(t(0));

    function s(e) {
        return e && e.__esModule ? e : {
            default: e
        }
    }

    function n(n, l, o, e, i, t, c, d) {
        function u(e, a) {
            return function(e, a) {
                return a[e] && y.default.isDefined(a[e].avatarHeadshot)
            }(e, a) && function(e, a) {
                return a[e] && y.default.isDefined(a[e].userPresenceType)
            }(e, a)
        }

        function g(e, t) {
            var i = [],
                r = [],
                a = [],
                s = {},
                n = [];
            return e && 0 < e.length && (n = e).forEach(function(e) {
                e.isGroupChat = e.conversationType === l.conversationType.multiUserConversation, y.default.forEach(e.participants, function(e) {
                    e.userId = e.targetId;
                    var a = e.targetId;
                    i.indexOf(a) < 0 && !u(a, t) && (i.push(a), r.push(e)), t[a] || (t[a] = {
                        id: a,
                        name: e.name
                    })
                }), e.dialogType || (e.dialogType = e.isGroupChat ? l.dialogType.GROUPCHAT : l.dialogType.CHAT), p(e), a.push(e.id), s[e.id] = e
            }), d.getUserInfo(i, t).then(function() {
                return n
            })
        }
        var p = function(e) {
            if (e.conversationUniverse) {
                var a = {
                    rootPlaceId: e.conversationUniverse.rootPlaceId,
                    universeId: e.conversationUniverse.universeId,
                    actorUsername: r.CurrentUser.name,
                    userId: parseInt(r.CurrentUser.userId)
                };
                t.setPinGameData(e, a)
            }
            return e
        };
        return {
            apiSets: {},
            setParams: function() {
                var e = r.EnvironmentUrls.chatApi;
                this.apiSets.markAsReadApi = {
                    url: e + "/v2/mark-as-read",
                    retryable: !1,
                    withCredentials: !0
                }, this.apiSets.markAsSeenApi = {
                    url: e + "/v2/mark-as-seen",
                    retryable: !1,
                    withCredentials: !0
                }, this.apiSets.sendMessageApi = {
                    url: e + "/v2/send-message",
                    retryable: !1,
                    withCredentials: !0
                }, this.apiSets.conversationsApi = {
                    url: e + "/v2/get-conversations",
                    retryable: !0,
                    withCredentials: !0
                }, this.apiSets.userConversationsApi = {
                    url: e + "/v2/get-user-conversations",
                    retryable: !0,
                    withCredentials: !0
                }, this.apiSets.getMessagesApi = {
                    url: e + "/v2/get-messages",
                    retryable: !0,
                    withCredentials: !0
                }, this.apiSets.multiGetLatestMessagesApi = {
                    url: e + "/v2/multi-get-latest-messages",
                    retryable: !0,
                    withCredentials: !0
                }, this.apiSets.getUnreadConversationCountApi = {
                    url: e + "/v2/get-unread-conversation-count",
                    retryable: !0,
                    withCredentials: !0
                }, this.apiSets.startOneToOneConversationApi = {
                    url: e + "/v2/start-one-to-one-conversation",
                    retryable: !0,
                    withCredentials: !0
                }, this.apiSets.startGroupConversationApi = {
                    url: e + "/v2/start-group-conversation",
                    retryable: !1,
                    withCredentials: !0
                }, this.apiSets.addToConversationApi = {
                    url: e + "/v2/add-to-conversation",
                    retryable: !0,
                    withCredentials: !0
                }, this.apiSets.removeFromConversationApi = {
                    url: e + "/v2/remove-from-conversation",
                    retryable: !0,
                    withCredentials: !0
                }, this.apiSets.renameGroupConversationApi = {
                    url: e + "/v2/rename-group-conversation",
                    retryable: !1,
                    withCredentials: !0
                }, this.apiSets.updateUserTypingStatusApi = {
                    url: e + "/v2/update-user-typing-status",
                    retryable: !1,
                    withCredentials: !0
                }, this.apiSets.uiPerformanceTrackingApi = {
                    url: r.EnvironmentUrls.metricsApi + "/v1/performance/send-measurement",
                    retryable: !1,
                    withCredentials: !0
                }
            },
            getMetaData: function() {
                return o.httpGet(i.apiSets.getMetaData, {})
            },
            getUnreadConversationCount: function() {
                return o.httpGet(this.apiSets.getUnreadConversationCountApi, null)
            },
            getUserConversations: function(e, a, t) {
                var i = {
                        pageNumber: e,
                        pageSize: a
                    },
                    r = c.getStorageName(c.chatDataName.getUserConversations, i),
                    s = c.getChatDataFromLocalStorage(r);
                return s ? function(e) {
                    var a = n.defer();
                    return a.resolve(e.data), a.promise
                }(s).then(g) : o.httpGet(this.apiSets.userConversationsApi, i).then(function(e) {
                    return c.saveChatDataToLocalStorage(r, e), g(e, t)
                })
            },
            getConversations: function(e) {
                var a = {
                        conversationIds: e
                    },
                    t = {
                        url: r.EnvironmentUrls.chatApi + i.chatUrls.getConversations,
                        withCredentials: !0,
                        retryable: !0
                    };
                return o.httpGet(t, a).then(function(e) {
                    return e.forEach(function(e) {
                        p(e)
                    }), e
                })
            },
            addToConversation: function(e, a) {
                var t = {
                    participantUserIds: e,
                    conversationId: a
                };
                return o.httpPost(this.apiSets.addToConversationApi, t)
            },
            removeFromConversation: function(e, a) {
                var t = {
                    participantUserId: e,
                    conversationId: a
                };
                return o.httpPost(this.apiSets.removeFromConversationApi, t)
            },
            startOneToOneConversation: function(e) {
                var a = {
                    participantUserId: e
                };
                return o.httpPost(this.apiSets.startOneToOneConversationApi, a).then(function(e) {
                    if (e) {
                        var a = e.conversation;
                        return p(a), a
                    }
                })
            },
            startGroupConversation: function(e, a) {
                var t = {
                    participantUserIds: e,
                    title: a
                };
                return o.httpPost(this.apiSets.startGroupConversationApi, t)
            },
            getMessages: function(e, a, t) {
                var i = {
                    conversationId: e,
                    exclusiveStartMessageId: a,
                    pageSize: t
                };
                return o.httpGet(this.apiSets.getMessagesApi, i)
            },
            getMessagesByPageSize: function(t, e, i, r, s, n) {
                var o = this;
                this.getMessages(t.id, e, i).then(function(e) {
                    if (e && 0 < e.length) {
                        var a = 2 * i;
                        e.forEach(function(e) {
                                r.push(e)
                            }),
                            function(e, a) {
                                if (!e || !e.chatMessages || e.chatMessages.length <= 0) return !1;
                                for (var t = 0; t < a.length; t++)
                                    if (a[t].id === e.chatMessages[0].id) return !1;
                                return !0
                            }(t, e) && a <= l.dialogParams.pageSizeOfGetMessages && e.length === i ? o.getMessagesByPageSize(t, e[e.length - 1].id, a, r, s, n) : s(n)
                    } else e && 0 === e.length && s(n)
                })
            },
            multiGetLatestMessages: function(e, a) {
                var t = {
                    conversationIds: e,
                    pageSize: a
                };
                return o.httpGet(this.apiSets.multiGetLatestMessagesApi, t)
            },
            markAsRead: function(e, a) {
                var t = {
                    conversationId: e,
                    endMessageId: a
                };
                return o.httpPost(this.apiSets.markAsReadApi, t)
            },
            markAsSeen: function(e) {
                var a = {
                    conversationsToMarkSeen: e
                };
                return o.httpPost(this.apiSets.markAsSeenApi, a)
            },
            sendMessage: function(e, a) {
                var t = {
                    conversationId: e,
                    message: a
                };
                return o.httpPost(this.apiSets.sendMessageApi, t)
            },
            renameGroupConversation: function(e, a) {
                var t = {
                    conversationId: e,
                    newTitle: a
                };
                return o.httpPost(this.apiSets.renameGroupConversationApi, t)
            },
            updateUserTypingStatus: function(e, a) {
                var t = {
                    conversationId: e,
                    isTyping: a
                };
                return o.httpPost(this.apiSets.updateUserTypingStatusApi, t)
            },
            sendPerformanceData: function(e, a) {
                var t = {
                    featureName: "Chat",
                    measureName: e,
                    value: a
                };
                return o.httpPost(this.apiSets.uiPerformanceTrackingApi, t)
            }
        }
    }
    n.$inject = ["$q", "chatUtility", "httpService", "$log", "apiParamsInitialization", "pinGameService", "storageService", "usersService"], i.default.factory("chatService", n), a.default = n
}, function(e, a, t) {
    "use strict";
    Object.defineProperty(a, "__esModule", {
        value: !0
    });
    var v = t(2),
        b = r(t(1)),
        i = r(t(0));

    function r(e) {
        return e && e.__esModule ? e : {
            default: e
        }
    }

    function s(n, t, d, e, a, i, r, s, o, l, c, u, g, p) {
        function y(e) {
            return b.default.isDefined(v.Linkify) && "function" == typeof v.Linkify.String ? v.Linkify.String(e.escapeHTML()) : e
        }

        function h(e) {
            return e.replace(/\n/g, "<br>")
        }

        function m(e) {
            var a = e.match(g.gameCardRegexs.privateServerLinkCode);
            if (a && 2 == a.length) return {
                privateServerLinkCode: a[1]
            }
        }

        function f(e, a) {
            return {
                content: e,
                isEmoji: a
            }
        }
        return {
            linksLibrary: b.default.copy(c.linksLibrary),
            chatLayout: b.default.copy(c.chatLayout),
            chatApiParams: b.default.copy(u.chatApiParams),
            dialogParams: b.default.copy(u.dialogParams),
            dialogLayoutResetConstant: b.default.copy(d.dialogLayoutResetConstant),
            dialogLayout: b.default.copy(d.dialogLayout),
            dialogBannerTypes: b.default.copy(d.dialogBannerTypes),
            userPresenceTypes: b.default.copy(i.userPresenceTypes),
            dialogType: b.default.copy(d.dialogTypes),
            newGroup: b.default.copy(d.newGroup),
            scrollBarType: b.default.copy(d.scrollBarTypes),
            errorMessages: b.default.copy(c.errors),
            memberStatus: b.default.copy(d.memberStatus),
            dialogInitValue: b.default.copy(d.dialogInitValue),
            dialogStatus: b.default.copy(d.dialogStatus),
            conversationInitStatus: b.default.copy(d.conversationInitStatus),
            conversationType: b.default.copy(d.conversationType),
            participantType: b.default.copy(d.participantType),
            notificationsName: e,
            notificationType: a,
            activeType: b.default.copy(d.activeType),
            performanceMarkLabels: o.chat,
            resultType: r,
            sendMessageErrorCode: s.sendMessageErrorCode,
            linkCardTypes: b.default.copy(g.linkCardTypes),
            eventStreamParams: b.default.copy(l.eventStreamParams),
            urlParamNames: b.default.copy(l.urlParamNames),
            chatEnabledByPrivacySettingTypes: {
                disabled: 0,
                enabled: 1,
                unavailable: 2
            },
            hashOutContent: function(e) {
                return e ? e.replace(/\S/g, "#") : e
            },
            buildScrollbar: function(e) {
                b.default.element(document.querySelector(e)).mCustomScrollbar({
                    autoExpandScrollbar: !1,
                    scrollInertia: 1,
                    contentTouchScroll: 1,
                    mouseWheel: {
                        preventDefault: !0
                    }
                })
            },
            updateScrollbar: function(e) {
                b.default.element(document.querySelector(e)).mCustomScrollbar("update")
            },
            escapeNewline: h,
            htmlEntities: function(e) {
                return String(e).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;")
            },
            getAssetDetails: m,
            buildLinkCard: function(e) {
                var a = y(e),
                    t = {
                        content: a,
                        isCard: !1
                    },
                    i = g.messageRegexs;
                for (var r in i)
                    if (i.hasOwnProperty(r)) {
                        var s = i[r],
                            n = e.match(s);
                        n && 2 === n.length && (t = {
                            id: n[1],
                            type: r,
                            isCard: !0,
                            content: a,
                            assetDetails: m(e)
                        })
                    } return this.buildEmojiPieces(t), t
            },
            buildEmojiPieces: function(e) {
                e.pieces = [];
                for (var a, t = e.content, i = g.emojiRegex, r = g.zwjRegex, s = g.emojiRepRegex, n = "", o = !1, l = 0; null !== (a = i.exec(t));) {
                    var c = a.index,
                        d = a[0];
                    l !== c ? (n && e.pieces.push(f(n, !0)), e.pieces.push(f(t.slice(l, c), !1)), n = d) : null != d.match(r) ? (n += "&zwj;", o = !0) : o || null != d.match(s) ? (n += d, o = !1) : (n && e.pieces.push(f(n, !0)), n = d), l = i.lastIndex
                }
                n && e.pieces.push(f(n, !0)), l < t.length && e.pieces.push(f(t.slice(l), !1))
            },
            buildLinkCardMessages: function(e) {
                var a = e.parsedContent;
                if (a && 0 < a.length) {
                    var t = a.split(g.urlRegex);
                    if (!t) return e.hasLinkCard = !1;
                    e.linkCardMessages = [];
                    for (var i = 0; i < t.length; i++) {
                        var r = t[i],
                            s = null;
                        r.match(g.urlRegex) ? s = this.buildLinkCard(r) : r && 0 < r.length && !r.match(g.onlyNewLineRegex) && (s = {
                            content: r = y(r = h(r = r.replace(g.removeNewLineRegex, ""))),
                            isCard: !1
                        }, this.buildEmojiPieces(s)), s && e.linkCardMessages.push(s)
                    }
                }
                return !0
            },
            sortFriendList: function(t, e) {
                var a = n("orderBy"),
                    i = [],
                    r = [],
                    s = [];
                return t.friendIds.forEach(function(e) {
                    var a = t.friendsDict[e];
                    0 < (a && a.presence ? a.presence.userPresenceType : a.userPresenceType) ? i.push(a) : r.push(a), s.push(e)
                }), b.default.forEach(e, function(e) {
                    s.indexOf(e.id) < 0 && (0 < (e && e.presence ? e.presence.userPresenceType : e.userPresenceType) ? i.push(e) : r.push(e));
                    t.friendIds.indexOf(e.id) < 0 && t.friendIds.push(e.id)
                }), i = a(i, "+name"), r = a(r, "+name"), e = i.concat(r)
            },
            getScrollBarSelector: function(e, a) {
                var t = e.layoutId;
                switch (b.default.isUndefined(a) && (a = e.scrollBarType), a) {
                    case d.scrollBarTypes.FRIENDSELECTION:
                        return "#scrollbar_friend_" + e.dialogType + "_" + t;
                    case d.scrollBarTypes.MESSAGE:
                    default:
                        return "#scrollbar_" + e.dialogType + "_" + t
                }
            },
            hasLinkifyContent: function(e) {
                return b.default.isString(e) && 0 <= e.search("<a") && 0 <= e.search("href=") && 0 <= e.search("text-link")
            },
            sanitizeMessage: function(e) {
                if (e && e.content) {
                    var a = e.content,
                        t = e.content = h(e.content);
                    e.content = y(e.content), t !== e.content ? (e.parsedContent = a, e.hasLinkCard = !0, e.hasLinkifyMessage = this.hasLinkifyContent(e.content), this.buildLinkCardMessages(e)) : this.buildEmojiPieces(e)
                }
            },
            sanitizeMessages: function(e) {
                if (e && 0 < e.length)
                    for (var a = 0; a < e.length; a++) {
                        var t = e[a];
                        this.sanitizeMessage(t)
                    }
            },
            getDataForMarkingSeen: function(e) {
                var a = [];
                return t.document.hasFocus && t.document.hasFocus() && b.default.forEach(e, function(e) {
                    e.isConversation && a.push(e.id)
                }), a
            },
            updateConversationTitle: function(e, a) {
                e.title = a, e.name = a
            },
            updateDialogStyle: function(e, a, t) {
                var i = a.defaultStyle;
                i && i.inputStyle && this.setResizeInputLayout(t, i.inputStyle.height, e, a)
            },
            setResizeInputLayout: function(e, a, t, i) {
                var r, s = e.layout,
                    n = s.topBarHeight,
                    o = function(e, a) {
                        return a.maxHeightOfTextInput < e ? a.maxHeightOfInput : e
                    }(a, i);
                s.bannerHeight;
                r = i.renameEditor.isEnabled ? (n + s.renameEditorHeight, n + o + s.renameEditorHeight) : n + o;
                var l = s.dialogHeight - r + "px",
                    c = d.dialogLayoutResetConstant.paddingOfInput / 2;
                i.defaultStyle.dialogStyle = {
                    height: l
                }, i.defaultStyle.inputStyle = {
                    height: o
                }, i.defaultStyle.inputTextStyle = {
                    "padding-top": c
                }
            },
            calculateRightPosition: function(e, a) {
                for (var t = this.chatLayout.widthOfDialog + this.chatLayout.spaceOfDialog, i = this.chatLayout.widthOfCollapsedDialog + this.chatLayout.spaceOfDialog, r = 0, s = 0; s < a; s++) {
                    var n = e.dialogIdList[s];
                    r += e.dialogsLayout[n].collapsed ? i : t
                }
                return r
            },
            updateDialogsPosition: function(e) {
                for (var a = e.chatLayout, t = a.widthOfChat, i = 0; i < e.dialogIdList.length; i++) {
                    var r = "#" + e.dialogIdList[i],
                        s = b.default.element(document.querySelector(r)).find(this.dialogLayout.dialogContainerClass),
                        n = +t + this.calculateRightPosition(e, i) + a.spaceOfDialog;
                    s.css("right", n)
                }
                0 < e.minimizedDialogIdList.length && (e.chatLayout.areDialogsUpdated = !0)
            },
            updateFocusedDialog: function(e, a) {
                p.debug(" ------ focused layoutId ------ " + a), e.chatLayout.focusedLayoutId = a
            },
            invalidateLinkCardsInMessageDict: function(e, a) {
                e.forEach(function(e) {
                    ! function(a, e) {
                        e[a].linkCardMessages.forEach(function(e) {
                            a === e.id && (e.isCard = !1)
                        })
                    }(e, a)
                })
            },
            invalidatePlaceDetails: function(a, e) {
                e.forEach(function(e) {
                    a.placesLibrary[e] || (a.placesLibrary[e] = {}), a.placesLibrary[e] = {
                        isInvalid: !0
                    }
                })
            },
            isPlaceDetailQualifiedInLibrary: function(e, a) {
                return e[a] && e[a].reasonProhibited
            }
        }
    }
    s.$inject = ["$filter", "$window", "dialogAttributes", "notificationsName", "notificationType", "presenceLayout", "callBackTypes", "httpResponse", "performanceMarkLabels", "resources", "libraryInitialization", "apiParamsInitialization", "messageHelper", "$log"], i.default.factory("chatUtility", s), a.default = s
}, function(e, a, t) {
    "use strict";
    Object.defineProperty(a, "__esModule", {
        value: !0
    });
    var i = n(t(62)),
        r = n(t(1)),
        s = n(t(0));

    function n(e) {
        return e && e.__esModule ? e : {
            default: e
        }
    }

    function o(e) {
        return {
            isCookieDefined: function(e) {
                return r.default.isDefined(i.default.cookie(e)) && i.default.cookie(e)
            },
            updateCookie: function(e, a, t) {
                i.default.cookie(e, JSON.stringify(a), t)
            },
            retrieveCookie: function(e) {
                return this.isCookieDefined(e) ? JSON.parse(i.default.cookie(e)) : []
            },
            destroyCookie: function(e, a) {
                i.default.cookie(e, null, a)
            }
        }
    }
    o.$inject = ["$log"], s.default.factory("cookieService", o), a.default = o
}, function(e, a) {
    e.exports = jQuery
}, function(e, a, t) {
    "use strict";
    Object.defineProperty(a, "__esModule", {
        value: !0
    });
    var i, r = t(0),
        s = (i = r) && i.__esModule ? i : {
            default: i
        };

    function n(e) {
        var a = e,
            t = {
                default: -1,
                member: 0,
                game: 1
            },
            i = {
                INIT: 0,
                OPEN: 1,
                REPLACE: 2,
                MINIMIZE: 3,
                COLLAPSE: 4,
                REMOVE: 5,
                REFRESH: 6
            },
            r = {
                maxHeightOfTextInput: 64,
                maxHeightOfInput: 80,
                paddingOfInput: 16,
                typing: {
                    isTypingAsSender: !1,
                    lastTimeTypingAsSender: null,
                    isTypingFromSender: !1,
                    lastTimeReceiveTypingEvent: null,
                    lastTimeReceiveTimer: null,
                    userIds: [],
                    userTypingDict: {}
                },
                hoverOnCollapsed: !1,
                memberDisplay: {
                    limitNumber: 3,
                    defaultLimit: 3,
                    isAll: !1,
                    linkName: a.get("Label.SeeMore"),
                    seeMoreLink: a.get("Label.SeeMore"),
                    seeLessLink: a.get("Label.SeeLess"),
                    toastText: function(e) {
                        return a.get("Message.ToastText", {
                            friendNum: e
                        })
                    },
                    timeoutToast: 5e3
                },
                playTogetherButton: {
                    buttonType: null,
                    isPlayButtonDisabled: !1
                },
                togglePopoverParams: {
                    isOpen: !1,
                    dialogSelector: "",
                    triggerSelector: "",
                    dialogSelectorPrefix: "#dialog-container-",
                    popoverTriggerSelectorPrefix: "#play-together-",
                    pinIconClassName: "pin-icon",
                    dialogTriggerClassSelector: "",
                    dialogTriggerClassPrefix: ".chat-friend-",
                    isFirstTimeOpen: !1
                },
                layoutId: null
            },
            s = {
                FRIEND: -1,
                CHAT: 0,
                GROUPCHAT: 1,
                NEWGROUPCHAT: 2,
                ADDFRIENDS: 6
            };
        return {
            activeType: {
                NEWMESSAGE: "New message"
            },
            conversationInitStatus: {
                remove: !1
            },
            conversationType: {
                oneToOneConversation: "OneToOneConversation",
                multiUserConversation: "MultiUserConversation",
                cloudEditConversation: "CloudEditConversation"
            },
            dialogBannerTypes: t,
            dialogInitValue: {
                isUpdated: !0,
                updateStatus: i.INIT,
                markAsActive: !1,
                activeType: null,
                autoOpen: !1
            },
            dialogLayout: {
                lookUpMembers: !1,
                focusMeEnabled: !0,
                hasFocus: !1,
                isFocused: !1,
                active: !1,
                isChatLoading: !1,
                collapsed: !1,
                isConfirmationOn: !1,
                isMembersOverloaded: !1,
                scrollToBottom: !1,
                IsdialogContainerVisible: !1,
                inviteBtnDisabled: !0,
                limitMemberDisplay: 6,
                heightOfInput: 32,
                maxHeightOfTextInput: r.maxHeightOfTextInput,
                maxHeightOfInput: r.maxHeightOfInput,
                paddingOfInput: r.paddingOfInput,
                limitCharacterCount: 160,
                heightOfBanner: 40,
                templateUrl: "chat-dialog",
                scrollbarElm: null,
                listenToScrollInitialized: !1,
                isBannerEnabled: !1,
                renameEditor: {
                    isEnabled: !1,
                    hasFocus: !1
                },
                bannerType: t.default,
                confirmDialog: {
                    isOpen: !1,
                    title: "",
                    btnName: "",
                    type: ""
                },
                typing: r.typing,
                dialogContainerClass: ".dialog-container",
                hoverOnCollapsed: !1,
                details: {
                    isEnabled: !1,
                    isConversationTitleEditorEnabled: !1,
                    isAddFriendsEnabled: !1,
                    isNegativeConfirmationEnabled: !1,
                    friendMenuAction: {},
                    friendIdForMenuOn: null
                },
                memberDisplay: r.memberDisplay,
                playTogetherButton: r.playTogetherButton,
                togglePopoverParams: r.togglePopoverParams
            },
            dialogLayoutResetConstant: r,
            dialogStatus: i,
            dialogTypes: s,
            memberStatus: {
                PENDING: 0,
                MEMBER: 1,
                LEADER: 2
            },
            negativeAction: {
                removeUser: {
                    title: a.get("Heading.RemoveUser"),
                    headerTitle: a.get("Heading.RemoveUser"),
                    btnName: a.get("Action.Remove"),
                    cancelBtnName: a.get("Action.Cancel"),
                    type: "removeUser"
                },
                leaveChatGroup: {
                    title: a.get("Heading.ConfirmLeaving"),
                    headerTitle: a.get("Heading.LeaveChatGroup"),
                    btnName: a.get("Action.Leave"),
                    cancelBtnName: a.get("Action.Stay"),
                    type: "leaveChatGroup"
                }
            },
            newGroup: {
                dialogType: s.NEWGROUPCHAT,
                layoutId: "newGroup",
                title: a.get("Heading.NewChatGroup")
            },
            participantType: {
                user: "User"
            },
            scrollBarTypes: {
                MESSAGE: 0,
                FRIENDSELECTION: 1
            },
            systemMessage: {
                isSystemMessage: !0,
                isErrorMsg: !1
            }
        }
    }
    n.$inject = ["languageResource"], s.default.factory("dialogAttributes", n), a.default = n
}, function(e, a, t) {
    "use strict";
    Object.defineProperty(a, "__esModule", {
        value: !0
    });
    var i, r = t(0),
        s = (i = r) && i.__esModule ? i : {
            default: i
        };

    function n(e) {
        var s = e;
        return {
            playButtonTypes: {
                play: "play",
                join: "join",
                buy: "buy",
                details: "details",
                notAvailable: "notAvailable"
            },
            playButtons: {
                play: {
                    type: "play",
                    text: s.get("Label.PlayButton"),
                    className: "btn-primary-xs btn-growth-xs",
                    isPlayable: !0
                },
                join: {
                    type: "join",
                    text: s.get("Label.JoinButton"),
                    className: "btn-primary-xs btn-growth-xs",
                    isPlayable: !0
                },
                buy: {
                    type: "buy",
                    text: s.get("Label.BuyButton"),
                    className: "btn-control-xs",
                    isPlayable: !1
                },
                details: {
                    type: "details",
                    text: s.get("Label.ViewDetailsButton"),
                    className: "btn-control-xs",
                    isPlayable: !1
                },
                notAvailable: {
                    type: "notAvailable",
                    text: s.get("Label.GameNotAvailableButton"),
                    isPlayable: !1
                }
            },
            buyAccess: {
                title: s.get("Heading.BuyItem"),
                yesButtonText: s.get("Action.BuyAccess"),
                yesButtonClass: "btn-primary-xs btn-growth-xs",
                noButtonText: s.get("Action.Cancel"),
                bodyText: function(e, a, t) {
                    var i = function(e) {
                            return "<span class='font-bold'>" + e + "</span>"
                        }(e),
                        r = function(e) {
                            return "<span class='icon-robux-16x16'></span><span class='text-robux'>" + e + "</span>"
                        }(t);
                    return s.get("Label.BuyAccessToGameForModal", {
                        placeName: i,
                        creatorName: a,
                        robux: r
                    })
                }
            }
        }
    }
    n.$inject = ["languageResource"], s.default.factory("gameLayout", n), a.default = n
}, function(e, a, t) {
    "use strict";
    Object.defineProperty(a, "__esModule", {
        value: !0
    });
    var h = t(2),
        m = r(t(1)),
        i = r(t(0));

    function r(e) {
        return e && e.__esModule ? e : {
            default: e
        }
    }

    function s(o, s, e, i, r, l, n, c, d) {
        var u = {};

        function g(e) {
            var a = {
                    imageTokens: e,
                    width: r.gameIconSize.lg.width,
                    height: r.gameIconSize.lg.height
                },
                i = {};
            return s.httpGet(u.multiGetGameIcons, a).then(function(e) {
                if (e && 0 < e.length) {
                    var a = [];
                    if (e.forEach(function(e) {
                            e && (e.final ? i[e.placeId] = e.url : e.retryToken && a.push(e.retryToken))
                        }), 0 < a.length) {
                        var t = {
                            imageTokens: a,
                            width: r.gameIconSize.lg.width,
                            height: r.gameIconSize.lg.height
                        };
                        s.httpGet(u.multiGetGameIcons, t).then(function(e) {
                            e && 0 < e.length && data.forEach(function(e) {
                                e && e.final && (i[e.placeId] = e.url)
                            })
                        })
                    }
                    return i
                }
                return null
            }, function() {
                return null
            })
        }

        function a(i, r) {
            var e = {
                placeIds: i
            };
            return s.httpGet(u.multiGetPlaceDetails, e).then(function(e) {
                if (e && 0 < e.length) {
                    var a = {};
                    e.forEach(function(e) {
                        a[e.placeId] = e
                    });
                    var t = [];
                    return i.forEach(function(e) {
                        a[e] || (a[e] = null, t.push(e))
                    }), r.forEach(function(e) {
                        e && e.linkCardMessages && e.linkCardMessages.forEach(function(e) {
                            e.isCard && -1 < t.indexOf(e.id) && (e.isCard = !1)
                        })
                    }), a
                }
            })
        }

        function t(r, e, s) {
            m.default.forEach(e, function(e, t) {
                if (e) {
                    var a;
                    r.placesLibrary[t] && (a = r.placesLibrary[t]);
                    var i = e.creatorName ? e.creatorName : e.builder;
                    if (r.placesLibrary[t] = {
                            universeId: e.universeId,
                            placeId: t,
                            rootPlaceId: e.universeRootPlaceId || e.placeId || e.rootPlaceId,
                            placeName: e.name,
                            encodedPlaceName: o.htmlEntities(e.name),
                            creatorName: i,
                            encodedCreatorName: o.htmlEntities(i),
                            creatorId: e.creatorId || e.builderId,
                            gameIconUrl: e.gameIconUrl,
                            placeUrl: e.url || e.placeUrl,
                            reasonProhibited: e.reasonProhibited,
                            description: e.description,
                            price: e.price,
                            isPlayable: e.isPlayable,
                            gameReferralUrl: e.gameReferralUrl
                        }, a && m.default.forEach(a, function(e, a) {
                            r.placesLibrary[t][a] || (r.placesLibrary[t][a] = e)
                        }), e.reasonProhibited) switch (e.reasonProhibited) {
                        case l.reasonProhibitedMessage.None:
                        case l.reasonProhibitedMessage.Playable:
                            r.placesLibrary[t].buttonLayoutForLinkCard = m.default.copy(n.playButtons.play);
                            break;
                        case l.reasonProhibitedMessage.PurchaseRequired:
                        default:
                            r.placesLibrary[t].buttonLayoutForLinkCard = m.default.copy(n.playButtons.details)
                    }
                    r.universeLibrary[e.universeId] = r.placesLibrary[t]
                } else !e && r.placesLibrary[t] && (r.placesLibrary[t] = {
                    isInvalid: !0
                }, s && o.invalidateLinkCardInPieceOfMessage(t, s))
            })
        }

        function p(a, e) {
            e.forEach(function(e) {
                a.placesLibrary[e] || (a.placesLibrary[e] = {}), a.placesLibrary[e] = {
                    isInvalid: !0
                }
            })
        }

        function y(e) {
            return s.buildBatchPromises(u.GetGamesIcons, e, l.gameIconMultiGetLimit, "universeIds").then(function(e) {
                if (e && 0 < e.length) {
                    var a = [];
                    return m.default.forEach(e, function(e) {
                        a = a.concat(e.data)
                    }), a
                }
            })
        }
        return {
            apiSets: u,
            setParams: function(e, a) {
                u.setConversationUniverse = {
                    url: e + r.chatUrls.setConversationUniverse,
                    retryable: !1,
                    withCredentials: !0
                }, u.resetConversationUniverse = {
                    url: e + r.chatUrls.resetConversationUniverse,
                    retryable: !1,
                    withCredentials: !0
                }, u.multiGetPlaceDetails = {
                    url: a + r.gameUrls.multiGetPlaceDetails,
                    retryable: !0,
                    withCredentials: !0
                }, u.multiGetGameIcons = {
                    url: a + r.gameUrls.multiGetGameIcons,
                    retryable: !0,
                    withCredentials: !0
                }, u.GetGamesSorts = {
                    url: a + r.gameUrls.GetGamesSorts,
                    retryable: !0,
                    withCredentials: !0
                }, u.GetGamesList = {
                    url: a + r.gameUrls.GetGamesList,
                    retryable: !0,
                    withCredentials: !0
                }, u.GetGamesIcons = {
                    url: h.EnvironmentUrls.thumbnailsApi + r.thumbnailUrls.multiGetGameIcons,
                    retryable: !0,
                    withCredentials: !0
                }, u.getGamesByUniverseIds = {
                    url: r.gameUrls.getGamesByUniverseIds,
                    retryable: !0,
                    withCredentials: !0
                }, u.multiGetPlayabilityStatus = {
                    url: r.gameUrls.multiGetPlayabilityStatus,
                    retryable: !0,
                    withCredentials: !0
                }
            },
            setConversationUniverse: function(e, a) {
                var t = {
                    conversationId: e,
                    universeId: a
                };
                return s.httpPost(u.setConversationUniverse, t)
            },
            resetConversationUniverse: function(e) {
                var a = {
                    conversationId: e
                };
                return s.httpPost(u.resetConversationUniverse, a)
            },
            multiGetPlaceDetailsForLinkCard: a,
            multiGetPlaceDetails: function(e) {
                var a = {
                    placeIds: e
                };
                return s.httpGet(u.multiGetPlaceDetails, a).then(function(e) {
                    var a = [],
                        t = {};
                    return m.default.forEach(e, function(e) {
                        e && e.imageToken && a.push(e.imageToken), t[e.placeId] = e
                    }), g(a).then(function(e) {
                        return m.default.forEach(e, function(e, a) {
                            e && (t[a].gameIconUrl = e)
                        }), t
                    })
                })
            },
            multiGetGameIcons: g,
            playRegularGame: function(e, a) {
                a = !0 === a, h.GameLauncher.joinMultiplayerGame(e, !0, a)
            },
            playTogetherGame: function(e, a) {
                h.GameLauncher.playTogetherGame(e, a)
            },
            joinGame: function(e, a) {
                h.GameLauncher.joinGameInstance(e, a, !0, !0)
            },
            playPrivateServerGame: function(e, a) {
                h.GameLauncher.joinPrivateGame(e, null, a)
            },
            fetchDataForLinkCard: function(e, i) {
                if (!e) return !1;
                var r = [],
                    s = {},
                    n = [];
                e.forEach(function(t) {
                    t.hasLinkCard && t.linkCardMessages.forEach(function(e) {
                        if (e.isCard) switch (e.type) {
                            case o.linkCardTypes.gameCard:
                                var a = e.id;
                                o.isPlaceDetailQualifiedInLibrary(i.placesLibrary, a) ? i.placesLibrary[a] && i.placesLibrary[a].isInvalid && (e.isCard = !1) : (n.push(t), r.indexOf(a) < 0 && (r.push(a), s[a] = t))
                        }
                    })
                }), 0 < r.length && a(r, n).then(function(e) {
                    if (!e) return p(i, r), o.invalidateLinkCardsInMessageDict(r, s), !1;
                    t(i, e, s);
                    var a = [];
                    m.default.forEach(e, function(e) {
                        e && e.imageToken && a.push(e.imageToken)
                    }), g(a).then(function(e) {
                        ! function(i, e) {
                            m.default.forEach(e, function(e, a) {
                                if (e) {
                                    i.placesLibrary[a].gameIconUrl = e;
                                    var t = i.placesLibrary[a];
                                    i.universeLibrary[t.universeId] = t
                                }
                            })
                        }(i, e)
                    })
                }, function() {
                    p(i, r), o.invalidateLinkCardsInMessageDict(r, s)
                })
            },
            updateButtonLayoutPerConversation: function(e, a) {
                if (!e.placeButtonLayout || e.placeButtonLayout && !e.placeButtonLayout[a].isPlayable) return !1;
                e.pinGame && e.playTogetherIds && -1 < e.playTogetherIds.indexOf(a) ? e.placeButtonLayout[a] = m.default.copy(n.playButtons.join) : e.placeButtonLayout[a] = m.default.copy(n.playButtons.play)
            },
            buildButtonLayoutPerConversation: function(t, i) {
                var e = [],
                    r = null,
                    s = !0;
                t.playTogetherIds && 0 < t.playTogetherIds.length && (e = m.default.copy(t.playTogetherIds)), t.pinGame && (r = t.pinGame.rootPlaceId, e.indexOf(r) < 0 && (s = !1, e.push(r))), t.placeButtonLayout || (t.placeButtonLayout = {}), m.default.forEach(e, function(e) {
                    var a = i[e];
                    if (a) switch (a.reasonProhibited) {
                        case l.reasonProhibitedMessage.None:
                        case l.reasonProhibitedMessage.Playable:
                            t.placeButtonLayout[e] = s || e !== r ? m.default.copy(n.playButtons.join) : m.default.copy(n.playButtons.play);
                            break;
                        case l.reasonProhibitedMessage.PurchaseRequired:
                            t.placeButtonLayout[e] = m.default.copy(n.playButtons.details);
                            break;
                        default:
                            t.placeButtonLayout[e] = m.default.copy(n.playButtons.notAvailable)
                    }
                })
            },
            buildPlacesLibrary: t,
            getGameIcons: y,
            getRecentGame: function() {
                return s.httpGet(u.GetGamesSorts).then(function(e) {
                    var a, i;
                    if (e && e.sorts && (e.sorts.forEach(function(e) {
                            if (e.name === l.sortNames.myRecent) return a = e.token, i = e.name, !1
                        }), a)) {
                        var t = {
                            sortToken: a,
                            maxRows: l.maxRowsOfMyRecentGames
                        };
                        return s.httpGet(u.GetGamesList, t).then(function(e) {
                            if (e && e.games && 0 < e.games.length) {
                                var a = e.games,
                                    t = [];
                                return m.default.forEach(a, function(e) {
                                    e.gameReferralUrl = function(e, a) {
                                        var t = c.getGameDetailReferralUrls().chat;
                                        return d("formatString")(t, {
                                            sortName: a,
                                            placeId: e.placeId
                                        })
                                    }(e, i), t.push(e.universeId)
                                }), a
                            }
                        })
                    }
                })
            },
            getGames: function(t) {
                var e = {
                        universeIds: t
                    },
                    a = {};
                return a.getGamesInfo = s.httpGet(u.getGamesByUniverseIds, e), a.getPlayabilityStatus = s.httpGet(u.multiGetPlayabilityStatus, e), i.all(a).then(function(e) {
                    if (e && e.getGamesInfo && e.getPlayabilityStatus) {
                        var a = e.getGamesInfo.data,
                            r = e.getPlayabilityStatus,
                            s = {},
                            n = {};
                        return m.default.forEach(a, function(e, a) {
                            var t = e.rootPlaceId,
                                i = r[a].universeId;
                            s[t] = e, s[t].universeId = i, s[t].placeId = t, s[t].isPlayable = r[a].isPlayable, s[t].reasonProhibited = r[a].playabilityStatus, s[t].placeUrl = function(e) {
                                var a = c.getAbsoluteUrl(l.gameUrl);
                                return d("formatString")(a, {
                                    placeId: e.placeId
                                })
                            }(s[t]), n[i] = s[t]
                        }), y(t).then(function(e) {
                            if (e) return m.default.forEach(e, function(e) {
                                var a = e.targetId;
                                n[a].gameIconUrl = e.imageUrl;
                                var t = n[a].placeId;
                                s[t] = n[a]
                            }), s
                        })
                    }
                })
            }
        }
    }
    s.$inject = ["chatUtility", "httpService", "$log", "$q", "apiParamsInitialization", "gameParameters", "gameLayout", "urlService", "$filter"], i.default.factory("gameService", s), a.default = s
}, function(e, a, t) {
    "use strict";
    Object.defineProperty(a, "__esModule", {
        value: !0
    });
    var i = s(t(1)),
        r = s(t(0));

    function s(e) {
        return e && e.__esModule ? e : {
            default: e
        }
    }

    function n(e) {
        return {
            isGameExistedInPlacesLibrary: function(e, a) {
                var t = null;
                return i.default.forEach(e, function(e) {
                    if (e.universeId === a) return t = e.placeId, !1
                }), t
            }
        }
    }
    n.$inject = ["$log"], r.default.factory("gameUtility", n), a.default = n
}, function(e, a, t) {
    "use strict";
    Object.defineProperty(a, "__esModule", {
        value: !0
    });
    var i, r = t(2),
        s = t(0),
        n = (i = s) && i.__esModule ? i : {
            default: i
        };

    function o(e) {
        var a = e,
            t = {
                scrollbarClassName: "#chat-friend-list",
                chatContentSelector: "#chat-main",
                collapsed: !0,
                pageInitializing: !1,
                pageDataLoading: !1,
                chatBarInitialized: !1,
                isChatLoading: !1,
                widthOfChatCollapsed: 112,
                widthOfChat: 286,
                widthOfDialog: 260,
                widthOfCollapsedDialog: 160,
                spaceOfDialog: 6,
                widthOfDialogMinimize: 200,
                numberOfDialogOpen: 0,
                defaultChatZIndex: 1060,
                errorMaskEnable: !1,
                isFriendListEmpty: !1,
                isUserConversationEmpty: !1,
                chatLandingEnabled: !1,
                thresholdMobile: 543,
                thresholdChatBarOpen: 1748,
                resizing: !1,
                defaultTitleForMessage: a.get("Message.DefaultTitleForMsg"),
                urlParseInitialized: !1,
                noConnectionMsg: a.get("Message.NoConnectionMsg"),
                isChatEnabledByPrivacySetting: 1,
                focusedDialogId: null,
                areDialogsUpdated: !1,
                maxOpenDialogs: 12,
                conversationTitleChangedText: a.get("Message.conversationTitleChangedText"),
                abuseReportUrl: "/abusereport/chat?id={userId}&redirectUrl={location}&conversationId={conversationId}"
            },
            i = {
                default: a.get("Message.DefaultErrorMsg"),
                conversationTitleModerated: a.get("Message.ConversationTitleModerated"),
                messageContentModerated: a.get("Message.MessageContentModerated"),
                messageFilterForReceivers: a.get("Message.MessageFilterForReceivers"),
                textTooLong: a.get("Message.TextTooLong"),
                unknownMessageType: a.get("Message.UnknownMessageType")
            };
        return {
            chatLayout: t,
            chatLibrary: {
                chatLayout: t,
                chatLayoutIds: [],
                conversationsDict: {},
                currentTabTitle: null,
                dialogIdList: [],
                dialogDict: {},
                dialogScopeLib: {},
                dialogsLayout: {},
                dialogRequestedToOpenParams: {
                    layoutId: null,
                    autoPop: !1
                },
                errors: i,
                friendIds: [],
                friendLayoutIds: [],
                friendsDict: {},
                isTakeOverOn: angular.element(document.querySelector("#wrap")).data("gutter-ads-enabled"),
                layout: {
                    bannerHeight: 40,
                    playTogetherBannerHeight: 102,
                    dialogHeight: 360,
                    inputHeight: 32,
                    renameEditorHeight: 32,
                    searchHeight: 32,
                    topBarHeight: 32,
                    detailsActionHeight: 48,
                    detailsInputHeight: 32
                },
                layoutIdList: [],
                minimizedDialogIdList: [],
                minimizedDialogData: {},
                userConversationsDict: {},
                allConversationLayoutIdsDict: {},
                placesLibrary: {},
                playTogetherLibrary: {},
                layoutIdsDictPerUserId: {},
                gamesPageLink: r.EnvironmentUrls.websiteUrl + "/games",
                senderTypesForUnknownMessageTypeError: [],
                isInvalidMessageTypeFallbackEnabled: !1,
                isMetaDataLoaded: !1,
                universeLibrary: {}
            },
            chatViewModel: {
                chatDomain: null,
                friendsDict: {},
                friendsHasConversation: [],
                chatUserDict: {}
            },
            dialogLocalStorageNamePrefix: "dialogLibrary_",
            errors: i,
            linksLibrary: {
                settingTabName: "Settings",
                settingLink: "/my/account#!/privacy"
            }
        }
    }
    o.$inject = ["languageResource"], n.default.factory("libraryInitialization", o), a.default = o
}, function(e, a, t) {
    "use strict";
    Object.defineProperty(a, "__esModule", {
        value: !0
    });
    var T = r(t(1)),
        i = r(t(0));

    function r(e) {
        return e && e.__esModule ? e : {
            default: e
        }
    }

    function s(a, c, g, y, p, s, t, h, d, u, m, n, f) {
        var r = 3e4;

        function v(e) {
            e.sent && !e.parsedTimestamp && (e.parsedTimestamp = new Date(e.sent).getTime())
        }

        function o(e, a, t) {
            var i = e.parsedTimestamp,
                r = T.default.isDefined(t) ? t : new Date,
                s = new Date(r - 864e5),
                n = new Date(i),
                o = n.toDateString(),
                l = Math.round(Math.abs(r.getTime() - n.getTime()) / 864e5),
                c = n.getDay(),
                d = r.getFullYear(),
                u = n.getFullYear(),
                g = "h:mm a";
            if (r.toDateString() === o) {
                var p = y("date")(i, g);
                a ? e.briefTimeStamp = p : e.displayTimeStamp = p
            } else s.toDateString() === o ? a ? e.briefTimeStamp = "Yesterday" : e.displayTimeStamp = "Yesterday | " + y("date")(i, g) : l <= c ? a ? (g = "EEE", e.briefTimeStamp = y("date")(i, g)) : (g = "EEE | " + g, e.displayTimeStamp = y("date")(i, g)) : d === u ? a ? (g = "MMM d", e.briefTimeStamp = y("date")(i, g)) : (g = "MMM d | " + g, e.displayTimeStamp = y("date")(i, g)) : a ? (g = "MMM d, yyyy", e.briefTimeStamp = y("date")(i, g)) : (g = "MMM d, yyyy | " + g, e.displayTimeStamp = y("date")(i, g))
        }

        function b(t, e, i) {
            if (e && 0 < e.length) {
                for (var a = [], r = e.length - 1; 0 <= r; r--) {
                    var s = e[r];
                    s.linkCardMessages = [];
                    var n = h.messageTypes;
                    switch (s.messageType) {
                        case n.link.name:
                            s.hasLinkCard = !0;
                            var o = s.link.game.universeId;
                            d.isGameExistedInPlacesLibrary(t.placesLibrary, o) || a.push(o);
                            var l = {
                                universeId: o,
                                isLinkCard: !0
                            };
                            s.linkCardMessages.push(l);
                            break;
                        case n.eventBased.name:
                            s.isSystemMessageFromApi = !0, m.setSystemMessage(s);
                            break;
                        case n.plainText.name:
                            c.sanitizeMessage(s)
                    }
                }
                t.isRespectingMessageTypeEnabled && 0 < a.length && u.getGames(a).then(function(e) {
                    u.buildPlacesLibrary(t, e);
                    var a = t.placesLibrary;
                    u.buildButtonLayoutPerConversation(i, a)
                })
            }
        }
        var i, l, L = (l = !(i = {}), {
            queueMessageToMarkRead: function(e, a) {
                !(i[e.id] = {
                    conversation: e,
                    latestMessageId: a
                }) === l && (l = !0, t(I, 1e3))
            }
        });

        function I() {
            for (var e in i) {
                var t = i[e];
                a.markAsRead(e, t.latestMessageId).then(function(e) {
                    if (e) {
                        var a = t.conversation;
                        a.hasUnreadMessages = !1, a.unreadMessageIds = [], a.unreadMessageTimestamps = [], null !== t.latestMessageId && a.pendingUnreadMessageId.splice(t.latestMessageId, 1), g.$broadcast("Roblox.Chat.LoadUnreadConversationCount")
                    }
                }, function() {
                    p.debug("----- markAsRead request is failed ! ------")
                })
            }
            l = !(i = {})
        }
        return {
            setParams: function(e) {
                r = parseInt(e.partyChromeDisplayTimeStampInterval)
            },
            setFallbackClusterMaster: function(e, a, t) {
                T.default.isUndefined(e.chatMessages) && (e.chatMessages = []);
                var i = e.chatMessages.length - 1;
                a.displayTimeStamp && (a.isClusterMaster = !0), 0 < e.chatMessages.length && e.chatMessages[i].senderTargetId !== a.senderTargetId && (e.chatMessages[i].isClusterMaster = !0), e.chatMessages.push(a)
            },
            setClusterMaster: function(e, a) {
                T.default.isUndefined(e.chatMessages) && (e.chatMessages = []), (0 < e.chatMessages.length && e.chatMessages[0].senderTargetId !== a.senderTargetId || a.displayTimeStamp) && (a.isClusterMaster = !0), a.resetClusterMessage || e.chatMessages.unshift(a)
            },
            buildFallbackTimeStamp: function(e, a, t) {
                if (!e.sent) return !1;
                v(e);
                var i = e.parsedTimestamp;
                (!a.startTimeStamp || i + r < a.startTimeStamp) && (o(e, !1, t), a.startTimeStamp = i)
            },
            buildTimeStamp: function(e, a, t) {
                if (!e.sent) return !1;
                v(e);
                var i = e.parsedTimestamp;
                return a.previousTimeStamp || (a.startTimeStamp = i), (!a.previousTimeStamp || i - r > a.previousTimeStamp) && (o(e, !1, t), a.previousTimeStamp = i), !0
            },
            updateContentForInvalidMessageType: function(a, e) {
                T.default.forEach(e, function(e) {
                    m.isMessageTypeInWhiteList(a, e) || (e.content = a.errors.unknownMessageType)
                })
            },
            preProcessMessages: function(e, a, t) {
                this.updateContentForInvalidMessageType(e, t), e.isRespectingMessageTypeEnabled ? b(e, t, a) : c.sanitizeMessages(t)
            },
            processMessages: function(e, a, t, i) {
                this.preProcessMessages(e, a, t), this.manipulateMessages(a, t, i)
            },
            manipulateMessages: function(e, a, t) {
                if (a || (e.messagesDict = {}, e.unreadMessageIds = [], e.unreadMessageTimestamps = []), T.default.isUndefined(e.messagesDict) && (e.messagesDict = {}), T.default.isUndefined(e.unreadMessageIds) && (e.unreadMessageIds = [], e.unreadMessageTimestamps = []), a && 0 < a.length) {
                    var i = a.length,
                        r = [];
                    e.previousTimeStamp = null;
                    for (var s = i - 1; 0 <= s; s--) {
                        var n = a[s];
                        if (this.buildTimeStamp(n, e), e.messagesDict[n.id] || (e.messagesDict[n.id] = n, this.setClusterMaster(e, n), n.read || (e.unreadMessageIds.push(n.id), e.unreadMessageTimestamps.push(n.parsedTimestamp))), d = t, u = r, (c = n).senderType === h.senderTypes.user && d && !d[c.senderTargetId] && u.indexOf(c.senderTargetId) < 0) {
                            var o = n.senderTargetId;
                            p.debug(" ----- new friend information for this message, trying to get now -----" + o);
                            var l = [o];
                            r.push(o), f.getUserInfo(l, t)
                        }
                    }
                    0 < e.unreadMessageIds.length && g.$broadcast("Roblox.Chat.LoadUnreadConversationCount")
                }
                var c, d, u
            },
            formatTimestampInConversation: function(e) {
                e.briefTimeStamp || (e.parsedTimestamp = new Date(e.lastUpdated).getTime(), o(e, !0))
            },
            appendMessages: function(e, a, t) {
                if (!t) return !1;
                if (T.default.isUndefined(a.unreadMessageIds) && (a.unreadMessageIds = [], a.unreadMessageTimestamps = []), this.updateContentForInvalidMessageType(e, t), e.isRespectingMessageTypeEnabled ? b(e, t, a) : c.sanitizeMessages(t), a.chatMessages && 0 !== a.chatMessages.length) {
                    if (a.chatMessages) {
                        var i = {};
                        for (o = 0; o < a.chatMessages.length; o++) {
                            var r = a.chatMessages[o];
                            if (!r.isSystemMessage && !r.sendMessageHasError && !r.resetClusterMessage) {
                                v(i = a.chatMessages[o]);
                                break
                            }
                        }
                        for (o = t.length - 1; 0 <= o; o--) {
                            v(l = t[o]);
                            var s = l.id === i.id || i.id && "string" != typeof i.id && i.id.toString() === l.id,
                                n = !T.default.isUndefined(a.messagesDict) && !T.default.isUndefined(l.id) && !T.default.isUndefined(a.messagesDict[l.id]);
                            !(T.default.equals({}, i) || l.parsedTimestamp > i.parsedTimestamp) || s || n || (this.buildTimeStamp(l, a), this.setClusterMaster(a, l), a.messagesDict[l.id] = l), l.read || (a.hasUnreadMessages = !0, a.unreadMessageIds.push(l.id), a.unreadMessageTimestamps.push(l.parsedTimestamp))
                        }
                    }
                } else {
                    for (var o = t.length - 1; 0 <= o; o--) {
                        var l = t[o];
                        this.buildTimeStamp(l, a), this.setClusterMaster(a, l)
                    }
                    a.chatMessages = t
                }
                a.displayMessage = this.getDisplayMessageForUser(t), 0 < a.unreadMessageIds.length && g.$broadcast("Roblox.Chat.LoadUnreadConversationCount")
            },
            markMessagesAsRead: function(e, a) {
                if (e.chatMessages && e.unreadMessageIds) {
                    var t = e.chatMessages,
                        i = t.length;
                    if (0 < e.unreadMessageTimestamps.length && e.unreadMessageTimestamps[0] >= t[i - 1].parsedTimestamp) {
                        var r = e.unreadMessageIds.length,
                            s = e.unreadMessageIds[r - 1];
                        T.default.isUndefined(e.pendingUnreadMessageId) && (e.pendingUnreadMessageId = []), e.pendingUnreadMessageId.indexOf(s) < 0 && (e.pendingUnreadMessageId.push(s), L.queueMessageToMarkRead(e, s))
                    }
                } else e.unreadMessageIds && 0 === e.unreadMessageIds.length && a && e.hasUnreadMessages && L.queueMessageToMarkRead(e, null)
            },
            buildSystemMessage: function(e, a, t) {
                var i = T.default.copy(n.systemMessage);
                switch (m.setSystemMessage(i, t), e) {
                    case c.notificationType.conversationTitleModerated:
                        i.content = c.errorMessages.conversationTitleModerated;
                        break;
                    case c.notificationType.conversationTitleChanged:
                        var r = c.htmlEntities(a.title);
                        i.content = y("formatString")(c.chatLayout.conversationTitleChangedText, {
                            userName: a.actorUsername,
                            groupName: r
                        });
                        break;
                    case c.notificationType.conversationUniverseChanged:
                        i.content = s.playTogether.pinGameUpdate(a.pinGame.actorUsername, a.pinGame.encodedPlaceName);
                        break;
                    case c.notificationType.presenceOnline:
                        i.content = s.playTogether.playGameUpdate, i.hasParams = !0
                }
                T.default.isUndefined(a.chatMessages) && (a.chatMessages = []), v(i), this.setClusterMaster(a, i)
            },
            resetConversationUnreadStatus: function(e, a) {
                0 === a.length && e.hasUnreadMessages && L.queueMessageToMarkRead(e, null)
            },
            getDisplayMessageForUser: function(e) {
                var a = {};
                if (e)
                    for (var t = e.length, i = 0; i < t; i++)
                        if (e[i].senderType === h.senderTypes.user) return a = e[i], a = this.buildDisplayMessage(a);
                return a
            },
            buildDisplayMessage: function(e, a) {
                return v(e), o(e, !0, a), e
            },
            refreshTypingStatus: function(e, a, t, i) {
                if (e && t && e.conversationType === c.conversationType.multiUserConversation) {
                    var r = e.chatMessages;
                    if (r && 0 < r.length)
                        for (var s = i.typing.userTypingDict[a], n = {}, o = 0; o < r.length; o++) {
                            var l = r[o];
                            if (l.isClusterMaster && l.senderTargetId === a && (!n[a] || n[a].messageId !== l.id)) {
                                s.messageId = l.id;
                                break
                            }
                        }
                }
            },
            categorizeMessageType: b
        }
    }
    s.$inject = ["chatService", "chatUtility", "$rootScope", "$filter", "$log", "systemMessages", "$timeout", "messageHelper", "gameUtility", "gameService", "messageUtility", "dialogAttributes", "usersService"], i.default.factory("messageService", s), a.default = s
}, function(e, a, t) {
    "use strict";
    Object.defineProperty(a, "__esModule", {
        value: !0
    });
    var s = r(t(1)),
        i = r(t(0));

    function r(e) {
        return e && e.__esModule ? e : {
            default: e
        }
    }

    function n(e, i, r) {
        return {
            isMessageTypeInWhiteList: function(e, a) {
                return -1 < e.validMessageTypesWhiteList.indexOf(a.messageType)
            },
            isMessageTypeLegal: function(a) {
                var t = !1;
                return s.default.forEach(i.messageTypes, function(e) {
                    if (e.name === a.messageType) return !(t = !0)
                }), t
            },
            isSenderTypeLegal: function(a) {
                var t = !1;
                return s.default.forEach(i.senderTypes, function(e) {
                    if (e === a.senderType) return !(t = !0)
                }), t
            },
            setSystemMessage: function(t, e) {
                t ? s.default.forEach(r.systemMessage, function(e, a) {
                    t[a] = e
                }) : t = s.default.copy(r.systemMessage), e && (t.isErrorMsg = !0);
                var a = new Date;
                t.sent = a.toISOString()
            },
            hasUnreadMessages: function(e, a) {
                return e.hasUnreadMessages || a.some(function(e) {
                    return !e.read
                }), e.hasUnreadMessages
            }
        }
    }
    n.$inject = ["$log", "messageHelper", "dialogAttributes"], i.default.factory("messageUtility", n), a.default = n
}, function(e, a, t) {
    "use strict";
    Object.defineProperty(a, "__esModule", {
        value: !0
    });
    var i, r = t(0),
        s = (i = r) && i.__esModule ? i : {
            default: i
        };

    function n(e) {
        var a = e;
        return {
            tooltipForPinGame: a.get("Label.PinGameTooltip"),
            tooltipForUnPinGame: a.get("Label.UnpinGameTooltip"),
            titleForPinGame: a.get("Label.PinnedGame")
        }
    }
    n.$inject = ["languageResource"], s.default.factory("pinGameLayout", n), a.default = n
}, function(e, a, t) {
    "use strict";
    Object.defineProperty(a, "__esModule", {
        value: !0
    });
    var i, r = t(0),
        s = (i = r) && i.__esModule ? i : {
            default: i
        };

    function n(e, i, t, r, s) {
        return {
            sendPinGameEvent: function(e, a, t) {
                var i = {
                    placeId: a,
                    conversationId: t.id
                };
                r.sendEventWithTarget(e, s.eventStreamParams.actions.click, i)
            },
            setPinGameData: function(e, a) {
                if (a && a.universeId) {
                    var t = a.rootPlaceId;
                    e.pinGame = {
                        universeId: a.universeId,
                        rootPlaceId: t,
                        placeName: a.placeName,
                        encodedPlaceName: a.encodedPlaceName,
                        actorUsername: a.actorUsername,
                        userId: a.userId
                    }, i.setPlaceForShown(e)
                } else e.pinGame = null, i.setPlaceForShown(e)
            },
            pinGame: function(e, a) {
                e && a && t.setConversationUniverse(e.id, a)
            },
            unpinGame: function(e) {
                e && t.resetConversationUniverse(e.id)
            }
        }
    }
    n.$inject = ["$log", "playTogetherService", "gameService", "eventStreamService", "resources"], s.default.factory("pinGameService", n), a.default = n
}, function(e, a, t) {
    "use strict";
    Object.defineProperty(a, "__esModule", {
        value: !0
    });
    var i, r = t(0),
        s = (i = r) && i.__esModule ? i : {
            default: i
        };

    function n(e) {
        var a = e;
        return {
            numberOfMembers: {
                inPinnedGame: 3,
                inActiveGame: 4
            },
            gameListScrollListSelector: "#active-game-list",
            activeGamesList: {
                maxNumberForFit: 4,
                minNumberForFit: 1,
                limitNumber: 1,
                showMore: function(e) {
                    return a.get("Label.ShowMoreGames", {
                        count: e
                    })
                },
                showMoreText: "",
                showLess: a.get("Label.ShowLessGames"),
                toggleMenuText: "",
                isCollapsed: !0,
                pinGameIsInActiveGames: !1
            },
            recommendedLabel: a.get("Label.RecommendedGames")
        }
    }
    n.$inject = ["languageResource"], s.default.factory("playTogetherLayout", n), a.default = n
}, function(e, a, t) {
    "use strict";
    Object.defineProperty(a, "__esModule", {
        value: !0
    });
    var i = t(2),
        l = s(t(1)),
        r = s(t(0));

    function s(e) {
        return e && e.__esModule ? e : {
            default: e
        }
    }

    function n(e) {
        return {
            isPlacePlayersOnlyMe: function(e, a) {
                if (e.playTogetherDict && e.playTogetherDict[a]) {
                    var t = e.playTogetherDict[a].playerIds;
                    if (t && 1 === t.length && t[0] === parseInt(i.CurrentUser.userId)) return !0
                }
                return !1
            },
            setPlaceForShown: function(e) {
                if (e.playTogetherIds && 0 < e.playTogetherIds.length) {
                    var a = e.playTogetherIds[0];
                    this.isPlacePlayersOnlyMe(e, a) || (e.placeForShown = {
                        rootPlaceId: a
                    })
                } else if (e.pinGame) {
                    var t = e.pinGame.rootPlaceId;
                    e.placeForShown = {
                        rootPlaceId: t
                    }
                } else e.placeForShown = null
            },
            sortPlayTogetherIds: function(r, e) {
                if (!r || !e || !e.rootPlaceId) return !1;
                var s = parseInt(e.rootPlaceId),
                    a = parseInt(e.placeId),
                    t = e.gameId,
                    n = parseInt(e.userId),
                    i = e.lastOnline;
                if (i = i && new Date(i).getTime(), !r.playTogetherIds) {
                    r.playTogetherIds = [s], r.playTogetherDict = {};
                    return !(r.playTogetherDict[s] = {
                        playerIds: [n],
                        gameInstanceId: t,
                        lastSeen: i,
                        placeId: a
                    })
                }
                if (r.playTogetherDict[s] ? r.playTogetherDict[s].placeId !== a && (r.playTogetherDict[s].placeId = a) : r.playTogetherDict[s] = {
                        playerIds: [n],
                        gameInstanceId: t,
                        lastSeen: i,
                        placeId: a
                    }, r.playTogetherDict[s].playerIds.indexOf(n) < 0 && r.playTogetherDict[s].playerIds.push(n), r.playTogetherDict[s]) {
                    var o = r.playTogetherDict[s].playerIds.length;
                    l.default.forEach(r.playTogetherIds, function(e, a) {
                        var t = r.playTogetherDict[e].playerIds;
                        if (-1 < t.indexOf(n) && s !== e) {
                            var i = t.indexOf(n);
                            r.playTogetherDict[e].playerIds.splice(i, 1)
                        }
                        if (r.playTogetherDict[e].playerIds.length < o) return r.playTogetherIds.splice(a, 0, s), !1
                    }), r.playTogetherIds.indexOf(s) < 0 && r.playTogetherIds.push(s)
                }
                r.playTogetherDict[s].lastSeen < i && (r.playTogetherDict[s].gameInstanceId = t, r.playTogetherDict[s].lastSeen = i), r.recentPlaceIdFromPresence = e.rootPlaceId, r.recentUserIdFromPresence = e.userId
            }
        }
    }
    n.$inject = ["$log"], r.default.factory("playTogetherService", n), a.default = n
}, function(e, a, t) {
    "use strict";
    Object.defineProperty(a, "__esModule", {
        value: !0
    });
    var i, r = t(0),
        s = (i = r) && i.__esModule ? i : {
            default: i
        };

    function n(e) {
        var a = e;
        return {
            userPresenceTypes: [{
                className: "",
                title: a.get("Label.Offline")
            }, {
                className: "online",
                title: a.get("Label.Online")
            }, {
                className: "game",
                title: a.get("Label.InGame")
            }, {
                className: "studio",
                title: a.get("Label.InStudio")
            }],
            status: {
                offline: 0,
                online: 1,
                inGame: 2,
                inStudio: 3
            }
        }
    }
    n.$inject = ["languageResource"], s.default.factory("presenceLayout", n), a.default = n
}, function(e, a, t) {
    "use strict";
    Object.defineProperty(a, "__esModule", {
        value: !0
    });
    var s = r(t(1)),
        i = r(t(0));

    function r(e) {
        return e && e.__esModule ? e : {
            default: e
        }
    }

    function n(i, e, t) {
        var r = !1,
            a = 1e4;
        return {
            chatDataName: {
                getUserConversations: "getUserConversations",
                getConversations: "getConversations",
                getMessages: "getMessages"
            },
            setStorageParams: function(e) {
                r = e.IsChatDataFromLocalStorageEnabled, a = 1e3 * e.ChatDataFromLocalStorageExpirationSeconds
            },
            getStorageName: function(e, a) {
                var t = i.chatDataLSNamePrefix + "." + e;
                return s.default.forEach(a, function(e) {
                    t = t + "." + e
                }), t
            },
            saveChatDataToLocalStorage: function(e, a) {
                r && t.saveDataByTimeStamp(e, a)
            },
            getChatDataFromLocalStorage: function(e) {
                return r && t.fetchNonExpiredCachedData(e, a), null
            },
            clearLocalStorage: function() {
                var e = t.storage();
                if (e)
                    for (var a in e) a && -1 < a.search(i.chatDataLSNamePrefix) && t.removeLocalStorage(a)
            }
        }
    }
    n.$inject = ["resources", "$log", "localStorageService"], i.default.factory("storageService", n), a.default = n
}, function(e, a, t) {
    "use strict";
    Object.defineProperty(a, "__esModule", {
        value: !0
    });
    r(t(1));
    var i = r(t(0));

    function r(e) {
        return e && e.__esModule ? e : {
            default: e
        }
    }

    function s(e) {
        var t = e;
        return {
            playTogether: {
                pinGameUpdate: function(e, a) {
                    return t.get("Message.PinGameUpdate", {
                        userName: e,
                        gameName: a
                    })
                },
                playGameUpdate: t.get("Message.PlayGameUpdate")
            }
        }
    }
    s.$inject = ["languageResource"], i.default.factory("systemMessages", s), a.default = s
}, function(e, a, t) {
    "use strict";
    Object.defineProperty(a, "__esModule", {
        value: !0
    });
    var n = t(2),
        o = r(t(1)),
        i = r(t(0));

    function r(e) {
        return e && e.__esModule ? e : {
            default: e
        }
    }

    function s(i, r, s) {
        return {
            getAvatarHeadshots: function(e, t) {
                var a = r.apiSets.multiGetAvatarHeadshots;
                return s.buildBatchPromises(a, e, 50, "userIds").then(function(e) {
                    if (e && 0 < e.length) {
                        var a = [];
                        return o.default.forEach(e, function(e) {
                            a = a.concat(e.data)
                        }), o.default.forEach(a, function(e) {
                            var a = e.targetId;
                            t[a] || (t[a] = {}), t[a].avatarHeadshot = e
                        }), a
                    }
                    return null
                })
            },
            getUserPresence: function(e, i) {
                var a = r.apiSets.multiGetPresence;
                return s.buildBatchPromises(a, e, 100, "userIds", "POST").then(function(e) {
                    if (e && 0 < e.length) {
                        var t = [];
                        return o.default.forEach(e, function(e) {
                            var a = e.userPresences;
                            t = t.concat(a)
                        }), t.forEach(function(e) {
                            var a = e.userId;
                            i[a] || (i[a] = {}), i[a].presence = e, n.Endpoints && (i[a].profileUrl = n.Endpoints.generateAbsoluteUrl("/users/{id}/profile", {
                                id: a
                            }, !0))
                        }), t
                    }
                    return null
                })
            },
            getUserInfo: function(e, a) {
                var t = {
                    avatarHeadshots: this.getAvatarHeadshots(e, a),
                    presences: this.getUserPresence(e, a)
                };
                return i.all(t)
            }
        }
    }
    s.$inject = ["$q", "apiParamsInitialization", "httpService"], i.default.factory("usersService", s), a.default = s
}, function(e, a, t) {
    var i = {
        "./directives/templates/addFriends.html": 79,
        "./directives/templates/chatAbuseReport.html": 80,
        "./directives/templates/chatBar.html": 81,
        "./directives/templates/chatBase.html": 82,
        "./directives/templates/chatDialog.html": 83,
        "./directives/templates/chatGroupDialog.html": 84,
        "./directives/templates/chatPlaceholder.html": 85,
        "./directives/templates/confirmNegativeAction.html": 86,
        "./directives/templates/conversationTitle.html": 87,
        "./directives/templates/conversationTitleEditor.html": 88,
        "./directives/templates/createChatGroup.html": 89,
        "./directives/templates/details.html": 90,
        "./directives/templates/dialogHeader.html": 91,
        "./directives/templates/dialogMinimize.html": 92,
        "./directives/templates/displayMessage.html": 93,
        "./directives/templates/gamesList.html": 94,
        "./directives/templates/linkCard.html": 95,
        "./directives/templates/selectFriends.html": 96,
        "./directives/templates/systemMessage.html": 97,
        "./directives/templates/userConversationInfo.html": 98
    };

    function r(e) {
        var a = s(e);
        return t(a)
    }

    function s(e) {
        if (t.o(i, e)) return i[e];
        var a = new Error("Cannot find module '" + e + "'");
        throw a.code = "MODULE_NOT_FOUND", a
    }
    r.keys = function() {
        return Object.keys(i)
    }, r.resolve = s, (e.exports = r).id = 78
}, function(e, a) {
    e.exports = '<div class="details-container add-friends-container" ng-class="{\'collapsed\': dialogLayout.collapsed}" ng-show="dialogLayout.details.isAddFriendsEnabled" ng-controller="friendsController"> <div class="chat-windows-header" ng-mouseenter="updateDialogHeader(true)" ng-mouseleave="updateDialogHeader(false)" ng-class="{\'hover\': dialogLayout.hoverOnCollapsed}"> <div class="chat-header-back" ng-click="toggleAddFriends()"> <span class="icon-chat-back"></span> </div> <div class="chat-header-label chat-header-create-group" ng-click="toggleDialogContainer()"> <span class="font-bold font-caption-header" ng-bind="\'Label.AddFriends\' | translate"></span> </div> <div class="chat-header-action"> <span class="icon-chat-close-white" ng-click="closeDialog({layoutId: dialogData.layoutId})" uib-tooltip="{{\'Label.Close\' | translate}}" tooltip-placement="bottom"></span> </div> </div> <div select-friends></div> <div class="details-btns-fixed select-friends-btns"> <button id="select-friends-cancel" ng-click="toggleAddFriends()" ng-bind="\'Action.Cancel\' | translate" class="btn-fixed-width btn-control-sm details-btn-cancel select-friends-cancel"></button> <button id="select-friends-save" class="btn-fixed-width btn-secondary-sm btn-cta-sm details-btn-save select-friends-save" ng-bind="\'Action.Add\' | translate" ng-disabled="dialogLayout.inviteBtnDisabled" ng-click="sendInvite(); toggleAddFriends()"></button> </div> </div>'
}, function(e, a) {
    e.exports = '<div class="details-confirmation-container" ng-show="dialogLayout.isConfirmationOn"> <div class="dialog-report-content"> <div class="chat-windows-header"> <div class="chat-header-back" ng-click="dialogLayout.isConfirmationOn = false"> <span class="icon-chat-back"></span> </div> <div class="chat-header-label details-dialog-title" ng-click="toggleDialogContainer()"> <span ng-bind="\'Action.Report\'|translate" class="font-caption-header">Report</span> </div> <div class="chat-header-action"> <span class="icon-chat-close-white" ng-click="closeDialog({layoutId: dialogData.layoutId})" uib-tooltip="{{\'Label.Close\' | translate}}" tooltip-placement="bottom"></span> </div> </div> <div class="details-negative-confirmation-body"> <span ng-bind="\'Heading.ContinueToReport\'|translate" class="small text details-negative-confirmation-text">Continue to report?</span> <div class="details-btns-fixed select-friends-btns"> <button class="btn-control-sm details-btn-cancel" ng-bind="\'Action.Cancel\'|translate" ng-click="dialogLayout.isConfirmationOn = false"></button> <button id="chat-abuse-report-btn" class="btn-alert-sm details-btn-save" ng-bind="\'Action.Report\'|translate" ng-click="abuseReport(null, true)"></button> </div> </div> </div> </div>'
}, function(e, a) {
    e.exports = '<div id="chat-main" class="chat-main" ng-controller="chatBarController" ng-class="{\'chat-main-empty\': chatLibrary.chatLayout.chatLandingEnabled || chatLibrary.chatLayout.isChatEnabledByPrivacySetting !== chatLibrary.chatLayout.chatEnabledByPrivacySettingTypes.enabled }" ng-cloak> <div id="chat-header" class="chat-windows-header chat-header"> <div class="chat-header-label" ng-click="toggleChatContainer()"> <span class="font-caption-header chat-header-title" ng-bind="\'Heading.Chat\' | translate"></span> </div> <div class="chat-header-action"> <span class="xsmall notification-red notification" ng-show="chatLibrary.chatLayout.collapsed && chatViewModel.unreadConversationCount > 0" ng-cloak>{{chatViewModel.unreadConversationCount}}</span> <span> <span id="chat-group-create" class="icon-chat-group-create" ng-hide="chatLibrary.chatLayout.collapsed || chatLibrary.chatLayout.errorMaskEnable || chatLibrary.chatLayout.chatLandingEnabled || chatLibrary.chatLayout.pageDataLoading || chatLibrary.chatLayout.isChatDisabledByPrivacySetting" ng-click="launchDialog(newGroup.layoutId)" uib-tooltip="{{\'Label.SpanTitle.CreateGroupNeeds2More\' | translate}}" tooltip-placement="bottom-right" ng-cloak></span> </span> </div> </div> <div id="chat-body" class="chat-body" ng-show="!chatLibrary.chatLayout.errorMaskEnable && !chatLibrary.chatLayout.pageDataLoading && !chatLibrary.chatLayout.pageInitializing" ng-if="!(chatLibrary.chatLayout.chatLandingEnabled || chatLibrary.chatLayout.isChatEnabledByPrivacySetting !== chatLibrary.chatLayout.chatEnabledByPrivacySettingTypes.enabled)"> <div class="border-bottom chat-search" ng-class="{\'chat-search-focus\': chatLibrary.chatLayout.searchFocus}"> <span> <input type="text" placeholder="{{\'Label.InputPlaceHolder.SearchForFriends\' | translate }}" class="input-field chat-search-input font-caption-body" ng-model="chatViewModel.searchTerm" ng-focus="chatLibrary.chatLayout.searchFocus = true"/> </span> <span class="icon-chat-search"></span> <span class="icon-chat-search-cancel" ng-click="cancelSearch()"></span> </div> <div id="chat-friend-list" class="rbx-scrollbar chat-friend-list" lazy-load> <ul id="chat-friends" class="chat-friends"> <li ng-repeat="chatUser in chatUserDict | orderList: chatLibrary.chatLayoutIds | filter : {name: chatViewModel.searchTerm}" class="chat-friend chat-friend-{{chatUser.id}}"> <div ng-if="chatUser.dialogType === dialogType.CHAT && chatUser.isConversation" class="chat-friend-container" ng-click="launchDialog(chatUser.layoutId)"> <div class="avatar avatar-headshot-sm card-plain chat-friend-avatar" ng-click="launchDialog(chatUser.layoutId)"> <img ng-src="{{chatLibrary.friendsDict[chatUser.displayUserId].avatarHeadshot.imageUrl}}" class="avatar-card-image chat-avatar" ng-if="chatUser.isConversation"> <div class="avatar-status chat-friend-status" ng-class="userPresenceTypes[chatLibrary.friendsDict[chatUser.displayUserId].presence.userPresenceType][\'className\']"></div> </div> <div user-conversation-info></div> </div> <div ng-if="chatUser.dialogType === dialogType.GROUPCHAT && chatUser.isConversation" class="chat-friend-container chat-friend-groups" ng-click="launchDialog(chatUser.layoutId)"> <div class="chat-friend-avatar" ng-click="launchDialog(chatUser.layoutId)"> <ul class="avatar-group card-plain chat-avatar-groups" ng-class="{\'avatar-double\': chatUser.userIds.length === 2,\'avatar-triple\' : chatUser.userIds.length === 3,\'avatar-all\' : chatUser.userIds.length>= 4}"> <li ng-repeat="userId in chatUser.userIds | limitTo : 4" class="avatar-item chat-avatar"> <img ng-src="{{chatLibrary.friendsDict[userId].avatarHeadshot.imageUrl}}" title="{{userId}}" class="avatar-card-image"> </li> </ul> </div> <div user-conversation-info></div> </div> <div ng-if="!chatUser.isConversation" class="chat-friend-container" ng-click="launchDialog(chatUser.layoutId)"> <div class="avatar avatar-headshot-sm card-plain chat-friend-avatar"> <img ng-src="{{chatLibrary.friendsDict[chatUser.id].avatarHeadshot.imageUrl}}" class="avatar-card-image chat-avatar"> <div class="avatar-status chat-friend-status" ng-class="userPresenceTypes[chatLibrary.friendsDict[chatUser.id].presence.userPresenceType][\'className\']"></div> </div> <div user-conversation-info></div> </div> </li> </ul> <div class="chat-loading loading-bottom" ng-show="chatLibrary.chatLayout.isChatLoading"> <span><span class="spinner spinner-sm" title="{{\'Label.SpanTitle.Loading\' | translate}}"></span></span> </div> </div> </div> <div id="chat-disconnect" class="chat-disconnect" ng-show="isChatDisconnected()" ng-cloak> <p class="text-info" ng-show="chatLibrary.chatLayout.errorMaskEnable">{{chatLibrary.chatLayout.noConnectionMsg}}</p> <span><span class="spinner spinner-default" title="{{\'Label.SpanTitle.Loading\' | translate}}"></span></span> </div> <div id="chat-empty-list" class="chat-disconnect" ng-hide="chatLibrary.chatLayout.errorMaskEnable" ng-if="chatLibrary.chatLayout.chatLandingEnabled || chatLibrary.chatLayout.isChatEnabledByPrivacySetting !== chatLibrary.chatLayout.chatEnabledByPrivacySettingTypes.enabled"> <span class="icon-chat-friends"></span> <p ng-show="chatLibrary.chatLayout.isChatEnabledByPrivacySetting === chatLibrary.chatLayout.chatEnabledByPrivacySettingTypes.enabled" class="text-info small" ng-bind="\'Message.MakeFriendsToChatNPlay\' | translate"></p> <a id="find-game" ng-bind="\'Label.PlayGames\' | translate" class="btn-primary-sm btn-cta-sm" ng-show="chatLibrary.chatLayout.isChatEnabledByPrivacySetting === chatLibrary.chatLayout.chatEnabledByPrivacySettingTypes.enabled" ng-href="{{chatLibrary.gamesPageLink}}"></a> <p ng-show="chatLibrary.chatLayout.isChatEnabledByPrivacySetting === chatLibrary.chatLayout.chatEnabledByPrivacySettingTypes.disabled" class="text-info small" ng-click="openSettingsPage()"> <span ng-bind-html="\'Message.ChatPrivacySetting\' | translate:{frontLink: \'<span class=text-link>\', endLink: \'</span>\'}"></span> </p> <p ng-show="chatLibrary.chatLayout.isChatEnabledByPrivacySetting === chatLibrary.chatLayout.chatEnabledByPrivacySettingTypes.unavailable" class="text-info small">{{chatLibrary.chatLayout.languageForPrivacySettingUnavailable}}</p> <span class="icon-logo-tagline logo-tagline-chat"></span> </div> </div>'
}, function(e, a) {
    e.exports = '<div ng-controller="chatController" ng-class="{\'collapsed\': chatLibrary.chatLayout.collapsed}" ng-cloak> <div chat-bar></div> <div id="dialogs" class="dialogs" ng-controller="dialogsController" ng-hide="chatLibrary.chatLayout.isChatEnabledByPrivacySetting !== chatLibrary.chatLayout.chatEnabledByPrivacySettingTypes.enabled"> <div dialog id="{{chatLayoutId}}" dialog-data="chatUserDict[chatLayoutId]" chat-library="chatLibrary" close-dialog="closeDialog(chatLayoutId)" send-invite="sendInvite(chatLayoutId)" ng-repeat="chatLayoutId in chatLibrary.layoutIdList"></div> <div dialog id="{{newGroup.layoutId}}" dialog-data="newGroup" chat-library="chatLibrary" close-dialog="closeDialog(\'newGroup\')" send-invite="sendInvite(newGroup.layoutId)" ng-if="newGroup"></div> <div id="dialogs-minimize" class="dialogs-minimize" dialog-minimize chat-library="chatLibrary"> </div> <div class="chat-placeholder" chat-placeholder> </div> </div> </div>'
}, function(e, a) {
    e.exports = '<div id="dialog-container-{{dialogData.id}}" class="dialog-container" ng-class="{\'collapsed\': dialogLayout.collapsed,\'active\': dialogLayout.active && dialogData.layoutId !== chatLibrary.chatLayout.focusedLayoutId,\'focused\': !dialogLayout.collapsed && dialogData.layoutId === chatLibrary.chatLayout.focusedLayoutId}" ng-controller="dialogController"> <div class="dialog-main" ng-hide="dialogData.addMoreFriends || dialogLayout.details.isEnabled"> <div class="chat-windows-header dialog-header" ng-mouseenter="updateDialogHeader(true)" ng-mouseleave="updateDialogHeader(false)" ng-class="{\'hover\': dialogLayout.hoverOnCollapsed}"> <div class="chat-header-label" ng-click="toggleDialogContainer()"> <span class="font-caption-header text-overflow chat-header-title dialog-header-title"> {{dialogData.name}} </span> </div> <div dialog-header></div> </div> <div id="scrollbar_{{dialogData.dialogType}}_{{dialogData.layoutId}}" class="rbx-scrollbar dialog-body" ng-style="dialogLayout.defaultStyle.dialogStyle" focus-model="toggleDialogFocusStatus(true)" dialog-lazy-load> <ul class="dialog-messages" ng-controller="dialogMessagesController"> <li class="dialog-message-container" ng-repeat="message in dialogData.chatMessages | reverse" ng-class="{\'message-inbound\': message.senderTargetId != chatLibrary.userId && !message.isSystemMessage,\'system-message\': message.isSystemMessage,\'message-cluster-master\': message.isClusterMaster}" ng-if="canRenderMessage(message) || shouldShowInvalidMessageTypePrompt(message)" on-finish-render="ngRepeatFinished"> <div class="indicated-message" ng-hide="!message.displayTimeStamp"> <span class="font-caption-body indicated-message-bubble">{{message.displayTimeStamp}}</span> </div> <a ng-href="{{chatLibrary.friendsDict[message.senderTargetId].profileUrl}}" ng-hide="message.isSystemMessage" class="avatar avatar-headshot-sm dialog-message-avatar-link"> <img ng-if="message.senderTargetId != chatLibrary.userId" ng-src="{{chatLibrary.friendsDict[message.senderTargetId].avatarHeadshot.imageUrl}}" class="avatar-card-image dialog-message-avatar"> </a> <div class="dialog-message-body"> <div class="dialog-message dialog-message-content dialog-triangle" ng-class="{\'message-is-sending\': message.sendingMessage}" ng-hide="message.isSystemMessage" ng-if="!message.hasLinkCard && canRenderMessage(message)"> <span class="message-piece" ng-repeat="piece in message.pieces" ng-bind-html="piece.content"></span> <span ng-show="message.canResend" ng-click="resendMessage(message)" class="icon-chat-resend"></span> </div> <div ng-if="message.hasLinkCard" link-card></div> <div class="xsmall text-date-hint dialog-sending" ng-show="message.filteredForReceivers" ng-bind="chatLibrary.errors.messageFilterForReceivers"></div> <div class="xsmall text-error dialog-sending" ng-show="message.sendMessageHasError" ng-bind="message.error || (\'Message.Error\' | translate)"></div> </div> <div class="indicated-message" system-message></div> </li> <li class="dialog-message-container message-inbound typing-indicator" ng-show="dialogLayout.typing.isTypingFromSender"> <a ng-href="{{chatLibrary.friendsDict[dialogLayout.typing.userIds[0]].profileUrl}}" class="avatar avatar-headshot-sm dialog-message-avatar-link"> <img ng-src="{{chatLibrary.friendsDict[dialogLayout.typing.userIds[0]].avatarHeadshot.imageUrl}}" class="avatar-card-image dialog-message-avatar"> </a> <div class="small dialog-message dialog-triangle"> <span class="typing"></span> </div> </li> </ul> </div> <div class="chat-loading loading-top" ng-show="dialogLayout.isChatLoading"> <span class="spinner spinner-sm" title="{{\'Label.SpanTitle.Loading\' | translate}} ..."></span> </div> <div class="border-top dialog-input-container" ng-class="{\'disabled\': chatLibrary.chatLayout.errorMaskEnable}" ng-style="dialogLayout.defaultStyle.inputStyle"> <textarea id="dialog-input" msd-elastic dialog-input rows="1" focus-me="{{dialogLayout.focusMeEnabled && dialogData.layoutId === chatLibrary.chatLayout.focusedLayoutId}}" placeholder="{{\'Label.InputPlaceHolder.SendMessage\' | translate}}" ng-model="dialogData.messageForSend" enter-escape-shift="keyPressEnter($event)" ng-keypress="typing($event, true)" ng-blur="typing($event, false)" class="dialog-input" input-max-length="{{dialogLayout.limitCharacterCount}}" ng-disabled="chatLibrary.chatLayout.errorMaskEnable" ng-style="dialogLayout.defaultStyle.inputTextStyle" hinteractive hinteractive-domain="chat"></textarea> </div> </div> <div abuse-report></div> <div details></div> <div places></div> </div>'
}, function(e, a) {
    e.exports = '<div id="dialog-container-{{dialogData.id}}" class="dialog-container group-dialog" ng-class="{\'group-has-banner\': dialogLayout.renameEditor.isEnabled,\'collapsed\': dialogLayout.collapsed,\'active\': dialogLayout.active && dialogData.layoutId !== chatLibrary.chatLayout.focusedLayoutId,\'focused\': !dialogLayout.collapsed && dialogData.layoutId === chatLibrary.chatLayout.focusedLayoutId}" ng-controller="dialogController"> <div class="dialog-main" ng-hide="dialogLayout.isConfirmationOn || dialogData.addMoreFriends || dialogLayout.details.isEnabled"> <div class="chat-windows-header dialog-header" ng-mouseenter="updateDialogHeader(true)" ng-mouseleave="updateDialogHeader(false)" ng-class="{\'hover\': dialogLayout.hoverOnCollapsed}"> <div class="chat-header-label" ng-click="toggleDialogContainer()"> <span id="group-chat-title" class="font-caption-header text-overflow dialog-header-title" title="{{dialogData.title}}">{{dialogData.title}}</span> </div> <div dialog-header></div> </div> <div id="scrollbar_{{dialogData.dialogType}}_{{dialogData.layoutId}}" ng-style="dialogLayout.defaultStyle.dialogStyle" class="rbx-scrollbar dialog-body" dialog-lazy-load focus-model="toggleDialogFocusStatus(true)"> <ul class="dialog-messages" ng-controller="dialogMessagesController"> <li class="dialog-message-container" ng-repeat="message in dialogData.chatMessages | reverse" ng-class="{\'message-inbound\': message.senderTargetId != chatLibrary.userId && !message.isSystemMessage,\'system-message\': message.isSystemMessage,\'message-cluster-master\': message.isClusterMaster}" ng-if="canRenderMessage(message) || shouldShowInvalidMessageTypePrompt(message)" on-finish-render="ngRepeatFinished"> <div class="indicated-message" ng-hide="!message.displayTimeStamp"> <span class="font-caption-body indicated-message-bubble"> {{message.displayTimeStamp}} </span> </div> <a ng-href="{{chatLibrary.friendsDict[message.senderTargetId].profileUrl}}" ng-hide="message.isSystemMessage" class="avatar avatar-headshot-sm dialog-message-avatar-link"> <img ng-if="message.senderTargetId != chatLibrary.userId" ng-src="{{chatLibrary.friendsDict[message.senderTargetId].avatarHeadshot.imageUrl}}" class="avatar-card-image dialog-message-avatar"> </a> <div class="dialog-message-body" ng-if="canRenderMessage(message)"> <div ng-if="chatLibrary.friendsDict[message.senderTargetId]" ng-show="message.isClusterMaster && message.senderTargetId != chatLibrary.userId" class="xxsmall dialog-message-author"> <span ng-bind="chatLibrary.friendsDict[message.senderTargetId].name"></span> <span class="typing" ng-show="message.id == dialogLayout.typing.userTypingDict[message.senderTargetId].messageId"></span> </div> <div class="dialog-message dialog-triangle" ng-class="{\'message-is-sending\': message.sendingMessage}" ng-hide="message.isSystemMessage" ng-if="!message.hasLinkCard"> <span class="dialog-message-content"> <span class="message-piece" ng-repeat="piece in message.pieces" ng-bind-html="piece.content"></span> </span> <span ng-show="message.canResend" ng-click="resendMessage(message)" class="icon-chat-resend"></span> </div> <div ng-if="message.hasLinkCard" link-card></div> <div class="xsmall text-date-hint dialog-sending" ng-show="message.filteredForReceivers" ng-bind="chatLibrary.errors.messageFilterForReceivers"></div> <div class="text-error dialog-sending" ng-show="message.sendMessageHasError" ng-bind="message.error || (\'Message.Error\'|translate)"></div> </div> <div class="indicated-message" system-message></div> </li> </ul> </div> <div class="chat-loading loading-top" ng-show="dialogLayout.isChatLoading"> <span class="spinner spinner-sm" title="{{\'Label.SpanTitle.Loading\'|translate}}"></span> </div> <div class="border-top dialog-input-container" ng-class="{\'disabled\': chatLibrary.chatLayout.errorMaskEnable}" ng-style="dialogLayout.defaultStyle.inputStyle"> <textarea msd-elastic focus-me="{{dialogLayout.focusMeEnabled && dialogData.layoutId === chatLibrary.chatLayout.focusedLayoutId}}" placeholder="{{\'Label.InputPlaceHolder.SendMessage\'|translate}}" ng-model="dialogData.messageForSend" enter-escape-shift="keyPressEnter($event)" ng-keypress="typing($event, true)" ng-blur="typing($event, false)" class="dialog-input" rows="1" input-max-length="{{dialogLayout.limitCharacterCount}}" ng-disabled="chatLibrary.chatLayout.errorMaskEnable" ng-style="dialogLayout.defaultStyle.inputTextStyle" hinteractive hinteractive-domain="chat"></textarea> </div> </div> <div abuse-report></div> <div confirm-negative-action chat-library="chatLibrary" dialog-layout="dialogLayout" confirm-callback="confirmCallBack()"></div> <div details></div> </div>'
}, function(e, a) {
    e.exports = '<div class="chat-placeholder-container" ng-show="chatLibrary.chatPlaceholderEnabled"> <div class="chat-placeholder-header"></div> <span class="icon-chat-placeholder"></span> </div>'
}, function(e, a) {
    e.exports = '<div class="confirm-negative-action details-confirmation-container" ng-show="dialogLayout.confirmDialog.isOpen"> <div class="confirm-negative-action-container"> <div class="chat-windows-header"> <div class="chat-header-back" ng-click="dialogLayout.confirmDialog.isOpen = false"> <span class="icon-chat-back"></span> </div> <div class="chat-header-label details-dialog-title" ng-click="toggleDialogContainer()"> <span class="font-caption-header">{{dialogLayout.confirmDialog.headerTitle}}</span> </div> <div class="chat-header-action"> <span class="icon-chat-close-white" ng-click="closeDialog({layoutId: dialogData.layoutId})" data-toggle="tooltip" title="{{\'Label.Close\'|translate}}"></span> </div> </div> <div class="details-negative-confirmation-body"> <span class="small text details-negative-confirmation-text">{{dialogLayout.confirmDialog.title}}</span> <div class="details-btns-fixed select-friends-btns"> <button class="btn-control-sm details-btn-cancel" ng-click="dialogLayout.confirmDialog.isOpen = false"> {{dialogLayout.confirmDialog.cancelBtnName}} </button> <button id="negative-action-confirm-btn" class="btn-alert-sm details-btn-save" ng-click="confirmCallback()"> {{dialogLayout.confirmDialog.btnName}} </button> </div> </div> </div> </div>'
}, function(e, a) {
    e.exports = '<div class="details-header-container conversation-title-container"> <div class="details-label conversation-title-icon"> <span class="icon-chat-group-name" ng-show="dialogData.dialogType === dialogType.NEWGROUPCHAT"></span> <ul class="avatar-group card-plain chat-avatar-groups" ng-show="dialogData.dialogType != dialogType.NEWGROUPCHAT" ng-class="{\'avatar-double\': dialogData.userIds.length === 2,\'avatar-triple\' : dialogData.userIds.length === 3,\'avatar-all\' : dialogData.userIds.length >= 4}"> <li ng-repeat="userId in dialogData.userIds | limitTo : 4" class="avatar-item chat-avatar"> <img ng-src="{{chatLibrary.friendsDict[userId].avatarHeadshot.imageUrl}}" class="avatar-card-image"> </li> </ul> </div> <div class="border-bottom small details-input-container" ng-show="dialogData.dialogType == dialogType.NEWGROUPCHAT"> <input type="text" focus-me="{{dialogLayout.focusMeEnabled}}" class="small details-input conversation-title-input" placeholder="{{\'Label.NameYourChatGroup\'|translate}}" ng-model="dialogData.name" maxlength="{{chatLibrary.maxConversationTitleLengthInput}}"> </div> <div class="details-title conversation-title-content" ng-click="toggleConversationEditor()" ng-show="dialogData.dialogType != dialogType.NEWGROUPCHAT"> <span class="small text conversation-title-label text-overflow" ng-bind="dialogData.title"></span> <span class="icon-chat-arrow-right"></span> </div> </div>'
}, function(e, a) {
    e.exports = '<div class="details-container conversation-title-editor-container" ng-show="dialogLayout.details.isConversationTitleEditorEnabled"> <div class="chat-windows-header" ng-mouseenter="updateDialogHeader(true)" ng-mouseleave="updateDialogHeader(false)" ng-class="{\'hover\': dialogLayout.hoverOnCollapsed}"> <div class="chat-header-back" ng-click="toggleConversationEditor()"> <span class="icon-chat-back"></span> </div> <div class="chat-header-label details-dialog-title" ng-click="toggleDialogContainer()"> <span class="font-caption-header" ng-bind="\'Label.ChatGroupName\' | translate"></span> </div> <div class="chat-header-action"> <span class="icon-chat-close-white" ng-click="closeDialog({layoutId: dialogData.layoutId})" uib-tooltip="{{\'Label.Close\'|translate}}" tooltip-placement="bottom"></span> </div> </div> <div class="details-container conversation-title-editor-body"> <div ng-bind="\'Label.ChangeChatGroupName\' | translate" class="font-caption-body text conversation-title-editor-title"> </div> <div class="conversation-title-editor-content"> <textarea auto-resize rows="1" maxlength="{{chatLibrary.maxConversationTitleLengthInput}}" focus-me="{{dialogLayout.focusMeEnabled}}" class="font-caption-body input-field details-input conversation-title-editor-textarea" key-press-enter="renameTitle()" ng-model="dialogData.name">\r\n </textarea> <span class="font-footer text-subheader conversation-title-editor-count">{{dialogData.name.length}}/{{chatLibrary.maxConversationTitleLengthInput}}</span> </div> <div class="details-btns-fixed select-friends-btns"> <button id="select-friends-cancel" ng-bind="\'Action.Cancel\'|translate" ng-click="toggleConversationEditor()" class="btn-fixed-width btn-control-sm details-btn-cancel"></button> <button id="select-friends-save" ng-bind="\'Action.Save\'|translate" class="btn-fixed-width btn-secondary-sm details-btn-save" ng-click="renameTitle()"></button> </div> </div> </div>'
}, function(e, a) {
    e.exports = '<div class="dialog-container create-chat-container" ng-class="{\'collapsed\': dialogLayout.collapsed}" ng-controller="friendsController"> <div class="chat-windows-header"> <div class="chat-header-label chat-header-create-group" ng-click="toggleDialogContainer()"> <span class="font-caption-header">{{dialogLayout.title}}</span> </div> <div class="chat-header-action"> <span class="icon-chat-close-white" ng-click="closeDialog({layoutId: dialogData.layoutId})" uib-tooltip="{{\'Label.Close\'|translate}}" tooltip-placement="bottom"></span> </div> </div> <div conversation-title></div> <div select-friends></div> <div class="details-btns-fixed select-friends-btns"> <button id="select-friends-cancel" ng-bind="\'Action.Cancel\'|translate" ng-click="closeDialog({layoutId: dialogData.layoutId})" class="btn-fixed-width btn-control-sm details-btn-cancel select-friends-cancel"> </button> <button id="select-friends-save" ng-bind="\'Action.Create\'|translate" class="btn-fixed-width btn-secondary-sm btn-cta-sm details-btn-save select-friends-save" ng-disabled="dialogLayout.inviteBtnDisabled" ng-click="sendInvite()"> </button> </div> </div>'
}, function(e, a) {
    e.exports = '<div class="details-dialog-container" ng-show="dialogLayout.details.isEnabled" ng-controller="detailsController"> <div class="details-dialog" ng-class="{\'collapsed\': dialogLayout.collapsed}" ng-hide="dialogLayout.details.isAddFriendsEnabled || dialogLayout.details.isConversationTitleEditorEnabled"> <div class="chat-windows-header" ng-mouseenter="updateDialogHeader(true)" ng-mouseleave="updateDialogHeader(false)" ng-class="{\'hover\': dialogLayout.hoverOnCollapsed}"> <div class="chat-header-back" ng-click="toggleDetails()"> <span class="icon-chat-back"></span> </div> <div class="chat-header-label details-dialog-title" ng-click="toggleDialogContainer()"> <span ng-bind="\'Label.ChatDetails\'| translate" class="font-caption-header"></span> </div> <div class="chat-header-action"> <span class="icon-chat-close-white" ng-click="closeDialog({layoutId: dialogData.layoutId})" uib-tooltip="{{\'Label.Close\' | translate}}" tooltip-placement="bottom"></span> </div> </div> <div id="scrollbar_details_{{dialogData.layoutId}}" class="rbx-scrollbar details-container details-scrollbar" details-scrollbar> <div class="xsmall border-bottom text-secondary details-general-label" ng-if="dialogData.isGroupChat" ng-bind="\'Label.General\'|translate"> </div> <div conversation-title ng-if="dialogData.isGroupChat"></div> <div class="xsmall border-top border-bottom text-secondary details-members-label" ng-bind="\'Label.Members\' | translate"></div> <div class="details-members-container"> <div class="add-friends-option"> <div class="add-friends-icon" ng-click="toggleAddFriends()"> <div class="add-friends-cirle-container"> <span class="icon-chat-add-friends"></span> </div> </div> <div class="small border-bottom text-sec add-friends-label" ng-bind="\'Label.AddFriends\' | translate" ng-click="toggleAddFriends()"> </div> </div> <div id="group-members" class="participant-list"> <ul class="friends-list-container participant-list-container"> <li ng-repeat="userId in dialogData.userIds | limitTo: dialogLayout.memberDisplay.limitNumber" class="friend-item" id="member-list-{{userId}}"> <div class="friend-container"> <a ng-href="{{chatLibrary.friendsDict[userId].profileUrl}}" class="avatar avatar-headshot-sm friend-avatar"> <img ng-src="{{chatLibrary.friendsDict[userId].avatarHeadshot.imageUrl}}" class="avatar-card-image avatar"> <div class="avatar-status avatar-status" ng-class="userPresenceTypes[chatLibrary.friendsDict[userId].presence.userPresenceType][\'className\']"></div> </a> <div class="border-bottom friend-info-action"> <div class="friend-info"> <div class="small text-overflow text-sec friend-name">{{chatLibrary.friendsDict[userId].name}}</div> <div class="xsmall text-overflow friend-status">{{userPresenceTypes[chatLibrary.friendsDict[userId].presence.userPresenceType].title}}</div> </div> <div class="friend-action" ng-show="userId !== chatLibrary.userId"> <div class="friend-action-more-option more-options-{{dialogData.layoutId}}" click-outside="toggleFriendsMenu(userId, true)" ng-click="toggleFriendsMenu(userId)"> <span class="icon-chat-more-options"></span> </div> <div class="friend-menu" ng-class="{\'three-items\': canConversationRemoveMember() }" ng-show="dialogLayout.details.friendIdForMenuOn == userId && dialogLayout.details.friendMenuAction[userId]"> <ul class="dropdown-menu" role="menu" ng-show="dialogLayout.details.friendIdForMenuOn == userId && dialogLayout.details.friendMenuAction[userId]"> <li> <a id="add-friends-{{userId}}" ng-href="{{chatLibrary.friendsDict[userId].profileUrl}}" ng-click="toggleFriendsMenu(userId)" ng-bind="\'Label.ViewProfile\' | translate" class="font-caption-header"></a> </li> <li> <a id="abuse-report-{{userId}}" ng-click="abuseReport(userId, false); toggleFriendsMenu(userId)" class="font-caption-header" ng-bind="\'Action.Report\' | translate"></a> </li> <li ng-if="canConversationRemoveMember()"> <a id="remove-member-{{userId}}" ng-click="removeMember(userId, false); toggleFriendsMenu(userId)" class="font-caption-header" ng-bind="\'Action.Remove\' | translate"></a> </li> </ul> </div> </div> </div> </div> </li> <li class="participant-list-action" ng-show="dialogData.userIds.length > dialogLayout.memberDisplay.defaultLimit"> <a class="small text-link" ng-click="toggleMemberList()">{{dialogLayout.memberDisplay.linkName}}</a> </li> </ul> </div> </div> <div class="details-btns"> <button id="leave-group" ng-click="leaveGroupChat(false)" class="btn-full-width btn-alert-sm select-friends-cancel" ng-if="dialogData.dialogType !== dialogType.CHAT && dialogData.isGroupChat" ng-bind="\'Label.LeaveChatGroup\' | translate"></button> </div> </div> </div> <div add-friends></div> <div conversation-title-editor></div> </div>'
}, function(e, a) {
    e.exports = '<div class="chat-header-action" ng-controller="dialogHeaderController"> <span class="icon-chat-close-white" ng-click="closeDialog({layoutId: dialogData.layoutId})" uib-tooltip="{{\'Label.Close\'| translate}}" tooltip-placement="bottom"></span> <span class="icon-chat-info-white" id="dialog-info" uib-tooltip="{{\'Label.ChatDetails\'| translate}}" tooltip-placement="bottom" ng-click="toggleDetails()" ng-hide="dialogLayout.collapsed || chatLibrary.chatLayout.errorMaskEnable"></span> <span id="play-together-{{dialogData.id}}" class="cursor-pointer dialog-header-active-game" ng-if="isPinOrActiveGameAvailable()" ng-hide="dialogLayout.collapsed || chatLibrary.chatLayout.errorMaskEnable" ng-click="openGameList()" popover-trigger=" \'none\' " popover-class="game-list-in-dialog" popover-placement="bottom-right" popover-append-to-body="false" popover-is-open="dialogLayout.togglePopoverParams.isOpen" uib-popover-template="\'{{gamesListTemplateUrl}}\'" toggle-popover> <img ng-src="{{chatLibrary.placesLibrary[dialogData.placeForShown.rootPlaceId].gameIconUrl}}" class="dialog-header-active-game-image"> </span> <span id="play-together-{{dialogData.id}}" class="cursor-pointer dialog-header-active-game" ng-if="!isPinOrActiveGameAvailable() && isMyRecentGameAvailable()" ng-hide="dialogLayout.collapsed || chatLibrary.chatLayout.errorMaskEnable" ng-click="openGameList()" popover-trigger=" \'none\' " popover-class="game-list-in-dialog" popover-placement="bottom-right" popover-append-to-body="false" popover-is-open="dialogLayout.togglePopoverParams.isOpen" uib-popover-template="\'{{gamesListTemplateUrl}}\'" toggle-popover> <img ng-src="{{chatLibrary.placesLibrary[chatLibrary.myRecentPlaceId].gameIconUrl}}" class="dialog-header-active-game-image"> </span> </div>'
}, function(e, a) {
    e.exports = '<div id="dialogs-minimize-container" class="dialogs-minimize-container" ng-show="hasMinimizedDialogs" data-toggle="popover" data-bind="dialogs"> <span class="icon-chat-more-dialogs"></span> <span class="font-caption-header minimize-count">{{chatLibrary.minimizedDialogIdList.length}}</span> <div class="rbx-popover-content" data-toggle="dialogs"> <ul class="dropdown-menu minimize-list" role="menu"> <li ng-repeat="dialogLayoutId in chatLibrary.minimizedDialogIdList" class="minimize-item" id="{{dialogLayoutId}}" minimize-item> <a class="text-overflow minimize-title"> <span> {{chatLibrary.minimizedDialogData[dialogLayoutId].name}} </span> </a> <span class="icon-chat-close-black minimize-close"></span> </li> </ul> </div> </div>'
}, function(e, a) {
    e.exports = '<div> <span ng-show="chatUser.displayMessage.messageType === messageHelper.messageTypes.link.name" ng-bind="chatLibrary.universeLibrary[chatUser.displayMessage.link.game.universeId].placeUrl"> </span> <span ng-show="chatUser.displayMessage.messageType === messageHelper.messageTypes.plainText.name && !chatUser.displayMessage.hasLinkifyMessage" title="{{chatUser.displayMessage.messageType}}" ng-bind-html="chatUser.displayMessage.content"></span> <span ng-show="chatUser.displayMessage.messageType === messageHelper.messageTypes.plainText.name && chatUser.displayMessage.hasLinkifyMessage" title="{{chatUser.displayMessage.messageType}}" ng-bind="chatUser.displayMessage.parsedContent"></span> </div>'
}, function(e, a) {
    e.exports = '<div ng-controller="playTogetherController"> <div class="game-item-container pinned-game-container" ng-class="{\'has-active-game\': hasPinGameAndActiveGames()}" ng-show="playTogether.pinGame && playTogether.pinGame.rootPlaceId"> <a ng-href="{{chatLibrary.placesLibrary[playTogether.pinGame.rootPlaceId].placeUrl}}" class="text-title game-link"> <img ng-src="{{chatLibrary.placesLibrary[playTogether.pinGame.rootPlaceId].gameIconUrl}}" alt="{{chatLibrary.placesLibrary[playTogether.pinGame.rootPlaceId].placeName}}" class="game-icon"> </a> <div class="game-details pinned-game-details"> <div class="pinned-game-header"> <span class="pinned-game-icon icon-chat-pin"></span> <span class="xsmall text text-secondary pinned-game-label">{{pinGameLayout.titleForPinGame}}</span> <span class="pin-icon icon-chat-unpin" ng-click="unPinGame()" uib-tooltip="{{pinGameLayout.tooltipForUnPinGame}}" tooltip-placement="bottom-right"></span> </div> <div class="text-overflow small text-title game-name"> <a ng-href="{{chatLibrary.placesLibrary[playTogether.pinGame.rootPlaceId].placeUrl}}" class="text-title game-link"> {{chatLibrary.placesLibrary[playTogether.pinGame.rootPlaceId].placeName}} </a> </div> <div class="game-info pinned-game-info"> <ul class="game-players"> <li ng-repeat="userId in playTogether.playTogetherDict[playTogether.pinGame.rootPlaceId].playerIds | limitTo: playTogetherLayout.numberOfMembers.inPinnedGame" class="avatar avatar-headshot-sm card-plain game-player" title="{{chatLibrary.friendsDict[userId].name}}"> <img ng-src="{{chatLibrary.friendsDict[userId].avatarHeadshot.imageUrl}}" class="avatar-card-image game-player-avatar" uib-tooltip="{{chatLibrary.friendsDict[userId].name}}" tooltip-placement="bottom" tooltip-append-to-body="true"> <div class="avatar-status game-player-presence" ng-class="userPresenceTypes[chatLibrary.friendsDict[userId].presence.userPresenceType][\'className\']"></div> </li> <li ng-show="playTogether.playTogetherDict[playTogether.pinGame.rootPlaceId].playerIds.length > playTogetherLayout.numberOfMembers.inPinnedGame" class="font-caption-body text-secondary game-player-plus" ng-cloak>+{{playTogether.playTogetherDict[playTogether.pinGame.rootPlaceId].playerIds.length - playTogetherLayout.numberOfMembers.inPinnedGame}}</li> </ul> <button type="button" class="{{playTogether.placeButtonLayout[playTogether.pinGame.rootPlaceId].className}} game-btn" ng-class="{\'invisible\' : !playTogether.placeButtonLayout[playTogether.pinGame.rootPlaceId]}" ng-click="joinGameFromPlayTogether(playTogether.pinGame.rootPlaceId)" ng-if="playTogether.placeButtonLayout[playTogether.pinGame.rootPlaceId].type != gameLayout.playButtonTypes.notAvailable"> {{playTogether.placeButtonLayout[playTogether.pinGame.rootPlaceId].text}} </button> <span class="xsmall text-label game-non-available" ng-if="playTogether.placeButtonLayout[playTogether.pinGame.rootPlaceId].type == gameLayout.playButtonTypes.notAvailable"> {{playTogether.placeButtonLayout[playTogether.pinGame.rootPlaceId].text}} </span> </div> </div> </div> <div class="game-list-container" ng-class="{\'has-pin-game-above\': hasPinGameAndActiveGames(),\'overflow\': (playTogetherLayout.activeGamesList.limitNumber >= playTogetherLayout.activeGamesList.maxNumberForFit)}" ng-show="hasActiveGames()"> <ul id="active-game-list" ng-class="{\'rbx-scrollbar\': playTogether.inDialog}" class="active-game-list"> <li ng-repeat="placeId in playTogether.playTogetherIds | limitTo: playTogetherLayout.activeGamesList.limitNumber" ng-if="placeId != playTogether.pinGame.rootPlaceId" repeat-done class="game-item-container active-game-container"> <a ng-href="{{chatLibrary.placesLibrary[placeId].placeUrl}}" class="text-title game-link"> <img ng-src="{{chatLibrary.placesLibrary[placeId].gameIconUrl}}" alt="{{chatLibrary.placesLibrary[placeId].placeName}}" class="game-icon"> </a> <div class="border-bottom game-details active-game-details"> <div class="game-title-container"> <div class="text-overflow small text-title game-name"> <a ng-href="{{chatLibrary.placesLibrary[placeId].placeUrl}}"> {{chatLibrary.placesLibrary[placeId].placeName}} </a> </div> <span class="pin-icon active-game-pin-icon icon-chat-pin" ng-click="pinGame(chatLibrary.placesLibrary[placeId].universeId, chatLibrary.placesLibrary[placeId].rootPlaceId)" uib-tooltip="Pin Game" tooltip-placement="bottom-right"></span> </div> <div class="game-info active-game-info"> <ul class="game-players"> <li ng-repeat="userId in playTogether.playTogetherDict[placeId].playerIds | limitTo: playTogetherLayout.numberOfMembers.inActiveGame" class="avatar avatar-headshot-sm card-plain game-player" title="{{chatLibrary.friendsDict[userId].name}}"> <img ng-src="{{chatLibrary.friendsDict[userId].avatarHeadshot.imageUrl}}" class="avatar-card-image game-player-avatar" uib-tooltip="{{chatLibrary.friendsDict[userId].name}}" tooltip-placement="bottom" tooltip-append-to-body="true"> <div class="avatar-status game-player-presence" ng-class="userPresenceTypes[chatLibrary.friendsDict[userId].presence.userPresenceType][\'className\']"></div> </li> <li ng-show="playTogether.playTogetherDict[placeId].playerIds.length > playTogetherLayout.numberOfMembers.inActiveGame" class="font-caption-body text-secondary game-player-plus" ng-cloak>+{{playTogether.playTogetherDict[placeId].playerIds.length - playTogetherLayout.numberOfMembers.inActiveGame}}</li> </ul> <button type="button" class="{{playTogether.placeButtonLayout[placeId].className}} game-btn" ng-class="{\'invisible\' : !playTogether.placeButtonLayout[placeId]}" ng-if="playTogether.placeButtonLayout[placeId].type != gameLayout.playButtonTypes.notAvailable" ng-click="joinGameFromPlayTogether(placeId)"> {{playTogether.placeButtonLayout[placeId].text}} </button> <span class="xsmall text-label game-non-available" ng-if="playTogether.placeButtonLayout[placeId].type == gameLayout.playButtonTypes.notAvailable"> {{playTogether.placeButtonLayout[placeId].text}} </span> </div> </div> </li> </ul> <div class="cursor-pointer border-top is-exclusive-click active-game-toggle-menu" ng-click="toggleActiveGameList()" ng-if="playTogetherLayout.numberOfActiveGames > 1" ng-class="{\'collapsed\': playTogetherLayout.activeGamesList.isCollapsed}"> <span class="xsmall text is-exclusive-click toggle-menu-text">{{playTogetherLayout.activeGamesList.toggleMenuText}}</span> </div> </div> <div class="game-list-container" ng-show="isMyRecentAvaliable()"> <div class="game-item-container recommended-game-container"> <a ng-href="{{chatLibrary.placesLibrary[chatLibrary.myRecentPlaceId].gameReferralUrl}}" class="text-title game-link"> <img ng-src="{{chatLibrary.placesLibrary[chatLibrary.myRecentPlaceId].gameIconUrl}}" alt="{{chatLibrary.placesLibrary[chatLibrary.myRecentPlaceId].placeName}}" class="game-icon"> </a> <div class="game-details recommended-game-details"> <div class="game-title-container"> <a class="text-overflow small text-title game-name" ng-href="{{chatLibrary.placesLibrary[chatLibrary.myRecentPlaceId].gameReferralUrl}}"> {{chatLibrary.placesLibrary[chatLibrary.myRecentPlaceId].placeName}} </a> <span class="small text-label font-caption-body">{{playTogetherLayout.recommendedLabel}}</span> </div> <div class="game-info recommended-game-info"> <button type="button" class="{{chatLibrary.placesLibrary[chatLibrary.myRecentPlaceId].buttonLayoutForMe.className}} game-btn" ng-class="{\'invisible\' : !chatLibrary.placesLibrary[chatLibrary.myRecentPlaceId].buttonLayoutForMe}" ng-click="playGame(chatLibrary.myRecentPlaceId)"> {{chatLibrary.placesLibrary[chatLibrary.myRecentPlaceId].buttonLayoutForMe.text}} </button> </div> </div> </div> </div> </div>'
}, function(e, a) {
    e.exports = '<div id="link-card" ng-controller="linkCardMessagesController"> <div class="link-card-msg-wrap" ng-repeat="pieceOfMessage in linkCardMessages" ng-controller="linkCardController" ng-init="sendLoadLinkCardEvent(pieceOfMessage.id)"> <div class="dialog-message dialog-message-content dialog-triangle" ng-class="{\'message-is-sending\': message.sendingMessage}" ng-hide="pieceOfMessage.isLinkCard" ng-if="!pieceOfMessage.isCard || (pieceOfMessage.isCard && chatLibrary.placesLibrary[pieceOfMessage.id].isInvalid)"> <span class="message-piece" ng-repeat="piece in pieceOfMessage.pieces" ng-bind-html="piece.content"></span> </div> <div class="cursor-pointer border dialog-triangle link-card-container" ng-if="isLinkCardAvailableAndParsedByClientSide(pieceOfMessage) && (chatLibrary.placesLibrary[pieceOfMessage.id] || !chatLibrary.placesLibrary[pieceOfMessage.id].isInvalid)"> <div class="link-card-top-container"> <div class="small font-caption-header text-title text-overflow link-card-title" title="{{chatLibrary.placesLibrary[pieceOfMessage.id].placeName}}" ng-bind="chatLibrary.placesLibrary[pieceOfMessage.id].placeName" ng-click="goToPlaceDetails(pieceOfMessage.id, chatLibrary.eventStreamParams.clickLinkCardInChat)"></div> <span class="link-card-pin-icon icon-chat-pin" ng-class="{\'on\': pieceOfMessage.id == dialogData.pinGame.rootPlaceId}" ng-click="pinGame(chatLibrary.placesLibrary[pieceOfMessage.id].universeId, pieceOfMessage.id)" uib-tooltip="{{pinGameLayout.tooltipForPinGame}}" tooltip-placement="bottom-right"></span> </div> <div class="link-card-details" ng-click="goToPlaceDetails(pieceOfMessage.id, chatLibrary.eventStreamParams.clickLinkCardInChat)"> <img ng-src="{{chatLibrary.placesLibrary[pieceOfMessage.id].gameIconUrl}}" class="link-card-thumb"> <p class="xsmall text-secondary link-card-description" ng-bind="chatLibrary.placesLibrary[pieceOfMessage.id].description"></p> </div> <button class="{{chatLibrary.placesLibrary[pieceOfMessage.id].buttonLayoutForLinkCard.className}} btn-full-width link-card-btn" ng-class="{\'invisible\' : !chatLibrary.placesLibrary[pieceOfMessage.id].buttonLayoutForLinkCard}" ng-click="play(pieceOfMessage.id, chatLibrary.eventStreamParams.clickPlayFromLinkCardInChat, pieceOfMessage.assetDetails)" ng-disabled="dialogLayout.playTogetherButton.isPlayButtonDisabled"> {{chatLibrary.placesLibrary[pieceOfMessage.id].buttonLayoutForLinkCard.text}} </button> </div> <div class="cursor-pointer border dialog-triangle link-card-container" ng-if="pieceOfMessage.isLinkCard && chatLibrary.universeLibrary[pieceOfMessage.universeId]"> <div class="link-card-top-container"> <div class="small font-caption-header text-title text-overflow link-card-title" title="{{chatLibrary.universeLibrary[pieceOfMessage.universeId].placeName}}" ng-bind="chatLibrary.universeLibrary[pieceOfMessage.universeId].placeName" ng-click="goToPlaceDetails(chatLibrary.universeLibrary[pieceOfMessage.universeId].placeId, chatLibrary.eventStreamParams.clickLinkCardInChat)"></div> <span class="link-card-pin-icon icon-chat-pin" ng-class="{\'on\': chatLibrary.universeLibrary[pieceOfMessage.universeId].placeId == dialogData.pinGame.rootPlaceId}" ng-click="pinGame(pieceOfMessage.universeId, chatLibrary.universeLibrary[pieceOfMessage.universeId].placeId)" uib-tooltip="{{pinGameLayout.tooltipForPinGame}}" tooltip-placement="bottom-right"></span> </div> <div class="link-card-details" ng-click="goToPlaceDetails(chatLibrary.universeLibrary[pieceOfMessage.universeId].placeId, chatLibrary.eventStreamParams.clickLinkCardInChat)"> <img ng-src="{{chatLibrary.universeLibrary[pieceOfMessage.universeId].gameIconUrl}}" class="link-card-thumb"> <p class="xsmall text-secondary link-card-description" ng-bind="chatLibrary.universeLibrary[pieceOfMessage.universeId].description"></p> </div> <button class="{{chatLibrary.universeLibrary[pieceOfMessage.universeId].buttonLayoutForLinkCard.className}} btn-full-width link-card-btn" ng-class="{\'invisible\' : !chatLibrary.universeLibrary[pieceOfMessage.universeId].buttonLayoutForLinkCard}" ng-click="play(chatLibrary.universeLibrary[pieceOfMessage.universeId].placeId, chatLibrary.eventStreamParams.clickPlayFromLinkCardInChat)" ng-disabled="dialogLayout.playTogetherButton.isPlayButtonDisabled"> {{chatLibrary.universeLibrary[pieceOfMessage.universeId].buttonLayoutForLinkCard.text}} </button> </div> </div> </div>'
}, function(e, a) {
    e.exports = '<div class="select-friends-container"> <div class="border-bottom details-header-container select-friends-header"> <div class="details-label select-friends-label"> <span class="icon-chat-group-label"></span> </div> <div class="small details-input-container select-friends-search" ng-class="{\'group-select-container\' : dialogData.selectedUserIds.length > 0}" select-friends-resize> <ul class="friends-selected-list" ng-show="dialogData.selectedUserIds.length > 0"> <li class="avatar avatar-headshot-sm card-plain friends-selected-item" ng-repeat="userId in dialogData.selectedUserIds" ng-click="selectFriends(userId)" ng-hide="dialogData.selectedUsersDict[userId].hiddenFromSelection" title="{{dialogData.selectedUsersDict[userId].name}}"> <img ng-src="{{dialogData.selectedUsersDict[userId].avatarHeadshot.imageUrl}}" class="avatar-card-image avatar"> <div class="friends-selected-mask"> <span class="icon-chat-close-white"></span> </div> </li> </ul> <input type="text" placeholder="{{\'Label.InputPlaceHolder.SearchForFriends\'|translate}}" class="small details-input select-friends-input" ng-model="dialogData.searchTerm"/> <span class="xsmall text-secondary select-friends-count" ng-if="dialogData.dialogType === dialogType.GROUPCHAT"> ({{(dialogData.selectedUserIds.length)}}/{{chatLibrary.quotaOfGroupChatMembers - dialogData.userIds.length + 1}}) </span> <span class="xsmall text-secondary select-friends-count" ng-if="dialogData.dialogType === dialogType.NEWGROUPCHAT || dialogData.dialogType === dialogType.CHAT"> ({{(dialogData.selectedUserIds.length)}}/{{chatLibrary.quotaOfGroupChatMembers - dialogData.userIds.length}}) </span> </div> </div> <div> <div id="scrollbar_friend_{{dialogData.dialogType}}_{{dialogData.layoutId}}" class="rbx-scrollbar select-friends-list" friends-lazy-load> <ul class="friends-list-container"> <li ng-repeat="friend in chatLibrary.friendsDict | orderList: dialogData.friendIds | filter: {name: dialogData.searchTerm}" class="friend-item" id="friend-{{friend.id}}"> <div class="friend-container chat-friend-select"> <div class="avatar avatar-headshot-sm card-plain friend-avatar" ng-click="toggleFriendSelection(friend.id)"> <img ng-src="{{friend.avatarHeadshot.imageUrl}}" class="avatar-card-image avatar"> <div class="avatar-status avatar-status" ng-class="userPresenceTypes[friend.presence.userPresenceType][\'className\']"></div> </div> <div class="border-bottom friend-info-action" ng-click="toggleFriendSelection(friend.id)"> <div class="friend-info"> <div class="small text-overflow text-sec friend-name">{{friend.name}}</div> <div class="xsmall text-overflow text-secondary friend-status">{{userPresenceTypes[friend.presence.userPresenceType].title}}</div> </div> <div class="checkbox friend-action"> <input id="checkbox-select-{{dialogData.layoutId}}-{{friend.id}}" type="checkbox" ng-click="toggleFriendSelection(friend.id, $event)" ng-checked="dialogData.selectedUsersDict[friend.id]"> <label for="checkbox-select-{{dialogData.layoutId}}-{{friend.id}}"> </label> </div> </div> </div> </li> </ul> </div> <div toast toast-layout="toastLayout"></div> </div> </div>'
}, function(e, a) {
    e.exports = '<div> <span class="indicated-message-bubble system-message-content" ng-show="message.isSystemMessageFromApi"> <div class="font-caption-body" ng-if="message.eventBased.type === messageHelper.messageTypes.eventBased.setConversationUniverse" ng-bind="\'Message.PinGameUpdate\' | translate:{userName: chatLibrary.friendsDict[message.eventBased.setConversationUniverse.actorUserId].name, \r\n gameName: chatLibrary.universeLibrary[message.eventBased.setConversationUniverse.universeId].placeName}"> </div> </span> <div ng-hide="message.isSystemMessageFromApi"> <span class="font-caption-body indicated-message-bubble system-message-content" ng-show="message.isSystemMessage && !message.hasParams" ng-bind-html="message.content"></span> <span class="font-caption-body indicated-message-bubble system-message-content" ng-show="message.isSystemMessage && message.hasParams">{{chatLibrary.friendsDict[dialogData.recentUserIdFromPresence].name}}{{message.content}}{{chatLibrary.placesLibrary[dialogData.recentPlaceIdFromPresence].placeName}}</span> </div> </div>'
}, function(e, a) {
    e.exports = '<div ng-controller="userConversationInfoController"> <div class="border-bottom chat-friend-info" ng-class="{\'has-universe\': isGameAvailableInChat()}"> <div class="chat-friend-info-top"> <span class="small text-title text-overflow font-caption-header chat-friend-name" ng-class="{\'unread\': chatUser.hasUnreadMessages, \'read\': !chatUser.hasUnreadMessages}" ng-bind="chatUser.title || chatUser.name"></span> <span class="xsmall text-info chat-brief-timestamp" ng-class="{\'font-bold secondary unread\': chatUser.hasUnreadMessages, \'read\': !chatUser.hasUnreadMessages}" ng-hide="isGameAvailableInChat()" ng-bind="chatUser.displayMessage.briefTimeStamp || chatUser.briefTimeStamp"></span> </div> <span class="xsmall text-overflow text-info font-caption-body chat-friend-message" ng-class="{\'font-bold unread\': chatUser.hasUnreadMessages, \'read\': !chatUser.hasUnreadMessages}" display-message ng-if="chatUser.isConversation && chatUser.displayMessage"></span> <span class="xsmall text-overflow text-info font-caption-body chat-friend-message" ng-if="!chatUser.isConversation">{{userPresenceTypes[chatUser.presence.userPresenceType].title}}</span> </div> <div class="border-bottom chat-conversation-universe" ng-show="isGameAvailableInChat()"> <img ng-src="{{chatLibrary.placesLibrary[chatUser.placeForShown.rootPlaceId].gameIconUrl}}" class="universe-image" title="{{chatLibrary.placesLibrary[chatUser.placeForShown.rootPlaceId].placeName}}" ng-class="{\'album\': hasGameAlbum()}" ng-mouseover="openGameList()" popover-trigger=" \'none\' " popover-class="game-list-per-conversation game-list-{{chatUser.id}}" popover-placement="left-bottom" popover-append-to-body="true" popover-is-open="hoverPopoverParams.isOpen" hover-popover-params="hoverPopoverParams" hover-popover uib-popover-template="\'{{gamesListTemplateUrl}}\'"> </div> </div>'
}]);
/* Bundle detector */
window.Roblox && window.Roblox.BundleDetector && window.Roblox.BundleDetector.bundleDetected("Chat");