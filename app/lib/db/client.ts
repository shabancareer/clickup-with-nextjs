import { PrismaClient } from '@prisma/client'
import { Pool } from 'pg'
import { PrismaPg } from '@prisma/adapter-pg'

const connectionString = `${process.env.DATABASE_URL}`

const textConnection = async () => {

}

const globalForPrisma = globalThis as unknown as {
    prisma: PrismaClient | undefined
}
// Check if DATABASE_URL is set
const DATABASE_URL = process.env.DATABASE_URL
if (!DATABASE_URL) {
    console.error('❌ DATABASE_URL is not set in environment variables')
    console.log('📌 Please add DATABASE_URL to your .env.local file:')
    console.log('DATABASE_URL="postgresql://postgres:password@localhost:5432/auth_db"')
    // Don't throw error here, let Prisma handle it with better error message
}

const pool = new Pool({ connectionString })
const adapter = new PrismaPg(pool)

// Initialize Prisma Client with proper configuration
export const db = globalForPrisma.prisma ?? new PrismaClient({ adapter })

// Optional: Test connection
async function testConnection() {
    try {
        await db.$connect()
        console.log('✅ Prisma connected to database')

        // Test with a simple query
        await db.$queryRaw`SELECT 1 as test`
        console.log('✅ Database query test successful')
    } catch (error: any) {
        console.error('❌ Database connection failed:', error.message)

        // Check if it's a connection error
        if (error.code === 'P1001') {
            console.log('📌 Make sure:')
            console.log('1. PostgreSQL is running')
            console.log('2. Database exists: auth_db')
            console.log('3. .env.local has DATABASE_URL')
            console.log('4. User has proper permissions')
        }
    }
}
// Store in global object in development to prevent hot-reload issues
if (process.env.NODE_ENV !== 'production') {
    globalForPrisma.prisma = db
}



// Test database connection on startup
// db.$connect()
//     .then(() => console.log('✅ Database connected successfully'))
//     .catch((err) => {
//         console.error('❌ Failed to connect to database:', err.message)
//         console.log('📌 Check your DATABASE_URL:', process.env.DATABASE_URL)
//     })

export default db

// if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = db