import {
  RESOURSE_API_URL,
  WORKSPACES_PATH,
  NOTIFICATION_PATH,
  MARK_AS_READ_PATH,
} from "../constant/url";
import { fetcherWithToken, fetcherWithTokenAndBody } from "../utils/fetcher";

export const NotificationAPI = {
  getNotificationEndPoint: (workspaceId: string) => {
    const endPoint = `${RESOURSE_API_URL}${WORKSPACES_PATH}/${workspaceId}${NOTIFICATION_PATH}`;
    return endPoint;
  },

  getNotifications: async (workspaceId: string) => {
    const { response, result } = await fetcherWithToken(
      NotificationAPI.getNotificationEndPoint(workspaceId)
    );
    return result;
  },
  deleteNotification: async (workspaceId: string, notificationId: string) => {
    const { response, result } = await fetcherWithToken(
      NotificationAPI.getNotificationEndPoint(workspaceId) +
        "/" +
        notificationId,
      null,
      "DELETE"
    );
    return result;
  },
  markAsRead: async (workspaceId: string, notificationId: string) => {
    const { response, result } = await fetcherWithTokenAndBody(
      NotificationAPI.getNotificationEndPoint(workspaceId) +
        "/" +
        notificationId +
        MARK_AS_READ_PATH,
      {},
      "PUT"
    );
    return result;
  },
};
