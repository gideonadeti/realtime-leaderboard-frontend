import { User } from "../../types/activity";

export interface LeaderboardUser extends User {
  clerkId: string;
  score: number;
  rank: number;
}
