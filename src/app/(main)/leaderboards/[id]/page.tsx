"use client";

import { ArrowLeft } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";

import useActivities from "../../activities/hooks/use-activities";
import Loading from "@/app/loading";
import { Button } from "@/components/ui/button";
import { H3 } from "@/components/ui/typography";

const Page = () => {
  const router = useRouter();
  const { id } = useParams();
  const { activitiesQuery } = useActivities();
  const activityName =
    id === "global"
      ? "Global"
      : activitiesQuery.data?.find((a) => a.id === id)?.name;

  if (activitiesQuery.isPending) {
    return <Loading />;
  }

  if (!activityName) {
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
      <Button size="sm" title="Back" onClick={() => router.back()}>
        <ArrowLeft />
      </Button>
      <H3>{`${activityName} leaderboard`}</H3>
    </div>
  );
};

export default Page;
