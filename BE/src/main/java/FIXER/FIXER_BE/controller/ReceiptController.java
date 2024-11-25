package FIXER.FIXER_BE.controller;

import FIXER.FIXER_BE.service.ReceiptService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/receipt")
public class ReceiptController {
    private final ReceiptService receiptService;

    // 특정 모델과 파손부위에 따른 평균 수리비용 반환
    @GetMapping("/avg")
    public ResponseEntity<Double> avgRepairCost(
            @RequestParam String deviceName,
            @RequestParam String damagedPart) {

        Double averageCost = receiptService.getAverageRepairCost(deviceName, damagedPart);

        return ResponseEntity.ok(averageCost);
    }
}
