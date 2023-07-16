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
route.patch(
  '/:id',
  validateRequest(BookValidation.updateBookZodSchema),
  auth(),
  BookController.updateBook
);
route.delete('/:id', auth(), BookController.deleteBook);

export const BookRoute = route;
