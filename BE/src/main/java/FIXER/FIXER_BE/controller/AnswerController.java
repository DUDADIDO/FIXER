package FIXER.FIXER_BE.controller;

import FIXER.FIXER_BE.dto.AnswerDTO;
import FIXER.FIXER_BE.entity.Answer;
import FIXER.FIXER_BE.service.AnswerService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/company")
@RequiredArgsConstructor
public class AnswerController {

    private final AnswerService answerService;

    // 특정 질문에 대한 답변 목록 조회
    @GetMapping("/question/{questionId}/answers")
    public ResponseEntity<List<AnswerDTO>> getAnswersByQuestionId(@PathVariable("questionId") Integer questionId) {
        List<AnswerDTO> answers = answerService.getAnswersByQuestionId(questionId);
        return ResponseEntity.ok(answers);
    }

    // 답변 작성
    @PostMapping("/question/{questionId}/writeanswer")
    public ResponseEntity<?> createAnswer(
            @PathVariable("questionId") Integer questionId,
            @RequestParam("user_num") Integer userNum,
            @RequestParam("content") String content) {

        AnswerDTO answerDTO = new AnswerDTO();
        answerDTO.setContent(content);

        Answer newAnswer = answerService.createAnswer(questionId, userNum, answerDTO);

        return ResponseEntity.status(HttpStatus.CREATED).body(newAnswer);
    }
}
