import { pgTable, text, serial, integer, numeric, timestamp, pgEnum, boolean, date } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { relations } from 'drizzle-orm';

// Enums
export const roleEnum = pgEnum('role', ['company', 'owner']);
export const expenseFrequencyEnum = pgEnum('expense_frequency', ['daily', 'weekly', 'monthly', 'yearly']);
export const expenseCategoryEnum = pgEnum('expense_category', [
  'housing', 'food', 'transportation', 'utilities', 'healthcare', 'personal',
  'fuel', 'maintenance', 'insurance', 'tolls', 'permits', 'other'
]);
export const payTypeEnum = pgEnum('pay_type', [
  'hourly',
  'per_mile',
  'per_load',
  'bonus',
  'other'
]);

// User table
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  role: roleEnum("role"),
  availableCash: numeric("available_cash").notNull().default("0"),
  hideIncome: boolean("hide_income").default(false).notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const userRelations = relations(users, ({ many }) => ({
  goals: many(goals),
  expenses: many(expenses),
  incomeLogs: many(incomeLogs),
  payStructures: many(payStructures)
}));

// Goals table
export const goals = pgTable("goals", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  name: text("name").notNull(),
  amount: numeric("amount").notNull(),
  saved: numeric("saved").notNull().default("0"),
  progress: integer("progress").notNull().default(0),
  priority: integer("priority").default(1).notNull(),
  deadline: timestamp("deadline"),
  isActive: boolean("is_active").default(true).notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const goalRelations = relations(goals, ({ one }) => ({
  user: one(users, {
    fields: [goals.userId],
    references: [users.id]
  })
}));

// Expenses table
export const expenses = pgTable("expenses", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  name: text("name").notNull(),
  amount: numeric("amount").notNull(),
  frequency: expenseFrequencyEnum("frequency").notNull(),
  monthly: numeric("monthly").notNull(),
  category: expenseCategoryEnum("category").notNull(),
  isActive: boolean("is_active").default(true).notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const expenseRelations = relations(expenses, ({ one }) => ({
  user: one(users, {
    fields: [expenses.userId],
    references: [users.id]
  })
}));

// Income logs table
export const incomeLogs = pgTable("income_logs", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  date: date("date").defaultNow(),
  miles: integer("miles"),
  loads: integer("loads"),
  hours: numeric("hours"),
  income: numeric("income").notNull(),
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const incomeLogRelations = relations(incomeLogs, ({ one }) => ({
  user: one(users, {
    fields: [incomeLogs.userId],
    references: [users.id]
  })
}));

// Pay Structure for different types of income
export const payStructures = pgTable("pay_structures", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  payType: payTypeEnum("pay_type").notNull(),
  rate: numeric("rate").notNull(),
  description: text("description"),
  isActive: boolean("is_active").default(true).notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const payStructureRelations = relations(payStructures, ({ one }) => ({
  user: one(users, {
    fields: [payStructures.userId],
    references: [users.id]
  })
}));

// Zod schemas
export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  role: true,
  availableCash: true,
  hideIncome: true,
});

export const insertGoalSchema = createInsertSchema(goals).pick({
  userId: true,
  name: true,
  amount: true,
  saved: true,
  progress: true,
  priority: true,
  deadline: true,
  isActive: true,
});

export const insertExpenseSchema = createInsertSchema(expenses).pick({
  userId: true,
  name: true,
  amount: true,
  frequency: true,
  monthly: true,
  category: true,
  isActive: true,
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

export const insertPayStructureSchema = createInsertSchema(payStructures).pick({
  userId: true,
  payType: true,
  rate: true,
  description: true,
  isActive: true,
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

export type InsertPayStructure = z.infer<typeof insertPayStructureSchema>;
export type PayStructure = typeof payStructures.$inferSelect;
