import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/app/api/lib/prisma'
import { TokenService } from '@/lib/jwt'
import { TokenManager } from '@/lib/tokens'
import { CookieService } from '@/app/api/lib/cookies'

export async function POST(request: NextRequest) {
    try {
        const { refreshToken } = CookieService.getTokensFromCookies(request)

        if (refreshToken) {
            const refreshPayload = TokenService.decodeToken(refreshToken) as any

            if (refreshPayload?.userId && refreshPayload?.tokenId) {
                // Revoke all user tokens
                await TokenManager.revokeAllUserTokens(refreshPayload.userId)

                // Delete all user sessions
                await prisma.session.deleteMany({
                    where: { userId: refreshPayload.userId }
                })
            }
        }

        // Clear cookies
        const response = NextResponse.json({ success: true })
        CookieService.clearAuthCookies(response)

        return response

    } catch (error) {
        console.error('Logout error:', error)

        // Still clear cookies even if there's an error
        const response = NextResponse.json(
            { error: 'Logout failed' },
            { status: 500 }
        )
        CookieService.clearAuthCookies(response)

        return response
    }
}