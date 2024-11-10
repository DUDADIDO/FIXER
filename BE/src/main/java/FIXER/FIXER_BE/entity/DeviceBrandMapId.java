package FIXER.FIXER_BE.entity;

import java.io.Serializable;
import java.util.Objects;
import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;

@Embeddable
public class DeviceBrandMapId implements Serializable {

    @Column(name = "brand_id")
    private int brandId;

    @Column(name = "device_type_id")
    private int deviceTypeId;

    // 기본 생성자
    public DeviceBrandMapId() {}

    // 생성자
    public DeviceBrandMapId(int brandId, int deviceTypeId) {
        this.brandId = brandId;
        this.deviceTypeId = deviceTypeId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        DeviceBrandMapId that = (DeviceBrandMapId) o;
        return brandId == that.brandId && deviceTypeId == that.deviceTypeId;
    }

    @Override
    public int hashCode() {
        return Objects.hash(brandId, deviceTypeId);
    }

    // Getter 및 Setter
    public int getBrandId() {
        return brandId;
    }

    public void setBrandId(int brandId) {
        this.brandId = brandId;
    }

    public int getDeviceTypeId() {
        return deviceTypeId;
    }

    public void setDeviceTypeId(int deviceTypeId) {
        this.deviceTypeId = deviceTypeId;
    }
}
