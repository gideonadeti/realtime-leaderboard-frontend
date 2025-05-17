"use client";

import Link from "next/link";
import { ColumnDef } from "@tanstack/react-table";

import Header from "@/app/(main)/components/data-table/header";
import { Activity } from "../../types/activity";

const columns: ColumnDef<Activity>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => <Header column={column} title="Name" />,
    cell: ({ row }) => {
      const activity = row.original as Activity;

      return (
        <Link
          href={`/activities/${activity.id}`}
          className="hover:underline hover:text-blue-700 ms-2"
        >
          {activity.name}
        </Link>
      );
    },
  },
  {
    accessorKey: "scores",
    header: ({ column }) => (
      <Header column={column} title="No. of Submitted Scores" />
    ),
    cell: ({ row }) => {
      const activity = row.original as Activity;

      return <div className="ms-20">{activity.scores.length}</div>;
    },
  },
];

export default columns;
