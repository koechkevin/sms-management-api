import express from 'express';
import { login } from './login';

const authRouter = express.Router();

authRouter.post('/auth/login', login);

export default authRouter;
