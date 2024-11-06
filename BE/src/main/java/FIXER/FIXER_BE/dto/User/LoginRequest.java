package FIXER.FIXER_BE.dto.User;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LoginRequest {
    private String user_id;
    private String user_pw;
}