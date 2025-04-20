import { useState } from "react";
import { WhatIfFormData, WhatIfPeriod, AppState } from "../types";
import { calculateWhatIf } from "../utils/calculations";

interface WhatIfModalProps {
  isOpen: boolean;
  onClose: () => void;
  appState: AppState;
}

export default function WhatIfModal({ isOpen, onClose, appState }: WhatIfModalProps) {
  const [formData, setFormData] = useState<WhatIfFormData>({
    amount: 1000,
    period: "week" as WhatIfPeriod
  });
  
  const result = calculateWhatIf(formData.amount, formData.period, appState.expenses);

  const handleCalculate = () => {
    // Recalculation happens automatically when form data changes
    alert("Calculation updated!");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-in fade-in">
      <div className="bg-white rounded-xl p-6 w-full max-w-md mx-4 animate-in slide-in-from-bottom">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold">What If Calculator</h3>
          <button onClick={onClose} className="text-neutral-500 hover:text-neutral-800">
            <span className="material-icons">close</span>
          </button>
        </div>
        
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">What if I earn...</label>
            <div className="flex items-center">
              <span className="text-lg font-bold mr-2">$</span>
              <input 
                type="number" 
                id="what-if-amount" 
                className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary" 
                placeholder="1000.00" 
                value={formData.amount}
                onChange={(e) => setFormData({...formData, amount: parseFloat(e.target.value) || 0})}
                step="1"
              />
              <select 
                id="what-if-period" 
                className="ml-2 px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                value={formData.period}
                onChange={(e) => setFormData({...formData, period: e.target.value as WhatIfPeriod})}
              >
                <option value="day">today</option>
                <option value="week">this week</option>
                <option value="month">this month</option>
              </select>
            </div>
          </div>
          
          <div className="bg-neutral-100 p-4 rounded-lg mt-4">
            <h4 className="font-medium mb-3">Where it will go:</h4>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-neutral-700">Expenses</span>
                <span className="font-medium">${result.expenses.toFixed(2)}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-neutral-700">Goals</span>
                <span className="font-medium text-primary">${result.goals.toFixed(2)}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-neutral-700">Remaining</span>
                <span className="font-medium text-success">${result.remaining.toFixed(2)}</span>
              </div>
              
              <div className="pt-2 mt-2 border-t border-neutral-300">
                <p className="text-sm text-neutral-600">
                  Your "Take a Week Off" goal would be <span className="font-medium text-primary">{result.weekOffProgress.toFixed(1)}% closer</span>
                </p>
              </div>
            </div>
          </div>
          
          <div className="pt-2">
            <button 
              type="button" 
              onClick={handleCalculate}
              className="w-full bg-primary text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-600 transition"
            >
              Recalculate
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
