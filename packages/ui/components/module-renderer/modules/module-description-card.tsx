import { Card, CardHeader } from "../../ui/card";

function ModuleDescriptionCard({ description }: { description: string }) {
  return (
    <Card className="mt-4 mb-4 bg-violet-50">
      <CardHeader className="text-sm font-medium">🔉 {description}</CardHeader>
    </Card>
  );
}

export { ModuleDescriptionCard };
