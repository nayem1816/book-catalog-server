import { Schema, model } from 'mongoose';
import { BookModel, IBook } from './book.interface';

const bookSchema = new Schema<IBook, Record<string, unknown>>(
  {
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    genre: {
      type: String,
      required: true,
    },
    publication_date: {
      type: String,
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    reviews: {
      type: [
        {
          review_text: {
            type: String,
          },
          user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
          },
        },
      ],
    },
  },
  {
    timestamps: true,
  }
);

export const Book = model<IBook, BookModel>('Book', bookSchema);
