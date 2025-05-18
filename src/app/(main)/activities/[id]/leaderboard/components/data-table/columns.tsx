"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Medal, Trophy } from "lucide-react";

import Header from "@/app/(main)/components/data-table/header";
import getOrdinal from "@/app/(main)/utils/get-ordinal";
import { LeaderboardUser } from "../../types/leaderboard-user";

const columns: ColumnDef<LeaderboardUser>[] = [
  {
    accessorKey: "rank",
    header: ({ column }) => <Header column={column} title="Rank" />,
    cell: ({ row }) => {
      const leaderboardUser = row.original as LeaderboardUser;
      const rank = leaderboardUser.rank;

      return (
        <div className="ms-4">
          {rank <= 3 ? (
            <div className="flex items-center gap-2">
              <span>{getOrdinal(rank)}</span>
              <span>
                {rank === 1 && <Trophy className="h-5 w-5 text-yellow-500" />}
                {rank === 2 && <Medal className="h-5 w-5 text-gray-400" />}
                {rank === 3 && <Medal className="h-5 w-5 text-amber-700" />}
              </span>
            </div>
          ) : (
            <div>{getOrdinal(rank)}</div>
          )}
        </div>
      );
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
