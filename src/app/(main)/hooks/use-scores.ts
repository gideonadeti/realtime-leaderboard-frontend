import { AxiosError } from "axios";
import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import useGetAxios from "./use-get-axios";
import { Activity, Score } from "../activities/types/activity";
import { createScore } from "../utils/query-functions";
import { UseFormReturn } from "react-hook-form";

const useScores = () => {
  const getAxios = useGetAxios();
  const queryClient = useQueryClient();
  const createScoreMutation = useMutation<
    Score,
    AxiosError,
    {
      activityId: string;
      value: number;
      form: UseFormReturn<
        {
          activityId: string;
          value: number;
        },
        unknown,
        {
          activityId: string;
          value: number;
        }
      >;
      onOpenChange: (open: boolean) => void;
    }
  >({
    mutationFn: async ({ activityId, value }) => {
      const axios = await getAxios();

      return createScore(axios, activityId, value);
    },
    onError: (error) => {
      const errorMessage =
        (error?.response?.data as Error)?.message || "Something went wrong";

      console.error("Error from `useScores`:", error);
      toast.error(errorMessage);
    },
    onSuccess: (newScore, { form, onOpenChange }) => {
      toast.success("Score submitted successfully");

      queryClient.setQueryData<Activity[]>(["activities"], (prevActivities) =>
        prevActivities?.map((activity) => {
          if (activity.id === newScore.activityId) {
            return {
              ...activity,
              scores: [...activity.scores, newScore],
            };
          }

          return activity;
        })
      );

      form.resetField("activityId");
      form.resetField("value");
      onOpenChange(false);
    },
  });

  return {
    createScoreMutation,
  };
};

export default useScores;
