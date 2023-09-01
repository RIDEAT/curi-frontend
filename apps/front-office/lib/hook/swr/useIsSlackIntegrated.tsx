import useSWR from "swr";
import { FrontOfficeAPI } from "../../api/frontOffice";

const useIsSlackIntegrated = (frontOfficeId: string, token: string) => {
  const { data, isLoading, error, mutate } = useSWR(
    frontOfficeId && token
      ? [FrontOfficeAPI.frontOfficeEndPoint + `/${frontOfficeId}/isAuthorized`]
      : null,
    ([_]) => FrontOfficeAPI.getIsSlackIntegrated(frontOfficeId, token)
  );

  return {
    isSlackIntegrated: data?.isAuthorized,
    isLoading,
    error,
    isSlackIntegratedMutate: mutate,
  };
};

export { useIsSlackIntegrated };
