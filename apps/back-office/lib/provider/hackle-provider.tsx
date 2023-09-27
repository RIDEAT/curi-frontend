import { HackleProvider } from "@hackler/react-sdk";
import { useHackle } from "../hook/useHackle";
import { hackleClient } from "../hackle/hackleClient";

function HackleCustomProvider({ children }: { children: React.ReactNode }) {
  const { hackleState, setInstanceMounted, userMount, resetHackleState } =
    useHackle();

  return (
    <HackleProvider hackleClient={hackleClient}>{children}</HackleProvider>
  );
}

export { HackleCustomProvider };
