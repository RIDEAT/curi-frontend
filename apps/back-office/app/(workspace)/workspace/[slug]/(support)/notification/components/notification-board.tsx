import { useNotification } from "../../../../../../../lib/hook/swr/useNotifications";
import { useCurrentWorkspace } from "../../../../../../../lib/hook/useCurrentWorkspace";
import { ErrorBadge, SpreadCircleIcon, LoadingCircle } from "ui";
import { formatRelativeTime } from "../../../../../../../lib/utils/formatRelativeTime";
import { cn } from "ui/lib/utils";
import { useEffect } from "react";
import { NotificationAPI } from "../../../../../../../lib/api/notification";

export function NotificationBoard() {
  const { currentWorkspaceId } = useCurrentWorkspace();
  const {
    reversedNotifications,
    isLoading,
    error,
    mutateNotification,
    unReadCnt,
    resetUnReadCnt,
  } = useNotification();

  const destroy = async () => {
    if (reversedNotifications.length) {
      [...reversedNotifications]
        .filter((notification) => !notification.read)
        .forEach(async (unReadNotification) => {
          await NotificationAPI.markAsRead(
            currentWorkspaceId,
            unReadNotification.id
          );
        });

      const result = await mutateNotification();
      return result;
    }
  };

  useEffect(() => {
    if (unReadCnt) {
      resetUnReadCnt();
    }

    return () => {
      destroy();
    };
  }, [reversedNotifications]);

  if (isLoading) {
    return <LoadingCircle />;
  } else if (error) {
    return <ErrorBadge />;
  }

  return (
    <div className="overflow-scroll scrollbar-hide flex flex-col h-full">
      {reversedNotifications &&
        reversedNotifications.map((notification) => {
          return (
            <div
              className="h-full flex items-center justify-between px-4 py-2"
              key={notification.id}
            >
              <div className="h-full flex items-start space-x-2">
                <div className="h-full flex flex-col items-center mt-1">
                  <div>
                    {notification.read ? (
                      <SpreadCircleIcon color="#9c9c9cda" />
                    ) : (
                      <SpreadCircleIcon />
                    )}
                  </div>
                  {notification.read ? (
                    <div className="h-full w-[2px] bg-[#9c9c9cda] mt-1"></div>
                  ) : (
                    <div className="h-full w-[2px] bg-[#00D94A] mt-1"></div>
                  )}
                </div>
                <div className="flex flex-col gap-2">
                  <h3
                    className={cn(
                      "text-sm font-semibold",
                      !notification.read ? "text-green-500" : "text-gray-800"
                    )}
                  >
                    {notification.title}
                  </h3>
                  <p
                    className={cn(
                      "text-xs font-normal",
                      !notification.read
                        ? "text-gray-800 font-medium"
                        : "text-gray-400"
                    )}
                  >
                    {notification.contents}
                  </p>

                  <p
                    className={cn(
                      "text-xs font-normal",
                      !notification.read
                        ? "text-gray-800 font-medium"
                        : "text-gray-400"
                    )}
                  >
                    {formatRelativeTime(notification.timestamp)}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
}
