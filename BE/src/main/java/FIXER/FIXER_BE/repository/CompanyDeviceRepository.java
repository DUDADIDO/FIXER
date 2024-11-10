package FIXER.FIXER_BE.repository;

import FIXER.FIXER_BE.entity.CompanyDevice;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CompanyDeviceRepository extends JpaRepository<CompanyDevice, Integer> {
    // 특정 회사에 대한 모든 기기 정보를 삭제하는 메소드
    void deleteByCompanyId(Integer companyId);
}
