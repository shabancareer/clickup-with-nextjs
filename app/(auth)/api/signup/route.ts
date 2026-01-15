import { prisma } from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

// export async function POST(req: NextRequest) {
//     try {
//         const body = await req.json();
//         const { username, email, password } = body;

//         if (!username || !email || !password) {
//             return NextResponse.json(
//                 { error: "Missing required fields" },
//                 { status: 400 }
//             );
//         }

//         const existingUser = await prisma.user.findUnique({
//             where: { email },
//         });

//         if (existingUser) {
//             return NextResponse.json(
//                 { error: "User already exists" },
//                 { status: 400 }
//             );
//         }

//         const hashedPassword = await bcrypt.hash(password, 10);

//         const user = await prisma.user.create({
//             data: {
//                 username: username, // Map 'username' to 'name' or separate field if added. Schema has 'name', prompt has 'username'.
//                 // The schema in d:\clickup-with-nextjs\prisma\schema.prisma has 'name' and 'email'.
//                 // The form sends 'username'. I will map 'username' to 'name' for now to match the schema.
//                 // Wait, let me check schema again.
//                 // model User { id String @id... email String @unique name String? password String? ... }
//                 // So I should map username -> name.
//                 name: username,
//                 email,
//                 password: hashedPassword,
//             },
//         });

//         // Return the structure expected by the service/frontend
//         // The service expects TAuthResponse = { jwt: string; user: TAuthUser; }
//         // Since we are not Strapi, we don't have a JWT readily available unless we generate one.
//         // For simplicity, I'll return a mock JWT or generate a real one if needed later.
//         // But for now, let's just return the user and a dummy token or implementing JWT generation.
//         // Given the constraints, I will return a dummy token or just the user and handle it in the service.

//         return NextResponse.json({
//             jwt: "dummy-token-for-now",
//             user: {
//                 id: user.id,
//                 username: user.name,
//                 email: user.email,
//                 // Add other fields to match TAuthUser if strict typing requires it, 
//                 // but TAuthUser has many Strapi specific fields.
//                 // I might need to adjust TAuthUser type in the service or here.
//                 // Let's return what we have and let the service adapt or validation fail (if strict).
//                 // Re-checking auth.ts types: TAuthUser structure is Strapi-like. 
//                 // I will return a compatible structure.
//                 provider: "local",
//                 confirmed: true,
//                 blocked: false,
//                 createdAt: user.createdAt.toISOString(),
//                 updatedAt: user.updatedAt.toISOString(),
//             }
//         });

//     } catch (error) {
//         console.error("Signup API Error:", error);
//         return NextResponse.json(
//             { error: "Internal Server Error" },
//             { status: 500 }
//         );
//     }
// }

export async function POST(req: Request) {
    try {
        const { email, name, password } = await req.json();

        if (!email || !password) {
            return NextResponse.json(
                { success: false, message: "Email and password are required" },
                { status: 400 }
            );
        }

        // Check if user exists
        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            return NextResponse.json(
                { success: false, message: "Email already registered" },
                { status: 400 }
            );
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        const user = await prisma.user.create({
            data: { email, name, password: hashedPassword },
        });

        return NextResponse.json({ success: true, user });
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { success: false, message: "Registration failed" },
            { status: 500 }
        );
    }
}
