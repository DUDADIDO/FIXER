package FIXER.FIXER_BE.repository;

import FIXER.FIXER_BE.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Integer> {
    Optional<User> findByUserId(String user_id);
}