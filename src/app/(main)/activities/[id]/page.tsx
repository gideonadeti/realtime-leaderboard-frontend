"use client";

import { ArrowLeft } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";

import useActivities from "../hooks/use-activities";
import columns from "./components/data-tables/scores/columns";
import ScoresTable from "./components/data-tables/scores/table";
import Loading from "@/app/loading";
import { Button } from "@/components/ui/button";
import { H3 } from "@/components/ui/typography";

const Page = () => {
  const router = useRouter();
  const { id } = useParams();
  const { activitiesQuery } = useActivities();
  const activity = activitiesQuery.data?.find((a) => a.id === id);

  if (activitiesQuery.isPending) {
    return <Loading />;
  }

  if (!activity) {
    toast.error(
      <div>
        <p>{`Invalid activity id: ${id}`}</p>
        <Button variant="link" className="ps-0" onClick={() => router.back()}>
          Back
        </Button>
      </div>
    );

    return null;
  }

  return (
    <div className="px-8 py-4 space-y-4">
      <Button
        variant="outline"
        size="sm"
        title="Back"
        onClick={() => router.back()}
      >
        <ArrowLeft />
      </Button>
      <div className="flex items-center justify-between">
        <H3>{`${activity?.name} Scores`}</H3>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() =>
              router.push(`/activities/${activity?.id}/leaderboard`)
            }
          >
            Leaderboard
          </Button>
          <Button
            variant="outline"
            onClick={() => router.push(`/activities/${activity?.id}/report`)}
          >
            Report
          </Button>
        </div>
      </div>
      <ScoresTable columns={columns} data={activity?.scores || []} />
    </div>
  );
};

export default Page;
