require.config({
    paths: {
        angular: '../bower_components/angular/angular',
        jquery: '../bower_components/jquery/dist/jquery',
        ngMessages: '../bower_components/angular-messages/angular-messages',
        ngUiRouter: '../bower_components/angular-ui-router/release/angular-ui-router',
        ngAnimate: '../bower_components/angular-animate/angular-animate',
        ngSanitize: '../bower_components/angular-sanitize/angular-sanitize',
        ngMaterial: '../bower_components/angular-material/angular-material',
        ngTextAngular: '../bower_components/textAngular/dist/textAngular',
        ngTextAngularSetup: '../bower_components/textAngular/dist/textAngularSetup',
        rangy: '../bower_components/rangy/rangy-core',
        rangySelSave: '../bower_components/rangy/rangy-selectionsaverestore',
        ngAria: '../bower_components/angular-aria/angular-aria',
        ngCSRFToken: '../bower_components/spring-security-csrf-token-interceptor-extended/dist/spring-security-csrf-token-interceptor-extended.min',
        UserService: 'welcome/js/services/UserService',
        GroupService: 'welcome/js/services/GroupService',
        QuestionService: 'welcome/js/services/QuestionService'
    },
    shim: {
        angular: {
            exports: "angular"
        },
        jquery: {
            exports: "jQuery"
        },
        ngMessages: {
            deps: ["angular"]
        },
        ngUiRouter: {
            deps: ["angular"]
        },
        ngAnimate: {
            deps: ["angular"]
        },
        ngSanitize: {
            deps: ["angular"]
        },
        ngCSRFToken: {
            deps: ["angular"]
        },
        ngMaterial: {
            deps: ["angular", "ngAria", "ngAnimate"]
        },
        ngAria: {
            deps: ["angular"]
        },
        ngTextAngularSetup: {
            deps: ["angular", "ngSanitize"]
        },
        ngTextAngular: {
            deps: ["angular", "ngSanitize", "ngTextAngularSetup"]
        }
    },
    packages: ["welcome"],
    waitSeconds: 0
});
require(["angular", "rangy","rangySelSave", "app"], function (angular, rangy, rangySelSave) {
    window.rangy = rangy;
    window.rangy.saveSelection = rangySelSave.saveSelection;
    angular.bootstrap(document.getElementsByTagName('body'), ["app"]);
});
