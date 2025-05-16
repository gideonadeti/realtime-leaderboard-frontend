"use client";

import { ColumnDef } from "@tanstack/react-table";

import Header from "@/app/(main)/components/data-table/header";
import { Score } from "../../../types/activity";

const columns: ColumnDef<Score>[] = [
  {
    accessorKey: "user",
    header: ({ column }) => <Header column={column} title="User's name" />,
    cell: ({ row }) => {
      const score = row.original as Score;

      return <span>{score.user.name}</span>;
    },
  },
  {
    accessorKey: "value",
    header: ({ column }) => <Header column={column} title="Score" />,
  },
];

export default columns;
