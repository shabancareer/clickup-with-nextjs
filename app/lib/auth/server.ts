import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { SessionManager } from './session'

// For server components
export async function getServerSession() {
    return await SessionManager.getSession()
}

export async function getCurrentUser() {
    return await SessionManager.getCurrentUser()
}

export async function requireAuth(redirectTo: string = '/login') {
    const session = await getServerSession()

    if (!session) {
        redirect(redirectTo)
    }

    return session
}

export async function requireNoAuth(redirectTo: string = '/dashboard') {
    const session = await getServerSession()

    if (session) {
        redirect(redirectTo)
    }
}