package FIXER.FIXER_BE.controller;

import FIXER.FIXER_BE.dto.QuestionDTO;
import FIXER.FIXER_BE.entity.Question;
import FIXER.FIXER_BE.service.QuestionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@RestController
@RequestMapping("/api/company")
@RequiredArgsConstructor
public class QuestionController {

    private final QuestionService questionService;
    private static final String UPLOAD_DIR = "uploads/"; // 파일 업로드 경로

    @PostMapping("/storeinfo/{companyId}/writequestion")
    public ResponseEntity<?> createQuestion(
            @PathVariable("companyId") Integer companyId,
            @RequestParam("user_num") Integer userNum,
            @RequestParam("title") String title,
            @RequestParam("content") String content,
            @RequestParam(value = "file", required = false) MultipartFile file) {

        String filePath = null;
        if (file != null && !file.isEmpty()) {
            try {
                String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();
                Path path = Paths.get(UPLOAD_DIR, fileName);
                Files.createDirectories(path.getParent());
                file.transferTo(path.toFile());
                filePath = path.toString(); // 파일 경로 저장
            } catch (IOException e) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                        .body("File upload failed: " + e.getMessage());
            }
        }

        // QuestionDTO 생성 및 서비스 호출
        QuestionDTO questionDTO = new QuestionDTO(title, content, filePath);
        Question newQuestion = questionService.createQuestion(companyId, userNum, questionDTO);

        return ResponseEntity.status(HttpStatus.CREATED).body(newQuestion);
    }
}
