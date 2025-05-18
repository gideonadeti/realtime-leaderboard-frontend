"use client";

import { ArrowLeft } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import { useState } from "react";
import { subDays, format, parseISO, isEqual } from "date-fns";

import useActivities from "../../hooks/use-activities";
import useReport from "./hooks/use-report";
import Loading from "@/app/loading";
import { Button } from "@/components/ui/button";
import { H3, H5 } from "@/components/ui/typography";
import { Input } from "@/components/ui/input";

const Page = () => {
  const router = useRouter();
  const { id } = useParams();
  const { activitiesQuery } = useActivities();

  const today = new Date();
  const weekAgo = subDays(today, 7);

  const [fromDate, setFromDate] = useState(weekAgo);
  const [toDate, setToDate] = useState(today);
  const [submittedRange, setSubmittedRange] = useState({
    fromDate: weekAgo,
    toDate: today,
  });

  const { reportQuery } = useReport(
    id as string,
    submittedRange.fromDate,
    submittedRange.toDate
  );

  const activityName =
    id === "global"
      ? "Global"
      : activitiesQuery.data?.find((a) => a.id === id)?.name;

  const users = reportQuery.data || [];

  const hasDateChanged =
    !isEqual(fromDate, submittedRange.fromDate) ||
    !isEqual(toDate, submittedRange.toDate);

  if (activitiesQuery.isPending || reportQuery.isPending) {
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
    <div className="px-8 py-4 space-y-6">
      <Button
        variant="outline"
        size="sm"
        title="Back"
        onClick={() => router.back()}
      >
        <ArrowLeft />
      </Button>

      <div className="space-y-2">
        <H3>{`${activityName} Report`}</H3>
        <H5>{`No. of users: ${users.length}`}</H5>
        <p>{`From date: ${format(submittedRange.fromDate, "PPP")}`}</p>
        <p>{`To date: ${format(submittedRange.toDate, "PPP")}`}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <H5>From date</H5>
          <Input
            type="date"
            value={format(fromDate, "yyyy-MM-dd")}
            onChange={(e) => setFromDate(parseISO(e.target.value))}
          />
        </div>
        <div>
          <H5>To date</H5>
          <Input
            type="date"
            value={format(toDate, "yyyy-MM-dd")}
            onChange={(e) => setToDate(parseISO(e.target.value))}
          />
        </div>
      </div>

      {hasDateChanged && (
        <div>
          <Button
            onClick={() =>
              setSubmittedRange({ fromDate: fromDate, toDate: toDate })
            }
          >
            Fetch Report
          </Button>
        </div>
      )}
    </div>
  );
};

export default Page;
