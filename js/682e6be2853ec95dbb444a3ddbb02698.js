/* Bundle: page_splitApps___9ff392e49cbbeecf334c0e79b1ab4b96_m */"use strict"; angular.module("pageTemplateApp", []).run(['$templateCache', function($templateCache) { $templateCache.put("badges-list", "<div class=\"stack badge-container\" ng-if=\"badges.data.length>0\"><div class=container-header><h3 ng-bind=\"'HeadingGameBadges'|translate\"></h3></div><ul class=stack-list><li ng-repeat=\"badge in badges.data|limitTo:badges.displayedBadgeCount\" class=\"stack-row badge-row\"><div class=badge-image><a href={{badge.detailsPageUrl}}><img class=lazy ng-src={{badge.icon}}></a></div><div class=badge-content><div class=badge-data-container><div class=badge-name ng-bind=badge.name></div><p class=para-overflow ng-bind=badge.description></div><ul class=badge-stats-container><li><div class=text-label ng-bind=\"'LabelRarity'|translate\"></div><div class=badge-stats-info>{{badge.winRatePercentage|number:1}}% ({{badge.rarityName}})</div><li><div class=text-label ng-bind=\"'LabelWonYesterday'|translate\"></div><div class=badge-stats-info ng-bind=badge.pastDayAwardedCount></div><li><div class=text-label ng-bind=\"'LabelWonEver'|translate\"></div><div class=badge-stats-info ng-bind=badge.awardedCount></div></ul></div><li ng-if=\"badges.displayedBadgeCount&lt;badges.data.length\"><button type=button class=\"btn-full-width btn-control-sm\" ng-bind=\"'LabelSeeMore'|translate\" ng-click=seeMore()></button></ul></div>"); }]);