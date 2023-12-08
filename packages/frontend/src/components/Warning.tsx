import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert.tsx";

export const Warning = (props: { title: string; message: string }) => {
  return (
    <Alert variant="destructive">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>{props.title}</AlertTitle>
      <AlertDescription>{props.message}</AlertDescription>
    </Alert>
  );
};
