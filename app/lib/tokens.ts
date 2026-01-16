import { prisma } from '@/app/api/lib/prisma'
import { TokenService } from '@/app/lib/jwt'
import { randomBytes } from 'crypto'

export class TokenManager {
    // Create refresh token in database
    static async createRefreshToken(userId: string) {
        const tokenId = randomBytes(32).toString('hex')
        const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days

        const refreshToken = await prisma.refreshToken.create({
            data: {
                userId,
                token: tokenId,
                expiresAt
            }
        })

        return refreshToken
    }

    // Revoke refresh token
    static async revokeRefreshToken(tokenId: string, replacedByToken?: string) {
        await prisma.refreshToken.update({
            where: { token: tokenId },
            data: {
                revoked: true,
                revokedAt: new Date(),
                replacedByToken
            }
        })
    }

    // Revoke all user's refresh tokens
    static async revokeAllUserTokens(userId: string) {
        await prisma.refreshToken.updateMany({
            where: {
                userId,
                revoked: false,
                expiresAt: { gt: new Date() }
            },
            data: {
                revoked: true,
                revokedAt: new Date()
            }
        })
    }

    // Validate refresh token
    static async validateRefreshToken(tokenId: string, userId: string) {
        const refreshToken = await prisma.refreshToken.findFirst({
            where: {
                token: tokenId,
                userId,
                revoked: false,
                expiresAt: { gt: new Date() }
            },
            include: {
                user: {
                    select: {
                        id: true,
                        email: true
                    }
                }
            }
        })

        return refreshToken
    }

    // Clean up expired tokens
    static async cleanupExpiredTokens() {
        await prisma.refreshToken.deleteMany({
            where: {
                expiresAt: { lt: new Date() }
            }
        })

        await prisma.session.deleteMany({
            where: {
                expiresAt: { lt: new Date() }
            }
        })
    }

    // Rotate refresh token (create new, revoke old)
    static async rotateRefreshToken(oldTokenId: string, userId: string) {
        const newRefreshToken = await this.createRefreshToken(userId)
        await this.revokeRefreshToken(oldTokenId, newRefreshToken.token)

        return newRefreshToken
    }
}