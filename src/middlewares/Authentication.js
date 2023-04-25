import jwt from 'jsonwebtoken';

const SECRET = 'adsf2a1555fafFDAFAGAG53G5156AG48A4G68S3F58FA84!@#!@%%%$¨%&&¨%$';

class Authentication {
  verifyToken(req, res, next) {
    const token = req.headers.authentication;

    jwt.verify(token, SECRET, (error) => {
      if (error) {
        return res.status(401).json({ msg: `Token invalid!` });
      }

      return next();
    });
  }
}

export default new Authentication().verifyToken;
