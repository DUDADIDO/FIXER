package FIXER.FIXER_BE.controller;

import FIXER.FIXER_BE.dto.CompanyDTO;
import FIXER.FIXER_BE.dto.NoticeDTO;
import FIXER.FIXER_BE.entity.Notice;
import FIXER.FIXER_BE.service.CompanyService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@RestController
@RequestMapping("/api/company")
@RequiredArgsConstructor
public class CompanyController {

    private final CompanyService companyService;
    private static final String UPLOAD_DIR = "uploads/";


    @GetMapping("/storeinfo/{companyId}")
    public ResponseEntity<CompanyDTO> getCompanyInfo(@PathVariable("companyId") Integer companyId) {
        CompanyDTO companyDTO = companyService.getCompanyInfo(companyId);
        return ResponseEntity.ok(companyDTO);
    }

    @PostMapping("/{companyId}/notices")
    public ResponseEntity<?> createNotice(
            @PathVariable Integer companyId,
            @RequestParam("title") String title,
            @RequestParam("content") String content,
            @RequestParam("file") MultipartFile file) {

        // 파일 저장 경로 설정
        String fileName = generateFileName(file.getOriginalFilename());
        Path filePath = Paths.get(UPLOAD_DIR, fileName);

        try {
            // 파일을 지정한 경로에 저장
            Files.createDirectories(filePath.getParent());
            file.transferTo(filePath.toFile());

            // 이후, Notice 생성 및 저장 로직 추가
            // 예: noticeService.createNotice(companyId, title, content, filePath.toString());

            return ResponseEntity.status(HttpStatus.CREATED).body("Notice created with file uploaded.");

        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("File upload failed: " + e.getMessage());
        }
    }

    // 파일 이름을 고유하게 생성하는 유틸리티 메서드
    private String generateFileName(String originalFileName) {
        String timestamp = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyyMMddHHmmss"));
        return timestamp + "_" + originalFileName;
    }
}
