package FIXER.FIXER_BE.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import java.time.LocalDateTime;

@Data
@AllArgsConstructor
public class NoticeDTO {
    private Integer index; // 공지사항 인덱스
    private String title;
    private String content;
    private String filePath;
    private LocalDateTime createdAt;
}
