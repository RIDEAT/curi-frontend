import { MemberFormType, MemberType } from "member-types";
import {
  MEMBERS_PATH,
  MEMBER_PATH,
  RESOURSE_API_URL,
  membersQueryWith,
} from "../constant/url";
import { fetcherWithToken, fetcherWithTokenAndBody } from "../utils/fetcher";

export const MemberAPI = {
  membersEndPoint: RESOURSE_API_URL + MEMBERS_PATH,
  memberEndPoint: RESOURSE_API_URL + MEMBER_PATH,
  getMany: async (workspaceId: string, type: MemberType) => {
    const { response, result } = await fetcherWithToken(
      MemberAPI.membersEndPoint + membersQueryWith(workspaceId, type),
      (parsed) => parsed.memberListResponse
    );
    return result;
  },
  getOne: async (memberId: string) => {
    const { response, result } = await fetcherWithToken(
      MemberAPI.memberEndPoint + "/" + memberId,
      (parsed) => parsed.data
    );
    return result;
  },
  create: async (memberForm: MemberFormType) => {
    const { response, result } = await fetcherWithTokenAndBody(
      MemberAPI.memberEndPoint,
      memberForm
    );
    return { response, result };
  },
  update: async (memberId: string, memberForm: MemberFormType) => {
    const { response, result } = await fetcherWithTokenAndBody(
      MemberAPI.memberEndPoint + "/" + memberId,
      memberForm,
      "PUT"
    );
    return result;
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
