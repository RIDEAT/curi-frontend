import { FRONT_OFFICES_PATH, RESOURSE_API_URL } from "../constant/url";

export const FrontOfficeAPI = {
  frontOfficeEndPoint: RESOURSE_API_URL + FRONT_OFFICES_PATH,
  getSequence: async (frontOfficeId: string, token: string) => {
    const response = await fetch(
      FrontOfficeAPI.frontOfficeEndPoint + `/${frontOfficeId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        credentials: "include",
      }
    );
    const result = await response.json();
    return result;
  },
  getModule: async (
    frontOfficeId: string,
    launchedModuleId: string,
    token: string
  ) => {
    const response = await fetch(
      FrontOfficeAPI.frontOfficeEndPoint +
        `/${frontOfficeId}/launched-modules/${launchedModuleId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        credentials: "include",
      }
    );

    const result = await response.json();
    return result;
  },
  checkCompleteModule: async (
    frontOfficeId: string,
    launchedModuleId: string,
    token: string
  ) => {
    const response = await fetch(
      FrontOfficeAPI.frontOfficeEndPoint +
        `/${frontOfficeId}/launched-modules/${launchedModuleId}/complete`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        credentials: "include",
        body: JSON.stringify({}),
      }
    );

    const result = await response.json();
    return result;
  },
};
