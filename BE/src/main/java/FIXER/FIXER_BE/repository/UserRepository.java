package FIXER.FIXER_BE.repository;

import FIXER.FIXER_BE.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
    User findUsernameByUser(Stirng username);
}
