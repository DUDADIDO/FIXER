package FIXER.FIXER_BE.dto.User;

import lombok.Data;

@Data
public class UserToken {
    private Integer user_num;
    private String user_name;
    private Integer user_type;
    private Integer my_store;
    private String token;
}
