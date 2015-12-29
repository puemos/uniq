define(['require', 'UserService'], function (require) {
    'use strict';
    var UserService = require("UserService");
    function UserServiceProvider() {
        this.$get = [function UserServiceFactory($http, $q, $rootScope) {
            return new UserService($http, $q, $rootScope);
        }];
    }
    return UserServiceProvider;
});

