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
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t-2 border-turquoise bg-white md:hidden shadow-lg">
      <div className="grid grid-cols-5 h-18">
        <Link href="/dashboard">
          <a className={`flex flex-col items-center justify-center space-y-1 
            ${isActive("/dashboard") ? "text-turquoise" : "text-muted-foreground"}`}>
            <LayoutDashboard className="h-6 w-6" />
            <span className="text-xs font-bold">Home</span>
          </a>
        </Link>
        <Link href="/expenses">
          <a className={`flex flex-col items-center justify-center space-y-1 
            ${isActive("/expenses") ? "text-orange" : "text-muted-foreground"}`}>
            <TrendingUp className="h-6 w-6" />
            <span className="text-xs font-bold">Expenses</span>
          </a>
        </Link>
        
        {/* Central Add Button */}
        <div className="relative flex items-center justify-center">
          <div className="absolute -top-7 flex items-center justify-center">
            <Link href="/add">
              <a className="rounded-full bg-gradient-to-r from-turquoise to-orange text-white p-4 shadow-lg border-4 border-white">
                <Plus className="h-7 w-7" />
              </a>
            </Link>
          </div>
          <span className="text-xs font-bold text-muted-foreground mt-7">Add</span>
        </div>
        
        <Link href="/income">
          <a className={`flex flex-col items-center justify-center space-y-1 
            ${isActive("/income") ? "text-gold" : "text-muted-foreground"}`}>
            <DollarSign className="h-6 w-6" />
            <span className="text-xs font-bold">Income</span>
          </a>
        </Link>
        <Link href="/goals">
          <a className={`flex flex-col items-center justify-center space-y-1 
            ${isActive("/goals") ? "text-turquoise" : "text-muted-foreground"}`}>
            <PiggyBank className="h-6 w-6" />
            <span className="text-xs font-bold">Goals</span>
          </a>
        </Link>
      </div>
    </div>
  );
}