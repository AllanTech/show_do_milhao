import React from "react";
import { AlertCircle, CheckCircle2, Loader2 } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface AuthStatusProps {
  status: "idle" | "loading" | "success" | "error";
  message?: string;
}

const AuthStatus = ({
  status = "idle",
  message = "Welcome! Please sign in to continue.",
}: AuthStatusProps) => {
  const getStatusColor = () => {
    switch (status) {
      case "error":
        return "destructive";
      case "success":
        return "default";
      default:
        return "default";
    }
  };

  const getStatusIcon = () => {
    switch (status) {
      case "loading":
        return <Loader2 className="h-4 w-4 animate-spin" />;
      case "success":
        return <CheckCircle2 className="h-4 w-4" />;
      case "error":
        return <AlertCircle className="h-4 w-4" />;
      default:
        return null;
    }
  };

  return (
    <div className="w-full max-w-sm mx-auto bg-background p-4">
      <Alert variant={getStatusColor()}>
        <div className="flex items-center gap-2">
          {getStatusIcon()}
          <AlertDescription>{message}</AlertDescription>
        </div>
      </Alert>
    </div>
  );
};

export default AuthStatus;
