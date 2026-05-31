import { Router } from "express";

import { SalaryController } from "../controllers/salary.controller";

import { asyncHandler } from "../utils/async-handler";

import {
  authenticate,
} from "../middleware/auth.middleware";

const router = Router();
router.use(authenticate);

const controller =
  new SalaryController();

router.put("/:id/salary",asyncHandler(controller.update.bind(controller)));

router.get("/:id/salary-history",asyncHandler(controller.getHistory.bind(controller)));

export default router;