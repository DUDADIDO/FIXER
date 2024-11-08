package FIXER.FIXER_BE.repository;

import FIXER.FIXER_BE.entity.Answer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AnswerRepository extends JpaRepository<Answer, Integer> {
    List<Answer> findByQuestionQuestionIdOrderByCreatedAtAsc(Integer questionId);
}
