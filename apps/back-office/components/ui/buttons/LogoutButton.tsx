import { Button } from "ui";
import { useSetAtom } from "jotai";
import { useRouter } from "next/navigation";
import {
  authTokenAtom,
  isAuthenticatedAtom,
  userAtom,
} from "../../../lib/context/auth";
import UserAPI from "../../../lib/api/user";

export default function LogoutButton() {
  const setIsAuthenticated = useSetAtom(isAuthenticatedAtom);
  const setAuthToken = useSetAtom(authTokenAtom);
  const setUser = useSetAtom(userAtom);
  const router = useRouter();
  const clearUser = () => {
    setIsAuthenticated(false);
    setAuthToken(null);
    setUser(null);
  };

  const handleLogout = async () => {
    await UserAPI.logout(
      localStorage.getItem("authToken")?.replace(/"/g, ""),
      clearUser
    );

    router.replace("/");
  };

  return <Button onClick={handleLogout}>Logout</Button>;
}
