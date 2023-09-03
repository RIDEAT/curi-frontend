import { Card, CardHeader } from "ui";

function ModuleDescriptionCard({ description }) {
  return (
    <Card className="mt-4 mb-4 bg-violet-50">
      <CardHeader className="text-sm font-medium">🔉 {description}</CardHeader>
    </Card>
  );
}

export { ModuleDescriptionCard };
