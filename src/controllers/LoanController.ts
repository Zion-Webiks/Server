import { Request, Response } from 'express';
import { LoanService } from '../services/LoanService';
import { UserRepository } from '../repositories/UserRepository';
import { LoanRepository } from '../repositories/LoanRepository';

const userRepo = new UserRepository();
const loanRepo = new LoanRepository();
const loanService = new LoanService(userRepo, loanRepo);

export class LoanController {
  static async getAll(req: Request, res: Response) {
    try {
      const userId = req.userId!;
      const loans = await loanService.getUserLoans(userId);
      res.json(loans);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  static async apply(req: Request, res: Response) {
    try {
      const userId = req.userId!;
      const { principal, interestRate } = req.body;
      const loan = await loanService.applyForLoan(userId, principal, interestRate);
      res.status(201).json(loan);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  static async repay(req: Request, res: Response) {
    try {
      const userId = req.userId!;
      const { id } = req.params;
      const loan = await loanService.repayLoan(userId, id);
      res.json({ message: 'Loan repaid successfully', loan });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  static async getAllLoansForAllUsers(req: Request, res: Response) {
    try {
      const loans = await loanService.getAllLoansForAdmin();
      res.json(loans);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  static async approve(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const loan = await loanService.approveLoan(id);
      res.json(loan);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
}
