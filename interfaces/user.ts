import { Document } from "mongoose";

type Role = 'manager' | 'admin' | 'user';

interface User extends Document {
    email: string;
    password: string;
    name: string;
    image: string;
    role: Role;
    active: boolean;
    passwordChangedAt: Date | number;
    resetCode: string;
    resetCodeExpireTime: Date | number;
    resetCodeVerify: boolean
  }

export default User;