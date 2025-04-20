import { ExpenseFrequency, Expense, WeekOffCalculation, WhatIfPeriod, WhatIfResult } from "../types";

// Convert expense amount to monthly value based on frequency
export function normalizeExpense(amount: number, frequency: ExpenseFrequency): number {
  switch (frequency) {
    case "daily":
      return amount * 30;
    case "weekly":
      return amount * 4.33;
    case "monthly":
      return amount;
    case "yearly":
      return amount / 12;
    default:
      return 0;
  }
}

// Calculate if user can take a week off
export function calculateWeekOff(expenses: Expense[], availableCash: number): WeekOffCalculation {
  // Calculate total monthly expenses
  const totalMonthlyExpenses = expenses.reduce((sum, expense) => sum + expense.monthly, 0);
  
  // Weekly expenses (monthly / 4.33 weeks per month)
  const weeklyExpenses = Math.round(totalMonthlyExpenses / 4.33);
  
  // Default daily living expenses
  const dailySpending = 140;
  
  // Total needed for a week off
  const totalNeeded = weeklyExpenses + (dailySpending * 7);
  
  // Determine if can take time off
  const canTakeOff = availableCash >= totalNeeded;
  
  // Calculate shortfall if applicable
  const shortfall = canTakeOff ? 0 : totalNeeded - availableCash;
  
  return {
    weeklyExpenses,
    dailySpending,
    totalNeeded,
    canTakeOff,
    shortfall
  };
}

// Calculate what-if analysis
export function calculateWhatIf(
  amount: number, 
  period: WhatIfPeriod, 
  expenses: Expense[]
): WhatIfResult {
  // Calculate monthly equivalent of income based on period
  let monthlyEquivalent = 0;
  
  switch (period) {
    case "day":
      monthlyEquivalent = amount * 30;
      break;
    case "week":
      monthlyEquivalent = amount * 4.33;
      break;
    case "month":
      monthlyEquivalent = amount;
      break;
  }
  
  // Calculate total monthly expenses
  const totalMonthlyExpenses = expenses.reduce((sum, expense) => sum + expense.monthly, 0);
  
  // For period-specific expenses, scale them down from monthly
  let periodExpenses = 0;
  switch (period) {
    case "day":
      periodExpenses = totalMonthlyExpenses / 30;
      break;
    case "week":
      periodExpenses = totalMonthlyExpenses / 4.33;
      break;
    case "month":
      periodExpenses = totalMonthlyExpenses;
      break;
  }
  
  // Allocate 15% to goals
  const goalsAmount = amount * 0.15;
  
  // Calculate remaining amount
  const remaining = amount - periodExpenses - goalsAmount;
  
  // Calculate how much this would contribute to week off goal (as a percentage)
  const weekOffProgress = (goalsAmount / 980) * 100;
  
  return {
    expenses: periodExpenses,
    goals: goalsAmount,
    remaining: remaining > 0 ? remaining : 0,
    weekOffProgress
  };
}
