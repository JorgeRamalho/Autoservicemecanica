import jwt from 'jsonwebtoken';
import { config } from '../config.js';
import type { UserRole } from '../types.js';

export interface JwtPayload {
  userId: string;
  role: UserRole;
}

export function signToken(payload: JwtPayload, rememberMe = false): { token: string; expiresAt: string } {
  const expiresIn = rememberMe ? '30d' : config.jwtExpiresIn;
  const token = jwt.sign(payload, config.jwtSecret, { expiresIn: expiresIn as jwt.SignOptions['expiresIn'] });
  const decoded = jwt.decode(token) as { exp?: number };
  const expiresAt = decoded?.exp
    ? new Date(decoded.exp * 1000).toISOString()
    : new Date(Date.now() + 7 * 86400000).toISOString();

  return { token, expiresAt };
}

export function verifyToken(token: string): JwtPayload {
  return jwt.verify(token, config.jwtSecret) as JwtPayload;
}
