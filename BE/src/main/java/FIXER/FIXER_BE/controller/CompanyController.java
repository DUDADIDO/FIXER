package FIXER.FIXER_BE.controller;

import FIXER.FIXER_BE.dto.CompanyDTO;
import FIXER.FIXER_BE.dto.NoticeDTO;
import FIXER.FIXER_BE.dto.SupportedDeviceDTO;
import FIXER.FIXER_BE.entity.Notice;
import FIXER.FIXER_BE.repository.CompanyRepository;
import FIXER.FIXER_BE.service.CompanyService;
import FIXER.FIXER_BE.service.NoticeService;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;

import org.springframework.web.bind.annotation.*;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.MalformedURLException;
import java.net.URLDecoder;
import java.net.URLEncoder;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/company")
@RequiredArgsConstructor
public class CompanyController {

    private final CompanyService companyService;
    private final NoticeService noticeService;
    private final CompanyRepository companyRepository;
    private static final String UPLOAD_DIR = "uploads/";

    @Value("${base.url}")
    private String baseUrl;  // application.properties에서 base.url 값 주입
    @GetMapping("/storesearch")
    public ResponseEntity<Map<String, Object>> getCompanies(
            @RequestParam(name = "pageSize", defaultValue = "0") int pageSize,
            @RequestParam(name = "lastId", required = false) Integer lastId) {

        List<CompanyDTO> companies = companyService.getCompanies(pageSize, lastId);
        boolean isNext = !companies.isEmpty() && companies.size() == pageSize;
        Map<String, Object> response = new HashMap<>();
        response.put("companies", companies);
        response.put("isNext", isNext);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/storeinfo/{companyId}")
    public ResponseEntity<CompanyDTO> getCompanyInfo(@PathVariable("companyId") Integer companyId) {
        CompanyDTO companyDTO = companyService.getCompanyInfo(companyId);
        return ResponseEntity.ok(companyDTO);
    }

    @PostMapping("/storeinfo/{companyId}/writenotice")
    public ResponseEntity<?> createNotice(
            @PathVariable("companyId") Integer companyId,
            @RequestParam("title") String title,
            @RequestParam("content") String content,
            @RequestParam(value = "file", required = false) MultipartFile file) {

        String filePath = null;
        String fileDownloadUrl = null;

        try {
            if (file != null && !file.isEmpty()) {
                // 파일 저장 경로 설정
                String fileName = generateFileName(file.getOriginalFilename());
                Path path = Paths.get(System.getProperty("user.dir"), UPLOAD_DIR, fileName);

                // uploads 디렉토리가 없으면 생성
                Files.createDirectories(path.getParent());

                // 파일을 지정한 경로에 저장
                file.transferTo(path.toFile());
                filePath = path.toString();

                // 파일 다운로드 URL 생성
                fileDownloadUrl = baseUrl + "/api/company/uploads/" + fileName;
            }

            // Notice 생성 및 저장
            Notice newNotice = noticeService.createNotice(companyId, title, content, fileDownloadUrl);
            return ResponseEntity.status(HttpStatus.CREATED).body(newNotice);

        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("File upload failed: " + e.getMessage());
        }
    }

    // 파일 제공 엔드포인트
    @GetMapping("/uploads/**")
    @ResponseBody
    public ResponseEntity<Resource> serveFile(HttpServletRequest request) {
        try {
            // URL에서 파일 경로를 동적으로 추출
            String requestPath = request.getRequestURI().replace("/api/company/uploads/", "");
            requestPath = URLDecoder.decode(requestPath, "UTF-8"); // 한글 경로 디코딩
            Path filePath = Paths.get(System.getProperty("user.dir"), UPLOAD_DIR, requestPath);

            // 파일이 존재하고 읽을 수 있는지 확인
            if (!Files.exists(filePath) || !Files.isReadable(filePath)) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
            }

            // 파일 리소스를 읽어옴
            Resource resource = new UrlResource(filePath.toUri());

            // 파일 MIME 타입 지정
            String contentType = Files.probeContentType(filePath);
            if (contentType == null) {
                contentType = "application/octet-stream";
            }

            // 파일 응답
            return ResponseEntity.ok()
                    .contentType(MediaType.parseMediaType(contentType))
                    .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + URLEncoder.encode(filePath.getFileName().toString(), "UTF-8") + "\"")
                    .body(resource);
        } catch (MalformedURLException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }


    @GetMapping("/storeinfo/{companyId}/notices")
    public ResponseEntity<List<NoticeDTO>> getCompanyNotices(@PathVariable("companyId") Integer companyId) {
        List<NoticeDTO> notices = noticeService.getNoticesByCompanyId(companyId);
        return ResponseEntity.ok(notices);
    }




    // 파일 이름을 고유하게 생성하는 유틸리티 메서드
    private String generateFileName(String originalFileName) {
        String timestamp = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyyMMddHHmmss"));
        return timestamp + "_" + originalFileName;
    }


    @PostMapping("/storeregister")
    public ResponseEntity<String> uploadFiles(
            @RequestParam("excelFile") MultipartFile excelFile,
            @RequestParam("logoFile") MultipartFile logoFile) {
        String logoFilePath = null;

        try {
            // 로고 파일 저장 경로 설정 및 파일 저장
            if (logoFile != null && !logoFile.isEmpty()) {
                String logoFileName = generateFileName(logoFile.getOriginalFilename());
                Path logoPath = Paths.get(System.getProperty("user.dir"), UPLOAD_DIR, "logos", logoFileName);
                Files.createDirectories(logoPath.getParent());
                logoFile.transferTo(logoPath.toFile());
                logoFilePath = baseUrl + "/api/company/uploads/logos/" + logoFileName; // 프론트엔드에서 접근 가능한 URL 경로
            }

            // 엑셀 파일은 메모리 내에서 읽어와 처리하고 회사 정보를 저장
            Integer companyId = companyService.saveCompanyData(excelFile, logoFilePath);

            // 회사 정보가 성공적으로 저장된 후 기본 수리 품목을 삽입
            if (companyId != null) {
                // 기본 수리 품목 예: 삼성 TV (brand_device_map_id: 1)
                companyService.addDefaultSupportedDevice(companyId, 1); // 여기서 1은 brand_device_map_id를 의미
            }

            return ResponseEntity.ok("Files processed successfully");
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("File upload failed: " + e.getMessage());
        }
    }


    @PostMapping(value = "/storeinfo/{companyId}/update")
    public ResponseEntity<CompanyDTO> updateCompany(
            @PathVariable("companyId") Integer companyId,
            @RequestPart("companyDTO") CompanyDTO companyDTO,
            @RequestPart(value = "logoFile", required = false) MultipartFile logoFile,
            @RequestPart("supportedDeviceIds") String supportedDeviceIds
    ) {
        try {
            // 기존 회사 정보 조회
            CompanyDTO existingCompany = companyService.getCompanyInfo(companyId);

            // 기존 로고 경로 유지 (기존 회사 정보에서 로고 경로를 가져옴)
            String logoFilePath = (existingCompany != null && existingCompany.getLogo() != null)
                    ? existingCompany.getLogo()
                    : "";

            // 로고 파일이 null이거나 비어 있는 경우 기존 로고 파일 경로를 유지
            if (logoFile != null && !logoFile.isEmpty()) {
                // 로고 파일이 있는 경우에만 파일 저장 로직 실행
                String logoFileName = generateFileName(logoFile.getOriginalFilename());
                Path logoPath = Paths.get(System.getProperty("user.dir"), "uploads", "logos", logoFileName);
                Files.createDirectories(logoPath.getParent());
                logoFile.transferTo(logoPath.toFile());
                logoFilePath = "/api/company/uploads/logos/" + logoFileName; // 새 경로 설정
            }

            // companyDTO에 로고 파일 경로를 설정 (기존 로고 경로 혹은 새로운 경로)
            companyDTO.setLogo(logoFilePath);
            companyDTO.setCompanyId(companyId);

            // supportedDeviceIds를 JSON 문자열에서 List<Integer>로 변환
            List<Integer> supportedDeviceIdList = Arrays.asList(new ObjectMapper().readValue(supportedDeviceIds, Integer[].class));

            // 회사 정보 업데이트
            CompanyDTO updatedCompany = companyService.updateCompany(companyDTO, logoFilePath);

            // 지원 기기 정보 업데이트
            companyService.updateSupportedDevices(companyId, supportedDeviceIdList);

            return (updatedCompany != null) ? ResponseEntity.ok(updatedCompany) : ResponseEntity.notFound().build();
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }







    @GetMapping("/{companyId}/supported-devices")
    public ResponseEntity<List<SupportedDeviceDTO>> getSupportedDevices(@PathVariable Integer companyId) {
        List<SupportedDeviceDTO> supportedDevices = companyService.getSupportedDevices(companyId);
        return ResponseEntity.ok(supportedDevices);
    }



}
