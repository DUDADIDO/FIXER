package FIXER.FIXER_BE.service;

import FIXER.FIXER_BE.dto.ReceiptDTO;
import FIXER.FIXER_BE.entity.Company;
import FIXER.FIXER_BE.entity.Receipt;
import FIXER.FIXER_BE.repository.CompanyRepository;
import FIXER.FIXER_BE.repository.ReceiptRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ReceiptService {

    private final ReceiptRepository receiptRepository;
    private final CompanyRepository companyRepository;

    // 영수증 저장
    @Transactional
    public ReceiptDTO saveReceipt(ReceiptDTO receiptDTO) {
        // Company 조회
        Company company = companyRepository.findById(receiptDTO.getCompanyId())
                .orElseThrow(() -> new IllegalArgumentException("해당 회사가 존재하지 않습니다. ID: " + receiptDTO.getCompanyId()));

        // DTO -> 엔티티 변환 및 저장
        Receipt receipt = ReceiptDTO.toEntity(receiptDTO);
        receipt.setCompany(company); // Company 정보 설정
        Receipt savedReceipt = receiptRepository.save(receipt);

        // 저장된 엔티티 -> DTO 변환 후 반환
        return ReceiptDTO.fromEntity(savedReceipt);
    }

    // 회사별 영수증 조회
    @Transactional(readOnly = true)
    public List<ReceiptDTO> getReceiptsByCompanyId(Integer companyId) {
        return receiptRepository.findByCompany_CompanyId(companyId).stream()
                .map(ReceiptDTO::fromEntity) // 엔티티 -> DTO 변환
                .collect(Collectors.toList());
    }

    // 특정 영수증 ID로 조회
    @Transactional(readOnly = true)
    public ReceiptDTO getReceiptById(Integer receiptId) {
        Receipt receipt = receiptRepository.findById(receiptId)
                .orElseThrow(() -> new IllegalArgumentException("해당 영수증이 존재하지 않습니다. ID: " + receiptId));

        return ReceiptDTO.fromEntity(receipt);
    }

    // 특정 모델 / 파손부위의 수리비용 평균조회
    @Transactional(readOnly = true)
    public Double getAverageRepairCost(String deviceName, String damagedPart) {
        return receiptRepository.findAverageRepairCost(deviceName, damagedPart);
    }

    // 영수증 삭제
    @Transactional
    public void deleteReceipt(Integer receiptId) {
        if (!receiptRepository.existsById(receiptId)) {
            throw new IllegalArgumentException("해당 영수증이 존재하지 않습니다. ID: " + receiptId);
        }
        receiptRepository.deleteById(receiptId);
    }
}
