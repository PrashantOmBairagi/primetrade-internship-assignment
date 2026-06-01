package com.primetrade.assignment.auth;

import com.primetrade.assignment.enumeration.Role;
import com.primetrade.assignment.user.User;
import com.primetrade.assignment.user.UserRepository;
import com.primetrade.assignment.security.JwtService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/auth")
@Tag(name = "Authentication", description = "User Registration and Login Endpoints")
public class AuthController {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    public AuthController(UserRepository userRepository, 
                          PasswordEncoder passwordEncoder, 
                          JwtService jwtService, 
                          AuthenticationManager authenticationManager) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
        this.authenticationManager = authenticationManager;
    }

    @PostMapping("/register")
    @Operation(summary = "Register user", description = "Creates account, hashes password, and issues JWT.")
    public ResponseEntity<?> register(@RequestBody RegisterRequest request) {
        if (userRepository.existsById(request.getEmail())) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body("Email already exists!");
        }

        Role userRole = request.getRole() != null ? request.getRole() : Role.ROLE_USER;

        User user = new User(
                request.getEmail(),
                passwordEncoder.encode(request.getPassword()),
                userRole
        );

        userRepository.save(user);

        String token = jwtService.generateToken(user);

        return ResponseEntity.status(HttpStatus.CREATED).body(
                new AuthResponse(token, user.getEmail(), user.getRole())
        );
    }

    @PostMapping("/login")
    @Operation(summary = "Authenticate user", description = "Verifies password and issues JWT.")
    public ResponseEntity<?> login(@RequestBody AuthRequest request) {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
            );
        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .body("Invalid email or password!");
        }

        User user = userRepository.findById(request.getEmail()).orElseThrow();
        String token = jwtService.generateToken(user);

        return ResponseEntity.ok(
                new AuthResponse(token, user.getEmail(), user.getRole())
        );
    }
}
