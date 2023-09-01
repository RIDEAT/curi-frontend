import useSWR from "swr";
import { FrontOfficeAPI } from "../../api/frontOffice";

const useLaunchedModule = (
  frontOfficeId: string,
  launchedModuleId: string,
  token: string
) => {
  const { data, isLoading, error, mutate } = useSWR(
    frontOfficeId && token
      ? [
          FrontOfficeAPI.frontOfficeEndPoint +
            `/${frontOfficeId}/launched-modules/${launchedModuleId}`,
        ]
      : null,
    ([_]) => FrontOfficeAPI.getModule(frontOfficeId, launchedModuleId, token)
  );
  return {
    launchedModule: data,
    isLoading,
    error,
    launchedModuleMutate: mutate,
  };
};

export { useLaunchedModule };
