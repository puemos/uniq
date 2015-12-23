package com.puemos.uniq.dao;

import com.puemos.uniq.dto.Answer;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface AnswerRepository extends MongoRepository<Answer, String> {

    public List<Answer> findByTitle(String title);
}