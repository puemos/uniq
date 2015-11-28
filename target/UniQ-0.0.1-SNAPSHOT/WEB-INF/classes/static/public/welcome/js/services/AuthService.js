define(['ngLocalStorage'], function () {
    'use strict';
    require("ngLocalStorage");
    function AuthService($http, $q, localStorageService) {
        var loggedIn = undefined,
            currentUser;
        let that = this;
        this.isLogin = false;
        this.username = "";
        function checkCookie() {
            if (that.isLogin == false) {
                that.isLogin = localStorageService.get('loggedIn');
                currentUser = localStorageService.get('currentUser');
            }
            return loggedIn && currentUser;
        };
        this.preparePostData = function (credentials) {
            var username = credentials.username != undefined ? credentials.username : '';
            var password = credentials.password != undefined ? credentials.password : '';

            return 'username=' + username + '&password=' + password;
        };
        this.login = function (credentials) {
            var postData = this.preparePostData(credentials);
            var deferred = $q.defer();
            $http(
                {
                    method: 'POST',
                    url: '/authenticate',
                    data: postData,
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded",
                        "X-Login-Ajax-call": 'true'
                    }
                })
                .success(function (data) {
                    localStorageService.set('loggedIn', true);
                    that.isLogin = true;
                    deferred.resolve("logged-in");
                })
                .error(function (data, status) {
                    deferred.reject(status);
                });
            return deferred.promise;
        };
        this.logout = function () {
            var deferred = $q.defer();
            $http.get('logout', {})
                .success(function () {
                    localStorageService.remove('loggedIn');
                    localStorageService.remove('currentUser');
                    currentUser = {};
                    that.isLogin = false;
                    deferred.resolve("logged-out");
                })
                .error(function (data, status) {
                    deferred.reject(status);
                });
            return deferred.promise;
        };
        this.getCurrentUser = function () {
            checkCookie();
            return currentUser;
        };
        this.isLoggedIn = function () {
            checkCookie();
            return that.isLogin;
        }
        this.$get = [function AuthServiceFactory($http, $q, localStorageService) {
            return new AuthService($http, $q, localStorageService);
        }]
        return this;
    }

    AuthService.$inject = ['$http', '$q', 'localStorageService'];
    return AuthService;
});

