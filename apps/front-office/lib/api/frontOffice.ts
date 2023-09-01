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
  checkCompletedModule: async (
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
  checkInProgressModule: async (
    frontOfficeId: string,
    launchedModuleId: string,
    token: string
  ) => {
    const response = await fetch(
      FrontOfficeAPI.frontOfficeEndPoint +
        `/${frontOfficeId}/launched-modules/${launchedModuleId}/in-progress`,
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
  getIsCheckSatisfaction: async (frontOfficeId: string, token: string) => {
    const response = await fetch(
      FrontOfficeAPI.frontOfficeEndPoint +
        `/${frontOfficeId}/sequence-satisfaction`,
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
  submitSatisfaction: async (
    frontOfficeId: string,
    token: string,
    satisfaction: {
      score: number;
      comment: string;
    }
  ) => {
    const response = await fetch(
      FrontOfficeAPI.frontOfficeEndPoint +
        `/${frontOfficeId}/sequence-satisfaction`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        credentials: "include",
        body: JSON.stringify({ ...satisfaction }),
      }
    );

    const result = await response.json();
    return result;
  },
  getIsSlackIntegrated: async (frontOfficeId: string, token: string) => {
    const response = await fetch(
      FrontOfficeAPI.frontOfficeEndPoint + `/${frontOfficeId}/isAuthorized`,
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
  connectSlack: async (frontOfficeId: string, token: string, code: string) => {
    const response = await fetch(
      FrontOfficeAPI.frontOfficeEndPoint + `/${frontOfficeId}/oauth`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        credentials: "include",
        body: JSON.stringify({ code }),
      }
    );

    const result = await response.json();
    return result;
  },
};
