import { NextFunction, Request, Response } from 'express';
import sendResponse from '../../../shared/sendResponse';
import { AuthService } from './auth.service';
import httpStatus from 'http-status';
import { IUser } from '../user/user.interface';
import { ILoginResponse } from './auth.interface';
import config from '../../../config';

const signupUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await AuthService.signupUser(req.body);

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

const loginUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await AuthService.loginUser(req.body);

    // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
    const { refreshToken, ...othersToken } = result;

    const cookieOptions = {
      secure: config.env === 'production' ? true : false,
      httpOnly: true,
    };

    res.cookie('refreshToken', refreshToken, cookieOptions);

    sendResponse<ILoginResponse>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'User login successfully',
      data: othersToken,
    });
  } catch (error) {
    next(error);
  }
};

export const AuthController = {
  signupUser,
  loginUser,
};
