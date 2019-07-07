import express from 'express';
import { createContact, getAllContacts } from './contactsController';
import { validateNewContact } from './contactsValidator';
import { authenticate } from '../authentication/authenticate';

const contactsRouter = express.Router();

contactsRouter.get('/contacts', authenticate, getAllContacts);
contactsRouter.post('/contacts', validateNewContact, createContact);

export default contactsRouter;
