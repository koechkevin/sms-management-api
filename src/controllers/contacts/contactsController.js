import crypt from 'bcrypt';
import { Op } from 'sequelize';
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

export const deleteContact = async (req, res) => {
  try {
    const { token: { myNumber } } = req;
    const contact = await models.Contact.findOne({ where: { number: myNumber } });
    if (!contact) {
      return res.status(404).json({ message: 'Contact is already deleted please register again' });
    }
    if (contact) {
      await models.Message.destroy(
        { where: { [Op.or]: [{ sender: myNumber }, { recepient: myNumber }] } },
      );
      await models.Contact.destroy({ where: { number: myNumber } });
    }
    return res.status(200).json({ message: 'You have successfully deleted your account and the associated messages' });
  } catch (error) {
    return res.status(500).json({ error });
  }
};
