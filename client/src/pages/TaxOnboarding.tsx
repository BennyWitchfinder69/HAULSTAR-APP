import { useContext, useEffect } from "react";
import { useLocation } from "wouter";
import { AppContext } from "../context/AppContext";
import TaxSettingsForm from "../components/TaxSettingsForm";
import { TaxSettings } from "../types";

export default function TaxOnboarding() {
  const { state, setTaxSettings } = useContext(AppContext);
  const [, setLocation] = useLocation();

  useEffect(() => {
    // If no role is selected, go back to role selection
    if (!state.role) {
      setLocation("/role-selection");
    }
  }, [state.role, setLocation]);

  const handleTaxSettingsSubmit = (settings: TaxSettings) => {
    setTaxSettings(settings);
    setLocation("/dashboard");
  };

  return (
    <section className="py-12 flex flex-col items-center justify-center min-h-screen">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-3">Almost there!</h1>
        <p className="text-lg text-neutral-600 mb-6">
          Let's set up your tax information to ensure accurate financial calculations.
          {state.role === 'owner' && 
            " As an owner-operator, your tax situation is unique and important to track."}
        </p>
      </div>
      
      <div className="w-full max-w-lg mx-auto">
        <TaxSettingsForm 
          currentSettings={state.taxSettings}
          onSubmit={handleTaxSettingsSubmit}
          userRole={state.role}
          isOnboarding={true}
        />
      </div>
      
      <div className="text-center mt-8 text-sm text-neutral-500">
        <p>You can always update these settings later.</p>
      </div>
    </section>
  );
}