package com.puemos.uniq.dto;

import org.springframework.data.annotation.Id;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.format.annotation.DateTimeFormat.ISO;

import java.util.Date;
import java.util.Map;


public class Question {

    @Id
    private String id;
    private String userId;
    private String username;
    private String title;
    private String description;
    private Map<String, String> comments;
    private String groupId;

    @DateTimeFormat(iso = ISO.DATE_TIME)
    private Date createdDate;

    @DateTimeFormat(iso = ISO.DATE_TIME)
    private Date updateDate;

    public Question(){}


    public Question(String title, String userId, String username, String groupId, String description, Map<String, String> comments, Date createdDate, Date updateDate) {
        this.userId = userId;
        this.username = username;
        this.title = title;
        this.description = description;
        this.comments = comments;
        this.groupId = groupId;
        this.createdDate = createdDate;
        this.updateDate = updateDate;
    }
    public String getUsername() {
        return username;
    }
    public void setUsername(String username) {
        this.username = username;
    }
    public String getDescription() {
        return description;
    }
    public void setDescription(String description) {
        this.description = description;
    }
    public String getUserId() {
        return userId;
    }
    public void setUserId(String userId) {
        this.userId = userId;
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

    public Map<String, String> getComments() {
        return comments;
    }

    public void setComments(Map<String, String> comments) {
        this.comments = comments;
    }

    public String getGroupId() {
        return groupId;
    }

    public void setGroupId(String groupId) {
        this.groupId = groupId;
    }

    public Date getCreatedDate() {
        return createdDate;
    }

    public void setCreatedDate(Date createdDate) {
        this.createdDate = createdDate;
    }

    public Date getUpdateDate() {
        return updateDate;
    }

    public void setUpdateDate(Date updateDate) {
        this.updateDate = updateDate;
    }

    public void addComment(String commentId, String commentTitle) {
        this.comments.put(commentId, commentTitle);
    }

    public void removeComment(String commentId) {
        this.comments.remove(commentId);
    }
} // class Question
