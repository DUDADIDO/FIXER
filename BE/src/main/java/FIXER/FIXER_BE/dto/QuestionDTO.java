package FIXER.FIXER_BE.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class QuestionDTO {
    private String title;
    private String content;
    private String filePath; // 파일 경로 필드 추가
}
