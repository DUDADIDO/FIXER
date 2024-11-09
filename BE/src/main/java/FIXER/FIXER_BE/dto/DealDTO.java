package FIXER.FIXER_BE.dto;

public class DealDTO {
    private String platform;
    private String productName;
    private String price;
    private String imageUrl;
    private String link;

    public DealDTO(String platform, String productName, String price, String imageUrl, String link) {
        this.platform = platform;
        this.productName = productName;
        this.price = price;
        this.imageUrl = imageUrl;
        this.link = link;
    }

    public String getPlatform() {
        return platform;
    }

    public void setPlatform(String platform) {
        this.platform = platform;
    }

    public String getProductName() {
        return productName;
    }

    public void setProductName(String productName) {
        this.productName = productName;
    }

    public String getPrice() {
        return price;
    }

    public void setPrice(String price) {
        this.price = price;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public String getLink() {
        return link;
    }

    public void setLink(String link) {
        this.link = link;
    }
}
