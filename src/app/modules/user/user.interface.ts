import { Model, Types } from 'mongoose';
import { ISeller } from '../seller/seller.interface';
import { IBuyer } from '../buyer/buyer.interface';

export type IUser = {
  id: string;
  role: string;
  password: string;
  seller?: Types.ObjectId | ISeller;
  buyer?: Types.ObjectId | IBuyer;
};

export type IUserModel = Model<IUser, Record<string, unknown>>;
