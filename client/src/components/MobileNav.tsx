import { useLocation } from "wouter";

export default function MobileNav() {
  const [, setLocation] = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-neutral-200 pb-safe z-20">
      <div className="flex justify-around">
        <button 
          onClick={() => setLocation("/dashboard")} 
          className="flex flex-col items-center py-2 px-4 text-primary"
        >
          <span className="material-icons">dashboard</span>
          <span className="text-xs mt-1">Dashboard</span>
        </button>
        <button 
          onClick={() => alert("Goals page would be shown here")} 
          className="flex flex-col items-center py-2 px-4 text-neutral-500"
        >
          <span className="material-icons">flag</span>
          <span className="text-xs mt-1">Goals</span>
        </button>
        <button 
          onClick={() => document.getElementById("day-logger-modal")?.classList.remove("hidden")} 
          className="flex flex-col items-center py-2 px-4 text-neutral-500"
        >
          <span className="material-icons">add_circle</span>
          <span className="text-xs mt-1">Log Day</span>
        </button>
        <button 
          onClick={() => alert("Insights page would be shown here")} 
          className="flex flex-col items-center py-2 px-4 text-neutral-500"
        >
          <span className="material-icons">insights</span>
          <span className="text-xs mt-1">Insights</span>
        </button>
        <button 
          onClick={() => alert("Settings page would be shown here")} 
          className="flex flex-col items-center py-2 px-4 text-neutral-500"
        >
          <span className="material-icons">settings</span>
          <span className="text-xs mt-1">Settings</span>
        </button>
      </div>
    </nav>
  );
}
