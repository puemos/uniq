package com.puemos.uniq.servlet.user;

import com.puemos.uniq.dto.User;
import com.puemos.uniq.exceptions.UnavailableUsernameException;
import com.puemos.uniq.exceptions.UserNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;
import java.util.Map;

/**
 * Created by shy on 23/11/15.
 * REST service for Users - allows to update, create and search for users
 */
@Controller
public interface IUserController {

    @RequestMapping("/isin")
    @ResponseStatus(HttpStatus.OK)
    @ResponseBody
    boolean isIn();

    @RequestMapping(value = "/user", method = RequestMethod.GET)
    @PreAuthorize("hasRole('ROLE_USER')")
    @ResponseStatus(HttpStatus.OK)
    @ResponseBody
    ResponseEntity<User> getUserDetails(Authentication authentication) throws UserNotFoundException;

    @RequestMapping(value = "/userQuery", method = RequestMethod.POST)
    @ResponseBody
    ResponseEntity<List<User>> findUsers(@RequestBody Map<String, String> requestData);

    @RequestMapping(value = "/user", method = RequestMethod.POST)
    ResponseEntity<String> createUser(@RequestBody User user) throws IOException, UnavailableUsernameException;

    @ExceptionHandler(UnavailableUsernameException.class)
    @ResponseStatus(value = HttpStatus.CONFLICT)
    @ResponseBody
    String unavailableUsernameHandler(UnavailableUsernameException exc);
}
