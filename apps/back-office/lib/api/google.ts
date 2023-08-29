import {
  AUTH_API_URL,
  AUTHROIZE_PATH,
  GOOGLE_IS_AUTHORIZED,
  GOOGLE_PATH,
} from "../constant/url";
import { fetcherWithToken, fetcherWithTokenAndBody } from "../utils/fetcher";

export const GoogleAPI = {
  googleEndPoint: AUTH_API_URL,
  oauth: async (code: string) => {
    const { response, result } = await fetcherWithToken(
      GoogleAPI.googleEndPoint + AUTHROIZE_PATH + GOOGLE_PATH + "?code=" + code
    );
    return result;
  },
  isAuthorized: async () => {
    const { response, result } = await fetcherWithToken(
      GoogleAPI.googleEndPoint + GOOGLE_IS_AUTHORIZED
    );
    return result;
  },
};
