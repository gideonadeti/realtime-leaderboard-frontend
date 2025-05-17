"use client";

import { ArrowLeft } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";

import useActivities from "../hooks/use-activities";
import columns from "./components/data-table/columns";
import ScoresTable from "./components/data-table/table";
import CustomLink from "../../components/custom-link";
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
      <Button size="sm" title="Back" onClick={() => router.back()}>
        <ArrowLeft />
      </Button>
      <div className="flex items-center justify-between">
        <H3>{`${activity?.name} Scores`}</H3>
        <CustomLink href={`/activities/${activity?.id}/leaderboard`}>
          Leaderboard
        </CustomLink>
      </div>
      <ScoresTable columns={columns} data={activity?.scores || []} />
    </div>
  );
};

export default Page;
