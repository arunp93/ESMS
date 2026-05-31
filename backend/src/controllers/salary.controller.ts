import { Request, Response } from "express";

import { SalaryService } from "../services/salary.service";

import {
  updateSalarySchema,
} from "../validators/salary.validator";

const salaryService =
  new SalaryService();

export class SalaryController {
  async update(
    req: Request,
    res: Response
  ) {
    const parsed =
      updateSalarySchema.safeParse(
        req.body
      );

    if (!parsed.success) {
      return res.status(400).json({
        message: "Validation failed",
        errors:
          parsed.error.flatten(),
      });
    }

    const salary =
      await salaryService.updateSalary(
        Number(req.params.id),
        parsed.data
      );

    return res.json(salary);
  }
}