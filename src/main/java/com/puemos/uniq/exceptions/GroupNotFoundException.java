package com.puemos.uniq.exceptions;

public class GroupNotFoundException extends Exception
{
    public GroupNotFoundException() {
        super();
    }

    public GroupNotFoundException(String message) {
        super(message);
    }
}