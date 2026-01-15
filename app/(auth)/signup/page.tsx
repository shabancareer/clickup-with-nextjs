import { SignupForm } from "@/components/forms/signup-form";

const SignUpPage = () => {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center">
            <h1 className="text-2xl font-bold">Sign Up</h1>
            <SignupForm />
        </div>
    );
};

export default SignUpPage;
