import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { useEffect } from "react";

import { fetchActivities } from "../utils/query-functions";
import { Activity } from "../types/activity";

const useActivities = () => {
  const activitiesQuery = useQuery<Activity[], AxiosError>({
    queryKey: ["activities"],
    queryFn: () => fetchActivities(),
  });

  // Error handling effect
  useEffect(() => {
    if (activitiesQuery.isError) {
      console.error("Error from `useActivities`:", activitiesQuery.error);
      toast.error("Failed to fetch activities");
    }
  }, [activitiesQuery.isError, activitiesQuery.error]);

  return {
    activitiesQuery,
  };
};

export default useActivities;
