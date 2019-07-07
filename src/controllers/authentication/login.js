import jwt from 'jsonwebtoken';
import crypt from 'bcrypt';
import models from '../../database/models';

export const login = async (req, res) => {
  const { SECRET_KEY } = process.env;
  const { body: { number, password } } = req;
  const contact = await models.Contact.findOne({
    where: { number },
  });
  if (!contact) {
    return res.status(404).json({ message: 'Number not found' });
  }
  if (contact && crypt.compareSync(password, contact.password)) {
    return res.status(200).json({
      message: 'success',
      token: jwt.sign({
        id: contact.id, myNumber: contact.number, name: contact.name,
      }, SECRET_KEY, { expiresIn: '12h' }),
    });
  }
  return res.status(401).json({
    message: 'failed',
    error: 'invalid credentials',
  });
};

export const a = '';
