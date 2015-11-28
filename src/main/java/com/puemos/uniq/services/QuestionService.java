package com.puemos.uniq.services;

import com.puemos.uniq.dao.QuestionRepository;
import com.puemos.uniq.dto.Comment;
import com.puemos.uniq.dto.Question;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.HashMap;
import java.util.List;


/**
 * Business service for Question entity related operations
 */
@Service
public class QuestionService {


    @Autowired
    private QuestionRepository questionRepository;
    @Autowired
    private GroupService groupService;

    /**
     * add Comment to the Question
     *
     * @param questionId - the currently question
     * @param comment    - the new comment
     */
    @Transactional
    public void addComentToQuestion(String questionId, Comment comment) {
        Question question = questionRepository.findOne(questionId);

        if (question != null) {
            question.addComment(comment.getId(),comment.getTitle());
        } else {
        }
        questionRepository.save(question);
    }
    /**
     * add Comment to the Question
     *
     * @param questionId  - the currently question
     * @param description - the new description
     */
    @Transactional
    public void updateDescriptionQuestion(String questionId, String description) {
        Question question = questionRepository.findOne(questionId);

        if (question != null) {
            question.setDescription(description);
        } else {
        }
        questionRepository.save(question);
    }
    /**
     * creates a new question in the database
     *
     * @param title       - the title of the new group
     * @param userId      - the Id of the user how created the question
     * @param username    - the username of the user how created the question
     * @param groupId     - the id of the group parent
     * @param description - the description of the group parent question
     */
    @Transactional
    public void createQuestion(String title, String userId, String username, String groupId, String description) {

        Question question = new Question(title, userId, username, groupId, description,
                new HashMap<String, String>(),
                new Date(),
                new Date());
        questionRepository.save(question);
        groupService.addQuestionToGroup(groupId,question);

    }

    @Transactional(readOnly = true)
    public List<Question> findQuestionByTitle(String title) {
        return questionRepository.findByTitle(title);
    }

    @Transactional(readOnly = true)
    public Question findQuestionById(String questionId) {
        return questionRepository.findOne(questionId);
    }


}