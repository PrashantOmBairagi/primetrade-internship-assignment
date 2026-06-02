package com.primetrade.assignment.auth;

import com.primetrade.assignment.enumeration.Role;
import lombok.Data;

@Data
public class AuthResponse {

    private String token;
    private String email;
    private Role role;

    public AuthResponse() {
    }

    public AuthResponse(String token, String email, Role role) {
        this.token = token;
        this.email = email;
        this.role = role;
    }

}
