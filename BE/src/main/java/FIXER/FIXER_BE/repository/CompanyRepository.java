package FIXER.FIXER_BE.repository;

import FIXER.FIXER_BE.dto.SupportedDeviceDTO;
import FIXER.FIXER_BE.entity.Company;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CompanyRepository extends JpaRepository<Company, Integer> {
    // 필요한 커스텀 메서드가 있다면 추가
    List<Company> findByCompanyIdGreaterThanOrderByCompanyIdAsc(Integer companyId, Pageable pageable);
    Optional<Company> findByCompanyId(Integer companyId);
    @Query("SELECT new FIXER.FIXER_BE.dto.SupportedDeviceDTO(c.companyId, d.id, b.id, bdm.id) " +
            "FROM Company c " +
            "JOIN CompanySupportedDevices csd ON c.companyId = csd.company.companyId " +
            "JOIN BrandDeviceMap bdm ON csd.brandDeviceMap.id = bdm.id " +
            "JOIN bdm.brand b " +
            "JOIN bdm.deviceType d " +
            "WHERE c.companyId = :companyId")
    List<SupportedDeviceDTO> findSupportedDevices(@Param("companyId") Integer companyId);
}
