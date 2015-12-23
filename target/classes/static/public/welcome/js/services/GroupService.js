define(['ngLocalStorage'], function () {
    'use strict';
    require("ngLocalStorage");
    function GroupService($http, $q, $rootScope, localStorageService) {
        var loggedIn = false,
            currentUser = null;
        var that = this;
        var prepareCreateGroupData = function (details) {
            var postData = {};
            postData.title = details != undefined ? details : '';
            return postData;
        };
        this.currentGroup = {};
        this.createGroup = function (details) {
            var postData = prepareCreateGroupData(details);
            var deferred = $q.defer();
            $http(
                {
                    method: 'POST',
                    url: '/group',
                    data: postData,
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "text/plain, application/json"
                    }
                })
                .success(function (response) {
                    deferred.resolve("create_group_success");
                })
                .error(function (error, status) {
                    deferred.reject(error);
                });
            return deferred.promise;
        };
        this.getGroupDetails = function (groupId) {
            var deferred = $q.defer();
            $http(
                {
                    method: 'GET',
                    url: '/group/' + groupId,
                    headers: {
                        "Accept": "application/json"
                    }
                })
                .success(function (data) {
                    that.currentGroup = data;
                    $rootScope.$broadcast('group:in', true);
                    deferred.resolve(data);
                })
                .error(function (error, status) {
                    deferred.reject(error);
                });
            return deferred.promise;
        };
        this.getGroupQuestions = function (groupId, page, size) {
            var deferred = $q.defer();
            var data = {
                page: page,
                size: size
            };
            $http(
                {
                    method: 'POST',
                    url: '/group/' + groupId + '/questions',
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json"
                    },
                    data: data
                })
                .success(function (data) {
                    that.currentGroup = data;
                    $rootScope.$broadcast('groupQuestions:in', true);
                    deferred.resolve(data);
                })
                .error(function (error, status) {
                    deferred.reject(error);
                });
            return deferred.promise;
        };
        return this;
    };
    GroupService.$inject = ['$http', '$q', '$rootScope', 'localStorageService'];
    return GroupService;
});

