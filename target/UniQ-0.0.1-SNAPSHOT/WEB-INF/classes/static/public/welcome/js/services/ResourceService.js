define(function () {
    'use strict';

    function ResourceService($http, $q) {
        var resources,
            urls,
            promises;
        urls = {
            errors: "welcome/data/errors.json",
            messages: "welcome/data/messages.json"
        };
        resources = {};
        var Promise = function (url) {
            let deferred = $q.defer();
            $http.get(url)
                .success(function (data) {
                    deferred.resolve(data);
                })
                .error(function (status) {
                    console.log("Fail to load resource, " + "url: " + url + " code: " + status);
                    deferred.reject(status);
                });
            return deferred.promise;
        };
        promises = {
            errors: Promise(urls.errors),
            messages: Promise(urls.messages)
        };
        $q.all(promises).then(function (values) {
            resources.errors = values.errors;
            resources.messages = values.messages;
        });
        return {
            getErrorMsg: function (code) {
                return resources.errors[code];
            },
            getMsg: function (msg) {
                return resources.messages[msg];
            }
        }
    }
    ResourceService.$inject = ['$http', '$q'];
    return ResourceService;
});

