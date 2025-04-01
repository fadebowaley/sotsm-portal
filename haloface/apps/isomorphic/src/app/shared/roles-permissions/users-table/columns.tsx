"use client";

import { createColumnHelper } from "@tanstack/react-table";
import { Checkbox, Badge } from "rizzui";
import AvatarCard from "@core/ui/avatar-card";
import TableRowActionGroup from "@core/components/table-utils/table-row-action-group";
import { UsersTableDataType } from "./index";
import { getStatusBadge } from "@core/components/table-utils/get-status-badge";

const columnHelper = createColumnHelper<UsersTableDataType>();

export const usersColumns = [
    columnHelper.display({
      id: "select",
      size: 50,
      header: ({ table }) => (
        <Checkbox
          checked={table.getIsAllPageRowsSelected()}
          onChange={(e) => table.toggleAllPageRowsSelected(e.target.checked)}
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onChange={(e) => row.getToggleSelectedHandler()(e)}
        />
      ),
    }),
    columnHelper.accessor("serialNumber", { header: "No.", size: 80 }),
    columnHelper.accessor("User_id", {
      header: "User ID",
      size: 100,
      cell: ({ row }) => `${row.original.User_id}`,
    }),
    columnHelper.accessor("fullName", {
      header: "Name",
      size: 300,
      cell: ({ row }) => (
        <AvatarCard
          src={row.original.avatar || ""}
          name={row.getValue("fullName")}
          description={row.original.email}
        />
      ),
    }),
    columnHelper.accessor("createdAt", {
      id: "createdAt",
      size: 200,
      header: "Created",
      cell: ({ row }) => {
        const dateValue = row.original.createdAt;
  
        const dateString =
          typeof dateValue === "string"
            ? dateValue
            : typeof dateValue === "object" && "$date" in dateValue
            ? (dateValue as { $date: string }).$date
            : "";
  
        const date = dateString ? new Date(dateString) : null;
        const formattedDate =
          date && !isNaN(date.getTime())
            ? date.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })
            : "Invalid Date";
  
        return <span>{formattedDate}</span>;
      },
    }),
    columnHelper.accessor("status", {
      header: "Status",
      size: 150,
      cell: ({ row }) => getStatusBadge(row.getValue("status")),
    }),
    columnHelper.accessor("permissions", {
      header: "Permissions",
      size: 250,
      cell: ({ row }) => <Badge>{row.getValue("permissions")}</Badge>,
    }),
  
    // Moved the action column to the end
    columnHelper.display({
      id: "action",
      size: 140,
      cell: ({ row, table }) => (
        <TableRowActionGroup
          onDelete={() => table.options.meta?.handleDeleteRow?.(row.original)}
        />
      ),
    }),
];
