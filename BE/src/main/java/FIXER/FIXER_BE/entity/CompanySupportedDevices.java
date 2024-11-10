package FIXER.FIXER_BE.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "company_supported_devices")
public class CompanySupportedDevices {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "company_id", nullable = false)
    private Company company;

    @ManyToOne
    @JoinColumn(name = "brand_device_map_id", nullable = false)
    private BrandDeviceMap brandDeviceMap;

    // 필요한 필드 추가 및 생성자 정의
}
