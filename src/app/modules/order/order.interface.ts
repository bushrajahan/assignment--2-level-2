import { Types } from 'mongoose';

export type Order = {
  email: string;
  productId: Types.ObjectId;
  price: number;
  quantity: number;
  createdAt?: Date;
};
