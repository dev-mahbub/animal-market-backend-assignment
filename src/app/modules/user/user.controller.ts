import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import { UserService } from './user.service';
import sendResponse from '../../../shared/sendResponse';
import status from 'http-status';

const createSeller = catchAsync(async (req: Request, res: Response) => {
  const { seller, ...userData } = req.body;
  const result = await UserService.createSeller(seller, userData);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Seller created successfully',
    data: result,
  });
});
const createBuyer = catchAsync(async (req: Request, res: Response) => {
  const { buyer, ...userData } = req.body;
  const result = await UserService.createBuyer(buyer, userData);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Buyer created successfully',
    data: result,
  });
});

export const UserController = {
  createSeller,
  createBuyer,
};
