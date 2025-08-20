import { model, Schema } from 'mongoose';
import { IUser, IUserModel } from './user.interface';

const userSchema = new Schema<IUser, IUserModel>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    role: {
      type: String,
      enum: ['seller', 'buyer'],
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    seller: {
      type: Schema.Types.ObjectId,
      ref: 'Seller',
    },
    buyer: {
      type: Schema.Types.ObjectId,
      ref: 'Buyer',
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
);

export const User = model<IUser, IUserModel>('User', userSchema);
