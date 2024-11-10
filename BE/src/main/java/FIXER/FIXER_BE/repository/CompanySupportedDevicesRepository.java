package FIXER.FIXER_BE.repository;

import FIXER.FIXER_BE.entity.CompanySupportedDevices;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface CompanySupportedDevicesRepository extends JpaRepository<CompanySupportedDevices, Integer> {

    @Modifying
    @Transactional
    @Query("DELETE FROM CompanySupportedDevices csd WHERE csd.company.companyId = :companyId")
    void deleteSupportedDevicesByCompanyId(@Param("companyId") Integer companyId);
}
