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
 * 回答値: +3(とてもそう思う) 〜 -3(全くそう思わない)
 * direction: 'positive'なら加算、'negative'なら減算（反転）
 */
export function calculateScore(answers: Answer[]): Score {
  // 1. スコア初期化
  let scores: Score = { AP: 0, RF: 0, TE: 0, NC: 0 };

  // 2. デバッグ用ログ（必ず実装！）
  console.log("=== DEBUG: calculateScore (NEW LOGIC) ===");
  console.log("Input Answers:", answers); 
  console.log("Total answers received:", answers.length);

  // 3. 集計処理
  questions.forEach(q => {
    // 回答がない場合は 0 (どちらでもない)
    const answerObj = answers.find(a => a.questionId === q.id);
    const userValue = answerObj !== undefined ? answerObj.score : 0;

    console.log(`Q${q.id}: axis=${q.axis}, direction=${q.direction}, userScore=${userValue}`);

    if (q.direction === 'positive') {
      scores[q.axis as keyof Score] += userValue;
      console.log(`  → ${q.axis} += ${userValue} = ${scores[q.axis as keyof Score]}`);
    } else {
      scores[q.axis as keyof Score] -= userValue; // negativeは反転
      console.log(`  → ${q.axis} -= ${userValue} = ${scores[q.axis as keyof Score]}`);
    }
  });

  console.log("Calculated Scores:", scores);
  return scores;
}

export function determineType(scores: Score): string {
  console.log("=== DEBUG: determineType (NEW LOGIC) ===");
  console.log("Input Scores:", scores);
  
  // 4. タイプ判定 (0以上なら左、未満なら右)
  let typeCode = '';
  typeCode += scores.AP >= 0 ? 'A' : 'P';
  console.log(`AP: ${scores.AP} >= 0 ? A : P → ${scores.AP >= 0 ? 'A' : 'P'}`);
  
  typeCode += scores.RF >= 0 ? 'R' : 'F';
  console.log(`RF: ${scores.RF} >= 0 ? R : F → ${scores.RF >= 0 ? 'R' : 'F'}`);
  
  typeCode += scores.TE >= 0 ? 'T' : 'E';
  console.log(`TE: ${scores.TE} >= 0 ? T : E → ${scores.TE >= 0 ? 'T' : 'E'}`);
  
  typeCode += scores.NC >= 0 ? 'N' : 'C';
  console.log(`NC: ${scores.NC} >= 0 ? N : C → ${scores.NC >= 0 ? 'N' : 'C'}`);

  console.log("Final TypeCode:", typeCode);
  return typeCode;
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