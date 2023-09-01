"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FrontOfficeAPI } from "../../lib/api/frontOffice";
import { SequenceLanding } from "./components/sequence-landing";
import { useLaunchedSequence } from "../../lib/hook/swr/useLaunchedSequence";
import { ErrorBadge, LoadingCircle } from "ui";

export default function FrontOffice({
  params,
}: {
  params: { "front-office-id": string };
}) {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const { launchedSequence, isLoading, error } = useLaunchedSequence(
    params["front-office-id"],
    token
  );

  if (isLoading) {
    return <LoadingCircle />;
  } else if (error) {
    return <ErrorBadge />;
  }

  return (
    <SequenceLanding
      sequence={launchedSequence}
      frontOfficeId={params["front-office-id"]}
      token={token}
    />
  );
}
