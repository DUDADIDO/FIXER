package FIXER.FIXER_BE.repository;

import FIXER.FIXER_BE.dto.ReviewDTO;
import FIXER.FIXER_BE.entity.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.data.repository.query.Param;

import java.util.List;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Integer> {

    @Query("SELECT new FIXER.FIXER_BE.dto.ReviewDTO(r.reviewId, u.userName, r.comment, r.imagesUrl, r.createdAt, r.score) " +
            "FROM Review r JOIN r.user u WHERE r.company.companyId = :companyId ORDER BY r.reviewId ASC")
    List<ReviewDTO> findReviewsByCompanyIdWithUserName(@Param("companyId") Integer companyId);

    @Query("SELECT new FIXER.FIXER_BE.dto.ReviewDTO(r.reviewId, u.userName, r.comment, r.imagesUrl, r.createdAt, r.score) " +
            "FROM Review r JOIN r.user u WHERE r.user.userNum = :userNum ORDER BY r.reviewId ASC")
    List<ReviewDTO> findReviewsByUserNum(@Param("userNum") Integer userNum);
}
