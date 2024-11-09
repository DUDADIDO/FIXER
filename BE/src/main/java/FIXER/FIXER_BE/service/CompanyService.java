package FIXER.FIXER_BE.service;

import FIXER.FIXER_BE.dto.CompanyDTO;
import FIXER.FIXER_BE.entity.Company;
import FIXER.FIXER_BE.repository.CompanyRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
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
            companies = companyRepository.findByCompanyIdGreaterThanOrderByCompanyIdAsc(lastId, pageable);
        }
        return companies.stream().map(CompanyDTO::fromEntity).collect(Collectors.toList());
    }

    public CompanyDTO getCompanyInfo(Integer companyId) {
        Company company = companyRepository.findById(companyId)
                .orElseThrow(() -> new RuntimeException("Company not found"));
        return CompanyDTO.fromEntity(company);
    }

    @Transactional
    public CompanyDTO updateCompany(CompanyDTO companyDTO, String logoPath) {
        Optional<Company> oldCompanyData = companyRepository.findById(companyDTO.getCompanyId());
        if (oldCompanyData.isPresent()) {
            Company company = oldCompanyData.get();
            company.setName(companyDTO.getName());
            company.setLocation(companyDTO.getLocation());
            company.setPhone(companyDTO.getPhone());

            if (company.getCompaniesInfo() != null) {
                company.getCompaniesInfo().setLogo(logoPath);
                company.getCompaniesInfo().setDescription(companyDTO.getDescription());
                company.getCompaniesInfo().setContent(companyDTO.getContent());
            }

            company.setUpdatedAt(LocalDateTime.now());

            Company updatedCompany = companyRepository.save(company);
            return CompanyDTO.fromEntity(updatedCompany);
        }
        else {
            return null;
        }
    }
}
