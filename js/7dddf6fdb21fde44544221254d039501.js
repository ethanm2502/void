;// bundle: serviceworkerregistrar___b477488184a294037ab379ee22f76cae_m
;// files: ServiceWorker/ServiceWorkerRegistrar.js

;// ServiceWorker/ServiceWorkerRegistrar.js
typeof Roblox=="undefined"&&(Roblox={}),Roblox.ServiceWorkerRegistrar=function(){var i=function(){return Roblox.Endpoints.getAbsoluteUrl("/service-workers/push-notifications")},n=function(){return"serviceWorker"in navigator},r=function(){n()&&navigator.serviceWorker.controller&&navigator.serviceWorker.ready.then(function(n){var i=new URL(n.scope);i.pathname!=="/"?n.unregister():t()})},u=function(){navigator.serviceWorker.controller||t()},t=function(){var n=i();navigator.serviceWorker.register(n,{scope:"/"}).then(function(){}).catch(function(){})};return{initialize:r,register:u,serviceWorkersSupported:n}}(),$(Roblox.ServiceWorkerRegistrar.initialize);

;//Bundle detector
Roblox && Roblox.BundleDetector && Roblox.BundleDetector.bundleDetected('serviceworkerregistrar');