package FIXER.FIXER_BE.repository;

import FIXER.FIXER_BE.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Integer> {
    Optional<User> findByUserId(String user_id);
    Optional<User> findByUserNum(Integer userNum);  // user_num으로 조회하는 메서드 추가
}