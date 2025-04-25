export interface AuthState {
  email?: string;
  phoneNo?: number;
  password: string;
  method: "email" | "phone" | "";
  setLoginDetails: (
    email?: string,
    phoneNo?: number,
    password?: string,
    method?: "email" | "phone" | ""
  ) => void;
}

export interface User {
  created_at: string;
  email?: string;
  failed_attempts: number;
  is_locked: number;
  location_permission: string;
  password_last_updated: string;
  phone: string;
  updated_at: string;
  user_id: number;
}
