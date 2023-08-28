import { RESOURSE_API_URL, SLACK_OAUTH_PATH } from "../constant/url";
import { fetcherWithTokenAndBody } from "../utils/fetcher";

export const SlackAPI = {
  oauth: async (code: string) => {
    const { response, result } = await fetcherWithTokenAndBody(
      RESOURSE_API_URL + SLACK_OAUTH_PATH,
      {
        code: code,
      },
      "POST"
    );
    return result;
  },
};
