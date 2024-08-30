import { Document } from "mongoose";
import { Products } from "./product";

type Role = 'manager' | 'admin' | 'user';

interface User extends Document {
    email: string;
    password: string;
    name: string;
    image: string;
    role: Role;
    active: boolean;
    passwordChangedAt: Date | number;
    resetCode: string | undefined;
    resetCodeExpireTime: Date | number | undefined;
    resetCodeVerify: boolean | undefined;
    wishlist:Products[]
  }

export default User;