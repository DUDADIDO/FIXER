package FIXER.FIXER_BE.service;

import FIXER.FIXER_BE.dto.User.UserDTO;
import FIXER.FIXER_BE.entity.User;
import FIXER.FIXER_BE.repository.UserRepository;

import FIXER.FIXER_BE.service.security.PasswordService;
import FIXER.FIXER_BE.service.security.AuthenticationService;
import FIXER.FIXER_BE.service.security.InvalidCredentialsException;


import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final PasswordService passwordService;
    private final AuthenticationService authenticationService;

    @Transactional
    public UserDTO createUser(UserDTO userDTO) {
        User user = userDTO.toEntity();  // UserDTO를 User 엔티티로 변환
        userRepository.save(user);  // User 엔티티 저장
        return UserDTO.fromEntity(user);  // 저장된 엔티티를 다시 DTO로 변환하여 반환
    }

    @Transactional(readOnly = true)
    public UserDTO checkUserById(String user_id) {
        Optional<User> user = userRepository.findByUserId(user_id);
        return user.map(UserDTO::fromEntity).orElse(null);
    }



    @Transactional
    public UserDTO updateUser(Integer userNum, UserDTO userDTO) {
        Optional<User> existingUser = userRepository.findById(userNum);
        if (existingUser.isPresent()) {
            User user = existingUser.get();
            user.setUserEmail(userDTO.getUserEmail());
            user.setUserState(userDTO.getUserState());
            User updatedUser = userRepository.save(user);
            return UserDTO.fromEntity(updatedUser);
        }
        return null;
    }
    @Transactional
    public void updateUserPasswordByUserNum(Integer userNum, String newPassword) {
        Optional<User> existingUser = userRepository.findById(userNum);
        if (existingUser.isPresent()) {  // 사용자가 존재하는 경우
            User user = existingUser.get();

            // 새 비밀번호를 암호화하여 설정
            user.setPassword(passwordService.encodePassword(newPassword));

            // 변경 사항을 데이터베이스에 저장
            userRepository.save(user);
        } else {
            // 사용자가 존재하지 않는 경우 예외 발생
            throw new InvalidCredentialsException("User not found");
        }
    }



    @Transactional
    public boolean deleteUser(Integer userNum) {
        if (userRepository.existsById(userNum)) {
            userRepository.deleteById(userNum);
            return true;
        }
        return false;
    }
}