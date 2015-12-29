define(function (require) {
    'use strict';
    require('ngMaterial')
    function ToastService($mdToast) {
        return {
            createSimpleToast: function (text) {
                return $mdToast.simple()
                    .content(text)
                    .hideDelay(3000)
                    .position('top')
            }
        }
    };
    ToastService.$inject = ['$mdToast'];
    return ToastService;
});

