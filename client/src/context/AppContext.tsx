import { createContext, useEffect, useState, ReactNode } from "react";
import { AppState, Goal, Expense, IncomeLog, UserRole, ExpenseFrequency, ExpenseCategory, PayType, PayStructure } from "../types";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { normalizeExpense } from "../utils/calculations";

// Initial week off goal
const defaultWeekOffGoal: Goal = {
  id: "week-off",
  name: "Take a Week Off",
  amount: 980,
  saved: 294,
  progress: 30,
};

// Initial app state
const initialState: AppState = {
  signedIn: false,
  role: null,
  goals: [defaultWeekOffGoal],
  expenses: [],
  income: [],
  payStructures: [],
  availableCash: 500,
  hideIncome: false,
};

interface AppContextType {
  state: AppState;
  setSignedIn: (signedIn: boolean) => void;
  setRole: (role: UserRole) => void;
  addGoal: (name: string, amount: number, deadline?: string) => void;
  addExpense: (name: string, amount: number, frequency: ExpenseFrequency, category: ExpenseCategory) => void;
  logDailyActivity: (miles: number | undefined, loads: number | undefined, hours: number | undefined, income: number, notes?: string) => void;
  addPayRate: (payType: PayType, rate: number, description?: string) => void;
  updateCash: (amount: number) => void;
  toggleHideIncome: (hide: boolean) => void;
  resetAppState: () => void;
}

export const AppContext = createContext<AppContextType>({
  state: initialState,
  setSignedIn: () => {},
  setRole: () => {},
  addGoal: () => {},
  addExpense: () => {},
  logDailyActivity: () => {},
  addPayRate: () => {},
  updateCash: () => {},
  toggleHideIncome: () => {},
  resetAppState: () => {},
});

interface AppProviderProps {
  children: ReactNode;
}

export function AppProvider({ children }: AppProviderProps) {
  const [storedState, setStoredState] = useLocalStorage<AppState>("truckerFinanceUser", initialState);
  const [state, setState] = useState<AppState>(storedState);

  // Update local storage when state changes
  useEffect(() => {
    setStoredState(state);
  }, [state, setStoredState]);

  const setSignedIn = (signedIn: boolean) => {
    setState((prevState) => ({ ...prevState, signedIn }));
  };

  const setRole = (role: UserRole) => {
    // Force a clean reset and set the new role
    console.log("Setting role to:", role);
    
    // Create a new clean state with just the role
    const newState = {
      ...initialState,
      role: role,
      signedIn: true
    };
    
    console.log("New state with role:", newState);
    setState(newState);
    
    // Force update localStorage directly as well
    if (typeof window !== 'undefined') {
      localStorage.setItem('truckerFinanceUser', JSON.stringify(newState));
    }
  };

  const addGoal = (name: string, amount: number, deadline?: string) => {
    const newGoal: Goal = {
      id: Date.now().toString(),
      name,
      amount,
      saved: 0,
      progress: 0,
      deadline,
    };

    setState((prevState) => ({
      ...prevState,
      goals: [...prevState.goals, newGoal],
    }));
  };

  const addExpense = (name: string, amount: number, frequency: ExpenseFrequency, category: ExpenseCategory) => {
    const monthly = normalizeExpense(amount, frequency);
    
    const newExpense: Expense = {
      id: Date.now().toString(),
      name,
      amount,
      frequency,
      monthly,
      category,
      createdAt: new Date().toISOString(),
    };

    setState((prevState) => ({
      ...prevState,
      expenses: [...prevState.expenses, newExpense],
    }));
  };

  const logDailyActivity = (miles: number | undefined, loads: number | undefined, hours: number | undefined, income: number, notes?: string) => {
    const newLog: IncomeLog = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      miles,
      loads,
      hours, 
      income,
      notes,
    };

    // Add income to available cash
    if (income > 0) {
      updateCash(income);
    }

    setState((prevState) => ({
      ...prevState,
      income: [...prevState.income, newLog],
    }));
  };

  const updateCash = (amount: number) => {
    setState((prevState) => ({
      ...prevState,
      availableCash: prevState.availableCash + amount,
    }));
  };

  const addPayRate = (payType: PayType, rate: number, description?: string) => {
    const newPayStructure: PayStructure = {
      id: Date.now().toString(),
      payType,
      rate,
      description,
      isActive: true,
    };

    setState((prevState) => ({
      ...prevState,
      payStructures: [...prevState.payStructures, newPayStructure],
    }));
  };
  
  const toggleHideIncome = (hide: boolean) => {
    setState((prevState) => ({
      ...prevState,
      hideIncome: hide,
    }));
  };

  const resetAppState = () => {
    // Clear any stored state completely
    if (typeof window !== 'undefined') {
      localStorage.removeItem('truckerFinanceUser');
    }
    setState(initialState);
  };

  return (
    <AppContext.Provider
      value={{
        state,
        setSignedIn,
        setRole,
        addGoal,
        addExpense,
        logDailyActivity,
        addPayRate,
        updateCash,
        toggleHideIncome,
        resetAppState,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
