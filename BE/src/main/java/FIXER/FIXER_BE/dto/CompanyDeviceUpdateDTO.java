package FIXER.FIXER_BE.dto;

import java.util.List;

public class CompanyDeviceUpdateDTO {
    private List<Integer> deviceTypeIds; // 선택된 기기 유형의 ID 목록
    private Integer brandId; // 선택된 브랜드 ID

    // 기본 생성자
    public CompanyDeviceUpdateDTO() {}

    // Getter 및 Setter
    public List<Integer> getDeviceTypeIds() {
        return deviceTypeIds;
    }

    public void setDeviceTypeIds(List<Integer> deviceTypeIds) {
        this.deviceTypeIds = deviceTypeIds;
    }

    public Integer getBrandId() {
        return brandId;
    }

    public void setBrandId(Integer brandId) {
        this.brandId = brandId;
    }
}