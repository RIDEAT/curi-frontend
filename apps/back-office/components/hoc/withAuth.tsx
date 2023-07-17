"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { AuthAPI } from "../../lib/api/auth";
import { localStore } from "../../lib/utils/localStore";

const HOME_ROUTE = "/";
const LOGIN_ROUTE = "/login";

enum RouteRole {
  auth,
  public,
  protected,
}

interface withAuthProps {}

export default function withAuth<T extends withAuthProps = withAuthProps>(
  Component: React.ComponentType<T>,
  routeRole: keyof typeof RouteRole
) {
  const ComponentWithAuth = (props: Omit<T, keyof withAuthProps>) => {
    const router = useRouter();
    const pathname = usePathname();

    const [isloading, setIsLoading] = useState(true);

    const checkAuth = async () => {
      const isValidToken = await AuthAPI.validateToken();

      if (!isValidToken) {
        await AuthAPI.logout();

        return false;
      }

      return true;
    };

    useEffect(() => {
      if (localStore.isAuthenticated()) {
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
      return <Component {...(props as T)} />;
    }
  };

  return ComponentWithAuth;
}
