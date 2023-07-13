import { useEffect, useState } from "react";

const useAuthToken = () => {
  const [authToken, setAuthToken] = useState<string | null>();

  const clearAuthToken = () => {
    setAuthToken(null);
    localStorage.removeItem("token");
  };

  return { authToken, setAuthToken, clearAuthToken };
};

export default useAuthToken;
