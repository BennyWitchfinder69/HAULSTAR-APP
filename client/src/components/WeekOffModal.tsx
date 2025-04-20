import { AppState } from "../types";
import { calculateWeekOff } from "../utils/calculations";

interface WeekOffModalProps {
  isOpen: boolean;
  onClose: () => void;
  appState: AppState;
}

export default function WeekOffModal({ isOpen, onClose, appState }: WeekOffModalProps) {
  const result = calculateWeekOff(appState.expenses, appState.availableCash);
  
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-in fade-in">
      <div className="bg-white rounded-xl p-6 w-full max-w-md mx-4 animate-in slide-in-from-bottom">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold">Can I Take a Week Off?</h3>
          <button onClick={onClose} className="text-neutral-500 hover:text-neutral-800">
            <span className="material-icons">close</span>
          </button>
        </div>
        
        {result.canTakeOff ? (
          <div className="py-4 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-success bg-opacity-10 mb-4">
              <span className="material-icons text-3xl text-success">check_circle</span>
            </div>
            <h4 className="text-xl font-bold text-success mb-2">Yes, you can!</h4>
            <p className="text-neutral-600 mb-4">You have enough savings to take a week off.</p>
            
            <div className="bg-neutral-100 p-4 rounded-lg text-left">
              <div className="flex justify-between mb-2">
                <span className="text-neutral-700">Weekly expenses:</span>
                <span className="font-medium">${result.weeklyExpenses.toFixed(2)}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-neutral-700">Daily spending:</span>
                <span className="font-medium">${result.dailySpending.toFixed(2)}</span>
              </div>
              <div className="flex justify-between pt-2 mt-2 border-t border-neutral-300">
                <span className="text-neutral-700">Total needed:</span>
                <span className="font-bold">${result.totalNeeded.toFixed(2)}</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="py-4 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-danger bg-opacity-10 mb-4">
              <span className="material-icons text-3xl text-danger">error_outline</span>
            </div>
            <h4 className="text-xl font-bold text-danger mb-2">Not yet</h4>
            <p className="text-neutral-600 mb-4">You need more savings to take a week off safely.</p>
            
            <div className="bg-neutral-100 p-4 rounded-lg text-left">
              <div className="flex justify-between mb-2">
                <span className="text-neutral-700">Weekly expenses:</span>
                <span className="font-medium">${result.weeklyExpenses.toFixed(2)}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-neutral-700">Daily spending:</span>
                <span className="font-medium">${result.dailySpending.toFixed(2)}</span>
              </div>
              <div className="flex justify-between pt-2 mt-2 border-t border-neutral-300">
                <span className="text-neutral-700">Total needed:</span>
                <span className="font-bold">${result.totalNeeded.toFixed(2)}</span>
              </div>
              <div className="flex justify-between pt-2 mt-2 border-t border-neutral-300">
                <span className="text-neutral-700">Current savings:</span>
                <span className="font-bold text-danger">${appState.availableCash.toFixed(2)}</span>
              </div>
              <div className="flex justify-between pt-2 mt-2 border-t border-neutral-300">
                <span className="text-neutral-700">Shortfall:</span>
                <span className="font-bold text-danger">${result.shortfall?.toFixed(2)}</span>
              </div>
            </div>
          </div>
        )}
        
        <div className="pt-4">
          <button 
            type="button" 
            onClick={onClose} 
            className="w-full bg-neutral-200 text-neutral-800 py-3 px-4 rounded-lg font-medium hover:bg-neutral-300 transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
