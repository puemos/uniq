define(function (require) {
    var angular = require("angular");
    require("jquery");
    require("ngCSRFToken");
    require("ngSanitize");
    require("ngUiRouter");
    require("ngMessages");
    require("ngAnimate");
    require("ngAria");
    require("ngMaterial");
    require("ngTextAngular");
    require("ngTextAngularSetup");
    require("welcome");
    angular.module("app", [
        'spring-security-csrf-token-interceptor',
        'ui.router',
        'ngAnimate',
        'ngAria',
        'ngMessages',
        'ngSanitize',
        'ngMaterial',
        'textAngular',
        'welcome'
    ]);
});