"use client";

import { ArrowLeft, Calendar } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import { useState, useEffect, useMemo } from "react";
import { subDays, format, isEqual } from "date-fns";

import useActivities from "../../hooks/use-activities";
import useReport from "./hooks/use-report";
import columns from "../components/data-tables/leaderboard-report/columns";
import ReportTable from "../components/data-tables/leaderboard-report/table";
import Loading from "@/app/loading";
import { H3, H5 } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const Page = () => {
  const router = useRouter();
  const { id } = useParams();
  const { activitiesQuery } = useActivities();

  // Memoize date values to prevent recreation on every render
  const today = useMemo(() => new Date(), []);
  const weekAgo = useMemo(() => subDays(today, 7), [today]);

  const [fromDate, setFromDate] = useState(weekAgo);
  const [toDate, setToDate] = useState(today);
  const [dateError, setDateError] = useState<string | null>(null);
  const [isValidRange, setIsValidRange] = useState(true);
  const [submittedRange, setSubmittedRange] = useState({
    fromDate: weekAgo,
    toDate: today,
  });

  // Validate dates when they change
  useEffect(() => {
    // Check if from date is after to date
    if (fromDate > toDate) {
      setDateError("From date cannot be after To date");
      setIsValidRange(false);
      return;
    }

    // Check if to date is in the future
    if (toDate > today) {
      setDateError("To date cannot be in the future");
      setIsValidRange(false);
      return;
    }

    setDateError(null);
    setIsValidRange(true);
  }, [fromDate, toDate, today]);

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

  const canFetchReport = hasDateChanged && isValidRange;

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

      <div>
        <H3>{`${activityName} Report`}</H3>
      </div>

      <div className="flex flex-wrap gap-4 items-end">
        <div>
          <H5>From date</H5>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline">
                <Calendar className="mr-2 h-4 w-4" />
                {format(fromDate, "PPP")}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <CalendarComponent
                mode="single"
                selected={fromDate}
                onSelect={(date) => date && setFromDate(date)}
                disabled={(date) => date > today}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        <div>
          <H5>To date</H5>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline">
                <Calendar className="mr-2 h-4 w-4" />
                {format(toDate, "PPP")}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <CalendarComponent
                mode="single"
                selected={toDate}
                onSelect={(date) => date && setToDate(date)}
                disabled={(date) => date > today}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        {hasDateChanged && (
          <Button
            onClick={() => setSubmittedRange({ fromDate, toDate })}
            disabled={!canFetchReport}
          >
            Fetch Report
          </Button>
        )}
      </div>

      {dateError && <p className="text-sm text-red-500">{dateError}</p>}

      <ReportTable columns={columns} data={users} />
    </div>
  );
};

export default Page;
