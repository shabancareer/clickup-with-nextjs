'use client'

import { ReactNode } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { CardFooter } from '@/components/ui/card'

export default function AuthLayout({ children }: { children: ReactNode }) {
    const pathname = usePathname()
    const isLogin = pathname === '/login'

    return (
        <div className="flex items-start justify-center mb-4">
            <CardFooter className="flex flex-col space-y-4 w-full max-w-md">
                {children}

                <div className="text-sm text-center text-gray-600 dark:text-gray-400">
                    {isLogin ? (
                        <>
                            Don&apos;t have an account?{' '}
                            <Link
                                href="/register"
                                className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400"
                            >
                                Register
                            </Link>
                        </>
                    ) : (
                        <>
                            Already have an account?{' '}
                            <Link
                                href="/login"
                                className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400"
                            >
                                Login
                            </Link>
                        </>
                    )}
                </div>
            </CardFooter>
        </div>
    )
}
