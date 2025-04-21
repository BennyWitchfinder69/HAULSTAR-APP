import { Link } from "wouter";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { Button } from "@/components/ui/button";
import { Truck, User, LogOut } from "lucide-react";

export default function MainNav() {
  const { state, setSignedIn } = useContext(AppContext);
  
  const handleSignOut = () => {
    setSignedIn(false);
  };
  
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href={state.signedIn ? "/dashboard" : "/"}>
            <a className="flex items-center space-x-2">
              <div className="w-10 h-10 overflow-hidden">
                <img 
                  src="/assets/haulstar-logo.svg" 
                  alt="HaulStar" 
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="text-xl font-bold tracking-tight">HAULSTAR</span>
            </a>
          </Link>
        </div>
        
        <nav className="hidden md:flex items-center gap-6">
          {state.signedIn && (
            <>
              <Link href="/dashboard">
                <a className="text-sm font-medium hover:text-primary">Dashboard</a>
              </Link>
              <Link href="/expenses">
                <a className="text-sm font-medium hover:text-primary">Expenses</a>
              </Link>
              <Link href="/income">
                <a className="text-sm font-medium hover:text-primary">Income</a>
              </Link>
              <Link href="/goals">
                <a className="text-sm font-medium hover:text-primary">Goals</a>
              </Link>
              <Link href="/settings">
                <a className="text-sm font-medium hover:text-primary">Settings</a>
              </Link>
            </>
          )}
        </nav>
        
        <div className="flex items-center gap-2">
          {state.signedIn ? (
            <div className="flex items-center gap-4">
              <div className="hidden md:block">
                <div className="flex items-center gap-2">
                  <Truck className="h-4 w-4" />
                  <span className="text-sm font-medium">
                    {state.role === "company" ? "Company Driver" : "Owner Operator"}
                  </span>
                </div>
              </div>
              
              <Button 
                variant="ghost" 
                size="icon"
                onClick={handleSignOut}
                title="Sign Out"
              >
                <LogOut className="h-5 w-5" />
              </Button>
            </div>
          ) : (
            <Link href="/login">
              <Button variant="default" size="sm">
                <User className="mr-2 h-4 w-4" />
                Sign In
              </Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}