import { Op } from 'sequelize';
import models from '../../database/models';

export const createMessage = async (req, res) => {
  try {
    const { body: { message, to }, token: { myNumber } } = req;
    const createdMessage = await models.Message.create({
      message, sender: myNumber, recepient: to, status: 'Delivered',
    });
    const newMessage = await models.Message.findOne({
      where: { id: createdMessage.id },
      include: [
        { model: models.Contact, as: 'from', attributes: ['name', 'number'] },
        { model: models.Contact, as: 'to', attributes: ['name', 'number'] },
      ],
    });
    res.status(200).json({ message: newMessage });
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const deleteSms = async (req, res) => {
  try {
    const didDelete = await models.Message.destroy({ where: { id: req.params.id } });
    if (didDelete) {
      return res.status(200).json({ message: 'You have successfully deleted this message.You cannot undo this operation' });
    }
    return res.status(404).json({
      message: 'Delete unsuccessful because of an error',
    });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

export const getMessages = async (req, res) => {
  try {
    const messages = await models.Message.findAll({
      include: [
        { model: models.Contact, as: 'from', attributes: ['name', 'number'] },
        { model: models.Contact, as: 'to', attributes: ['name', 'number'] },
      ],
    });
    res.status(200).json({ messages });
  } catch (error) {
    res.status(500).json({ error });
  }
};

const get = async ({ res, number }) => {
  try {
    const messages = await models.Message.findAll({
      where: {
        [Op.or]: [{ sender: number }, { recepient: number }],
      },
      include: [
        { model: models.Contact, as: 'from', attributes: ['name', 'number'] },
        { model: models.Contact, as: 'to', attributes: ['name', 'number'] },
      ],
    });
    res.status(200).json({ messages });
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const myMessages = async (req, res) => get({ res, number: req.token.myNumber });


export const getMessagePerContact = async (req, res) => get({ res, number: req.params.contact });

export const updateSms = async (req, res) => {
  try {
    const { params: { id }, body: { message } } = req;
    const [didUpdate] = await models.Message.update({ message }, { where: { id } });
    if (didUpdate) {
      const updated = await models.Message.findOne({
        where: { id },
        include: [
          { model: models.Contact, as: 'from', attributes: ['name', 'number'] },
          { model: models.Contact, as: 'to', attributes: ['name', 'number'] },
        ],
      });
      return res.status(200).json({
        message: updated,
      });
    }
    return res.status(400).json({
      error: 'an error occured',
    });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

export const getSingleSms = async (req, res) => {
  try {
    const { params: { id } } = req;
    const message = await models.Message.findOne({
      where: { id },
      include: [
        { model: models.Contact, as: 'from', attributes: ['name', 'number'] },
        { model: models.Contact, as: 'to', attributes: ['name', 'number'] },
      ],
    });
    if (message) {
      return res.status(200).json({ message });
    }
    return res.status(404).json({ message });
  } catch (error) {
    return res.status(500).json({ error });
  }
};
