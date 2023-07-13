import getAuthToken from "./getAuthToken";

const getHeader = () => {
  return {
    "Content-Type": "application/json",
  };
};

const getHeaderWithAuth = async () => {
  return {
    ...getHeader(),
    Authorization: "Bearer " + getAuthToken(),
  };
};

export { getHeader, getHeaderWithAuth };
