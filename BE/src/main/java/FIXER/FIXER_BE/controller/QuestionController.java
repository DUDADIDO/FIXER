package FIXER.FIXER_BE.controller;

import FIXER.FIXER_BE.dto.QuestionDTO;
import FIXER.FIXER_BE.entity.Question;
import FIXER.FIXER_BE.service.QuestionService;
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

@RestController
@RequestMapping("/api/company")
@RequiredArgsConstructor
public class QuestionController {

    private final QuestionService questionService;
    private static final String UPLOAD_DIR = "uploads/";

    @Value("${base.url}")
    private String baseUrl;  // application.properties에서 base.url 값 주입

    @PostMapping("/storeinfo/{companyId}/writequestion")
    public ResponseEntity<?> createQuestion(
            @PathVariable("companyId") Integer companyId,
            @RequestParam("user_num") Integer userNum,
            @RequestParam("title") String title,
            @RequestParam("content") String content,
            @RequestParam(value = "file", required = false) MultipartFile file) {

        String fileDownloadUrl = null;

        if (file != null && !file.isEmpty()) {
            try {
                String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();
                Path path = Paths.get(System.getProperty("user.dir"), UPLOAD_DIR, fileName);
                Files.createDirectories(path.getParent());
                file.transferTo(path.toFile());

                // 파일 다운로드 URL 생성
                fileDownloadUrl = baseUrl + "/api/company/uploads/" + fileName;
            } catch (IOException e) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                        .body("File upload failed: " + e.getMessage());
            }
        }

        QuestionDTO questionDTO = new QuestionDTO(null, null, null, title, content, fileDownloadUrl, null, false);
        Question newQuestion = questionService.createQuestion(companyId, userNum, questionDTO);

        return ResponseEntity.status(HttpStatus.CREATED).body(newQuestion);
    }

    @GetMapping("/storeinfo/{companyId}/questions")
    public ResponseEntity<List<QuestionDTO>> getCompanyQuestions(@PathVariable("companyId") Integer companyId) {
        List<QuestionDTO> questions = questionService.getQuestionsByCompanyId(companyId);
        return ResponseEntity.ok(questions);
    }
}
