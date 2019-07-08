import express from 'express';
import {
  createMessage, getMessages, getSingleSms, updateSms, deleteSms, myMessages, getMessagePerContact,
} from './smsController';
import { authenticate } from '../authentication/authenticate';
import { validateSms, validateSmsToUpdate } from './smsValidator';

const messages = express.Router();

messages.post('/sms', authenticate, validateSms, createMessage);
messages.get('/sms', authenticate, getMessages);
messages.get('/personal/sms', authenticate, myMessages);
messages.get('/sms/contact/:contact', authenticate, getMessagePerContact);
messages.get('/sms/:id', authenticate, getSingleSms);
messages.put('/sms/:id', authenticate, validateSmsToUpdate, updateSms);
messages.delete('/sms/:id', authenticate, validateSmsToUpdate, deleteSms);

export default messages;
