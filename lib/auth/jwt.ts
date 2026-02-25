// lib/auth/jwt.ts
import jwt, { SignOptions } from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error('JWT_SECRET is not set in environment variables');
}

const SECRET: string = JWT_SECRET;

export interface JwtPayload {
  userId: string;
  email: string;
  name: string;
}

export function signAuthToken(payload: JwtPayload, expiresIn: SignOptions['expiresIn'] = '7d'): string {
  const options: SignOptions = { expiresIn };
  return jwt.sign(payload, SECRET, options);
}

export function verifyAuthToken<T extends object = JwtPayload>(token: string): T {
  const decoded = jwt.verify(token, SECRET);
  return decoded as T;
}