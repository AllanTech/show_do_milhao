import React from "react";
import { Button } from "@/components/ui/button";
import { Github, Mail } from "lucide-react";

interface OAuthProvider {
  id: string;
  name: string;
  icon: React.ReactNode;
  color: string;
}

interface OAuthProvidersProps {
  providers?: OAuthProvider[];
  onProviderClick?: (providerId: string) => void;
  isLoading?: boolean;
}

const defaultProviders: OAuthProvider[] = [
  {
    id: "github",
    name: "GitHub",
    icon: <Github className="mr-2 h-4 w-4" />,
    color: "bg-[#24292F] hover:bg-[#24292F]/90",
  },
];

const OAuthProviders = ({
  providers = defaultProviders,
  onProviderClick = () => {},
  isLoading = false,
}: OAuthProvidersProps) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm space-y-4">
      {providers.map((provider) => (
        <Button
          key={provider.id}
          variant="outline"
          className={`w-full ${provider.color}`}
          onClick={() => onProviderClick(provider.id)}
          disabled={isLoading}
        >
          {provider.icon}
          Continue with {provider.name}
        </Button>
      ))}
    </div>
  );
};

export default OAuthProviders;
