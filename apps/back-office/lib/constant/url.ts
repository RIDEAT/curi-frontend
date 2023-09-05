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

// DASHBOARD
export const DASHBOARD_PATH = "/dashboard";

// ALERT
export const ALERT_PATH = "/alerts";

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
export const GOOGLE_OAUTH_URL = `https://accounts.google.com/o/oauth2/v2/auth?client_id=1065165671986-lc7le3ju140a8snli27b02g6c2h1c7qh.apps.googleusercontent.com&redirect_uri=${process.env.NEXT_PUBLIC_APP_URL}/google&response_type=code&scope=email`;

export const SLACK_OAUTH_URL =
  "https://slack.com/oauth/v2/authorize?scope=channels%3Aread%2Cgroups%3Aread%2Cmpim%3Aread%2Cim%3Aread%2Cchat%3Awrite%2Cchannels%3Awrite.invites%2Cchannels%3Awrite.topic%2Cgroups%3Awrite%2Cmpim%3Awrite%2Cim%3Awrite%2Cchannels%3Amanage&amp;user_scope=&amp;redirect_uri=https%3A%2F%2Fapp.dev.onbird.team%2Fslack&amp;client_id=5305401263955.5790799264304";
