import { IUser } from "user-types";
import {
  AUTHROIZE_PATH,
  AUTH_API_URL,
  LOGOUT_PATH,
  VERIFY_PATH,
} from "../constant/url";

export const UserAPI = {
  /**
   * get Auth token and refresh token from server
   */
  getTokens: async (accessToken: string) => {
    try {
      const response = await fetch(AUTH_API_URL + AUTHROIZE_PATH, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + accessToken,
        },
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("서버에서 토큰을 받아오지 못했습니다.");
      }

      const user: IUser = { id: 1, email: "ddd" };
      const authToken = response.headers.get("Authtoken");

      return { user, authToken };
    } catch (error) {
      console.error(error);
    }
  },
  /**
   *
   */
  validateToken: async (
    authToken: string,
    setAuthToken: (token: string) => void,
    setUser: (user: IUser) => void
  ) => {
    try {
      const response = await fetch(AUTH_API_URL + VERIFY_PATH, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + authToken,
        },
        credentials: "include",
      });

      if (!response.ok) {
        return false;
      }

      const newAuthToken = response.headers.get("Authtoken");
      const user: IUser = await response.json();

      setAuthToken(newAuthToken);
      setUser(user);

      return true;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
  /**
   * logout
   */
  logout: async (authToken: string, clearFunc: () => void) => {
    try {
      const response = await fetch(AUTH_API_URL + LOGOUT_PATH, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + authToken,
        },
        credentials: "include",
      });

      if (response.ok) {
        clearFunc();
        return true;
      }

      clearFunc();
      return true;
    } catch (error) {
      console.error(error);
    }
  },
};
