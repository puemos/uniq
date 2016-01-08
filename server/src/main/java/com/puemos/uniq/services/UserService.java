package com.puemos.uniq.services;

import com.puemos.uniq.dao.UserRepository;
import com.puemos.uniq.dto.Client;
import com.puemos.uniq.dto.Question;
import com.puemos.uniq.dto.User;
import com.puemos.uniq.exceptions.InputException;
import com.puemos.uniq.exceptions.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.security.Principal;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Set;
import java.util.regex.Pattern;


/**
 * Business service for User entity related operations
 */
@Service
public class UserService {


    private static final Pattern PASSWORD_REGEX = Pattern.compile("(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{6,}");

    private static final Pattern EMAIL_REGEX = Pattern.compile("^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@"
            + "[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$");

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private QuestionService questionService;

    /**
     * add Group to user
     *
     * @param userId     - the currently logged in user
     * @param groupId    - the new group Id
     * @param groupTitle - the new group Title
     */
    @Transactional
    public void addGroupToUser(String userId, String groupId, String groupTitle) throws NotFoundException {
        User user = userRepository.findById(userId);
        if (user == null) {
            throw new NotFoundException("no_such_user");
        }
        user.addGroup(groupId, groupTitle);
        userRepository.save(user);
    }

    /**
     * creates a new user in the database
     *
     * @param username  - the username of the new user
     * @param email     - the user email
     * @param password  - the user plain text password
     * @param firstname - the user first name
     * @param lastname  - the user lastname
     */
    @Transactional
    public void createUser(String username,
                           String email,
                           String password,
                           String firstname,
                           String lastname) throws InputException {


        if (!isUsernameAvailable(username)) {
            throw new InputException("username_unavailable");
        }

        User user = new User(username,
                new BCryptPasswordEncoder().encode(password),
                email,
                firstname,
                lastname,
                new HashMap<>(),
                new ArrayList<>());

        userRepository.save(user);
    }

    @Transactional(readOnly = true)
    public User findUserByUsername(String username) throws NotFoundException {
        User user = userRepository.findByUsername(username);
        if (user == null) {
            throw new NotFoundException("no_such_user");
        }
        return user;
    }

    @Transactional(readOnly = true)
    public User findUserById(String userId) throws NotFoundException {
        User user = userRepository.findById(userId);
        if (user == null) {
            throw new NotFoundException("no_such_user");
        }
        return user;
    }

    @Transactional(readOnly = true)
    public List<User> findAllUsersByUsername(String username) {

        return userRepository.findByUsernameLikeOrderByUsername(username);
    }

    @Transactional(readOnly = true)
    public List<User> findAllUsersByQuery(String query) {

        return userRepository.findFirst10ByLastnameLikeOrFirstnameLikeOrUsernameLikeAllIgnoreCaseOrderByLastnameAsc(query,query,query);
    }

    private boolean isUsernameAvailable(String username) {
        User user = userRepository.findByUsername(username);
        return (user == null);
    }

    @Transactional(readOnly = true)
    public User getCurrentUser(Principal principal) throws NotFoundException {
        String id = ((Client) ((UsernamePasswordAuthenticationToken) principal).getPrincipal()).getUserId();
        return this.findUserById(id);
    }

    /**
     * delete a group from users data
     *
     * @param userIds - the id of the users
     * @param groupId - the id of the group
     */
    @Transactional
    public void deleteGroupFromUsers(Set<String> userIds, String groupId) {
        userIds.forEach((id)-> {
            User user = userRepository.findById(id);
            user.removeGroup(groupId);
            userRepository.save(user);
        });
    }

    /**
     * get the user questions
     *
     * @param userId     - the currently group
     * @param pageRequest
     */
    @Transactional
    public Page<Question> getUserQuestions(String userId, PageRequest pageRequest) throws NotFoundException {
        User user = userRepository.findOne(userId);
        if (user == null) {
            throw new NotFoundException("no_such_user");
        }
        return questionService.findQuestionById(user.getQuestions(), pageRequest);
    }

    /**
     * add question to the User
     *
     * @param userId  - the currently group
     * @param questionId - the question
     */
    @Transactional
    public void addQuestionToUser(String userId, String questionId) throws NotFoundException {
        User user = userRepository.findOne(userId);
        if (user == null) {
            throw new NotFoundException("no_such_user");
        }
        user.addQuestion(questionId);
        userRepository.save(user);
    }

    /**
     * delete a question from users data
     *
     * @param userId - the id of the users
     * @param questionId - the id of the question
     */
    @Transactional
    public void deleteQuestionFromUser(String questionId, String userId) {
        User user = userRepository.findById(userId);
        user.removeQuestion(questionId);
        userRepository.save(user);
    }
}