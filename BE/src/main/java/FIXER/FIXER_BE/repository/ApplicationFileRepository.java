package FIXER.FIXER_BE.repository;

import FIXER.FIXER_BE.entity.ApplicationFile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ApplicationFileRepository extends JpaRepository<ApplicationFile, Integer> {
    List<ApplicationFile> findByFormId(Integer formId);  // formId로 파일 목록을 조회하는 메서드
}
