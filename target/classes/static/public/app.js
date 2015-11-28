define(function (require) {
    var angular = require("angular");
    require("jquery");
    require("bootstrap");
    require("ngUiRouter");
    require("ngToast");
    require("ngModalService");
    require("ngLocalStorage");
    require("ngSanitize");
    require("ngAnimate");
    require("welcome");
    angular.module("app", [
        'ui.router',
        'ngToast',
        'ngAnimate',
        'LocalStorageModule',
        'ngSanitize',
        'angularModalService',
        'welcome'
    ]);
});