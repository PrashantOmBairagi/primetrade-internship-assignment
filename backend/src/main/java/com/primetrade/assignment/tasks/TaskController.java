package com.primetrade.assignment.tasks;

import com.primetrade.assignment.enumeration.Role;
import com.primetrade.assignment.user.User;
import com.primetrade.assignment.enumeration.TaskStatus;
import com.primetrade.assignment.exception.ResourceNotFoundException;
import com.primetrade.assignment.exception.UnauthorizedException;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/tasks")
@Tag(name = "Tasks", description = "Task CRUD APIs with Role-Based Access Controls")
public class TaskController {

    private final TaskRepository taskRepository;

    public TaskController(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

    @PostMapping
    @Operation(summary = "Create task", description = "Creates a new task associated with the logged-in user.")
    public ResponseEntity<Task> createTask(
            @RequestBody Task taskRequest,
            @AuthenticationPrincipal User currentUser
    ) {
        taskRequest.setUser(currentUser);
        if (taskRequest.getStatus() == null) {
            taskRequest.setStatus(TaskStatus.PENDING);
        }
        Task savedTask = taskRepository.save(taskRequest);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedTask);
    }

    @GetMapping
    @Operation(summary = "Get all tasks", description = "Users see owned tasks; admins see all tasks in the system.")
    public ResponseEntity<List<Task>> getAllTasks(@AuthenticationPrincipal User currentUser) {
        if (currentUser.getRole() == Role.ROLE_ADMIN) {
            return ResponseEntity.ok(taskRepository.findAll());
        } else {
            return ResponseEntity.ok(taskRepository.findByUserEmail(currentUser.getEmail()));
        }
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get task by ID", description = "Retrieves specific task with ownership validation.")
    public ResponseEntity<Task> getTaskById(
            @PathVariable Long id,
            @AuthenticationPrincipal User currentUser
    ) {
        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Task not found with ID: " + id));

        if (currentUser.getRole() != Role.ROLE_ADMIN && !task.getUser().getEmail().equals(currentUser.getEmail())) {
            throw new UnauthorizedException("Unauthorized to view this task!");
        }

        return ResponseEntity.ok(task);
    }

    @PutMapping("/{id}")
    @Operation(summary = "Update task", description = "Updates task parameters with ownership validation.")
    public ResponseEntity<Task> updateTask(
            @PathVariable Long id,
            @RequestBody Task taskDetails,
            @AuthenticationPrincipal User currentUser
    ) {
        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Task not found with ID: " + id));

        if (currentUser.getRole() != Role.ROLE_ADMIN && !task.getUser().getEmail().equals(currentUser.getEmail())) {
            throw new UnauthorizedException("Unauthorized to modify this task!");
        }

        if (taskDetails.getTitle() != null) {
            task.setTitle(taskDetails.getTitle());
        }
        if (taskDetails.getDescription() != null) {
            task.setDescription(taskDetails.getDescription());
        }
        if (taskDetails.getStatus() != null) {
            task.setStatus(taskDetails.getStatus());
        }

        Task updatedTask = taskRepository.save(task);
        return ResponseEntity.ok(updatedTask);
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Delete task", description = "Deletes task with ownership validation.")
    public ResponseEntity<?> deleteTask(
            @PathVariable Long id,
            @AuthenticationPrincipal User currentUser
    ) {
        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Task not found with ID: " + id));

        if (currentUser.getRole() != Role.ROLE_ADMIN && !task.getUser().getEmail().equals(currentUser.getEmail())) {
            throw new UnauthorizedException("Unauthorized to delete this task!");
        }

        taskRepository.delete(task);
        return ResponseEntity.ok("Task deleted successfully!");
    }
}
