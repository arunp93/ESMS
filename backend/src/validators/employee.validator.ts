import { z } from "zod";

export const createEmployeeSchema = z.object({
  employeeCode: z
    .string()
    .min(1),

  firstName: z
    .string()
    .min(1),

  lastName: z
    .string()
    .min(1),

  email: z
    .email(),

  department: z
    .string()
    .min(1),

  designation: z
    .string()
    .min(1),
});

export const updateEmployeeSchema =
  createEmployeeSchema.partial();

export type CreateEmployeeDto =
  z.infer<typeof createEmployeeSchema>;