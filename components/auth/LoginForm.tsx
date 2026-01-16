'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { loginSchema, type LoginInput } from '@/app/lib/validation'
import { useAuth } from '@/app/hooks/useAuth'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { SocialButtons } from './SocialButtons'
import { AlertCircle, Mail, Lock } from 'lucide-react'

export function LoginForm() {
    const [error, setError] = useState<string>('')
    const { login, isLoggingIn } = useAuth()

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<LoginInput>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: '',
            password: ''
        }
    })

    const onSubmit = async (data: LoginInput) => {
        try {
            setError('')
            await login(data)
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred')
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {error && (
                <div className="p-4 rounded-lg bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800">
                    <div className="flex items-center">
                        <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400 mr-2" />
                        <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
                    </div>
                </div>
            )}

            <div className="space-y-4">
                <Input
                    label="Email address"
                    type="email"
                    placeholder="you@example.com"
                    error={errors.email?.message}
                    icon={<Mail className="h-5 w-5" />}
                    {...register('email')}
                />

                <div className="space-y-2">
                    <Input
                        label="Password"
                        type="password"
                        placeholder="••••••••"
                        error={errors.password?.message}
                        icon={<Lock className="h-5 w-5" />}
                        {...register('password')}
                    />
                    <div className="flex justify-end">
                        <Link
                            href="/forgot-password"
                            className="text-sm text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
                        >
                            Forgot your password?
                        </Link>
                    </div>
                </div>
            </div>

            <Button
                type="submit"
                isLoading={isLoggingIn}
                fullWidth
                size="lg"
                className="font-semibold"
            >
                {isLoggingIn ? 'Signing in...' : 'Sign in'}
            </Button>

            <SocialButtons />

            <div className="text-center text-sm text-gray-600 dark:text-gray-400">
                By continuing, you agree to our{' '}
                <Link href="/terms" className="text-blue-600 hover:text-blue-500 dark:text-blue-400">
                    Terms
                </Link>{' '}
                and{' '}
                <Link href="/privacy" className="text-blue-600 hover:text-blue-500 dark:text-blue-400">
                    Privacy Policy
                </Link>
            </div>
        </form>
    )
}