package com.puemos.uniq.config.security;


import com.allanditzel.springframework.security.web.csrf.CsrfTokenResponseHeaderBindingFilter;
import com.puemos.uniq.UniQApplication;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.authentication.SavedRequestAwareAuthenticationSuccessHandler;
import org.springframework.security.web.csrf.CsrfFilter;
import org.springframework.security.web.csrf.CsrfTokenRepository;
import org.springframework.security.web.csrf.HttpSessionCsrfTokenRepository;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;


/**
 * The Spring Security configuration for the application - its a form login config with authentication via session cookie (once logged in),
 * with fallback to HTTP Basic for non-browser clients.
 * <p>
 * The CSRF token is put on the reply as a header via a filter, as there is no server-side rendering on this app.
 */
@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class AppSecurityConfig extends WebSecurityConfigurerAdapter {


    private static final String INDEX_PATH = UniQApplication.INDEX_PATH;
    private static final String DIST_PATH = UniQApplication.DIST_PATH;
    private static final String LOGOUT_PATH = UniQApplication.LOGOUT_PATH;
    private static final String AUTHENTICATE_PATH = UniQApplication.AUTHENTICATE_PATH;
    private static final String HOME_PATH = UniQApplication.HOME_PATH;
    private static final String CREATE_USER_PATH = UniQApplication.CREATE_USER_PATH;
    private static final String SEARCH_USER_PATH = UniQApplication.SEARCH_USER_PATH;
    private static final String USERNAME_PARAM = UniQApplication.USERNAME_PARAM;
    private static final String PASSWORD_PARAM = UniQApplication.PASSWORD_PARAM;

    @Autowired
    SecUserDetailsService userDetailsService;


    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(userDetailsService).passwordEncoder(new BCryptPasswordEncoder());
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {

        CsrfTokenResponseHeaderBindingFilter csrfTokenFilter = new CsrfTokenResponseHeaderBindingFilter();
        http.addFilterAfter(csrfTokenFilter, CsrfFilter.class);

        http
                .authorizeRequests()
                .antMatchers(DIST_PATH).permitAll()
                .antMatchers(HttpMethod.POST, CREATE_USER_PATH).permitAll()
                .antMatchers(HttpMethod.POST, SEARCH_USER_PATH).permitAll()
                .anyRequest().authenticated()
                .and()
                .exceptionHandling().accessDeniedHandler(new AccessDeniedHandlerImp())
                .and()
                .formLogin()
                .defaultSuccessUrl(HOME_PATH)
                .loginProcessingUrl(AUTHENTICATE_PATH)
                .usernameParameter(USERNAME_PARAM)
                .passwordParameter(PASSWORD_PARAM)
                .successHandler(new AjaxAuthenticationSuccessHandler(new SavedRequestAwareAuthenticationSuccessHandler()))
                .failureHandler(new AjaxAuthenticationFailureHandler())
                .loginPage(INDEX_PATH)
                .and()
                .httpBasic()
                .and()
                .logout()
                .logoutRequestMatcher(new AntPathRequestMatcher(LOGOUT_PATH))
                .and()
                .addFilterAfter(new CsrfHeaderFilter(), CsrfFilter.class)
                .csrf().csrfTokenRepository(csrfTokenRepository());


        if ("true".equals(System.getProperty("httpsOnly"))) {
            http.requiresChannel().anyRequest().requiresSecure();
        }
    }
    private CsrfTokenRepository csrfTokenRepository() {
        HttpSessionCsrfTokenRepository repository = new HttpSessionCsrfTokenRepository();
        repository.setHeaderName("X-XSRF-TOKEN");
        return repository;
    }

}
