import { Router }
    from "express";

import {
    AuthController,
} from "../controllers/auth.controller";

import {
    asyncHandler,
} from "../utils/async-handler";

import {
  loginRateLimiter,
} from "../middleware/rate-limit.middleware";

const router = Router();

const controller =
    new AuthController();

router.post(
  "/login",
  loginRateLimiter,
  asyncHandler(
    controller.login.bind(controller)
  )
);

export default router;