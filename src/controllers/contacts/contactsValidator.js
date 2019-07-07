import models from '../../database/models';

export const validateNewContact = async (req, res, next) => {
  req
    .checkBody('name', 'name is required')
    .notEmpty()
    .ltrim();
  req
    .checkBody('number', 'number is should be a 10 digit number')
    .isInt({
      min: 100000000,
      max: 999999999,
    })
    .notEmpty()
    .ltrim();
  const validationErrors = req.validationErrors();
  const findFromDb = await models.Contact.findOne({
    where: {
      number: req.body.number,
    },
  });
  const duplication = [];
  if (findFromDb) duplication.push({ param: 'number', message: 'number already used' });
  const errors = duplication.concat(validationErrors || []);
  if (errors.length) {
    return res.status(422).json({ errors });
  }
  return next();
};

export const a = '';
