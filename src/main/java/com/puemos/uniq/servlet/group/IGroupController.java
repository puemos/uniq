package com.puemos.uniq.servlet.group;

import com.puemos.uniq.dto.Group;
import com.puemos.uniq.exceptions.GroupNotFoundException;
import com.puemos.uniq.exceptions.UserNotInGroupException;
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
public interface IGroupController {


    @RequestMapping(value = "/group/{id}", method = RequestMethod.GET)
    @PreAuthorize("hasRole('ROLE_USER')")
    @ResponseBody
    ResponseEntity<Group> getGroupDetails(Principal principal, @PathVariable("id") String id) throws GroupNotFoundException, UserNotInGroupException;

    @RequestMapping(value = "/group", method = RequestMethod.POST)
    @PreAuthorize("hasRole('ROLE_USER')")
    ResponseEntity<String> createGroup(Principal principal, @RequestBody Map<String, String> requestData);

}
