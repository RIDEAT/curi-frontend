import { useEffect, useState } from "react";
import { useCurrentWorkspace } from "../useCurrentWorkspace";
import { useWorkspaces } from "./useWorkspaces";

const useCurrentRoles = () => {
  const { currentWorkspaceId } = useCurrentWorkspace();
  const [currentRoles, setCurrentRoles] = useState([]);
  const { getRolesInWorkspace } = useWorkspaces();

  useEffect(() => {
    if (currentWorkspaceId) {
      setCurrentRoles(getRolesInWorkspace(currentWorkspaceId));
    }
  }, [currentWorkspaceId]);

  return { currentRoles };
};

export { useCurrentRoles };
