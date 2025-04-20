import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertUserSchema, insertGoalSchema, insertExpenseSchema, insertIncomeLogSchema, insertPayStructureSchema } from "@shared/schema";
import { z } from "zod";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";

export async function registerRoutes(app: Express): Promise<Server> {
  // prefix all routes with /api
  
  // Users API routes
  app.get("/api/users/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    const user = await storage.getUser(id);
    
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    
    res.json(user);
  });
  
  app.post("/api/users", async (req, res) => {
    try {
      const userData = insertUserSchema.parse(req.body);
      const user = await storage.createUser(userData);
      res.status(201).json(user);
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({ message: fromZodError(error).message });
      }
      res.status(500).json({ message: "Failed to create user" });
    }
  });
  
  app.patch("/api/users/:id/cash", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const schema = z.object({ amount: z.number() });
      const { amount } = schema.parse(req.body);
      
      const user = await storage.updateUserCash(id, amount);
      
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      
      res.json(user);
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({ message: fromZodError(error).message });
      }
      res.status(500).json({ message: "Failed to update user cash" });
    }
  });
  
  // Goals API routes
  app.get("/api/users/:userId/goals", async (req, res) => {
    const userId = parseInt(req.params.userId);
    const goals = await storage.getGoalsByUserId(userId);
    res.json(goals);
  });
  
  app.post("/api/goals", async (req, res) => {
    try {
      const goalData = insertGoalSchema.parse(req.body);
      const goal = await storage.createGoal(goalData);
      res.status(201).json(goal);
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({ message: fromZodError(error).message });
      }
      res.status(500).json({ message: "Failed to create goal" });
    }
  });
  
  app.patch("/api/goals/:id/progress", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const schema = z.object({ saved: z.number(), progress: z.number() });
      const { saved, progress } = schema.parse(req.body);
      
      const goal = await storage.updateGoalProgress(id, saved, progress);
      
      if (!goal) {
        return res.status(404).json({ message: "Goal not found" });
      }
      
      res.json(goal);
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({ message: fromZodError(error).message });
      }
      res.status(500).json({ message: "Failed to update goal progress" });
    }
  });
  
  // Expenses API routes
  app.get("/api/users/:userId/expenses", async (req, res) => {
    const userId = parseInt(req.params.userId);
    const expenses = await storage.getExpensesByUserId(userId);
    res.json(expenses);
  });
  
  app.post("/api/expenses", async (req, res) => {
    try {
      const expenseData = insertExpenseSchema.parse(req.body);
      const expense = await storage.createExpense(expenseData);
      res.status(201).json(expense);
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({ message: fromZodError(error).message });
      }
      res.status(500).json({ message: "Failed to create expense" });
    }
  });
  
  app.patch("/api/expenses/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const expenseData = insertExpenseSchema.partial().parse(req.body);
      
      const expense = await storage.updateExpense(id, expenseData);
      
      if (!expense) {
        return res.status(404).json({ message: "Expense not found" });
      }
      
      res.json(expense);
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({ message: fromZodError(error).message });
      }
      res.status(500).json({ message: "Failed to update expense" });
    }
  });
  
  app.delete("/api/expenses/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    const success = await storage.deleteExpense(id);
    
    if (!success) {
      return res.status(404).json({ message: "Expense not found" });
    }
    
    res.status(204).send();
  });
  
  // Income logs API routes
  app.get("/api/users/:userId/income-logs", async (req, res) => {
    const userId = parseInt(req.params.userId);
    const logs = await storage.getIncomeLogsByUserId(userId);
    res.json(logs);
  });
  
  app.post("/api/income-logs", async (req, res) => {
    try {
      const logData = insertIncomeLogSchema.parse(req.body);
      const log = await storage.createIncomeLog(logData);
      
      // Update user's cash balance if income is provided
      if (logData.income && logData.income > 0 && logData.userId) {
        await storage.updateUserCash(logData.userId, Number(logData.income));
      }
      
      res.status(201).json(log);
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({ message: fromZodError(error).message });
      }
      res.status(500).json({ message: "Failed to create income log" });
    }
  });
  
  // Pay structures API routes
  app.get("/api/users/:userId/pay-structures", async (req, res) => {
    const userId = parseInt(req.params.userId);
    const payStructures = await storage.getPayStructuresByUserId(userId);
    res.json(payStructures);
  });
  
  app.post("/api/pay-structures", async (req, res) => {
    try {
      const payStructureData = insertPayStructureSchema.parse(req.body);
      const payStructure = await storage.createPayStructure(payStructureData);
      res.status(201).json(payStructure);
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({ message: fromZodError(error).message });
      }
      res.status(500).json({ message: "Failed to create pay structure" });
    }
  });
  
  app.patch("/api/pay-structures/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const payStructureData = insertPayStructureSchema.partial().parse(req.body);
      
      const payStructure = await storage.updatePayStructure(id, payStructureData);
      
      if (!payStructure) {
        return res.status(404).json({ message: "Pay structure not found" });
      }
      
      res.json(payStructure);
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({ message: fromZodError(error).message });
      }
      res.status(500).json({ message: "Failed to update pay structure" });
    }
  });
  
  app.patch("/api/pay-structures/:id/toggle", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const schema = z.object({ isActive: z.boolean() });
      const { isActive } = schema.parse(req.body);
      
      const payStructure = await storage.togglePayStructureActive(id, isActive);
      
      if (!payStructure) {
        return res.status(404).json({ message: "Pay structure not found" });
      }
      
      res.json(payStructure);
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({ message: fromZodError(error).message });
      }
      res.status(500).json({ message: "Failed to toggle pay structure" });
    }
  });
  
  app.delete("/api/pay-structures/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    const success = await storage.deletePayStructure(id);
    
    if (!success) {
      return res.status(404).json({ message: "Pay structure not found" });
    }
    
    res.status(204).send();
  });
  
  // User settings routes
  app.patch("/api/users/:id/settings", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const schema = z.object({ hideIncome: z.boolean() });
      const { hideIncome } = schema.parse(req.body);
      
      const user = await storage.updateUserSettings(id, hideIncome);
      
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      
      res.json(user);
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({ message: fromZodError(error).message });
      }
      res.status(500).json({ message: "Failed to update user settings" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
