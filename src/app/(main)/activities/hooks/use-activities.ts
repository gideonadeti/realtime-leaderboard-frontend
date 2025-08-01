import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { useEffect } from "react";

import useGetAxios from "../../hooks/use-get-axios";
import { fetchActivities } from "../utils/query-functions";
import { Activity } from "../types/activity";

const useActivities = () => {
  const getAxios = useGetAxios();
  const activitiesQuery = useQuery<Activity[], AxiosError>({
    queryKey: ["activities"],
    queryFn: async () => {
      const axios = await getAxios();

      return fetchActivities(axios);
    },
  });

  // Error handling effect
  useEffect(() => {
    if (activitiesQuery.isError) {
      console.error("Error from `useActivities`:", activitiesQuery.error);

      // Add id to prevent duplicate toasts when triggered multiple times
      toast.error("Failed to fetch activities", {
        id: "fetch-activities-error",
      });
    }
  }, [activitiesQuery.isError, activitiesQuery.error]);

  return {
    activitiesQuery,
  };
};

export default useActivities;
