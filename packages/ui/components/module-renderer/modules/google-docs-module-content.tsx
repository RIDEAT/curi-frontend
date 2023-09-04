"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  GOOGLE_DOCS_MODULE_VALUE,
  LoadingCircle,
  getModuleIcon,
} from "../../icons";
import { ExternalServiceLinkButton } from "./external-service-link-button";
import { ModuleDescriptionCard } from "./module-description-card";

function GoogleDocsModuleContent({ contents }: { contents: any }) {
  const childRef = useRef<HTMLDivElement | null>(null);
  const [currentParentWidth, setCurrentParentWidth] = useState(0);

  useLayoutEffect(() => {
    if (childRef.current && childRef.current.parentNode instanceof Element) {
      const parentWidth = window.getComputedStyle(
        childRef.current.parentNode
      ).width;
      setCurrentParentWidth(Number(parentWidth.replace("px", "")));
    }
  }, []);

  return (
    <div ref={childRef}>
      {contents.url && currentParentWidth > 700 && (
        <div className="hidden sm:block">
          <iframe src={contents.url} width="100%" height="600px" />
        </div>
      )}
      <ModuleDescriptionCard description={contents?.description} />
      {contents.url ? (
        <ExternalServiceLinkButton url={contents.url}>
          {getModuleIcon(GOOGLE_DOCS_MODULE_VALUE)}
          <div>구글 문서에서 보기</div>
        </ExternalServiceLinkButton>
      ) : (
        <LoadingCircle />
      )}
    </div>
  );
}

export { GoogleDocsModuleContent };
