package com.puemos.uniq;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class UniQApplication {
    public static final String INDEX_PATH = "/public/dist/index.html";
    public static final String DIST_PATH = "/public/dist/**";
    public static final String LOGOUT_PATH = "/logout";
    public static final String AUTHENTICATE_PATH = "/authenticate";
    public static final String HOME_PATH = "/home";
    public static final String CREATE_USER_PATH = "/user";
    public static final String SEARCH_USER_PATH = "/userQuery";
    public static final String USERNAME_PARAM = "username";
    public static final String PASSWORD_PARAM = "password";

    public static void main(String[] args) {
        SpringApplication.run(UniQApplication.class, args);
    }
}
