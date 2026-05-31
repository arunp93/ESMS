import { Router } from "express";
import { asyncHandler } from "../utils/async-handler";

import { EmployeeController } from "../controllers/employee.controller";

const router = Router();
const controller = new EmployeeController();

router.post("/",asyncHandler(controller.create.bind(controller)));

router.get("/", asyncHandler(controller.getAll.bind(controller)));

router.get("/:id", asyncHandler(controller.getById.bind(controller)));

export default router;