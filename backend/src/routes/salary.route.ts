import { Router } from "express";

import { SalaryController } from "../controllers/salary.controller";

import { asyncHandler } from "../utils/async-handler";

const router = Router();

const controller =
  new SalaryController();

router.put("/:id/salary",asyncHandler(controller.update.bind(controller)));

router.get("/:id/salary-history",asyncHandler(controller.getHistory.bind(controller)));

export default router;