package FIXER.FIXER_BE.controller;

import FIXER.FIXER_BE.dto.ReviewDTO;
import FIXER.FIXER_BE.entity.Review;
import FIXER.FIXER_BE.service.ReviewService;
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
public class ReviewController {

    private final ReviewService reviewService;
    private static final String UPLOAD_DIR = "uploads/";

    @Value("${base.url}")
    private String baseUrl;  // application.properties에서 base.url 값 주입

    @GetMapping("/storeinfo/{companyId}/reviews")
    public ResponseEntity<List<ReviewDTO>> getCompanyReviews(@PathVariable("companyId") Integer companyId) {
        List<ReviewDTO> reviews = reviewService.getReviewsByCompanyId(companyId);
        return ResponseEntity.ok(reviews);
    }

    @PostMapping("/storeinfo/{companyId}/writereview")
    public ResponseEntity<?> createReview(
            @PathVariable("companyId") Integer companyId,
            @RequestParam("user_num") Integer userNum,
            @RequestParam("comment") String comment,
            @RequestParam("score") Double score,
            @RequestParam(value = "file", required = false) MultipartFile file) {

        String imagesUrl = null;

        if (file != null && !file.isEmpty()) {
            try {
                String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();
                Path path = Paths.get(System.getProperty("user.dir"), UPLOAD_DIR, fileName);
                Files.createDirectories(path.getParent());
                file.transferTo(path.toFile());

                // 파일 다운로드 URL 생성
                imagesUrl = baseUrl + "/api/company/uploads/" + fileName;
            } catch (IOException e) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                        .body("File upload failed: " + e.getMessage());
            }
        }

        ReviewDTO reviewDTO = new ReviewDTO(null, null, null, null, comment, imagesUrl, null, score);
        Review newReview = reviewService.createReview(companyId, userNum, reviewDTO);

        return ResponseEntity.status(HttpStatus.CREATED).body(newReview);
    }
}
