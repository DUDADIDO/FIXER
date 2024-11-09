package FIXER.FIXER_BE.repository;

import FIXER.FIXER_BE.dto.CommonCodeDTO;
import FIXER.FIXER_BE.entity.BrandDeviceMap;
import FIXER.FIXER_BE.entity.DeviceType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BrandDeviceMapRepository extends JpaRepository<BrandDeviceMap, Long> {

    @Query("SELECT new FIXER.FIXER_BE.dto.CommonCodeDTO(dt.id, dt.name) " +
            "FROM DeviceType dt JOIN BrandDeviceMap bdm ON dt.id = bdm.deviceType.id " +
            "WHERE bdm.brand.id = :brandId")
    List<CommonCodeDTO> findDeviceTypesByBrandId(@Param("brandId") Long brandId);
}