package com.puemos.uniq.servlet;


import com.puemos.uniq.UniQApplication;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

/**
 * Spring MVC config for the servlet context in the application.
 * <p>
 * The beans of this context are only visible inside the servlet context.
 */
@Configuration
public class ServletContextConfig extends WebMvcConfigurerAdapter {

    private static final String INDEX_PATH = UniQApplication.INDEX_PATH;

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/resources/**").addResourceLocations("/resources/");
    }
    @Override
    public void addViewControllers(ViewControllerRegistry registry) {
        List<String> paths = new ArrayList<>();
        paths.addAll(Arrays.asList("/","/home","/about","/login","/dashboard","/group/**"));
        paths.forEach(path -> {
            registry.addViewController(path).setViewName("forward:" + INDEX_PATH);

        });
    }

}
