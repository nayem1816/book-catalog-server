import { NextFunction, Request, Response } from 'express';
import sendResponse from '../../../shared/sendResponse';
import { AuthService } from './auth.service';
import httpStatus from 'http-status';
import { IUser } from '../user/user.interface';

const signupUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const payload = req.body;
    const result = await AuthService.signupUser(payload);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
    const { password, ...othersData } = JSON.parse(JSON.stringify(result));

    sendResponse<IUser>(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: 'User signup successfully',
      data: othersData,
    });
  } catch (error) {
    next(error);
  }
};

export const AuthController = {
  signupUser,
};
