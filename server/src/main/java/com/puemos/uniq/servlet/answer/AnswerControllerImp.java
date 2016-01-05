package com.puemos.uniq.servlet.answer;

/**
 * Created by shy on 23/11/15.
 */

import com.puemos.uniq.dto.Answer;
import com.puemos.uniq.dto.User;
import com.puemos.uniq.exceptions.InputException;
import com.puemos.uniq.exceptions.NotFoundException;
import com.puemos.uniq.services.AnswerService;
import com.puemos.uniq.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

import java.security.Principal;
import java.util.Map;

@Component
public class AnswerControllerImp implements IAnswerController {

    @Autowired
    UserService userService;
    @Autowired
    AnswerService answerService;

    @Override
    public ResponseEntity<Answer> getAnswerDetails(@PathVariable("id") String id) {
        Answer answer = answerService.findAnswerById(id);
        return new ResponseEntity<>(answer, HttpStatus.OK);
    }
    @Override
    public ResponseEntity<String> createAnswer(@RequestBody Map<String, String> requestData, Principal principal) throws NotFoundException {
        User user = userService.getCurrentUser(principal);
        answerService.createAnswer(requestData.get("title"), user.getId(), user.getUsername(), requestData.get("questionId"), requestData.get("description"));
        return new ResponseEntity<>("answer_created", HttpStatus.OK);
    }
    @Override
    public ResponseEntity<String> addVoteToAnswer(@RequestBody Map<String, Object> requestData, Principal principal) throws NotFoundException, InputException {
        User user = userService.getCurrentUser(principal);
        answerService.addVoteToAnswer((String) requestData.get("answerId"), user.getId(), (boolean) requestData.get("vote"));
        return new ResponseEntity<>("answer_add_vote", HttpStatus.OK);
    }
}
