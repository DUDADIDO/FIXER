package FIXER.FIXER_BE.dto;

import FIXER.FIXER_BE.entity.Company;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CompanyDTO {

    @JsonProperty("company_id")
    private Integer companyId;

    @JsonProperty("tag")
    private Integer tag;

    @JsonProperty("name")
    private String name;

    @JsonProperty("location")
    private String location;

    @JsonProperty("phone")
    private String phone;

    @JsonProperty("email")
    private String email;

    @JsonProperty("repair_count")
    private Integer repairCount;

    @JsonProperty("score")
    private BigDecimal score;

    @JsonProperty("created_at")
    private LocalDateTime createdAt;

    @JsonProperty("updated_at")
    private LocalDateTime updatedAt;

    // 추가된 CompaniesInfo 관련 필드
    @JsonProperty("logo")
    private String logo;

    @JsonProperty("description")
    private String description;

    @JsonProperty("content")
    private String content;

    public static CompanyDTO fromEntity(Company company) {
        return CompanyDTO.builder()
                .companyId(company.getCompanyId())
                .tag(company.getTag())
                .name(company.getName())
                .location(company.getLocation())
                .phone(company.getPhone())
                .email(company.getEmail())
                .repairCount(company.getRepairCount())
                .score(company.getScore())
                .createdAt(company.getCreatedAt())
                .updatedAt(company.getUpdatedAt())
                // CompaniesInfo 필드 설정
                .logo(company.getCompaniesInfo().getLogo())
                .description(company.getCompaniesInfo().getDescription())
                .content(company.getCompaniesInfo().getContent())
                .build();
    }

    public static class CompanyDeviceUpdateDTO {
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
}
