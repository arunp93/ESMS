import { Router } from "express";

import { AnalyticsController } from "../controllers/analytics.controller";

import { asyncHandler } from "../utils/async-handler";

import {
  authorize
} from "../middleware/authorization.middleware";

import {
  authenticate,
} from "../middleware/auth.middleware";

import {
  withETag,
} from "../middleware/etag.middleware";

const router = Router();

const controller =
  new AnalyticsController();

router.get(
  "/payroll-summary",
  authenticate,
  authorize(
    "ADMIN",
    "HR_MANAGER"
  ),
  withETag,
  asyncHandler(
    controller.getPayrollSummary.bind(
      controller
    )
  )
);

router.get(
  "/highest-paid-employees",
  authenticate,
  authorize(
    "ADMIN",
    "HR_MANAGER"
  ),
  withETag,
  asyncHandler(
    controller.getHighestPaidEmployees.bind(
      controller
    )
  )
);

router.get(
  "/department-breakdown",
  authenticate,
  authorize(
    "ADMIN",
    "HR_MANAGER"
  ),
  withETag,
  asyncHandler(
    controller.getDepartmentBreakdown.bind(
      controller
    )
  )
);

export default router;