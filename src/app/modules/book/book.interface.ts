import { Model, Types } from 'mongoose';
import { IUser } from '../user/user.interface';

export type IBook = {
  title: string;
  author: string;
  genre: string;
  publication_date: string;
  user: Types.ObjectId | IUser;
  reviews: [
    {
      review_text: string;
      user: Types.ObjectId | IUser;
    }
  ];
};

export type BookModel = Model<IBook>;

export type IBookFilters = {
  searchTerm?: string;
  genre?: string;
  publication_year?: string;
};
