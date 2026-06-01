package com.primetrade.assignment.tasks;

import com.primetrade.assignment.enumeration.TaskStatus;
import com.primetrade.assignment.user.User;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Entity
@Table(name = "tasks")
@Data
public class Task {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Task title is required")
    @Column(nullable = false)
    private String title;

    private String description;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private TaskStatus status = TaskStatus.PENDING;

    // MANY-TO-ONE RELATION WITH EMAIL:
    // "@JoinColumn(name = "email")" creates an "email" VARCHAR foreign key column inside the "tasks" table.
    // This references the String "@Id" (email) inside our User entity!
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "email", nullable = false)
    private User user;

    // Default No-Argument Constructor (Required by JPA)
    public Task() {
    }

    // All-Argument Constructor
    public Task(Long id, String title, String description, TaskStatus status, User user) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.status = status;
        this.user = user;
    }

    // Custom Constructor for easy task instantiation (without ID)
    public Task(String title, String description, TaskStatus status, User user) {
        this.title = title;
        this.description = description;
        this.status = status;
        this.user = user;
    }
}
