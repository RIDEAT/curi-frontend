"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

import { AuthAPI } from "../../lib/api/auth";
import { localStore } from "../../lib/utils/localStore";
import { LoadingCircle } from "ui";

const WORKSPACE_ROUTE = "/workspace";
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
      setIsLoading(true);
    }, []);

    useEffect(() => {
      switch (routeRole) {
        case "public":
          setIsLoading(true);
          break;
        case "protected":
          checkAuth().then((isValidate) => {
            if (!isValidate) {
              router.push(`${LOGIN_ROUTE}?redirect=${pathname}`);
            } else {
              setIsLoading(false);
            }
          });
          break;
        case "auth":
          if (localStore.isAuthenticated()) {
            checkAuth().then((isValidate) => {
              if (!isValidate) {
                router.push(`${LOGIN_ROUTE}?redirect=${pathname}`);
              } else {
                router.push(WORKSPACE_ROUTE);
              }
            });
            setIsLoading(false);
          } else {
            setIsLoading(false);
          }
          break;
        default:
          setIsLoading(false);
          break;
      }

      if (routeRole == "public") setIsLoading(false);
    }, []);

    if (isloading) {
      return (
        <div className="w-screen h-screen flex justify-center items-center">
          <LoadingCircle dimensions="w-10 h-10" />
        </div>
      );
    } else {
      return <Component {...(props as T)} />;
    }
  };

  return ComponentWithAuth;
}
