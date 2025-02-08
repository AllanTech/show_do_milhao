import React from "react";
import { Card } from "@/components/ui/card";
import OAuthProviders from "./OAuthProviders";
import AuthStatus from "./AuthStatus";

interface LoginContainerProps {
  onProviderSelect?: (providerId: string) => void;
  authStatus?: "idle" | "loading" | "success" | "error";
  statusMessage?: string;
}

const LoginContainer = ({
  onProviderSelect = () => {},
  authStatus = "idle",
  statusMessage = "Welcome! Please sign in to continue.",
}: LoginContainerProps) => {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-md p-8 space-y-6 bg-white">
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold tracking-tight">Welcome back</h1>
          <p className="text-muted-foreground">Choose a provider to sign in</p>
        </div>

        <AuthStatus status={authStatus} message={statusMessage} />

        <OAuthProviders
          onProviderClick={onProviderSelect}
          isLoading={authStatus === "loading"}
        />

        <p className="text-center text-sm text-muted-foreground">
          By continuing, you agree to our{" "}
          <a href="#" className="underline hover:text-primary">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="#" className="underline hover:text-primary">
            Privacy Policy
          </a>
        </p>
      </Card>
    </div>
  );
};

export default LoginContainer;
