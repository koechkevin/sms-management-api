import { Op } from 'sequelize';
import models from '../../database/models';

export const getAllContacts = async (req, res) => {
  try {
    const contacts = await models.Contact.findAll({
      include: [{ model: models.User, as: 'user', attributes: ['name', 'phone', 'email'] }],
    });
    res.status(200).json({ contacts });
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const createContact = async (req, res) => {
  try {
    const { body: { number, name, phone }, token: { myNumber: createdBy } } = req;
    const phoneOrNumber = number || phone;
    const newContact = await models.Contact.create({ number: phoneOrNumber, name, createdBy });
    const createdContact = await models.Contact.findOne({
      where: { number: newContact.number },
      include: [{ model: models.User, as: 'user', attributes: ['name', 'phone', 'email'] }],
    });
    res.status(200).json({ contact: createdContact });
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const getSingleContact = async (req, res) => {
  try {
    const contact = await models.Contact.findOne({
      where: { number: req.params.number },
      include: [{ model: models.User, as: 'user', attributes: ['name', 'phone', 'email'] }],
    });
    if (!contact) {
      return res.status(404).json({
        errors: [{
          msg: 'Contact not found',
        }],
      });
    }
    return res.status(200).json({ contact });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

export const updateContact = async (req, res) => {
  try {
    const [updated, updatedContact] = await models.Contact.update(req.body, {
      returning: true, where: { number: req.params.number },
    });
    return res.status(200).json({
      updatedContact: updatedContact[0],
    });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

export const deleteContact = async (req, res) => {
  try {
    const contact = await models.Contact.findOne({ where: { number: req.params.number } });
    if (!contact) {
      return res.status(404).json({ message: 'Contact is already deleted' });
    }
    if (contact) {
      await models.Message.update({ recepient: null }, { where: { recepient: req.params.number } });
      await models.Message.destroy(
        { where: { [Op.or]: [{ sender: req.params.number }, { recepient: req.params.number }] } },
      );
      await models.Contact.destroy({ where: { number: req.params.number } });
    }
    return res.status(200).json({ message: 'You have successfully deleted your account and the associated messages' });
  } catch (error) {
    return res.status(500).json({ error });
  }
};
