import { Router } from "express";
import { EmployeeController } from "../controllers/employee.controller";

const router = Router();
const controller = new EmployeeController();

router.post("/", async (req, res) => {
  await controller.create(req, res);
});

router.get("/", async (req, res) => {
  await controller.getAll(req, res);
});

router.get("/:id", async (req, res) => {
  await controller.getById(req, res);
});

export default router;