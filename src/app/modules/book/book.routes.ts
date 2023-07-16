import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { BookValidation } from './book.validation';
import { BookController } from './book.controller';
import auth from '../../middlewares/auth';

const route = express.Router();

route.post(
  '/add-book',
  validateRequest(BookValidation.addBookZodSchema),
  auth(),
  BookController.addBook
);
route.get('/:id', BookController.getSingleBook);
route.get('/', BookController.getAllBooks);

export const BookRoute = route;
