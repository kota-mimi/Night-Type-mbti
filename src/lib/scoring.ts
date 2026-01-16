import { Answer, Score } from '@/types';
import { questions } from '@/data/questions';

export function calculateScore(answers: Answer[]): Score {
  const scores: Score = {
    AP: 0,
    PB: 0,
    TE: 0,
    NC: 0
  };

  answers.forEach((answer) => {
    const questionId = answer.questionId;
    const question = questions.find(q => q.id === questionId);
    
    if (!question) return; // 質問が見つからない場合はスキップ
    
    // direction属性に基づいてスコアを調整
    const adjustedScore = question.direction === 'negative' ? -answer.score : answer.score;

    // 質問の軸プロパティに基づいて直接スコアを計算
    if (question.axis === 'AP') {
      scores.AP += adjustedScore;
    } else if (question.axis === 'PB') {
      scores.PB += adjustedScore;
    } else if (question.axis === 'TE') {
      scores.TE += adjustedScore;
    } else if (question.axis === 'NC') {
      scores.NC += adjustedScore;
    }
  });

  return scores;
}

export function determineType(scores: Score): string {
  let typeCode = '';

  // 各軸の判定（0を境界とした判定）
  // AP軸: Active(E) vs Passive(I)
  typeCode += scores.AP >= 0 ? 'E' : 'I';
  // PB軸: Physical(S) vs Brain(N) 
  typeCode += scores.PB >= 0 ? 'S' : 'N';
  // TE軸: Technical(T) vs Emotional(F)
  typeCode += scores.TE >= 0 ? 'T' : 'F';
  // NC軸: Normal(J) vs Chaos(P)
  typeCode += scores.NC >= 0 ? 'J' : 'P';

  return typeCode;
}

export function getTypeFromAnswers(answers: Answer[]): string {
  const scores = calculateScore(answers);
  return determineType(scores);
}