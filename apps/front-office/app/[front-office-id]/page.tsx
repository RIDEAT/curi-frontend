"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FrontOfficeAPI } from "../../lib/api/frontOffice";
import { SequenceLanding } from "./components/sequence-landing";

export default function FrontOffice({
  params,
}: {
  params: { "front-office-id": string };
}) {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [sequence, setSequence] = useState(null);

  const getSequenceData = async () => {
    try {
      const sequence = await FrontOfficeAPI.getSequence(
        params["front-office-id"],
        token
      );
      console.log(sequence);
      console.log(sequence.launchedSequenceResponse);
      setSequence(sequence.launchedSequenceResponse);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (token) {
      getSequenceData();
    }
  }, [token]);

  return (
    <div className="w-screen h-screen flex justify-center p-2">
      <SequenceLanding sequence={sequence} />
    </div>
  );
}
