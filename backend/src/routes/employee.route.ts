import { Router } from "express";
import { EmployeeController } from "../controllers/employee.controller";

const router = Router();
const controller = new EmployeeController();

router.post("/", async (req, res) => {
  await controller.create(req, res);
});

export default router;