package FIXER.FIXER_BE.repository;

import FIXER.FIXER_BE.entity.CommonCode;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommonCodeRepository extends JpaRepository<CommonCode, Integer> {

    // code_group이 BRAND인 모든 항목을 가져옴
    List<CommonCode> findByCodeGroup(String codeGroup);

    // 특정 brandId에 따른 기기 유형 가져오기
    @Query("SELECT c FROM CommonCode c WHERE c.codeId IN " +
            "(SELECT dbm.deviceType.codeId FROM DeviceBrandMap dbm WHERE dbm.brand.codeId = :brandId)")
    List<CommonCode> findDeviceTypesByBrandId(@Param("brandId") int brandId);
}
