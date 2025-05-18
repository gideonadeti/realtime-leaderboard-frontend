"use client";

import { ColumnDef } from "@tanstack/react-table";

import Header from "@/app/(main)/components/data-table/header";
import { LeaderboardUser } from "../../types/leaderboard-user";

const columns: ColumnDef<LeaderboardUser>[] = [
  {
    accessorKey: "rank",
    header: ({ column }) => <Header column={column} title="Rank" />,
    cell: ({ row }) => {
      const leaderboardUser = row.original as LeaderboardUser;

      return <span className="ms-6">{leaderboardUser.rank}</span>;
    },
  },
  {
    accessorKey: "name",
    header: ({ column }) => <Header column={column} title="Name" />,
    cell: ({ row }) => {
      const leaderboardUser = row.original as LeaderboardUser;

      return <span className="ms-2">{leaderboardUser.name}</span>;
    },
  },
  {
    accessorKey: "score",
    header: ({ column }) => <Header column={column} title="Score" />,
    cell: ({ row }) => {
      const leaderboardUser = row.original as LeaderboardUser;

      return <span className="ms-8">{leaderboardUser.score}</span>;
    },
  },
];

export default columns;
