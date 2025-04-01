import { useState, useEffect } from "react";

export const PERMISSIONS = {
  Read: "Read",
  Write: "Write",
  Delete: "Delete",
} as const;

export const STATUSES = {
  Pending: "Pending",
  Active: "Active",
  Deactivated: "Deactivated",
} as const;

export type User = {
  id: string;
  firstname?: string;
  lastname?: string;
  name?: string;
  email: string;
  avatar?: string;
  createdAt: string;
  status: keyof typeof STATUSES;
  permissions: keyof typeof PERMISSIONS;
};

const useData = () => {
  const [usersData, setUsersData] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const response = await fetch("http://localhost:3000/v1/users", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          // credentials: 'include', 
        });

        if (!response.ok) throw new Error("Failed to fetch users");

        const data = await response.json() as any;
        const formattedUsers: User[] = data.results.map((user: any, index: number) => ({
          id: user.id,
          serialNumber: index + 1,
          User_id: user.id,
          fullName: user.name || `${user.lastname ?? ""} ${user.firstname ?? ""}`.trim(),
          email: user.email,
          avatar: user.avatar,
          createdAt: typeof user.createdAt === "string"
          ? user.createdAt
          : user.createdAt?.$date ?? "N/A",
          status: STATUSES.Active,
          permissions: PERMISSIONS.Read,
        }));

        setUsersData(formattedUsers);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return { usersData, loading, error, setUsersData };
};

export default useData;
