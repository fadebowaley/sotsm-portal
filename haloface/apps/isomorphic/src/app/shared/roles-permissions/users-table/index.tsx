"use client";

import useData from "@/app/shared/roles-permissions/useData";
import { useTanStackTable } from "@core/components/table/custom/use-TanStack-Table";
import { usersColumns } from "./columns";
import Table from "@core/components/table";
import TableFooter from "@core/components/table/footer";
import TablePagination from "@core/components/table/pagination";
import Filters from "./filters";
import { User } from "@/app/shared/roles-permissions/useData";

export type UsersTableDataType = {
  id: string;
  serialNumber: number;
  User_id: string;
  fullName: string;
  email: string;
  avatar?: string;
  createdAt: string;
  status: string;
  permissions: string;
};

const transformUserToTableData = (user: User, serialNumber: number): UsersTableDataType => ({
  id: user.id,
  serialNumber,
  User_id: user.id,
  fullName: user.name ?? `${user.firstname ?? ""} ${user.lastname ?? ""}`.trim(),
  email: user.email,
  avatar: user.avatar,
  createdAt: user.createdAt,
  status: user.status,
  permissions: user.permissions,
});


export default function UsersTable() {
  const { usersData = [], loading, error, setUsersData } = useData();

  const tableData = Array.isArray(usersData)
  ? usersData.map((user, index) => transformUserToTableData(user, index + 1))
  : [];

  const { table } = useTanStackTable<UsersTableDataType>({
    tableData,
    columnConfig: usersColumns,
    options: {
      initialState: { pagination: { pageIndex: 0, pageSize: 10 } },
      meta: {
        handleDeleteRow: (row: { original: UsersTableDataType }) => {
          if (!row?.original?.id) return;
          setUsersData((prev) => prev.filter((user) => user.id !== row.original.id));
        },
        handleMultipleDelete: (rows: { original: UsersTableDataType }[]) => {
          const idsToDelete = rows.map((row) => row.original?.id).filter(Boolean);
          setUsersData((prev) => prev.filter((user) => !idsToDelete.includes(user.id)));
        },
      },
      enableColumnResizing: false,
    },
  });

  if (loading) return <p className="text-center py-4">Loading users...</p>;
  if (error) return <p className="text-center py-4 text-red-500">{error}</p>;
  if (!usersData.length) return <p className="text-center py-4">No users found.</p>;

  return (
    <div className="mt-14">
      <Filters table={table} />
      <Table table={table} variant="modern" classNames={{ container: "border border-muted rounded-md", rowClassName: "last:border-0" }} />
      <TableFooter table={table} />
      <TablePagination table={table} className="py-4" />
    </div>
  );
}
