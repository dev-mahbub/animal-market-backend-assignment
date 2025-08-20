import { Model } from 'mongoose';

export type IUserName = {
  firstName: string;
  middleName?: string;
  lastName: string;
};

export type ISeller = {
  id: string;
  name: IUserName;
  phoneNumber: string;
  address: string;
  budget: number;
  income: number;
};

export type ISellerModel = Model<ISeller, Record<string, unknown>>;
