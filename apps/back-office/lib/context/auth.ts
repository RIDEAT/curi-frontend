import { IAuthState } from "auth-types";
import { atom } from "jotai";

export const authStateAtom = atom<IAuthState>({
  isAuthenticated: false,
  user: null,
  authToken: null,
});
