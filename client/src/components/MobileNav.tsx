import { Link, useLocation } from "wouter";
import { 
  LayoutDashboard, 
  DollarSign, 
  PiggyBank, 
  Settings,
  TrendingUp,
  Plus
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
            <span className="text-xs">Home</span>
          </a>
        </Link>
        <Link href="/expenses">
          <a className={`flex flex-col items-center justify-center space-y-1 hover:text-primary 
            ${isActive("/expenses") ? "text-primary" : "text-muted-foreground"}`}>
            <TrendingUp className="h-5 w-5" />
            <span className="text-xs">Expenses</span>
          </a>
        </Link>
        
        {/* Central Add Button */}
        <div className="relative flex items-center justify-center">
          <div className="absolute -top-6 flex items-center justify-center">
            <Link href="/add">
              <a className="rounded-full bg-primary text-primary-foreground p-3 shadow-lg border-4 border-background">
                <Plus className="h-6 w-6" />
              </a>
            </Link>
          </div>
          <span className="text-xs text-muted-foreground mt-6">Add</span>
        </div>
        
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
      </div>
    </div>
  );
}