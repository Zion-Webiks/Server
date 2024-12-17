import { Loan, LoanDocument } from '../models/Loan';

export class LoanRepository {
  async findByUserId(userId: string): Promise<LoanDocument[]> {
    return Loan.find({ userId }).sort({ createdAt: -1 });
  }

  async findById(id: string): Promise<LoanDocument | null> {
    return Loan.findById(id);
  }

  async create(data: Partial<LoanDocument>): Promise<LoanDocument> {
    return Loan.create(data);
  }

  async save(loan: LoanDocument): Promise<LoanDocument> {
    return loan.save();
  }

  async findAll(): Promise<LoanDocument[]> {
    return Loan.find({}).sort({ createdAt: -1 });
  }
}
