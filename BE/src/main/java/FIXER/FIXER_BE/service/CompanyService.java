package FIXER.FIXER_BE.service;

import FIXER.FIXER_BE.dto.CompanyDTO;
import FIXER.FIXER_BE.entity.Company;
import FIXER.FIXER_BE.repository.CompanyRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CompanyService {
    private final CompanyRepository companyRepository;

    public List<CompanyDTO> getCompanies(int pageSize, Integer lastId) {
        Pageable pageable = PageRequest.of(0, pageSize);
        List<Company> companies;
        if(lastId == null){
            companies = companyRepository.findAll(pageable).getContent();
        }
        else{
            companies = companyRepository.findByCompanyIdLessThanOrderByCompanyIdDesc(lastId, pageable);
        }
        return companies.stream().map(CompanyDTO::fromEntity).collect(Collectors.toList());
    }

    public CompanyDTO getCompanyInfo(Integer companyId) {
        Company company = companyRepository.findById(companyId)
                .orElseThrow(() -> new RuntimeException("Company not found"));
        return CompanyDTO.fromEntity(company);
    }
}
