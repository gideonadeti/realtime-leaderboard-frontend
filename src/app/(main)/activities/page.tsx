"use client";

import useActivities from "./hooks/use-activities";
import columns from "./components/data-table/columns";
import ActivitiesTable from "./components/data-table/table";
import Loading from "@/app/loading";
import { H3 } from "@/components/ui/typography";

const Page = () => {
  const { activitiesQuery } = useActivities();
  const activities = activitiesQuery.data || [];

  if (activitiesQuery.isPending) {
    return <Loading />;
  }

  return (
    <div className="px-8 space-y-4">
      <H3>Activities</H3>
      <div>
        <ActivitiesTable columns={columns} data={activities} />
      </div>
    </div>
  );
};

export default Page;
