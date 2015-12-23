define(function (require) {
    var angular = require("angular"),
        name = "welcome",
        ngModule;
    var
        /*Controllers*/
        homeController = require("welcome/js/controllers/homeController"),
        loginController = require("welcome/js/controllers/loginController"),
        dashboardController = require("welcome/js/controllers/dashboardController"),
        shellController = require("welcome/js/controllers/shellController"),
        signupController = require("welcome/js/controllers/signupController"),
        searchController = require("welcome/js/controllers/searchController"),
        dashboardController = require("welcome/js/controllers/dashboardController"),
	groupController = require("welcome/js/controllers/groupController"),
        /*Services*/
        AuthService = require("AuthService"),
        GroupService = require("GroupService"),
        QuestionService = require("QuestionService"),
        AuthServiceProvider = require("welcome/js/services/AuthServiceProvider"),
        ResourceService = require("welcome/js/services/ResourceService"),
        /*Directives*/
        goClickDirective = require("welcome/js/directives/goClick"),
        /*Configs*/
        routerConfig = require("welcome/js/config/router"),
        toastConfig = require("welcome/js/config/toast"),
        iconsConfig = require("welcome/js/config/icons"),
        themeConfig = require("welcome/js/config/theme"),
        localStorageConfig = require("welcome/js/config/localStorage");
    ngModule = angular.module(name, [])
        .controller("homeController", homeController)
        .controller("dashboardController", dashboardController)
        .controller("loginController", loginController)
        .controller("shellController", shellController)
        .controller("signupController", signupController)
        .controller("searchController", searchController)
        .controller("dashboardController", dashboardController)
        .controller("groupController", groupController)
        .factory('AuthService', AuthService)
        .factory('GroupService', GroupService)
        .factory('QuestionService', QuestionService)
        .service('ResourceService', ResourceService)
        .provider('AuthServiceProvider', AuthServiceProvider)
        .directive('goClick', goClickDirective)
        .config(routerConfig)
        .config(toastConfig)
        .config(localStorageConfig)
        .config(iconsConfig)
        .config(themeConfig);
    return ngModule;
})
;
