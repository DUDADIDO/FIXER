package FIXER.FIXER_BE.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AnswerDTO {
    private Integer answerId;
    private Integer questionId;
    private Integer userNum;
    private String content;
    private LocalDateTime createdAt;
}
