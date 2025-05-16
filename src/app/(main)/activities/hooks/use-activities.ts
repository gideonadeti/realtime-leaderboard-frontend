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
    if (activitiesQuery.status === "error") {
      const errorMessage =
        (activitiesQuery.error?.response?.data as Error)?.message ||
        "Something went wrong";

      toast.error(errorMessage);
    }
  }, [activitiesQuery.error?.response?.data, activitiesQuery.status]);

  return {
    activitiesQuery,
  };
};

export default useActivities;
