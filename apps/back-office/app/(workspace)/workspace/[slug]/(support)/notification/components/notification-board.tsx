import { useNotification } from "../../../../../../../lib/hook/swr/useNotifications";
import { NotificationAPI } from "../../../../../../../lib/api/notification";
import { useCurrentWorkspace } from "../../../../../../../lib/hook/useCurrentWorkspace";
import "./notification-board.css";
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
  DropdownMenuTrigger,
} from "ui";

import { MoreVertical } from "lucide-react";
import { useState, useCallback, useEffect } from "react";

export function NotificationBoard() {
  const { notifications, isLoading, error, mutateNotification } =
    useNotification();
  const [willBeDeletedNotification, setWillBeDeletedNotification] =
    useState(null);

  const { currentWorkspaceId } = useCurrentWorkspace();

  const handleDeleteClick = useCallback((notification) => {
    setWillBeDeletedNotification(notification);
  }, []);

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
    if (willBeDeletedNotification) {
      deleteNotification(willBeDeletedNotification);
      setWillBeDeletedNotification(null);
    }
  }, [willBeDeletedNotification, deleteNotification]);

  if (isLoading) {
    return <LoadingCircle />;
  } else if (error) {
    return <ErrorBadge />;
  }

  let notificationList = notifications || [];

  if (notificationList.length > 0) {
    notificationList = [...notificationList].sort((a, b) =>
      b.timestamp.localeCompare(a.timestamp)
    );
    notificationList.forEach((notification) => {
      if (!notification.read)
        NotificationAPI.markAsRead(currentWorkspaceId, notification.id);
    });
  }

  console.log(notificationList);

  const formatRelativeTime = (timestamp) => {
    const now = Date.now();
    const notification = new Date(timestamp);
    const notificationTime = notification.getTime() + 32400000;

    const diffInSeconds = Math.floor((now - notificationTime) / 1000);

    if (diffInSeconds < 60) {
      return "방금";
    } else if (diffInSeconds < 3600) {
      const minutes = Math.floor(diffInSeconds / 60);
      return `${minutes}분 전`;
    } else if (diffInSeconds < 86400) {
      const hours = Math.floor(diffInSeconds / 3600);
      return `${hours}시간 전`;
    } else {
      const days = Math.floor(diffInSeconds / 86400);
      return `${days}일 전`;
    }
  };

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
            <AlertTitle>{notification.title}</AlertTitle>
            <AlertDescription>{notification.contents}</AlertDescription>
            <AlertDescription style={{ fontSize: "12px", color: "gray" }}>
              {formatRelativeTime(notification.timestamp)}
            </AlertDescription>
          </div>
          <div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild className="hover-icon">
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
