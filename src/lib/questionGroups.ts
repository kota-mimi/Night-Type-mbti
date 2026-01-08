import { questions } from '@/data/questions';

export const questionGroups = [
  questions.slice(0, 7),   // Q1-Q7
  questions.slice(7, 14),  // Q8-Q14
  questions.slice(14, 20), // Q15-Q20
];

export const getQuestionGroupByPage = (page: number) => {
  return questionGroups[page - 1] || null;
};

export const getTotalPages = () => {
  return questionGroups.length;
};