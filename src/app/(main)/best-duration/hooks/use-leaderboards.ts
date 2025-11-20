import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useEffect } from "react";
import { Socket } from "socket.io-client";

import useGetSocket from "@/app/(main)/hooks/use-get-socket";
import { Player } from "../../types/player";
import {
  fetchBestDurationLeaderboard,
  fetchMostGamesLeaderboard,
} from "../utils/query-functions";

const useLeaderboards = () => {
  const getSocket = useGetSocket();
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
    let socket: Socket | null = null;

    const handleBestDurationLeaderboardUpdate = (players: Player[]) => {
      queryClient.setQueryData(["best-duration-leaderboard"], players);
    };

    const handleMostGamesLeaderboardUpdate = (players: Player[]) => {
      queryClient.setQueryData(["most-games-leaderboard"], players);
    };

    const setupSocket = async () => {
      try {
        socket = await getSocket();

        socket.on(`leaderboard:duration`, handleBestDurationLeaderboardUpdate);
        socket.on(`leaderboard:games-played`, handleMostGamesLeaderboardUpdate);
      } catch (err) {
        console.error("Failed to setup socket", err);
      }
    };

    setupSocket();

    return () => {
      if (socket) {
        socket.off(`leaderboard:duration`, handleBestDurationLeaderboardUpdate);
        socket.off(
          `leaderboard:games-played`,
          handleMostGamesLeaderboardUpdate
        );
      }
    };
  }, [getSocket, queryClient]);

  return {
    bestDurationLeaderboardQuery,
    mostGamesLeaderboardQuery,
  };
};

export default useLeaderboards;
