import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { useEffect } from "react";

import { fetchLeaderboard } from "../utils/query-functions";
import { LeaderboardUser } from "../types/leaderboard-user";

const useLeaderboard = (activityId: string) => {
  const leaderboardQuery = useQuery<LeaderboardUser[], AxiosError>({
    queryKey: ["activities", activityId, "leaderboard"],
    queryFn: () => fetchLeaderboard(activityId),
  });

  // Error handling effect
  useEffect(() => {
    if (leaderboardQuery.isError) {
      console.error("Error from `useLeaderboard`:", leaderboardQuery.error);
      toast.error("Failed to fetch leaderboard");
    }
  }, [leaderboardQuery.isError, leaderboardQuery.error]);

  return {
    leaderboardQuery,
  };
};

export default useLeaderboard;
