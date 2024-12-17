import { Transfer, TransferDocument } from '../models/Transfer';

export class TransferRepository {
  async findUserTransfers(userId: string): Promise<TransferDocument[]> {
    return Transfer.find({
      $or: [{ fromUserId: userId }, { toUserId: userId }]
    }).sort({ createdAt: -1 });
  }

  async create(data: Partial<TransferDocument>): Promise<TransferDocument> {
    return Transfer.create(data);
  }
}
