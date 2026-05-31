import { z } from "zod";

export const updateSalarySchema = z.object({
  baseSalary: z.number().positive(),
  bonus: z.number().min(0).default(0),
  effectiveDate: z.coerce.date(),
});

export type UpdateSalaryDto =
  z.infer<typeof updateSalarySchema>;