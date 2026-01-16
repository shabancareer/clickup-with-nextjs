import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/app/api/lib/prisma'
import { TokenService } from '@/lib/jwt'
import { TokenManager } from '@/lib/tokens'
import { CookieService } from '@/app/api/lib/cookies'

export async function POST(request: NextRequest) {
    try {
        const { refreshToken: oldRefreshToken } = CookieService.getTokensFromCookies(request)

        if (!oldRefreshToken) {
            return NextResponse.json(
                { error: 'No refresh token provided' },
                { status: 401 }
            )
        }

        // Verify refresh token
        const refreshPayload = TokenService.verifyRefreshToken(oldRefreshToken)

        if (!refreshPayload) {
            return NextResponse.json(
                { error: 'Invalid refresh token' },
                { status: 401 }
            )
        }

        // Validate refresh token in database
        const refreshTokenRecord = await TokenManager.validateRefreshToken(
            refreshPayload.tokenId,
            refreshPayload.userId
        )

        if (!refreshTokenRecord) {
            return NextResponse.json(
                { error: 'Refresh token revoked or expired' },
                { status: 401 }
            )
        }

        // Rotate refresh token (new refresh token, revoke old one)
        const newRefreshTokenRecord = await TokenManager.rotateRefreshToken(
            refreshPayload.tokenId,
            refreshPayload.userId
        )

        // Generate new access token
        const accessToken = TokenService.generateAccessToken({
            userId: refreshPayload.userId,
            email: refreshTokenRecord.user.email
        })

        // Generate new refresh token JWT
        const newRefreshToken = TokenService.generateRefreshToken({
            userId: refreshPayload.userId,
            tokenId: newRefreshTokenRecord.token
        })

        // Update session
        await prisma.session.updateMany({
            where: { userId: refreshPayload.userId },
            data: {
                token: accessToken,
                expiresAt: new Date(Date.now() + 15 * 60 * 1000)
            }
        })

        // Return new tokens
        return CookieService.createAuthResponse(
            {
                id: refreshPayload.userId,
                email: refreshTokenRecord.user.email,
                name: refreshTokenRecord.user.name
            },
            accessToken,
            newRefreshToken
        )

    } catch (error) {
        console.error('Token refresh error:', error)
        return NextResponse.json(
            { error: 'Failed to refresh token' },
            { status: 500 }
        )
    }
}