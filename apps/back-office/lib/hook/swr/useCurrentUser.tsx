import useSWR from "swr";
import { UserAPI } from "../../api/user";
import { localStore } from "../../utils/localStore";

const useCurrentUser = () => {
  const { data, isLoading, error, mutate } = useSWR(
    localStore.isAuthenticated ? [UserAPI.userEndPoint] : null,
    ([_]) => UserAPI.getOne()
  );

  return {
    currentUser: data,
    isLoading,
    error,
    currentUserMutate: mutate,
  };
};

export { useCurrentUser };
