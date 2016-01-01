define(function () {
    'use strict';
    function textAngular ($provide) {
        // this demonstrates how to register a new tool and add it to the default toolbar
        $provide.decorator('taOptions', ['$delegate', function (taOptions) { // $delegate is the taOptions we are decorating
            taOptions.forceTextAngularSanitize = false;
            return taOptions;
        }]);
    }

    textAngular.$inject = ['$provide'];
    return textAngular;
});

