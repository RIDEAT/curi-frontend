import { FrontOfficeAPI } from "../../api/frontOffice";
import useSWR from "swr";

const useIsCheckSatisfaction = (frontOfficeId: string, token: string) => {
  const { data, isLoading, error, mutate } = useSWR(
    frontOfficeId && token
      ? [
          FrontOfficeAPI.frontOfficeEndPoint +
            `/${frontOfficeId}/sequence-satisfaction`,
        ]
      : null,
    ([_]) => FrontOfficeAPI.getIsCheckSatisfaction(frontOfficeId, token)
  );
  return {
    isCheckSatisfaction: data,
    isLoading,
    error,
    isCheckSatisfactionMutate: mutate,
  };
};

export { useIsCheckSatisfaction };
