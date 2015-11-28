define(['require','ngLocalStorage'],function (require) {
    'use strict';
    var AuthService = require("./AuthService");
    require("ngLocalStorage");
    function AuthServiceProvider() {
        this.$get = [function AuthServiceFactory($http, $q, localStorageService) {
            return new AuthService($http, $q, localStorageService);
        }]
    }

    return AuthServiceProvider;
});

