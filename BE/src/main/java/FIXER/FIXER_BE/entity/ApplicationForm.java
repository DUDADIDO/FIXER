package FIXER.FIXER_BE.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import java.sql.Timestamp;

@Entity
@Table(name = "application_forms")
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class ApplicationForm {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer formId;
    @Column(nullable = false) // userNum이 NOT NULL 필드임을 확인
    private Integer userNum;

    private String applicationPath;

    @Column(nullable = false, updatable = false, insertable = false, columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    private Timestamp createdAt;

    // Lombok이 기본 생성자와 모든 필드를 받는 생성자를 자동으로 생성합니다.
}
