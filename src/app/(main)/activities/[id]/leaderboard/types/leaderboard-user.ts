import { User } from "../../../types/activity";

export interface LeaderboardUser extends User {
  score: number;
  rank: number;
}
