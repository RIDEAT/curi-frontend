export default function UnreadCountBadge({ count }) {
  return (
    <div className="w-6 h-6 rounded-full bg-red-500 text-white text-sm">
      {count}
    </div>
  );
}
