
export interface User {
  id: string;
  email: string;
  role?: UserRole;
  firstName?: string;
  lastName?: string;
  avatarUrl?: string;
}

export type UserRole = 'user' | 'admin';
