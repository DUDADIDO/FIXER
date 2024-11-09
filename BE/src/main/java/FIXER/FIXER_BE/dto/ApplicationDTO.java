package FIXER.FIXER_BE.dto;

import java.sql.Timestamp;
import java.util.List;

public class ApplicationDTO {
    private Integer formId;
    private Integer userNum;
    private String userName; // user_name 필드 추가
    private String applicationPath;
    private Timestamp createdAt;
    private List<String> filePaths;

    public ApplicationDTO(Integer formId, Integer userNum, String userName, String applicationPath, Timestamp createdAt, List<String> filePaths) {
        this.formId = formId;
        this.userNum = userNum;
        this.userName = userName;
        this.applicationPath = applicationPath;
        this.createdAt = createdAt;
        this.filePaths = filePaths;
    }

    // Getters and Setters
    public Integer getFormId() {
        return formId;
    }

    public void setFormId(Integer formId) {
        this.formId = formId;
    }

    public Integer getUserNum() {
        return userNum;
    }

    public void setUserNum(Integer userNum) {
        this.userNum = userNum;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getApplicationPath() {
        return applicationPath;
    }

    public void setApplicationPath(String applicationPath) {
        this.applicationPath = applicationPath;
    }

    public Timestamp getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Timestamp createdAt) {
        this.createdAt = createdAt;
    }

    public List<String> getFilePaths() {
        return filePaths;
    }

    public void setFilePaths(List<String> filePaths) {
        this.filePaths = filePaths;
    }
}
