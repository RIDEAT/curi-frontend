import {
  RESOURSE_API_URL,
  DASHBOARD_PATH,
  ALERT_PATH,
  WORKSPACES_PATH,
} from "../constant/url";
import { fetcherWithToken } from "../utils/fetcher";

export const AlertAPI = {
  getAlertEndPoint: (workspaceId: string) => {
    const endPoint = `${RESOURSE_API_URL}${WORKSPACES_PATH}/${workspaceId}${DASHBOARD_PATH}${ALERT_PATH}`;
    return endPoint;
  },
  getAll: async (workspaceId: string) => {
    if (!workspaceId) return [];

    const { response, result } = await fetcherWithToken(
      AlertAPI.getAlertEndPoint(workspaceId)
    );
    return result;
  },
};
