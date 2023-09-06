import { BaseSWRProvider } from "../../lib/provider/swr-provider";
import { Provider } from "jotai";

import { Toaster } from "ui";

function BodyLayout({ children }: { children: React.ReactNode }) {
  return (
    <BaseSWRProvider>
      <Provider>{children}</Provider>
      <Toaster />
    </BaseSWRProvider>
  );
}

export { BodyLayout };
