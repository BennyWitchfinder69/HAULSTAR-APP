import { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import { DayLogFormData } from "../types";

interface DayLoggerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function DayLoggerModal({ isOpen, onClose }: DayLoggerModalProps) {
  const { logDailyActivity } = useContext(AppContext);
  const [formData, setFormData] = useState<DayLogFormData>({
    miles: undefined,
    loads: undefined,
    hours: undefined,
    income: 0,
    notes: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    logDailyActivity(
      formData.miles, 
      formData.loads, 
      formData.hours, 
      formData.income, 
      formData.notes
    );
    
    // Reset form
    setFormData({
      miles: undefined,
      loads: undefined,
      hours: undefined,
      income: 0,
      notes: ""
    });
    
    // Show confirmation and close
    alert("Activity logged successfully!");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-in fade-in">
      <div className="bg-white rounded-xl p-6 w-full max-w-md mx-4 animate-in slide-in-from-bottom">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold">Log Today's Activity</h3>
          <button onClick={onClose} className="text-neutral-500 hover:text-neutral-800">
            <span className="material-icons">close</span>
          </button>
        </div>
        
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="log-miles" className="block text-sm font-medium text-neutral-700 mb-1">Miles Driven</label>
              <input 
                type="number" 
                id="log-miles" 
                className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary" 
                placeholder="0"
                value={formData.miles || ""}
                onChange={(e) => setFormData({...formData, miles: e.target.value ? parseInt(e.target.value) : undefined})}
              />
            </div>
            
            <div>
              <label htmlFor="log-loads" className="block text-sm font-medium text-neutral-700 mb-1">Loads</label>
              <input 
                type="number" 
                id="log-loads" 
                className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary" 
                placeholder="0"
                value={formData.loads || ""}
                onChange={(e) => setFormData({...formData, loads: e.target.value ? parseInt(e.target.value) : undefined})}
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="log-hours" className="block text-sm font-medium text-neutral-700 mb-1">Hours</label>
              <input 
                type="number" 
                id="log-hours" 
                className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary" 
                placeholder="0" 
                step="0.5"
                value={formData.hours || ""}
                onChange={(e) => setFormData({...formData, hours: e.target.value ? parseFloat(e.target.value) : undefined})}
              />
            </div>
            
            <div>
              <label htmlFor="log-income" className="block text-sm font-medium text-neutral-700 mb-1">Income ($)</label>
              <input 
                type="number" 
                id="log-income" 
                className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary" 
                placeholder="0.00" 
                step="0.01"
                value={formData.income || ""}
                onChange={(e) => setFormData({...formData, income: parseFloat(e.target.value) || 0})}
              />
            </div>
          </div>
          
          <div>
            <label htmlFor="log-notes" className="block text-sm font-medium text-neutral-700 mb-1">Notes</label>
            <textarea 
              id="log-notes" 
              rows={2} 
              className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary" 
              placeholder="Optional notes about your day"
              value={formData.notes || ""}
              onChange={(e) => setFormData({...formData, notes: e.target.value})}
            ></textarea>
          </div>
          
          <div className="pt-2">
            <button 
              type="submit" 
              className="w-full bg-primary text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-600 transition"
            >
              Save Activity
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
