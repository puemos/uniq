package com.puemos.uniq.servlet.question;

import com.puemos.uniq.dto.Group;
import com.puemos.uniq.dto.Question;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.Map;

/**
 * Created by shy on 23/11/15.
 * REST service for Users - allows to update, create and search for users
 */
@Controller
public interface IQuestionController {


    @RequestMapping(value = "/question/{id}", method = RequestMethod.GET)
    @PreAuthorize("hasRole('ROLE_USER')")
    @ResponseBody
    ResponseEntity<Question> getQuestionDetails(@PathVariable("id") String id);

    @RequestMapping(value = "/question", method = RequestMethod.POST)
    @PreAuthorize("hasRole('ROLE_USER')")
    ResponseEntity<String> createQuestion(@RequestBody Map<String, String> requestData, Principal principal);

}
