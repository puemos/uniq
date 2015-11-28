define(function (require) {
    'use strict';
    require("ngToast");
    function toast(ngToastProvider) {
        ngToastProvider.configure({
            verticalPosition: 'bottom',
            horizontalPosition: 'center',
            animation: 'fade'
        });
    };

    toast.$inject = ['ngToastProvider'];
    return toast;
});

