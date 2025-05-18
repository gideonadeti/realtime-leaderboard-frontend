import { AxiosInstance } from "axios";

export const fetchReport = async (
  axios: AxiosInstance,
  activityId: string,
  fromDate: Date,
  toDate: Date
) => {
  try {
    const response = await axios.get(`/activities/${activityId}/report`, {
      params: {
        fromDate,
        toDate,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error from `fetchLeaderboard`:", error);
  }
};
