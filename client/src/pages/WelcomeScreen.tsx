import { useContext } from "react";
import { useLocation } from "wouter";
import { AppContext } from "../context/AppContext";
import { SignInMethod } from "../types";

export default function WelcomeScreen() {
  const { setSignedIn } = useContext(AppContext);
  const [, setLocation] = useLocation();

  const handleContinueAnonymously = () => {
    setLocation("/role-selection");
  };

  const handleSignIn = (method: SignInMethod) => {
    setSignedIn(true);
    alert(`Signed in with ${method}`);
    setLocation("/role-selection");
  };

  return (
    <section className="py-8 flex flex-col items-center justify-center min-h-[80vh]">
      <div className="text-center mb-8">
        <img 
          src="https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=500&h=300" 
          alt="Truck on highway" 
          className="w-full max-w-md rounded-lg shadow-lg mb-6"
        />
        <h2 className="text-2xl font-bold mb-2">Welcome to Trucker Finance</h2>
        <p className="text-neutral-600 mb-6">Track your income, manage expenses, and plan for time off</p>
      </div>
      
      <div className="w-full max-w-md space-y-3">
        <button 
          onClick={handleContinueAnonymously} 
          className="w-full bg-primary text-white font-semibold py-4 px-6 rounded-lg shadow hover:bg-blue-600 transition flex items-center justify-center"
        >
          <span className="material-icons mr-2">logout</span>
          Continue Anonymously
        </button>
        
        <div className="relative flex items-center py-3">
          <div className="flex-grow border-t border-neutral-300"></div>
          <span className="flex-shrink mx-4 text-neutral-500">or sign in with</span>
          <div className="flex-grow border-t border-neutral-300"></div>
        </div>
        
        <div className="grid grid-cols-2 gap-3">
          <button 
            onClick={() => handleSignIn("google")} 
            className="bg-white border border-neutral-300 text-neutral-700 font-medium py-3 px-4 rounded-lg shadow-sm hover:bg-neutral-50 transition flex items-center justify-center"
          >
            <span className="material-icons mr-2 text-red-500">privacy_tip</span>
            Google
          </button>
          <button 
            onClick={() => handleSignIn("apple")} 
            className="bg-white border border-neutral-300 text-neutral-700 font-medium py-3 px-4 rounded-lg shadow-sm hover:bg-neutral-50 transition flex items-center justify-center"
          >
            <span className="material-icons mr-2">phone_iphone</span>
            Apple
          </button>
          <button 
            onClick={() => handleSignIn("phone")} 
            className="bg-white border border-neutral-300 text-neutral-700 font-medium py-3 px-4 rounded-lg shadow-sm hover:bg-neutral-50 transition flex items-center justify-center"
          >
            <span className="material-icons mr-2 text-green-500">phone_android</span>
            Phone
          </button>
          <button 
            onClick={() => handleSignIn("reddit")} 
            className="bg-white border border-neutral-300 text-neutral-700 font-medium py-3 px-4 rounded-lg shadow-sm hover:bg-neutral-50 transition flex items-center justify-center"
          >
            <span className="material-icons mr-2 text-orange-500">forum</span>
            Reddit
          </button>
        </div>
      </div>
    </section>
  );
}
