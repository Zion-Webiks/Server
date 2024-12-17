import { Schema, model, Document } from 'mongoose';

export interface LoanDocument extends Document {
  userId: string;
  principal: number;
  interestRate: number;
  status: 'PENDING' | 'APPROVED' | 'REPAID';
  createdAt: Date;
  updatedAt: Date;
}

const loanSchema = new Schema<LoanDocument>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  principal: { type: Number, required: true },
  interestRate: { type: Number, default: 0.05 },
  status: { type: String, enum: ['PENDING', 'APPROVED', 'REPAID'], default: 'PENDING' }
}, { timestamps: true });

export const Loan = model<LoanDocument>('Loan', loanSchema);
