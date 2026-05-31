import { Request, Response } from "express";
import { EmployeeService } from "../services/employee.service";

const employeeService = new EmployeeService();

export class EmployeeController {
    async create(req: Request, res: Response) {
        const employee = await employeeService.createEmployee(req.body);

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
}