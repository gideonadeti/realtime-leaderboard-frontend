import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { useEffect } from "react";

import socket from "@/app/(main)/libs/socket/socket";
import { fetchLeaderboard } from "../utils/query-functions";
import { LeaderboardUser } from "../types/leaderboard-user";
import useGetAxios from "@/app/(main)/hooks/use-get-axios";

const useLeaderboard = (activityId: string) => {
  const getAxios = useGetAxios();
  const queryClient = useQueryClient();
  const leaderboardQuery = useQuery<LeaderboardUser[], AxiosError>({
    queryKey: ["activities", activityId, "leaderboard"],
    queryFn: async () => {
      const axios = await getAxios();

      return fetchLeaderboard(axios, activityId);
    },
  });

  // Error handling effect
  useEffect(() => {
    if (leaderboardQuery.isError) {
      console.error("Error from `useLeaderboard`:", leaderboardQuery.error);
      toast.error("Failed to fetch leaderboard");
    }
  }, [leaderboardQuery.isError, leaderboardQuery.error]);

  useEffect(() => {
    const handleLeaderboardUpdate = (leaderboard: LeaderboardUser[]) => {
      queryClient.setQueryData(
        ["activities", activityId, "leaderboard"],
        leaderboard
      );
    };

    socket.on(`activities:${activityId}:leaderboard`, handleLeaderboardUpdate);

    return () => {
      socket.off(
        `activities:${activityId}:leaderboard`,
        handleLeaderboardUpdate
      );
    };
  }, [activityId, queryClient]);

  return {
    leaderboardQuery,
  };
};

export default useLeaderboard;
