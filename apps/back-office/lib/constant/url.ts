// export const API_URL = "http://localhost:8080";

import { MemberType } from "member-types";

// -----------------------------
// RESOURSE
export const RESOURSE_API_URL = "https://api.dev.onbird.team";

// WORKSPACE
export const WORKSPACE_PATH = "/workspace";
export const WORKSPACES_PATH = "/workspaces";

// ROLE
export const ROLES_PATH = "/roles";

// USER
export const USER_PATH = "/user";

// MEMBER
export const MEMBERS_PATH = "/members";
export const EMPLOYEE_PATH = "/employee";
export const MANAGER_PATH = "/manager";
export const membersQueryWith = (workspaceId: string, type: MemberType) =>
  `?wid=${workspaceId}&type=${type}`;

// WORKFLOW
export const WORKFLOWS_PATH = "/workflows";

// SEQUENCE
export const SEQUENCES_PATH = "/sequences";

// MODULE
export const MODULES_PATH = "/modules";

// CONTENT
export const CONTENT_PATH = "/content";

// SLACK
export const SLACK_PATH = "/slack";
export const SLACK_OAUTH_PATH = "/oauth";
export const SLACK_IS_AUTHORIZED = "/isAuthorized";

// -----------------------------
// AUTH
export const AUTH_API_URL = "https://auth.dev.onbird.team";

export const AUTHROIZE_PATH = "/authorize";
export const VERIFY_PATH = "/verify";
export const LOGOUT_PATH = "/logout";

export const FIREBASE_PATH = "/firebase";
export const GOOGLE_PATH = "/google";

// -----------------------------
// External
export const GOOGLE_OAUTH_URL =
  "https://accounts.google.com/o/oauth2/v2/auth?client_id=1065165671986-lc7le3ju140a8snli27b02g6c2h1c7qh.apps.googleusercontent.com&redirect_uri=https://app.dev.onbird.team/google&response_type=code&scope=email";
