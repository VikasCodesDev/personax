import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error('JWT_SECRET is not set in environment variables');
}

export interface JwtPayload {
  userId: string;
  email: string;
  name: string;
}

export function signAuthToken(payload: JwtPayload, expiresIn: string | number = '7d'): string {
  return jwt.sign(payload, JWT_SECRET as string, { expiresIn });
}

export function verifyAuthToken<T extends object = JwtPayload>(token: string): T {
  return jwt.verify(token, JWT_SECRET as string) as T;
}