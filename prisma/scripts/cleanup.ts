import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function cleanupExpiredTokens() {
    try {
        console.log('Starting cleanup of expired tokens...')

        const now = new Date()

        // Delete expired refresh tokens
        const deletedRefreshTokens = await prisma.refreshToken.deleteMany({
            where: {
                expiresAt: { lt: now }
            }
        })

        console.log(`Deleted ${deletedRefreshTokens.count} expired refresh tokens`)

        // Delete expired sessions
        const deletedSessions = await prisma.session.deleteMany({
            where: {
                expiresAt: { lt: now }
            }
        })

        console.log(`Deleted ${deletedSessions.count} expired sessions`)
    } catch (error) {
        console.error('Error during cleanup:', error)
    } finally {
        await prisma.$disconnect()
    }
}