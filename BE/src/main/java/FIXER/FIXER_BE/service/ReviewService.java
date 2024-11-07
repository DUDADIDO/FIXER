package FIXER.FIXER_BE.service;

import FIXER.FIXER_BE.dto.ReviewDTO;
import FIXER.FIXER_BE.entity.Company;
import FIXER.FIXER_BE.entity.Review;
import FIXER.FIXER_BE.entity.User;
import FIXER.FIXER_BE.repository.CompanyRepository;
import FIXER.FIXER_BE.repository.ReviewRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

@Service
@RequiredArgsConstructor
public class ReviewService {

    private final ReviewRepository reviewRepository;
    private final CompanyRepository companyRepository;

    public List<ReviewDTO> getReviewsByCompanyId(Integer companyId) {
        List<ReviewDTO> reviews = reviewRepository.findReviewsByCompanyIdWithUserName(companyId);

        // 인덱스를 추가해 `ReviewDTO` 리스트를 생성
        return IntStream.range(0, reviews.size())
                .mapToObj(i -> {
                    ReviewDTO review = reviews.get(i);
                    review.setIndex(i + 1);  // 인덱스를 추가
                    return review;
                })
                .collect(Collectors.toList());
    }

    public Review createReview(Integer companyId, Integer userNum, ReviewDTO reviewDTO) {
        Company company = companyRepository.findById(companyId)
                .orElseThrow(() -> new IllegalArgumentException("Company not found with ID: " + companyId));

        Review review = Review.builder()
                .user(User.builder().userNum(userNum).build())
                .company(company)
                .comment(reviewDTO.getComment())
                .imagesUrl(reviewDTO.getFilePath())
                .score(reviewDTO.getScore())
                .build();

        return reviewRepository.save(review);
    }
}
