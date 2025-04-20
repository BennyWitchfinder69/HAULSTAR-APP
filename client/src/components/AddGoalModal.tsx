import { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import { AddGoalFormData } from "../types";

interface AddGoalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AddGoalModal({ isOpen, onClose }: AddGoalModalProps) {
  const { addGoal } = useContext(AppContext);
  const [formData, setFormData] = useState<AddGoalFormData>({
    name: "",
    amount: 0,
    deadline: undefined
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || formData.amount <= 0) {
      alert("Please enter valid goal details");
      return;
    }
    
    addGoal(formData.name, formData.amount, formData.deadline);
    
    // Reset form
    setFormData({
      name: "",
      amount: 0,
      deadline: undefined
    });
    
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-in fade-in">
      <div className="bg-white rounded-xl p-6 w-full max-w-md mx-4 animate-in slide-in-from-bottom">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold">Add Goal</h3>
          <button onClick={onClose} className="text-neutral-500 hover:text-neutral-800">
            <span className="material-icons">close</span>
          </button>
        </div>
        
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="goal-name" className="block text-sm font-medium text-neutral-700 mb-1">Goal Name</label>
            <input 
              type="text" 
              id="goal-name" 
              className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary" 
              placeholder="e.g. New Truck, Vacation, Emergency Fund"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
          </div>
          
          <div>
            <label htmlFor="goal-amount" className="block text-sm font-medium text-neutral-700 mb-1">Target Amount ($)</label>
            <input 
              type="number" 
              id="goal-amount" 
              className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary" 
              placeholder="0.00" 
              step="0.01"
              value={formData.amount || ""}
              onChange={(e) => setFormData({...formData, amount: parseFloat(e.target.value) || 0})}
            />
          </div>
          
          <div>
            <label htmlFor="goal-deadline" className="block text-sm font-medium text-neutral-700 mb-1">Deadline (Optional)</label>
            <input 
              type="date" 
              id="goal-deadline" 
              className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
              value={formData.deadline || ""}
              onChange={(e) => setFormData({...formData, deadline: e.target.value})}
            />
          </div>
          
          <div className="pt-2">
            <button 
              type="submit" 
              className="w-full bg-primary text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-600 transition"
            >
              Add Goal
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
