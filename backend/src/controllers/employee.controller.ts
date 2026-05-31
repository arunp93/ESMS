import { Request, Response } from "express";
import { EmployeeService } from "../services/employee.service";

const employeeService = new EmployeeService();

export class EmployeeController {
    async create(req: Request, res: Response) {
        const employee = await employeeService.createEmployee(req.body);

        return res.status(201).json(employee);
    }

    async getAll(_req: Request, res: Response) {
        const employees =
            await employeeService.getEmployees();

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