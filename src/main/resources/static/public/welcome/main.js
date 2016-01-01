define(function (require) {
    var angular = require("angular"),
        name = "welcome",
        ngModule;
    var
    /*Controllers*/
        homeController = require("welcome/js/controllers/homeController"),
        loginController = require("welcome/js/controllers/loginController"),
        shellController = require("welcome/js/controllers/shellController"),
        searchController = require("welcome/js/controllers/searchController"),
        dashboardController = require("welcome/js/controllers/dashboardController"),
        groupController = require("welcome/js/controllers/groupController"),
    /*Dialogs*/
        newUserController = require("welcome/js/controllers/dialogs/newUserController"),
        newGroupController = require("welcome/js/controllers/dialogs/newGroupController"),
        newQuestionController = require("welcome/js/controllers/dialogs/newQuestionController"),
        questionController = require("welcome/js/controllers/dialogs/questionController"),
    /*Services*/
        UserService = require("UserService"),
        GroupService = require("GroupService"),
        QuestionService = require("QuestionService"),
        UserServiceProvider = require("welcome/js/services/UserServiceProvider"),
        ResourceService = require("welcome/js/services/ResourceService"),
        ToastService = require("welcome/js/services/ToastService"),
    /*Directives*/
        goClickDirective = require("welcome/js/directives/goClick"),
        equalsDirective = require("welcome/js/directives/equals"),
    /*Configs*/
        routerConfig = require("welcome/js/config/router"),
        CSRFTokenConfig = require("welcome/js/config/CSRFToken"),
        iconsConfig = require("welcome/js/config/icons"),
        textAngularConfig = require("welcome/js/config/textAngular"),
        themeConfig = require("welcome/js/config/theme");
    ngModule = angular.module(name, [])
        .controller("homeController", homeController)
        .controller("dashboardController", dashboardController)
        .controller("loginController", loginController)
        .controller("shellController", shellController)
        .controller("newUserController", newUserController)
        .controller("newGroupController", newGroupController)
        .controller("newQuestionController", newQuestionController)
        .controller("searchController", searchController)
        .controller("dashboardController", dashboardController)
        .controller("groupController", groupController)
        .controller("questionController", questionController)
        .factory('UserService', UserService)
        .factory('GroupService', GroupService)
        .factory('QuestionService', QuestionService)
        .service('ResourceService', ResourceService)
        .service('ToastService', ToastService)
        .provider('UserServiceProvider', UserServiceProvider)
        .directive('goClick', goClickDirective)
        .directive('equals', equalsDirective)
        .config(routerConfig)
        .config(iconsConfig)
        .config(CSRFTokenConfig)
        .config(textAngularConfig)
        .config(themeConfig);
    return ngModule;
})
;
