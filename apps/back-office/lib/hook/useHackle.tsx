import { useEffect } from "react";
import { useCurrentUser } from "./swr/useCurrentUser";
import { useAtom } from "jotai";
import { hackleStateAtom } from "../atoms/hackleState";
import { hackleClient } from "../hackle/hackleClient";
import { PropertyOperationsBuilder } from "@hackler/javascript-sdk";

interface IUser {
  userId: string;
  name: string;
  phoneNum: string;
  company: string;
  agreeWithMarketing: boolean;
}

const useHackle = () => {
  const { currentUser, isLoading, error } = useCurrentUser();
  const [hackleState, dispatchHackleState] = useAtom(hackleStateAtom);

  const setInstanceMounted = () => {
    dispatchHackleState({ type: "INSTANCE_MOUNTED" });
  };

  const userMount = (user: IUser) => {
    hackleClient.setUserId(user?.userId);
    const operations = new PropertyOperationsBuilder()
      .set("name", user?.name)
      .set("company", user?.company)
      .set("phoneNum", user?.phoneNum)
      .set("agreeWithMarketing", user?.agreeWithMarketing)
      .build();
    hackleClient.updateUserProperties(operations);
    dispatchHackleState({ type: "USER_MOUNTED" });
  };

  const resetHackleState = () => {
    hackleClient.resetUser();
    dispatchHackleState({ type: "RESET" });
  };

  useEffect(() => {
    hackleClient.onReady(() => {
      setInstanceMounted();
    });

    if (
      !isLoading &&
      currentUser &&
      hackleState?.instanceMounted &&
      !hackleState.userMounted
    ) {
      userMount(currentUser);
    }

    if (error || !currentUser) {
      resetHackleState();
    }
  }, [
    hackleState.instanceMounted,
    hackleState.userMounted,
    currentUser,
    isLoading,
  ]);

  return {
    hackleState,
    setInstanceMounted,
    userMount,
    resetHackleState,
  };
};

export { useHackle };
