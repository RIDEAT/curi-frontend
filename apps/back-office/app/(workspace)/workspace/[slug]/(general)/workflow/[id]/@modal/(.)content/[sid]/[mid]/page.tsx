import Modal from "../../components/Modal";

export default function ModuleContentEditor({
  params,
}: {
  params: { slug: string; id: string; sid: string; mid: string };
}) {
  return (
    <Modal>
      <div className="bg-white">
        <div>intercept</div>
        <div>slug: {params.slug}</div>
        <div>id: {params.id}</div>
        <div>sid: {params.sid}</div>
        <div>mid: {params.mid}</div>
      </div>
    </Modal>
  );
}
