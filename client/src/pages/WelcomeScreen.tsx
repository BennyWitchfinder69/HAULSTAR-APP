import { useContext, useEffect } from "react";
import { useLocation } from "wouter";
import { AppContext } from "../context/AppContext";
import { SignInMethod } from "../types";
import haulstarLogo from "../assets/haulstar-logo.svg";

export default function WelcomeScreen() {
  const { setSignedIn } = useContext(AppContext);
  const [, setLocation] = useLocation();

  // Update page title
  useEffect(() => {
    document.title = "HaulStar - Navigate Your Journey to Success";
  }, []);

  const handleContinueAnonymously = () => {
    setLocation("/role-selection");
  };

  const handleSignIn = (method: SignInMethod) => {
    // In a production app, we would use Firebase authentication here
    // For now, we'll just simulate a successful login
    setSignedIn(true);
    console.log(`Signed in with ${method}`);
    
    // Show success message
    const methodNames = {
      google: "Google",
      apple: "Apple",
      phone: "Phone",
      reddit: "Reddit"
    };
    
    // Set a small timeout to make it feel like authentication is happening
    setTimeout(() => {
      alert(`Successfully signed in with ${methodNames[method]}!`);
      setLocation("/role-selection");
    }, 300);
  };

  return (
    <section className="py-8 flex flex-col items-center justify-center min-h-[90vh]" 
      style={{ 
        background: 'linear-gradient(to bottom, #87CEEB, #C1E3F7)'
      }}
    >
      <div className="text-center mb-8 max-w-md bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl">
        <img 
          src={haulstarLogo} 
          alt="HaulStar Logo" 
          className="w-48 h-48 mx-auto mb-6"
        />
        <h2 className="text-3xl font-bold mb-2 text-[#333]" style={{ fontFamily: 'Montserrat, sans-serif' }}>Welcome to HaulStar</h2>
        <p className="text-[#555] mb-6 text-lg">Navigate Your Journey to Success</p>
        <p className="text-[#666] mb-6">Track your income, manage expenses, and plan for time off with the smart finance tool designed for truckers.</p>
      </div>
      
      <div className="w-full max-w-md space-y-4 px-4">
        <button 
          onClick={handleContinueAnonymously} 
          className="w-full bg-[#FFD700] text-[#333] font-semibold py-4 px-6 rounded-xl shadow-lg hover:bg-[#F5CB00] hover:shadow-xl transition flex items-center justify-center"
          style={{ fontFamily: 'Montserrat, sans-serif' }}
        >
          <span className="material-icons mr-2">logout</span>
          Continue Anonymously
        </button>
        
        <div className="relative flex items-center py-3">
          <div className="flex-grow border-t border-[#87CEEB]"></div>
          <span className="flex-shrink mx-4 text-[#555] bg-white/80 px-4 py-1 rounded-full">or sign in with</span>
          <div className="flex-grow border-t border-[#87CEEB]"></div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <button 
            onClick={() => handleSignIn("google")} 
            className="bg-white border border-[#87CEEB] text-[#555] font-medium py-3 px-4 rounded-xl shadow-md hover:bg-[#F5F5F5] hover:shadow-lg transition flex items-center justify-center"
          >
            <span className="material-icons mr-2 text-red-500">public</span>
            Google
          </button>
          <button 
            onClick={() => handleSignIn("apple")} 
            className="bg-white border border-[#87CEEB] text-[#555] font-medium py-3 px-4 rounded-xl shadow-md hover:bg-[#F5F5F5] hover:shadow-lg transition flex items-center justify-center"
          >
            <span className="material-icons mr-2">phone_iphone</span>
            Apple
          </button>
          <button 
            onClick={() => handleSignIn("phone")} 
            className="bg-white border border-[#87CEEB] text-[#555] font-medium py-3 px-4 rounded-xl shadow-md hover:bg-[#F5F5F5] hover:shadow-lg transition flex items-center justify-center"
          >
            <span className="material-icons mr-2 text-green-500">phone_android</span>
            Phone
          </button>
          <button 
            onClick={() => handleSignIn("reddit")} 
            className="bg-white border border-[#87CEEB] text-[#555] font-medium py-3 px-4 rounded-xl shadow-md hover:bg-[#F5F5F5] hover:shadow-lg transition flex items-center justify-center"
          >
            <span className="material-icons mr-2 text-orange-500">forum</span>
            Reddit
          </button>
        </div>
      </div>
      
      <footer className="mt-12 text-center text-[#555] text-sm">
        <p>© 2025 HaulStar. All rights reserved.</p>
        <p className="mt-1">The financial companion for professional drivers.</p>
      </footer>
    </section>
  );
}
