"use client";

import { ColumnDef } from "@tanstack/react-table";

import Header from "@/app/(main)/components/data-table/header";
import { Activity } from "../../types/activity";
import CustomLink from "@/app/(main)/components/custom-link";

const columns: ColumnDef<Activity>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => <Header column={column} title="Name" />,
    cell: ({ row }) => {
      const activity = row.original as Activity;

      return (
        <CustomLink href={`/activities/${activity.id}`}>
          {activity.name}
        </CustomLink>
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

      return <span className="ms-20">{activity.scores.length}</span>;
    },
  },
];

export default columns;
