import jwt from 'jsonwebtoken';

export const authenticate = async (req, res, next) => {
  const { headers: { authorization }, headers } = req;
  if (!headers || !authorization) {
    return res.status(401)
      .json({
        success: false,
        errors: 'Please provide an authentication token',
      });
  }
  const { verify } = jwt;
  return verify(authorization, process.env.SECRET_KEY, (error, token) => {
    if (error) {
      return res.status(401).json({ success: false, errors: 'Token is invalid' });
    }
    req.token = token;
    return next();
  });
};

export const a = '';
