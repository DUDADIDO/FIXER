package FIXER.FIXER_BE.controller;

import FIXER.FIXER_BE.dto.DealDTO;
import FIXER.FIXER_BE.service.SaleService;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/sales")
@CrossOrigin(origins = "*")
public class SaleController {
    private final SaleService saleService;

    public SaleController(SaleService saleService) {
        this.saleService = saleService;
    }

    // Postman에서 호출할 수 있는 엔드포인트 추가
    @GetMapping("/realtime-deals")
    public List<DealDTO> getLimitedDeals() {
        return saleService.getLimitedDeals();
    }
}
