import { IUser } from './user.interface';
import config from '../../../config';
import mongoose from 'mongoose';
import ApiError from '../../../errors/ApiError';
import status from 'http-status';
import { generatedBuyerId, generatedSellerId } from './user.utils';
import { Seller } from '../seller/seller.model';
import { User } from './user.model';
import { ISeller } from '../seller/seller.interface';
import { IBuyer } from '../buyer/buyer.interface';
import { Buyer } from '../buyer/buyer.model';

const createSeller = async (seller: ISeller, user: IUser) => {
  user.role = 'seller';

  if (!user.password) {
    user.password = config.default_user_pass as string;
  }

  let newUserAllData = null;
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const id = await generatedSellerId();
    user.id = id;
    seller.id = id;

    const newSeller = await Seller.create([seller], { session });

    if (!newSeller.length) {
      throw new ApiError(status.BAD_REQUEST, 'Failed to create seller');
    }

    user.seller = newSeller[0]._id;

    const newUser = await User.create([user], { session });

    if (!newUser.length) {
      throw new ApiError(status.BAD_REQUEST, 'Failed to create user');
    }

    newUserAllData = newUser[0];

    await session.commitTransaction();
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    await session.endSession();
  }

  if (newUserAllData) {
    newUserAllData = await User.findOne({ id: newUserAllData.id }).populate({
      path: 'seller',
    });
  }

  return newUserAllData;
};

const createBuyer = async (buyer: IBuyer, user: IUser) => {
  user.role = 'buyer';

  if (!user.password) {
    user.password = config.default_user_pass as string;
  }

  let newUserAllData = null;
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const id = await generatedBuyerId();
    user.id = id;
    buyer.id = id;

    const newBuyer = await Buyer.create([buyer], { session });

    if (!newBuyer.length) {
      throw new ApiError(status.BAD_REQUEST, 'Failed to create buyer');
    }

    user.buyer = newBuyer[0]._id;

    const newUser = await User.create([user], { session });

    if (!newUser.length) {
      throw new ApiError(status.BAD_REQUEST, 'Failed to create user');
    }

    newUserAllData = newUser[0];

    await session.commitTransaction();
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    await session.endSession();
  }

  if (newUserAllData) {
    newUserAllData = await User.findOne({ id: newUserAllData.id }).populate(
      'buyer',
    );
  }

  return newUserAllData;
};

export const UserService = {
  createSeller,
  createBuyer,
};
