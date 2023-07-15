import { Schema, model } from 'mongoose';
import { IUser, UserModel } from './user.interface';
import bcrypt from 'bcrypt';
import config from '../../../config';

const UserSchema = new Schema<IUser, Record<string, unknown>>({
  name: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, select: false },
});

UserSchema.pre('save', async function (next) {
  const hashPassword = await bcrypt.hash(
    this.password,
    Number(config.bcrypt_salt_rounds)
  );

  this.password = hashPassword;

  next();
});

export const User = model<IUser, UserModel>('User', UserSchema);
