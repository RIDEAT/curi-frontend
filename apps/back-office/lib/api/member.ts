import { IEmployee, IManager, MemberType } from "member-types";
import {
  EMPLOYEE_PATH,
  MANAGER_PATH,
  MEMBERS_PATH,
  RESOURSE_API_URL,
  WORKSPACES_PATH,
} from "../constant/url";
import { fetcherWithToken, fetcherWithTokenAndBody } from "../utils/fetcher";

export const MemberAPI = {
  getMembersEndPoint: (workspaceId: string) => {
    const endPoint = `${RESOURSE_API_URL}${WORKSPACES_PATH}/${workspaceId}${MEMBERS_PATH}`;
    return endPoint;
  },
  getAll: async (workspaceId: string, type: MemberType) => {
    if (type === "employee") {
      const { response, result } = await fetcherWithToken(
        `${MemberAPI.getMembersEndPoint(workspaceId)}?type=${type}`,
        (parsed) => {
          const employees = parsed as IEmployee[];
          return employees.map((employee) => {
            employee.startDate = employee.detail.startDate;
            employee.managers = employee.detail.managers;
            employee.id = employee.id.toString();
            return employee;
          });
        }
      );
      return result as IEmployee[];
    } else if (type === "manager") {
      const { response, result } = await fetcherWithToken(
        `${MemberAPI.getMembersEndPoint(workspaceId)}?type=${type}`,
        (parsed) => {
          const managers = parsed as IManager[];
          return managers.map((manager) => {
            manager.id = manager.id.toString();
            return manager;
          });
        }
      );
      return result as IManager[];
    }
  },
  createEmployee: async (
    workspaceId: string,
    employeeFormData: {
      name: string;
      email: string;
      startDate: string;
    }
  ) => {
    const { response, result } = await fetcherWithTokenAndBody(
      MemberAPI.getMembersEndPoint(workspaceId) + EMPLOYEE_PATH,
      {
        ...employeeFormData,
        wid: workspaceId,
        phoneNum: "010-0000-0000",
        department: "미정",
        managers: [],
      }
    );
    return { response, result };
  },
  createManager: async (
    workspaceId: string,
    managerForm: {
      name: string;
      email: string;
    }
  ) => {
    const { response, result } = await fetcherWithTokenAndBody(
      MemberAPI.getMembersEndPoint(workspaceId) + MANAGER_PATH,
      {
        ...managerForm,
        wid: workspaceId,
        phoneNum: "010-0000-0000",
        department: "미정",
      }
    );
    return { response, result };
  },
  updateEmployee: async (
    workspaceId: string,
    memberId: string,
    employeeForm: {
      // 추가해야함
    }
  ) => {
    const { response, result } = await fetcherWithTokenAndBody(
      MemberAPI.getMembersEndPoint(workspaceId) +
        EMPLOYEE_PATH +
        "/" +
        memberId,
      employeeForm,
      "PUT"
    );
    return { response, result };
  },
  updateManager: async (
    workspaceId: string,
    memberId: string,
    managerForm: {
      name: string;
      email: string;
      // TODO : 더 넣어야 함
    }
  ) => {
    const { response, result } = await fetcherWithTokenAndBody(
      MemberAPI.getMembersEndPoint(workspaceId) + MANAGER_PATH + "/" + memberId,
      managerForm,
      "PUT"
    );
    return { response, result };
  },
  delete: async (workspaceId: string, memberId: string) => {
    const { response, result } = await fetcherWithToken(
      MemberAPI.getMembersEndPoint(workspaceId) + "/" + memberId,
      null,
      "DELETE"
    );
    return result;
  },
};
