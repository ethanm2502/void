<?php
$maincss = true;
require_once($_SERVER['DOCUMENT_ROOT']."/global.php");
?>
<title>Create Place - Void</title>
<meta name="viewport" content="width=device-width, initial-scale=1">
<link onerror='Roblox.BundleDetector && Roblox.BundleDetector.reportBundleError(this)' rel='stylesheet' href='https://www.voidrev.us/css/MainCSS.css' />
<link onerror='Roblox.BundleDetector && Roblox.BundleDetector.reportBundleError(this)' rel='stylesheet' href='https://www.voidrev.us/css/developcreate.css' />
<script onerror='Roblox.BundleDetector && Roblox.BundleDetector.reportBundleError(this)' data-monitor='true' data-bundlename='header' type='text/javascript' src='https://www.voidrev.us/js/a65ed7da4b382cd9d6511908a5fad38e.js'></script>
<script type="text/javascript" onerror="Roblox.BundleDetector && Roblox.BundleDetector.reportBundleError(this)" data-monitor="true" data-bundlename="Polyfill" data-bundle-source="Main" src="https://www.voidrev.us/js/772034db167d3f4260047db4a7f2b8a58cf448709327013541e47c8962b6e556.js"></script>
<script type="text/javascript" onerror="Roblox.BundleDetector && Roblox.BundleDetector.reportBundleError(this)" data-monitor="true" data-bundlename="HeaderScripts" data-bundle-source="Main" src="https://www.voidrev.us/js/97cb9ac7262155c329a259fce9f940f9bcfa852a6a1ccb44bd8a41c31e84e54b.js"></script>
<script onerror='Roblox.BundleDetector && Roblox.BundleDetector.reportBundleError(this)' data-monitor='true' data-bundlename='intl-polyfill' type='text/javascript' src='https://www.voidrev.us/js/d44520f7da5ec476cfb1704d91bab327.js'></script>
<script onerror='Roblox.BundleDetector && Roblox.BundleDetector.reportBundleError(this)' data-monitor='true' data-bundlename='base' type='text/javascript' src='https://www.voidrev.us/js/465ab944465b37e1236f853c78b1a9c9.js'></script>
<script type='text/javascript'>Roblox.config.externalResources = [];Roblox.config.paths['Pages.Catalog'] = 'https://www.voidrev.us/js/109d883fe3988fca757e26e341ed0fe8.js';Roblox.config.paths['Pages.CatalogShared'] = 'https://www.voidrev.us/js/bcba3a83febab35eb41f3a0b8b96db37.js';Roblox.config.paths['Widgets.AvatarImage'] = 'https://www.voidrev.us/js/7d49ac94271bd506077acc9d0130eebb.js';Roblox.config.paths['Widgets.DropdownMenu'] = 'https://www.voidrev.us/js/da553e6b77b3d79bec37441b5fb317e7.js';Roblox.config.paths['Widgets.HierarchicalDropdown'] = 'https://www.voidrev.us/js/4a0af9989732810851e9e12809aeb8ad.js';Roblox.config.paths['Widgets.ItemImage'] = 'https://www.voidrev.us/js/61a0490ba23afa17f9ecca2a079a6a57.js';Roblox.config.paths['Widgets.PlaceImage'] = 'https://www.voidrev.us/js/a6df74a754523e097cab747621643c98.js';</script>
<script type="text/javascript" onerror="Roblox.BundleDetector && Roblox.BundleDetector.reportBundleError(this)" data-monitor="true" data-bundlename="CoreUtilities" data-bundle-source="Main" src="https://www.voidrev.us/js/1fb8b744dd67c1394e4b32036254dea94cc76823725f80dcb366ce43d3ca8af1.js"></script>
<script type="text/javascript" onerror="Roblox.BundleDetector && Roblox.BundleDetector.reportBundleError(this)" data-monitor="true" data-bundlename="CoreRobloxUtilities" data-bundle-source="Main" src="https://www.voidrev.us/js/1e53579ca711cb6cef72a952da7bc955115a220feba4b523d50daf2f3324171f.js"></script>
<script type="text/javascript" onerror="Roblox.BundleDetector && Roblox.BundleDetector.reportBundleError(this)" data-monitor="true" data-bundlename="React" data-bundle-source="Main" src="https://www.voidrev.us/js/b79589d3dfb2446936aac95605deaa507ce5bc3e09073bac7dd04872880694c2.js"></script>
<script type="text/javascript" onerror="Roblox.BundleDetector && Roblox.BundleDetector.reportBundleError(this)" data-monitor="true" data-bundlename="ReactUtilities" data-bundle-source="Main" src="https://www.voidrev.us/js/cf340fb618d9a73913b30dfc624ae60d68b9e59723746e6c08d06d14ebdd6dca.js"></script>
<script type="text/javascript" onerror="Roblox.BundleDetector && Roblox.BundleDetector.reportBundleError(this)" data-monitor="true" data-bundlename="ReactStyleGuide" data-bundle-source="Main" src="https://www.voidrev.us/js/5301e4bf0d04097eecd473d709fc8b566b5b2223d61e923fc643996c86cabf38.js"></script>
<script type="text/javascript" onerror="Roblox.BundleDetector && Roblox.BundleDetector.reportBundleError(this)" data-monitor="true" data-bundlename="ConfigureWebApps" data-bundle-source="Main" src="https://www.voidrev.us/js/5259cfe8a3e36118bd61120693dbba3ba87f2c3641f84bb07e29f1d69fe87523.js"></script>
<script onerror='Roblox.BundleDetector && Roblox.BundleDetector.reportBundleError(this)' data-monitor='true' data-bundlename='angular' type='text/javascript' src='https://www.voidrev.us/js/ae3d621886e736e52c97008e085fa286.js'></script>
<script type="text/javascript" onerror="Roblox.BundleDetector && Roblox.BundleDetector.reportBundleError(this)" data-monitor="true" data-bundlename="AngularJsUtilities" data-bundle-source="Main" src="https://www.voidrev.us/js/1c7ab1e84db2ce066ae33c0fd3bb9bcf375ad7b9e4d4bcdfc8dff8fa60cb59f8.js"></script>
<script type="text/javascript" onerror="Roblox.BundleDetector && Roblox.BundleDetector.reportBundleError(this)" data-monitor="true" data-bundlename="InternationalAngularJs" data-bundle-source="Main" src="https://www.voidrev.us/js/90f18784a43a70553e967191b948f70b0193df565f1605762c3c1e245ab4b55a.js"></script>
<script type="text/javascript" onerror="Roblox.BundleDetector && Roblox.BundleDetector.reportBundleError(this)" data-monitor="true" data-bundlename="Thumbnails" data-bundle-source="Main" src="https://www.voidrev.us/js/ca6836e875140765f70de8ce77eeb48ad4702890af0a407eda2fa5be9ad1e50b.js"></script>
<script onerror='Roblox.BundleDetector && Roblox.BundleDetector.reportBundleError(this)' data-monitor='true' data-bundlename='page' type='text/javascript' src='https://www.voidrev.us/js/af094bddc77ceb5f9e5c8e1d66c948ad.js'></script>
<div ng-modules="pageTemplateApp">
<!-- Template bundle: page -->
<script type="text/javascript">
"use strict"; angular.module("pageTemplateApp", []).run(['$templateCache', function($templateCache) {
}]);
</script>
</div>
<div id="modal-confirmation" class="modal-confirmation" data-modal-type="confirmation">
<div id="modal-dialog" class="modal-dialog">
<div class="modal-content">
<div class="modal-header">
<button type="button" class="close" data-dismiss="modal">
<span aria-hidden="true"><span class="icon-close"></span></span><span class="sr-only">Close</span>
</button>
<h5 class="modal-title"></h5>
</div>
<div class="modal-body">
<div class="modal-top-body">
<div class="modal-message"></div>
<div class="modal-image-container roblox-item-image" data-image-size="medium" data-no-overlays data-no-click>
<img class="modal-thumb" alt="generic image"/>
</div>
<div class="modal-checkbox checkbox">
<input id="modal-checkbox-input" type="checkbox"/>
<label for="modal-checkbox-input"></label>
</div>
</div>
<div class="modal-btns">
<a href id="confirm-btn"><span></span></a>
<a href id="decline-btn"><span></span></a>
</div>
<div class="loading modal-processing">
<img class="loading-default" src='https://www.voidrev.us/img/4bed93c91f909002b1f17f05c0ce13d1.gif' alt="Processing..." />
</div>
</div>
<div class="modal-footer text-footer">
</div>
</div>
</div>
</div>
<div id="BodyWrapper" class="">
<div id="RepositionBody">
<div id="Body" class="body-width">
<h1>Create Place</h1>
<div data-isBC="false">
<form id="placeForm" method="POST" action="https://www.voidrev.us/develop/create">
<div class="validation-summary-valid" data-valmsg-summary="true"><ul><li style="display:none"></li>
</ul></div>
<div class="tab-container">
<div class="tab active" data-id="templates_tab">Templates</div>
<div class="tab" data-id="basicsettings_tab">Basic Settings</div>
<div class="tab" data-id="access_tab">Access</div>
<div class="tab" data-id="advancedsettings_tab">Advanced Settings</div>
</div>
<div>
<div class="tab-content tab-active" id="templates_tab">
<h2 id="StudioGameTemplates">GAME TEMPLATES</h2>
<div class="templatetypes">
<ul class="templatetypes">
<li data-templatetype="All"><a href="#All"></a></li>
</ul>
</div>
<div class="templates" data-templatetype="All">
<div class="template" placeid="6560363541">
<a href="" class="game-image" data-retry-url="" ><img class='' src='https://www.voidrev.us/img/baseplate.png'/></a>
<p>Classic Baseplate</p>
</div>
</div>
</div>
<div class="tab-content" id="basicsettings_tab">
<div class="headline">
<h2>Basic Settings</h2>
</div>
<span id="userData" style="display: none;" data-name="<?php echo NoXSSPlz($username);?>" data-place-number="0">{0}&#39;s Place</span>
<label class="form-label" for="Name">Name:</label>
<input autofocus="" class="text-box text-box-medium" data-val="true" data-val-regex="Illegal characters" data-val-regex-pattern="^[^&lt;>]+$" data-val-required="Name is required" id="Name" name="Name" type="text" value="" />
<span id="nameRow"><span class="field-validation-valid" data-valmsg-for="Name" data-valmsg-replace="true"></span></span>
<label class="form-label" for="Description">Description:</label>
<div>
<span>If you have built <a>Builders Club benefits</a> into your game, please list those benefits in the description.</span>
</div>
<textarea class="text-box text-area-medium" cols="80" id="Description" maxlength="1000" name="Description" rows="6">
</textarea>
<span class="field-validation-valid" data-valmsg-for="Description" data-valmsg-replace="true"></span>
<label class="form-label" for="Genre">Genre:</label>
<select class="form-select no-margins" id="Genre" name="Genre"><option selected="selected">All</option>
<option>Adventure</option>
<option>Building</option>
<option>Comedy</option>
<option>Fighting</option>
<option>FPS</option>
<option>Horror</option>
<option>Medieval</option>
<option>Military</option>
<option>Naval</option>
<option>RPG</option>
<option>Sci-Fi</option>
<option>Sports</option>
<option>Town and City</option>
<option>Western</option>
</select>
<span class="field-validation-valid" data-valmsg-for="Genre" data-valmsg-replace="true"></span>
<input data-val="true" data-val-number="The field TemplateID must be a number." id="TemplateID" name="TemplateID" type="hidden" value="95206881" />
</div>
<div class="tab-content" id="access_tab">
<div class="headline">
<h2>Access</h2>
</div>
<script type="text/javascript">
var Roblox = Roblox || {};
Roblox.AccessData = {"isDevelopSiteForVipServersEnabled":true,"vipServerConfigurationLink":"https://www.voidrev.us/v1/universes//configuration/vip-servers","privateServersAllowed":true};
</script>
<!-- Checkbox list needs custom extensions in the current version of mvc. -->
<div class="deviceTypeSection" data-console-agreement-enabled="True">
<label class="form-label" for="DeviceSectionHeader">Playable devices:</label>
<label class="checkboxListItem" data-device="Computer">
<input checked="checked" data-val="true" data-val-required="The Selected field is required." id="PlayableDevices_0__Selected" name="PlayableDevices[0].Selected" type="checkbox" value="true" /><input name="PlayableDevices[0].Selected" type="hidden" value="false" />
<input data-val="true" data-val-required="The DeviceType field is required." id="PlayableDevices_0__DeviceType" name="PlayableDevices[0].DeviceType" type="hidden" value="Computer" />
Computer
</label>
<label class="checkboxListItem" data-device="Phone">
<input checked="checked" data-val="true" data-val-required="The Selected field is required." id="PlayableDevices_1__Selected" name="PlayableDevices[1].Selected" type="checkbox" value="true" /><input name="PlayableDevices[1].Selected" type="hidden" value="false" />
<input data-val="true" data-val-required="The DeviceType field is required." id="PlayableDevices_1__DeviceType" name="PlayableDevices[1].DeviceType" type="hidden" value="Phone" />
Phone
</label>
<label class="checkboxListItem" data-device="Tablet">
<input checked="checked" data-val="true" data-val-required="The Selected field is required." id="PlayableDevices_2__Selected" name="PlayableDevices[2].Selected" type="checkbox" value="true" /><input name="PlayableDevices[2].Selected" type="hidden" value="false" />
<input data-val="true" data-val-required="The DeviceType field is required." id="PlayableDevices_2__DeviceType" name="PlayableDevices[2].DeviceType" type="hidden" value="Tablet" />
Tablet
</label>
<label class="checkboxListItem" data-device="Console">
<input data-val="true" data-val-required="The Selected field is required." id="PlayableDevices_3__Selected" name="PlayableDevices[3].Selected" type="checkbox" value="true" /><input name="PlayableDevices[3].Selected" type="hidden" value="false" />
<input data-val="true" data-val-required="The DeviceType field is required." id="PlayableDevices_3__DeviceType" name="PlayableDevices[3].DeviceType" type="hidden" value="Console" />
Console
</label>
<label class="checkboxListItem" data-device="VR">
<input checked="checked" data-val="true" data-val-required="The Selected field is required." id="PlayableDevices_4__Selected" name="PlayableDevices[4].Selected" type="checkbox" value="true" /><input name="PlayableDevices[4].Selected" type="hidden" value="false" />
<input data-val="true" data-val-required="The DeviceType field is required." id="PlayableDevices_4__DeviceType" name="PlayableDevices[4].DeviceType" type="hidden" value="VR" />
VR
</label>
<div id="device-type-error" class="error-message">You must select one or more playable devices.</div>
</div>
<div id="NumPlayers">
<div class="access-label">
<label class="form-label" for="NumberOfPlayersMax">Maximum Visitor Count:</label>
</div>
<select class="form-select" data-val="true" data-val-number="The field Maximum Visitor Count: must be a number." data-val-required="The Maximum Visitor Count: field is required." id="MaxPlayersInput" name="NumberOfPlayersMax"><option>1</option>
<option>2</option>
<option>3</option>
<option>4</option>
<option>5</option>
<option>6</option>
<option>7</option>
<option>8</option>
<option>9</option>
<option>10</option>
<option>11</option>
<option>12</option>
<option>13</option>
<option>14</option>
<option>15</option>
<option>16</option>
<option>17</option>
<option>18</option>
<option>19</option>
<option>20</option>
<option>21</option>
<option>22</option>
<option>23</option>
<option>24</option>
<option>25</option>
<option>26</option>
<option>27</option>
<option>28</option>
<option>29</option>
<option>30</option>
<option>31</option>
<option>32</option>
<option>33</option>
<option>34</option>
<option>35</option>
<option>36</option>
<option>37</option>
<option>38</option>
<option>39</option>
<option>40</option>
<option>41</option>
<option>42</option>
<option>43</option>
<option>44</option>
<option>45</option>
<option>46</option>
<option>47</option>
<option>48</option>
<option>49</option>
<option selected="selected">50</option>
<option>51</option>
<option>52</option>
<option>53</option>
<option>54</option>
<option>55</option>
<option>56</option>
<option>57</option>
<option>58</option>
<option>59</option>
<option>60</option>
<option>61</option>
<option>62</option>
<option>63</option>
<option>64</option>
<option>65</option>
<option>66</option>
<option>67</option>
<option>68</option>
<option>69</option>
<option>70</option>
<option>71</option>
<option>72</option>
<option>73</option>
<option>74</option>
<option>75</option>
<option>76</option>
<option>77</option>
<option>78</option>
<option>79</option>
<option>80</option>
<option>81</option>
<option>82</option>
<option>83</option>
<option>84</option>
<option>85</option>
<option>86</option>
<option>87</option>
<option>88</option>
<option>89</option>
<option>90</option>
<option>91</option>
<option>92</option>
<option>93</option>
<option>94</option>
<option>95</option>
<option>96</option>
<option>97</option>
<option>98</option>
<option>99</option>
<option>100</option>
</select> <img class="TipsyImg tooltip-bottom h2-tooltip number-of-players-max-tooltip" src="https://www.voidrev.us/img/65cb6e4009a00247ca02800047aafb87.png" data-toggle="tooltip" title="The maximum number of people allowed in one instance of the game." />
<span class="field-validation-valid" data-valmsg-for="NumberOfPlayersMax" data-valmsg-replace="true"></span>
<div class="access-label">
<label class="form-label" for="SocialSlotType">Server Fill:</label>
</div>
<div class="formRadio" id="FriendSlotRadioButtons">
<label class="checkboxListItem"> <input checked="checked" data-val="true" data-val-required="The Server Fill: field is required." id="AutomaticFriendSlots" name="SocialSlotType" type="radio" value="Automatic" /> <span class="checkboxListItem">Roblox optimizes server fill for me</span> <img class="TipsyImg tooltip-bottom h2-tooltip" src="https://www.voidrev.us/img/65cb6e4009a00247ca02800047aafb87.png" data-toggle="tooltip" title="Roblox will fill your server to optimize for the best social game." /> </label>
<label class="checkboxListItem"> <input id="EmptyFriendSlots" name="SocialSlotType" type="radio" value="Empty" /> <span class="checkboxListItem">Fill each server as full as possible</span></label>
<div id="EmptyFriendSlotError" hidden="hidden">
<p class="status-error" id="FriendSlotWarning">Choosing this option will cause you to lose out on engagement time and Robux earned.</p>
</div>
<label class="checkboxListItem"> <input id="CustomFriendSlots" name="SocialSlotType" type="radio" value="Custom" /> <span class="checkboxListItem">Customize how many server slots to reserve</span> <img class="TipsyImg tooltip-bottom h2-tooltip" src="https://www.voidrev.us/img/65cb6e4009a00247ca02800047aafb87.png" data-toggle="tooltip" title="Friends are more likely to join people in your game if you reserve more slots." /> </label>
<div id="CustomFriendSlotDropdown" style="margin-left:3%" hidden="hidden">
<select class="form-select" data-val="true" data-val-number="The field NumberOfCustomSocialSlots must be a number." data-val-required="The NumberOfCustomSocialSlots field is required." id="FriendSlotsInput" name="NumberOfCustomSocialSlots"><option>1</option>
<option>2</option>
<option>3</option>
<option selected="selected">4</option>
<option>5</option>
<option>6</option>
<option>7</option>
<option>8</option>
<option>9</option>
<option>10</option>
<option>11</option>
<option>12</option>
<option>13</option>
<option>14</option>
<option>15</option>
<option>16</option>
<option>17</option>
<option>18</option>
<option>19</option>
<option>20</option>
<option>21</option>
<option>22</option>
<option>23</option>
<option>24</option>
<option>25</option>
<option>26</option>
<option>27</option>
<option>28</option>
<option>29</option>
<option>30</option>
<option>31</option>
<option>32</option>
<option>33</option>
<option>34</option>
<option>35</option>
<option>36</option>
<option>37</option>
<option>38</option>
<option>39</option>
<option>40</option>
<option>41</option>
<option>42</option>
<option>43</option>
<option>44</option>
<option>45</option>
<option>46</option>
<option>47</option>
<option>48</option>
<option>49</option>
</select> </div>
<span class="field-validation-valid" data-valmsg-for="SocialSlotType" data-valmsg-replace="true"></span>
</div>
</div>
<br />
<div id="GamePlaceAccess">
<label class="form-label" for="Access">Access:</label>
<select class="form-select" id="Access" name="Access"><option selected="selected">Everyone</option>
<option>Friends</option>
</select>
<img class="TipsyImg tooltip-bottom h2-tooltip place-access-tooltip" src="https://www.voidrev.us/img/65cb6e4009a00247ca02800047aafb87.png" data-toggle="tooltip" alt="To restrict who may access this place, first you must disable private servers and not sell game access." title="To restrict who may access this place, first you must disable private servers and not sell game access." />
<span class="field-validation-valid" data-valmsg-for="Access" data-valmsg-replace="true"></span>
</div>
<div id="PrivateServersAccess" class="privateserversaccess">
<label class="form-label" for="ArePrivateServersAllowed">Private Servers:</label>
<label id="PrivateServerAccessLabel" class="checkboxListItem">
<input checked="checked" data-val="true" data-val-required="The ArePrivateServersAllowed field is required." id="AllowPrivateServersCheckbox" name="ArePrivateServersAllowed" type="checkbox" value="true" /><input name="ArePrivateServersAllowed" type="hidden" value="false" />
<span>
Allow Private Servers <a href="https://www.voidrev.us/en-us/articles/Creating-a-VIP-Server-on-Roblox" target="_blank">
<img class="h2-tooltip private-server-tooltip" src="https://www.voidrev.us/img/65cb6e4009a00247ca02800047aafb87.png" alt="Click here to learn about private servers" data-toggle="tooltip" title="Click here to learn about private servers" />
</a>
</span>
</label>
<div id="PrivateServerDetails">
<div id="PrivateServerDetailsError" class="status-error">Unable to load private server statistics. This may occur for games with a large number of private servers.</div>
<div id="PrivateServerCountsLoading">
<img src="https://www.voidrev.us/img/e0802687d8357fbc484a75914e4447dc.gif" alt="Loading private server statistics...">
Loading private server statistics...
</div>
<div id="ActivePrivateServersCount"></div>
<div id="ActivePrivateServersSubscriptions"></div>
<div class="formRadio" id="PrivateServerRadioButtons">
<label class="checkboxListItem"> <input data-val="true" data-val-required="The IsFreePrivateServer field is required." id="FreePrivateServers" name="IsFreePrivateServer" type="radio" value="True" /> <span class="checkboxListItem">Free</span></label>
<label class="checkboxListItem"> <input checked="checked" id="PaidPrivateServers" name="IsFreePrivateServer" type="radio" value="False" /> <span class="checkboxListItem">Paid</span></label>
</div>
<div id="PrivateServerPriceContainer" data-minprice="10" data-defaultprice="100" data-taxrate="0.3" style="display:none;">
<div id="PrivateServerPrice" class="pricingrow">
<div class="pricinglabel">Price:</div>
<div class="toppricingfield">
<span class="icon-robux-16x16"></span><input class="TextBox priceinput" data-val="true" data-val-number="The field Price: must be a number." data-val-required="The Price: field is required." id="PrivateServerPriceInput" name="PrivateServersPrice" type="text" value="100" />
</div>
<span id="PrivateServerPricingError" class="status-error priceerror">
The minimum price for this item is
<span class="icon-robux-16x16"></span><span>10</span>
</span>
<div style="clear: both"></div>
</div>
<div id="PrivateServerMarketplaceFee" class="pricingrow">
<div class="pricinglabel">
Marketplace Fee <img class="h2-tooltip private-server-tooltip" src="https://www.voidrev.us/img/65cb6e4009a00247ca02800047aafb87.png" data-toggle="tooltip" data-toggle-mobile="true" data-original-title="30% - minimum 1" />:<br />
</div>
<div class="pricingfield">
<span class="icon-robux-16x16"></span><span id="PrivateServerMarketplaceFeeText"></span>
</div>
<div style="clear: both"></div>
</div>
<div id="PrivateServerUserProfit" class="pricingrow">
<div class="pricinglabel">You Earn:</div>
<div class="pricingfield">
<span class="icon-robux-16x16"></span><span id="PrivateServerUserProfitText"></span>
</div>
<div style="clear: both"></div>
</div>
</div>
<div id="PrivateServerPriceChangeWarning" class="status-error">Warning: Changing the price of private servers will cancel all existing subscriptions.</div>
</div>
<div id="PrivateServerDisableWarning" class="status-error">Warning: Disabling private servers will close all active private servers and cancel all subscriptions.</div>
<div id="PrivateServersError" class="status-error">To create a private server for this game, you must first allow access to Everyone, and you must disable Paid Access.</div>
</div>
<div style="clear:both;"></div>
<script type="text/javascript">
Roblox.PlayerAccess.strings = {
UsernameDoesNotExist: "That username does not exist.",
UserAlreadyAdded: "You've already added that username.",
UserLimitReached: "You've reached the user name limit.",
SearchingFor: "Searching for ",
InviteList: "Invite List",
ConsoleAccessContentAgreementTitleText: "Content Agreement",
ConsoleAccessContentAgreementBodyContent: "<div style='width: 350px; margin-left: 25px;'>Do you agree that your game is controller compatible and contains NONE of the following? <ul style='text-align: left; margin-left: 110px; padding: 0;'><li style='list-style: disc;'>Blood or Gore</li> <li style='list-style: disc;'>Intense Violence</li> <li style='list-style: disc;'>Strong Language (Swearing)</li> <li style='list-style: disc;'>Robux Gambling</li> <li style='list-style: disc;'>Drug Reference or Use</li> <li style='list-style: disc;'>In-Game Messaging (Text Chat)</li> </ul> </div>",
ConsoleAccessContentAgreementAcceptText: "AGREE",
ConsoleAccessContentAgreementDeclineText: "DISAGREE"
};
Roblox.PlayerAccess.AlertImageUrl = 'https://www.voidrev.us/img/cbb24e0c0f1fb97381a065bd1e056fcb.png';
Roblox.PlayerAccess.tailLeftImage = 'https://www.voidrev.us/img/77c4414271016f8257c136305b7888b4.png';
</script>
</div>
<div class="tab-content" id="advancedsettings_tab">
<div class="headline">
<h2>Gear Permissions</h2>
<img class="TipsyImg tooltip-bottom h2-tooltip" data-toggle="tooltip" title="The type of gear allowed in your game. By default the same genre of gear is allowed as the genre of the game." height="13" width="12" src="https://www.voidrev.us/img/65cb6e4009a00247ca02800047aafb87.png" alt="The type of gear allowed in your game. By default the same genre of gear is allowed as the genre of the game." />
</div>
<label class="form-label radio-button-label" for="IsAllGenresAllowed">Allowed Genre:</label>
<label class="radio-selection">
<input checked="checked" data-val="true" data-val-required="The Allowed Genre: field is required." id="IsAllGenresAllowed" name="IsAllGenresAllowed" type="radio" value="False" />
<span class="checkboxListItem">Game genre (<span id="advancedsettings_genre">All</span>)</span>
</label>
<label class="radio-selection-last">
<input id="IsAllGenresAllowed" name="IsAllGenresAllowed" type="radio" value="True" /><span class="checkboxListItem">All genres</span>
</label>
<span class="field-validation-valid" data-valmsg-for="IsAllGenresAllowed" data-valmsg-replace="true"></span>
<label class="form-label check-box-label">Gear types:</label>
<ul id="gearTypes">
<li class="gearCheckbox">
<label class="checkboxListItem"><input data-val="true" data-val-required="The IsSelected field is required." id="AllowedGearTypes_0__IsSelected" name="AllowedGearTypes[0].IsSelected" type="checkbox" value="true" /><input name="AllowedGearTypes[0].IsSelected" type="hidden" value="false" /> Melee</label>
<input id="AllowedGearTypes_0__GearTypeDisplayName" name="AllowedGearTypes[0].GearTypeDisplayName" type="hidden" value="Melee" />
<input data-val="true" data-val-required="The Category field is required." id="AllowedGearTypes_0__Category" name="AllowedGearTypes[0].Category" type="hidden" value="Melee" />
</li><li class="gearCheckbox">
<label class="checkboxListItem"><input data-val="true" data-val-required="The IsSelected field is required." id="AllowedGearTypes_1__IsSelected" name="AllowedGearTypes[1].IsSelected" type="checkbox" value="true" /><input name="AllowedGearTypes[1].IsSelected" type="hidden" value="false" /> Power ups</label>
<input id="AllowedGearTypes_1__GearTypeDisplayName" name="AllowedGearTypes[1].GearTypeDisplayName" type="hidden" value="Power ups" />
<input data-val="true" data-val-required="The Category field is required." id="AllowedGearTypes_1__Category" name="AllowedGearTypes[1].Category" type="hidden" value="PowerUps" />
</li><li class="gearCheckbox">
<label class="checkboxListItem"><input data-val="true" data-val-required="The IsSelected field is required." id="AllowedGearTypes_2__IsSelected" name="AllowedGearTypes[2].IsSelected" type="checkbox" value="true" /><input name="AllowedGearTypes[2].IsSelected" type="hidden" value="false" /> Ranged</label>
<input id="AllowedGearTypes_2__GearTypeDisplayName" name="AllowedGearTypes[2].GearTypeDisplayName" type="hidden" value="Ranged" />
<input data-val="true" data-val-required="The Category field is required." id="AllowedGearTypes_2__Category" name="AllowedGearTypes[2].Category" type="hidden" value="Ranged" />
</li><li class="gearCheckbox">
<label class="checkboxListItem"><input data-val="true" data-val-required="The IsSelected field is required." id="AllowedGearTypes_3__IsSelected" name="AllowedGearTypes[3].IsSelected" type="checkbox" value="true" /><input name="AllowedGearTypes[3].IsSelected" type="hidden" value="false" /> Navigation</label>
<input id="AllowedGearTypes_3__GearTypeDisplayName" name="AllowedGearTypes[3].GearTypeDisplayName" type="hidden" value="Navigation" />
<input data-val="true" data-val-required="The Category field is required." id="AllowedGearTypes_3__Category" name="AllowedGearTypes[3].Category" type="hidden" value="Navigation" />
</li><li class="gearCheckbox">
<label class="checkboxListItem"><input data-val="true" data-val-required="The IsSelected field is required." id="AllowedGearTypes_4__IsSelected" name="AllowedGearTypes[4].IsSelected" type="checkbox" value="true" /><input name="AllowedGearTypes[4].IsSelected" type="hidden" value="false" /> Explosives</label>
<input id="AllowedGearTypes_4__GearTypeDisplayName" name="AllowedGearTypes[4].GearTypeDisplayName" type="hidden" value="Explosives" />
<input data-val="true" data-val-required="The Category field is required." id="AllowedGearTypes_4__Category" name="AllowedGearTypes[4].Category" type="hidden" value="Explosive" />
</li><li class="gearCheckbox">
<label class="checkboxListItem"><input data-val="true" data-val-required="The IsSelected field is required." id="AllowedGearTypes_5__IsSelected" name="AllowedGearTypes[5].IsSelected" type="checkbox" value="true" /><input name="AllowedGearTypes[5].IsSelected" type="hidden" value="false" /> Musical</label>
<input id="AllowedGearTypes_5__GearTypeDisplayName" name="AllowedGearTypes[5].GearTypeDisplayName" type="hidden" value="Musical" />
<input data-val="true" data-val-required="The Category field is required." id="AllowedGearTypes_5__Category" name="AllowedGearTypes[5].Category" type="hidden" value="Musical" />
</li><li class="gearCheckbox">
<label class="checkboxListItem"><input data-val="true" data-val-required="The IsSelected field is required." id="AllowedGearTypes_6__IsSelected" name="AllowedGearTypes[6].IsSelected" type="checkbox" value="true" /><input name="AllowedGearTypes[6].IsSelected" type="hidden" value="false" /> Social</label>
<input id="AllowedGearTypes_6__GearTypeDisplayName" name="AllowedGearTypes[6].GearTypeDisplayName" type="hidden" value="Social" />
<input data-val="true" data-val-required="The Category field is required." id="AllowedGearTypes_6__Category" name="AllowedGearTypes[6].Category" type="hidden" value="Social" />
</li><li class="gearCheckbox">
<label class="checkboxListItem"><input data-val="true" data-val-required="The IsSelected field is required." id="AllowedGearTypes_7__IsSelected" name="AllowedGearTypes[7].IsSelected" type="checkbox" value="true" /><input name="AllowedGearTypes[7].IsSelected" type="hidden" value="false" /> Transport</label>
<input id="AllowedGearTypes_7__GearTypeDisplayName" name="AllowedGearTypes[7].GearTypeDisplayName" type="hidden" value="Transport" />
<input data-val="true" data-val-required="The Category field is required." id="AllowedGearTypes_7__Category" name="AllowedGearTypes[7].Category" type="hidden" value="PersonalTransport" />
</li><li class="gearCheckbox">
<label class="checkboxListItem"><input data-val="true" data-val-required="The IsSelected field is required." id="AllowedGearTypes_8__IsSelected" name="AllowedGearTypes[8].IsSelected" type="checkbox" value="true" /><input name="AllowedGearTypes[8].IsSelected" type="hidden" value="false" /> Building</label>
<input id="AllowedGearTypes_8__GearTypeDisplayName" name="AllowedGearTypes[8].GearTypeDisplayName" type="hidden" value="Building" />
<input data-val="true" data-val-required="The Category field is required." id="AllowedGearTypes_8__Category" name="AllowedGearTypes[8].Category" type="hidden" value="Building" />
</li></ul>
<div class="divider-bottom spacing"></div>
<div class="headline">
<h2 id="otherSettings">Other Permissions</h2>
</div>
<input id="ChatType" name="ChatType" type="hidden" value="Classic" />
<fieldset>
By checking this box, <b>you are granting every other user of Roblox the right to use</b> (in various ways) the content you are now sharing. <b>If you do not want to grant this right, please do not check this box</b>. For more information about sharing content, please review the Roblox <a class='text-link' href='https://www.voidrev.us/info/terms' class='rbx-link'>Terms of Use</a>.
<label id="copyLock">
<input data-val="true" data-val-required="The Allow Copying field is required." id="IsCopyingAllowed" name="IsCopyingAllowed" type="checkbox" value="true" /><input name="IsCopyingAllowed" type="hidden" value="false" /> <span class="checkboxListItem">Allow Copying</span>
</label>
</fieldset>
<input data-val="true" data-val-required="The Avatar Appearance Override: field is required." id="OverridesDefaultAvatar" name="OverridesDefaultAvatar" type="hidden" value="False" />
<script type="text/javascript">
$(function () {
if (typeof Roblox === "undefined") {
Roblox = {};
}
if (typeof Roblox.IDE === "undefined") {
Roblox.IDE = {};
}
if (typeof Roblox.IDE.Resources === "undefined") {
Roblox.IDE.Resources = {};
}
$.extend(Roblox.IDE.Resources, {
AllowCopyingTitleText: "Allow Copying",
AllowCopyingTitleContent: "Are you sure you want to allow this place to be copied?",
AllowCopyingAcceptText: "Save",
AllowCopyingCancelText: "Cancel",
DisableVIPServersWarningTitleText: "Turn Off Private Servers",
DisableVIPServersWarningBodyContent: "Are you sure you want to turn off private servers? All private server subscriptions will be cancelled.",
DisableVIPServersWarningAcceptText: "Turn Off",
DisableVIPServersWarningDeclineText: "Cancel"
});
});
</script>
</div>
</div>
<div>
<div id="buttonRow">
<a class="btn-medium btn-primary" id="finishButton">Create Place</a>
<a data-return-url="/develop" class="btn-medium btn-negative" id="cancelButton">Cancel</a>
</div>
</div>
</form>
</div>
<div id="ProcessingView" style="display:none">
<div class="ProcessingModalBody">
<p class="processing-indicator"><img src='https://www.voidrev.us/img/ec4e85b0c4396cf753a06fade0a8d8af.gif' alt="Creating place..." /></p>
<p class="processing-text">Creating game...</p>
</div>
</div>
<div style="clear: both"></div>
</div>
</div>
</div>
</main>
</div>
</div>
</div>
</div>
<div class="ConfirmationModal modalPopup unifiedModal smallModal" data-modal-handle="confirmation" style="display:none;">
<a class="genericmodal-close ImageButton closeBtnCircle_20h"></a>
<div class="Title"></div>
<div class="GenericModalBody">
<div class="TopBody">
<div class="ImageContainer roblox-item-image" data-image-size="small" data-no-overlays data-no-click>
<img class="GenericModalImage" alt="generic image" />
</div>
<div class="Message"></div>
</div>
<div class="ConfirmationModalButtonContainer GenericModalButtonContainer">
<a href id="roblox-confirm-btn"><span></span></a>
<a href id="roblox-decline-btn"><span></span></a>
</div>
<div class="ConfirmationModalFooter">
</div>
</div>
<script type="text/javascript">
Roblox = Roblox || {};
Roblox.Resources = Roblox.Resources || {};
Roblox.Resources.GenericConfirmation = {
yes: "Yes",
No: "No",
Confirm: "Confirm",
Cancel: "Cancel"
};
</script>
</div>
<script onerror='Roblox.BundleDetector && Roblox.BundleDetector.reportBundleError(this)' data-monitor='true' data-bundlename='pageEnd' type='text/javascript' src='https://www.voidrev.us/js/0b588f67c108ffe7031f4c5e429514a6.js'></script>
</body>
</html>
