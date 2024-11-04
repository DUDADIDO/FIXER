package FIXER.FIXER_BE.dto;

import FIXER.FIXER_BE.entity.User;
import lombok.Builder;
import lombok.Data;
import java.sql.Date;

@Data
@Builder
public class UserDTO {
    private Integer userNum;
    private String userId;
    private String password;
    private String userName;
    private String userEmail;
    private Integer userState;
    private String createdAt;
    private String updatedAt;

    public static UserDTO fromEntity(User user) {
        return UserDTO.builder()
                .userNum(user.getUserNum())
                .userId(user.getUserId())
                .password(user.getPassword())
                .userName(user.getUserName())
                .userEmail(user.getUserEmail())
                .userState(user.getUserState())
                .createdAt(user.getCreatedAt().toString())
                .updatedAt(user.getUpdatedAt().toString())
                .build();
    }

    public User toEntity() {
        return User.builder()
                .userNum(this.userNum)
                .userId(this.userId)
                .password(this.password)
                .userName(this.userName)
                .userEmail(this.userEmail)
                .userState(this.userState)
                .createdAt(Date.valueOf(this.createdAt))
                .updatedAt(Date.valueOf(this.updatedAt))
                .build();
    }
}
