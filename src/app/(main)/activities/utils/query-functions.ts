import { AxiosInstance } from "axios";

export const fetchActivities = async (axios: AxiosInstance) => {
  try {
    const response = await axios.get("/activities");

    return response.data;
  } catch (error) {
    console.error("Error from `fetchActivities`:", error);
  }
};
