package com.puemos.uniq.services;

import com.puemos.uniq.dao.GroupRepository;
import com.puemos.uniq.dto.Group;
import com.puemos.uniq.dto.Question;
import com.puemos.uniq.dto.User;
import com.puemos.uniq.exceptions.GroupNotFoundException;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.bind.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import sun.net.www.protocol.http.AuthenticationInfo;

import java.security.Principal;
import java.util.Date;
import java.util.HashMap;


/**
 * Business service for Group entity related operations
 */
@Service
public class GroupService {


    @Autowired
    private GroupRepository groupRepository;


    @Autowired
    private UserService userService;


    /**
     * add user to the group
     *
     * @param userId   - the new user Id
     * @param username - the new user username
     * @param groupId  - the currently group
     */
    @Transactional
    public void addUserToGroup(@AuthenticationPrincipal User activeUser, String userId, String username, String groupId) {
        Group group = groupRepository.findOne(groupId);

        if (group != null) {
            group.addUser(userId, username);
        } else {
        }
        groupRepository.save(group);
    }

    /**
     * add admin to the group
     *
     * @param adminId       - the new admin Id
     * @param adminUsername - the new admin username
     * @param groupId       - the currently group
     */
    @Transactional
    public void addAdminToGroup(String adminId, String adminUsername, String groupId) {
        Group group = groupRepository.findOne(groupId);

        if (group != null) {
            group.addUser(adminId, adminUsername);
        } else {
        }
        groupRepository.save(group);
    }

    /**
     * add admin to the group
     *
     * @param groupId       - the currently group
     * @param question       - the question
     */
    @Transactional
    public void addQuestionToGroup(String groupId, Question question) {
        Group group = groupRepository.findOne(groupId);

        if (group != null) {
            group.addQuestion(question.getId(),question.getTitle());
        } else {
        }
        groupRepository.save(group);
    }

    /**
     * creates a new group in the database
     *
     * @param title    - the title of the new group
     * @param userId   - the Id of the user how created the group
     * @param username - the username of the user how created the group
     */
    @Transactional
    public void createGroup(String title, String userId, String username) {


        if (!isGroupTitleAvailable(username)) {
            throw new IllegalArgumentException("group_title_unavailable");
        }

        Group group = new Group(title,
                new HashMap<String, String>(),
                new HashMap<String, String>(),
                new HashMap<String, String>(),
                new Date());
        group.addAdmin(userId, username);
        group.addUser(userId, username);
        groupRepository.save(group);
        userService.addGroupToUser(userId,group.getId(),group.getTitle());
    }

    @Transactional(readOnly = true)
    public Group findGroupByTitle(String title) throws GroupNotFoundException {
        Group group = groupRepository.findByTitle(title);
        if (group == null){
            throw new GroupNotFoundException("no_such_group");
        }
        return group;
    }

    @Transactional(readOnly = true)
    public Group findGroupById(String groupId) throws GroupNotFoundException {
        Group group = groupRepository.findOne(groupId);
        if (group == null){
            throw new GroupNotFoundException("no_such_group");
        }
        return group;
    }

    private boolean isGroupTitleAvailable(String groupTitle) {
        Group group = groupRepository.findByTitle(groupTitle);
        return (group == null);
    }


}