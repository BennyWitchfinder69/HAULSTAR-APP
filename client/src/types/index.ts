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

// Common expense categories for both company drivers and owner-operators
export type CommonExpenseCategory =
  | 'housing' 
  | 'food' 
  | 'utilities' 
  | 'healthcare' 
  | 'personal'
  | 'other';

// Owner-operator specific expense categories
export type OwnerOperatorExpenseCategory =
  | 'fuel'
  | 'maintenance'
  | 'insurance'
  | 'tolls'
  | 'permits'
  | 'truck_payment'
  | 'license_fees'
  | 'broker_fees'
  | 'parking_fees'
  | 'equipment'
  | 'eld_subscription'
  | 'hazmat'
  | 'business_services'; // Accounting, legal, etc.

// Company driver specific expense categories
export type CompanyDriverExpenseCategory =
  | 'on_road_meals'
  | 'uniform'
  | 'communication'
  | 'tools_equipment'
  | 'education_training'
  | 'association_dues'
  | 'travel_to_terminal'; // Travel between home and terminal

// Combined expense category type
export type ExpenseCategory = 
  | CommonExpenseCategory 
  | OwnerOperatorExpenseCategory 
  | CompanyDriverExpenseCategory;

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
export type PayType = 
  | 'hourly'           // Hourly pay
  | 'per_mile'         // Per mile pay
  | 'per_load'         // Per load pay
  | 'percentage'       // Percentage of load revenue
  | 'daily_rate'       // Fixed daily rate
  | 'salary'           // Fixed salary
  | 'hazmat'           // Hazardous materials bonus
  | 'detention'        // Detention pay
  | 'layover'          // Layover pay
  | 'stop_pay'         // Additional pay per stop
  | 'accessorial'      // Accessorial pay (lumpers, etc.)
  | 'performance'      // Performance-based bonus
  | 'safety'           // Safety bonus
  | 'fuel_bonus'       // Fuel efficiency bonus
  | 'referral'         // Referral bonus
  | 'other';           // Miscellaneous/other pay types

// Pay structure type
export interface PayStructure {
  id: string;
  payType: PayType;
  rate: number;
  description?: string;
  isActive?: boolean;
}

// Tax settings
export interface TaxSettings {
  federalTaxRate: number;
  socialSecurityRate: number;
  medicareRate: number;
  stateTaxRate: number;
  stateName?: string;
  selfEmploymentTax?: number; // Additional for owner-operators
  useStandardDeduction: boolean;
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
  taxSettings?: TaxSettings;
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
