import bcrypt from "bcryptjs";
import jwt, { Secret, SignOptions } from "jsonwebtoken";
import prisma from "../lib/prisma";

export class AuthService {
    constructor(
        private readonly db = prisma
    ) { }

    async login(
        email: string,
        password: string
    ) {
        const user =
            await this.db.user.findUnique({
                where: {
                    email,
                },
            });

        if (!user) {
            throw new Error(
                "Invalid credentials"
            );
        }

        const isValid =
            await bcrypt.compare(
                password,
                user.passwordHash
            );

        if (!isValid) {
            throw new Error(
                "Invalid credentials"
            );
        }

        const secret: Secret =
            process.env.JWT_SECRET as Secret;

        const options: SignOptions = {
            expiresIn: "1d",
        };

        const token = jwt.sign(
            {
                userId: user.id,
                role: user.role,
            },
            secret,
            options
        );

        return {
            accessToken: token,
            user: {
                id: user.id,
                email: user.email,
                role: user.role,
            },
        };
    }
}