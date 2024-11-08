package FIXER.FIXER_BE.service;

import FIXER.FIXER_BE.entity.CompaniesInfo;
import FIXER.FIXER_BE.entity.Company;
import FIXER.FIXER_BE.repository.CompanyRepository;
import java.io.IOException;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CompanyUploadService {
    private static final Logger logger = LoggerFactory.getLogger(CompanyUploadService.class);
    private final CompanyRepository companyRepository;

    public void saveCompanyData(MultipartFile file) {
        List<Company> companies = new ArrayList<>();
        try (Workbook workbook = new XSSFWorkbook(file.getInputStream())) {
            Sheet sheet = workbook.getSheetAt(0);
            for (Row row : sheet) {
                if (row.getRowNum() == 0) continue;

                Company companyData = new Company();
                CompaniesInfo companiesInfo = new CompaniesInfo();

                // 회사 정보 입력
                companyData.setName(row.getCell(0).getStringCellValue());
                companyData.setLocation(row.getCell(1).getStringCellValue());
                companyData.setPhone(row.getCell(2).getStringCellValue());
                companyData.setEmail(row.getCell(3).getStringCellValue());

                // 회사 소개 정보 입력
                companiesInfo.setLogo(row.getCell(4).getStringCellValue());
                companiesInfo.setDescription(row.getCell(5).getStringCellValue());
                companiesInfo.setContent(row.getCell(6).getStringCellValue());

                // createdAt 및 updatedAt 필드에 현재 시간 설정
                companyData.setCreatedAt(LocalDateTime.now());
                companyData.setUpdatedAt(LocalDateTime.now());
                companiesInfo.setCreatedAt(LocalDateTime.now());
                companiesInfo.setUpdatedAt(LocalDateTime.now());

                companyData.setTag(1);
                companyData.setRepairCount(0);

                // 연관관계 설정
                companyData.setCompaniesInfo(companiesInfo);

                companies.add(companyData);
            }
            companyRepository.saveAll(companies);
            System.out.println(companies);
        } catch (IOException e){
            logger.error("파일을 읽는 중 오류 발생: {}",e.getMessage(),e);
        }
    }
}
