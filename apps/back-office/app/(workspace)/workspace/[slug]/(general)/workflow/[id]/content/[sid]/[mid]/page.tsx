export default function ModuleContentEditor({
  params,
}: {
  params: { slug: string; id: string; sid: string; mid: string };
}) {
  return (
    <div>
      <div>slug: {params.slug}</div>
      <div>id: {params.id}</div>
      <div>sid: {params.sid}</div>
      <div>mid: {params.mid}</div>
    </div>
  );
}
