'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { registerSchema, type RegisterInput } from '@/app/lib/validation'
import { useAuth } from '@/app/hooks/useAuth'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { SocialButtons } from './SocialButtons'
import { AlertCircle, User, Mail, Lock, Check } from 'lucide-react'

export function RegisterForm() {
    const [error, setError] = useState<string>('')
    const { register: registerUser, isRegistering } = useAuth()

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors }
    } = useForm<RegisterInput>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            name: '',
            email: '',
            password: '',
            confirmPassword: ''
        }
    })

    const password = watch('password')
    const confirmPassword = watch('confirmPassword')

    const passwordRequirements = [
        { label: 'At least 8 characters', met: password?.length >= 8 },
        { label: 'Contains uppercase letter', met: /[A-Z]/.test(password || '') },
        { label: 'Contains lowercase letter', met: /[a-z]/.test(password || '') },
        { label: 'Contains number', met: /[0-9]/.test(password || '') },
        { label: 'Contains special character', met: /[^A-Za-z0-9]/.test(password || '') }
    ]

    const passwordsMatch = password === confirmPassword && password?.length > 0

    const onSubmit = async (data: RegisterInput) => {
        try {
            setError('')
            await registerUser(data)
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
                    label="Full name"
                    type="text"
                    placeholder="John Doe"
                    error={errors.name?.message}
                    icon={<User className="h-5 w-5" />}
                    {...register('name')}
                />

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

                    {password && (
                        <div className="space-y-2 p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
                            <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                Password requirements:
                            </p>
                            <ul className="space-y-1">
                                {passwordRequirements.map((req, index) => (
                                    <li key={index} className="flex items-center text-sm">
                                        <Check
                                            className={`h-4 w-4 mr-2 ${req.met
                                                ? 'text-green-500'
                                                : 'text-gray-400 dark:text-gray-600'
                                                }`}
                                        />
                                        <span
                                            className={
                                                req.met
                                                    ? 'text-green-600 dark:text-green-400'
                                                    : 'text-gray-500 dark:text-gray-400'
                                            }
                                        >
                                            {req.label}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>

                <Input
                    label="Confirm password"
                    type="password"
                    placeholder="••••••••"
                    error={errors.confirmPassword?.message}
                    icon={<Lock className="h-5 w-5" />}
                    {...register('confirmPassword')}
                />

                {confirmPassword && (
                    <div className={`p-3 rounded-lg ${passwordsMatch
                        ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800'
                        : 'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800'
                        }`}>
                        <div className="flex items-center">
                            {passwordsMatch ? (
                                <>
                                    <Check className="h-5 w-5 text-green-600 dark:text-green-400 mr-2" />
                                    <p className="text-sm text-green-600 dark:text-green-400">
                                        Passwords match
                                    </p>
                                </>
                            ) : (
                                <>
                                    <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400 mr-2" />
                                    <p className="text-sm text-red-600 dark:text-red-400">
                                        Passwords do not match
                                    </p>
                                </>
                            )}
                        </div>
                    </div>
                )}
            </div>

            <div className="flex items-center">
                <input
                    id="terms"
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    required
                />
                <label htmlFor="terms" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                    I agree to the{' '}
                    <a href="/terms" className="text-blue-600 hover:text-blue-500 dark:text-blue-400">
                        Terms of Service
                    </a>{' '}
                    and{' '}
                    <a href="/privacy" className="text-blue-600 hover:text-blue-500 dark:text-blue-400">
                        Privacy Policy
                    </a>
                </label>
            </div>

            <Button
                type="submit"
                isLoading={isRegistering}
                fullWidth
                size="lg"
                className="font-semibold"
            >
                {isRegistering ? 'Creating account...' : 'Create account'}
            </Button>

            <SocialButtons />

            <div className="text-center text-sm text-gray-600 dark:text-gray-400">
                By creating an account, you agree to our{' '}
                <a href="/terms" className="text-blue-600 hover:text-blue-500 dark:text-blue-400">
                    Terms
                </a>
                ,{' '}
                <a href="/privacy" className="text-blue-600 hover:text-blue-500 dark:text-blue-400">
                    Privacy Policy
                </a>
                , and{' '}
                <a href="/cookies" className="text-blue-600 hover:text-blue-500 dark:text-blue-400">
                    Cookie Policy
                </a>
                .
            </div>
        </form>
    )
}