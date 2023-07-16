import { SortOrder, Types } from 'mongoose';
import { IBook, IBookFilters } from './book.interface';
import { Book } from './book.model';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { bookSearchableFields } from './book.constant';
import { IGenericResponse } from '../../../interfaces/common';

const addBook = async (payload: IBook, id: Types.ObjectId): Promise<IBook> => {
  payload.user = id;
  const result = await Book.create(payload);

  return result;
};

const getAllBooks = async (
  filters: IBookFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IBook[]>> => {
  const { searchTerm, ...filtersData } = filters;
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const andConditions = [];
  if (searchTerm) {
    andConditions.push({
      $or: bookSearchableFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    });
  }
  if (Object.keys(filtersData).length) {
    if (filtersData.genre) {
      andConditions.push({
        genre: { $regex: new RegExp(`^${filtersData.genre}$`, 'i') },
      });
    }

    if (filtersData.publication_year) {
      andConditions.push({
        publication_date: {
          $regex: `.*${filtersData.publication_year}$`,
        },
      });
    }
  }

  const sortConditions: { [key: string]: SortOrder } = {};
  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }
  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {};

  const result = await Book.find(whereConditions)
    .populate('user')
    .populate('reviews.user')
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await Book.countDocuments(whereConditions);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

export const BookService = {
  addBook,
  getAllBooks,
};
