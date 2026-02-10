import { proxy, useSnapshot } from "valtio";

// const DASHBOARD_URL = "https://dashboard.chainrails.io";
const DASHBOARD_URL = "https://chainrails-dashboard-client-git-feat-themes-auth-horus-labs.vercel.app";

interface AuthStore {
  accessToken: string | null;
}

export const authStore = proxy<AuthStore>({
  accessToken: localStorage.getItem("access_token"),
});

export const setAccessToken = (token: string) => {
  authStore.accessToken = token;
  localStorage.setItem("access_token", token);
};

export const clearAccessToken = () => {
  authStore.accessToken = null;
  localStorage.removeItem("access_token");
};

export const useAuthStore = () => {
  return useSnapshot(authStore);
};

export const getSignInUrl = () => {
  const url = new URL("/auth/themes", DASHBOARD_URL);
  return url.toString();
};
