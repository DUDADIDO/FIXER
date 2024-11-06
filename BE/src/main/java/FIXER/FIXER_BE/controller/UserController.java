package FIXER.FIXER_BE.controller;

import FIXER.FIXER_BE.dto.User.CheckUserIdRequest;
import FIXER.FIXER_BE.dto.User.LoginRequest;
import FIXER.FIXER_BE.dto.User.UserDTO;
import FIXER.FIXER_BE.dto.User.UserToken;

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

    private final UserService userService; // 유저 서비스
    private final PasswordService passwordService; // 패스워드 서비스
    private final AuthenticationService authenticationService; // 인증 서비스
    private final JwtUtil jwtUtil; // JWT 유틸리티

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        // 유저 아이디를 이용해 사용자 조회
        UserDTO loginUser = userService.checkUserById(loginRequest.getUser_id());
        if (loginUser == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid user");
        }

        // 유저 비밀번호 확인
        if (!passwordService.isPasswordValid(loginRequest.getUser_pw(), loginUser.getPassword())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid password");
        }

        // JWT 토큰 생성
        String token = jwtUtil.generateToken(loginUser.getUserNum(), loginUser.getUserId(), loginUser.getUserName());
        UserToken usertoken = new UserToken();
        usertoken.setUser_num(loginUser.getUserNum());
        usertoken.setUser_name(loginUser.getUserName());
        usertoken.setToken(token);
        return ResponseEntity.status(HttpStatus.OK).body(usertoken);
    }



    @PostMapping("/register")
    public ResponseEntity<UserDTO> createUser(@RequestBody UserDTO userDTO) {
        System.out.println("Received UserDTO in Controller: " + userDTO);
        String encryptedPassword = passwordService.encodePassword(userDTO.getPassword());
        userDTO.setPassword(encryptedPassword);
        UserDTO createdUser = userService.createUser(userDTO);
        return ResponseEntity.ok(createdUser);
    }

    @PostMapping("/register/checkid")
    public ResponseEntity<Boolean> checkUser(@RequestBody CheckUserIdRequest request) {
        UserDTO userDTO = userService.checkUserById(request.getUser_id());
        boolean isAvailable = (userDTO == null);
        return ResponseEntity.ok(isAvailable);
    }

    @PutMapping("/{userNum}")
    public ResponseEntity<UserDTO> updateUser(@PathVariable Integer userNum, @RequestBody UserDTO userDTO) {
        UserDTO updatedUser = userService.updateUser(userNum, userDTO);
        return updatedUser != null ? ResponseEntity.ok(updatedUser) : ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{userNum}")
    public ResponseEntity<Void> deleteUser(@PathVariable Integer userNum) {
        boolean isDeleted = userService.deleteUser(userNum);
        return isDeleted ? ResponseEntity.noContent().build() : ResponseEntity.notFound().build();
    }
}
