import { Transaction, TransactionDocument } from '../models/Transaction';

export class TransactionRepository {
  async findByUserId(userId: string): Promise<TransactionDocument[]> {
    return Transaction.find({ userId }).sort({ createdAt: -1 });
  }

  async create(data: Partial<TransactionDocument>): Promise<TransactionDocument> {
    return Transaction.create(data);
  }

  async findAll(): Promise<TransactionDocument[]> {
    return Transaction.find({}).sort({ createdAt: -1 });
  }
}
