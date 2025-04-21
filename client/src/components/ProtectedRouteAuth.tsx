import { useContext } from "react";
import { useLocation } from "wouter";
import { AppContext } from "../context/AppContext";
import { Loader2 } from "lucide-react";

interface ProtectedRouteAuthProps {
  component: React.ComponentType;
}

export function ProtectedRouteAuth({ component: Component }: ProtectedRouteAuthProps) {
  const { state } = useContext(AppContext);
  const [, setLocation] = useLocation();
  
  // If not signed in, redirect to login page
  if (!state.signedIn) {
    // Redirect to login page
    setLocation("/login");
    return null;
  }
  
  // If signed in but no role selected, redirect to onboarding
  if (state.signedIn && !state.role) {
    setLocation("/login?step=role");
    return null;
  }
  
  return <Component />;
}