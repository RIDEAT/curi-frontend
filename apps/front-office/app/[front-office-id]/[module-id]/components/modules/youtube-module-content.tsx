import { useEffect, useState } from "react";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import YouTube, { YouTubeProps } from "react-youtube";
import Link from "next/link";
import {
  Button,
  Card,
  CardHeader,
  LoadingCircle,
  YOUTUBE_MODULE_VALUE,
  getModuleIcon,
} from "ui";
import { ModuleDescriptionCard } from "./module-description-card";
import { ExternalServiceLinkButton } from "./external-service-link-button";

function YoutubeModuleContent({ contents }) {
  const [youtubeKey, setYoutubeKey] = useState("");

  const opts: YouTubeProps["opts"] = {
    width: "100%",
    height: "315",
    playerVars: {
      autoplay: 1,
    },
  };

  useEffect(() => {
    if (contents?.url) {
      const url = new URL(contents?.url);
      setYoutubeKey(url.searchParams.get("v"));
    }
  }, [contents]);

  return (
    <div className="w-full">
      <div className="w-full">
        <YouTube key={youtubeKey} videoId={youtubeKey} opts={opts} />
      </div>
      <div>
        {contents?.description && (
          <ModuleDescriptionCard description={contents?.description} />
        )}
      </div>
      {contents.url ? (
        <ExternalServiceLinkButton url={contents.url}>
          {getModuleIcon(YOUTUBE_MODULE_VALUE)}
          <div>유튜브에서 보기</div>
        </ExternalServiceLinkButton>
      ) : (
        <LoadingCircle />
      )}
    </div>
  );
}

export { YoutubeModuleContent };
