define(function (require) {
    var angular = require("angular");
    require("ngUiRouter");
    require("ngToast");
    require("ngLocalStorage");
    require("ngSanitize");
    require("ngAnimate");
    require("ngLoadingBar");
    var welcome = require("welcome");
    angular.module("app", [
        'ui.router',
        'ngToast',
        'ngAnimate',
        'LocalStorageModule',
        'ngSanitize',
        'angular-loading-bar',
        welcome.name
    ]);
});