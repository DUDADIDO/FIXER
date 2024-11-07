package FIXER.FIXER_BE.controller;

import FIXER.FIXER_BE.dto.ReviewDTO;
import FIXER.FIXER_BE.entity.Review;
import FIXER.FIXER_BE.service.ReviewService;
import lombok.RequiredArgsConstructor;
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
            String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();
            Path filePath = Paths.get(UPLOAD_DIR, fileName);

            try {
                Files.createDirectories(filePath.getParent());
                file.transferTo(filePath.toFile());
                imagesUrl = filePath.toString();
            } catch (IOException e) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                        .body("File upload failed: " + e.getMessage());
            }
        }

        ReviewDTO reviewDTO = new ReviewDTO(null, null, null, comment, imagesUrl, score);
        Review newReview = reviewService.createReview(companyId, userNum, reviewDTO);

        return ResponseEntity.status(HttpStatus.CREATED).body(newReview);
    }
}
