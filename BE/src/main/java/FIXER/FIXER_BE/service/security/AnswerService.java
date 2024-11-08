package FIXER.FIXER_BE.service;

import FIXER.FIXER_BE.dto.AnswerDTO;
import FIXER.FIXER_BE.entity.Answer;
import FIXER.FIXER_BE.entity.Question;
import FIXER.FIXER_BE.entity.User;
import FIXER.FIXER_BE.repository.AnswerRepository;
import FIXER.FIXER_BE.repository.QuestionRepository;
import FIXER.FIXER_BE.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import jakarta.transaction.Transactional;

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
        Question question = questionRepository.findById(questionId)
                .orElseThrow(() -> new IllegalArgumentException("Invalid question ID"));
        User user = userRepository.findById(userNum)
                .orElseThrow(() -> new IllegalArgumentException("Invalid user ID"));

        Answer answer = Answer.builder()
                .question(question)
                .user(user)
                .content(answerDTO.getContent())
                .build();

        return answerRepository.save(answer);
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
