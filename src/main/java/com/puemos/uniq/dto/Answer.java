package com.puemos.uniq.dto;

import org.springframework.data.annotation.Id;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.format.annotation.DateTimeFormat.ISO;

import java.util.Date;
import java.util.List;


public class Answer {

    @Id
    private String id;
    private String userId;
    private String username;
    private String title;
    private String questionId;
    private String description;
    @DateTimeFormat(iso = ISO.DATE)
    private Date createDate;
    private int rate;
    private List<String> voteUsers;

    public Answer() {
    }

    public Answer(String title, String userId, String username, String questionId,
                  String description, Date createDate, int rate, List<String> voteUsers) {
        this.userId = userId;
        this.username = username;
        this.title = title;
        this.questionId = questionId;
        this.description = description;
        this.createDate = createDate;
        this.rate = rate;
        this.voteUsers = voteUsers;
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
    public String getQuestionId() {
        return questionId;
    }
    public void setQuestionId(String questionId) {
        this.questionId = questionId;
    }
    public String getDescription() {
        return description;
    }
    public void setDescription(String description) {
        this.description = description;
    }
    public Date getCreateDate() {
        return createDate;
    }
    public void setCreateDate(Date createDate) {
        this.createDate = createDate;
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

    public void addVoteUser(String userId) {
        this.voteUsers.add(userId);
    }

    public void updateRate(boolean vote){
        if (vote) {
            this.rate++;
        }else{
            this.rate--;
        }
    }
    public void removeVoteUser(String userId) {
        this.voteUsers.remove(userId);
    }
}
