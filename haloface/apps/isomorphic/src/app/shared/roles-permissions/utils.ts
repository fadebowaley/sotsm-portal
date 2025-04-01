import {User, UsersTableDataType} from '@/types';
import { ROLES } from '@/config/constants';
import { PERMISSIONS, STATUSES } from '@/app/shared/roles-permissions/useData';

export const statuses = Object.values(STATUSES).map((status) => ({
  label: status,
  value: status,
}));

export const permissions = Object.values(PERMISSIONS).map((permission) => ({
  label: permission,
  value: permission,
}));

export const roles = Object.entries(ROLES).map(([key, value]) => ({
  label: value,
  value: key,
}));

export function transformUsers(users: User[]): UsersTableDataType[] {
  return users.map((user, index) => ({
    serialNumber: index + 1,
    User_id: Number(user.id), // Convert string ID to number
    fullName: `${user.firstName} ${user.lastName}`.trim(),
    email: user.email,
    // avatar: user.avatar,
    createdAt: new Date(user.createdAt).toLocaleDateString(),
    status: user.status,
    permissions: Array.isArray(user.permissions) 
    ? user.permissions.join(', ') 
    : String(user.permissions || 'No permissions'),
}))
};