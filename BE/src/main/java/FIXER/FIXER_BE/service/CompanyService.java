package FIXER.FIXER_BE.service;

import FIXER.FIXER_BE.dto.CompanyDTO;
import FIXER.FIXER_BE.entity.Company;
import FIXER.FIXER_BE.repository.CompanyRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CompanyService {

    private final CompanyRepository companyRepository;

    public CompanyDTO getCompanyInfo(Integer companyId) {
        Company company = companyRepository.findById(companyId)
                .orElseThrow(() -> new RuntimeException("Company not found"));
        return CompanyDTO.fromEntity(company);
    }
}
