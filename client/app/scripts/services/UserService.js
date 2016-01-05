(function () {
    'use strict';
    var UserService = function ($http, $q, $rootScope) {
        var currentUser = null;
        var that = this;
        var prepareLoginData = function (credentials) {
            var username = credentials.username !== undefined ? credentials.username : '';
            var password = credentials.password !== undefined ? credentials.password : '';
            return 'username=' + username + '&password=' + password;
        };
        var prepareQueryData = function (details) {
            var postData = {};
            postData.query = details !== undefined ? details : '';
            return postData;
        };
        var prepareCreateUserData = function (details) {
            var postData = {};
            postData.username = details.username !== undefined ? details.username : '';
            postData.password = details.password !== undefined ? details.password : '';
            postData.email = details.email !== undefined ? details.email : '';
            postData.firstname = details.firstname !== undefined ? details.firstname : '';
            postData.lastname = details.lastname !== undefined ? details.lastname : '';
            return postData;
        };
        this.isLogin = false;
        this.username = '';
        this.createUser = function (details) {
            var postData = prepareCreateUserData(details);
            var deferred = $q.defer();
            $http(
                {
                    method: 'POST',
                    url: '/user',
                    data: postData,
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'text/plain'
                    }
                })
                .success(function () {
                    deferred.resolve('create_success');
                })
                .error(function (error) {
                    deferred.reject(error);
                });
            return deferred.promise;
        };
        this.login = function (credentials) {
            var postData = prepareLoginData(credentials);
            var deferred = $q.defer();
            if (postData === null) {
                deferred.reject('no_credentials');
                return deferred.promise;
            }
            $http(
                {
                    method: 'POST',
                    url: '/authenticate',
                    data: postData,
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'X-Login-Ajax-call': 'true'
                    }
                })
                .success(function (data) {
                    that.isLogin = true;
                    that.username = data.username;
                    currentUser = data;
                    $rootScope.$broadcast('user:login', true);
                    deferred.resolve('logged-in');
                })
                .error(function (error) {
                    deferred.reject(error.message);
                });
            return deferred.promise;
        };
        this.logout = function () {
            var deferred = $q.defer();
            if (!that.isLogin) {
                deferred.reject('logout_not_logged_in');
                return deferred.promise;
            }
            $http(
                {
                    method: 'GET',
                    url: '/logout',
                })
                .success(function () {
                    $rootScope.$broadcast('user:logout', false);
                    deferred.resolve('logged-out');
                })
                .error(function (error) {
                    deferred.reject(error);
                });
            return deferred.promise;
        };
        this.getUserDetails = function () {
            var deferred = $q.defer();
            $http.get('/user')
                .success(function (data) {
                    deferred.resolve(data);
                })
                .error(function (error) {
                    deferred.reject(error);
                });
            return deferred.promise;
        };
        this.isLoggedIn = function () {
            var deferred = $q.defer();
            $http.get('/isin')
                .then(function (response) {
                    if (response.data === true) {
                        deferred.resolve('in');
                    } else {
                        deferred.reject('out');
                    }
                });
            return deferred.promise;
        };
        this.searchUsers = function (query) {
            var deferred = $q.defer();
            var postData = prepareQueryData(query);
            $http(
                {
                    method: 'POST',
                    url: '/userQuery',
                    data: postData,
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    }
                })
                .success(function (data) {
                    deferred.resolve(data);
                })
                .error(function (error, status) {
                    deferred.reject(error);
                });
            return deferred.promise;
        };
        this.getUserQuestions = function (page, size) {
            var deferred = $q.defer();
            var data = {
                page: page,
                size: size
            };
            $http(
                {
                    method: 'POST',
                    url: '/user/questions',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    data: data
                })
                .success(function (data) {
                    $rootScope.$broadcast('userQuestions:in', true);
                    deferred.resolve(data);
                })
                .error(function (error, status) {
                    deferred.reject(error);
                });
            return deferred.promise;
        };
        return this;
    };
    UserService.$inject = ['$http', '$q', '$rootScope'];
    module.exports = UserService;
})();

