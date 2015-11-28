package com.puemos.uniq.servlet.question;

/**
 * Created by shy on 23/11/15.
 */

import com.puemos.uniq.dto.Client;
import com.puemos.uniq.dto.Question;
import com.puemos.uniq.dto.User;
import com.puemos.uniq.services.QuestionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

import java.security.Principal;
import java.util.Map;

@Component
public class QuestionController implements IQuestionController {

    @Autowired
    QuestionService questionService;


    @Override
    public ResponseEntity<Question> getQuestionDetails(@PathVariable("id") String id) {
        Question question = questionService.findQuestionById(id);
        if (question != null) {
            return new ResponseEntity<Question>(question, HttpStatus.OK);
        } else {
            return ResponseEntity.badRequest().body(null);
        }
    }
    @Override
    public ResponseEntity<String> createQuestion(@RequestBody Map<String, String> requestData, Principal principal) {
        User user = ((Client) principal).getUser();
        questionService.createQuestion(requestData.get("title"), user.getId(), user.getUsername(), requestData.get("groupId"), requestData.get("description"));
        return new ResponseEntity<String>("question_created", HttpStatus.OK);

    }
}
