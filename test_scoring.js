// スコアリングテスト用ファイル

function calculateScore(answers) {
  const scores = {
    AP: 0,
    RF: 0,
    TE: 0,
    NC: 0
  };

  // questions.tsから軸データを手動で設定（修正後）
  const questionAxes = [
    { id: 1, axis: 'AP', direction: 'positive' },
    { id: 2, axis: 'AP', direction: 'negative' },
    { id: 3, axis: 'RF', direction: 'positive' },
    { id: 4, axis: 'RF', direction: 'negative' },
    { id: 5, axis: 'TE', direction: 'positive' },
    { id: 6, axis: 'TE', direction: 'negative' },
    { id: 7, axis: 'NC', direction: 'positive' },
    { id: 8, axis: 'NC', direction: 'negative' },
    { id: 9, axis: 'AP', direction: 'positive' },
    { id: 10, axis: 'AP', direction: 'positive' }, // 修正: negative → positive
    { id: 11, axis: 'RF', direction: 'positive' },
    { id: 12, axis: 'RF', direction: 'positive' }, // 修正: negative → positive
    { id: 13, axis: 'TE', direction: 'positive' },
    { id: 14, axis: 'TE', direction: 'positive' }, // 修正: negative → positive
    { id: 15, axis: 'NC', direction: 'positive' },
    { id: 16, axis: 'NC', direction: 'positive' }, // 修正: negative → positive
    { id: 17, axis: 'AP', direction: 'positive' },
    { id: 18, axis: 'AP', direction: 'negative' },
    { id: 19, axis: 'RF', direction: 'positive' },
    { id: 20, axis: 'RF', direction: 'negative' },
    { id: 21, axis: 'TE', direction: 'positive' },
    { id: 22, axis: 'TE', direction: 'negative' },
    { id: 23, axis: 'NC', direction: 'positive' },
    { id: 24, axis: 'NC', direction: 'negative' }
  ];

  answers.forEach((answer) => {
    const question = questionAxes.find(q => q.id === answer.questionId);
    if (!question) return;
    
    // スコアリングロジック
    if (question.direction === 'positive') {
      scores[question.axis] += answer.score;
    } else {
      // negative質問の場合は符号を反転
      scores[question.axis] -= answer.score;
    }
  });

  return scores;
}

function determineType(scores) {
  let nightCode = '';
  nightCode += scores.AP >= 0 ? 'A' : 'P';
  nightCode += scores.RF >= 0 ? 'R' : 'F';
  nightCode += scores.TE >= 0 ? 'T' : 'E';
  nightCode += scores.NC >= 0 ? 'N' : 'C';
  return nightCode;
}

// テストケース1: すべて最高スコア（3）で回答
console.log('=== テストケース1: すべて最高スコア(3) ===');
const answers1 = Array.from({length: 24}, (_, i) => ({
  questionId: i + 1,
  score: 3
}));
const scores1 = calculateScore(answers1);
console.log('スコア:', scores1);
const type1 = determineType(scores1);
console.log('タイプ:', type1);

// テストケース2: すべて最低スコア（-3）で回答  
console.log('\n=== テストケース2: すべて最低スコア(-3) ===');
const answers2 = Array.from({length: 24}, (_, i) => ({
  questionId: i + 1,
  score: -3
}));
const scores2 = calculateScore(answers2);
console.log('スコア:', scores2);
const type2 = determineType(scores2);
console.log('タイプ:', type2);

// テストケース3: ランダムな回答
console.log('\n=== テストケース3: ランダムな回答 ===');
const answers3 = Array.from({length: 24}, (_, i) => ({
  questionId: i + 1,
  score: Math.floor(Math.random() * 7) - 3  // -3から3のランダム
}));
console.log('回答例:', answers3.slice(0,8).map(a => `Q${a.questionId}:${a.score}`));
const scores3 = calculateScore(answers3);
console.log('スコア:', scores3);
const type3 = determineType(scores3);
console.log('タイプ:', type3);

// テストケース4: 極端なケース（APだけ高く、他は低く）
console.log('\n=== テストケース4: APのみ高スコア ===');
const answers4 = Array.from({length: 24}, (_, i) => {
  const questionId = i + 1;
  let score;
  if (questionId <= 2 || (questionId >= 9 && questionId <= 10) || (questionId >= 17 && questionId <= 18)) {
    // AP軸の質問
    score = 3;
  } else {
    score = -3;
  }
  return { questionId, score };
});
console.log('AP軸回答:', answers4.filter(a => a.questionId <= 2).map(a => `Q${a.questionId}:${a.score}`));
console.log('その他回答:', answers4.filter(a => a.questionId >= 3 && a.questionId <= 8).map(a => `Q${a.questionId}:${a.score}`));
const scores4 = calculateScore(answers4);
console.log('スコア:', scores4);
const type4 = determineType(scores4);
console.log('タイプ:', type4);