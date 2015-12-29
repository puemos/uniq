define(function (require) {
    'use strict';
    require("UserService");
    function searchController(UserService) {
        var self = this;
        // list of `state` value/display objects
        self.selectedItem = null;
        self.searchText = null;
        self.contacts = [];
        self.querySearch = querySearch;
        function querySearch(query) {
            return UserService.searchUsers(query).then(
                function (data) {
                    return proccesResult(data);
                },
                function (msg) {
                    console.log(msg);
                });
        }

        function proccesResult(contacts) {
            function caseFix(str) {
                return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
            }
            return contacts.map(function (c) {
                var contact = {
                    name: caseFix(c.lastname) + ", " + caseFix(c.firstname),
                    email: c.username,
                    id: c.id,
                    username: c.username
                };
                return contact;
            });
        }
    }

    searchController.$inject = ['UserService'];
    return searchController;
})
;
