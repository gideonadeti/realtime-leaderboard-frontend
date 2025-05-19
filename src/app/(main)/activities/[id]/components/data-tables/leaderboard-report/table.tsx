"use client";

import { useEffect, useRef, useState } from "react";
import { useUser } from "@clerk/nextjs";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import Pagination from "@/app/(main)/components/data-table/pagination";
import Toolbar from "./toolbar";
import { LeaderboardUser } from "../../../types/leaderboard-user";
import { cn } from "@/lib/utils";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface LeaderboardReportTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

const LeaderboardReportTable = <TData, TValue>({
  columns,
  data,
}: LeaderboardReportTableProps<TData, TValue>) => {
  const targetRowRef = useRef<HTMLTableRowElement>(null);
  const { user } = useUser();
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = useState<SortingState>([]);
  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnFilters,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  useEffect(() => {
    const allRows = table.getFilteredRowModel().rows;
    const targetRowIndex = allRows.findIndex(
      (row) => (row.original as LeaderboardUser).clerkId === user?.id
    );

    if (targetRowIndex !== -1) {
      const pageIndex = Math.floor(
        targetRowIndex / table.getState().pagination.pageSize
      );
      table.setPageIndex(pageIndex);

      setTimeout(() => {
        if (targetRowRef.current) {
          targetRowRef.current.scrollIntoView({
            behavior: "smooth",
            block: "center",
          });
        }
      }, 100);
    }
  }, [table, user?.id]);

  return (
    <div className="space-y-4">
      <Toolbar table={table} />
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} colSpan={header.colSpan}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  ref={
                    (row.original as LeaderboardUser).clerkId === user?.id
                      ? targetRowRef
                      : undefined
                  }
                  className={cn(
                    (row.original as LeaderboardUser).clerkId === user?.id &&
                      "bg-purple-100 dark:bg-purple-900/20 relative after:absolute after:left-0 after:top-0 after:h-full after:w-1 after:bg-purple-600"
                  )}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <Pagination table={table} />
    </div>
  );
};

export default LeaderboardReportTable;
