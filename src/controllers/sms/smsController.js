import { Op } from 'sequelize';
import jwtDecode from 'jwt-decode';
import models from '../../database/models';

export const createMessage = async (req, res) => {
  try {
    const { body: { message, to }, headers: { authorization } } = req;
    const decode = jwtDecode(authorization);
    const createdMessage = await models.Message.create({
      message, sender: decode.myNumber, recepient: to, status: 'Delivered',
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

export const getMessages = async (req, res) => {
  try {
    const { headers: { authorization } } = req;
    const decode = jwtDecode(authorization);
    const allMessages = await models.Message.findAll({
      where: {
        [Op.or]: [{ sender: decode.myNumber }, { recepient: decode.myNumber }],
      },
      include: [
        { model: models.Contact, as: 'from', attributes: ['name', 'number'] },
        { model: models.Contact, as: 'to', attributes: ['name', 'number'] },
      ],
    });
    res.status(200).json({ message: allMessages });
  } catch (error) {
    res.status(500).json({ error });
  }
};