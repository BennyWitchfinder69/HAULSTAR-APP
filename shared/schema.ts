import { pgTable, text, serial, integer, numeric, timestamp, pgEnum, boolean, date, uuid, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { relations } from 'drizzle-orm';

// Enums
export const roleEnum = pgEnum('role', ['company', 'owner']);

export const expenseFrequencyEnum = pgEnum('expense_frequency', ['daily', 'weekly', 'monthly', 'yearly']);

// Updated expense categories
export const expenseCategoryEnum = pgEnum('expense_category', [
  // Common
  'housing', 'food', 'utilities', 'healthcare', 'personal', 'other',
  // Owner operator specific
  'fuel', 'maintenance', 'insurance', 'tolls', 'permits', 'truck_payment', 
  'license_fees', 'broker_fees', 'parking_fees', 'equipment', 'eld_subscription', 
  'hazmat', 'business_services',
  // Company driver specific
  'on_road_meals', 'uniform', 'communication', 'tools_equipment', 
  'education_training', 'association_dues', 'travel_to_terminal'
]);

// Updated pay types
export const payTypeEnum = pgEnum('pay_type', [
  'hourly', 'per_mile', 'per_load', 'percentage', 'daily_rate', 'salary', 
  'hazmat', 'detention', 'layover', 'stop_pay', 'accessorial', 
  'performance', 'safety', 'fuel_bonus', 'referral', 'other'
]);

// Ad placement enum
export const adPlacementEnum = pgEnum('ad_placement', [
  'dashboard_top', 'dashboard_sidebar', 'dashboard_bottom',
  'income_page', 'expenses_page', 'goals_page', 'settings_page'
]);

// User table (enhanced)
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  uuid: uuid("uuid").defaultRandom().notNull().unique(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  email: text("email").notNull().unique(),
  firstName: text("first_name"),
  lastName: text("last_name"),
  role: roleEnum("role"),
  availableCash: numeric("available_cash").notNull().default("0"),
  hideIncome: boolean("hide_income").default(false).notNull(),
  profileImageUrl: text("profile_image_url"),
  settings: jsonb("settings").default({}),
  lastLogin: timestamp("last_login"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const userRelations = relations(users, ({ many, one }) => ({
  goals: many(goals),
  expenses: many(expenses),
  incomeLogs: many(incomeLogs),
  payStructures: many(payStructures),
  taxSettings: one(taxSettings)
}));

// Tax settings table (new)
export const taxSettings = pgTable("tax_settings", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id).notNull().unique(),
  federalTaxRate: numeric("federal_tax_rate").default("15"),
  socialSecurityRate: numeric("social_security_rate").default("6.2"),
  medicareRate: numeric("medicare_rate").default("1.45"),
  stateTaxRate: numeric("state_tax_rate").default("0"),
  stateName: text("state_name"),
  selfEmploymentTax: numeric("self_employment_tax"),
  useStandardDeduction: boolean("use_standard_deduction").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const taxSettingsRelations = relations(taxSettings, ({ one }) => ({
  user: one(users, {
    fields: [taxSettings.userId],
    references: [users.id]
  })
}));

// Goals table (enhanced)
export const goals = pgTable("goals", {
  id: serial("id").primaryKey(),
  uuid: uuid("uuid").defaultRandom().notNull().unique(),
  userId: integer("user_id").references(() => users.id).notNull(),
  name: text("name").notNull(),
  amount: numeric("amount").notNull(),
  saved: numeric("saved").notNull().default("0"),
  progress: integer("progress").notNull().default(0),
  priority: integer("priority").default(1).notNull(),
  deadline: timestamp("deadline"),
  isActive: boolean("is_active").default(true).notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const goalRelations = relations(goals, ({ one }) => ({
  user: one(users, {
    fields: [goals.userId],
    references: [users.id]
  })
}));

// Expenses table (enhanced)
export const expenses = pgTable("expenses", {
  id: serial("id").primaryKey(),
  uuid: uuid("uuid").defaultRandom().notNull().unique(),
  userId: integer("user_id").references(() => users.id).notNull(),
  name: text("name").notNull(),
  amount: numeric("amount").notNull(),
  frequency: expenseFrequencyEnum("frequency").notNull(),
  monthly: numeric("monthly").notNull(),
  category: expenseCategoryEnum("category").notNull(),
  isActive: boolean("is_active").default(true).notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const expenseRelations = relations(expenses, ({ one }) => ({
  user: one(users, {
    fields: [expenses.userId],
    references: [users.id]
  })
}));

// Income logs table (enhanced)
export const incomeLogs = pgTable("income_logs", {
  id: serial("id").primaryKey(),
  uuid: uuid("uuid").defaultRandom().notNull().unique(),
  userId: integer("user_id").references(() => users.id).notNull(),
  date: date("date").defaultNow(),
  miles: integer("miles"),
  loads: integer("loads"),
  hours: numeric("hours"),
  income: numeric("income").notNull(),
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const incomeLogRelations = relations(incomeLogs, ({ one }) => ({
  user: one(users, {
    fields: [incomeLogs.userId],
    references: [users.id]
  })
}));

// Pay Structure for different types of income (enhanced)
export const payStructures = pgTable("pay_structures", {
  id: serial("id").primaryKey(),
  uuid: uuid("uuid").defaultRandom().notNull().unique(),
  userId: integer("user_id").references(() => users.id).notNull(),
  payType: payTypeEnum("pay_type").notNull(),
  rate: numeric("rate").notNull(),
  description: text("description"),
  isActive: boolean("is_active").default(true).notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const payStructureRelations = relations(payStructures, ({ one }) => ({
  user: one(users, {
    fields: [payStructures.userId],
    references: [users.id]
  })
}));

// Advertisements table (new)
export const advertisements = pgTable("advertisements", {
  id: serial("id").primaryKey(),
  uuid: uuid("uuid").defaultRandom().notNull().unique(),
  name: text("name").notNull(),
  company: text("company").notNull(),
  imageUrl: text("image_url").notNull(),
  targetUrl: text("target_url").notNull(),
  placement: adPlacementEnum("placement").notNull(),
  startDate: timestamp("start_date").notNull(),
  endDate: timestamp("end_date").notNull(),
  impressions: integer("impressions").default(0),
  clicks: integer("clicks").default(0),
  isActive: boolean("is_active").default(true).notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Zod schemas
export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  email: true,
  firstName: true,
  lastName: true,
  role: true,
  availableCash: true,
  hideIncome: true,
  profileImageUrl: true,
  settings: true,
});

export const insertTaxSettingsSchema = createInsertSchema(taxSettings).pick({
  userId: true,
  federalTaxRate: true,
  socialSecurityRate: true,
  medicareRate: true,
  stateTaxRate: true,
  stateName: true,
  selfEmploymentTax: true,
  useStandardDeduction: true,
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

export const insertAdvertisementSchema = createInsertSchema(advertisements).pick({
  name: true,
  company: true,
  imageUrl: true,
  targetUrl: true,
  placement: true,
  startDate: true,
  endDate: true,
  isActive: true,
});

// Types
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertTaxSettings = z.infer<typeof insertTaxSettingsSchema>;
export type TaxSettings = typeof taxSettings.$inferSelect;

export type InsertGoal = z.infer<typeof insertGoalSchema>;
export type Goal = typeof goals.$inferSelect;

export type InsertExpense = z.infer<typeof insertExpenseSchema>;
export type Expense = typeof expenses.$inferSelect;

export type InsertIncomeLog = z.infer<typeof insertIncomeLogSchema>;
export type IncomeLog = typeof incomeLogs.$inferSelect;

export type InsertPayStructure = z.infer<typeof insertPayStructureSchema>;
export type PayStructure = typeof payStructures.$inferSelect;

export type InsertAdvertisement = z.infer<typeof insertAdvertisementSchema>;
export type Advertisement = typeof advertisements.$inferSelect;
