import { IAuthState } from "auth-types";
import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import { IUser } from "user-types";

export const isAuthenticatedAtom = atomWithStorage("isAuthenticated", false);
export const userAtom = atom<IUser>({ id: 0, email: "" } as IUser);
export const authTokenAtom = atomWithStorage("authToken", null);

export const authStateAtom = atom<IAuthState>((get) => {
  const isAuthenticated = get(isAuthenticatedAtom);
  const user = get(userAtom);
  const authToken = get(authTokenAtom);

  const result = {
    isAuthenticated,
    user,
    authToken,
  };

  return result;
});
