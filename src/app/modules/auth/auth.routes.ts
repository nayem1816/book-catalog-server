import express from 'express';
import { AuthController } from './auth.controller';
import validateRequest from '../../middlewares/validateRequest';
import { AuthValidation } from './auth.validation';

const route = express.Router();

route.post(
  '/signup',
  validateRequest(AuthValidation.signupZodSchema),
  AuthController.signupUser
);
route.post(
  '/login',
  validateRequest(AuthValidation.loginZodSchema),
  AuthController.loginUser
);

export const AuthRoute = route;
