import { Request, Response } from "express";
import { EmployeeService } from "../services/employee.service";
import {
    createEmployeeSchema,updateEmployeeSchema
} from "../validators/employee.validator";

const employeeService = new EmployeeService();

export class EmployeeController {

    async create(req: Request, res: Response) {
        const parsed =
            createEmployeeSchema.safeParse(
                req.body
            );

        if (!parsed.success) {
            return res.status(400).json({
                message: "Validation failed",
                errors: parsed.error.flatten(),
            });
        }

        const employee =
            await employeeService.createEmployee(
                parsed.data
            );

        return res.status(201).json(employee);
    }

    async getAll(req: Request, res: Response) {
        const page =
            Number(req.query.page) || 1;

        const limit =
            Number(req.query.limit) || 20;

        const search =
            req.query.search?.toString();

        const employees =
            await employeeService.getEmployees(
                page,
                limit,
                search
            );

        return res.json(employees);
    }

    async getById(req: Request, res: Response) {
        const employee =
            await employeeService.getEmployeeById(
                Number(req.params.id)
            );

        if (!employee) {
            return res.status(404).json({
                message: "Employee not found",
            });
        }

        return res.json(employee);
    }

    async update(
        req: Request,
        res: Response
    ) {
        const parsed =
            updateEmployeeSchema.safeParse(
                req.body
            );

        if (!parsed.success) {
            return res.status(400).json({
                message: "Validation failed",
                errors: parsed.error.flatten(),
            });
        }

        const employee =
            await employeeService.updateEmployee(
                Number(req.params.id),
                parsed.data
            );

        return res.json(employee);
    }
}