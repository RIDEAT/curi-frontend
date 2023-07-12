const getHeader = () => {
  return {
    "Content-Type": "application/json",
  };
};

const getHeaderWithAuth = (authToken: string) => {
  return {
    ...getHeader(),
    Authorization: "Bearer " + authToken,
  };
};

export { getHeader, getHeaderWithAuth };
