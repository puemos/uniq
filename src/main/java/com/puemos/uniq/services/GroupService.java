package com.puemos.uniq.services;

import com.puemos.uniq.dao.GroupRepository;
import com.puemos.uniq.dto.Group;
import com.puemos.uniq.dto.Question;
import com.puemos.uniq.dto.User;
import com.puemos.uniq.exceptions.InputException;
import com.puemos.uniq.exceptions.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.web.bind.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;


/**
 * Business service for Group entity related operations
 */
@Service
public class GroupService {

    @Autowired
    private GroupRepository groupRepository;

    @Autowired
    private UserService userService;

    @Autowired
    private QuestionService questionService;


    /**
     * add user to the group
     *
     * @param userId   - the new user Id
     * @param username - the new user username
     * @param groupId  - the currently group
     */
    @Transactional
    public void addUserToGroup(@AuthenticationPrincipal User activeUser, String userId, String username, String groupId) throws NotFoundException, InputException {
        Group group = groupRepository.findOne(groupId);

        if (group == null) {
            throw new NotFoundException("no_such_group");
        }
        if (group.getUsers().containsKey(userId)) {
            throw new InputException("user_already_in_group");
        }
        group.addUser(userId, username);
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
    public void addAdminToGroup(String adminId, String adminUsername, String groupId) throws NotFoundException, InputException {
        Group group = groupRepository.findOne(groupId);

        if (group == null) {
            throw new NotFoundException("no_such_group");
        }
        if (group.getAdmins().containsKey(adminId)) {
            throw new InputException("user_already_in_group");
        }
        group.addUser(adminId, adminUsername);
        groupRepository.save(group);
    }

    /**
     * add admin to the group
     *
     * @param groupId  - the currently group
     * @param question - the question
     */
    @Transactional
    public void addQuestionToGroup(String groupId, Question question) throws NotFoundException {
        Group group = groupRepository.findOne(groupId);
        if (group == null) {
            throw new NotFoundException("no_such_group");
        }
        group.addQuestion(question.getId());
        groupRepository.save(group);
    }

    /**
     * add admin to the group
     *
     * @param groupId - the currently group
     * @param pageRequest
     */
    @Transactional
    public Page<Question> getGroupQuestions(String groupId, PageRequest pageRequest) throws NotFoundException {
        Group group = groupRepository.findOne(groupId);
        if (group == null) {
            throw new NotFoundException("no_such_group");
        }
        return questionService.findQuestionById(group.getQuestions(),pageRequest);
    }

    /**
     * creates a new group in the database
     *
     * @param title    - the title of the new group
     * @param userId   - the Id of the user how created the group
     * @param username - the username of the user how created the group
     */
    @Transactional
    public void createGroup(String title, String userId, String username) throws NotFoundException {


        if (!isGroupTitleAvailable(username)) {
            throw new IllegalArgumentException("group_title_unavailable");
        }

        Group group = new Group(title,
                new ArrayList<>(),
                new HashMap<>(),
                new HashMap<>(),
                new Date());
        group.addAdmin(userId, username);
        group.addUser(userId, username);
        groupRepository.save(group);
        userService.addGroupToUser(userId, group.getId(), group.getTitle());
    }

    @Transactional(readOnly = true)
    public Group findGroupByTitle(String title) throws NotFoundException {
        Group group = groupRepository.findByTitle(title);
        if (group == null) {
            throw new NotFoundException("no_such_group");
        }
        return group;
    }

    @Transactional(readOnly = true)
    public Group findGroupById(String groupId) throws NotFoundException {
        Group group = groupRepository.findOne(groupId);
        if (group == null) {
            throw new NotFoundException("no_such_group");
        }
        return group;
    }

    private boolean isGroupTitleAvailable(String groupTitle) {
        Group group = groupRepository.findByTitle(groupTitle);
        return (group == null);
    }


}