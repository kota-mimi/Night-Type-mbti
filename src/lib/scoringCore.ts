export const AXES = ['AP', 'RF', 'TE', 'NC'] as const;
export const ANSWER_SCORES = [-2, -1, 1, 2] as const;

export type Axis = (typeof AXES)[number];
export type ScoringAnswer = { questionId: number; score: number };
export type ScoringQuestion = {
  id: number;
  axis: Axis;
  direction: 'positive' | 'negative';
};
export type AxisScores = Record<Axis, number>;

const TYPE_LETTERS: Record<Axis, readonly [string, string]> = {
  AP: ['A', 'P'],
  RF: ['R', 'F'],
  TE: ['T', 'E'],
  NC: ['N', 'C'],
};

/** Validates the complete payload instead of silently treating missing answers as neutral. */
export function isValidAnswerSet(
  answers: ScoringAnswer[],
  questions: ScoringQuestion[],
): boolean {
  if (answers.length !== questions.length) return false;

  const expectedIds = new Set(questions.map((question) => question.id));
  const receivedIds = new Set(answers.map((answer) => answer.questionId));

  return receivedIds.size === expectedIds.size && answers.every((answer) =>
    expectedIds.has(answer.questionId) &&
    ANSWER_SCORES.includes(answer.score as (typeof ANSWER_SCORES)[number])
  );
}

export function calculateAxisScores(
  answers: ScoringAnswer[],
  questions: ScoringQuestion[],
): AxisScores {
  if (!isValidAnswerSet(answers, questions)) {
    throw new Error('回答データが不完全または不正です。24問を正しい選択肢で回答してください。');
  }

  const scores: AxisScores = { AP: 0, RF: 0, TE: 0, NC: 0 };
  const answerMap = new Map(answers.map((answer) => [answer.questionId, answer.score]));

  for (const question of questions) {
    const value = answerMap.get(question.id)!;
    scores[question.axis] += question.direction === 'positive' ? value : -value;
  }

  return scores;
}

/**
 * A zero total is resolved with the most direct (first) question on that axis.
 * This avoids assigning every tie to A/R/T/N while keeping the outcome deterministic.
 */
export function determineNightType(
  scores: AxisScores,
  answers: ScoringAnswer[],
  questions: ScoringQuestion[],
): string {
  const answerMap = new Map(answers.map((answer) => [answer.questionId, answer.score]));

  return AXES.map((axis) => {
    const [left, right] = TYPE_LETTERS[axis];
    if (scores[axis] !== 0) return scores[axis] > 0 ? left : right;

    const anchor = questions.find((question) => question.axis === axis);
    if (!anchor) throw new Error(`軸 ${axis} の基準質問がありません。`);
    const anchorValue = answerMap.get(anchor.id);
    if (anchorValue === undefined) throw new Error(`質問 ${anchor.id} の回答がありません。`);
    const signedAnchor = anchor.direction === 'positive' ? anchorValue : -anchorValue;
    return signedAnchor > 0 ? left : right;
  }).join('');
}
