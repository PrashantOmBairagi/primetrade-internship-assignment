package com.primetrade.assignment.auth;

import com.primetrade.assignment.enumeration.Role;
import lombok.Data;

@Data
public class RegisterRequest {

    private String email;
    private String password;
    private Role role;

    public RegisterRequest() {
    }

    public RegisterRequest(String email, String password, Role role) {
        this.email = email;
        this.password = password;
        this.role = role;
    }

}
