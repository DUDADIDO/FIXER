package FIXER.FIXER_BE.dto.User;

import lombok.Data;

@Data
public class ChangePasswordRequest {
    private Integer userNum;   // 사용자 고유 번호
    private String user_pw;    // 새 비밀번호
}
