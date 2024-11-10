package FIXER.FIXER_BE.service;

import FIXER.FIXER_BE.dto.CompanyDeviceUpdateDTO;
import FIXER.FIXER_BE.entity.CompanyDevice;
import FIXER.FIXER_BE.repository.CompanyDeviceRepository;
import FIXER.FIXER_BE.repository.CompanyRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CompanyDeviceService {

    private final CompanyDeviceRepository companyDeviceRepository;
    private final CompanyRepository companyRepository;

    public CompanyDeviceService(CompanyDeviceRepository companyDeviceRepository, CompanyRepository companyRepository) {
        this.companyDeviceRepository = companyDeviceRepository;
        this.companyRepository = companyRepository;
    }

    // 회사의 브랜드 및 기기 유형 정보를 업데이트
    public void updateCompanyDevices(Integer companyId, CompanyDeviceUpdateDTO companyDeviceUpdateDTO) {
        // 기존에 등록된 회사의 기기 정보를 삭제
        companyDeviceRepository.deleteByCompanyId(companyId);

        // 새로운 기기 정보를 추가
        List<Integer> deviceTypeIds = companyDeviceUpdateDTO.getDeviceTypeIds();
        Integer brandId = companyDeviceUpdateDTO.getBrandId();

        if (deviceTypeIds != null && brandId != null) {
            for (Integer deviceTypeId : deviceTypeIds) {
                CompanyDevice companyDevice = new CompanyDevice();
                companyDevice.setCompanyId(companyId);
                companyDevice.setBrandId(brandId);
                companyDevice.setDeviceTypeId(deviceTypeId);
                companyDeviceRepository.save(companyDevice);
            }
        }
    }
}
