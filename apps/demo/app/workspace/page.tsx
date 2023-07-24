"use client";

import { Metadata } from "next";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Workspace() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/workspace/workflow");
  }, []);

  return <></>;
}
