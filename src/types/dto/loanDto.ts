export interface ApplyLoanDto {
    principal: number;
    interestRate?: number;
  }
  
  export interface LoanResponseDto {
    _id: string;
    userId: string;
    principal: number;
    interestRate: number;
    status: 'PENDING' | 'APPROVED' | 'REPAID';
    createdAt: Date;
    updatedAt: Date;
  }
  