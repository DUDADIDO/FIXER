package FIXER.FIXER_BE.controller;

import FIXER.FIXER_BE.dto.CompanyDTO;
import FIXER.FIXER_BE.entity.Notice;
import FIXER.FIXER_BE.service.CompanyService;
import FIXER.FIXER_BE.service.NoticeService;
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
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/company")
@RequiredArgsConstructor
public class CompanyController {

    private final CompanyService companyService;
    private final NoticeService noticeService;
    private static final String UPLOAD_DIR = "uploads/";

        @GetMapping("/storesearch")
    public ResponseEntity<Map<String, Object>> getCompanies(@RequestParam(name = "pageSize", defaultValue = "0") int pageSize, @RequestParam(name = "lastId", required = false) Integer lastId) {
        System.out.println("히히히힣");
        List<CompanyDTO> companies = companyService.getCompanies(pageSize, lastId);
        boolean isNext = !companies.isEmpty() && companies.size() == pageSize;
        Map<String, Object> response = new HashMap<>();
        response.put("companies", companies);
        response.put("isNext", isNext);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/storeinfo/{companyId}")
    public ResponseEntity<CompanyDTO> getCompanyInfo(@PathVariable("companyId") Integer companyId) {
        CompanyDTO companyDTO = companyService.getCompanyInfo(companyId);
        return ResponseEntity.ok(companyDTO);
    }

    @PostMapping("/storeinfo/{companyId}/writenotice")
    public ResponseEntity<?> createNotice(
            @PathVariable("companyId") Integer companyId,
            @RequestParam("title") String title,
            @RequestParam("content") String content,
            @RequestParam(value = "file", required = false) MultipartFile file) {

        String filePath = null;

        try {
            if (file != null && !file.isEmpty()) {
                // 파일 저장 경로 설정
                String fileName = generateFileName(file.getOriginalFilename());
                Path path = Paths.get(UPLOAD_DIR, fileName);

                // 파일을 지정한 경로에 저장
                Files.createDirectories(path.getParent());
                file.transferTo(path.toFile());

                filePath = path.toString(); // 파일 경로 설정
            }

            // Notice 생성 및 저장
            Notice newNotice = noticeService.createNotice(companyId, title, content, filePath);

            return ResponseEntity.status(HttpStatus.CREATED).body(newNotice);

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
