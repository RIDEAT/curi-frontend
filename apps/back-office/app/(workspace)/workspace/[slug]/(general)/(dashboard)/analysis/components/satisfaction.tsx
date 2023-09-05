import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
  Button,
  LoadingCircle,
  ErrorBadge,
} from "ui";
import { useLaunchedWorkflows } from "../../../../../../../../lib/hook/swr/useLaunchedWorkflows";
import { useRouter } from "next/navigation";
import { useCurrentWorkspace } from "../../../../../../../../lib/hook/useCurrentWorkspace";
import { DivideIcon } from "lucide-react";
import * as React from "react";
import { ChevronsUpDown, Plus, X } from "lucide-react";

export function Satisfactions() {
  const { launchedWorkflows, isLoading, error } = useLaunchedWorkflows();

  if (isLoading) {
    return <LoadingCircle />;
  } else if (error) {
    return <ErrorBadge />;
  }

  const calculateAverageScore = (sequences) => {
    let totalScore = 0;
    let sequenceCount = 0;

    for (const sequence of sequences) {
      if (sequence.sequenceSatisfactionResponse.isScored) {
        totalScore += sequence.sequenceSatisfactionResponse.score;
        sequenceCount += 1;
      }
    }

    return sequenceCount === 0 ? 0 : totalScore / sequenceCount;
  };

  return <div></div>;
}
