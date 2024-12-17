import { UserRepository } from '../repositories/';
import { LoanRepository } from '../repositories/LoanRepository';

export class LoanService {
  constructor(
    private userRepo: UserRepository,
    private loanRepo: LoanRepository
  ) {}

  async getUserLoans(userId: string) {
    return this.loanRepo.findByUserId(userId);
  }

  async applyForLoan(userId: string, principal: number, interestRate = 0.05) {
    if (principal <= 0) throw new Error('Invalid principal amount');
    return this.loanRepo.create({ userId, principal, interestRate, status: 'PENDING' });
  }

  async repayLoan(userId: string, loanId: string) {
    const loan = await this.loanRepo.findById(loanId);
    if (!loan || loan.userId.toString() !== userId) 
      throw new Error('Loan not found or not owned by user');
    if (loan.status !== 'APPROVED') 
      throw new Error('Loan is not approved or already repaid');

    // Calculate total due
    const totalDue = loan.principal + (loan.principal * loan.interestRate);

    const user = await this.userRepo.findById(userId);
    if (!user) throw new Error('User not found');
    if (user.balance < totalDue) throw new Error('Insufficient funds to repay loan');

    user.balance -= totalDue;
    await this.userRepo.save(user);

    loan.status = 'REPAID';
    await this.loanRepo.save(loan);

    return loan;
  }

  async approveLoan(loanId: string) {
    const loan = await this.loanRepo.findById(loanId);
    if (!loan) throw new Error('Loan not found');
    if (loan.status !== 'PENDING') throw new Error('Loan is not pending approval');

    loan.status = 'APPROVED';
    return this.loanRepo.save(loan);
  }

  async getAllLoansForAdmin() {
    return this.loanRepo.findAll();
  }
}
