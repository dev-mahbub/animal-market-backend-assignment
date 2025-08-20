import { Model } from 'mongoose';

export type IUserName = {
  firstName: string;
  middleName?: string;
  lastName: string;
};

export type IBuyer = {
  id: string;
  name: IUserName;
  phoneNumber: string;
  address: string;
  budget: number;
  income: number;
};

export type IBuyerModel = Model<IBuyer, Record<string, unknown>>;
