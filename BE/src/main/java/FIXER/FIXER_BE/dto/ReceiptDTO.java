package FIXER.FIXER_BE.dto;

import FIXER.FIXER_BE.entity.Receipt;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ReceiptDTO {
    private Integer receiptId;
    private Integer companyId;
    private String deviceName;
    private String damagedPart;
    private Integer repairCosts;
    private LocalDateTime createdAt;

    // Entity -> DTO 변환 메서드
    public static ReceiptDTO fromEntity(Receipt receipt) {
        return ReceiptDTO.builder()
                .receiptId(receipt.getReceiptId())
                .companyId(receipt.getCompany().getCompanyId())
                .deviceName(receipt.getDeviceName())
                .damagedPart(receipt.getDamagedPart())
                .repairCosts(receipt.getRepairCosts())
                .createdAt(receipt.getCreatedAt())
                .build();
    }

    // DTO -> Entity 변환 메서드
    public static Receipt toEntity(ReceiptDTO receiptDTO) {
        return Receipt.builder()
                .receiptId(receiptDTO.getReceiptId())
                .deviceName(receiptDTO.getDeviceName())
                .damagedPart(receiptDTO.getDamagedPart())
                .repairCosts(receiptDTO.getRepairCosts())
                .build();
    }
}
