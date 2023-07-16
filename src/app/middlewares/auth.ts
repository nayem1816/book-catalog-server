import { NextFunction, Request, Response } from 'express';
import { jwtHelper } from '../../helpers/jwtHelper';
import config from '../../config';
import { Secret } from 'jsonwebtoken';
import httpStatus from 'http-status';
import ApiError from '../../errors/ApiError';

const auth = () => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization;

      if (!token) {
        throw new ApiError(httpStatus.UNAUTHORIZED, 'Token is required');
      }

      const verifyUser = jwtHelper.verifyToken(
        token as string,
        config.jwt.secret as Secret
      );

      if (!verifyUser) {
        throw new ApiError(httpStatus.UNAUTHORIZED, 'Token is invalid');
      }

      req.user = verifyUser;

      next();
    } catch (error) {
      next(error);
    }
  };
};

export default auth;
