import type { TStrapiResponse, TImage } from "@/types";
import { actions } from "@/app/(data)/actions";
// import qs from "qs";

type TRegisterUser = {
    username: string;
    password: string;
    email: string;
};

type TLoginUser = {
    identifier: string;
    password: string;
};

type TAuthUser = {
    id: number;
    documentId: string;
    username: string;
    email: string;
    firstName?: string;
    lastName?: string;
    bio?: string;
    image?: TImage;
    credits?: number;
    provider: string;
    confirmed: boolean;
    blocked: boolean;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
};

type TAuthResponse = {
    jwt: string;
    user: TAuthUser;
};

type TAuthServiceResponse = TAuthResponse | TStrapiResponse<null>;

// Type guard functions
export function isAuthError(
    response: TAuthServiceResponse
): response is TStrapiResponse<null> {
    return "error" in response;
}

export function isAuthSuccess(
    response: TAuthServiceResponse
): response is TAuthResponse {
    return "jwt" in response;
}

// const baseUrl = getStrapiURL();
// const baseUrl = "/signup";

export async function registerUserService(
    userData: TRegisterUser
): Promise<TAuthServiceResponse | undefined> {
    // Call the internal Next.js API route we just created
    const url = "/api/signup";

    try {
        const response = await fetch(process.env.NEXT_PUBLIC_API_URL ? `${process.env.NEXT_PUBLIC_API_URL}${url}` : `http://localhost:3000${url}`, {
            // Fallback to localhost:3000 if env not set. 
            // Better yet, just use a relative path if client-side, but this is server-side (called by action).
            // So we need absolute URL.
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
        });

        const data = await response.json();

        // Handle error response from API
        if (!response.ok) {
            // Transform to Strapi-like error format if needed by isAuthError
            return {
                error: {
                    status: response.status,
                    name: "RegistrationError",
                    message: data.error || "Failed to register",
                    details: {},
                }
            };
        }

        return data as TAuthServiceResponse;
    } catch (error) {
        console.error("Registration Service Error:", error);
        return undefined;
    }
}

export async function loginUserService(
    userData: TLoginUser
): Promise<TAuthServiceResponse> {
    const url = new URL("/api/auth/local", baseUrl);

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ ...userData }),
        });

        return response.json() as Promise<TAuthServiceResponse>;
    } catch (error) {
        console.error("Login Service Error:", error);
        throw error;
    }
}