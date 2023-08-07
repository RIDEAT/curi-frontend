function FormModule({
  togglePreview,
}: {
  content: any;
  setContent: any;
  togglePreview: boolean;
}) {
  return <>{togglePreview ? <div>form preview</div> : <div>form edit</div>}</>;
}

export { FormModule };
