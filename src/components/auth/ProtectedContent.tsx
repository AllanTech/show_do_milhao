import React from "react";
import { Shield, ShieldAlert } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface ProtectedContentProps {
  isAuthenticated?: boolean;
  userName?: string;
  onLogout?: () => void;
  children?: React.ReactNode;
}

const ProtectedContent = ({
  isAuthenticated = false,
  userName = "Guest User",
  onLogout = () => {},
  children = (
    <div className="text-center p-4">
      <p>
        This is protected content that will be displayed when authenticated.
      </p>
    </div>
  ),
}: ProtectedContentProps) => {
  if (!isAuthenticated) {
    return (
      <Card className="w-full max-w-md mx-auto p-6 bg-background">
        <div className="flex flex-col items-center space-y-4">
          <ShieldAlert className="w-12 h-12 text-destructive" />
          <h2 className="text-xl font-semibold">Access Denied</h2>
          <p className="text-center text-muted-foreground">
            Please log in to view this protected content
          </p>
        </div>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-4xl mx-auto p-6 bg-background">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-2">
          <Shield className="w-6 h-6 text-primary" />
          <h2 className="text-xl font-semibold">Protected Content</h2>
        </div>
        <div className="flex items-center space-x-4">
          <span className="text-sm text-muted-foreground">
            Welcome, {userName}
          </span>
          <Button variant="outline" onClick={onLogout}>
            Logout
          </Button>
        </div>
      </div>
      <div className="border rounded-lg p-4">{children}</div>
    </Card>
  );
};

export default ProtectedContent;
