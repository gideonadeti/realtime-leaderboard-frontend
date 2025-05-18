"use client";

import { ColumnDef } from "@tanstack/react-table";

import Header from "@/app/(main)/components/data-table/header";
import { LeaderboardUser } from "../../types/leaderboard-user";
import { Medal, Trophy } from "lucide-react";

const columns: ColumnDef<LeaderboardUser>[] = [
  {
    accessorKey: "rank",
    header: ({ column }) => <Header column={column} title="Rank" />,
    cell: ({ row }) => {
      const leaderboardUser = row.original as LeaderboardUser;
      const rank = leaderboardUser.rank;

      return (
        <div className="ms-6">
          {rank <= 3 ? (
            <div>
              {rank === 1 && <Trophy className="h-5 w-5 text-yellow-500" />}
              {rank === 2 && <Medal className="h-5 w-5 text-gray-400" />}
              {rank === 3 && <Medal className="h-5 w-5 text-amber-700" />}
            </div>
          ) : (
            <div className="ps-[6px]">{rank}</div>
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
