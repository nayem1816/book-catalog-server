import express from 'express';
import { TestRoutes } from '../modules/Test/test.routes';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/',
    route: TestRoutes,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));
export default router;
