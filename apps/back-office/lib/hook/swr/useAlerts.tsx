import useSWR from "swr";
import { AlertAPI } from "../../api/alerts";
import { useCurrentWorkspace } from "../useCurrentWorkspace";

const useAlerts = () => {
  const { currentWorkspaceId } = useCurrentWorkspace();
  const { data, isLoading, error, mutate } = useSWR(
    currentWorkspaceId
      ? [`${AlertAPI.getAlertEndPoint(currentWorkspaceId)}`]
      : null,
    ([_]) => AlertAPI.getAll(currentWorkspaceId)
  );
  return {
    alerts: data,
    isLoading,
    error,
    mutateAlert: mutate,
  };
};

export { useAlerts };
