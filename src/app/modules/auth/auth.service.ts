import { IUser } from '../user/user.interface';
import { User } from '../user/user.model';

const signupUser = async (payload: IUser): Promise<IUser> => {
  const user = await User.create(payload);

  return user;
};

export const AuthService = {
  signupUser,
};
