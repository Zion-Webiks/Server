import { Schema, model, Document } from 'mongoose';

export interface TransferDocument extends Document {
  fromUserId: string;
  toUserId: string;
  amount: number;
  createdAt: Date;
  updatedAt: Date;
}

const transferSchema = new Schema<TransferDocument>({
  fromUserId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  toUserId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  amount: { type: Number, required: true },
}, { timestamps: true });

export const Transfer = model<TransferDocument>('Transfer', transferSchema);
