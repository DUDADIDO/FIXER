package FIXER.FIXER_BE.entity;

import jakarta.persistence.*;
import lombok.*;

import java.sql.Date;

@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity

@Table(name = "Users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_num")
    private Integer userNum;

    @Column(name = "user_id")
    private String userId;

    @Setter
    @Column(name = "user_pw")
    private String password;

    @Setter
    @Column(name = "user_name")
    private String userName;

    @Setter
    @Column(name = "user_email")
    private String userEmail;

    @Setter
    @Column(name = "user_state")
    private Integer userState;

    @Column(name = "created_at")
    private Date createdAt;

    @Setter
    @Column(name = "updated_at")
    private Date updatedAt;

    @Builder
    public User(Integer userNum, String userId, String password, String userName, String userEmail, Integer userState, Date createdAt, Date updatedAt) {
        this.userNum = userNum;
        this.userId = userId;
        this.password = password;
        this.userName = userName;
        this.userEmail = userEmail;
        this.userState = userState;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}
