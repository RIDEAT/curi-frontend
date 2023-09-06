import { RESOURSE_API_URL, USER_PATH } from "../constant/url";
import { fetcherWithTokenAndBody } from "../utils/fetcher";
import { AuthAPI } from "./auth";

export const UserAPI = {
  register: async (email: string) => {
    try {
      const { response, result } = await fetcherWithTokenAndBody(
        RESOURSE_API_URL + USER_PATH,
        {
          email: email,
          name: "test",
        }
      );

      if (!response.ok) {
        throw new Error("회원가입에 실패했습니다.");
      }

      return true;
    } catch (error) {
      console.error(error);
    }
  },
};
