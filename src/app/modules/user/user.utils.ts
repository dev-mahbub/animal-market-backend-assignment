import { User } from './user.model';

const lastSellerId = async (): Promise<string | undefined> => {
  const lastSeller = await User.findOne({ role: 'seller' }, { id: 1, _id: 0 })
    .sort({ createdAt: 'asc' })
    .lean();

  return lastSeller?.id ? lastSeller.id.substring(2) : undefined;
};

export const generatedSellerId = async (): Promise<string> => {
  const currentId = (await lastSellerId()) || (0).toString().padStart(5, '0');
  let increamentedId = (parseInt(currentId) + 1).toString().padStart(5, '0');
  increamentedId = `S-${increamentedId}`;

  return increamentedId;
};

const lastBuyerId = async (): Promise<string | undefined> => {
  const lastBuyer = await User.findOne({ role: 'buyer' }, { id: 1, _id: 0 })
    .sort({ createdAt: 'asc' })
    .lean();

  return lastBuyer?.id ? lastBuyer.id.substring(2) : undefined;
};

export const generatedBuyerId = async (): Promise<string> => {
  const currentId = (await lastBuyerId()) || (0).toString().padStart(5, '0');
  let increamentedId = (parseInt(currentId) + 1).toString().padStart(5, '0');

  increamentedId = `B-${increamentedId}`;
  return increamentedId;
};
