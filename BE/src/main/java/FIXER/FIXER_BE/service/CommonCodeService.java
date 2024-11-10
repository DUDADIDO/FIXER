package FIXER.FIXER_BE.service;

import FIXER.FIXER_BE.dto.BrandDeviceTypeDTO;
import FIXER.FIXER_BE.dto.CommonCodeDTO;
import FIXER.FIXER_BE.entity.CommonCode;
import FIXER.FIXER_BE.repository.BrandDeviceMapRepository;
import FIXER.FIXER_BE.repository.BrandRepository;
import FIXER.FIXER_BE.repository.CommonCodeRepository;
import FIXER.FIXER_BE.repository.DeviceBrandMapRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CommonCodeService {

    private final BrandRepository brandRepository;
    private final BrandDeviceMapRepository brandDeviceMapRepository;
    private final CommonCodeRepository commonCodeRepository;

    public CommonCodeService(BrandRepository brandRepository, BrandDeviceMapRepository brandDeviceMapRepository, CommonCodeRepository commonCodeRepository) {
        this.brandRepository = brandRepository;
        this.brandDeviceMapRepository = brandDeviceMapRepository;
        this.commonCodeRepository = commonCodeRepository;
    }

    // 모든 브랜드 목록 가져오기
    public List<CommonCodeDTO> getBrands() {
        return brandRepository.findAll()
                .stream()
                .map(brand -> new CommonCodeDTO(brand.getId(), brand.getName()))
                .collect(Collectors.toList());
    }

    // 특정 브랜드의 디바이스 타입 목록 가져오기
    public List<CommonCodeDTO> getDeviceTypesByBrand(Long brandId) {
        return brandDeviceMapRepository.findDeviceTypesByBrandId(brandId)
                .stream()
                .map(deviceType -> new CommonCodeDTO(deviceType.getCodeId(), deviceType.getCodeName()))
                .collect(Collectors.toList());
    }
    public List<BrandDeviceTypeDTO> getBrandDeviceTypes() {
        return commonCodeRepository.findBrandDeviceTypes();
    }
}

