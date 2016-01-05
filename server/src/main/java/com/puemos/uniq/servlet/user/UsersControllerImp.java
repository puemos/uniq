package com.puemos.uniq.servlet.user;

/**
 * Created by shy on 23/11/15.
 */

import com.puemos.uniq.dto.Question;
import com.puemos.uniq.dto.User;
import com.puemos.uniq.exceptions.InputException;
import com.puemos.uniq.exceptions.NotFoundException;
import com.puemos.uniq.services.UserService;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

import java.io.IOException;
import java.security.Principal;
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
    public ResponseEntity<User> getUserDetails(Principal principal) throws NotFoundException {
        User user = userService.getCurrentUser(principal);
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    @Override
    public ResponseEntity<List<User>> findUsers(@RequestBody Map<String, String> requestData) {
        List<User> users = userService.findAllUsersByQuery(requestData.get("query"));
        users.forEach(User::prepareForSearch);
        return new ResponseEntity<>(users, HttpStatus.OK);
    }

    @Override
    public ResponseEntity<String> createUser(@RequestBody User user) throws IOException, InputException {

        userService.createUser(user.getUsername(), user.getEmail(), user.getPassword(),
                user.getFirstname(), user.getLastname());
        return (new ResponseEntity<>("user created", HttpStatus.OK));

    }

    @Override
    public ResponseEntity<Page<Question>> getUserQuestions(@RequestBody Map<String, Integer> requestData,Principal principal) throws NotFoundException {
        PageRequest pageRequest = new PageRequest(requestData.get("page"),requestData.get("size"), Sort.Direction.DESC,"rate");
        String id = userService.getCurrentUser(principal).getId();
        Page<Question> questionPage = userService.getUserQuestions(id, pageRequest);
        return new ResponseEntity<>(questionPage, HttpStatus.OK);
    }

    @Override
    public String unavailableUsernameHandler(InputException exc) {
        log.error(exc.getMessage());
        return exc.getMessage();
    }
}
