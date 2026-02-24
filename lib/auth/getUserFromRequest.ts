import { NextRequest } from 'next/server';
import { verifyAuthToken, JwtPayload } from '@/lib/auth/jwt';

export interface AuthenticatedUser extends JwtPayload {}

export function extractTokenFromRequest(request: NextRequest): string | null {
  const authHeader = request.headers.get('authorization') || request.headers.get('Authorization');

  if (authHeader && authHeader.startsWith('Bearer ')) {
    return authHeader.substring(7);
  }

  const cookieHeader = request.headers.get('cookie') || request.headers.get('Cookie');
  if (cookieHeader) {
    const cookies = cookieHeader.split(';').map((c) => c.trim());
    const tokenCookie = cookies.find((c) => c.startsWith('personax_token='));
    if (tokenCookie) {
      return decodeURIComponent(tokenCookie.split('=')[1]);
    }
  }

  return null;
}

export function getUserFromRequest(request: NextRequest): AuthenticatedUser | null {
  const token = extractTokenFromRequest(request);
  if (!token) return null;

  try {
    const payload = verifyAuthToken(token);
    return payload as AuthenticatedUser;
  } catch {
    return null;
  }
}

