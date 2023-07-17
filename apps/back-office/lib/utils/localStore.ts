export const localStore = {
  getAuthToken: () => {
    return localStorage.getItem("authToken")?.replace(/"/g, "");
  },
  setAuthToken: (authToken: string) => {
    localStorage.setItem("authToken", authToken);
  },
  removeAuthToken: () => {
    localStorage.removeItem("authToken");
  },
  isAuthenticated: () => {
    return !!localStorage.getItem("authToken");
  },
};
