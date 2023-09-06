import { RESOURSE_API_URL, USER_PATH } from "../constant/url";
import { fetcherWithTokenAndBody, fetcherWithToken } from "../utils/fetcher";
import { AuthAPI } from "./auth";

export const UserAPI = {
  register: async (email: string, name: string) => {
    try {
      const { response, result } = await fetcherWithTokenAndBody(
        RESOURSE_API_URL + USER_PATH,
        {
          email: email,
          name: name,
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
  getOne: async () => {
    const { response, result } = await fetcherWithToken(
      `${RESOURSE_API_URL}${USER_PATH}`
    );
    return result;
  },
};
