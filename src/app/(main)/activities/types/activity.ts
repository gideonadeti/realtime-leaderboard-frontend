export interface Activity {
  id: string;
  name: string;
  scores: Score[];
}

export interface Score {
  id: string;
  value: number;
}
