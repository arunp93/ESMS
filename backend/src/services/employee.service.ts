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
  async createEmployee(data: CreateEmployeeInput) {
    return prisma.employee.create({
      data,
    });
  }
}