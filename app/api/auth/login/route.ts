import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { prisma } from '@/app/api/lib/prisma'
import { loginSchema } from '@/lib/validation'
import { TokenService } from '@/lib/jwt'
import { TokenManager } from '@/lib/tokens'
import { CookieService } from '@/app/api/lib/cookies'

export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        const validatedData = loginSchema.parse(body)

        // Find user
        const user = await prisma.user.findUnique({
            where: { email: validatedData.email },
            select: {
                id: true,
                email: true,
                password: true,
                name: true
            }
        })

        if (!user) {
            return NextResponse.json(
                { error: 'Invalid credentials' },
                { status: 401 }
            )
        }

        // Verify password
        const isValidPassword = await bcrypt.compare(
            validatedData.password,
            user.password
        )

        if (!isValidPassword) {
            return NextResponse.json(
                { error: 'Invalid credentials' },
                { status: 401 }
            )
        }

        // Create refresh token in database
        const refreshTokenRecord = await TokenManager.createRefreshToken(user.id)

        // Generate token pair
        const { accessToken, refreshToken } = TokenService.generateTokenPair(
            user.id,
            user.email,
            refreshTokenRecord.token
        )

        // Create session
        await prisma.session.create({
            data: {
                userId: user.id,
                token: accessToken,
                expiresAt: new Date(Date.now() + 15 * 60 * 1000) // 15 minutes
            }
        })

        // Return response with cookies
        return CookieService.createAuthResponse(
            { id: user.id, email: user.email, name: user.name },
            accessToken,
            refreshToken
        )

    } catch (error: any) {
        console.error('Login error:', error)

        if (error.name === 'ZodError') {
            return NextResponse.json(
                { error: 'Validation failed', details: error.errors },
                { status: 400 }
            )
        }

        return NextResponse.json(
            { error: 'Login failed' },
            { status: 500 }
        )
    }
}