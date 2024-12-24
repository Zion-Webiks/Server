export interface CreateTransactionDto {
    amount: number;
    // For deposits and withdrawals, 'type' might be optional if inferred by the endpoint.
    // For a general endpoint that handles multiple types, you may add:
    // type?: 'DEPOSIT' | 'WITHDRAW' | 'TRANSFER';
  }
  
  export interface TransactionResponseDto {
    _id: string;
    userId: string;
    type: 'DEPOSIT' | 'WITHDRAW' | 'TRANSFER';
    amount: number;
    createdAt: Date;
    updatedAt: Date;
  }
  