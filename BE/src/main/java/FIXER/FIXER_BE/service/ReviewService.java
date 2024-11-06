package FIXER.FIXER_BE.service;

import FIXER.FIXER_BE.dto.ReviewDTO;
import FIXER.FIXER_BE.entity.Company;
import FIXER.FIXER_BE.entity.Review;
import FIXER.FIXER_BE.repository.CompanyRepository;
import FIXER.FIXER_BE.repository.ReviewRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class ReviewService {

    private final ReviewRepository reviewRepository;
    private final CompanyRepository companyRepository;

    public Review createReview(Integer companyId, Integer userNum, ReviewDTO reviewDTO) {
        Company company = companyRepository.findById(companyId)
                .orElseThrow(() -> new IllegalArgumentException("Company not found with ID: " + companyId));

        Review review = Review.builder()
                .userNum(userNum)
                .company(company)
                .comment(reviewDTO.getComment())
                .imagesUrl(reviewDTO.getImagesUrl())
                .score(reviewDTO.getScore())
                .createdAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
                .build();

        return reviewRepository.save(review);
    }
}
