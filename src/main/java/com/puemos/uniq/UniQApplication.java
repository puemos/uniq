package com.puemos.uniq;

import com.puemos.uniq.services.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class UniQApplication {


    public static void main(String[] args) {
        SpringApplication.run(UniQApplication.class, args);
    }
}
