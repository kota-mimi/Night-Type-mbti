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
  sm_diagnosis?: {
    mind_s: number;
    body_m: number;
  };
  stats?: {
    libido: string;
    hentai: string;
    muttsuri: string;
  };
  uwaki?: {
    percent: string;
    type: string;
    text: string;
  };
  premium?: {
    deep_profile: {
      潜在性癖: string;
      脳内麻薬: string;
      夜の適職: string;
      NG行動: string;
    };
    ranking: {
      best3: Array<{
        rank: number;
        type: string;
        title: string;
        strategy: string;
      }>;
      worst3: Array<{
        rank: number;
        type: string;
        title: string;
        reason: string;
      }>;
    };
  };
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