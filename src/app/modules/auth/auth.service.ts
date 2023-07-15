import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { IUser } from '../user/user.interface';
import { User } from '../user/user.model';
import { ILoginResponse, ILoginUser } from './auth.interface';
import { jwtHelper } from '../../../helpers/jwtHelper';
import config from '../../../config';
import { Secret } from 'jsonwebtoken';

const signupUser = async (payload: IUser): Promise<IUser> => {
  const user = await User.create(payload);

  return user;
};

const loginUser = async (payload: ILoginUser): Promise<ILoginResponse> => {
  const user = new User();

  const isUserExist = await User.findOne(
    { email: payload.email },
    { _id: 1, email: 1, password: 1 }
  );

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }

  const isPasswordMatch = await user.isPasswordMatch(
    payload.password,
    isUserExist.password
  );

  if (!isPasswordMatch) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Incorrect password');
  }

  const { _id, password, email } = isUserExist;

  const accessToken = jwtHelper.createToken(
    { _id, email, password },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

  const refreshToken = jwtHelper.createToken(
    { _id, email, password },
    config.jwt.refresh_secret as Secret,
    config.jwt.refresh_expires_in as string
  );

  return { accessToken, refreshToken };
};

export const AuthService = {
  signupUser,
  loginUser,
};
