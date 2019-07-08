import express from 'express';
import { login, register } from './login';
import { validateLogin, validator } from './validator';

const authRouter = express.Router();

authRouter.post('/auth/register', validator, register);
authRouter.post('/auth/login', validateLogin, login);

export default authRouter;
