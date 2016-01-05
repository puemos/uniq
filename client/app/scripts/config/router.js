(function () {
    'use strict';
    var router = function ($stateProvider, $urlRouterProvider, $locationProvider) {
        $stateProvider
            .state('home', {
                controller: 'homeController',
                url: '/home',
                templateUrl: '/public/dist/views/home.html',
            })
            .state('dashboard', {
                url: '/dashboard',
                controller: 'dashboardController',
                templateUrl: '/public/dist/views/dashboard.html'
            })
            .state('group', {
                url: '/groupinfo/{groupId}',
                controller: 'groupController',
                templateUrl: '/public/dist/views/group.html'
            })
            .state('about', {
                url: '/about',
                controller: 'loginController',
                templateUrl: '/public/dist/views/about.html'
            });
        $locationProvider
            .html5Mode(true);
        $urlRouterProvider.otherwise('/home');
    };
    router.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider'];
    module.exports = router;
})();

