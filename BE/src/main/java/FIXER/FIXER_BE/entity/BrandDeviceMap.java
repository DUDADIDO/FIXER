package FIXER.FIXER_BE.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "brand_device_map", uniqueConstraints = {
        @UniqueConstraint(columnNames = {"brand_id", "device_type_id"})
})
public class BrandDeviceMap {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "brand_id", referencedColumnName = "id", nullable = false)
    private Brand brand;

    @ManyToOne
    @JoinColumn(name = "device_type_id", referencedColumnName = "id", nullable = false)
    private DeviceType deviceType;

    // 기본 생성자
    public BrandDeviceMap() {}
}
