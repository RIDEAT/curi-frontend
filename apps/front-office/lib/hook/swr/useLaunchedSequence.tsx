import useSWR from "swr";
import { FrontOfficeAPI } from "../../api/frontOffice";
import { useEffect, useState } from "react";

const useLaunchedSequence = (frontOfficeId: string, token: string) => {
  const [sequenceData, setSequenceData] = useState(null);
  const [isActiveSatisfaction, setIsActiveSatisfaction] = useState(true);
  const { data, isLoading, error, mutate } = useSWR(
    frontOfficeId && token
      ? [FrontOfficeAPI.frontOfficeEndPoint + `/${frontOfficeId}`]
      : null,
    ([_]) => FrontOfficeAPI.getSequence(frontOfficeId, token)
  );

  useEffect(() => {
    if (data) {
      setSequenceData(data.launchedSequenceResponse);
      setIsActiveSatisfaction(data.launchedSequenceResponse?.checkSatisfaction);
    }
  }, [data]);

  return {
    launchedSequence: sequenceData,
    isLoading,
    error,
    launchedSequenceMutate: mutate,
    isActiveSatisfaction,
  };
};

export { useLaunchedSequence };
