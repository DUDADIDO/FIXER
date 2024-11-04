package FIXER.FIXER_BE.controller;

import FIXER.FIXER_BE.dto.UserDTO;
import FIXER.FIXER_BE.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

    @PostMapping
    public ResponseEntity<UserDTO> createUser(@RequestBody UserDTO userDTO) {
        UserDTO createdUser = userService.createUser(userDTO);
        return ResponseEntity.ok(createdUser);
    }

    @GetMapping("/{userNum}")
    public ResponseEntity<UserDTO> getUserById(@PathVariable Integer userNum) {
        UserDTO userDTO = userService.getUserById(userNum);
        if (userDTO != null) {
            return ResponseEntity.ok(userDTO);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/{userNum}")
    public ResponseEntity<UserDTO> updateUser(@PathVariable Integer userNum, @RequestBody UserDTO userDTO) {
        UserDTO updatedUser = userService.updateUser(userNum, userDTO);
        if (updatedUser != null) {
            return ResponseEntity.ok(updatedUser);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{userNum}")
    public ResponseEntity<Void> deleteUser(@PathVariable Integer userNum) {
        boolean isDeleted = userService.deleteUser(userNum);
        if (isDeleted) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
