import { 
  users, type User, type InsertUser,
  goals, type Goal, type InsertGoal,
  expenses, type Expense, type InsertExpense,
  incomeLogs, type IncomeLog, type InsertIncomeLog,
  payStructures, type PayStructure, type InsertPayStructure
} from "@shared/schema";
import { db } from "./db";
import { eq, and, desc } from "drizzle-orm";

export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUserCash(userId: number, amount: number): Promise<User | undefined>;
  updateUserSettings(userId: number, hideIncome: boolean): Promise<User | undefined>;
  
  // Goal operations
  getGoalsByUserId(userId: number): Promise<Goal[]>;
  getGoal(id: number): Promise<Goal | undefined>;
  createGoal(goal: InsertGoal): Promise<Goal>;
  updateGoalProgress(goalId: number, saved: number, progress: number): Promise<Goal | undefined>;
  updateGoalPriority(goalId: number, priority: number): Promise<Goal | undefined>;
  toggleGoalActive(goalId: number, isActive: boolean): Promise<Goal | undefined>;
  
  // Expense operations
  getExpensesByUserId(userId: number): Promise<Expense[]>;
  getExpense(id: number): Promise<Expense | undefined>;
  createExpense(expense: InsertExpense): Promise<Expense>;
  updateExpense(id: number, expense: Partial<InsertExpense>): Promise<Expense | undefined>;
  deleteExpense(id: number): Promise<boolean>;
  toggleExpenseActive(expenseId: number, isActive: boolean): Promise<Expense | undefined>;
  
  // Income log operations
  getIncomeLogsByUserId(userId: number): Promise<IncomeLog[]>;
  getIncomeLog(id: number): Promise<IncomeLog | undefined>;
  createIncomeLog(incomeLog: InsertIncomeLog): Promise<IncomeLog>;
  updateIncomeLog(id: number, incomeLog: Partial<InsertIncomeLog>): Promise<IncomeLog | undefined>;
  deleteIncomeLog(id: number): Promise<boolean>;
  
  // Pay structure operations
  getPayStructuresByUserId(userId: number): Promise<PayStructure[]>;
  getPayStructure(id: number): Promise<PayStructure | undefined>;
  createPayStructure(payStructure: InsertPayStructure): Promise<PayStructure>;
  updatePayStructure(id: number, payStructure: Partial<InsertPayStructure>): Promise<PayStructure | undefined>;
  deletePayStructure(id: number): Promise<boolean>;
  togglePayStructureActive(payStructureId: number, isActive: boolean): Promise<PayStructure | undefined>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private goals: Map<number, Goal>;
  private expenses: Map<number, Expense>;
  private incomeLogs: Map<number, IncomeLog>;
  private payStructures: Map<number, PayStructure>;
  private userId: number;
  private goalId: number;
  private expenseId: number;
  private incomeLogId: number;
  private payStructureId: number;

  constructor() {
    this.users = new Map();
    this.goals = new Map();
    this.expenses = new Map();
    this.incomeLogs = new Map();
    this.payStructures = new Map();
    this.userId = 1;
    this.goalId = 1;
    this.expenseId = 1;
    this.incomeLogId = 1;
    this.payStructureId = 1;
  }

  // User operations
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userId++;
    const now = new Date();
    const user: User = { 
      ...insertUser, 
      id,
      createdAt: now
    };
    this.users.set(id, user);
    return user;
  }

  async updateUserCash(userId: number, amount: number): Promise<User | undefined> {
    const user = await this.getUser(userId);
    if (!user) return undefined;
    
    const updatedUser = { 
      ...user, 
      availableCash: Number(user.availableCash) + amount
    };
    this.users.set(userId, updatedUser);
    return updatedUser;
  }
  
  async updateUserSettings(userId: number, hideIncome: boolean): Promise<User | undefined> {
    const user = await this.getUser(userId);
    if (!user) return undefined;
    
    const updatedUser = { 
      ...user, 
      hideIncome
    };
    this.users.set(userId, updatedUser);
    return updatedUser;
  }

  // Goal operations
  async getGoalsByUserId(userId: number): Promise<Goal[]> {
    return Array.from(this.goals.values())
      .filter(goal => goal.userId === userId)
      .sort((a, b) => {
        // Sort by active status first (active goals first)
        if ((a.isActive ?? true) && !(b.isActive ?? true)) return -1;
        if (!(a.isActive ?? true) && (b.isActive ?? true)) return 1;
        // Then by priority
        return (a.priority ?? 1) - (b.priority ?? 1);
      });
  }

  async getGoal(id: number): Promise<Goal | undefined> {
    return this.goals.get(id);
  }

  async createGoal(insertGoal: InsertGoal): Promise<Goal> {
    const id = this.goalId++;
    const now = new Date();
    const goal: Goal = { 
      ...insertGoal, 
      id,
      createdAt: now,
      isActive: insertGoal.isActive ?? true,
      priority: insertGoal.priority ?? 1
    };
    this.goals.set(id, goal);
    return goal;
  }

  async updateGoalProgress(goalId: number, saved: number, progress: number): Promise<Goal | undefined> {
    const goal = await this.getGoal(goalId);
    if (!goal) return undefined;
    
    const updatedGoal = { 
      ...goal, 
      saved, 
      progress 
    };
    this.goals.set(goalId, updatedGoal);
    return updatedGoal;
  }
  
  async updateGoalPriority(goalId: number, priority: number): Promise<Goal | undefined> {
    const goal = await this.getGoal(goalId);
    if (!goal) return undefined;
    
    const updatedGoal = { 
      ...goal, 
      priority
    };
    this.goals.set(goalId, updatedGoal);
    return updatedGoal;
  }
  
  async toggleGoalActive(goalId: number, isActive: boolean): Promise<Goal | undefined> {
    const goal = await this.getGoal(goalId);
    if (!goal) return undefined;
    
    const updatedGoal = { 
      ...goal, 
      isActive
    };
    this.goals.set(goalId, updatedGoal);
    return updatedGoal;
  }

  // Expense operations
  async getExpensesByUserId(userId: number): Promise<Expense[]> {
    return Array.from(this.expenses.values()).filter(
      (expense) => expense.userId === userId && (expense.isActive ?? true)
    );
  }

  async getExpense(id: number): Promise<Expense | undefined> {
    return this.expenses.get(id);
  }

  async createExpense(insertExpense: InsertExpense): Promise<Expense> {
    const id = this.expenseId++;
    const now = new Date();
    const expense: Expense = { 
      ...insertExpense, 
      id,
      createdAt: now,
      isActive: insertExpense.isActive ?? true
    };
    this.expenses.set(id, expense);
    return expense;
  }

  async updateExpense(id: number, expenseUpdate: Partial<InsertExpense>): Promise<Expense | undefined> {
    const expense = await this.getExpense(id);
    if (!expense) return undefined;
    
    const updatedExpense = { 
      ...expense, 
      ...expenseUpdate 
    };
    this.expenses.set(id, updatedExpense);
    return updatedExpense;
  }

  async deleteExpense(id: number): Promise<boolean> {
    return this.expenses.delete(id);
  }
  
  async toggleExpenseActive(expenseId: number, isActive: boolean): Promise<Expense | undefined> {
    const expense = await this.getExpense(expenseId);
    if (!expense) return undefined;
    
    const updatedExpense = { 
      ...expense, 
      isActive
    };
    this.expenses.set(expenseId, updatedExpense);
    return updatedExpense;
  }

  // Income log operations
  async getIncomeLogsByUserId(userId: number): Promise<IncomeLog[]> {
    return Array.from(this.incomeLogs.values())
      .filter((log) => log.userId === userId)
      .sort((a, b) => {
        const dateA = a.date instanceof Date ? a.date : new Date(a.date);
        const dateB = b.date instanceof Date ? b.date : new Date(b.date);
        return dateB.getTime() - dateA.getTime(); // Sort by date descending (newest first)
      });
  }

  async getIncomeLog(id: number): Promise<IncomeLog | undefined> {
    return this.incomeLogs.get(id);
  }

  async createIncomeLog(insertIncomeLog: InsertIncomeLog): Promise<IncomeLog> {
    const id = this.incomeLogId++;
    const now = new Date();
    const incomeLog: IncomeLog = { 
      ...insertIncomeLog, 
      id,
      createdAt: now
    };
    this.incomeLogs.set(id, incomeLog);
    return incomeLog;
  }
  
  async updateIncomeLog(id: number, incomeLogUpdate: Partial<InsertIncomeLog>): Promise<IncomeLog | undefined> {
    const incomeLog = await this.getIncomeLog(id);
    if (!incomeLog) return undefined;
    
    const updatedIncomeLog = { 
      ...incomeLog, 
      ...incomeLogUpdate 
    };
    this.incomeLogs.set(id, updatedIncomeLog);
    return updatedIncomeLog;
  }
  
  async deleteIncomeLog(id: number): Promise<boolean> {
    return this.incomeLogs.delete(id);
  }
  
  // Pay structure operations
  async getPayStructuresByUserId(userId: number): Promise<PayStructure[]> {
    return Array.from(this.payStructures.values())
      .filter(ps => ps.userId === userId)
      .sort((a, b) => {
        // Sort by active status first (active first)
        if ((a.isActive ?? true) && !(b.isActive ?? true)) return -1;
        if (!(a.isActive ?? true) && (b.isActive ?? true)) return 1;
        // Then alphabetically by pay type
        return (a.payType ?? '').localeCompare(b.payType ?? '');
      });
  }
  
  async getPayStructure(id: number): Promise<PayStructure | undefined> {
    return this.payStructures.get(id);
  }
  
  async createPayStructure(insertPayStructure: InsertPayStructure): Promise<PayStructure> {
    const id = this.payStructureId++;
    const now = new Date();
    const payStructure: PayStructure = { 
      ...insertPayStructure, 
      id,
      createdAt: now,
      isActive: insertPayStructure.isActive ?? true
    };
    this.payStructures.set(id, payStructure);
    return payStructure;
  }
  
  async updatePayStructure(id: number, payStructureUpdate: Partial<InsertPayStructure>): Promise<PayStructure | undefined> {
    const payStructure = await this.getPayStructure(id);
    if (!payStructure) return undefined;
    
    const updatedPayStructure = { 
      ...payStructure, 
      ...payStructureUpdate 
    };
    this.payStructures.set(id, updatedPayStructure);
    return updatedPayStructure;
  }
  
  async deletePayStructure(id: number): Promise<boolean> {
    return this.payStructures.delete(id);
  }
  
  async togglePayStructureActive(payStructureId: number, isActive: boolean): Promise<PayStructure | undefined> {
    const payStructure = await this.getPayStructure(payStructureId);
    if (!payStructure) return undefined;
    
    const updatedPayStructure = { 
      ...payStructure, 
      isActive
    };
    this.payStructures.set(payStructureId, updatedPayStructure);
    return updatedPayStructure;
  }
}

export class DatabaseStorage implements IStorage {
  // User operations
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }

  async updateUserCash(userId: number, amount: number): Promise<User | undefined> {
    const user = await this.getUser(userId);
    if (!user) return undefined;
    
    const newCashAmount = Number(user.availableCash) + amount;
    const [updatedUser] = await db
      .update(users)
      .set({ availableCash: String(newCashAmount) })
      .where(eq(users.id, userId))
      .returning();
    return updatedUser;
  }
  
  async updateUserSettings(userId: number, hideIncome: boolean): Promise<User | undefined> {
    const [updatedUser] = await db
      .update(users)
      .set({ hideIncome })
      .where(eq(users.id, userId))
      .returning();
    return updatedUser;
  }

  // Goal operations
  async getGoalsByUserId(userId: number): Promise<Goal[]> {
    const userGoals = await db
      .select()
      .from(goals)
      .where(eq(goals.userId, userId))
      .orderBy(desc(goals.isActive), goals.priority);
    return userGoals;
  }

  async getGoal(id: number): Promise<Goal | undefined> {
    const [goal] = await db.select().from(goals).where(eq(goals.id, id));
    return goal;
  }

  async createGoal(insertGoal: InsertGoal): Promise<Goal> {
    const [goal] = await db.insert(goals).values(insertGoal).returning();
    return goal;
  }

  async updateGoalProgress(goalId: number, saved: number, progress: number): Promise<Goal | undefined> {
    const [updatedGoal] = await db
      .update(goals)
      .set({ saved: String(saved), progress })
      .where(eq(goals.id, goalId))
      .returning();
    return updatedGoal;
  }
  
  async updateGoalPriority(goalId: number, priority: number): Promise<Goal | undefined> {
    const [updatedGoal] = await db
      .update(goals)
      .set({ priority })
      .where(eq(goals.id, goalId))
      .returning();
    return updatedGoal;
  }
  
  async toggleGoalActive(goalId: number, isActive: boolean): Promise<Goal | undefined> {
    const [updatedGoal] = await db
      .update(goals)
      .set({ isActive })
      .where(eq(goals.id, goalId))
      .returning();
    return updatedGoal;
  }

  // Expense operations
  async getExpensesByUserId(userId: number): Promise<Expense[]> {
    const userExpenses = await db
      .select()
      .from(expenses)
      .where(and(eq(expenses.userId, userId), eq(expenses.isActive, true)))
      .orderBy(expenses.createdAt);
    return userExpenses;
  }

  async getExpense(id: number): Promise<Expense | undefined> {
    const [expense] = await db.select().from(expenses).where(eq(expenses.id, id));
    return expense;
  }

  async createExpense(insertExpense: InsertExpense): Promise<Expense> {
    const [expense] = await db.insert(expenses).values(insertExpense).returning();
    return expense;
  }

  async updateExpense(id: number, expenseUpdate: Partial<InsertExpense>): Promise<Expense | undefined> {
    const [updatedExpense] = await db
      .update(expenses)
      .set(expenseUpdate)
      .where(eq(expenses.id, id))
      .returning();
    return updatedExpense;
  }

  async deleteExpense(id: number): Promise<boolean> {
    const result = await db.delete(expenses).where(eq(expenses.id, id));
    return result.rowCount > 0;
  }
  
  async toggleExpenseActive(expenseId: number, isActive: boolean): Promise<Expense | undefined> {
    const [updatedExpense] = await db
      .update(expenses)
      .set({ isActive })
      .where(eq(expenses.id, expenseId))
      .returning();
    return updatedExpense;
  }

  // Income log operations
  async getIncomeLogsByUserId(userId: number): Promise<IncomeLog[]> {
    const userIncomeLogs = await db
      .select()
      .from(incomeLogs)
      .where(eq(incomeLogs.userId, userId))
      .orderBy(desc(incomeLogs.date));
    return userIncomeLogs;
  }

  async getIncomeLog(id: number): Promise<IncomeLog | undefined> {
    const [incomeLog] = await db.select().from(incomeLogs).where(eq(incomeLogs.id, id));
    return incomeLog;
  }

  async createIncomeLog(insertIncomeLog: InsertIncomeLog): Promise<IncomeLog> {
    const [incomeLog] = await db.insert(incomeLogs).values(insertIncomeLog).returning();
    return incomeLog;
  }
  
  async updateIncomeLog(id: number, incomeLogUpdate: Partial<InsertIncomeLog>): Promise<IncomeLog | undefined> {
    const [updatedIncomeLog] = await db
      .update(incomeLogs)
      .set(incomeLogUpdate)
      .where(eq(incomeLogs.id, id))
      .returning();
    return updatedIncomeLog;
  }
  
  async deleteIncomeLog(id: number): Promise<boolean> {
    const result = await db.delete(incomeLogs).where(eq(incomeLogs.id, id));
    return result.rowCount > 0;
  }
  
  // Pay structure operations
  async getPayStructuresByUserId(userId: number): Promise<PayStructure[]> {
    const userPayStructures = await db
      .select()
      .from(payStructures)
      .where(eq(payStructures.userId, userId))
      .orderBy(desc(payStructures.isActive), payStructures.payType);
    return userPayStructures;
  }
  
  async getPayStructure(id: number): Promise<PayStructure | undefined> {
    const [payStructure] = await db.select().from(payStructures).where(eq(payStructures.id, id));
    return payStructure;
  }
  
  async createPayStructure(insertPayStructure: InsertPayStructure): Promise<PayStructure> {
    const [payStructure] = await db.insert(payStructures).values(insertPayStructure).returning();
    return payStructure;
  }
  
  async updatePayStructure(id: number, payStructureUpdate: Partial<InsertPayStructure>): Promise<PayStructure | undefined> {
    const [updatedPayStructure] = await db
      .update(payStructures)
      .set(payStructureUpdate)
      .where(eq(payStructures.id, id))
      .returning();
    return updatedPayStructure;
  }
  
  async deletePayStructure(id: number): Promise<boolean> {
    const result = await db.delete(payStructures).where(eq(payStructures.id, id));
    return result.rowCount > 0;
  }
  
  async togglePayStructureActive(payStructureId: number, isActive: boolean): Promise<PayStructure | undefined> {
    const [updatedPayStructure] = await db
      .update(payStructures)
      .set({ isActive })
      .where(eq(payStructures.id, payStructureId))
      .returning();
    return updatedPayStructure;
  }
}

// Use Database Storage instead of MemStorage
export const storage = new DatabaseStorage();
