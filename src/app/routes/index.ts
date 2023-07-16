import express from 'express';
import { AuthRoute } from '../modules/auth/auth.routes';
import { BookRoute } from '../modules/book/book.routes';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/auth',
    route: AuthRoute,
  },
  {
    path: '/books',
    route: BookRoute,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));
export default router;
