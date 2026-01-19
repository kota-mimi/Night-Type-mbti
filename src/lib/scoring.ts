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
 * ■ Night Code -> MBTI ID マッピング
 */
const typeMapping: { [key: string]: string } = {
  // 👑 支配・リード系 (Active, ???, ???, ???)
  'ARTN': 'ESTJ', // 絶対君主
  'AFTN': 'ENTJ', // 夜のCEO
  'AREN': 'ESFJ', // 過保護なパトロン
  'AFEN': 'ENFJ', // 愛の教祖

  // 🦁 衝動・本能系 (Active, ???, ???, Chaos)
  'ARTC': 'ESTP', // 暴走ダンプカー
  'AFTC': 'ENTP', // 夜のジョーカー
  'AREC': 'ESFP', // 自意識過剰なスター
  'AFEC': 'ENFP', // 気まぐれピーターパン

  // 🔬 職人・マイペース系 (Passive, ???, ???, Normal)
  'PRTN': 'ISTJ', // 生真面目な公務員
  'PFTN': 'INTJ', // ソロプレイヤー
  'PREN': 'ISFJ', // 忠実な番犬
  'PFEN': 'INFJ', // 愛の執行人

  // 🥀 没入・尽くす系 (Passive, ???, ???, Chaos 含む)
  'PRTC': 'ISTP', // 無口なスナイパー
  'PFTC': 'INTP', // 性癖研究員
  'PREC': 'ISFP', // 感度3000倍のオス猫
  'PFEC': 'INFP'  // 夢見る詩人
};

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
    
    // positiveなら加算、negativeなら減算（反転）
    if (question.direction === 'positive') {
      scores[question.axis as keyof Score] += answer.score;
    } else {
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

  // Night Code を MBTI ID に変換
  return typeMapping[nightCode] || 'ESTJ';
}

export function getTypeFromAnswers(answers: Answer[]): string {
  const scores = calculateScore(answers);
  const mbtiType = determineType(scores);
  
  // デバッグ情報
  if (process.env.NODE_ENV === 'development') {
    console.log('Debug - Scores:', scores);
    console.log('Debug - MBTI Type:', mbtiType);
  }
  
  return mbtiType;
}