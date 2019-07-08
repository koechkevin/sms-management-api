import express from 'express';
import {
  createContact, deleteContact, getAllContacts, getSingleContact, updateContact,
} from './contactsController';
import { validateNewContact, validateContactToUpdate } from './contactsValidator';
import { authenticate } from '../authentication/authenticate';

const contactsRouter = express.Router();

contactsRouter.get('/contacts', authenticate, getAllContacts);
contactsRouter.delete('/contacts/:number', authenticate, deleteContact);
contactsRouter.put('/contacts/:number', authenticate, validateContactToUpdate, updateContact);
contactsRouter.get('/contacts/:number', authenticate, getSingleContact, validateNewContact, createContact);
contactsRouter.post('/contacts', authenticate, validateNewContact, createContact);

export default contactsRouter;
