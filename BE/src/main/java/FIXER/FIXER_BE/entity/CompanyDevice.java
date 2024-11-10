package FIXER.FIXER_BE.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "company_devices")
public class CompanyDevice {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "company_device_id")
    private Integer companyDeviceId;

    @Column(name = "company_id")
    private Integer companyId;

    @Column(name = "brand_id")
    private Integer brandId;

    @Column(name = "device_type_id")
    private Integer deviceTypeId;

    // 기본 생성자
    public CompanyDevice() {}
}
