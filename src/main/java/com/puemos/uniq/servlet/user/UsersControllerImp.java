package com.puemos.uniq.servlet.user;

/**
 * Created by shy on 23/11/15.
 */

import com.puemos.uniq.dto.Client;
import com.puemos.uniq.dto.User;
import com.puemos.uniq.exceptions.UserNotFoundException;
import com.puemos.uniq.services.UserService;
import com.puemos.uniq.exceptions.UnavailableUsernameException;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.RequestBody;

import java.io.IOException;
import java.util.List;
import java.util.Map;

@Component
public class UsersControllerImp implements IUserController {

    private final org.slf4j.Logger log = LoggerFactory.getLogger(this.getClass());

    @Autowired
    UserService userService;

    @Override
    public boolean isIn() {
        return true;
    }

    @Override
    public ResponseEntity<User> getUserDetails(Authentication authentication) throws UserNotFoundException {
        String id = ((Client) authentication.getPrincipal()).getUser().getId();
        User user = userService.findUserById(id);
        return new ResponseEntity<User>(user, HttpStatus.OK);
    }

    @Override
    public ResponseEntity<List<User>> findUsers(@RequestBody Map<String, String> requestData) {
        List<User> users = userService.findAllUsersByUsername(requestData.get("query"));
        users.forEach((user) -> user.prepareForSearch());
        return new ResponseEntity<>(users, HttpStatus.OK);
    }

    @Override
    public ResponseEntity<String> createUser(@RequestBody User user) throws IOException, UnavailableUsernameException {

        userService.createUser(user.getUsername(), user.getEmail(), user.getPassword(),
                user.getFirstname(), user.getLastname());
        return (new ResponseEntity<String>("user created", HttpStatus.OK));

    }

    @Override
    public String unavailableUsernameHandler(UnavailableUsernameException exc) {
        log.error(exc.getMessage());
        return exc.getMessage();
    }
}
