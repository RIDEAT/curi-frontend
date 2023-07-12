"use client";

import { SWRConfig } from "swr";

export const BaseSWRProvider = ({ children }) => {
  return <SWRConfig value={{}}>{children}</SWRConfig>;
};
