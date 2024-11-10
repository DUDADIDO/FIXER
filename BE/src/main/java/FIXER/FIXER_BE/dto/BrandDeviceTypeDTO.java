package FIXER.FIXER_BE.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class BrandDeviceTypeDTO {
    private Integer brandDeviceMapId;
    private Integer brandId;
    private String brandName;
    private Integer deviceTypeId;
    private String deviceTypeName;

    // 생성자, getter, setter
}
