import { Request, Response } from 'express';
import { TransferService } from '../services/TransferService';
import { UserRepository } from '../repositories/UserRepository';
import { TransferRepository } from '../repositories/TransferRepository';
import { TransactionRepository } from '../repositories/TransactionRepository';
import AuthenticatedRequest from '../types/requests/authenticatedRequest';

const userRepo = new UserRepository();
const transferRepo = new TransferRepository();
const transactionRepo = new TransactionRepository();
const transferService = new TransferService(userRepo, transferRepo, transactionRepo);

export class TransferController {
  static async getAll(req: AuthenticatedRequest, res: Response) {
    try {
      const userId = req.user?.userId!;
      const transfers = await transferService.getUserTransfers(userId);
      res.json(transfers);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  static async create(req: AuthenticatedRequest, res: Response) {
    try {
      const fromUserId = req.user?.userId!;
      const { toUserId, amount } = req.body;
      const transfer = await transferService.createTransfer(fromUserId, toUserId, amount);
      res.status(201).json(transfer);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
}
