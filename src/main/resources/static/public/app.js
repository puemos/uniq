define(function (require) {
    var angular = require("angular");
    require("jquery");
    require("ngUiRouter");
    require("ngToast");
    require("ngLocalStorage");
    require("ngSanitize");
    require("ngMessages");
    require("ngAnimate");
    require("ngMaterial");
    require("welcome");
    angular.module("app", [
        'ui.router',
        'ngToast',
        'ngAnimate',
        'ngMessages',
        'LocalStorageModule',
        'ngSanitize',
        'ngMaterial',
        'welcome'
    ]);
});