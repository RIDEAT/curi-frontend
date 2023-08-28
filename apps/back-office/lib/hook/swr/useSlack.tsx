import useSWR from "swr";
import { SLACK_IS_AUTHORIZED } from "../../constant/url";
import { SlackAPI } from "../../api/slack";

const useSlack = () => {
  const { data, isLoading, error, mutate } = useSWR(
    SlackAPI.slackEndPoint + SLACK_IS_AUTHORIZED,
    SlackAPI.isAuthorized
  );

  return {
    isAuthorized: data,
    isLoading,
    error,
    mutateSlack: mutate,
  };
};

export { useSlack };
