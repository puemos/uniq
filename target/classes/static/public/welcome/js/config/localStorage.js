define(function (require) {
    'use strict';
    require("ngLocalStorage");
    function localStorage(localStorageServiceProvider) {
        localStorageServiceProvider
            .setPrefix('UniQ')
            .setStorageType('localStorage')
    };

    localStorage.$inject = ['localStorageServiceProvider'];
    return localStorage;
});

