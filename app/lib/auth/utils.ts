import bcrypt from 'bcryptjs'
import { randomBytes } from 'crypto'


export class AuthUtils {
    // Hash password
    static async hashPassword(password: string): Promise<string> {
        const saltRounds = parseInt(process.env.PASSWORD_SALT_ROUNDS || '12', 10)
        return bcrypt.hash(password, saltRounds)
    }

    // Verify password
    static async verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
        return bcrypt.compare(password, hashedPassword)
    }

    // Generate random token
    static generateToken(length: number = 32): string {
        return randomBytes(length).toString('hex')
    }

    // Validate email format
    static isValidEmail(email: string): boolean {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        return emailRegex.test(email)
    }

    // Validate password strength
    static isStrongPassword(password: string): boolean {
        const minLength = 8
        const hasUpperCase = /[A-Z]/.test(password)
        const hasLowerCase = /[a-z]/.test(password)
        const hasNumbers = /\d/.test(password)
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password)

        return (
            password.length >= minLength &&
            hasUpperCase &&
            hasLowerCase &&
            hasNumbers &&
            hasSpecialChar
        )
    }
}