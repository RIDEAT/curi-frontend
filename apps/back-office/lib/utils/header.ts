import { localStore } from "./localStore";

const getHeader = () => {
  return {
    "Content-Type": "application/json",
  };
};

const getHeaderWithAuth = async () => {
  return {
    ...getHeader(),
    Authorization: "Bearer " + localStore.getAuthToken(),
  };
};

export { getHeader, getHeaderWithAuth };
