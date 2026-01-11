import { questions } from '@/data/questions';

export const questionGroups = [
  questions.slice(0, 8),   // Q1-Q8
  questions.slice(8, 16),  // Q9-Q16
  questions.slice(16, 24), // Q17-Q24
];

export const getQuestionGroupByPage = (page: number) => {
  return questionGroups[page - 1] || null;
};

export const getTotalPages = () => {
  return questionGroups.length;
};