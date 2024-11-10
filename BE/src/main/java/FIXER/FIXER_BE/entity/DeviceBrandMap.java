package FIXER.FIXER_BE.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "device_brand_map")
public class DeviceBrandMap {

    @EmbeddedId
    private DeviceBrandMapId id;

    @ManyToOne
    @JoinColumn(name = "brand_id", referencedColumnName = "code_id", insertable = false, updatable = false)
    private CommonCode brand;

    @ManyToOne
    @JoinColumn(name = "device_type_id", referencedColumnName = "code_id", insertable = false, updatable = false)
    private CommonCode deviceType;

    // 기본 생성자
    public DeviceBrandMap() {}

    // Getter 및 Setter
    public DeviceBrandMapId getId() {
        return id;
    }

    public void setId(DeviceBrandMapId id) {
        this.id = id;
    }

    public CommonCode getBrand() {
        return brand;
    }

    public void setBrand(CommonCode brand) {
        this.brand = brand;
    }

    public CommonCode getDeviceType() {
        return deviceType;
    }

    public void setDeviceType(CommonCode deviceType) {
        this.deviceType = deviceType;
    }
}
