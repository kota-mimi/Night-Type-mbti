import { Answer, Score } from '@/types';

export function calculateScore(answers: Answer[]): Score {
  const scores: Score = {
    SG: 0,
    RE: 0,
    FC: 0,
    QL: 0
  };

  answers.forEach((answer) => {
    const questionId = answer.questionId;
    const score = answer.score;

    // 質問IDに基づいて軸を判定
    if (questionId >= 1 && questionId <= 5) {
      scores.SG += score;
    } else if (questionId >= 6 && questionId <= 10) {
      scores.RE += score;
    } else if (questionId >= 11 && questionId <= 15) {
      scores.FC += score;
    } else if (questionId >= 16 && questionId <= 20) {
      scores.QL += score;
    }
  });

  return scores;
}

export function determineType(scores: Score): string {
  let typeCode = '';

  // 各軸の判定（0以上なら前者、0未満なら後者）
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