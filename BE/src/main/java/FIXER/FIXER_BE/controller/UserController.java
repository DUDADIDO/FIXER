package FIXER.FIXER_BE.controller;

import FIXER.FIXER_BE.dto.UserDTO;
import FIXER.FIXER_BE.service.UserService;
import FIXER.FIXER_BE.service.security.AuthenticationService;
import FIXER.FIXER_BE.service.security.JwtUtil;
import FIXER.FIXER_BE.service.security.PasswordService;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private UserService userService;
    private PasswordService passwordService;
    private AuthenticationService authenticationService;
    private JwtUtil jwtUtil;



    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody String userId, String password) {
        // 유저 아이디를 이용해 사용자 조회
        UserDTO loginUser = userService.checkUserById(userId);
        if (loginUser == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid user");
        }

        // 유저 비밀번호 확인
        if(!passwordService.isPasswordValid(password, loginUser.getPassword())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid password");
        }

        // JWT 토큰 생성
        String token = jwtUtil.generateToken(loginUser.getUserId());
        return ResponseEntity.status(HttpStatus.OK).body(token);
    }

    @PostMapping("/register")
    public ResponseEntity<?> createUser(@RequestBody UserDTO userDTO) {
        // 유저 아이디 중복확인
        if(userService.checkUserById(userDTO.getUserId()) != null) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("User ID already exists");
        }
        System.out.println(userDTO);

        // 비밀번호 인코딩
        String encodedPassword = passwordService.encodePassword(userDTO.getPassword());
        userDTO.setPassword(encodedPassword);

        // 사용자 생성
        UserDTO createdUser = userService.createUser(userDTO);

        // 비밀번호를 제외한 사용자 정보 응답
        createdUser.setPassword(null);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdUser);
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
