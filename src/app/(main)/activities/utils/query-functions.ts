import axios from "../../utils/axios-instance";

export const fetchActivities = async () => {
  try {
    const response = await axios.get("/activities");

    console.log("Response data:", response.data);

    return response.data;
  } catch (error) {
    console.error("Error from `readProducts`:", error);
  }
};
