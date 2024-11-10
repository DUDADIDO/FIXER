package FIXER.FIXER_BE.repository;

import FIXER.FIXER_BE.entity.DeviceBrandMap;
import FIXER.FIXER_BE.entity.CommonCode;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DeviceBrandMapRepository extends JpaRepository<DeviceBrandMap, Integer> {

    @Query("SELECT dbm.deviceType FROM DeviceBrandMap dbm WHERE dbm.brand.codeId = :brandId")
    List<CommonCode> findDeviceTypesByBrandId(@Param("brandId") int brandId);
}
