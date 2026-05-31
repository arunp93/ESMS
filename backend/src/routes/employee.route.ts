import { Router } from "express";
import { asyncHandler } from "../utils/async-handler";
import {
  authenticate,
} from "../middleware/auth.middleware";
import { EmployeeController } from "../controllers/employee.controller";

const router = Router();
router.use(authenticate);
const controller = new EmployeeController();

router.post("/",asyncHandler(controller.create.bind(controller)));

router.get("/", asyncHandler(controller.getAll.bind(controller)));

router.get("/:id", asyncHandler(controller.getById.bind(controller)));

router.put("/:id",asyncHandler(controller.update.bind(controller)));

export default router;