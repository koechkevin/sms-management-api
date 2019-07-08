import models from '../../database/models';

export const validateNewContact = async (req, res, next) => {
  req
    .checkBody('name', 'name is required')
    .notEmpty()
    .ltrim();
  if (req.body.phone) req.body.number = req.body.phone;
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
  const userInDb = await models.User.findOne({
    where: {
      phone: req.token.myNumber,
    },
  });
  const duplication = [];
  if (findFromDb) duplication.push({ param: 'number', message: 'number already used' });
  if (!userInDb) duplication.push({ param: 'number', message: 'please logout and login again to clear this error' });
  const errors = duplication.concat(validationErrors || []);
  if (errors.length) {
    return res.status(422).json({ errors });
  }
  return next();
};

export const validateContactToUpdate = async (req, res, next) => {
  const contact = await models.Contact.findOne({ where: { number: req.params.number } });
  if (!contact) return res.status(404).json({ message: 'Contact not found' });
  if (req.body.phone) req.body.number = req.body.phone;
  const duplication = [];
  if (req.body.number && req.body.number.toString() !== req.params.number.toString()) {
    req
      .checkBody('number', 'number is should be a 10 digit number')
      .isInt({
        min: 100000000,
        max: 999999999,
      })
      .notEmpty()
      .ltrim();
    const findFromDb = await models.Contact.findOne({
      where: {
        number: req.body.number,
      },
    });
    if (findFromDb) duplication.push({ param: 'number', message: 'number already used' });
  }
  if (req.body.name) {
    req
      .checkBody('name', 'name is required')
      .notEmpty()
      .ltrim();
  }
  if (req.body.createdBy) {
    delete req.body.createdBy;
  }
  const validationErrors = req.validationErrors();
  const errors = duplication.concat(validationErrors || []);
  if (errors.length) {
    return res.status(422).json({ errors });
  }
  return next();
};
