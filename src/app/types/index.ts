export default interface AuthState {
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
