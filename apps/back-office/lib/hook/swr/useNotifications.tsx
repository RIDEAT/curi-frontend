import useSWR from "swr";
import { NotificationAPI } from "../../api/notification";
import { useCurrentWorkspace } from "../useCurrentWorkspace";
import { useEffect, useState } from "react";

interface INotification {
  contents: string;
  id: string;
  read: boolean;
  timestamp: string;
  title: string;
  workspaceId: string;
}

const useNotification = () => {
  const { currentWorkspaceId } = useCurrentWorkspace();
  const { data, isLoading, error, mutate } = useSWR(
    currentWorkspaceId
      ? [`${NotificationAPI.getNotificationEndPoint(currentWorkspaceId)}`]
      : null,
    ([_]) => NotificationAPI.getNotifications(currentWorkspaceId)
  );

  const [unReadCnt, setUnReadCnt] = useState(0);
  const [reversedNotifications, setReversedNotifications] = useState<
    INotification[]
  >([]);

  const resetUnReadCnt = () => {
    setUnReadCnt(0);
  };

  const mutateNotification = async () => {
    resetUnReadCnt();
    const result = await mutate();
    return result;
  };

  useEffect(() => {
    if (data) {
      setUnReadCnt(data.filter((notification) => !notification.read).length);
      setReversedNotifications([...data].reverse());
    }
  }, [data]);

  return {
    notifications: data as INotification[],
    reversedNotifications,
    unReadCnt,
    isLoading,
    error,
    mutateNotification,
    resetUnReadCnt,
  };
};

export { useNotification };
