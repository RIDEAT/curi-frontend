import { Button, LoadingButton } from "ui";

export function SubmitButton({
  isLoading,
  text,
}: {
  isLoading: boolean;
  text: string;
}) {
  return (
    <div className="flex justify-center">
      {isLoading ? (
        <LoadingButton />
      ) : (
        <Button type="submit" className="w-full">
          {text}
        </Button>
      )}
    </div>
  );
}
