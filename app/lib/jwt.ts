import jwt, { JwtPayload, SignOptions } from 'jsonwebtoken'

const ACCESS_SECRET = process.env.JWT_ACCESS_SECRET!
const REFRESH_SECRET = process.env.JWT_REFRESH_SECRET!
const ACCESS_EXPIRY = process.env.JWT_ACCESS_EXPIRY as SignOptions["expiresIn"];
const REFRESH_EXPIRY = process.env.JWT_REFRESH_EXPIRY as SignOptions["expiresIn"];

export interface AccessTokenPayload extends JwtPayload {
    userId: string
    email: string
    type: 'access'
}

export interface RefreshTokenPayload extends JwtPayload {
    userId: string
    tokenId: string
    type: 'refresh'
}

export type TokenPayload = AccessTokenPayload | RefreshTokenPayload

export class TokenService {
    // Generate Access Token
    static generateAccessToken(payload: Omit<AccessTokenPayload, 'type' | 'exp' | 'iat'>): string | number {
        const options: SignOptions = {
            expiresIn: ACCESS_EXPIRY,
            issuer: 'next-auth-app',
            audience: ['web']
        }

        return jwt.sign(
            { ...payload, type: 'access' },
            ACCESS_SECRET,
            options
        )
    }

    // Generate Refresh Token
    static generateRefreshToken(payload: Omit<RefreshTokenPayload, 'type' | 'exp' | 'iat'>): string | number {
        const options: SignOptions = {
            expiresIn: REFRESH_EXPIRY,
            issuer: 'next-auth-app',
            audience: ['web']
        }

        return jwt.sign(
            { ...payload, type: 'refresh' },
            REFRESH_SECRET,
            options
        )
    }

    // Verify Access Token
    static verifyAccessToken(token: string): AccessTokenPayload | null {
        try {
            const payload = jwt.verify(token, ACCESS_SECRET, {
                issuer: 'next-auth-app',
                audience: 'web'
            }) as AccessTokenPayload

            if (payload.type !== 'access') return null
            return payload
        } catch (error) {
            console.error('Access token verification failed:', error)
            return null
        }
    }

    // Verify Refresh Token
    static verifyRefreshToken(token: string): RefreshTokenPayload | null {
        try {
            const payload = jwt.verify(token, REFRESH_SECRET, {
                issuer: 'next-auth-app',
                audience: 'web'
            }) as RefreshTokenPayload

            if (payload.type !== 'refresh') return null
            return payload
        } catch (error) {
            console.error('Refresh token verification failed:', error)
            return null
        }
    }

    // Decode token without verification
    static decodeToken(token: string): TokenPayload | null {
        try {
            return jwt.decode(token) as TokenPayload
        } catch {
            return null
        }
    }

    // Check if token is expired
    static isTokenExpired(token: string): boolean {
        const payload = this.decodeToken(token)
        if (!payload || !payload.exp) return true

        return Date.now() >= payload.exp * 1000
    }

    // Generate token pair (access + refresh)
    static generateTokenPair(userId: string, email: string, refreshTokenId: string) {
        const accessToken = this.generateAccessToken({ userId, email })
        const refreshToken = this.generateRefreshToken({ userId, tokenId: refreshTokenId })

        return { accessToken, refreshToken }
    }
}