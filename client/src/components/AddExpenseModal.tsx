import { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import { AddExpenseFormData, ExpenseFrequency, ExpenseCategory } from "../types";

interface AddExpenseModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AddExpenseModal({ isOpen, onClose }: AddExpenseModalProps) {
  const { addExpense, state } = useContext(AppContext);
  const [formData, setFormData] = useState<AddExpenseFormData>({
    name: "",
    amount: 0,
    frequency: "monthly" as ExpenseFrequency,
    category: "personal" as ExpenseCategory
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || formData.amount <= 0) {
      alert("Please enter valid expense details");
      return;
    }
    
    addExpense(formData.name, formData.amount, formData.frequency, formData.category);
    
    // Reset form
    setFormData({
      name: "",
      amount: 0,
      frequency: "monthly",
      category: "personal"
    });
    
    onClose();
  };

  if (!isOpen) return null;

  // Determine if owner operator fields should be shown
  const isOwnerOperator = state.role === "owner";

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-in fade-in">
      <div className="bg-white rounded-xl p-6 w-full max-w-md mx-4 animate-in slide-in-from-bottom">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold">Add Expense</h3>
          <button onClick={onClose} className="text-neutral-500 hover:text-neutral-800">
            <span className="material-icons">close</span>
          </button>
        </div>
        
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="expense-name" className="block text-sm font-medium text-neutral-700 mb-1">Expense Name</label>
            <input 
              type="text" 
              id="expense-name" 
              className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary" 
              placeholder="e.g. Fuel, Food, Phone bill"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
          </div>
          
          <div>
            <label htmlFor="expense-amount" className="block text-sm font-medium text-neutral-700 mb-1">Amount ($)</label>
            <input 
              type="number" 
              id="expense-amount" 
              className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary" 
              placeholder="0.00" 
              step="0.01"
              value={formData.amount || ""}
              onChange={(e) => setFormData({...formData, amount: parseFloat(e.target.value) || 0})}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">Frequency</label>
            <div className="grid grid-cols-2 gap-3">
              <label className="flex items-center space-x-2 bg-white border border-neutral-300 rounded-lg p-3 cursor-pointer hover:bg-neutral-50">
                <input 
                  type="radio" 
                  name="frequency" 
                  value="daily" 
                  className="text-primary"
                  checked={formData.frequency === "daily"}
                  onChange={() => setFormData({...formData, frequency: "daily"})}
                />
                <span>Daily</span>
              </label>
              <label className="flex items-center space-x-2 bg-white border border-neutral-300 rounded-lg p-3 cursor-pointer hover:bg-neutral-50">
                <input 
                  type="radio" 
                  name="frequency" 
                  value="weekly" 
                  className="text-primary"
                  checked={formData.frequency === "weekly"}
                  onChange={() => setFormData({...formData, frequency: "weekly"})}
                />
                <span>Weekly</span>
              </label>
              <label className="flex items-center space-x-2 bg-white border border-neutral-300 rounded-lg p-3 cursor-pointer hover:bg-neutral-50">
                <input 
                  type="radio" 
                  name="frequency" 
                  value="monthly" 
                  className="text-primary"
                  checked={formData.frequency === "monthly"}
                  onChange={() => setFormData({...formData, frequency: "monthly"})}
                />
                <span>Monthly</span>
              </label>
              <label className="flex items-center space-x-2 bg-white border border-neutral-300 rounded-lg p-3 cursor-pointer hover:bg-neutral-50">
                <input 
                  type="radio" 
                  name="frequency" 
                  value="yearly" 
                  className="text-primary"
                  checked={formData.frequency === "yearly"}
                  onChange={() => setFormData({...formData, frequency: "yearly"})}
                />
                <span>Yearly</span>
              </label>
            </div>
          </div>
          
          {isOwnerOperator && (
            <div className="pt-2">
              <label className="block text-sm font-medium text-neutral-700 mb-2">Category</label>
              <select 
                className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                value={formData.category}
                onChange={(e) => setFormData({...formData, category: e.target.value as ExpenseCategory})}
              >
                <option value="">Select a category</option>
                <option value="fuel">Fuel</option>
                <option value="maintenance">Maintenance</option>
                <option value="insurance">Insurance</option>
                <option value="tolls">Tolls</option>
                <option value="permits">Permits & Licenses</option>
                <option value="personal">Personal</option>
                <option value="housing">Housing</option>
                <option value="food">Food</option>
                <option value="utilities">Utilities</option>
                <option value="healthcare">Healthcare</option>
                <option value="other">Other</option>
              </select>
            </div>
          )}
          
          <div className="pt-2">
            <button 
              type="submit" 
              className="w-full bg-primary text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-600 transition"
            >
              Add Expense
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
