import express from 'express';
import { AuthController } from './auth.controller';
import validateRequest from '../../middlewares/validateRequest';
import { AuthValidation } from './auth.validation';

const route = express.Router();

route.post(
  '/signup',
  validateRequest(AuthValidation.SignupZodSchema),
  AuthController.signupUser
);

export const AuthRoute = route;
