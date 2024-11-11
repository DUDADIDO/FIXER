package FIXER.FIXER_BE.service;

import FIXER.FIXER_BE.dto.DealDTO;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.WebDriver;

import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.TimeUnit;

@Service
public class SaleService {

    // Selenium을 사용하여 무한 스크롤 페이지에서 최대 500개의 제품만 크롤링하는 메소드
    public List<DealDTO> getLimitedDeals() {
        List<DealDTO> productList = new ArrayList<>();
        ChromeOptions options = new ChromeOptions();
        options.addArguments("--headless"); // Headless 모드 활성화
        options.addArguments("--no-sandbox"); // 추가한 옵션
        options.addArguments("--disable-dev-shm-usage");
        options.addArguments("--disable-gpu"); // 추가한 옵션
        options.addArguments("--ignore-ssl-errors=yes");
        options.addArguments("--ignore-certificate-errors");
        WebDriver driver = new ChromeDriver(options);

        try {
            driver.manage().timeouts().implicitlyWait(10, TimeUnit.SECONDS);
            driver.get("https://www.algumon.com/category/2");

            // 페이지 끝까지 스크롤하여 최대 500개의 제품 로드
            JavascriptExecutor js = (JavascriptExecutor) driver;
            long lastHeight = (long) js.executeScript("return document.body.scrollHeight");
            int productCount = 0;

            while (productCount < 500) {
                js.executeScript("window.scrollTo(0, document.body.scrollHeight);");
                Thread.sleep(1000); // 페이지 로딩 대기

                long newHeight = (long) js.executeScript("return document.body.scrollHeight");
                if (newHeight == lastHeight) {
                    break;
                }
                lastHeight = newHeight;

                // Jsoup을 사용하여 현재 페이지 HTML 파싱
                Document doc = Jsoup.parse(driver.getPageSource());
                Elements products = doc.select("ul.product.post-list > li");
                productCount = products.size();

                // 500개 이상의 제품을 로드하면 반복문 종료
                if (productCount >= 500) {
                    break;
                }
            }

            // Jsoup을 사용하여 현재 페이지 HTML 파싱
            Document doc = Jsoup.parse(driver.getPageSource());
            Elements products = doc.select("ul.product.post-list > li");

            // 각 제품 요소에 대해 최대 500개만 처리
            int count = 0;
            for (Element product : products) {
                if (count >= 500) {
                    break;
                }
                String platform = "";
                String productName = "";
                String price = "";
                String imageUrl = "";
                String link = "";

                // 전체 텍스트를 추출하여 플랫폼, 제품명, 가격으로 나누기
                String dealText = product.text();
                String[] parts = dealText.split(" ");

                // 플랫폼 이름 추출 (첫 번째 부분)
                if (parts.length > 0) {
                    platform = parts[0];
                }

                // 가격 추출 (마지막에 "원"이 포함된 부분)
                for (String part : parts) {
                    if (part.contains("원")) {
                        price = part;
                        break;
                    }
                }

                // 제품명 추출 (플랫폼과 가격 사이의 부분)
                int startIndex = dealText.indexOf(platform) + platform.length();
                int endIndex = dealText.indexOf(price);
                if (startIndex < endIndex && endIndex > 0) {
                    productName = dealText.substring(startIndex, endIndex).trim();
                }

                // 이미지 요소에서 src 속성 추출 (만약 이미지가 존재한다면)
                Element imgElement = product.selectFirst("img");
                if (imgElement != null) {
                    imageUrl = imgElement.attr("src");
                }

                // 링크 요소에서 href 속성 추출 (만약 링크가 존재한다면)
                Element linkElement = product.selectFirst("a");
                if (linkElement != null) {
                    link = linkElement.attr("href");
                    // 상대 경로인 경우 절대 경로로 변환
                    if (!link.startsWith("http")) {
                        link = "https://www.algumon.com" + link;
                    }
                }

                // DealDto에 데이터를 추가
                if (!platform.isEmpty() && !productName.isEmpty() && !price.isEmpty() && !imageUrl.isEmpty() && !link.isEmpty()) {
                    DealDTO dealDto = new DealDTO(platform, productName, price, imageUrl, link);
                    productList.add(dealDto);
                }
                count++;
            }
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            driver.quit();
        }
        return productList;
    }

    // 일정 시간마다 실행하여 실시간으로 크롤링 데이터를 가져오는 메소드
    @Scheduled(fixedRate = 60000) // 1분마다 실행
    public void scheduledCrawling() {
        List<DealDTO> deals = getLimitedDeals();

        // 크롤링한 데이터 출력 (추후 데이터베이스 저장 등의 처리 가능)
        System.out.println("실시간 딜 목록:");
        for (DealDTO deal : deals) {
            System.out.println(deal.getPlatform() + " - " + deal.getProductName() + " - " + deal.getPrice() + " - " + deal.getImageUrl() + " - " + deal.getLink());
        }
    }
}