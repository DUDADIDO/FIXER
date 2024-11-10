package FIXER.FIXER_BE.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class SupportedDeviceDTO {
    private Integer companyId;
    private Integer deviceId;
    private Integer brandId;
    private Integer brandDeviceMapId;

    // 생성자, getter, setter
}