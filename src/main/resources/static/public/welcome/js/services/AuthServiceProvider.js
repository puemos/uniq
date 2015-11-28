define(['require', 'AuthService'], function (require) {
    'use strict';
    var AuthService = require("AuthService");
    function AuthServiceProvider() {
        this.$get = [function AuthServiceFactory($http, $q, $rootScope) {
            return new AuthService($http, $q, $rootScope);
        }];
    }
    return AuthServiceProvider;
});

