import { useNotification } from "../../../../../lib/hook/swr/useNotifications";

export default function UnreadCountBadge() {
  const { unReadCnt, isLoading, error } = useNotification();

  if (isLoading) {
    return null;
  } else if (error) {
    return null;
  }

  return (
    <>
      {unReadCnt ? (
        <div className="w-4 h-4 rounded-full bg-red-500 text-white text-[0.4rem] flex justify-center items-center">
          <div>{unReadCnt}</div>
        </div>
      ) : null}
    </>
  );
}
