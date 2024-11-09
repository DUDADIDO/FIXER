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

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CompanyUploadService {
    private static final String LOGO_DIR = "uploads/logos/";
    private final CompanyRepository companyRepository;

    public String saveLogoFile(MultipartFile logoFile) throws IOException {
        // 로고 파일을 저장할 경로 설정
        String logoFileName = System.currentTimeMillis() + "_" + logoFile.getOriginalFilename();
        Path logoPath = Paths.get(System.getProperty("user.dir"), LOGO_DIR, logoFileName);
        Files.createDirectories(logoPath.getParent()); // 디렉토리가 없으면 생성
        logoFile.transferTo(logoPath.toFile()); // 파일 저장
        return logoPath.toString(); // 저장된 파일 경로 반환
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

}


