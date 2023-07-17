import { RESOURSE_API_URL, USER_PATH } from "../constant/url";
import { fetcherWithTokenAndBody } from "../utils/fetcher";
import { AuthAPI } from "./auth";

export const UserAPI = {
  register: async (email: string, accessToken: string) => {
    try {
      const isGetTokens = await AuthAPI.getTokens(accessToken);

      if (!isGetTokens) {
        throw new Error("토큰을 받아오지 못했습니다.");
      }

      const { response, result } = await fetcherWithTokenAndBody(
        RESOURSE_API_URL + USER_PATH,
        {
          email,
        }
      );

      if (!response.ok) {
        throw new Error("회원가입에 실패했습니다.");
      }

      return true;
    } catch (error) {
      console.error(error);
      throw new Error("회원가입에 실패했습니다.");
    }
  },
};
