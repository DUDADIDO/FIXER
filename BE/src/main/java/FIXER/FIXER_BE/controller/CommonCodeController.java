package FIXER.FIXER_BE.controller;

import FIXER.FIXER_BE.dto.CommonCodeDTO;
import FIXER.FIXER_BE.service.CommonCodeService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/common-codes")
public class CommonCodeController {

    private final CommonCodeService commonCodeService;

    public CommonCodeController(CommonCodeService commonCodeService) {
        this.commonCodeService = commonCodeService;
    }

    // 브랜드 목록 가져오기
    @GetMapping("/brands")
    public List<CommonCodeDTO> getBrands() {
        return commonCodeService.getBrands();
    }

    // 브랜드 ID로 디바이스 타입 목록 가져오기
    @GetMapping("/device-types-by-brand/{brandId}")
    public List<CommonCodeDTO> getDeviceTypesByBrand(@PathVariable("brandId") Long brandId) {
        return commonCodeService.getDeviceTypesByBrand(brandId);
    }
}
