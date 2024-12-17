import { Request, Response } from 'express';
import { TransferService } from '../services/TransferService';
import { UserRepository } from '../repositories/UserRepository';
import { TransferRepository } from '../repositories/TransferRepository';
import { TransactionRepository } from '../repositories/TransactionRepository';

const userRepo = new UserRepository();
const transferRepo = new TransferRepository();
const transactionRepo = new TransactionRepository();
const transferService = new TransferService(userRepo, transferRepo, transactionRepo);

export class TransferController {
  static async getAll(req: Request, res: Response) {
    try {
      const userId = req.userId!;
      const transfers = await transferService.getUserTransfers(userId);
      res.json(transfers);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  static async create(req: Request, res: Response) {
    try {
      const fromUserId = req.userId!;
      const { toUserId, amount } = req.body;
      const transfer = await transferService.createTransfer(fromUserId, toUserId, amount);
      res.status(201).json(transfer);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
}
