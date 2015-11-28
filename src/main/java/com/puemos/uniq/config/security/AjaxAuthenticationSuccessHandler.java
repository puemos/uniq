package com.puemos.uniq.config.security;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.puemos.uniq.dto.Client;
import com.puemos.uniq.dto.User;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;

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
public class AjaxAuthenticationSuccessHandler implements AuthenticationSuccessHandler {


    private AuthenticationSuccessHandler defaultHandler;

    public AjaxAuthenticationSuccessHandler(AuthenticationSuccessHandler defaultHandler) {
        this.defaultHandler = defaultHandler;
    }

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request,
                                        HttpServletResponse response,
                                        Authentication authentication) throws IOException, ServletException {

        if ("true".equals(request.getHeader("X-Login-Ajax-call"))) {
            ObjectMapper mapper = new ObjectMapper();
            User user = ((Client) authentication.getPrincipal()).getUser();
            user.setPassword("");
            String userJson = mapper.writeValueAsString(user);
            response.setStatus(HttpServletResponse.SC_OK);
            response.getWriter().print(userJson);
            response.getWriter().flush();
        }
        else {
            defaultHandler.onAuthenticationSuccess(request, response, authentication);
        }

    }



}