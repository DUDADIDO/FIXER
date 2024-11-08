package FIXER.FIXER_BE.service;

import FIXER.FIXER_BE.dto.AnswerDTO;
import FIXER.FIXER_BE.entity.Answer;
import FIXER.FIXER_BE.entity.Question;
import FIXER.FIXER_BE.entity.User;
import FIXER.FIXER_BE.repository.AnswerRepository;
import FIXER.FIXER_BE.repository.QuestionRepository;
import FIXER.FIXER_BE.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AnswerService {

    private final AnswerRepository answerRepository;
    private final QuestionRepository questionRepository;
    private final UserRepository userRepository;

    @Transactional
    public Answer createAnswer(Integer questionId, Integer userNum, AnswerDTO answerDTO) {
        // 질문과 사용자 엔티티 조회
        Question question = questionRepository.findById(questionId)
                .orElseThrow(() -> new IllegalArgumentException("Invalid question ID"));
        User user = userRepository.findById(userNum)
                .orElseThrow(() -> new IllegalArgumentException("Invalid user ID"));

        // 답변 엔티티 생성 및 저장
        Answer answer = Answer.builder()
                .question(question)
                .user(user)
                .content(answerDTO.getContent())
                .build();

        Answer savedAnswer = answerRepository.save(answer);

        // answerCheck 값을 true로 설정하고 question 저장
        if (!question.getAnswerCheck()) {  // answerCheck가 false인 경우에만 업데이트
            question.setAnswerCheck(true);
            questionRepository.save(question);
        }

        return savedAnswer;
    }

    public List<AnswerDTO> getAnswersByQuestionId(Integer questionId) {
        List<Answer> answers = answerRepository.findByQuestionQuestionIdOrderByCreatedAtAsc(questionId);

        return answers.stream().map(answer -> new AnswerDTO(
                answer.getAnswerId(),
                answer.getQuestion().getQuestionId(),
                answer.getUser().getUserNum(),
                answer.getContent(),
                answer.getCreatedAt()
        )).collect(Collectors.toList());
    }
}
