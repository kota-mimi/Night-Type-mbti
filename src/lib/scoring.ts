import { Answer, Score } from '@/types';
import { questions } from '@/data/questions';

export function calculateScore(answers: Answer[]): Score {
  const scores: Score = {
    SG: 0,
    RE: 0,
    FC: 0,
    QL: 0
  };

  answers.forEach((answer) => {
    const questionId = answer.questionId;
    const question = questions.find(q => q.id === questionId);
    
    if (!question) return; // 質問が見つからない場合はスキップ
    
    // direction属性に基づいてスコアを調整
    const adjustedScore = question.direction === 'negative' ? -answer.score : answer.score;

    // 質問IDに基づいて軸を判定（24問対応）
    if (questionId >= 1 && questionId <= 6) {
      scores.SG += adjustedScore;
    } else if (questionId >= 7 && questionId <= 12) {
      scores.RE += adjustedScore;
    } else if (questionId >= 13 && questionId <= 18) {
      scores.FC += adjustedScore;
    } else if (questionId >= 19 && questionId <= 24) {
      scores.QL += adjustedScore;
    }
  });

  return scores;
}

export function determineType(scores: Score): string {
  let typeCode = '';

  // 各軸の判定（0を境界とした判定）
  typeCode += scores.SG >= 0 ? 'S' : 'G';
  typeCode += scores.RE >= 0 ? 'R' : 'E';
  typeCode += scores.FC >= 0 ? 'F' : 'C';
  typeCode += scores.QL >= 0 ? 'Q' : 'L';

  return typeCode;
}

export function getTypeFromAnswers(answers: Answer[]): string {
  const scores = calculateScore(answers);
  return determineType(scores);
}