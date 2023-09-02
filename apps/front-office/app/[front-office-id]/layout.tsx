export default function DisplayLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="w-screen h-screen flex justify-center items-start sm:items-center p-2">
        {children}
      </div>
    </>
  );
}
