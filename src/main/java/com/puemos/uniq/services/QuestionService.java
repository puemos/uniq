package com.puemos.uniq.services;

import com.puemos.uniq.dao.QuestionRepository;
import com.puemos.uniq.dto.Answer;
import com.puemos.uniq.dto.Question;
import com.puemos.uniq.exceptions.InputException;
import com.puemos.uniq.exceptions.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;


/**
 * Business service for Question entity related operations
 */
@Service
public class QuestionService {


    private static final int INIT_RATE = 0;
    @Autowired
    private QuestionRepository questionRepository;
    @Autowired
    private GroupService groupService;

    /**
     * add Answer to the Question
     *
     * @param questionId - the currently question
     * @param answer     - the new answer
     */
    @Transactional
    public void addAnswerToQuestion(String questionId, Answer answer) throws NotFoundException {
        Question question = questionRepository.findOne(questionId);

        if (question == null) {
            throw new NotFoundException("no_such_answer");
        }
        question.addAnswer(answer.getId(), answer.getTitle());
        questionRepository.save(question);
    }
    /**
     * add Answer to the Question
     *
     * @param questionId  - the currently question
     * @param description - the new description
     */
    @Transactional
    public void updateDescriptionQuestion(String questionId, String description) throws NotFoundException {
        Question question = questionRepository.findOne(questionId);
        if (question == null) {
            throw new NotFoundException("no_such_answer");
        }
        question.setDescription(description);
        questionRepository.save(question);
    }

    /**
     * add vote to the Question
     *
     * @param questionId - the currently Answer
     * @param userId     - the currently Answer
     * @param vote       - the new description
     */
    @Transactional
    public void addVoteToQuestion(String questionId, String userId, boolean vote) throws NotFoundException, InputException {
        Question question = questionRepository.findOne(questionId);

        if (question == null) {
            throw new NotFoundException("no_such_answer");
        }
        if (question.getVoteUsers().contains(userId)) {
            throw new InputException("user_already_vote");
        }
        question.addVoteUser(userId);
        question.updateRate(vote);
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
    public void createQuestion(String title, String userId, String username, String groupId, String description) throws NotFoundException {

        Question question = new Question(title, userId, username, description, groupId,
                new HashMap<>(), INIT_RATE, new ArrayList<>(), new Date(), new Date());
        questionRepository.save(question);
        groupService.addQuestionToGroup(groupId, question);

    }

    @Transactional(readOnly = true)
    public List<Question> findQuestionByTitle(String title) {
        return questionRepository.findByTitle(title);
    }

    @Transactional(readOnly = true)
    public Question findQuestionById(String questionId) {
        return questionRepository.findOne(questionId);
    }

    @Transactional(readOnly = true)
    public Page<Question> findQuestionById(List<String> questionsIds, Pageable pageRequest) {
        Page<Question> questionPage = questionRepository.findByIdIn(questionsIds, pageRequest);
        return questionPage;
    }

}