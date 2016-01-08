(function () {
    'use strict';
    var ToastService = function ($mdToast) {
        return {
            createSimpleToast: function (text) {
                return $mdToast.simple()
                    .content(text);
            }
        }
    };
    ToastService.$inject = ['$mdToast'];
    module.exports = ToastService;
})();

