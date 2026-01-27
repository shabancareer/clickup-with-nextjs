import jwt from 'jsonwebtoken'

export const JWT_CONFIG = {
    secret: process.env.JWT_SECRET!,
    refreshSecret: process.env.JWT_REFRESH_SECRET!,
    expiresIn: '1h',
    refreshExpiresIn: '7d',
} as const

export const SESSION_CONFIG = {
    maxAge: parseInt(process.env.SESSION_MAX_AGE || '604800', 10), // 7 days
    cookieName: 'next-auth.session-token',
    secure: process.env.NODE_ENV === 'production',
} as const