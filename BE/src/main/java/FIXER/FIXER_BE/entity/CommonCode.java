package FIXER.FIXER_BE.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@Entity
@Table(name = "common_codes")
public class CommonCode {
    // Getter 및 Setter 메서드
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "code_id")
    private int codeId;
    @Column(name = "code_group")
    private String codeGroup;
    @Column(name = "code_value")
    private String codeValue;
    @Column(name = "code_name")
    private String codeName;

    // 기본 생성자
    public CommonCode() {}

}
