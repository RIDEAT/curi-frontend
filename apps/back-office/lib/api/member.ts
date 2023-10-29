import { IEmployee, IManager, MemberType, IMember } from "member-types";
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
      MemberAPI.getMembersEndPoint(workspaceId),
      {
        ...employeeFormData,
        wid: Number(workspaceId),
        phoneNum: "010-0000-0000",
        department: "미정",
        type: "employee",
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
      MemberAPI.getMembersEndPoint(workspaceId),
      {
        ...managerForm,
        wid: workspaceId,
        phoneNum: "010-0000-0000",
        startDate: "2023-01-01",
        department: "미정",
        type: "manager",
      }
    );
    return { response, result };
  },

  createAll: async (workspaceId: string, members: IMember[]) => {
    const bodyData = members.map((member) => ({
      wid: member.wid,
      name: member.name,
      email: member.email,
      phoneNum: member.phoneNum,
      department: member.department,
      type: member.type,
      startDate: "2000-10-01",
    }));

    const { response, result } = await fetcherWithTokenAndBody(
      MemberAPI.getMembersEndPoint(workspaceId) + "/csv",
      bodyData
    );
    return { response, result };
  },
  updateEmployee: async (
    workspaceId: string,
    memberId: string,
    employeeForm: any
  ) => {
    const { response, result } = await fetcherWithTokenAndBody(
      MemberAPI.getMembersEndPoint(workspaceId) + "/" + memberId,
      employeeForm,
      "PATCH"
    );
    return { response, result };
  },
  updateManager: async (
    workspaceId: string,
    memberId: string,
    managerForm: any
  ) => {
    const { response, result } = await fetcherWithTokenAndBody(
      MemberAPI.getMembersEndPoint(workspaceId) + "/" + memberId,
      managerForm,
      "PATCH"
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
