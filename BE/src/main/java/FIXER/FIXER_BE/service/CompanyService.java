package FIXER.FIXER_BE.service;

import FIXER.FIXER_BE.dto.CompanyDTO;
import FIXER.FIXER_BE.dto.SupportedDeviceDTO;
import FIXER.FIXER_BE.entity.BrandDeviceMap;
import FIXER.FIXER_BE.entity.CompaniesInfo;
import FIXER.FIXER_BE.entity.Company;
import FIXER.FIXER_BE.entity.CompanySupportedDevices;
import FIXER.FIXER_BE.repository.BrandDeviceMapRepository;
import FIXER.FIXER_BE.repository.CompanyRepository;
import FIXER.FIXER_BE.repository.CompanySupportedDevicesRepository;
import lombok.RequiredArgsConstructor;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CompanyService {
    private final CompanyRepository companyRepository;
    private final CompanySupportedDevicesRepository companySupportedDevicesRepository;
    private final BrandDeviceMapRepository brandDeviceMapRepository; // 추가

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

    public void saveCompanyData(MultipartFile excelFile, String logoFilePath) {
        try (Workbook workbook = new XSSFWorkbook(excelFile.getInputStream())) {
            Sheet sheet = workbook.getSheetAt(0);
            for (Row row : sheet) {
                if (row.getRowNum() == 0) continue;

                Company companyData = new Company();
                CompaniesInfo companiesInfo = new CompaniesInfo();

                // 회사 정보 설정
                companyData.setName(row.getCell(0).getStringCellValue());
                companyData.setLocation(row.getCell(1).getStringCellValue());
                companyData.setPhone(row.getCell(2).getStringCellValue());
                companyData.setEmail(row.getCell(3).getStringCellValue());

                // 로고 파일 경로 설정
                companiesInfo.setLogo(logoFilePath); // 로고 URL을 설정
                companiesInfo.setDescription(row.getCell(5).getStringCellValue());
                companiesInfo.setContent(row.getCell(6).getStringCellValue());

                // 연관 관계 설정
                companyData.setCompaniesInfo(companiesInfo);

                // 회사 정보 저장
                companyRepository.save(companyData);
            }
        } catch (IOException e) {
            throw new RuntimeException("파일을 읽는 중 오류 발생", e);
        }
    }
    public List<SupportedDeviceDTO> getSupportedDevices(Integer companyId) {
        return companyRepository.findSupportedDevices(companyId);
    }
    public void updateSupportedDevices(Integer companyId, List<Integer> supportedDevices) {
        // 회사 엔티티 조회
        Company company = companyRepository.findById(companyId)
                .orElseThrow(() -> new IllegalArgumentException("Invalid company ID: " + companyId));

        // 기존 지원 기기 매핑 삭제
        companySupportedDevicesRepository.deleteSupportedDevicesByCompanyId(companyId);

        // 새로운 매핑 삽입
        supportedDevices.forEach(brandDeviceMapId -> {
            BrandDeviceMap brandDeviceMap = brandDeviceMapRepository.findById(brandDeviceMapId)
                    .orElseThrow(() -> new IllegalArgumentException("Invalid brand device map ID: " + brandDeviceMapId));

            CompanySupportedDevices newMapping = new CompanySupportedDevices();
            newMapping.setCompany(company); // Company 엔티티 설정
            newMapping.setBrandDeviceMap(brandDeviceMap); // BrandDeviceMap 엔티티 설정
            companySupportedDevicesRepository.save(newMapping);
        });
    }
}
