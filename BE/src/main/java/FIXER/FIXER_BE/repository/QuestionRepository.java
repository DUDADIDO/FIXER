package FIXER.FIXER_BE.repository;

import FIXER.FIXER_BE.entity.Question;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface QuestionRepository extends JpaRepository<Question, Integer> {

    List<Question> findByCompanyCompanyIdOrderByQuestionIdAsc(Integer companyId);
    List<Question> findByUserUserNumOrderByQuestionIdAsc(Integer userNum);
}
