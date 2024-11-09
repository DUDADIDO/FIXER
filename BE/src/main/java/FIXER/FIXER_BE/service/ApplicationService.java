package FIXER.FIXER_BE.service;

import FIXER.FIXER_BE.dto.ApplicationDTO;
import FIXER.FIXER_BE.entity.ApplicationForm;
import FIXER.FIXER_BE.entity.ApplicationFile;
import FIXER.FIXER_BE.repository.ApplicationFormRepository;
import FIXER.FIXER_BE.repository.ApplicationFileRepository;
import FIXER.FIXER_BE.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import FIXER.FIXER_BE.entity.User;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ApplicationService {

    private final ApplicationFormRepository formRepository;
    private final ApplicationFileRepository fileRepository;
    private final UserRepository userRepository;

    @Transactional
    public ApplicationForm createApplicationForm(Integer userNum, String applicationPath, List<String> fileUrls) {
        ApplicationForm form = new ApplicationForm(null, userNum, applicationPath, null);
        form = formRepository.save(form);

        // 각 파일 URL을 `application_files` 테이블에 저장
        for (String url : fileUrls) {
            ApplicationFile file = ApplicationFile.builder()
                    .formId(form.getFormId())
                    .filePath(url)
                    .uploadedAt(null)
                    .build();
            fileRepository.save(file);
        }

        return form;
    }
    public List<ApplicationDTO> getAllApplications() {
        return formRepository.findAll().stream()
                .map(form -> {
                    // 파일 경로 리스트를 가져옴
                    List<String> filePaths = fileRepository.findByFormId(form.getFormId())
                            .stream()
                            .map(ApplicationFile::getFilePath)
                            .collect(Collectors.toList());

                    // user_num을 사용해 user_name 조회
                    String userName = userRepository.findByUserNum(form.getUserNum())
                            .map(User::getUserName)
                            .orElse("Unknown"); // user가 없을 경우 기본값 설정

                    return new ApplicationDTO(
                            form.getFormId(),
                            form.getUserNum(),
                            userName,  // user_name 추가
                            form.getApplicationPath(),
                            form.getCreatedAt(),
                            filePaths
                    );
                })
                .collect(Collectors.toList());
    }
}
