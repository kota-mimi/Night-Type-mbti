/**
 * 【修正版】Night Code診断ロジック
 * 
 * ■ 新しいスコア計算方式:
 * - positive question + 正の回答 → 左側タイプ（A, R, T, N）に加点
 * - negative question + 正の回答 → 右側タイプ（P, F, E, C）に加点
 * - 相殺問題を完全に解決
 */

import { Answer, Score } from '@/types';
import { questions } from '@/data/questions';

// Night Code → MBTI タイプマッピング
const nightCodeToMBTI: Record<string, string> = {
  // 支配・リード系 (E, S/N, T/F, J)
  'ARTN': 'ESTJ', // Active, Real, Tech, Normal = 絶対君主
  'AFTN': 'ENTJ', // Active, Fantasy, Tech, Normal = 夜のCEO
  'AREN': 'ESFJ', // Active, Real, Emo, Normal = 過保護なパトロン
  'AFEN': 'ENFJ', // Active, Fantasy, Emo, Normal = 愛の教祖

  // 衝動・本能系 (E, S/N, T/F, P)
  'ARTC': 'ESTP', // Active, Real, Tech, Chaos = 暴走ダンプカー
  'AFTC': 'ENTP', // Active, Fantasy, Tech, Chaos = 夜のジョーカー
  'AREC': 'ESFP', // Active, Real, Emo, Chaos = 自意識過剰なスター
  'AFEC': 'ENFP', // Active, Fantasy, Emo, Chaos = 気まぐれピーターパン

  // 職人・マイペース系 (I, S/N, T/F, J)
  'PRTN': 'ISTJ', // Passive, Real, Tech, Normal = 生真面目な公務員
  'PFTN': 'INTJ', // Passive, Fantasy, Tech, Normal = ソロプレイヤー
  'PRTC': 'ISTP', // Passive, Real, Tech, Chaos = 無口なスナイパー
  'PFTC': 'INTP', // Passive, Fantasy, Tech, Chaos = 性癖研究員

  // 没入・尽くす系
  'PREN': 'ISFJ', // Passive, Real, Emo, Normal = 忠実な番犬
  'PFEN': 'INFJ', // Passive, Fantasy, Emo, Normal = 愛の執行人
  'PREC': 'ISFP', // Passive, Real, Emo, Chaos = 感度3000倍のオス猫
  'PFEC': 'INFP'  // Passive, Fantasy, Emo, Chaos = 夢見る詩人
};

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
  // Night Codeを生成
  let nightCode = '';

  // 各軸の判定（0を境界とした判定）
  // AP軸: Active vs Passive
  nightCode += scores.AP >= 0 ? 'A' : 'P';
  // PB軸: Physical(Real) vs Brain(Fantasy) ※現在の質問はPB軸だがRF軸として解釈
  nightCode += scores.PB >= 0 ? 'R' : 'F';
  // TE軸: Technical vs Emotional
  nightCode += scores.TE >= 0 ? 'T' : 'E';
  // NC軸: Normal vs Chaos
  nightCode += scores.NC >= 0 ? 'N' : 'C';

  // Night Code → MBTI ID変換
  const mbtiType = nightCodeToMBTI[nightCode];
  
  if (!mbtiType) {
    console.error(`Unknown Night Code: ${nightCode}`);
    return 'ESTJ'; // フォールバック
  }

  return mbtiType;
}

export function getTypeFromAnswers(answers: Answer[]): string {
  const scores = calculateScore(answers);
  const mbtiType = determineType(scores);
  
  // デバッグ情報（本番では削除可能）
  if (process.env.NODE_ENV === 'development') {
    console.log('Debug - Scores:', scores);
    console.log('Debug - Determined Type:', mbtiType);
  }
  
  return mbtiType;
}