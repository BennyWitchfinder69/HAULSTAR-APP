import { Link, useLocation } from "wouter";
import { 
  LayoutDashboard, 
  DollarSign, 
  PiggyBank, 
  Settings,
  TrendingUp
} from "lucide-react";

export default function MobileNav() {
  const [location] = useLocation();

  const isActive = (path: string) => {
    return location === path;
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t bg-background md:hidden">
      <div className="grid grid-cols-5 h-16">
        <Link href="/dashboard">
          <a className={`flex flex-col items-center justify-center space-y-1 hover:text-primary 
            ${isActive("/dashboard") ? "text-primary" : "text-muted-foreground"}`}>
            <LayoutDashboard className="h-5 w-5" />
            <span className="text-xs">Dashboard</span>
          </a>
        </Link>
        <Link href="/expenses">
          <a className={`flex flex-col items-center justify-center space-y-1 hover:text-primary 
            ${isActive("/expenses") ? "text-primary" : "text-muted-foreground"}`}>
            <TrendingUp className="h-5 w-5" />
            <span className="text-xs">Expenses</span>
          </a>
        </Link>
        <Link href="/income">
          <a className={`flex flex-col items-center justify-center space-y-1 hover:text-primary 
            ${isActive("/income") ? "text-primary" : "text-muted-foreground"}`}>
            <DollarSign className="h-5 w-5" />
            <span className="text-xs">Income</span>
          </a>
        </Link>
        <Link href="/goals">
          <a className={`flex flex-col items-center justify-center space-y-1 hover:text-primary 
            ${isActive("/goals") ? "text-primary" : "text-muted-foreground"}`}>
            <PiggyBank className="h-5 w-5" />
            <span className="text-xs">Goals</span>
          </a>
        </Link>
        <Link href="/settings">
          <a className={`flex flex-col items-center justify-center space-y-1 hover:text-primary 
            ${isActive("/settings") ? "text-primary" : "text-muted-foreground"}`}>
            <Settings className="h-5 w-5" />
            <span className="text-xs">Settings</span>
          </a>
        </Link>
      </div>
    </div>
  );
}