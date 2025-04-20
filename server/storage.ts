import { 
  users, type User, type InsertUser,
  goals, type Goal, type InsertGoal,
  expenses, type Expense, type InsertExpense,
  incomeLogs, type IncomeLog, type InsertIncomeLog
} from "@shared/schema";

export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUserCash(userId: number, amount: number): Promise<User | undefined>;
  
  // Goal operations
  getGoalsByUserId(userId: number): Promise<Goal[]>;
  getGoal(id: number): Promise<Goal | undefined>;
  createGoal(goal: InsertGoal): Promise<Goal>;
  updateGoalProgress(goalId: number, saved: number, progress: number): Promise<Goal | undefined>;
  
  // Expense operations
  getExpensesByUserId(userId: number): Promise<Expense[]>;
  getExpense(id: number): Promise<Expense | undefined>;
  createExpense(expense: InsertExpense): Promise<Expense>;
  updateExpense(id: number, expense: Partial<InsertExpense>): Promise<Expense | undefined>;
  deleteExpense(id: number): Promise<boolean>;
  
  // Income log operations
  getIncomeLogsByUserId(userId: number): Promise<IncomeLog[]>;
  getIncomeLog(id: number): Promise<IncomeLog | undefined>;
  createIncomeLog(incomeLog: InsertIncomeLog): Promise<IncomeLog>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private goals: Map<number, Goal>;
  private expenses: Map<number, Expense>;
  private incomeLogs: Map<number, IncomeLog>;
  private userId: number;
  private goalId: number;
  private expenseId: number;
  private incomeLogId: number;

  constructor() {
    this.users = new Map();
    this.goals = new Map();
    this.expenses = new Map();
    this.incomeLogs = new Map();
    this.userId = 1;
    this.goalId = 1;
    this.expenseId = 1;
    this.incomeLogId = 1;
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

  // Goal operations
  async getGoalsByUserId(userId: number): Promise<Goal[]> {
    return Array.from(this.goals.values()).filter(
      (goal) => goal.userId === userId
    );
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
      createdAt: now
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

  // Expense operations
  async getExpensesByUserId(userId: number): Promise<Expense[]> {
    return Array.from(this.expenses.values()).filter(
      (expense) => expense.userId === userId
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
      createdAt: now
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

  // Income log operations
  async getIncomeLogsByUserId(userId: number): Promise<IncomeLog[]> {
    return Array.from(this.incomeLogs.values()).filter(
      (log) => log.userId === userId
    );
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
}

export const storage = new MemStorage();
