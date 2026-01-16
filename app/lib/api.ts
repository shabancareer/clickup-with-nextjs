'use client'

import { useAuth } from '@/app/hooks/useAuth'

class ApiClient {
    private baseURL: string
    private auth: ReturnType<typeof useAuth> | null = null

    constructor(baseURL: string = '') {
        this.baseURL = baseURL
    }

    setAuth(auth: ReturnType<typeof useAuth>) {
        this.auth = auth
    }

    private async refreshTokenIfNeeded(): Promise<boolean> {
        if (!this.auth) return false

        try {
            await this.auth.refresh()
            return true
        } catch {
            return false
        }
    }

    async request<T>(
        endpoint: string,
        options: RequestInit = {}
    ): Promise<T> {
        const url = `${this.baseURL}${endpoint}`

        // Ensure cookies are sent
        const requestOptions: RequestInit = {
            ...options,
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                ...options.headers,
            },
        }

        try {
            const response = await fetch(url, requestOptions)

            // If unauthorized, try to refresh token and retry
            if (response.status === 401 && this.auth) {
                const refreshed = await this.refreshTokenIfNeeded()

                if (refreshed) {
                    // Retry the original request with new token
                    return this.request<T>(endpoint, options)
                }
            }

            if (!response.ok) {
                const error = await response.json()
                throw new Error(error.error || `API error: ${response.status}`)
            }

            return response.json()
        } catch (error) {
            console.error('API request failed:', error)
            throw error
        }
    }

    async get<T>(endpoint: string): Promise<T> {
        return this.request<T>(endpoint, { method: 'GET' })
    }

    async post<T>(endpoint: string, data?: any): Promise<T> {
        return this.request<T>(endpoint, {
            method: 'POST',
            body: data ? JSON.stringify(data) : undefined,
        })
    }

    async put<T>(endpoint: string, data?: any): Promise<T> {
        return this.request<T>(endpoint, {
            method: 'PUT',
            body: data ? JSON.stringify(data) : undefined,
        })
    }

    async delete<T>(endpoint: string): Promise<T> {
        return this.request<T>(endpoint, { method: 'DELETE' })
    }
}

// Singleton instance
export const apiClient = new ApiClient('/api')

// Hook to use API client with auth
export function useApiClient() {
    const auth = useAuth()
    apiClient.setAuth(auth)
    return apiClient
}