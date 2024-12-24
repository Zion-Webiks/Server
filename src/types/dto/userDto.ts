export interface NewUser {
    userName: string;
    password: string;
    email: string;
    phone?: string;
    address?: string;
    isAdmin?: boolean;
    balance:number;
  }
  
  export interface LoginDto {
    email: string;
    password: string;
  }
  
  export interface UserResponseDto {
    _id: string;
    userName: string;
    email: string;
    phone?: string;
    address?: string;
    isAdmin: boolean;
    createdAt?: Date;
    updatedAt?: Date;
  }
  