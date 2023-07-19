import {
  EmployeeFormType,
  ManagerFormType,
  MemberFormType,
  MemberType,
} from "member-types";
import {
  MEMBERS_PATH,
  MEMBER_EMPLOYEE_PATH,
  MEMBER_MANAGER_PATH,
  MEMBER_PATH,
  RESOURSE_API_URL,
  membersQueryWith,
} from "../constant/url";
import { fetcherWithToken, fetcherWithTokenAndBody } from "../utils/fetcher";

export const MemberAPI = {
  membersEndPoint: RESOURSE_API_URL + MEMBERS_PATH,
  memberEndPoint: RESOURSE_API_URL + MEMBER_PATH,
  memberEmployeeEndPoint: RESOURSE_API_URL + MEMBER_EMPLOYEE_PATH,
  memberManagerEndPoint: RESOURSE_API_URL + MEMBER_MANAGER_PATH,
  getMany: async (workspaceId: string, type: MemberType) => {
    const { response, result } = await fetcherWithToken(
      MemberAPI.membersEndPoint + membersQueryWith(workspaceId, type),
      (parsed) => {
        if (type == "manager") return parsed;
        return parsed.map((member: any) => {
          const result = { ...member, startDate: member.detail.startDate };
          return result;
        });
      }
    );
    return result;
  },
  /* TODO : getOne으로 수정 form 띄우기 전에 데이터 검증 필요 */
  getOne: async (memberId: string) => {
    const { response, result } = await fetcherWithToken(
      MemberAPI.memberEndPoint + "/" + memberId,
      (parsed) => parsed.data
    );
    return result;
  },
  createEmployee: async (employeeForm: EmployeeFormType) => {
    const { response, result } = await fetcherWithTokenAndBody(
      MemberAPI.memberEmployeeEndPoint,
      employeeForm
    );
    return { response, result };
  },
  createManager: async (managerForm: ManagerFormType) => {
    const { response, result } = await fetcherWithTokenAndBody(
      MemberAPI.memberManagerEndPoint,
      managerForm
    );
    return { response, result };
  },
  updateEmployee: async (memberId: string, employeeForm: EmployeeFormType) => {
    const { response, result } = await fetcherWithTokenAndBody(
      MemberAPI.memberEmployeeEndPoint + "/" + memberId,
      employeeForm,
      "PUT"
    );
    return { response, result };
  },
  updateManager: async (memberId: string, managerForm: ManagerFormType) => {
    const { response, result } = await fetcherWithTokenAndBody(
      MemberAPI.memberManagerEndPoint + "/" + memberId,
      managerForm,
      "PUT"
    );
    return { response, result };
  },
  delete: async (memberId: string) => {
    const { response, result } = await fetcherWithToken(
      MemberAPI.memberEndPoint + "/" + memberId,
      null,
      "DELETE"
    );
    return result;
  },
};
