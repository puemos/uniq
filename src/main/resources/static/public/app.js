define(function (require) {
    var angular = require("angular");
    require("jquery");
    require("ngUiRouter");
    require("ngLocalStorage");
    require("ngSanitize");
    require("ngMessages");
    require("ngAnimate");
    require("ngAria");
    require("ngMaterial");
    require("welcome");
    angular.module("app", [
        'ui.router',
        'ngAnimate',
        'ngAria',
        'ngMessages',
        'LocalStorageModule',
        'ngSanitize',
        'ngMaterial',
        'welcome'
    ]);
});