package com.puemos.uniq.services;

import com.puemos.uniq.dao.CommentRepository;
import com.puemos.uniq.dto.Comment;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.List;


/**
 * Business service for Comment entity related operations
 */
@Service
public class CommentService {


    @Autowired
    private CommentRepository CommentRepository;

    @Autowired
    private QuestionService questionService;

    /**
     * add Comment to the Comment
     *
     * @param CommentId   - the currently Comment
     * @param description - the new description
     */
    @Transactional
    public void updateDescriptionComment(String CommentId, String description) {
        Comment Comment = CommentRepository.findOne(CommentId);

        if (Comment != null) {
            Comment.setDescription(description);
        } else {
        }
        CommentRepository.save(Comment);
    }
    /**
     * creates a new Comment in the database
     *
     * @param title       - the title of the new group
     * @param userId      - the Id of the user how created the Comment
     * @param username    - the username of the user how created the Comment
     * @param questionId  - the id of the question parent
     * @param description - the description of the group parent Comment
     */
    @Transactional
    public void createComment(String title, String userId, String username, String questionId, String description) {

        Comment comment = new Comment(title, userId, username, questionId, description, new Date());
        CommentRepository.save(comment);
        questionService.addComentToQuestion(questionId,comment);
    }

    @Transactional(readOnly = true)
    public List<Comment> findCommentByTitle(String title) {
        return CommentRepository.findByTitle(title);
    }

    @Transactional(readOnly = true)
    public Comment findCommentById(String CommentId) {
        return CommentRepository.findOne(CommentId);
    }


}