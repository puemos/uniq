define(['ngLocalStorage'], function () {
    'use strict';
    require("ngLocalStorage");
    function QuestionService($http, $q, $rootScope, localStorageService) {
        var loggedIn = false,
            currentUser = null;
        var that = this;

        var prepareCreateQuestionData = function (details) {
            var postData = {};
            postData.title = details.title != undefined ? details.title : '';
            postData.description = details.description != undefined ? details.description : '';
            postData.groupId = details.groupId != undefined ? details.groupId : '';
            return postData;
        }

        this.currentQuestion = {};
        this.createQuestion = function (details) {
            var postData = prepareCreateQuestionData(details);
            var deferred = $q.defer();
            $http(
                {
                    method: 'POST',
                    url: '/question',
                    data: postData,
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "text/plain, application/json"
                    }
                })
                .success(function (response) {
                    deferred.resolve("create_question_success");
                })
                .error(function (error, status) {
                    deferred.reject(error);
                });
            return deferred.promise;
        };
        this.getQuestionDetails = function (questionId) {
            var deferred = $q.defer();
            $http(
                {
                    method: 'GET',
                    url: '/Question/' + questionId,
                    headers: {
                        "Accept": "application/json"
                    }
                })
                .success(function (data) {
                    that.currentQuestion = data;
                    $rootScope.$broadcast('question:in', true);
                    deferred.resolve(data);
                })
                .error(function (error, status) {
                    deferred.reject(error);
                })
            return deferred.promise;
        };
        return this;
    };

    QuestionService.$inject = ['$http', '$q', '$rootScope', 'localStorageService'];
    return QuestionService;
});

