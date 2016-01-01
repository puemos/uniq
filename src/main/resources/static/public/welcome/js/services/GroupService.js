define(["angular"], function (angular) {
    'use strict';

    function GroupService($http, $q, $rootScope) {
        var that = this;
        var prepareCreateGroupData = function (details) {
            var postData = {};
            postData.title = details.title != undefined ? details.title : '';
            postData.users = details.users != undefined ? details.users : {};
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
                    $rootScope.$broadcast('groups:change', true);
                    deferred.resolve("create_group_success");
                })
                .error(function (error, status) {
                    deferred.reject(error);
                });
            return deferred.promise;
        };
        this.deleteGroup = function (groupId) {
            var deferred = $q.defer();
            $http(
                {
                    method: 'DELETE',
                    url: '/group',
                    data: {groupId: groupId},
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "text/plain, application/json"
                    }
                })
                .success(function (response) {
                    $rootScope.$broadcast('groups:change', true);
                    deferred.resolve("delete_group_success");
                })
                .error(function (error, status) {
                    if (angular.isString(error.message)) {
                        error = error.message;
                    }
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
                    $rootScope.$broadcast('groups:change', true);
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
    }

    GroupService.$inject = ['$http', '$q', '$rootScope'];
    return GroupService;
});

