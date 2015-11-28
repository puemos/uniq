require.config({
    paths: {
        angular: '../bower_components/angular/angular',
        jquery: '../bower_components/jquery/dist/jquery',
        bootstrap: '../bower_components/bootstrap/dist/js/bootstrap',
        ngMessages: '../bower_components/angular-messages/angular-messages',
        ngRoute: '../bower_components/angular-route/angular-route',
        ngUiRouter: '../bower_components/angular-ui-router/release/angular-ui-router',
        ngLoadingBar: '../bower_components/angular-loading-bar/build/loading-bar',
        ngLocalStorage: '../bower_components/angular-local-storage/dist/angular-local-storage',
        ngAnimate: '../bower_components/angular-animate/angular-animate',
        ngSanitize: '../bower_components/angular-sanitize/angular-sanitize',
        ngToast: '../bower_components/ngToast/dist/ngToast',
    },
    shim: {
        angular: {
            exports: "angular"
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
        ngLoadingBar: {
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
        }
    },
    packages: ["welcome"]
});

require(["angular", "app"], function(angular) {
    angular.bootstrap(document.documentElement, ["app"]);
});