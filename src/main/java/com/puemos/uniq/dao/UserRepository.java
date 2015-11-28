package com.puemos.uniq.dao;

import com.puemos.uniq.dto.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.querydsl.QueryDslPredicateExecutor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface UserRepository extends MongoRepository<User, String> {

    public User findById(String id);

    public User findByUsername(String username);

    List<User> findByUsernameLikeOrderByUsername(String regexp);

}