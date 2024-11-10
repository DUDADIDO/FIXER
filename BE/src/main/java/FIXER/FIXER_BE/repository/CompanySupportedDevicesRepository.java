package FIXER.FIXER_BE.repository;

import FIXER.FIXER_BE.entity.CompanySupportedDevices;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CompanySupportedDevicesRepository extends JpaRepository<CompanySupportedDevices, Integer> {

    void deleteByCompany_CompanyId(Integer companyId);
}
