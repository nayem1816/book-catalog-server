/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';

export type IUser = {
  name?: string;
  email: string;
  password: string;
};

export type IUserMethods = {
  isPasswordMatch: (
    givenPassword: string,
    hashPassword: string
  ) => Promise<boolean>;
};

export type UserModel = Model<IUser, Record<string, unknown>, IUserMethods>;
