package com.puemos.uniq.config.db;

import com.mongodb.MongoClient;
import com.mongodb.MongoClientURI;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.mongodb.MongoDbFactory;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.SimpleMongoDbFactory;



@Configuration
public class MongoDbConfig {
  
  public @Bean MongoDbFactory mongoDbFactory() throws Exception {
    MongoClient mongo = new MongoClient(
            new MongoClientURI( "mongodb://puemos:BBBbeat@ds047792.mongolab.com:47792/demo")
    );
    SimpleMongoDbFactory mongoDb = new SimpleMongoDbFactory(mongo, "demo");
    return mongoDb;
  }

  public @Bean MongoTemplate mongoTemplate() throws Exception {
    return new MongoTemplate(mongoDbFactory());
  }
  
  

}
