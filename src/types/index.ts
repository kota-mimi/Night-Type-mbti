export interface Question {
  id: number;
  axis: string;
  text: string;
  direction: 'positive' | 'negative';
}

export interface DiagramType {
  name: string;
  emoji: string;
  catchcopy: string;
  basicEcology: string;
  detailedEcology: string;
  fatCause: string;
  solution: string;
  causeTitle: string;
  solutionTitle: string;
  // Night Type用の新しい項目
  nightEcologyReport?: string;
  yourSexiness?: string;
  instinctChart?: string;
  nightPhrase?: string;
  afterTime?: string;
  compatibility: {
    good: {
      type: string;
      reason: string;
    };
    bad: {
      type: string;
      reason: string;
    };
  };
}

export interface DiagramTypes {
  [key: string]: DiagramType;
}

export interface GenderedDiagramTypes {
  male: DiagramTypes;
  female: DiagramTypes;
}

export interface Answer {
  questionId: number;
  score: number;
}

export interface Score {
  AP: number;
  PB: number;
  TE: number;
  NC: number;
}