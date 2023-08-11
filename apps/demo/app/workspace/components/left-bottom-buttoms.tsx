import { DownloadIntroButton } from "./download-intro-button";
import { NewsLetterSubscribeButton } from "./news-letter-subscribe-button";

function LeftBottomButtons() {
  return (
    <div className="fixed bottom-2  left-2 sm:left-6 sm:bottom-6 flex flex-col gap-2">
      <NewsLetterSubscribeButton />
      <DownloadIntroButton />
    </div>
  );
}
export { LeftBottomButtons };
