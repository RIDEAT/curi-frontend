declare module "auth-types" {
  import { IUser } from "user-types";

  interface IAuthState {
    isAuthenticated: boolean;
    user: null | IUser;
    authToken: null | string;
  }
}
