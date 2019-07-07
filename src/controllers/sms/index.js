import express from 'express';
import { createMessage, getMessages } from './smsController';
import { authenticate } from '../authentication/authenticate';
import { validateSms } from './smsValidator';

const messages = express.Router();

messages.get('/sms', authenticate, getMessages);
messages.post('/sms', authenticate, validateSms, createMessage);

export default messages;
