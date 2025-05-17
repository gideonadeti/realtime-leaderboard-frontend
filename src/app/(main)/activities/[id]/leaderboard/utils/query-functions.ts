import axios from "@/app/(main)/utils/axios-instance";

export const fetchLeaderboard = async (activityId: string) => {
  try {
    const response = await axios.get(`/activities/${activityId}/leaderboard`);

    return response.data;
  } catch (error) {
    console.error("Error from `readProducts`:", error);
  }
};
