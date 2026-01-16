import { ReactNode } from 'react'
import { Card } from '@/components/ui/card'

interface AuthCardProps {
    title: string
    subtitle?: string
    children: ReactNode
    footer?: ReactNode
}

export function AuthCard({ title, subtitle, children, footer }: AuthCardProps) {
    return (
        <Card className="w-full max-w-md mx-auto">
            <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    {title}
                </h1>
                {subtitle && (
                    <p className="text-gray-600 dark:text-gray-400">
                        {subtitle}
                    </p>
                )}
            </div>

            <div className="space-y-6">
                {children}
            </div>

            {footer && (
                <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                    {footer}
                </div>
            )}
        </Card>
    )
}