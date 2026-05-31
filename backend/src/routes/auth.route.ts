import { Router }
    from "express";

import {
    AuthController,
} from "../controllers/auth.controller";

import {
    asyncHandler,
} from "../utils/async-handler";

const router = Router();

const controller =
    new AuthController();

router.post(
    "/login",
    asyncHandler(
        controller.login.bind(
            controller
        )
    )
);

export default router;