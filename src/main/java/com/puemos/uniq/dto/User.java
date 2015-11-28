package com.puemos.uniq.dto;

import java.util.HashMap;
import java.util.Map;

import org.springframework.data.annotation.Id;


public class User {

    @Id
    private String id;
    private String username;
    private String email;
    private String password;
    private String firstname;
    private String lastname;
    private String role;
    private Map<String,String> groups;


    public User(User user) {
        this.id = user.getId();
        this.username = user.getUsername();
        this.email = user.getEmail();
        this.password = user.getPassword();
        this.firstname = user.getFirstname();
        this.lastname = user.getLastname();
        this.role = "ROLE_USER";
        this.groups = user.getGroups();
    }


    public User(String username,
                String password,
                String email,
                String firstname,
                String lastname,
                Map<String, String> groups) {
        this.username = username;
        this.email = email;
        this.password = password;
        this.firstname = firstname;
        this.lastname = lastname;
        this.role = "ROLE_USER";
        this.groups = groups;
    }

    public User(String username,
                String email,
                String password,
                String firstname,
                String lastname) {
        this.username = username;
        this.password = password;
        this.email = email;
        this.firstname = firstname;
        this.lastname = lastname;
        this.role = "ROLE_USER";
    }

    public User() {
    }

    public Map<String, String> getGroups() {
        return groups;
    }
    public void setGroups(Map<String, String> groups) {
        this.groups = groups;
    }
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getFirstname() {
        return firstname;
    }

    public void setFirstname(String firstname) {
        this.firstname = firstname;
    }

    public String getLastname() {
        return lastname;
    }

    public void setLastname(String lastname) {
        this.lastname = lastname;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public void addGroup(String groupId,String groupTitle) {
        this.groups.put(groupId,groupTitle);
    }

    public void removeGroup(String groupId) {
        this.groups.remove(groupId);
    }

    public void prepareForSearch(){
        this.groups = null;
        this.password = null;
        this.id = null;
    }

} // class User
