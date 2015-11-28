package com.puemos.uniq.exceptions;

public class UnavailableUsernameException extends Exception
{
    public UnavailableUsernameException() {
        super();
    }

    public UnavailableUsernameException(String message) {
        super(message);
    }
}