import { useEffect, useState } from "react";

const useAuthToken = () => {
  const [authToken, setAuthToken] = useState<string | null>(
    localStorage.getItem("authToken")?.replace(/"/g, "")
  );

  const clearAuthToken = () => {
    setAuthToken(null);
    localStorage.removeItem("token");
  };

  return { authToken, clearAuthToken };
};

export default useAuthToken;
