import { pgTable, text, serial, integer, numeric, timestamp, pgEnum } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Enums
export const roleEnum = pgEnum('role', ['company', 'owner']);
export const expenseFrequencyEnum = pgEnum('expense_frequency', ['daily', 'weekly', 'monthly', 'yearly']);
export const expenseCategoryEnum = pgEnum('expense_category', [
  'housing', 'food', 'transportation', 'utilities', 'healthcare', 'personal',
  'fuel', 'maintenance', 'insurance', 'tolls', 'permits', 'other'
]);

// User table
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  role: roleEnum("role"),
  availableCash: numeric("available_cash").notNull().default("0"),
  createdAt: timestamp("created_at").defaultNow(),
});

// Goals table
export const goals = pgTable("goals", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  name: text("name").notNull(),
  amount: numeric("amount").notNull(),
  saved: numeric("saved").notNull().default("0"),
  progress: integer("progress").notNull().default(0),
  deadline: timestamp("deadline"),
  createdAt: timestamp("created_at").defaultNow(),
});

// Expenses table
export const expenses = pgTable("expenses", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  name: text("name").notNull(),
  amount: numeric("amount").notNull(),
  frequency: expenseFrequencyEnum("frequency").notNull(),
  monthly: numeric("monthly").notNull(),
  category: expenseCategoryEnum("category").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

// Income logs table
export const incomeLogs = pgTable("income_logs", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  date: timestamp("date").defaultNow(),
  miles: integer("miles"),
  loads: integer("loads"),
  hours: numeric("hours"),
  income: numeric("income").notNull(),
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow(),
});

// Zod schemas
export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  role: true,
  availableCash: true,
});

export const insertGoalSchema = createInsertSchema(goals).pick({
  userId: true,
  name: true,
  amount: true,
  saved: true,
  progress: true,
  deadline: true,
});

export const insertExpenseSchema = createInsertSchema(expenses).pick({
  userId: true,
  name: true,
  amount: true,
  frequency: true,
  monthly: true,
  category: true,
});

export const insertIncomeLogSchema = createInsertSchema(incomeLogs).pick({
  userId: true,
  date: true,
  miles: true,
  loads: true,
  hours: true,
  income: true,
  notes: true,
});

// Types
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertGoal = z.infer<typeof insertGoalSchema>;
export type Goal = typeof goals.$inferSelect;

export type InsertExpense = z.infer<typeof insertExpenseSchema>;
export type Expense = typeof expenses.$inferSelect;

export type InsertIncomeLog = z.infer<typeof insertIncomeLogSchema>;
export type IncomeLog = typeof incomeLogs.$inferSelect;
