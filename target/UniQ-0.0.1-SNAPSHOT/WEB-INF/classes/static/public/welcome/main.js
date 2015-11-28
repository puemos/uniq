define(function (require) {
    var angular = require("angular"),
        name = "welcome",
        ngModule;
    var homeController = require("./js/controllers/homeController"),
        loginController = require("./js/controllers/loginController"),
        shellController = require("./js/controllers/shellController"),
        AuthService = require("./js/services/AuthService"),
        AuthServiceProvider = require("./js/services/AuthServiceProvider"),
        ResourceService = require("./js/services/ResourceService"),
        routerConfig = require("./js/config/router"),
        toastConfig = require("./js/config/toast"),
        localStorageConfig = require("./js/config/localStorage");

    ngModule = angular.module(name, [])
        .controller("homeController",homeController)
        .controller("loginController",loginController)
        .controller("shellController",shellController)
        .factory('AuthService',AuthService)
        .service('ResourceService',ResourceService)
        .provider('AuthServiceProvider',AuthServiceProvider)
        .config(routerConfig)
        .config(toastConfig)
        .config(localStorageConfig);
    return {
        name: name,
        ngModule: ngModule
    };
});