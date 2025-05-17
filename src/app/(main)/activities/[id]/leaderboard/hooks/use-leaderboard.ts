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
    if (leaderboardQuery.status === "error") {
      const errorMessage =
        (leaderboardQuery.error?.response?.data as Error)?.message ||
        "Something went wrong";

      toast.error(errorMessage);
    }
  }, [leaderboardQuery.error?.response?.data, leaderboardQuery.status]);

  return {
    leaderboardQuery,
  };
};

export default useLeaderboard;
