import { Router } from "express";
import { asyncHandler } from "../utils/async-handler";
import {
  authenticate,
} from "../middleware/auth.middleware";
import {
  authorize
} from "../middleware/authorization.middleware";
import { EmployeeController } from "../controllers/employee.controller";

const router = Router();
const controller = new EmployeeController();

router.post(
  "/",
  authenticate,
  authorize("ADMIN"),
  asyncHandler(
    controller.create.bind(controller)
  )
);

router.get(
  "/",
  authenticate,
  authorize(
    "ADMIN",
    "HR_MANAGER"
  ),
  asyncHandler(
    controller.getAll.bind(controller)
  )
);

router.get(
  "/:id",
  authenticate,
  authorize(
    "ADMIN",
    "HR_MANAGER"
  ),
  asyncHandler(
    controller.getById.bind(controller)
  )
);

router.put(
  "/:id",
  authenticate,
  authorize("ADMIN"),
  asyncHandler(
    controller.update.bind(controller)
  )
);

export default router;