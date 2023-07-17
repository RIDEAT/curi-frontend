import { Button } from "ui";
import { useSetAtom } from "jotai";
import { useRouter } from "next/navigation";
import { AuthAPI } from "../../../lib/api/auth";

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
