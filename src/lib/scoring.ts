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

    // 質問IDに基づいて軸を判定（24問対応）
    if (questionId >= 1 && questionId <= 6) {
      scores.SG += score;
    } else if (questionId >= 7 && questionId <= 12) {
      scores.RE += score;
    } else if (questionId >= 13 && questionId <= 18) {
      scores.FC += score;
    } else if (questionId >= 19 && questionId <= 24) {
      scores.QL += score;
    }
  });

  return scores;
}

export function determineType(scores: Score): string {
  let typeCode = '';

  // 各軸の判定（±2を境界にして、より極端な差を要求）
  typeCode += scores.SG >= 2 ? 'S' : scores.SG <= -2 ? 'G' : (scores.SG >= 0 ? 'S' : 'G');
  typeCode += scores.RE >= 2 ? 'R' : scores.RE <= -2 ? 'E' : (scores.RE >= 0 ? 'R' : 'E');
  typeCode += scores.FC >= 2 ? 'F' : scores.FC <= -2 ? 'C' : (scores.FC >= 0 ? 'F' : 'C');
  typeCode += scores.QL >= 2 ? 'Q' : scores.QL <= -2 ? 'L' : (scores.QL >= 0 ? 'Q' : 'L');

  return typeCode;
}

export function getTypeFromAnswers(answers: Answer[]): string {
  const scores = calculateScore(answers);
  return determineType(scores);
}