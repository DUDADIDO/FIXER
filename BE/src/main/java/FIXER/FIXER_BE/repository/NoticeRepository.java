package FIXER.FIXER_BE.repository;

import FIXER.FIXER_BE.entity.Notice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface NoticeRepository extends JpaRepository<Notice, Integer> {
    // 필요한 커스텀 메서드를 추가할 수 있습니다.
}
