import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { useEffect } from "react";

import useGetAxios from "@/app/(main)/hooks/use-get-axios";
import { fetchReport } from "../utils/query-functions";
import { LeaderboardUser } from "../../leaderboard/types/leaderboard-user";

const useReport = (activityId: string, fromDate: Date, toDate: Date) => {
  const getAxios = useGetAxios();
  const reportQuery = useQuery<LeaderboardUser[], AxiosError>({
    queryKey: ["activities", activityId, "report", fromDate, toDate],
    queryFn: async () => {
      const axios = await getAxios();

      return fetchReport(axios, activityId, fromDate, toDate);
    },
  });

  // Error handling effect
  useEffect(() => {
    if (reportQuery.isError) {
      console.error("Error from `useReport`:", reportQuery.error);
      toast.error("Failed to fetch report");
    }
  }, [reportQuery.isError, reportQuery.error]);

  return {
    reportQuery,
  };
};

export default useReport;
