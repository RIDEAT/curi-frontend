import useSWR from "swr";
import { NotificationAPI } from "../../api/notification";
import { useCurrentWorkspace } from "../useCurrentWorkspace";

const useNotification = () => {
  const { currentWorkspaceId } = useCurrentWorkspace();
  const { data, isLoading, error, mutate } = useSWR(
    currentWorkspaceId
      ? [`${NotificationAPI.getNotificationEndPoint(currentWorkspaceId)}`]
      : null,
    ([_]) => NotificationAPI.getNotifications(currentWorkspaceId)
  );
  return {
    notifications: data,
    unReadCnt: data?.filter((notification) => !notification.read).length,
    isLoading,
    error,
    mutateNotification: mutate,
  };
};

export { useNotification };
