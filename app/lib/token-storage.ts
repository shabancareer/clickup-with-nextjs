'use client'

const ACCESS_TOKEN_KEY = 'access_token'
const REFRESH_TOKEN_KEY = 'refresh_token'

export class TokenStorage {
    // Store tokens in localStorage (alternative to cookies)
    static setTokens(accessToken: string, refreshToken: string) {
        if (typeof window === 'undefined') return

        localStorage.setItem(ACCESS_TOKEN_KEY, accessToken)
        localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken)
    }

    static getAccessToken(): string | null {
        if (typeof window === 'undefined') return null
        return localStorage.getItem(ACCESS_TOKEN_KEY)
    }

    static getRefreshToken(): string | null {
        if (typeof window === 'undefined') return null
        return localStorage.getItem(REFRESH_TOKEN_KEY)
    }

    static clearTokens() {
        if (typeof window === 'undefined') return

        localStorage.removeItem(ACCESS_TOKEN_KEY)
        localStorage.removeItem(REFRESH_TOKEN_KEY)
    }

    // Check if token is about to expire
    static isTokenExpiringSoon(token: string): boolean {
        try {
            const payload = JSON.parse(atob(token.split('.')[1]))
            const exp = payload.exp * 1000 // Convert to milliseconds
            const now = Date.now()
            const buffer = 5 * 60 * 1000 // 5 minutes buffer

            return exp - now <= buffer
        } catch {
            return true
        }
    }
}

// Hook to use token storage
export function useTokenStorage() {
    const getAccessToken = () => TokenStorage.getAccessToken()
    const getRefreshToken = () => TokenStorage.getRefreshToken()
    const clearTokens = () => TokenStorage.clearTokens()
    const setTokens = (accessToken: string, refreshToken: string) =>
        TokenStorage.setTokens(accessToken, refreshToken)

    return {
        getAccessToken,
        getRefreshToken,
        clearTokens,
        setTokens
    }
}