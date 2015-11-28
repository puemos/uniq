package com.puemos.uniq.dao;

import com.puemos.uniq.dto.Question;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface QuestionRepository extends MongoRepository<Question, String> {

    public List<Question> findByTitle(String title);
}