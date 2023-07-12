"use client";

import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { usePathname, useRouter } from "next/navigation";
import { IUser } from "user-types";
import { authStateAtom, userAtom } from "../../lib/context/auth";
import { useEffect, useState } from "react";
import UserAPI from "../../lib/api/user";

import { isAuthenticatedAtom, authTokenAtom } from "../../lib/context/auth";

const HOME_ROUTE = "/";
const LOGIN_ROUTE = "/login";

enum RouteRole {
  auth,
  public,
  protected,
}

interface withAuthProps {
  user: IUser;
}

export default function withAuth<T extends withAuthProps = withAuthProps>(
  Component: React.ComponentType<T>,
  routeRole: keyof typeof RouteRole
) {
  const ComponentWithAuth = (props: Omit<T, keyof withAuthProps>) => {
    const authState = useAtomValue(authStateAtom);
    const router = useRouter();
    const pathname = usePathname();

    const [isAuthenticated, setIsAuthenticated] = useAtom(isAuthenticatedAtom);
    const setAuthToken = useSetAtom(authTokenAtom);
    const setUser = useSetAtom(userAtom);

    const [isloading, setIsLoading] = useState(true);

    const checkAuth = async () => {
      const authToken = localStorage.getItem("authToken")?.replace(/"/g, "");
      const isValidToken = await UserAPI.validateToken(
        authToken == null ? "auth" : authToken,
        setAuthToken,
        setUser
      );

      if (!isValidToken) {
        setIsAuthenticated(false);
        setAuthToken(null);

        return false;
      }

      return true;
    };

    useEffect(() => {
      if (isAuthenticated) {
        if (routeRole == "auth") {
          router.push(HOME_ROUTE);
        } else {
          setIsLoading(false);
        }
      } else {
        if (routeRole == "protected") {
          checkAuth().then((isValidate) => {
            if (!isValidate) {
              router.push(`${LOGIN_ROUTE}?redirect=${pathname}`);
            } else {
              setIsLoading(false);
            }
          });
        }
        setIsLoading(false);
      }

      if (routeRole == "public") setIsLoading(false);
    }, []);

    if (isloading) return <div>loading...</div>;
    else {
      return <Component {...(props as T)} user={authState.user} />;
    }
  };

  return ComponentWithAuth;
}
