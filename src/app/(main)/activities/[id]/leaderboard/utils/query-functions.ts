import { AxiosInstance } from "axios";

export const fetchLeaderboard = async (
  axios: AxiosInstance,
  activityId: string
) => {
  try {
    const response = await axios.get(`/activities/${activityId}/leaderboard`);

    return response.data;
  } catch (error) {
    console.error("Error from `fetchLeaderboard`:", error);
  }
};
