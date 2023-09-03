import { useNotification } from "../../../../../../../lib/hook/swr/useNotifications";
import { NotificationAPI } from "../../../../../../../lib/api/notification";
import { useCurrentWorkspace } from "../../../../../../../lib/hook/useCurrentWorkspace";

import {
  ErrorBadge,
  LoadingCircle,
  Alert,
  AlertDescription,
  AlertTitle,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "ui";

import { MoreVertical } from "lucide-react";
import { useState, useCallback, useEffect } from "react";

export function NotificationBoard() {
  const { notifications, isLoading, error, mutateNotification } =
    useNotification();
  const [selectedNotification, setSelectedNotification] = useState(null);
  const { currentWorkspaceId } = useCurrentWorkspace();

  const handleDeleteClick = useCallback((notification) => {
    setSelectedNotification(notification);
  }, []);

  // Function to handle notification deletion
  const deleteNotification = async (notification) => {
    try {
      await NotificationAPI.deleteNotification(
        currentWorkspaceId,
        notification.id
      );
      mutateNotification();
    } catch (error) {
      console.error("Error deleting notification:", error);
    }
  };

  useEffect(() => {
    if (selectedNotification) {
      deleteNotification(selectedNotification);
      setSelectedNotification(null);
    }
  }, [selectedNotification, deleteNotification]);

  if (isLoading) {
    return <LoadingCircle />;
  } else if (error) {
    return <ErrorBadge />;
  }

  const notificationList = notifications || [];

  return (
    <div>
      {notificationList.map((notification, index) => (
        <Alert
          key={index}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div>
            <AlertTitle>Heads up!</AlertTitle>
            <AlertDescription>{notification.contents}</AlertDescription>
          </div>
          <div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <MoreVertical />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuGroup>
                  <DropdownMenuItem
                    onClick={() => handleDeleteClick(notification)}
                  >
                    <span>알림 삭제하기</span>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </Alert>
      ))}
    </div>
  );
}
