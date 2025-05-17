import axios from "./axios-instance";

export const createScore = async (activityId: string, value: number) => {
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
