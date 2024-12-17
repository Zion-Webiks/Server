import { Request, Response } from 'express';
import { TransactionService } from '../services/TransactionService';
import { UserRepository } from '../repositories/UserRepository';
import { TransactionRepository } from '../repositories/TransactionRepository';

// Instantiate repositories and services
const userRepo = new UserRepository();
const transactionRepo = new TransactionRepository();
const transactionService = new TransactionService(userRepo, transactionRepo);

export class TransactionController {
  static async getAll(req: Request, res: Response) {
    try {
      const userId = req.userId!;
      const transactions = await transactionService.getUserTransactions(userId);
      res.json(transactions);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  static async deposit(req: Request, res: Response) {
    try {
      const userId = req.userId!;
      const { amount } = req.body;
      const transaction = await transactionService.deposit(userId, amount);
      res.status(201).json(transaction);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  static async withdraw(req: Request, res: Response) {
    try {
      const userId = req.userId!;
      const { amount } = req.body;
      const transaction = await transactionService.withdraw(userId, amount);
      res.status(201).json(transaction);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  static async getAllTransactionsForAllUsers(req: Request, res: Response) {
    try {
      const transactions = await transactionService.getAllTransactionsForAdmin();
      res.json(transactions);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
}
