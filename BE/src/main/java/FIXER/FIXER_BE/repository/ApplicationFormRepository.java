package FIXER.FIXER_BE.repository;

import FIXER.FIXER_BE.entity.ApplicationForm;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ApplicationFormRepository extends JpaRepository<ApplicationForm, Integer> {
    // 기본적인 CRUD 기능은 JpaRepository에서 제공
}
