package FIXER.FIXER_BE.service;

import FIXER.FIXER_BE.dto.NoticeDTO;
import FIXER.FIXER_BE.entity.Company;
import FIXER.FIXER_BE.entity.Notice;
import FIXER.FIXER_BE.repository.CompanyRepository;
import FIXER.FIXER_BE.repository.NoticeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

@Service
@RequiredArgsConstructor
public class NoticeService {

    private final NoticeRepository noticeRepository;
    private final CompanyRepository companyRepository;

    public Notice createNotice(Integer companyId, String title, String content, String filePath) {
        Company company = companyRepository.findById(companyId)
                .orElseThrow(() -> new IllegalArgumentException("Company not found with id: " + companyId));

        Notice notice = Notice.builder()
                .company(company)
                .title(title)
                .content(content)
                .createdAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
                .filePath(filePath)
                .build();

        return noticeRepository.save(notice);
    }

    // 회사별 공지사항 목록을 가져와 notice_id 기준으로 정렬 후 인덱스 설정
    public List<NoticeDTO> getNoticesByCompanyId(Integer companyId) {
        List<Notice> notices = noticeRepository.findByCompanyCompanyIdOrderByNoticeIdAsc(companyId);

        // notice_id 오름차순으로 인덱스와 noticeId를 포함해 NoticeDTO 리스트 생성
        return IntStream.range(0, notices.size())
                .mapToObj(i -> {
                    Notice notice = notices.get(i);
                    return new NoticeDTO(
                            notice.getNoticeId(), // noticeId
                            i + 1, // 작은 순서대로 부여된 인덱스
                            notice.getTitle(),
                            notice.getContent(),
                            notice.getFilePath(),
                            notice.getCreatedAt()
                    );
                })
                .collect(Collectors.toList());
    }
}
