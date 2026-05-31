import {
    Request,
    Response,
} from "express";

import { AuthService }
    from "../services/auth.service";

import {
    loginSchema,
} from "../validators/auth.validator";

const authService =
    new AuthService();

export class AuthController {
    async login(
        req: Request,
        res: Response
    ) {
        const parsed =
            loginSchema.safeParse(
                req.body
            );

        if (!parsed.success) {
            return res.status(400)
                .json({
                    message:
                        "Validation failed",
                });
        }

        const result =
            await authService.login(
                parsed.data.email,
                parsed.data.password
            );

        return res.json(result);
    }
}