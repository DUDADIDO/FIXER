package FIXER.FIXER_BE.service;

import FIXER.FIXER_BE.dto.CompanyDTO;
import FIXER.FIXER_BE.entity.CompanyDevice;
import FIXER.FIXER_BE.repository.CompanyDeviceRepository;
import FIXER.FIXER_BE.repository.CompanyRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.List;

@Service
public class CompanyDeviceService {

    private static final Logger logger = LoggerFactory.getLogger(CompanyDeviceService.class);

    private final CompanyDeviceRepository companyDeviceRepository;
    private final CompanyRepository companyRepository;

    public CompanyDeviceService(CompanyDeviceRepository companyDeviceRepository, CompanyRepository companyRepository) {
        this.companyDeviceRepository = companyDeviceRepository;
        this.companyRepository = companyRepository;
    }

    // 회사의 브랜드 및 기기 유형 정보를 업데이트
    @Transactional
    public void updateCompanyDevices(Integer companyId, CompanyDTO.CompanyDeviceUpdateDTO companyDeviceUpdateDTO) {
        if (companyDeviceUpdateDTO == null) {
            throw new IllegalArgumentException("CompanyDeviceUpdateDTO cannot be null");
        }

        // 기존에 등록된 회사의 기기 정보를 삭제
        logger.debug("Deleting existing company devices for companyId: {}", companyId);
        companyDeviceRepository.deleteByCompanyId(companyId);

        // 새로운 기기 정보를 추가
        List<Integer> deviceTypeIds = companyDeviceUpdateDTO.getDeviceTypeIds();
        Integer brandId = companyDeviceUpdateDTO.getBrandId();

        if (deviceTypeIds == null || deviceTypeIds.isEmpty()) {
            logger.warn("DeviceTypeIds is null or empty for companyId: {}", companyId);
        }
        if (brandId == null) {
            logger.warn("BrandId is null for companyId: {}", companyId);
        }

        if (deviceTypeIds != null && !deviceTypeIds.isEmpty() && brandId != null) {
            for (Integer deviceTypeId : deviceTypeIds) {
                CompanyDevice companyDevice = new CompanyDevice();
                companyDevice.setCompanyId(companyId);
                companyDevice.setBrandId(brandId);
                companyDevice.setDeviceTypeId(deviceTypeId);
                companyDeviceRepository.save(companyDevice);
                logger.debug("Saved company device: companyId={}, brandId={}, deviceTypeId={}", companyId, brandId, deviceTypeId);
            }
        } else {
            logger.warn("Skipping save operation for companyId: {} due to missing brandId or deviceTypeIds.", companyId);
        }
    }
}
