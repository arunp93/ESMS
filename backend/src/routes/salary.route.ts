import { Router } from "express";

import { SalaryController } from "../controllers/salary.controller";

import { asyncHandler } from "../utils/async-handler";

import {
  authorize
} from "../middleware/authorization.middleware";

import {
  authenticate,
} from "../middleware/auth.middleware";

const router = Router();
router.use(authenticate);

const controller =
  new SalaryController();

router.put("/:id/salary",authorize("ADMIN"),asyncHandler(controller.update.bind(controller)));

router.get("/:id/salary-history",authorize("ADMIN","HR_MANAGER"),asyncHandler(controller.getHistory.bind(controller)));

export default router;