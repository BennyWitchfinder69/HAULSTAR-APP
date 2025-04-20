import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import WelcomeScreen from "@/pages/WelcomeScreen";
import RoleSelection from "@/pages/RoleSelection";
import TaxOnboarding from "@/pages/TaxOnboarding";
import Dashboard from "@/pages/Dashboard";
import { useContext, useEffect } from "react";
import { AppContext } from "./context/AppContext";
import Header from "./components/Header";
import MobileNav from "./components/MobileNav";

function Router() {
  const [location] = useLocation();
  const { state, resetAppState } = useContext(AppContext);
  
  // Reset app state when visiting welcome screen to ensure clean state
  useEffect(() => {
    if (location === "/") {
      // Reset app state when visiting welcome screen
      localStorage.removeItem('truckerFinanceUser');
      console.log("Resetting app state for welcome screen");
    }
  }, [location]);
  
  // If user already has a role, redirect to dashboard
  useEffect(() => {
    if (state.role && location === "/") {
      window.location.href = "/dashboard";
    }
  }, [state.role, location]);

  return (
    <Switch>
      <Route path="/" component={WelcomeScreen} />
      <Route path="/role-selection" component={RoleSelection} />
      <Route path="/tax-onboarding" component={TaxOnboarding} />
      <Route path="/dashboard" component={Dashboard} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  const { state } = useContext(AppContext);
  const [location] = useLocation();
  
  // Show header only if user is authenticated or has selected a role
  const showHeader = state.role || location !== "/";
  
  // Show mobile nav only on dashboard
  const showMobileNav = location === "/dashboard";

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="flex flex-col min-h-screen bg-neutral-100">
          {showHeader && <Header />}
          <div className="flex-1">
            <Toaster />
            <Router />
          </div>
          {showMobileNav && <MobileNav />}
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
