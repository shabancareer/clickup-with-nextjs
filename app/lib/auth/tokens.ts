import jwt from 'jsonwebtoken'
import { JWT_CONFIG } from './config'

export interface JWTPayload {
    userId: string
    email: string
    role: string
    sessionId: string
}

export class TokenService {
    // Generate JWT Token
    static generateToken(payload: Omit<JWTPayload, 'iat' | 'exp'>): string {
        return jwt.sign(payload, JWT_CONFIG.secret, {
            expiresIn: JWT_CONFIG.expiresIn,
        })
    }

    // Generate Refresh Token
    static generateRefreshToken(userId: string, sessionId: string): string {
        return jwt.sign({ userId, sessionId }, JWT_CONFIG.refreshSecret, {
            expiresIn: JWT_CONFIG.refreshExpiresIn,
        })
    }

    // Verify JWT Token
    static verifyToken(token: string): JWTPayload | null {
        try {
            return jwt.verify(token, JWT_CONFIG.secret) as JWTPayload
        } catch {
            return null
        }
    }

    // Verify Refresh Token
    static verifyRefreshToken(token: string): { userId: string; sessionId: string } | null {
        try {
            return jwt.verify(token, JWT_CONFIG.refreshSecret) as { userId: string; sessionId: string }
        } catch {
            return null
        }
    }

    // Decode token without verification
    static decodeToken(token: string): any {
        return jwt.decode(token)
    }
}