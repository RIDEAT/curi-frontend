// export const API_URL = "http://localhost:8080";
import { MemberType } from "member-types";

// -----------------------------
// RESOURSE
export const RESOURSE_API_URL = process.env.NEXT_PUBLIC_RESOURSE_API_URL;

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

// NOTIFICATION
export const NOTIFICATION_PATH = "/notifications";
export const MARK_AS_READ_PATH = "/mark-as-read";

// LAUNCHED WORKFLOW
export const LAUNCHED_WORKFLOWS_PATH = "/launchedworkflows";

// DASHBOARD
export const DASHBOARD_PATH = "/dashboard";

// REPORT
export const REPORT_PATH = "/reports";

// Template
export const TEMPLATES_PATH = "/templates";

// ALERT
export const ALERT_PATH = "/alerts";

// CHATBOT
export const QUESTION_PATH = "/chat";
export const TEXT_TO_CHATBOT_PATH = "/text-to-ai";

// -----------------------------
// AUTH
export const AUTH_API_URL = process.env.NEXT_PUBLIC_AUTH_API_URL;

export const AUTHROIZE_PATH = "/authorize";
export const VERIFY_PATH = "/verify";
export const LOGOUT_PATH = "/logout";

export const FIREBASE_PATH = "/firebase";
export const GOOGLE_PATH = "/google";

// -----------------------------
// External
export const GOOGLE_OAUTH_URL = process.env.NEXT_PUBLIC_GOOGLE_OAUTH_URL;
