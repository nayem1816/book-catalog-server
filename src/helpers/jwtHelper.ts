import jwt, { JwtPayload, Secret } from 'jsonwebtoken';

const createToken = (
  payload: Record<string, unknown>,
  secretKey: Secret,
  expireTime: string
): string => {
  const token = jwt.sign(payload, secretKey, {
    expiresIn: expireTime,
  });

  return token;
};

const verifyToken = (refreshToken: string, secretKey: Secret): JwtPayload => {
  const verifiedToken = jwt.verify(refreshToken, secretKey);

  return verifiedToken as JwtPayload;
};

export const jwtHelper = {
  createToken,
  verifyToken,
};
