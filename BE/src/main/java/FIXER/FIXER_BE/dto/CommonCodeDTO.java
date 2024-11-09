package FIXER.FIXER_BE.dto;


public class CommonCodeDTO {
    private int codeId;
    private String codeName;

    // 생성자
    public CommonCodeDTO(int codeId, String codeName) {
        this.codeId = codeId;
        this.codeName = codeName;
    }

    // Getter 및 Setter
    public int getCodeId() {
        return codeId;
    }

    public void setCodeId(int codeId) {
        this.codeId = codeId;
    }

    public String getCodeName() {
        return codeName;
    }

    public void setCodeName(String codeName) {
        this.codeName = codeName;
    }
}
