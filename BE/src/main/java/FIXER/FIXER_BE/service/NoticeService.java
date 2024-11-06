package FIXER.FIXER_BE.service;

import FIXER.FIXER_BE.dto.NoticeDTO;
import FIXER.FIXER_BE.entity.Company;
import FIXER.FIXER_BE.entity.Notice;
import FIXER.FIXER_BE.repository.CompanyRepository;
import FIXER.FIXER_BE.repository.NoticeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class NoticeService {

    private final NoticeRepository noticeRepository;
    private final CompanyRepository companyRepository;

    public Notice createNotice(Integer companyId, String title, String content, String filePath) {
        // Company 엔티티 찾기
        Company company = companyRepository.findById(companyId)
                .orElseThrow(() -> new IllegalArgumentException("Company not found with id: " + companyId));

        // Notice 엔티티 생성
        Notice notice = Notice.builder()
                .company(company)
                .title(title)
                .content(content)
                .createdAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
                .filePath(filePath)  // 파일 경로 추가
                .build();

        // Notice 저장
        return noticeRepository.save(notice);
    }
}
