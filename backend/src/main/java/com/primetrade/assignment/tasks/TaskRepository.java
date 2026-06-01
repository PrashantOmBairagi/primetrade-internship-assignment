package com.primetrade.assignment.tasks;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface TaskRepository extends JpaRepository<Task, Long> {
    
    // CUSTOM QUERY METHOD:
    // Spring Data JPA reads this and traverses: Task -> User -> Email.
    // It automatically compiles to:
    // SELECT * FROM tasks WHERE email = ?
    List<Task> findByUserEmail(String email);
}
