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
          <Card className="mt-4 mb-4 bg-violet-50">
            <CardHeader className="text-sm font-medium">
              🔉 {contents?.description}
            </CardHeader>
          </Card>
        )}
      </div>
      {contents.url ? (
        <Link href={contents?.url} target="_blank">
          <Button
            variant="outline"
            className="w-full mt-4 flex justify-between items-center"
          >
            <div className="flex gap-2 items-center">
              {getModuleIcon(YOUTUBE_MODULE_VALUE)}
              <div>유튜브에서 보기</div>
            </div>
            <ArrowRightIcon className="w-4 h-4 text-stone-500" />
          </Button>
        </Link>
      ) : (
        <LoadingCircle />
      )}
    </div>
  );
}

export { YoutubeModuleContent };
