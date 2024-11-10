package FIXER.FIXER_BE.service;

import FIXER.FIXER_BE.dto.CompanyDTO;
import FIXER.FIXER_BE.dto.SupportedDeviceDTO;
import FIXER.FIXER_BE.dto.User.UserDTO;
import FIXER.FIXER_BE.entity.BrandDeviceMap;
import FIXER.FIXER_BE.entity.CompaniesInfo;
import FIXER.FIXER_BE.entity.Company;
import FIXER.FIXER_BE.entity.CompanySupportedDevices;
import FIXER.FIXER_BE.entity.User;
import FIXER.FIXER_BE.repository.BrandDeviceMapRepository;
import FIXER.FIXER_BE.repository.CompanyRepository;
import FIXER.FIXER_BE.repository.CompanySupportedDevicesRepository;
import FIXER.FIXER_BE.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.jdbc.core.JdbcTemplate;
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
    private final UserService userService;
    private final UserRepository userRepository;
    private final JdbcTemplate jdbcTemplate;

    public List<CompanyDTO> getCompanies(int pageSize, Integer lastId) {
        Pageable pageable = PageRequest.of(0, pageSize);
        List<Company> companies;
        if (lastId == null) {
            companies = companyRepository.findAll(pageable).getContent();
        } else {
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
        } else {
            return null;
        }
    }

    public int saveCompanyData(MultipartFile excelFile, String logoFilePath) {
        try (Workbook workbook = new XSSFWorkbook(excelFile.getInputStream())) {
            Sheet sheet = workbook.getSheetAt(0);
            for (Row row : sheet) {
                if (row.getRowNum() == 0) continue;

                String userId = row.getCell(0).getStringCellValue();

                // 유저 정보 확인 - 유저가 없으면 예외 발생
                UserDTO user = userService.checkUserById(userId);
                if (user == null) {
                    throw new RuntimeException("해당 유저 정보를 찾을 수 없습니다. 유저 ID: " + userId);
                }

                Company companyData = new Company();
                CompaniesInfo companiesInfo = new CompaniesInfo();

                // 회사 정보 설정
                companyData.setName(row.getCell(1).getStringCellValue());
                companyData.setLocation(row.getCell(2).getStringCellValue());
                companyData.setPhone(row.getCell(3).getStringCellValue());
                companyData.setEmail(row.getCell(4).getStringCellValue());

                // 로고 파일 경로 설정
                companiesInfo.setLogo(logoFilePath); // 로고 URL을 설정
                companiesInfo.setDescription(row.getCell(5).getStringCellValue());
                companiesInfo.setContent(row.getCell(6).getStringCellValue());

                // 연관 관계 설정
                companyData.setCompaniesInfo(companiesInfo);

                // 회사 정보 저장
                Company savedCompany = companyRepository.save(companyData);

                if (savedCompany != null) {
                    // 유저의 myStore 정보 업데이트
                    user.setMyStore(savedCompany.getCompanyId());
                    user.setUpdatedAt(LocalDateTime.now());
                    User userData = user.toEntity();
                    userRepository.save(userData);

                    return savedCompany.getCompanyId();
                } else {
                    throw new RuntimeException("회사 정보를 저장하는데 실패했습니다.");
                }
            }
        } catch (IOException e) {
            throw new RuntimeException("파일을 읽는 중 오류 발생", e);
        }
        return -1; // 회사 데이터가 저장되지 않은 경우, 기본 반환 값 (필요시 수정)
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

    public void addDefaultSupportedDevice(Integer companyId, Integer brandDeviceMapId) {
        // 기본 수리 품목을 데이터베이스에 삽입
        String insertSql = "INSERT INTO company_supported_devices (company_id, brand_device_map_id) VALUES (?, ?)";

        // JdbcTemplate 또는 JPA를 이용하여 삽입 작업을 수행
        jdbcTemplate.update(insertSql, companyId, brandDeviceMapId);
    }
}
