package FIXER.FIXER_BE.controller;

import FIXER.FIXER_BE.dto.ApplicationDTO;
import FIXER.FIXER_BE.entity.ApplicationForm;
import FIXER.FIXER_BE.entity.ApplicationFile;
import FIXER.FIXER_BE.service.ApplicationService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/application")
@RequiredArgsConstructor
public class ApplicationController {

    private final ApplicationService applicationService;
    private static final String UPLOAD_DIR = "uploads/";

    @Value("${base.url}")
    private String baseUrl;  // application.properties에서 base.url 값 주입

    @PostMapping("/storeregister")
    public ResponseEntity<?> registerApplication(
            @RequestParam("user_num") Integer userNum,
            @RequestParam("applicationForm") MultipartFile applicationForm,
            @RequestParam("zipFiles") List<MultipartFile> zipFiles) {
            System.out.println("userNum: " + userNum);
        String applicationPath = null;

        try {
            // 신청서 파일 저장
            if (applicationForm != null && !applicationForm.isEmpty()) {
                String fileName = System.currentTimeMillis() + "_" + applicationForm.getOriginalFilename();
                Path path = Paths.get(System.getProperty("user.dir"), UPLOAD_DIR, fileName);
                Files.createDirectories(path.getParent());
                applicationForm.transferTo(path.toFile());
                applicationPath = baseUrl + "/api/company/uploads/" + fileName;
            }

            // 동영상 및 자료 파일 저장
            List<String> fileUrls = zipFiles.stream().map(file -> {
                try {
                    String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();
                    Path path = Paths.get(System.getProperty("user.dir"), UPLOAD_DIR, fileName);
                    Files.createDirectories(path.getParent());
                    file.transferTo(path.toFile());
                    return baseUrl + "/api/company/uploads/" + fileName;
                } catch (IOException e) {
                    throw new RuntimeException("File upload failed: " + e.getMessage());
                }
            }).collect(Collectors.toList());

            // 데이터베이스에 신청서 및 파일 정보 저장
            ApplicationForm newForm = applicationService.createApplicationForm(userNum, applicationPath, fileUrls);

            return ResponseEntity.status(HttpStatus.CREATED).body(newForm);
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("File upload failed: " + e.getMessage());
        }
    }
    @GetMapping
    public ResponseEntity<List<ApplicationDTO>> getAllApplications() {
        List<ApplicationDTO> applications = applicationService.getAllApplications();
        return ResponseEntity.ok(applications);
    }

}
