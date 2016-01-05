package com.puemos.uniq.dao;

import com.puemos.uniq.dto.Group;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Service;

@Service
public interface GroupRepository extends MongoRepository<Group, String> {

    public Group findByTitle(String title);
}