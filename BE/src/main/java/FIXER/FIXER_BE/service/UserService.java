package FIXER.FIXER_BE.service;

import FIXER.FIXER_BE.dto.UserDTO;
import FIXER.FIXER_BE.entity.User;
import FIXER.FIXER_BE.repository.UserRepository;
import FIXER.FIXER_BE.service.AuthenticationService;
import FIXER.FIXER_BE.service.PasswordService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@RequiredArgsConstructor
class UserServiceImpl implements UserService {
    private final UserRepository userRepository;
    private final PasswordService passwordService;
    private final AuthenticationService authenticationService;

    // 유저 정보 생성
    @Override
    @Transactional
    public UserDTO createUser(UserDTO userDTO) {
        User user = userDTO.toEntity();
        User savedUser = userRepository.save(user);
        return UserDTO.fromEntity(savedUser);
    }

    // 유저 식별자를 통해 유저 정보 추출
    @Override
    @Transactional(readOnly = true)
    public UserDTO getUserById(Integer userNum) {
        Optional<User> user = userRepository.findById(userNum);
        return user.map(UserDTO::fromEntity).orElse(null);
    }

    // 유저 정보 갱신
    @Override
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

    // 비밀번호 갱신
    @Override
    @Transactional
    public UserDTO updateUserPassword(Integer userNum, String newPassword, String token) {
        Optional<User> existingUser = userRepository.findById(userNum);
        if (existingUser.isPresent()) {
            User user = existingUser.get();
            authenticationService.validateToken(token, user.getUserId());
            user.setPassword(passwordService.encodePassword(newPassword));
            User updatedUser = userRepository.save(user);
            return UserDTO.fromEntity(updatedUser);
        }
        return null;
    }

    // 유저 정보 삭제
    @Override
    @Transactional
    public boolean deleteUser(Integer userNum) {
        if (userRepository.existsById(userNum)) {
            userRepository.deleteById(userNum);
            return true;
        }
        return false;
    }
}

public interface UserService {
    UserDTO createUser(UserDTO userDTO);
    UserDTO getUserById(Integer userNum);
    UserDTO updateUser(Integer userNum, UserDTO userDTO);
    UserDTO updateUserPassword(Integer userNum, String newPassword, String token);
    boolean deleteUser(Integer userNum);
}