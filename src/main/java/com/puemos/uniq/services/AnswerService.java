package com.puemos.uniq.services;

import com.puemos.uniq.dao.AnswerRepository;
import com.puemos.uniq.dto.Answer;
import com.puemos.uniq.exceptions.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;


/**
 * Business service for Answer entity related operations
 */
@Service
public class AnswerService {

    private static final int INIT_RATE = 0;

    @Autowired
    private AnswerRepository answerRepository;

    @Autowired
    private QuestionService questionService;

    /**
     * add Answer to the Answer
     *
     * @param answerId    - the currently Answer
     * @param description - the new description
     */
    @Transactional
    public void updateDescriptionAnswer(String answerId, String description) throws NotFoundException {
        Answer answer = answerRepository.findOne(answerId);
        if (answer == null) {
            throw new NotFoundException("no_such_answer");
        }
        answer.setDescription(description);
        answerRepository.save(answer);
    }

    /**
     * add vote to the Answer
     *
     * @param answerId - the currently Answer
     * @param userId   - the currently Answer
     * @param vote     - the new description
     */
    @Transactional
    public void addVoteToAnswer(String answerId, String userId, boolean vote) throws NotFoundException {
        Answer answer = answerRepository.findOne(answerId);

        if (answer == null) {
            throw new NotFoundException("no_such_answer");
        }
        answer.addVoteUser(userId);
        answer.updateRate(vote);
        answerRepository.save(answer);
    }

    /**
     * creates a new Answer in the database
     *
     * @param title       - the title of the new group answers
     * @param userId      - the Id of the user how created the Answer
     * @param username    - the username of the user how created the Answer
     * @param questionId  - the id of the question parent
     * @param description - the description of the group parent Answer
     */
    @Transactional
    public void createAnswer(String title, String userId, String username, String questionId, String description) throws NotFoundException {

        Answer answer = new Answer(title, userId, username, questionId,
                description, new Date(), INIT_RATE, new ArrayList<>());
        answerRepository.save(answer);
        questionService.addAnswerToQuestion(questionId, answer);
    }

    @Transactional(readOnly = true)
    public List<Answer> findAnswerByTitle(String title) {
        return answerRepository.findByTitle(title);
    }

    @Transactional(readOnly = true)
    public Answer findAnswerById(String answerId) {
        return answerRepository.findOne(answerId);
    }


}