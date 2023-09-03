import {
  RESOURSE_API_URL,
  WORKSPACES_PATH,
  NOTIFICATION_PATH,
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
    console.log("in delete notification workspaceId", workspaceId);
    const { response, result } = await fetcherWithToken(
      NotificationAPI.getNotificationEndPoint(workspaceId) +
        "/" +
        notificationId,
      null,
      "DELETE"
    );
    return result;
  },
};
