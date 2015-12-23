define(function (require) {
    'use strict';
    require("AuthService");
    function searchController(AuthService) {
        var self = this;
        // list of `state` value/display objects
        self.selectedItem = null;
        self.searchText = null;
        self.querySearch = querySearch;

        function querySearch (query) {
            AuthService.searchUsers(query).then(
                function (data) {
                    self.searchUsersResult = data;
                },
                function (msg) {
                    console.log(msg);
                });
        }
    }

    searchController.$inject = ['AuthService'];
    return searchController;
})
;
