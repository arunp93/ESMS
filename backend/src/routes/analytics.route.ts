import { Router } from "express";

import { AnalyticsController } from "../controllers/analytics.controller";

import { asyncHandler } from "../utils/async-handler";

import {
  authenticate,
} from "../middleware/auth.middleware";

const router = Router();
router.use(authenticate);

const controller =
  new AnalyticsController();

router.get(
  "/payroll-summary",
  asyncHandler(
    controller.getPayrollSummary.bind(
      controller
    )
  )
);

router.get(
  "/highest-paid-employees",
  asyncHandler(
    controller.getHighestPaidEmployees.bind(
      controller
    )
  )
);

router.get(
  "/department-breakdown",
  asyncHandler(
    controller.getDepartmentBreakdown.bind(
      controller
    )
  )
);

export default router;