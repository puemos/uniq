define(function () {
        'use strict';
        function fileSelect() {
            return {
                link: function ($scope, el) {
                    el.bind("change", function (e) {
                        $scope.file = (e.srcElement || e.target).files[0];
                        $scope.getFile();
                    })
                }
            };
        }
        return fileSelect;
    }
);

