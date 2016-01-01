define(function (require) {
    'use strict';
    require("ngCSRFToken");
    function CSRFToken(csrfProvider) {
        csrfProvider.config({
            url: '/logout',
            maxRetries: 3,
            csrfHttpType: 'get',
            csrfTokenHeader: 'X-XSRF-TOKEN',
            httpTypes: ['POST'] //CSRF token will be added only to these method types
        });
    };

    CSRFToken.$inject = ['csrfProvider'];
    return CSRFToken;
});

