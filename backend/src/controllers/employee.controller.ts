import { Request, Response } from "express";
import { EmployeeService } from "../services/employee.service";

const employeeService = new EmployeeService();

export class EmployeeController {
  async create(req: Request, res: Response) {
    const employee = await employeeService.createEmployee(req.body);

    return res.status(201).json(employee);
  }
}