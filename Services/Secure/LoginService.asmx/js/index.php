<?php header("Content-Type: application/javascript"); ?>
Type.registerNamespace('Roblox.Website.Services.Secure');
Roblox.Website.Services.Secure.LoginService=function() {
Roblox.Website.Services.Secure.LoginService.initializeBase(this);
this._timeout = 0;
this._userContext = null;
this._succeeded = null;
this._failed = null;
}
Roblox.Website.Services.Secure.LoginService.prototype={
_get_path:function() {
 var p = this.get_path();
 if (p) return p;
 else return Roblox.Website.Services.Secure.LoginService._staticInstance.get_path();},
ValidateLogin:function(userName,password,isCaptchaOn,challenge,captchaResponse,succeededCallback, failedCallback, userContext) {
return this._invoke(this._get_path(), 'ValidateLogin',false,{userName:userName,password:password,isCaptchaOn:isCaptchaOn,challenge:challenge,captchaResponse:captchaResponse},succeededCallback,failedCallback,userContext); }}
Roblox.Website.Services.Secure.LoginService.registerClass('Roblox.Website.Services.Secure.LoginService',Sys.Net.WebServiceProxy);
Roblox.Website.Services.Secure.LoginService._staticInstance = new Roblox.Website.Services.Secure.LoginService();
Roblox.Website.Services.Secure.LoginService.set_path = function(value) { Roblox.Website.Services.Secure.LoginService._staticInstance.set_path(value); }
Roblox.Website.Services.Secure.LoginService.get_path = function() { return Roblox.Website.Services.Secure.LoginService._staticInstance.get_path(); }
Roblox.Website.Services.Secure.LoginService.set_timeout = function(value) { Roblox.Website.Services.Secure.LoginService._staticInstance.set_timeout(value); }
Roblox.Website.Services.Secure.LoginService.get_timeout = function() { return Roblox.Website.Services.Secure.LoginService._staticInstance.get_timeout(); }
Roblox.Website.Services.Secure.LoginService.set_defaultUserContext = function(value) { Roblox.Website.Services.Secure.LoginService._staticInstance.set_defaultUserContext(value); }
Roblox.Website.Services.Secure.LoginService.get_defaultUserContext = function() { return Roblox.Website.Services.Secure.LoginService._staticInstance.get_defaultUserContext(); }
Roblox.Website.Services.Secure.LoginService.set_defaultSucceededCallback = function(value) { Roblox.Website.Services.Secure.LoginService._staticInstance.set_defaultSucceededCallback(value); }
Roblox.Website.Services.Secure.LoginService.get_defaultSucceededCallback = function() { return Roblox.Website.Services.Secure.LoginService._staticInstance.get_defaultSucceededCallback(); }
Roblox.Website.Services.Secure.LoginService.set_defaultFailedCallback = function(value) { Roblox.Website.Services.Secure.LoginService._staticInstance.set_defaultFailedCallback(value); }
Roblox.Website.Services.Secure.LoginService.get_defaultFailedCallback = function() { return Roblox.Website.Services.Secure.LoginService._staticInstance.get_defaultFailedCallback(); }
Roblox.Website.Services.Secure.LoginService.set_enableJsonp = function(value) { Roblox.Website.Services.Secure.LoginService._staticInstance.set_enableJsonp(value); }
Roblox.Website.Services.Secure.LoginService.get_enableJsonp = function() { return Roblox.Website.Services.Secure.LoginService._staticInstance.get_enableJsonp(); }
Roblox.Website.Services.Secure.LoginService.set_jsonpCallbackParameter = function(value) { Roblox.Website.Services.Secure.LoginService._staticInstance.set_jsonpCallbackParameter(value); }
Roblox.Website.Services.Secure.LoginService.get_jsonpCallbackParameter = function() { return Roblox.Website.Services.Secure.LoginService._staticInstance.get_jsonpCallbackParameter(); }
Roblox.Website.Services.Secure.LoginService.set_path("/Services/Secure/LoginService.asmx");
Roblox.Website.Services.Secure.LoginService.ValidateLogin= function(userName,password,isCaptchaOn,challenge,captchaResponse,onSuccess,onFailed,userContext) {Roblox.Website.Services.Secure.LoginService._staticInstance.ValidateLogin(userName,password,isCaptchaOn,challenge,captchaResponse,onSuccess,onFailed,userContext); }
