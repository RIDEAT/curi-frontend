import useSWR from "swr";
import { WorkspaceAPI } from "../../api/workspace";
import { useCurrentWorkspace } from "../useCurrentWorkspace";

const useCurrentLogo = () => {
  const { currentWorkspaceId } = useCurrentWorkspace();
  const { data, isLoading, error, mutate } = useSWR(
    currentWorkspaceId
      ? [`${WorkspaceAPI.workspacesEndPoint}/${currentWorkspaceId}/logo`]
      : null,
    ([_]) => WorkspaceAPI.getLogoImageUrl(currentWorkspaceId)
  );

  return {
    currentLogo: data,
    isLoading,
    error,
    currentLogoMutate: mutate,
  };
};

export { useCurrentLogo };
