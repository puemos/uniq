package com.puemos.uniq.exceptions;

public class UserNotInGroupException extends Exception
{
    public UserNotInGroupException() {
        super();
    }

    public UserNotInGroupException(String message) {
        super(message);
    }
}