import { atom } from "jotai";

type Action = {
  type: "INSTANCE_MOUNTED" | "USER_MOUNTED" | "RESET";
};

const hackleInstanceMounted = atom(false);
const hackleUserMounted = atom(false);
const hackleStateAtom = atom(
  (get) => ({
    instanceMounted: get(hackleInstanceMounted),
    userMounted: get(hackleUserMounted),
  }),
  (get, set, action: Action) => {
    switch (action.type) {
      case "INSTANCE_MOUNTED":
        set(hackleInstanceMounted, true);
        break;
      case "USER_MOUNTED":
        set(hackleUserMounted, true);
        break;
      case "RESET":
        set(hackleUserMounted, false);
        break;

      default:
        break;
    }

    return {
      instanceMounted: get(hackleInstanceMounted),
      userMounted: get(hackleUserMounted),
    };
  }
);

export { hackleStateAtom };
