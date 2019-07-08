import jwt from 'jsonwebtoken';
import crypt from 'bcrypt';
import models from '../../database/models';

export const login = async (req, res) => {
  const { SECRET_KEY } = process.env;
  const {
    body: {
      number, password, phone, email,
    },
  } = req;
  const n = number ? { phone: number } : undefined;
  const p = phone ? { phone } : undefined;
  const e = email ? { email } : undefined;
  const where = n || p || e;
  const contact = await models.User.findOne({
    where,
  });
  if (!contact) {
    return res.status(404).json({ message: 'Number not found' });
  }
  if (contact && crypt.compareSync(password, contact.password)) {
    return res.status(200).json({
      message: 'success',
      token: jwt.sign({
        id: contact.id, myNumber: contact.phone, name: contact.name, email: contact.email,
      }, SECRET_KEY, { expiresIn: '12h' }),
    });
  }
  return res.status(401).json({
    message: 'failed',
    error: 'invalid credentials',
  });
};

export const register = async (req, res) => {
  try {
    const {
      body: {
        name, phone, email, password,
      },
    } = req;
    const encryptedPassword = await crypt.hashSync(password.toString() || 'password', crypt.genSaltSync(10));
    const newUser = await models.User.create({
      name, phone, email, password: encryptedPassword,
    });
    const alreadyInContacts = await models.Contact.findOne({
      where: {
        number: phone,
      },
    });
    if (!alreadyInContacts) {
      await models.Contact.create({
        number: phone, name, createdBy: phone,
      });
    }
    res.status(201).json({ user: newUser });
  } catch (error) {
    res.status(500).json({ error });
  }
};
