import axiosInstance from "../libs/axios-instance";

export const fetchBestDurationLeaderboard = async () => {
  try {
    const response = await axiosInstance.get(`/leaderboard/duration`);

    return response.data;
  } catch (error) {
    console.error("Error from `fetchBestDurationLeaderboard`:", error);
  }
};

export const fetchMostGamesLeaderboard = async () => {
  try {
    const response = await axiosInstance.get(`/leaderboard/games-played`);

    return response.data;
  } catch (error) {
    console.error("Error from `fetchMostGamesLeaderboard`:", error);
  }
};
