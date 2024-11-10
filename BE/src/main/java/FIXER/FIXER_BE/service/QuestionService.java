package FIXER.FIXER_BE.service;

import FIXER.FIXER_BE.dto.QuestionDTO;
import FIXER.FIXER_BE.entity.Company;
import FIXER.FIXER_BE.entity.Question;
import FIXER.FIXER_BE.entity.User;
import FIXER.FIXER_BE.repository.CompanyRepository;
import FIXER.FIXER_BE.repository.QuestionRepository;
import FIXER.FIXER_BE.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

@Service
@RequiredArgsConstructor
public class QuestionService {

    private final QuestionRepository questionRepository;
    private final CompanyRepository companyRepository;
    private final UserRepository userRepository;

    @Transactional
    public Question createQuestion(Integer companyId, Integer userNum, QuestionDTO questionDTO) {
        Company company = companyRepository.findById(companyId)
                .orElseThrow(() -> new IllegalArgumentException("Invalid company ID"));
        User user = userRepository.findById(userNum)
                .orElseThrow(() -> new IllegalArgumentException("Invalid user ID"));

        Question question = Question.builder()
                .company(company)
                .user(user)
                .title(questionDTO.getTitle())
                .content(questionDTO.getContent())
                .filePath(questionDTO.getFilePath())
                .answerCheck(false)
                .build();

        return questionRepository.save(question);
    }

    public List<QuestionDTO> getQuestionsByCompanyId(Integer companyId) {
        List<Question> questions = questionRepository.findByCompanyCompanyIdOrderByQuestionIdAsc(companyId);

        return IntStream.range(0, questions.size())
                .mapToObj(i -> {
                    Question question = questions.get(i);
                    return new QuestionDTO(
                            question.getQuestionId(),
                            question.getCompany().getCompanyId(),
                            i + 1,
                            question.getUser().getUserName(),
                            question.getTitle(),
                            question.getContent(),
                            question.getFilePath(),
                            question.getCreatedAt(),
                            question.getAnswerCheck()
                    );
                })
                .collect(Collectors.toList());
    }

    public List<QuestionDTO> getQuestionsByUserNum(Integer userNum) {
        List<Question> questions = questionRepository.findByUserUserNumOrderByQuestionIdAsc(userNum);

        return IntStream.range(0, questions.size())
                .mapToObj(i -> {
                    Question question = questions.get(i);
                    return new QuestionDTO(
                            question.getQuestionId(),
                            question.getCompany().getCompanyId(),
                            i + 1,
                            question.getUser().getUserName(),
                            question.getTitle(),
                            question.getContent(),
                            question.getFilePath(),
                            question.getCreatedAt(),
                            question.getAnswerCheck()
                    );
                })
                .collect(Collectors.toList());
    }
}
