package FIXER.FIXER_BE.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
@Data
@NoArgsConstructor
@AllArgsConstructor
public class NoticeDTO {
    private String title;
    private String content;
    private String file;
}
