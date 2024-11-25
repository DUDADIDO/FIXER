package FIXER.FIXER_BE.repository;

import FIXER.FIXER_BE.entity.Receipt;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReceiptRepository extends JpaRepository<Receipt, Integer> {

    @Query("SELECT COALESCE(AVG(r.repairCosts), 0) " +
            "FROM Receipt r " +
            "WHERE r.deviceName = :deviceName AND r.damagedPart = :damagedPart")
    Double findAverageRepairCost(String deviceName, String damagedPart);
    // 특정 회사의 영수증 목록 조회
    List<Receipt> findByCompany_CompanyId(Integer companyId);
}
