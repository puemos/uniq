package com.puemos.uniq.servlet;


import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

/**
 * Spring MVC config for the servlet context in the application.
 * <p>
 * The beans of this context are only visible inside the servlet context.
 */
@Configuration
public class ServletContextConfig extends WebMvcConfigurerAdapter {

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/resources/**").addResourceLocations("/resources/");
    }
    @Override
    public void addViewControllers(ViewControllerRegistry registry) {
        registry.addViewController("/").setViewName("forward:/public/app.html");
        registry.addViewController("/home").setViewName("forward:/public/app.html");
        registry.addViewController("/about").setViewName("forward:/public/app.html");
        registry.addViewController("/login").setViewName("forward:/public/app.html");
        registry.addViewController("/userGroups").setViewName("forward:/public/app.html");
        registry.addViewController("/group/**").setViewName("forward:/public/app.html");
        registry.addViewController("/signup").setViewName("forward:/public/app.html");
    }

}
