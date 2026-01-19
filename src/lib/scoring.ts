// ==========================================
// Night Type Diagnosis Logic (Final Version)
// ==========================================

/**
 * ■ Night Type診断ロジック
 * 軸(axis): 
 *   - AP: Active(攻め) vs Passive(受け)
 *   - RF: Real(リアル) vs Fantasy(妄想)
 *   - TE: Tech(機能) vs Emo(情緒)
 *   - NC: Normal(安定) vs Chaos(刺激)
 * 
 * 方向(direction):
 *   - positive: 左側の性質(A, R, T, N)に加点
 *   - negative: 右側の性質(P, F, E, C)に加点
 */

import { Answer, Score } from '@/types';
import { questions } from '@/data/questions';


export function calculateScore(answers: Answer[]): Score {
  const scores: Score = {
    AP: 0,
    RF: 0,
    TE: 0,
    NC: 0
  };

  answers.forEach((answer) => {
    const question = questions.find(q => q.id === answer.questionId);
    if (!question) return;
    
    // 正しいロジック: 
    // positive質問: 高スコア = その軸のpositive側を支持
    // negative質問: 高スコア = その軸のnegative側を支持（つまり反転）
    if (question.direction === 'positive') {
      scores[question.axis as keyof Score] += answer.score;
    } else {
      // negative質問の場合は符号を反転
      scores[question.axis as keyof Score] -= answer.score;
    }
  });

  return scores;
}

export function determineType(scores: Score): string {
  // Night Codeを生成
  let nightCode = '';
  nightCode += scores.AP >= 0 ? 'A' : 'P';
  nightCode += scores.RF >= 0 ? 'R' : 'F';
  nightCode += scores.TE >= 0 ? 'T' : 'E';
  nightCode += scores.NC >= 0 ? 'N' : 'C';

  // Night Code を直接返す（diagramTypesはNight Codeでキー化されているため）
  return nightCode || 'ARTN';
}

export function getTypeFromAnswers(answers: Answer[]): string {
  const scores = calculateScore(answers);
  const nightCode = determineType(scores);
  
  // デバッグ情報
  if (process.env.NODE_ENV === 'development') {
    console.log('Debug - Scores:', scores);
    console.log('Debug - Night Code:', nightCode);
  }
  
  return nightCode;
}