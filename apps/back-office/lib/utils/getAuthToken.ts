const getAuthToken = () => {
  return localStorage.getItem("authToken")?.replace(/"/g, "");
};

export default getAuthToken;
