package FIXER.FIXER_BE.dto.User;

import lombok.Data;

@Data
public class UserToken {
    private Integer user_num;
    private String user_name;
    private String token;
}
