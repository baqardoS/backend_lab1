package com.example.backend;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

public class UserEntity {
    private String id;
    private String name;
    private String email;

    @JsonCreator
    public UserEntity(@JsonProperty("id")String id, @JsonProperty("name")String name, @JsonProperty("email")String email){
        this.id = id;
        this.name = name;
        this.email = email;
    }

    public String getId(){
        return id;
    }

    public void setId(String id){
        this.id = id;
    }

    public String getEmail(){
        return email;
    }

    public void setEmail(String email){
        this.email = email;
    }

    public String getName(){
        return name;
    }

    public void setName(String name){
        this.name = name;
    }
}
