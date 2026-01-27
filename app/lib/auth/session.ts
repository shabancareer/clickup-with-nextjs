import { cookies } from 'next/headers'
import { SESSION_CONFIG, JWT_CONFIG } from './config'
import { TokenService } from './tokens'
import { db } from '../db/client'

export interface Session {
    user: {
        id: string
        email: string
        name: string | null
        role: string
        avatar?: string | null
    }
    expires: Date
}

export class SessionManager {
    // Create new session
    static async createSession(userId: string): Promise<{ session: Session; token: string }> {
        const user = await db.user.findUnique({
            where: { id: userId },
            select: { id: true, email: true, name: true, role: true, avatar: true }
        })

        if (!user) {
            throw new Error('User not found')
        }

        // Create session in database
        const sessionToken = crypto.randomUUID()
        const expires = new Date(Date.now() + SESSION_CONFIG.maxAge * 1000)

        const dbSession = await db.session.create({
            data: {
                userId: user.id,
                sessionToken,
                expires,
            }
        })

        // Generate JWT
        const token = TokenService.generateToken({
            userId: user.id,
            email: user.email,
            role: user.role,
            sessionId: dbSession.id,
        })

        // Generate refresh token
        const refreshToken = TokenService.generateRefreshToken(user.id, dbSession.id)

        // Set cookies
        const cookieStore = await cookies()
        cookieStore.set('session-token', token, {
            httpOnly: true,
            secure: SESSION_CONFIG.secure,
            sameSite: 'lax',
            maxAge: SESSION_CONFIG.maxAge,
            path: '/',
        })

        cookieStore.set('refresh-token', refreshToken, {
            httpOnly: true,
            secure: SESSION_CONFIG.secure,
            sameSite: 'lax',
            maxAge: SESSION_CONFIG.maxAge,
            path: '/',
        })

        return {
            session: {
                user: {
                    id: user.id,
                    email: user.email,
                    name: user.name,
                    role: user.role,
                    avatar: user.avatar,
                },
                expires,
            },
            token,
        }
    }

    // Get current session
    static async getSession(): Promise<Session | null> {
        const cookieStore = await cookies()
        const token = cookieStore.get('session-token')?.value

        if (!token) {
            return null
        }

        const payload = TokenService.verifyToken(token)
        if (!payload) {
            return null
        }

        // Verify session exists in database
        const dbSession = await db.session.findFirst({
            where: {
                id: payload.sessionId,
                expires: { gt: new Date() },
            },
            include: {
                user: {
                    select: {
                        id: true,
                        email: true,
                        name: true,
                        role: true,
                        avatar: true,
                    },
                },
            },
        })

        if (!dbSession) {
            return null
        }

        return {
            user: dbSession.user,
            expires: dbSession.expires,
        }
    }

    // Update session
    static async updateSession(): Promise<Session | null> {
        const cookieStore = await cookies()
        const refreshToken = cookieStore.get('refresh-token')?.value

        if (!refreshToken) {
            return null
        }

        const payload = TokenService.verifyRefreshToken(refreshToken)
        if (!payload) {
            return null
        }

        // Verify session exists
        const dbSession = await db.session.findFirst({
            where: {
                id: payload.sessionId,
                userId: payload.userId,
                expires: { gt: new Date() },
            },
        })

        if (!dbSession) {
            return null
        }

        // Create new session
        return this.createSession(payload.userId).then(result => result.session)
    }

    // Delete session (logout)
    static async deleteSession(): Promise<void> {
        const cookieStore = await cookies()
        const token = cookieStore.get('session-token')?.value

        if (token) {
            const payload = TokenService.decodeToken(token)
            if (payload?.sessionId) {
                await db.session.delete({
                    where: { id: payload.sessionId }
                }).catch(() => { })
            }
        }

        // Clear cookies
        cookieStore.delete('session-token')
        cookieStore.delete('refresh-token')
    }

    // Get user from session
    static async getCurrentUser() {
        const session = await this.getSession()
        return session?.user || null
    }
}