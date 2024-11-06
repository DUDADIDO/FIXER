package FIXER.FIXER_BE.repository;

import FIXER.FIXER_BE.entity.Company;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CompanyRepository extends JpaRepository<Company, Integer> {
    // 필요한 커스텀 메서드가 있다면 추가
    List<Company> findByCompanyIdLessThanOrderByCompanyIdDesc(Integer lastId, Pageable pageable);
}
