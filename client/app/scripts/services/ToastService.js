(function () {
    'use strict';
    var ToastService = function ($mdToast) {
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
    module.exports = ToastService;
})();

