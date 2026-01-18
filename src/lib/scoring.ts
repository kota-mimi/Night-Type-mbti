/**
 * 【Night Type診断】アダルト性格診断（夜のMBTI）
 * 
 * ■ 4つの分析軸:
 * 1. AP軸: Active (攻め) vs Passive (受け)
 * 2. PB軸: Physical (肉体/リアル) vs Brain (脳内/ファンタジー)
 * 3. TE軸: Technical (機能/技術) vs Emotional (感情/情緒)
 * 4. NC軸: Normal (安定/王道) vs Chaos (刺激/カオス)
 * 
 * ■ Night Code直接使用:
 * - 4軸の組み合わせで16種のNight Code生成（例: ARTN, AFTN, PREC等）
 * - Night Code自体がキャラクターIDとなる
 */

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
    const question = questions.find(q => q.id === answer.questionId);
    if (!question) return;
    
    // 【修正版】正しいスコア計算ロジック
    // 各質問のdirectionに関係なく、回答内容に基づいてスコアを振り分ける
    let scoreContribution = 0;
    
    if (question.direction === 'positive') {
      // positive質問: そう思う(+) → 左側に加点、そう思わない(-) → 右側に加点
      scoreContribution = answer.score;
    } else {
      // negative質問: そう思う(+) → 右側に加点、そう思わない(-) → 左側に加点
      // つまり、positive質問とは逆の扱いをする
      scoreContribution = -answer.score;
    }

    // 軸別にスコア加算
    scores[question.axis as keyof Score] += scoreContribution;
  });

  return scores;
}

export function determineType(scores: Score): string {
  // Night Codeを生成（これがキャラクターIDになる）
  let nightCode = '';

  // 各軸の判定（0を境界とした判定）
  // AP軸: Active (攻め) vs Passive (受け)
  nightCode += scores.AP >= 0 ? 'A' : 'P';
  // PB軸: Physical (肉体/リアル) vs Brain (脳内/ファンタジー)
  nightCode += scores.PB >= 0 ? 'P' : 'B';
  // TE軸: Technical (機能/技術) vs Emotional (感情/情緒)
  nightCode += scores.TE >= 0 ? 'T' : 'E';
  // NC軸: Normal (安定/王道) vs Chaos (刺激/カオス)
  nightCode += scores.NC >= 0 ? 'N' : 'C';

  // Night Code自体をキャラクターIDとして返す
  return nightCode;
}

export function getTypeFromAnswers(answers: Answer[]): string {
  const scores = calculateScore(answers);
  const nightCode = determineType(scores);
  
  // デバッグ情報（本番では削除可能）
  if (process.env.NODE_ENV === 'development') {
    console.log('Debug - Scores:', scores);
    console.log('Debug - Night Code:', nightCode);
  }
  
  return nightCode;
}