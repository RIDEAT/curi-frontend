import {
  RESOURSE_API_URL,
  SLACK_IS_AUTHORIZED,
  SLACK_OAUTH_PATH,
  SLACK_PATH,
} from "../constant/url";
import { fetcherWithToken, fetcherWithTokenAndBody } from "../utils/fetcher";

export const SlackAPI = {
  slackEndPoint: RESOURSE_API_URL + SLACK_PATH,
  oauth: async (code: string) => {
    const { response, result } = await fetcherWithTokenAndBody(
      SlackAPI.slackEndPoint + SLACK_OAUTH_PATH,
      {
        code: code,
      },
      "POST"
    );
    return result;
  },
  deleteAuth: async () => {
    const { response, result } = await fetcherWithToken(
      SlackAPI.slackEndPoint + SLACK_OAUTH_PATH,
      null,
      "DELETE"
    );
    return result;
  },
  isAuthorized: async () => {
    const { response, result } = await fetcherWithToken(
      SlackAPI.slackEndPoint + SLACK_IS_AUTHORIZED
    );
    return result;
  },
};
