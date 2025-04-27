import { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import GoalItem from "../components/GoalItem";
import AddGoalModal from "../components/AddGoalModal";
import AddExpenseModal from "../components/AddExpenseModal";
import WhatIfModal from "../components/WhatIfModal";
import WeekOffModal from "../components/WeekOffModal";
import DayLoggerModal from "../components/DayLoggerModal";
import PayStructureModal from "../components/PayStructureModal";

export default function Dashboard() {
  const { state, toggleHideIncome } = useContext(AppContext);
  
  // Get the current URL and location
  const currentUrl = window.location.href;
  const params = new URLSearchParams(window.location.search);
  const urlRole = params.get('role');
  
  // Modal states
  const [addGoalModalOpen, setAddGoalModalOpen] = useState(false);
  const [addExpenseModalOpen, setAddExpenseModalOpen] = useState(false);
  const [whatIfModalOpen, setWhatIfModalOpen] = useState(false);
  const [weekOffModalOpen, setWeekOffModalOpen] = useState(false);
  const [dayLoggerModalOpen, setDayLoggerModalOpen] = useState(false);
  const [payStructureModalOpen, setPayStructureModalOpen] = useState(false);
  
  // For this example, just force it to "Company Driver" when user clicks that card
  const queryRole = urlRole === 'company' ? 'company' : state.role;
  const forceCompanyDriver = sessionStorage.getItem('selectedCompany') === 'true';
  
  console.log("Dashboard role check:", { 
    stateRole: state.role, 
    urlRole, 
    forceCompanyDriver, 
    finalRole: forceCompanyDriver ? 'company' : queryRole || state.role || 'owner' 
  });
  
  // Driver type display text - forcing Company Driver for demonstration
  const driverTypeText = forceCompanyDriver ? 'Company Driver' : 'Owner Operator';
  
  // Calculate monthly and weekly income/expenses for display
  const monthlyIncome = 4500; // For demonstration, would be calculated from income logs
  const weeklyIncome = monthlyIncome / 4.33;
  
  const monthlyExpenses = state.expenses.reduce((sum, expense) => sum + expense.monthly, 0) || 3200;
  const weeklyExpenses = monthlyExpenses / 4.33;

  return (
    <section className="py-4 pb-20">
      {/* Available Cash Card */}
      <div className="mb-6 bg-white rounded-xl shadow-md p-5">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">{driverTypeText}</h2>
          <div className="text-right">
            <p className="text-neutral-500 text-sm">Available Cash</p>
            <p className="text-2xl font-bold text-primary">
              ${state.availableCash.toFixed(2)}
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-3">
          <button 
            onClick={() => setWeekOffModalOpen(true)}
            className="flex-1 bg-primary text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-600 transition flex items-center justify-center"
          >
            <span className="material-icons mr-2">calendar_today</span>
            Week Off?
          </button>
          <button 
            onClick={() => setWhatIfModalOpen(true)}
            className="flex-1 bg-white border border-primary text-primary py-3 px-4 rounded-lg font-medium hover:bg-blue-50 transition flex items-center justify-center"
          >
            <span className="material-icons mr-2">psychology</span>
            What If?
          </button>
        </div>
      </div>

      {/* Goals Section */}
      <div className="mb-6 bg-white rounded-xl shadow-md p-5">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Dream Sheet</h3>
          <button 
            onClick={() => setAddGoalModalOpen(true)}
            className="text-primary hover:text-blue-700 p-1"
          >
            <span className="material-icons">add_circle</span>
          </button>
        </div>
        
        <div className="space-y-4">
          {state.goals.map(goal => (
            <GoalItem key={goal.id} goal={goal} />
          ))}
        </div>
        
        {state.goals.length === 0 && (
          <div className="text-center py-4 text-neutral-500">
            <p>Add your first financial goal</p>
          </div>
        )}
      </div>

      {/* Income & Expenses Section */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-1 bg-white rounded-xl shadow-md p-5">
          <div className="mb-4">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-lg font-semibold">Income</h3>
              <button 
                onClick={() => setPayStructureModalOpen(true)}
                className="text-primary hover:text-blue-700 p-1"
                title="Add Pay Structure"
              >
                <span className="material-icons">add_circle</span>
              </button>
            </div>
            
            <div className="flex items-center justify-end">
              <span className="text-xs text-neutral-500 mr-2">Hide Income</span>
              <button 
                onClick={() => toggleHideIncome(!state.hideIncome)} 
                className={`w-8 h-4 rounded-full transition-colors duration-200 ease-in-out ${state.hideIncome ? 'bg-primary' : 'bg-neutral-300'} relative`}
                aria-label="Toggle income visibility"
              >
                <span 
                  className={`absolute top-0.5 left-0.5 w-3 h-3 bg-white rounded-full transition-transform duration-200 ease-in-out ${state.hideIncome ? 'translate-x-4' : ''}`}
                />
              </button>
            </div>
          </div>
          
          <div className="text-center py-4">
            <p className="text-neutral-500 text-sm">Monthly Average</p>
            <p className="text-2xl font-bold text-success">
              {state.hideIncome ? '****' : `$${monthlyIncome.toFixed(0)}`}
            </p>
            <p className="text-neutral-500 text-sm">
              {state.hideIncome ? '****' : `$${weeklyIncome.toFixed(0)}`} weekly
            </p>
          </div>
          
          {/* Display Pay Structures */}
          {state.payStructures.length > 0 ? (
            <div className="mt-2 mb-2 border-t border-neutral-100 pt-2">
              <p className="text-sm font-medium mb-1">Pay Structures:</p>
              <div className="space-y-1">
                {state.payStructures.map(pay => (
                  <div key={pay.id} className="flex justify-between items-center text-sm">
                    <span className="text-neutral-700">
                      {pay.payType === 'hourly' ? 'Hourly' : 
                       pay.payType === 'per_mile' ? 'Per Mile' :
                       pay.payType === 'per_load' ? 'Per Load' :
                       pay.payType === 'bonus' ? 'Bonus' : 'Other'}
                    </span>
                    <span className="font-medium">
                      {state.hideIncome ? '****' : `$${parseFloat(pay.rate.toString()).toFixed(2)}`}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="mt-2 mb-2 border-t border-neutral-100 pt-2 text-center text-neutral-500 text-sm">
              <p>No pay structures defined</p>
              <p className="text-xs text-primary">Click + to add your pay rates</p>
            </div>
          )}
          
          <button 
            onClick={() => setDayLoggerModalOpen(true)} 
            className="w-full bg-primary bg-opacity-10 text-primary py-2 px-4 rounded-lg font-medium hover:bg-opacity-20 transition flex items-center justify-center mt-2"
          >
            <span className="material-icons mr-2">add_task</span>
            Log Today's Activity
          </button>
        </div>
        
        <div className="flex-1 bg-white rounded-xl shadow-md p-5">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Expenses</h3>
            <button 
              onClick={() => setAddExpenseModalOpen(true)}
              className="text-primary hover:text-blue-700 p-1"
            >
              <span className="material-icons">add_circle</span>
            </button>
          </div>
          
          <div className="text-center py-6">
            <p className="text-neutral-500 text-sm">Monthly Total</p>
            <p className="text-2xl font-bold text-danger">${monthlyExpenses.toFixed(0)}</p>
            <p className="text-neutral-500 text-sm">${weeklyExpenses.toFixed(0)} weekly</p>
          </div>
          
          <button 
            onClick={() => alert("Expense categories breakdown would be shown here")}
            className="w-full bg-neutral-200 text-neutral-700 py-2 px-4 rounded-lg font-medium hover:bg-neutral-300 transition flex items-center justify-center mt-2"
          >
            <span className="material-icons mr-2">pie_chart</span>
            View Categories
          </button>
        </div>
      </div>
      
      {/* Insights Preview */}
      <div className="bg-white rounded-xl shadow-md p-5 mb-6">
        <h3 className="text-lg font-semibold mb-3">Insights</h3>
        <div className="space-y-3">
          <div className="flex items-center">
            <div className="w-2/5">
              <p className="text-sm font-medium">Savings Rate</p>
            </div>
            <div className="w-3/5 flex items-center">
              <div className="w-full bg-neutral-200 rounded-full h-2.5">
                <div className="bg-success h-2.5 rounded-full" style={{ width: "28%" }}></div>
              </div>
              <span className="ml-2 text-sm font-medium">28%</span>
            </div>
          </div>
          
          <div className="flex items-center">
            <div className="w-2/5">
              <p className="text-sm font-medium">Top Expense</p>
            </div>
            <div className="w-3/5">
              <p className="text-sm">
                <span className="font-medium">
                  {state.expenses.length > 0 
                    ? state.expenses.reduce((prev, current) => (prev.monthly > current.monthly) ? prev : current).name 
                    : "Housing"}
                </span> - <span className="text-neutral-500">
                  {state.expenses.length > 0 
                    ? "$" + state.expenses.reduce((prev, current) => (prev.monthly > current.monthly) ? prev : current).monthly.toFixed(0) + "/mo" 
                    : "$1,200/mo"}
                </span>
              </p>
            </div>
          </div>
          
          <div className="flex items-center">
            <div className="w-2/5">
              <p className="text-sm font-medium">Suggestion</p>
            </div>
            <div className="w-3/5">
              <p className="text-sm text-neutral-600">
                Cut food by $5/day = +$150/mo
              </p>
            </div>
          </div>
        </div>
        
        <button 
          onClick={() => alert("Full insights view would be shown here")}
          className="w-full mt-4 text-primary text-sm font-medium"
        >
          View Full Insights →
        </button>
      </div>

      {/* Ad Banner */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-neutral-200 py-2 px-4 text-center text-sm text-neutral-600">
        Sponsored: Fuel Cards | Truck Jobs | Finance Tools
      </div>

      {/* Modals */}
      <AddGoalModal isOpen={addGoalModalOpen} onClose={() => setAddGoalModalOpen(false)} />
      <AddExpenseModal isOpen={addExpenseModalOpen} onClose={() => setAddExpenseModalOpen(false)} />
      <WhatIfModal isOpen={whatIfModalOpen} onClose={() => setWhatIfModalOpen(false)} appState={state} />
      <WeekOffModal isOpen={weekOffModalOpen} onClose={() => setWeekOffModalOpen(false)} appState={state} />
      <DayLoggerModal isOpen={dayLoggerModalOpen} onClose={() => setDayLoggerModalOpen(false)} />
      <PayStructureModal isOpen={payStructureModalOpen} onClose={() => setPayStructureModalOpen(false)} />
    </section>
  );
}
