import { createInstance } from "@hackler/react-sdk";

const hackleClient = createInstance(process.env.HACKLE_BROWSER_SDK_KEY);

export { hackleClient };
