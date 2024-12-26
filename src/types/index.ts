// User type
export type User = {
  id: string;
  name: string;
  email: string;
  phone: string;
  birthday: string;
  gender: string;
  contactName: string;
  contactPhone: string;
  credits: number;
  isAdmin: boolean;
  isSuperAdmin: boolean;
  isActive: boolean;
  createdAt: number;
  updatedAt: number;
};

// Generic Type for reusable components
export type Doc = {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
};
