import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import axios from "axios";

interface User {
  id: number;
  username: string;
  email: string;
  first_name?: string;
  last_name?: string;
  is_staff?: boolean;
  is_superuser?: boolean;
}

interface AuthState {
  token: string | null;
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (token: string, user: User) => void;
  logout: () => void;
  refreshAccessToken: () => Promise<boolean>;
  initializeAuth: () => void;
}

export const useAuth = create<AuthState>()(
  persist(
    (set, get) => ({
      token: null,
      user: null,
      isAuthenticated: false,
      isLoading: true,

      login: (token: string, user: User) => {
        set({
          token,
          user,
          isAuthenticated: true,
          isLoading: false,
        });

        // Set default authorization header for axios
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        console.log("Login successful, token set");
      },

      logout: () => {
        set({
          token: null,
          user: null,
          isAuthenticated: false,
          isLoading: false,
        });

        // Remove authorization header
        delete axios.defaults.headers.common["Authorization"];

        // Clear localStorage
        localStorage.removeItem("refresh_token");
        console.log("Logout successful");
      },

      refreshAccessToken: async (): Promise<boolean> => {
        const refreshToken = localStorage.getItem("refresh_token");

        if (!refreshToken) {
          get().logout();
          return false;
        }

        try {
          const response = await axios.post(
            "http://127.0.0.1:8000/api/auth/jwt/refresh/",
            {
              refresh: refreshToken,
            }
          );

          const newToken = response.data.access;
          const currentUser = get().user;

          if (currentUser) {
            set({ token: newToken });
            axios.defaults.headers.common[
              "Authorization"
            ] = `Bearer ${newToken}`;
            console.log("Token refreshed successfully");
            return true;
          }

          return false;
        } catch (error) {
          console.error("Token refresh failed:", error);
          get().logout();
          return false;
        }
      },

      initializeAuth: () => {
        const state = get();
        if (state.token && state.user) {
          axios.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${state.token}`;
          set({ isLoading: false });
          console.log("Auth initialized from storage");
        } else {
          set({ isLoading: false });
          console.log("No stored auth found");
        }
      },
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        token: state.token,
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
