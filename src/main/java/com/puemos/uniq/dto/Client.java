package com.puemos.uniq.dto;

import java.util.HashSet;
import java.util.Set;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;


public class Client implements UserDetails {

    /**
     *
     */
    private User user;
    private static final long serialVersionUID = 1L;
    private String password;
    private String userId;
    private String username;
    private String role;

    private boolean isAccountNonExpired = true;
    private boolean isAccountNonLocked = true;
    private boolean isCredentialsNonExpired = true;
    private boolean isEnabled = true;

    public Client() {}
        public Client(User user) {
        this.user = user;
        this.password = user.getPassword();
        this.userId = user.getId();
        this.username = user.getUsername();
        this.role = user.getRole();

    }

    public String getUserId() {
        return userId;
    }
    public void setUserId(String userId) {
        this.userId = userId;
    }
    @Override
    public Set<GrantedAuthority> getAuthorities() {
        Set<GrantedAuthority> authorities = new HashSet<GrantedAuthority>();
        authorities.add(new SimpleGrantedAuthority(this.role));
        return authorities;
    }


    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    @Override
    public boolean isAccountNonExpired() {

        return isAccountNonExpired;
    }

    @Override
    public boolean isAccountNonLocked() {

        return isAccountNonLocked;
    }

    @Override
    public boolean isCredentialsNonExpired() {

        return isCredentialsNonExpired;
    }

    @Override
    public boolean isEnabled() {

        return isEnabled;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }


}