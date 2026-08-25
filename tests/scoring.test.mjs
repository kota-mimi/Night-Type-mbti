import test from 'node:test';
import assert from 'node:assert/strict';
import { questions } from '../src/data/questions.ts';
import {
  AXES,
  calculateAxisScores,
  determineNightType,
  isValidAnswerSet,
} from '../src/lib/scoringCore.ts';

const positiveFor = (question) => question.direction === 'positive' ? 2 : -2;
const negativeFor = (question) => -positiveFor(question);

test('each axis has three questions in each direction', () => {
  for (const axis of AXES) {
    const axisQuestions = questions.filter((question) => question.axis === axis);
    assert.equal(axisQuestions.length, 6);
    assert.equal(axisQuestions.filter((question) => question.direction === 'positive').length, 3);
    assert.equal(axisQuestions.filter((question) => question.direction === 'negative').length, 3);
  }
});

test('all answers supporting the left traits produce ARTN', () => {
  const answers = questions.map((question) => ({
    questionId: question.id,
    score: positiveFor(question),
  }));
  const scores = calculateAxisScores(answers, questions);
  assert.deepEqual(scores, { AP: 12, RF: 12, TE: 12, NC: 12 });
  assert.equal(determineNightType(scores, answers, questions), 'ARTN');
});

test('all answers supporting the right traits produce PFEC', () => {
  const answers = questions.map((question) => ({
    questionId: question.id,
    score: negativeFor(question),
  }));
  const scores = calculateAxisScores(answers, questions);
  assert.deepEqual(scores, { AP: -12, RF: -12, TE: -12, NC: -12 });
  assert.equal(determineNightType(scores, answers, questions), 'PFEC');
});

test('ties follow the direct anchor answer instead of always choosing ARTN', () => {
  const answers = questions.map((question) => ({ questionId: question.id, score: 1 }));
  const scores = calculateAxisScores(answers, questions);
  assert.deepEqual(scores, { AP: 0, RF: 0, TE: 0, NC: 0 });
  assert.equal(determineNightType(scores, answers, questions), 'ARTN');

  const reversed = answers.map((answer) => ({ ...answer, score: -1 }));
  assert.deepEqual(calculateAxisScores(reversed, questions), { AP: 0, RF: 0, TE: 0, NC: 0 });
  assert.equal(determineNightType(scores, reversed, questions), 'PFEC');
});

test('invalid, missing, duplicate and out-of-range answers are rejected', () => {
  const valid = questions.map((question) => ({ questionId: question.id, score: 1 }));
  assert.equal(isValidAnswerSet(valid, questions), true);
  assert.equal(isValidAnswerSet(valid.slice(1), questions), false);
  assert.equal(isValidAnswerSet([...valid.slice(0, -1), valid[0]], questions), false);
  assert.equal(isValidAnswerSet(valid.map((answer, index) => index ? answer : { ...answer, score: 0 }), questions), false);
  assert.throws(() => calculateAxisScores(valid.slice(1), questions));
});
