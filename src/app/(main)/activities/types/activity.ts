export interface Activity {
  id: string;
  name: string;
  scores: Score[];
}

export interface Score {
  id: string;
  value: number;
  user: User;
  activityId: string;
  createdAt: Date;
}

export interface User {
  id: string;
  name: string;
}
