package FIXER.FIXER_BE.repository;

import FIXER.FIXER_BE.entity.Notice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface NoticeRepository extends JpaRepository<Notice, Integer> {
    // 특정 회사의 공지사항을 작성일 기준으로 정렬하여 가져오는 메서드
    List<Notice> findByCompanyCompanyIdOrderByCreatedAtDesc(Integer companyId);
}
