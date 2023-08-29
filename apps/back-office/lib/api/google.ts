import {
  RESOURSE_API_URL,
  GOOGLE_OAUTH_PATH,
  GOOGLE_PATH,
  GOOGLE_IS_AUTHORIZED,
} from "../constant/url";
import { fetcherWithToken, fetcherWithTokenAndBody } from "../utils/fetcher";

export const GoogleAPI = {
  googleEndPoint: RESOURSE_API_URL + GOOGLE_PATH,
  oauth: async (code: string) => {
    const { response, result } = await fetcherWithTokenAndBody(
      GoogleAPI.googleEndPoint + GOOGLE_OAUTH_PATH,
      {
        code: code,
      },
      "POST"
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
