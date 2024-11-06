package FIXER.FIXER_BE.repository;

import FIXER.FIXER_BE.entity.Notice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface NoticeRepository extends JpaRepository<Notice, Integer> {
    // 필요한 커스텀 메서드가 있다면 추가
}
