package FIXER.FIXER_BE.dto;

import FIXER.FIXER_BE.entity.Company;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@Builder
@Getter
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

    @JsonProperty("review_count")
    private Integer reviewCount;

    @JsonProperty("score")
    private BigDecimal score;

    @JsonProperty("created_at")
    private LocalDateTime createdAt;

    @JsonProperty("updated_at")
    private LocalDateTime updatedAt;

    // 추가된 CompaniesInfo 관련 필드
    @Setter
    @Getter
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
                .reviewCount(company.getReviewCount())
                .score(company.getScore())
                .createdAt(company.getCreatedAt())
                .updatedAt(company.getUpdatedAt())
                // CompaniesInfo 필드 설정
                .logo(company.getCompaniesInfo().getLogo())
                .description(company.getCompaniesInfo().getDescription())
                .content(company.getCompaniesInfo().getContent())
                .build();
    }

}
