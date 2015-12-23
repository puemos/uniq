require.config({
    paths: {
        angular: '../bower_components/angular/angular',
        jquery: '../bower_components/jquery/dist/jquery',
        ngMessages: '../bower_components/angular-messages/angular-messages',
        ngUiRouter: '../bower_components/angular-ui-router/release/angular-ui-router',
        ngLocalStorage: '../bower_components/angular-local-storage/dist/angular-local-storage',
        ngAnimate: '../bower_components/angular-animate/angular-animate',
        ngSanitize: '../bower_components/angular-sanitize/angular-sanitize',
        ngToast: '../bower_components/ngToast/dist/ngToast',
        ngMaterial: '../bower_components/angular-material/angular-material',
        ngAria: '../bower_components/angular-aria/angular-aria',
        AuthService: 'welcome/js/services/AuthService',
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
        ngLocalStorage: {
            deps: ["angular"]
        },
        ngAnimate: {
            deps: ["angular"]
        },
        ngSanitize: {
            deps: ["angular"]
        },
        ngToast: {
            deps: ["angular"]
        },
        ngMaterial: {
            deps: ["angular", "ngAria", "ngAnimate"]
        },
        ngAria: {
            deps: ["angular"]
        }
    },
    packages: ["welcome"]
});

require(["angular", "app"], function(angular) {
    angular.bootstrap(document.getElementsByTagName('body'), ["app"]);
});