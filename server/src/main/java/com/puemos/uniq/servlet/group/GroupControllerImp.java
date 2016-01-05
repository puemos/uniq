package com.puemos.uniq.servlet.group;

/**
 * Created by shy on 23/11/15.
 */

import com.puemos.uniq.dto.Group;
import com.puemos.uniq.dto.Question;
import com.puemos.uniq.dto.User;
import com.puemos.uniq.exceptions.InputException;
import com.puemos.uniq.exceptions.NotFoundException;
import com.puemos.uniq.exceptions.UserNotInGroupException;
import com.puemos.uniq.services.GroupService;
import com.puemos.uniq.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

import java.security.Principal;
import java.util.Map;

@Component
public class GroupControllerImp implements IGroupController {

    @Autowired
    UserService userService;
    @Autowired
    GroupService groupService;

    @Override
    public ResponseEntity<Group> getGroupDetails(Principal principal, @PathVariable("id") String id) throws UserNotInGroupException, NotFoundException {
        User user = userService.getCurrentUser(principal);
        Group group = groupService.findGroupById(id);
        if (!group.getUsers().containsKey(user.getId())) {
            throw new UserNotInGroupException();
        }
        return new ResponseEntity<>(group, HttpStatus.OK);
    }
    @Override
    public ResponseEntity<String> createGroup(Principal principal, @RequestBody Map<String, Object> requestData) throws NotFoundException {
        User user = userService.getCurrentUser(principal);
        Map<String, String> users = (Map<String, String>) requestData.get("users");
        groupService.createGroup((String) requestData.get("title"), user.getId(), user.getUsername(), users);
        return new ResponseEntity<>("group_created", HttpStatus.OK);

    }
    @Override
    public ResponseEntity<String> deleteGroup(Principal principal, @RequestBody Map<String, String> requestData) throws NotFoundException, InputException {
        User user = userService.getCurrentUser(principal);
        groupService.deleteGroup(requestData.get("groupId"), user.getId());
        return new ResponseEntity<>("group_deleted", HttpStatus.OK);

    }
    @Override
    public ResponseEntity<Page<Question>> getGroupQuestions(@RequestBody Map<String, Object> requestData, @PathVariable("id") String id) throws NotFoundException {
        PageRequest pageRequest = new PageRequest((int) requestData.get("page"), (int) requestData.get("size"), Sort.Direction.DESC, "rate");
        Page<Question> questionPage = groupService.getGroupQuestions(id, pageRequest);
        return new ResponseEntity<>(questionPage, HttpStatus.OK);
    }
}
