  export type User = {
    id: string; // API returns string ID
    firstName: string;
    lastName: string;
    email: string;
    avatar?: string;
    createdAt: string;
    status: 'active' | 'inactive' | 'pending';
    permissions: string[];
  };
  
  export type UsersTableDataType = {
    serialNumber: number;
    User_id: number; // Table expects number ID
    fullName: string;
    email: string;
    avatar?: string;
    createdAt: string;
    status: string;
    permissions: string;
  };
