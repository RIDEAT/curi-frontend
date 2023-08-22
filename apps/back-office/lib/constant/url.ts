// export const API_URL = "http://localhost:8080";

import { MemberType } from "member-types";

// -----------------------------
// RESOURSE
export const RESOURSE_API_URL = "https://api.dev.curiboard.com";

// WORKSPACE
export const WORKSPACE_PATH = "/workspace";
export const WORKSPACES_PATH = "/workspaces";

// ROLE
export const ROLES_PATH = "/roles";

// USER
export const USER_PATH = "/user";

// MEMBER
export const MEMBERS_PATH = "/members";
export const MEMBER_PATH = "/member";
export const MEMBER_EMPLOYEE_PATH = MEMBER_PATH + "/employee";
export const MEMBER_MANAGER_PATH = MEMBER_PATH + "/manager";
export const membersQueryWith = (workspaceId: string, type: MemberType) =>
  `?wid=${workspaceId}&type=${type}`;

// WORKFLOW
export const WORKFLOWS_PATH = "/workflows";

// SEQUENCE
export const SEQUENCES_PATH = "/sequences";

// -----------------------------
// AUTH
export const AUTH_API_URL = "https://auth.dev.curiboard.com";

export const AUTHROIZE_PATH = "/authorize";
export const VERIFY_PATH = "/verify";
export const LOGOUT_PATH = "/logout";
