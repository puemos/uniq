package com.puemos.uniq.dto;

import org.springframework.data.annotation.Id;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.format.annotation.DateTimeFormat.ISO;

import java.util.Date;
import java.util.List;
import java.util.Map;


public class Question {

    @Id
    private String id;
    private String userId;
    private String username;
    private String title;
    private String description;
    private Map<String, String> answers;
    private String groupId;
    private int rate;
    private List<String> voteUsers;
    @DateTimeFormat(iso = ISO.DATE_TIME)
    private Date createdDate;
    @DateTimeFormat(iso = ISO.DATE_TIME)
    private Date updateDate;

    public Question() {
    }

    public Question(String title, String userId, String username, String description,
                    String groupId, Map<String, String> answers, int rate, List<String> voteUsers,
                    Date createdDate, Date updateDate) {
        this.userId = userId;
        this.username = username;
        this.title = title;
        this.description = description;
        this.answers = answers;
        this.groupId = groupId;
        this.rate = rate;
        this.voteUsers = voteUsers;
        this.createdDate = createdDate;
        this.updateDate = updateDate;
    }

    public String getId() {
        return id;
    }
    public void setId(String id) {
        this.id = id;
    }
    public String getUserId() {
        return userId;
    }
    public void setUserId(String userId) {
        this.userId = userId;
    }
    public String getUsername() {
        return username;
    }
    public void setUsername(String username) {
        this.username = username;
    }
    public String getTitle() {
        return title;
    }
    public void setTitle(String title) {
        this.title = title;
    }
    public String getDescription() {
        return description;
    }
    public void setDescription(String description) {
        this.description = description;
    }
    public Map<String, String> getAnswers() {
        return answers;
    }
    public void setAnswers(Map<String, String> answers) {
        this.answers = answers;
    }
    public String getGroupId() {
        return groupId;
    }
    public void setGroupId(String groupId) {
        this.groupId = groupId;
    }
    public int getRate() {
        return rate;
    }
    public void setRate(int rate) {
        this.rate = rate;
    }
    public List<String> getVoteUsers() {
        return voteUsers;
    }
    public void setVoteUsers(List<String> voteUsers) {
        this.voteUsers = voteUsers;
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
    public void addVoteUser(String userId) {
        this.voteUsers.add(userId);
    }

    public void removeVoteUser(String userId) {
        this.voteUsers.remove(userId);
    }

    public void addAnswer(String answerId, String answerTitle) {
        this.answers.put(answerId, answerTitle);
    }

    public void removeAnswer(String answerId) {
        this.answers.remove(answerId);
    }

    public void updateRate(boolean vote){
        if (vote) {
            this.rate++;
        }else{
            this.rate--;
        }
    }
} // class Question
