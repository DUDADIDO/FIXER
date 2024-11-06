package FIXER.FIXER_BE.dto;

import FIXER.FIXER_BE.entity.User;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor // 모든 필드를 초기화하는 생성자 추가
public class UserDTO {
    private Integer userNum;

    @JsonProperty("user_id")
    private String userId;

    @JsonProperty("user_pw")
    private String password;

    @JsonProperty("user_name")
    private String userName;

    @JsonProperty("user_email")
    private String userEmail;

    private Integer userState;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public static UserDTO fromEntity(User user) {
        return UserDTO.builder()
                .userNum(user.getUserNum())
                .userId(user.getUserId())
                .password(user.getPassword())
                .userName(user.getUserName())
                .userEmail(user.getUserEmail())
                .userState(user.getUserState())
                .createdAt(user.getCreatedAt())
                .updatedAt(user.getUpdatedAt())
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
                .createdAt(this.createdAt)
                .updatedAt(this.updatedAt)
                .build();
    }
}
