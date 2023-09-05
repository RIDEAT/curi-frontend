import {
  AUTHROIZE_PATH,
  AUTH_API_URL,
  FIREBASE_PATH,
  GOOGLE_PATH,
  LOGOUT_PATH,
  VERIFY_PATH,
} from "../constant/url";
import { fetcherWithToken } from "../utils/fetcher";
import { localStore } from "../utils/localStore";

export const AuthAPI = {
  authEndPoint: AUTH_API_URL,
  /**
   * get Auth token and refresh token from server
   */
  getTokensForFirebase: async (accessToken: string) => {
    try {
      const response = await fetch(
        AuthAPI.authEndPoint + AUTHROIZE_PATH + FIREBASE_PATH,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + accessToken,
          },
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error("서버에서 토큰을 받아오지 못했습니다.");
      }

      const authToken = response.headers.get("Authtoken");
      localStore.setAuthToken(authToken);

      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  },
  getTokensForGoogle: async (code: string) => {
    try {
      const response = await fetch(
        AuthAPI.authEndPoint + AUTHROIZE_PATH + GOOGLE_PATH + "?code=" + code,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      const result = await response.json();

      if (!response.ok) {
        throw new Error("서버에서 토큰을 받아오지 못했습니다.");
      }

      const authToken = response.headers.get("Authtoken");
      localStore.setAuthToken(authToken);

      return result;
    } catch (error) {
      console.error(error);
      return false;
    }
  },
  /**
   * validate token and get new token
   */
  validateToken: async () => {
    try {
      const { response, result } = await fetcherWithToken(
        AUTH_API_URL + VERIFY_PATH
      );

      if (!response.ok) {
        return false;
      }

      const newAuthToken = response.headers.get("Authtoken");

      localStore.setAuthToken(newAuthToken);

      return true;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
  /**
   * logout and remove token
   */
  logout: async () => {
    try {
      const { response, result } = await fetcherWithToken(
        AUTH_API_URL + LOGOUT_PATH
      );

      localStore.removeAuthToken();

      if (response.ok) {
        return true;
      }

      return false;
    } catch (error) {
      localStore.removeAuthToken();
      console.error(error);
    }
  },
};
