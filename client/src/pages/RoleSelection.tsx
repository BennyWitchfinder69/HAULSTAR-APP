import { useContext } from "react";
import { useLocation } from "wouter";
import { AppContext } from "../context/AppContext";
import { UserRole } from "../types";

export default function RoleSelection() {
  const { setRole } = useContext(AppContext);
  const [, setLocation] = useLocation();

  const handleRoleSelection = (role: UserRole) => {
    console.log("Selection handler for role:", role);
    
    // Clear any previous state
    if (typeof window !== 'undefined') {
      localStorage.removeItem('truckerFinanceUser');
    }
    
    // Set the role (which now also updates localStorage directly)
    setRole(role);
    
    // Add a longer delay to ensure state is updated before navigation
    setTimeout(() => {
      console.log("Navigating to dashboard with role:", role);
      setLocation("/dashboard");
    }, 500);
  };

  return (
    <section className="py-8">
      <h2 className="text-2xl font-bold mb-6 text-center">Select Your Role</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        <div 
          onClick={() => handleRoleSelection("company")} 
          className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition cursor-pointer border-2 border-transparent hover:border-primary"
        >
          <div className="flex items-center mb-4">
            <span className="material-icons text-4xl text-primary mr-4">person</span>
            <h3 className="text-xl font-semibold">Company Driver</h3>
          </div>
          <ul className="text-neutral-600 space-y-2 mb-4">
            <li className="flex items-start">
              <span className="material-icons text-success mr-2 text-sm">check_circle</span>
              <span>Simplified expense tracking</span>
            </li>
            <li className="flex items-start">
              <span className="material-icons text-success mr-2 text-sm">check_circle</span>
              <span>Income & savings goals</span>
            </li>
            <li className="flex items-start">
              <span className="material-icons text-success mr-2 text-sm">check_circle</span>
              <span>Time-off planning</span>
            </li>
          </ul>
          <p className="text-sm text-neutral-500 italic">Perfect for drivers working for a trucking company</p>
        </div>
        
        <div 
          onClick={() => handleRoleSelection("owner")} 
          className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition cursor-pointer border-2 border-transparent hover:border-primary"
        >
          <div className="flex items-center mb-4">
            <span className="material-icons text-4xl text-primary mr-4">business</span>
            <h3 className="text-xl font-semibold">Owner Operator</h3>
          </div>
          <ul className="text-neutral-600 space-y-2 mb-4">
            <li className="flex items-start">
              <span className="material-icons text-success mr-2 text-sm">check_circle</span>
              <span>Detailed business expenses</span>
            </li>
            <li className="flex items-start">
              <span className="material-icons text-success mr-2 text-sm">check_circle</span>
              <span>Fuel, tolls & maintenance tracking</span>
            </li>
            <li className="flex items-start">
              <span className="material-icons text-success mr-2 text-sm">check_circle</span>
              <span>Comprehensive financial planning</span>
            </li>
          </ul>
          <p className="text-sm text-neutral-500 italic">Ideal for independent owner-operators</p>
        </div>
      </div>
    </section>
  );
}
