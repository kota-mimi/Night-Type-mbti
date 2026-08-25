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
import {
  calculateAxisScores,
  determineNightType,
  isValidAnswerSet,
  type ScoringQuestion,
} from './scoringCore';

const scoringQuestions = questions as ScoringQuestion[];

export function areAnswersValid(answers: Answer[]): boolean {
  return isValidAnswerSet(answers, scoringQuestions);
}


/**
 * ⚠️ 重要：診断ロジックと計算方法の再定義
 * 
 * ■ 判定軸 (Night Code System)
 * AP軸: Active (+) vs Passive (-)
 * RF軸: Real (+) vs Fantasy (-)
 * TE軸: Tech (+) vs Emo (-)
 * NC軸: Normal (+) vs Chaos (-)
 * 
 * ■ スコアリングのルール
 * 回答値: +2(とてもそう思う) 〜 -2(全くそう思わない)
 * direction: 'positive'なら加算、'negative'なら減算（反転）
 */
export function calculateScore(answers: Answer[]): Score {
  return calculateAxisScores(answers, scoringQuestions);
}

export function determineType(scores: Score, answers?: Answer[]): string {
  if (!answers) {
    throw new Error('同点を公平に判定するため、回答データが必要です。');
  }
  return determineNightType(scores, answers, scoringQuestions);
}

export function getTypeFromAnswers(answers: Answer[]): string {
  const scores = calculateScore(answers);
  return determineType(scores, answers);
}
