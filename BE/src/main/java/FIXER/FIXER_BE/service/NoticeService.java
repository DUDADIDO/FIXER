package FIXER.FIXER_BE.service;

import FIXER.FIXER_BE.dto.NoticeDTO;
import FIXER.FIXER_BE.entity.Company;
import FIXER.FIXER_BE.entity.Notice;
import FIXER.FIXER_BE.repository.CompanyRepository;
import FIXER.FIXER_BE.repository.NoticeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class NoticeService {

    private final NoticeRepository noticeRepository;
    private final CompanyRepository companyRepository;

    @Autowired
    public NoticeService(NoticeRepository noticeRepository, CompanyRepository companyRepository) {
        this.noticeRepository = noticeRepository;
        this.companyRepository = companyRepository;
    }

    public Notice createNotice(Integer companyId, NoticeDTO noticeDTO) {
        Company company = companyRepository.findById(companyId)
                .orElseThrow(() -> new IllegalArgumentException("Invalid company ID: " + companyId));

        Notice notice = Notice.builder()
                .company(company)
                .title(noticeDTO.getTitle())
                .content(noticeDTO.getContent())
                .build();

        return noticeRepository.save(notice);
    }
}
