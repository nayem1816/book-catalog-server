import { Schema, model } from 'mongoose';
import { IUser, IUserMethods, UserModel } from './user.interface';
import bcrypt from 'bcrypt';
import config from '../../../config';

const UserSchema = new Schema<IUser, Record<string, unknown>, IUserMethods>(
  {
    name: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: false },
  },
  {
    timestamps: true,
  }
);

UserSchema.methods.isPasswordMatch = async function (
  givenPassword: string,
  hashPassword: string
): Promise<boolean> {
  const isMatch = await bcrypt.compare(givenPassword, hashPassword);

  return isMatch;
};
UserSchema.pre('save', async function (next) {
  const hashPassword = await bcrypt.hash(
    this.password,
    Number(config.bcrypt_salt_rounds)
  );

  this.password = hashPassword;

  next();
});

export const User = model<IUser, UserModel>('User', UserSchema);
