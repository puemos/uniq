package com.puemos.uniq.config.security;

import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 *
 * Authentication success handler for integration with SPA applications that need to login using Ajax instead of
 * a form post.
 *
 * Detects if its a ajax login request, and if so sends a customized response in the body, otherwise defaults
 * to the existing behaviour for none-ajax login attempts.
 *
 */
public class AjaxAuthenticationFailureHandler implements AuthenticationFailureHandler {


    @Override
    public void onAuthenticationFailure(HttpServletRequest request, HttpServletResponse response, AuthenticationException exception) throws IOException, ServletException {
        response.sendError(HttpServletResponse.SC_BAD_REQUEST,"worng_username_password");
    }
}