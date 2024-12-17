import { UserRepository } from '../repositories/UserRepository';
import { TransferRepository } from '../repositories/TransferRepository';
import { TransactionRepository } from '../repositories/TransactionRepository';

export class TransferService {
  constructor(
    private userRepo: UserRepository,
    private transferRepo: TransferRepository,
    private transactionRepo: TransactionRepository
  ) {}

  async getUserTransfers(userId: string) {
    return this.transferRepo.findUserTransfers(userId);
  }

  async createTransfer(fromUserId: string, toUserId: string, amount: number) {
    if (fromUserId === toUserId) throw new Error('Cannot transfer to the same account');
    if (amount <= 0) throw new Error('Invalid transfer amount');

    const sender = await this.userRepo.findById(fromUserId);
    const recipient = await this.userRepo.findById(toUserId);
    if (!sender) throw new Error('Sender not found');
    if (!recipient) throw new Error('Recipient not found');
    if (sender.balance < amount) throw new Error('Insufficient funds');

    sender.balance -= amount;
    recipient.balance += amount;
    await this.userRepo.save(sender);
    await this.userRepo.save(recipient);

    const transfer = await this.transferRepo.create({ fromUserId, toUserId, amount });

    // Record transactions
    await this.transactionRepo.create({ userId: fromUserId, type: 'TRANSFER', amount: -amount });
    await this.transactionRepo.create({ userId: toUserId, type: 'TRANSFER', amount: amount });

    return transfer;
  }
}
