import { Schema, model, Document } from 'mongoose';

export interface TransactionDocument extends Document {
  userId: string;
  type: 'DEPOSIT' | 'WITHDRAW' | 'TRANSFER';
  amount: number;
  createdAt: Date;
  updatedAt: Date;
}

const transactionSchema = new Schema<TransactionDocument>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, enum: ['DEPOSIT', 'WITHDRAW', 'TRANSFER'], required: true },
  amount: { type: Number, required: true },
}, { timestamps: true });

export const Transaction = model<TransactionDocument>('Transaction', transactionSchema);
