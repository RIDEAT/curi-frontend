// export const API_URL = "http://localhost:8080";

import { MemberType } from "member-types";

// -----------------------------
// RESOURSE
export const RESOURSE_API_URL = "https://api.curiboard.com";

// WORKSPACE
export const WORKSPACE_PATH = "/workspace";

// USER
export const USER_PATH = "/user";

// MEMBER
export const MEMBERS_PATH = "/members";
export const MEMBER_PATH = "/member";
export const MEMBER_EMPLOYEE_PATH = MEMBER_PATH + "/employee";
export const MEMBER_MANAGER_PATH = MEMBER_PATH + "/manager";
export const membersQueryWith = (workspaceId: string, type: MemberType) =>
  `?wid=${workspaceId}&type=${type}`;

// -----------------------------
// AUTH
export const AUTH_API_URL = "https://auth.curiboard.com";

export const AUTHROIZE_PATH = "/authorize";
export const VERIFY_PATH = "/verify";
export const LOGOUT_PATH = "/logout";
