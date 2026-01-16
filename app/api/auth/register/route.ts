import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { prisma } from '@/app/api/lib/prisma'
import { registerSchema } from '@/app/lib/validation'
import { TokenService } from '@/app/lib/jwt'
import { TokenManager } from '@/app/lib/tokens'
import { CookieService } from '@/app/api/lib/cookies'

export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        const validatedData = registerSchema.parse(body)

        // Check if user exists
        const existingUser = await prisma.user.findUnique({
            where: { email: validatedData.email }
        })

        if (existingUser) {
            return NextResponse.json(
                { error: 'User with this email already exists' },
                { status: 409 }
            )
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(validatedData.password, 12)

        // Create user
        const user = await prisma.user.create({
            data: {
                name: validatedData.name,
                email: validatedData.email,
                password: hashedPassword
            },
            select: {
                id: true,
                email: true,
                name: true
            }
        })

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
                expiresAt: new Date(Date.now() + 15 * 60 * 1000)
            }
        })

        // Return response with cookies
        return CookieService.createAuthResponse(
            { id: user.id, email: user.email, name: user.name },
            accessToken,
            refreshToken
        )

    } catch (error: any) {
        console.error('Registration error:', error)

        if (error.name === 'ZodError') {
            return NextResponse.json(
                { error: 'Validation failed', details: error.errors },
                { status: 400 }
            )
        }

        return NextResponse.json(
            { error: 'Registration failed' },
            { status: 500 }
        )
    }
}