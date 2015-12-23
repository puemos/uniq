define(function () {
    'use strict';
    function theme($mdThemingProvider) {
        var customBlueMap = $mdThemingProvider.extendPalette('light-blue', {
            'contrastDefaultColor': 'light',
            'contrastDarkColors': ['50'],
            '50': 'ffffff'
        });
        $mdThemingProvider.definePalette('customBlue', customBlueMap);
        $mdThemingProvider.theme('default')
            .primaryPalette('customBlue', {
                'default': '500',
                'hue-1': '50'
            })
            .accentPalette('blue')
            .warnPalette('pink');
        $mdThemingProvider.theme('pink', 'default')
            .primaryPalette('pink')
    }

    theme.$inject = ['$mdThemingProvider'];
    return theme;
});

