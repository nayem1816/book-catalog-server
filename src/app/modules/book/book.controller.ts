import { NextFunction, Request, Response } from 'express';
import sendResponse from '../../../shared/sendResponse';
import { IBook } from './book.interface';
import httpStatus from 'http-status';
import { BookService } from './book.service';
import { JwtPayload } from 'jsonwebtoken';
import pick from '../../../shared/pick';
import { bookFilterableFields } from './book.constant';
import { paginationFields } from '../../../constants/pagination';

const addBook = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { _id } = req.user as JwtPayload;
    const result = await BookService.addBook(req.body, _id);

    sendResponse<IBook>(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: 'Book added successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getAllBooks = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const filters = pick(req.query, bookFilterableFields);
    const paginationOptions = pick(req.query, paginationFields);

    const result = await BookService.getAllBooks(filters, paginationOptions);

    sendResponse<IBook[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Books fetched successfully',
      meta: result.meta,
      data: result.data,
    });
  } catch (error) {
    next(error);
  }
};

export const BookController = {
  addBook,
  getAllBooks,
};
