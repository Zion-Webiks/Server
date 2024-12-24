export interface CreateTransferDto {
    toUserId: string;
    amount: number;
  }
  
  export interface TransferResponseDto {
    _id: string;
    fromUserId: string;
    toUserId: string;
    amount: number;
    createdAt: Date;
    updatedAt: Date;
  }
  