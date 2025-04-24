import { useUserAuthStore } from "../store/userAuthSrore";
export function logout() {
  useUserAuthStore.getState().clearAuth();
  window.location.href = "/login";
}
