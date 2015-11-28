define(function (require) {
    var angular = require("angular"),
        name = "welcome",
        ngModule;
    var homeController = require("welcome/js/controllers/homeController"),
        loginController = require("welcome/js/controllers/loginController"),
        groupsController = require("welcome/js/controllers/groupsController"),
        shellController = require("welcome/js/controllers/shellController"),
        signupController = require("welcome/js/controllers/signupController"),
        userInfoModalController = require("welcome/js/controllers/modals/userInfoModalController"),
        groupInfoModalController = require("welcome/js/controllers/modals/groupInfoModalController"),
        AuthService = require("AuthService"),
        GroupService = require("GroupService"),
        QuestionService = require("QuestionService"),
        AuthServiceProvider = require("welcome/js/services/AuthServiceProvider"),
        ResourceService = require("welcome/js/services/ResourceService"),
        routerConfig = require("welcome/js/config/router"),
        toastConfig = require("welcome/js/config/toast"),
        localStorageConfig = require("welcome/js/config/localStorage");

        ngModule = angular.module(name, [])
            .controller("homeController",homeController)
            .controller("groupsController",groupsController)
            .controller("loginController",loginController)
            .controller("shellController",shellController)
            .controller("signupController",signupController)
            .controller("userInfoModalController",userInfoModalController)
            .controller("groupInfoModalController",groupInfoModalController)
            .factory('AuthService',AuthService)
            .factory('GroupService',GroupService)
            .factory('QuestionService',QuestionService)
            .service('ResourceService',ResourceService)
            .provider('AuthServiceProvider',AuthServiceProvider)
            .config(routerConfig)
            .config(toastConfig)
            .config(localStorageConfig);

    return ngModule;

});
