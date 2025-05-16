import axios from "../../utils/axios-instance";

export const fetchActivities = async () => {
  try {
    const response = await axios.get("/activities");

    return response.data;
  } catch (error) {
    console.error("Error from `readProducts`:", error);
  }
};
