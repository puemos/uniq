package com.puemos.uniq.servlet.answer;

import com.puemos.uniq.dto.Answer;
import com.puemos.uniq.exceptions.InputException;
import com.puemos.uniq.exceptions.NotFoundException;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.Map;

/**
 * Created by shy on 23/11/15.
 * REST service for Users - allows to update, create and search for users
 */
@Controller
public interface IAnswerController {


    @RequestMapping(value = "/answer/{id}", method = RequestMethod.GET)
    @PreAuthorize("hasRole('ROLE_USER')")
    @ResponseBody
    ResponseEntity<Answer> getAnswerDetails(@PathVariable("id") String id);

    @RequestMapping(value = "/answer", method = RequestMethod.POST)
    @PreAuthorize("hasRole('ROLE_USER')")
    ResponseEntity<String> createAnswer(@RequestBody Map<String, String> requestData, Principal principal) throws NotFoundException;

    @RequestMapping(value = "/aaddvote", method = RequestMethod.POST)
    @PreAuthorize("hasRole('ROLE_USER')")
    ResponseEntity<String> addVoteToAnswer(@RequestBody Map<String, Object> requestData, Principal principal) throws NotFoundException, InputException;
}