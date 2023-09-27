import { BaseSWRProvider } from "../../lib/provider/swr-provider";
import { Provider } from "jotai";

import { Toaster } from "ui";
import { HackleCustomProvider } from "../../lib/provider/hackle-provider";

function BodyLayout({ children }: { children: React.ReactNode }) {
  return (
    <BaseSWRProvider>
      <Provider>
        <HackleCustomProvider>{children}</HackleCustomProvider>
      </Provider>
      <Toaster />
    </BaseSWRProvider>
  );
}

export { BodyLayout };
