import crypt from 'bcrypt';
import models from '../../database/models';

export const getAllContacts = async (req, res) => {
  res
    .status(200)
    .json({ message: 'get all contacts was successful' });
};

export const createContact = async (req, res) => {
  try {
    const { body: { number, name, password } } = req;
    const encryptedPassword = await crypt.hashSync(password.toString() || 'password', crypt.genSaltSync(10));
    const newContact = await models.Contact.create({ number, name, password: encryptedPassword });
    res.status(200).json({ contact: newContact });
  } catch (error) {
    res.status(500).json({ error });
  }
};
