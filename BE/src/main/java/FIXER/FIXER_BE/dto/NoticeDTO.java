package FIXER.FIXER_BE.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class NoticeDTO {
    private Integer noticeId; // notice_id 추가
    private Integer index;
    private String title;
    private String content;
    private String filePath;
    private LocalDateTime createdAt;
}
