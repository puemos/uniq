package com.puemos.uniq.servlet.group;

import com.puemos.uniq.dto.Group;
import com.puemos.uniq.dto.Question;
import com.puemos.uniq.exceptions.InputException;
import com.puemos.uniq.exceptions.NotFoundException;
import com.puemos.uniq.exceptions.UserNotInGroupException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;
import java.util.Map;

/**
 * Created by shy on 23/11/15.
 * REST service for Users - allows to update, create and search for users
 */
@Controller
public interface IGroupController {


    @RequestMapping(value = "/group/{id}", method = RequestMethod.GET)
    @PreAuthorize("hasRole('ROLE_USER')")
    ResponseEntity<Group> getGroupDetails(Principal principal, @PathVariable("id") String id) throws UserNotInGroupException, NotFoundException;

    @RequestMapping(value = "/group", method = RequestMethod.POST)
    @PreAuthorize("hasRole('ROLE_USER')")
    ResponseEntity<String> createGroup(Principal principal, @RequestBody Map<String, Object> requestData) throws NotFoundException;

    @RequestMapping(value = "/group", method = RequestMethod.DELETE)
    @PreAuthorize("hasRole('ROLE_USER')")
    ResponseEntity<String> deleteGroup(Principal principal, @RequestBody Map<String, String> requestData) throws NotFoundException, InputException;

    @RequestMapping(value = "/group/{id}/questions", method = RequestMethod.POST, consumes = "application/json")
    @PreAuthorize("hasRole('ROLE_USER')")
    ResponseEntity<Page<Question>> getGroupQuestions(@RequestBody Map<String, Object> requestData, @PathVariable("id") String id) throws NotFoundException;

}
