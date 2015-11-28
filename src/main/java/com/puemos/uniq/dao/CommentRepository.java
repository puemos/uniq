package com.puemos.uniq.dao;

import com.puemos.uniq.dto.Comment;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface CommentRepository extends MongoRepository<Comment, String> {

    public List<Comment> findByTitle(String title);
}