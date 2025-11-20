import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useEffect } from "react";

import socketInstance from "../libs/socket-instance";
import { Player } from "../types/player";
import {
  fetchBestDurationLeaderboard,
  fetchMostGamesLeaderboard,
} from "../utils/query-functions";

const useLeaderboards = () => {
  const queryClient = useQueryClient();
  const bestDurationLeaderboardQuery = useQuery<Player[]>({
    queryKey: ["best-duration-leaderboard"],
    queryFn: async () => await fetchBestDurationLeaderboard(),
  });

  const mostGamesLeaderboardQuery = useQuery<Player[]>({
    queryKey: ["most-games-leaderboard"],
    queryFn: async () => await fetchMostGamesLeaderboard(),
  });

  useEffect(() => {
    if (bestDurationLeaderboardQuery.isError) {
      toast.error("Failed to fetch best duration leaderboard", {
        id: "fetch-best-duration-leaderboard-error",
      });
    }
  }, [bestDurationLeaderboardQuery.isError]);

  useEffect(() => {
    if (mostGamesLeaderboardQuery.isError) {
      toast.error("Failed to fetch most games leaderboard", {
        id: "fetch-most-games-leaderboard-error",
      });
    }
  }, [mostGamesLeaderboardQuery.isError]);

  useEffect(() => {
    const handleBestDurationLeaderboardUpdate = (players: Player[]) => {
      queryClient.setQueryData(["best-duration-leaderboard"], players);
    };

    const handleMostGamesLeaderboardUpdate = (players: Player[]) => {
      queryClient.setQueryData(["most-games-leaderboard"], players);
    };

    const setupSocket = async () => {
      try {
        socketInstance.on(
          `leaderboard:duration`,
          handleBestDurationLeaderboardUpdate
        );

        socketInstance.on(
          `leaderboard:games-played`,
          handleMostGamesLeaderboardUpdate
        );
      } catch (err) {
        console.error("Failed to setup socket", err);
      }
    };

    setupSocket();

    return () => {
      socketInstance.off(
        `leaderboard:duration`,
        handleBestDurationLeaderboardUpdate
      );

      socketInstance.off(
        `leaderboard:games-played`,
        handleMostGamesLeaderboardUpdate
      );
    };
  }, [queryClient]);

  return {
    bestDurationLeaderboardQuery,
    mostGamesLeaderboardQuery,
  };
};

export default useLeaderboards;
