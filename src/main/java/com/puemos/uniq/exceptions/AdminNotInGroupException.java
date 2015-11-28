package com.puemos.uniq.exceptions;

public class AdminNotInGroupException extends Exception
{
    public AdminNotInGroupException() {
        super();
    }

    public AdminNotInGroupException(String message) {
        super(message);
    }
}