package FIXER.FIXER_BE.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ReviewDTO {
    private Integer reviewId;
    private Integer index;
    private String author; // 작성자 이름
    private String comment;
    private String filePath;
    private LocalDateTime createdAt;
    private Double score;

    // 생성자
    public ReviewDTO(Integer reviewId, int index, String author, String comment, String filePath, LocalDateTime createdAt, Double score) {
        this.reviewId = reviewId;
        this.index = index;
        this.author = author;
        this.comment = comment;
        this.filePath = filePath;
        this.createdAt = createdAt;
        this.score = score;
    }

    // 필요한 생성자 추가 (reviewId, author, comment, filePath, createdAt, score 순서)
    public ReviewDTO(Integer reviewId, String author, String comment, String filePath, LocalDateTime createdAt, Double score) {
        this.reviewId = reviewId;
        this.author = author;
        this.comment = comment;
        this.filePath = filePath;
        this.createdAt = createdAt;
        this.score = score;
    }
}
