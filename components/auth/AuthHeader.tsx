import Link from 'next/link'

interface AuthHeaderProps {
    title: string
    description: string
    linkText: string
    linkHref: string
}

export function AuthHeader({ title, description, linkText, linkHref }: AuthHeaderProps) {
    return (
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
            <div className="flex justify-center">
                <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-blue-600 rounded-lg"></div>
                    <span className="text-2xl font-bold text-gray-900 dark:text-white">
                        NextAuth
                    </span>
                </div>
            </div>

            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
                {title}
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
                {description}{' '}
                <Link
                    href={linkHref}
                    className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
                >
                    {linkText}
                </Link>
            </p>
        </div>
    )
}