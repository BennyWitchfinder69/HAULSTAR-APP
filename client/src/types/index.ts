// User roles
export type UserRole = 'company' | 'owner' | null;

// Auth types
export type SignInMethod = 'google' | 'apple' | 'phone' | 'reddit';

// Goal type
export interface Goal {
  id: string;
  name: string;
  amount: number;
  saved: number;
  progress: number;
  priority?: number;
  isActive?: boolean;
  deadline?: string;
}

// Expense frequency
export type ExpenseFrequency = 'daily' | 'weekly' | 'monthly' | 'yearly';

// Expense category
export type ExpenseCategory = 
  | 'housing' 
  | 'food' 
  | 'transportation' 
  | 'utilities' 
  | 'healthcare' 
  | 'personal'
  | 'fuel'
  | 'maintenance'
  | 'insurance'
  | 'tolls'
  | 'permits'
  | 'other';

// Expense type
export interface Expense {
  id: string;
  name: string;
  amount: number;
  frequency: ExpenseFrequency;
  monthly: number;
  category: ExpenseCategory;
  isActive?: boolean;
  createdAt: string;
}

// Income log type
export interface IncomeLog {
  id: string;
  date: string;
  miles?: number;
  loads?: number;
  hours?: number;
  income: number;
  notes?: string;
}

// What-if period type
export type WhatIfPeriod = 'day' | 'week' | 'month';

// Pay type
export type PayType = 'hourly' | 'per_mile' | 'per_load' | 'bonus' | 'other';

// Pay structure type
export interface PayStructure {
  id: string;
  payType: PayType;
  rate: number;
  description?: string;
  isActive?: boolean;
}

// User state
export interface AppState {
  signedIn: boolean;
  role: UserRole;
  goals: Goal[];
  expenses: Expense[];
  income: IncomeLog[];
  payStructures: PayStructure[];
  availableCash: number;
  hideIncome: boolean;
}

// Add goal form data
export interface AddGoalFormData {
  name: string;
  amount: number;
  deadline?: string;
}

// Add expense form data
export interface AddExpenseFormData {
  name: string;
  amount: number;
  frequency: ExpenseFrequency;
  category: ExpenseCategory;
}

// Day logger form data
export interface DayLogFormData {
  miles?: number;
  loads?: number;
  hours?: number;
  income: number;
  notes?: string;
}

// What-if form data
export interface WhatIfFormData {
  amount: number;
  period: WhatIfPeriod;
}

// Week off calculation
export interface WeekOffCalculation {
  weeklyExpenses: number;
  dailySpending: number;
  totalNeeded: number;
  canTakeOff: boolean;
  shortfall?: number;
}

// What-if calculation result
export interface WhatIfResult {
  expenses: number;
  goals: number;
  remaining: number;
  weekOffProgress: number;
}

// Pay structure form data
export interface PayStructureFormData {
  payType: PayType;
  rate: number;
  description?: string;
}
