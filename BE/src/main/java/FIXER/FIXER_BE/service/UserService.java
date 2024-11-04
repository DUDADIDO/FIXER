package FIXER.FIXER_BE.service;

import FIXER.FIXER_BE.dto.UserDTO;
import FIXER.FIXER_BE.entity.User;
import FIXER.FIXER_BE.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@RequiredArgsConstructor
class UserServiceImpl implements UserService {
    private final UserRepository userRepository;

    @Override
    @Transactional
    public UserDTO createUser(UserDTO userDTO) {
        User user = userDTO.toEntity();
        User savedUser = userRepository.save(user);
        return UserDTO.fromEntity(savedUser);
    }

    @Override
    @Transactional(readOnly = true)
    public UserDTO getUserById(Integer userNum) {
        Optional<User> user = userRepository.findById(userNum);
        return user.map(UserDTO::fromEntity).orElse(null);
    }

    @Override
    @Transactional
    public UserDTO updateUser(Integer userNum, UserDTO userDTO) {
        Optional<User> existingUser = userRepository.findById(userNum);
        if (existingUser.isPresent()) {
            User user = existingUser.get();
            user.setPassword(userDTO.getPassword());
            user.setUserName(userDTO.getUserName());
            user.setUserEmail(userDTO.getUserEmail());
            user.setUserState(userDTO.getUserState());
            user.setUpdatedAt(userDTO.getUpdatedAt() != null ? java.sql.Date.valueOf(userDTO.getUpdatedAt()) : user.getUpdatedAt());
            User updatedUser = userRepository.save(user);
            return UserDTO.fromEntity(updatedUser);
        }
        return null;
    }

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
    boolean deleteUser(Integer userNum);
}