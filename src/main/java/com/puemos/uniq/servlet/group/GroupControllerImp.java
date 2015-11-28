package com.puemos.uniq.servlet.group;

/**
 * Created by shy on 23/11/15.
 */

import com.puemos.uniq.dto.Client;
import com.puemos.uniq.dto.Group;
import com.puemos.uniq.dto.User;
import com.puemos.uniq.services.GroupService;
import com.puemos.uniq.exceptions.GroupNotFoundException;
import com.puemos.uniq.exceptions.UserNotInGroupException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

import java.security.Principal;
import java.util.Map;

@Component
public class GroupControllerImp implements IGroupController {

    @Autowired
    GroupService groupService;

    @Override
    public ResponseEntity<Group> getGroupDetails(Principal principal, @PathVariable("id") String id) throws GroupNotFoundException, UserNotInGroupException {
        String userId = ((Client) ((UsernamePasswordAuthenticationToken) principal).getPrincipal()).getUserId();
        Group group = groupService.findGroupById(id);
        if (!group.getUsers().containsKey(userId)) {
            throw new UserNotInGroupException();
        }
        return new ResponseEntity<Group>(group, HttpStatus.OK);
    }
    @Override
    public ResponseEntity<String> createGroup(Principal principal , @RequestBody Map<String, String> requestData) {
        String userId = ((Client) ((UsernamePasswordAuthenticationToken) principal).getPrincipal()).getUserId();
        String username = ((Client) ((UsernamePasswordAuthenticationToken) principal).getPrincipal()).getUsername();
        groupService.createGroup(requestData.get("title"), userId, username);
        return new ResponseEntity<String>("group_created", HttpStatus.OK);

    }
}
