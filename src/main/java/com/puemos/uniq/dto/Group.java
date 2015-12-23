package com.puemos.uniq.dto;

import org.springframework.data.annotation.Id;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.format.annotation.DateTimeFormat.ISO;

import java.util.Date;
import java.util.List;
import java.util.Map;


public class Group {

    @Id
    private String id;
    private String title;
    private List<String> questions;
    private Map<String,String> users;
    private Map<String,String> admins;
    @DateTimeFormat(iso = ISO.DATE_TIME)
    private Date createdDate;

    public Group(){}

    public Group(String title,
                 List<String> questions,
                 Map<String, String> users,
                 Map<String, String> admins,
                 Date createdDate) {
        this.title = title;
        this.questions = questions;
        this.users = users;
        this.admins = admins;
        this.createdDate = createdDate;
    }

    public Group(String title) {
        this.title = title;
    }
    public Map<String,String> getUsers() {
        return users;
    }
    public void setUsers(Map<String,String> users) {
        this.users = users;
    }
    public Map<String,String> getAdmins() {
        return admins;
    }
    public void setAdmins(Map<String,String> admins) {
        this.admins = admins;
    }
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public List<String> getQuestions() {
        return questions;
    }

    public void setQuestions(List<String> questions) {
        this.questions = questions;
    }

    public Date getCreatedDate() {
        return createdDate;
    }

    public void setCreatedDate(Date createdDate) {
        this.createdDate = createdDate;
    }

    public void addQuestion(String questionId) {
        this.questions.add(questionId);
    }

    public void removeQuestion(String questionId) {
        this.questions.remove(questionId);
    }

    public void addUser(String userId, String username) {
        this.users.put(userId, username);
    }

    public void removeUser(String userId) {
        this.users.remove(userId);
    }

    public void addAdmin(String adminId, String adminUsername) {
        this.admins.put(adminId, adminUsername);
    }

    public void removeAdmin(String adminId) {
        this.admins.remove(adminId);
    }
}
