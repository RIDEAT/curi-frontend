import useSWR from "swr";
import { UserAPI } from "../../api/user";

const useCurrentUser = () => {
  const { data, isLoading, error, mutate } = useSWR("user", () =>
    UserAPI.getOne()
  );

  return {
    currentUser: data,
    isLoading,
    error,
    currentUserMutate: mutate,
  };
};

export { useCurrentUser };
