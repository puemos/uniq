package com.puemos.uniq.dao;

import com.puemos.uniq.dto.Question;
import com.puemos.uniq.dto.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface QuestionRepository extends MongoRepository<Question, String> {

    public List<Question> findByTitle(String title);

    Page<Question> findByIdIn(List<String> ids, Pageable page);

}