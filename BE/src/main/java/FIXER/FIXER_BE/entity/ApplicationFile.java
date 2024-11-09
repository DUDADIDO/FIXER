package FIXER.FIXER_BE.entity;

import jakarta.persistence.*;
import lombok.*;

import java.sql.Timestamp;

@Entity
@Table(name = "application_files")
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ApplicationFile {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer fileId;

    private Integer formId;
    private String filePath;

    @Column(nullable = false, updatable = false, insertable = false, columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    private Timestamp uploadedAt;
}
