import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { useEffect } from "react";
import { Socket } from "socket.io-client";

import useGetSocket from "@/app/(main)/hooks/use-get-socket";
import useGetAxios from "@/app/(main)/hooks/use-get-axios";
import { fetchLeaderboard } from "../utils/query-functions";
import { LeaderboardUser } from "../../types/leaderboard-user";

const useLeaderboard = (activityId: string) => {
  const getAxios = useGetAxios();
  const getSocket = useGetSocket();
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
    let socket: Socket | null = null;

    const handleLeaderboardUpdate = (leaderboard: LeaderboardUser[]) => {
      queryClient.setQueryData(
        ["activities", activityId, "leaderboard"],
        leaderboard
      );
    };

    const setupSocket = async () => {
      try {
        socket = await getSocket();
        socket.on(
          `activities:${activityId}:leaderboard`,
          handleLeaderboardUpdate
        );
      } catch (err) {
        console.error("Failed to setup socket", err);
      }
    };

    setupSocket();

    return () => {
      if (socket) {
        socket.off(
          `activities:${activityId}:leaderboard`,
          handleLeaderboardUpdate
        );
      }
    };
  }, [activityId, getSocket, queryClient]);

  return {
    leaderboardQuery,
  };
};

export default useLeaderboard;
