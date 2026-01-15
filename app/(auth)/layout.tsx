import { PropsWithChildren } from "react";

const AuthLayout = ({ children }: PropsWithChildren) => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
            <h1 className="text-2xl font-bold">Auth shared layout</h1>
            {children}
        </div>
    );
};

export default AuthLayout;
