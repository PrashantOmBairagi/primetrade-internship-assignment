package com.primetrade.assignment.user;

import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, String> {
    // JpaRepository already provides:
    // 1. Optional<User> findById(String username) - to fetch a user by username.
    // 2. boolean existsById(String username) - to check if a username already exists.
}
