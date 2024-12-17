import { UserRepository } from '../repositories/UserRepository';
import { TransactionRepository } from '../repositories/TransactionRepository';

export class TransactionService {
  constructor(
    private userRepo: UserRepository,
    private transactionRepo: TransactionRepository
  ) {}

  async getUserTransactions(userId: string) {
    return this.transactionRepo.findByUserId(userId);
  }

  async deposit(userId: string, amount: number) {
    if (amount <= 0) throw new Error('Invalid deposit amount');
    const user = await this.userRepo.findById(userId);
    if (!user) throw new Error('User not found');
    
    user.balance += amount;
    await this.userRepo.save(user);

    return this.transactionRepo.create({ userId, type: 'DEPOSIT', amount });
  }

  async withdraw(userId: string, amount: number) {
    if (amount <= 0) throw new Error('Invalid withdrawal amount');
    const user = await this.userRepo.findById(userId);
    if (!user) throw new Error('User not found');
    if (user.balance < amount) throw new Error('Insufficient funds');

    user.balance -= amount;
    await this.userRepo.save(user);

    return this.transactionRepo.create({ userId, type: 'WITHDRAW', amount });
  }

  async getAllTransactionsForAdmin() {
    return this.transactionRepo.findAll();
  }
}
