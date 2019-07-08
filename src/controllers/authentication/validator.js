import { Op } from 'sequelize';
import models from '../../database/models';

// eslint-disable-next-line no-useless-escape
const re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

export const validator = async (req, res, next) => {
  req
    .checkBody('name', 'name is required')
    .notEmpty()
    .ltrim();
  req
    .checkBody('phone', 'number is should be a 10 digit number')
    .isInt({
      min: 100000000,
      max: 999999999,
    })
    .notEmpty()
    .ltrim();
  req
    .checkBody('email', 'invalid email')
    .custom(email => re.test(email.toString().toLowerCase()));
  req
    .checkBody('password', 'password is required')
    .notEmpty()
    .ltrim();
  const validationErrors = req.validationErrors();
  const findFromDb = await models.User.findOne({
    where: {
      [Op.or]: [{ phone: req.body.phone }, { email: req.body.email }],
    },
  });
  const duplication = [];
  if (findFromDb) duplication.push({ param: 'email', message: 'phone and email must be unique' });
  const errors = duplication.concat(validationErrors || []);
  if (errors.length) {
    return res.status(422).json({ errors });
  }
  return next();
};

export const validateLogin = (req, res, next) => {
  const error = [];
  req
    .checkBody('password', 'password is required')
    .notEmpty()
    .ltrim();
  const { body: { email, phone, number } } = req;
  const loginType = email || phone || number;
  if (email) {
    req
      .checkBody('email', 'invalid email')
      .custom(e => re.test(e.toString().toLowerCase()));
  }
  if (phone) {
    req
      .checkBody('phone', 'number is should be a 10 digit number')
      .isInt({
        min: 100000000,
        max: 999999999,
      })
      .notEmpty()
      .ltrim();
  }
  if (number) {
    req
      .checkBody('number', 'number is should be a 10 digit number')
      .isInt({
        min: 100000000,
        max: 999999999,
      })
      .notEmpty()
      .ltrim();
  }
  if (!loginType) error.push({ param: 'number', message: 'please provide either of email or alternatively phone number as phone or number' });
  const validationErrors = req.validationErrors();
  const errors = error.concat(validationErrors || []);
  if (errors.length) {
    return res.status(422).json({ errors });
  }
  return next();
};
