import { useRouter } from "next/navigation";

import { Button } from "ui";

import { AuthAPI } from "../../lib/api/auth";

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    const isLogouted = await AuthAPI.logout();

    if (!isLogouted) {
      return;
    }

    router.replace("/");
  };

  return <Button onClick={handleLogout}>Logout</Button>;
}
