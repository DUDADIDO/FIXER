package FIXER.FIXER_BE.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class QuestionDTO {
    private Integer questionId;
    private Integer index;
    private String author; // 작성자 이름
    private String title;
    private String content;
    private String filePath;
    private Boolean answerCheck;
}
