package com.puemos.uniq.servlet.question;

/**
 * Created by shy on 23/11/15.
 */

import com.puemos.uniq.dto.Client;
import com.puemos.uniq.dto.Question;
import com.puemos.uniq.dto.User;
import com.puemos.uniq.exceptions.InputException;
import com.puemos.uniq.exceptions.NotFoundException;
import com.puemos.uniq.services.QuestionService;
import com.puemos.uniq.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

import java.security.Principal;
import java.util.Map;

@Component
public class QuestionControllerImp implements IQuestionController {

    @Autowired
    UserService userService;
    @Autowired
    QuestionService questionService;


    @Override
    public ResponseEntity<Question> getQuestionDetails(@PathVariable("id") String id) {
        Question question = questionService.findQuestionById(id);
        return new ResponseEntity<>(question, HttpStatus.OK);
    }
    @Override
    public ResponseEntity<String> createQuestion(@RequestBody Map<String, String> requestData, Principal principal) throws NotFoundException {
        User user = userService.getCurrentUser(principal);
        questionService.createQuestion(requestData.get("title"), user.getId(), user.getUsername(), requestData.get("groupId"), requestData.get("description"));
        return new ResponseEntity<>("question_created", HttpStatus.OK);

    }
    @Override
    public ResponseEntity<String> addVoteToQuestion(@RequestBody Map<String, Object> requestData, Principal principal) throws NotFoundException, InputException {
        User user = userService.getCurrentUser(principal);
        questionService.addVoteToQuestion((String) requestData.get("questionId"), user.getId(), (boolean) requestData.get("vote"));
        return new ResponseEntity<>("question_add_vote", HttpStatus.OK);

    }
}
