"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import useActivities from "../hooks/use-activities";
import Loading from "@/app/loading";
import columns from "./components/data-table/columns";
import ScoresTable from "./components/data-table/table";
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

  return (
    <div className="px-8 py-4 space-y-4">
      <Button size="sm" title="Back" onClick={() => router.back()}>
        <ArrowLeft />
      </Button>
      <div className="flex items-center justify-between">
        <H3>{`${activity?.name}'s scores`}</H3>
        <Link
          href={`/leaderboards/${activity?.id}`}
          className="hover:underline hover:text-blue-700"
        >
          Leaderboard
        </Link>
      </div>
      <ScoresTable columns={columns} data={activity?.scores || []} />
    </div>
  );
};

export default Page;
