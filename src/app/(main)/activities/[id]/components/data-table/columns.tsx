"use client";

import { ColumnDef } from "@tanstack/react-table";

import Header from "@/app/(main)/components/data-table/header";
import { Score } from "../../../types/activity";

const columns: ColumnDef<Score>[] = [
  {
    accessorKey: "user.name",
    header: ({ column }) => <Header column={column} title="User's name" />,
    cell: ({ row }) => {
      const score = row.original as Score;

      return <span className="ms-6">{score.user.name}</span>;
    },
  },
  {
    accessorKey: "value",
    header: ({ column }) => <Header column={column} title="Score" />,
    cell: ({ row }) => {
      const score = row.original as Score;

      return <span className="ms-6">{score.value}</span>;
    },
  },
];

export default columns;
