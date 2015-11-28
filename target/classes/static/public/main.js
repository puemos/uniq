require.config({
    paths: {
        angular: '../bower_components/angular/angular',
        jquery: '../bower_components/jquery/dist/jquery',
        bootstrap: '../bower_components/bootstrap/dist/js/bootstrap',
        ngMessages: '../bower_components/angular-messages/angular-messages',
        ngRoute: '../bower_components/angular-route/angular-route',
        ngUiRouter: '../bower_components/angular-ui-router/release/angular-ui-router',
        ngLocalStorage: '../bower_components/angular-local-storage/dist/angular-local-storage',
        ngAnimate: '../bower_components/angular-animate/angular-animate',
        ngSanitize: '../bower_components/angular-sanitize/angular-sanitize',
        ngToast: '../bower_components/ngToast/dist/ngToast',
        ngModalService: '../bower_components/angular-modal-service/dst/angular-modal-service',
        AuthService: 'welcome/js/services/AuthService',
        GroupService: 'welcome/js/services/GroupService',
        QuestionService: 'welcome/js/services/QuestionService',
    },
    shim: {
        angular: {
            exports: "angular"
        },
        jquery: {
            exports: "jQuery"
        },
        bootstrap: {
            deps: ["jquery"]
        },
        ngMessages: {
            deps: ["angular"]
        },
        ngRoute: {
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
        ngModalService: {
            deps: ["angular", "jquery", 'bootstrap']
        }
    },
    packages: ["welcome"]
});

require(["angular","jquery", "app"], function(angular) {
    angular.bootstrap(document.getElementsByTagName('body'), ["app"]);
});