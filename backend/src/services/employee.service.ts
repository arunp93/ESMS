import prisma from "../lib/prisma";

export interface CreateEmployeeInput {
  employeeCode: string;
  firstName: string;
  lastName: string;
  email: string;
  department: string;
  designation: string;
}

export class EmployeeService {
  constructor(
    private readonly db = prisma
  ) {}

  async createEmployee(data: CreateEmployeeInput) {
    return this.db.employee.create({
      data,
    });
  }
}