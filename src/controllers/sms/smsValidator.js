import jwtDecode from 'jwt-decode';
import models from '../../database/models';

export const validateSms = async (req, res, next) => {
  const { headers: { authorization } } = req;
  const decode = jwtDecode(authorization);
  req.checkBody('to', 'recepient is required')
    .isInt({ min: 100000000, max: 999999999 });
  const validationErrors = req.validationErrors();
  const foundFromDb = await models.Contact.findOne({ where: { number: req.body.to } });
  const notFoundError = [];
  if (!foundFromDb) notFoundError.push({ param: 'to', message: 'the recepient is invalid' });
  const inValid = decode.myNumber === req.body.to;
  if (inValid) notFoundError.push({ param: 'to', message: 'the recepient is invalid' });
  const errors = notFoundError.concat(validationErrors || []);
  return errors.length ? res.status(422).json({ errors }) : next();
};
export const validateSmsToUpdate = async (req, res, next) => {
  const { token: { myNumber }, params: { id } } = req;
  const sms = await models.Message.findOne({ where: { id } });
  if (sms.sender.toString() !== myNumber.toString()) {
    return res.status(401).json({
      errors: [
        {
          message: 'you are not authorized to edit a contact you did not create',
        },
      ],
    });
  }
  return next();
};
