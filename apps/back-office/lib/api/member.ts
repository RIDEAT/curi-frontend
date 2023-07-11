import { IMember } from "member-types";

const MemberAPI = {
  get: async () => {
    const response = await fetch("/api/member", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await response.json();
    return result.list as IMember[];
  },
};

export default MemberAPI;
