package com.puemos.uniq.config.root;


import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;

/**
 * The root context configuration of the application - the beans in this context will be globally visible
 * in all servlet contexts.
 */

@Configuration
@ComponentScan({"com.puemos.uniq.services", "com.puemos.uniq.dto",
        " com.puemos.uniq.config.security"})
public class RootContextConfig {


}
