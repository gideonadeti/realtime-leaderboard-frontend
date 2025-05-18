import { AxiosInstance } from "axios";

export const createScore = async (
  axios: AxiosInstance,
  activityId: string,
  value: number
) => {
  try {
    const response = await axios.post("/scores", {
      activityId,
      value,
    });

    return response.data;
  } catch (error) {
    console.error("Error from `createScore`:", error);
  }
};
